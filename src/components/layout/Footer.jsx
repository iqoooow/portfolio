import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="glass border-t border-gray-200 dark:border-gray-800 py-10 mt-20">
            <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold gradient-text mb-2">iqooow</h3>
                    <p className="text-muted text-sm">Crafting digital experiences with passion and code.</p>
                </div>

                <div className="flex gap-6">
                    <a href="https://github.com/iqooow" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass hover:text-indigo-500 transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="https://linkedin.com/in/iqooow" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass hover:text-indigo-500 transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href="https://twitter.com/iqooow" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass hover:text-indigo-500 transition-colors">
                        <Twitter size={20} />
                    </a>
                    <a href="mailto:ixashix7@gmail.com" className="p-2 rounded-full glass hover:text-indigo-500 transition-colors">
                        <Mail size={20} />
                    </a>
                </div>

                <div className="text-sm text-muted">
                    &copy; {new Date().getFullYear()} iqooow. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
