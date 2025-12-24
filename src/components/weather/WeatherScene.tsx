import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useWeather } from '../../context/WeatherContext';
import { Rain, Snow, Sun, Clouds } from './index';
import { EffectComposer, Bloom, Vignette, GodRays } from '@react-three/postprocessing';
import { Sky } from '@react-three/drei';
import * as THREE from 'three';

export const WeatherScene: React.FC = () => {
    const { weather } = useWeather();
    const sunRef = useRef<THREE.Mesh>(null!);

    if (!weather) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: false, alpha: true }}>
                {/* Unified Sun Position: [10, 5, -10] */}
                {(weather === 'sunny' || weather === 'clear') && (
                    <Sky sunPosition={[10, 5, -10]} turbidity={0.1} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.8} />
                )}

                <ambientLight intensity={weather === 'rainy' ? 0.2 : 0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />

                <Suspense fallback={null}>
                    {weather === 'rainy' && <Rain />}
                    {weather === 'snowy' && <Snow />}
                    {/* Only render godrays physical sun mesh if 'sunny'. 'clear' gets just sky. */}
                    {weather === 'sunny' && <Sun ref={sunRef} />}
                    {weather === 'cloudy' && <Clouds />}

                    {/* Fog needs to be THICKER to be visible. Using scene-level fog via primitive or component */}
                    {(weather === 'foggy') && <color attach="background" args={['#cccccc']} />}
                    {(weather === 'foggy') && <fog attach="fog" args={['#cccccc', 1, 15]} />} {/* Thicker linear fog */}
                    {(weather === 'rainy') && <fog attach="fog" args={['#111111', 5, 30]} />}

                    <EffectComposer>
                        <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />

                        {(weather === 'sunny' && sunRef.current) ? (
                            <GodRays sun={sunRef.current} blur={true} samples={60} density={0.96} decay={0.94} weight={0.3} exposure={0.4} clampMax={1} />
                        ) : <></>}
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
};
