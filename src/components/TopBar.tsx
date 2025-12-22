import React from 'react';
import { Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const TopBar: React.FC = () => {
    const { lang, toggleLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-black/50 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Globe className="text-cyan-600 dark:text-cyan-400 h-6 w-6" />
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{t('appTitle')}</span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
                        title="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-gray-200 dark:border-white/10 text-sm font-medium"
                    >
                        <span className={lang === 'en' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-gray-500 dark:text-gray-400'}>EN</span>
                        <span className="text-gray-400">|</span>
                        <span className={lang === 'tr' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-gray-500 dark:text-gray-400'}>TR</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
