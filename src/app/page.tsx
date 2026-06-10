"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  MessageCircle,
  ShieldCheck,
  Users,
  Smartphone,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { useStore } from "@/lib/store";
import { LanguageMenu } from "@/components/shared/LanguageMenu";
import { useT } from "@/lib/i18n";

export default function LandingPage() {
  const { employees } = useStore();
  const { t } = useT();

  return (
    <main className="min-h-screen bg-navy-700 text-white relative overflow-hidden">
      {/* Background flair */}
      <div className="pointer-events-none absolute inset-0 dot-bg opacity-40" />
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(239,191,4,0.22), rgba(239,191,4,0))",
        }}
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(46,72,98,0.45), rgba(46,72,98,0))",
        }}
      />

      <div className="relative">
        <header className="container-app flex items-center justify-between py-6">
          <Logo height={44} variant="light" />
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white/80 ring-1 ring-inset ring-white/15">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 live-dot" />
              {t("liveDemo")}
            </div>
            <LanguageMenu variant="dark" />
          </div>
        </header>

        <section className="container-app grid items-center gap-10 py-10 lg:grid-cols-2 lg:py-16">
          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold-400 ring-1 ring-inset ring-gold-400/30">
              <ShieldCheck size={12} />
              {t("brandLine")}
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tightest text-balance">
              {t("heroLine1")}
              <br />
              <span className="text-gold-400">{t("heroLine2")}</span>
            </h1>
            <p className="mt-5 max-w-md text-base md:text-lg leading-relaxed text-white/75">
              {t("heroDesc")}
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2 max-w-xl">
              {[
                { icon: Calendar, key: "feature_availability" },
                { icon: Briefcase, key: "feature_accept" },
                { icon: MessageCircle, key: "feature_chat" },
                { icon: ShieldCheck, key: "feature_cao" },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5 ring-1 ring-inset ring-white/10"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-400/15 text-gold-400">
                    <item.icon size={16} />
                  </div>
                  <span className="text-sm font-semibold text-white/90">
                    {t(item.key)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3 text-xs text-white/55">
              <Smartphone size={14} />
              {t("installable")}
            </div>
          </div>

          <div className="relative grid gap-4">
            <div className="mb-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/55">
              <span className="h-px flex-1 bg-white/15" />
              {t("pickRole")}
              <span className="h-px flex-1 bg-white/15" />
            </div>

            <Link
              href="/login/employee"
              className="group relative overflow-hidden rounded-3xl bg-white p-6 text-left text-navy-900 shadow-elevated transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-700">
                    <ShieldCheck size={11} />
                    {t("emp_badge")}
                  </div>
                  <h3 className="font-display text-2xl font-black tracking-tightest">
                    {t("emp_title")}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink/65 max-w-xs">
                    {t("emp_desc")}
                  </p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-700 text-white transition-transform group-hover:translate-x-1">
                  <ArrowRight size={20} />
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {employees.slice(0, 4).map((e) => (
                    <Avatar
                      key={e.id}
                      initials={e.initials}
                      color={e.avatarColor}
                      size="sm"
                      ring
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-ink/60">
                  {t("emp_pickHint", { n: employees.length })}
                </span>
              </div>
            </Link>

            <Link
              href="/login/admin"
              className="group relative overflow-hidden rounded-3xl bg-gold-400 p-6 text-left text-navy-900 shadow-elevated transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-navy-900/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-900">
                    <Users size={11} />
                    {t("admin_badge")}
                  </div>
                  <h3 className="font-display text-2xl font-black tracking-tightest">
                    {t("admin_title")}
                  </h3>
                  <p className="mt-1.5 text-sm text-navy-900/75 max-w-xs">
                    {t("admin_desc")}
                  </p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-gold-400 transition-transform group-hover:translate-x-1">
                  <ArrowRight size={20} />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-navy-900/10 px-2 py-1.5">
                  <div className="text-base font-black text-navy-900 tabular">
                    {employees.length}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-navy-900/70">
                    {t("stat_employees")}
                  </div>
                </div>
                <div className="rounded-xl bg-navy-900/10 px-2 py-1.5">
                  <div className="text-base font-black text-navy-900 tabular">10</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-navy-900/70">
                    {t("stat_shifts")}
                  </div>
                </div>
                <div className="rounded-xl bg-navy-900/10 px-2 py-1.5">
                  <div className="text-base font-black text-navy-900 tabular">7</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-navy-900/70">
                    {t("stat_open")}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <footer className="container-app flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-5 text-[11px] text-white/45">
          <div className="flex items-center gap-2">
            <Logo height={24} variant="light" />
            <span className="opacity-60">— {t("partner")}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{t("footer_demo")}</span>
            <Link href="https://www.werkkompasbv.nl" target="_blank" className="hover:text-white">
              werkkompasbv.nl
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
