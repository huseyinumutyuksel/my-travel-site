import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CityModalProps {
    isOpen: boolean;
    onClose: () => void;
    city: any;
    activates: any[];
}

const CityModal: React.FC<CityModalProps> = ({ isOpen, onClose, city, activates }) => {
    const { lang } = useLanguage();

    const description = city?.description?.[lang] || city?.description?.['en'] || '';

    return (
        <AnimatePresence>
            {isOpen && city && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[70] m-auto w-full max-w-2xl h-fit max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
                    >
                        <div className="relative h-64">
                            <img
                                src={city.image}
                                alt={city.name}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <h2 className="text-4xl font-bold text-white">{city.name}</h2>
                            </div>
                        </div>

                        <div className="p-8">
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                {description}
                            </p>

                            {activates.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Calendar className="text-cyan-500" />
                                        Seasonal Events
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {activates.map((act: any, i: number) => (
                                            <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                                <span className="text-xs font-bold uppercase tracking-wider text-purple-500 mb-1 block">
                                                    Month {act.month}
                                                </span>
                                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                                    {act.event[lang] || act.event.en}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {act.description[lang] || act.description.en}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CityModal;
