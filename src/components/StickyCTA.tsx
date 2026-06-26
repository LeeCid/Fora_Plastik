"use client";

import { useEffect, useState } from "react";

/** Mobile-only sticky quote bar. Appears after the hero, hides over the form. */
export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const form = document.getElementById("teklif");
      const formTop = form ? form.getBoundingClientRect().top + y : Infinity;
      setShow(y > window.innerHeight * 0.9 && y + window.innerHeight < formTop + 200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 transition-transform duration-500 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="#teklif"
        className="flex items-center justify-between rounded-full border border-bone/15 bg-graphite/90 px-5 py-3 text-sm font-medium text-bone shadow-2xl backdrop-blur-md"
      >
        <span>Markanıza özel teklif</span>
        <span className="flex items-center gap-2 text-teal">
          Teklif Al <span>→</span>
        </span>
      </a>
    </div>
  );
}
