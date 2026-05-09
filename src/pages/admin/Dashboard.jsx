import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { LogOut, LayoutDashboard, Database, User, MessageSquare, Code, Layout, Quote, Bell, Activity, Menu, X } from 'lucide-react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import ProjectsManager from './ProjectsManager';
import ProfileManager from './ProfileManager';
import MessagesManager from './MessagesManager';
import SkillsManager from './SkillsManager';
import ServicesManager from './ServicesManager';
import TestimonialsManager from './TestimonialsManager';

const SidebarLink = ({ to, icon: Icon, label, currentPath }) => {
    const isActive = currentPath === to || (to !== '/admin' && currentPath.startsWith(to));
    return (
        <Link 
            to={to} 
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium ${isActive ? 'bg-indigo-500 text-white shadow-glow' : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-white'}`}
        >
            <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-indigo-500'} /> {label}
        </Link>
    );
};

const DashboardOverview = () => {
    const [stats, setStats] = useState({ messages: 0, projects: 0, skills: 0 });

    useEffect(() => {
        const getStats = async () => {
            const [msg, prj, skl] = await Promise.all([
                supabase.from('messages').select('*', { count: 'exact', head: true }),
                supabase.from('projects').select('*', { count: 'exact', head: true }),
                supabase.from('skills').select('*', { count: 'exact', head: true }),
            ]);
            setStats({
                messages: msg.count || 0,
                projects: prj.count || 0,
                skills: skl.count || 0,
            });
        };
        getStats();
    }, []);

    const cards = [
        { title: 'New Messages', count: stats.messages, icon: MessageSquare, to: '/admin/messages', color: 'from-blue-500 to-cyan-400' },
        { title: 'Active Projects', count: stats.projects, icon: Database, to: '/admin/projects', color: 'from-purple-500 to-indigo-500' },
        { title: 'Skills Listed', count: stats.skills, icon: Code, to: '/admin/skills', color: 'from-emerald-400 to-teal-500' },
    ];

    return (
        <div className="animate-fade-in">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold font-heading text-gray-900 dark:text-white mb-2">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">System status and overview</p>
                </div>
                <div className="hidden sm:flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-bold border border-green-200 dark:border-green-500/20">
                        <Activity size={16} /> All Systems Operational
                    </div>
                </div>
            </header>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((c, i) => (
                    <Link key={i} to={c.to} className="glass-card p-6 rounded-[2rem] hover:-translate-y-1 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex-center text-white shadow-lg`}>
                                <c.icon size={24} />
                            </div>
                            <div className="text-3xl font-bold font-heading">{c.count}</div>
                        </div>
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">{c.title}</h3>
                        <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold group-hover:underline">Manage &rarr;</p>
                    </Link>
                ))}
            </div>
            
            {/* Quick Actions or Charts could go here */}
            <div className="mt-10 glass-card p-8 rounded-[2rem]">
                <h3 className="text-xl font-bold mb-4 font-heading">Maintenance Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                     <Link to="/admin/profile" className="btn btn-outline border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">Update Profile</Link>
                     <Link to="/admin/services" className="btn btn-outline border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">Manage Services</Link>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#050505] flex">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 z-30 flex items-center justify-between px-4 shadow-sm">
                <div className="text-xl font-bold font-heading gradient-text tracking-tight">iqooow Admin</div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600 dark:text-gray-400 focus:outline-none">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {isMobileMenuOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm" 
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`w-72 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-r border-gray-200 dark:border-white/5 p-6 flex flex-col fixed h-full z-40 shadow-xl md:shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="flex items-center justify-between mb-12">
                    <div className="text-2xl font-bold font-heading gradient-text tracking-tight">iqooow Admin</div>
                    <Bell size={20} className="text-gray-400 hover:text-indigo-500 cursor-pointer" />
                </div>

                <nav className="flex-1 space-y-1">
                    <SidebarLink to="/admin" icon={LayoutDashboard} label="Overview" currentPath={location.pathname} />
                    <div className="pt-4 pb-2 px-4 text-xs font-bold tracking-wider text-gray-400 uppercase">Content</div>
                    <SidebarLink to="/admin/profile" icon={User} label="Profile" currentPath={location.pathname} />
                    <SidebarLink to="/admin/skills" icon={Code} label="Skills" currentPath={location.pathname} />
                    <SidebarLink to="/admin/services" icon={Layout} label="Services" currentPath={location.pathname} />
                    <SidebarLink to="/admin/projects" icon={Database} label="Projects" currentPath={location.pathname} />
                    <div className="pt-4 pb-2 px-4 text-xs font-bold tracking-wider text-gray-400 uppercase">Communication</div>
                    <SidebarLink to="/admin/messages" icon={MessageSquare} label="Messages" currentPath={location.pathname} />
                    <SidebarLink to="/admin/testimonials" icon={Quote} label="Testimonials" currentPath={location.pathname} />
                </nav>

                <div className="pt-6 border-t border-gray-200 dark:border-white/5">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-medium hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                        <LogOut size={20} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-72 p-4 md:p-10 pt-24 md:pt-10 min-h-screen w-full overflow-x-hidden">
                <div className="max-w-6xl mx-auto">
                    <Routes>
                        <Route path="/" element={<DashboardOverview />} />
                        <Route path="/profile" element={<ProfileManager />} />
                        <Route path="/skills" element={<SkillsManager />} />
                        <Route path="/services" element={<ServicesManager />} />
                        <Route path="/projects" element={<ProjectsManager />} />
                        <Route path="/messages" element={<MessagesManager />} />
                        <Route path="/testimonials" element={<TestimonialsManager />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
