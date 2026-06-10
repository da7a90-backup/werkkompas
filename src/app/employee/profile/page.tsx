"use client";

import { AppHeader } from "@/components/employee/AppHeader";
import { useStore } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";
import {
  Award,
  Briefcase,
  Calendar,
  ChevronRight,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Repeat,
  Settings,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { hoursBetween } from "@/lib/utils";
import { useT, useFormat, useLocalized } from "@/lib/i18n";

export default function EmployeeProfilePage() {
  const { session, getEmployee, missions, hoursWorkedThisWeek, dispatch } = useStore();
  const router = useRouter();
  const { t } = useT();
  const fmt = useFormat();
  const { cert: localizeCert } = useLocalized();
  const employee = getEmployee(session.employeeId);

  if (!employee) return null;

  const myAccepted = missions.filter((m) =>
    m.assignments.some(
      (a) => a.employeeId === employee.id && a.status === "geaccepteerd"
    )
  );
  const totalHours = myAccepted.reduce(
    (s, m) => s + hoursBetween(m.startISO, m.endISO),
    0
  );
  const weekly = hoursWorkedThisWeek(employee.id);
  const earnings = myAccepted.reduce(
    (s, m) => s + hoursBetween(m.startISO, m.endISO) * m.hourlyRate,
    0
  );

  return (
    <main className="animate-fade-in">
      <div
        className="relative isolate bg-navy-700 text-white pb-20"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 dot-bg opacity-40" />
          <div
            className="absolute -right-12 -top-12 h-56 w-56 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(184,146,74,0.3), rgba(184,146,74,0))",
            }}
          />
        </div>
        <div className="relative container-mobile pt-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
                {t("e_profile_title")}
              </span>
              <h1 className="font-display text-2xl font-black tracking-tightest">
                {t("e_my_account")}
              </h1>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <Avatar
              initials={employee.initials}
              color={employee.avatarColor}
              size="xl"
              ring
            />
            <div className="min-w-0">
              <div className="font-display text-xl font-black tracking-tightest truncate">
                {employee.firstName} {employee.lastName}
              </div>
              <div className="text-sm text-white/65">
                {t("e_guard_in", { city: employee.city })}
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-gold-400">
                <Star size={12} fill="currentColor" />
                <span className="tabular">{employee.rating.toFixed(1)}</span>
                <span className="text-white/45 ml-1">
                  · {t("e_employee_since", {
                    date: new Date(employee.hireDate).toLocaleDateString(fmt.locale, { year: "numeric", month: "short" }),
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-mobile mt-4 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-line bg-white p-3 text-center">
            <Calendar size={14} className="mx-auto text-navy-700/70" />
            <div className="mt-1 font-display text-lg font-black text-navy-900 tabular">
              {fmt.hours(weekly)}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
              {t("adm_this_week_label")}
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-3 text-center">
            <Briefcase size={14} className="mx-auto text-navy-700/70" />
            <div className="mt-1 font-display text-lg font-black text-navy-900 tabular">
              {myAccepted.length}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
              {t("e_label_shifts")}
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-3 text-center">
            <ShieldCheck size={14} className="mx-auto text-navy-700/70" />
            <div className="mt-1 font-display text-lg font-black text-navy-900 tabular">
              {employee.certifications.length}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
              {t("e_label_certs")}
            </div>
          </div>
        </div>

        <section className="rounded-2xl border border-line bg-white overflow-hidden">
          <div className="border-b border-line px-5 py-3 text-xs font-bold uppercase tracking-widest text-ink/55">
            {t("e_section_contact")}
          </div>
          <ul className="divide-y divide-line text-sm">
            <li className="flex items-center gap-3 px-5 py-3">
              <Mail size={16} className="text-navy-700/70" />
              <span className="truncate text-ink/85">{employee.email}</span>
            </li>
            <li className="flex items-center gap-3 px-5 py-3">
              <Phone size={16} className="text-navy-700/70" />
              <span className="text-ink/85 tabular">{employee.phone}</span>
            </li>
            <li className="flex items-center gap-3 px-5 py-3">
              <MapPin size={16} className="text-navy-700/70" />
              <span className="text-ink/85">{employee.city}</span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-line bg-white overflow-hidden">
          <div className="border-b border-line px-5 py-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-ink/55">
              {t("e_section_contract")}
            </span>
            <ShieldCheck size={14} className="text-navy-700/60" />
          </div>
          <div className="grid grid-cols-2 divide-x divide-line">
            <div className="p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
                {t("e_field_contract_hours")}
              </div>
              <div className="mt-1 font-display text-xl font-black text-navy-900 tabular">
                {employee.contractHoursPerWeek} {t("per_week_short")}
              </div>
            </div>
            <div className="p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
                {t("e_field_cao_limit")}
              </div>
              <div className="mt-1 font-display text-xl font-black text-navy-900 tabular">
                {employee.caoMaxHoursPerWeek} {t("per_week_short")}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/55">
              <Award size={12} />
              {t("adm_certifications")}
            </h3>
            <span className="text-[10px] font-bold tabular text-ink/55">
              {employee.certifications.length}
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {employee.certifications.map((c) => (
              <li
                key={c}
                className="flex items-center gap-3 rounded-xl border border-line bg-canvas/60 px-3 py-2.5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-700 text-white">
                  <ShieldCheck size={14} />
                </div>
                <div className="flex-1 text-sm font-bold text-navy-900">{localizeCert(c)}</div>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  {t("adm_valid")}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-line bg-white overflow-hidden">
          <ul className="divide-y divide-line text-sm">
            <li>
              <button className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left hover:bg-canvas">
                <span className="flex items-center gap-3">
                  <Settings size={16} className="text-navy-700/70" />
                  {t("e_settings")}
                </span>
                <ChevronRight size={16} className="text-ink/35" />
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  dispatch({ type: "SET_SESSION", payload: { role: null, employeeId: null } });
                  router.push("/");
                }}
                className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left hover:bg-canvas"
              >
                <span className="flex items-center gap-3 text-red-700">
                  <LogOut size={16} />
                  {t("e_logout")}
                </span>
                <ChevronRight size={16} className="text-ink/35" />
              </button>
            </li>
          </ul>
        </section>

        <div className="text-center text-[10px] text-ink/45">
          {t("e_app_version")}
        </div>
      </div>
    </main>
  );
}
