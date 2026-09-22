import type { Rank } from "./types";

export const RANKS: Rank[] = [
  { level: 1, name: "Newcomer", minXp: 0, slots: 3 },
  { level: 2, name: "Resident", minXp: 100, slots: 4 },
  { level: 3, name: "Steward", minXp: 240, slots: 5 },
  { level: 4, name: "Advocate", minXp: 480, slots: 6 },
  { level: 5, name: "Warden", minXp: 820, slots: 7 },
];

export function rankFor(xp: number): Rank {
  let current = RANKS[0]!;
  for (const r of RANKS) {
    if (xp >= r.minXp) current = r;
  }
  return current;
}

export function nextRank(xp: number): Rank | null {
  const current = rankFor(xp);
  return RANKS.find((r) => r.level === current.level + 1) ?? null;
}

export function rankProgress(xp: number): number {
  const current = rankFor(xp);
  const nxt = nextRank(xp);
  if (!nxt) return 1;
  const span = nxt.minXp - current.minXp;
  if (span <= 0) return 1;
  return (xp - current.minXp) / span;
}
