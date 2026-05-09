import { ArrowRight, Download, Code, Terminal, Cpu, Sparkles } from 'lucide-react';
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
        // Skeleton Loading State for Zero CLS
        <section id="home" className="min-h-screen flex items-center pt-24 relative overflow-hidden">
            <div className="container grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
                    <div className="space-y-3">
                        <div className="h-16 w-[80%] bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
                        <div className="h-12 w-[60%] bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                        <div className="h-4 w-[90%] bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <div className="h-12 w-32 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
                        <div className="h-12 w-36 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div className="flex-center">
                    <div className="w-[300px] md:w-[500px] aspect-square bg-gray-200 dark:bg-gray-800 rounded-[2rem] animate-pulse"></div>
                </div>
            </div>
        </section>
    );

    return (
        <section id="home" className="min-h-screen flex items-center pt-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/20 dark:bg-purple-600/30 rounded-full blur-[120px] animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-indigo-500/20 dark:bg-indigo-600/20 rounded-full blur-[140px] animate-blob animation-delay-2000"></div>
                <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
            </div>

            <div className="container grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text Content */}
                <div className="order-2 md:order-1 animate-slide-up z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-200 dark:border-indigo-500/30 text-xs md:text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-6 shadow-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                        </span>
                        {lang === 'uz' ? 'Freelance uchun ochiqman' : 'Available for Freelance'}
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading leading-[1.1] mb-6 tracking-tight text-gray-900 dark:text-white">
                        {lang === 'uz' ? "Salom, men " : "Hi, I'm "}
                        <br className="hidden md:block" />
                        <span className="gradient-text">{profile.full_name}</span>
                        <br />
                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-400 dark:from-gray-300 dark:to-gray-500 font-medium tracking-tight">
                            {profile.role}
                        </span>
                    </h1>

                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl leading-relaxed">
                        {(() => {
                            const base = profile.hero_bio || profile.bio || '';
                            if (lang === 'en' && base.startsWith("🔧 Web-ilovalar, API'lar va server arxitekturasi yarataman.")) {
                                return "🔧 I build web applications, APIs, and server architectures. 💡 My goal is to create fast, secure, and modern web solutions. ⚙️ What I do: • Build backend APIs • Design databases • Admin panels and integrations.";
                            }
                            return base;
                        })()}
                    </p>

                    <div className="flex flex-wrap gap-4 items-center">
                        <a href="#contact" className="btn btn-primary text-base px-8 py-4 !rounded-2xl shadow-glow-lg group">
                            {lang === 'uz' ? 'Meni Yollang' : 'Hire Me'} 
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        {profile.cv_url && (
                            <a href={profile.cv_url} className="btn btn-outline text-base px-8 py-4 !rounded-2xl group glass" download>
                                {lang === 'uz' ? 'CV Yuklab Olish' : 'Download CV'}
                                <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                            </a>
                        )}
                    </div>
                    
                    <div className="mt-10 flex items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <Sparkles size={16} className="text-amber-400" />
                        <span>{lang === 'uz' ? 'Premium tajriba va yuqori ishlash' : 'Premium experience & high performance'}</span>
                    </div>
                </div>

                {/* Illustration / Visual */}
                <div className="order-1 md:order-2 flex-center relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="relative w-full max-w-[340px] aspect-square md:max-w-[500px]">
                        {/* Abstract Floating Elements mimicking 3D */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2.5rem] rotate-6 blur-2xl opacity-50 dark:opacity-40 animate-pulse-slow"></div>

                        <div className="relative z-10 w-full h-full glass-card rounded-[2.5rem] flex-center overflow-hidden border border-white/40 dark:border-white/10 shadow-2xl animate-float backdrop-blur-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-white/5 dark:to-transparent"></div>

                            {/* Inner Content simulating code window */}
                            <div className="w-[88%] h-[82%] bg-gray-900/90 backdrop-blur-xl rounded-2xl p-5 overflow-hidden shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)] flex flex-col gap-4 border border-gray-800">
                                <div className="flex gap-2.5 mb-2">
                                    <div className="w-3.5 h-3.5 rounded-full bg-red-500/90 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                    <div className="w-3.5 h-3.5 rounded-full bg-amber-500/90 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                                    <div className="w-3.5 h-3.5 rounded-full bg-green-500/90 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                </div>
                                <div className="space-y-3 font-mono text-sm">
                                    <div className="flex gap-2 text-indigo-400">
                                        <span className="text-pink-500">const</span> 
                                        <span className="text-blue-400">developer</span> 
                                        <span className="text-white">=</span> 
                                        <span className="text-yellow-300">"Master Architect"</span>;
                                    </div>
                                    <div className="flex gap-2 text-indigo-400">
                                        <span className="text-pink-500">await</span> 
                                        <span className="text-blue-400">buildFuture</span>();
                                    </div>
                                    <div className="h-24 w-full bg-black/50 rounded-xl mt-4 border border-white/5 flex-center text-gray-500 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
                                        <Code size={40} className="text-indigo-400/50 group-hover:text-indigo-400 transition-colors duration-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Icons */}
                            <div className="absolute -top-6 -right-6 w-20 h-20 glass-card rounded-2xl flex-center text-amber-400 animate-float shadow-xl border border-white/20" style={{ animationDelay: '1s' }}>
                                <Terminal size={32} />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-20 h-20 glass-card rounded-full flex-center text-cyan-400 animate-float shadow-xl border border-white/20" style={{ animationDelay: '2.5s' }}>
                                <Cpu size={32} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
