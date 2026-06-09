export type Certification =
  | "Beveiliger 2"
  | "Evenementenbeveiliger"
  | "Persoonsbeveiliger"
  | "Centralist"
  | "BHV"
  | "EHBO"
  | "Hondengeleider"
  | "Horeca Portier";

export type MissionType =
  | "Evenement"
  | "Object"
  | "Winkel"
  | "Mobiele surveillance"
  | "Persoonsbeveiliging"
  | "Horeca";

export type MissionStatus = "open" | "uitgenodigd" | "geaccepteerd" | "afgewezen" | "voltooid";

export type EmployeeStatus = "actief" | "verlof" | "ziek" | "inactief";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
  email: string;
  phone: string;
  city: string;
  status: EmployeeStatus;
  certifications: Certification[];
  contractHoursPerWeek: number; // contractuele uren
  caoMaxHoursPerWeek: number; // CAO bovengrens
  hireDate: string; // ISO date
  rating: number; // 1-5
  avatarColor: string; // hex
}

export interface MissionAssignment {
  employeeId: string;
  status: Exclude<MissionStatus, "open">;
  respondedAt?: string; // ISO datetime
}

export interface Mission {
  id: string;
  title: string;
  client: string;
  type: MissionType;
  location: string;
  address: string;
  city: string;
  startISO: string; // start date+time
  endISO: string;
  hourlyRate: number; // EUR
  requiredCertifications: Certification[];
  headcount: number; // total guards needed
  description: string;
  instructions: string;
  // invitedEmployeeIds: shown in the employee's open list
  invitedEmployeeIds: string[];
  // assignments: those who accepted/declined
  assignments: MissionAssignment[];
  status: MissionStatus;
  createdAt: string;
}

export type AvailabilityState = "beschikbaar" | "voorkeur" | "niet";

export interface AvailabilityEntry {
  date: string; // YYYY-MM-DD
  state: AvailabilityState;
  note?: string;
}

export interface EmployeeAvailability {
  employeeId: string;
  entries: AvailabilityEntry[];
}

export interface MessageThread {
  id: string;
  employeeId: string; // the employee in the thread (other party is admin)
  messages: ChatMessage[];
  unread: number;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  fromRole: "employee" | "admin";
  text: string;
  sentAt: string; // ISO
  read: boolean;
}

export type NotificationKind =
  | "nieuwe-opdracht"
  | "geaccepteerd"
  | "afgewezen"
  | "wijziging"
  | "bericht";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  // optional targeting: which employee should see this (undefined = admin)
  forEmployeeId?: string;
  missionId?: string;
}

export type AppRole = "employee" | "admin";

export interface SessionState {
  role: AppRole | null;
  employeeId: string | null;
}
