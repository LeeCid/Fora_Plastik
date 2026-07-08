"use client";

import { useRef } from "react";
import { productCategories } from "@/data/content";
import { useReveal } from "@/lib/useReveal";

// "Showroom" — aydınlık editoryal bölüm: ürün fotoğrafları gün ışığında,
// koyu sinematik fabrika akışını kıran bilinçli art-direction kontrastı.
export function Products() {
  const headRef = useReveal<HTMLDivElement>({ y: 24 });

  return (
    <section
      id="urunler"
      className="relative pt-32 pb-12 text-[#161d19] md:pt-44 md:pb-24"
      style={{
        background:
          "linear-gradient(180deg, rgba(10,11,13,0.10) 0%, rgba(10,11,13,0) 7rem), linear-gradient(180deg, #d2cec3 0%, #c5c0b4 100%)",
      }}
    >
      <div ref={headRef} className="wrap">
        <div className="flex items-baseline justify-between" data-reveal>
          <span className="eyebrow !text-[#5a6660]">04 — Ürünleşme</span>
          <span className="mono text-[0.6rem] uppercase tracking-[0.3em] text-[#5a6660]">
            Showroom · Hattan çıkış
          </span>
        </div>
        <div className="mt-5 h-px w-full bg-[#161d19]/15" data-reveal />
        <h2 data-reveal className="display mt-12 max-w-4xl text-[clamp(1.9rem,5vw,4.4rem)] text-[#161d19]">
          Tek bir film şeridi,
          <span className="grad-accent-paper"> dört ürün ailesine </span>
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
    <div ref={reveal} className="group relative border-t border-[#161d19]/10">
      <div
        ref={ref}
        className="wrap grid grid-cols-1 items-center gap-8 py-10 md:grid-cols-12 md:py-14"
      >
        {/* image — gün ışığında, tam renk. Mobilde yazının ALTINDA (order-2). */}
        <div
          data-reveal
          className={`relative order-2 aspect-[16/10] overflow-hidden ring-1 ring-[#161d19]/10 md:col-span-6 ${
            flip ? "md:order-2" : "md:order-1"
          }`}
        >
          <img
            src={cat.image}
            alt={`${cat.name} — FORA Plastik üretimi`}
            loading="lazy"
            decoding="async"
            className="h-full w-full scale-105 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161d19]/15 to-transparent" />
          <span
            className="absolute left-4 top-4 h-2 w-2 rounded-full"
            style={{ background: "#0C5A57", boxShadow: "0 0 12px #1FA6A0" }}
          />
        </div>

        {/* copy — mobilde resmin ÜSTÜNDE (order-1). */}
        <div
          data-reveal
          className={`order-1 md:col-span-6 ${flip ? "md:order-1 md:pr-10" : "md:order-2 md:pl-10"}`}
        >
          <span className="display text-6xl text-[#161d19]/10 md:text-8xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mono mt-2 text-[0.62rem] uppercase tracking-[0.22em] text-teal-deep">
            {cat.short}
          </p>
          <h3 className="display mt-3 text-3xl text-[#161d19] md:text-5xl">{cat.name}</h3>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[#161d19]/75">
            {cat.desc}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5">
            {cat.items.map((it) => (
              <li key={it} className="flex items-center gap-2 text-xs text-[#161d19]/60">
                <span className="h-1 w-1 rounded-full bg-[#161d19]/40" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
