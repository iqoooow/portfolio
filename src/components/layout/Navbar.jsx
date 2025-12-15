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
        window.addEventListener('scroll', handleScroll);
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
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'py-5 bg-transparent'
                }`}
        >
            <div className="container flex-between">
                <a href="#" className="flex-center gap-2 text-xl font-bold">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex-center text-white" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
                        <Code2 size={24} />
                    </div>
                    <span className="gradient-text">iqooow</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium hover:text-indigo-500 transition-colors dark:text-slate-200 dark:hover:text-indigo-400"
                        >
                            {link.name}
                        </a>
                    ))}
                    <LanguageToggle />
                    <ThemeToggle />
                    <a href="#contact" className="btn btn-primary text-sm px-5 py-2">
                        {labels.hireMe}
                    </a>
                </nav>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <LanguageToggle />
                    <ThemeToggle />
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-gray-100 dark:border-gray-800 p-5 flex flex-col gap-4 animate-fade-in">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium p-2 hover:bg-black/5 rounded-lg dark:hover:bg-white/5"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a href="#contact" className="btn btn-primary justify-center w-full" onClick={() => setIsMenuOpen(false)}>
                        {labels.hireMe}
                    </a>
                </div>
            )}
        </header>
    );
};

export default Navbar;
