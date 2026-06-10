"use client";

import { Handshake, Siren, ShieldCheck, GraduationCap } from "lucide-react";
import { useT } from "@/lib/i18n";

/**
 * Services grid — the four services listed on werkkompasbv.nl, verbatim.
 * No invented eyebrow / title / subtitle / "Lees meer →" affordance.
 */
export function ServicesSection() {
  const { t } = useT();

  const services = [
    { icon: Handshake, num: "01", titleKey: "mk_svc_1_title", bodyKey: "mk_svc_1_body" },
    { icon: Siren, num: "02", titleKey: "mk_svc_2_title", bodyKey: "mk_svc_2_body" },
    { icon: ShieldCheck, num: "03", titleKey: "mk_svc_3_title", bodyKey: "mk_svc_3_body" },
    { icon: GraduationCap, num: "04", titleKey: "mk_svc_4_title", bodyKey: "mk_svc_4_body" },
  ];

  return (
    <section id="diensten" className="relative bg-canvas py-20 lg:py-28">
      <div className="container-app">
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7 lg:p-9 transition-all hover:shadow-elevated hover:border-navy-700/35"
            >
              <span
                className="absolute right-6 top-6 font-display text-[88px] lg:text-[120px] font-black leading-none tracking-tightest tabular text-navy-50"
                aria-hidden
              >
                {s.num}
              </span>

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-700 text-gold-400">
                  <s.icon size={26} />
                </div>
                <h3 className="mt-6 font-display text-xl lg:text-2xl font-black tracking-tightest text-navy-900 max-w-sm">
                  {t(s.titleKey)}
                </h3>
                <p className="mt-3 text-sm lg:text-base text-ink/70 leading-relaxed max-w-md">
                  {t(s.bodyKey)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
