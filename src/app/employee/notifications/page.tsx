"use client";

import Link from "next/link";
import { AppHeader } from "@/components/employee/AppHeader";
import { useStore } from "@/lib/store";
import { Bell, CheckCircle2, MessageCircle, Sparkles, XCircle, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { REFERENCE_TODAY } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/EmptyState";
import { useEffect } from "react";
import { useT, useFormat } from "@/lib/i18n";

const iconFor = (kind: string) => {
  switch (kind) {
    case "nieuwe-opdracht":
      return Sparkles;
    case "geaccepteerd":
      return CheckCircle2;
    case "afgewezen":
      return XCircle;
    case "bericht":
      return MessageCircle;
    case "wijziging":
      return RefreshCcw;
    default:
      return Bell;
  }
};

const colorFor = (kind: string) => {
  switch (kind) {
    case "nieuwe-opdracht":
      return "bg-gold-100 text-gold-700";
    case "geaccepteerd":
      return "bg-emerald-50 text-emerald-700";
    case "afgewezen":
      return "bg-red-50 text-red-700";
    case "bericht":
      return "bg-navy-50 text-navy-700";
    default:
      return "bg-canvas text-ink/70";
  }
};

export default function EmployeeNotificationsPage() {
  const { session, notifications, dispatch } = useStore();
  const { t } = useT();
  const fmt = useFormat();
  const empId = session.employeeId;

  const myNotifs = notifications
    .filter((n) => n.forEmployeeId === empId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  useEffect(() => {
    if (!empId) return;
    const t = setTimeout(() => {
      dispatch({ type: "MARK_ALL_NOTIFS_READ", payload: { forEmployeeId: empId } });
    }, 800);
    return () => clearTimeout(t);
  }, [empId, dispatch]);

  return (
    <main className="animate-fade-in">
      <AppHeader variant="subpage" title={t("e_notif_title")} />
      <div className="container-mobile mt-4 space-y-2">
        {myNotifs.length === 0 ? (
          <EmptyState
            icon={Bell}
            title={t("e_empty_notifs")}
            description={t("e_empty_notifs_desc")}
          />
        ) : (
          myNotifs.map((n) => {
            const Icon = iconFor(n.kind);
            const inner = (
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    colorFor(n.kind)
                  )}
                >
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-bold text-navy-900">
                      {n.title}
                    </span>
                    <span className="shrink-0 text-[10px] font-semibold text-ink/50 tabular">
                      {fmt.timeAgo(n.createdAt, REFERENCE_TODAY)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-ink/65">{n.body}</p>
                </div>
                {!n.read && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold-400 ring-2 ring-gold-100" />
                )}
              </div>
            );
            const className = cn(
              "block rounded-2xl border bg-white p-4 transition",
              !n.read ? "border-navy-700/25 shadow-card" : "border-line"
            );
            if (n.missionId) {
              return (
                <Link
                  key={n.id}
                  href={`/employee/missions/${n.missionId}`}
                  className={className}
                >
                  {inner}
                </Link>
              );
            }
            return (
              <div key={n.id} className={className}>
                {inner}
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
