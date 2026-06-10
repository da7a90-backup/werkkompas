import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef1f5",
          100: "#d2d9e2",
          200: "#a5b3c5",
          300: "#788ea9",
          400: "#4b6889",
          500: "#2e4862",
          600: "#223851",
          700: "#1a2f47",
          800: "#13243a",
          900: "#0c1a2b",
          950: "#06111e",
        },
        royal: {
          DEFAULT: "#2e4862",
          dark: "#1f3349",
          light: "#4b6889",
        },
        gold: {
          50: "#fdf8e0",
          100: "#fcefb3",
          200: "#fae47a",
          300: "#f6d340",
          400: "#EFBF04",
          500: "#c79c03",
          600: "#997703",
          700: "#6e5602",
          800: "#4a3a01",
        },
        canvas: "#f8f8f8",
        // Variant B (Editorial) — ivory canvas + warm hairline rules.
        ivory: "#f6f1e7",
        stone: {
          50: "#f7f4ee",
          100: "#ecdfca",
          200: "#dbc9a6",
          300: "#c0a16e",
          400: "#a48450",
          500: "#85683b",
          600: "#634d2d",
          700: "#3f311c",
        },
        ink: "#151515",
        line: "#e6e6e6",
        muted: "#6b7280",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-inter)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        // Variant B (Editorial)
        serif: [
          "var(--font-fraunces)",
          "Fraunces",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        // Variant C (Maximalist) — condensed display
        poster: [
          "var(--font-archivo-black)",
          "Archivo Black",
          "var(--font-inter)",
          "Inter",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(0,0,0,0.04), 0 1px 2px 0 rgba(0,0,0,0.04)",
        elevated: "0 4px 12px -2px rgba(26,47,71,0.08), 0 2px 4px -2px rgba(26,47,71,0.06)",
        sheet: "0 -8px 28px -4px rgba(26,47,71,0.12)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      keyframes: {
        "slide-up": {
          from: { transform: "translateY(12px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.96)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.32s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fade-in 0.24s ease-out",
        "scale-in": "scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
