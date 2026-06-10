"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarRange,
  Briefcase,
  Users,
  MessageCircle,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { useStore } from "@/lib/store";
import { RoleSwitcher } from "@/components/shared/RoleSwitcher";
import { LanguageMenu } from "@/components/shared/LanguageMenu";
import { useT } from "@/lib/i18n";

export function AdminSidebar() {
  const pathname = usePathname();
  const { unreadMessagesForAdmin, unreadNotifsForAdmin, missions } = useStore();
  const { t } = useT();
  const items = [
    { href: "/admin", labelKey: "nav_overview", icon: LayoutDashboard, exact: true },
    { href: "/admin/planning", labelKey: "nav_planning", icon: CalendarRange },
    { href: "/admin/missions", labelKey: "nav_assignments", icon: Briefcase },
    { href: "/admin/employees", labelKey: "nav_employees", icon: Users },
    { href: "/admin/messages", labelKey: "nav_messages", icon: MessageCircle },
  ];
  const unreadMsg = unreadMessagesForAdmin();
  const unreadNotif = unreadNotifsForAdmin();
  const openMissions = missions.filter(
    (m) => m.status === "open" || m.status === "uitgenodigd"
  ).length;

  return (
    <aside className="hidden lg:flex h-screen w-64 shrink-0 flex-col border-r border-line bg-white">
      <div className="flex h-16 items-center justify-between gap-3 border-b border-line px-5">
        <Logo height={36} />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-ink/50 text-right">
          {t("nav_console")}
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 scroll-y">
        <div className="px-2 pb-2 pt-1 text-[10px] font-bold uppercase tracking-widest text-ink/40">
          {t("nav_navigation")}
        </div>
        <ul className="flex flex-col gap-0.5">
          {items.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;
            let count: number | undefined;
            if (item.href === "/admin/messages") count = unreadMsg || undefined;
            if (item.href === "/admin/missions") count = openMissions || undefined;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold tracking-tight transition-colors",
                    active
                      ? "bg-navy-700 text-white shadow-card"
                      : "text-ink/75 hover:bg-canvas hover:text-navy-700"
                  )}
                >
                  <Icon size={18} strokeWidth={active ? 2.4 : 1.8} />
                  <span className="flex-1">{t(item.labelKey)}</span>
                  {count && (
                    <span
                      className={cn(
                        "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular",
                        active
                          ? "bg-gold-400 text-navy-900"
                          : "bg-gold-400 text-navy-900"
                      )}
                    >
                      {count}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-line p-3">
        <div className="rounded-2xl bg-navy-700 p-4 text-white">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold-400">
            <Bell size={12} />
            {unreadNotif > 0
              ? t("adm_new_notif_count", { n: unreadNotif })
              : t("adm_no_notif")}
          </div>
          <p className="mt-1.5 text-xs leading-snug text-white/70">
            {t("adm_demo_local")}
          </p>
          <div className="mt-3 flex items-center justify-between gap-2">
            <RoleSwitcher />
            <LanguageMenu variant="dark" placement="top-right" />
          </div>
        </div>
      </div>
    </aside>
  );
}
