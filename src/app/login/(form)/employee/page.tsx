"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  KeyRound,
  Lock,
  Mail,
  Search,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function EmployeeLoginPage() {
  const router = useRouter();
  const { employees, dispatch } = useStore();
  const { t } = useT();

  const [selectedId, setSelectedId] = useState<string>(employees[0]?.id ?? "");
  const selected = useMemo(
    () => employees.find((e) => e.id === selectedId) ?? employees[0],
    [employees, selectedId]
  );

  const [email, setEmail] = useState(selected?.email ?? "");
  const [password, setPassword] = useState("werkkompas-2026");
  const [remember, setRemember] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [query, setQuery] = useState("");
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selected) setEmail(selected.email);
  }, [selected]);

  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      if (!pickerRef.current?.contains(ev.target as Node)) setPickerOpen(false);
    };
    const onKey = (ev: KeyboardEvent) => ev.key === "Escape" && setPickerOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(
      (e) =>
        `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q)
    );
  }, [employees, query]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSubmitting(true);
    // Match the email to a known employee so the real-feel form still maps to a valid demo profile.
    const match =
      employees.find(
        (emp) => emp.email.toLowerCase() === email.trim().toLowerCase()
      ) ?? selected;
    setTimeout(() => {
      dispatch({
        type: "SET_SESSION",
        payload: { role: "employee", employeeId: match.id },
      });
      router.push("/employee");
    }, 420);
  };

  if (!selected) return null;

  return (
    <form onSubmit={onSubmit} className="animate-fade-in">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-700">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
        {t("login_emp_eyebrow")}
      </div>
      <h1 className="mt-4 font-display text-3xl lg:text-4xl font-black tracking-tightest text-navy-900">
        {t("login_admin_title")}
      </h1>
      <p className="mt-2 text-sm text-ink/60 leading-relaxed">
        {t("login_emp_full_subtitle")}
      </p>

      {/* Demo profile selector chip */}
      <div className="relative mt-6" ref={pickerRef}>
        <button
          type="button"
          onClick={() => setPickerOpen((o) => !o)}
          className={cn(
            "group flex w-full items-center gap-3 rounded-2xl border bg-white p-2.5 pl-3 text-left transition-all",
            pickerOpen
              ? "border-navy-700 shadow-elevated"
              : "border-gold-300 hover:border-navy-700/40"
          )}
          aria-haspopup="listbox"
          aria-expanded={pickerOpen}
        >
          <span className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold-700">
              {t("login_emp_demo_chip")}
            </span>
          </span>
          <span className="ml-auto flex items-center gap-2.5">
            <Avatar
              initials={selected.initials}
              color={selected.avatarColor}
              size="sm"
            />
            <span className="flex flex-col items-end leading-tight">
              <span className="text-sm font-bold text-navy-900">
                {selected.firstName} {selected.lastName}
              </span>
              <span className="text-[10px] text-ink/55 tabular">
                {selected.city}
              </span>
            </span>
            <ChevronDown
              size={16}
              className={cn(
                "text-ink/45 transition-transform",
                pickerOpen && "rotate-180"
              )}
            />
          </span>
        </button>

        {pickerOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl bg-white shadow-elevated ring-1 ring-line animate-scale-in origin-top">
            <div className="flex h-11 items-center gap-2 border-b border-line px-3">
              <Search size={14} className="text-ink/45 shrink-0" />
              <input
                value={query}
                onChange={(ev) => setQuery(ev.target.value)}
                placeholder={t("login_emp_search")}
                className="h-full w-full bg-transparent text-sm placeholder:text-ink/40 focus:outline-none"
                autoFocus
              />
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/45 tabular">
                {filtered.length}
              </span>
            </div>
            <ul
              role="listbox"
              className="max-h-72 overflow-y-auto scroll-y divide-y divide-line"
            >
              {filtered.map((e) => {
                const isActive = e.id === selectedId;
                return (
                  <li key={e.id} role="option" aria-selected={isActive}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(e.id);
                        setPickerOpen(false);
                        setQuery("");
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2 text-left transition",
                        isActive
                          ? "bg-navy-700/5"
                          : "hover:bg-canvas"
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
                        <div className="truncate text-[11px] text-ink/55">
                          {e.email}
                        </div>
                      </div>
                      {isActive && (
                        <CheckCircle2 size={14} className="text-navy-700 shrink-0" />
                      )}
                    </button>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="px-3 py-4 text-center text-sm text-ink/50">—</li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-gold-200 bg-gold-50 px-4 py-3 text-[12px] leading-snug text-navy-900/85">
        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold-600" />
        <span>{t("login_emp_demo_hint")}</span>
      </div>

      <div className="mt-5 space-y-4">
        <Input
          label={t("login_email_label")}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leading={<Mail size={16} />}
          required
        />
        <div>
          <Input
            label={t("login_password_label")}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leading={<Lock size={16} />}
            required
          />
          <div className="mt-3 flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-xs font-semibold text-ink/70 cursor-pointer">
              <span
                className={cn(
                  "relative inline-flex h-5 w-5 items-center justify-center rounded-md border transition",
                  remember ? "border-navy-700 bg-navy-700" : "border-line bg-white"
                )}
              >
                {remember && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <input
                type="checkbox"
                className="sr-only"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              {t("login_remember")}
            </label>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-xs font-bold text-navy-700 hover:underline"
            >
              {t("login_forgot")}
            </a>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        fullWidth
        loading={submitting}
        className="mt-6 !bg-gold-400 !text-navy-900 hover:!bg-gold-300"
      >
        <KeyRound size={16} />
        {t("login_signin")}
        <ArrowRight size={16} />
      </Button>

      <div className="mt-8 border-t border-line pt-5">
        <Link
          href="/login/admin"
          className="block text-center text-sm font-bold text-navy-700 hover:underline"
        >
          {t("login_switch_to_admin")}
        </Link>
      </div>
    </form>
  );
}
