import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Quote, Star, User, Loader2, Save, X, Sparkles } from 'lucide-react';

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [form, setForm] = useState({
        name: '',
        role: '',
        content: '',
        image_url: '',
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) setTestimonials(data);
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const { error } = await supabase.from('testimonials').insert([form]);
        if (!error) {
            setForm({ name: '', role: '', content: '', image_url: '' });
            setIsFormOpen(false);
            fetchTestimonials();
        } else {
            alert(error.message);
        }
        setSaving(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Exterminate this testimonial?')) return;
        await supabase.from('testimonials').delete().eq('id', id);
        fetchTestimonials();
    };

    if (loading) return (
        <div className="animate-pulse space-y-6">
            <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>)}
        </div>
    );

    return (
        <div className="animate-fade-in max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-heading flex items-center gap-3 text-gray-900 dark:text-white">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex-center text-indigo-600 dark:text-indigo-400">
                        <Quote size={24} />
                    </div>
                    Client Voices
                </h2>
                <button 
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className={`btn ${isFormOpen ? 'btn-outline border-gray-200 dark:border-white/10' : 'btn-primary'} flex items-center gap-2 px-6 py-3 rounded-2xl shadow-glow`}
                >
                    {isFormOpen ? <X size={20} /> : <Plus size={20} />}
                    {isFormOpen ? 'Cancel' : 'Add New Story'}
                </button>
            </div>

            {/* Create Form */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isFormOpen ? 'max-h-[700px] mb-12 opacity-100' : 'max-h-0 mb-0 opacity-0 pointer-events-none'}`}>
                <div className="glass-card p-8 rounded-[2.5rem] border-2 border-indigo-500/20 shadow-glow-lg">
                    <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
                        <Sparkles size={20} className="text-indigo-500" />
                        New Testimonial Specification
                    </h3>
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Client Name</label>
                            <input
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                placeholder="e.g. Sarah Jenkins"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Professional Role</label>
                            <input
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                placeholder="e.g. CEO at TechFlow"
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                required
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2 group">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Testimonial Content</label>
                            <textarea
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium resize-none"
                                placeholder="Paste the glowing feedback here..."
                                rows="4"
                                value={form.content}
                                onChange={(e) => setForm({ ...form, content: e.target.value })}
                                required
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2 group">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Avatar URL (Optional)</label>
                            <input
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                placeholder="https://..."
                                value={form.image_url}
                                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                            />
                        </div>

                        <button 
                            disabled={saving}
                            className="btn btn-primary md:col-span-2 py-4 rounded-2xl shadow-glow active:scale-[0.98] disabled:opacity-50"
                        >
                            {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                            {saving ? 'Recording Voice...' : 'Publish Testimonial'}
                        </button>
                    </form>
                </div>
            </div>

            {/* List */}
            <div className="space-y-6">
                {testimonials.length === 0 ? (
                    <div className="glass-card p-20 rounded-[3rem] text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex-center text-gray-400 mb-6">
                            <Quote size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-heading">No Voices Recorded</h3>
                        <p className="text-gray-500 mt-2">Waiting for that first five-star review...</p>
                    </div>
                ) : (
                    testimonials.map((t) => (
                        <div key={t.id} className="glass-card p-8 rounded-[2rem] group hover:border-indigo-500/30 transition-all duration-500 relative">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="relative w-16 h-16">
                                        <div className="absolute inset-0 bg-indigo-500 rounded-2xl blur-sm opacity-20"></div>
                                        {t.image_url ? (
                                            <img src={t.image_url} alt={t.name} className="relative w-full h-full rounded-2xl object-cover border border-white/20" />
                                        ) : (
                                            <div className="relative w-full h-full rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex-center text-indigo-500 border border-white/20">
                                                <User size={30} />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex gap-1 mb-1">
                                            {[1, 2, 3, 4, 5].map(star => <Star key={star} size={12} className="fill-amber-400 text-amber-400" />)}
                                        </div>
                                        <h4 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors">{t.name}</h4>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">{t.role}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <div className="mt-6 p-5 bg-gray-50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5 italic text-gray-600 dark:text-gray-400 leading-relaxed relative">
                                <Quote className="absolute -top-3 -left-2 text-indigo-500/10" size={40} />
                                "{t.content}"
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TestimonialsManager;
