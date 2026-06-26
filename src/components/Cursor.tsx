"use client";

import { useEffect, useRef, useState } from "react";

/** Custom film-reticle cursor with magnetic hover scaling + contextual labels. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let state = "";
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;

      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor-label]");
      const interactive = !!t.closest("a, button, input, select, textarea, [data-cursor]");
      const next = labelled ? "label" : interactive ? "hover" : "";

      if (next !== state) {
        state = next;
        const scale = next === "label" ? "3.4" : next === "hover" ? "2.1" : "1";
        if (ring.current) {
          ring.current.style.setProperty("--s", scale);
          ring.current.style.borderColor =
            next === "label" ? "rgba(31,166,160,0.7)" : "rgba(236,231,220,0.4)";
        }
        if (label.current) {
          label.current.textContent = labelled?.dataset.cursorLabel ?? "";
          label.current.style.opacity = next === "label" ? "1" : "0";
        }
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring.current)
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(var(--s, 1))`;
      if (label.current) label.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1 w-1 rounded-full bg-bone"
        style={{ marginLeft: -2, marginTop: -2 }}
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-bone/40 transition-[border-color] duration-300"
        style={{ ["--s" as string]: "1" }}
      />
      <div
        ref={label}
        className="mono pointer-events-none fixed left-0 top-0 z-[101] text-[0.55rem] uppercase tracking-[0.15em] text-bone opacity-0 transition-opacity duration-200"
      />
    </>
  );
}
