import { daysFromNow } from "@/lib/utils";
import { federalPovertyLevel, percentOfFpl } from "./fpl";
import { getPrograms } from "./live-catalog";
import type {
  Application,
  AwardContext,
  Household,
  MatchResult,
  PartyMember,
  Program,
  Rule,
  VerifyKey,
} from "./types";

const DIRECT_IDS = new Set(["calfresh", "wic", "liheap", "care", "lifeline", "food-bank"]);

export function awardContext(h: Household): AwardContext {
  const size = Math.max(1, h.members.length);
  const annualIncome = h.monthlyIncome * 12;
  const fpl = federalPovertyLevel(size);
  const fplPct = percentOfFpl(annualIncome, size);
  const children = h.members.filter((m) => m.role === "child" || m.age < 18);
  return {
    size,
    annualIncome,
    monthlyIncome: h.monthlyIncome,
    monthlyRent: h.monthlyRent,
    fpl,
    fplPct,
    children,
    members: h.members,
    state: h.state,
    renting: h.monthlyRent > 0,
  };
}

function evalRule(
  rule: Rule,
  ctx: AwardContext,
  verified: Household["verified"],
): { ok: boolean; required: boolean; note: string } {
  switch (rule.type) {
    case "max_fpl": {
      const cap = rule.percent;
      const ok = ctx.fplPct <= cap + 8;
      const close = ctx.fplPct <= cap + 25;
      return {
        ok,
        required: true,
        note: ok
          ? `Income is ${Math.round(ctx.fplPct)}% of poverty (limit ~${cap}%).`
          : close
            ? `Income is close to the cap (${Math.round(ctx.fplPct)}% vs ${cap}%).`
            : `Income is above the cap (${Math.round(ctx.fplPct)}% vs ${cap}%).`,
      };
    }
    case "child_under": {
      const ok = ctx.children.some((c) => c.age < rule.age);
      return {
        ok,
        required: true,
        note: ok
          ? `A child under ${rule.age} is in the household.`
          : `Needs a child under ${rule.age}.`,
      };
    }
    case "min_children": {
      const pool = ctx.children.filter((c) =>
        rule.ageMax == null ? true : c.age < rule.ageMax,
      );
      const ok = pool.length >= rule.count;
      return {
        ok,
        required: true,
        note: ok
          ? `${pool.length} qualifying ${pool.length === 1 ? "child" : "children"} in the household.`
          : `Needs ${rule.count}+ child${rule.count > 1 ? "ren" : ""}` +
            (rule.ageMax ? ` under ${rule.ageMax}` : "") +
            ".",
      };
    }
    case "working_or_student": {
      const ok = ctx.members.some((m) => m.employed || m.student);
      return {
        ok,
        required: true,
        note: ok
          ? "Someone in the household is working or in school."
          : "Needs a working or student adult.",
      };
    }
    case "renting": {
      return {
        ok: ctx.renting,
        required: true,
        note: ctx.renting ? "Household is renting." : "Needs a listed rental cost.",
      };
    }
    case "has_disabled": {
      const ok = ctx.members.some((m) => m.disabled);
      return {
        ok,
        required: true,
        note: ok
          ? "A household member has a disability."
          : "Needs a disability on a household member.",
      };
    }
    case "has_veteran": {
      const ok = ctx.members.some((m) => m.veteran);
      return {
        ok,
        required: true,
        note: ok
          ? "A household member is a veteran."
          : "Needs a veteran or active-duty member.",
      };
    }
    case "min_age": {
      const ok = ctx.members.some((m) => m.age >= rule.age);
      return {
        ok,
        required: true,
        note: ok
          ? `A household member is ${rule.age}+.`
          : `Needs a household member age ${rule.age}+.`,
      };
    }
    case "tribal": {
      return {
        ok: false,
        required: true,
        note: "Must live on or near a participating reservation or FDPIR service area.",
      };
    }
    case "pregnant_or_young_child": {
      const ok =
        ctx.members.some((m) => m.pregnant) || ctx.children.some((c) => c.age < rule.age);
      return {
        ok,
        required: true,
        note: ok
          ? "Pregnancy or a young child is listed."
          : `Needs pregnancy or a child under ${rule.age}.`,
      };
    }
    case "state": {
      const ok = rule.states.includes(ctx.state);
      return {
        ok,
        required: true,
        note: ok
          ? `Available in ${ctx.state}.`
          : `This listing is for ${rule.states.join(", ")}.`,
      };
    }
    case "requires_verify": {
      const ok = verified[rule.badge];
      return {
        ok,
        required: false,
        note: ok
          ? `${labelBadge(rule.badge)} is verified.`
          : `${labelBadge(rule.badge)} still needs a document — award is estimated.`,
      };
    }
    default:
      return { ok: true, required: false, note: "" };
  }
}

export function labelBadge(key: VerifyKey): string {
  switch (key) {
    case "identity":
      return "Identity";
    case "income":
      return "Income";
    case "residency":
      return "Residency";
    case "household":
      return "Household";
  }
}

export function matchProgram(program: Program, household: Household): MatchResult {
  const ctx = awardContext(household);
  const reasons: string[] = [];
  const blockers: string[] = [];
  let requiredFails = 0;
  let requiredPasses = 0;
  let bonus = 0;

  for (const rule of program.rules) {
    const result = evalRule(rule, ctx, household.verified);
    if (result.required) {
      if (result.ok) {
        requiredPasses += 1;
        reasons.push(result.note);
      } else {
        requiredFails += 1;
        blockers.push(result.note);
      }
    } else if (result.ok) {
      bonus += 8;
      reasons.push(result.note);
    } else {
      reasons.push(result.note);
    }
  }

  if (program.listing === "directory") {
    reasons.push("Open directory — this is a locator, not a payout.");
  }
  if (program.listing === "advisory") {
    blockers.push(program.notes || "This is a reality check, not a program you can apply for.");
  }

  const eligible = program.listing === "advisory" ? false : requiredFails === 0;
  const requiredRules = program.rules.filter((r) => r.type !== "requires_verify");
  const ruleTotal = requiredRules.length;
  let score =
    ruleTotal === 0
      ? eligible
        ? 78 + bonus
        : 20
      : Math.round((requiredPasses / Math.max(1, ruleTotal)) * 72 + bonus);
  if (eligible && ruleTotal > 0) score += 18;
  if (program.urgent && eligible) score += 4;
  if (household.verified.identity) score += 2;
  if (program.listing === "directory" && eligible) score = Math.max(score, 70);
  if (program.listing === "advisory") score = 8;

  const rawAward = Math.max(0, program.award(ctx));
  let monthlyAward = eligible && program.listing === "benefit" ? rawAward : 0;
  if (eligible && program.listing === "benefit" && rawAward <= 0) {
    reasons.push("In-kind or waitlist help — not a monthly cash award.");
  }
  score = Math.max(8, Math.min(99, score));

  const missingDocs = program.documents.filter((doc) => isDocMissing(doc, household.verified));

  return {
    program,
    eligible,
    score,
    monthlyAward,
    reasons,
    blockers,
    missingDocs,
    deadline: program.deadlineDays != null ? daysFromNow(program.deadlineDays) : null,
  };
}

export function isDocMissing(doc: string, verified: Household["verified"]): boolean {
  const d = doc.toLowerCase();
  if ((/\b(photo\s*)?id\b/.test(d) || d.includes("photo id")) && !verified.identity) return true;
  if (
    (d.includes("income") || d.includes("w-2") || d.includes("pay stub") || d.includes("1099")) &&
    !verified.income
  )
    return true;
  if (
    (d.includes("address") ||
      d.includes("lease") ||
      d.includes("residency") ||
      d.includes("utility") ||
      d.includes("shutoff") ||
      d.includes("past-due")) &&
    !verified.residency
  )
    return true;
  if (
    (d.includes("birth") ||
      d.includes("ssn") ||
      d.includes("immunization") ||
      d.includes("household") ||
      d.includes("child")) &&
    !verified.household
  )
    return true;
  return false;
}

export function matchAll(household: Household, programs = getPrograms()): MatchResult[] {
  return programs.map((p) => matchProgram(p, household)).sort((a, b) => {
    const rank = (m: MatchResult) =>
      m.program.listing === "advisory" ? 2 : m.program.listing === "directory" ? 1 : 0;
    if (rank(a) !== rank(b)) return rank(a) - rank(b);
    if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
    if (a.program.urgent !== b.program.urgent) return a.program.urgent ? -1 : 1;
    return b.score - a.score;
  });
}

export type MatchTier = "qualify" | "close" | "explore";

export function matchTier(m: MatchResult): MatchTier {
  if (m.program.listing !== "benefit") return "explore";
  if (m.eligible) return "qualify";
  if (m.score >= 48) return "close";
  return "explore";
}

export function tierMatches(matches: MatchResult[], tier: MatchTier): MatchResult[] {
  return matches.filter((m) => matchTier(m) === tier);
}

export function sortByRelevance(matches: MatchResult[]): MatchResult[] {
  const rank = (m: MatchResult) => (matchTier(m) === "qualify" ? 0 : matchTier(m) === "close" ? 1 : 2);
  return [...matches].sort((a, b) => {
    if (rank(a) !== rank(b)) return rank(a) - rank(b);
    if (a.score !== b.score) return b.score - a.score;
    if (a.monthlyAward !== b.monthlyAward) return b.monthlyAward - a.monthlyAward;
    return a.missingDocs.length - b.missingDocs.length;
  });
}

export function potentialMonthly(matches: MatchResult[]): number {
  return matches
    .filter((m) => m.eligible && m.program.listing === "benefit")
    .reduce((sum, m) => sum + m.monthlyAward, 0);
}

export function isDirectSupport(program: Program): boolean {
  return DIRECT_IDS.has(program.id);
}

export function directSupportMonthly(matches: MatchResult[]): number {
  return matches
    .filter((m) => m.eligible && isDirectSupport(m.program))
    .reduce((sum, m) => sum + m.monthlyAward, 0);
}

export function incomeCapMonthly(program: Program, size: number): number | null {
  const rule = program.rules.find((r): r is Extract<Rule, { type: "max_fpl" }> => r.type === "max_fpl");
  if (!rule) return null;
  return Math.round((federalPovertyLevel(size) * rule.percent) / 100 / 12);
}

export function unlockedMonthly(
  applications: Record<string, Application>,
  matches: MatchResult[],
): number {
  let total = 0;
  for (const app of Object.values(applications)) {
    if (app.status !== "awarded") continue;
    const match = matches.find((m) => m.program.id === app.programId);
    total += app.monthlyAward || match?.monthlyAward || 0;
  }
  return total;
}

export function activeSlotCount(applications: Record<string, Application>): number {
  const active = Object.values(applications).filter((a) =>
    ["submitted", "in-review", "needs-docs", "bundled"].includes(a.status),
  );
  const bundleIds = new Set(active.map((a) => a.bundleId).filter(Boolean));
  const unbundled = active.filter((a) => !a.bundleId).length;
  return unbundled + bundleIds.size;
}

export function sealCount(v: Household["verified"]): number {
  return (["identity", "income", "residency", "household"] as VerifyKey[]).filter(
    (k) => v[k],
  ).length;
}

export function roleLabel(role: PartyMember["role"]): string {
  switch (role) {
    case "self":
      return "You";
    case "partner":
      return "Partner";
    case "child":
      return "Child";
    case "elder":
      return "Elder";
    case "dependent":
      return "Dependent";
  }
}

export function sourceLabel(source: Program["source"]): string {
  switch (source) {
    case "federal":
      return "Federal";
    case "state":
      return "State";
    case "nonprofit":
      return "Nonprofit";
  }
}
