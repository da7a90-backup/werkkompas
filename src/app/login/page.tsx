"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Users } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { LanguageMenu } from "@/components/shared/LanguageMenu";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

export default function LoginHubPage() {
  const { employees } = useStore();
  const { t } = useT();

  return (
    <main className="min-h-screen bg-navy-700 text-white relative overflow-hidden">
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

      <div className="relative flex min-h-screen flex-col">
        <header className="container-app flex items-center justify-between py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/75 hover:text-white"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">{t("login_back")}</span>
          </Link>
          <Logo height={40} variant="light" />
          <LanguageMenu variant="dark" />
        </header>

        <section className="container-app flex flex-1 flex-col justify-center py-10">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold-400 ring-1 ring-inset ring-gold-400/30">
              <ShieldCheck size={12} />
              {t("login_hub_title")}
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tightest text-balance">
              {t("pickRole")}
            </h1>
            <p className="mt-5 max-w-md text-base md:text-lg leading-relaxed text-white/75">
              {t("login_hub_subtitle")}
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:max-w-4xl">
            <Link
              href="/login/employee"
              className="group relative overflow-hidden rounded-3xl bg-white p-7 text-left text-navy-900 shadow-elevated transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-700">
                    <ShieldCheck size={11} />
                    {t("emp_badge")}
                  </div>
                  <h3 className="font-display text-3xl font-black tracking-tightest">
                    {t("emp_title")}
                  </h3>
                  <p className="mt-2 text-sm text-ink/65 max-w-xs">
                    {t("emp_desc")}
                  </p>
                </div>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-700 text-white transition-transform group-hover:translate-x-1">
                  <ArrowRight size={22} />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-line">
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
              className="group relative overflow-hidden rounded-3xl bg-gold-400 p-7 text-left text-navy-900 shadow-elevated transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-navy-900/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-900">
                    <Users size={11} />
                    {t("admin_badge")}
                  </div>
                  <h3 className="font-display text-3xl font-black tracking-tightest">
                    {t("admin_title")}
                  </h3>
                  <p className="mt-2 text-sm text-navy-900/75 max-w-xs">
                    {t("admin_desc")}
                  </p>
                </div>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-gold-400 transition-transform group-hover:translate-x-1">
                  <ArrowRight size={22} />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 pt-5 border-t border-navy-900/15 text-center">
                <div className="rounded-xl bg-navy-900/10 px-2 py-1.5">
                  <div className="text-base font-black text-navy-900 tabular">
                    {employees.length}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-navy-900/70">
                    {t("stat_employees")}
                  </div>
                </div>
                <div className="rounded-xl bg-navy-900/10 px-2 py-1.5">
                  <div className="text-base font-black text-navy-900 tabular">
                    10
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-navy-900/70">
                    {t("stat_shifts")}
                  </div>
                </div>
                <div className="rounded-xl bg-navy-900/10 px-2 py-1.5">
                  <div className="text-base font-black text-navy-900 tabular">
                    7
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-navy-900/70">
                    {t("stat_open")}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <footer className="container-app flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-5 text-[11px] text-white/45">
          <span>Werkkompas B.V. — {t("partner")}</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 live-dot" />
            {t("liveDemo")}
          </span>
        </footer>
      </div>
    </main>
  );
}
