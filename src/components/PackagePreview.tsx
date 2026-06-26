"use client";

type Shape = "bag" | "cargo" | "pouch" | "roll";

/**
 * A small cinematic loop: the selected package is printed with the FORA mark,
 * sealed, then ships out — repeating. Shape follows the chosen product type.
 * Re-keyed by shape so the sequence restarts on each selection.
 */
export function PackagePreview({ shape, label }: { shape: Shape; label: string }) {
  return (
    <div className="relative overflow-hidden border-t border-bone/10 pt-8">
      <div className="flex items-center gap-7">
        <div className="relative h-44 w-36 shrink-0">
          <svg key={shape} viewBox="0 0 150 190" className="h-full w-full overflow-visible">
            <defs>
              <linearGradient id="pkgFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1FA6A0" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#0c1413" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* travelling package — prints, seals, ships, loops */}
            <g style={{ animation: "pkgCycle 5.2s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" }}>
              <PackageBody shape={shape} />

              {/* printed FORA mark */}
              <g style={{ animation: "brandPrint 5.2s ease-in-out infinite" }}>
                <text x="75" y="92" textAnchor="middle" fontFamily="'Brush Script MT','Segoe Script',cursive" fontStyle="italic" fontWeight="700" fontSize="26" fill="#ECE7DC">
                  Fora
                </text>
                <text x="75" y="108" textAnchor="middle" className="mono" fontSize="6" letterSpacing="3" fill="#7FB9B6">
                  PACKAGING
                </text>
              </g>

              {/* seal sweep highlight */}
              <rect x="18" y="20" width="14" height="150" fill="#ECE7DC" opacity="0" style={{ animation: "sealSweep 5.2s ease-in-out infinite" }} />
            </g>

            {/* shipping motion lines */}
            <g style={{ animation: "shipLines 5.2s ease-in-out infinite" }} opacity="0">
              <line x1="6" y1="80" x2="26" y2="80" stroke="#1FA6A0" strokeWidth="1.5" />
              <line x1="2" y1="95" x2="22" y2="95" stroke="#1FA6A0" strokeWidth="1.5" />
              <line x1="8" y1="110" x2="28" y2="110" stroke="#1FA6A0" strokeWidth="1.5" />
            </g>
          </svg>
        </div>

        <div>
          <p className="mono text-[0.6rem] uppercase tracking-[0.25em] text-steel">
            Üretim önizlemesi
          </p>
          <p className="mt-1 display text-2xl text-bone">{label}</p>
          <p className="serif mt-2 max-w-[15rem] text-sm italic text-bone/55">
            Markanız basılır, paketlenir ve yola çıkar.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pkgCycle {
          0% { transform: translateX(-14px) scale(0.94); opacity: 0; }
          12% { transform: translateX(0) scale(1); opacity: 1; }
          70% { transform: translateX(0) scale(1); opacity: 1; }
          92% { transform: translateX(120px) scale(0.96); opacity: 0; }
          100% { transform: translateX(120px); opacity: 0; }
        }
        @keyframes brandPrint {
          0%, 22% { opacity: 0; }
          40%, 88% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes sealSweep {
          0%, 44% { transform: translateX(0); opacity: 0; }
          52% { opacity: 0.6; }
          66% { transform: translateX(108px); opacity: 0; }
          100% { transform: translateX(108px); opacity: 0; }
        }
        @keyframes shipLines {
          0%, 72% { opacity: 0; }
          80% { opacity: 0.8; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function PackageBody({ shape }: { shape: Shape }) {
  if (shape === "cargo") {
    return (
      <>
        <rect x="26" y="22" width="98" height="150" rx="4" fill="url(#pkgFill)" stroke="rgba(236,231,220,0.28)" />
        <rect x="26" y="22" width="98" height="22" fill="#0B4F4F" opacity="0.5" />
        <line x1="26" y1="140" x2="124" y2="140" stroke="#7FB9B6" strokeDasharray="4 4" strokeWidth="1" opacity="0.6" />
      </>
    );
  }
  if (shape === "pouch") {
    return (
      <>
        <rect x="32" y="20" width="86" height="14" rx="3" fill="#0B4F4F" opacity="0.6" />
        <path d="M32 34 H118 V160 Q75 176 32 160 Z" fill="url(#pkgFill)" stroke="rgba(236,231,220,0.28)" />
      </>
    );
  }
  if (shape === "roll") {
    return (
      <>
        <ellipse cx="75" cy="40" rx="48" ry="14" fill="#0B4F4F" opacity="0.6" />
        <rect x="27" y="40" width="96" height="110" fill="url(#pkgFill)" />
        <ellipse cx="75" cy="150" rx="48" ry="14" fill="#0E6E6E" opacity="0.7" />
        <ellipse cx="75" cy="40" rx="20" ry="6" fill="#0a0b0d" />
      </>
    );
  }
  // bag (default)
  return (
    <>
      <path d="M48 30 q27 -16 54 0" fill="none" stroke="#7FB9B6" strokeWidth="3" />
      <rect x="28" y="28" width="94" height="142" rx="5" fill="url(#pkgFill)" stroke="rgba(236,231,220,0.28)" />
      <rect x="60" y="38" width="30" height="9" rx="4.5" fill="none" stroke="#7FB9B6" strokeWidth="2" />
    </>
  );
}
