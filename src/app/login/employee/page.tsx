"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useStore } from "@/lib/store";
import { useT, useLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function EmployeeLoginPage() {
  const router = useRouter();
  const { employees, dispatch } = useStore();
  const { t } = useT();
  const { cert: localizeCert } = useLocalized();
  const [q, setQ] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return employees;
    return employees.filter(
      (e) =>
        `${e.firstName} ${e.lastName}`.toLowerCase().includes(query) ||
        e.city.toLowerCase().includes(query)
    );
  }, [q, employees]);

  const signIn = (id: string) => {
    setActiveId(id);
    setTimeout(() => {
      dispatch({ type: "SET_SESSION", payload: { role: "employee", employeeId: id } });
      router.push("/employee");
    }, 320);
  };

  return (
    <div className="animate-fade-in">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-700">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
        {t("login_emp_eyebrow")}
      </div>
      <h1 className="mt-4 font-display text-3xl lg:text-4xl font-black tracking-tightest text-navy-900">
        {t("login_emp_title")}
      </h1>
      <p className="mt-2 text-sm text-ink/60 leading-relaxed">
        {t("login_emp_subtitle")}
      </p>

      <div className="mt-6 flex h-12 items-center gap-2 rounded-xl border border-line bg-white px-3.5 focus-within:border-navy-700 focus-within:ring-2 focus-within:ring-navy-700/15">
        <Search size={16} className="text-ink/45 shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("login_emp_search")}
          className="h-full w-full bg-transparent text-[15px] text-ink placeholder:text-ink/35 focus:outline-none"
        />
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-ink/45 tabular">
          {t("login_emp_count", { n: list.length })}
        </span>
      </div>

      <ul className="mt-4 max-h-[58vh] lg:max-h-[60vh] overflow-y-auto scroll-y space-y-2 pr-1">
        {list.map((e) => {
          const isActive = activeId === e.id;
          return (
            <li key={e.id}>
              <button
                onClick={() => signIn(e.id)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-2xl border bg-white p-3 text-left transition-all",
                  isActive
                    ? "border-navy-700 bg-navy-700/5 shadow-elevated scale-[0.99]"
                    : "border-line hover:border-navy-700/30 hover:bg-canvas active:scale-[0.99]"
                )}
              >
                <Avatar
                  initials={e.initials}
                  color={e.avatarColor}
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-bold text-navy-900">
                      {e.firstName} {e.lastName}
                    </span>
                    {e.status !== "actief" && (
                      <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                        {t(`empstatus_${e.status}`).toLowerCase()}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-ink/55">
                    <ShieldCheck size={10} className="inline mr-1 text-navy-700/55" />
                    {e.city} · {e.contractHoursPerWeek}
                    {t("per_week_short")}
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {e.certifications.slice(0, 2).map((c) => (
                      <span
                        key={c}
                        className="rounded-md bg-navy-50 px-1.5 py-0.5 text-[10px] font-semibold text-navy-700"
                      >
                        {localizeCert(c)}
                      </span>
                    ))}
                    {e.certifications.length > 2 && (
                      <span className="text-[10px] font-semibold text-ink/50">
                        +{e.certifications.length - 2}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className={cn(
                    "shrink-0 transition-transform",
                    isActive
                      ? "text-navy-700 translate-x-0.5"
                      : "text-ink/35 group-hover:text-navy-700 group-hover:translate-x-0.5"
                  )}
                />
              </button>
            </li>
          );
        })}
        {list.length === 0 && (
          <li className="rounded-2xl border border-dashed border-line bg-white p-6 text-center text-sm text-ink/55">
            —
          </li>
        )}
      </ul>

      <div className="mt-6 border-t border-line pt-5">
        <Link
          href="/login/admin"
          className="block text-center text-sm font-bold text-navy-700 hover:underline"
        >
          {t("login_switch_to_admin")}
        </Link>
      </div>
    </div>
  );
}
