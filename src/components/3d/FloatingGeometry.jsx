'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';

function FloatingShape({ position, rotation, scale, speed, distort, color, shape }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * speed * 0.3;
    meshRef.current.rotation.z = t * speed * 0.2;
  });

  const geometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 1]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 8, 16]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />;
      default:
        return <icosahedronGeometry args={[1, 1]} />;
    }
  };

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.5, 0.5]}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        {geometry()}
        <MeshDistortMaterial
          color={color}
          wireframe
          transparent
          opacity={0.25}
          distort={distort}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingGeometry({ theme = 'dark' }) {
  const primaryColor = theme === 'dark' ? '#6366f1' : '#4f46e5';
  const secondaryColor = theme === 'dark' ? '#22d3ee' : '#0891b2';
  const tertiaryColor = theme === 'dark' ? '#a855f7' : '#7c3aed';

  return (
    <group>
      <FloatingShape
        position={[-4, 2, -3]}
        rotation={[0.5, 0.3, 0]}
        scale={0.8}
        speed={1.2}
        distort={0.4}
        color={primaryColor}
        shape="icosahedron"
      />
      <FloatingShape
        position={[4, -1, -4]}
        rotation={[0, 0.8, 0.3]}
        scale={0.6}
        speed={0.8}
        distort={0.3}
        color={secondaryColor}
        shape="octahedron"
      />
      <FloatingShape
        position={[3, 3, -5]}
        rotation={[0.3, 0, 0.5]}
        scale={0.7}
        speed={1.5}
        distort={0.5}
        color={tertiaryColor}
        shape="torus"
      />
      <FloatingShape
        position={[-3, -2, -3]}
        rotation={[0, 0.5, 0.2]}
        scale={0.5}
        speed={1}
        distort={0.3}
        color={secondaryColor}
        shape="dodecahedron"
      />
      <FloatingShape
        position={[0, 4, -6]}
        rotation={[0.7, 0.2, 0]}
        scale={1}
        speed={0.6}
        distort={0.2}
        color={primaryColor}
        shape="icosahedron"
      />
      <FloatingShape
        position={[-5, 0, -5]}
        rotation={[0.1, 0.4, 0.3]}
        scale={0.4}
        speed={1.8}
        distort={0.6}
        color={tertiaryColor}
        shape="octahedron"
      />
    </group>
  );
}
