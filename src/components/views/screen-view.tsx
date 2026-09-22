import {
  Accessibility,
  Baby,
  Check,
  GraduationCap,
  Heart,
  MapPin,
  Minus,
  PersonStanding,
  Plus,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { potentialMonthly, roleLabel } from "@/data/eligibility";
import { emptyMember, formatUsdMo } from "@/lib/utils";
import { useCrest } from "@/store/use-crest";
import type { MatchResult, PartyMember } from "@/data/types";
import { cn } from "@/lib/utils";

const INCOME_BANDS = [
  { max: 2499, label: "Under $2,500", sub: "Under $30,000 / year" },
  { max: 4000, label: "$2,500 – $4,000", sub: "$30,000 – $48,000 / year" },
  { max: 5500, label: "$4,000 – $5,500", sub: "$48,000 – $66,000 / year" },
  { max: 9000, label: "$5,500+", sub: "Above $66,000 / year" },
];

const NEEDS: {
  key: string;
  label: string;
  icon: typeof Baby;
  apply: (m: PartyMember) => boolean;
}[] = [
  { key: "under5", label: "Child under 5", icon: Baby, apply: (m) => m.role === "child" && m.age < 5 },
  { key: "pregnant", label: "Pregnant", icon: Heart, apply: (m) => m.pregnant },
  { key: "senior", label: "65 or older", icon: PersonStanding, apply: (m) => m.age >= 65 },
  { key: "disabled", label: "Disability", icon: Accessibility, apply: (m) => m.disabled },
  { key: "veteran", label: "Veteran", icon: Shield, apply: (m) => m.veteran },
  { key: "student", label: "Student", icon: GraduationCap, apply: (m) => m.student },
];

export function ScreenView({ matches }: { matches: MatchResult[] }) {
  const household = useCrest((s) => s.household);
  const updateHousehold = useCrest((s) => s.updateHousehold);
  const setMembers = useCrest((s) => s.setMembers);
  const eligStep = useCrest((s) => s.eligStep);
  const setEligStep = useCrest((s) => s.setEligStep);
  const setTab = useCrest((s) => s.setTab);
  const setLedgerFilter = useCrest((s) => s.setLedgerFilter);
  const setSheet = useCrest((s) => s.setSheet);
  const potential = potentialMonthly(matches);
  const eligible = matches.filter((m) => m.eligible && m.monthlyAward > 0).length;

  const selectedBand = INCOME_BANDS.findIndex((b) => household.monthlyIncome <= b.max);
  const bandIndex = selectedBand === -1 ? INCOME_BANDS.length - 1 : selectedBand;

  const needOn = (key: string) => {
    const def = NEEDS.find((n) => n.key === key)!;
    return household.members.some(def.apply);
  };

  const toggleNeed = (key: string) => {
    if (key === "under5") {
      if (needOn("under5")) {
        setMembers(household.members.filter((m) => !(m.role === "child" && m.age < 5)));
      } else {
        setMembers([...household.members, emptyMember(`c${Date.now()}`, "Child", 3, "child")]);
      }
      return;
    }
    const self = household.members.find((m) => m.role === "self") ?? household.members[0];
    if (!self) return;
    if (key === "pregnant") {
      setMembers(
        household.members.map((m) => (m.id === self.id ? { ...m, pregnant: !m.pregnant } : m)),
      );
    }
    if (key === "senior") {
      setMembers(
        household.members.map((m) =>
          m.id === self.id ? { ...m, age: m.age >= 65 ? 34 : 68 } : m,
        ),
      );
    }
    if (key === "disabled") {
      const partner = household.members.find((m) => m.role === "partner") ?? self;
      setMembers(
        household.members.map((m) => (m.id === partner.id ? { ...m, disabled: !m.disabled } : m)),
      );
    }
    if (key === "veteran") {
      setMembers(
        household.members.map((m) => (m.id === self.id ? { ...m, veteran: !m.veteran } : m)),
      );
    }
    if (key === "student") {
      setMembers(household.members.map((m) => (m.id === self.id ? { ...m, student: !m.student } : m)));
    }
  };

  const setSize = (next: number) => {
    const size = Math.max(1, Math.min(8, next));
    let members = [...household.members];
    while (members.length < size) {
      const i = members.length;
      members.push(
        emptyMember(
          `n${Date.now()}${i}`,
          i === 1 ? "Partner" : `Child ${i - 1}`,
          i === 1 ? 34 : 6,
          i === 1 ? "partner" : "child",
        ),
      );
    }
    while (members.length > size) {
      const last = members[members.length - 1];
      if (last?.role === "self") break;
      members = members.slice(0, -1);
    }
    setMembers(members);
  };

  return (
    <div className="flex flex-col gap-5 px-5 pb-10 pt-6">
      <section>
        <h1 className="font-display text-3xl italic tracking-tight">Eligibility</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          A short household picture. Changes stay on your account.
        </p>
      </section>

      <section className="rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-sm font-medium">
            <MapPin className="size-4 text-ok" /> Zip code
          </p>
          <Badge tone="ok">{household.city}, {household.state}</Badge>
        </div>
        <p className="mt-3 font-display text-4xl tabular-nums tracking-tight">{household.zip}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          San Bernardino County — local energy and county aid may apply
        </p>
      </section>

      <section className="rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Household size</p>
            <p className="text-xs text-muted-foreground">People who share expenses</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSize(household.members.length - 1)}
              className="flex size-11 items-center justify-center rounded-full bg-secondary"
              aria-label="Decrease household size"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-6 text-center font-display text-2xl tabular-nums">
              {household.members.length}
            </span>
            <button
              type="button"
              onClick={() => setSize(household.members.length + 1)}
              className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground"
              aria-label="Increase household size"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
        <ul className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
          {household.members.map((m) => (
            <li key={m.id}>
              {m.name} · {roleLabel(m.role)} · {m.age}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setSheet("party")}
          className="mt-2 h-11 text-sm font-medium text-ok"
        >
          Edit roles
        </button>
      </section>

      <section className="rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]">
        <p className="text-sm font-medium">Monthly income</p>
        <p className="text-xs text-muted-foreground">Pre-tax household total</p>
        <div className="mt-3 flex flex-col gap-2">
          {INCOME_BANDS.map((b, i) => {
            const on = i === bandIndex;
            return (
              <button
                key={b.label}
                type="button"
                onClick={() =>
                  updateHousehold({
                    monthlyIncome: i === 0 ? 2200 : i === 1 ? 3200 : i === 2 ? 4800 : 6200,
                  })
                }
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-3 text-left",
                  on ? "bg-elevated shadow-[var(--shadow-border)]" : "bg-card shadow-[var(--shadow-border)]",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full border",
                      on ? "border-primary bg-primary" : "border-input bg-card",
                    )}
                  >
                    {on ? <span className="size-2 rounded-full bg-primary-foreground" /> : null}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{b.label}</p>
                    <p className="text-xs text-muted-foreground">{b.sub}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]">
        <p className="text-sm font-medium">Needs</p>
        <p className="text-xs text-muted-foreground">Select anything that applies</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {NEEDS.map((n) => {
            const on = needOn(n.key);
            const Icon = n.icon;
            return (
              <button
                key={n.key}
                type="button"
                onClick={() => toggleNeed(n.key)}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium",
                  on ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground",
                )}
              >
                <Icon className="size-4" />
                {n.label}
                {on ? <Check className="size-4" /> : null}
              </button>
            );
          })}
        </div>
      </section>

      <div className="rounded-2xl bg-secondary px-4 py-4">
        <p className="font-display text-lg">{eligible} matched programs</p>
        <p className="text-sm text-muted-foreground">About {formatUsdMo(potential)} in support</p>
      </div>

      <Button
        size="lg"
        onClick={() => {
          setEligStep(Math.min(4, eligStep + 1));
          setLedgerFilter("matched");
          setTab("hall");
        }}
      >
        See what you qualify for
      </Button>
      <button
        type="button"
        onClick={() => setSheet("catalog")}
        className="h-11 text-sm text-muted-foreground"
      >
        Benefits spreadsheet
      </button>
    </div>
  );
}
