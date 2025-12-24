import React from 'react';
import { Cloud, Clouds as CloudsContainer } from '@react-three/drei';
import * as THREE from 'three';

export const Clouds: React.FC = () => {
    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />

            <CloudsContainer material={THREE.MeshBasicMaterial}>
                {/* Distant Clouds */}
                <Cloud segments={20} bounds={[10, 2, 2]} volume={10} color="#eeeeee" position={[0, 2, -5]} opacity={0.6} speed={0.2} />
                <Cloud segments={10} bounds={[5, 2, 2]} volume={6} color="#dddddd" position={[-4, 0, -8]} opacity={0.4} speed={0.1} />

                {/* Foreground Clouds (Passing 'Over') */}
                <Cloud segments={10} bounds={[4, 1, 1]} volume={5} color="#ffffff" position={[3, -1, 2]} opacity={0.3} speed={0.4} />
            </CloudsContainer>
        </group>
    );
};
