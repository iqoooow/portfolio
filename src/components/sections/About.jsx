import { User, Code, Globe, Server, Database, Boxes } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';

// Map string icon names to components
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

    if (!profile) return null;

    return (
        <section id="about" className="section-padding relative">
            <div className="container grid md:grid-cols-2 gap-16 items-center">
                {/* Image/Visual Side */}
                <div className="relative" data-aos="fade-right">
                    <div className="aspect-square rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl max-w-md mx-auto relative z-10 glass">
                        <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex-center text-slate-400">
                            {profile.hero_image_url ? (
                                <img src={profile.hero_image_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User size={100} />
                            )}
                        </div>
                    </div>
                    {/* Decor */}
                    <div className="absolute top-10 -left-10 w-24 h-24 bg-indigo-500 rounded-full blur-2xl opacity-40"></div>
                    <div className="absolute bottom-10 -right-10 w-32 h-32 bg-purple-500 rounded-full blur-2xl opacity-40"></div>
                </div>

                {/* Content Side */}
                <div data-aos="fade-left">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
                        {lang === 'uz' ? 'Men ' : 'About '}
                        <span className="gradient-text">
                            {lang === 'uz' ? 'haqimda' : 'Me'}
                        </span>
                    </h2>
                    <p className="text-muted text-lg leading-relaxed mb-8">
                        {/* About bo'limi uchun alohida matn, bo'lmasa hozircha bo'sh */}
                        {profile.about_bio || ''}
                    </p>

                    <div className="space-y-6">
                        {skills.map((skill) => {
                            const Icon = IconMap[skill.icon] || Code;
                            return (
                                <div key={skill.id}>
                                    <div className="flex justify-between mb-2 font-medium">
                                        <span className="flex items-center gap-2">
                                            <Icon size={18} className="text-indigo-500" /> {skill.name}
                                        </span>
                                        <span>{skill.percentage}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                                            style={{ width: `${skill.percentage}%` }}
                                            data-aos="slide-right"
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
