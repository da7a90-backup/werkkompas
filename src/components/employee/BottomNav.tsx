"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Calendar, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

export function BottomNav() {
  const pathname = usePathname();
  const { session, unreadMessagesForEmployee, missions } = useStore();
  const { t } = useT();
  const tabs = [
    { href: "/employee", labelKey: "nav_start", icon: Home, match: (p: string) => p === "/employee" },
    {
      href: "/employee/missions",
      labelKey: "nav_shifts",
      icon: Briefcase,
      match: (p: string) => p.startsWith("/employee/missions"),
    },
    {
      href: "/employee/availability",
      labelKey: "nav_calendar",
      icon: Calendar,
      match: (p: string) => p.startsWith("/employee/availability"),
    },
    {
      href: "/employee/messages",
      labelKey: "nav_messages",
      icon: MessageCircle,
      match: (p: string) => p.startsWith("/employee/messages"),
    },
    {
      href: "/employee/profile",
      labelKey: "nav_profile",
      icon: User,
      match: (p: string) => p.startsWith("/employee/profile"),
    },
  ];
  const empId = session.employeeId;
  const unreadMsgs = empId ? unreadMessagesForEmployee(empId) : 0;
  const openMissionsForMe = empId
    ? missions.filter(
        (m) =>
          m.invitedEmployeeIds.includes(empId) &&
          !m.assignments.some((a) => a.employeeId === empId)
      ).length
    : 0;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-md"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.25rem)" }}
    >
      <div className="container-mobile flex h-16 items-stretch justify-between">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          let count = 0;
          if (tab.href === "/employee/messages") count = unreadMsgs;
          if (tab.href === "/employee/missions") count = openMissionsForMe;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors",
                active ? "text-navy-700" : "text-ink/50 hover:text-ink/80"
              )}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={active ? 2.4 : 1.8}
                  className={cn("transition-transform", active && "scale-105")}
                />
                {count > 0 && (
                  <span className="absolute -right-2 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-400 px-1 text-[9px] font-bold text-navy-900 ring-2 ring-white tabular">
                    {count}
                  </span>
                )}
              </div>
              <span className="tracking-tight">{t(tab.labelKey)}</span>
              {active && (
                <span className="absolute -top-px h-0.5 w-8 rounded-full bg-navy-700" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
