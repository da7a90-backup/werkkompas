"use client";

import { useMemo, useState } from "react";
import { AppHeader } from "@/components/employee/AppHeader";
import { useStore } from "@/lib/store";
import { MissionCard } from "@/components/shared/MissionCard";
import { SegmentedTabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Briefcase, Sparkles, CheckCircle2 } from "lucide-react";
import { useT } from "@/lib/i18n";

type Tab = "uitnodigingen" | "geaccepteerd" | "voltooid";

export default function EmployeeMissionsPage() {
  const { session, missions } = useStore();
  const { t } = useT();
  const empId = session.employeeId;
  const [tab, setTab] = useState<Tab>("uitnodigingen");

  const { invitations, accepted, completed } = useMemo(() => {
    if (!empId)
      return { invitations: [], accepted: [], completed: [] };
    const invitations = missions
      .filter(
        (m) =>
          m.invitedEmployeeIds.includes(empId) &&
          !m.assignments.some((a) => a.employeeId === empId)
      )
      .sort((a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime());
    const accepted = missions
      .filter((m) =>
        m.assignments.some(
          (a) => a.employeeId === empId && a.status === "geaccepteerd"
        )
      )
      .sort((a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime());
    const completed = missions
      .filter(
        (m) =>
          m.assignments.some(
            (a) => a.employeeId === empId && a.status === "geaccepteerd"
          ) && new Date(m.endISO).getTime() < Date.now()
      )
      .sort((a, b) => new Date(b.startISO).getTime() - new Date(a.startISO).getTime());
    return { invitations, accepted, completed };
  }, [empId, missions]);

  const list =
    tab === "uitnodigingen"
      ? invitations
      : tab === "geaccepteerd"
        ? accepted
        : completed;

  return (
    <main className="animate-fade-in">
      <AppHeader title={t("e_missions_title")} />
      <div className="container-mobile mt-4 space-y-4">
        <SegmentedTabs
          value={tab}
          onChange={setTab}
          tabs={[
            { value: "uitnodigingen", label: t("e_tab_open"), count: invitations.length },
            { value: "geaccepteerd", label: t("e_tab_confirmed"), count: accepted.length },
            { value: "voltooid", label: t("e_tab_history"), count: completed.length },
          ]}
        />

        {list.length === 0 ? (
          <EmptyState
            icon={
              tab === "uitnodigingen"
                ? Sparkles
                : tab === "geaccepteerd"
                  ? Briefcase
                  : CheckCircle2
            }
            title={
              tab === "uitnodigingen"
                ? t("e_empty_invites")
                : tab === "geaccepteerd"
                  ? t("e_empty_confirmed")
                  : t("e_empty_history")
            }
            description={
              tab === "uitnodigingen"
                ? t("e_empty_invites_desc")
                : t("e_empty_confirmed_desc")
            }
          />
        ) : (
          <div className="space-y-2.5">
            {list.map((m) => (
              <MissionCard
                key={m.id}
                mission={m}
                href={`/employee/missions/${m.id}`}
                variant={tab === "uitnodigingen" ? "highlight" : "default"}
                showStatus={false}
                hideStaffing
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
