import { supabase } from '../../lib/supabase';
import { LogOut, LayoutDashboard, Database, User, MessageSquare, Code, Layout, Quote } from 'lucide-react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import ProjectsManager from './ProjectsManager';
import ProfileManager from './ProfileManager';
import MessagesManager from './MessagesManager';
import SkillsManager from './SkillsManager';
import ServicesManager from './ServicesManager';
import TestimonialsManager from './TestimonialsManager';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col fixed h-full z-20 overflow-y-auto">
                <div className="text-2xl font-bold gradient-text mb-10">iqooow Admin</div>

                <nav className="flex-1 space-y-2">
                    <Link to="/admin" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/profile" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                        <User size={20} /> Profile
                    </Link>
                    <Link to="/admin/skills" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                        <Code size={20} /> Skills
                    </Link>
                    <Link to="/admin/services" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                        <Layout size={20} /> Services
                    </Link>
                    <Link to="/admin/projects" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                        <Database size={20} /> Projects
                    </Link>
                    <Link to="/admin/messages" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                        <MessageSquare size={20} /> Messages
                    </Link>
                    <Link to="/admin/testimonials" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                        <Quote size={20} /> Testimonials
                    </Link>
                </nav>

                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-medium p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors mt-auto">
                    <LogOut size={20} /> Sign Out
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-10">
                <Routes>
                    <Route path="/" element={
                        <div>
                            <header className="mb-8">
                                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                                <p className="text-muted">Welcome back, Admin.</p>
                            </header>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Link to="/admin/skills" className="glass p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer">
                                    <h3 className="text-muted text-sm font-medium mb-2">My Skills</h3>
                                    <p className="text-md font-medium text-indigo-500">Manage Skills &rarr;</p>
                                </Link>
                                <Link to="/admin/services" className="glass p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer">
                                    <h3 className="text-muted text-sm font-medium mb-2">Services</h3>
                                    <p className="text-md font-medium text-indigo-500">Edit Services &rarr;</p>
                                </Link>
                                <Link to="/admin/projects" className="glass p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer">
                                    <h3 className="text-muted text-sm font-medium mb-2">Projects</h3>
                                    <p className="text-md font-medium text-indigo-500">Manage Projects &rarr;</p>
                                </Link>
                            </div>
                        </div>
                    } />
                    <Route path="/profile" element={<ProfileManager />} />
                    <Route path="/skills" element={<SkillsManager />} />
                    <Route path="/services" element={<ServicesManager />} />
                    <Route path="/projects" element={<ProjectsManager />} />
                    <Route path="/messages" element={<MessagesManager />} />
                    <Route path="/testimonials" element={<TestimonialsManager />} />
                </Routes>
            </main>
        </div>
    );
};

export default Dashboard;
