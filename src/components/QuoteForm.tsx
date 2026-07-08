"use client";

import { useState } from "react";
import { productTypesForQuote, company } from "@/data/content";
import { PackagePreview } from "./PackagePreview";

const shapeMap: Record<string, "bag" | "cargo" | "pouch" | "roll"> = {
  "Kargo poşeti": "cargo",
  "Mağaza poşeti": "bag",
  "Market poşeti": "bag",
  "Kilitli poşet": "pouch",
  "Gıda ambalajı": "pouch",
  "Shrink rulo": "roll",
  "Shrink palet örtüsü": "roll",
  "Laminasyonlu ürün": "pouch",
};

export function QuoteForm() {
  const [product, setProduct] = useState(productTypesForQuote[0]);
  const [firma, setFirma] = useState("");
  const [sent, setSent] = useState(false);
  const [waLink, setWaLink] = useState("");

  // Form verisinden hazır WhatsApp mesajı kur ve wa.me'de aç.
  const submitToWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lines = [
      "Merhaba, FORA Plastik'ten teklif almak istiyorum.",
      "",
      `Firma: ${String(fd.get("firma") || "-")}`,
      `Telefon: ${String(fd.get("tel") || "-")}`,
      `Ürün tipi: ${product}`,
      `Ebat: ${String(fd.get("ebat") || "-")}`,
      `Baskı rengi: ${String(fd.get("renk") || "-")}`,
      `Tahmini adet / tonaj: ${String(fd.get("adet") || "-")}`,
    ];
    const url = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    setWaLink(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="teklif" className="relative py-32 md:py-44">
      <div className="wrap">
        <div className="flex items-baseline justify-between">
          <span className="eyebrow">07 — Teslimat</span>
          <span className="mono text-[0.6rem] uppercase tracking-[0.3em] text-steel">
            Yola çıkış
          </span>
        </div>
        <div className="rule mt-5" />

        <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="display text-[clamp(2.2rem,5vw,4.4rem)] text-bone">
              Ürününüz yola çıkmadan önce,
              <span className="grad-accent"> ambalajı hazır olmalı.</span>
            </h2>
            <p className="serif mt-6 max-w-md text-lg italic leading-relaxed text-bone/70">
              Markanıza özel üretim için birkaç bilgi yeterli. Teknik detayları
              satış ekibimizle netleştiririz.
            </p>
            <div className="mt-12">
              <PackagePreview shape={shapeMap[product] ?? "bag"} label={product} firmName={firma} />
            </div>
          </div>

          <div>
            {sent ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-[#25D366]/15 text-2xl text-[#25D366]">
                  ✓
                </div>
                <h3 className="display mt-6 text-3xl text-bone">Talebiniz WhatsApp'ta hazır</h3>
                <p className="serif mt-3 max-w-sm text-lg italic text-bone/60">
                  Mesajınız dolduruldu — WhatsApp'ta &quot;Gönder&quot;e basmanız
                  yeterli. Pencere açılmadıysa:
                </p>
                <a
                  href={waLink || `https://wa.me/${company.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-[#062b16] transition-colors hover:bg-[#3ce07c]"
                >
                  WhatsApp&apos;ı Aç →
                </a>
                <button
                  onClick={() => setSent(false)}
                  data-cursor
                  className="mono mt-6 text-xs uppercase tracking-[0.2em] text-teal hover:underline"
                >
                  Yeni talep oluştur
                </button>
              </div>
            ) : (
              <form
                onSubmit={submitToWhatsApp}
                className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2"
              >
                <Field
                  label="Firma adı"
                  name="firma"
                  required
                  className="sm:col-span-2"
                  value={firma}
                  onChange={(e) => setFirma(e.target.value)}
                  placeholder="markanızın adı"
                />
                <Field label="Telefon / WhatsApp" name="tel" type="tel" required />
                <div className="flex flex-col gap-2">
                  <label className="mono text-[0.7rem] uppercase tracking-[0.22em] text-bone">
                    Ürün tipi
                  </label>
                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="border-b border-bone/20 bg-transparent py-2.5 text-sm text-bone outline-none transition-colors focus:border-teal"
                  >
                    {productTypesForQuote.map((p) => (
                      <option key={p} value={p} className="bg-graphite">
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <Field label="Ebat (en x boy)" name="ebat" placeholder="örn. 25x35 cm" />
                <Field label="Baskı rengi" name="renk" placeholder="örn. 2 renk" />
                <Field label="Tahmini adet / tonaj" name="adet" placeholder="örn. 50.000 ad." className="sm:col-span-2" />

                <button
                  type="submit"
                  data-cursor
                  className="group mt-2 inline-flex items-center justify-between border-b border-bone/30 pb-3 text-left transition-colors hover:border-[#25D366] sm:col-span-2"
                >
                  <span className="display text-2xl text-bone group-hover:text-[#25D366]">
                    WhatsApp ile Teklif Al
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-[#062b16] transition-transform group-hover:scale-105">
                    {/* chat bubble */}
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M12 3C7 3 3 6.7 3 11.2c0 2 .8 3.9 2.2 5.3L4.5 20l3.8-1.2c1.1.5 2.4.8 3.7.8 5 0 9-3.7 9-8.3S17 3 12 3z" />
                    </svg>
                  </span>
                </button>
                <p className="mono text-[0.62rem] text-steel sm:col-span-2">
                  Talebiniz WhatsApp&apos;ta hazır mesaj olarak açılır · {company.phone} · {company.email}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  className = "",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="mono text-[0.7rem] uppercase tracking-[0.22em] text-bone">
        {label} {required && <span className="text-ember">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-b border-bone/20 bg-transparent py-2.5 text-sm text-bone outline-none transition-colors placeholder:text-steel/40 focus:border-teal"
      />
    </div>
  );
}
