"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { hoursBetween } from "@/lib/utils";
import { useT, useFormat, useLocalized } from "@/lib/i18n";
import { useEmployeeDashboardData } from "./shared";
import { cn } from "@/lib/utils";

/**
 * Maximalist employee dashboard — Random Studio kinetic + Studio Dumbar poster art.
 * Full-bleed colour blocks, oversized numerical readouts, rotated cards.
 */
export function EmployeeDashboardMaximalist() {
  const { t } = useT();
  const fmt = useFormat();
  const { cert: localizeCert, mission: localizeMission } = useLocalized();
  const data = useEmployeeDashboardData();
  if (!data.employee) return null;
  const { employee, upcoming, myInvitations, weeklyHours, contract, pct, availableThisWeek, nextMission, greeting } = data;

  return (
    <div className="bg-canvas pb-10">
      {/* Hero poster panel */}
      <section className="relative overflow-hidden bg-gold-400 text-navy-900 px-5 pt-6 pb-8 ring-b-4 ring-navy-900">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 bg-navy-900 rotate-12" />
        <span className="inline-flex bg-navy-900 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-400 ring-2 ring-navy-900">
          [ {greeting} ]
        </span>
        <h1 className="font-poster mt-4 text-4xl sm:text-5xl leading-[0.9] tracking-tight uppercase">
          {t("e_ready_week", { name: employee.firstName })}
        </h1>
        <p className="mt-3 font-semibold text-sm text-navy-900/85">
          {upcoming.length === 0
            ? t("e_no_upcoming")
            : upcoming.length === 1
              ? t("e_upcoming_count_one")
              : t("e_upcoming_count_other", { n: upcoming.length })}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/employee/missions"
            className="inline-flex items-center gap-1.5 bg-navy-900 text-gold-400 px-4 py-2.5 text-xs font-extrabold uppercase tracking-tight ring-2 ring-navy-900 hover:-rotate-1 transition"
          >
            [ {t("e_view_shifts")} ]
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/employee/availability"
            className="inline-flex items-center gap-1.5 bg-canvas text-navy-900 px-4 py-2.5 text-xs font-extrabold uppercase tracking-tight ring-2 ring-navy-900 hover:rotate-1 transition"
          >
            <Calendar size={14} />
            [ {t("e_availability_btn")} ]
          </Link>
        </div>
      </section>

      <div className="px-5 mt-5 space-y-5">
        {nextMission && (
          <Link
            href={`/employee/missions/${nextMission.id}`}
            className="block bg-navy-900 text-white p-5 ring-4 ring-navy-900 shadow-[8px_8px_0_0_rgba(239,191,4,1)] -rotate-1 transition hover:rotate-0"
          >
            <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-400">
              [ {t("e_next_shift")} ]
            </div>
            <div className="mt-2 font-poster text-2xl uppercase tracking-tight">
              {fmt.timeRange(nextMission.startISO, nextMission.endISO)} · {fmt.dayLong(nextMission.startISO)}
            </div>
            <h3 className="mt-3 font-poster text-xl uppercase tracking-tight text-gold-400 leading-tight">
              {nextMission.title}
            </h3>
            <p className="mt-1 text-xs font-semibold text-white/75">
              {nextMission.client} · {nextMission.location}, {nextMission.city}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <Tile label={t("e_label_rate")} value={`${fmt.euro(nextMission.hourlyRate)}/${t("hours_unit")}`} />
              <Tile
                label={t("e_label_earnings")}
                value={fmt.euro(hoursBetween(nextMission.startISO, nextMission.endISO) * nextMission.hourlyRate)}
              />
              <Tile label={t("e_label_type")} value={t(`mtype_${nextMission.type}`).split(" ")[0]} />
            </div>
          </Link>
        )}

        <section className="grid grid-cols-2 gap-3">
          <div className="bg-gold-400 text-navy-900 p-4 ring-4 ring-navy-900 shadow-[6px_6px_0_0_rgba(0,0,0,1)] rotate-1">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] opacity-70">[ {t("e_avail_this_week")} ]</div>
            <div className="mt-2 font-poster text-5xl leading-none tabular">{availableThisWeek}<span className="text-2xl opacity-60">/7</span></div>
          </div>
          <div className="bg-canvas text-navy-900 p-4 ring-4 ring-navy-900 shadow-[6px_6px_0_0_rgba(0,0,0,1)] -rotate-1">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] opacity-70">[ {t("e_week_label")} ]</div>
            <div className="mt-2 font-poster text-4xl leading-none tabular">{fmt.hours(weeklyHours)}</div>
            <div className="mt-2 h-2 w-full bg-navy-900/15 ring-1 ring-navy-900">
              <div className="h-full bg-navy-900" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.22em] opacity-70">{t("e_pct_contract", { n: pct })}</div>
          </div>
        </section>

        {myInvitations.length > 0 && (
          <section>
            <h2 className="font-poster text-2xl uppercase tracking-tight text-navy-900 flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-gold-600" />
              [ {t("e_new_invites", { n: myInvitations.length })} ]
            </h2>
            <div className="space-y-3">
              {myInvitations.slice(0, 3).map((rawM, i) => {
                const m = localizeMission(rawM);
                const isOdd = i % 2 === 1;
                return (
                  <Link
                    key={m.id}
                    href={`/employee/missions/${m.id}`}
                    className={cn(
                      "block p-4 ring-4 ring-navy-900 shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:rotate-0",
                      isOdd ? "bg-navy-900 text-gold-400 rotate-1" : "bg-canvas text-navy-900 -rotate-1"
                    )}
                  >
                    <div className="font-poster text-lg uppercase tracking-tight leading-tight">{m.title}</div>
                    <div className="mt-1 text-xs font-semibold opacity-80">
                      {fmt.dayLong(m.startISO)} · {fmt.timeRange(m.startISO, m.endISO)}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section>
          <h2 className="font-poster text-2xl uppercase tracking-tight text-navy-900 mb-3">
            [ {t("e_upcoming_shifts")} ]
          </h2>
          {upcoming.length === 0 ? (
            <p className="text-sm font-semibold text-navy-900/70">{t("e_empty_confirmed")}</p>
          ) : (
            <div className="space-y-3">
              {upcoming.slice(0, 4).map((rawM, i) => {
                const m = localizeMission(rawM);
                const variants = [
                  "bg-gold-400 text-navy-900 -rotate-1",
                  "bg-navy-900 text-gold-400 rotate-1",
                  "bg-canvas text-navy-900 -rotate-1",
                  "bg-gold-400 text-navy-900 rotate-1",
                ];
                return (
                  <Link
                    key={m.id}
                    href={`/employee/missions/${m.id}`}
                    className={cn(
                      "block p-4 ring-4 ring-navy-900 shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:rotate-0",
                      variants[i % variants.length]
                    )}
                  >
                    <div className="font-poster text-lg uppercase tracking-tight leading-tight">{m.title}</div>
                    <div className="mt-1 text-xs font-semibold opacity-80">
                      {fmt.dayLong(m.startISO)} · {fmt.timeRange(m.startISO, m.endISO)}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section className="bg-navy-900 text-gold-400 p-5 ring-4 ring-navy-900 shadow-[8px_8px_0_0_rgba(239,191,4,1)]">
          <h2 className="font-poster text-xl uppercase tracking-tight">
            [ {t("e_my_certs")} ]
          </h2>
          <p className="mt-2 text-xs font-semibold text-white/65">{t("e_certs_desc")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {employee.certifications.map((c) => (
              <span
                key={c}
                className="inline-flex items-center bg-gold-400 text-navy-900 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-tight ring-2 ring-navy-900"
              >
                {localizeCert(c)}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas text-navy-900 p-2.5 ring-2 ring-gold-400">
      <div className="text-[8px] font-extrabold uppercase tracking-[0.22em] opacity-70">{label}</div>
      <div className="mt-1 font-poster text-sm uppercase tracking-tight tabular leading-none">{value}</div>
    </div>
  );
}
