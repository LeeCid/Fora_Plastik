// FORA Plastik wordmark — firmanın ORİJİNAL logosu korunarak vektörleştirildi:
// italik script "Fora Plastic" + altında harf aralıklı "PACKAGING SOLUTIONS".
// (Müşteri talebi: orijinal logo değiştirilemez, yalnızca rafine edilebilir.)

export function Logo({
  className = "",
  mono = false,
}: {
  className?: string;
  mono?: boolean;
}) {
  const main = mono ? "currentColor" : "#F2EEE4";
  const sub = mono ? "currentColor" : "#8FC4C1";
  return (
    <svg
      viewBox="0 0 280 84"
      className={className}
      role="img"
      aria-label="Fora Plastic — Packaging Solutions"
      fill="none"
    >
      {/* Script wordmark — orijinal kimlik */}
      <text
        x="2"
        y="50"
        fontFamily="'Brush Script MT', 'Segoe Script', 'Lucida Handwriting', cursive"
        fontStyle="italic"
        fontWeight={700}
        fontSize="46"
        fill={main}
        letterSpacing="0.5"
      >
        Fora Plastic
      </text>
      {/* underline flourish */}
      <path
        d="M6 58 C70 62, 150 62, 250 56"
        stroke={main}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <text
        x="8"
        y="76"
        fontFamily="var(--font-mono), monospace"
        fontSize="10.5"
        letterSpacing="7.5"
        fill={sub}
      >
        PACKAGING
      </text>
      <text
        x="168"
        y="76"
        fontFamily="var(--font-mono), monospace"
        fontSize="10.5"
        letterSpacing="6"
        fill={sub}
      >
        SOLUTIONS
      </text>
    </svg>
  );
}

// Kompakt marka işareti — script "F", orijinal logodan.
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="FORA">
      <rect width="48" height="48" rx="11" fill="#0C5A57" />
      <text
        x="24"
        y="33"
        textAnchor="middle"
        fontFamily="'Brush Script MT','Segoe Script',cursive"
        fontStyle="italic"
        fontWeight={700}
        fontSize="30"
        fill="#F2EEE4"
      >
        F
      </text>
    </svg>
  );
}
