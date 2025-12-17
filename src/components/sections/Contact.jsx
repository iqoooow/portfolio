import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const { lang } = useLanguage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        const { error } = await supabase.from('messages').insert([formData]);

        if (!error) {
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSuccess(false), 3000);
        } else {
            alert('Failed to send message: ' + error.message);
        }
        setSending(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <section id="contact" className="section-padding">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-16">
                    <div data-aos="fade-right">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
                            {lang === 'uz' ? 'Keling, ' : "Let's "}
                            <span className="gradient-text">
                                {lang === 'uz' ? 'bog‘lanamiz' : 'Connect'}
                            </span>
                        </h2>
                        <p className="text-lg text-muted mb-10">
                            {lang === 'uz'
                                ? 'Loyihangiz bormi? Keyingi katta g‘oyangizni birga qurishni xohlaysizmi?'
                                : 'Have a project in mind? Looking for a partner to build your next big idea?'}
                        </p>
                        {/* Static contact info for now - could be dynamic via profile too */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex-center text-indigo-600 dark:text-indigo-400">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted">
                                        {lang === 'uz' ? 'Menga email yozing' : 'Email Me'}
                                    </p>
                                    <h4 className="font-bold text-lg">ixashix7@gmail.com</h4>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex-center text-indigo-600 dark:text-indigo-400">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted">
                                        {lang === 'uz' ? 'Menga qo‘ng‘iroq qiling' : 'Call Me'}
                                    </p>
                                    <a href="tel:+998955801600" className="font-bold text-lg hover:text-indigo-500 transition-colors">+998955801600</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex-center text-indigo-600 dark:text-indigo-400">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted">Telegram</p>
                                    <a href="https://t.me/iqooow" target="_blank" rel="noopener noreferrer" className="font-bold text-lg hover:text-indigo-500 transition-colors">@iqooow</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div data-aos="fade-left">
                        <form className="glass p-8 rounded-3xl space-y-6" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1">
                                        {lang === 'uz' ? 'Ism' : 'Name'}
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1">
                                        {lang === 'uz' ? 'Email' : 'Email'}
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">
                                    {lang === 'uz' ? 'Mavzu' : 'Subject'}
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">
                                    {lang === 'uz' ? 'Xabar' : 'Message'}
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none font-medium"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" disabled={sending} className="btn btn-primary w-full justify-center">
                                {sending
                                    ? lang === 'uz'
                                        ? 'Yuborilmoqda...'
                                        : 'Sending...'
                                    : success
                                        ? lang === 'uz'
                                            ? 'Xabar yuborildi!'
                                            : 'Message Sent!'
                                        : lang === 'uz'
                                            ? 'Xabar yuborish'
                                            : 'Send Message'}{' '}
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
