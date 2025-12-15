import { Layout, Smartphone, PenTool, Server, Share2, Database, Code } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';

// Map for dynamic icons
const IconMap = {
    Layout, Smartphone, PenTool, Server, Share2, Database, Code
};

const Services = () => {
    const [services, setServices] = useState([]);
    const { lang } = useLanguage();

    const translateTitle = (title) => {
        if (lang === 'uz') {
            // EN -> UZ qo'lda tarjimalar
            if (title === 'Create a Website') return 'Web-sayt yaratish';
            if (title === 'Create a Bot') return 'Bot yaratish';
            if (title === 'Create a Apps' || title === 'Create an App') return 'Ilova yaratish';
        }
        // Standart holatda asl nom
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
        };
        getServices();
    }, []);

    return (
        <section id="services" className="section-padding relative bg-slate-50/50 dark:bg-slate-900/50">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        {lang === 'uz' ? 'Mening ' : 'My '}
                        <span className="gradient-text">
                            {lang === 'uz' ? 'xizmatlarim' : 'Services'}
                        </span>
                    </h2>
                    <p className="text-muted">
                        {lang === 'uz'
                            ? 'Sizning ehtiyojlaringizga mos yuqori sifatli xizmatlar.'
                            : 'High-quality services tailored to your needs.'}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.length === 0 ? (
                        <p className="col-span-3 text-center text-muted">
                            {lang === 'uz' ? 'Xizmatlar hali qo‘shilmagan.' : 'No services added yet.'}
                        </p>
                    ) : (
                        services.map((service, index) => {
                            const Icon = IconMap[service.icon] || Code;
                            return (
                                <div
                                    key={service.id}
                                    className="glass p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="w-14 h-14 rounded-xl glass flex-center mb-6 group-hover:scale-110 transition-transform text-indigo-500">
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">
                                        {translateTitle(service.title)}
                                    </h3>
                                    <p className="text-muted text-sm leading-relaxed">
                                        {translateDescription(service.description)}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
};

export default Services;
