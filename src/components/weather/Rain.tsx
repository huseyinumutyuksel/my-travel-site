import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Better approach: Use instanced mesh of thin BoxGeometry (lines)
export const Rain: React.FC = () => {
    const count = 3000;
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Store individual speeds
    const speeds = useMemo(() => new Float32Array(count), [count]);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            speeds[i] = Math.random() * 20 + 20; // Very fast
            temp.push({
                x: (Math.random() - 0.5) * 50,
                y: (Math.random() - 0.5) * 40,
                z: (Math.random() - 0.5) * 20 - 5,
                len: Math.random() * 0.5 + 0.5
            });
        }
        return temp;
    }, [count]);

    // Splash particles
    const splashCount = 1000;
    const splashMesh = useRef<THREE.InstancedMesh>(null!);
    const splashDummy = useMemo(() => new THREE.Object3D(), []);
    const splashInfo = useMemo(() => {
        return new Array(splashCount).fill(0).map(() => ({
            x: (Math.random() - 0.5) * 50,
            z: (Math.random() - 0.5) * 20 - 5,
            time: Math.random() * 100
        }));
    }, []);

    useFrame((_, delta) => {
        if (!mesh.current || !splashMesh.current) return;

        // Rain falling
        particles.forEach((p, i) => {
            p.y -= speeds[i] * delta;
            if (p.y < -20) {
                p.y = 20;
                p.x = (Math.random() - 0.5) * 50; // Reshuffle X to avoid patterns
            }
            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.set(0.01, p.len * 4, 0.01); // EXTREMELY thin (0.01) and longer
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;

        // Splash animation
        splashInfo.forEach((s, i) => {
            s.time += delta * 15; // Animation speed
            const cycle = s.time % 1; // 0 to 1 loop

            if (cycle < 0.2) { // Only visible start of cycle
                splashDummy.position.set(s.x, -10, s.z); // Fixed ground height
                const scale = cycle * 3; // Grow
                splashDummy.scale.set(scale, scale, scale);
            } else {
                splashDummy.scale.set(0, 0, 0);
            }
            splashDummy.updateMatrix();
            splashMesh.current.setMatrixAt(i, splashDummy.matrix);
        });
        splashMesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <group>
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="#aaddff" transparent opacity={0.15} />
            </instancedMesh>

            {/* Splash Mesh */}
            <instancedMesh ref={splashMesh} args={[undefined, undefined, splashCount]}>
                <ringGeometry args={[0.05, 0.1, 8]} />
                <meshBasicMaterial color="#aaddff" transparent opacity={0.4} side={THREE.DoubleSide} />
            </instancedMesh>
        </group>
    );
};
