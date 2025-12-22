import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ClockCard from './ClockCard';
import CityModal from './CityModal';
import data from '../data/data.json';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
    const { t } = useLanguage();
    const [selectedCity, setSelectedCity] = useState<any>(null);

    const handleCardClick = (city: any) => {
        setSelectedCity(city);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-500 dark:to-pink-500 mb-6 drop-shadow-sm dark:drop-shadow-2xl">
                    {t('appTitle')}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light">
                    {t('heroSubtitle') || "Track time across the globe and plan your next journey with precision."}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.cities.map((city) => (
                    <div key={city.id} onClick={() => handleCardClick(city)}>
                        <ClockCard city={city} />
                    </div>
                ))}
            </div>

            <CityModal
                isOpen={!!selectedCity}
                onClose={() => setSelectedCity(null)}
                city={selectedCity}
                activates={selectedCity ? data.activates.filter((a) => a.cityId === selectedCity.id) : []}
            />
        </section>
    );
};

export default Hero;
