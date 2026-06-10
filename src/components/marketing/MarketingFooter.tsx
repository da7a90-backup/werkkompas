"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useT } from "@/lib/i18n";

export function MarketingFooter() {
  const { t } = useT();
  return (
    <footer className="relative bg-navy-900 text-white/75">
      <div className="container-app py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo height={48} variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              {t("partner")}
            </p>
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
              {t("mk_foot_quicklinks")}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#over-ons" className="hover:text-white">{t("mk_nav_about")}</a></li>
              <li><a href="#diensten" className="hover:text-white">{t("mk_nav_services")}</a></li>
              <li><a href="#contact" className="hover:text-white">{t("mk_nav_contact")}</a></li>
              <li><Link href="/login/admin" className="hover:text-white">{t("admin_badge")}</Link></li>
              <li><Link href="/login/employee" className="hover:text-white">{t("emp_badge")}</Link></li>
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
              <li className="text-white/55">{t("mk_contact_office_value")}</li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
              {t("mk_foot_legal")}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">{t("mk_foot_legal_notice")}</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">{t("mk_foot_privacy")}</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">{t("mk_foot_terms")}</a></li>
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
