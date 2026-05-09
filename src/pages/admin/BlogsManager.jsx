import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save, X, BookOpen, Eye, EyeOff, Edit3, Loader2, Tag, FileText, Upload, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const emptyForm = { title: '', slug: '', excerpt: '', content: '', cover_url: '', tags: [], published: false };

const BlogsManager = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [tagInput, setTagInput] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => { fetchBlogs(); }, []);

    const fetchBlogs = async () => {
        const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
        if (data) setBlogs(data);
        setLoading(false);
    };

    const generateSlug = (title) => title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setForm(f => ({ ...f, title, slug: editingId ? f.slug : generateSlug(title) }));
    };

    const addTag = () => {
        const t = tagInput.trim();
        if (!t || form.tags.includes(t)) return;
        setForm(f => ({ ...f, tags: [...f.tags, t] }));
        setTagInput('');
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('blogs')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('blogs')
                .getPublicUrl(filePath);

            setForm(f => ({ ...f, cover_url: publicUrl }));
            toast.success('Rasm yuklandi!');
        } catch (error) {
            toast.error('Rasm yuklashda xatolik: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const openEdit = (blog) => {
        setForm({ title: blog.title, slug: blog.slug, excerpt: blog.excerpt || '', content: blog.content, cover_url: blog.cover_url || '', tags: blog.tags || [], published: blog.published });
        setEditingId(blog.id);
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleClose = () => { setIsFormOpen(false); setEditingId(null); setForm(emptyForm); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const payload = { ...form, updated_at: new Date().toISOString() };
        let error;
        if (editingId) {
            ({ error } = await supabase.from('blogs').update(payload).eq('id', editingId));
        } else {
            ({ error } = await supabase.from('blogs').insert([payload]));
        }
        if (!error) {
            toast.success(editingId ? 'Maqola yangilandi!' : 'Maqola yaratildi! 🎉');
            handleClose();
            fetchBlogs();
        } else {
            toast.error(error.message);
        }
        setSaving(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Bu maqolani o\'chirishni tasdiqlaysizmi?')) return;
        const { error } = await supabase.from('blogs').delete().eq('id', id);
        if (!error) { toast.success('Maqola o\'chirildi!'); fetchBlogs(); }
        else toast.error(error.message);
    };

    const togglePublish = async (blog) => {
        const { error } = await supabase.from('blogs').update({ published: !blog.published }).eq('id', blog.id);
        if (!error) { toast.success(blog.published ? 'Yashirildi' : 'Nashr etildi! 🎉'); fetchBlogs(); }
        else toast.error(error.message);
    };

    if (loading) return (
        <div className="animate-pulse space-y-4">
            <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
            {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>)}
        </div>
    );

    return (
        <div className="animate-fade-in max-w-6xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-heading flex items-center gap-3 text-gray-900 dark:text-white">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex-center text-indigo-600 dark:text-indigo-400"><BookOpen size={24} /></div>
                    Blog Boshqaruvi
                </h2>
                <button onClick={isFormOpen ? handleClose : () => setIsFormOpen(true)} className={`btn ${isFormOpen ? 'btn-outline border-gray-200 dark:border-white/10' : 'btn-primary'} flex items-center gap-2 px-6 py-3 rounded-2xl`}>
                    {isFormOpen ? <X size={20} /> : <Plus size={20} />}
                    {isFormOpen ? 'Bekor qilish' : 'Yangi Maqola'}
                </button>
            </div>

            <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isFormOpen ? 'max-h-[2000px] mb-12 opacity-100' : 'max-h-0 mb-0 opacity-0 pointer-events-none'}`}>
                <div className="glass-card p-8 rounded-[2.5rem] border-2 border-indigo-500/20">
                    <h3 className="text-2xl font-bold font-heading mb-8">{editingId ? '✏️ Maqolani tahrirlash' : '✨ Yangi Maqola'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block">Sarlavha</label>
                                <input className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all" placeholder="Maqola sarlavhasi..." value={form.title} onChange={handleTitleChange} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block">Slug (URL)</label>
                                <input className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all font-mono text-sm" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block">Qisqa ta'rif</label>
                            <input className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all" placeholder="Ro'yxatda ko'rinadigan qisqa tavsif..." value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block">Muqova rasmi</label>
                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                                {form.cover_url ? (
                                    <div className="relative group w-full sm:w-48 h-32 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
                                        <img src={form.cover_url} className="w-full h-full object-cover" alt="Preview" />
                                        <button type="button" onClick={() => setForm(f => ({ ...f, cover_url: '' }))} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                                    </div>
                                ) : (
                                    <label className="w-full sm:w-48 h-32 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 transition-all">
                                        {uploading ? <Loader2 className="animate-spin text-indigo-500" /> : <Upload className="text-gray-400" />}
                                        <span className="text-xs text-gray-500">{uploading ? 'Yuklanmoqda...' : 'Rasm yuklash'}</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                                    </label>
                                )}
                                <div className="flex-1 space-y-2 w-full">
                                    <input className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all text-sm" placeholder="Yoki rasm URL manzilini kiriting..." value={form.cover_url} onChange={e => setForm(f => ({ ...f, cover_url: e.target.value }))} />
                                    <p className="text-[10px] text-gray-400 px-2 italic">Maslahat: Rasm formati .jpg, .png yoki .webp, hajmi 2MB dan oshmasligi tavsiya etiladi.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block">Teglar</label>
                            <div className="flex gap-2">
                                <input className="flex-1 px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all" placeholder="Teg qo'shing (Enter)" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} />
                                <button type="button" onClick={addTag} className="p-4 bg-gray-100 dark:bg-white/5 rounded-2xl hover:text-indigo-500 transition-colors"><Tag size={20} /></button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {form.tags.map(t => (
                                    <span key={t} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold flex items-center gap-1">#{t} <X size={12} className="cursor-pointer" onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))} /></span>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block">Maqola matni</label>
                            <textarea className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all font-mono text-sm resize-none" placeholder="To'liq maqola matni..." rows="12" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required />
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div onClick={() => setForm(f => ({ ...f, published: !f.published }))} className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${form.published ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
                                    <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${form.published ? 'translate-x-6' : 'translate-x-0'}`}></span>
                                </div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">{form.published ? '🟢 Nashr etilgan' : '⚫ Qoralama'}</span>
                            </label>
                            <button disabled={saving} className="btn btn-primary px-8 py-4 rounded-2xl shadow-glow disabled:opacity-50">
                                {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                                {saving ? 'Saqlanmoqda...' : (editingId ? 'Yangilash' : 'Saqlash')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {blogs.length === 0 ? (
                <div className="glass-card p-20 rounded-[3rem] text-center flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex-center text-gray-400 mb-6"><FileText size={40} /></div>
                    <h3 className="text-2xl font-bold font-heading">Hali maqolalar yo'q</h3>
                    <p className="text-gray-500 mt-2">Birinchi maqolangizni yozing!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {blogs.map(blog => (
                        <div key={blog.id} className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-white/5">
                            {blog.cover_url && <img src={blog.cover_url} alt={blog.title} className="w-full sm:w-24 h-20 object-cover rounded-xl flex-shrink-0" />}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${blog.published ? 'bg-green-100 dark:bg-green-500/10 text-green-600' : 'bg-gray-100 dark:bg-white/5 text-gray-500'}`}>{blog.published ? '✓ Nashr' : 'Qoralama'}</span>
                                    <span className="text-xs text-gray-400">{new Date(blog.created_at).toLocaleDateString('uz-UZ')}</span>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white truncate">{blog.title}</h4>
                                {blog.excerpt && <p className="text-sm text-gray-500 truncate mt-0.5">{blog.excerpt}</p>}
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {(blog.tags || []).map(t => <span key={t} className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded text-[10px] font-bold">#{t}</span>)}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button onClick={() => togglePublish(blog)} className={`p-2.5 rounded-xl transition-all ${blog.published ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>{blog.published ? <Eye size={18} /> : <EyeOff size={18} />}</button>
                                <button onClick={() => openEdit(blog)} className="p-2.5 rounded-xl text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all"><Edit3 size={18} /></button>
                                <button onClick={() => handleDelete(blog.id)} className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogsManager;
