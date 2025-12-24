import { forwardRef } from 'react';
import * as THREE from 'three';

export const Sun = forwardRef<THREE.Mesh>((_, ref) => {
    return (
        <group position={[0, 0, 0]}>
            {/* The Sun Mesh (Target for GodRays) - Position matched to Sky component */}
            <mesh ref={ref} position={[10, 5, -10]}>
                <sphereGeometry args={[2, 32, 32]} /> {/* Smaller source */}
                <meshBasicMaterial color="#ffdd00" transparent opacity={1} /> {/* High opacity for occlusion */}
            </mesh>
            <pointLight intensity={2} color="#ffaa00" distance={100} decay={2} />
        </group>
    );
});
