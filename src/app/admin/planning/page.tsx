"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Filter, Plus, Search } from "lucide-react";
import { AdminTopbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { REFERENCE_TODAY } from "@/lib/mock-data";
import {
  addDays,
  cn,
  hoursBetween,
  isoDate,
  startOfWeek,
} from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { useT, useFormat, useLocalized } from "@/lib/i18n";

const WEEKDAY_KEYS = [
  "day_short_Ma",
  "day_short_Di",
  "day_short_Wo",
  "day_short_Do",
  "day_short_Vr",
  "day_short_Za",
  "day_short_Zo",
];

export default function AdminPlanningPage() {
  const { missions, employees, availability, hoursWorkedThisWeek } = useStore();
  const { t } = useT();
  const fmt = useFormat();
  const { mission: localizeMission } = useLocalized();
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(REFERENCE_TODAY))
  );
  const [filterCity, setFilterCity] = useState<string>("alle");

  const days = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => {
        const d = addDays(weekStart, i);
        return { date: d, iso: isoDate(d) };
      }),
    [weekStart]
  );

  const cities = Array.from(new Set(employees.map((e) => e.city))).sort();
  const filteredEmployees =
    filterCity === "alle"
      ? employees
      : employees.filter((e) => e.city === filterCity);

  const weekLabel = (() => {
    const end = addDays(weekStart, 6);
    const sm = fmt.monthShort(weekStart.toISOString());
    const em = fmt.monthShort(end.toISOString());
    return sm === em
      ? `${weekStart.getDate()} – ${end.getDate()} ${em}`
      : `${weekStart.getDate()} ${sm} – ${end.getDate()} ${em}`;
  })();

  const missionsByEmpDay = useMemo(() => {
    const map = new Map<string, Map<string, typeof missions>>();
    employees.forEach((e) => map.set(e.id, new Map()));
    missions.forEach((m) => {
      const day = isoDate(new Date(m.startISO));
      m.assignments
        .filter((a) => a.status === "geaccepteerd")
        .forEach((a) => {
          const empMap = map.get(a.employeeId);
          if (!empMap) return;
          const arr = empMap.get(day) ?? [];
          arr.push(m);
          empMap.set(day, arr);
        });
    });
    return map;
  }, [missions, employees]);

  const availabilityByEmpDay = useMemo(() => {
    const map = new Map<string, Map<string, string>>();
    availability.forEach((a) => {
      const empMap = new Map<string, string>();
      a.entries.forEach((e) => empMap.set(e.date, e.state));
      map.set(a.employeeId, empMap);
    });
    return map;
  }, [availability]);

  return (
    <>
      <AdminTopbar
        title={t("adm_planning_title")}
        description={t("adm_planning_desc")}
        action={
          <Link href="/admin/missions/new">
            <Button size="md" className="!gap-1.5">
              <Plus size={16} />
              {t("adm_new_assignment")}
            </Button>
          </Link>
        }
      />
      <div className="p-4 lg:p-6 space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 rounded-2xl border border-line bg-white p-1">
            <button
              onClick={() => setWeekStart(addDays(weekStart, -7))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-navy-700 hover:bg-navy-50"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="px-3 text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
                {t("adm_week_label")}
              </div>
              <div className="font-display text-sm font-black text-navy-900 capitalize">
                {weekLabel}
              </div>
            </div>
            <button
              onClick={() => setWeekStart(addDays(weekStart, 7))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-navy-700 hover:bg-navy-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <button
            onClick={() => setWeekStart(startOfWeek(new Date(REFERENCE_TODAY)))}
            className="rounded-xl border border-line bg-white px-3 py-2 text-xs font-bold text-navy-700 hover:bg-canvas"
          >
            {t("today")}
          </button>
          <div className="ml-auto flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2">
            <Filter size={14} className="text-ink/50" />
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="bg-transparent text-xs font-bold text-navy-900 focus:outline-none"
            >
              <option value="alle">{t("adm_all_cities")}</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-canvas/60">
                  <th className="sticky left-0 z-10 bg-canvas/95 px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-ink/55">
                    {t("adm_employee_header")}
                  </th>
                  {days.map((d, i) => {
                    const today = isoDate(new Date(REFERENCE_TODAY)) === d.iso;
                    return (
                      <th
                        key={d.iso}
                        className={cn(
                          "px-2 py-3 text-center font-semibold",
                          today && "bg-navy-50"
                        )}
                      >
                        <div className="text-[10px] font-bold uppercase tracking-widest text-ink/55">
                          {t(WEEKDAY_KEYS[i])}
                        </div>
                        <div
                          className={cn(
                            "mt-0.5 font-display text-base font-black tabular",
                            today ? "text-navy-700" : "text-navy-900"
                          )}
                        >
                          {d.date.getDate()}
                        </div>
                      </th>
                    );
                  })}
                  <th className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-widest text-ink/55">
                    {t("adm_total")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredEmployees.map((e) => {
                  const weekHours = hoursWorkedThisWeek(e.id, weekStart);
                  const overCao = weekHours > e.caoMaxHoursPerWeek;
                  const empMap = missionsByEmpDay.get(e.id);
                  const avMap = availabilityByEmpDay.get(e.id);
                  return (
                    <tr key={e.id} className="hover:bg-canvas/40">
                      <td className="sticky left-0 z-10 bg-white px-4 py-3">
                        <Link
                          href={`/admin/employees/${e.id}`}
                          className="flex items-center gap-2.5"
                        >
                          <Avatar
                            initials={e.initials}
                            color={e.avatarColor}
                            size="sm"
                          />
                          <div className="min-w-0">
                            <div className="truncate font-bold text-navy-900">
                              {e.firstName} {e.lastName}
                            </div>
                            <div className="truncate text-[11px] text-ink/55">
                              {e.city} · {e.contractHoursPerWeek}{t("per_week_short")}
                            </div>
                          </div>
                        </Link>
                      </td>
                      {days.map((d) => {
                        const today = isoDate(new Date(REFERENCE_TODAY)) === d.iso;
                        const shifts = empMap?.get(d.iso) ?? [];
                        const av = avMap?.get(d.iso);
                        return (
                          <td
                            key={d.iso}
                            className={cn(
                              "p-1 align-top",
                              today && "bg-navy-50/40"
                            )}
                          >
                            {shifts.length > 0 ? (
                              <div className="space-y-1">
                                {shifts.map((rawM) => {
                                  const m = localizeMission(rawM);
                                  return (
                                  <Link
                                    key={m.id}
                                    href={`/admin/missions/${m.id}`}
                                    className={cn(
                                      "block rounded-lg px-2 py-1.5 text-[11px] font-bold transition hover:opacity-90",
                                      "bg-navy-700 text-white"
                                    )}
                                    title={`${m.title} — ${m.client}`}
                                  >
                                    <div className="truncate">{m.title}</div>
                                    <div className="text-[10px] font-semibold text-white/70 tabular">
                                      {fmt.timeRange(m.startISO, m.endISO)}
                                    </div>
                                  </Link>
                                  );
                                })}
                              </div>
                            ) : av ? (
                              <div
                                className={cn(
                                  "flex h-12 items-center justify-center rounded-lg text-[10px] font-bold uppercase tracking-widest",
                                  av === "beschikbaar"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : av === "voorkeur"
                                      ? "bg-gold-100 text-gold-700"
                                      : "bg-red-50 text-red-700"
                                )}
                              >
                                {av === "beschikbaar"
                                  ? t("adm_avail_short")
                                  : av === "voorkeur"
                                    ? t("adm_pref_short")
                                    : t("adm_not_short")}
                              </div>
                            ) : (
                              <div className="flex h-12 items-center justify-center rounded-lg border border-dashed border-line text-[10px] font-semibold text-ink/35">
                                —
                              </div>
                            )}
                          </td>
                        );
                      })}
                      <td className="px-3 py-3 text-right">
                        <div
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-display text-xs font-black tabular",
                            overCao
                              ? "bg-red-50 text-red-700"
                              : weekHours > e.contractHoursPerWeek
                                ? "bg-amber-50 text-amber-800"
                                : "bg-navy-50 text-navy-700"
                          )}
                        >
                          {fmt.hours(weekHours)}
                          <span className="text-[10px] text-ink/55">
                            / {e.contractHoursPerWeek}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-ink/65">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-navy-700" /> {t("adm_legend_shift")}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-emerald-100 ring-1 ring-inset ring-emerald-200" />
            {t("adm_legend_available")}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-gold-100 ring-1 ring-inset ring-gold-300" />
            {t("adm_legend_preferred")}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-red-50 ring-1 ring-inset ring-red-200" />
            {t("adm_legend_unavailable")}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border border-dashed border-line bg-white" />
            {t("adm_legend_none")}
          </div>
        </div>
      </div>
    </>
  );
}
