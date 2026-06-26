import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Stage } from "@/components/Stage";
import { Cursor } from "@/components/Cursor";
import { Loader } from "@/components/Loader";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://foraplastik.com"),
  title: {
    default: "FORA Plastik — Markanız İçin Doğan Ambalaj",
    template: "%s · FORA Plastik",
  },
  description:
    "İkitelli OSB'de 2.000 m² tesiste aylık 400 ton kapasiteyle kargo poşeti, mağaza/market poşeti, gıda ambalajı ve shrink üretimi. Markanıza özel 8 renk flexo baskılı ambalaj çözümleri.",
  keywords: [
    "kargo poşeti imalatı",
    "baskılı mağaza poşeti",
    "market poşeti",
    "kilitli poşet",
    "shrink rulo",
    "gıda ambalajı",
    "shrink palet örtüsü",
    "laminasyonlu ambalaj",
    "FORA Plastik",
    "İkitelli ambalaj üreticisi",
  ],
  openGraph: {
    title: "FORA Plastik — Markanız İçin Doğan Ambalaj",
    description:
      "Granülden teslimata: bir ambalajın yolculuğu. Yüksek kapasiteli, esnek ve kaliteli plastik ambalaj üretimi.",
    type: "website",
    locale: "tr_TR",
  },
};

export const viewport: Viewport = {
  themeColor: "#061214",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <body>
        <Stage />
        <SmoothScroll>{children}</SmoothScroll>
        <div className="vignette" aria-hidden />
        <div className="grain-layer" aria-hidden />
        <Cursor />
        <Loader />
      </body>
    </html>
  );
}
