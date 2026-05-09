import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Layout, Smartphone, PenTool, Server, Share2, Database, Code, Sparkles, Loader2, Save, X, ArrowUpRight } from 'lucide-react';

const IconMap = {
    Layout, Smartphone, PenTool, Server, Share2, Database, Code
};

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [form, setForm] = useState({ title: '', description: '', icon: 'Code' });

    const icons = Object.keys(IconMap);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const { data } = await supabase.from('services').select('*').order('created_at', { ascending: false });
        if (data) setServices(data);
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const { error } = await supabase.from('services').insert([form]);
        if (!error) {
            setForm({ title: '', description: '', icon: 'Code' });
            setIsFormOpen(false);
            fetchServices();
        } else {
            alert(error.message);
        }
        setSaving(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Permanently decommission this service?')) return;
        await supabase.from('services').delete().eq('id', id);
        fetchServices();
    };

    if (loading) return (
        <div className="animate-pulse space-y-6">
            <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="grid md:grid-cols-2 gap-6">
                {[1, 2].map(i => <div key={i} className="h-40 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>)}
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-heading flex items-center gap-3 text-gray-900 dark:text-white">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex-center text-indigo-600 dark:text-indigo-400">
                        <Layout size={24} />
                    </div>
                    Service Catalog
                </h2>
                <button 
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className={`btn ${isFormOpen ? 'btn-outline border-gray-200 dark:border-white/10' : 'btn-primary'} flex items-center gap-2 px-6 py-3 rounded-2xl shadow-glow`}
                >
                    {isFormOpen ? <X size={20} /> : <Plus size={20} />}
                    {isFormOpen ? 'Cancel' : 'Add New Service'}
                </button>
            </div>

            {/* Create Form */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isFormOpen ? 'max-h-[600px] mb-12 opacity-100' : 'max-h-0 mb-0 opacity-0'}`}>
                <div className="glass-card p-8 rounded-[2rem] border-2 border-indigo-500/20 shadow-glow-lg">
                    <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
                        <Sparkles size={20} className="text-indigo-500" />
                        Offer New Solution
                    </h3>
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Service Title</label>
                            <input 
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" 
                                placeholder="e.g. Cloud Infrastructure" 
                                value={form.title} 
                                onChange={e => setForm({ ...form, title: e.target.value })} 
                                required 
                            />
                        </div>

                        <div className="space-y-2 group">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Service Icon</label>
                            <select 
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all font-medium appearance-none" 
                                value={form.icon} 
                                onChange={e => setForm({ ...form, icon: e.target.value })}
                            >
                                {icons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                            </select>
                        </div>

                        <div className="md:col-span-2 space-y-2 group">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Value Proposition / Description</label>
                            <textarea 
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium resize-none" 
                                placeholder="Explain what makes this service world-class..." 
                                rows="3" 
                                value={form.description} 
                                onChange={e => setForm({ ...form, description: e.target.value })} 
                                required 
                            />
                        </div>

                        <button 
                            disabled={saving}
                            className="btn btn-primary md:col-span-2 py-4 rounded-2xl shadow-glow active:scale-[0.98] disabled:opacity-50"
                        >
                            {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                            {saving ? 'Deploying Service...' : 'Activate New Service Offering'}
                        </button>
                    </form>
                </div>
            </div>

            {/* List */}
            <div className="grid md:grid-cols-2 gap-6">
                {services.length === 0 ? (
                    <div className="md:col-span-2 glass-card p-16 rounded-[2.5rem] text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex-center text-gray-400 mb-6">
                            <Layout size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-heading">No Services Configured</h3>
                        <p className="text-gray-500 mt-2">Ready to offer your first solution?</p>
                    </div>
                ) : (
                    services.map((s, index) => {
                        const Icon = IconMap[s.icon] || Code;
                        return (
                            <div key={s.id} className="glass-card p-8 rounded-[2rem] group hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                                    <ArrowUpRight size={20} className="text-indigo-400" />
                                </div>
                                
                                <div className="flex items-start gap-6 relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex-center border border-gray-100 dark:border-white/5 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                                        <Icon size={30} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors mb-2">{s.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{s.description}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(s.id)} 
                                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                                        title="Remove"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ServicesManager;
