import { Logo } from "./Logo";
import { company, values, materials, journey } from "@/data/content";

export function Footer() {
  return (
    <footer className="relative pt-24">
      {/* Yolculuk kapanışı — granülden teslimata çizgi tamamlandı */}
      <div className="wrap pb-14">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {journey.map((j, i) => (
            <span key={j.id} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal shadow-[0_0_8px_rgba(31,166,160,0.8)]" />
              <span className="mono text-[0.58rem] uppercase tracking-[0.2em] text-bone/55">
                {String(i + 1).padStart(2, "0")} {j.label}
              </span>
              {i < journey.length - 1 && <span className="h-px w-5 bg-teal/40" />}
            </span>
          ))}
          <span className="mono text-[0.58rem] uppercase tracking-[0.2em] text-teal">
            — yolculuk tamamlandı
          </span>
        </div>
      </div>
      <div className="rule" />
      <div className="wrap grid grid-cols-1 gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="h-14 w-[230px]" />
          <p className="serif mt-6 max-w-xs text-lg italic leading-relaxed text-bone/55">
            {company.legal}. {company.area} tesiste, aylık {company.capacity}{" "}
            kapasiteyle markanıza özel ambalaj.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5">
            {materials.map((m) => (
              <span key={m} className="mono text-[0.65rem] text-steel">
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="mono mb-5 text-[0.62rem] uppercase tracking-[0.22em] text-teal">
            Değerlerimiz
          </p>
          <ul className="space-y-2.5 text-sm text-bone/65">
            {values.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="mono mb-5 text-[0.62rem] uppercase tracking-[0.22em] text-teal">
            İletişim
          </p>
          <address className="space-y-3 text-sm not-italic text-bone/65">
            <p>{company.location}</p>
            <p>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} data-cursor className="hover:text-teal">
                {company.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} data-cursor className="hover:text-teal">
                {company.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="rule" />
      <div className="wrap flex flex-col items-center justify-between gap-3 py-6 text-xs text-steel sm:flex-row">
        <p>
          © {new Date().getFullYear()} {company.legal}. Tüm hakları saklıdır.
        </p>
        <p className="mono">Çevreye saygılı üretim yaklaşımı · esnek imalat</p>
      </div>
    </footer>
  );
}
