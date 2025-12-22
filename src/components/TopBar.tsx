import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TopBar: React.FC = () => {
    const { lang, toggleLanguage, t } = useLanguage();

    return (
        <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Globe className="text-cyan-400 h-6 w-6" />
                    <span className="text-xl font-bold tracking-tight text-white">{t('appTitle')}</span>
                </div>

                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-sm font-medium text-white"
                >
                    <span className={lang === 'en' ? 'text-cyan-400' : 'text-gray-400'}>EN</span>
                    <span className="text-gray-600">|</span>
                    <span className={lang === 'tr' ? 'text-cyan-400' : 'text-gray-400'}>TR</span>
                </button>
            </div>
        </header>
    );
};

export default TopBar;
