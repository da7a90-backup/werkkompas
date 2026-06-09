"use client";

import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import type { MissionStatus, MissionType, EmployeeStatus } from "@/types";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
  variant?:
    | "navy"
    | "gold"
    | "neutral"
    | "success"
    | "warn"
    | "danger"
    | "info"
    | "ghost";
}

const variants = {
  navy: "bg-navy-700 text-white",
  gold: "bg-gold-100 text-gold-700 border border-gold-200",
  neutral: "bg-canvas text-ink border border-line",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  warn: "bg-amber-50 text-amber-700 border border-amber-100",
  danger: "bg-red-50 text-red-700 border border-red-100",
  info: "bg-navy-50 text-navy-700 border border-navy-100",
  ghost: "bg-transparent text-ink/70 border border-line/60",
};

export function Badge({
  children,
  className,
  size = "sm",
  variant = "neutral",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold tracking-tight whitespace-nowrap",
        size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

const STATUS_KEY: Record<MissionStatus, string> = {
  open: "status_open",
  uitgenodigd: "status_invited",
  geaccepteerd: "status_staffed",
  afgewezen: "status_declined",
  voltooid: "status_completed",
};

const STATUS_VARIANT: Record<MissionStatus, BadgeProps["variant"]> = {
  open: "warn",
  uitgenodigd: "info",
  geaccepteerd: "success",
  afgewezen: "danger",
  voltooid: "neutral",
};

export function MissionStatusBadge({
  status,
  className,
}: {
  status: MissionStatus;
  className?: string;
}) {
  const { t } = useT();
  return (
    <Badge variant={STATUS_VARIANT[status]} className={className}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {t(STATUS_KEY[status])}
    </Badge>
  );
}

const EMP_STATUS_VARIANT: Record<EmployeeStatus, BadgeProps["variant"]> = {
  actief: "success",
  verlof: "warn",
  ziek: "danger",
  inactief: "neutral",
};

export function EmployeeStatusBadge({
  status,
  className,
}: {
  status: EmployeeStatus;
  className?: string;
}) {
  const { t } = useT();
  return (
    <Badge variant={EMP_STATUS_VARIANT[status]} className={className}>
      {t(`empstatus_${status}`)}
    </Badge>
  );
}

const typeColors: Record<MissionType, string> = {
  Evenement: "bg-gold-100 text-gold-700 border-gold-200",
  Object: "bg-navy-50 text-navy-700 border-navy-100",
  Winkel: "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Mobiele surveillance": "bg-violet-50 text-violet-700 border-violet-100",
  Persoonsbeveiliging: "bg-red-50 text-red-700 border-red-100",
  Horeca: "bg-rose-50 text-rose-700 border-rose-100",
};

export function MissionTypeBadge({
  type,
  className,
}: {
  type: MissionType;
  className?: string;
}) {
  const { t } = useT();
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-tight",
        typeColors[type],
        className
      )}
    >
      {t(`mtype_${type}`)}
    </span>
  );
}

export function CountBadge({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  if (count <= 0) return null;
  return (
    <span
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-400 px-1.5 text-[10px] font-bold text-navy-900 tabular",
        className
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
