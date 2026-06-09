import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dayNames = ["zon", "maa", "din", "woe", "don", "vri", "zat"];
const dayNamesLong = [
  "zondag",
  "maandag",
  "dinsdag",
  "woensdag",
  "donderdag",
  "vrijdag",
  "zaterdag",
];
const monthNames = [
  "jan",
  "feb",
  "mrt",
  "apr",
  "mei",
  "jun",
  "jul",
  "aug",
  "sep",
  "okt",
  "nov",
  "dec",
];
const monthNamesLong = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];

export function formatDayShort(iso: string) {
  const d = new Date(iso);
  return `${dayNames[d.getDay()]} ${d.getDate()} ${monthNames[d.getMonth()]}`;
}

export function formatDayLong(iso: string) {
  const d = new Date(iso);
  return `${dayNamesLong[d.getDay()]} ${d.getDate()} ${monthNamesLong[d.getMonth()]}`;
}

export function formatDateOnly(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${monthNames[d.getMonth()]}`;
}

export function formatTime(iso: string) {
  const d = new Date(iso);
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function formatTimeRange(startISO: string, endISO: string) {
  return `${formatTime(startISO)}–${formatTime(endISO)}`;
}

export function hoursBetween(startISO: string, endISO: string) {
  return (new Date(endISO).getTime() - new Date(startISO).getTime()) / 36e5;
}

export function formatHours(hours: number) {
  const rounded = Math.round(hours * 10) / 10;
  return `${rounded.toString().replace(".", ",")} u`;
}

export function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function startOfWeek(date: Date) {
  const d = new Date(date);
  const dow = (d.getDay() + 6) % 7; // monday = 0
  d.setDate(d.getDate() - dow);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function relativeFrom(iso: string, nowISO: string) {
  const diffMs = new Date(iso).getTime() - new Date(nowISO).getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Vandaag";
  if (diffDays === 1) return "Morgen";
  if (diffDays === -1) return "Gisteren";
  if (diffDays > 1 && diffDays < 7) return `Over ${diffDays} dagen`;
  if (diffDays < -1 && diffDays > -7) return `${Math.abs(diffDays)} dagen geleden`;
  return formatDateOnly(iso);
}

export function timeAgo(iso: string, nowISO: string) {
  const diff = new Date(nowISO).getTime() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "zojuist";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} u`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} d`;
  return formatDateOnly(iso);
}
