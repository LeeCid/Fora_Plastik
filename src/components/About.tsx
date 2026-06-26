"use client";

import { stats, sectors } from "@/data/content";
import { StatCounter } from "./StatCounter";
import { useReveal } from "@/lib/useReveal";

export function About() {
  const ref = useReveal<HTMLDivElement>({ y: 30 });

  return (
    <section id="hakkimizda" className="relative py-32 md:py-44">
      <div ref={ref} className="wrap">
        <div className="flex items-baseline justify-between" data-reveal>
          <span className="eyebrow">02 — Kapasite</span>
          <span className="mono text-[0.6rem] uppercase tracking-[0.3em] text-steel">
            Tesise giriş
          </span>
        </div>
        <div className="rule mt-5" data-reveal />

        <h2 data-reveal className="display mt-12 max-w-5xl text-[clamp(1.9rem,5vw,4.6rem)] text-bone">
          2020'de açılan kapılardan
          <span className="text-steel"> bugün aylık 400 tonluk </span>
          bir üretime.
        </h2>

        {/* spec strip — hairline separated, no boxes */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              className={`py-6 ${i !== 0 ? "md:border-l md:border-bone/10 md:pl-8" : ""}`}
            >
              <div className="display flex items-baseline gap-1.5 text-[clamp(2.6rem,5vw,4.2rem)] text-bone">
                <StatCounter value={s.value} />
                {s.unit && <span className="mono text-base font-normal text-teal">{s.unit}</span>}
              </div>
              <p className="mt-3 text-sm font-medium text-bone/85">{s.label}</p>
              <p className="mono mt-1 text-[0.66rem] uppercase tracking-wider text-steel">
                {s.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-12">
          <p data-reveal className="serif text-xl italic leading-relaxed text-bone/80 md:col-span-7 md:text-2xl">
            Yüksek üretim kapasitesiyle üretim, perakende, hijyen, kargo,
            e-ticaret, tekstil, gıda ve kimya sektörlerine müşteri odaklı
            çözümler sunuyoruz — ülkemizden dünyanın çeşitli ülkelerine.
          </p>
          <div data-reveal className="md:col-span-5">
            <p className="mono mb-5 text-[0.62rem] uppercase tracking-[0.3em] text-steel">
              Hizmet verdiğimiz sektörler
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-bone/70">
              {sectors.map((s) => (
                <li key={s} className="group flex items-center gap-2 text-[0.95rem]">
                  <span className="h-1 w-1 rounded-full bg-teal transition-transform group-hover:scale-150" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
