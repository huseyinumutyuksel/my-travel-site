import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ClockCardProps {
    city: {
        id: string;
        name: string;
        timezone: string;
        image: string;
    };
}

const ClockCard: React.FC<ClockCardProps> = ({ city }) => {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone: city.timezone,
                hour12: true,
            }).format(now);
            setTime(timeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [city.timezone]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl h-64 w-full shadow-lg group cursor-pointer"
        >
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${city.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Glassmorphism Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white">
                <h3 className="text-xl font-bold">{city.name}</h3>
                <p className="text-2xl font-mono mt-1 text-cyan-300 font-semibold">{time}</p>
            </div>
        </motion.div>
    );
};

export default ClockCard;
