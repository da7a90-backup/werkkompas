"use client";

import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Editorial variant — Build in Amsterdam / Suit Supply / Filling Pieces lineage.
 * Ivory canvas (bg-ivory), Fraunces variable serif (font-serif) for major display,
 * navy reserved for type, gold reduced to hairline accents only. Square corners,
 * generous margins, asymmetric editorial grid. No marquee, no dot pattern.
 */
export function HomeEditorial() {
  const { t } = useT();
  return (
    <div className="bg-ivory text-navy-900">
      <HeroEditorial />
      <FigureBar n="figure 01" label="Werkkompas in cijfers" />
      <StatsEditorial />
      <FigureBar n="figure 02" label="Over ons" />
      <AboutEditorial />
      <FigureBar n="figure 03" label="Diensten" />
      <ServicesEditorial />
      <FigureBar n="figure 04" label="Contact" />
      <ContactEditorial />
    </div>
  );
}

function FigureBar({ n, label }: { n: string; label: string }) {
  const { t } = useT();
  return (
    <div className="border-t border-stone-300/60">
      <div className="container-app py-4 lg:py-5 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-stone-600">
        <span className="italic font-serif normal-case text-[13px] text-navy-900/80">
          / {n}
        </span>
        <span className="font-semibold">{label}</span>
      </div>
    </div>
  );
}

function HeroEditorial() {
  const { t } = useT();
  return (
    <section
      id="welkom"
      className="relative bg-ivory text-navy-900 lg:h-screen lg:min-h-[680px] flex flex-col"
    >
      <div className="container-app relative flex-1 flex flex-col pt-28 lg:pt-32 pb-12">
        <div className="flex-1 grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          {/* Left rail with eyebrow */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-stone-600">
              — Werkkompas B.V.
            </span>
            <span className="font-serif italic text-2xl text-navy-900/70 leading-snug">
              {t("brandLine")}
            </span>
          </div>

          {/* Main copy */}
          <div className="lg:col-span-9">
            <h1 className="font-serif font-semibold tracking-[-0.02em] leading-[0.95] text-balance text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] text-navy-900">
              {t("mk_hero_welcome")}
            </h1>
            <p className="mt-8 max-w-2xl font-serif italic text-xl lg:text-2xl text-stone-700 leading-snug">
              {t("mk_hero_tagline")}
            </p>
            <div className="mt-10 grid lg:grid-cols-[1fr_auto] gap-8 items-end">
              <p className="max-w-xl text-base lg:text-lg text-navy-900/80 leading-relaxed">
                {t("mk_hero_body")}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 border-b-2 border-gold-400 pb-1 text-sm font-bold tracking-tight text-navy-900 hover:text-navy-700"
                >
                  {t("mk_hero_cta_primary")}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href="#diensten"
                  className="text-sm font-semibold text-navy-900/55 underline-offset-4 hover:underline"
                >
                  {t("mk_hero_cta_secondary")}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-12 flex items-end justify-between border-t border-stone-300/60 pt-5 text-[10px] uppercase tracking-[0.32em] text-stone-600">
          <a href="#cijfers" className="inline-flex items-center gap-2 font-semibold hover:text-navy-900">
            <span>{t("mk_scroll")}</span>
            <ChevronDown size={12} className="animate-bounce" />
          </a>
          <a
            href={`tel:${t("mk_contact_phone_value").replace(/\s/g, "")}`}
            className="hidden sm:inline-flex items-center gap-1.5 font-semibold tabular hover:text-navy-900"
          >
            <Phone size={11} />
            {t("mk_contact_phone_value")}
          </a>
        </div>
      </div>
    </section>
  );
}

function StatsEditorial() {
  const { t } = useT();
  const stats = [
    { value: t("mk_stat_years_value"), label: t("mk_stat_years") },
    { value: t("mk_stat_clients_value"), label: t("mk_stat_clients") },
    { value: t("mk_stat_employees_value"), label: t("mk_stat_employees") },
  ];
  return (
    <section id="cijfers" className="bg-ivory py-20 lg:py-28">
      <div className="container-app">
        <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-300/60">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-2 px-2 sm:px-10 py-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-stone-600">
                / 0{i + 1}
              </span>
              <span className="font-serif text-[5rem] lg:text-[7rem] font-semibold tracking-[-0.04em] leading-none text-navy-900 tabular">
                {s.value}
              </span>
              <span className="font-serif italic text-lg text-stone-700 mt-2">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutEditorial() {
  const { t } = useT();
  return (
    <section id="over-ons" className="bg-ivory py-20 lg:py-28">
      <div className="container-app">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-stone-600">
              {t("mk_about_eyebrow")}
            </span>
            <h2 className="mt-6 font-serif font-semibold tracking-[-0.02em] text-5xl lg:text-6xl xl:text-7xl leading-[0.95] text-navy-900 text-balance">
              {t("mk_about_title")}
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pl-6 lg:border-l lg:border-stone-300/60">
            <div className="space-y-6 text-base lg:text-lg leading-relaxed text-navy-900/85 max-w-xl">
              <p className="first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:text-gold-600">
                {t("mk_about_body_2")}
              </p>
              <p>{t("mk_about_body_3")}</p>
            </div>
            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 border-b-2 border-gold-400 pb-1 text-sm font-bold tracking-tight text-navy-900 hover:text-navy-700"
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

function ServicesEditorial() {
  const { t } = useT();
  const services = [
    { num: "01", titleKey: "mk_svc_1_title", bodyKey: "mk_svc_1_body" },
    { num: "02", titleKey: "mk_svc_2_title", bodyKey: "mk_svc_2_body" },
    { num: "03", titleKey: "mk_svc_3_title", bodyKey: "mk_svc_3_body" },
    { num: "04", titleKey: "mk_svc_4_title", bodyKey: "mk_svc_4_body" },
  ];
  return (
    <section id="diensten" className="bg-ivory py-20 lg:py-28">
      <div className="container-app">
        <ul className="divide-y divide-stone-300/60 border-y border-stone-300/60">
          {services.map((s) => (
            <li key={s.num} className="group">
              <div className="grid grid-cols-12 gap-6 py-10 lg:py-14 transition-colors hover:bg-stone-100/50 px-2 lg:px-6">
                <span className="col-span-12 lg:col-span-1 text-[10px] font-bold uppercase tracking-[0.32em] text-stone-600">
                  / {s.num}
                </span>
                <h3 className="col-span-12 lg:col-span-6 font-serif text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-[-0.02em] leading-[1.02] text-navy-900">
                  {t(s.titleKey)}
                </h3>
                <p className="col-span-12 lg:col-span-5 text-base lg:text-lg text-navy-900/75 leading-relaxed">
                  {t(s.bodyKey)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContactEditorial() {
  const { t } = useT();
  const [form, setForm] = useState({ name: "", email: "", message: "", consent: false });
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setSent(true);
  };

  return (
    <section id="contact" className="bg-ivory py-20 lg:py-28">
      <div className="container-app">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-stone-600">
              {t("mk_contact_eyebrow")}
            </span>
            <h2 className="mt-6 font-serif font-semibold tracking-[-0.02em] text-5xl lg:text-6xl leading-[0.95] text-navy-900 text-balance">
              {t("mk_hero_cta_primary")}
            </h2>
            <ul className="mt-10 space-y-5 text-base text-navy-900/80">
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-stone-600">
                  {t("mk_contact_email_label")}
                </span>
                <a className="font-serif text-xl underline-offset-4 hover:underline" href={`mailto:${t("mk_contact_email_value")}`}>
                  {t("mk_contact_email_value")}
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-stone-600">
                  {t("mk_contact_phone_label")}
                </span>
                <a className="font-serif text-xl tabular underline-offset-4 hover:underline" href={`tel:${t("mk_contact_phone_value").replace(/\s/g, "")}`}>
                  {t("mk_contact_phone_value")}
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            {sent ? (
              <div className="border border-stone-300/60 bg-white p-10 text-center">
                <p className="font-serif text-2xl text-navy-900">{t("mk_contact_success")}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
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
                  rows={6}
                  required
                />
                <Input
                  label={t("mk_contact_email_field") + " *"}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <label className="flex items-start gap-3 text-xs leading-relaxed text-navy-900/65 cursor-pointer">
                  <span
                    className={cn(
                      "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center border transition",
                      form.consent ? "border-navy-900 bg-navy-900" : "border-stone-400 bg-transparent"
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
                <div className="flex items-center justify-between border-t border-stone-300/60 pt-5">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-stone-600">
                    {t("mk_contact_required")}
                  </span>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!form.consent}
                    className="!rounded-none !bg-navy-900 !text-ivory hover:!bg-navy-800"
                  >
                    {t("mk_contact_send")}
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
