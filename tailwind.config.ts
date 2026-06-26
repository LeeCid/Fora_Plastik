import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Filmic industrial world — warm-neutral darks, bone light.
        void: "#0A0B0D",
        graphite: "#141619",
        concrete: "#1C1F23",
        steel: "#7A828C",
        bone: "#ECE7DC", // warm off-white — primary text (anti-SaaS)
        // Brand thread — used as emissive accent ONLY, not wallpaper.
        teal: {
          DEFAULT: "#1FA6A0",
          deep: "#0C5A57",
          dark: "#073A38",
        },
        // Industrial heat accent — extrusion / live moments.
        ember: {
          DEFAULT: "#E8743B",
          deep: "#B5471A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        wrap: "1320px",
      },
    },
  },
  plugins: [],
};

export default config;
