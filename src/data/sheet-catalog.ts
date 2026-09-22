import { CATEGORY_IMAGES, CATEGORY_META, FILTERS } from "./catalog";
import { formulaForId, parseAwardFormula, type AwardFormula, awardFn } from "./awards";
import type {
  Category,
  ListingKind,
  Program,
  ProgramSource,
  Rule,
  ValueKind,
  VerifyKey,
} from "./types";

export const SHEET_HEADERS = [
  "id",
  "active",
  "short_name",
  "name",
  "agency",
  "category",
  "listing",
  "value_kind",
  "source",
  "summary",
  "receive",
  "website",
  "apply_url",
  "phone",
  "timeline",
  "cost",
  "income_guideline",
  "how_to_apply",
  "notes",
  "documents",
  "max_fpl",
  "child_under",
  "min_children",
  "min_children_age_max",
  "min_age",
  "needs_veteran",
  "needs_disabled",
  "needs_pregnant_or_child",
  "needs_renting",
  "needs_working",
  "tribal",
  "states",
  "verify",
  "award_formula",
  "award_amount",
  "urgent",
  "deadline_days",
  "image",
] as const;

const CAT_FROM_LABEL: Record<string, Category> = {
  food: "nutrition",
  nutrition: "nutrition",
  cash: "cash",
  tax: "tax",
  "tax credits": "tax",
  bills: "energy",
  energy: "energy",
  phone: "phone",
  housing: "housing",
  rides: "transport",
  vehicles: "transport",
  transport: "transport",
  goods: "goods",
  vision: "vision",
  health: "health",
  help: "navigator",
  directories: "navigator",
  navigator: "navigator",
};

function csvEscape(value: string | number | boolean | undefined): string {
  const s = value == null ? "" : String(value);
  if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let i = 0;
  let quoted = false;
  const src = text.replace(/^\uFEFF/, "");
  while (i < src.length) {
    const ch = src[i]!;
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i += 2;
          continue;
        }
        quoted = false;
        i += 1;
        continue;
      }
      cell += ch;
      i += 1;
      continue;
    }
    if (ch === '"') {
      quoted = true;
      i += 1;
      continue;
    }
    if (ch === ",") {
      row.push(cell);
      cell = "";
      i += 1;
      continue;
    }
    if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i += 1;
      row.push(cell);
      if (row.some((c) => c.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
      i += 1;
      continue;
    }
    cell += ch;
    i += 1;
  }
  row.push(cell);
  if (row.some((c) => c.trim() !== "")) rows.push(row);
  return rows;
}

function asBool(raw: string | undefined): boolean {
  return /^(true|yes|1|y|x)$/i.test((raw ?? "").trim());
}

function asNum(raw: string | undefined): number | undefined {
  const t = (raw ?? "").trim();
  if (!t) return undefined;
  const n = Number(t);
  return Number.isFinite(n) ? n : undefined;
}

function normalizeHeader(h: string): string {
  return h.trim().toLowerCase().replace(/\s+/g, "_");
}

function parseCategory(raw: string): Category {
  const key = raw.trim().toLowerCase();
  return CAT_FROM_LABEL[key] ?? "navigator";
}

function parseListing(raw: string): ListingKind {
  const key = raw.trim().toLowerCase();
  if (key === "directory" || key === "directories") return "directory";
  if (key === "advisory" || key === "myth") return "advisory";
  return "benefit";
}

function parseValueKind(raw: string): ValueKind {
  const key = raw.trim().toLowerCase();
  if (key === "seasonal" || key === "annual" || key === "one-time" || key === "monthly") return key;
  return "one-time";
}

function parseSource(raw: string): ProgramSource {
  const key = raw.trim().toLowerCase();
  if (key === "state" || key === "nonprofit") return key;
  return "federal";
}

function rulesFromRow(row: Record<string, string>): Rule[] {
  const rules: Rule[] = [];
  const maxFpl = asNum(row.max_fpl);
  if (maxFpl != null) rules.push({ type: "max_fpl", percent: maxFpl });
  const childUnder = asNum(row.child_under);
  if (childUnder != null) rules.push({ type: "child_under", age: childUnder });
  const minChildren = asNum(row.min_children);
  if (minChildren != null) {
    rules.push({
      type: "min_children",
      count: minChildren,
      ageMax: asNum(row.min_children_age_max),
    });
  }
  const minAge = asNum(row.min_age);
  if (minAge != null) rules.push({ type: "min_age", age: minAge });
  if (asBool(row.needs_veteran)) rules.push({ type: "has_veteran" });
  if (asBool(row.needs_disabled)) rules.push({ type: "has_disabled" });
  const preg = asNum(row.needs_pregnant_or_child);
  if (preg != null) rules.push({ type: "pregnant_or_young_child", age: preg });
  else if (asBool(row.needs_pregnant_or_child)) rules.push({ type: "pregnant_or_young_child", age: 5 });
  if (asBool(row.needs_renting)) rules.push({ type: "renting" });
  if (asBool(row.needs_working)) rules.push({ type: "working_or_student" });
  if (asBool(row.tribal)) rules.push({ type: "tribal" });
  const states = (row.states ?? "")
    .split(/[;|,]/)
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
  if (states.length) rules.push({ type: "state", states });
  const verify = (row.verify ?? "")
    .split(/[;|,]/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  for (const badge of verify) {
    if (badge === "identity" || badge === "income" || badge === "residency" || badge === "household") {
      rules.push({ type: "requires_verify", badge: badge as VerifyKey });
    }
  }
  return rules;
}

function formulaFromRow(id: string, row: Record<string, string>): { formula: AwardFormula; amount: number } {
  const parsed = parseAwardFormula(row.award_formula ?? "");
  const amount = asNum(row.award_amount) ?? 0;
  if (parsed) return { formula: parsed, amount };
  return formulaForId(id, amount);
}

export function parseSheetCsv(csv: string): Program[] {
  const table = parseCsv(csv);
  const headerRow = table[0];
  if (!headerRow) return [];
  const headers = headerRow.map(normalizeHeader);
  const programs: Program[] = [];
  for (const cells of table.slice(1)) {
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = (cells[i] ?? "").trim();
    });
    if (row.active && /^(false|no|0)$/i.test(row.active)) continue;
    const id = (row.id || row.short_name || row.name || "").toLowerCase().replace(/\s+/g, "-");
    if (!id) continue;
    const category = parseCategory(row.category || "help");
    const listing = parseListing(row.listing || "benefit");
    const { formula, amount } = formulaFromRow(id, row);
    const documents = (row.documents ?? "")
      .split(/[;|]/)
      .map((d) => d.trim())
      .filter(Boolean);
    programs.push({
      id,
      name: row.name || row.short_name || id,
      shortName: row.short_name || row.name || id,
      agency: row.agency || "Agency",
      source: parseSource(row.source || ""),
      category,
      listing,
      valueKind: parseValueKind(row.value_kind || ""),
      renewal: (row.timeline || "").split(".")[0] || row.timeline || "",
      deadlineDays: asNum(row.deadline_days),
      urgent: asBool(row.urgent),
      summary: row.summary || row.receive || row.name || "",
      plain: row.plain || row.receive || row.summary || "",
      documents,
      rules: rulesFromRow(row),
      image: row.image || CATEGORY_IMAGES[category],
      website: row.website,
      applyUrl: row.apply_url,
      phone: row.phone,
      timeline: row.timeline,
      cost: row.cost,
      receive: row.receive,
      incomeGuideline: row.income_guideline,
      howToApply: row.how_to_apply,
      notes: row.notes,
      directoryCategory: CATEGORY_META[category].label,
      award: awardFn(formula, amount),
    });
  }
  return programs;
}

function ruleValue(rules: Rule[], type: Rule["type"]): Rule | undefined {
  return rules.find((r) => r.type === type);
}

function yesNo(on: boolean): string {
  return on ? "TRUE" : "";
}

export function programsToCsv(programs: Program[]): string {
  const lines = [SHEET_HEADERS.join(",")];
  for (const p of programs) {
    const fpl = ruleValue(p.rules, "max_fpl");
    const child = ruleValue(p.rules, "child_under");
    const minKids = ruleValue(p.rules, "min_children");
    const minAge = ruleValue(p.rules, "min_age");
    const preg = ruleValue(p.rules, "pregnant_or_young_child");
    const state = ruleValue(p.rules, "state");
    const verify = p.rules
      .filter((r): r is Extract<Rule, { type: "requires_verify" }> => r.type === "requires_verify")
      .map((r) => r.badge)
      .join(";");
    const { formula, amount } = formulaForId(p.id, 0);
    const sampled = formula === "flat" ? amount : amount;
    const catLabel = FILTERS.find((f) => f.id === p.category)?.label ?? p.category;
    const row: Record<(typeof SHEET_HEADERS)[number], string> = {
      id: p.id,
      active: "TRUE",
      short_name: p.shortName,
      name: p.name,
      agency: p.agency,
      category: catLabel,
      listing: p.listing,
      value_kind: p.valueKind,
      source: p.source,
      summary: p.summary,
      receive: p.receive ?? "",
      website: p.website ?? "",
      apply_url: p.applyUrl ?? "",
      phone: p.phone ?? "",
      timeline: p.timeline ?? "",
      cost: p.cost ?? "",
      income_guideline: p.incomeGuideline ?? "",
      how_to_apply: p.howToApply ?? "",
      notes: p.notes ?? "",
      documents: p.documents.join("; "),
      max_fpl: fpl && "percent" in fpl ? String(fpl.percent) : "",
      child_under: child && "age" in child ? String(child.age) : "",
      min_children: minKids && "count" in minKids ? String(minKids.count) : "",
      min_children_age_max: minKids && "ageMax" in minKids && minKids.ageMax != null ? String(minKids.ageMax) : "",
      min_age: minAge && "age" in minAge ? String(minAge.age) : "",
      needs_veteran: yesNo(p.rules.some((r) => r.type === "has_veteran")),
      needs_disabled: yesNo(p.rules.some((r) => r.type === "has_disabled")),
      needs_pregnant_or_child: preg && "age" in preg ? String(preg.age) : "",
      needs_renting: yesNo(p.rules.some((r) => r.type === "renting")),
      needs_working: yesNo(p.rules.some((r) => r.type === "working_or_student")),
      tribal: yesNo(p.rules.some((r) => r.type === "tribal")),
      states: state && "states" in state ? state.states.join(";") : "",
      verify,
      award_formula: formula,
      award_amount: sampled ? String(sampled) : "",
      urgent: yesNo(Boolean(p.urgent)),
      deadline_days: p.deadlineDays != null ? String(p.deadlineDays) : "",
      image: p.image ?? "",
    };
    lines.push(SHEET_HEADERS.map((h) => csvEscape(row[h])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

export function toCsvExportUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (!/^https:\/\/docs\.google\.com\/spreadsheets\//i.test(trimmed)) return null;
  if (/\/export\?/i.test(trimmed) || /[?&]output=csv/i.test(trimmed) || /\/pub(?:html)?/i.test(trimmed)) {
    if (/\/pubhtml/i.test(trimmed)) {
      return trimmed.replace(/\/pubhtml.*/i, "/pub?output=csv");
    }
    return trimmed;
  }
  const published = trimmed.match(/\/spreadsheets\/d\/e\/([a-zA-Z0-9-_]+)/);
  if (published) {
    return `https://docs.google.com/spreadsheets/d/e/${published[1]}/pub?output=csv`;
  }
  const id = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  if (!id || id === "e") return null;
  const gid = trimmed.match(/[?#&]gid=(\d+)/)?.[1] ?? "0";
  return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
}
