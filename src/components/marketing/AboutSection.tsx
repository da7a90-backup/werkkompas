"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Zap, Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n";

export function AboutSection() {
  const { t } = useT();
  const pillars = [
    { icon: Award, label: t("mk_about_pillar_1") },
    { icon: Zap, label: t("mk_about_pillar_2") },
    { icon: ShieldCheck, label: t("mk_about_pillar_3") },
    { icon: Sparkles, label: t("mk_about_pillar_4") },
  ];

  return (
    <section id="over-ons" className="relative bg-white py-20 lg:py-28">
      <div className="container-app">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-700">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              {t("mk_about_eyebrow")}
            </div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tightest leading-[0.95] text-navy-900 text-balance">
              {t("mk_about_title")}
            </h2>
            <div className="mt-7 space-y-5 text-base lg:text-lg text-ink/75 leading-relaxed max-w-xl">
              <p>{t("mk_about_lead")}</p>
              <p>{t("mk_about_body_2")}</p>
              <p>{t("mk_about_body_3")}</p>
            </div>
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-navy-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-800 active:scale-95"
            >
              {t("mk_about_cta")}
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Visual / pillar grid */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold-100/40 via-transparent to-navy-50/60 blur-2xl" />
            <div className="relative grid grid-cols-2 gap-3">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl border border-line bg-canvas p-6 transition-all hover:border-navy-700/30 hover:shadow-card"
                >
                  <span className="absolute right-4 top-4 text-[10px] font-bold tabular tracking-widest text-ink/35">
                    0{i + 1}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-700 text-gold-400">
                    <p.icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-black tracking-tightest text-navy-900">
                    {p.label}
                  </h3>
                </div>
              ))}
            </div>

            {/* Decorative card */}
            <div className="relative mt-3 overflow-hidden rounded-2xl bg-navy-700 p-6 text-white">
              <div className="absolute inset-0 dot-bg opacity-30" />
              <div className="relative flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400 text-navy-900">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                    Werkkompas B.V.
                  </div>
                  <div className="mt-0.5 font-display text-lg font-black tracking-tightest">
                    Het kompas in jouw carrière.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
