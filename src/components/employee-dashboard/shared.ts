"use client";

import { useStore } from "@/lib/store";
import { useT, useLocalized } from "@/lib/i18n";
import { startOfWeek } from "@/lib/utils";
import { REFERENCE_TODAY } from "@/lib/mock-data";

/**
 * Shared data hook for the three employee-dashboard variants.
 * Keeps the data flow identical — variants only diverge in presentation.
 */
export function useEmployeeDashboardData() {
  const {
    session,
    getEmployee,
    missions,
    hoursWorkedThisWeek,
    getEmployeeAvailability,
  } = useStore();
  const { t } = useT();
  const { mission: localizeMission } = useLocalized();

  const employee = getEmployee(session.employeeId);

  const myAccepted = employee
    ? missions
        .filter((m) =>
          m.assignments.some(
            (a) => a.employeeId === employee.id && a.status === "geaccepteerd"
          )
        )
        .sort(
          (a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
        )
    : [];

  const upcoming = myAccepted.filter(
    (m) => new Date(m.startISO).getTime() > Date.now() - 36e5
  );

  const myInvitations = employee
    ? missions
        .filter(
          (m) =>
            m.invitedEmployeeIds.includes(employee.id) &&
            !m.assignments.some((a) => a.employeeId === employee.id)
        )
        .sort(
          (a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
        )
    : [];

  const weeklyHours = employee ? hoursWorkedThisWeek(employee.id) : 0;
  const contract = employee?.contractHoursPerWeek ?? 0;
  const pct = contract > 0 ? Math.min(100, Math.round((weeklyHours / contract) * 100)) : 0;

  const week = startOfWeek(new Date(REFERENCE_TODAY));
  const av = employee ? getEmployeeAvailability(employee.id) : undefined;
  const availableThisWeek = av
    ? av.entries.filter((e) => {
        const ts = new Date(e.date).getTime();
        return (
          ts >= week.getTime() &&
          ts < week.getTime() + 7 * 86400000 &&
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

  return {
    employee,
    myAccepted,
    upcoming,
    myInvitations,
    weeklyHours,
    contract,
    pct,
    availableThisWeek,
    nextMission,
    greeting,
  };
}
