"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { company } from "@/data/content";
import { useIsMobile, useReducedMotion } from "@/lib/useReducedMotion";
import { useMagnetic } from "@/lib/useMagnetic";

const FilmScene = dynamic(() => import("./FilmScene"), { ssr: false });

export function Hero() {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.4);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.3 });
      tl.from(".hero-line > span", {
        yPercent: 120,
        duration: 1.15,
        ease: "power4.out",
        stagger: 0.12,
      })
        .from("[data-hero-fade]", { opacity: 0, y: 18, duration: 0.9, stagger: 0.1 }, "-=0.6");

      // depth parallax as you leave
      gsap.to(".hero-copy", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-film", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [mounted]);

  const show3D = mounted && !reduced && !mobile;

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      {/* film material */}
      <div className="hero-film absolute inset-0 -z-[1]">
        {show3D ? <FilmScene /> : <FallbackFilm />}
        <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void" />
      </div>

      <div className="wrap relative pt-28">
        <p data-hero-fade className="eyebrow mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-ember" />
          EST. {company.founded} — İKİTELLİ OSB · İSTANBUL
        </p>

        <h1 className="display text-[clamp(3rem,11vw,10rem)] text-bone">
          <span className="line-mask hero-line">
            <span>Granülden</span>
          </span>
          <span className="line-mask hero-line">
            <span className="text-steel">teslimata,</span>
          </span>
          <span className="line-mask hero-line">
            <span>
              bir <span className="serif italic lowercase text-teal">ambalajın</span> yolculuğu
            </span>
          </span>
        </h1>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12">
          <p data-hero-fade className="serif text-lg italic leading-relaxed text-bone/75 md:col-span-6 md:text-xl">
            {company.heroLead}
          </p>
          <div data-hero-fade className="flex flex-col items-start gap-5 md:col-span-6 md:items-end md:justify-end">
            <a
              ref={ctaRef}
              href="#teklif"
              data-cursor-label="TEKLİF AL"
              className="group inline-flex items-center gap-4 text-bone"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-bone/30 transition-colors group-hover:border-teal group-hover:bg-teal/10">
                <span className="text-teal">→</span>
              </span>
              <span className="text-left">
                <span className="block text-sm font-semibold">Teklif Al</span>
                <span className="mono block text-[0.62rem] uppercase tracking-[0.2em] text-steel">
                  markanıza özel üretim
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div data-hero-fade className="wrap absolute bottom-7 left-0 right-0">
        <div className="flex items-center justify-between">
          <span className="mono text-[0.6rem] uppercase tracking-[0.3em] text-steel">
            01 — Hammadde
          </span>
          <span className="mono flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-steel">
            Kaydır
            <span className="inline-block h-8 w-px animate-pulse bg-gradient-to-b from-teal to-transparent" />
          </span>
        </div>
      </div>
    </section>
  );
}

function FallbackFilm() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,rgba(31,166,160,0.18),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-30 motion-safe:animate-[sheen_7s_ease-in-out_infinite]"
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, rgba(236,231,220,0.18) 50%, transparent 60%)",
          backgroundSize: "300% 300%",
        }}
      />
      <style jsx>{`
        @keyframes sheen {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
