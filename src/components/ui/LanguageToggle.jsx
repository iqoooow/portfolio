import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle = () => {
    const { lang, toggleLang } = useLanguage();

    return (
        <button
            onClick={toggleLang}
            className="px-3 py-1 rounded-full border text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
            {lang === 'uz' ? 'UZ' : 'EN'}
        </button>
    );
};

export default LanguageToggle;


