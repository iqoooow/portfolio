import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Mail, Calendar, User } from 'lucide-react';

const MessagesManager = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const { data } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setMessages(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        const { error } = await supabase.from('messages').delete().eq('id', id);

        if (error) {
            alert('Error deleting message');
        } else {
            fetchMessages(); // Refresh list
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div className="p-10">Loading messages...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Mail className="text-indigo-500" /> Messages Inbox
            </h2>

            {messages.length === 0 ? (
                <div className="glass p-10 rounded-2xl text-center text-muted">
                    <p>No messages received yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className="glass p-6 rounded-2xl hover:shadow-lg transition-all relative group">
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex-center text-indigo-600 dark:text-indigo-400">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{msg.name}</h3>
                                        <a href={`mailto:${msg.email}`} className="text-sm text-indigo-500 hover:underline">
                                            {msg.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-muted">
                                    <Calendar size={14} />
                                    {formatDate(msg.created_at)}
                                </div>
                            </div>

                            <div className="pl-13">
                                <h4 className="font-semibold mb-2">{msg.subject || 'No Subject'}</h4>
                                <p className="text-muted leading-relaxed whitespace-pre-wrap bg-white/50 dark:bg-black/20 p-4 rounded-xl">
                                    {msg.message}
                                </p>
                            </div>

                            <button
                                onClick={() => handleDelete(msg.id)}
                                className="absolute top-4 right-4 p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete Message"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MessagesManager;
