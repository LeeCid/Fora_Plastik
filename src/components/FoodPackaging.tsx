"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { foodFeatures, foodLayers } from "@/data/content";

export function FoodPackaging() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(SVGGElement | null)[]>([]);
  const leadRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // laminate explodes apart as the section scrolls through
      layerRefs.current.forEach((l, i) => {
        if (!l) return;
        const dy = (i - 1.5) * 52;
        gsap.fromTo(
          l,
          { y: 0 },
          {
            y: dy,
            ease: "none",
            scrollTrigger: { trigger: rootRef.current, start: "top 72%", end: "bottom 55%", scrub: 0.7 },
          }
        );
      });
      leadRefs.current.forEach((l, i) => {
        if (!l) return;
        gsap.fromTo(
          l,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: rootRef.current, start: "top 60%", end: "center 60%", scrub: 0.7 },
          }
        );
      });
      gsap.from("[data-food-feature]", {
        opacity: 0,
        x: 22,
        stagger: 0.05,
        duration: 0.6,
        scrollTrigger: { trigger: "[data-food-features]", start: "top 82%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gida" ref={rootRef} className="relative py-32 md:py-44">
      <div className="wrap grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">05 — Teknik Kalite</span>
            <span className="mono text-[0.6rem] uppercase tracking-[0.3em] text-steel">Gıda bölümü</span>
          </div>
          <div className="rule mt-5" />

          <h2 className="display mt-10 text-[clamp(2rem,4.5vw,3.8rem)] text-bone">
            Gıda ambalajında
            <br />
            <span className="serif lowercase italic text-teal">katman katman güven.</span>
          </h2>

          <LaminateDiagram layerRefs={layerRefs} leadRefs={leadRefs} />

          <p className="mono mt-2 text-center text-[0.6rem] uppercase tracking-[0.25em] text-steel">
            Kaydırın — film kesiti katmanlarına ayrılır
          </p>
        </div>

        <div data-food-features>
          <p className="mono mb-6 text-[0.62rem] uppercase tracking-[0.3em] text-steel">
            Kuru gıda & makarna ambalajı
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2">
            {foodFeatures.map((f, i) => (
              <li
                key={f}
                data-food-feature
                className="flex items-center gap-3 border-t border-bone/10 py-4 text-sm text-bone/80"
              >
                <span className="mono text-[0.6rem] text-teal">0{i + 1}</span>
                {f}
              </li>
            ))}
          </ul>
          <p className="serif mt-8 text-lg italic leading-relaxed text-bone/60">
            İki veya çok katlı yapı kombinasyonlarıyla, hızlı paketleme
            makinelerine uygun güçlü yapışma özelliğine sahip çözümler.
          </p>
        </div>
      </div>
    </section>
  );
}

function LaminateDiagram({
  layerRefs,
  leadRefs,
}: {
  layerRefs: React.MutableRefObject<(SVGGElement | null)[]>;
  leadRefs: React.MutableRefObject<(SVGGElement | null)[]>;
}) {
  // isometric film slabs, top → bottom of the laminate
  const tops = ["#cfd6db", "#1FA6A0", "#7a828c", "#ECE7DC"];
  const sides = ["#8b9298", "#0C5A57", "#474d54", "#b9b3a6"];
  const baseY = [70, 122, 174, 226];

  // iso tile geometry
  const TL = { x: 70, y: 0 };
  const W = 190;
  const DX = 54;
  const DY = 38;
  const TH = 10;

  const tile = (y: number) =>
    `${TL.x},${y} ${TL.x + W},${y} ${TL.x + W + DX},${y - DY} ${TL.x + DX},${y - DY}`;
  const front = (y: number) =>
    `${TL.x},${y} ${TL.x + W},${y} ${TL.x + W},${y + TH} ${TL.x},${y + TH}`;
  const sideFace = (y: number) =>
    `${TL.x + W},${y} ${TL.x + W + DX},${y - DY} ${TL.x + W + DX},${y - DY + TH} ${TL.x + W},${y + TH}`;

  return (
    <div className="relative mt-12">
      <svg viewBox="0 0 470 320" className="h-auto w-full overflow-visible">
        <defs>
          {/* print layer: CMYK micro-dots */}
          <pattern id="cmyk" width="14" height="10" patternUnits="userSpaceOnUse" patternTransform="skewX(-55) scale(1)">
            <circle cx="3" cy="3" r="1.6" fill="#19a7d6" />
            <circle cx="8" cy="6" r="1.6" fill="#d63995" />
            <circle cx="12" cy="3" r="1.6" fill="#e8c23b" />
          </pattern>
          {/* lamination adhesive cross-hatch */}
          <pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="skewX(-55)">
            <path d="M0 9 L9 0" stroke="rgba(236,231,220,0.4)" strokeWidth="0.7" />
          </pattern>
          <linearGradient id="barrierSheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1FA6A0" />
            <stop offset="50%" stopColor="#67d6d0" />
            <stop offset="100%" stopColor="#0C5A57" />
          </linearGradient>
        </defs>

        {foodLayers.map((layer, i) => {
          const y = baseY[i];
          const overlays = ["url(#cmyk)", "url(#barrierSheen)", "url(#hatch)", "none"];
          return (
            <g key={layer.name} ref={(el) => { layerRefs.current[i] = el; }}>
              {/* front + side thickness */}
              <polygon points={sideFace(y)} fill={sides[i]} opacity="0.92" />
              <polygon points={front(y)} fill={sides[i]} />
              {/* top face */}
              <polygon points={tile(y)} fill={tops[i]} opacity="0.95" />
              {/* material overlay on the top face */}
              <polygon points={tile(y)} fill={overlays[i]} opacity={i === 1 ? 0.55 : 0.85} />
              {/* edge highlight */}
              <polyline points={`${TL.x + DX},${y - DY} ${TL.x + W + DX},${y - DY}`} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

              {/* leader line + label */}
              <g ref={(el) => { leadRefs.current[i] = el; }}>
                <line x1={TL.x + W + DX} y1={y - DY / 2} x2={430} y2={y - DY / 2} stroke="rgba(236,231,220,0.25)" strokeWidth="1" />
                <circle cx={430} cy={y - DY / 2} r="2" fill="#1FA6A0" />
                <text x={300} y={y - DY / 2 - 5} className="mono" fontSize="8.5" letterSpacing="1" fill="#ECE7DC">
                  0{i + 1} · {layer.name.toUpperCase()}
                </text>
                <text x={300} y={y - DY / 2 + 8} fontSize="8" fill="rgba(236,231,220,0.5)">
                  {layer.note}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
