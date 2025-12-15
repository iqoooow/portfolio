import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Layout, Smartphone, PenTool, Server, Share2, Database, Code } from 'lucide-react';

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', icon: 'Code' });

    const icons = ['Layout', 'Smartphone', 'PenTool', 'Server', 'Share2', 'Database', 'Code'];

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const { data } = await supabase.from('services').select('*').order('created_at', { ascending: false });
        if (data) setServices(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('services').insert([form]);
        if (!error) {
            setForm({ title: '', description: '', icon: 'Code' });
            fetchServices();
        } else {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        await supabase.from('services').delete().eq('id', id);
        fetchServices();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Services</h2>

            {/* Create Form */}
            <div className="glass p-6 rounded-2xl mb-8">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Plus size={20} /> Add New Service</h3>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                    <input className="p-3 rounded-lg border dark:bg-black/20" placeholder="Service Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />

                    <select className="p-3 rounded-lg border dark:bg-black/20" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}>
                        {icons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                    </select>

                    <textarea className="p-3 rounded-lg border dark:bg-black/20 md:col-span-2" placeholder="Description" rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />

                    <button className="btn btn-primary md:col-span-2 justify-center">Add Service</button>
                </form>
            </div>

            {/* List */}
            <div className="grid md:grid-cols-2 gap-4">
                {services.map(s => (
                    <div key={s.id} className="glass p-4 rounded-xl flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div>
                                <h4 className="font-bold">{s.title}</h4>
                                <p className="text-xs text-muted flex items-center gap-1"><Code size={12} /> {s.icon}</p>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(s.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20} /></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesManager;
