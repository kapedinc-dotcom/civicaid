import directory from "./directory.json";
import { snapMaxAllotment } from "./fpl";
import type {
  AwardContext,
  BundleDef,
  Category,
  ListingKind,
  PillTone,
  Program,
  ProgramSource,
  QuickStartRow,
  Rule,
  ScamRule,
  StartDoor,
  ValueKind,
} from "./types";

interface DirRow {
  id: string;
  name: string;
  directoryCategory: string;
  agency: string;
  programType: string;
  description: string;
  receive: string;
  eligibility: string;
  incomeGuideline: string;
  available: string;
  howToApply: string;
  website: string;
  applyUrl: string;
  phone: string;
  timeline: string;
  cost: string;
  documents: string[];
  notes: string;
  asOf: string;
}

const CAT_MAP: Record<string, Category> = {
  Food: "nutrition",
  "Cash / Income": "cash",
  "Tax credits": "tax",
  "Bills / Utilities": "energy",
  "Phone / Internet": "phone",
  Housing: "housing",
  "Vehicles / Transportation": "transport",
  Clothing: "goods",
  "Vision / Glasses": "vision",
  "Health coverage": "health",
  "Directories / Navigators": "navigator",
  "Other goods": "goods",
};

function snapAward(ctx: AwardContext): number {
  const max = snapMaxAllotment(ctx.size);
  const contribution = Math.round(Math.max(0, ctx.monthlyIncome - ctx.monthlyRent) * 0.15);
  return Math.max(0, Math.min(max, max - contribution));
}

type Enrich = {
  shortName: string;
  listing?: ListingKind;
  valueKind?: ValueKind;
  rules?: Rule[];
  award?: (ctx: AwardContext) => number;
  image?: string;
  tint?: Program["tint"];
  urgent?: boolean;
  deadlineDays?: number;
  bundle?: string;
  pills?: Program["pills"];
};

const ENRICH: Record<string, Enrich> = {
  calfresh: {
    shortName: "SNAP",
    valueKind: "monthly",
    rules: [
      { type: "max_fpl", percent: 200 },
      { type: "requires_verify", badge: "income" },
    ],
    award: snapAward,
    image: "/images/snap-groceries.jpg",
    bundle: "table",
  },
  wic: {
    shortName: "WIC",
    valueKind: "monthly",
    rules: [
      { type: "max_fpl", percent: 185 },
      { type: "pregnant_or_young_child", age: 5 },
    ],
    award: (ctx) => {
      const young = ctx.children.filter((c) => c.age < 5).length;
      const pregnant = ctx.members.some((m) => m.pregnant) ? 1 : 0;
      return (young + pregnant) * 60;
    },
    image: "/images/wic-produce.jpg",
    tint: "lilac",
    bundle: "table",
  },
  "school-meals": {
    shortName: "Meals",
    valueKind: "monthly",
    rules: [{ type: "min_children", count: 1, ageMax: 18 }],
    award: (ctx) => ctx.children.filter((c) => c.age >= 5 && c.age <= 18).length * 148,
    bundle: "table",
  },
  "food-bank": {
    shortName: "Pantry",
    valueKind: "monthly",
    rules: [],
    award: (ctx) => 48 * Math.min(ctx.size, 5),
    image: "/images/snap-groceries.jpg",
    bundle: "table",
  },
  csfp: {
    shortName: "CSFP",
    valueKind: "monthly",
    rules: [
      { type: "min_age", age: 60 },
      { type: "max_fpl", percent: 130 },
    ],
    award: () => 50,
    image: "/images/food-box.jpg",
  },
  "meals-on-wheels": {
    shortName: "Meals",
    valueKind: "monthly",
    rules: [{ type: "min_age", age: 60 }],
    award: () => 180,
    image: "/images/food-box.jpg",
  },
  fdpir: {
    shortName: "FDPIR",
    valueKind: "monthly",
    rules: [{ type: "tribal" }, { type: "max_fpl", percent: 130 }],
    award: snapAward,
    image: "/images/food-box.jpg",
  },
  calworks: {
    shortName: "TANF",
    valueKind: "monthly",
    rules: [
      { type: "max_fpl", percent: 130 },
      { type: "min_children", count: 1, ageMax: 18 },
      { type: "requires_verify", badge: "income" },
    ],
    award: (ctx) => {
      const base = 400 + 175 * Math.max(0, ctx.size - 1);
      const taper = Math.round(ctx.monthlyIncome * 0.5);
      return Math.max(0, base - taper);
    },
    deadlineDays: 14,
  },
  ssi: {
    shortName: "SSI",
    valueKind: "monthly",
    rules: [{ type: "has_disabled" }],
    award: () => 967,
  },
  ssdi: {
    shortName: "SSDI",
    valueKind: "monthly",
    rules: [{ type: "has_disabled" }],
    award: () => 0,
  },
  eitc: {
    shortName: "EITC",
    valueKind: "annual",
    rules: [
      { type: "working_or_student" },
      { type: "max_fpl", percent: 250 },
    ],
    award: (ctx) => {
      const kids = ctx.children.length;
      const annual = kids >= 2 ? 7830 : kids === 1 ? 4213 : 632;
      return Math.round(annual / 12);
    },
  },
  ctc: {
    shortName: "CTC",
    valueKind: "annual",
    rules: [
      { type: "working_or_student" },
      { type: "min_children", count: 1, ageMax: 17 },
    ],
    award: (ctx) => Math.round((2000 * ctx.children.filter((c) => c.age < 17).length) / 12),
  },
  "general-relief": {
    shortName: "GA",
    valueKind: "monthly",
    rules: [{ type: "max_fpl", percent: 80 }],
    award: () => 300,
  },
  liheap: {
    shortName: "LIHEAP",
    valueKind: "seasonal",
    rules: [
      { type: "max_fpl", percent: 150 },
      { type: "requires_verify", badge: "residency" },
    ],
    award: () => 75,
    image: "/images/liheap-hero.jpg",
    urgent: true,
    deadlineDays: 12,
    bundle: "hearth",
  },
  weatherize: {
    shortName: "WAP",
    valueKind: "one-time",
    rules: [
      { type: "max_fpl", percent: 200 },
      { type: "requires_verify", badge: "residency" },
    ],
    award: () => 200,
    image: "/images/weatherize.jpg",
    tint: "peach",
    deadlineDays: 24,
    bundle: "hearth",
    pills: [
      { label: "In-kind upgrades", tone: "warn" },
      { label: "Owner or renter approval", tone: "muted" },
    ],
  },
  care: {
    shortName: "CARE",
    valueKind: "monthly",
    rules: [
      { type: "max_fpl", percent: 250 },
      { type: "state", states: ["CA"] },
    ],
    award: () => 38,
    bundle: "hearth",
  },
  "salvation-army": {
    shortName: "SA",
    valueKind: "one-time",
    rules: [{ type: "max_fpl", percent: 200 }],
    award: () => 50,
    urgent: true,
    deadlineDays: 7,
  },
  "catholic-charities": {
    shortName: "CC",
    valueKind: "one-time",
    rules: [{ type: "max_fpl", percent: 200 }],
    award: () => 50,
  },
  svdp: {
    shortName: "SVdP",
    valueKind: "one-time",
    rules: [{ type: "max_fpl", percent: 200 }],
    award: () => 40,
  },
  csbg: {
    shortName: "CAA",
    valueKind: "one-time",
    rules: [{ type: "max_fpl", percent: 200 }],
    award: () => 60,
  },
  "fema-efsp": {
    shortName: "EFSP",
    valueKind: "one-time",
    rules: [{ type: "max_fpl", percent: 200 }],
    award: () => 40,
  },
  lifeline: {
    shortName: "Line",
    valueKind: "monthly",
    rules: [{ type: "max_fpl", percent: 150 }],
    award: () => 9,
    image: "/images/connectivity.jpg",
    tint: "cream",
  },
  "ca-lifeline": {
    shortName: "CA Line",
    valueKind: "monthly",
    rules: [
      { type: "max_fpl", percent: 150 },
      { type: "state", states: ["CA"] },
    ],
    award: () => 20,
    image: "/images/connectivity.jpg",
  },
  section8: {
    shortName: "HCV",
    valueKind: "monthly",
    rules: [
      { type: "max_fpl", percent: 80 },
      { type: "renting" },
    ],
    award: (ctx) => Math.round(ctx.monthlyRent * 0.7),
  },
  "public-housing": {
    shortName: "PHA",
    valueKind: "monthly",
    rules: [{ type: "max_fpl", percent: 80 }],
    award: (ctx) => Math.round(ctx.monthlyRent * 0.5),
  },
  "hud-vash": {
    shortName: "VASH",
    valueKind: "monthly",
    rules: [{ type: "has_veteran" }, { type: "max_fpl", percent: 80 }],
    award: (ctx) => Math.round(ctx.monthlyRent * 0.7),
  },
  "continuum-of-care": {
    shortName: "CoC",
    valueKind: "one-time",
    rules: [{ type: "max_fpl", percent: 150 }],
    award: () => 0,
  },
  "usda-rural": {
    shortName: "USDA",
    valueKind: "one-time",
    rules: [{ type: "max_fpl", percent: 80 }],
    award: () => 0,
  },
  habitat: {
    shortName: "Habitat",
    valueKind: "one-time",
    rules: [
      { type: "max_fpl", percent: 80 },
      { type: "working_or_student" },
    ],
    award: () => 0,
  },
  "free-house-myth": {
    shortName: "Myth",
    listing: "advisory",
    valueKind: "one-time",
    rules: [],
    award: () => 0,
  },
  "charity-cars": {
    shortName: "Cars",
    valueKind: "one-time",
    rules: [
      { type: "max_fpl", percent: 200 },
      { type: "working_or_student" },
    ],
    award: () => 0,
  },
  "vehicles-for-change": {
    shortName: "VFC",
    valueKind: "one-time",
    rules: [
      { type: "max_fpl", percent: 200 },
      { type: "working_or_student" },
    ],
    award: () => 0,
  },
  "nclc-cars": {
    shortName: "NCLC",
    listing: "directory",
    valueKind: "one-time",
    rules: [],
    award: () => 0,
  },
  "va-auto": {
    shortName: "VA auto",
    valueKind: "one-time",
    rules: [{ type: "has_veteran" }],
    award: () => 0,
  },
  "ride-united": {
    shortName: "Rides",
    valueKind: "one-time",
    rules: [],
    award: () => 0,
  },
  "dress-for-success": {
    shortName: "DFS",
    valueKind: "one-time",
    rules: [{ type: "working_or_student" }],
    award: () => 0,
    tint: "lilac",
  },
  "career-gear": {
    shortName: "Gear",
    valueKind: "one-time",
    rules: [{ type: "working_or_student" }],
    award: () => 0,
  },
  "clothing-closets": {
    shortName: "Closet",
    valueKind: "one-time",
    rules: [],
    award: () => 0,
  },
  "new-eyes": {
    shortName: "Eyes",
    valueKind: "one-time",
    rules: [{ type: "max_fpl", percent: 250 }],
    award: () => 0,
    pills: [
      { label: "One pair of glasses", tone: "ok" },
      { label: "Small admin fee", tone: "warn" },
    ],
  },
  lions: {
    shortName: "Lions",
    valueKind: "one-time",
    rules: [{ type: "max_fpl", percent: 200 }],
    award: () => 0,
  },
  "vsp-eyes": {
    shortName: "VSP",
    valueKind: "one-time",
    rules: [{ type: "max_fpl", percent: 200 }],
    award: () => 0,
  },
  "prevent-blindness": {
    shortName: "NEI",
    listing: "directory",
    valueKind: "one-time",
    rules: [],
    award: () => 0,
  },
  "medi-cal": {
    shortName: "Medi-Cal",
    valueKind: "monthly",
    rules: [
      { type: "max_fpl", percent: 160 },
      { type: "requires_verify", badge: "residency" },
    ],
    award: (ctx) => ctx.size * 210,
    image: "/images/health.jpg",
    bundle: "kin",
  },
  chip: {
    shortName: "CHIP",
    valueKind: "monthly",
    rules: [
      { type: "min_children", count: 1, ageMax: 19 },
      { type: "max_fpl", percent: 250 },
    ],
    award: (ctx) => ctx.children.filter((c) => c.age < 19).length * 180,
    image: "/images/health.jpg",
  },
  "benefits-gov": {
    shortName: "Finder",
    listing: "directory",
    valueKind: "one-time",
    rules: [],
    award: () => 0,
  },
  uw211: {
    shortName: "211",
    listing: "directory",
    valueKind: "one-time",
    rules: [],
    award: () => 0,
  },
  findhelp: {
    shortName: "findhelp",
    listing: "directory",
    valueKind: "one-time",
    rules: [],
    award: () => 0,
  },
  benefitscal: {
    shortName: "BenefitsCal",
    listing: "directory",
    valueKind: "one-time",
    rules: [{ type: "state", states: ["CA"] }],
    award: () => 0,
  },
  vita: {
    shortName: "VITA",
    valueKind: "annual",
    rules: [{ type: "working_or_student" }, { type: "max_fpl", percent: 250 }],
    award: () => 0,
  },
  needhelppayingbills: {
    shortName: "NHPB",
    listing: "directory",
    valueKind: "one-time",
    rules: [],
    award: () => 0,
  },
  "gift-card-myth": {
    shortName: "Myth",
    listing: "advisory",
    valueKind: "one-time",
    rules: [],
    award: () => 0,
  },
};

function inferSource(programType: string): ProgramSource {
  const t = programType.toLowerCase();
  if (t.includes("reality") || t.includes("nonprofit") || t.includes("private") || t.includes("community")) {
    return "nonprofit";
  }
  if (t.includes("state") && !t.includes("federal")) return "state";
  if (t.includes("county")) return "state";
  return "federal";
}

function inferListing(row: DirRow, enrich?: Enrich): ListingKind {
  if (enrich?.listing) return enrich.listing;
  if (row.directoryCategory === "Directories / Navigators") return "directory";
  if (row.programType.toLowerCase().includes("reality")) return "advisory";
  return "benefit";
}

function firstSentence(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  const cut = clean.split(/(?<=\.)\s/)[0] ?? clean;
  return cut.length > 180 ? `${cut.slice(0, 177)}…` : cut;
}

export const CATEGORY_IMAGES: Record<Category, string> = {
  nutrition: "/images/snap-groceries.jpg",
  cash: "/images/cash-aid.jpg",
  tax: "/images/tax-credit.jpg",
  energy: "/images/liheap-hero.jpg",
  phone: "/images/connectivity.jpg",
  housing: "/images/housing.jpg",
  transport: "/images/transport.jpg",
  goods: "/images/goods.jpg",
  vision: "/images/vision.jpg",
  health: "/images/health.jpg",
  navigator: "/images/help-line.jpg",
};

function buildProgram(row: DirRow): Program {
  const enrich = ENRICH[row.id];
  const category = CAT_MAP[row.directoryCategory] ?? "navigator";
  const listing = inferListing(row, enrich);
  return {
    id: row.id,
    name: row.name,
    shortName: enrich?.shortName ?? row.name,
    agency: row.agency.split(";")[0]!.trim(),
    source: inferSource(row.programType),
    category,
    listing,
    valueKind: enrich?.valueKind ?? "one-time",
    renewal: row.timeline.split(".")[0] ?? row.timeline,
    deadlineDays: enrich?.deadlineDays,
    urgent: enrich?.urgent,
    summary: firstSentence(row.receive || row.description),
    plain: row.description,
    documents: row.documents,
    rules: enrich?.rules ?? [],
    bundle: enrich?.bundle,
    image: enrich?.image ?? CATEGORY_IMAGES[category],
    tint: enrich?.tint,
    pills: enrich?.pills,
    footNote: listing === "advisory" ? "Reality check" : listing === "directory" ? "Directory" : row.cost,
    website: row.website,
    applyUrl: row.applyUrl,
    phone: row.phone,
    timeline: row.timeline,
    cost: row.cost,
    receive: row.receive,
    incomeGuideline: row.incomeGuideline,
    available: row.available,
    howToApply: row.howToApply,
    notes: row.notes,
    asOf: row.asOf,
    directoryCategory: row.directoryCategory,
    award: enrich?.award ?? (() => 0),
  };
}

export const PROGRAMS: Program[] = (directory.programs as DirRow[]).map(buildProgram);

export const BUNDLES: BundleDef[] = [
  {
    id: "table",
    name: "Grocery bundle",
    tag: "Nutrition",
    programIds: ["calfresh", "wic", "school-meals", "food-bank"],
    blurb: "One income packet covers groceries, WIC, school meals, and the pantry box.",
  },
  {
    id: "hearth",
    name: "Winter energy bundle",
    tag: "Energy",
    programIds: ["liheap", "care", "weatherize", "salvation-army"],
    blurb: "Shared utility bill and ID unlocks the winter credit, the ongoing discount, and shutoff help.",
  },
  {
    id: "kin",
    name: "Coverage bundle",
    tag: "Health",
    programIds: ["medi-cal", "chip", "wic", "calworks"],
    blurb: "Kids' records and income proof open Medi-Cal, CHIP, WIC, and cash aid.",
  },
];

export const CATEGORY_META: Record<
  Category,
  { label: string; hint: string; bar: string; tone: PillTone }
> = {
  nutrition: { label: "Food", hint: "Groceries, WIC, pantry", bar: "bg-ok", tone: "ok" },
  cash: { label: "Cash", hint: "TANF, SSI, county relief", bar: "bg-ok", tone: "ok" },
  tax: { label: "Tax credits", hint: "EITC, CTC, VITA", bar: "bg-warn", tone: "warn" },
  energy: { label: "Bills", hint: "LIHEAP, weatherize, CARE", bar: "bg-warn", tone: "warn" },
  phone: { label: "Phone", hint: "Lifeline and CA LifeLine", bar: "bg-warn", tone: "warn" },
  housing: { label: "Housing", hint: "Section 8, PHA, Habitat", bar: "bg-subtle", tone: "muted" },
  transport: { label: "Vehicles", hint: "Cars, repairs, rides", bar: "bg-subtle", tone: "muted" },
  goods: { label: "Clothes & goods", hint: "Closets and workwear", bar: "bg-lilac-fg", tone: "lilac" },
  vision: { label: "Vision", hint: "Glasses and eye exams", bar: "bg-lilac-fg", tone: "lilac" },
  health: { label: "Health", hint: "Medicaid and CHIP", bar: "bg-ok", tone: "ok" },
  navigator: { label: "Directories", hint: "211, Benefits.gov, findhelp", bar: "bg-subtle", tone: "muted" },
};

export const FILTERS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "nutrition", label: "Food" },
  { id: "cash", label: "Cash" },
  { id: "tax", label: "Tax" },
  { id: "energy", label: "Bills" },
  { id: "phone", label: "Phone" },
  { id: "housing", label: "Housing" },
  { id: "transport", label: "Rides" },
  { id: "goods", label: "Goods" },
  { id: "vision", label: "Vision" },
  { id: "health", label: "Health" },
  { id: "navigator", label: "Help" },
];

export const SCAM_RULES: ScamRule[] = directory.scamRules as ScamRule[];
export const CA_QUICK_START: QuickStartRow[] = directory.californiaQuickStart as QuickStartRow[];
export const START_DOORS: StartDoor[] = directory.doors as StartDoor[];

export function bundleById(id: string): BundleDef | undefined {
  return BUNDLES.find((b) => b.id === id);
}
