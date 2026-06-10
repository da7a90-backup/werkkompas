"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Layers } from "lucide-react";
import { LAYOUT_VARIANTS, useLayout, type LayoutVariant } from "@/lib/layout-variant";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Placement = "bottom-right" | "bottom-left" | "top-right" | "top-left";

interface Props {
  variant?: "dark" | "light";
  className?: string;
  placement?: Placement;
}

const panelPlacement: Record<Placement, string> = {
  "bottom-right": "right-0 top-full mt-2 origin-top-right",
  "bottom-left": "left-0 top-full mt-2 origin-top-left",
  "top-right": "right-0 bottom-full mb-2 origin-bottom-right",
  "top-left": "left-0 bottom-full mb-2 origin-bottom-left",
};

const SHORT: Record<LayoutVariant, string> = {
  modern: "MOD",
  editorial: "EDT",
  maximalist: "MAX",
};

export function LayoutMenu({
  variant: surface = "dark",
  className,
  placement = "bottom-right",
}: Props) {
  const { variant, setVariant } = useLayout();
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const opensUp = placement.startsWith("top-");

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("layout_label")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors ring-1 ring-inset focus-ring",
          surface === "dark"
            ? "bg-white/8 text-white/85 ring-white/15 hover:bg-white/15"
            : "bg-white text-navy-700 ring-line hover:bg-canvas",
          open && (surface === "dark" ? "bg-white/15" : "bg-canvas")
        )}
      >
        <Layers size={12} className="shrink-0" />
        <span className="tabular">{SHORT[variant]}</span>
        <ChevronDown
          size={12}
          className={cn(
            "transition-transform",
            opensUp ? (open ? "rotate-0" : "rotate-180") : open ? "rotate-180" : "rotate-0"
          )}
        />
      </button>
      {open && (
        <div
          role="menu"
          className={cn(
            "absolute z-[100] w-64 overflow-hidden rounded-2xl bg-white shadow-elevated ring-1 ring-line animate-scale-in",
            panelPlacement[placement]
          )}
        >
          <div className="border-b border-line px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-ink/55">
            {t("layout_label")}
          </div>
          <ul className="py-1.5">
            {LAYOUT_VARIANTS.map((l) => {
              const active = l.code === variant;
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setVariant(l.code);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors",
                      active ? "bg-navy-50 text-navy-900" : "text-ink/80 hover:bg-canvas"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 inline-flex h-7 w-9 shrink-0 items-center justify-center rounded-md text-[10px] font-extrabold tracking-tight tabular",
                        active
                          ? "bg-navy-700 text-white"
                          : "bg-canvas text-ink/70 ring-1 ring-inset ring-line"
                      )}
                    >
                      {SHORT[l.code]}
                    </span>
                    <span className="flex flex-col min-w-0">
                      <span className="text-sm font-bold tracking-tight text-navy-900">
                        {t(l.key)}
                      </span>
                      <span className="text-[11px] text-ink/55 leading-snug">
                        {t(l.tagline)}
                      </span>
                    </span>
                    {active && (
                      <Check size={14} className="ml-auto mt-1 text-navy-700 shrink-0" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
