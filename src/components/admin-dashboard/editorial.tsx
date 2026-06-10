"use client";

import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { AdminTopbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { useT, useFormat, useLocalized } from "@/lib/i18n";
import { REFERENCE_TODAY } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useAdminDashboardData } from "./shared";

/**
 * Editorial admin dashboard — Build in Amsterdam premium magazine treatment.
 * Ivory canvas, Fraunces serif, hairline rows, no rounded cards.
 */
export function AdminDashboardEditorial() {
  const { t } = useT();
  const fmt = useFormat();
  const { mission: localizeMission } = useLocalized();
  const data = useAdminDashboardData();
  const {
    openCount,
    invitedCount,
    fullyStaffed,
    coveragePct,
    totalAccepted,
    totalHeadcountNeeded,
    thisWeekMissions,
    revenueWeek,
    upcoming,
    recent,
    overCao,
  } = data;

  return (
    <>
      <AdminTopbar
        title={t("adm_overview_title")}
        description={t("adm_overview_desc")}
        action={
          <Link href="/admin/missions/new">
            <Button size="md" className="!gap-1.5 !rounded-none">
              <Plus size={16} />
              {t("adm_new_assignment")}
            </Button>
          </Link>
        }
      />

      <div className="bg-ivory min-h-screen">
        <div className="px-4 lg:px-8 py-6 lg:py-10 space-y-10 max-w-screen-xl mx-auto">
          {/* Stats — hairline rows */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-navy-900/15 border-y border-navy-900/15">
            <EditorialStat
              label={t("adm_stat_open_shifts")}
              value={openCount + invitedCount}
              hint={t("adm_stat_open_hint", { a: openCount, b: invitedCount })}
            />
            <EditorialStat
              label={t("adm_stat_coverage")}
              value={`${coveragePct}%`}
              hint={t("adm_stat_coverage_hint", { a: totalAccepted, b: totalHeadcountNeeded })}
            />
            <EditorialStat
              label={t("adm_stat_week_shifts")}
              value={thisWeekMissions.length}
              hint={t("adm_stat_week_shifts_hint", { n: fullyStaffed })}
            />
            <EditorialStat
              label={t("adm_stat_revenue")}
              value={fmt.euroShort(revenueWeek)}
              hint={t("adm_stat_revenue_hint")}
            />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            <div className="lg:col-span-2 space-y-10 min-w-0">
              {/* Upcoming missions — magazine table */}
              <div>
                <div className="flex items-end justify-between border-b border-navy-900/15 pb-3 mb-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600">
                      / {t("adm_upcoming")}
                    </div>
                    <h2 className="mt-1 font-serif text-2xl font-semibold tracking-[-0.02em] text-navy-900">
                      {t("adm_upcoming_desc", { n: Math.min(upcoming.length, 5) })}
                    </h2>
                  </div>
                  <Link
                    href="/admin/missions"
                    className="text-xs font-semibold text-navy-900 underline-offset-4 hover:underline"
                  >
                    {t("adm_all")}
                  </Link>
                </div>
                <ul className="divide-y divide-navy-900/15">
                  {upcoming.map((rawM) => {
                    const m = localizeMission(rawM);
                    const accepted = m.assignments.filter((a) => a.status === "geaccepteerd").length;
                    return (
                      <li key={m.id}>
                        <Link
                          href={`/admin/missions/${m.id}`}
                          className="group grid grid-cols-12 gap-3 items-center py-5 hover:bg-gold-400/10 -mx-2 px-2"
                        >
                          <div className="col-span-2 font-serif italic text-navy-900/70 text-sm">
                            {fmt.monthShort(m.startISO)} {new Date(m.startISO).getDate()}
                          </div>
                          <div className="col-span-6 min-w-0">
                            <div className="truncate font-serif text-lg text-navy-900 group-hover:underline underline-offset-4">
                              {m.title}
                            </div>
                            <div className="truncate text-xs text-gold-600 mt-0.5">
                              {m.client} · {m.city} · {fmt.timeRange(m.startISO, m.endISO)}
                            </div>
                          </div>
                          <div className="col-span-4 text-right">
                            <div
                              className={cn(
                                "font-serif text-xl tabular",
                                accepted >= m.headcount ? "text-emerald-700" : "text-navy-900"
                              )}
                            >
                              {accepted}/{m.headcount}
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600 mt-0.5">
                              {t("adm_staffed_short")}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {overCao.length > 0 && (
                <div className="border-t border-navy-900/15 pt-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-amber-800">
                    / {t("adm_cao_warnings")}
                  </div>
                  <ul className="mt-4 divide-y divide-navy-900/15">
                    {overCao.map(({ employee, hours }) => (
                      <li key={employee.id}>
                        <Link
                          href={`/admin/employees/${employee.id}`}
                          className="group grid grid-cols-12 gap-3 items-center py-4 hover:bg-gold-400/10 -mx-2 px-2"
                        >
                          <div className="col-span-7 min-w-0">
                            <div className="font-serif text-base text-navy-900 group-hover:underline underline-offset-4">
                              {employee.firstName} {employee.lastName}
                            </div>
                            <div className="text-xs text-gold-600 mt-0.5 italic font-serif">
                              {t("adm_cao_thisweek", { a: fmt.hours(hours), b: employee.caoMaxHoursPerWeek })}
                            </div>
                          </div>
                          <div className="col-span-5 text-right">
                            <span
                              className={cn(
                                "inline-block text-[10px] font-bold uppercase tracking-[0.32em]",
                                hours > employee.caoMaxHoursPerWeek ? "text-red-700" : "text-amber-800"
                              )}
                            >
                              {hours > employee.caoMaxHoursPerWeek ? t("adm_cao_over") : t("adm_cao_close")}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="space-y-10 min-w-0">
              {/* Recent activity */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600 border-b border-navy-900/15 pb-3">
                  / {t("adm_recent")}
                </div>
                {recent.length === 0 ? (
                  <p className="mt-4 font-serif italic text-navy-900/70">{t("adm_recent_empty")}</p>
                ) : (
                  <ul className="mt-4 divide-y divide-navy-900/15">
                    {recent.map((n) => (
                      <li key={n.id} className="py-4">
                        <p className="font-serif text-base text-navy-900 leading-snug">
                          {n.title}
                        </p>
                        <p className="mt-1 text-xs text-gold-600 italic font-serif">
                          {n.body} · {fmt.timeAgo(n.createdAt, REFERENCE_TODAY)}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Quick actions */}
              <div className="border-t border-navy-900/15 pt-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600">
                  / {t("adm_quick")}
                </div>
                <p className="mt-2 font-serif italic text-navy-900/70 leading-snug">
                  {t("adm_quick_desc")}
                </p>
                <ul className="mt-5 space-y-4">
                  <li>
                    <Link
                      href="/admin/missions/new"
                      className="group flex items-center justify-between border-b border-gold-400 pb-2 text-navy-900"
                    >
                      <span className="font-serif text-lg">{t("adm_quick_new")}</span>
                      <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/planning"
                      className="group flex items-center justify-between border-b border-navy-900/15 pb-2 text-navy-900"
                    >
                      <span className="font-serif text-lg">{t("adm_quick_planning")}</span>
                      <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/employees"
                      className="group flex items-center justify-between border-b border-navy-900/15 pb-2 text-navy-900"
                    >
                      <span className="font-serif text-lg">{t("adm_quick_employees")}</span>
                      <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </>
  );
}

function EditorialStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="bg-ivory p-5">
      <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600">
        {label}
      </div>
      <div className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em] text-navy-900 tabular">
        {value}
      </div>
      {hint && (
        <div className="mt-1 text-xs text-gold-600 italic font-serif">{hint}</div>
      )}
    </div>
  );
}
