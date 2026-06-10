"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { LanguageMenu } from "@/components/shared/LanguageMenu";
import { useT } from "@/lib/i18n";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const { t } = useT();
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[1.1fr_1fr] xl:grid-cols-[1.2fr_1fr] bg-canvas">
      {/* Brand panel */}
      <aside className="relative isolate overflow-hidden bg-navy-700 text-white">
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
              "radial-gradient(closest-side, rgba(46,72,98,0.55), rgba(46,72,98,0))",
          }}
        />

        <div className="relative flex h-full min-h-[40vh] lg:min-h-screen flex-col p-6 lg:p-10 xl:p-14">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-white/75 hover:text-white">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{t("login_back")}</span>
            </Link>
            <Logo height={36} variant="light" />
          </div>

          <div className="flex-1 hidden lg:flex flex-col justify-center py-12">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-400 ring-1 ring-inset ring-gold-400/30 mb-6">
              <ShieldCheck size={12} />
              {t("login_brand_eyebrow")}
            </div>
            <h2 className="font-display text-5xl xl:text-6xl font-black leading-[0.95] tracking-tightest">
              {t("heroLine1")}
              <br />
              <span className="text-gold-400">{t("heroLine2")}</span>
            </h2>
            <p className="mt-6 max-w-md text-base xl:text-lg leading-relaxed text-white/75">
              {t("heroDesc")}
            </p>
          </div>

          <div className="hidden lg:flex items-center justify-between pt-8 border-t border-white/10 text-[11px] text-white/45">
            <span>Werkkompas B.V. — {t("partner")}</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 live-dot" />
              {t("liveDemo")}
            </span>
          </div>
        </div>
      </aside>

      {/* Form panel */}
      <main className="relative flex min-h-[60vh] lg:min-h-screen flex-col bg-canvas">
        <div className="flex items-center justify-end p-4 lg:p-6">
          <LanguageMenu variant="light" />
        </div>
        <div className="flex-1 flex items-start lg:items-center justify-center px-5 pb-10 lg:px-12 lg:pb-12">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    </div>
  );
}
