"use client";

import { useEffect, useMemo, useRef, useState, MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const SPACING = 18;
const STATIONS = 4;

/* ---------- shared materials ---------- */
function SteelMat({ rough = 0.32, color = "#9aa3ad" }: { rough?: number; color?: string }) {
  return <meshStandardMaterial color={color} metalness={1} roughness={rough} envMapIntensity={1.1} />;
}
function DarkMat({ color = "#3a4047" }: { color?: string }) {
  return <meshStandardMaterial color={color} metalness={0.9} roughness={0.5} envMapIntensity={0.8} />;
}

/* ---------- branded canvas texture ("Fora" print) ---------- */
function useBrandTexture(text = "Fora") {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 320;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, 512, 320);
    ctx.fillStyle = "#0c1413";
    ctx.fillRect(0, 0, 512, 320);
    ctx.fillStyle = "#ECE7DC";
    ctx.font = "italic 700 150px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 256, 150);
    ctx.font = "30px monospace";
    ctx.fillStyle = "#7FB9B6";
    ctx.fillText("PACKAGING", 256, 250);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [text]);
}

/* ---------- camera travels down the line ---------- */
function Rig({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const { camera } = useThree();
  const cur = useRef(0);
  useFrame(() => {
    const p = progressRef.current;
    const tx = p * SPACING * (STATIONS - 1);
    cur.current += (tx - cur.current) * 0.07;
    // Look left of the focused machine so it sits in the RIGHT ~55% of frame,
    // clear of the overlaid copy on the left.
    const fx = cur.current - 3.6;
    camera.position.set(fx, 3.3, 13.2);
    camera.lookAt(fx, 2.4, 0);
  });
  return null;
}

/* ===================== 01 · EXTRUSION + BLOWN FILM ===================== */
function ExtruderMachine({ x }: { x: number }) {
  const bands = useRef<THREE.Group>(null);
  const nipA = useRef<THREE.Mesh>(null);
  const nipB = useRef<THREE.Mesh>(null);
  const winder = useRef<THREE.Mesh>(null);
  const bubble = useRef<THREE.Mesh>(null);

  useFrame((s, d) => {
    if (nipA.current) nipA.current.rotation.z -= d * 2;
    if (nipB.current) nipB.current.rotation.z += d * 2;
    if (winder.current) winder.current.rotation.x += d * 1.2;
    if (bubble.current) {
      const t = s.clock.elapsedTime;
      bubble.current.scale.x = 1 + Math.sin(t * 1.5) * 0.02;
      bubble.current.scale.z = 1 + Math.cos(t * 1.5) * 0.02;
    }
  });

  // blown-film bubble profile (lathe)
  const profile = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0.35, 0));
    pts.push(new THREE.Vector2(0.55, 0.4));
    pts.push(new THREE.Vector2(1.15, 1.6)); // frost-line bulge
    pts.push(new THREE.Vector2(0.95, 3.0));
    pts.push(new THREE.Vector2(0.85, 4.0));
    pts.push(new THREE.Vector2(0.4, 4.7));
    pts.push(new THREE.Vector2(0.32, 4.9));
    return pts;
  }, []);

  return (
    <group position={[x, 0, 0]}>
      {/* base frame */}
      <mesh position={[0, -0.1, -1.2]} castShadow receiveShadow>
        <boxGeometry args={[8, 0.3, 0.3]} />
        <DarkMat />
      </mesh>
      {[-3.4, 3.4].map((px) => (
        <mesh key={px} position={[px, 2.4, -1.2]} castShadow>
          <boxGeometry args={[0.16, 5, 0.16]} />
          <DarkMat />
        </mesh>
      ))}

      {/* gearbox / motor */}
      <mesh position={[-3, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.4, 1.6]} />
        <DarkMat color="#2c3137" />
      </mesh>
      {/* hopper */}
      <mesh position={[-1.5, 2.3, 0]} castShadow>
        <coneGeometry args={[0.7, 1.1, 4]} />
        <SteelMat rough={0.4} />
      </mesh>
      {/* barrel */}
      <mesh position={[-1.2, 0.85, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 3.2, 32]} />
        <SteelMat rough={0.28} />
      </mesh>
      {/* heater bands (ember) */}
      <group ref={bands}>
        {[-2.1, -1.4, -0.7].map((px) => (
          <mesh key={px} position={[px, 0.85, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.5, 0.5, 0.28, 32]} />
            <meshStandardMaterial color="#1a1a1a" emissive="#E8743B" emissiveIntensity={2.4} roughness={0.6} />
          </mesh>
        ))}
      </group>
      {/* die head */}
      <mesh position={[0.4, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.55, 0.7, 32]} />
        <SteelMat rough={0.3} />
      </mesh>
      <pointLight position={[0.4, 0.9, 0.6]} color="#E8743B" intensity={9} distance={6} />

      {/* the bubble — real translucent film */}
      <mesh ref={bubble} position={[0.4, 0.9, 0]} castShadow>
        <latheGeometry args={[profile, 64]} />
        <MeshTransmissionMaterial
          samples={8}
          resolution={512}
          thickness={0.6}
          roughness={0.08}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.25}
          distortionScale={0.4}
          temporalDistortion={0.1}
          color="#d6f3f0"
          attenuationColor="#1FA6A0"
          attenuationDistance={1.4}
          clearcoat={1}
          backside
        />
      </mesh>
      {/* teal core glow inside the bubble */}
      <pointLight position={[0.4, 2.4, 0]} color="#1FA6A0" intensity={5} distance={5} />
      <mesh position={[0.4, 1.6, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#1FA6A0" transparent opacity={0.12} />
      </mesh>

      {/* nip rollers */}
      <mesh ref={nipA} position={[0.1, 5.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 1.4, 24]} />
        <SteelMat />
      </mesh>
      <mesh ref={nipB} position={[0.7, 5.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 1.4, 24]} />
        <SteelMat />
      </mesh>

      {/* lay-flat film to winder */}
      <mesh position={[2.2, 5.1, 0]} rotation={[0, 0, -0.2]}>
        <planeGeometry args={[3, 0.9]} />
        <meshStandardMaterial color="#bfeae6" transparent opacity={0.25} roughness={0.1} metalness={0} side={THREE.DoubleSide} />
      </mesh>
      {/* winder roll */}
      <mesh ref={winder} position={[3.4, 3.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.95, 0.95, 1.5, 32]} />
        <meshStandardMaterial color="#cfd6db" roughness={0.55} metalness={0.2} />
      </mesh>
    </group>
  );
}

/* ===================== 02 · CI FLEXO PRESS ===================== */
function FlexoMachine({ x }: { x: number }) {
  const drum = useRef<THREE.Mesh>(null);
  const decks = useRef<THREE.Group>(null);
  const brand = useBrandTexture("Fora");

  useFrame((_, d) => {
    if (drum.current) drum.current.rotation.x += d * 0.5;
    if (decks.current)
      decks.current.children.forEach((c) => ((c as THREE.Mesh).rotation.x -= d * 1.5));
  });

  const deckColors = ["#19a7d6", "#d63995", "#e8c23b", "#cfd6db", "#1FA6A0"];

  return (
    <group position={[x, 1.4, 0]}>
      {/* base */}
      <mesh position={[0, -1.4, -1]} receiveShadow>
        <boxGeometry args={[7, 0.4, 2]} />
        <DarkMat />
      </mesh>
      {/* central impression drum */}
      <mesh ref={drum} position={[0, 1.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 2.2, 2.6, 64]} />
        <SteelMat rough={0.25} color="#aeb6bd" />
      </mesh>
      <mesh position={[0, 1.4, 1.32]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2.2, 0.04, 12, 64]} />
        <DarkMat />
      </mesh>

      {/* print decks around the drum */}
      <group ref={decks}>
        {deckColors.map((c, i) => {
          const a = Math.PI * (0.35 + i * 0.32);
          const r = 2.7;
          return (
            <mesh
              key={i}
              position={[0, 1.4 + Math.sin(a) * r, Math.cos(a) * r]}
              rotation={[0, 0, Math.PI / 2]}
              castShadow
            >
              <cylinderGeometry args={[0.5, 0.5, 2.2, 32]} />
              <meshStandardMaterial color={c} metalness={0.6} roughness={0.35} emissive={c} emissiveIntensity={0.25} />
            </mesh>
          );
        })}
      </group>

      {/* exit printed film */}
      <mesh position={[3.4, 0.2, 1.4]} rotation={[0, -0.5, 0]} castShadow>
        <planeGeometry args={[2.4, 1.5]} />
        <meshStandardMaterial map={brand ?? undefined} roughness={0.4} metalness={0} side={THREE.DoubleSide} />
      </mesh>
      {/* unwind */}
      <mesh position={[-3, -0.6, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 1.6, 32]} />
        <SteelMat rough={0.5} />
      </mesh>
    </group>
  );
}

/* ===================== 03 · SEAL & CUT ===================== */
function SealMachine({ x }: { x: number }) {
  const sealBar = useRef<THREE.Mesh>(null);
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const heat = useRef<THREE.MeshStandardMaterial>(null);
  const brand = useBrandTexture("Fora");

  useFrame((s, d) => {
    if (r1.current) r1.current.rotation.x += d * 2;
    if (r2.current) r2.current.rotation.x += d * 2;
    const t = (Math.sin(s.clock.elapsedTime * 2.2) + 1) / 2; // 0..1
    if (sealBar.current) sealBar.current.position.y = 2.3 - t * 0.7;
    if (heat.current) heat.current.emissiveIntensity = t * 2.5;
  });

  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, -0.1, -1]} receiveShadow>
        <boxGeometry args={[8, 0.3, 0.4]} />
        <DarkMat />
      </mesh>
      {/* draw rollers */}
      <mesh ref={r1} position={[-2.4, 1.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 2.4, 32]} />
        <SteelMat />
      </mesh>
      <mesh ref={r2} position={[-2.4, 0.9, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 2.4, 32]} />
        <SteelMat />
      </mesh>
      {/* film through */}
      <mesh position={[-0.4, 1.2, 0]}>
        <planeGeometry args={[3.2, 1.6]} />
        <meshStandardMaterial color="#bfeae6" transparent opacity={0.2} roughness={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* seal jaw (presses) */}
      <mesh ref={sealBar} position={[0.4, 2.3, 0]} castShadow>
        <boxGeometry args={[1.8, 0.5, 2]} />
        <SteelMat rough={0.4} />
      </mesh>
      <mesh position={[0.4, 0.55, 0]}>
        <boxGeometry args={[1.8, 0.4, 2]} />
        <meshStandardMaterial ref={heat} color="#2a2a2a" emissive="#E8743B" emissiveIntensity={0.6} roughness={0.6} />
      </mesh>
      {/* finished bags stacking */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[3 + i * 0.1, 0.6 + i * 0.42, 0]} rotation={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.8, 0.38, 1.4]} />
          <meshStandardMaterial map={brand ?? undefined} color="#e9e4da" roughness={0.5} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

/* ===================== 04 · ROBOTIC PALLETISER ===================== */
function PalletiserMachine({ x }: { x: number }) {
  const shoulder = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  const brand = useBrandTexture("Fora");

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (shoulder.current) shoulder.current.rotation.z = -0.5 + Math.sin(t * 0.8) * 0.35;
    if (elbow.current) elbow.current.rotation.z = 0.7 + Math.cos(t * 0.8) * 0.4;
  });

  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, -0.1, -1]} receiveShadow>
        <boxGeometry args={[8, 0.3, 0.4]} />
        <DarkMat />
      </mesh>
      {/* robot base + column */}
      <mesh position={[-2.4, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.2, 1.4]} />
        <DarkMat color="#E8743B" />
      </mesh>
      <mesh position={[-2.4, 2, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.4, 2, 24]} />
        <SteelMat rough={0.4} />
      </mesh>
      {/* arm */}
      <group ref={shoulder} position={[-2.4, 3, 0]}>
        <mesh position={[1, 0, 0]} castShadow>
          <boxGeometry args={[2.4, 0.4, 0.4]} />
          <SteelMat rough={0.4} color="#E8743B" />
        </mesh>
        <group ref={elbow} position={[2.2, 0, 0]}>
          <mesh position={[1, 0, 0]} castShadow>
            <boxGeometry args={[2.2, 0.34, 0.34]} />
            <SteelMat rough={0.4} />
          </mesh>
          {/* gripper + box */}
          <mesh position={[2.1, -0.4, 0]} castShadow>
            <boxGeometry args={[1, 0.9, 1]} />
            <meshStandardMaterial map={brand ?? undefined} color="#e9e4da" roughness={0.55} />
          </mesh>
        </group>
      </group>
      {/* pallet + stacked boxes */}
      <mesh position={[2.6, 0.15, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.6, 0.3, 2]} />
        <DarkMat color="#5a4636" />
      </mesh>
      {[
        [1.9, 0.8, 0.5],
        [3.2, 0.8, 0.5],
        [1.9, 0.8, -0.55],
        [2.6, 1.65, 0],
      ].map((p, i) => (
        <mesh key={i} position={[p[0], p[1], p[2]]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.85, 1]} />
          <meshStandardMaterial map={brand ?? undefined} color="#e9e4da" roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

/* ===================== SCENE ===================== */
function Scene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  return (
    <>
      <color attach="background" args={["#080a0b"]} />
      <fog attach="fog" args={["#080a0b", 24, 54]} />
      <Rig progressRef={progressRef} />

      <ambientLight intensity={0.34} />
      <directionalLight position={[8, 16, 10]} intensity={2.6} castShadow shadow-mapSize={[2048, 2048]}>
        <orthographicCamera attach="shadow-camera" args={[-40, 40, 40, -40, 0.1, 80]} />
      </directionalLight>
      <directionalLight position={[-12, 7, -4]} intensity={0.9} color="#1FA6A0" />
      <directionalLight position={[4, 4, 12]} intensity={0.7} color="#ECE7DC" />

      <ExtruderMachine x={0} />
      <FlexoMachine x={SPACING} />
      <SealMachine x={SPACING * 2} />
      <PalletiserMachine x={SPACING * 3} />

      <ContactShadows position={[0, -0.05, 0]} scale={120} far={12} blur={2.4} opacity={0.5} resolution={512} />

      {/* procedural studio reflections (no network HDRI) */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2} position={[0, 6, 4]} scale={[12, 4, 1]} color="#ECE7DC" />
        <Lightformer intensity={1.2} position={[-6, 3, 2]} scale={[6, 6, 1]} color="#9fc6c6" />
        <Lightformer intensity={1.5} position={[8, 2, -2]} scale={[6, 6, 1]} color="#E8743B" />
        <Lightformer intensity={0.8} position={[0, -4, 2]} scale={[12, 4, 1]} color="#1FA6A0" />
      </Environment>

      <EffectComposer>
        <Bloom mipmapBlur intensity={0.65} luminanceThreshold={0.6} luminanceSmoothing={0.3} />
      </EffectComposer>
    </>
  );
}

export default function ProductionLine3D({
  progressRef,
}: {
  progressRef: MutableRefObject<number>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 1.7]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [2.4, 3, 14.5], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Scene progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
