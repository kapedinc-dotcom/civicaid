import { snapMaxAllotment } from "./fpl";
import type { AwardContext } from "./types";

export type AwardFormula =
  | "snap"
  | "wic"
  | "meals"
  | "pantry"
  | "tanf"
  | "eitc"
  | "ctc"
  | "medi-cal"
  | "chip"
  | "rent70"
  | "rent50"
  | "flat"
  | "zero";

export const AWARD_FORMULAS: AwardFormula[] = [
  "snap",
  "wic",
  "meals",
  "pantry",
  "tanf",
  "eitc",
  "ctc",
  "medi-cal",
  "chip",
  "rent70",
  "rent50",
  "flat",
  "zero",
];

function snapAward(ctx: AwardContext): number {
  const max = snapMaxAllotment(ctx.size);
  const contribution = Math.round(Math.max(0, ctx.monthlyIncome - ctx.monthlyRent) * 0.15);
  return Math.max(0, Math.min(max, max - contribution));
}

export function awardFn(formula: AwardFormula, amount = 0): (ctx: AwardContext) => number {
  switch (formula) {
    case "snap":
      return snapAward;
    case "wic":
      return (ctx) => {
        const young = ctx.children.filter((c) => c.age < 5).length;
        const pregnant = ctx.members.some((m) => m.pregnant) ? 1 : 0;
        return (young + pregnant) * 60;
      };
    case "meals":
      return (ctx) => ctx.children.filter((c) => c.age >= 5 && c.age <= 18).length * 148;
    case "pantry":
      return (ctx) => 48 * Math.min(ctx.size, 5);
    case "tanf":
      return (ctx) => {
        const base = 400 + 175 * Math.max(0, ctx.size - 1);
        const taper = Math.round(ctx.monthlyIncome * 0.5);
        return Math.max(0, base - taper);
      };
    case "eitc":
      return (ctx) => {
        const kids = ctx.children.length;
        const annual = kids >= 2 ? 7830 : kids === 1 ? 4213 : 632;
        return Math.round(annual / 12);
      };
    case "ctc":
      return (ctx) => Math.round((2000 * ctx.children.filter((c) => c.age < 17).length) / 12);
    case "medi-cal":
      return (ctx) => ctx.size * 210;
    case "chip":
      return (ctx) => ctx.children.filter((c) => c.age < 19).length * 180;
    case "rent70":
      return (ctx) => Math.round(ctx.monthlyRent * 0.7);
    case "rent50":
      return (ctx) => Math.round(ctx.monthlyRent * 0.5);
    case "flat":
      return () => Math.max(0, amount);
    case "zero":
      return () => 0;
  }
}

export const FORMULA_BY_ID: Record<string, { formula: AwardFormula; amount: number }> = {
  calfresh: { formula: "snap", amount: 0 },
  wic: { formula: "wic", amount: 0 },
  "school-meals": { formula: "meals", amount: 0 },
  "food-bank": { formula: "pantry", amount: 0 },
  csfp: { formula: "flat", amount: 50 },
  "meals-on-wheels": { formula: "flat", amount: 180 },
  fdpir: { formula: "snap", amount: 0 },
  calworks: { formula: "tanf", amount: 0 },
  ssi: { formula: "flat", amount: 967 },
  ssdi: { formula: "zero", amount: 0 },
  eitc: { formula: "eitc", amount: 0 },
  ctc: { formula: "ctc", amount: 0 },
  "general-relief": { formula: "flat", amount: 300 },
  liheap: { formula: "flat", amount: 75 },
  weatherize: { formula: "flat", amount: 200 },
  care: { formula: "flat", amount: 38 },
  "salvation-army": { formula: "flat", amount: 50 },
  "catholic-charities": { formula: "flat", amount: 50 },
  svdp: { formula: "flat", amount: 40 },
  csbg: { formula: "flat", amount: 60 },
  "fema-efsp": { formula: "flat", amount: 40 },
  lifeline: { formula: "flat", amount: 9 },
  "ca-lifeline": { formula: "flat", amount: 20 },
  section8: { formula: "rent70", amount: 0 },
  "public-housing": { formula: "rent50", amount: 0 },
  "hud-vash": { formula: "rent70", amount: 0 },
  "medi-cal": { formula: "medi-cal", amount: 0 },
  chip: { formula: "chip", amount: 0 },
};

export function formulaForId(
  id: string,
  fallbackAmount = 0,
): { formula: AwardFormula; amount: number } {
  return FORMULA_BY_ID[id] ?? { formula: fallbackAmount > 0 ? "flat" : "zero", amount: fallbackAmount };
}

export function parseAwardFormula(raw: string): AwardFormula | null {
  const key = raw.trim().toLowerCase() as AwardFormula;
  return AWARD_FORMULAS.includes(key) ? key : null;
}
