import React, { useEffect, useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import './WeatherAnimations.css';

const WeatherBackground: React.FC = () => {
    const { weather } = useWeather();
    const [elements, setElements] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        if (!weather) {
            setElements([]);
            return;
        }

        const newElements: React.ReactNode[] = [];

        if (weather === 'rainy') {
            for (let i = 0; i < 100; i++) {
                const left = Math.random() * 100;
                const duration = Math.random() * 1 + 0.5;
                const delay = Math.random() * 2;
                newElements.push(
                    <div
                        key={`rain-${i}`}
                        className="rain-drop"
                        style={{
                            left: `${left}%`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                        }}
                    />
                );
            }
        } else if (weather === 'snowy') {
            for (let i = 0; i < 50; i++) {
                const left = Math.random() * 100;
                const duration = Math.random() * 5 + 3;
                const delay = Math.random() * 5;
                const size = Math.random() * 10 + 5;
                newElements.push(
                    <div
                        key={`snow-${i}`}
                        className="snowflake"
                        style={{
                            left: `${left}%`,
                            fontSize: `${size}px`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                        }}
                    >
                        ❄
                    </div>
                );
            }
        } else if (weather === 'sunny') {
            newElements.push(<div key="sun" className="sun-glow" />);
        } else if (weather === 'foggy') {
            newElements.push(<div key="fog1" className="fog-layer" style={{ animationDuration: '25s' }} />);
            newElements.push(<div key="fog2" className="fog-layer" style={{ animationDuration: '35s', top: '20%' }} />);
        } else if (weather === 'cloudy') {
            for (let i = 0; i < 8; i++) {
                const top = Math.random() * 40;
                const width = Math.random() * 300 + 200;
                const height = Math.random() * 100 + 50;
                const duration = Math.random() * 30 + 30;
                const delay = Math.random() * -30;
                newElements.push(
                    <div
                        key={`cloud-${i}`}
                        className="cloud"
                        style={{
                            top: `${top}%`,
                            width: `${width}px`,
                            height: `${height}px`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                        }}
                    />
                );
            }
        }

        setElements(newElements);
    }, [weather]);

    // Dynamic background colors based on weather
    const getBgColor = () => {
        switch (weather) {
            case 'sunny': return 'bg-gradient-to-br from-blue-400 to-orange-200';
            case 'rainy': return 'bg-gradient-to-b from-gray-900 to-blue-900';
            case 'snowy': return 'bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900';
            case 'foggy': return 'bg-gradient-to-r from-gray-400 to-gray-600';
            case 'cloudy': return 'bg-gradient-to-b from-gray-300 to-blue-200 dark:from-gray-700 dark:to-gray-800';
            default: return ''; // Transparent to let default app bg show
        }
    };

    if (!weather) return null;

    return (
        <div className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${weather ? 'opacity-100' : 'opacity-0'} ${getBgColor()}`}>
            {/* Dark overlay for better text contrast if needed */}
            {(weather === 'rainy' || weather === 'foggy') && <div className="absolute inset-0 bg-black/30" />}
            {elements}
        </div>
    );
};

export default WeatherBackground;
