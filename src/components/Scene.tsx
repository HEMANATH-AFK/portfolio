"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  scrollProgress: number; // 0.0 to 1.0
  fadeOutProgress: number; // 0.0 to 1.0
}

interface ParticleInfo {
  pos: [number, number, number];
  scale: number;
  speed: number;
  offset: number;
  wobbleX: number;
  wobbleZ: number;
}

// Generate 60 floating pebbles/particles with random 3D spacing statically at module-load time
// This keeps the React component render pure, conforming to React 19's purity linting rules
const SEED_PARTICLES: ParticleInfo[] = (() => {
  const list: ParticleInfo[] = [];
  for (let i = 0; i < 60; i++) {
    // Scatter in a box around the screen
    const x = (Math.random() - 0.5) * 8.0;
    const y = (Math.random() - 0.5) * 6.0;
    const z = (Math.random() - 0.5) * 4.0 - 0.5; // some in front of camera (Z=0 is screen plane)
    const scale = 0.03 + Math.random() * 0.08;
    const speed = 0.2 + Math.random() * 0.6;
    const offset = Math.random() * Math.PI * 2;
    const wobbleX = 0.1 + Math.random() * 0.3;
    const wobbleZ = 0.1 + Math.random() * 0.3;
    list.push({ pos: [x, y, z], scale, speed, offset, wobbleX, wobbleZ });
  }
  return list;
})();

export default function Scene({ scrollProgress, fadeOutProgress }: SceneProps) {
  const { camera } = useThree();
  const particleGroupRef = useRef<THREE.Group>(null);
  const targetCameraPos = useRef(new THREE.Vector3(0, 0, 5));

  const particles = SEED_PARTICLES;

  const materials = useMemo(() => {
    return {
      mattePebble: new THREE.MeshStandardMaterial({
        color: "#C4BCB5",
        roughness: 0.7,
        metalness: 0.05,
        transparent: true,
        opacity: 0.85,
      }),
      dust: new THREE.MeshStandardMaterial({
        color: "#554E48",
        roughness: 0.9,
        transparent: true,
        opacity: 0.4,
      })
    };
  }, []);

  // Frame tick updates
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouse = state.pointer; // normalized mouse coords (-1 to +1)

    // Animate material opacities dynamically based on fadeOutProgress
    materials.mattePebble.opacity = 0.85 * fadeOutProgress;
    materials.dust.opacity = 0.4 * fadeOutProgress;

    // 1. Mouse Parallax on Camera
    // Gently offset the camera target based on mouse coordinates to create depth shifts
    targetCameraPos.current.x = mouse.x * 0.25;
    targetCameraPos.current.y = mouse.y * 0.25;
    
    // Camera responds dynamically to scroll - moves slightly back as content emerges
    targetCameraPos.current.z = 5.0 + scrollProgress * 0.5;

    camera.position.lerp(targetCameraPos.current, 0.05);
    camera.lookAt(0, 0, 0);

    // 2. Animate Particle drift
    if (particleGroupRef.current) {
      // Gently drift group with scroll
      particleGroupRef.current.position.y = -scrollProgress * 0.3;
      
      const children = particleGroupRef.current.children;
      particles.forEach((part, idx) => {
        const mesh = children[idx] as THREE.Mesh;
        if (mesh) {
          // Slow floating drift path
          const yOffset = Math.sin(time * part.speed + part.offset) * 0.08;
          const xOffset = Math.cos(time * part.speed * 0.5 + part.offset) * part.wobbleX * 0.1;
          
          mesh.position.y = part.pos[1] + yOffset;
          mesh.position.x = part.pos[0] + xOffset;
          mesh.rotation.y = time * 0.05 * part.speed;
          mesh.rotation.x = time * 0.03 * part.speed;
        }
      });
    }
  });

  return (
    <group>
      {/* Soft Fog to blend background and particles */}
      <fog attach="fog" args={["#B5ACA4", 2.0, 10.0]} />

      {/* Lighting Rig to make floating particles look tactile & shaded */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 3, 4]} intensity={1.2} />
      <directionalLight position={[-2, 1, 1]} intensity={0.4} color="#e5effa" />

      {/* Floating 3D Particle Field Group (only visible when cinematic sequence fades out) */}
      <group ref={particleGroupRef} visible={fadeOutProgress > 0.001}>
        {particles.map((part, idx) => (
          <mesh
            key={idx}
            position={part.pos}
            scale={[part.scale, part.scale, part.scale]}
            material={idx % 4 === 0 ? materials.dust : materials.mattePebble}
          >
            {idx % 5 === 0 ? (
              // Capsule particles
              <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
            ) : (
              // Round spheres
              <sphereGeometry args={[0.5, 16, 16]} />
            )}
          </mesh>
        ))}
      </group>
    </group>
  );
}
