"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  CalendarRange,
  CheckCircle2,
  Clock,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { AdminTopbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import { useStore } from "@/lib/store";
import { MissionCard } from "@/components/shared/MissionCard";
import {
  hoursBetween,
  isoDate,
  startOfWeek,
  addDays,
  cn,
} from "@/lib/utils";
import { REFERENCE_TODAY } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/Avatar";
import { MissionTypeBadge } from "@/components/ui/Badge";
import { useT, useFormat, useLocalized } from "@/lib/i18n";

export default function AdminDashboardPage() {
  const { missions, employees, notifications, hoursWorkedThisWeek } = useStore();
  const { t } = useT();
  const fmt = useFormat();
  const { mission: localizeMission } = useLocalized();

  const week = startOfWeek(new Date(REFERENCE_TODAY));
  const weekEnd = addDays(week, 7);

  const thisWeekMissions = missions.filter((m) => {
    const t = new Date(m.startISO).getTime();
    return t >= week.getTime() && t < weekEnd.getTime();
  });

  const openCount = missions.filter((m) => m.status === "open").length;
  const invitedCount = missions.filter((m) => m.status === "uitgenodigd").length;
  const fullyStaffed = missions.filter((m) => m.status === "geaccepteerd").length;

  const totalHeadcountNeeded = thisWeekMissions.reduce(
    (s, m) => s + m.headcount,
    0
  );
  const totalAccepted = thisWeekMissions.reduce(
    (s, m) =>
      s + m.assignments.filter((a) => a.status === "geaccepteerd").length,
    0
  );
  const coveragePct =
    totalHeadcountNeeded > 0
      ? Math.round((totalAccepted / totalHeadcountNeeded) * 100)
      : 100;

  const revenueWeek = thisWeekMissions.reduce(
    (s, m) =>
      s + m.headcount * hoursBetween(m.startISO, m.endISO) * m.hourlyRate,
    0
  );

  const upcoming = missions
    .filter((m) => new Date(m.startISO).getTime() > Date.now() - 36e5)
    .sort((a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime())
    .slice(0, 5);

  const recent = notifications
    .filter((n) => !n.forEmployeeId)
    .slice(0, 5);

  // Employees over CAO?
  const overCao = employees
    .map((e) => ({
      employee: e,
      hours: hoursWorkedThisWeek(e.id),
    }))
    .filter(
      ({ employee, hours }) => hours > employee.caoMaxHoursPerWeek - 4
    )
    .sort((a, b) => b.hours - a.hours);

  return (
    <>
      <AdminTopbar
        title={t("adm_overview_title")}
        description={t("adm_overview_desc")}
        action={
          <Link href="/admin/missions/new">
            <Button size="md" className="!gap-1.5">
              <Plus size={16} />
              {t("adm_new_assignment")}
            </Button>
          </Link>
        }
      />

      <div className="p-4 lg:p-6 space-y-5 lg:space-y-6">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label={t("adm_stat_open_shifts")}
            value={openCount + invitedCount}
            hint={t("adm_stat_open_hint", { a: openCount, b: invitedCount })}
            icon={Briefcase}
          />
          <Stat
            label={t("adm_stat_coverage")}
            value={`${coveragePct}%`}
            hint={t("adm_stat_coverage_hint", { a: totalAccepted, b: totalHeadcountNeeded })}
            icon={Users}
            variant={coveragePct >= 80 ? "default" : "navy"}
            trend={
              coveragePct >= 80
                ? { direction: "up", text: t("adm_stat_coverage_ok") }
                : { direction: "down", text: t("adm_stat_coverage_act") }
            }
          />
          <Stat
            label={t("adm_stat_week_shifts")}
            value={thisWeekMissions.length}
            hint={t("adm_stat_week_shifts_hint", { n: fullyStaffed })}
            icon={CalendarRange}
          />
          <Stat
            label={t("adm_stat_revenue")}
            value={fmt.euroShort(revenueWeek)}
            hint={t("adm_stat_revenue_hint")}
            icon={TrendingUp}
            variant="gold"
          />
        </section>

        <section className="grid gap-4 lg:gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            <div className="rounded-2xl border border-line bg-white overflow-hidden">
              <div className="flex items-center justify-between gap-2 border-b border-line px-4 lg:px-5 py-3 lg:py-3.5">
                <div className="min-w-0">
                  <h3 className="font-display text-base font-black tracking-tightest text-navy-900 truncate">
                    {t("adm_upcoming")}
                  </h3>
                  <p className="text-xs text-ink/55 truncate">
                    {t("adm_upcoming_desc", { n: Math.min(upcoming.length, 5) })}
                  </p>
                </div>
                <Link
                  href="/admin/missions"
                  className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-navy-700 hover:underline"
                >
                  {t("adm_all")}
                  <ArrowUpRight size={12} />
                </Link>
              </div>
              <ul className="divide-y divide-line">
                {upcoming.map((rawM) => {
                  const m = localizeMission(rawM);
                  const accepted = m.assignments.filter(
                    (a) => a.status === "geaccepteerd"
                  ).length;
                  return (
                    <li key={m.id}>
                      <Link
                        href={`/admin/missions/${m.id}`}
                        className="group flex items-center gap-3 lg:gap-4 px-4 lg:px-5 py-3 lg:py-3.5 hover:bg-canvas"
                      >
                        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                          <span className="text-[9px] font-bold uppercase tracking-widest">
                            {fmt.monthShort(m.startISO)}
                          </span>
                          <span className="font-display text-base font-black leading-none tabular">
                            {new Date(m.startISO).getDate()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="min-w-0 flex-1 truncate font-bold text-navy-900">
                              {m.title}
                            </span>
                            <MissionTypeBadge type={m.type} className="shrink-0 hidden sm:inline-flex" />
                          </div>
                          <div className="mt-0.5 truncate text-xs text-ink/55">
                            {m.client} · {m.city} · {fmt.timeRange(m.startISO, m.endISO)}
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-3">
                          <div className="text-right">
                            <div
                              className={cn(
                                "font-display text-sm font-black tabular",
                                accepted >= m.headcount
                                  ? "text-emerald-700"
                                  : "text-navy-900"
                              )}
                            >
                              {accepted}/{m.headcount}
                            </div>
                            <div className="text-[10px] font-semibold text-ink/50">
                              {t("adm_staffed_short")}
                            </div>
                          </div>
                          <div className="flex -space-x-2">
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
                            {accepted > 3 && (
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/15 text-[9px] font-bold text-ink ring-2 ring-white">
                                +{accepted - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {overCao.length > 0 && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 overflow-hidden">
                <div className="border-b border-amber-200 px-4 lg:px-5 py-3 flex items-center gap-2 text-amber-900">
                  <AlertTriangle size={16} />
                  <h3 className="font-display text-base font-black tracking-tight">
                    {t("adm_cao_warnings")}
                  </h3>
                </div>
                <ul className="divide-y divide-amber-200/80">
                  {overCao.map(({ employee, hours }) => (
                    <li key={employee.id}>
                      <Link
                        href={`/admin/employees/${employee.id}`}
                        className="flex items-center gap-3 px-4 lg:px-5 py-3 hover:bg-amber-100/40"
                      >
                        <Avatar
                          initials={employee.initials}
                          color={employee.avatarColor}
                          size="sm"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-navy-900">
                            {employee.firstName} {employee.lastName}
                          </div>
                          <div className="text-xs text-amber-900/70">
                            {t("adm_cao_thisweek", { a: fmt.hours(hours), b: employee.caoMaxHoursPerWeek })}
                          </div>
                        </div>
                        <div
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest",
                            hours > employee.caoMaxHoursPerWeek
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-200 text-amber-800"
                          )}
                        >
                          {hours > employee.caoMaxHoursPerWeek ? t("adm_cao_over") : t("adm_cao_close")}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-4 lg:space-y-6">
            <div className="rounded-2xl border border-line bg-white overflow-hidden">
              <div className="border-b border-line px-4 lg:px-5 py-3 lg:py-3.5">
                <h3 className="flex items-center gap-2 font-display text-base font-black tracking-tightest text-navy-900">
                  <Activity size={16} />
                  {t("adm_recent")}
                </h3>
              </div>
              {recent.length === 0 ? (
                <div className="px-4 lg:px-5 py-6 text-sm text-ink/55">
                  {t("adm_recent_empty")}
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {recent.map((n) => (
                    <li key={n.id} className="px-4 lg:px-5 py-3 lg:py-3.5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                          {n.kind === "geaccepteerd" ? (
                            <CheckCircle2 size={14} />
                          ) : n.kind === "nieuwe-opdracht" ? (
                            <Sparkles size={14} />
                          ) : (
                            <Briefcase size={14} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-navy-900">
                            {n.title}
                          </p>
                          <p className="truncate text-xs text-ink/55">
                            {n.body} · {fmt.timeAgo(n.createdAt, REFERENCE_TODAY)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-2xl bg-navy-700 p-4 lg:p-5 text-white overflow-hidden relative">
              <div className="absolute inset-0 dot-bg opacity-40" />
              <div className="relative">
                <h3 className="flex items-center gap-2 font-display text-base font-black tracking-tightest">
                  <ShieldCheck size={16} className="text-gold-400" />
                  {t("adm_quick")}
                </h3>
                <p className="mt-1 text-xs text-white/65">
                  {t("adm_quick_desc")}
                </p>
                <div className="mt-4 space-y-2">
                  <Link
                    href="/admin/missions/new"
                    className="flex items-center justify-between gap-2 rounded-xl bg-gold-400 px-3 lg:px-4 py-2.5 text-sm font-bold text-navy-900 transition hover:bg-gold-300"
                  >
                    <span className="truncate">{t("adm_quick_new")}</span>
                    <ArrowUpRight size={14} className="shrink-0" />
                  </Link>
                  <Link
                    href="/admin/planning"
                    className="flex items-center justify-between gap-2 rounded-xl bg-white/10 px-3 lg:px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/15"
                  >
                    <span className="truncate">{t("adm_quick_planning")}</span>
                    <ArrowUpRight size={14} className="shrink-0" />
                  </Link>
                  <Link
                    href="/admin/employees"
                    className="flex items-center justify-between gap-2 rounded-xl bg-white/10 px-3 lg:px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/15"
                  >
                    <span className="truncate">{t("adm_quick_employees")}</span>
                    <ArrowUpRight size={14} className="shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
