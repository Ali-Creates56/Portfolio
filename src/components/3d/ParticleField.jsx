'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ count = 1500, theme = 'dark' }) {
  const mesh = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      /* Color palette: indigo → cyan → purple */
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i3] = 0.39; colors[i3 + 1] = 0.4; colors[i3 + 2] = 0.95;       // Indigo
      } else if (colorChoice < 0.66) {
        colors[i3] = 0.13; colors[i3 + 1] = 0.83; colors[i3 + 2] = 0.93;      // Cyan
      } else {
        colors[i3] = 0.66; colors[i3 + 1] = 0.36; colors[i3 + 2] = 0.96;     // Purple
      }

      sizes[i] = Math.random() * 3 + 0.5;
      speeds[i] = Math.random() * 0.5 + 0.1;
    }

    return { positions, colors, sizes, speeds };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const positions = mesh.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const speed = particles.speeds[i];

      positions[i3 + 1] += Math.sin(time * speed + i * 0.1) * 0.002;
      positions[i3] += Math.cos(time * speed * 0.5 + i * 0.05) * 0.001;
      positions[i3 + 2] += Math.sin(time * speed * 0.3 + i * 0.08) * 0.001;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = time * 0.02;
    mesh.current.rotation.x = Math.sin(time * 0.01) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={theme === 'dark' ? 0.8 : 0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
