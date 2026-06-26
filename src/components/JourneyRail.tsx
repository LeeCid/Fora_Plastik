"use client";

import { useEffect, useState } from "react";
import { journey } from "@/data/content";

const sectionIds = ["top", "hakkimizda", "uretim", "urunler", "gida", "teklif"];

/** Film-strip timeline showing position along the production journey. */
export function JourneyRail() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setProgress(Math.min(1, Math.max(0, p)));
      let idx = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) idx = i;
      }
      setActive(Math.round((idx / (sectionIds.length - 1)) * (journey.length - 1)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="relative flex flex-col items-start gap-5">
        <div className="absolute left-[4px] top-1 h-[calc(100%-8px)] w-px bg-bone/10" />
        <div
          className="absolute left-[4px] top-1 w-px bg-teal transition-all duration-300"
          style={{ height: `calc(${progress * 100}% - ${progress * 8}px)` }}
        />
        {journey.map((j, i) => (
          <div key={j.id} className="relative flex items-center gap-3">
            <span
              className={`relative z-10 h-[9px] w-[9px] rounded-full border transition-all duration-300 ${
                i <= active ? "border-teal bg-teal" : "border-bone/25 bg-void"
              }`}
            />
            <span
              className={`mono text-[0.58rem] uppercase tracking-[0.18em] transition-all duration-300 ${
                i === active ? "text-bone opacity-100" : "text-steel opacity-0"
              }`}
            >
              {String(i + 1).padStart(2, "0")} · {j.label}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
