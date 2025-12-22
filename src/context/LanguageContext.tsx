import { createContext, useContext, useState, type ReactNode } from 'react';
import data from '../data/data.json';

type Language = 'en' | 'tr';

interface LanguageContextType {
    lang: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Language>('en');

    const toggleLanguage = () => {
        setLang((prev) => (prev === 'en' ? 'tr' : 'en'));
    };

    const t = (key: string) => {
        // @ts-expect-error - simple data lookup
        const translation = data.translations[lang]?.[key];
        return translation || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
