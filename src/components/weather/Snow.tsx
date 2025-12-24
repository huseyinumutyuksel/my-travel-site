import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Snow: React.FC = () => {
    const count = 1500;
    const mesh = useRef<THREE.Points>(null!);

    // Custom shader for distinct white snowflakes
    const material = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color(0xffffff) }
        },
        vertexShader: `
            attribute float size;
            attribute vec3 customColor;
            varying vec3 vColor;
            uniform float time;
            
            void main() {
                vColor = customColor;
                vec3 pos = position;
                
                // Fall down
                pos.y = mod(pos.y - time * 1.5, 40.0) - 20.0;
                
                // Sway (Turbulence)
                pos.x += sin(time * 0.5 + pos.y * 0.1) * 0.5;
                pos.z += cos(time * 0.3 + pos.y * 0.1) * 0.5;

                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * (20.0 / -mvPosition.z); // Slightly smaller, sharper
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            varying vec3 vColor;
            void main() {
                // Simple circle shape, no texture needed for crisp snow
                float r = distance(gl_PointCoord, vec2(0.5));
                if (r > 0.5) discard;
                gl_FragColor = vec4(color * vColor, 0.9); // High opacity, no additive blend
            }
        `,
        transparent: true,
        depthWrite: false,
    }), []);

    const [positions, sizes] = useMemo(() => {
        const p = new Float32Array(count * 3);
        const s = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 50;
            p[i * 3 + 1] = (Math.random() - 0.5) * 40;
            p[i * 3 + 2] = (Math.random() - 0.5) * 30; // Deep field
            s[i] = Math.random() * 20 + 10;
        }
        return [p, s];
    }, []);

    useFrame((state) => {
        if (mesh.current) {
            (mesh.current.material as THREE.ShaderMaterial).uniforms.time.value = state.clock.getElapsedTime();
        }
    });

    return (
        <points ref={mesh} material={material}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} args={[positions, 3]} />
                <bufferAttribute attach="attributes-size" count={count} args={[sizes, 1]} />
                <bufferAttribute attach="attributes-customColor" count={count} args={[new Float32Array(count * 3).fill(1), 3]} />
            </bufferGeometry>
        </points>
    );
};
