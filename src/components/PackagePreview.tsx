"use client";

import { motion } from "framer-motion";

type Shape = "bag" | "cargo" | "pouch" | "roll";

/** Animated SVG that morphs to reflect the selected product type in the quote form. */
export function PackagePreview({ shape, label }: { shape: Shape; label: string }) {
  return (
    <div className="relative flex items-center gap-6 border-t border-bone/10 pt-8">
      <div className="relative h-40 w-32 shrink-0">
        <svg viewBox="0 0 128 160" className="h-full w-full">
          <defs>
            <linearGradient id="pkg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#15A0A0" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0B4F4F" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          {shape === "bag" && (
            <motion.g
              key="bag"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <path d="M40 36 q24 -16 48 0" fill="none" stroke="#9FC6C6" strokeWidth="3" />
              <rect x="24" y="34" width="80" height="118" rx="6" fill="url(#pkg)" stroke="rgba(244,247,246,0.25)" />
              <rect x="52" y="44" width="24" height="9" rx="4.5" fill="none" stroke="#9FC6C6" strokeWidth="2" />
            </motion.g>
          )}

          {shape === "cargo" && (
            <motion.g
              key="cargo"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <rect x="22" y="26" width="84" height="128" rx="4" fill="url(#pkg)" stroke="rgba(244,247,246,0.25)" />
              <rect x="22" y="26" width="84" height="20" fill="#0B4F4F" opacity="0.6" />
              <line x1="22" y1="120" x2="106" y2="120" stroke="#9FC6C6" strokeDasharray="4 4" strokeWidth="1.5" />
              <text x="64" y="92" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#9FC6C6" letterSpacing="1">
                TR-000-000
              </text>
            </motion.g>
          )}

          {shape === "pouch" && (
            <motion.g
              key="pouch"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <rect x="28" y="24" width="72" height="14" rx="3" fill="#0B4F4F" opacity="0.7" />
              <path d="M28 38 h72 v104 q-36 14 -72 0 z" fill="url(#pkg)" stroke="rgba(244,247,246,0.25)" />
              <line x1="34" y1="46" x2="94" y2="46" stroke="#9FC6C6" strokeWidth="1.5" opacity="0.6" />
            </motion.g>
          )}

          {shape === "roll" && (
            <motion.g
              key="roll"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ellipse cx="64" cy="44" rx="44" ry="14" fill="#0B4F4F" opacity="0.7" />
              <rect x="20" y="44" width="88" height="84" fill="url(#pkg)" />
              <ellipse cx="64" cy="128" rx="44" ry="14" fill="#0E6E6E" opacity="0.8" />
              <ellipse cx="64" cy="44" rx="20" ry="6" fill="#061214" />
            </motion.g>
          )}
        </svg>
      </div>

      <div>
        <p className="mono text-[0.62rem] uppercase tracking-[0.25em] text-steel">
          Önizleme
        </p>
        <p className="mt-1 display text-xl text-bone">{label}</p>
        <p className="mt-2 text-xs text-bone/55">
          Seçiminize göre ürün formu güncellenir.
        </p>
      </div>
    </div>
  );
}
