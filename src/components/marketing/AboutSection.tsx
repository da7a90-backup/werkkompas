"use client";

import { ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";

/**
 * About section — mirrors werkkompasbv.nl "Over Werkkompas B.V." verbatim:
 *   eyebrow + title + the two body paragraphs. The CTA matches the real site's
 *   "Neem contact met ons op" link. No invented pillars, no decorative card.
 */
export function AboutSection() {
  const { t } = useT();
  return (
    <section id="over-ons" className="relative bg-white py-20 lg:py-28">
      <div className="container-app">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-700">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              {t("mk_about_eyebrow")}
            </span>
            <div className="mt-6 hidden lg:flex flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-ink/35">
              <span>/ 01</span>
              <span className="h-12 w-px bg-navy-700/15" />
            </div>
          </div>

          <div className="lg:col-span-9">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tightest leading-[0.95] text-navy-900 text-balance">
              {t("mk_about_title")}
            </h2>
            <div className="mt-8 space-y-5 text-base lg:text-lg text-ink/75 leading-relaxed max-w-2xl">
              <p>{t("mk_about_body_2")}</p>
              <p>{t("mk_about_body_3")}</p>
            </div>
            <a
              href="#contact"
              className="mt-9 inline-flex items-center gap-2 rounded-2xl bg-navy-700 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-navy-800 active:scale-95"
            >
              {t("mk_about_cta")}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
