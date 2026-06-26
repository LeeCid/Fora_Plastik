"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shrink } from "@/data/content";

export function Shrink() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<SVGRectElement>(null);
  const boxRefs = useRef<(SVGRectElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 68%",
          end: "bottom 62%",
          scrub: 0.7,
        },
      });
      const scatter = [
        { x: -22, y: -8, r: -9 },
        { x: 18, y: 6, r: 7 },
        { x: -10, y: 12, r: -4 },
        { x: 14, y: -10, r: 6 },
      ];
      boxRefs.current.forEach((b, i) => {
        if (!b) return;
        tl.fromTo(
          b,
          { x: scatter[i].x, y: scatter[i].y, rotate: scatter[i].r, transformOrigin: "center" },
          { x: 0, y: 0, rotate: 0, duration: 1 },
          0
        );
      });
      tl.fromTo(
        wrapRef.current,
        { scaleY: 0, transformOrigin: "top center", opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 1.2 },
        0.8
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative py-32 md:py-44">
      <div className="wrap grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(31,166,160,0.16),transparent_65%)] blur-2xl" />
            <svg viewBox="0 0 320 320" className="relative h-full w-full">
              <rect x="60" y="262" width="200" height="18" rx="3" fill="#2a2e33" />
              <rect x="70" y="280" width="24" height="20" fill="#16181b" />
              <rect x="148" y="280" width="24" height="20" fill="#16181b" />
              <rect x="226" y="280" width="24" height="20" fill="#16181b" />
              {[
                { x: 78, y: 150, w: 76, h: 56 },
                { x: 166, y: 150, w: 76, h: 56 },
                { x: 78, y: 200, w: 76, h: 56 },
                { x: 166, y: 200, w: 76, h: 56 },
              ].map((b, i) => (
                <rect
                  key={i}
                  ref={(el) => { boxRefs.current[i] = el; }}
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx="3"
                  fill="#1c1f23"
                  stroke="rgba(236,231,220,0.1)"
                />
              ))}
              <rect
                ref={wrapRef}
                x="70"
                y="140"
                width="180"
                height="124"
                rx="6"
                fill="url(#shrinkGrad2)"
                stroke="rgba(31,166,160,0.45)"
              />
              <defs>
                <linearGradient id="shrinkGrad2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1FA6A0" stopOpacity="0.26" />
                  <stop offset="100%" stopColor="#ECE7DC" stopOpacity="0.06" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">06 — Koruma & Lojistik</span>
            <span className="mono text-[0.6rem] uppercase tracking-[0.3em] text-steel">
              Sevkiyata hazır
            </span>
          </div>
          <div className="rule mt-5" />
          <h2 className="display mt-10 text-[clamp(2rem,4.5vw,3.8rem)] text-bone">
            {shrink.title}
          </h2>
          <p className="serif mt-6 max-w-md text-lg italic leading-relaxed text-bone/70">
            {shrink.lead}
          </p>
          <ul className="mt-8">
            {shrink.points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-4 border-t border-bone/10 py-4 text-sm text-bone/80"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
