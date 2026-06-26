"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { materials } from "@/data/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { StationScene } from "./StationScenes";

const ProductionMaterial = dynamic(() => import("./ProductionMaterial"), {
  ssr: false,
});

type Readout = { k: string; v: string };

const stations: {
  no: string;
  title: string;
  spec: string;
  body: string;
  accent: string;
  status: string;
  readout: Readout[];
}[] = [
  {
    no: "01",
    title: "Hammadde & Ekstrüzyon",
    spec: "Granül eriyerek film olur",
    body: "Plastik granül ısıyla eriyip filme dönüşür. Müşteri talebine göre ebat ve kalınlıkta, yüksek kapasiteli esnek imalat.",
    accent: "#E8743B",
    status: "ERİYİK · 210°C",
    readout: [
      { k: "Eriyik sıcaklığı", v: "210 °C" },
      { k: "Hat hızı", v: "120 m/dk" },
      { k: "Film kalınlığı", v: "40 µm" },
      { k: "Hammadde", v: "LDPE / HDPE" },
    ],
  },
  {
    no: "02",
    title: "Flexo Baskı",
    spec: "8 renk · markaya özel",
    body: "Şeffaf filmin üzerine renk renk binen baskı; en sonda markanız oluşur. Mağaza, market, kargo ve özel ambalaj.",
    accent: "#1FA6A0",
    status: "BASKI · 8 RENK",
    readout: [
      { k: "Renk sayısı", v: "8 / CMYK+" },
      { k: "Baskı hızı", v: "150 m/dk" },
      { k: "Register", v: "± 0.10 mm" },
      { k: "Kurutma", v: "60 °C" },
    ],
  },
  {
    no: "03",
    title: "Kesim & Kaynak",
    spec: "Filmden ürüne",
    body: "Film kesilir, kaynaklanır ve şekillenir. Tek bir şerit; poşet, ambalaj ve farklı ürün formlarına ayrılır.",
    accent: "#9aa3ad",
    status: "KESİM · AKTİF",
    readout: [
      { k: "Kaynak sıcaklığı", v: "180 °C" },
      { k: "Kesim toleransı", v: "± 1 mm" },
      { k: "Çevrim", v: "90 vuruş/dk" },
      { k: "Ebat", v: "özel ölçü" },
    ],
  },
  {
    no: "04",
    title: "Çıkış & Sevkiyat",
    spec: "Markanız yola hazır",
    body: "Baskısı tamamlanmış ürün paketlenir ve sevkiyata çıkar — markanızı koruyarak müşterinin kapısına.",
    accent: "#ECE7DC",
    status: "KALİTE · %100",
    readout: [
      { k: "Kalite kontrol", v: "%100" },
      { k: "Paketleme", v: "otomatik" },
      { k: "Aylık kapasite", v: "400 ton" },
      { k: "Durum", v: "SEVKE HAZIR" },
    ],
  },
];

export function ProductionLine() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef(0);
  const reduced = useReducedMotion();
  const [horizontal, setHorizontal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // Horizontal travel on every device that allows motion (incl. touch).
    const horiz = !reduced;
    setHorizontal(horiz);
    if (!horiz) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const getDist = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getDist(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + getDist(),
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            if (fillRef.current) fillRef.current.style.width = `${self.progress * 100}%`;
            if (idxRef.current)
              idxRef.current.textContent = String(
                Math.min(stations.length, Math.floor(self.progress * stations.length) + 1)
              ).padStart(2, "0");
          },
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const showMaterial = mounted && horizontal;

  return (
    <section
      id="uretim"
      ref={sectionRef}
      className="relative overflow-hidden"
      data-cursor-label={horizontal ? "ÜRETİM HATTI" : undefined}
    >
      {/* living plastic material — the moving production line itself */}
      {showMaterial && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <ProductionMaterial progressRef={progressRef} />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-void/40" />
        </div>
      )}

      {/* top progress / line HUD */}
      {horizontal && (
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 px-[clamp(1.25rem,5vw,4.5rem)] pt-[5.5rem]">
          <div className="flex items-center justify-between">
            <span className="eyebrow">Üretim Hattı · Canlı</span>
            <span className="mono text-[0.6rem] text-teal">
              İSTASYON <span ref={idxRef}>01</span> / 0{stations.length}
            </span>
          </div>
          <div className="mt-3 h-px w-full bg-bone/15">
            <div ref={fillRef} className="h-px w-0 bg-teal" />
          </div>
        </div>
      )}

      <div ref={trackRef} className={horizontal ? "relative z-10 flex h-[100svh] w-max flex-nowrap" : "flex flex-col"}>
        {stations.map((s, i) => (
          <Station key={s.no} station={s} index={i} horizontal={horizontal} />
        ))}
      </div>
    </section>
  );
}

function Station({
  station,
  index,
  horizontal,
}: {
  station: (typeof stations)[number];
  index: number;
  horizontal: boolean;
}) {
  return (
    <div
      className={
        horizontal
          ? "relative flex h-[100svh] w-screen shrink-0 items-center"
          : "relative flex min-h-[78svh] w-full items-center overflow-hidden border-t border-bone/10 py-20"
      }
    >
      {/* CSS material fallback (mobile / reduced) */}
      {!horizontal && <MaterialFallback accent={station.accent} index={index} />}

      <div className="wrap relative z-10 grid w-full grid-cols-1 items-center gap-8 pt-20 lg:grid-cols-12 lg:gap-12 lg:pt-0">
        {/* copy */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="display text-[clamp(2.6rem,7vw,5rem)] leading-none" style={{ color: station.accent, opacity: 0.85 }}>
              {station.no}
            </span>
            <span
              className="mono flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.2em] text-bone/70"
            >
              <span className="h-1.5 w-1.5 rounded-full motion-safe:animate-pulse" style={{ background: station.accent, boxShadow: `0 0 8px ${station.accent}` }} />
              {station.status}
            </span>
          </div>
          <p className="mono mt-4 text-[0.62rem] uppercase tracking-[0.24em]" style={{ color: station.accent }}>
            İstasyon {station.no} — {station.spec}
          </p>
          <h3 className="display mt-2 text-[clamp(1.9rem,4vw,3.4rem)] text-bone">{station.title}</h3>
          <p className="serif mt-4 max-w-md text-base italic leading-relaxed text-bone/75 md:text-lg">{station.body}</p>

          {/* inline live spec readout — distinct per station, not a card */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1.5">
            {station.readout.slice(0, 3).map((r) => (
              <span key={r.k} className="mono text-[0.66rem] text-bone/55">
                <span className="text-steel">{r.k}</span>{" "}
                <span className="text-bone">{r.v}</span>
              </span>
            ))}
            {index === 0 && materials.map((m) => (
              <span key={m} className="mono text-[0.66rem] text-bone/40">{m}</span>
            ))}
          </div>
        </div>

        {/* unique live process animation */}
        <div className="lg:col-span-7 lg:flex lg:justify-end">
          <StationScene index={index} />
        </div>
      </div>

      {/* continuous conveyor running along the bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-16 overflow-hidden">
        <div className="absolute bottom-6 left-0 right-0 h-px bg-bone/15" />
        <div
          className="absolute bottom-3 left-0 h-3 w-[200%] opacity-50 motion-safe:animate-[belt_2.4s_linear_infinite]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(236,231,220,0.22) 0 2px, transparent 2px 26px)",
          }}
        />
      </div>
      <style jsx>{`
        @keyframes belt {
          to {
            transform: translateX(-26px);
          }
        }
      `}</style>
    </div>
  );
}

function MaterialFallback({ accent, index }: { accent: string; index: number }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(80% 60% at ${30 + index * 12}% 40%, ${accent}22, transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-20 motion-safe:animate-[sheen2_8s_ease-in-out_infinite]"
        style={{
          background:
            "linear-gradient(115deg, transparent 42%, rgba(236,231,220,0.16) 50%, transparent 58%)",
          backgroundSize: "300% 300%",
        }}
      />
      <style jsx>{`
        @keyframes sheen2 {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}
