"use client";

import { useRef } from "react";
import { productCategories } from "@/data/content";
import { useReveal } from "@/lib/useReveal";

export function Products() {
  const headRef = useReveal<HTMLDivElement>({ y: 24 });

  return (
    <section id="urunler" className="relative py-32 md:py-44">
      <div ref={headRef} className="wrap">
        <div className="flex items-baseline justify-between" data-reveal>
          <span className="eyebrow">04 — Ürünleşme</span>
          <span className="mono text-[0.6rem] uppercase tracking-[0.3em] text-steel">
            Hattan çıkış
          </span>
        </div>
        <div className="rule mt-5" data-reveal />
        <h2 data-reveal className="display mt-12 max-w-4xl text-[clamp(1.9rem,5vw,4.4rem)] text-bone">
          Tek bir film şeridi,
          <span className="serif lowercase italic text-teal"> dört ürün ailesine </span>
          ayrılır.
        </h2>
      </div>

      <div className="mt-20 flex flex-col">
        {productCategories.map((cat, i) => (
          <ProductRow key={cat.id} cat={cat} index={i} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProductRow({
  cat,
  index,
  flip,
}: {
  cat: (typeof productCategories)[number];
  index: number;
  flip: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal<HTMLDivElement>({ y: 40, start: "top 82%" });

  return (
    <div ref={reveal} className="group relative border-t border-bone/10">
      <div
        ref={ref}
        className={`wrap grid grid-cols-1 items-center gap-8 py-10 md:grid-cols-12 md:py-14 ${
          flip ? "" : ""
        }`}
      >
        {/* image */}
        <div
          data-reveal
          className={`relative aspect-[16/10] overflow-hidden md:col-span-6 ${
            flip ? "md:order-2" : ""
          }`}
        >
          <img
            src={cat.image}
            alt={`${cat.name} — FORA Plastik üretimi`}
            loading="lazy"
            className="h-full w-full scale-105 object-cover opacity-55 grayscale transition-all duration-[1.2s] ease-out group-hover:scale-100 group-hover:opacity-90 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/70 to-transparent" />
          <span
            className="absolute left-4 top-4 h-2 w-2 rounded-full"
            style={{ background: "#1FA6A0", boxShadow: "0 0 14px #1FA6A0" }}
          />
        </div>

        {/* copy */}
        <div
          data-reveal
          className={`md:col-span-6 ${flip ? "md:order-1 md:pr-10" : "md:pl-10"}`}
        >
          <span className="display text-6xl text-bone/10 md:text-8xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mono mt-2 text-[0.62rem] uppercase tracking-[0.22em] text-teal">
            {cat.short}
          </p>
          <h3 className="display mt-3 text-3xl text-bone md:text-5xl">{cat.name}</h3>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-bone/65">
            {cat.desc}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5">
            {cat.items.map((it) => (
              <li key={it} className="flex items-center gap-2 text-xs text-bone/55">
                <span className="h-1 w-1 rounded-full bg-steel" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
