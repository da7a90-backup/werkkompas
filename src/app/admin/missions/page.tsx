"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter, Plus, Search } from "lucide-react";
import { AdminTopbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { MissionTypeBadge, MissionStatusBadge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import {
  cn,
  hoursBetween,
} from "@/lib/utils";
import type { MissionStatus, MissionType } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { useT, useFormat, useLocalized } from "@/lib/i18n";

export default function AdminMissionsPage() {
  const { missions, employees } = useStore();
  const { t } = useT();
  const fmt = useFormat();
  const { mission: localizeMission } = useLocalized();
  const [status, setStatus] = useState<MissionStatus | "alle">("alle");
  const [type, setType] = useState<MissionType | "alle">("alle");
  const [q, setQ] = useState("");

  const STATUS_FILTERS: { value: MissionStatus | "alle"; label: string }[] = [
    { value: "alle", label: t("all") },
    { value: "open", label: t("adm_filter_open") },
    { value: "uitgenodigd", label: t("adm_filter_invited") },
    { value: "geaccepteerd", label: t("adm_filter_staffed") },
  ];

  const types: MissionType[] = [
    "Evenement",
    "Object",
    "Winkel",
    "Mobiele surveillance",
    "Persoonsbeveiliging",
    "Horeca",
  ];

  const filtered = useMemo(() => {
    return missions
      .filter((m) => (status === "alle" ? true : m.status === status))
      .filter((m) => (type === "alle" ? true : m.type === type))
      .filter((m) =>
        q.trim()
          ? m.title.toLowerCase().includes(q.toLowerCase()) ||
            m.client.toLowerCase().includes(q.toLowerCase()) ||
            m.city.toLowerCase().includes(q.toLowerCase())
          : true
      )
      .sort(
        (a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
      );
  }, [missions, status, type, q]);

  const counts = {
    alle: missions.length,
    open: missions.filter((m) => m.status === "open").length,
    uitgenodigd: missions.filter((m) => m.status === "uitgenodigd").length,
    geaccepteerd: missions.filter((m) => m.status === "geaccepteerd").length,
  };

  return (
    <>
      <AdminTopbar
        title={t("adm_missions_title")}
        description={t("adm_missions_desc")}
        action={
          <Link href="/admin/missions/new">
            <Button size="md" className="!gap-1.5">
              <Plus size={16} />
              {t("adm_new_assignment")}
            </Button>
          </Link>
        }
      />

      <div className="p-4 lg:p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-tight transition-colors",
                status === f.value
                  ? "bg-navy-700 text-white"
                  : "border border-line bg-white text-ink/70 hover:border-navy-700/30 hover:text-navy-700"
              )}
            >
              {f.label}
              <span
                className={cn(
                  "inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold tabular",
                  status === f.value
                    ? "bg-white/20 text-white"
                    : "bg-ink/10 text-ink/65"
                )}
              >
                {counts[f.value as keyof typeof counts]}
              </span>
            </button>
          ))}
          <div className="flex w-full sm:w-auto sm:ml-auto items-center gap-2 flex-wrap">
            <div className="flex h-10 flex-1 sm:flex-initial items-center gap-2 rounded-xl border border-line bg-white px-3 focus-within:border-navy-700">
              <Search size={14} className="text-ink/50 shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("adm_search_assign")}
                className="h-full w-full sm:w-56 bg-transparent text-sm placeholder:text-ink/40 focus:outline-none"
              />
            </div>
            <div className="flex h-10 items-center gap-2 rounded-xl border border-line bg-white px-3">
              <Filter size={14} className="text-ink/50" />
              <select
                value={type}
                onChange={(e) => setType(e.target.value as MissionType | "alle")}
                className="bg-transparent text-sm font-semibold text-navy-900 focus:outline-none"
              >
                <option value="alle">{t("adm_all_types")}</option>
                {types.map((tp) => (
                  <option key={tp} value={tp}>
                    {t(`mtype_${tp}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title={t("adm_no_results")}
            description={t("adm_no_results_desc")}
            action={
              <Link href="/admin/missions/new">
                <Button>
                  <Plus size={14} className="mr-1" />
                  {t("adm_new_assignment")}
                </Button>
              </Link>
            }
          />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <ul className="divide-y divide-line">
              {filtered.map((rawM) => {
                const m = localizeMission(rawM);
                const accepted = m.assignments.filter(
                  (a) => a.status === "geaccepteerd"
                ).length;
                const hours = hoursBetween(m.startISO, m.endISO);
                return (
                  <li key={m.id}>
                    <Link
                      href={`/admin/missions/${m.id}`}
                      className="group grid grid-cols-12 items-center gap-3 px-5 py-4 hover:bg-canvas"
                    >
                      <div className="col-span-12 sm:col-span-5 flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                          <span className="text-[9px] font-bold uppercase tracking-widest">
                            {fmt.monthShort(m.startISO)}
                          </span>
                          <span className="font-display text-base font-black leading-none tabular">
                            {new Date(m.startISO).getDate()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-bold text-navy-900">
                              {m.title}
                            </span>
                          </div>
                          <div className="mt-0.5 truncate text-xs text-ink/55">
                            {m.client} · {m.city}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-2 text-xs text-ink/65 tabular">
                        {fmt.timeRange(m.startISO, m.endISO)}
                        <div className="text-[10px] text-ink/45">
                          {fmt.hours(hours)}
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-2 text-xs">
                        <MissionTypeBadge type={m.type} />
                      </div>
                      <div className="col-span-6 sm:col-span-2 flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                          {m.assignments
                            .filter((a) => a.status === "geaccepteerd")
                            .slice(0, 3)
                            .map((a) => {
                              const emp = employees.find(
                                (e) => e.id === a.employeeId
                              );
                              if (!emp) return null;
                              return (
                                <Avatar
                                  key={a.employeeId}
                                  initials={emp.initials}
                                  color={emp.avatarColor}
                                  size="xs"
                                  ring
                                />
                              );
                            })}
                        </div>
                        <span
                          className={cn(
                            "text-xs font-bold tabular",
                            accepted >= m.headcount
                              ? "text-emerald-700"
                              : "text-navy-900"
                          )}
                        >
                          {accepted}/{m.headcount}
                        </span>
                      </div>
                      <div className="col-span-6 sm:col-span-1 text-right">
                        <MissionStatusBadge status={m.status} />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
