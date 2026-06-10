"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useT } from "@/lib/i18n";

/**
 * Footer — mirrors werkkompasbv.nl footer:
 *   nav: Home / Over Ons / Contacteer Ons / Juridische Kennisgeving / Privacybeleid
 *   copyright: "©Auteursrecht. Alle rechten voorbehouden."
 *   contact: email + phone (no postal address; site doesn't show one)
 */
export function MarketingFooter() {
  const { t } = useT();
  return (
    <footer className="relative bg-navy-900 text-white/75">
      <div className="container-app py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo height={48} variant="light" />
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
              {t("mk_foot_quicklinks")}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#welkom" className="hover:text-white">Home</a></li>
              <li><a href="#over-ons" className="hover:text-white">{t("mk_nav_about")}</a></li>
              <li><a href="#contact" className="hover:text-white">{t("mk_nav_contact")}</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">{t("mk_foot_legal_notice")}</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">{t("mk_foot_privacy")}</a></li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
              {t("mk_foot_contact_heading")}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${t("mk_contact_email_value")}`}
                  className="hover:text-white"
                >
                  {t("mk_contact_email_value")}
                </a>
              </li>
              <li className="tabular">
                <a
                  href={`tel:${t("mk_contact_phone_value").replace(/\s/g, "")}`}
                  className="hover:text-white"
                >
                  {t("mk_contact_phone_value")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-[11px] text-white/45">
          <span>{t("mk_foot_copyright")}</span>
          <Link href="https://www.werkkompasbv.nl" target="_blank" className="hover:text-white">
            werkkompasbv.nl
          </Link>
        </div>
      </div>
    </footer>
  );
}
