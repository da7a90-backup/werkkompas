"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Award,
  Briefcase,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { AdminTopbar } from "@/components/admin/Topbar";
import { useStore } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";
import { Stat } from "@/components/ui/Stat";
import { EmployeeStatusBadge } from "@/components/ui/Badge";
import { hoursBetween, cn } from "@/lib/utils";
import { MissionCard } from "@/components/shared/MissionCard";
import { Button } from "@/components/ui/Button";
import { useT, useFormat, useLocalized } from "@/lib/i18n";

export default function AdminEmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    employees,
    missions,
    threads,
    hoursWorkedThisWeek,
    getEmployeeAvailability,
  } = useStore();
  const { t } = useT();
  const fmt = useFormat();
  const { cert: localizeCert } = useLocalized();

  const e = employees.find((x) => x.id === id);
  if (!e) return <div className="p-6 text-sm text-ink/60">{t("adm_not_found")}</div>;

  const myMissions = missions
    .filter((m) =>
      m.assignments.some((a) => a.employeeId === e.id && a.status === "geaccepteerd")
    )
    .sort((a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime());

  const week = hoursWorkedThisWeek(e.id);
  const overCao = week > e.caoMaxHoursPerWeek;
  const overContract = week > e.contractHoursPerWeek;
  const thread = threads.find((t) => t.employeeId === e.id);
  const av = getEmployeeAvailability(e.id);
  const availableDays = av
    ? av.entries.filter(
        (x) => x.state === "beschikbaar" || x.state === "voorkeur"
      ).length
    : 0;

  const totalEarnings = myMissions.reduce(
    (s, m) => s + hoursBetween(m.startISO, m.endISO) * m.hourlyRate,
    0
  );

  return (
    <>
      <AdminTopbar
        title={t("adm_emp_title")}
        action={
          <button
            onClick={() => router.back()}
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-navy-700 hover:bg-canvas"
          >
            <ChevronLeft size={16} />
            {t("back")}
          </button>
        }
      />
      <div className="p-4 lg:p-6 grid gap-4 lg:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <section className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="relative isolate overflow-hidden bg-navy-700 p-6 text-white">
              <div className="absolute inset-0 dot-bg opacity-40" />
              <div
                className="absolute -right-12 -top-12 h-56 w-56 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(184,146,74,0.32), rgba(184,146,74,0))",
                }}
              />
              <div className="relative flex items-center gap-5">
                <Avatar
                  initials={e.initials}
                  color={e.avatarColor}
                  size="xl"
                  ring
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <EmployeeStatusBadge status={e.status} />
                    {overCao && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2.5 py-0.5 text-[10px] font-bold text-red-200 ring-1 ring-red-300/30">
                        <AlertTriangle size={10} />
                        {t("adm_cao_over")}
                      </span>
                    )}
                  </div>
                  <h1 className="mt-1 font-display text-3xl font-black tracking-tightest">
                    {e.firstName} {e.lastName}
                  </h1>
                  <div className="mt-1 flex items-center gap-3 text-sm text-white/65">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} />
                      {e.city}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Star size={12} className="text-gold-400" />
                      <span className="tabular">{e.rating.toFixed(1)}</span>
                    </span>
                    <span className="text-white/50">
                      {t("adm_since_short", {
                        date: new Date(e.hireDate).toLocaleDateString(fmt.locale, {
                          month: "short",
                          year: "numeric",
                        }),
                      })}
                    </span>
                  </div>
                </div>
                {thread && (
                  <Link
                    href={`/admin/messages?employee=${e.id}`}
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gold-400 px-3 py-2 text-sm font-bold text-navy-900 hover:bg-gold-300"
                  >
                    <MessageCircle size={14} />
                    {t("adm_send_message")}
                  </Link>
                )}
              </div>
            </div>
            <ul className="grid grid-cols-2 divide-x divide-line sm:grid-cols-4">
              <li className="p-4">
                <Mail size={14} className="text-navy-700/70" />
                <div className="mt-1 truncate text-sm font-bold text-navy-900">
                  {e.email}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink/55">
                  {t("adm_email")}
                </div>
              </li>
              <li className="p-4">
                <Phone size={14} className="text-navy-700/70" />
                <div className="mt-1 text-sm font-bold text-navy-900 tabular">
                  {e.phone}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink/55">
                  {t("adm_phone")}
                </div>
              </li>
              <li className="p-4">
                <Calendar size={14} className="text-navy-700/70" />
                <div className="mt-1 text-sm font-bold text-navy-900 tabular">
                  {e.contractHoursPerWeek}{t("hours_unit")}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink/55">
                  {t("adm_contract_label")}
                </div>
              </li>
              <li className="p-4">
                <Award size={14} className="text-navy-700/70" />
                <div className="mt-1 text-sm font-bold text-navy-900 tabular">
                  {e.caoMaxHoursPerWeek}{t("hours_unit")}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink/55">
                  {t("adm_cao_limit")}
                </div>
              </li>
            </ul>
          </section>

          <section className="grid grid-cols-3 gap-3 sm:gap-4">
            <Stat
              label={t("adm_this_week_label")}
              value={fmt.hours(week)}
              hint={t("adm_of_contract", { n: e.contractHoursPerWeek })}
              icon={Calendar}
              variant={overCao ? "navy" : "default"}
            />
            <Stat
              label={t("adm_scheduled_shifts")}
              value={myMissions.length}
              hint={t("adm_confirmed_shifts")}
              icon={Briefcase}
            />
            <Stat
              label={t("adm_earnings")}
              value={fmt.euroShort(totalEarnings)}
              hint={t("adm_earnings_hint")}
              icon={Star}
              variant="gold"
            />
          </section>

          {(overCao || overContract) && (
            <div
              className={cn(
                "rounded-2xl border p-4 text-sm",
                overCao
                  ? "border-red-200 bg-red-50 text-red-900"
                  : "border-amber-200 bg-amber-50 text-amber-900"
              )}
            >
              <div className="flex items-start gap-2">
                <AlertTriangle
                  size={16}
                  className={cn(
                    "mt-0.5 shrink-0",
                    overCao ? "text-red-600" : "text-amber-600"
                  )}
                />
                <div>
                  <p className="font-bold">
                    {overCao ? t("adm_cao_exceeded") : t("adm_over_contract_label")}
                  </p>
                  <p className="mt-0.5">
                    {overCao
                      ? t("adm_employee_over_cao", {
                          name: e.firstName,
                          hours: fmt.hours(week),
                          cap: e.caoMaxHoursPerWeek,
                        })
                      : t("adm_employee_contract", {
                          h: e.contractHoursPerWeek,
                          c: e.caoMaxHoursPerWeek,
                        })}
                  </p>
                </div>
              </div>
            </div>
          )}

          <section>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-ink/55">
              {t("adm_confirmed_shifts")}
            </h3>
            {myMissions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-line bg-white p-6 text-center text-sm text-ink/55">
                {t("adm_no_confirmed")}
              </div>
            ) : (
              <div className="space-y-2">
                {myMissions.map((m) => (
                  <MissionCard
                    key={m.id}
                    mission={m}
                    href={`/admin/missions/${m.id}`}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-line bg-white p-5">
            <h3 className="flex items-center gap-2 font-display text-base font-black tracking-tight text-navy-900">
              <Award size={14} />
              {t("adm_certifications")}
            </h3>
            <ul className="mt-3 space-y-2">
              {e.certifications.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-3 rounded-xl border border-line bg-canvas/40 px-3 py-2.5"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-700 text-white">
                    <Award size={12} />
                  </div>
                  <span className="flex-1 text-sm font-bold text-navy-900">
                    {localizeCert(c)}
                  </span>
                  <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                    {t("adm_valid")}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <h3 className="flex items-center gap-2 font-display text-base font-black tracking-tight text-navy-900">
              <Calendar size={14} />
              {t("adm_availability_label")}
            </h3>
            <p className="mt-1 text-xs text-ink/55">
              {t("adm_avail_days_given", { n: availableDays })}
            </p>
            <Link
              href="/admin/planning"
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-xs font-bold text-navy-700 hover:bg-canvas"
            >
              <Calendar size={12} />
              {t("adm_see_in_planning")}
            </Link>
          </section>

          {thread && (
            <Link
              href="/admin/messages"
              className="block rounded-2xl border border-line bg-white p-5 hover:bg-canvas"
            >
              <h3 className="flex items-center gap-2 font-display text-base font-black tracking-tight text-navy-900">
                <MessageCircle size={14} />
                {t("adm_messages_label")}
              </h3>
              <p className="mt-1 text-xs text-ink/55">
                {thread.messages.length === 1
                  ? t("adm_msgs_count_singular", { n: thread.messages.length })
                  : t("adm_msgs_count_plural", { n: thread.messages.length })}
                {thread.unread > 0 && (
                  <span className="ml-1 font-bold text-gold-600">
                    · {t("adm_unread_count", { n: thread.unread })}
                  </span>
                )}
              </p>
            </Link>
          )}
        </aside>
      </div>
    </>
  );
}
