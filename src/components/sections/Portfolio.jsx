import { useState, useEffect } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';

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

    return (
        <section id="portfolio" className="section-padding">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
                        {lang === 'uz' ? 'Tanlangan ' : 'Featured '}
                        <span className="gradient-text">
                            {lang === 'uz' ? 'loyihalar' : 'Projects'}
                        </span>
                    </h2>
                    <p className="text-muted">
                        {lang === 'uz'
                            ? 'Oxirgi loyihalarimdan qisqa tanlov.'
                            : 'A selection of my recent work.'}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Image */}
                            <img
                                src={project.image_url || 'https://placehold.co/800x600?text=Project'}
                                alt={project.title}
                                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <span className="text-indigo-400 text-sm font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.category}</span>
                                <h3 className="text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.title}</h3>
                                <button className="mt-4 w-fit px-4 py-2 glass rounded-full text-white text-sm font-medium flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                                    View Details <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-[60] flex-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedProject(null)}>
                    <div
                        className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative animate-scale-up"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-red-500 hover:text-white transition-colors z-10"
                            onClick={() => setSelectedProject(null)}
                        >
                            <X size={20} />
                        </button>

                        <div className="h-[300px] md:h-[400px] overflow-hidden">
                            <img src={selectedProject.image_url || 'https://placehold.co/800x600?text=Project'} alt={selectedProject.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-indigo-500 font-bold tracking-wide text-sm">{selectedProject.category}</span>
                                    <h3 className="text-3xl font-bold mt-2">{selectedProject.title}</h3>
                                </div>
                                <div className="flex gap-3">
                                    {selectedProject.repo_link && (
                                        <a href={selectedProject.repo_link} target="_blank" className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-500 hover:text-white transition-colors" title="View Code">
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {selectedProject.demo_link && (
                                        <a href={selectedProject.demo_link} target="_blank" className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-500 hover:text-white transition-colors" title="Live Demo">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-muted leading-relaxed mb-8">
                                {selectedProject.description}
                            </p>

                            {selectedProject.technologies && (
                                <div>
                                    <h4 className="font-bold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.technologies.map(tech => (
                                            <span key={tech} className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300 text-sm font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
