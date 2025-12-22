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
            // Heavy Rain Drops
            for (let i = 0; i < 500; i++) {
                const left = Math.random() * 100;
                const duration = Math.random() * 0.5 + 0.3; // Faster
                const delay = Math.random() * 2;
                newElements.push(
                    <div
                        key={`rain-${i}`}
                        className="rain-drop"
                        style={{
                            left: `${left}%`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                            opacity: Math.random() * 0.5 + 0.3
                        }}
                    />
                );
            }
            // Splashes at the bottom
            for (let i = 0; i < 50; i++) {
                const left = Math.random() * 100;
                const delay = Math.random() * 2;
                newElements.push(
                    <div
                        key={`splash-${i}`}
                        className="rain-splash"
                        style={{
                            left: `${left}%`,
                            animationDelay: `${delay}s`
                        }}
                    />
                );
            }
            // Lightning Flash
            newElements.push(<div key="lightning" className="lightning-flash" />);
        }

        else if (weather === 'snowy') {
            // High Density Snow
            for (let i = 0; i < 300; i++) {
                const left = Math.random() * 100;
                const duration = Math.random() * 10 + 5;
                const delay = Math.random() * 10;
                const size = Math.random() * 8 + 3;
                const blur = Math.random() * 2;
                newElements.push(
                    <div
                        key={`snow-${i}`}
                        className="snowflake"
                        style={{
                            left: `${left}%`,
                            fontSize: `${size}px`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                            filter: `blur(${blur}px)`,
                            zIndex: Math.random() > 0.8 ? 60 : 1 // Some snow in front
                        }}
                    >
                        ❄
                    </div>
                );
            }
            // Accumulation
            newElements.push(<div key="pile" className="snow-pile" />);
        }

        else if (weather === 'sunny') {
            // Intense glow elements
            newElements.push(<div key="sun-core" className="sun-core" />);
            newElements.push(<div key="sun-rays" className="sun-ray" />);

            // Random lens flares
            for (let i = 0; i < 3; i++) {
                const top = Math.random() * 80 + 10;
                const left = Math.random() * 80 + 10;
                newElements.push(
                    <div
                        key={`flare-${i}`}
                        className="lens-flare"
                        style={{
                            top: `${top}%`,
                            left: `${left}%`,
                            animationDelay: `${i * 2}s`
                        }}
                    />
                );
            }

        }

        else if (weather === 'foggy') {
            // Multi-layered thick fog
            newElements.push(<div key="fog1" className="fog-layer" style={{ animationDuration: '30s', opacity: 0.8 }} />);
            newElements.push(<div key="fog2" className="fog-layer" style={{ animationDuration: '45s', top: '10%', left: '-20%', animationDirection: 'reverse' }} />);
            newElements.push(<div key="fog3" className="fog-layer" style={{ animationDuration: '60s', top: '30%', opacity: 0.6 }} />);
            newElements.push(<div key="fog-overlay" className="fog-overlay" />);
        }

        else if (weather === 'cloudy') {
            // Lots of fluffy clouds
            for (let i = 0; i < 20; i++) {
                const top = Math.random() * 60;
                const width = Math.random() * 400 + 200;
                const height = Math.random() * 150 + 80;
                const duration = Math.random() * 40 + 40;
                const delay = Math.random() * -40;
                const isForeground = Math.random() > 0.7; // 30% chance to be over content

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
                            zIndex: isForeground ? 50 : 1, // Z-Index layering
                            opacity: isForeground ? 0.9 : 0.6
                        }}
                    />
                );
            }
        }

        setElements(newElements);
    }, [weather]);

    // Dynamic background colors & filters based on weather
    const getContainerStyles = () => {
        let baseClass = "fixed inset-0 pointer-events-none transition-all duration-1000 z-0 ";

        switch (weather) {
            case 'sunny':
                return baseClass + "bg-gradient-to-br from-blue-500 via-orange-300 to-yellow-200 saturate-150 brightness-110";
            case 'rainy':
                return baseClass + "bg-gradient-to-b from-gray-950 via-gray-800 to-blue-900 brightness-75 contrast-125";
            case 'snowy':
                return baseClass + "bg-gradient-to-b from-slate-200 to-white dark:from-slate-800 dark:to-slate-900 brightness-110";
            case 'foggy':
                return baseClass + "bg-gradient-to-r from-gray-300 to-gray-500 blur-sm brightness-90 saturate-50";
            case 'cloudy':
                return baseClass + "bg-gradient-to-b from-gray-400 to-blue-300 dark:from-gray-600 dark:to-slate-800 contrast-90";
            default:
                return baseClass + "opacity-0";
        }
    };

    if (!weather) return null;

    return (
        <React.Fragment> {/* Use Fragment to avoid single wrapper z-index constraints if needed, but here fixed works */}
            <div className={getContainerStyles()}>
                {/* Dark overlay for better text contrast if needed */}
                {(weather === 'rainy' || weather === 'foggy') && <div className="absolute inset-0 bg-black/40 z-0" />}
                {elements}
            </div>
        </React.Fragment>
    );
};

export default WeatherBackground;
