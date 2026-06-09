"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  AVAILABILITY,
  EMPLOYEES,
  MESSAGE_THREADS,
  MISSIONS,
  NOTIFICATIONS,
  REFERENCE_TODAY,
} from "./mock-data";
import type {
  AppNotification,
  AppRole,
  AvailabilityState,
  ChatMessage,
  Employee,
  EmployeeAvailability,
  MessageThread,
  Mission,
  MissionAssignment,
  MissionStatus,
  SessionState,
} from "@/types";
import { hoursBetween, startOfWeek, isoDate, addDays } from "./utils";

interface State {
  employees: Employee[];
  missions: Mission[];
  availability: EmployeeAvailability[];
  threads: MessageThread[];
  notifications: AppNotification[];
  session: SessionState;
  hydrated: boolean;
}

const initialState: State = {
  employees: EMPLOYEES,
  missions: MISSIONS,
  availability: AVAILABILITY,
  threads: MESSAGE_THREADS,
  notifications: NOTIFICATIONS,
  session: { role: null, employeeId: null },
  hydrated: false,
};

const STORAGE_KEY = "werkkompas-demo-state-v1";

type Action =
  | { type: "HYDRATE"; payload: State }
  | { type: "SET_SESSION"; payload: SessionState }
  | { type: "RESET_DEMO" }
  | {
      type: "RESPOND_MISSION";
      payload: { missionId: string; employeeId: string; status: Exclude<MissionStatus, "open"> };
    }
  | {
      type: "CREATE_MISSION";
      payload: Mission;
    }
  | {
      type: "UPDATE_MISSION";
      payload: { id: string; patch: Partial<Mission> };
    }
  | { type: "DELETE_MISSION"; payload: { id: string } }
  | {
      type: "INVITE_EMPLOYEE";
      payload: { missionId: string; employeeId: string };
    }
  | {
      type: "UNINVITE_EMPLOYEE";
      payload: { missionId: string; employeeId: string };
    }
  | {
      type: "SET_AVAILABILITY";
      payload: { employeeId: string; date: string; state: AvailabilityState | null };
    }
  | {
      type: "SEND_MESSAGE";
      payload: {
        threadId: string;
        employeeId?: string; // optional; required if thread doesn't exist yet
        fromRole: "admin" | "employee";
        text: string;
      };
    }
  | { type: "MARK_THREAD_READ"; payload: { threadId: string; role: "admin" | "employee" } }
  | { type: "MARK_NOTIF_READ"; payload: { id: string } }
  | { type: "MARK_ALL_NOTIFS_READ"; payload: { forEmployeeId?: string } }
  | { type: "CREATE_EMPLOYEE"; payload: Employee }
  | { type: "UPDATE_EMPLOYEE"; payload: { id: string; patch: Partial<Employee> } };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      return { ...action.payload, hydrated: true };

    case "SET_SESSION":
      return { ...state, session: action.payload };

    case "RESET_DEMO":
      return { ...initialState, session: state.session, hydrated: true };

    case "RESPOND_MISSION": {
      const { missionId, employeeId, status } = action.payload;
      const missions = state.missions.map((m) => {
        if (m.id !== missionId) return m;
        const others = m.assignments.filter((a) => a.employeeId !== employeeId);
        const newAssignment: MissionAssignment = {
          employeeId,
          status,
          respondedAt: new Date().toISOString(),
        };
        const assignments = [...others, newAssignment];
        const accepted = assignments.filter((a) => a.status === "geaccepteerd").length;
        const missionStatus: MissionStatus =
          accepted >= m.headcount
            ? "geaccepteerd"
            : assignments.length > 0
              ? "uitgenodigd"
              : "open";
        return { ...m, assignments, status: missionStatus };
      });

      // Add an admin notification
      const mission = state.missions.find((m) => m.id === missionId);
      const employee = state.employees.find((e) => e.id === employeeId);
      const notif: AppNotification = {
        id: `notif-${Date.now()}`,
        kind: status === "geaccepteerd" ? "geaccepteerd" : "afgewezen",
        title: `${employee?.firstName ?? "Medewerker"} ${status === "geaccepteerd" ? "accepteerde" : "wees af"}: ${mission?.title ?? ""}`,
        body: mission?.client ?? "",
        createdAt: new Date().toISOString(),
        read: false,
        missionId,
      };
      return {
        ...state,
        missions,
        notifications: [notif, ...state.notifications],
      };
    }

    case "CREATE_MISSION": {
      const mission = action.payload;
      // Notify invited employees
      const notifs: AppNotification[] = mission.invitedEmployeeIds.map((empId, i) => ({
        id: `notif-${Date.now()}-${i}`,
        kind: "nieuwe-opdracht",
        title: "Nieuwe opdracht beschikbaar",
        body: `${mission.title} - ${mission.client}`,
        createdAt: new Date().toISOString(),
        read: false,
        forEmployeeId: empId,
        missionId: mission.id,
      }));
      return {
        ...state,
        missions: [mission, ...state.missions],
        notifications: [...notifs, ...state.notifications],
      };
    }

    case "UPDATE_MISSION":
      return {
        ...state,
        missions: state.missions.map((m) =>
          m.id === action.payload.id ? { ...m, ...action.payload.patch } : m
        ),
      };

    case "DELETE_MISSION":
      return {
        ...state,
        missions: state.missions.filter((m) => m.id !== action.payload.id),
      };

    case "INVITE_EMPLOYEE": {
      const { missionId, employeeId } = action.payload;
      const mission = state.missions.find((m) => m.id === missionId);
      const notif: AppNotification | null = mission
        ? {
            id: `notif-${Date.now()}`,
            kind: "nieuwe-opdracht",
            title: "Nieuwe opdracht beschikbaar",
            body: `${mission.title} - ${mission.client}`,
            createdAt: new Date().toISOString(),
            read: false,
            forEmployeeId: employeeId,
            missionId,
          }
        : null;
      return {
        ...state,
        missions: state.missions.map((m) =>
          m.id === missionId && !m.invitedEmployeeIds.includes(employeeId)
            ? { ...m, invitedEmployeeIds: [...m.invitedEmployeeIds, employeeId] }
            : m
        ),
        notifications: notif ? [notif, ...state.notifications] : state.notifications,
      };
    }

    case "UNINVITE_EMPLOYEE": {
      const { missionId, employeeId } = action.payload;
      return {
        ...state,
        missions: state.missions.map((m) =>
          m.id === missionId
            ? {
                ...m,
                invitedEmployeeIds: m.invitedEmployeeIds.filter((id) => id !== employeeId),
                assignments: m.assignments.filter((a) => a.employeeId !== employeeId),
              }
            : m
        ),
      };
    }

    case "SET_AVAILABILITY": {
      const { employeeId, date, state: avState } = action.payload;
      const existing = state.availability.find((a) => a.employeeId === employeeId);
      if (!existing) {
        return {
          ...state,
          availability: [
            ...state.availability,
            { employeeId, entries: avState ? [{ date, state: avState }] : [] },
          ],
        };
      }
      const filtered = existing.entries.filter((e) => e.date !== date);
      const entries = avState ? [...filtered, { date, state: avState }] : filtered;
      return {
        ...state,
        availability: state.availability.map((a) =>
          a.employeeId === employeeId ? { ...a, entries } : a
        ),
      };
    }

    case "SEND_MESSAGE": {
      const { threadId, fromRole, text, employeeId } = action.payload;
      const id = `msg-${Date.now()}`;
      const message: ChatMessage = {
        id,
        threadId,
        fromRole,
        text,
        sentAt: new Date().toISOString(),
        read: false,
      };

      let threads = state.threads;
      let existing = state.threads.find((t) => t.id === threadId);

      // Create the thread on the fly if it doesn't exist yet
      if (!existing && employeeId) {
        existing = {
          id: threadId,
          employeeId,
          messages: [],
          unread: 0,
        };
        threads = [...state.threads, existing];
      }

      threads = threads.map((t) =>
        t.id === threadId
          ? {
              ...t,
              messages: [...t.messages, message],
              unread: t.unread,
            }
          : t
      );

      const thread = existing;
      const employee = state.employees.find((e) => e.id === thread?.employeeId);
      const notif: AppNotification = {
        id: `notif-${Date.now()}`,
        kind: "bericht",
        title:
          fromRole === "admin"
            ? "Bericht van planning"
            : `Bericht van ${employee?.firstName ?? "medewerker"}`,
        body: text.length > 80 ? text.slice(0, 80) + "…" : text,
        createdAt: new Date().toISOString(),
        read: false,
        forEmployeeId: fromRole === "admin" ? thread?.employeeId : undefined,
      };
      return {
        ...state,
        threads,
        notifications: [notif, ...state.notifications],
      };
    }

    case "MARK_THREAD_READ": {
      return {
        ...state,
        threads: state.threads.map((t) =>
          t.id === action.payload.threadId
            ? {
                ...t,
                unread: 0,
                messages: t.messages.map((m) => ({ ...m, read: true })),
              }
            : t
        ),
      };
    }

    case "MARK_NOTIF_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload.id ? { ...n, read: true } : n
        ),
      };

    case "MARK_ALL_NOTIFS_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => {
          if (action.payload.forEmployeeId) {
            return n.forEmployeeId === action.payload.forEmployeeId
              ? { ...n, read: true }
              : n;
          }
          return n.forEmployeeId ? n : { ...n, read: true };
        }),
      };

    case "CREATE_EMPLOYEE":
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };

    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((e) =>
          e.id === action.payload.id ? { ...e, ...action.payload.patch } : e
        ),
      };

    default:
      return state;
  }
}

interface Ctx extends State {
  dispatch: React.Dispatch<Action>;
  // selectors / helpers
  getEmployee: (id: string | null | undefined) => Employee | undefined;
  getEmployeeAvailability: (id: string) => EmployeeAvailability | undefined;
  hoursWorkedThisWeek: (employeeId: string, weekStart?: Date) => number;
  checkCaoConflict: (employeeId: string, missionId: string) => {
    overContract: boolean;
    overCao: boolean;
    weeklyHours: number;
    contractHours: number;
    caoMax: number;
    missionHours: number;
  };
  unreadNotifsForEmployee: (employeeId: string) => number;
  unreadNotifsForAdmin: () => number;
  unreadMessagesForAdmin: () => number;
  unreadMessagesForEmployee: (employeeId: string) => number;
}

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as State;
        dispatch({ type: "HYDRATE", payload: { ...initialState, ...parsed, hydrated: true } });
      } else {
        dispatch({ type: "HYDRATE", payload: { ...initialState, hydrated: true } });
      }
    } catch {
      dispatch({ type: "HYDRATE", payload: { ...initialState, hydrated: true } });
    }
  }, []);

  // persist on change (debounced)
  useEffect(() => {
    if (!state.hydrated) return;
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // ignore
      }
    }, 150);
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, [state]);

  const getEmployee = useCallback(
    (id: string | null | undefined) =>
      id ? state.employees.find((e) => e.id === id) : undefined,
    [state.employees]
  );

  const getEmployeeAvailability = useCallback(
    (id: string) => state.availability.find((a) => a.employeeId === id),
    [state.availability]
  );

  const hoursWorkedThisWeek = useCallback(
    (employeeId: string, weekStart?: Date) => {
      const start = weekStart ?? startOfWeek(new Date(REFERENCE_TODAY));
      const end = addDays(start, 7);
      return state.missions
        .filter((m) =>
          m.assignments.some(
            (a) => a.employeeId === employeeId && a.status === "geaccepteerd"
          )
        )
        .filter((m) => {
          const t = new Date(m.startISO).getTime();
          return t >= start.getTime() && t < end.getTime();
        })
        .reduce((sum, m) => sum + hoursBetween(m.startISO, m.endISO), 0);
    },
    [state.missions]
  );

  const checkCaoConflict = useCallback(
    (employeeId: string, missionId: string) => {
      const mission = state.missions.find((m) => m.id === missionId);
      const employee = state.employees.find((e) => e.id === employeeId);
      const missionHours = mission ? hoursBetween(mission.startISO, mission.endISO) : 0;
      const weekStart = mission ? startOfWeek(new Date(mission.startISO)) : undefined;
      const already = hoursWorkedThisWeek(employeeId, weekStart);
      const total = already + missionHours;
      const contractHours = employee?.contractHoursPerWeek ?? 40;
      const caoMax = employee?.caoMaxHoursPerWeek ?? 48;
      return {
        overContract: total > contractHours,
        overCao: total > caoMax,
        weeklyHours: total,
        contractHours,
        caoMax,
        missionHours,
      };
    },
    [state.missions, state.employees, hoursWorkedThisWeek]
  );

  const unreadNotifsForEmployee = useCallback(
    (employeeId: string) =>
      state.notifications.filter((n) => !n.read && n.forEmployeeId === employeeId).length,
    [state.notifications]
  );

  const unreadNotifsForAdmin = useCallback(
    () => state.notifications.filter((n) => !n.read && !n.forEmployeeId).length,
    [state.notifications]
  );

  const unreadMessagesForAdmin = useCallback(
    () =>
      state.threads.reduce(
        (sum, t) =>
          sum +
          t.messages.filter((m) => m.fromRole === "employee" && !m.read).length,
        0
      ),
    [state.threads]
  );

  const unreadMessagesForEmployee = useCallback(
    (employeeId: string) => {
      const thread = state.threads.find((t) => t.employeeId === employeeId);
      if (!thread) return 0;
      return thread.messages.filter((m) => m.fromRole === "admin" && !m.read).length;
    },
    [state.threads]
  );

  const value: Ctx = useMemo(
    () => ({
      ...state,
      dispatch,
      getEmployee,
      getEmployeeAvailability,
      hoursWorkedThisWeek,
      checkCaoConflict,
      unreadNotifsForEmployee,
      unreadNotifsForAdmin,
      unreadMessagesForAdmin,
      unreadMessagesForEmployee,
    }),
    [
      state,
      getEmployee,
      getEmployeeAvailability,
      hoursWorkedThisWeek,
      checkCaoConflict,
      unreadNotifsForEmployee,
      unreadNotifsForAdmin,
      unreadMessagesForAdmin,
      unreadMessagesForEmployee,
    ]
  );

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

// Convenience hook that does light client mount gating to avoid hydration mismatch
export function useHydrated() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
