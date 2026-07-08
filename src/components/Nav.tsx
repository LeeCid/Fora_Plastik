"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#uretim", label: "Üretim" },
  { href: "#urunler", label: "Ürünler" },
  { href: "#gida", label: "Gıda" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3.5 backdrop-blur-md" : "py-6"
      }`}
    >
      {scrolled && (
        <div className="absolute inset-0 -z-10 bg-void/55" />
      )}
      <nav className="wrap flex items-center justify-between">
        <a href="#top" aria-label="FORA Plastik" data-cursor className="block w-[192px]">
          <Logo className="h-11 w-auto" />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="mono text-[0.68rem] uppercase tracking-[0.18em] text-bone/55 transition-colors hover:text-teal"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#teklif"
          data-cursor
          className="group inline-flex items-center gap-2.5 rounded-full bg-teal px-5 py-2.5 transition-colors hover:bg-teal-bright"
        >
          <span className="mono whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#04201e]">
            Teklif Al
          </span>
          <span className="text-xs text-[#04201e] transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </nav>
    </header>
  );
}
