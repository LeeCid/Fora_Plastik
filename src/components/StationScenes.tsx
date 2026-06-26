"use client";

/**
 * Four detailed, technically-accurate animated machine schematics — one per
 * station — drawn in an engineered "blueprint" style (metal gradients, frames,
 * part call-outs, restrained CSS motion):
 *   01 blown-film extrusion tower · 02 CI flexo press ·
 *   03 bag-making / heat-seal line · 04 robotic palletiser + shipping.
 */

const VB = "0 0 560 400";
const S = "rgba(236,231,220,0.55)"; // primary structure
const F = "rgba(236,231,220,0.24)"; // faint
const G = "rgba(236,231,220,0.12)"; // ghost / frame
const LABEL = "rgba(236,231,220,0.6)";

export function StationScene({ index }: { index: number }) {
  const Scene = [Extrusion, Flexo, BagMaker, Palletiser][index] ?? Extrusion;
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <svg viewBox={VB} className="h-auto w-full overflow-visible">
        <Scene />
      </svg>
    </div>
  );
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#454b52" />
        <stop offset="42%" stopColor="#737a82" />
        <stop offset="58%" stopColor="#5b626a" />
        <stop offset="100%" stopColor="#23272c" />
      </linearGradient>
      <linearGradient id={`${id}-steelH`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2a2e33" />
        <stop offset="45%" stopColor="#727981" />
        <stop offset="100%" stopColor="#2a2e33" />
      </linearGradient>
      <radialGradient id={`${id}-heat`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffb37a" />
        <stop offset="55%" stopColor="#E8743B" />
        <stop offset="100%" stopColor="#E8743B" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function Callout({
  x,
  y,
  tx,
  ty,
  label,
  align = "start",
}: {
  x: number;
  y: number;
  tx: number;
  ty: number;
  label: string;
  align?: "start" | "end" | "middle";
}) {
  return (
    <g>
      <line x1={x} y1={y} x2={tx} y2={ty} stroke={G} strokeWidth="1" />
      <circle cx={x} cy={y} r="1.6" fill="#1FA6A0" />
      <text x={tx} y={ty - 4} textAnchor={align} className="mono" fontSize="7.5" letterSpacing="1.5" fill={LABEL}>
        {label}
      </text>
    </g>
  );
}

/* ============ 01 · BLOWN-FILM EXTRUSION TOWER ============ */
function Extrusion() {
  return (
    <>
      <Defs id="ex" />
      {/* tower frame */}
      <g stroke={G} strokeWidth="1" fill="none">
        <line x1="44" y1="26" x2="44" y2="372" />
        <line x1="516" y1="26" x2="516" y2="372" />
        <line x1="44" y1="26" x2="516" y2="26" />
        <line x1="44" y1="120" x2="516" y2="120" strokeDasharray="2 6" />
        <line x1="44" y1="372" x2="516" y2="372" />
      </g>

      {/* ---- extruder (bottom-left) ---- */}
      {/* motor / gearbox */}
      <rect x="58" y="306" width="40" height="50" rx="3" fill="url(#ex-steel)" stroke={S} strokeWidth="1" />
      {[314, 322, 330, 338, 346].map((y) => (
        <line key={y} x1="60" y1={y} x2="96" y2={y} stroke={G} strokeWidth="1" />
      ))}
      {/* hopper + granules */}
      <path d="M120 268 L168 268 L156 300 L132 300 Z" fill="none" stroke={S} strokeWidth="1.2" />
      {[132, 144, 156].map((x, i) => (
        <circle key={i} cx={x} cy="276" r="2.6" fill="#1FA6A0" style={{ animation: `granuleDrop ${1.7 + i * 0.3}s linear ${i * -0.5}s infinite` }} />
      ))}
      {/* barrel with heater bands */}
      <rect x="98" y="312" width="150" height="30" rx="6" fill="url(#ex-steelH)" stroke={S} strokeWidth="1" />
      {[120, 150, 180, 210].map((x) => (
        <g key={x}>
          <rect x={x} y="308" width="12" height="38" rx="2" fill="#2a2e33" stroke={F} strokeWidth="0.8" />
          <rect x={x} y="308" width="12" height="38" rx="2" fill="url(#ex-heat)" opacity="0.5" style={{ animation: `pulseGlow ${1.6}s ease-in-out ${(x % 60) / 60}s infinite` }} />
        </g>
      ))}
      {/* screw centerline */}
      <line x1="104" y1="327" x2="244" y2="327" stroke={F} strokeWidth="2" strokeDasharray="3 8" style={{ animation: "screwTurn 0.9s linear infinite" }} />

      {/* adapter elbow up to die */}
      <path d="M244 318 H268 V300" fill="none" stroke={S} strokeWidth="6" strokeLinecap="round" />
      {/* die head + air ring */}
      <ellipse cx="280" cy="300" rx="42" ry="9" fill="url(#ex-steelH)" stroke={S} strokeWidth="1" />
      <ellipse cx="280" cy="298" rx="20" ry="5" fill="#16181b" stroke={F} strokeWidth="0.8" />
      <ellipse cx="280" cy="300" rx="50" ry="6" fill="url(#ex-heat)" opacity="0.4" style={{ animation: "pulseGlow 2s ease-in-out infinite" }} />

      {/* ---- the bubble ---- */}
      <clipPath id="ex-bub">
        <path d="M268 298 C232 250 230 180 256 92 L304 92 C330 180 328 250 292 298 Z" />
      </clipPath>
      <g style={{ transformBox: "fill-box", transformOrigin: "bottom center", animation: "bubbleBreathe 5s ease-in-out infinite" }}>
        <path
          d="M268 298 C232 250 230 180 256 92 L304 92 C330 180 328 250 292 298 Z"
          fill="url(#ex-bubGrad)"
          stroke="rgba(236,231,220,0.32)"
          strokeWidth="1.1"
        />
        <linearGradient id="ex-bubGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#E8743B" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#1FA6A0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ECE7DC" stopOpacity="0.1" />
        </linearGradient>
      </g>
      {/* internal sheen + air flow */}
      <g clipPath="url(#ex-bub)">
        <ellipse cx="280" cy="220" rx="46" ry="12" fill="#ECE7DC" opacity="0.32" style={{ animation: "sheenRise 4.5s ease-in-out infinite" }} />
        {[250, 280, 310].map((x, i) => (
          <line key={i} x1={x} y1="296" x2={x} y2="270" stroke="#7FB9B6" strokeWidth="1" opacity="0.5" style={{ animation: `airRise ${3 + i * 0.5}s linear ${i * -0.7}s infinite` }} />
        ))}
      </g>
      {/* frost line */}
      <line x1="236" y1="206" x2="324" y2="206" stroke="#7FB9B6" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.6" />

      {/* ---- collapsing frame + nip ---- */}
      <path d="M236 96 L274 64 M324 96 L286 64" stroke={S} strokeWidth="1.2" fill="none" />
      <circle cx="272" cy="58" r="9" fill="none" stroke={S} strokeWidth="1.2" className="spin-cw" />
      <circle cx="288" cy="58" r="9" fill="none" stroke={S} strokeWidth="1.2" className="spin-ccw" />

      {/* lay-flat film to idler + winder */}
      <path d="M296 56 H430" fill="none" stroke={F} strokeWidth="5" strokeDasharray="6 6" style={{ animation: "dashFlow 1.2s linear infinite" }} />
      <circle cx="438" cy="58" r="12" fill="url(#ex-steel)" stroke={S} strokeWidth="1" className="spin-cw" />
      <path d="M450 64 C470 110 472 180 470 232" fill="none" stroke={F} strokeWidth="5" strokeDasharray="6 6" style={{ animation: "dashFlow 1.4s linear infinite" }} />
      <circle cx="472" cy="252" r="30" fill="url(#ex-steel)" stroke={S} strokeWidth="1.2" className="spin-cw" />
      <circle cx="472" cy="252" r="12" fill="none" stroke={F} strokeWidth="1" />

      {/* control cabinet */}
      <rect x="392" y="300" width="74" height="56" rx="3" fill="#16181b" stroke={S} strokeWidth="1" />
      <rect x="400" y="308" width="58" height="26" rx="2" fill="#0c1413" stroke={F} strokeWidth="0.8" />
      <line x1="404" y1="316" x2="430" y2="316" stroke="#1FA6A0" strokeWidth="1" />
      <line x1="404" y1="322" x2="446" y2="322" stroke={F} strokeWidth="1" />
      <line x1="404" y1="328" x2="420" y2="328" stroke={F} strokeWidth="1" />
      <circle cx="404" cy="346" r="2.4" fill="#1FA6A0" style={{ animation: "pulseGlow 1.4s ease-in-out infinite" }} />
      <circle cx="414" cy="346" r="2.4" fill="#E8743B" opacity="0.6" />

      {/* call-outs */}
      <Callout x={170} y={327} tx={150} ty={372} label="EKSTRÜDER" />
      <Callout x={280} y={298} tx={300} ty={356} label="DIE / KAFA" align="middle" />
      <Callout x={300} y={206} tx={350} ty={200} label="FROST LINE" />
      <Callout x={280} y={70} tx={150} ty={66} label="ÇÖKERTME ÇERÇEVESİ" />
      <Callout x={472} y={252} tx={500} ty={300} label="BOBİN" align="end" />
    </>
  );
}

/* ============ 02 · CI FLEXO PRESS (central impression) ============ */
function Flexo() {
  const cx = 250;
  const cy = 210;
  const R = 116;
  // six print decks around the drum (angle in deg, color, label)
  const decks = [
    { a: 150, c: "#19a7d6", n: "C" },
    { a: 120, c: "#d63995", n: "M" },
    { a: 90, c: "#e8c23b", n: "Y" },
    { a: 60, c: "#cfd6db", n: "K" },
    { a: 30, c: "#1FA6A0", n: "S1" },
    { a: 0, c: "#ECE7DC", n: "S2" },
  ];
  const pt = (ang: number, r: number) => {
    const rad = (ang * Math.PI) / 180;
    return [cx + Math.cos(rad) * r, cy - Math.sin(rad) * r];
  };
  return (
    <>
      <Defs id="fx" />
      {/* base frame */}
      <line x1="40" y1="360" x2="520" y2="360" stroke={G} strokeWidth="1" />
      <rect x="150" y="338" width="200" height="22" rx="2" fill="#16181b" stroke={G} strokeWidth="1" />

      {/* central impression drum */}
      <circle cx={cx} cy={cy} r={R} fill="url(#fx-steel)" stroke={S} strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r={R - 10} fill="none" stroke={F} strokeWidth="1" />
      <g className="spin-cw" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx={cx} cy={cy} r="20" fill="#16181b" stroke={S} strokeWidth="1" />
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const [x2, y2] = pt(a, R - 6);
          return <line key={a} x1={cx} y1={cy} x2={x2} y2={y2} stroke={F} strokeWidth="1" />;
        })}
      </g>

      {/* web wrapping the drum (entry bottom-left → exit top-right) */}
      <path
        d={`M70 332 C120 330 ${cx - R - 8} ${cy + 70} ${cx - R - 2} ${cy} A ${R + 6} ${R + 6} 0 1 1 ${cx + 80} ${cy - R - 4} C ${cx + 140} ${cy - R - 18} 470 120 500 120`}
        fill="none"
        stroke={F}
        strokeWidth="4"
        strokeDasharray="7 7"
        style={{ animation: "dashFlow 1.1s linear infinite" }}
      />

      {/* print decks */}
      {decks.map((d, i) => {
        const [px, py] = pt(d.a, R + 30);
        const [ax, ay] = pt(d.a, R + 58);
        return (
          <g key={i}>
            {/* plate cylinder (touches drum) */}
            <circle cx={px} cy={py} r="22" fill="url(#fx-steel)" stroke={S} strokeWidth="1.1" />
            <g className="spin-ccw" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <circle cx={px} cy={py} r="22" fill="none" stroke={d.c} strokeWidth="1.4" opacity="0.85" />
            </g>
            {/* anilox + ink fountain */}
            <circle cx={ax} cy={ay} r="13" fill="none" stroke={d.c} strokeWidth="1.3" className="spin-cw" />
            <circle cx={ax} cy={ay} r="4" fill={d.c} opacity="0.6" style={{ animation: `inkDab 1.6s ease-in-out ${i * 0.2}s infinite` }} />
            {/* ink transfer dab on drum */}
            <circle cx={(px + cx) / 2} cy={(py + cy) / 2} r="3" fill={d.c} opacity="0.5" style={{ animation: `inkDab 1.6s ease-in-out ${i * 0.2}s infinite` }} />
            <text x={ax} y={ay + 26} textAnchor="middle" className="mono" fontSize="7" fill={LABEL}>{d.n}</text>
          </g>
        );
      })}

      {/* unwind roll */}
      <circle cx="62" cy="332" r="26" fill="url(#fx-steel)" stroke={S} strokeWidth="1.2" className="spin-cw" />
      <circle cx="62" cy="332" r="9" fill="none" stroke={F} strokeWidth="1" />

      {/* drying hood + rewind */}
      <path d="M452 96 H520 V150 H452 Z" fill="#16181b" stroke={S} strokeWidth="1" />
      {[108, 120, 132].map((y, i) => (
        <line key={y} x1="458" y1={y} x2="514" y2={y} stroke="#E8743B" strokeWidth="1" opacity="0.5" style={{ animation: `pulseGlow 1.8s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
      {/* printed Fora exiting on the web */}
      <text x="486" y="118" textAnchor="middle" fontFamily="'Brush Script MT','Segoe Script',cursive" fontStyle="italic" fontWeight="700" fontSize="16" fill="#ECE7DC" style={{ animation: "inkDab 1.6s ease-in-out 1s infinite" }}>
        Fora
      </text>

      <Callout x={cx} y={cy - R} tx={cx - 40} ty={70} label="MERKEZ TAMBUR" />
      {(() => { const [px, py] = pt(120, R + 30); return <Callout x={px} y={py} tx={px - 70} ty={py - 14} label="BASKI SİLİNDİRİ" />; })()}
      <Callout x={486} y={150} tx={470} ty={172} label="KURUTMA" />
      <Callout x={62} y={358} tx={40} ty={384} label="BOBİN AÇMA" />
      <text x="250" y="392" textAnchor="middle" className="mono" fontSize="8" letterSpacing="3" fill={LABEL}>
        CI FLEXO · 8 RENK · 150 m/dk
      </text>
    </>
  );
}

/* ============ 03 · BAG-MAKING / HEAT-SEAL LINE ============ */
function BagMaker() {
  return (
    <>
      <Defs id="bm" />
      {/* machine bed / frame */}
      <line x1="30" y1="332" x2="530" y2="332" stroke={G} strokeWidth="1" />
      <rect x="150" y="120" width="190" height="150" rx="4" fill="none" stroke={G} strokeWidth="1" />
      <rect x="60" y="300" width="40" height="34" fill="#16181b" stroke={G} strokeWidth="1" />
      <rect x="300" y="296" width="48" height="38" fill="#16181b" stroke={G} strokeWidth="1" />

      {/* unwind roll + idlers */}
      <circle cx="70" cy="190" r="34" fill="url(#bm-steel)" stroke={S} strokeWidth="1.2" className="spin-cw" />
      <circle cx="70" cy="190" r="12" fill="none" stroke={F} strokeWidth="1" />
      <circle cx="126" cy="232" r="9" fill="url(#bm-steel)" stroke={S} strokeWidth="1" className="spin-cw" />

      {/* film web path into the machine */}
      <path d="M104 188 C120 196 120 222 150 222 H300" fill="none" stroke={F} strokeWidth="5" strokeDasharray="7 7" style={{ animation: "dashFlow 1.1s linear infinite" }} />

      {/* draw rollers (pair) */}
      <circle cx="170" cy="206" r="11" fill="url(#bm-steel)" stroke={S} strokeWidth="1" className="spin-cw" />
      <circle cx="170" cy="240" r="11" fill="url(#bm-steel)" stroke={S} strokeWidth="1" className="spin-ccw" />

      {/* sealing station: heated jaw pressing */}
      <g style={{ animation: "sealPress 2.2s ease-in-out infinite" }}>
        <rect x="216" y="150" width="70" height="24" rx="3" fill="url(#bm-steel)" stroke={S} strokeWidth="1.1" />
        <line x1="224" y1="174" x2="278" y2="174" stroke="#E8743B" strokeWidth="2.5" />
        {/* actuator rods */}
        <line x1="232" y1="150" x2="232" y2="128" stroke={S} strokeWidth="2" />
        <line x1="270" y1="150" x2="270" y2="128" stroke={S} strokeWidth="2" />
      </g>
      {/* lower seal anvil + heat flash */}
      <rect x="216" y="234" width="70" height="14" rx="3" fill="url(#bm-steelH)" stroke={S} strokeWidth="1" />
      <rect x="216" y="214" width="70" height="20" fill="#E8743B" opacity="0" style={{ animation: "heatFlash 2.2s ease-in-out infinite" }} />

      {/* guillotine knife */}
      <g style={{ animation: "bladeCut 2.2s ease-in-out infinite" }}>
        <rect x="300" y="150" width="10" height="30" fill="url(#bm-steel)" stroke={S} strokeWidth="0.8" />
        <polygon points="298,180 312,180 305,196" fill="#9aa3ad" stroke={S} strokeWidth="0.6" />
      </g>
      <line x1="305" y1="200" x2="305" y2="248" stroke={F} strokeDasharray="3 4" strokeWidth="1" />

      {/* eye-mark sensor */}
      <circle cx="196" cy="200" r="4" fill="none" stroke="#1FA6A0" strokeWidth="1" />
      <line x1="196" y1="204" x2="196" y2="220" stroke="#1FA6A0" strokeWidth="0.8" strokeDasharray="2 2" />

      {/* outfeed conveyor + finished bags stacking */}
      <line x1="330" y1="262" x2="520" y2="262" stroke={S} strokeWidth="1.4" />
      <g style={{ animation: "dashFlow 0.9s linear infinite" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={332 + i * 16} y1="262" x2={338 + i * 16} y2="262" stroke={F} strokeWidth="3" />
        ))}
      </g>
      <circle cx="336" cy="262" r="8" fill="url(#bm-steel)" stroke={S} strokeWidth="1" className="spin-cw" />
      <circle cx="512" cy="262" r="8" fill="url(#bm-steel)" stroke={S} strokeWidth="1" className="spin-cw" />
      {[0, 1, 2].map((i) => (
        <g key={i} style={{ animation: `dropStack 2.2s ease-out ${i * 0.55}s infinite` }}>
          <rect x={404 + i * 4} y={210 + 0 - i * 0} width="86" height="48" rx="3" fill={F} stroke={S} strokeWidth="1" transform={`translate(0 ${-i * 6})`} />
          <text x={447 + i * 4} y={238 - i * 6} textAnchor="middle" fontFamily="'Brush Script MT',cursive" fontStyle="italic" fontWeight="700" fontSize="12" fill="#1FA6A0">Fora</text>
        </g>
      ))}

      <Callout x={170} y={206} tx={150} ty={150} label="ÇEKİCİ MERDANE" />
      <Callout x={250} y={150} tx={250} ty={112} label="KAYNAK ÇENESİ" align="middle" />
      <Callout x={305} y={180} tx={340} ty={150} label="BIÇAK" />
      <Callout x={70} y={224} tx={40} ty={262} label="BESLEME BOBİNİ" />
      <Callout x={460} y={262} tx={470} ty={300} label="KONVEYÖR" align="end" />
      <text x="280" y="392" textAnchor="middle" className="mono" fontSize="8" letterSpacing="3" fill={LABEL}>
        KESİM &amp; KAYNAK · 180°C · 90 vuruş/dk
      </text>
    </>
  );
}

/* ============ 04 · ROBOTIC PALLETISER + SHIPPING ============ */
function Palletiser() {
  return (
    <>
      <Defs id="pl" />
      <line x1="30" y1="356" x2="530" y2="356" stroke={G} strokeWidth="1" />

      {/* infeed conveyor (left) with boxes */}
      <line x1="20" y1="250" x2="150" y2="250" stroke={S} strokeWidth="1.4" />
      <g style={{ animation: "dashFlow 1s linear infinite" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={24 + i * 17} y1="250" x2="32" y2="250" stroke={F} strokeWidth="3" transform={`translate(${i * 17} 0)`} />
        ))}
      </g>
      <rect x="40" y="222" width="40" height="28" rx="2" fill={F} stroke={S} strokeWidth="1" style={{ animation: "shipOut 4s linear infinite" }} />

      {/* robot base + tower */}
      <rect x="150" y="300" width="56" height="56" rx="3" fill="url(#pl-steel)" stroke={S} strokeWidth="1.2" />
      <rect x="172" y="160" width="14" height="142" fill="url(#pl-steelH)" stroke={S} strokeWidth="1" />
      {/* articulated arm */}
      <g style={{ transformBox: "view-box", transformOrigin: "179px 168px", animation: "armSwing 4s ease-in-out infinite" } as React.CSSProperties}>
        <line x1="179" y1="168" x2="262" y2="150" stroke="url(#pl-steelH)" strokeWidth="10" strokeLinecap="round" />
        <circle cx="179" cy="168" r="7" fill="#16181b" stroke={S} strokeWidth="1.2" />
        <g style={{ transformBox: "view-box", transformOrigin: "262px 150px", animation: "forearmSwing 4s ease-in-out infinite" } as React.CSSProperties}>
          <line x1="262" y1="150" x2="330" y2="186" stroke="url(#pl-steelH)" strokeWidth="8" strokeLinecap="round" />
          <circle cx="262" cy="150" r="6" fill="#16181b" stroke={S} strokeWidth="1.1" />
          {/* vacuum gripper + box */}
          <rect x="318" y="186" width="26" height="8" fill="url(#pl-steel)" stroke={S} strokeWidth="0.8" />
          <rect x="320" y="194" width="22" height="18" rx="1.5" fill={F} stroke={S} strokeWidth="1" />
        </g>
      </g>

      {/* pallet + stacked boxes building up */}
      <rect x="372" y="320" width="120" height="12" rx="2" fill="#1C1F23" stroke={S} strokeWidth="1" />
      <rect x="380" y="332" width="16" height="14" fill="#16181b" />
      <rect x="424" y="332" width="16" height="14" fill="#16181b" />
      <rect x="468" y="332" width="16" height="14" fill="#16181b" />
      {[
        { x: 380, y: 286, d: 0 },
        { x: 432, y: 286, d: 0.4 },
        { x: 380, y: 250, d: 0.8 },
        { x: 432, y: 250, d: 1.2 },
      ].map((b, i) => (
        <g key={i} style={{ animation: `dropStack 4s ease-out ${b.d}s infinite` }}>
          <rect x={b.x} y={b.y} width="48" height="34" rx="2" fill={F} stroke={S} strokeWidth="1" />
          <text x={b.x + 24} y={b.y + 22} textAnchor="middle" fontFamily="'Brush Script MT',cursive" fontStyle="italic" fontWeight="700" fontSize="11" fill="#1FA6A0">Fora</text>
        </g>
      ))}
      {/* stretch wrap spiral */}
      <path d="M376 250 C500 244 500 290 432 296 C372 300 372 318 470 320" fill="none" stroke="rgba(31,166,160,0.6)" strokeWidth="1.4" strokeDasharray="160" style={{ animation: "wrapSpin 4s ease-in-out infinite" }} />

      {/* outbound truck */}
      <g style={{ animation: "truckRoll 0.5s ease-in-out infinite" }}>
        <rect x="470" y="300" width="2" height="2" fill="none" />
      </g>

      <Callout x={179} y={168} tx={130} ty={150} label="PALETLEYİCİ ROBOT" />
      <Callout x={432} y={262} tx={470} ty={232} label="STREÇ SARMA" align="end" />
      <Callout x={70} y={250} tx={40} ty={300} label="BESLEME" />
      <text x="280" y="392" textAnchor="middle" className="mono" fontSize="8" letterSpacing="3" fill={LABEL}>
        PALETLEME · STREÇ · SEVKE HAZIR
      </text>
    </>
  );
}
