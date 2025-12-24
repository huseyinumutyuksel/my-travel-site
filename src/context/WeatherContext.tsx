import React, { createContext, useContext, useState } from 'react';

export type WeatherType = 'sunny' | 'rainy' | 'cloudy' | 'snowy' | 'foggy' | 'clear' | null;

interface WeatherContextType {
    weather: WeatherType;
    setWeather: (weather: WeatherType) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [weather, setWeather] = useState<WeatherType>(null);

    return (
        <WeatherContext.Provider value={{ weather, setWeather }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
};
