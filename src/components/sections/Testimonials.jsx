import { useEffect, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';

const Testimonials = () => {
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const { lang } = useLanguage();

    useEffect(() => {
        const fetchTestimonials = async () => {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setItems(data);
            }
        };

        fetchTestimonials();
    }, []);

    // Auto-advance
    useEffect(() => {
        if (items.length <= 1) return;
        const interval = setInterval(() => {
            next();
        }, 8000);
        return () => clearInterval(interval);
    }, [items.length, activeIndex]);

    if (!items.length) {
        return null;
    }

    const next = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % items.length);
    };

    const prev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const current = items[activeIndex];

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95
        })
    };

    return (
        <section id="testimonials" className="section-padding relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

            <div className="container max-w-5xl mx-auto text-center relative z-10">
                <motion.div 
                    className="mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-white/5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-6 border border-indigo-100 dark:border-white/10 shadow-sm">
                        ⭐ {lang === 'uz' ? 'Haqiqiy Mijozlar' : 'Real Clients'}
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight text-gray-900 dark:text-white">
                        {lang === 'uz' ? 'Mijozlar ' : 'Client '}{' '}
                        <span className="gradient-text">
                            {lang === 'uz' ? 'Fikrlari' : 'Stories'}
                        </span>
                    </h2>
                </motion.div>

                <motion.div 
                    className="relative glass-card p-8 sm:p-12 md:p-20 rounded-[3rem] mx-auto overflow-hidden group shadow-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Large decorative quote */}
                    <Quote size={120} className="absolute top-4 left-4 text-indigo-500/5 dark:text-indigo-500/10 -z-10 transform -rotate-12" />
                    
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

                    <div className="relative min-h-[300px] flex-center">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.4 }
                                }}
                                className="w-full"
                            >
                                {/* Rating stars */}
                                <div className="flex justify-center gap-1 mb-8">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} size={20} className="fill-amber-400 text-amber-400" />
                                    ))}
                                </div>

                                <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed mb-12 text-gray-800 dark:text-gray-200 font-heading italic">
                                    "{current.content}"
                                </p>

                                <div className="flex flex-col items-center">
                                    <div className="relative w-20 h-20 mb-4">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 animate-pulse-slow blur-sm"></div>
                                        {current.image_url ? (
                                            <img
                                                src={current.image_url}
                                                alt={current.name}
                                                className="relative w-full h-full rounded-full border-2 border-white dark:border-[#0a0a0a] object-cover"
                                            />
                                        ) : (
                                            <div className="relative w-full h-full rounded-full border-2 border-white dark:border-[#0a0a0a] bg-indigo-100 dark:bg-indigo-900 flex-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                                                {current.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-xl text-gray-900 dark:text-white">{current.name}</h4>
                                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 tracking-wide uppercase mt-1">{current.role}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center items-center gap-6 mt-12">
                        <button onClick={prev} className="p-3 rounded-full bg-white dark:bg-[#111] text-gray-600 dark:text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/20 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm border border-gray-200 dark:border-white/10 group-hover:opacity-100 opacity-70">
                            <ChevronLeft size={24} />
                        </button>
                        <div className="flex gap-2 items-center">
                            {items.map((t, idx) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        setDirection(idx > activeIndex ? 1 : -1);
                                        setActiveIndex(idx);
                                    }}
                                    className={`h-2.5 rounded-full transition-all duration-500 ${idx === activeIndex ? 'w-10 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-glow' : 'w-2.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'}`}
                                    aria-label={`Go to testimonial ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <button onClick={next} className="p-3 rounded-full bg-white dark:bg-[#111] text-gray-600 dark:text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/20 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm border border-gray-200 dark:border-white/10 group-hover:opacity-100 opacity-70">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
