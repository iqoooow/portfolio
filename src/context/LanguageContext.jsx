import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

const STORAGE_KEY = 'lang';

const defaultLang = () => {
    if (typeof window === 'undefined') return 'uz';
    return localStorage.getItem(STORAGE_KEY) || 'uz';
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(defaultLang);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, lang);
    }, [lang]);

    const toggleLang = () => {
        setLang((prev) => (prev === 'uz' ? 'en' : 'uz'));
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);


