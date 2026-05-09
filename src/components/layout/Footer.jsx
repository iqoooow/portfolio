import { Github, Linkedin, Mail, Heart, Code2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
    const { lang } = useLanguage();

    return (
        <footer className="bg-white dark:bg-[#050505] pt-20 pb-10 relative overflow-hidden border-t border-gray-200 dark:border-white/5">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <div className="text-center md:text-left flex flex-col items-center md:items-start">
                        <a href="#" className="flex items-center gap-2 text-2xl font-bold font-heading group mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex-center text-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                                <Code2 size={18} />
                            </div>
                            <span className="text-gray-900 dark:text-white tracking-tight">iqooow</span>
                        </a>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                            {lang === 'uz' 
                                ? "Mukammallik va ishtiyoq bilan yaratilgan raqamli tajribalar." 
                                : "Crafting digital experiences with passion and code. Building the web of tomorrow."}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <a href="https://github.com/iqoooow" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-sm border border-gray-200 dark:border-white/5 hover:-translate-y-1">
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com/in/ixlosbek-rajabboyev-b87b4539a" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-sm border border-gray-200 dark:border-white/5 hover:-translate-y-1">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:ixashix7@gmail.com" className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-sm border border-gray-200 dark:border-white/5 hover:-translate-y-1">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-white/5 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1 mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} iqooow. {lang === 'uz' ? 'Barcha huquqlar himoyalangan.' : 'All rights reserved.'}
                    </div>
                    <div className="flex items-center gap-1">
                        {/* Removed built with heart line */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
