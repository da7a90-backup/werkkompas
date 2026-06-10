"use client";

import { ArrowRight, ChevronDown, Phone, ShieldCheck } from "lucide-react";
import { useT } from "@/lib/i18n";

import { MarketingNav } from "@/components/marketing/MarketingNav";
import { SectorMarquee } from "@/components/marketing/SectorMarquee";
import { StatsStrip } from "@/components/marketing/StatsStrip";
import { AboutSection } from "@/components/marketing/AboutSection";
import { ServicesSection } from "@/components/marketing/ServicesSection";
import { ContactSection } from "@/components/marketing/ContactSection";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export default function LandingPage() {
  const { t } = useT();

  return (
    <main className="min-h-screen bg-canvas">
      <MarketingNav />

      {/* ============ HERO — werkkompasbv.nl copy, editorial Dutch treatment ============ */}
      <section
        id="welkom"
        className="relative isolate overflow-hidden bg-navy-700 text-white lg:h-screen lg:min-h-[640px] flex flex-col"
      >
        <div className="pointer-events-none absolute inset-0 dot-bg opacity-40" />
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(239,191,4,0.22), rgba(239,191,4,0))",
          }}
        />
        <div
          className="pointer-events-none absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(46,72,98,0.45), rgba(46,72,98,0))",
          }}
        />

        {/* Vertical brand rail — uses the actual page-title strapline from werkkompasbv.nl */}
        <div className="pointer-events-none absolute left-6 top-1/2 hidden lg:flex -translate-y-1/2 flex-col items-center gap-3">
          <span className="h-16 w-px bg-white/20" />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/45 whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Uw partner in werk en veiligheid
          </span>
          <span className="h-16 w-px bg-white/20" />
        </div>

        <div className="container-app relative flex-1 flex flex-col pt-24 lg:pt-24 pb-10 lg:pb-6">
          <div className="flex-1 flex flex-col justify-center">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-9 xl:col-span-8">
              <div className="mb-5 lg:mb-6 inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold-400 ring-1 ring-inset ring-gold-400/30">
                <ShieldCheck size={12} />
                {t("brandLine")}
              </div>

              {/* Big editorial display headline */}
              <h1 className="font-display font-black tracking-tightest leading-[0.92] text-balance text-[3.25rem] sm:text-7xl lg:text-[5.25rem] xl:text-[6rem]">
                {t("mk_hero_welcome")}
              </h1>

              {/* Gold-accent tagline */}
              <p className="mt-5 lg:mt-6 max-w-3xl font-display text-2xl sm:text-3xl lg:text-[1.875rem] xl:text-4xl font-black tracking-tightest text-gold-400 leading-[1.05]">
                {t("mk_hero_tagline")}
              </p>

              <p className="mt-5 lg:mt-6 max-w-2xl text-base lg:text-base xl:text-lg leading-relaxed text-white/75">
                {t("mk_hero_body")}
              </p>

              <div className="mt-7 lg:mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-gold-400 px-6 py-3.5 text-sm font-bold text-navy-900 transition hover:bg-gold-300 active:scale-95"
                >
                  {t("mk_hero_cta_primary")}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href="#diensten"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/15 ring-1 ring-inset ring-white/15"
                >
                  {t("mk_hero_cta_secondary")}
                </a>
              </div>
            </div>

            {/* Side stat callouts */}
            <div className="lg:col-span-3 xl:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-2 lg:pl-6 lg:border-l lg:border-white/15">
              {[
                { v: t("mk_stat_years_value"), l: t("mk_stat_years") },
                { v: t("mk_stat_clients_value"), l: t("mk_stat_clients") },
                { v: t("mk_stat_employees_value"), l: t("mk_stat_employees") },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-3 sm:block rounded-xl bg-white/5 ring-1 ring-inset ring-white/10 px-4 py-3 lg:py-4 overflow-hidden"
                >
                  <div className="font-display text-3xl sm:text-2xl lg:text-3xl font-black tracking-tightest tabular text-gold-400 shrink-0">
                    {s.v}
                  </div>
                  <div className="sm:mt-0.5 text-[11px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-white/55 leading-[1.15] min-w-0">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>

          {/* Bottom row: scroll cue + real contact number from werkkompasbv.nl */}
          <div className="mt-10 lg:mt-8 flex items-end justify-between border-t border-white/10 pt-5 lg:pt-4 text-[11px] uppercase tracking-widest text-white/55">
            <a
              href="#cijfers"
              className="inline-flex items-center gap-2 font-bold hover:text-white/85"
            >
              <span>{t("mk_scroll")}</span>
              <ChevronDown size={14} className="animate-bounce" />
            </a>
            <a
              href={`tel:${t("mk_contact_phone_value").replace(/\s/g, "")}`}
              className="hidden sm:inline-flex items-center gap-1.5 font-semibold tabular hover:text-white/85"
            >
              <Phone size={12} />
              {t("mk_contact_phone_value")}
            </a>
          </div>
        </div>
      </section>

      {/* ============ MARKETING SECTIONS ============ */}
      <SectorMarquee />
      <StatsStrip />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <MarketingFooter />
    </main>
  );
}
