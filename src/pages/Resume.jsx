import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import {
    MapPin, Mail, Github, Linkedin, Download, Printer,
    Code2, Briefcase, GraduationCap, Zap, ExternalLink, Star
} from 'lucide-react';
import { staggerContainer, staggerItem } from '../lib/animations';

const ResumePage = () => {
    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const { lang } = useLanguage();
    const printRef = useRef();

    useEffect(() => {
        const fetchAll = async () => {
            const [p, sk, pr, sv] = await Promise.all([
                supabase.from('profile').select('*').single(),
                supabase.from('skills').select('*').order('percentage', { ascending: false }),
                supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(4),
                supabase.from('services').select('*').limit(4),
            ]);
            if (p.data) setProfile(p.data);
            if (sk.data) setSkills(sk.data);
            if (pr.data) setProjects(pr.data);
            if (sv.data) setServices(sv.data);
            setLoading(false);
        };
        fetchAll();
    }, []);

    const handlePrint = () => window.print();

    const labels = {
        uz: {
            title: 'Rezyume', skills: 'Ko\'nikmalar', projects: 'Loyihalar',
            services: 'Xizmatlar', contact: 'Aloqa', download: 'PDF Yuklab Olish',
            print: 'Chop Etish', available: 'Ishga tayyor',
            summary: 'Qisqacha',
        },
        en: {
            title: 'Resume', skills: 'Skills', projects: 'Projects',
            services: 'Services', contact: 'Contact', download: 'Download PDF',
            print: 'Print', available: 'Available for hire',
            summary: 'Summary',
        },
    }[lang];

    if (loading) return (
        <Layout>
            <div className="min-h-screen pt-32 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <SEO
                title={lang === 'uz' ? `${profile?.full_name || 'iqooow'} — Rezyume` : `${profile?.full_name || 'iqooow'} — Resume`}
                description={profile?.bio}
            />

            <style>{`
                @media print {
                    body * { visibility: hidden; }
                    #resume-content, #resume-content * { visibility: visible; }
                    #resume-content { position: fixed; top: 0; left: 0; width: 100%; }
                    .no-print { display: none !important; }
                    .print-break { page-break-before: always; }
                }
            `}</style>

            <div className="no-print fixed bottom-6 right-6 z-50 flex flex-col gap-3">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl text-sm font-semibold hover:-translate-y-0.5 transition-all text-gray-900 dark:text-white"
                >
                    <Printer size={18} /> {labels.print}
                </button>
                {profile?.cv_url && (
                    <a
                        href={profile.cv_url}
                        download
                        className="flex items-center gap-2 px-5 py-3 bg-indigo-500 text-white rounded-2xl shadow-xl shadow-indigo-500/30 text-sm font-semibold hover:-translate-y-0.5 transition-all"
                    >
                        <Download size={18} /> {labels.download}
                    </a>
                )}
            </div>

            <section className="min-h-screen pt-28 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none -z-10">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px]"></div>
                </div>

                <motion.div 
                    id="resume-content" 
                    ref={printRef} 
                    className="container max-w-4xl mx-auto"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >
                    {/* Header Card */}
                    <motion.div 
                        variants={staggerItem}
                        className="glass-card rounded-[2.5rem] p-8 md:p-12 mb-6 relative overflow-hidden border border-gray-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a]"
                    >
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"></div>
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
                            {profile?.hero_image_url ? (
                                <img src={profile.hero_image_url} alt={profile.full_name} className="w-28 h-28 rounded-3xl object-cover border-4 border-white dark:border-white/10 shadow-xl flex-shrink-0" />
                            ) : (
                                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex-center text-white shadow-xl flex-shrink-0">
                                    <Code2 size={48} />
                                </div>
                            )}

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <h1 className="text-4xl md:text-5xl font-extrabold font-heading gradient-text">{profile?.full_name}</h1>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-bold flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        {labels.available}
                                    </span>
                                </div>
                                <p className="text-xl text-gray-600 dark:text-gray-400 font-medium mb-4">{profile?.role}</p>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    {profile?.location && (
                                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-indigo-400" />{profile.location}</span>
                                    )}
                                    {profile?.email && (
                                        <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors"><Mail size={14} className="text-indigo-400" />{profile.email}</a>
                                    )}
                                    {profile?.github_link && (
                                        <a href={profile.github_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors"><Github size={14} className="text-indigo-400" />GitHub</a>
                                    )}
                                    {profile?.linkedin_link && (
                                        <a href={profile.linkedin_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors"><Linkedin size={14} className="text-indigo-400" />LinkedIn</a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {profile?.bio && (
                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">{labels.summary}</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{profile.bio}</p>
                            </div>
                        )}
                    </motion.div>

                    <div className="grid md:grid-cols-5 gap-6">
                        {/* Left Column */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Skills */}
                            {skills.length > 0 && (
                                <motion.div 
                                    variants={staggerItem}
                                    className="glass-card rounded-[2rem] p-6 border border-gray-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a]"
                                >
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-5 flex items-center gap-2">
                                        <Zap size={14} /> {labels.skills}
                                    </h2>
                                    <div className="space-y-4">
                                        {skills.map(skill => (
                                            <div key={skill.id}>
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{skill.name}</span>
                                                    <span className="text-xs font-bold text-indigo-500">{skill.percentage}%</span>
                                                </div>
                                                <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${skill.percentage}%` }}
                                                        transition={{ duration: 1, delay: 0.5 }}
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Services */}
                            {services.length > 0 && (
                                <motion.div 
                                    variants={staggerItem}
                                    className="glass-card rounded-[2rem] p-6 border border-gray-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a]"
                                >
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-5 flex items-center gap-2">
                                        <Briefcase size={14} /> {labels.services}
                                    </h2>
                                    <div className="space-y-3">
                                        {services.map(svc => (
                                            <div key={svc.id} className="flex items-start gap-3">
                                                <Star size={14} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{svc.title}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{svc.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Right Column — Projects */}
                        <div className="md:col-span-3">
                            {projects.length > 0 && (
                                <motion.div 
                                    variants={staggerItem}
                                    className="glass-card rounded-[2rem] p-6 border border-gray-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a]"
                                >
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-5 flex items-center gap-2">
                                        <GraduationCap size={14} /> {labels.projects}
                                    </h2>
                                    <div className="space-y-5">
                                        {projects.map(project => (
                                            <div key={project.id} className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-colors group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors">{project.title}</h3>
                                                    <div className="flex gap-2">
                                                        {project.repo_link && (
                                                            <a href={project.repo_link} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-500 transition-colors">
                                                                <Github size={14} />
                                                            </a>
                                                        )}
                                                        {project.demo_link && (
                                                            <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-500 transition-colors">
                                                                <ExternalLink size={14} />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                                {project.category && (
                                                    <span className="inline-block px-2 py-0.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded text-[10px] font-bold mb-2">{project.category}</span>
                                                )}
                                                {project.description && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{project.description}</p>
                                                )}
                                                {(project.technologies || []).length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                                        {project.technologies.map(t => (
                                                            <span key={t} className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-[10px] font-semibold">{t}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center text-xs text-gray-400 py-4">
                        <span>iqooow.uz/resume</span>
                        <span className="mx-2">·</span>
                        <span>{new Date().getFullYear()}</span>
                    </div>
                </motion.div>
            </section>
        </Layout>
    );
};

export default ResumePage;
