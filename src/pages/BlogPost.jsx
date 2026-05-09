import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';

const BlogPost = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const { lang } = useLanguage();

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('slug', slug)
                .eq('published', true)
                .single();

            if (error) {
                console.error(error);
                setLoading(false);
                return;
            }

            if (data) setBlog(data);
            setLoading(false);
            window.scrollTo(0, 0);
        };
        fetchPost();
    }, [slug]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success(lang === 'uz' ? 'Havola nusxalandi!' : 'Link copied to clipboard!');
    };

    if (loading) return (
        <Layout>
            <div className="min-h-screen pt-32 flex justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </Layout>
    );

    if (!blog) return (
        <Layout>
            <div className="min-h-screen pt-32 text-center">
                <h1 className="text-4xl font-bold mb-4">{lang === 'uz' ? 'Maqola topilmadi' : 'Article not found'}</h1>
                <Link to="/blog" className="text-indigo-500 hover:underline inline-flex items-center gap-2">
                    <ArrowLeft size={18} /> {lang === 'uz' ? 'Blogga qaytish' : 'Back to Blog'}
                </Link>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <SEO 
                title={`${blog.title} — iqooow`} 
                description={blog.excerpt} 
                image={blog.cover_url}
                article={true}
            />
            <article className="min-h-screen pt-32 pb-20 relative">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-500/5 to-transparent -z-10"></div>
                
                <div className="container max-w-4xl mx-auto px-4">
                    {/* Back Link */}
                    <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-500 transition-colors mb-8 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        {lang === 'uz' ? 'Barcha maqolalar' : 'All articles'}
                    </Link>

                    {/* Post Header */}
                    <motion.header 
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={16} />
                                {new Date(blog.created_at).toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} />
                                {Math.ceil(blog.content.length / 1000)} min o'qish
                            </div>
                            <button onClick={handleShare} className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors ml-auto">
                                <Share2 size={16} />
                                {lang === 'uz' ? 'Ulashish' : 'Share'}
                            </button>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-gray-900 dark:text-white leading-[1.1] mb-8">
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            {(blog.tags || []).map(t => (
                                <span key={t} className="px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-bold border border-indigo-100 dark:border-indigo-500/20">
                                    #{t}
                                </span>
                            ))}
                        </div>
                    </motion.header>

                    {/* Cover Image */}
                    {blog.cover_url && (
                        <motion.div 
                            className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 border border-gray-200 dark:border-white/10"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <img src={blog.cover_url} alt={blog.title} className="w-full aspect-video object-cover" />
                        </motion.div>
                    )}

                    {/* Content */}
                    <motion.div 
                        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed prose-a:text-indigo-500 prose-strong:text-gray-900 dark:prose-strong:text-white prose-img:rounded-3xl prose-code:text-indigo-500 prose-pre:bg-gray-900 prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {blog.content.split('\n').map((para, i) => (
                            para.trim() === '' ? <br key={i} /> : <p key={i}>{para}</p>
                        ))}
                    </motion.div>

                    {/* Footer Share */}
                    <motion.footer 
                        className="mt-16 pt-8 border-t border-gray-100 dark:border-white/5 flex justify-between items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <div className="text-sm text-gray-500 italic">
                            Oxirgi tahrir: {new Date(blog.updated_at).toLocaleDateString()}
                        </div>
                        <button onClick={handleShare} className="btn btn-outline px-6 py-3 rounded-2xl flex items-center gap-2">
                            <Share2 size={18} /> {lang === 'uz' ? 'Maqolani ulashish' : 'Share Article'}
                        </button>
                    </motion.footer>
                </div>
            </article>
        </Layout>
    );
};

export default BlogPost;
