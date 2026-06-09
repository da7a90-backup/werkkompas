"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/employee/BottomNav";
import { useStore } from "@/lib/store";
import { InstallHint } from "@/components/shared/InstallHint";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session, hydrated } = useStore();

  useEffect(() => {
    if (!hydrated) return;
    if (session.role !== "employee" || !session.employeeId) {
      router.replace("/");
    }
  }, [hydrated, session.role, session.employeeId, router]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-navy-700/20 border-t-navy-700" />
      </div>
    );
  }

  if (session.role !== "employee" || !session.employeeId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-canvas pb-20">
      {children}
      <BottomNav />
      <InstallHint />
    </div>
  );
}
