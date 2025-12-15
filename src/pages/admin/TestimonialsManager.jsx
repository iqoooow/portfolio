import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus } from 'lucide-react';

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState([]);
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

        if (error) {
            alert(error.message);
            return;
        }

        if (data) setTestimonials(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('testimonials').insert([form]);
        if (error) {
            alert(error.message);
            return;
        }

        setForm({ name: '', role: '', content: '', image_url: '' });
        fetchTestimonials();
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (error) {
            alert(error.message);
            return;
        }
        fetchTestimonials();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Testimonials</h2>

            {/* Create Form */}
            <div className="glass p-6 rounded-2xl mb-8">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Plus size={20} /> Add New Testimonial
                </h3>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                    <input
                        className="p-3 rounded-lg border dark:bg-black/20"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <input
                        className="p-3 rounded-lg border dark:bg-black/20"
                        placeholder="Role (e.g. Product Manager)"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        required
                    />
                    <textarea
                        className="p-3 rounded-lg border dark:bg-black/20 md:col-span-2"
                        placeholder="Testimonial content"
                        rows="3"
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        required
                    />
                    <input
                        className="p-3 rounded-lg border dark:bg-black/20 md:col-span-2"
                        placeholder="Image URL (optional)"
                        value={form.image_url}
                        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    />

                    <button className="btn btn-primary md:col-span-2 justify-center">
                        Add Testimonial
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="space-y-4">
                {testimonials.map((t) => (
                    <div key={t.id} className="glass p-4 rounded-xl flex justify-between items-start gap-4">
                        <div>
                            <p className="text-sm text-muted mb-2">"{t.content}"</p>
                            <div className="font-semibold">
                                {t.name}{' '}
                                <span className="text-xs text-muted">• {t.role}</span>
                            </div>
                            {t.image_url && (
                                <p className="text-xs text-muted mt-1 truncate">
                                    Image: {t.image_url}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => handleDelete(t.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsManager;


