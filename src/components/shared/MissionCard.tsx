"use client";

import Link from "next/link";
import { Clock, MapPin, Users, Banknote, Calendar } from "lucide-react";
import type { Mission } from "@/types";
import { MissionStatusBadge, MissionTypeBadge } from "@/components/ui/Badge";
import { hoursBetween } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useFormat, useLocalized } from "@/lib/i18n";

interface Props {
  mission: Mission;
  href: string;
  acceptedCount?: number;
  showStatus?: boolean;
  variant?: "default" | "compact" | "highlight";
  rightSlot?: React.ReactNode;
}

export function MissionCard({
  mission: rawMission,
  href,
  acceptedCount,
  showStatus = true,
  variant = "default",
  rightSlot,
}: Props) {
  const { mission: localize, cert } = useLocalized();
  const mission = localize(rawMission);
  const accepted = acceptedCount ?? mission.assignments.filter((a) => a.status === "geaccepteerd").length;
  const totalHours = hoursBetween(mission.startISO, mission.endISO);
  const totalPay = totalHours * mission.hourlyRate;
  const isHighlight = variant === "highlight";
  const fmt = useFormat();

  return (
    <Link
      href={href}
      className={cn(
        "group block overflow-hidden rounded-2xl border bg-white transition-all duration-200",
        "hover:border-navy-700/25 hover:shadow-elevated active:scale-[0.99]",
        isHighlight ? "border-navy-700/30 shadow-elevated" : "border-line"
      )}
    >
      {isHighlight && (
        <div className="h-1 w-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400" />
      )}
      <div className={cn("p-4", variant === "compact" && "p-3.5")}>
        <div className="flex items-start gap-3">
          <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-navy-50 px-3 py-2 text-navy-700 min-w-[64px]">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {fmt.monthShort(mission.startISO)}
            </span>
            <span className="font-display text-2xl font-black leading-none tabular">
              {new Date(mission.startISO).getDate()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate text-[15px] font-bold tracking-tight text-navy-900">
                  {mission.title}
                </h3>
                <p className="truncate text-xs text-ink/60">{mission.client}</p>
              </div>
              {rightSlot ?? (showStatus && <MissionStatusBadge status={mission.status} />)}
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-medium text-ink/70">
              <span className="inline-flex items-center gap-1">
                <Clock size={12} className="text-navy-700/70" />
                {fmt.timeRange(mission.startISO, mission.endISO)}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} className="text-navy-700/70" />
                {mission.city}
              </span>
              <span className="inline-flex items-center gap-1">
                <Banknote size={12} className="text-navy-700/70" />
                {fmt.euro(mission.hourlyRate)}/h
              </span>
              <span className="inline-flex items-center gap-1">
                <Users size={12} className="text-navy-700/70" />
                {accepted}/{mission.headcount}
              </span>
            </div>
            {variant !== "compact" && (
              <div className="mt-2.5 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  <MissionTypeBadge type={mission.type} />
                  {mission.requiredCertifications.slice(0, 2).map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center rounded-md border border-line bg-canvas px-1.5 py-0.5 text-[10px] font-semibold text-ink/65"
                    >
                      {cert(c)}
                    </span>
                  ))}
                  {mission.requiredCertifications.length > 2 && (
                    <span className="text-[10px] font-semibold text-ink/55">
                      +{mission.requiredCertifications.length - 2}
                    </span>
                  )}
                </div>
                <span className="shrink-0 text-[11px] font-bold text-navy-700 tabular">
                  {fmt.euro(totalPay)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
