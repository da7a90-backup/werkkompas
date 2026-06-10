"use client";

import { ArrowUpRight, Handshake, Siren, ShieldCheck, GraduationCap } from "lucide-react";
import { useT } from "@/lib/i18n";

export function ServicesSection() {
  const { t } = useT();

  const services = [
    {
      icon: Handshake,
      number: "01",
      titleKey: "mk_svc_1_title",
      bodyKey: "mk_svc_1_body",
      accent: "navy" as const,
    },
    {
      icon: Siren,
      number: "02",
      titleKey: "mk_svc_2_title",
      bodyKey: "mk_svc_2_body",
      accent: "gold" as const,
    },
    {
      icon: ShieldCheck,
      number: "03",
      titleKey: "mk_svc_3_title",
      bodyKey: "mk_svc_3_body",
      accent: "navy" as const,
    },
    {
      icon: GraduationCap,
      number: "04",
      titleKey: "mk_svc_4_title",
      bodyKey: "mk_svc_4_body",
      accent: "gold" as const,
    },
  ];

  return (
    <section id="diensten" className="relative bg-canvas py-20 lg:py-28">
      <div className="container-app">
        <div className="flex items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-700">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              {t("mk_services_eyebrow")}
            </div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tightest leading-[0.95] text-navy-900 text-balance">
              {t("mk_services_title")}
            </h2>
            <p className="mt-5 max-w-xl text-base lg:text-lg text-ink/65 leading-relaxed">
              {t("mk_services_subtitle")}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s, i) => {
            const isGold = s.accent === "gold";
            return (
              <article
                key={i}
                className={
                  "group relative overflow-hidden rounded-3xl border p-7 lg:p-9 transition-all hover:shadow-elevated " +
                  (isGold
                    ? "bg-gold-50 border-gold-200 hover:border-gold-400"
                    : "bg-white border-line hover:border-navy-700/35")
                }
              >
                {/* Decorative number */}
                <span
                  className={
                    "absolute right-6 top-6 font-display text-[88px] lg:text-[120px] font-black leading-none tracking-tightest tabular " +
                    (isGold ? "text-gold-300" : "text-navy-50")
                  }
                  aria-hidden
                >
                  {s.number}
                </span>

                <div className="relative">
                  <div
                    className={
                      "flex h-14 w-14 items-center justify-center rounded-2xl " +
                      (isGold
                        ? "bg-navy-700 text-gold-400"
                        : "bg-navy-700 text-gold-400")
                    }
                  >
                    <s.icon size={26} />
                  </div>
                  <h3 className="mt-6 font-display text-xl lg:text-2xl font-black tracking-tightest text-navy-900 max-w-sm">
                    {t(s.titleKey)}
                  </h3>
                  <p className="mt-3 text-sm lg:text-base text-ink/70 leading-relaxed max-w-md">
                    {t(s.bodyKey)}
                  </p>
                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 group-hover:gap-2 transition-all"
                  >
                    {t("mk_svc_more")}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
