'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import ParticleField from './ParticleField';
import FloatingGeometry from './FloatingGeometry';

export default function Scene3D({ theme = 'dark' }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#6366f1" />
          <pointLight position={[-5, -5, 5]} intensity={0.3} color="#22d3ee" />
          <ParticleField count={1200} theme={theme} />
          <FloatingGeometry theme={theme} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
