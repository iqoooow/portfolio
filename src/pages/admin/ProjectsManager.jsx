import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Save, ExternalLink, Github, Image, X, Sparkles, Loader2, Link as LinkIcon, Edit3, Database } from 'lucide-react';
import toast from 'react-hot-toast';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [form, setForm] = useState({ title: '', category: '', description: '', image_url: '', repo_link: '', demo_link: '', technologies: [] });
    const [techInput, setTechInput] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (data) setProjects(data);
        setLoading(false);
    };

    const addTech = () => {
        if (!techInput.trim()) return;
        if (!form.technologies.includes(techInput.trim())) {
            setForm({ ...form, technologies: [...form.technologies, techInput.trim()] });
        }
        setTechInput('');
    };

    const removeTech = (tech) => {
        setForm({ ...form, technologies: form.technologies.filter(t => t !== tech) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const { error } = await supabase.from('projects').insert([form]);
        if (!error) {
            setForm({ title: '', category: '', description: '', image_url: '', repo_link: '', demo_link: '', technologies: [] });
            setIsFormOpen(false);
            fetchProjects();
            toast.success('Project forged successfully!');
        } else {
            toast.error(error.message || 'Error forging project');
        }
        setSaving(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Permanently delete this project from portfolio?')) return;
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (!error) {
            toast.success('Project exterminated!');
            fetchProjects();
        } else {
            toast.error(error.message || 'Error deleting project');
        }
    };

    if (loading) return (
        <div className="animate-pulse space-y-6">
            <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="grid md:grid-cols-2 gap-8">
                {[1, 2].map(i => <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 rounded-[2.5rem]"></div>)}
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in max-w-6xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-heading flex items-center gap-3 text-gray-900 dark:text-white">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex-center text-indigo-600 dark:text-indigo-400">
                        <Edit3 size={24} />
                    </div>
                    Portfolio Forge
                </h2>
                <button 
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className={`btn ${isFormOpen ? 'btn-outline border-gray-200 dark:border-white/10' : 'btn-primary'} flex items-center gap-2 px-6 py-3 rounded-2xl shadow-glow`}
                >
                    {isFormOpen ? <X size={20} /> : <Plus size={20} />}
                    {isFormOpen ? 'Close Editor' : 'Forge New Project'}
                </button>
            </div>

            {/* Forge Form */}
            <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isFormOpen ? 'max-h-[1200px] mb-12 opacity-100' : 'max-h-0 mb-0 opacity-0 pointer-events-none'}`}>
                <div className="glass-card p-8 sm:p-12 rounded-[2.5rem] border-2 border-indigo-500/20 shadow-glow-lg">
                    <h3 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3">
                        <Sparkles size={24} className="text-indigo-500" />
                        New Project Specification
                    </h3>
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-2 group">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Project Name</label>
                                <input 
                                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" 
                                    placeholder="e.g. Quantum Analytics Engine" 
                                    value={form.title} 
                                    onChange={e => setForm({ ...form, title: e.target.value })} 
                                    required 
                                />
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Target Category</label>
                                <input 
                                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" 
                                    placeholder="e.g. Fintech Solution" 
                                    value={form.category} 
                                    onChange={e => setForm({ ...form, category: e.target.value })} 
                                    required 
                                />
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Technology Stack</label>
                                <div className="flex gap-2">
                                    <input 
                                        className="flex-1 px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all font-medium" 
                                        placeholder="Add tech (Enter)" 
                                        value={techInput} 
                                        onChange={e => setTechInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                    />
                                    <button type="button" onClick={addTech} className="p-4 bg-gray-100 dark:bg-white/5 rounded-2xl hover:text-indigo-500 transition-colors">
                                        <Plus size={24} />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {form.technologies.map(t => (
                                        <span key={t} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold flex items-center gap-1">
                                            {t} <X size={12} className="cursor-pointer" onClick={() => removeTech(t)} />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2 group">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Cover Artwork (URL)</label>
                                <div className="relative">
                                    <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input 
                                        className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all font-medium" 
                                        placeholder="https://..." 
                                        value={form.image_url} 
                                        onChange={e => setForm({ ...form, image_url: e.target.value })} 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 group">
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Repository</label>
                                    <div className="relative">
                                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all font-medium" 
                                            placeholder="GitHub URL" 
                                            value={form.repo_link} 
                                            onChange={e => setForm({ ...form, repo_link: e.target.value })} 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Live Demo</label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all font-medium" 
                                            placeholder="Live URL" 
                                            value={form.demo_link} 
                                            onChange={e => setForm({ ...form, demo_link: e.target.value })} 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Project Narrative</label>
                                <textarea 
                                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all font-medium resize-none" 
                                    placeholder="Describe the challenges, solutions, and impact..." 
                                    rows="5" 
                                    value={form.description} 
                                    onChange={e => setForm({ ...form, description: e.target.value })} 
                                    required 
                                />
                            </div>
                        </div>

                        <button 
                            disabled={saving}
                            className="btn btn-primary md:col-span-2 py-5 rounded-2xl shadow-glow-lg active:scale-[0.98] disabled:opacity-50 text-lg"
                        >
                            {saving ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
                            {saving ? 'Forging Masterpiece...' : 'Publish Project to Portfolio'}
                        </button>
                    </form>
                </div>
            </div>

            {/* List */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                {projects.length === 0 ? (
                    <div className="md:col-span-2 glass-card p-20 rounded-[3rem] text-center flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex-center text-gray-400 mb-6">
                            <Database size={40} />
                        </div>
                        <h3 className="text-2xl font-bold font-heading">Empty Vault</h3>
                        <p className="text-gray-500 mt-2">No projects have been forged yet.</p>
                    </div>
                ) : (
                    projects.map((p, index) => (
                        <div key={p.id} className="glass-card rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-white/5 flex flex-col">
                            <div className="h-48 relative overflow-hidden bg-gray-100 dark:bg-gray-900 border-b border-gray-100 dark:border-white/5">
                                <img src={p.image_url || 'https://placehold.co/800x400/1a1a1a/ffffff?text=Project'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">{p.category}</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                <button 
                                    onClick={() => handleDelete(p.id)} 
                                    className="absolute top-4 right-4 p-2.5 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                                    title="Exterminate"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h4 className="font-bold text-2xl font-heading text-gray-900 dark:text-white mb-3 group-hover:text-indigo-500 transition-colors">{p.title}</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-6 flex-1 leading-relaxed">{p.description}</p>
                                
                                <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-white/5">
                                    <div className="flex gap-2">
                                        {p.repo_link && <Github size={18} className="text-gray-400" />}
                                        {p.demo_link && <ExternalLink size={18} className="text-gray-400" />}
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Forged {new Date(p.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectsManager;
