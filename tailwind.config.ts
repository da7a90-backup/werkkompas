import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eaf0f7",
          100: "#cfdaeb",
          200: "#9fb5d6",
          300: "#6f8fc2",
          400: "#3f6aad",
          500: "#1c4684",
          600: "#003a72",
          700: "#002F5C",
          800: "#002448",
          900: "#001a35",
          950: "#000d1c",
        },
        royal: {
          DEFAULT: "#005DAA",
          dark: "#004B89",
          light: "#1a7ec9",
        },
        gold: {
          50: "#fdf9e5",
          100: "#faf1bf",
          200: "#f4e07f",
          300: "#ecca3f",
          400: "#d7ba1d",
          500: "#b29714",
          600: "#83700d",
          700: "#64560a",
          800: "#443a07",
        },
        canvas: "#f8f8f8",
        ink: "#151515",
        line: "#e6e6e6",
        muted: "#6b7280",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(0,0,0,0.04), 0 1px 2px 0 rgba(0,0,0,0.04)",
        elevated: "0 4px 12px -2px rgba(0,47,92,0.08), 0 2px 4px -2px rgba(0,47,92,0.06)",
        sheet: "0 -8px 28px -4px rgba(0,47,92,0.12)",
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
