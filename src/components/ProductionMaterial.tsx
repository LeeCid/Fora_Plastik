"use client";

import { useEffect, useMemo, useRef, useState, MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * One living sheet of plastic that transforms through the production line as
 * the user travels it horizontally:
 *   molten extrusion (ember, viscous) → flexo print (CMYK ink) →
 *   cutting (scan line) → finished film (catching light).
 * A single full-screen GLSL plane — cheap, continuous, material-real.
 */
const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uStage;   // 0..1 horizontal progress
  uniform vec2  uRes;
  varying vec2 vUv;

  float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p);
    float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
    vec2 u=f*f*(3.-2.*f);
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm(vec2 p){
    float v=0., a=0.5;
    mat2 m=mat2(1.6,1.2,-1.2,1.6);
    for(int i=0;i<5;i++){ v+=a*noise(p); p=m*p; a*=0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = vec2(uv.x*aspect, uv.y);

    float t = uTime*0.05;
    vec2 fl = vec2(t*2.0, t*0.3);                 // material flows along the line
    vec2 q  = vec2(fbm(p*1.8+fl), fbm(p*1.8+fl+7.1));
    float n = fbm(p*2.0 + q*1.6 - fl);
    float h = smoothstep(0.18, 0.96, n);

    float s    = clamp(uStage,0.,1.)*3.0;
    float cool = clamp(uStage,0.,1.);

    // base: molten ember -> cool translucent teal film
    vec3 emberDark = vec3(0.050,0.035,0.028);
    vec3 ember     = vec3(0.95,0.46,0.22);
    vec3 filmTeal  = vec3(0.030,0.115,0.110);
    vec3 col = mix(emberDark, filmTeal, cool);

    // hot veins / glowing cores, fade as it cools
    float veins = pow(h,2.0);
    col += ember * veins * (1.0-cool) * 1.25;
    col += ember * pow(h,6.0) * (1.0-cool) * 0.85;
    // translucency tint when cool
    col += filmTeal * h * cool * 1.5;

    // flexo CMYK ink — windowed around stage 1
    float inkWin = smoothstep(0.55,1.05,s) * (1.0 - smoothstep(1.55,2.1,s));
    vec3 ink = vec3(0.0);
    ink += vec3(0.10,0.68,0.94)*smoothstep(0.55,0.80, fbm(p*4.2+vec2(0.0,fl.y*2.0)+fl));
    ink += vec3(0.93,0.10,0.55)*smoothstep(0.55,0.80, fbm(p*4.2+vec2(2.3,fl.y*2.0)+fl));
    ink += vec3(0.95,0.80,0.10)*smoothstep(0.60,0.84, fbm(p*4.2+vec2(4.6,fl.y*2.0)+fl));
    col += ink * inkWin * 0.42;

    // cutting scan line — windowed around stage 2
    float cutWin = smoothstep(1.55,2.05,s) * (1.0 - smoothstep(2.45,2.95,s));
    float cy = fract(uTime*0.12);
    float line = smoothstep(0.012, 0.0, abs(uv.y - cy));
    col += vec3(0.16,0.70,0.66) * line * cutWin * 1.3;

    // sweeping specular highlight — material catching light
    float sweep = sin((uv.x*1.1 + uv.y*0.5)*3.14159 - uTime*0.45);
    float band = smoothstep(0.72,1.0, sweep);
    col += vec3(0.90,0.95,0.92) * band * (0.09 + 0.20*cool) * (0.4 + h);

    // vignette + fine grain
    float vig = smoothstep(1.18, 0.32, distance(uv, vec2(0.5)));
    col *= 0.52 + 0.62*vig;
    col += hash(uv*uRes*0.5 + uTime)*0.05 - 0.025;

    float alpha = 0.50 + 0.42*h;
    gl_FragColor = vec4(col, alpha);
  }
`;

function MaterialPlane({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStage: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!mat.current) return;
    uniforms.uTime.value += Math.min(delta, 0.05);
    // smooth toward target horizontal progress
    uniforms.uStage.value += (progressRef.current - uniforms.uStage.value) * 0.08;
    uniforms.uRes.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function ProductionMaterial({
  progressRef,
}: {
  progressRef: MutableRefObject<number>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.6]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <MaterialPlane progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
