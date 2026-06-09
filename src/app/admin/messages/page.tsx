"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AdminTopbar } from "@/components/admin/Topbar";
import { useStore } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";
import { Send, Search, MessageCircle, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { REFERENCE_TODAY } from "@/lib/mock-data";
import { useT, useFormat } from "@/lib/i18n";

export default function AdminMessagesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-ink/55">…</div>}>
      <AdminMessagesContent />
    </Suspense>
  );
}

function AdminMessagesContent() {
  const { employees, threads, dispatch } = useStore();
  const { t } = useT();
  const fmt = useFormat();
  const params = useSearchParams();
  const targetEmpId = params.get("employee");
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Build full thread list (one per employee, even if empty)
  const allThreads = useMemo(() => {
    return employees.map((e) => {
      const existing = threads.find((th) => th.employeeId === e.id);
      return {
        employee: e,
        thread:
          existing ?? {
            id: `thr-virtual-${e.id}`,
            employeeId: e.id,
            messages: [],
            unread: 0,
          },
      };
    });
  }, [employees, threads]);

  const filteredThreads = useMemo(() => {
    return allThreads
      .filter((it) => {
        if (!q.trim()) return true;
        const name = `${it.employee.firstName} ${it.employee.lastName}`.toLowerCase();
        return name.includes(q.toLowerCase());
      })
      .sort((a, b) => {
        const aLast =
          a.thread.messages[a.thread.messages.length - 1]?.sentAt ?? "0";
        const bLast =
          b.thread.messages[b.thread.messages.length - 1]?.sentAt ?? "0";
        return new Date(bLast).getTime() - new Date(aLast).getTime();
      });
  }, [allThreads, q]);

  useEffect(() => {
    if (targetEmpId) {
      const it = allThreads.find((x) => x.employee.id === targetEmpId);
      if (it) setActiveThreadId(it.thread.id);
    } else if (!activeThreadId && filteredThreads.length > 0) {
      // Auto-select first thread only on desktop. On mobile we keep the list view.
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(min-width: 1024px)").matches
      ) {
        setActiveThreadId(filteredThreads[0].thread.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetEmpId, allThreads]);

  const active = allThreads.find((it) => it.thread.id === activeThreadId);

  useEffect(() => {
    if (active && active.thread.unread > 0) {
      dispatch({
        type: "MARK_THREAD_READ",
        payload: { threadId: active.thread.id, role: "admin" },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.thread.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [active?.thread.messages.length, activeThreadId]);

  const send = () => {
    if (!active || !text.trim()) return;
    dispatch({
      type: "SEND_MESSAGE",
      payload: {
        threadId: active.thread.id,
        employeeId: active.employee.id,
        fromRole: "admin",
        text: text.trim(),
      },
    });
    setText("");
  };

  return (
    <>
      <AdminTopbar
        title={t("adm_messages_title")}
        description={t("adm_messages_desc")}
      />
      <div className="flex h-[calc(100dvh-max(env(safe-area-inset-top),1.75rem)-7rem)] lg:h-[calc(100dvh-64px)] min-h-0 border-t border-line">
        {/* Thread list — full width on mobile when no conversation open, else hidden */}
        <div
          className={cn(
            "w-full lg:max-w-sm lg:shrink-0 lg:border-r border-line bg-white flex-col",
            activeThreadId ? "hidden lg:flex" : "flex"
          )}
        >
          <div className="border-b border-line p-3">
            <div className="flex h-10 items-center gap-2 rounded-xl border border-line bg-canvas px-3 focus-within:border-navy-700 focus-within:bg-white">
              <Search size={14} className="text-ink/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("adm_search_employee_short")}
                className="h-full w-full bg-transparent text-sm placeholder:text-ink/40 focus:outline-none"
              />
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto scroll-y divide-y divide-line">
            {filteredThreads.map(({ employee: e, thread }) => {
              const last = thread.messages[thread.messages.length - 1];
              const unread = thread.messages.filter(
                (m) => m.fromRole === "employee" && !m.read
              ).length;
              const isActive = activeThreadId === thread.id;
              return (
                <li key={thread.id}>
                  <button
                    onClick={() => setActiveThreadId(thread.id)}
                    className={cn(
                      "flex w-full items-start gap-3 px-4 py-3 text-left transition",
                      isActive ? "bg-navy-700/5" : "hover:bg-canvas"
                    )}
                  >
                    <Avatar
                      initials={e.initials}
                      color={e.avatarColor}
                      size="md"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-bold text-navy-900">
                          {e.firstName} {e.lastName}
                        </span>
                        {last && (
                          <span className="text-[10px] font-semibold text-ink/50 tabular shrink-0">
                            {fmt.timeAgo(last.sentAt, REFERENCE_TODAY)}
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1">
                        <p
                          className={cn(
                            "truncate text-xs",
                            unread > 0 ? "font-bold text-ink/85" : "text-ink/55"
                          )}
                        >
                          {last
                            ? `${last.fromRole === "admin" ? t("adm_you_prefix") : ""}${last.text}`
                            : t("adm_start_chat")}
                        </p>
                        {unread > 0 && (
                          <span className="ml-auto inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-400 px-1 text-[9px] font-bold text-navy-900 tabular">
                            {unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Conversation — full screen on mobile when active, hidden when not */}
        <div
          className={cn(
            "flex-1 min-w-0 bg-canvas",
            activeThreadId ? "flex flex-col" : "hidden lg:flex lg:flex-col"
          )}
        >
          {active ? (
            <>
              <div className="flex items-center gap-3 border-b border-line bg-white px-3 lg:px-5 py-3">
                <button
                  onClick={() => setActiveThreadId(null)}
                  className="lg:hidden -ml-1 inline-flex h-9 w-9 items-center justify-center rounded-xl text-navy-700 hover:bg-navy-50 focus-ring"
                  aria-label={t("back")}
                >
                  <ChevronLeft size={20} />
                </button>
                <Avatar
                  initials={active.employee.initials}
                  color={active.employee.avatarColor}
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-navy-900">
                    {active.employee.firstName} {active.employee.lastName}
                  </div>
                  <div className="text-xs text-ink/55">
                    {t("adm_emp_contract_meta", { city: active.employee.city, n: active.employee.contractHoursPerWeek })}
                  </div>
                </div>
              </div>
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto scroll-y p-6 space-y-3"
              >
                {active.thread.messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <MessageCircle size={36} className="text-ink/25" />
                    <p className="mt-3 font-bold text-navy-900">
                      {t("adm_no_conv")}
                    </p>
                    <p className="mt-1 max-w-xs text-sm text-ink/55">
                      {t("adm_no_conv_desc")}
                    </p>
                  </div>
                ) : (
                  active.thread.messages.map((m, i) => {
                    const fromMe = m.fromRole === "admin";
                    return (
                      <div
                        key={m.id}
                        className={cn(
                          "flex",
                          fromMe ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[68%] rounded-2xl px-4 py-2.5 text-sm shadow-card",
                            fromMe
                              ? "bg-navy-700 text-white rounded-br-md"
                              : "bg-white text-ink rounded-bl-md border border-line"
                          )}
                        >
                          <p className="leading-relaxed">{m.text}</p>
                          <div
                            className={cn(
                              "mt-1 text-[10px] font-semibold tabular",
                              fromMe ? "text-white/55" : "text-ink/45"
                            )}
                          >
                            {fmt.time(m.sentAt)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div
                className="border-t border-line bg-white p-3"
                style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.75rem)" }}
              >
                <div className="flex items-end gap-2">
                  <div className="flex-1 rounded-2xl border border-line bg-canvas focus-within:border-navy-700 focus-within:bg-white">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          send();
                        }
                      }}
                      rows={1}
                      placeholder={
                        threads.find((th) => th.id === active.thread.id)
                          ? t("adm_write_msg")
                          : t("adm_start_with", { name: active.employee.firstName })
                      }
                      className="w-full resize-none bg-transparent px-4 py-3 text-[15px] placeholder:text-ink/40 focus:outline-none"
                      style={{ maxHeight: "120px" }}
                    />
                  </div>
                  <button
                    onClick={send}
                    disabled={!text.trim()}
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-400 text-navy-900 transition hover:bg-gold-300 active:scale-95 disabled:opacity-40"
                    aria-label={t("adm_send_message")}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-ink/55">
              {t("adm_select_conv")}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
