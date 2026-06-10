"use client";

import { useStore } from "@/lib/store";
import { hoursBetween, startOfWeek, addDays } from "@/lib/utils";
import { REFERENCE_TODAY } from "@/lib/mock-data";

/**
 * Shared data hook for the three admin-dashboard variants.
 * Same data, three presentations.
 */
export function useAdminDashboardData() {
  const { missions, employees, notifications, hoursWorkedThisWeek } = useStore();

  const week = startOfWeek(new Date(REFERENCE_TODAY));
  const weekEnd = addDays(week, 7);

  const thisWeekMissions = missions.filter((m) => {
    const ts = new Date(m.startISO).getTime();
    return ts >= week.getTime() && ts < weekEnd.getTime();
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

  const recent = notifications.filter((n) => !n.forEmployeeId).slice(0, 5);

  const overCao = employees
    .map((e) => ({ employee: e, hours: hoursWorkedThisWeek(e.id) }))
    .filter(({ employee, hours }) => hours > employee.caoMaxHoursPerWeek - 4)
    .sort((a, b) => b.hours - a.hours);

  return {
    missions,
    employees,
    notifications,
    thisWeekMissions,
    openCount,
    invitedCount,
    fullyStaffed,
    totalHeadcountNeeded,
    totalAccepted,
    coveragePct,
    revenueWeek,
    upcoming,
    recent,
    overCao,
  };
}
