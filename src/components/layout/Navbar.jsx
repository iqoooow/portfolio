import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageToggle from '../ui/LanguageToggle';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { lang } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const labels = {
        uz: {
            home: 'Bosh sahifa',
            about: 'Men haqimda',
            services: 'Xizmatlar',
            portfolio: 'Portfolio',
            contact: 'Bog‘lanish',
            hireMe: 'Meni yollang',
        },
        en: {
            home: 'Home',
            about: 'About',
            services: 'Services',
            portfolio: 'Portfolio',
            contact: 'Contact',
            hireMe: 'Hire Me',
        },
    }[lang];

    const navLinks = [
        { name: labels.home, href: '#home' },
        { name: labels.about, href: '#about' },
        { name: labels.services, href: '#services' },
        { name: labels.portfolio, href: '#portfolio' },
        { name: labels.contact, href: '#contact' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4 px-4 pointer-events-none">
            <div className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'w-full md:w-[800px] glass rounded-full py-2 px-4 shadow-glass dark:shadow-glass-dark' : 'w-full max-w-7xl py-4 px-0 bg-transparent'}`}>
                <div className="flex-between">
                    <a href="#" className="flex-center gap-3 text-xl font-bold group">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex-center text-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                            <Code2 size={22} />
                        </div>
                        <span className="gradient-text font-heading tracking-tight opacity-100 transition-opacity duration-300">iqooow</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-white/10">
                        <LanguageToggle />
                        <ThemeToggle />
                        <a href="#contact" className="btn btn-primary text-sm px-5 py-2 !rounded-full shadow-glow">
                            {labels.hireMe}
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex items-center gap-3 md:hidden">
                        <LanguageToggle />
                        <ThemeToggle />
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 bg-gray-100 dark:bg-white/10 rounded-full"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-4 right-4 mt-2 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl rounded-2xl border border-gray-100 dark:border-white/10 p-5 flex flex-col gap-2 shadow-2xl transition-all duration-300 origin-top pointer-events-auto ${isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-lg font-medium p-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {link.name}
                    </a>
                ))}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
                    <a href="#contact" className="btn btn-primary justify-center w-full" onClick={() => setIsMenuOpen(false)}>
                        {labels.hireMe}
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
