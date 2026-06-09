"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Check, X, Star } from "lucide-react";
import { AppHeader } from "@/components/employee/AppHeader";
import { useStore } from "@/lib/store";
import { addDays, isoDate, startOfWeek, hoursBetween, cn } from "@/lib/utils";
import { REFERENCE_TODAY } from "@/lib/mock-data";
import type { AvailabilityState } from "@/types";
import { useT, useFormat, useLocalized } from "@/lib/i18n";

const SHORT_KEYS = ["day_short_Ma", "day_short_Di", "day_short_Wo", "day_short_Do", "day_short_Vr", "day_short_Za", "day_short_Zo"];
const LONG_KEYS = ["day_long_Ma", "day_long_Di", "day_long_Wo", "day_long_Do", "day_long_Vr", "day_long_Za", "day_long_Zo"];

const stateConfig: Record<
  AvailabilityState,
  { labelKey: string; bg: string; text: string; ring: string }
> = {
  beschikbaar: {
    labelKey: "e_state_available",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
  },
  voorkeur: {
    labelKey: "e_state_preferred",
    bg: "bg-gold-100",
    text: "text-gold-700",
    ring: "ring-gold-300",
  },
  niet: {
    labelKey: "e_state_unavail",
    bg: "bg-red-50",
    text: "text-red-700",
    ring: "ring-red-200",
  },
};

export default function EmployeeAvailabilityPage() {
  const { session, getEmployeeAvailability, dispatch, missions } = useStore();
  const { t } = useT();
  const fmt = useFormat();
  const { mission: localizeMission } = useLocalized();
  const empId = session.employeeId!;
  const av = getEmployeeAvailability(empId);

  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(REFERENCE_TODAY))
  );

  const week = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => {
        const d = addDays(weekStart, i);
        const iso = isoDate(d);
        const state = av?.entries.find((e) => e.date === iso)?.state;
        const shiftsThisDay = missions.filter(
          (m) =>
            m.assignments.some(
              (a) => a.employeeId === empId && a.status === "geaccepteerd"
            ) && isoDate(new Date(m.startISO)) === iso
        );
        return { date: d, iso, state, shifts: shiftsThisDay };
      }),
    [weekStart, av, missions, empId]
  );

  const cycleState = (iso: string, current?: AvailabilityState) => {
    const next: AvailabilityState | null =
      current === undefined
        ? "beschikbaar"
        : current === "beschikbaar"
          ? "voorkeur"
          : current === "voorkeur"
            ? "niet"
            : null;
    dispatch({
      type: "SET_AVAILABILITY",
      payload: { employeeId: empId, date: iso, state: next },
    });
  };

  const setAllWorkDays = (state: AvailabilityState) => {
    week.slice(0, 5).forEach((d) => {
      dispatch({
        type: "SET_AVAILABILITY",
        payload: { employeeId: empId, date: d.iso, state },
      });
    });
  };

  const weekLabel = (() => {
    const end = addDays(weekStart, 6);
    const sm = fmt.monthShort(weekStart.toISOString());
    const em = fmt.monthShort(end.toISOString());
    return sm === em
      ? `${weekStart.getDate()} – ${end.getDate()} ${em}`
      : `${weekStart.getDate()} ${sm} – ${end.getDate()} ${em}`;
  })();

  const availableCount = week.filter(
    (d) => d.state === "beschikbaar" || d.state === "voorkeur"
  ).length;

  const acceptedHours = week.reduce(
    (s, d) =>
      s + d.shifts.reduce((sh, m) => sh + hoursBetween(m.startISO, m.endISO), 0),
    0
  );

  return (
    <main className="animate-fade-in">
      <AppHeader title={t("e_avail_title")} />
      <div className="container-mobile mt-4 space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-line bg-white p-3">
          <button
            onClick={() => setWeekStart(addDays(weekStart, -7))}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-navy-700 hover:bg-navy-50 focus-ring"
            aria-label={t("e_prev_week")}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
              {t("e_week_label")} {Math.ceil(((weekStart.getTime() - new Date(weekStart.getFullYear(), 0, 1).getTime()) / 86400000 + new Date(weekStart.getFullYear(), 0, 1).getDay() + 1) / 7)}
            </div>
            <div className="font-display text-base font-black text-navy-900 capitalize">
              {weekLabel}
            </div>
          </div>
          <button
            onClick={() => setWeekStart(addDays(weekStart, 7))}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-navy-700 hover:bg-navy-50 focus-ring"
            aria-label={t("e_next_week")}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-line bg-white p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
              {t("e_avail_days_count")}
            </div>
            <div className="mt-1.5 font-display text-2xl font-black text-navy-900 tabular">
              {availableCount}
              <span className="text-base font-bold text-ink/45">/7</span>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
              {t("e_planned_hours")}
            </div>
            <div className="mt-1.5 font-display text-2xl font-black text-navy-900 tabular">
              {fmt.hours(acceptedHours)}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {week.map((d, i) => {
            const cfg = d.state && stateConfig[d.state];
            const today = isoDate(new Date(REFERENCE_TODAY)) === d.iso;
            return (
              <button
                key={d.iso}
                onClick={() => cycleState(d.iso, d.state)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-2xl border bg-white p-4 text-left transition-all hover:border-navy-700/30 active:scale-[0.995]",
                  cfg ? "border-line" : "border-line"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl font-black tabular",
                    today
                      ? "bg-navy-700 text-white"
                      : "bg-canvas text-navy-700"
                  )}
                >
                  <span className="text-[9px] font-bold uppercase tracking-widest opacity-70">
                    {t(SHORT_KEYS[i])}
                  </span>
                  <span className="text-lg leading-none">{d.date.getDate()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy-900">
                      {t(LONG_KEYS[i])}
                    </span>
                    {today && (
                      <span className="rounded-md bg-navy-700 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
                        {t("e_today_label")}
                      </span>
                    )}
                  </div>
                  {d.shifts.length > 0 ? (
                    <div className="mt-0.5 truncate text-xs text-navy-700 font-semibold">
                      {d.shifts.length === 1
                        ? t("e_shift_count_one", { title: localizeMission(d.shifts[0]).title })
                        : t("e_shift_count_other", { n: d.shifts.length, title: localizeMission(d.shifts[0]).title })}
                    </div>
                  ) : (
                    <div className="mt-0.5 truncate text-xs text-ink/55">
                      {cfg ? t(cfg.labelKey) : t("e_tap_to_set")}
                    </div>
                  )}
                </div>
                <span
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-xl ring-1",
                    cfg
                      ? `${cfg.bg} ${cfg.text} ${cfg.ring}`
                      : "bg-canvas text-ink/40 ring-line"
                  )}
                >
                  {d.state === "beschikbaar" ? (
                    <Check size={16} />
                  ) : d.state === "voorkeur" ? (
                    <Star size={16} fill="currentColor" />
                  ) : d.state === "niet" ? (
                    <X size={16} />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-line bg-white p-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
            {t("e_quickset")}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <button
              onClick={() => setAllWorkDays("beschikbaar")}
              className="rounded-xl bg-emerald-50 px-3 py-2.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100 transition hover:bg-emerald-100"
            >
              <Check size={14} className="mx-auto mb-0.5" />
              {t("e_quick_avail")}
            </button>
            <button
              onClick={() => setAllWorkDays("voorkeur")}
              className="rounded-xl bg-gold-100 px-3 py-2.5 text-xs font-bold text-gold-700 ring-1 ring-gold-200 transition hover:bg-gold-200"
            >
              <Star size={14} className="mx-auto mb-0.5" />
              {t("e_quick_pref")}
            </button>
            <button
              onClick={() => setAllWorkDays("niet")}
              className="rounded-xl bg-red-50 px-3 py-2.5 text-xs font-bold text-red-700 ring-1 ring-red-100 transition hover:bg-red-100"
            >
              <X size={14} className="mx-auto mb-0.5" />
              {t("e_quick_off")}
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-navy-50 p-4 text-xs text-navy-900/80">
          <div className="font-bold">{t("e_tip_title")}</div>
          <p className="mt-1">{t("e_tip_body")}</p>
        </div>
      </div>
    </main>
  );
}
