"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up to a numeric target when scrolled into view. Falls back to final value. */
export function StatCounter({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Parse "2.000" / "400" / "2020" -> number, preserving thousands dot.
    const numeric = parseInt(value.replace(/\./g, ""), 10);
    if (Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    const usesDot = value.includes(".");
    const format = (n: number) =>
      usesDot ? n.toLocaleString("tr-TR") : String(n);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(format(numeric));
      return;
    }

    let raf = 0;
    let started = false;
    const run = () => {
      const start = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(format(Math.round(numeric * eased)));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
