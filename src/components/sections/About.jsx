import { User, Code, Globe, Server, Database, Boxes, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';

const IconMap = {
    Globe, Server, Database, Code, Boxes
};

const About = () => {
    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState([]);
    const { lang } = useLanguage();

    useEffect(() => {
        const getData = async () => {
            const { data: profileData } = await supabase.from('profile').select('*').single();
            if (profileData) setProfile(profileData);

            const { data: skillsData } = await supabase.from('skills').select('*').order('percentage', { ascending: false });
            if (skillsData) setSkills(skillsData);
        };
        getData();
    }, []);

    if (!profile) return (
        <section id="about" className="section-padding">
            <div className="container grid md:grid-cols-2 gap-16 items-center">
                <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
                <div className="space-y-4">
                    <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-32 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                </div>
            </div>
        </section>
    );

    return (
        <section id="about" className="section-padding relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

            <div className="container grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Image/Visual Side */}
                <div className="relative group" data-aos="fade-right">
                    <div className="aspect-square rounded-[3rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl max-w-md mx-auto relative z-10 bg-white dark:bg-[#0a0a0a] transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] group-hover:-translate-y-2">
                        <div className="w-full h-full flex-center text-gray-300 dark:text-gray-700 relative overflow-hidden">
                            {profile.hero_image_url ? (
                                <img src={profile.hero_image_url} alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                            ) : (
                                <User size={120} strokeWidth={1} />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                    {/* Floating Badges */}
                    <div className="absolute top-10 -left-6 z-20 glass-card p-4 flex items-center gap-3 animate-float animation-delay-1000">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex-center text-indigo-600 dark:text-indigo-400">
                            <Code size={20} />
                        </div>
                        <div>
                            <div className="text-sm font-bold">2+ Years</div>
                            <div className="text-xs text-muted text-gray-500">
                                {lang === 'uz' ? 'Tajribam' : 'Experience'}
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-10 -right-6 z-20 glass-card p-4 flex items-center gap-3 animate-float animation-delay-3000">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex-center text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 size={20} />
                        </div>
                        <div>
                            <div className="text-sm font-bold">50+</div>
                            <div className="text-xs text-muted text-gray-500">Projects Done</div>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div data-aos="fade-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-semibold text-gray-600 dark:text-gray-300 mb-6 border border-gray-200 dark:border-white/10">
                        ✨ {lang === 'uz' ? 'Men bilan tanishing' : 'Get to know me'}
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight">
                        {lang === 'uz' ? 'Men ' : 'About '}
                        <span className="gradient-text">
                            {lang === 'uz' ? 'haqimda' : 'Me'}
                        </span>
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">
                        {profile.about_bio || (lang === 'uz' ? 'Men raqamli mahsulotlarni loyihalash va rivojlantirishga ishtiyoqi bor Full-Stack dasturchiman.' : 'I am a passionate Full-Stack developer dedicated to designing and building premium digital products.')}
                    </p>

                    <div className="space-y-6">
                        {skills.map((skill, index) => {
                            const Icon = IconMap[skill.icon] || Code;
                            return (
                                <div key={skill.id} className="group cursor-default">
                                    <div className="flex justify-between mb-2 font-medium">
                                        <span className="flex items-center gap-2 text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            <Icon size={18} className="text-indigo-500 transition-transform group-hover:scale-110" /> {skill.name}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-400 font-mono text-sm">{skill.percentage}%</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden border border-gray-200 dark:border-white/5">
                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative"
                                            style={{ width: `${skill.percentage}%` }}
                                            data-aos="fade-right"
                                            data-aos-delay={index * 100}
                                        >
                                            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[slide_1s_linear_infinite]"></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes slide {
                    from { background-position: 0 0; }
                    to { background-position: 20px 0; }
                }
            `}</style>
        </section>
    );
};

export default About;
