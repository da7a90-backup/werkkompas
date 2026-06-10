"use client";

import { useT } from "@/lib/i18n";

/**
 * Stats strip — mirrors the three numbers shown on werkkompasbv.nl exactly:
 *   7 · Jaren ervaring · 100+ · Tevreden klanten · 150 · Gecertificeerde medewerkers
 * No invented headline / eyebrow.
 */
export function StatsStrip() {
  const { t } = useT();
  const items = [
    { value: t("mk_stat_years_value"), label: t("mk_stat_years") },
    { value: t("mk_stat_clients_value"), label: t("mk_stat_clients") },
    { value: t("mk_stat_employees_value"), label: t("mk_stat_employees") },
  ];

  return (
    <section
      id="cijfers"
      className="relative bg-canvas py-16 lg:py-20"
    >
      <div className="container-app">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-navy-700/10 overflow-hidden rounded-3xl border border-line bg-white shadow-card">
          {items.map((it, i) => (
            <div
              key={i}
              className="relative flex items-baseline gap-4 p-7 lg:p-10"
            >
              <span className="absolute left-7 lg:left-10 top-6 lg:top-8 text-[10px] font-bold tracking-[0.22em] uppercase text-gold-700">
                / 0{i + 1}
              </span>
              <div className="mt-7 flex flex-col gap-2">
                <span className="font-display text-6xl lg:text-7xl font-black tracking-tightest leading-none text-navy-700 tabular">
                  {it.value}
                </span>
                <span className="text-xs lg:text-sm font-bold uppercase tracking-widest text-ink/55">
                  {it.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
