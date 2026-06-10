"use client";

import { useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const { t } = useT();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-navy-700 text-white py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 dot-bg opacity-30" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(239,191,4,0.22), rgba(239,191,4,0))",
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(46,72,98,0.55), rgba(46,72,98,0))",
        }}
      />

      <div className="container-app relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Left — title + contact details */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-400 ring-1 ring-inset ring-gold-400/30">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              {t("mk_contact_eyebrow")}
            </div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tightest leading-[0.95] text-balance">
              {t("mk_contact_title")}
            </h2>
            <p className="mt-5 max-w-md text-base lg:text-lg text-white/75 leading-relaxed">
              {t("mk_contact_subtitle")}
            </p>

            <ul className="mt-10 space-y-3">
              <li>
                <a
                  href={`mailto:${t("mk_contact_email_value")}`}
                  className="group flex items-center gap-4 rounded-2xl bg-white/5 ring-1 ring-inset ring-white/10 p-4 transition hover:bg-white/10"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400 text-navy-900">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/55">
                      {t("mk_contact_email_label")}
                    </div>
                    <div className="text-sm font-bold tracking-tight">
                      {t("mk_contact_email_value")}
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${t("mk_contact_phone_value").replace(/\s/g, "")}`}
                  className="group flex items-center gap-4 rounded-2xl bg-white/5 ring-1 ring-inset ring-white/10 p-4 transition hover:bg-white/10"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400 text-navy-900">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/55">
                      {t("mk_contact_phone_label")}
                    </div>
                    <div className="text-sm font-bold tracking-tight tabular">
                      {t("mk_contact_phone_value")}
                    </div>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-4 rounded-2xl bg-white/5 ring-1 ring-inset ring-white/10 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400 text-navy-900">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/55">
                    {t("mk_contact_office_label")}
                  </div>
                  <div className="text-sm font-bold tracking-tight">
                    {t("mk_contact_office_value")}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Right — form card */}
          <div className="relative rounded-3xl bg-white p-6 lg:p-8 text-ink shadow-elevated">
            {sent ? (
              <div className="flex h-full min-h-[460px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-black tracking-tightest text-navy-900">
                  {t("mk_contact_success")}
                </h3>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label={t("mk_contact_name_field") + " *"}
                    placeholder={t("mk_contact_name_ph")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Input
                    label={t("mk_contact_email_field") + " *"}
                    type="email"
                    placeholder={t("mk_contact_email_ph")}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <Input
                  label={t("mk_contact_subject_field")}
                  placeholder={t("mk_contact_subject_ph")}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
                <Textarea
                  label={t("mk_contact_message_field") + " *"}
                  placeholder={t("mk_contact_message_ph")}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  rows={5}
                  required
                />

                <label className="flex items-start gap-3 rounded-xl border border-line bg-canvas px-3 py-3 text-xs leading-relaxed text-ink/70 cursor-pointer">
                  <span
                    className={cn(
                      "mt-0.5 relative inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition",
                      form.consent
                        ? "border-navy-700 bg-navy-700"
                        : "border-line bg-white"
                    )}
                  >
                    {form.consent && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={form.consent}
                    onChange={(e) =>
                      setForm({ ...form, consent: e.target.checked })
                    }
                    required
                  />
                  <span>{t("mk_contact_consent")} *</span>
                </label>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-ink/55">
                    {t("mk_contact_required")}
                  </span>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!form.consent}
                    className="!bg-gold-400 !text-navy-900 hover:!bg-gold-300"
                  >
                    <Send size={16} />
                    {t("mk_contact_send")}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
