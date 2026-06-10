"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { LanguageMenu } from "@/components/shared/LanguageMenu";
import { LayoutMenu } from "@/components/shared/LayoutMenu";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function MarketingNav() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-card border-b border-line"
          : "bg-transparent"
      )}
    >
      <div className="container-app flex h-16 items-center justify-between gap-3">
        <a href="#welkom" className="flex items-center">
          <Logo height={scrolled ? 36 : 40} variant={scrolled ? "dark" : "light"} />
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
                scrolled
                  ? "text-ink/75 hover:text-navy-700 hover:bg-canvas"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              {it.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageMenu variant={scrolled ? "light" : "dark"} />
          <LayoutMenu variant={scrolled ? "light" : "dark"} />
          <Link
            href="/login"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold transition",
              scrolled
                ? "bg-navy-700 text-white hover:bg-navy-800"
                : "bg-gold-400 text-navy-900 hover:bg-gold-300"
            )}
          >
            {t("mk_signin_short")}
          </Link>
        </div>
      </div>
    </header>
  );
}
