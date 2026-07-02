// Karanlık fabrika bölümünden aydınlık "showroom" bölümüne geçiş şeridi.
// Ürün gamı, dolu/kontur dönüşümlü display tipografiyle akar.

const items = [
  "Kargo Poşeti",
  "Mağaza Poşeti",
  "Market Poşeti",
  "Kilitli Poşet",
  "Gıda Ambalajı",
  "Shrink Rulo",
  "Palet Örtüsü",
  "Laminasyon",
];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12"
    >
      {items.map((it, i) => (
        <span key={it} className="flex items-center gap-8 md:gap-12">
          <span
            className={`display whitespace-nowrap text-3xl md:text-5xl ${
              i % 2 === 0 ? "text-[#161d19]" : "outline-dark"
            }`}
          >
            {it}
          </span>
          <span className="h-2 w-2 rounded-full bg-teal" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-[#161d19]/12 bg-[#d0cbc0] py-5 md:py-6">
      <div className="marquee-track flex w-max">
        <Row />
        <Row ariaHidden />
      </div>
      {/* karanlık bölümden yumuşak geçiş */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#0a0b0d]/35 via-[#0a0b0d]/12 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#c5c0b4]/90 to-transparent" />
    </div>
  );
}
