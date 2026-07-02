"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { foodFeatures, foodLayers } from "@/data/content";

export function FoodPackaging() {
  const rootRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(SVGGElement | null)[]>([]);
  const leadRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const diagram = diagramRef.current;
      if (!diagram) return;

      // One scrubbed timeline = single source of truth (no fighting tweens).
      // First half: the laminate fans OPEN to reveal four layers.
      // Second half: it seals back into one finished product surface.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: diagram,
          // Diyagram ekrana girerken açılır, ortadayken kapanır — tüm
          // aç-kapan seyri görünür alanda oynar.
          start: "top 88%",
          end: "bottom 32%",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      layerRefs.current.forEach((l, i) => {
        if (!l) return;
        const dy = (i - 1.5) * 64;
        tl.fromTo(l, { y: 0 }, { y: dy, ease: "sine.out" }, 0);
        tl.to(l, { y: 0, ease: "sine.in" }, 0.5);
      });
      leadRefs.current.forEach((l) => {
        if (!l) return;
        tl.fromTo(l, { opacity: 0 }, { opacity: 1, ease: "none" }, 0.05);
        tl.to(l, { opacity: 0, ease: "none" }, 0.6);
      });
      tl.fromTo("[data-product-tag]", { opacity: 0, y: 8 }, { opacity: 1, y: 0, ease: "none" }, 0.72);
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
    // "Temiz oda" — gıda bölümü açık renk bant: steril, laboratuvar hissi.
    // Koyu sinematik akışı kıran bilinçli art-direction kontrastı.
    <section
      id="gida"
      ref={rootRef}
      className="relative py-32 text-[#161d19] md:py-44"
      style={{ background: "linear-gradient(180deg, #c5c0b4 0%, #bab5a8 100%)" }}
    >
      <div className="wrap grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow !text-[#5a6660]">05 — Teknik Kalite</span>
            <span className="mono text-[0.6rem] uppercase tracking-[0.3em] text-[#5a6660]">
              Temiz oda · Gıda bölümü
            </span>
          </div>
          <div className="mt-5 h-px w-full bg-[#161d19]/15" />

          <h2 className="display mt-10 text-[clamp(2rem,4.5vw,3.8rem)] text-[#161d19]">
            Gıda ambalajında
            <br />
            <span className="grad-accent-paper">katman katman güven.</span>
          </h2>

          <LaminateDiagram diagramRef={diagramRef} layerRefs={layerRefs} leadRefs={leadRefs} />

          <p className="mono mt-2 text-center text-[0.6rem] uppercase tracking-[0.25em] text-[#5a6660]">
            Kaydırın — film kesiti katmanlarına ayrılır
          </p>
        </div>

        <div data-food-features>
          <p className="mono mb-6 text-[0.62rem] uppercase tracking-[0.3em] text-[#5a6660]">
            Kuru gıda & makarna ambalajı
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2">
            {foodFeatures.map((f, i) => (
              <li
                key={f}
                data-food-feature
                className="flex items-center gap-3 border-t border-[#161d19]/12 py-4 text-sm text-[#161d19]/85"
              >
                <span className="mono text-[0.6rem] text-teal-deep">0{i + 1}</span>
                {f}
              </li>
            ))}
          </ul>
          <p className="serif mt-8 text-lg italic leading-relaxed text-[#161d19]/70">
            İki veya çok katlı yapı kombinasyonlarıyla, hızlı paketleme
            makinelerine uygun güçlü yapışma özelliğine sahip çözümler.
          </p>
        </div>
      </div>
    </section>
  );
}

function LaminateDiagram({
  diagramRef,
  layerRefs,
  leadRefs,
}: {
  diagramRef: React.RefObject<HTMLDivElement>;
  layerRefs: React.MutableRefObject<(SVGGElement | null)[]>;
  leadRefs: React.MutableRefObject<(SVGGElement | null)[]>;
}) {
  // isometric film slabs, top → bottom of the laminate.
  // Rest positions are a TIGHT stack (one product surface); scroll fans them
  // open to reveal the four layers, then seals them back together.
  // Açık "temiz oda" zemininde okunacak tonlar
  const tops = ["#c3ccd3", "#1FA6A0", "#6d7681", "#d9d2c1"];
  const sides = ["#7d858d", "#0C5A57", "#3c434b", "#a89f8d"];
  const baseY = [148, 162, 176, 190];

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
    <div ref={diagramRef} className="relative mt-12">
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
            <path d="M0 9 L9 0" stroke="rgba(240,236,226,0.55)" strokeWidth="0.7" />
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
                <line x1={TL.x + W + DX} y1={y - DY / 2} x2={430} y2={y - DY / 2} stroke="rgba(22,29,25,0.3)" strokeWidth="1" />
                <circle cx={430} cy={y - DY / 2} r="2" fill="#0C5A57" />
                <text x={300} y={y - DY / 2 - 5} className="mono" fontSize="8.5" letterSpacing="1" fill="#161d19">
                  0{i + 1} · {layer.name.toUpperCase()}
                </text>
                <text x={300} y={y - DY / 2 + 8} fontSize="8" fill="rgba(22,29,25,0.6)">
                  {layer.note}
                </text>
              </g>
            </g>
          );
        })}

        {/* product surface tag — revealed once the layers seal up */}
        <g data-product-tag style={{ opacity: 0 }}>
          <line x1={TL.x + W + DX} y1={baseY[1] - DY / 2} x2={430} y2={baseY[1] - DY / 2} stroke="rgba(12,90,87,0.6)" strokeWidth="1" />
          <circle cx={430} cy={baseY[1] - DY / 2} r="2.4" fill="#0C5A57" />
          <text x={300} y={baseY[1] - DY / 2 - 5} className="mono" fontSize="9" letterSpacing="1.5" fill="#0C5A57">
            ÜRÜN YÜZEYİ
          </text>
          <text x={300} y={baseY[1] - DY / 2 + 8} fontSize="8" fill="rgba(22,29,25,0.65)">
            tek gövde laminasyon
          </text>
        </g>
      </svg>
    </div>
  );
}
