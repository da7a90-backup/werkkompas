"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Inbox,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AppHeader } from "@/components/employee/AppHeader";
import { useStore } from "@/lib/store";
import { MissionCard } from "@/components/shared/MissionCard";
import { Hero } from "@/components/shared/Hero";
import {
  hoursBetween,
  isoDate,
  startOfWeek,
} from "@/lib/utils";
import { REFERENCE_TODAY } from "@/lib/mock-data";
import { useT, useFormat, useLocalized } from "@/lib/i18n";

export default function EmployeeHome() {
  const {
    session,
    getEmployee,
    missions,
    hoursWorkedThisWeek,
    getEmployeeAvailability,
  } = useStore();
  const { t } = useT();
  const fmt = useFormat();
  const { mission: localizeMission, cert: localizeCert } = useLocalized();
  const employee = getEmployee(session.employeeId);

  if (!employee) return null;

  const myAccepted = missions
    .filter((m) =>
      m.assignments.some(
        (a) => a.employeeId === employee.id && a.status === "geaccepteerd"
      )
    )
    .sort((a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime());

  const upcoming = myAccepted.filter(
    (m) => new Date(m.startISO).getTime() > Date.now() - 36e5
  );

  const myInvitations = missions
    .filter(
      (m) =>
        m.invitedEmployeeIds.includes(employee.id) &&
        !m.assignments.some((a) => a.employeeId === employee.id)
    )
    .sort((a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime());

  const weeklyHours = hoursWorkedThisWeek(employee.id);
  const contract = employee.contractHoursPerWeek;
  const pct = Math.min(100, Math.round((weeklyHours / contract) * 100));

  const week = startOfWeek(new Date(REFERENCE_TODAY));
  const av = getEmployeeAvailability(employee.id);
  const availableThisWeek = av
    ? av.entries.filter((e) => {
        const t = new Date(e.date).getTime();
        return (
          t >= week.getTime() &&
          t < week.getTime() + 7 * 86400000 &&
          (e.state === "beschikbaar" || e.state === "voorkeur")
        );
      }).length
    : 0;

  const nextMission = upcoming[0] ? localizeMission(upcoming[0]) : undefined;
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return t("e_morning");
    if (h < 18) return t("e_afternoon");
    return t("e_evening");
  })();

  return (
    <main className="animate-fade-in">
      <AppHeader showSwitch />

      <div className="container-mobile mt-2 space-y-5 pb-6">
        <Hero
          eyebrow={greeting}
          title={t("e_ready_week", { name: employee.firstName })}
          description={
            upcoming.length === 0
              ? t("e_no_upcoming")
              : upcoming.length === 1
                ? t("e_upcoming_count_one")
                : t("e_upcoming_count_other", { n: upcoming.length })
          }
        >
          <div className="flex flex-wrap gap-2">
            <Link
              href="/employee/missions"
              className="inline-flex items-center gap-2 rounded-xl bg-gold-400 px-4 py-2 text-sm font-bold text-navy-900 transition hover:bg-gold-300 active:scale-95"
            >
              {t("e_view_shifts")}
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/employee/availability"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/15"
            >
              <Calendar size={14} />
              {t("e_availability_btn")}
            </Link>
          </div>
        </Hero>

        {nextMission && (
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-ink/50">
                {t("e_next_shift")}
              </h2>
              <Link
                href="/employee/missions"
                className="text-xs font-semibold text-navy-700 hover:underline"
              >
                {t("e_all")}
              </Link>
            </div>
            <Link
              href={`/employee/missions/${nextMission.id}`}
              className="group block overflow-hidden rounded-2xl border border-line bg-white"
            >
              <div className="bg-navy-700 px-5 py-3 text-white flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                    {fmt.dayLong(nextMission.startISO)}
                  </div>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <span className="font-display text-2xl font-black tracking-tightest">
                      {fmt.timeRange(nextMission.startISO, nextMission.endISO)}
                    </span>
                    <span className="text-xs text-white/60 tabular">
                      {fmt.hours(hoursBetween(nextMission.startISO, nextMission.endISO))}
                    </span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-white/70 transition group-hover:translate-x-0.5" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-black tracking-tightest text-navy-900">
                  {nextMission.title}
                </h3>
                <p className="mt-0.5 text-sm text-ink/65">
                  {nextMission.client} · {nextMission.location}, {nextMission.city}
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-navy-50 px-2 py-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-navy-700/70">
                      {t("e_label_rate")}
                    </div>
                    <div className="mt-0.5 font-display text-sm font-black text-navy-900 tabular">
                      {fmt.euro(nextMission.hourlyRate)}/{t("hours_unit")}
                    </div>
                  </div>
                  <div className="rounded-xl bg-navy-50 px-2 py-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-navy-700/70">
                      {t("e_label_earnings")}
                    </div>
                    <div className="mt-0.5 font-display text-sm font-black text-navy-900 tabular">
                      {fmt.euro(
                        hoursBetween(nextMission.startISO, nextMission.endISO) *
                          nextMission.hourlyRate
                      )}
                    </div>
                  </div>
                  <div className="rounded-xl bg-navy-50 px-2 py-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-navy-700/70">
                      {t("e_label_type")}
                    </div>
                    <div className="mt-0.5 font-display text-sm font-black text-navy-900">
                      {t(`mtype_${nextMission.type}`).split(" ")[0]}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {myInvitations.length > 0 && (
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-ink/50">
                <Sparkles size={12} className="text-gold-500" />
                {t("e_new_invites", { n: myInvitations.length })}
              </h2>
              <Link
                href="/employee/missions"
                className="text-xs font-semibold text-navy-700 hover:underline"
              >
                {t("e_all")}
              </Link>
            </div>
            <div className="space-y-2">
              {myInvitations.slice(0, 3).map((m) => (
                <MissionCard
                  key={m.id}
                  mission={m}
                  href={`/employee/missions/${m.id}`}
                  variant="highlight"
                  showStatus={false}
                />
              ))}
            </div>
          </section>
        )}

        <section className="grid grid-cols-2 gap-3">
          <Link
            href="/employee/availability"
            className="group rounded-2xl border border-line bg-white p-4 transition hover:border-navy-700/25 hover:shadow-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Calendar size={16} />
              </div>
              <ChevronRight size={16} className="text-ink/30 group-hover:text-navy-700" />
            </div>
            <div className="mt-3 font-display text-2xl font-black text-navy-900 tabular">
              {availableThisWeek}
              <span className="text-base font-bold text-ink/45">/7</span>
            </div>
            <div className="mt-0.5 text-xs font-semibold text-ink/55">
              {t("e_avail_this_week")}
            </div>
          </Link>
          <Link
            href="/employee/profile"
            className="group rounded-2xl border border-line bg-white p-4 transition hover:border-navy-700/25 hover:shadow-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                <TrendingUp size={16} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">
                {t("e_week_label")}
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-display text-2xl font-black text-navy-900 tabular">
                {fmt.hours(weeklyHours)}
              </span>
              <span className="text-xs font-bold text-ink/45 tabular">
                / {contract}{t("hours_unit")}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-canvas">
              <div
                className="h-full rounded-full bg-navy-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-1 text-xs font-semibold text-ink/55">
              {t("e_pct_contract", { n: pct })}
            </div>
          </Link>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-ink/50">
              {t("e_upcoming_shifts")}
            </h2>
            <Link
              href="/employee/missions"
              className="text-xs font-semibold text-navy-700 hover:underline"
            >
              {t("e_all_count", { n: myAccepted.length })}
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white p-8 text-center">
              <Inbox size={28} className="mx-auto text-ink/30" />
              <p className="mt-2 text-sm font-semibold text-navy-900">
                {t("e_empty_confirmed")}
              </p>
              <p className="mt-1 text-xs text-ink/55">
                {t("e_empty_confirmed_desc")}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {upcoming.slice(0, 4).map((m) => (
                <MissionCard
                  key={m.id}
                  mission={m}
                  href={`/employee/missions/${m.id}`}
                  showStatus={false}
                />
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-line bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
              <ShieldCheck size={16} />
            </div>
            <div>
              <h3 className="font-display text-sm font-black tracking-tight text-navy-900">
                {t("e_my_certs")}
              </h3>
              <p className="text-xs text-ink/55">
                {t("e_certs_desc")}
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {employee.certifications.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 rounded-lg bg-navy-50 px-2 py-1 text-[11px] font-bold text-navy-700"
              >
                <span className="h-1 w-1 rounded-full bg-navy-700" />
                {localizeCert(c)}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
