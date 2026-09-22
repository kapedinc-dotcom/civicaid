import { useState } from "react";
import {
  Accessibility,
  Baby,
  Check,
  CreditCard,
  GraduationCap,
  Heart,
  Minus,
  PersonStanding,
  Plus,
  Shield,
  Upload,
} from "lucide-react";
import { CivicMark } from "@/components/civic-mark";
import { Button } from "@/components/ui/button";
import { saveProfile } from "@/data/profile";
import { firstName, emptyMember, cn } from "@/lib/utils";
import { useCrest } from "@/store/use-crest";
import type { PartyMember } from "@/data/types";

const STEPS = 5;
const MEDI_CAL_APPLY = "https://www.benefitscal.com/";

const INCOME = [
  { label: "Under $2,500", sub: "Under $30,000 / year", value: 2200 },
  { label: "$2,500 – $4,000", sub: "$30,000 – $48,000 / year", value: 3200 },
  { label: "$4,000 – $5,500", sub: "$48,000 – $66,000 / year", value: 4800 },
  { label: "$5,500+", sub: "Above $66,000 / year", value: 6200 },
];

const NEEDS: {
  key: string;
  label: string;
  icon: typeof Baby;
}[] = [
  { key: "under5", label: "Child under 5", icon: Baby },
  { key: "pregnant", label: "Pregnant", icon: Heart },
  { key: "senior", label: "65 or older", icon: PersonStanding },
  { key: "disabled", label: "Disability", icon: Accessibility },
  { key: "veteran", label: "Veteran", icon: Shield },
  { key: "student", label: "Student", icon: GraduationCap },
];

function needOn(members: PartyMember[], key: string) {
  if (key === "under5") return members.some((m) => m.role === "child" && m.age < 5);
  if (key === "pregnant") return members.some((m) => m.pregnant);
  if (key === "senior") return members.some((m) => m.age >= 65);
  if (key === "disabled") return members.some((m) => m.disabled);
  if (key === "veteran") return members.some((m) => m.veteran);
  if (key === "student") return members.some((m) => m.student);
  return false;
}

const QUIZ_KEY = "civic-quiz-step";

export function Onboarding() {
  const household = useCrest((s) => s.household);
  const updateHousehold = useCrest((s) => s.updateHousehold);
  const setMembers = useCrest((s) => s.setMembers);
  const setEligStep = useCrest((s) => s.setEligStep);
  const setTab = useCrest((s) => s.setTab);
  const [step, setStep] = useState(() => {
    if (typeof window === "undefined") return 0;
    const saved = Number(sessionStorage.getItem(QUIZ_KEY) || 0);
    return saved >= 0 && saved < STEPS ? saved : 0;
  });
  const [zip, setZip] = useState(household.zip);
  const [income, setIncome] = useState<number | null>(null);
  const [mediCal, setMediCal] = useState<boolean | null>(household.mediCal ?? null);
  const [cardName, setCardName] = useState<string | null>(household.mediCalCardName ?? null);
  const [cardPreview, setCardPreview] = useState<string | null>(household.mediCalCard ?? null);
  const [cardError, setCardError] = useState<string | null>(null);
  const lead = household.members.find((m) => m.role === "self") ?? household.members[0];

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
      if (members[members.length - 1]?.role === "self") break;
      members = members.slice(0, -1);
    }
    setMembers(members);
  };

  const toggleNeed = (key: string) => {
    const self = household.members.find((m) => m.role === "self") ?? household.members[0];
    if (!self) return;
    if (key === "under5") {
      if (needOn(household.members, "under5")) {
        setMembers(household.members.filter((m) => !(m.role === "child" && m.age < 5)));
      } else {
        setMembers([...household.members, emptyMember(`c${Date.now()}`, "Child", 3, "child")]);
      }
      return;
    }
    setMembers(
      household.members.map((m) => {
        if (key === "pregnant" && m.id === self.id) return { ...m, pregnant: !m.pregnant };
        if (key === "senior" && m.id === self.id) return { ...m, age: m.age >= 65 ? 34 : 68 };
        if (key === "disabled" && m.id === self.id) return { ...m, disabled: !m.disabled };
        if (key === "veteran" && m.id === self.id) return { ...m, veteran: !m.veteran };
        if (key === "student" && m.id === self.id) return { ...m, student: !m.student };
        return m;
      }),
    );
  };

  const next = () => {
    if (step === 0) {
      const code = zip.replace(/\D/g, "").slice(0, 5);
      if (code.length !== 5) return;
      updateHousehold({ zip: code });
    }
    if (step === 2 && income != null) updateHousehold({ monthlyIncome: income });
    if (step === 4) {
      updateHousehold({
        mediCal: mediCal === true,
        mediCalCardName: mediCal ? (cardName ?? undefined) : undefined,
        mediCalCard: mediCal ? (cardPreview ?? undefined) : undefined,
      });
    }
    if (step < STEPS - 1) {
      const nextStep = step + 1;
      sessionStorage.setItem(QUIZ_KEY, String(nextStep));
      setStep(nextStep);
      return;
    }
    sessionStorage.removeItem(QUIZ_KEY);
    setEligStep(2);
    setTab("hall");
    const latest = useCrest.getState();
    void saveProfile({
      data: {
        household: latest.household,
        applications: latest.applications,
        saved: latest.saved,
        eligStep: 2,
      },
    });
  };

  const canContinue =
    step === 0
      ? zip.replace(/\D/g, "").length === 5
      : step === 2
        ? income != null
        : step === 4
          ? mediCal === false || (mediCal === true && Boolean(cardPreview))
          : true;

  const onCard = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 2_500_000) {
      setCardError("That photo is too large. Use one under 2.5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setCardPreview(typeof reader.result === "string" ? reader.result : null);
      setCardName(file.name);
      setCardError(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex min-h-dvh justify-center bg-secondary">
      <div className="flex min-h-dvh w-full max-w-md flex-col bg-background px-5 pb-8 pt-6 shadow-[var(--shadow-lift)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CivicMark className="size-8" />
            <span className="font-display text-lg tracking-tight">CivicAid</span>
          </div>
          <p className="text-xs font-medium text-muted-foreground">
            {step + 1} of {STEPS}
          </p>
        </div>
        <div className="mt-4 flex gap-1.5" aria-hidden>
          {Array.from({ length: STEPS }, (_, i) => (
            <span
              key={i}
              className={cn("h-1 flex-1 rounded-full", i <= step ? "bg-foreground" : "bg-foreground/15")}
            />
          ))}
        </div>

        <div key={step} className="mt-8 flex flex-1 flex-col">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {lead ? `Hi ${firstName(lead.name)}` : "Your household"}
          </p>
          {step === 0 ? (
            <>
              <h1 className="mt-2 font-display text-3xl italic tracking-tight">Where do you live?</h1>
              <p className="mt-2 text-sm text-muted-foreground">ZIP code decides which local programs apply.</p>
              <label className="mt-6 block text-sm font-medium">
                ZIP code
                <input
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  className="mt-1.5 flex h-14 w-full rounded-2xl bg-elevated px-4 font-display text-2xl tabular-nums shadow-[var(--shadow-border)]"
                />
              </label>
            </>
          ) : null}
          {step === 1 ? (
            <>
              <h1 className="mt-2 font-display text-3xl italic tracking-tight">Who shares expenses?</h1>
              <p className="mt-2 text-sm text-muted-foreground">Count everyone in the household, including you.</p>
              <div className="mt-10 flex items-center justify-center gap-6">
                <button
                  type="button"
                  onClick={() => setSize(household.members.length - 1)}
                  className="flex size-12 items-center justify-center rounded-full bg-secondary"
                  aria-label="Decrease household size"
                >
                  <Minus className="size-5" />
                </button>
                <p className="w-16 text-center font-display text-6xl tabular-nums">{household.members.length}</p>
                <button
                  type="button"
                  onClick={() => setSize(household.members.length + 1)}
                  className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  aria-label="Increase household size"
                >
                  <Plus className="size-5" />
                </button>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                {household.members.length === 1 ? "Just you" : `${household.members.length} people`}
              </p>
            </>
          ) : null}
          {step === 2 ? (
            <>
              <h1 className="mt-2 font-display text-3xl italic tracking-tight">What’s the monthly income?</h1>
              <p className="mt-2 text-sm text-muted-foreground">Pre-tax, for the whole household.</p>
              <div className="mt-6 flex flex-col gap-2">
                {INCOME.map((band) => {
                  const on = income === band.value;
                  return (
                    <button
                      key={band.label}
                      type="button"
                      onClick={() => setIncome(band.value)}
                      className={cn(
                        "flex min-h-14 items-center justify-between rounded-2xl px-4 py-3 text-left",
                        on ? "bg-primary text-primary-foreground" : "bg-card shadow-[var(--shadow-border)]",
                      )}
                    >
                      <span>
                        <span className="block text-sm font-medium">{band.label}</span>
                        <span className={cn("text-xs", on ? "text-primary-foreground/75" : "text-muted-foreground")}>
                          {band.sub}
                        </span>
                      </span>
                      {on ? <Check className="size-4" /> : null}
                    </button>
                  );
                })}
              </div>
            </>
          ) : null}
          {step === 3 ? (
            <>
              <h1 className="mt-2 font-display text-3xl italic tracking-tight">Anything else that applies?</h1>
              <p className="mt-2 text-sm text-muted-foreground">Pick all that fit. Skip if none do.</p>
              <div className="mt-6 flex flex-col gap-2">
                {NEEDS.map((n) => {
                  const on = needOn(household.members, n.key);
                  const Icon = n.icon;
                  return (
                    <button
                      key={n.key}
                      type="button"
                      onClick={() => toggleNeed(n.key)}
                      className={cn(
                        "flex min-h-14 items-center gap-3 rounded-2xl px-4 text-left text-sm font-medium",
                        on ? "bg-primary text-primary-foreground" : "bg-card shadow-[var(--shadow-border)]",
                      )}
                    >
                      <Icon className="size-4" />
                      <span className="flex-1">{n.label}</span>
                      {on ? <Check className="size-4" /> : null}
                    </button>
                  );
                })}
              </div>
            </>
          ) : null}
          {step === 4 ? (
            <>
              <h1 className="mt-2 font-display text-3xl italic tracking-tight">Do you have Medi-Cal?</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Most programs here expect Medi-Cal to already be in place.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {(
                  [
                    [true, "Yes, I have it"],
                    [false, "Not yet"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setMediCal(value)}
                    className={cn(
                      "flex min-h-14 items-center justify-center rounded-2xl px-3 text-sm font-medium",
                      mediCal === value
                        ? "bg-primary text-primary-foreground"
                        : "bg-card shadow-[var(--shadow-border)]",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {mediCal === false ? (
                <div className="mt-4 rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]">
                  <p className="text-sm leading-relaxed">
                    Apply through BenefitsCal, California’s official site for Medi-Cal.
                  </p>
                  <a
                    href={MEDI_CAL_APPLY}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
                  >
                    Apply for Medi-Cal
                  </a>
                </div>
              ) : null}
              {mediCal === true ? (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Upload a photo of the front of your card.</p>
                  <label className="mt-3 flex min-h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-foreground/20 bg-elevated px-4 py-5 text-center">
                    {cardPreview?.startsWith("data:image") ? (
                      <img
                        src={cardPreview}
                        alt="Medi-Cal card"
                        className="max-h-40 w-full rounded-xl object-contain"
                      />
                    ) : (
                      <>
                        <span className="flex size-11 items-center justify-center rounded-full bg-secondary">
                          {cardName ? <CreditCard className="size-5" /> : <Upload className="size-5" />}
                        </span>
                        <span className="text-sm font-medium">{cardName ?? "Choose a photo"}</span>
                        <span className="text-xs text-muted-foreground">JPG or PNG, under 2.5 MB</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => onCard(e.target.files?.[0])}
                    />
                  </label>
                  {cardError ? <p className="mt-2 text-sm text-destructive">{cardError}</p> : null}
                </div>
              ) : null}
            </>
          ) : null}
        </div>

        <div className="mt-6 flex items-center gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="h-12 px-2 text-sm font-medium">
              Back
            </button>
          ) : null}
          <Button type="button" size="lg" className="flex-1" disabled={!canContinue} onClick={next}>
            {step === STEPS - 1 ? "See my matches" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
