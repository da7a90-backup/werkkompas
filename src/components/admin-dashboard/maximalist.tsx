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
 * Maximalist admin dashboard — Random Studio kinetic + Studio Dumbar poster art.
 * Oversized numerals, full-bleed colour blocks, rotated cards, [BRACKETED] labels.
 */
export function AdminDashboardMaximalist() {
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
            <Button size="md" className="!gap-1.5 !rounded-none !ring-2 !ring-navy-900">
              <Plus size={16} />
              {t("adm_new_assignment")}
            </Button>
          </Link>
        }
      />

      <div className="bg-canvas pb-10">
        {/* Hero poster panel — Open shifts as giant readout */}
        <section className="relative overflow-hidden bg-navy-900 text-white px-5 lg:px-8 pt-7 pb-10">
          <div className="pointer-events-none absolute -right-12 -bottom-12 h-40 w-40 bg-gold-400/25 rotate-12" />
          <div className="relative grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 lg:col-span-7">
              <span className="inline-flex bg-gold-400 text-navy-900 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.22em] ring-2 ring-navy-900">
                [ {t("adm_stat_open_shifts")} ]
              </span>
              <div className="mt-3 font-poster text-[clamp(5rem,18vw,12rem)] leading-[0.85] tracking-tight uppercase text-gold-400 tabular">
                {openCount + invitedCount}
              </div>
              <p className="font-poster text-lg lg:text-xl uppercase tracking-tight text-white/80">
                [ {t("adm_stat_open_hint", { a: openCount, b: invitedCount })} ]
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 grid grid-cols-3 gap-2">
              <MaxStat
                label={t("adm_stat_coverage")}
                value={`${coveragePct}%`}
                tone="gold"
              />
              <MaxStat
                label={t("adm_stat_week_shifts")}
                value={String(thisWeekMissions.length)}
                tone="canvas"
              />
              <MaxStat
                label={t("adm_stat_revenue")}
                value={fmt.euroShort(revenueWeek)}
                tone="gold"
              />
            </div>
          </div>
        </section>

        <div className="px-5 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5 min-w-0">
            {/* Upcoming as rotated poster cards */}
            <section>
              <h2 className="font-poster text-2xl uppercase tracking-tight text-navy-900 mb-3">
                [ {t("adm_upcoming")} ]
                <Link
                  href="/admin/missions"
                  className="ml-3 align-middle text-[10px] font-extrabold uppercase tracking-[0.22em] text-navy-900 underline"
                >
                  {t("adm_all")}
                </Link>
              </h2>
              <div className="space-y-3">
                {upcoming.map((rawM, i) => {
                  const m = localizeMission(rawM);
                  const accepted = m.assignments.filter((a) => a.status === "geaccepteerd").length;
                  const variants = [
                    "bg-gold-400 text-navy-900 -rotate-1",
                    "bg-navy-900 text-gold-400 rotate-1",
                    "bg-canvas text-navy-900 -rotate-1",
                    "bg-gold-400 text-navy-900 rotate-1",
                    "bg-navy-900 text-gold-400 -rotate-1",
                  ];
                  return (
                    <Link
                      key={m.id}
                      href={`/admin/missions/${m.id}`}
                      className={cn(
                        "block p-4 ring-4 ring-navy-900 shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:rotate-0",
                        variants[i % variants.length]
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] opacity-70">
                            [ {fmt.monthShort(m.startISO)} {new Date(m.startISO).getDate()} · {fmt.timeRange(m.startISO, m.endISO)} ]
                          </div>
                          <div className="mt-1 font-poster text-lg uppercase tracking-tight leading-tight">
                            {m.title}
                          </div>
                          <div className="mt-1 text-xs font-semibold opacity-80">
                            {m.client} · {m.city}
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="font-poster text-2xl tabular leading-none">
                            {accepted}/{m.headcount}
                          </div>
                          <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] opacity-70 mt-1">
                            {t("adm_staffed_short")}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {overCao.length > 0 && (
              <section className="bg-red-600 text-white p-5 ring-4 ring-navy-900 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                <h2 className="font-poster text-xl uppercase tracking-tight">
                  [ {t("adm_cao_warnings")} ]
                </h2>
                <ul className="mt-3 space-y-2">
                  {overCao.map(({ employee, hours }) => (
                    <li key={employee.id}>
                      <Link
                        href={`/admin/employees/${employee.id}`}
                        className="flex items-center justify-between gap-3 bg-white text-navy-900 px-3 py-2.5 ring-2 ring-navy-900"
                      >
                        <div className="min-w-0">
                          <div className="font-poster text-sm uppercase tracking-tight">
                            {employee.firstName} {employee.lastName}
                          </div>
                          <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] opacity-70 mt-0.5">
                            {t("adm_cao_thisweek", { a: fmt.hours(hours), b: employee.caoMaxHoursPerWeek })}
                          </div>
                        </div>
                        <span
                          className={cn(
                            "shrink-0 px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.22em] ring-2 ring-navy-900",
                            hours > employee.caoMaxHoursPerWeek ? "bg-red-600 text-white" : "bg-gold-400 text-navy-900"
                          )}
                        >
                          [ {hours > employee.caoMaxHoursPerWeek ? t("adm_cao_over") : t("adm_cao_close")} ]
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="space-y-5 min-w-0">
            {/* Recent activity — gold poster panel */}
            <section className="bg-gold-400 text-navy-900 p-5 ring-4 ring-navy-900 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <h2 className="font-poster text-xl uppercase tracking-tight">
                [ {t("adm_recent")} ]
              </h2>
              {recent.length === 0 ? (
                <p className="mt-3 text-sm font-semibold">{t("adm_recent_empty")}</p>
              ) : (
                <ul className="mt-3 divide-y divide-navy-900/30">
                  {recent.map((n) => (
                    <li key={n.id} className="py-2.5">
                      <p className="font-poster text-sm uppercase tracking-tight leading-tight">
                        {n.title}
                      </p>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] opacity-70 mt-1">
                        {n.body} · {fmt.timeAgo(n.createdAt, REFERENCE_TODAY)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Quick actions — navy poster panel with rotated CTAs */}
            <section className="bg-navy-900 text-gold-400 p-5 ring-4 ring-navy-900 shadow-[8px_8px_0_0_rgba(239,191,4,1)]">
              <h2 className="font-poster text-xl uppercase tracking-tight">
                [ {t("adm_quick")} ]
              </h2>
              <p className="mt-2 text-xs font-semibold text-white/70">{t("adm_quick_desc")}</p>
              <div className="mt-4 space-y-3">
                <Link
                  href="/admin/missions/new"
                  className="block bg-gold-400 text-navy-900 px-3 py-2.5 ring-2 ring-navy-900 -rotate-1 transition hover:rotate-0"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-poster text-sm uppercase tracking-tight">[ {t("adm_quick_new")} ]</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
                <Link
                  href="/admin/planning"
                  className="block bg-canvas text-navy-900 px-3 py-2.5 ring-2 ring-navy-900 rotate-1 transition hover:rotate-0"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-poster text-sm uppercase tracking-tight">[ {t("adm_quick_planning")} ]</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
                <Link
                  href="/admin/employees"
                  className="block bg-gold-400 text-navy-900 px-3 py-2.5 ring-2 ring-navy-900 -rotate-1 transition hover:rotate-0"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-poster text-sm uppercase tracking-tight">[ {t("adm_quick_employees")} ]</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}

function MaxStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "gold" | "canvas";
}) {
  return (
    <div
      className={cn(
        "p-2.5 ring-2 ring-navy-900",
        tone === "gold" ? "bg-gold-400 text-navy-900" : "bg-canvas text-navy-900"
      )}
    >
      <div className="text-[8px] font-extrabold uppercase tracking-[0.22em] opacity-70">
        [ {label} ]
      </div>
      <div className="mt-1 font-poster text-xl uppercase tracking-tight tabular leading-none">
        {value}
      </div>
    </div>
  );
}
