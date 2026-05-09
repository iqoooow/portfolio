import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
        } else {
            navigate('/admin');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex-center bg-gray-50 dark:bg-[#050505] relative overflow-hidden px-4">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]"></div>

            <div className="glass-card p-8 sm:p-12 rounded-[2.5rem] w-full max-w-md relative z-10 animate-slide-up shadow-2xl">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex-center mx-auto mb-6 text-white shadow-glow animate-float">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-3xl font-bold font-heading tracking-tight text-gray-900 dark:text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to manage your masterpiece</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2 group">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block group-focus-within:text-indigo-500 transition-colors">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@iqooow.dev"
                                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 group">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block group-focus-within:text-indigo-500 transition-colors">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full py-4 text-base rounded-2xl flex-center gap-2 transition-all shadow-glow hover:shadow-glow-lg active:scale-95"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Authenticating...
                            </>
                        ) : (
                            <>
                                Sign In
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>
                
                <div className="mt-8 text-center">
                    <a href="/" className="text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors">&larr; Back to Portfolio</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
