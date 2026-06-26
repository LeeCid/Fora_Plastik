"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Lightweight signature scene: translucent plastic granules drifting / falling.
 * Instanced mesh keeps it cheap. Used only on the hero (desktop, motion-on).
 */
function Granules({ count = 90 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const data = useMemo(() => {
    const arr = [] as {
      pos: THREE.Vector3;
      speed: number;
      scale: number;
      rot: THREE.Euler;
      rotSpeed: number;
    }[];
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 6
        ),
        speed: 0.4 + Math.random() * 0.9,
        scale: 0.12 + Math.random() * 0.26,
        rot: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        rotSpeed: (Math.random() - 0.5) * 0.6,
      });
    }
    return arr;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.04;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.04;

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      d.pos.y -= d.speed * delta;
      if (d.pos.y < -9) d.pos.y = 9;
      d.rot.x += d.rotSpeed * delta;
      d.rot.y += d.rotSpeed * delta;

      dummy.position.set(
        d.pos.x + mouse.current.x * 1.5,
        d.pos.y,
        d.pos.z + mouse.current.y * 0.6
      );
      dummy.rotation.copy(d.rot);
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Lens / granule shape */}
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={"#15A0A0"}
        roughness={0.15}
        metalness={0.1}
        transparent
        opacity={0.82}
        emissive={"#0B4F4F"}
        emissiveIntensity={0.35}
      />
    </instancedMesh>
  );
}

export default function GranuleScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 12], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 6]} intensity={1.5} color={"#ffffff"} />
      <pointLight position={[-6, -4, 4]} intensity={2} color={"#15A0A0"} />
      <Granules />
      <fog attach="fog" args={["#061214", 10, 22]} />
    </Canvas>
  );
}
