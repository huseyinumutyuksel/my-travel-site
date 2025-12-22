import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useWeather } from '../context/WeatherContext';

interface ClockCardProps {
    city: {
        id: string;
        name: string;
        timezone: string;
        image: string;
        weather?: {
            condition: string;
            temp: string;
            description: {
                en: string;
                tr: string;
            };
        };
    };
}

const ClockCard: React.FC<ClockCardProps> = ({ city }) => {
    const { lang } = useLanguage();
    const { setWeather } = useWeather();
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const locale = lang === 'en' ? 'en-US' : 'tr-TR';

            const timeString = new Intl.DateTimeFormat(locale, {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone: city.timezone,
                hour12: true,
            }).format(now);

            const dateString = new Intl.DateTimeFormat(locale, {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                timeZone: city.timezone,
            }).format(now);

            setTime(timeString);
            setDate(dateString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [city.timezone, lang]);

    const handleMouseEnter = () => {
        if (city.weather?.condition) {
            setWeather(city.weather.condition as any);
        }
    };

    const handleMouseLeave = () => {
        setWeather(null);
    };

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
            }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden rounded-2xl h-64 w-full shadow-lg group cursor-pointer bg-gray-900 border border-transparent dark:border-white/10"
        >
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${city.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

            {/* Glassmorphism Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-bold text-white mb-1 shadow-black drop-shadow-md">{city.name}</h3>
                        {/* Weather Badge */}
                        {city.weather && (
                            <div className="flex flex-col items-end text-white/90">
                                <span className="text-xl font-bold">{city.weather.temp}</span>
                                <span className="text-xs uppercase tracking-wider opacity-80">{city.weather.description[lang]}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col mt-2">
                        <span className="text-3xl font-mono text-cyan-300 font-bold drop-shadow-md tracking-wider">
                            {time}
                        </span>
                        <span className="text-sm text-gray-300 font-medium uppercase tracking-widest mt-1 opacity-90">
                            {date}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Hover Indicator */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
};

export default ClockCard;
