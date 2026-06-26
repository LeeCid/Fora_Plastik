"use client";

/**
 * Four distinct, hand-drawn-feeling animated process scenes — one per station.
 * Refined line machinery over the living material, depicting the real plastic
 * packaging process: blown-film extrusion · flexo printing · cut & seal · shipping.
 * CSS-only animation (transform/opacity) for smoothness and offscreen throttling.
 */

const VB = "0 0 460 340";
const stroke = "rgba(236,231,220,0.5)";
const faint = "rgba(236,231,220,0.16)";

export function StationScene({ index }: { index: number }) {
  const Scene = [Extrusion, Flexo, CutSeal, Shipping][index] ?? Extrusion;
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <svg viewBox={VB} className="h-auto w-full overflow-visible">
        <Scene />
      </svg>
    </div>
  );
}

/* ---------- 01 · Blown-film extrusion (the rising bubble) ---------- */
function Extrusion() {
  return (
    <>
      <defs>
        <linearGradient id="bubbleGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#E8743B" stopOpacity="0.5" />
          <stop offset="45%" stopColor="#1FA6A0" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ECE7DC" stopOpacity="0.12" />
        </linearGradient>
        <clipPath id="bubbleClip">
          <path d="M196 296 C150 250 150 150 198 96 L262 96 C310 150 310 250 264 296 Z" />
        </clipPath>
      </defs>

      {/* hopper + granules */}
      <path d="M40 40 L120 40 L100 96 L60 96 Z" fill="none" stroke={stroke} strokeWidth="1.4" />
      {[58, 72, 86, 66, 80].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy="44"
          r="3.2"
          fill="#1FA6A0"
          style={{ animation: `granuleDrop ${1.8 + (i % 3) * 0.4}s linear ${i * -0.45}s infinite` }}
        />
      ))}

      {/* extruder body + die */}
      <rect x="74" y="96" width="14" height="150" rx="3" fill="none" stroke={stroke} strokeWidth="1.4" />
      <path d="M88 240 L196 296 L74 296 Z" fill={faint} stroke={stroke} strokeWidth="1.2" />
      <rect x="196" y="290" width="68" height="12" rx="3" fill="#1C1F23" stroke={stroke} strokeWidth="1.2" />
      {/* heat glow at die */}
      <ellipse cx="230" cy="296" rx="40" ry="9" fill="#E8743B" style={{ animation: "pulseGlow 1.8s ease-in-out infinite" }} opacity="0.6" />

      {/* the film bubble */}
      <g style={{ transformBox: "fill-box", transformOrigin: "bottom center", animation: "bubbleBreathe 4.5s ease-in-out infinite" }}>
        <path
          d="M196 296 C150 250 150 150 198 96 L262 96 C310 150 310 250 264 296 Z"
          fill="url(#bubbleGrad)"
          stroke="rgba(236,231,220,0.3)"
          strokeWidth="1.2"
        />
      </g>
      {/* rising sheen inside the bubble */}
      <g clipPath="url(#bubbleClip)">
        <ellipse cx="230" cy="220" rx="58" ry="14" fill="#ECE7DC" opacity="0.4" style={{ animation: "sheenRise 4s ease-in-out infinite" }} />
      </g>

      {/* nip rollers + take-off to roll */}
      <circle cx="214" cy="86" r="11" fill="none" stroke={stroke} strokeWidth="1.4" className="spin-cw" />
      <circle cx="246" cy="86" r="11" fill="none" stroke={stroke} strokeWidth="1.4" className="spin-ccw" />
      <line x1="258" y1="80" x2="420" y2="64" stroke={faint} strokeWidth="6" strokeLinecap="round" />
      <circle cx="424" cy="62" r="18" fill="none" stroke={stroke} strokeWidth="1.4" className="spin-cw" />

      <text x="230" y="332" textAnchor="middle" className="mono" fontSize="9" letterSpacing="3" fill="rgba(236,231,220,0.45)">
        BLOWN FILM · 210°C
      </text>
    </>
  );
}

/* ---------- 02 · Flexo printing (rotating ink cylinders) ---------- */
function Flexo() {
  const units = [
    { x: 120, c: "#19a7d6" },
    { x: 230, c: "#d63995" },
    { x: 340, c: "#e8c23b" },
  ];
  return (
    <>
      {/* film web */}
      <rect x="20" y="196" width="420" height="34" fill={faint} stroke={faint} strokeWidth="1" />
      {/* moving web pattern */}
      <g style={{ animation: "webFlow 1.6s linear infinite" }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={i} x1={20 + i * 32} y1="196" x2={20 + i * 32} y2="230" stroke="rgba(236,231,220,0.1)" strokeWidth="1" />
        ))}
      </g>

      {units.map((u, i) => (
        <g key={i}>
          {/* ink roller */}
          <circle cx={u.x} cy="92" r="13" fill="none" stroke={u.c} strokeWidth="1.6" className="spin-ccw" opacity="0.9" />
          {/* plate cylinder */}
          <circle cx={u.x} cy="150" r="32" fill="none" stroke={stroke} strokeWidth="1.4" className="spin-cw" />
          <circle cx={u.x} cy="150" r="32" fill={u.c} opacity="0.12" />
          {/* register spokes */}
          <g className="spin-cw" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <line x1={u.x} y1="120" x2={u.x} y2="180" stroke={u.c} strokeWidth="1" opacity="0.5" />
            <line x1={u.x - 30} y1="150" x2={u.x + 30} y2="150" stroke={u.c} strokeWidth="1" opacity="0.5" />
          </g>
          {/* ink dab landing on web */}
          <rect x={u.x - 14} y="198" width="28" height="30" fill={u.c} opacity="0.5" style={{ animation: `inkDab 1.6s ease-in-out ${i * 0.3}s infinite` }} />
        </g>
      ))}

      {/* printed brand emerges on the right of the web */}
      <text x="404" y="219" textAnchor="middle" fontFamily="'Brush Script MT','Segoe Script',cursive" fontStyle="italic" fontWeight="700" fontSize="22" fill="#ECE7DC" style={{ animation: "inkDab 1.6s ease-in-out 0.9s infinite" }}>
        Fora
      </text>

      {/* registration crosshair travelling under the web */}
      <g style={{ animation: "webFlow 1.6s linear infinite" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i} transform={`translate(${30 + i * 40} 244)`}>
            <line x1="-4" y1="0" x2="4" y2="0" stroke="#1FA6A0" strokeWidth="1" />
            <line x1="0" y1="-4" x2="0" y2="4" stroke="#1FA6A0" strokeWidth="1" />
          </g>
        ))}
      </g>

      <text x="230" y="300" textAnchor="middle" className="mono" fontSize="9" letterSpacing="3" fill="rgba(236,231,220,0.45)">
        FLEXO · 8 RENK · 150 m/dk
      </text>
    </>
  );
}

/* ---------- 03 · Cut & seal (bag-making press) ---------- */
function CutSeal() {
  return (
    <>
      {/* incoming film */}
      <rect x="10" y="150" width="250" height="48" fill={faint} stroke={faint} strokeWidth="1" />
      <g style={{ animation: "webFlow 1.4s linear infinite" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={10 + i * 30} y1="150" x2={10 + i * 30} y2="198" stroke="rgba(236,231,220,0.1)" strokeWidth="1" />
        ))}
      </g>

      {/* seal bar pressing rhythmically */}
      <g style={{ animation: "sealPress 2.2s ease-in-out infinite" }}>
        <rect x="150" y="96" width="92" height="26" rx="4" fill="#1C1F23" stroke={stroke} strokeWidth="1.4" />
        <line x1="160" y1="122" x2="232" y2="122" stroke="#E8743B" strokeWidth="2" />
      </g>
      {/* heat flash where it seals */}
      <rect x="150" y="146" width="92" height="10" fill="#E8743B" style={{ animation: "heatFlash 2.2s ease-in-out infinite" }} />
      {/* anvil */}
      <rect x="150" y="200" width="92" height="10" rx="3" fill="none" stroke={faint} strokeWidth="1.2" />

      {/* cutting blade */}
      <g style={{ animation: "bladeCut 2.2s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" }}>
        <polygon points="262,108 276,108 269,132" fill="#9aa3ad" />
      </g>
      <line x1="269" y1="150" x2="269" y2="198" stroke="rgba(236,231,220,0.25)" strokeDasharray="4 5" strokeWidth="1" />

      {/* finished bags stacking out the right */}
      {[0, 1, 2].map((i) => (
        <g key={i} style={{ animation: `dropStack 2.2s ease-out ${i * 0.5}s infinite` }}>
          <rect x={300 + i * 6} y={148 - i * 14} width="120" height="52" rx="4" fill={faint} stroke={stroke} strokeWidth="1.2" />
          <rect x={344 + i * 6} y={154 - i * 14} width="22" height="7" rx="3.5" fill="none" stroke={faint} strokeWidth="1" />
          <text x={360 + i * 6} y={180 - i * 14} textAnchor="middle" fontFamily="'Brush Script MT',cursive" fontStyle="italic" fontWeight="700" fontSize="13" fill="#1FA6A0">
            Fora
          </text>
        </g>
      ))}

      <text x="230" y="300" textAnchor="middle" className="mono" fontSize="9" letterSpacing="3" fill="rgba(236,231,220,0.45)">
        KESİM &amp; KAYNAK · 180°C
      </text>
    </>
  );
}

/* ---------- 04 · Output & shipping (palletise, wrap, ship) ---------- */
function Shipping() {
  return (
    <>
      {/* pallet */}
      <g style={{ animation: "shipOut 5s ease-in-out infinite" }}>
        <rect x="120" y="250" width="150" height="14" rx="2" fill="#1C1F23" stroke={stroke} strokeWidth="1.2" />
        <rect x="128" y="264" width="20" height="16" fill="#16181b" />
        <rect x="186" y="264" width="20" height="16" fill="#16181b" />
        <rect x="242" y="264" width="20" height="16" fill="#16181b" />

        {/* stacked boxes of bags */}
        {[
          { x: 132, y: 196, d: 0 },
          { x: 200, y: 196, d: 0.3 },
          { x: 132, y: 150, d: 0.6 },
          { x: 200, y: 150, d: 0.9 },
        ].map((b, i) => (
          <g key={i} style={{ animation: `dropStack 5s ease-out ${b.d}s infinite` }}>
            <rect x={b.x} y={b.y} width="62" height="50" rx="3" fill={faint} stroke={stroke} strokeWidth="1.2" />
            <text x={b.x + 31} y={b.y + 30} textAnchor="middle" fontFamily="'Brush Script MT',cursive" fontStyle="italic" fontWeight="700" fontSize="13" fill="#1FA6A0">
              Fora
            </text>
          </g>
        ))}

        {/* shrink wrap sweeping over */}
        <rect
          x="126"
          y="148"
          width="142"
          height="104"
          rx="4"
          fill="rgba(31,166,160,0.12)"
          stroke="rgba(31,166,160,0.4)"
          strokeWidth="1"
          style={{ transformBox: "fill-box", transformOrigin: "top center", animation: "wrapDown 5s ease-in-out infinite" }}
        />
      </g>

      {/* outbound truck silhouette */}
      <g style={{ animation: "truckRoll 0.5s ease-in-out infinite" }}>
        <rect x="300" y="214" width="70" height="40" rx="3" fill="none" stroke={stroke} strokeWidth="1.4" />
        <path d="M370 226 L398 226 L410 240 L410 254 L370 254 Z" fill="none" stroke={stroke} strokeWidth="1.4" />
        <circle cx="322" cy="258" r="9" fill="#0a0b0d" stroke={stroke} strokeWidth="1.4" />
        <circle cx="392" cy="258" r="9" fill="#0a0b0d" stroke={stroke} strokeWidth="1.4" />
        <line x1="306" y1="234" x2="330" y2="234" stroke="#1FA6A0" strokeWidth="1.5" />
      </g>
      {/* motion lines */}
      {[228, 240, 252].map((y, i) => (
        <line key={i} x1="286" y1={y} x2="300" y2={y} stroke="#1FA6A0" strokeWidth="1.4" opacity="0.5" style={{ animation: `inkDab 0.8s ease-in-out ${i * 0.15}s infinite` }} />
      ))}

      <text x="230" y="312" textAnchor="middle" className="mono" fontSize="9" letterSpacing="3" fill="rgba(236,231,220,0.45)">
        PALETLEME · SEVKE HAZIR
      </text>
    </>
  );
}
