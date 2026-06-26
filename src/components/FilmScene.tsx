"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A large sheet of translucent plastic film, gently rippling, with a
 * sweeping specular highlight that races across it — like film catching
 * light on the line. Pointer subtly bends the sheet. Custom GLSL.
 */
const vert = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 p = position;
    float w =
      sin(p.x * 1.6 + uTime * 0.9) * 0.22 +
      sin(p.y * 2.1 - uTime * 0.7) * 0.16 +
      sin((p.x + p.y) * 1.1 + uTime * 0.5) * 0.12;
    // pointer bend
    float d = distance(uv, uMouse * 0.5 + 0.5);
    w += smoothstep(0.6, 0.0, d) * 0.5 * sin(uTime * 1.2);
    p.z += w;
    vWave = w;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColdA;
  uniform vec3 uColdB;
  uniform vec3 uHot;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    // base translucent gradient (cool teal-graphite)
    vec3 base = mix(uColdA, uColdB, vUv.y + vWave * 0.4);

    // sweeping highlight band (the light catching the film)
    float sweep = sin((vUv.x + vUv.y) * 3.0 - uTime * 0.8);
    float band = smoothstep(0.82, 1.0, sweep);
    // a faint warm ember bleed near the top (heat of extrusion)
    float heat = smoothstep(0.75, 1.0, vUv.y) * 0.5;

    vec3 col = base;
    col += band * 0.6;                 // specular sweep
    col = mix(col, uHot, heat * 0.35); // ember bleed
    col += vWave * 0.12;               // ripple shading

    // translucency: darker where flat, brighter on crests
    float alpha = 0.32 + band * 0.4 + smoothstep(0.0, 0.4, vWave) * 0.25 + heat * 0.15;
    gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.85));
  }
`;

function FilmSheet() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColdA: { value: new THREE.Color("#0b1c1d") },
      uColdB: { value: new THREE.Color("#1FA6A0") },
      uHot: { value: new THREE.Color("#E8743B") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!mat.current) return;
    uniforms.uTime.value += delta;
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.04;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.04;
    uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <mesh rotation={[-0.35, 0, 0.06]} scale={1.15}>
      <planeGeometry args={[14, 9, 110, 70]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function FilmScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={active ? "always" : "never"}
        style={{ position: "absolute", inset: 0 }}
      >
        <FilmSheet />
      </Canvas>
    </div>
  );
}
