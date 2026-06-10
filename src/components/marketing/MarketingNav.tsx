"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { LanguageMenu } from "@/components/shared/LanguageMenu";
import { LayoutMenu } from "@/components/shared/LayoutMenu";
import { useT } from "@/lib/i18n";
import { useLayout } from "@/lib/layout-variant";
import { cn } from "@/lib/utils";

export function MarketingNav() {
  const { t } = useT();
  const { variant } = useLayout();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Editorial hero is ivory (light) — needs dark chrome at top of page.
  // Modern & Maximalist heroes are dark navy — keep white chrome at top.
  const lightHero = variant === "editorial";
  const onDark = !scrolled && !lightHero;

  const headerBg = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-card border-b border-line"
    : lightHero
      ? "bg-ivory/90 backdrop-blur-sm border-b border-navy-900/10"
      : "bg-transparent";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        headerBg
      )}
    >
      <div className="container-app flex h-16 items-center justify-between gap-3">
        <a href="#welkom" className="flex items-center">
          <Logo height={scrolled ? 36 : 40} variant={onDark ? "light" : "dark"} />
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "#over-ons", label: t("mk_nav_about") },
            { href: "#diensten", label: t("mk_nav_services") },
            { href: "#contact", label: t("mk_nav_contact") },
          ].map((it) => (
            <a
              key={it.href}
              href={it.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                onDark
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-ink/75 hover:text-navy-700 hover:bg-canvas"
              )}
            >
              {it.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageMenu variant={onDark ? "dark" : "light"} />
          <LayoutMenu variant={onDark ? "dark" : "light"} />
          <Link
            href="/login"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold transition",
              onDark
                ? "bg-gold-400 text-navy-900 hover:bg-gold-300"
                : "bg-navy-700 text-white hover:bg-navy-800"
            )}
          >
            {t("mk_signin_short")}
          </Link>
        </div>
      </div>
    </header>
  );
}
