import { ArrowRight, Download, Code, Terminal, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';

const Hero = () => {
    const [profile, setProfile] = useState(null);
    const { lang } = useLanguage();

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        const { data } = await supabase.from('profile').select('*').single();
        if (data) setProfile(data);
    };

    if (!profile) return (
        // Loading State
        <section id="home" className="min-h-screen flex items-center pt-10 relative overflow-hidden">
            <div className="container flex-center">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        </section>
    );

    return (
        <section id="home" className="min-h-screen flex items-center pt-10 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="container grid md:grid-cols-2 gap-10 items-center">
                {/* Text Content */}
                <div className="order-2 md:order-1" data-aos="fade-right">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-6">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                        </span>
                        {lang === 'uz' ? 'Freelance uchun ochiqman' : 'Available for Freelance'}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                        {lang === 'uz' ? "Salom, men " : "Hi, I'm "}
                        <span className="gradient-text">{profile.full_name}</span>
                        <br />
                        <span className="text-4xl md:text-6xl text-muted text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400 dark:from-slate-300 dark:to-slate-500">
                            {profile.role}
                        </span>
                    </h1>

                    <p className="text-lg text-muted mb-8 max-w-lg leading-relaxed">
                        {/* Hero uchun alohida matn bo'lsa, o'shani ko'rsatamiz, bo'lmasa umumiy bio */}
                        {(() => {
                            const base = profile.hero_bio || profile.bio || '';

                            // Agar ma'lum UZ matn bo'lsa va til EN bo'lsa, qo'lda tarjima qilamiz
                            if (lang === 'en' && base.startsWith("🔧 Web-ilovalar, API'lar va server arxitekturasi yarataman.")) {
                                return "🔧 I build web applications, APIs, and server architectures. 💡 My goal is to create fast, secure, and modern web solutions. ⚙️ What I do: • Build backend APIs • Design databases • Admin panels and integrations.";
                            }

                            return base;
                        })()}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#contact" className="btn btn-primary">
                            Hire Me <ArrowRight size={20} />
                        </a>
                        {profile.cv_url && (
                            <a href={profile.cv_url} className="btn btn-outline" download>
                                Download CV <Download size={20} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Illustration / Visual */}
                <div className="order-1 md:order-2 flex-center relative" data-aos="fade-left">
                    <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                        {/* Abstract Floating Elements mimicking 3D */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2rem] rotate-12 blur-2xl opacity-40 animate-pulse"></div>

                        <div className="relative z-10 w-full h-full glass rounded-[2rem] flex-center overflow-hidden border border-white/20 shadow-2xl animate-float">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>

                            {/* Inner Content simulating code window */}
                            <div className="w-[90%] h-[85%] bg-slate-900 rounded-xl p-4 overflow-hidden shadow-inner flex flex-col gap-3">
                                <div className="flex gap-2 mb-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="space-y-2 opacity-80">
                                    <div className="h-4 w-1/3 bg-slate-700 rounded animate-pulse"></div>
                                    <div className="h-4 w-2/3 bg-slate-700 rounded animate-pulse delay-75"></div>
                                    <div className="h-4 w-1/2 bg-slate-700 rounded animate-pulse delay-150"></div>
                                    <div className="h-20 w-full bg-slate-800 rounded mt-4 border border-slate-700 flex-center text-slate-500">
                                        <Code size={48} className="text-indigo-500/50" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Icons */}
                            <div className="absolute -top-10 -right-10 w-20 h-20 glass rounded-xl flex-center text-yellow-400 animate-float" style={{ animationDelay: '1s' }}>
                                <Terminal size={32} />
                            </div>
                            <div className="absolute -bottom-5 -left-5 w-16 h-16 glass rounded-full flex-center text-cyan-400 animate-float" style={{ animationDelay: '2s' }}>
                                <Cpu size={28} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
