"use client";

import { cn } from "@/lib/utils";

interface Tab<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface Props<T extends string> {
  tabs: Tab<T>[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}

export function SegmentedTabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
}: Props<T>) {
  return (
    <div
      className={cn(
        "inline-flex w-full rounded-xl bg-navy-50/60 p-1",
        className
      )}
    >
      {tabs.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={cn(
            "relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold tracking-tight transition-all",
            value === t.value
              ? "bg-white text-navy-700 shadow-card"
              : "text-ink/60 hover:text-ink"
          )}
        >
          {t.label}
          {t.count !== undefined && t.count > 0 && (
            <span
              className={cn(
                "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular",
                value === t.value
                  ? "bg-navy-700 text-white"
                  : "bg-ink/10 text-ink/70"
              )}
            >
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
