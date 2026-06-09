"use client";

import { useEffect, useRef, useState } from "react";
import { AppHeader } from "@/components/employee/AppHeader";
import { useStore } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";
import { Send, MessageCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT, useFormat } from "@/lib/i18n";

export default function EmployeeMessagesPage() {
  const { session, threads, dispatch, getEmployee } = useStore();
  const { t } = useT();
  const fmt = useFormat();
  const employee = getEmployee(session.employeeId);
  const thread = threads.find((t) => t.employeeId === session.employeeId);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (thread) {
      dispatch({
        type: "MARK_THREAD_READ",
        payload: { threadId: thread.id, role: "employee" },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thread?.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [thread?.messages.length]);

  const send = () => {
    if (!text.trim() || !session.employeeId) return;
    const threadId = thread?.id ?? `thr-${session.employeeId}`;
    dispatch({
      type: "SEND_MESSAGE",
      payload: {
        threadId,
        employeeId: session.employeeId,
        fromRole: "employee",
        text: text.trim(),
      },
    });
    setText("");
  };

  if (!employee) return null;

  return (
    <main className="animate-fade-in flex h-[100dvh] flex-col">
      <AppHeader variant="subpage" title={t("e_msgs_title")} />
      <div className="flex-1 flex flex-col min-h-0">
        <div className="border-b border-line bg-white px-5 py-3 flex items-center gap-3">
          <div className="relative">
            <Avatar initials="WP" color="#002F5C" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <div className="font-bold text-navy-900">{t("e_planning_name")}</div>
              <ShieldCheck size={12} className="text-navy-700" />
            </div>
            <div className="text-xs text-emerald-700 font-semibold">
              {t("e_planning_response")}
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto scroll-y bg-canvas px-4 py-4 space-y-3"
        >
          {!thread || thread.messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <MessageCircle size={36} className="text-ink/25" />
              <p className="mt-3 font-bold text-navy-900">{t("e_empty_msgs")}</p>
              <p className="mt-1 max-w-xs text-sm text-ink/55">
                {t("e_empty_msgs_desc")}
              </p>
            </div>
          ) : (
            thread.messages.map((m, i) => {
              const fromMe = m.fromRole === "employee";
              const prev = thread.messages[i - 1];
              const showHeader = !prev || prev.fromRole !== m.fromRole;
              return (
                <div
                  key={m.id}
                  className={cn("flex", fromMe ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm shadow-card",
                      fromMe
                        ? "bg-navy-700 text-white rounded-br-md"
                        : "bg-white text-ink rounded-bl-md border border-line"
                    )}
                  >
                    {showHeader && !fromMe && (
                      <div className="text-[10px] font-bold uppercase tracking-widest text-navy-700/70 mb-0.5">
                        {t("e_planning_label")}
                      </div>
                    )}
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
          <div className="container-mobile flex items-end gap-2">
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
                placeholder={t("e_write_msg")}
                className="w-full resize-none bg-transparent px-4 py-3 text-[15px] placeholder:text-ink/40 focus:outline-none"
                style={{ maxHeight: "120px" }}
              />
            </div>
            <button
              onClick={send}
              disabled={!text.trim()}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-400 text-navy-900 transition hover:bg-gold-300 active:scale-95 disabled:opacity-40 disabled:active:scale-100"
              aria-label={t("adm_send_message")}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
