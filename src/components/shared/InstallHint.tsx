"use client";

import { useEffect, useState } from "react";
import { X, Smartphone, Share, Plus } from "lucide-react";
import { useT } from "@/lib/i18n";

export function InstallHint() {
  const { t } = useT();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = sessionStorage.getItem("werkkompas-install-dismissed");
    if (dismissed) return;
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error iOS
      window.navigator.standalone === true;
    if (isStandalone) return;
    const t = setTimeout(() => setShow(true), 1400);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;
  return (
    <div className="fixed inset-x-3 bottom-20 z-40 mx-auto max-w-md animate-slide-up rounded-2xl border border-gold-300 bg-white p-3 shadow-elevated">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400 text-navy-900">
          <Smartphone size={18} />
        </div>
        <div className="flex-1 text-sm">
          <p className="font-bold text-navy-900">{t("install_title")}</p>
          <p className="mt-0.5 text-xs leading-snug text-ink/65">
            {t("install_body_pre")}{" "}
            <Share size={11} className="inline -mt-0.5" /> {t("install_body_mid")}{" "}
            <span className="inline-flex items-center gap-0.5 font-semibold">
              <Plus size={11} className="inline -mt-0.5" />
              {t("install_add_to_home")}
            </span>{" "}
            {t("install_body_post")}
          </p>
        </div>
        <button
          onClick={() => {
            sessionStorage.setItem("werkkompas-install-dismissed", "1");
            setShow(false);
          }}
          className="rounded-lg p-1.5 text-ink/50 hover:bg-canvas"
          aria-label={t("close")}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
