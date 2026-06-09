"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Sparkles, Check, AlertTriangle } from "lucide-react";
import { AdminTopbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { useStore } from "@/lib/store";
import type { Certification, Mission, MissionType } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { cn, hoursBetween } from "@/lib/utils";
import { useT, useFormat, useLocalized } from "@/lib/i18n";

const ALL_CERTS: Certification[] = [
  "Beveiliger 2",
  "Evenementenbeveiliger",
  "Persoonsbeveiliger",
  "Centralist",
  "BHV",
  "EHBO",
  "Hondengeleider",
  "Horeca Portier",
];

const MISSION_TYPES: MissionType[] = [
  "Object",
  "Evenement",
  "Winkel",
  "Mobiele surveillance",
  "Persoonsbeveiliging",
  "Horeca",
];

export default function NewMissionPage() {
  const router = useRouter();
  const { employees, dispatch, checkCaoConflict } = useStore();
  const { t } = useT();
  const fmt = useFormat();
  const { cert: localizeCert } = useLocalized();

  const [form, setForm] = useState({
    title: "",
    client: "",
    type: "Object" as MissionType,
    location: "",
    address: "",
    city: "Rotterdam",
    startDate: "2026-06-16",
    startTime: "08:00",
    endTime: "16:00",
    hourlyRate: "22",
    headcount: "2",
    description: "",
    instructions: "",
  });

  const [certs, setCerts] = useState<Set<Certification>>(new Set(["Beveiliger 2"]));
  const [invited, setInvited] = useState<Set<string>>(new Set());

  const startISO = new Date(`${form.startDate}T${form.startTime}:00`).toISOString();
  const endsNextDay =
    form.endTime <= form.startTime;
  const endDate = endsNextDay
    ? new Date(new Date(form.startDate).getTime() + 86400000)
    : new Date(form.startDate);
  const endISO = new Date(
    `${endDate.toISOString().slice(0, 10)}T${form.endTime}:00`
  ).toISOString();

  const hours = hoursBetween(startISO, endISO);
  const totalPay = hours * Number(form.hourlyRate || 0);

  const eligible = useMemo(() => {
    return employees
      .filter((e) => e.status === "actief")
      .map((e) => {
        const meets = Array.from(certs).every((c) =>
          e.certifications.includes(c)
        );
        return { employee: e, eligible: meets };
      })
      .sort((a, b) => {
        if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
        return a.employee.firstName.localeCompare(b.employee.firstName);
      });
  }, [employees, certs]);

  const toggleCert = (c: Certification) => {
    const next = new Set(certs);
    next.has(c) ? next.delete(c) : next.add(c);
    setCerts(next);
  };

  const toggleInvite = (id: string) => {
    const next = new Set(invited);
    next.has(id) ? next.delete(id) : next.add(id);
    setInvited(next);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `mis-${Date.now()}`;
    const mission: Mission = {
      id,
      title: form.title || t("adm_new_assignment"),
      client: form.client || "—",
      type: form.type,
      location: form.location || form.client,
      address: form.address || "",
      city: form.city,
      startISO,
      endISO,
      hourlyRate: Number(form.hourlyRate || 0),
      requiredCertifications: Array.from(certs),
      headcount: Number(form.headcount || 1),
      description: form.description,
      instructions: form.instructions,
      invitedEmployeeIds: Array.from(invited),
      assignments: [],
      status: invited.size > 0 ? "uitgenodigd" : "open",
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "CREATE_MISSION", payload: mission });
    router.push(`/admin/missions/${id}`);
  };

  return (
    <>
      <AdminTopbar
        title={t("adm_new_title")}
        description={t("adm_new_desc")}
        action={
          <button
            onClick={() => router.back()}
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-navy-700 hover:bg-canvas"
          >
            <ChevronLeft size={16} />
            {t("back")}
          </button>
        }
      />
      <form onSubmit={submit} className="p-4 lg:p-6 grid gap-4 lg:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <section className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display text-base font-black tracking-tight text-navy-900">
              {t("adm_basics")}
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input
                label={t("adm_title_field")}
                placeholder={t("adm_title_ph")}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <Input
                label={t("adm_client_field")}
                placeholder={t("adm_client_ph")}
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                required
              />
              <Select
                label={t("adm_type_field")}
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as MissionType })
                }
              >
                {MISSION_TYPES.map((tp) => (
                  <option key={tp} value={tp}>
                    {t(`mtype_${tp}`)}
                  </option>
                ))}
              </Select>
              <Input
                label={t("adm_headcount_field")}
                type="number"
                min={1}
                max={20}
                value={form.headcount}
                onChange={(e) => setForm({ ...form, headcount: e.target.value })}
              />
              <Input
                label={t("adm_location_field")}
                placeholder={t("adm_location_ph")}
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <Input
                label={t("adm_city_field")}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <Input
                className="sm:col-span-2"
                label={t("adm_address_field")}
                placeholder={t("adm_address_ph")}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display text-base font-black tracking-tight text-navy-900">
              {t("adm_time_rate")}
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-4">
              <Input
                label={t("adm_date_field")}
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
              <Input
                label={t("adm_start_field")}
                type="time"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              />
              <Input
                label={t("adm_end_field")}
                type="time"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                hint={endsNextDay ? t("adm_ends_next") : undefined}
              />
              <Input
                label={t("adm_rate_field")}
                type="number"
                step="0.5"
                min={0}
                value={form.hourlyRate}
                onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-canvas px-3 py-3 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink/55">
                  {t("adm_field_duration")}
                </div>
                <div className="mt-0.5 font-display text-base font-black text-navy-900 tabular">
                  {fmt.hours(hours)}
                </div>
              </div>
              <div className="rounded-xl bg-canvas px-3 py-3 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink/55">
                  {t("adm_per_pers")}
                </div>
                <div className="mt-0.5 font-display text-base font-black text-navy-900 tabular">
                  {fmt.euro(totalPay)}
                </div>
              </div>
              <div className="rounded-xl bg-navy-700 px-3 py-3 text-center text-white">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/65">
                  {t("adm_total_cost")}
                </div>
                <div className="mt-0.5 font-display text-base font-black tabular">
                  {fmt.euro(totalPay * Number(form.headcount || 1))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display text-base font-black tracking-tight text-navy-900">
              {t("adm_required_certs")}
            </h3>
            <p className="mt-0.5 text-xs text-ink/55">
              {t("adm_cert_required_desc")}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ALL_CERTS.map((c) => {
                const active = certs.has(c);
                return (
                  <button
                    type="button"
                    key={c}
                    onClick={() => toggleCert(c)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition",
                      active
                        ? "border-navy-700 bg-navy-700 text-white"
                        : "border-line bg-white text-ink/70 hover:border-navy-700/30"
                    )}
                  >
                    {active && <Check size={12} />}
                    {localizeCert(c)}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display text-base font-black tracking-tight text-navy-900">
              {t("adm_field_descr_inst")}
            </h3>
            <div className="mt-4 space-y-4">
              <Textarea
                label={t("adm_descr_field")}
                placeholder={t("adm_descr_ph")}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <Textarea
                label={t("adm_inst_field")}
                placeholder={t("adm_inst_ph")}
                value={form.instructions}
                onChange={(e) =>
                  setForm({ ...form, instructions: e.target.value })
                }
              />
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1 space-y-4">
          <div className="lg:sticky lg:top-20 space-y-4">
            <section className="rounded-2xl border border-line bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-1.5 font-display text-base font-black tracking-tight text-navy-900">
                  <Sparkles size={14} className="text-gold-500" />
                  {t("adm_invite_employees")}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-ink/55">
                  {invited.size} / {form.headcount}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-ink/55">
                {t("adm_invite_employees_desc")}
              </p>
              <ul className="mt-3 max-h-[480px] overflow-y-auto scroll-y space-y-1.5 pr-1">
                {eligible.map(({ employee: e, eligible }) => {
                  const isInvited = invited.has(e.id);
                  const cao = checkCaoConflict(e.id, "tmp");
                  // checkCaoConflict needs a real mission to compute; simulate:
                  const tempHours = Number(form.hourlyRate ? hours : 0);
                  const overCaoSim =
                    cao.weeklyHours + tempHours > e.caoMaxHoursPerWeek;
                  return (
                    <li key={e.id}>
                      <button
                        type="button"
                        disabled={!eligible}
                        onClick={() => toggleInvite(e.id)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-xl border p-2 text-left transition",
                          isInvited
                            ? "border-navy-700 bg-navy-700/5"
                            : eligible
                              ? "border-line bg-white hover:border-navy-700/30"
                              : "border-line bg-canvas/60 opacity-50 cursor-not-allowed"
                        )}
                      >
                        <Avatar
                          initials={e.initials}
                          color={e.avatarColor}
                          size="sm"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-bold text-navy-900">
                            {e.firstName} {e.lastName}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-ink/55">
                            <span>{e.city}</span>
                            {overCaoSim && eligible && (
                              <span className="inline-flex items-center gap-0.5 rounded bg-amber-50 px-1 py-0.5 text-[10px] font-bold text-amber-700">
                                <AlertTriangle size={9} />
                                {t("adm_cao_over")}
                              </span>
                            )}
                            {!eligible && (
                              <span className="text-[10px] font-bold uppercase tracking-widest text-red-600">
                                {t("adm_no_cert")}
                              </span>
                            )}
                          </div>
                        </div>
                        <span
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-md border transition",
                            isInvited
                              ? "border-navy-700 bg-navy-700 text-white"
                              : "border-line text-ink/30"
                          )}
                        >
                          {isInvited && <Check size={12} />}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            <Button type="submit" size="lg" fullWidth>
              <Sparkles size={16} />
              {invited.size > 0
                ? t("adm_create_invite", { n: invited.size })
                : t("adm_create_no_invite")}
            </Button>
          </div>
        </aside>
      </form>
    </>
  );
}
