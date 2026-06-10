"use client";

import { useLayout } from "@/lib/layout-variant";
import { AdminDashboardModern } from "@/components/admin-dashboard/modern";
import { AdminDashboardEditorial } from "@/components/admin-dashboard/editorial";
import { AdminDashboardMaximalist } from "@/components/admin-dashboard/maximalist";

export default function AdminDashboardPage() {
  const { variant } = useLayout();
  if (variant === "editorial") return <AdminDashboardEditorial />;
  if (variant === "maximalist") return <AdminDashboardMaximalist />;
  return <AdminDashboardModern />;
}
