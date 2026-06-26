"use client";

import { references } from "@/data/content";
import { ReferenceMark } from "./ReferenceMark";
import { useReveal } from "@/lib/useReveal";

export function References() {
  const headRef = useReveal<HTMLDivElement>({ y: 24 });
  const wallRef = useReveal<HTMLDivElement>({ y: 26, stagger: 0.04, start: "top 85%" });

  return (
    <section id="referanslar" className="relative py-32 md:py-44">
      <div ref={headRef} className="wrap">
        <div className="flex items-baseline justify-between" data-reveal>
          <span className="eyebrow">07 — Güven</span>
          <span className="mono text-[0.6rem] uppercase tracking-[0.3em] text-steel">
            {references.length} iş ortağı
          </span>
        </div>
        <div className="rule mt-5" data-reveal />
        <h2 data-reveal className="display mt-12 max-w-4xl text-[clamp(1.9rem,5vw,4.4rem)] text-bone">
          Her kutu, bir markayı taşır.
        </h2>
        <p data-reveal className="serif mt-5 max-w-xl text-lg italic text-bone/65">
          Farklı sektörlerden iş ortaklarımız için üretiyoruz — granülden
          teslimata kadar.
        </p>
      </div>

      <div ref={wallRef} className="wrap mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {references.map((r, i) => (
          <div
            key={r.id}
            data-reveal
            className={`group flex h-32 items-center justify-center px-6 ${
              i % 4 !== 0 ? "lg:border-l lg:border-bone/10" : ""
            } ${i % 2 !== 0 ? "border-l border-bone/10 lg:border-l" : ""} ${
              i >= (references.length % 4 === 0 ? 4 : 0) ? "border-t border-bone/10" : ""
            }`}
          >
            <ReferenceMark
              id={r.id}
              className="h-11 w-full max-w-[150px] text-steel transition-colors duration-500 group-hover:text-bone"
            />
          </div>
        ))}
      </div>

    </section>
  );
}
