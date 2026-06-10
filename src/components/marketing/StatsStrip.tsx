"use client";

import { useT } from "@/lib/i18n";

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
      className="relative bg-canvas py-16 lg:py-24"
    >
      <div className="container-app">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-700">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            {t("mk_stats_eyebrow")}
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tightest text-navy-900 text-balance">
            {t("mk_stats_title")}
          </h2>
        </div>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-navy-700/10 overflow-hidden rounded-3xl border border-line bg-white shadow-card">
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
