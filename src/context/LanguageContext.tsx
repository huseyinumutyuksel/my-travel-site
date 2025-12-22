import { createContext, useContext, useState, type ReactNode } from 'react';

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

    // Simple translation helper placeholder - will be connected to data later or basic keys
    const t = (text: string) => {
        // Ideally we would look up translations here. 
        // For now returning the text or handling specific keys if we implement full dict.
        return text;
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
