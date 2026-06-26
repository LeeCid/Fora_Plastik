// FORA Plastik wordmark — vektör olarak yeniden çizildi.
// Orijinal: teal zemin üzerine beyaz italik script "Fora Plastic" + harflenmiş "PACKAGING SOLUTIONS".

export function Logo({
  className = "",
  mono = false,
}: {
  className?: string;
  mono?: boolean;
}) {
  const main = mono ? "currentColor" : "#ECE7DC";
  const sub = mono ? "currentColor" : "#7FB9B6";
  return (
    <svg
      viewBox="0 0 280 84"
      className={className}
      role="img"
      aria-label="FORA Plastic — Packaging Solutions"
      fill="none"
    >
      <g>
        {/* Script-styled wordmark */}
        <text
          x="2"
          y="50"
          fontFamily="'Brush Script MT', 'Segoe Script', 'Comic Sans MS', cursive"
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
      </g>
    </svg>
  );
}

// Kompakt marka işareti — favicon / küçük alanlar için "F" monogram.
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="FORA">
      <rect width="48" height="48" rx="11" fill="#0B4F4F" />
      <text
        x="24"
        y="33"
        textAnchor="middle"
        fontFamily="'Brush Script MT','Segoe Script',cursive"
        fontStyle="italic"
        fontWeight={700}
        fontSize="30"
        fill="#F4F7F6"
      >
        F
      </text>
    </svg>
  );
}
