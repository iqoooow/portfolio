import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Mail, Calendar, User, CheckSquare, Square, Trash, MailOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const MessagesManager = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState(new Set());

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
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
        if (!error) {
            setMessages(messages.filter(m => m.id !== id));
            setSelectedIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
            toast.success('Message deleted');
        } else {
            toast.error(error.message || 'Failed to delete message');
        }
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${selectedIds.size} messages?`)) return;
        
        const idsToDelete = Array.from(selectedIds);
        const { error } = await supabase.from('messages').delete().in('id', idsToDelete);
        
        if (!error) {
            setMessages(messages.filter(m => !selectedIds.has(m.id)));
            setSelectedIds(new Set());
            toast.success(`${idsToDelete.length} messages deleted`);
        } else {
            toast.error(error.message || 'Failed to delete messages');
        }
    };

    const toggleSelection = (id) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const toggleAll = () => {
        if (selectedIds.size === messages.length) setSelectedIds(new Set());
        else setSelectedIds(new Set(messages.map(m => m.id)));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    if (loading) return (
        <div className="animate-pulse space-y-4">
            <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>)}
        </div>
    );

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-heading flex items-center gap-3 text-gray-900 dark:text-white">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex-center text-indigo-600 dark:text-indigo-400">
                        <Mail size={24} />
                    </div>
                    Inbox
                </h2>
                
                {selectedIds.size > 0 && (
                    <button 
                        onClick={handleBulkDelete}
                        className="btn bg-red-50 dark:bg-red-500/10 text-red-600 hover:bg-red-100 dark:hover:bg-red-500/20 px-4 py-2 rounded-xl text-sm border border-red-200 dark:border-red-500/20"
                    >
                        <Trash size={16} /> Delete Selected ({selectedIds.size})
                    </button>
                )}
            </div>

            {messages.length === 0 ? (
                <div className="glass-card p-16 rounded-[2rem] text-center flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex-center text-gray-400 mb-6">
                        <MailOpen size={40} />
                    </div>
                    <h3 className="text-2xl font-bold font-heading mb-2">Inbox Zero</h3>
                    <p className="text-gray-500">You're all caught up! No new messages.</p>
                </div>
            ) : (
                <div className="glass-card rounded-[2rem] overflow-hidden">
                    <div className="bg-gray-50 dark:bg-[#0a0a0a] p-4 border-b border-gray-200 dark:border-white/5 flex items-center gap-4">
                        <button onClick={toggleAll} className="text-gray-400 hover:text-indigo-500 transition-colors">
                            {selectedIds.size === messages.length ? <CheckSquare size={20} className="text-indigo-500" /> : <Square size={20} />}
                        </button>
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Select All</span>
                    </div>

                    <div className="divide-y divide-gray-100 dark:divide-white/5">
                        {messages.map((msg) => {
                            const isSelected = selectedIds.has(msg.id);
                            return (
                                <div key={msg.id} className={`p-6 transition-colors relative group ${isSelected ? 'bg-indigo-50/50 dark:bg-indigo-500/5' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                                    <div className="flex gap-4">
                                        <button onClick={() => toggleSelection(msg.id)} className="mt-1 text-gray-300 dark:text-gray-600 hover:text-indigo-500 transition-colors">
                                            {isSelected ? <CheckSquare size={20} className="text-indigo-500" /> : <Square size={20} />}
                                        </button>
                                        
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{msg.name}</h3>
                                                    <a href={`mailto:${msg.email}`} className="text-sm text-indigo-500 hover:underline bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full">
                                                        {msg.email}
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                                                    <Calendar size={12} /> {formatDate(msg.created_at)}
                                                </div>
                                            </div>

                                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{msg.subject || 'No Subject'}</h4>
                                            
                                            <div className="bg-white dark:bg-[#050505] border border-gray-100 dark:border-white/5 p-4 rounded-xl text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap text-sm shadow-sm">
                                                {msg.message}
                                            </div>
                                        </div>

                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                                            <button
                                                onClick={() => handleDelete(msg.id)}
                                                className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagesManager;
