import { useSyncExternalStore } from "react";
import { PROGRAMS } from "./catalog";
import type { Program } from "./types";

export type CatalogSource = "bundled" | "drive" | "url";

export interface CatalogMeta {
  source: CatalogSource;
  lastSynced: number | null;
  lastChecked: number | null;
  modifiedTime?: string;
  error: string | null;
  pending: boolean;
  loginRequired: boolean;
  loginUrl?: string;
  name?: string;
  webViewLink?: string;
  fileId?: string;
}

let current: Program[] = PROGRAMS;
let meta: CatalogMeta = {
  source: "bundled",
  lastSynced: null,
  lastChecked: null,
  error: null,
  pending: false,
  loginRequired: false,
};
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

export function getPrograms(): Program[] {
  return current;
}

export function getCatalogMeta(): CatalogMeta {
  return meta;
}

export function setPrograms(next: Program[]): void {
  current = next.length > 0 ? next : PROGRAMS;
  emit();
}

export function setCatalogMeta(patch: Partial<CatalogMeta>): void {
  meta = { ...meta, ...patch };
  emit();
}

export function resetPrograms(): void {
  current = PROGRAMS;
  meta = {
    source: "bundled",
    lastSynced: null,
    lastChecked: null,
    error: null,
    pending: false,
    loginRequired: false,
  };
  emit();
}

export function subscribePrograms(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function programById(id: string): Program | undefined {
  return current.find((p) => p.id === id);
}

export function useLivePrograms(): Program[] {
  return useSyncExternalStore(subscribePrograms, getPrograms, getPrograms);
}

export function useCatalogMeta(): CatalogMeta {
  return useSyncExternalStore(subscribePrograms, getCatalogMeta, getCatalogMeta);
}
