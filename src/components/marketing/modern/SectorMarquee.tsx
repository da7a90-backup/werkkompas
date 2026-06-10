"use client";

import { useT } from "@/lib/i18n";

// The werkkompasbv.nl hero body names only these four sectors plus the catch-all
// "alle branches". No invented additions.
const SECTORS = [
  "Beveiliging",
  "Zorg",
  "Transport",
  "Logistiek",
  "Alle branches",
];

/**
 * Editorial sector marquee — endless horizontal scroll of sector names in
 * oversized display type. Inspired by Studio Dumbar / Build in Amsterdam
 * editorial treatments.
 */
export function SectorMarquee() {
  const { t } = useT();

  // Two copies for seamless loop
  const items = [...SECTORS, ...SECTORS];

  return (
    <section
      aria-label={t("mk_sectors_label")}
      className="relative isolate overflow-hidden border-y border-navy-700/15 bg-canvas py-8 lg:py-10"
    >
      <div className="container-app mb-4 lg:mb-6 flex items-center gap-3">
        <span className="h-px w-8 bg-gold-400" />
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/55">
          {t("mk_sectors_label")}
        </span>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex w-max items-center gap-12 lg:gap-16 marquee-track will-change-transform">
          {items.map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-12 lg:gap-16 font-display text-5xl lg:text-7xl xl:text-8xl font-black tracking-tightest text-navy-700 select-none"
            >
              {s}
              <span className="inline-block h-3 w-3 rounded-full bg-gold-400 shrink-0" />
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee 38s linear infinite;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
