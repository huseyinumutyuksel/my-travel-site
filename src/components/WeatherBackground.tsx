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
            // Heavy Background Rain (-10s delay start for instant effect)
            for (let i = 0; i < 400; i++) {
                const left = Math.random() * 100;
                const duration = Math.random() * 0.5 + 0.3;
                const delay = Math.random() * -2; // Negative delay! start mid-animation
                newElements.push(
                    <div
                        key={`rain-${i}`}
                        className="rain-drop"
                        style={{
                            left: `${left}%`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                            opacity: Math.random() * 0.5 + 0.3,
                            zIndex: 1 // Background
                        }}
                    />
                );
            }
            // Foreground Rain (Fast & Large)
            for (let i = 0; i < 50; i++) {
                const left = Math.random() * 100;
                const duration = Math.random() * 0.3 + 0.2;
                newElements.push(
                    <div
                        key={`rain-fg-${i}`}
                        className="rain-drop"
                        style={{
                            left: `${left}%`,
                            height: '100px', // Bigger
                            width: '3px',
                            animationDuration: `${duration}s`,
                            animationDelay: `${Math.random() * -2}s`,
                            opacity: 0.8,
                            zIndex: 50 // Over cards
                        }}
                    />
                );
            }
            // Rain on Glass Effect (Trickle)
            for (let i = 0; i < 30; i++) {
                const top = Math.random() * 100;
                const left = Math.random() * 100;
                newElements.push(
                    <div
                        key={`glass-${i}`}
                        className="rain-on-glass"
                        style={{
                            top: `${top}%`,
                            left: `${left}%`,
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`,
                            animationDelay: `${Math.random() * 5}s`,
                            zIndex: 60 // Topmost
                        }}
                    />
                );
            }
            // Splashes
            for (let i = 0; i < 50; i++) {
                newElements.push(
                    <div
                        key={`splash-${i}`}
                        className="rain-splash"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                );
            }
            newElements.push(<div key="lightning" className="lightning-flash" />);
        }

        else if (weather === 'snowy') {
            // Background Snow
            for (let i = 0; i < 200; i++) {
                const left = Math.random() * 100;
                const duration = Math.random() * 10 + 5;
                const delay = Math.random() * -10; // Start instantly
                const size = Math.random() * 5 + 3;
                newElements.push(
                    <div
                        key={`snow-${i}`}
                        className="snowflake"
                        style={{
                            left: `${left}%`,
                            fontSize: `${size}px`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                            zIndex: 1
                        }}
                    >
                        ❄
                    </div>
                );
            }
            // Foreground Big Flakes
            for (let i = 0; i < 50; i++) {
                const left = Math.random() * 100;
                const duration = Math.random() * 5 + 3;
                const delay = Math.random() * -5;
                newElements.push(
                    <div
                        key={`snow-fg-${i}`}
                        className="snowflake"
                        style={{
                            left: `${left}%`,
                            fontSize: `${Math.random() * 20 + 10}px`, // Huge
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                            filter: 'blur(2px)',
                            zIndex: 50 // Over cards
                        }}
                    >
                        ❄
                    </div>
                );
            }
            newElements.push(<div key="pile" className="snow-pile" />);
            newElements.push(<div key="frost" className="frost-vignette" />);
        }

        else if (weather === 'sunny') {
            newElements.push(<div key="sun-core" className="sun-core" />);
            newElements.push(<div key="sun-rays" className="sun-ray" />);
            newElements.push(<div key="sun-glare" className="sun-glare-overlay" />);

            for (let i = 0; i < 3; i++) {
                newElements.push(
                    <div
                        key={`flare-${i}`}
                        className="lens-flare"
                        style={{
                            top: `${Math.random() * 80 + 10}%`,
                            left: `${Math.random() * 80 + 10}%`,
                            animationDelay: `${i * 2}s`,
                            zIndex: 40
                        }}
                    />
                );
            }
        }

        else if (weather === 'foggy') {
            newElements.push(<div key="fog1" className="fog-layer" style={{ animationDuration: '30s', opacity: 0.8, animationDelay: '-10s' }} />);
            newElements.push(<div key="fog2" className="fog-layer" style={{ animationDuration: '45s', top: '10%', left: '-20%', animationDirection: 'reverse', animationDelay: '-15s' }} />);
            newElements.push(<div key="fog3" className="fog-layer" style={{ animationDuration: '60s', top: '30%', opacity: 0.6, animationDelay: '-5s' }} />);
            newElements.push(<div key="fog-overlay" className="fog-overlay" />);
            newElements.push(<div key="condensation" className="condensation-overlay" />);
        }

        else if (weather === 'cloudy') {
            for (let i = 0; i < 20; i++) {
                const isForeground = Math.random() > 0.6;
                const delay = Math.random() * -60; // Start widely distributed everywhere

                newElements.push(
                    <div
                        key={`cloud-${i}`}
                        className="cloud"
                        style={{
                            top: `${Math.random() * 60}%`,
                            width: `${Math.random() * 400 + 200}px`,
                            height: `${Math.random() * 150 + 80}px`,
                            animationDuration: `${Math.random() * 40 + 40}s`,
                            animationDelay: `${delay}s`,
                            zIndex: isForeground ? 50 : 1,
                            opacity: isForeground ? 0.9 : 0.6
                        }}
                    />
                );
            }
            newElements.push(<div key="shadows" className="cloud-shadow-overlay" />);
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
        <React.Fragment>
            <div className={getContainerStyles()}>
                {(weather === 'rainy' || weather === 'foggy') && <div className="absolute inset-0 bg-black/40 z-0" />}
                {elements}
            </div>
        </React.Fragment>
    );
};

export default WeatherBackground;
