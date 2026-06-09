import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  trend?: { direction: "up" | "down" | "flat"; text: string };
  className?: string;
  variant?: "default" | "navy" | "gold";
}

export function Stat({
  label,
  value,
  hint,
  icon: Icon,
  trend,
  className,
  variant = "default",
}: Props) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 rounded-2xl border p-5",
        variant === "default" && "bg-white border-line",
        variant === "navy" && "bg-navy-700 text-white border-navy-700",
        variant === "gold" && "bg-gold-400 text-navy-900 border-gold-400",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-wider",
            variant === "default" && "text-ink/55",
            variant === "navy" && "text-white/70",
            variant === "gold" && "text-navy-700"
          )}
        >
          {label}
        </span>
        {Icon && (
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg",
              variant === "default" && "bg-navy-50 text-navy-700",
              variant === "navy" && "bg-white/10 text-white",
              variant === "gold" && "bg-navy-900/10 text-navy-900"
            )}
          >
            <Icon size={16} />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "text-3xl font-black tracking-tightest tabular",
            variant === "default" && "text-navy-900",
            variant === "navy" && "text-white",
            variant === "gold" && "text-navy-900"
          )}
        >
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              "text-xs font-semibold",
              trend.direction === "up" && "text-emerald-600",
              trend.direction === "down" && "text-red-600",
              trend.direction === "flat" && "text-ink/50"
            )}
          >
            {trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "—"}{" "}
            {trend.text}
          </span>
        )}
      </div>
      {hint && (
        <span
          className={cn(
            "text-xs",
            variant === "default" && "text-ink/55",
            variant === "navy" && "text-white/60",
            variant === "gold" && "text-navy-800/70"
          )}
        >
          {hint}
        </span>
      )}
    </div>
  );
}
