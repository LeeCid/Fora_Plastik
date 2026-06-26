"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

/** Intro reel: counts 00→100 while the world settles, then lifts away. */
export function Loader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(100);
      setDone(true);
      return;
    }
    const start = performance.now();
    const dur = 1700;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 2.2);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 360);
    };
    raf = requestAnimationFrame(tick);
    document.documentElement.classList.add("lenis-stopped");
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (done) document.documentElement.classList.remove("lenis-stopped");
  }, [done]);

  return (
    <div
      className={`fixed inset-0 z-[120] flex flex-col items-center justify-center bg-void transition-[opacity,transform] duration-700 ${
        done ? "pointer-events-none -translate-y-full opacity-0" : "opacity-100"
      }`}
      aria-hidden={done}
    >
      <div className="w-[180px] opacity-90">
        <Logo className="h-12 w-auto" />
      </div>
      <p className="mono mt-8 text-[0.6rem] uppercase tracking-[0.4em] text-steel">
        Hammaddeden teslimata
      </p>

      <div className="mt-10 flex w-[min(420px,72vw)] items-center gap-4">
        <div className="h-px flex-1 bg-bone/10">
          <div
            className="h-px bg-teal transition-[width] duration-150"
            style={{ width: `${count}%` }}
          />
        </div>
        <span className="mono chapter-no w-10 text-right text-sm text-bone/70">
          {String(count).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
