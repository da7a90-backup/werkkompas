"use client";

import { useT } from "@/lib/i18n";

export function ProcessSection() {
  const { t } = useT();
  const steps = [
    { num: "01", labelKey: "mk_process_1_label", bodyKey: "mk_process_1_body" },
    { num: "02", labelKey: "mk_process_2_label", bodyKey: "mk_process_2_body" },
    { num: "03", labelKey: "mk_process_3_label", bodyKey: "mk_process_3_body" },
    { num: "04", labelKey: "mk_process_4_label", bodyKey: "mk_process_4_body" },
  ];

  return (
    <section id="aanpak" className="relative bg-white py-20 lg:py-28">
      <div className="container-app">
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_1fr] mb-12 lg:mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-700">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              {t("mk_process_eyebrow")}
            </div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tightest leading-[0.95] text-navy-900 text-balance">
              {t("mk_process_title")}
            </h2>
          </div>
          <p className="text-base lg:text-lg text-ink/65 leading-relaxed max-w-md justify-self-end">
            {t("mk_process_subtitle")}
          </p>
        </div>

        <div className="grid border-t border-navy-700/15 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-navy-700/15">
          {steps.map((s, i) => (
            <article
              key={i}
              className="group relative pt-8 lg:pt-12 px-6 lg:px-8 pb-8 lg:pb-12 transition-colors hover:bg-canvas"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-gold-700">
                  / {s.num}
                </span>
                <span className="h-px flex-1 bg-navy-700/10" />
              </div>
              <h3 className="mt-6 font-display text-2xl lg:text-3xl font-black tracking-tightest text-navy-900">
                {t(s.labelKey)}
              </h3>
              <p className="mt-3 text-sm lg:text-base text-ink/65 leading-relaxed">
                {t(s.bodyKey)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
