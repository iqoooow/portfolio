import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Save } from 'lucide-react';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ title: '', category: '', description: '', image_url: '', repo_link: '', demo_link: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (data) setProjects(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('projects').insert([form]);
        if (!error) {
            setForm({ title: '', category: '', description: '', image_url: '', repo_link: '', demo_link: '' });
            fetchProjects();
        } else {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        await supabase.from('projects').delete().eq('id', id);
        fetchProjects();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>

            {/* Create Form */}
            <div className="glass p-6 rounded-2xl mb-8">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Plus size={20} /> Add New Project</h3>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                    <input className="p-3 rounded-lg border dark:bg-black/20" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                    <input className="p-3 rounded-lg border dark:bg-black/20" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
                    <input className="p-3 rounded-lg border dark:bg-black/20" placeholder="Image URL" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} />
                    <input className="p-3 rounded-lg border dark:bg-black/20" placeholder="Repo Link" value={form.repo_link} onChange={e => setForm({ ...form, repo_link: e.target.value })} />
                    <input className="p-3 rounded-lg border dark:bg-black/20" placeholder="Demo Link" value={form.demo_link} onChange={e => setForm({ ...form, demo_link: e.target.value })} />
                    <textarea className="p-3 rounded-lg border dark:bg-black/20 md:col-span-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />

                    <button className="btn btn-primary md:col-span-2 justify-center">Add Project</button>
                </form>
            </div>

            {/* List */}
            <div className="grid gap-4">
                {projects.map(p => (
                    <div key={p.id} className="glass p-4 rounded-xl flex justify-between items-center">
                        <div>
                            <h4 className="font-bold">{p.title}</h4>
                            <p className="text-sm text-muted">{p.category}</p>
                        </div>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20} /></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsManager;
