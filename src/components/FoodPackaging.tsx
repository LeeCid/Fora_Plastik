"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { foodFeatures, foodLayers } from "@/data/content";

export function FoodPackaging() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      layerRefs.current.forEach((l, i) => {
        if (!l) return;
        gsap.fromTo(
          l,
          { y: 0, rotateX: 0 },
          {
            y: (i - 1.5) * 70,
            rotateX: 9,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 68%",
              end: "bottom 58%",
              scrub: 0.8,
            },
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

  const layerColors = ["#1FA6A0", "#0C5A57", "#3a4148", "#ECE7DC"];

  return (
    <section id="gida" ref={rootRef} className="relative py-32 md:py-44">
      <div className="wrap grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">05 — Teknik Kalite</span>
            <span className="mono text-[0.6rem] uppercase tracking-[0.3em] text-steel">
              Gıda bölümü
            </span>
          </div>
          <div className="rule mt-5" />

          <h2 className="display mt-10 text-[clamp(2rem,4.5vw,3.8rem)] text-bone">
            Gıda ambalajında
            <br />
            <span className="serif lowercase italic text-teal">katman katman güven.</span>
          </h2>

          <div className="relative mt-16 h-[320px]" style={{ perspective: "1100px" }}>
            <div
              className="absolute left-1/2 top-1/2 h-[190px] w-[300px] -translate-x-1/2 -translate-y-1/2"
              style={{ transformStyle: "preserve-3d" }}
            >
              {foodLayers.map((layer, i) => (
                <div
                  key={layer.name}
                  ref={(el) => { layerRefs.current[i] = el; }}
                  className="absolute inset-0 flex items-center justify-between rounded-lg px-5 shadow-2xl ring-1 ring-bone/10"
                  style={{
                    background: `linear-gradient(135deg, ${layerColors[i]}dd, ${layerColors[i]}55)`,
                    zIndex: foodLayers.length - i,
                    color: i === 3 ? "#0a0b0d" : "#ECE7DC",
                  }}
                >
                  <span className="mono text-[0.7rem] uppercase tracking-wider opacity-80">
                    0{i + 1}
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{layer.name}</p>
                    <p className="text-[0.66rem] opacity-80">{layer.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mono mt-3 text-center text-[0.6rem] uppercase tracking-[0.25em] text-steel">
            Kaydırın — kesit katmanlarına ayrılır
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
