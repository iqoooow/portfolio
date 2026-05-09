import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Code, Globe, Server, Database, Boxes, Sparkles, Loader2, Save, X } from 'lucide-react';

const IconMap = {
    Code: Code,
    Globe: Globe,
    Server: Server,
    Database: Database,
    Boxes: Boxes
};

const SkillsManager = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ name: '', percentage: 50, icon: 'Code' });
    const [isFormOpen, setIsFormOpen] = useState(false);

    const icons = Object.keys(IconMap);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        const { data } = await supabase.from('skills').select('*').order('percentage', { ascending: false });
        if (data) setSkills(data);
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const { error } = await supabase.from('skills').insert([form]);
        if (!error) {
            setForm({ name: '', percentage: 50, icon: 'Code' });
            setIsFormOpen(false);
            fetchSkills();
        } else {
            alert(error.message);
        }
        setSaving(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Permanently remove this skill?')) return;
        await supabase.from('skills').delete().eq('id', id);
        fetchSkills();
    };

    if (loading) return (
        <div className="animate-pulse space-y-6">
            <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="grid md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>)}
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-heading flex items-center gap-3 text-gray-900 dark:text-white">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex-center text-indigo-600 dark:text-indigo-400">
                        <Code size={24} />
                    </div>
                    Skill Arsenal
                </h2>
                <button 
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className={`btn ${isFormOpen ? 'btn-outline border-gray-200 dark:border-white/10' : 'btn-primary'} flex items-center gap-2 px-6 py-3 rounded-2xl shadow-glow`}
                >
                    {isFormOpen ? <X size={20} /> : <Plus size={20} />}
                    {isFormOpen ? 'Cancel' : 'Add New Skill'}
                </button>
            </div>

            {/* Create Form */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isFormOpen ? 'max-h-[500px] mb-12 opacity-100' : 'max-h-0 mb-0 opacity-0'}`}>
                <div className="glass-card p-8 rounded-[2rem] border-2 border-indigo-500/20 shadow-glow-lg">
                    <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
                        <Sparkles size={20} className="text-indigo-500" />
                        Define New Skill
                    </h3>
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-6 items-end">
                        <div className="md:col-span-2 space-y-2 group">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Skill Name</label>
                            <input 
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" 
                                placeholder="e.g. Next.js Architecture" 
                                value={form.name} 
                                onChange={e => setForm({ ...form, name: e.target.value })} 
                                required 
                            />
                        </div>

                        <div className="space-y-2 group">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Proficiency ({form.percentage}%)</label>
                            <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10">
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={form.percentage} 
                                    onChange={e => setForm({ ...form, percentage: parseInt(e.target.value) })} 
                                    className="flex-1 accent-indigo-500" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1 block group-focus-within:text-indigo-500">Visual Icon</label>
                            <select 
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all font-medium appearance-none" 
                                value={form.icon} 
                                onChange={e => setForm({ ...form, icon: e.target.value })}
                            >
                                {icons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                            </select>
                        </div>

                        <button 
                            disabled={saving}
                            className="btn btn-primary md:col-span-4 py-4 rounded-2xl shadow-glow active:scale-[0.98] disabled:opacity-50"
                        >
                            {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                            {saving ? 'Registering Skill...' : 'Save Skill to Arsenal'}
                        </button>
                    </form>
                </div>
            </div>

            {/* List */}
            <div className="grid md:grid-cols-2 gap-6">
                {skills.length === 0 ? (
                    <div className="md:col-span-2 glass-card p-12 rounded-[2.5rem] text-center">
                        <p className="text-gray-500 text-lg">No skills added yet. Start building your arsenal!</p>
                    </div>
                ) : (
                    skills.map((s, index) => {
                        const Icon = IconMap[s.icon] || Code;
                        return (
                            <div key={s.id} className="glass-card p-6 rounded-[2rem] flex justify-between items-center group hover:border-indigo-500/30 transition-all duration-300">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex-center flex-col border border-gray-100 dark:border-white/5 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                                        <Icon size={24} className="mb-0.5" />
                                        <span className="text-[10px] font-bold opacity-80">{s.percentage}%</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors">{s.name}</h4>
                                        <div className="w-32 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                                            <div 
                                                className="h-full bg-indigo-500 rounded-full" 
                                                style={{ width: `${s.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDelete(s.id)} 
                                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                    title="Remove"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default SkillsManager;
