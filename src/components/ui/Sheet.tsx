"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useT } from "@/lib/i18n";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
}

const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  full: "max-w-3xl",
};

export function Sheet({ open, onClose, title, description, children, size = "md" }: Props) {
  const { t } = useT();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full bg-white rounded-t-3xl sm:rounded-3xl shadow-sheet animate-slide-up overflow-hidden",
          "sm:m-4 max-h-[92vh] flex flex-col",
          sizes[size]
        )}
        role="dialog"
        aria-modal="true"
      >
        {(title || description) && (
          <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
            <div className="flex flex-col gap-0.5">
              {title && (
                <h2 className="text-lg font-bold tracking-tight text-navy-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-ink/60">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-ink/60 hover:bg-canvas hover:text-ink focus-ring"
              aria-label={t("close")}
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="overflow-y-auto scroll-y">{children}</div>
      </div>
    </div>
  );
}
