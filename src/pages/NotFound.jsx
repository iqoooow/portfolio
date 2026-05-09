import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Ghost } from 'lucide-react';
import Layout from '../components/layout/Layout';

const NotFound = () => {
    return (
        <Layout>
            <div className="min-h-[80vh] flex-center flex-col text-center px-4 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-10"></div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="relative inline-block mb-8">
                        <motion.div
                            animate={{ 
                                y: [0, -20, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                                duration: 4, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                            className="text-indigo-500"
                        >
                            <Ghost size={120} strokeWidth={1.5} />
                        </motion.div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/10 dark:bg-white/5 rounded-[100%] blur-sm"></div>
                    </div>

                    <h1 className="text-8xl md:text-9xl font-extrabold font-heading gradient-text mb-4">404</h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Oops! Sahifa topilmadi
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10 leading-relaxed">
                        Siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan bo'lishi mumkin. 
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/" className="btn btn-primary px-8 py-4 rounded-2xl shadow-glow-lg flex items-center gap-2 group">
                            <Home size={20} />
                            Bosh sahifaga qaytish
                        </Link>
                        <button onClick={() => window.history.back()} className="btn btn-outline px-8 py-4 rounded-2xl flex items-center gap-2 group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Orqaga qaytish
                        </button>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default NotFound;
