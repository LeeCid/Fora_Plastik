"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shrink } from "@/data/content";

export function Shrink() {
  const rootRef = useRef<HTMLDivElement>(null);
  const filmRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // film wraps DOWN over the load as the section scrolls in
      if (filmRef.current) {
        gsap.fromTo(
          filmRef.current,
          { scaleY: 0, transformOrigin: "top center", opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: rootRef.current, start: "top 75%", end: "center 60%", scrub: 0.7 },
          }
        );
      }
      gsap.from("[data-shield]", {
        opacity: 0,
        scale: 0.7,
        transformOrigin: "center",
        stagger: 0.12,
        duration: 0.6,
        scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative py-32 md:py-44">
      <div className="wrap grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <PalletWrap filmRef={filmRef} />
        </div>

        <div className="order-1 lg:order-2">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">06 — Koruma & Lojistik</span>
            <span className="mono text-[0.6rem] uppercase tracking-[0.3em] text-steel">
              Sevkiyata hazır
            </span>
          </div>
          <div className="rule mt-5" />
          <h2 className="display mt-10 text-[clamp(2rem,4.5vw,3.8rem)] text-bone">{shrink.title}</h2>
          <p className="serif mt-6 max-w-md text-lg italic leading-relaxed text-bone/70">{shrink.lead}</p>
          <ul className="mt-8">
            {shrink.points.map((p) => (
              <li key={p} className="flex items-start gap-4 border-t border-bone/10 py-4 text-sm text-bone/80">
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

function PalletWrap({ filmRef }: { filmRef: React.RefObject<SVGGElement> }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_55%,rgba(31,166,160,0.16),transparent_62%)] blur-2xl" />
      <svg viewBox="0 0 360 360" className="relative h-full w-full overflow-visible">
        <defs>
          <linearGradient id="filmG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67d6d0" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1FA6A0" stopOpacity="0.12" />
          </linearGradient>
          <clipPath id="loadClip">
            <polygon points="118,120 248,120 248,288 118,288" />
            <polygon points="118,120 248,120 296,84 166,84" />
            <polygon points="248,120 296,84 296,252 248,288" />
          </clipPath>
        </defs>

        {/* pallet */}
        <polygon points="104,288 262,288 310,252 152,252" fill="#3a2e22" />
        <polygon points="104,288 262,288 262,306 104,306" fill="#241c14" />
        <rect x="112" y="306" width="22" height="16" fill="#16120c" />
        <rect x="172" y="306" width="22" height="16" fill="#16120c" />
        <rect x="232" y="306" width="22" height="16" fill="#16120c" />

        {/* unitised cardboard load (3/4 view, divided into boxes) */}
        <g>
          {/* front */}
          <polygon points="118,120 248,120 248,288 118,288" fill="#262019" stroke="rgba(236,231,220,0.12)" />
          {/* top */}
          <polygon points="118,120 248,120 296,84 166,84" fill="#322a20" stroke="rgba(236,231,220,0.12)" />
          {/* right */}
          <polygon points="248,120 296,84 296,252 248,288" fill="#1c1710" stroke="rgba(236,231,220,0.12)" />
          {/* box seams */}
          <line x1="183" y1="120" x2="183" y2="288" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
          <line x1="118" y1="204" x2="248" y2="204" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
          <line x1="272" y1="102" x2="272" y2="270" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
          <line x1="207" y1="102" x2="183" y2="120" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
        </g>

        {/* shrink film hugging the load — continuous life + scroll wrap */}
        <g ref={filmRef}>
          <polygon points="118,120 248,120 248,288 118,288" fill="url(#filmG)" stroke="rgba(31,166,160,0.5)" strokeWidth="1" />
          <polygon points="118,120 248,120 296,84 166,84" fill="url(#filmG)" stroke="rgba(31,166,160,0.5)" strokeWidth="1" />
          <polygon points="248,120 296,84 296,252 248,288" fill="url(#filmG)" stroke="rgba(31,166,160,0.4)" strokeWidth="1" />
          {/* taut edge highlights */}
          <polyline points="118,120 248,120 296,84" fill="none" stroke="rgba(236,231,220,0.55)" strokeWidth="1.2" />
          <polyline points="248,120 248,288" fill="none" stroke="rgba(236,231,220,0.3)" strokeWidth="1" />

          {/* sweeping light catching the film */}
          <g clipPath="url(#loadClip)">
            <rect x="80" y="70" width="26" height="240" fill="#ECE7DC" opacity="0.22" style={{ animation: "filmSheen 4s ease-in-out infinite" }} />
          </g>
        </g>

        {/* protection shields */}
        {[
          { x: 60, y: 110, label: "TOZ", d: "M0 -7 L6 4 L-6 4 Z" },
          { x: 58, y: 180, label: "SU", d: "M0 -8 C5 -2 6 4 0 7 C-6 4 -5 -2 0 -8 Z" },
          { x: 300, y: 300, label: "DARBE", d: "M0 -7 L2 -2 L7 -2 L3 1 L5 7 L0 3 L-5 7 L-3 1 L-7 -2 L-2 -2 Z" },
        ].map((s) => (
          <g key={s.label} data-shield transform={`translate(${s.x} ${s.y})`}>
            <circle r="15" fill="none" stroke="rgba(31,166,160,0.4)" strokeWidth="1" style={{ animation: "pulseGlow 2.2s ease-in-out infinite" }} />
            <path d={s.d} fill="none" stroke="#7FB9B6" strokeWidth="1.2" transform="translate(0 -1)" />
            <text y="26" textAnchor="middle" className="mono" fontSize="7" letterSpacing="1.5" fill="rgba(236,231,220,0.6)">{s.label}</text>
          </g>
        ))}

        <text x="180" y="346" textAnchor="middle" className="mono" fontSize="8" letterSpacing="3" fill="rgba(236,231,220,0.5)">
          SHRINK PALET ÖRTÜSÜ
        </text>
      </svg>
      <style jsx>{`
        @keyframes filmSheen {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(150px); }
        }
      `}</style>
    </div>
  );
}
