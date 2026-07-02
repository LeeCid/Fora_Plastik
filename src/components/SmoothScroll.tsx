"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth scroll, synchronised with GSAP ScrollTrigger.
 * Respects prefers-reduced-motion (skips Lenis, falls back to native scroll).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    // Pinli üretim hattı sayfaya ~4 ekran yükseklik ekler; altındaki tüm
    // trigger'ların doğru ölçülmesi için geç kaynaklar (loader, fontlar,
    // görseller) oturduğunda global yeniden ölçüm yap.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("fora:ready", refresh);
    const t = window.setTimeout(refresh, 900);
    if (document.fonts) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("fora:ready", refresh);
      window.clearTimeout(t);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
