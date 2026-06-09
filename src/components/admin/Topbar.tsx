"use client";

import { Bell, Search } from "lucide-react";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { DemoBadge } from "@/components/shared/RoleSwitcher";
import { LanguageMenu } from "@/components/shared/LanguageMenu";
import { useT } from "@/lib/i18n";

interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AdminTopbar({ title, description, action }: Props) {
  const { unreadNotifsForAdmin } = useStore();
  const { t } = useT();
  const unread = unreadNotifsForAdmin();
  const [q, setQ] = useState("");
  return (
    <header className="sticky lg:top-0 top-14 z-20 border-b border-line bg-white/85 backdrop-blur-md">
      <div className="flex h-14 lg:h-16 items-center gap-2 lg:gap-4 px-4 lg:px-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-base lg:text-xl font-black tracking-tightest text-navy-900 truncate">
              {title}
            </h1>
            <DemoBadge />
          </div>
          {description && (
            <p className="hidden sm:block text-xs text-ink/55 truncate">
              {description}
            </p>
          )}
        </div>
        <div className="hidden md:flex h-10 w-64 items-center gap-2 rounded-xl border border-line bg-canvas px-3 text-sm text-ink/55 focus-within:border-navy-700 focus-within:bg-white">
          <Search size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("topbar_search")}
            className="h-full w-full bg-transparent text-ink placeholder:text-ink/40 focus:outline-none"
          />
        </div>
        <LanguageMenu variant="light" placement="bottom-right" />
        <button
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink/70 transition hover:border-navy-700/30 hover:text-navy-700"
          aria-label={t("e_notif_title")}
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-400 px-1 text-[9px] font-bold text-navy-900 tabular">
              {unread}
            </span>
          )}
        </button>
        {action && <div className="hidden sm:contents">{action}</div>}
      </div>
    </header>
  );
}
