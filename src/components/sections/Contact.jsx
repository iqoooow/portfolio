import { Mail, Phone, MessageCircle, Send, MapPin, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';
import { staggerContainer, staggerItem } from '../../lib/animations';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null); // null | 'success' | 'error'
    const { lang } = useLanguage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setStatus(null);
        
        // Anti-Gravity detail: Simulate slight delay for better UX feeling if DB is too fast
        const minWait = new Promise(resolve => setTimeout(resolve, 800));
        const dbReq = supabase.from('messages').insert([formData]);
        
        const [_, { error }] = await Promise.all([minWait, dbReq]);

        if (!error) {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus(null), 5000);
        } else {
            setStatus('error');
            setTimeout(() => setStatus(null), 5000);
        }
        setSending(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-5 gap-16 lg:gap-24 items-center">
                    
                    {/* Info Column */}
                    <motion.div 
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-6 border border-indigo-100 dark:border-indigo-500/20">
                            👋 {lang === 'uz' ? 'Salom Deng' : 'Say Hello'}
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-gray-900 dark:text-white">
                            {lang === 'uz' ? 'Keling, ' : "Let's "}
                            <span className="gradient-text">
                                {lang === 'uz' ? 'Bog‘lanamiz' : 'Work Together'}
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                            {lang === 'uz'
                                ? 'Yangi loyihangiz bormi yoki shunchaki savollaringiz bormi? Men bilan istalgan vaqtda bog‘lanishingiz mumkin.'
                                : 'Have a project in mind, a question, or just want to say hi? My inbox is always open.'}
                        </p>
                        
                        <div className="space-y-8">
                            <a href="mailto:ixashix7@gmail.com" className="flex items-center gap-6 group p-4 -ml-4 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-colors">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform group-hover:bg-indigo-500 group-hover:text-white shadow-sm border border-indigo-100 dark:border-indigo-500/20">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        {lang === 'uz' ? 'Email' : 'Email'}
                                    </p>
                                    <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">ixashix7@gmail.com</h4>
                                </div>
                            </a>
                            
                            <a href="tel:+998955801600" className="flex items-center gap-6 group p-4 -ml-4 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-colors">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform group-hover:bg-indigo-500 group-hover:text-white shadow-sm border border-indigo-100 dark:border-indigo-500/20">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        {lang === 'uz' ? 'Telefon' : 'Phone'}
                                    </p>
                                    <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">+998 95 580 16 00</h4>
                                </div>
                            </a>
                            
                            <a href="https://t.me/iqooow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group p-4 -ml-4 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-colors">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform group-hover:bg-indigo-500 group-hover:text-white shadow-sm border border-indigo-100 dark:border-indigo-500/20">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        Telegram
                                    </p>
                                    <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">@iqooow</h4>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                    {/* Form Column */}
                    <motion.div 
                        className="lg:col-span-3"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="glass-card p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
                            {/* Success Overlay */}
                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div 
                                        className="absolute inset-0 z-20 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md flex-center flex-col rounded-[2.5rem]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <motion.div 
                                            className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-500/20 text-green-500 flex-center mb-6"
                                            initial={{ scale: 0.5 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                        >
                                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        </motion.div>
                                        <h3 className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-2">
                                            {lang === 'uz' ? 'Xabar Yuborildi!' : 'Message Sent!'}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {lang === 'uz' ? 'Tez orada siz bilan bog‘lanaman.' : "I'll get back to you shortly."}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2 group">
                                        <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block group-focus-within:text-indigo-500 transition-colors">
                                            {lang === 'uz' ? 'Ismingiz' : 'Your Name'}
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-gray-900 dark:text-white placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block group-focus-within:text-indigo-500 transition-colors">
                                            {lang === 'uz' ? 'Email Manzilingiz' : 'Email Address'}
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-gray-900 dark:text-white placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label htmlFor="subject" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block group-focus-within:text-indigo-500 transition-colors">
                                        {lang === 'uz' ? 'Mavzu' : 'Subject'}
                                    </label>
                                    <input
                                        id="subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Project Inquiry"
                                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-gray-900 dark:text-white placeholder-gray-400"
                                        required
                                    />
                                </div>

                                <div className="space-y-2 group">
                                    <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block group-focus-within:text-indigo-500 transition-colors">
                                        {lang === 'uz' ? 'Xabar' : 'Message'}
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project..."
                                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none font-medium text-gray-900 dark:text-white placeholder-gray-400"
                                        required
                                    ></textarea>
                                </div>
                                
                                {status === 'error' && (
                                    <p className="text-red-500 text-sm font-medium px-2">Something went wrong. Please try again.</p>
                                )}

                                <button 
                                    type="submit" 
                                    disabled={sending} 
                                    className={`btn btn-primary w-full py-4 text-base rounded-2xl flex-center gap-2 transition-all ${sending ? 'opacity-80 cursor-wait' : ''}`}
                                >
                                    {sending ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            {lang === 'uz' ? 'Yuborilmoqda...' : 'Sending...'}
                                        </>
                                    ) : (
                                        <>
                                            {lang === 'uz' ? 'Xabar Yuborish' : 'Send Message'}
                                            <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
