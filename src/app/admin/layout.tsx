"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { AdminMobileNav } from "@/components/admin/MobileNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session, hydrated } = useStore();

  useEffect(() => {
    if (!hydrated) return;
    if (session.role !== "admin") router.replace("/");
  }, [hydrated, session.role, router]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-navy-700/20 border-t-navy-700" />
      </div>
    );
  }

  if (session.role !== "admin") return null;

  return (
    <div className="min-h-screen flex bg-canvas">
      <AdminSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <AdminMobileNav />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
