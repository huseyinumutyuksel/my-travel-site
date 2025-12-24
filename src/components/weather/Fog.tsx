import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const Fog: React.FC = () => {
    const { scene } = useThree();

    useEffect(() => {
        scene.fog = new THREE.FogExp2('#cccccc', 0.15); // Density 0.15
        return () => {
            scene.fog = null;
        };
    }, [scene]);

    return null;
};
