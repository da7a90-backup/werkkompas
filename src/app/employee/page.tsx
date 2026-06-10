"use client";

import { AppHeader } from "@/components/employee/AppHeader";
import { useLayout } from "@/lib/layout-variant";
import { EmployeeDashboardModern } from "@/components/employee-dashboard/modern";
import { EmployeeDashboardEditorial } from "@/components/employee-dashboard/editorial";
import { EmployeeDashboardMaximalist } from "@/components/employee-dashboard/maximalist";

export default function EmployeeHome() {
  const { variant } = useLayout();
  return (
    <main className="animate-fade-in">
      <AppHeader showSwitch />
      {variant === "editorial" ? (
        <EmployeeDashboardEditorial />
      ) : variant === "maximalist" ? (
        <EmployeeDashboardMaximalist />
      ) : (
        <EmployeeDashboardModern />
      )}
    </main>
  );
}
