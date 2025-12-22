import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Calendar } from 'lucide-react';
import data from '../data/data.json';
import { useLanguage } from '../context/LanguageContext';

const TravelSimulator: React.FC = () => {
    const { t, lang } = useLanguage();
    const [origin, setOrigin] = useState(data.cities[0].id);
    const [destination, setDestination] = useState(data.cities[1].id);
    const [duration, setDuration] = useState<number>(5);
    const [departureTime, setDepartureTime] = useState('');
    const [result, setResult] = useState<{ landedTime: string; events: any[] } | null>(null);

    const calculateArrival = () => {
        if (!departureTime) return;

        const originCity = data.cities.find((c) => c.id === origin);
        const destCity = data.cities.find((c) => c.id === destination);

        if (!originCity || !destCity) return;

        const [hours, minutes] = departureTime.split(':').map(Number);

        // Use today's date + input hours
        const d = new Date();
        d.setHours(hours);
        d.setMinutes(minutes);

        const flightDurationMs = duration * 60 * 60 * 1000;
        const landingTime = new Date(d.getTime() + flightDurationMs);

        const landedString = new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'tr-TR', {
            timeZone: destCity.timezone,
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }).format(landingTime);

        // Activates
        const landingMonth = landingTime.getMonth() + 1; // 1-12
        const events = data.activates.filter(
            (e) => e.cityId === destination && e.month === landingMonth
        );

        setResult({ landedTime: landedString, events });
    };

    return (
        <div className="bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white p-8 rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-none max-w-4xl mx-auto mt-12 backdrop-blur-xl border border-gray-100 dark:border-white/10 transition-colors duration-300">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Plane className="text-cyan-600 dark:text-cyan-400" />
                {t('calculate')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('origin')}</label>
                    <select
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/20 rounded-lg p-3 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                        {data.cities.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('destination')}</label>
                    <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/20 rounded-lg p-3 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                        {data.cities.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('duration')}</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/20 rounded-lg p-3 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t('departureTime')}</label>
                    <input
                        type="time"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/20 rounded-lg p-3 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                </div>
            </div>

            <button
                onClick={calculateArrival}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95"
            >
                {t('calculate')}
            </button>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-8 p-6 bg-gray-50 dark:bg-white/10 rounded-xl border border-gray-200 dark:border-white/10 transition-colors"
                    >
                        <div className="text-center mb-6">
                            <span className="text-gray-500 dark:text-gray-400 uppercase tracking-widest text-sm">{t('landedAt')}</span>
                            <div className="text-4xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 dark:from-cyan-300 dark:to-purple-400">
                                {result.landedTime}
                            </div>
                        </div>

                        {result.events.length > 0 && (
                            <div className="border-t border-gray-200 dark:border-white/10 pt-4">
                                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                                    <Calendar className="text-purple-500 dark:text-purple-400 h-5 w-5" />
                                    {t('happeningNow')}
                                </h4>
                                <div className="space-y-3">
                                    {result.events.map((ev, i) => (
                                        <div key={i} className="bg-white dark:bg-black/40 p-3 rounded-lg flex flex-col shadow-sm dark:shadow-none border border-gray-100 dark:border-transparent">
                                            <span className="font-bold text-cyan-700 dark:text-cyan-200">{ev.event}</span>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{ev.description}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TravelSimulator;
