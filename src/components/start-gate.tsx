import { CrestMark } from "@/components/crest-mark";
import { PartyAvatar } from "@/components/party-avatar";
import { Button } from "@/components/ui/button";
import { matchAll, potentialMonthly } from "@/data/eligibility";
import { formatUsdMo } from "@/lib/utils";
import { useCrest } from "@/store/use-crest";

export function StartGate() {
  const household = useCrest((s) => s.household);
  const enterHall = useCrest((s) => s.enterHall);
  const setTab = useCrest((s) => s.setTab);
  const potential = potentialMonthly(matchAll(household));

  return (
    <div className="flex min-h-dvh flex-col bg-background px-6 pb-10 pt-16">
      <div className="stagger-in flex w-full flex-1 flex-col">
        <CrestMark className="size-14" />
        <p className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Household benefits
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Crest</h1>
        <p className="mt-3 max-w-sm text-base text-muted-foreground">
          Your party is the household. Income is the class. Relief programs are quests that pay
          exact dollars — not points.
        </p>

        <div className="mt-8 rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Demo party · {household.city}, {household.state}
          </p>
          <p className="mt-1 font-display text-lg font-semibold">The {household.surname}s</p>
          <div className="mt-3 flex -space-x-2">
            {household.members.map((m) => (
              <div key={m.id} className="rounded-full ring-2 ring-card">
                <PartyAvatar member={m} />
              </div>
            ))}
          </div>
          <p className="mt-4 font-display text-2xl font-semibold tabular-nums">
            {formatUsdMo(potential)}
          </p>
          <p className="text-sm text-muted-foreground">cleared on this sheet before you file</p>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-8">
          <Button size="lg" onClick={() => enterHall()}>
            Enter the hall
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => {
              enterHall();
              setTab("screen");
            }}
          >
            Recast the party first
          </Button>
        </div>
      </div>
    </div>
  );
}
