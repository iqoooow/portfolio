import { useState, useEffect } from 'react';
import { ExternalLink, Github, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';
import { staggerContainer, staggerItem, spring } from '../../lib/animations';

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const { lang } = useLanguage();

    useEffect(() => {
        const getProjects = async () => {
            const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
            if (data) setProjects(data);
        };
        getProjects();
    }, []);

    // Skeleton loader
    if (projects.length === 0) {
         return (
            <section id="portfolio" className="section-padding bg-gray-50 dark:bg-[#080808]">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mx-auto mb-4"></div>
                        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                         {[1, 2].map(i => (
                             <div key={i} className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse"></div>
                         ))}
                    </div>
                </div>
            </section>
         )
    }

    return (
        <section id="portfolio" className="section-padding relative">
            {/* Soft background separation */}
            <div className="absolute inset-0 bg-gray-50 dark:bg-[#080808] -z-10"></div>
            
            <div className="container">
                <motion.div 
                    className="text-center max-w-2xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 text-xs font-semibold text-gray-600 dark:text-gray-300 mb-6 border border-gray-200 dark:border-white/10 shadow-sm">
                        🚀 {lang === 'uz' ? 'Mening ishim' : 'My Work'}
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-gray-900 dark:text-white">
                        {lang === 'uz' ? 'Tanlangan ' : 'Featured '}
                        <span className="gradient-text">
                            {lang === 'uz' ? 'loyihalar' : 'Projects'}
                        </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {lang === 'uz'
                            ? 'Texnologiya va dizaynni birlashtirgan so‘nggi ishlarim.'
                            : 'A selection of my recent work bridging technology and design.'}
                    </p>
                </motion.div>

                <motion.div 
                    className="grid md:grid-cols-2 gap-8 lg:gap-12"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            variants={staggerItem}
                            className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Image Container with subtle zoom */}
                            <div className="relative h-[320px] sm:h-[400px] overflow-hidden bg-gray-100 dark:bg-gray-900">
                                <img
                                    src={project.image_url || 'https://placehold.co/800x600/1a1a1a/ffffff?text=Project'}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />
                                {/* Soft overlay for better text contrast */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 z-10 pointer-events-none">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 backdrop-blur-md border border-indigo-500/30">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{project.title}</h3>
                                    
                                    <div className="overflow-hidden">
                                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out delay-100 mt-4 pointer-events-auto">
                                            <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                                                <Eye size={16} /> View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div 
                        className="fixed inset-0 z-[100] flex-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="bg-white dark:bg-[#0a0a0a] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative border border-gray-200 dark:border-white/10"
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={spring}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-6 right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-red-500 hover:text-white transition-colors z-20"
                                onClick={() => setSelectedProject(null)}
                            >
                                <X size={20} />
                            </button>

                            <div className="relative h-[300px] sm:h-[450px] overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-t-[2.5rem]">
                                <img src={selectedProject.image_url || 'https://placehold.co/800x600/1a1a1a/ffffff?text=Project'} alt={selectedProject.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>

                            <div className="p-8 sm:p-12 -mt-20 relative z-10">
                                <div className="glass-card p-6 rounded-3xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                    <div>
                                        <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wide text-sm uppercase">{selectedProject.category}</span>
                                        <h3 className="text-3xl sm:text-4xl font-bold font-heading mt-1 text-gray-900 dark:text-white">{selectedProject.title}</h3>
                                    </div>
                                    <div className="flex gap-3">
                                        {selectedProject.repo_link && (
                                            <a href={selectedProject.repo_link} target="_blank" className="p-3 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-indigo-500 hover:text-white transition-all duration-300 text-gray-600 dark:text-gray-400" title="View Code">
                                                <Github size={22} />
                                            </a>
                                        )}
                                        {selectedProject.demo_link && (
                                            <a href={selectedProject.demo_link} target="_blank" className="p-3 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-300 shadow-glow" title="Live Demo">
                                                <ExternalLink size={22} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-12">
                                    <div className="md:col-span-2">
                                        <h4 className="text-xl font-bold mb-4 font-heading text-gray-900 dark:text-white">Overview</h4>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                            {selectedProject.description}
                                        </p>
                                    </div>

                                    {selectedProject.technologies && (
                                        <div>
                                            <h4 className="text-xl font-bold mb-4 font-heading text-gray-900 dark:text-white">Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.technologies.map(tech => (
                                                    <span key={tech} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-200 dark:border-white/5">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;
