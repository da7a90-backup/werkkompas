"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { hoursBetween } from "@/lib/utils";
import { useT, useFormat, useLocalized } from "@/lib/i18n";
import { useEmployeeDashboardData } from "./shared";

/**
 * Editorial employee dashboard — Build in Amsterdam premium magazine treatment.
 * Ivory canvas, Fraunces serif, hairline table rows, no rounded cards.
 */
export function EmployeeDashboardEditorial() {
  const { t } = useT();
  const fmt = useFormat();
  const { cert: localizeCert, mission: localizeMission } = useLocalized();
  const data = useEmployeeDashboardData();
  if (!data.employee) return null;
  const { employee, upcoming, myInvitations, weeklyHours, contract, pct, availableThisWeek, nextMission, greeting } = data;

  return (
    <div className="bg-ivory min-h-screen">
      <div className="container-mobile py-5 space-y-10">
        {/* Editorial hero */}
        <section>
          <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600">
            {greeting} — {employee.city}
          </div>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-[1.05] text-navy-900">
            {t("e_ready_week", { name: employee.firstName })}
          </h1>
          <p className="mt-3 font-serif italic text-navy-900/70 leading-snug">
            {upcoming.length === 0
              ? t("e_no_upcoming")
              : upcoming.length === 1
                ? t("e_upcoming_count_one")
                : t("e_upcoming_count_other", { n: upcoming.length })}
          </p>
          <div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold">
            <Link href="/employee/missions" className="inline-flex items-center gap-1.5 border-b-2 border-gold-400 pb-1 text-navy-900 hover:text-navy-700">
              {t("e_view_shifts")} <ArrowRight size={14} />
            </Link>
            <Link href="/employee/availability" className="text-navy-900/70 underline-offset-4 hover:underline">
              {t("e_availability_btn")}
            </Link>
          </div>
        </section>

        {nextMission && (
          <section className="border-y border-navy-900/15 py-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600">
              / {t("e_next_shift")}
            </div>
            <Link href={`/employee/missions/${nextMission.id}`} className="group mt-4 block">
              <div className="font-serif italic text-navy-900/70">
                {fmt.dayLong(nextMission.startISO)} · {fmt.timeRange(nextMission.startISO, nextMission.endISO)}
              </div>
              <h2 className="mt-1 font-serif text-2xl font-semibold tracking-[-0.02em] text-navy-900 group-hover:underline underline-offset-4">
                {nextMission.title}
              </h2>
              <div className="mt-1 text-sm text-navy-900/70">
                {nextMission.client} · {nextMission.location}, {nextMission.city}
              </div>
              <dl className="mt-5 grid grid-cols-3 gap-6 border-t border-navy-900/15 pt-5">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600">{t("e_label_rate")}</dt>
                  <dd className="mt-1 font-serif text-2xl text-navy-900 tabular">{fmt.euro(nextMission.hourlyRate)}/{t("hours_unit")}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600">{t("e_label_earnings")}</dt>
                  <dd className="mt-1 font-serif text-2xl text-navy-900 tabular">
                    {fmt.euro(hoursBetween(nextMission.startISO, nextMission.endISO) * nextMission.hourlyRate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600">{t("e_label_type")}</dt>
                  <dd className="mt-1 font-serif italic text-xl text-navy-900">{t(`mtype_${nextMission.type}`)}</dd>
                </div>
              </dl>
            </Link>
          </section>
        )}

        <section className="grid grid-cols-2 gap-8 border-t border-navy-900/15 pt-6">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600">{t("e_avail_this_week")}</div>
            <div className="mt-3 font-serif text-5xl font-semibold tracking-[-0.02em] text-navy-900 tabular">
              {availableThisWeek}<span className="font-serif italic text-3xl text-navy-900/45">/7</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600">{t("e_week_label")}</div>
            <div className="mt-3 font-serif text-5xl font-semibold tracking-[-0.02em] text-navy-900 tabular">
              {fmt.hours(weeklyHours)}<span className="font-serif italic text-2xl text-navy-900/45"> / {contract}{t("hours_unit")}</span>
            </div>
            <div className="mt-2 h-px bg-navy-900/15 relative">
              <span className="absolute left-0 top-0 h-px bg-navy-900" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.32em] text-gold-600">{t("e_pct_contract", { n: pct })}</div>
          </div>
        </section>

        {myInvitations.length > 0 && (
          <section className="border-t border-navy-900/15 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600">
                / {t("e_new_invites", { n: myInvitations.length })}
              </div>
              <Link href="/employee/missions" className="text-xs font-semibold text-navy-900 underline-offset-4 hover:underline">
                {t("e_all")}
              </Link>
            </div>
            <ul className="divide-y divide-navy-900/15">
              {myInvitations.slice(0, 3).map((rawM) => {
                const m = localizeMission(rawM);
                return (
                  <li key={m.id}>
                    <Link href={`/employee/missions/${m.id}`} className="group grid grid-cols-12 gap-3 py-5 items-center hover:bg-gold-400/10 -mx-2 px-2">
                      <div className="col-span-2 font-serif italic text-navy-900/70 text-sm">
                        {fmt.monthShort(m.startISO)} {new Date(m.startISO).getDate()}
                      </div>
                      <div className="col-span-7 min-w-0">
                        <div className="truncate font-serif text-lg text-navy-900 group-hover:underline underline-offset-4">{m.title}</div>
                        <div className="truncate text-xs text-gold-600 mt-0.5">{m.client} · {m.city}</div>
                      </div>
                      <div className="col-span-3 text-right text-sm text-navy-900 tabular">
                        {fmt.timeRange(m.startISO, m.endISO)}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <section className="border-t border-navy-900/15 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600">
              / {t("e_upcoming_shifts")}
            </div>
            <Link href="/employee/missions" className="text-xs font-semibold text-navy-900 underline-offset-4 hover:underline">
              {t("e_all")}
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="font-serif italic text-navy-900/70">{t("e_empty_confirmed")}</p>
          ) : (
            <ul className="divide-y divide-navy-900/15">
              {upcoming.slice(0, 4).map((rawM) => {
                const m = localizeMission(rawM);
                return (
                  <li key={m.id}>
                    <Link href={`/employee/missions/${m.id}`} className="group grid grid-cols-12 gap-3 py-5 items-center hover:bg-gold-400/10 -mx-2 px-2">
                      <div className="col-span-2 font-serif italic text-navy-900/70 text-sm">
                        {fmt.monthShort(m.startISO)} {new Date(m.startISO).getDate()}
                      </div>
                      <div className="col-span-7 min-w-0">
                        <div className="truncate font-serif text-lg text-navy-900 group-hover:underline underline-offset-4">{m.title}</div>
                        <div className="truncate text-xs text-gold-600 mt-0.5">{m.client} · {m.city}</div>
                      </div>
                      <div className="col-span-3 text-right text-sm text-navy-900 tabular">
                        {fmt.timeRange(m.startISO, m.endISO)}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="border-t border-navy-900/15 pt-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-600">
            / {t("e_my_certs")}
          </div>
          <p className="mt-2 font-serif italic text-navy-900/70">{t("e_certs_desc")}</p>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 gap-x-6 border-t border-navy-900/15 pt-4">
            {employee.certifications.map((c) => (
              <li key={c} className="font-serif text-base text-navy-900 flex items-baseline gap-2">
                <span className="text-gold-600">·</span>
                {localizeCert(c)}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
