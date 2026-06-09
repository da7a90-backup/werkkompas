"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { Repeat } from "lucide-react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n";

export function RoleSwitcher({ compact = false }: { compact?: boolean }) {
  const { dispatch } = useStore();
  const router = useRouter();
  const { t } = useT();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          dispatch({ type: "SET_SESSION", payload: { role: null, employeeId: null } });
          router.push("/");
        }}
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
        title={t("switchRole")}
      >
        <Repeat size={14} />
        {!compact && t("switchRole")}
      </button>
    </div>
  );
}

export function DemoBadge() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-400 ring-1 ring-inset ring-gold-400/30"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold-400 live-dot" />
      Demo
    </Link>
  );
}
