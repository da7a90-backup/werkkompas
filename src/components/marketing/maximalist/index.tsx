"use client";

import { useState } from "react";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Maximalist variant — Random Studio kinetic + Studio Dumbar poster-art.
 * Full-bleed colour blocks (navy / gold / canvas), bleed-edge display type set
 * in Archivo Black (`font-poster`), rotated "newspaper cutting" cards, three-lane
 * sector tape, bracketed display labels.
 */
export function HomeMaximalist() {
  return (
    <>
      <HeroMaximalist />
      <SectorTape />
      <StatsMaximalist />
      <AboutMaximalist />
      <ServicesMaximalist />
      <ContactMaximalist />
    </>
  );
}

function HeroMaximalist() {
  const { t } = useT();
  return (
    <section
      id="welkom"
      className="relative isolate overflow-hidden bg-navy-900 text-white lg:min-h-screen flex flex-col"
    >
      {/* Geometric accent shapes (Studio Dumbar lineage) — opacity-tuned so text stays legible on overlap */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] bg-gold-400/25 rotate-12" />
      <div className="pointer-events-none absolute -left-40 -bottom-20 h-[320px] w-[320px] bg-navy-700/40 -rotate-12" />
      <div className="pointer-events-none absolute right-10 bottom-40 h-32 w-32 bg-gold-400/30 rotate-45" />

      <div className="container-app relative flex-1 flex flex-col pt-28 lg:pt-32 pb-12">
        <span className="inline-flex w-fit items-center gap-2 bg-gold-400 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-navy-900 ring-2 ring-navy-900">
          [ {t("brandLine")} ]
        </span>

        <h1
          className="font-poster mt-6 lg:mt-8 leading-[0.9] tracking-[-0.02em] sm:-mx-4 lg:-mx-8 break-words"
          style={{ fontSize: "clamp(2.5rem, 11vw, 11rem)" }}
        >
          <span className="block">{t("mk_hero_welcome")}</span>
        </h1>

        <div className="mt-8 lg:mt-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-6 inline-block bg-gold-400 px-3 sm:px-4 py-2.5 sm:py-3 sm:-rotate-1 ring-2 sm:ring-4 ring-navy-900 shadow-[5px_5px_0_0_rgba(0,0,0,1)] sm:shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <p className="font-poster text-xl sm:text-2xl lg:text-3xl leading-tight text-navy-900 uppercase tracking-tight">
              {t("mk_hero_tagline")}
            </p>
          </div>
          <p className="lg:col-span-6 text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed font-semibold">
            {t("mk_hero_body")}
          </p>
        </div>

        <div className="mt-8 lg:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 bg-gold-400 px-5 sm:px-7 py-3 sm:py-4 text-xs sm:text-sm font-extrabold tracking-tight text-navy-900 uppercase ring-2 ring-navy-900 transition hover:-rotate-2 active:scale-95"
          >
            [ {t("mk_hero_cta_primary")} ]
            <ArrowRight size={16} />
          </a>
          <a
            href="#diensten"
            className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-4 text-xs sm:text-sm font-extrabold tracking-tight text-white uppercase ring-2 ring-white transition hover:bg-white/10"
          >
            [ {t("mk_hero_cta_secondary")} ]
          </a>
        </div>
      </div>
    </section>
  );
}

function SectorTape() {
  const lanes = [
    ["BEVEILIGING", "ZORG", "TRANSPORT", "LOGISTIEK", "ALLE BRANCHES"],
    ["ZORG", "TRANSPORT", "LOGISTIEK", "ALLE BRANCHES", "BEVEILIGING"],
    ["TRANSPORT", "LOGISTIEK", "ALLE BRANCHES", "BEVEILIGING", "ZORG"],
  ];
  const colors = ["bg-gold-400 text-navy-900", "bg-navy-900 text-gold-400", "bg-canvas text-navy-900"];
  return (
    <section aria-hidden className="relative overflow-hidden border-y-4 border-navy-900">
      {lanes.map((lane, i) => (
        <div
          key={i}
          className={cn(
            "py-3 lg:py-4 overflow-hidden border-b-2 border-navy-900 last:border-b-0",
            colors[i % colors.length]
          )}
        >
          <div
            className="flex w-max items-center gap-8 lg:gap-12 max-marquee will-change-transform"
            style={
              {
                animation: `max-marquee ${36 + i * 8}s linear infinite${i % 2 === 1 ? " reverse" : ""}`,
              } as React.CSSProperties
            }
          >
            {[...lane, ...lane, ...lane].map((s, j) => (
              <span
                key={j}
                className="font-poster text-3xl lg:text-5xl tracking-tight uppercase shrink-0"
              >
                {s} <span className="opacity-50">·</span>
              </span>
            ))}
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes max-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .max-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function StatsMaximalist() {
  const { t } = useT();
  const stats = [
    {
      value: t("mk_stat_years_value"),
      label: t("mk_stat_years"),
      bg: "bg-gold-400 text-navy-900",
      rotate: "sm:-rotate-1",
    },
    {
      value: t("mk_stat_clients_value"),
      label: t("mk_stat_clients"),
      bg: "bg-navy-900 text-gold-400",
      rotate: "sm:rotate-1",
    },
    {
      value: t("mk_stat_employees_value"),
      label: t("mk_stat_employees"),
      bg: "bg-canvas text-navy-900",
      rotate: "sm:-rotate-1",
    },
  ];
  return (
    <section id="cijfers" className="bg-canvas py-16 lg:py-28 overflow-hidden">
      <div className="container-app">
        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 px-1 sm:px-0">
          {stats.map((s, i) => (
            <div
              key={i}
              className={cn(
                "relative p-6 sm:p-8 lg:p-10 ring-2 sm:ring-4 ring-navy-900 shadow-[5px_5px_0_0_rgba(0,0,0,1)] sm:shadow-[10px_10px_0_0_rgba(0,0,0,1)] transition hover:rotate-0",
                s.bg,
                s.rotate
              )}
            >
              <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] opacity-65">
                [ {String(i + 1).padStart(2, "0")} / 03 ]
              </div>
              <div className="font-poster mt-3 sm:mt-4 text-6xl sm:text-7xl lg:text-9xl leading-none tracking-tight tabular">
                {s.value}
              </div>
              <div className="mt-2 sm:mt-3 font-poster text-sm sm:text-base lg:text-lg uppercase tracking-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutMaximalist() {
  const { t } = useT();
  return (
    <section id="over-ons" className="relative bg-navy-900 text-white py-16 lg:py-28 overflow-hidden">
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[360px] w-[360px] bg-gold-400/20 rotate-12" />
      <div className="container-app relative">
        <span className="inline-flex items-center gap-2 bg-gold-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-navy-900 ring-2 ring-white">
          [ {t("mk_about_eyebrow")} ]
        </span>
        <h2
          className="font-poster mt-6 lg:mt-8 leading-[0.9] tracking-tight uppercase text-balance"
          style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)" }}
        >
          {t("mk_about_title")}
        </h2>
        <div className="mt-8 lg:mt-12 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-base sm:text-lg lg:text-xl leading-relaxed font-semibold text-white/85">
            <p>{t("mk_about_body_2")}</p>
            <p>{t("mk_about_body_3")}</p>
          </div>
          <div className="lg:col-span-5 lg:pl-8 lg:border-l-2 lg:border-gold-400 flex flex-col justify-end">
            <a
              href="#contact"
              className="inline-flex w-fit items-center gap-2 bg-gold-400 px-5 sm:px-7 py-3 sm:py-4 text-xs sm:text-sm font-extrabold tracking-tight text-navy-900 uppercase ring-2 ring-white shadow-[5px_5px_0_0_rgba(255,255,255,1)] sm:shadow-[8px_8px_0_0_rgba(255,255,255,1)] transition hover:-rotate-2 active:scale-95"
            >
              [ {t("mk_about_cta")} ]
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesMaximalist() {
  const { t } = useT();
  const services = [
    { num: "01", titleKey: "mk_svc_1_title", bodyKey: "mk_svc_1_body", rotate: "sm:-rotate-2", bg: "bg-gold-400 text-navy-900" },
    { num: "02", titleKey: "mk_svc_2_title", bodyKey: "mk_svc_2_body", rotate: "sm:rotate-1", bg: "bg-canvas text-navy-900" },
    { num: "03", titleKey: "mk_svc_3_title", bodyKey: "mk_svc_3_body", rotate: "sm:rotate-2", bg: "bg-navy-900 text-gold-400" },
    { num: "04", titleKey: "mk_svc_4_title", bodyKey: "mk_svc_4_body", rotate: "sm:-rotate-1", bg: "bg-gold-400 text-navy-900" },
  ];
  return (
    <section id="diensten" className="relative bg-canvas py-16 lg:py-28 overflow-hidden">
      <div className="container-app">
        <span className="inline-flex items-center gap-2 bg-navy-900 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-400 ring-2 ring-navy-900">
          [ {t("mk_nav_services")} ]
        </span>
        <h2
          className="font-poster mt-6 lg:mt-8 leading-[0.9] tracking-tight uppercase text-navy-900"
          style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)" }}
        >
          {t("mk_nav_services")}
        </h2>

        <div className="mt-10 lg:mt-14 grid gap-7 sm:gap-10 lg:gap-14 sm:grid-cols-2 lg:gap-x-16 px-1 sm:px-0">
          {services.map((s) => (
            <article
              key={s.num}
              className={cn(
                "relative p-6 sm:p-8 lg:p-10 ring-2 sm:ring-4 ring-navy-900 shadow-[5px_5px_0_0_rgba(0,0,0,1)] sm:shadow-[10px_10px_0_0_rgba(0,0,0,1)] transition hover:rotate-0",
                s.bg,
                s.rotate
              )}
            >
              <div className="font-poster text-[3.5rem] sm:text-[5rem] lg:text-[6rem] leading-none tracking-tight opacity-80">
                {s.num}
              </div>
              <h3 className="mt-4 sm:mt-6 font-poster text-xl sm:text-2xl lg:text-3xl leading-tight tracking-tight uppercase">
                {t(s.titleKey)}
              </h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed font-semibold">
                {t(s.bodyKey)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactMaximalist() {
  const { t } = useT();
  const [form, setForm] = useState({ name: "", email: "", message: "", consent: false });
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setSent(true);
  };
  return (
    <section id="contact" className="relative bg-gold-400 text-navy-900 py-16 lg:py-28 overflow-hidden">
      <div className="pointer-events-none absolute -right-40 -bottom-40 h-[420px] w-[420px] bg-navy-900/15 rotate-12" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-[200px] w-[200px] bg-canvas/60 -rotate-12" />
      <div className="container-app relative">
        <span className="inline-flex items-center gap-2 bg-navy-900 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-400 ring-2 ring-navy-900">
          [ {t("mk_contact_eyebrow")} ]
        </span>
        <h2
          className="font-poster mt-6 lg:mt-8 leading-[0.9] tracking-tight uppercase text-navy-900"
          style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)" }}
        >
          {t("mk_hero_cta_primary")}
        </h2>

        <div className="mt-10 lg:mt-14 grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 px-1 sm:px-0">
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
            <a
              href={`mailto:${t("mk_contact_email_value")}`}
              className="flex items-center gap-3 sm:gap-4 bg-navy-900 text-gold-400 p-4 sm:p-5 ring-2 sm:ring-4 ring-navy-900 shadow-[5px_5px_0_0_rgba(255,255,255,1)] sm:shadow-[8px_8px_0_0_rgba(255,255,255,1)] sm:-rotate-1 transition hover:rotate-0 min-w-0"
            >
              <Mail size={22} className="shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] opacity-70">
                  {t("mk_contact_email_label")}
                </div>
                <div className="font-poster text-base sm:text-xl uppercase tracking-tight break-all">
                  {t("mk_contact_email_value")}
                </div>
              </div>
            </a>
            <a
              href={`tel:${t("mk_contact_phone_value").replace(/\s/g, "")}`}
              className="flex items-center gap-3 sm:gap-4 bg-canvas text-navy-900 p-4 sm:p-5 ring-2 sm:ring-4 ring-navy-900 shadow-[5px_5px_0_0_rgba(0,0,0,1)] sm:shadow-[8px_8px_0_0_rgba(0,0,0,1)] sm:rotate-1 transition hover:rotate-0 min-w-0"
            >
              <Phone size={22} className="shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] opacity-65">
                  {t("mk_contact_phone_label")}
                </div>
                <div className="font-poster text-base sm:text-xl tabular uppercase tracking-tight">
                  {t("mk_contact_phone_value")}
                </div>
              </div>
            </a>
          </div>
          <div className="lg:col-span-7 bg-canvas p-4 sm:p-6 lg:p-8 ring-2 sm:ring-4 ring-navy-900 shadow-[5px_5px_0_0_rgba(0,0,0,1)] sm:shadow-[10px_10px_0_0_rgba(0,0,0,1)]">
            {sent ? (
              <div className="flex h-full min-h-[300px] items-center justify-center text-center">
                <p className="font-poster text-3xl text-navy-900 uppercase tracking-tight">
                  {t("mk_contact_success")}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <Input
                  label={t("mk_contact_name_field") + " *"}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <Textarea
                  label={t("mk_contact_message_field") + " *"}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  required
                />
                <Input
                  label={t("mk_contact_email_field") + " *"}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <label className="flex items-start gap-3 text-xs leading-relaxed text-navy-900/70 cursor-pointer">
                  <span
                    className={cn(
                      "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center border-2 transition",
                      form.consent ? "border-navy-900 bg-navy-900" : "border-navy-900 bg-transparent"
                    )}
                  >
                    {form.consent && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    required
                  />
                  <span>{t("mk_contact_consent")} *</span>
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t-2 border-navy-900">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-extrabold text-navy-900/70">
                    {t("mk_contact_required")}
                  </span>
                  <Button
                    type="submit"
                    size="md"
                    fullWidth
                    disabled={!form.consent}
                    className="!rounded-none !bg-navy-900 !text-gold-400 hover:!bg-navy-800 !uppercase !tracking-tight sm:!w-auto"
                  >
                    [ {t("mk_contact_send")} ]
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
