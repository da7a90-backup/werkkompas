"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, CheckCircle2, KeyRound, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

export default function AdminLoginPage() {
  const router = useRouter();
  const { dispatch } = useStore();
  const { t } = useT();
  const [email, setEmail] = useState("planning@werkkompasbv.nl");
  const [password, setPassword] = useState("werkkompas-2026");
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      dispatch({ type: "SET_SESSION", payload: { role: "admin", employeeId: null } });
      router.push("/admin");
    }, 420);
  };

  return (
    <form onSubmit={onSubmit} className="animate-fade-in">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-700">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
        {t("login_admin_eyebrow")}
      </div>
      <h1 className="mt-4 font-display text-3xl lg:text-4xl font-black tracking-tightest text-navy-900">
        {t("login_admin_title")}
      </h1>
      <p className="mt-2 text-sm text-ink/60 leading-relaxed">
        {t("login_admin_subtitle")}
      </p>

      <div className="mt-7 flex items-start gap-2.5 rounded-2xl border border-gold-200 bg-gold-50 px-4 py-3 text-[12px] leading-snug text-navy-900/85">
        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold-600" />
        <span>{t("login_admin_demo")}</span>
      </div>

      <div className="mt-6 space-y-4">
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
                className={`relative inline-flex h-5 w-5 items-center justify-center rounded-md border transition ${
                  remember ? "border-navy-700 bg-navy-700" : "border-line bg-white"
                }`}
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
          href="/login/employee"
          className="block text-center text-sm font-bold text-navy-700 hover:underline"
        >
          {t("login_switch_to_employee")}
        </Link>
      </div>
    </form>
  );
}
