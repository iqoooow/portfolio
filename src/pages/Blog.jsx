import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Calendar, ArrowRight, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import { staggerContainer, staggerItem } from '../lib/animations';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeTag, setActiveTag] = useState('');
    const { lang } = useLanguage();

    useEffect(() => {
        const fetchBlogs = async () => {
            const { data } = await supabase
                .from('blogs')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });
            if (data) setBlogs(data);
            setLoading(false);
        };
        fetchBlogs();
    }, []);

    const allTags = [...new Set(blogs.flatMap(b => b.tags || []))];

    const filtered = blogs.filter(b => {
        const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || (b.excerpt || '').toLowerCase().includes(search.toLowerCase());
        const matchTag = activeTag ? (b.tags || []).includes(activeTag) : true;
        return matchSearch && matchTag;
    });

    return (
        <Layout>
            <SEO title={lang === 'uz' ? "Blog — iqooow" : "Blog — iqooow"} description={lang === 'uz' ? "Texnik maqolalar va dasturlash bo'yicha tajribalar." : "Technical articles and programming insights by iqooow."} />
            <section className="min-h-screen pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none -z-10">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-[140px]"></div>
                </div>

                <div className="container max-w-5xl mx-auto">
                    {/* Header */}
                    <motion.div 
                        className="text-center mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-200 dark:border-indigo-500/30 text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-6">
                            <BookOpen size={16} /> {lang === 'uz' ? 'Texnik maqolalar' : 'Technical Articles'}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold font-heading gradient-text mb-4">Blog</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
                            {lang === 'uz' ? 'Dasturlash, arxitektura va zamonaviy texnologiyalar haqida fikrlarim.' : 'Thoughts on programming, architecture, and modern technology.'}
                        </p>
                    </motion.div>

                    {/* Search & Filter */}
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4 mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                className="w-full pl-12 pr-5 py-4 rounded-2xl glass border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 transition-all text-gray-900 dark:text-white"
                                placeholder={lang === 'uz' ? 'Maqola qidirish...' : 'Search articles...'}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </motion.div>

                    {/* Tags */}
                    {allTags.length > 0 && (
                        <motion.div 
                            className="flex flex-wrap gap-2 mb-10"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <button onClick={() => setActiveTag('')} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeTag === '' ? 'bg-indigo-500 text-white' : 'glass border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-indigo-400'}`}>
                                {lang === 'uz' ? 'Barchasi' : 'All'}
                            </button>
                            {allTags.map(t => (
                                <button key={t} onClick={() => setActiveTag(t === activeTag ? '' : t)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeTag === t ? 'bg-indigo-500 text-white' : 'glass border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-indigo-400'}`}>
                                    #{t}
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {/* Blog List */}
                    {loading ? (
                        <div className="space-y-6">
                            {[1,2,3].map(i => <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded-[2rem] animate-pulse"></div>)}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="glass-card p-20 rounded-[3rem] text-center">
                            <BookOpen size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                            <h3 className="text-xl font-bold text-gray-500">{lang === 'uz' ? 'Maqolalar topilmadi' : 'No articles found'}</h3>
                        </div>
                    ) : (
                        <motion.div 
                            className="space-y-6"
                            initial="initial"
                            animate="animate"
                            variants={staggerContainer}
                        >
                            {filtered.map((blog, i) => (
                                <Link to={`/blog/${blog.slug}`} key={blog.id} className="block">
                                    <motion.article 
                                        variants={staggerItem}
                                        className="glass-card rounded-[2rem] overflow-hidden group hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a]"
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            {blog.cover_url && (
                                                <div className="md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                                                    <img src={blog.cover_url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                </div>
                                            )}
                                            <div className="p-8 flex flex-col justify-between flex-1">
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                            <Calendar size={13} />
                                                            {new Date(blog.created_at).toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                        </div>
                                                        {(blog.tags || []).slice(0, 3).map(t => (
                                                            <span key={t} className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">#{t}</span>
                                                        ))}
                                                    </div>
                                                    <h2 className="text-2xl font-bold font-heading text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors mb-3">{blog.title}</h2>
                                                    {blog.excerpt && <p className="text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{blog.excerpt}</p>}
                                                </div>
                                                <div className="mt-6 flex items-center gap-2 text-indigo-500 font-semibold text-sm group-hover:gap-3 transition-all">
                                                    {lang === 'uz' ? "To'liq o'qish" : 'Read More'} <ArrowRight size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default BlogPage;
