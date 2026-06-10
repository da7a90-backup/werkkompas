"use client";

import { useState } from "react";
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
  ShieldCheck,
  X,
} from "lucide-react";
import { AppHeader } from "@/components/employee/AppHeader";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import {
  hoursBetween,
  cn,
} from "@/lib/utils";
import { MissionTypeBadge } from "@/components/ui/Badge";
import { useT, useFormat, useLocalized } from "@/lib/i18n";

export default function EmployeeMissionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { missions, session, dispatch, checkCaoConflict } = useStore();
  const { t } = useT();
  const fmt = useFormat();
  const { mission: localizeMission, cert: localizeCert } = useLocalized();
  const [confirming, setConfirming] = useState<"accept" | "decline" | null>(null);
  const rawMission = missions.find((m) => m.id === id);
  const mission = rawMission ? localizeMission(rawMission) : undefined;
  const empId = session.employeeId;

  if (!mission || !empId) {
    return (
      <main>
        <AppHeader variant="subpage" title={t("e_shift_title")} />
        <div className="container-mobile mt-6 text-sm text-ink/60">
          {t("e_no_shift")}
        </div>
      </main>
    );
  }

  const myAssignment = mission.assignments.find((a) => a.employeeId === empId);
  const isInvited = mission.invitedEmployeeIds.includes(empId);
  const cao = checkCaoConflict(empId, mission.id);
  const totalHours = hoursBetween(mission.startISO, mission.endISO);
  const totalPay = totalHours * mission.hourlyRate;

  const respond = (status: "geaccepteerd" | "afgewezen") => {
    dispatch({
      type: "RESPOND_MISSION",
      payload: { missionId: mission.id, employeeId: empId, status },
    });
    setConfirming(null);
  };

  return (
    <main className="animate-fade-in pb-32">
      <div
        className="relative isolate overflow-hidden bg-navy-700 text-white"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="absolute inset-0 dot-bg opacity-50" />
        <div
          className="absolute -right-12 -top-12 h-56 w-56 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(184,146,74,0.32), rgba(184,146,74,0))",
          }}
        />
        <div className="relative container-mobile flex h-14 items-center gap-2">
          <button
            onClick={() => router.back()}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-xl text-white hover:bg-white/10 focus-ring"
            aria-label={t("back")}
          >
            <ChevronLeft size={22} />
          </button>
          <span className="text-xs font-bold uppercase tracking-widest text-white/60">
            {t("e_shift_title")}
          </span>
        </div>
        <div className="relative container-mobile pb-6 pt-2">
          <div className="mb-3 flex items-center gap-2">
            <MissionTypeBadge type={mission.type} className="bg-white/10 border-white/15 text-white" />
            <span className="text-xs font-bold tabular text-white/65">
              {fmt.hours(totalHours)} · {fmt.euro(totalPay)}
            </span>
          </div>
          <h1 className="font-display text-3xl font-black tracking-tightest text-balance">
            {mission.title}
          </h1>
          <p className="mt-1 text-sm text-white/70">
            {mission.client}
          </p>
        </div>
      </div>

      <div className="container-mobile -mt-2 space-y-4">
        <section className="rounded-2xl border border-line bg-white overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-line">
            <div className="p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
                {t("adm_field_date")}
              </div>
              <div className="mt-1 font-display text-lg font-black tracking-tight text-navy-900 capitalize">
                {fmt.dayLong(mission.startISO)}
              </div>
            </div>
            <div className="p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
                {t("adm_field_time")}
              </div>
              <div className="mt-1 font-display text-lg font-black tracking-tight text-navy-900 tabular">
                {fmt.timeRange(mission.startISO, mission.endISO)}
              </div>
            </div>
          </div>
          <div className="border-t border-line p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                <MapPin size={16} />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-navy-900">{mission.location}</div>
                <div className="text-sm text-ink/65">
                  {mission.address}, {mission.city}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-line border-t border-line">
            <div className="p-3 text-center">
              <Banknote size={14} className="mx-auto text-navy-700/70" />
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-ink/50">
                {t("e_label_rate")}
              </div>
              <div className="font-display text-sm font-black text-navy-900 tabular">
                {fmt.euro(mission.hourlyRate)}
              </div>
            </div>
            <div className="p-3 text-center">
              <Clock size={14} className="mx-auto text-navy-700/70" />
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-ink/50">
                {t("adm_field_duration")}
              </div>
              <div className="font-display text-sm font-black text-navy-900 tabular">
                {fmt.hours(totalHours)}
              </div>
            </div>
            <div className="p-3 text-center">
              <Banknote size={14} className="mx-auto text-navy-700/70" />
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-ink/50">
                {t("e_label_earnings")}
              </div>
              <div className="font-display text-sm font-black text-navy-900 tabular">
                {fmt.euro(totalPay)}
              </div>
            </div>
          </div>
        </section>

        {cao.overContract && !cao.overCao && (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
            <div className="text-sm">
              <p className="font-bold">{t("e_warn_over_contract")}</p>
              <p className="mt-0.5 text-amber-800/85">
                {t("e_warn_over_contract_desc", {
                  hours: fmt.hours(cao.weeklyHours),
                  contract: cao.contractHours,
                  cao: cao.caoMax,
                })}
              </p>
            </div>
          </div>
        )}

        {cao.overCao && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-900">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-600" />
            <div className="text-sm">
              <p className="font-bold">{t("e_warn_over_cao")}</p>
              <p className="mt-0.5 text-red-800/85">
                {t("e_warn_over_cao_desc", {
                  hours: fmt.hours(cao.weeklyHours),
                  cao: cao.caoMax,
                })}
              </p>
            </div>
          </div>
        )}

        <section className="rounded-2xl border border-line bg-white p-5">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/55">
            <Building2 size={12} />
            {t("e_client")}
          </h2>
          <p className="mt-2 text-base font-bold text-navy-900">{mission.client}</p>
          <p className="text-sm text-ink/65">{mission.location} · {mission.city}</p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/55">
            <FileText size={12} />
            {t("e_descr")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/80">
            {mission.description}
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/55">
            <ShieldCheck size={12} />
            {t("e_instructions")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/80">
            {mission.instructions}
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/55">
            <Calendar size={12} />
            {t("e_req_certs")}
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {mission.requiredCertifications.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 rounded-lg bg-navy-50 px-2.5 py-1.5 text-xs font-bold text-navy-700"
              >
                <Check size={12} />
                {localizeCert(c)}
              </span>
            ))}
          </div>
        </section>

        <div className="text-[10px] text-ink/45 text-center pt-2 pb-3">
          {t("e_created_on", { date: new Date(mission.createdAt).toLocaleDateString(fmt.locale) })}
        </div>
      </div>

      {/* Sticky CTA */}
      {isInvited && (
        <div
          className="fixed inset-x-0 bottom-16 z-40 border-t border-line bg-white/95 backdrop-blur-md"
          style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
        >
          <div className="container-mobile py-3">
            {myAssignment?.status === "geaccepteerd" ? (
              <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 ring-1 ring-emerald-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <CheckCircle2 size={18} />
                </div>
                <div className="flex-1 text-sm">
                  <div className="font-bold text-emerald-900">{t("e_accepted")}</div>
                  <div className="text-xs text-emerald-800/70">
                    {t("e_see_you", { day: fmt.dayLong(mission.startISO) })}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => respond("afgewezen")}
                >
                  {t("e_cancel_accept")}
                </Button>
              </div>
            ) : myAssignment?.status === "afgewezen" ? (
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-red-50 px-4 py-3 ring-1 ring-red-100">
                <div className="text-sm">
                  <div className="font-bold text-red-900">{t("e_declined")}</div>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => respond("geaccepteerd")}
                >
                  {t("e_change_mind")}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => setConfirming("decline")}
                  className="!gap-1.5"
                >
                  <X size={16} />
                  {t("e_decline")}
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => setConfirming("accept")}
                  className="!gap-1.5 bg-gold-400 !text-navy-900 hover:!bg-gold-300"
                >
                  <Check size={16} />
                  {t("e_accept_shift")}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirm sheet */}
      {confirming && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setConfirming(null)}
          />
          <div className="relative w-full max-w-md rounded-t-3xl bg-white p-5 shadow-sheet animate-slide-up">
            <div
              className={cn(
                "mx-auto -mt-1 mb-3 h-1 w-12 rounded-full",
                "bg-ink/15"
              )}
            />
            <h3 className="font-display text-xl font-black tracking-tight text-navy-900">
              {confirming === "accept" ? t("e_confirm_accept") : t("e_confirm_decline")}
            </h3>
            <p className="mt-1 text-sm text-ink/65">
              {confirming === "accept"
                ? t("e_confirm_accept_desc", {
                    day: fmt.dayLong(mission.startISO),
                    time: fmt.timeRange(mission.startISO, mission.endISO),
                  })
                : t("e_confirm_decline_desc")}
            </p>
            {confirming === "accept" && cao.overCao && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-800">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-red-600" />
                {t("e_warn_cao_short", { cao: cao.caoMax })}
              </div>
            )}
            <div className="mt-5 flex items-center gap-2">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setConfirming(null)}
              >
                {t("cancel")}
              </Button>
              <Button
                variant={confirming === "accept" ? "primary" : "danger"}
                fullWidth
                onClick={() =>
                  respond(confirming === "accept" ? "geaccepteerd" : "afgewezen")
                }
                className={
                  confirming === "accept"
                    ? "bg-gold-400 !text-navy-900 hover:!bg-gold-300"
                    : ""
                }
              >
                {confirming === "accept" ? t("confirm") : t("e_decline")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
