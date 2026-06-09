"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter, Search, UserPlus } from "lucide-react";
import { AdminTopbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";
import { EmployeeStatusBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useT, useFormat, useLocalized } from "@/lib/i18n";

export default function AdminEmployeesPage() {
  const { employees, hoursWorkedThisWeek } = useStore();
  const { t } = useT();
  const fmt = useFormat();
  const { cert: localizeCert } = useLocalized();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("alle");
  const cities = Array.from(new Set(employees.map((e) => e.city))).sort();

  const filtered = useMemo(
    () =>
      employees
        .filter((e) =>
          city === "alle" ? true : e.city === city
        )
        .filter((e) =>
          q.trim()
            ? `${e.firstName} ${e.lastName}`
                .toLowerCase()
                .includes(q.toLowerCase()) ||
              e.email.toLowerCase().includes(q.toLowerCase())
            : true
        ),
    [employees, q, city]
  );

  return (
    <>
      <AdminTopbar
        title={t("adm_employees_title")}
        description={t("adm_employees_desc", { n: employees.length })}
        action={
          <Button size="md" className="!gap-1.5">
            <UserPlus size={16} />
            {t("adm_new_employee")}
          </Button>
        }
      />
      <div className="p-4 lg:p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-10 w-full sm:w-auto items-center gap-2 rounded-xl border border-line bg-white px-3 focus-within:border-navy-700">
            <Search size={14} className="text-ink/50 shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("adm_search_employee")}
              className="h-full w-full sm:w-64 bg-transparent text-sm placeholder:text-ink/40 focus:outline-none"
            />
          </div>
          <div className="flex h-10 items-center gap-2 rounded-xl border border-line bg-white px-3">
            <Filter size={14} className="text-ink/50" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent text-sm font-semibold text-navy-900 focus:outline-none"
            >
              <option value="alle">{t("adm_all_cities")}</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="ml-auto text-xs font-bold text-ink/55">
            {filtered.length === 1
              ? t("adm_count_employee", { n: filtered.length })
              : t("adm_count_employees", { n: filtered.length })}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((e) => {
            const week = hoursWorkedThisWeek(e.id);
            const pct = Math.min(100, (week / e.contractHoursPerWeek) * 100);
            const overCao = week > e.caoMaxHoursPerWeek;
            const overContract = week > e.contractHoursPerWeek;
            return (
              <Link
                key={e.id}
                href={`/admin/employees/${e.id}`}
                className="group rounded-2xl border border-line bg-white p-4 transition hover:border-navy-700/25 hover:shadow-elevated"
              >
                <div className="flex items-start gap-3">
                  <Avatar
                    initials={e.initials}
                    color={e.avatarColor}
                    size="lg"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-bold text-navy-900">
                        {e.firstName} {e.lastName}
                      </span>
                      <EmployeeStatusBadge status={e.status} />
                    </div>
                    <div className="text-xs text-ink/55">{e.city}</div>
                    <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-gold-600">
                      <span className="tabular">{e.rating.toFixed(1)}</span>
                      <span className="text-ink/45">
                        · {t("contract_short", { n: e.contractHoursPerWeek })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-ink/55">{t("adm_this_week_label")}</span>
                    <span
                      className={cn(
                        "tabular",
                        overCao
                          ? "text-red-600"
                          : overContract
                            ? "text-amber-700"
                            : "text-navy-900"
                      )}
                    >
                      {fmt.hours(week)} / {e.contractHoursPerWeek}{t("hours_unit")}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-canvas">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        overCao
                          ? "bg-red-500"
                          : overContract
                            ? "bg-amber-500"
                            : "bg-navy-700"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {e.certifications.slice(0, 3).map((c) => (
                    <span
                      key={c}
                      className="rounded-md bg-navy-50 px-1.5 py-0.5 text-[10px] font-bold text-navy-700"
                    >
                      {localizeCert(c)}
                    </span>
                  ))}
                  {e.certifications.length > 3 && (
                    <span className="rounded-md bg-canvas px-1.5 py-0.5 text-[10px] font-bold text-ink/55">
                      +{e.certifications.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
