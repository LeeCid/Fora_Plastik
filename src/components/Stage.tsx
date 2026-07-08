"use client";

import { useEffect, useRef } from "react";

/**
 * One continuous world behind all content. As the page scrolls, the
 * environment tone cross-fades through the production journey so every
 * chapter feels like the same descending shot — not separate sections.
 */
type Env = { a: string; b: string; glow: string };

// granule → extruder heat → print hall → steel cutting → food bay →
// shrink cold → warehouse → loading dock / dusk
// Belirgin şekilde aydınlık, doygun sahne tonları — siyah değil, renkli atmosfer.
const ENVS: Env[] = [
  { a: "#20393b", b: "#347064", glow: "rgba(67,198,192,0.40)" }, // granule — deep teal
  { a: "#38271b", b: "#6a3d1c", glow: "rgba(232,116,59,0.44)" }, // extrusion heat — amber
  { a: "#2e2438", b: "#513a66", glow: "rgba(214,57,149,0.30)" }, // print hall — magenta hint
  { a: "#2b333d", b: "#465862", glow: "rgba(150,165,180,0.30)" }, // cutting / steel
  { a: "#2a3c31", b: "#476e59", glow: "rgba(236,231,220,0.22)" }, // food bay — clean green
  { a: "#213f4b", b: "#2e6683", glow: "rgba(67,198,192,0.38)" }, // shrink cold — cyan
  { a: "#2c3138", b: "#465159", glow: "rgba(140,152,164,0.28)" }, // warehouse
  { a: "#38281b", b: "#69401f", glow: "rgba(232,116,59,0.40)" }, // dusk dock — warm
];

function hexToRgb(h: string) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(c1: string, c2: string, t: number) {
  const a = hexToRgb(c1);
  const b = hexToRgb(c2);
  const r = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${r[0]},${r[1]},${r[2]})`;
}
function mixRgba(c1: string, c2: string, t: number) {
  const p = (s: string) => s.match(/[\d.]+/g)!.map(Number);
  const a = p(c1);
  const b = p(c2);
  const r = a.map((v, i) => v + (b[i] - v) * t);
  return `rgba(${Math.round(r[0])},${Math.round(r[1])},${Math.round(r[2])},${r[3].toFixed(3)})`;
}

export function Stage() {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    const glow = glowRef.current;
    if (!el) return;

    const update = () => {
      const doc = document.documentElement;
      const p = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
      const clamped = Math.min(0.9999, Math.max(0, p));
      const seg = clamped * (ENVS.length - 1);
      const i = Math.floor(seg);
      const t = seg - i;
      const cur = ENVS[i];
      const nxt = ENVS[Math.min(ENVS.length - 1, i + 1)];

      const a = mix(cur.a, nxt.a, t);
      const b = mix(cur.b, nxt.b, t);
      const g = mixRgba(cur.glow, nxt.glow, t);

      el.style.background = `radial-gradient(140% 120% at 50% ${
        18 + clamped * 30
      }%, ${b} 0%, ${a} 60%)`;
      if (glow) {
        glow.style.background = `radial-gradient(45% 38% at ${
          30 + Math.sin(clamped * Math.PI * 2) * 28
        }% ${20 + clamped * 60}%, ${g}, transparent 70%)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <div ref={ref} className="absolute inset-0" />
      <div ref={glowRef} className="absolute inset-0 mix-blend-screen" />
      {/* sabit marka renk yıkaması — köşelerde sıcak/soğuk denge */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(52% 38% at 88% 6%, rgba(232,116,59,0.16), transparent 70%), radial-gradient(46% 34% at 6% 94%, rgba(31,166,160,0.18), transparent 70%)",
        }}
      />
      {/* faint steel scan texture for material grounding */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(236,231,220,0.5) 0px, rgba(236,231,220,0.5) 1px, transparent 1px, transparent 4px)",
        }}
      />
    </div>
  );
}
