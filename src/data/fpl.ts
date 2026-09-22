/** 2025 HHS poverty guidelines, 48 contiguous states. */
const BASE = 15650;
const PER = 5500;

export function federalPovertyLevel(householdSize: number): number {
  const size = Math.max(1, Math.round(householdSize));
  return BASE + PER * (size - 1);
}

export function percentOfFpl(annualIncome: number, size: number): number {
  const fpl = federalPovertyLevel(size);
  if (fpl <= 0) return 0;
  return (annualIncome / fpl) * 100;
}

export function snapMaxAllotment(size: number): number {
  const table = [0, 292, 536, 768, 975, 1158, 1390, 1536, 1756];
  const n = Math.max(1, Math.round(size));
  if (n < table.length) return table[n]!;
  return 1756 + 220 * (n - 8);
}
