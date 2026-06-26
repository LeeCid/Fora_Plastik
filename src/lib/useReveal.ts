"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Reveals direct children (or [data-reveal] descendants) with a staggered
 * rise + fade as they enter the viewport. No-op under reduced motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(opts?: {
  y?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const items = targets.length ? targets : (Array.from(el.children) as HTMLElement[]);

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: opts?.y ?? 38,
        duration: 0.9,
        ease: "power3.out",
        stagger: opts?.stagger ?? 0.08,
        scrollTrigger: {
          trigger: el,
          start: opts?.start ?? "top 78%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [opts?.y, opts?.stagger, opts?.start]);

  return ref;
}
