// Referans markaları — site diline uygun, tek tonlu "buzlu cam" wordmark olarak
// yeniden yorumlandı. Amaç marka kimliğini anımsatmak; birebir logo kopyası değil.

type MarkProps = { className?: string };

const wrap = (children: React.ReactNode, label: string) => (
  <svg viewBox="0 0 220 64" role="img" aria-label={label} className="h-full w-full">
    {children}
  </svg>
);

const baseText = {
  fill: "currentColor",
  fontFamily: "var(--font-sans), sans-serif",
} as const;

export const marks: Record<string, (p: MarkProps) => JSX.Element> = {
  saray: () =>
    wrap(
      <>
        <text x="110" y="34" textAnchor="middle" fontSize="26" fontWeight={800} letterSpacing="2" {...baseText}>
          SARAY
        </text>
        <text x="110" y="50" textAnchor="middle" fontSize="11" letterSpacing="6" {...baseText} opacity={0.7}>
          ALUMINIUM
        </text>
      </>,
      "Saray Aluminium"
    ),
  kervan: () =>
    wrap(
      <>
        <rect x="34" y="14" width="152" height="36" rx="18" fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.7} />
        <text x="110" y="40" textAnchor="middle" fontSize="24" fontWeight={700} fontFamily="var(--font-sans)" fill="currentColor">
          kervan
        </text>
      </>,
      "Kervan"
    ),
  sistem: () =>
    wrap(
      <>
        <text x="110" y="32" textAnchor="middle" fontSize="22" fontWeight={700} letterSpacing="1" {...baseText}>
          SİSTEM
        </text>
        <text x="110" y="48" textAnchor="middle" fontSize="10" letterSpacing="4" {...baseText} opacity={0.7}>
          ALÜMİNYUM
        </text>
      </>,
      "Sistem Alüminyum"
    ),
  nurlu: () =>
    wrap(
      <text x="110" y="42" textAnchor="middle" fontSize="30" fontWeight={800} fontStyle="italic" letterSpacing="2" {...baseText}>
        NURLU
      </text>,
      "Nurlu"
    ),
  ozyildirim: () =>
    wrap(
      <>
        <path d="M30 22 l10 0 l-6 20 l-10 0 z M44 22 l10 0 l-6 20 l-10 0 z" fill="currentColor" opacity={0.85} />
        <text x="120" y="38" textAnchor="middle" fontSize="20" fontWeight={800} letterSpacing="1" {...baseText}>
          ÖZYILDIRIM
        </text>
      </>,
      "Özyıldırım"
    ),
  arged: () =>
    wrap(
      <>
        <path d="M28 46 l16 -30 l6 0 l0 30 l-7 0 l0 -8 l-9 0 l-3 8 z M40 32 l5 0 l0 -9 z" fill="currentColor" />
        <text x="130" y="30" textAnchor="middle" fontSize="18" fontWeight={700} {...baseText}>
          Arged
        </text>
        <text x="130" y="48" textAnchor="middle" fontSize="18" fontWeight={700} {...baseText} opacity={0.7}>
          Makina
        </text>
      </>,
      "Arged Makina"
    ),
  savas: () =>
    wrap(
      <>
        <text x="110" y="34" textAnchor="middle" fontSize="22" fontWeight={800} letterSpacing="1" {...baseText}>
          SAVAŞ
        </text>
        <text x="110" y="50" textAnchor="middle" fontSize="11" letterSpacing="5" {...baseText} opacity={0.7}>
          PLASTİK
        </text>
      </>,
      "Savaş Plastik"
    ),
  guncan: () =>
    wrap(
      <>
        <rect x="30" y="16" width="160" height="32" rx="6" fill="none" stroke="currentColor" strokeWidth="1.3" opacity={0.6} />
        <text x="110" y="32" textAnchor="middle" fontSize="18" fontWeight={800} letterSpacing="1" {...baseText}>
          GÜNCAN
        </text>
        <text x="110" y="44" textAnchor="middle" fontSize="9" letterSpacing="3" {...baseText} opacity={0.7}>
          PLASTİK
        </text>
      </>,
      "Güncan Plastik"
    ),
  teka: () =>
    wrap(
      <>
        <path d="M34 18 l18 0 l-9 14 l9 14 l-18 0 l-9 -14 z" fill="currentColor" opacity={0.85} />
        <text x="128" y="32" textAnchor="middle" fontSize="19" fontWeight={800} letterSpacing="1" {...baseText}>
          TEKA
        </text>
        <text x="128" y="46" textAnchor="middle" fontSize="9" letterSpacing="3" {...baseText} opacity={0.7}>
          PLASTİK
        </text>
      </>,
      "Teka Plastik"
    ),
  siesta: () =>
    wrap(
      <>
        <circle cx="110" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="1.3" opacity={0.6} />
        <text x="110" y="30" textAnchor="middle" fontSize="18" fontWeight={600} fontStyle="italic" fontFamily="Georgia, serif" fill="currentColor">
          Siesta
        </text>
        <text x="110" y="44" textAnchor="middle" fontSize="8" letterSpacing="3" {...baseText} opacity={0.7}>
          EXCLUSIVE
        </text>
      </>,
      "Siesta"
    ),
  hastin: () =>
    wrap(
      <text x="110" y="40" textAnchor="middle" fontSize="26" fontWeight={700} letterSpacing="3" {...baseText}>
        HASTİN
      </text>,
      "Hastin"
    ),
  raftiye: () =>
    wrap(
      <>
        <rect x="36" y="40" width="148" height="3" fill="currentColor" opacity={0.6} />
        <text x="110" y="34" textAnchor="middle" fontSize="24" fontWeight={700} letterSpacing="2" {...baseText}>
          RAFTİYE
        </text>
      </>,
      "Raftiye"
    ),
};

export function ReferenceMark({ id, className }: { id: string; className?: string }) {
  const M = marks[id];
  if (!M) return null;
  return (
    <div className={className}>
      <M />
    </div>
  );
}
