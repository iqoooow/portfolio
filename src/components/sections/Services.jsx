import { Layout as LayoutIcon, Smartphone, PenTool, Server, Share2, Database, Code, Sparkles, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';
import { staggerContainer, staggerItem } from '../../lib/animations';

const IconMap = {
    Layout: LayoutIcon, Smartphone, PenTool, Server, Share2, Database, Code
};

const Services = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { lang } = useLanguage();

    const translateTitle = (title) => {
        if (lang === 'uz') {
            if (title === 'Create a Website') return 'Veb-sayt Yaratish';
            if (title === 'Create a Bot') return 'Telegram Bot Yaratish';
            if (title === 'Create a Apps' || title === 'Create an App') return 'Ilova Yaratish';
        }
        return title;
    };

    const translateDescription = (description) => {
        if (lang === 'en') {
            if (description.startsWith('Biznesingiz uchun professional web saytlar yaratamiz.')) {
                return 'We build professional business websites: responsive, fast, and user-friendly design.';
            }
            if (description.startsWith('Telegram botlar yaratamiz')) {
                return 'We create Telegram bots for order handling, auto-replies, payment integrations, and powerful admin panels.';
            }
            if (description.startsWith('Biznesingiz uchun professional mobil ilovalar.')) {
                return 'Professional mobile apps for your business with great performance, beautiful UI and user-friendly experience.';
            }
        }
        return description;
    };

    useEffect(() => {
        const getServices = async () => {
            const { data } = await supabase.from('services').select('*');
            if (data) setServices(data);
            setIsLoading(false);
        };
        getServices();
    }, []);

    return (
        <section id="services" className="section-padding relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent"></div>
            
            <div className="container">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 text-xs font-semibold text-gray-600 dark:text-gray-300 mb-6 border border-gray-200 dark:border-white/10 shadow-sm">
                        <Sparkles size={14} className="text-indigo-500" /> 
                        {lang === 'uz' ? 'Mening tajribam' : 'My Expertise'}
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-gray-900 dark:text-white">
                        {lang === 'uz' ? 'Qanday ' : 'What '}
                        <span className="gradient-text">
                            {lang === 'uz' ? 'Yordam Bera Olaman' : 'I Do Best'}
                        </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        {lang === 'uz'
                            ? 'Loyiha g‘oyasidan boshlab, to‘liq ishga tushirishgacha bo‘lgan barcha bosqichlarda sizga eng zamonaviy yechimlarni taqdim etaman.'
                            : 'From initial concept to flawless execution, I deliver cutting-edge solutions designed to elevate your digital presence.'}
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-3xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {services.length === 0 ? (
                            <p className="col-span-3 text-center text-gray-500">
                                {lang === 'uz' ? 'Xizmatlar hali qo‘shilmagan.' : 'No services added yet.'}
                            </p>
                        ) : (
                            services.map((service, index) => {
                                const Icon = IconMap[service.icon] || Code;
                                return (
                                    <motion.div
                                        key={service.id}
                                        variants={staggerItem}
                                        className="glass-card p-8 sm:p-10 rounded-[2rem] group relative overflow-hidden bg-white dark:bg-[#0a0a0a]"
                                    >
                                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                                            <ArrowUpRight size={24} className="text-indigo-400" />
                                        </div>
                                        
                                        <div className="relative z-10">
                                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex-center mb-8 text-indigo-600 dark:text-indigo-400 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-indigo-500 group-hover:text-white shadow-sm border border-indigo-100 dark:border-indigo-500/20">
                                                <Icon size={32} />
                                            </div>
                                            
                                            <h3 className="text-2xl font-bold font-heading mb-4 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {translateTitle(service.title)}
                                            </h3>
                                            
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base transition-colors group-hover:text-gray-900 dark:group-hover:text-gray-300">
                                                {translateDescription(service.description)}
                                            </p>
                                        </div>
                                        
                                        {/* Hover Gradient Background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"></div>
                                    </motion.div>
                                );
                            })
                        )}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Services;
