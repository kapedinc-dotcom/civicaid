import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUsd(n: number, compact = false): string {
  const rounded = Math.round(n);
  if (compact && Math.abs(rounded) >= 1000) {
    const k = rounded / 1000;
    const digits = k >= 10 || Number.isInteger(k) ? 0 : 1;
    return `$${k.toFixed(digits)}k`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(rounded);
}

export function formatUsdMo(n: number, compact = false): string {
  return `${formatUsd(n, compact)}/mo`;
}

export function formatAward(
  n: number,
  kind: "monthly" | "seasonal" | "annual" | "one-time",
): { value: string; suffix: string } {
  if (kind === "seasonal") {
    return { value: formatUsd(n * 6), suffix: "/ winter season" };
  }
  if (kind === "annual") {
    return { value: formatUsd(n * 12), suffix: "/ year" };
  }
  if (kind === "one-time") {
    return { value: formatUsd(Math.max(n, n * 6)), suffix: " avg" };
  }
  return { value: formatUsd(n), suffix: "/mo" };
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function daysFromNow(days: number): Date {
  const d = new Date();
  d.setHours(23, 59, 0, 0);
  d.setDate(d.getDate() + days);
  return d;
}

export function msUntil(date: Date): number {
  return date.getTime() - Date.now();
}

export function plural(n: number, one: string, many = `${one}s`): string {
  return n === 1 ? one : many;
}

export function firstName(full: string): string {
  return full.trim().split(/\s+/)[0] ?? full;
}

export function greeting(): string {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: "America/Los_Angeles",
    }).format(new Date()),
  );
  const h = Number.isFinite(hour) ? hour % 24 : new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function caseId(shortName: string, zip: string, programId: string): string {
  const pre = shortName.replace(/[^a-z]/gi, "").slice(0, 2).toUpperCase() || "CA";
  let n = 0;
  for (const ch of `${programId}${zip}`) n = (n * 33 + ch.charCodeAt(0)) % 90000;
  return `${pre}-${String(10000 + n)}`;
}

export function emptyMember(
  id: string,
  name: string,
  age: number,
  role: "self" | "partner" | "child" | "elder" | "dependent",
): {
  id: string;
  name: string;
  age: number;
  role: typeof role;
  employed: boolean;
  student: boolean;
  disabled: boolean;
  pregnant: boolean;
  veteran: boolean;
} {
  return {
    id,
    name,
    age,
    role,
    employed: role !== "child",
    student: false,
    disabled: false,
    pregnant: false,
    veteran: false,
  };
}
