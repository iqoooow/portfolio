import { useEffect, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';

const Testimonials = () => {
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const { lang } = useLanguage();

    useEffect(() => {
        const fetchTestimonials = async () => {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching testimonials:', error);
                return;
            }

            if (data) {
                setItems(data);
                setActiveIndex(0);
            }
        };

        fetchTestimonials();
    }, []);

    if (!items.length) {
        return null;
    }

    const next = () => setActiveIndex((prev) => (prev + 1) % items.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

    const current = items[activeIndex];

    return (
        <section id="testimonials" className="section-padding bg-slate-50 dark:bg-slate-900/50">
            <div className="container max-w-4xl mx-auto text-center">
                <div className="mb-16" data-aos="fade-up">
                    <h2 className="text-4xl font-bold mb-4">
                        {lang === 'uz' ? 'Mijozlar' : 'Client'}{' '}
                        <span className="gradient-text">
                            {lang === 'uz' ? 'fikrlari' : 'Stories'}
                        </span>
                    </h2>
                </div>

                <div className="relative glass p-10 md:p-16 rounded-3xl" data-aos="zoom-in">
                    <Quote size={48} className="absolute top-8 left-8 text-indigo-200 dark:text-indigo-900 -z-10" />

                    <div className="transition-all duration-500">
                        <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                            "{current.content}"
                        </p>

                        <div className="flex flex-col items-center">
                            {current.image_url && (
                                <img
                                    src={current.image_url}
                                    alt={current.name}
                                    className="w-16 h-16 rounded-full mb-4 border-2 border-indigo-500 object-cover"
                                />
                            )}
                            <h4 className="font-bold text-lg">{current.name}</h4>
                            <span className="text-sm text-muted">{current.role}</span>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <button onClick={prev} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <ChevronLeft />
                        </button>
                        <div className="flex gap-2 items-center">
                            {items.map((t, idx) => (
                                <button
                                    key={t.id}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === activeIndex ? 'w-8 bg-indigo-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                                />
                            ))}
                        </div>
                        <button onClick={next} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
