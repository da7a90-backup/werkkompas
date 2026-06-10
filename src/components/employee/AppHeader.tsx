"use client";

import { Bell, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { RoleSwitcher } from "@/components/shared/RoleSwitcher";
import { LanguageMenu } from "@/components/shared/LanguageMenu";
import { useT } from "@/lib/i18n";

interface Props {
  variant?: "home" | "subpage";
  title?: string;
  showSwitch?: boolean;
  className?: string;
}

export function AppHeader({ variant = "home", title, showSwitch, className }: Props) {
  const router = useRouter();
  const { session, getEmployee, unreadNotifsForEmployee } = useStore();
  const { t } = useT();
  const employee = getEmployee(session.employeeId);
  const unread = session.employeeId
    ? unreadNotifsForEmployee(session.employeeId)
    : 0;

  if (variant === "subpage") {
    return (
      <header
        className={cn(
          "sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-md",
          className
        )}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="container-mobile flex h-14 items-center gap-2">
          <button
            onClick={() => router.back()}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-xl text-navy-700 hover:bg-navy-50 focus-ring"
            aria-label={t("back")}
          >
            <ChevronLeft size={22} />
          </button>
          <h1 className="flex-1 truncate text-base font-bold tracking-tight text-navy-900">
            {title}
          </h1>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn("relative isolate z-30 bg-navy-700 text-white", className)}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-50" />
        <div
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(239,191,4,0.35), rgba(239,191,4,0))",
          }}
        />
      </div>
      <div className="relative container-mobile flex h-16 items-center justify-between">
        <Link href="/employee" className="flex items-center gap-3">
          <Avatar
            initials={employee?.initials ?? "WK"}
            color={employee?.avatarColor ?? "#2e4862"}
            size="sm"
            ring
          />
          <div className="flex flex-col">
            <span className="text-[11px] font-medium uppercase tracking-widest text-white/60">
              {t("e_welcome")}
            </span>
            <span className="text-sm font-bold tracking-tight">
              {employee?.firstName ?? "Medewerker"} {employee?.lastName ?? ""}
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-1.5">
          <LanguageMenu variant="dark" />
          {showSwitch && <RoleSwitcher compact />}
          <Link
            href="/employee/notifications"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/15 focus-ring"
            aria-label={t("e_notif_title")}
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-400 px-1 text-[9px] font-bold text-navy-900 tabular">
                {unread}
              </span>
            )}
          </Link>
        </div>
      </div>
      {title && (
        <div className="relative container-mobile pb-6 pt-2">
          <h1 className="font-display text-3xl font-black tracking-tightest">
            {title}
          </h1>
        </div>
      )}
    </header>
  );
}
