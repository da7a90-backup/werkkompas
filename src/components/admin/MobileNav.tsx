"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  LayoutDashboard,
  CalendarRange,
  Briefcase,
  Users,
  MessageCircle,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { RoleSwitcher } from "@/components/shared/RoleSwitcher";
import { LanguageMenu } from "@/components/shared/LanguageMenu";
import { useT } from "@/lib/i18n";

export function AdminMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useT();
  const items = [
    { href: "/admin", labelKey: "nav_overview", icon: LayoutDashboard, exact: true },
    { href: "/admin/planning", labelKey: "nav_planning", icon: CalendarRange },
    { href: "/admin/missions", labelKey: "nav_assignments", icon: Briefcase },
    { href: "/admin/employees", labelKey: "nav_employees", icon: Users },
    { href: "/admin/messages", labelKey: "nav_messages", icon: MessageCircle },
  ];

  return (
    <>
      <div
        className="lg:hidden sticky top-0 z-30 bg-navy-700"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 1.75rem)",
        }}
      >
        <div className="flex h-14 items-center justify-between border-b border-line bg-white px-4">
          <Logo height={32} />
          <div className="flex items-center gap-2">
            <LanguageMenu variant="light" />
            <button
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-navy-700 hover:bg-navy-50 focus-ring"
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] animate-slide-up bg-white shadow-elevated flex flex-col">
            <div
              className="flex items-center justify-between border-b border-line px-5 pb-4"
              style={{ paddingTop: "calc(env(safe-area-inset-top) + 1rem)" }}
            >
              <Logo height={32} />
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-ink/60 hover:bg-canvas"
                aria-label={t("close")}
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-3">
              <ul className="flex flex-col gap-1">
                {items.map((item) => {
                  const active = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold tracking-tight transition-colors",
                          active
                            ? "bg-navy-700 text-white"
                            : "text-ink/80 hover:bg-canvas"
                        )}
                      >
                        <Icon size={18} />
                        {t(item.labelKey)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div
              className="border-t border-line p-3"
              style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.75rem)" }}
            >
              <div className="rounded-2xl bg-navy-700 p-4 flex items-center justify-between gap-2">
                <RoleSwitcher />
                <LanguageMenu variant="dark" placement="top-right" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
