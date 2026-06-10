"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AlertTriangle,
  Banknote,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock,
  FileText,
  MapPin,
  Plus,
  ShieldCheck,
  Trash2,
  UserMinus,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { AdminTopbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import {
  cn,
  hoursBetween,
} from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { MissionStatusBadge, MissionTypeBadge } from "@/components/ui/Badge";
import { Sheet } from "@/components/ui/Sheet";
import { useT, useFormat, useLocalized } from "@/lib/i18n";

export default function AdminMissionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { missions, employees, dispatch, checkCaoConflict } = useStore();
  const { t } = useT();
  const fmt = useFormat();
  const { mission: localizeMission, cert: localizeCert } = useLocalized();
  const [inviteOpen, setInviteOpen] = useState(false);

  const rawMission = missions.find((m) => m.id === id);
  const mission = rawMission ? localizeMission(rawMission) : undefined;

  const employeeMap = useMemo(
    () => new Map(employees.map((e) => [e.id, e])),
    [employees]
  );

  if (!mission) {
    return (
      <div className="p-6 text-sm text-ink/60">{t("adm_no_assignment")}</div>
    );
  }

  const accepted = mission.assignments.filter((a) => a.status === "geaccepteerd");
  const declined = mission.assignments.filter((a) => a.status === "afgewezen");
  const pendingInvited = mission.invitedEmployeeIds
    .filter((id) => !mission.assignments.some((a) => a.employeeId === id))
    .map((id) => employeeMap.get(id))
    .filter(Boolean);

  const totalHours = hoursBetween(mission.startISO, mission.endISO);
  const totalPay = totalHours * mission.hourlyRate;

  const eligibleForInvite = employees
    .filter(
      (e) =>
        e.status === "actief" &&
        !mission.invitedEmployeeIds.includes(e.id) &&
        mission.requiredCertifications.every((c) =>
          e.certifications.includes(c)
        )
    )
    .map((e) => ({ employee: e, cao: checkCaoConflict(e.id, mission.id) }));

  return (
    <>
      <AdminTopbar
        title={t("adm_assignment_title")}
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
          <section className="rounded-2xl border border-line bg-white overflow-hidden">
            <div className="relative isolate overflow-hidden bg-navy-700 p-6 text-white">
              <div className="absolute inset-0 dot-bg opacity-40" />
              <div
                className="absolute -right-12 -top-12 h-56 w-56 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(239,191,4,0.32), rgba(239,191,4,0))",
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-2">
                  <MissionTypeBadge
                    type={mission.type}
                    className="bg-white/10 border-white/15 text-white"
                  />
                  <MissionStatusBadge status={mission.status} />
                </div>
                <h1 className="mt-3 font-display text-3xl font-black tracking-tightest text-balance">
                  {mission.title}
                </h1>
                <p className="mt-1 text-sm text-white/70">
                  {mission.client} · {mission.location}, {mission.city}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-line sm:grid-cols-4">
              <div className="p-4">
                <Calendar size={14} className="text-navy-700/70" />
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-ink/55">
                  {t("adm_field_date")}
                </div>
                <div className="font-display text-base font-black tracking-tight text-navy-900 capitalize">
                  {fmt.dayLong(mission.startISO)}
                </div>
              </div>
              <div className="p-4">
                <Clock size={14} className="text-navy-700/70" />
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-ink/55">
                  {t("adm_field_time")}
                </div>
                <div className="font-display text-base font-black text-navy-900 tabular">
                  {fmt.timeRange(mission.startISO, mission.endISO)}
                </div>
              </div>
              <div className="p-4">
                <Banknote size={14} className="text-navy-700/70" />
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-ink/55">
                  {t("adm_field_rate")}
                </div>
                <div className="font-display text-base font-black text-navy-900 tabular">
                  {fmt.euro(mission.hourlyRate)}/{t("hours_unit")}
                </div>
              </div>
              <div className="p-4">
                <Users size={14} className="text-navy-700/70" />
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-ink/55">
                  {t("adm_field_staffing")}
                </div>
                <div className="font-display text-base font-black text-navy-900 tabular">
                  {accepted.length}/{mission.headcount}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/55">
                <Users size={12} />
                {t("adm_assigned_workers")}
              </h2>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setInviteOpen(true)}
                className="!gap-1"
              >
                <UserPlus size={14} />
                {t("adm_invite")}
              </Button>
            </div>

            {accepted.length === 0 && pendingInvited.length === 0 && (
              <p className="mt-3 rounded-xl bg-canvas/60 p-4 text-sm text-ink/55">
                {t("adm_no_assignments")}
              </p>
            )}

            {accepted.length > 0 && (
              <div className="mt-3">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                  {t("adm_section_confirmed")} — {accepted.length}
                </div>
                <ul className="space-y-2">
                  {accepted.map((a) => {
                    const e = employeeMap.get(a.employeeId);
                    if (!e) return null;
                    const cao = checkCaoConflict(e.id, mission.id);
                    return (
                      <li
                        key={a.employeeId}
                        className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/40 p-3"
                      >
                        <Avatar
                          initials={e.initials}
                          color={e.avatarColor}
                          size="sm"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-navy-900">
                            {e.firstName} {e.lastName}
                          </div>
                          <div className="text-xs text-ink/55">
                            {e.city} · {t("adm_cao_thisweek", { a: fmt.hours(cao.weeklyHours), b: e.caoMaxHoursPerWeek })}
                          </div>
                        </div>
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        <button
                          onClick={() =>
                            dispatch({
                              type: "UNINVITE_EMPLOYEE",
                              payload: { missionId: mission.id, employeeId: e.id },
                            })
                          }
                          className="rounded-lg p-1.5 text-ink/40 hover:bg-red-50 hover:text-red-600"
                          aria-label={t("adm_remove_from")}
                        >
                          <UserMinus size={14} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {pendingInvited.length > 0 && (
              <div className="mt-4">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-navy-700">
                  {t("adm_section_pending")} — {pendingInvited.length}
                </div>
                <ul className="space-y-2">
                  {pendingInvited.map((e) => {
                    if (!e) return null;
                    const cao = checkCaoConflict(e.id, mission.id);
                    return (
                      <li
                        key={e.id}
                        className="flex items-center gap-3 rounded-xl border border-line bg-white p-3"
                      >
                        <Avatar
                          initials={e.initials}
                          color={e.avatarColor}
                          size="sm"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-navy-900">
                            {e.firstName} {e.lastName}
                          </div>
                          <div className="text-xs text-ink/55">
                            {e.city} · {fmt.hours(cao.weeklyHours)} / {e.caoMaxHoursPerWeek}{t("hours_unit")}
                          </div>
                        </div>
                        {cao.overCao && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-700">
                            <AlertTriangle size={10} />
                            {t("adm_cao_over")}
                          </span>
                        )}
                        <span className="rounded-md bg-navy-50 px-2 py-0.5 text-[10px] font-bold text-navy-700">
                          {t("adm_waiting")}
                        </span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "UNINVITE_EMPLOYEE",
                              payload: { missionId: mission.id, employeeId: e.id },
                            })
                          }
                          className="rounded-lg p-1.5 text-ink/40 hover:bg-red-50 hover:text-red-600"
                          aria-label={t("adm_remove_invite")}
                        >
                          <UserMinus size={14} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {declined.length > 0 && (
              <div className="mt-4">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-700">
                  {t("adm_section_declined")} — {declined.length}
                </div>
                <ul className="space-y-2">
                  {declined.map((a) => {
                    const e = employeeMap.get(a.employeeId);
                    if (!e) return null;
                    return (
                      <li
                        key={a.employeeId}
                        className="flex items-center gap-3 rounded-xl border border-line bg-canvas/60 p-3 opacity-70"
                      >
                        <Avatar
                          initials={e.initials}
                          color={e.avatarColor}
                          size="sm"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-navy-900">
                            {e.firstName} {e.lastName}
                          </div>
                          <div className="text-xs text-ink/55">
                            {t("adm_declined_text")}
                          </div>
                        </div>
                        <XCircle size={16} className="text-red-500" />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>

          <section className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-5">
              <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/55">
                <Building2 size={12} />
                {t("adm_field_location")}
              </h2>
              <p className="mt-2 font-bold text-navy-900">{mission.location}</p>
              <p className="text-sm text-ink/65">{mission.address}, {mission.city}</p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/55">
                <ShieldCheck size={12} />
                {t("adm_required_certs")}
              </h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {mission.requiredCertifications.map((c) => (
                  <span
                    key={c}
                    className="rounded-md bg-navy-50 px-2 py-1 text-[11px] font-bold text-navy-700"
                  >
                    {localizeCert(c)}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/55">
              <FileText size={12} />
              {t("adm_field_descr_inst")}
            </h2>
            <div className="mt-3 space-y-3 text-sm text-ink/80 leading-relaxed">
              <p>{mission.description}</p>
              <p className="rounded-xl bg-canvas/60 p-3">{mission.instructions}</p>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl bg-navy-700 p-5 text-white">
            <h3 className="font-display text-base font-black tracking-tightest">
              {t("adm_financial")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-white/65">{t("adm_hourly_rate")}</span>
                <span className="font-bold tabular">
                  {fmt.euro(mission.hourlyRate)}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-white/65">{t("adm_field_duration")}</span>
                <span className="font-bold tabular">{fmt.hours(totalHours)}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-white/65">{t("adm_per_worker")}</span>
                <span className="font-bold tabular">
                  {fmt.euro(totalPay)}
                </span>
              </li>
              <li className="flex items-center justify-between border-t border-white/15 pt-2">
                <span className="font-bold">{t("adm_total_cost")}</span>
                <span className="font-display text-lg font-black tabular text-gold-400">
                  {fmt.euro(totalPay * mission.headcount)}
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display text-base font-black tracking-tightest text-navy-900">
              {t("adm_progress")}
            </h3>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-ink/55">{t("adm_field_staffing")}</span>
                <span className="text-navy-900 tabular">
                  {accepted.length}/{mission.headcount}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-canvas">
                <div
                  className={cn(
                    "h-full rounded-full",
                    accepted.length >= mission.headcount
                      ? "bg-emerald-500"
                      : "bg-navy-700"
                  )}
                  style={{
                    width: `${Math.min(100, (accepted.length / mission.headcount) * 100)}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs font-bold pt-2">
                <span className="text-ink/55">{t("adm_invited_count")}</span>
                <span className="text-navy-900 tabular">
                  {mission.invitedEmployeeIds.length}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-ink/55">{t("adm_pending_count")}</span>
                <span className="text-navy-900 tabular">
                  {pendingInvited.length}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm(t("adm_confirm_delete"))) {
                dispatch({ type: "DELETE_MISSION", payload: { id: mission.id } });
                router.push("/admin/missions");
              }
            }}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-2xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} />
            {t("adm_delete_assignment")}
          </button>
        </aside>
      </div>

      <Sheet
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title={t("adm_invite_sheet_title")}
        description={t("adm_invite_sheet_desc", { title: mission.title })}
        size="lg"
      >
        <ul className="divide-y divide-line">
          {eligibleForInvite.length === 0 && (
            <li className="p-6 text-center text-sm text-ink/60">
              {t("adm_invite_sheet_empty")}
            </li>
          )}
          {eligibleForInvite.map(({ employee: e, cao }) => (
            <li key={e.id}>
              <button
                onClick={() => {
                  dispatch({
                    type: "INVITE_EMPLOYEE",
                    payload: { missionId: mission.id, employeeId: e.id },
                  });
                }}
                className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-canvas"
              >
                <Avatar initials={e.initials} color={e.avatarColor} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-navy-900">
                    {e.firstName} {e.lastName}
                  </div>
                  <div className="text-xs text-ink/55">
                    {t("adm_emp_contract_meta", { city: e.city, n: e.contractHoursPerWeek })}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {e.certifications.slice(0, 3).map((c) => (
                      <span
                        key={c}
                        className="rounded bg-navy-50 px-1.5 py-0.5 text-[10px] font-bold text-navy-700"
                      >
                        {localizeCert(c)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  {cao.overCao && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-700">
                      <AlertTriangle size={10} />
                      {t("adm_cao_over")}
                    </span>
                  )}
                  {!cao.overCao && cao.overContract && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                      {t("adm_over_contract")}
                    </span>
                  )}
                  <div className="mt-1 text-[11px] text-ink/55 tabular">
                    {fmt.hours(cao.weeklyHours)} / {e.caoMaxHoursPerWeek}{t("hours_unit")}
                  </div>
                </div>
                <span className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gold-400 text-navy-900">
                  <Plus size={16} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Sheet>
    </>
  );
}
