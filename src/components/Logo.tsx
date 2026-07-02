// FORA Plastik wordmark — v3: el yazısı yerine temiz, endüstriyel-geometrik kimlik.
// İşaret: üç ekstrüde film katmanı (teal / bone / ember) — üretim hattının imzası.

export function Logo({
  className = "",
  mono = false,
}: {
  className?: string;
  mono?: boolean;
}) {
  const main = mono ? "currentColor" : "#ECE7DC";
  const sub = mono ? "currentColor" : "#7FB9B6";
  const teal = mono ? "currentColor" : "#43C6C0";
  const ember = mono ? "currentColor" : "#E8743B";
  return (
    <svg
      viewBox="0 0 256 64"
      className={className}
      role="img"
      aria-label="FORA Plastic — Packaging Solutions"
      fill="none"
    >
      {/* film-layer mark */}
      <rect x="2" y="13" width="34" height="7" rx="3.5" fill={teal} />
      <rect x="2" y="25" width="26" height="7" rx="3.5" fill={main} opacity="0.9" />
      <rect x="2" y="37" width="18" height="7" rx="3.5" fill={ember} />

      {/* wordmark */}
      <text
        x="48"
        y="39"
        fontFamily="var(--font-display), 'Arial Narrow', Impact, sans-serif"
        fontSize="28"
        letterSpacing="1.6"
        fill={main}
      >
        FORA PLASTIC
      </text>
      <text
        x="49.5"
        y="55"
        fontFamily="var(--font-mono), monospace"
        fontSize="8.2"
        letterSpacing="5"
        fill={sub}
      >
        PACKAGING SOLUTIONS
      </text>
    </svg>
  );
}

// Kompakt marka işareti — küçük alanlar / favicon için.
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="FORA">
      <rect width="48" height="48" rx="11" fill="#0C5A57" />
      <rect x="12" y="14" width="24" height="5" rx="2.5" fill="#ECE7DC" />
      <rect x="12" y="22" width="18" height="5" rx="2.5" fill="#43C6C0" />
      <rect x="12" y="30" width="12" height="5" rx="2.5" fill="#E8743B" />
    </svg>
  );
}
