export type TabId = "hall" | "ledger" | "screen" | "quests";

export type MemberRole = "self" | "partner" | "child" | "elder" | "dependent";

export type ProgramSource = "federal" | "state" | "nonprofit";

export type Category =
  | "nutrition"
  | "energy"
  | "cash"
  | "tax"
  | "phone"
  | "housing"
  | "transport"
  | "goods"
  | "vision"
  | "health"
  | "navigator";

export type ValueKind = "monthly" | "seasonal" | "annual" | "one-time";

export type ListingKind = "benefit" | "directory" | "advisory";

export type ApplicationStatus =
  | "idle"
  | "bundled"
  | "submitted"
  | "in-review"
  | "needs-docs"
  | "awarded";

export type VerifyKey = "identity" | "income" | "residency" | "household";

export type PillTone = "ok" | "warn" | "lilac" | "muted" | "danger";

export interface PartyMember {
  id: string;
  name: string;
  age: number;
  role: MemberRole;
  employed: boolean;
  student: boolean;
  disabled: boolean;
  pregnant: boolean;
  veteran: boolean;
}

export interface Verified {
  identity: boolean;
  income: boolean;
  residency: boolean;
  household: boolean;
}

export interface Household {
  surname: string;
  city: string;
  state: string;
  zip: string;
  monthlyIncome: number;
  monthlyRent: number;
  members: PartyMember[];
  verified: Verified;
  xp: number;
  entered: boolean;
  /** Whether the household already has Medi-Cal. Unset until onboarding asks. */
  mediCal?: boolean;
  mediCalCardName?: string;
  /** Data URL of the uploaded BIC / Medi-Cal card. */
  mediCalCard?: string;
}

export type Rule =
  | { type: "max_fpl"; percent: number }
  | { type: "child_under"; age: number }
  | { type: "min_children"; count: number; ageMax?: number }
  | { type: "working_or_student" }
  | { type: "renting" }
  | { type: "has_disabled" }
  | { type: "has_veteran" }
  | { type: "min_age"; age: number }
  | { type: "tribal" }
  | { type: "pregnant_or_young_child"; age: number }
  | { type: "state"; states: string[] }
  | { type: "requires_verify"; badge: VerifyKey };

export interface ProgramPill {
  label: string;
  tone?: PillTone;
}

export interface Program {
  id: string;
  name: string;
  shortName: string;
  agency: string;
  source: ProgramSource;
  category: Category;
  listing: ListingKind;
  valueKind: ValueKind;
  renewal: string;
  deadlineDays?: number;
  urgent?: boolean;
  summary: string;
  plain: string;
  documents: string[];
  rules: Rule[];
  bundle?: string;
  image?: string;
  tint?: "lilac" | "cream" | "peach" | "mint";
  pills?: ProgramPill[];
  footNote?: string;
  website?: string;
  applyUrl?: string;
  phone?: string;
  timeline?: string;
  cost?: string;
  receive?: string;
  incomeGuideline?: string;
  available?: string;
  howToApply?: string;
  notes?: string;
  asOf?: string;
  directoryCategory: string;
  award: (ctx: AwardContext) => number;
}

export interface AwardContext {
  size: number;
  annualIncome: number;
  monthlyIncome: number;
  monthlyRent: number;
  fpl: number;
  fplPct: number;
  children: PartyMember[];
  members: PartyMember[];
  state: string;
  renting: boolean;
}

export interface Application {
  programId: string;
  status: ApplicationStatus;
  submittedAt?: number;
  awardedAt?: number;
  monthlyAward: number;
  bundleId?: string;
}

export interface CivicUpdate {
  id: string;
  title: string;
  body: string;
  source: string;
  age: string;
}

export interface Rank {
  level: number;
  name: string;
  minXp: number;
  slots: number;
}

export interface MatchResult {
  program: Program;
  eligible: boolean;
  score: number;
  monthlyAward: number;
  reasons: string[];
  blockers: string[];
  missingDocs: string[];
  deadline: Date | null;
}

export interface BundleDef {
  id: string;
  name: string;
  tag: string;
  programIds: string[];
  blurb: string;
}

export interface ScamRule {
  rule: string;
  details: string;
}

export interface QuickStartRow {
  need: string;
  where: string;
  link: string;
  phone: string;
}

export interface StartDoor {
  id: string;
  label: string;
  detail: string;
  href: string;
  phone?: string;
  state?: string;
}
