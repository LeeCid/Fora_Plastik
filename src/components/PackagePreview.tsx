"use client";

type Shape = "bag" | "cargo" | "pouch" | "roll";

/**
 * Calm live preview: the selected package sits and gently breathes; the firm
 * name typed into the form is printed onto it in real time. No fly-away loop.
 */
export function PackagePreview({
  shape,
  label,
  firmName,
}: {
  shape: Shape;
  label: string;
  firmName?: string;
}) {
  const name = (firmName || "").trim();
  const printed = name ? name.toUpperCase().slice(0, 14) : "MARKANIZ";
  const fontSize = printed.length > 9 ? 13 : printed.length > 6 ? 16 : 20;

  return (
    <div className="relative overflow-hidden border-t border-bone/10 pt-8">
      <div className="flex items-center gap-7">
        <div className="relative h-44 w-36 shrink-0">
          <div
            className="absolute inset-0 motion-safe:animate-[pkgFloat_5s_ease-in-out_infinite]"
            style={{ transformOrigin: "center" }}
          >
            <svg key={shape} viewBox="0 0 150 190" className="h-full w-full overflow-visible">
              <defs>
                <linearGradient id="pkgFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1FA6A0" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0c1413" stopOpacity="0.55" />
                </linearGradient>
                <clipPath id="pkgClip">
                  <rect x="20" y="20" width="110" height="150" rx="6" />
                </clipPath>
              </defs>

              <PackageBody shape={shape} />

              {/* printed firm name + brand line */}
              <text
                x="75"
                y="90"
                textAnchor="middle"
                fontFamily="var(--font-display), Impact, sans-serif"
                fontSize={fontSize}
                letterSpacing="1"
                fill="#ECE7DC"
                style={{ textTransform: "uppercase" }}
              >
                {printed}
              </text>
              <text x="75" y="106" textAnchor="middle" className="mono" fontSize="6" letterSpacing="2.5" fill="#7FB9B6">
                FORA PACKAGING
              </text>

              {/* light catching the film — calm sweep */}
              <g clipPath="url(#pkgClip)">
                <rect
                  x="-30"
                  y="20"
                  width="20"
                  height="150"
                  fill="#ECE7DC"
                  opacity="0.18"
                  style={{ animation: "pkgSheen 4.5s ease-in-out infinite" }}
                />
              </g>
            </svg>
          </div>
        </div>

        <div>
          <p className="mono text-[0.6rem] uppercase tracking-[0.25em] text-steel">
            Üretim önizlemesi
          </p>
          <p className="mt-1 display text-2xl text-bone">{label}</p>
          <p className="serif mt-2 max-w-[15rem] text-sm italic text-bone/55">
            {name ? (
              <>
                <span className="text-teal not-italic">{printed}</span> için, markanıza özel.
              </>
            ) : (
              "Firma adını yazın — ambalajın üstünde belirsin."
            )}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pkgFloat {
          0%, 100% { transform: translateY(0) rotate(-0.5deg); }
          50% { transform: translateY(-6px) rotate(0.5deg); }
        }
        @keyframes pkgSheen {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(170px); }
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
  return (
    <>
      <path d="M48 30 q27 -16 54 0" fill="none" stroke="#7FB9B6" strokeWidth="3" />
      <rect x="28" y="28" width="94" height="142" rx="5" fill="url(#pkgFill)" stroke="rgba(236,231,220,0.28)" />
      <rect x="60" y="38" width="30" height="9" rx="4.5" fill="none" stroke="#7FB9B6" strokeWidth="2" />
    </>
  );
}
