import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Code, Globe, Server, Database, Boxes } from 'lucide-react';

const SkillsManager = () => {
    const [skills, setSkills] = useState([]);
    const [form, setForm] = useState({ name: '', percentage: 50, icon: 'Code' });

    // Available icons for selection
    const icons = ['Code', 'Globe', 'Server', 'Database', 'Boxes'];

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        const { data } = await supabase.from('skills').select('*').order('percentage', { ascending: false });
        if (data) setSkills(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('skills').insert([form]);
        if (!error) {
            setForm({ name: '', percentage: 50, icon: 'Code' });
            fetchSkills();
        } else {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        await supabase.from('skills').delete().eq('id', id);
        fetchSkills();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Skills</h2>

            {/* Create Form */}
            <div className="glass p-6 rounded-2xl mb-8">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Plus size={20} /> Add New Skill</h3>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4">
                    <input className="p-3 rounded-lg border dark:bg-black/20 md:col-span-2" placeholder="Skill Name (e.g. React)" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />

                    <div className="flex items-center gap-2">
                        <input type="range" min="0" max="100" value={form.percentage} onChange={e => setForm({ ...form, percentage: e.target.value })} className="flex-1" />
                        <span className="w-12 text-center">{form.percentage}%</span>
                    </div>

                    <select className="p-3 rounded-lg border dark:bg-black/20" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}>
                        {icons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                    </select>

                    <button className="btn btn-primary md:col-span-4 justify-center">Add Skill</button>
                </form>
            </div>

            {/* List */}
            <div className="grid md:grid-cols-2 gap-4">
                {skills.map(s => (
                    <div key={s.id} className="glass p-4 rounded-xl flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="font-bold text-lg text-indigo-500">{s.percentage}%</div>
                            <div>
                                <h4 className="font-bold">{s.name}</h4>
                                <p className="text-xs text-muted">Icon: {s.icon}</p>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(s.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20} /></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsManager;
