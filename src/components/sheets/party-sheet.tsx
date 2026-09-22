import { Drawer } from "vaul";
import { PartyAvatar } from "@/components/party-avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { awardContext, roleLabel, sealCount } from "@/data/eligibility";
import { formatUsd } from "@/lib/utils";
import { useCrest } from "@/store/use-crest";

export function PartySheet() {
  const sheet = useCrest((s) => s.sheet);
  const setSheet = useCrest((s) => s.setSheet);
  const household = useCrest((s) => s.household);
  const setTab = useCrest((s) => s.setTab);
  const resetDemo = useCrest((s) => s.resetDemo);
  const open = sheet === "party";
  const ctx = awardContext(household);
  const docs = sealCount(household.verified);

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) setSheet(null);
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-foreground/30" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] max-w-md flex-col rounded-t-3xl bg-card shadow-[var(--shadow-lift)] outline-none">
          <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-foreground/15" />
          <div className="overflow-y-auto px-5 pb-8 pt-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {household.city}, {household.state} · {household.zip}
            </p>
            <Drawer.Title className="font-display text-xl tracking-tight">
              {household.surname} household
            </Drawer.Title>
            <p className="mt-1 text-sm text-muted-foreground">
              {household.members.length} people · {formatUsd(household.monthlyIncome)}/mo ·{" "}
              {Math.round(ctx.fplPct)}% FPL
            </p>
            <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
              Documents verified {docs}/4
            </p>
            <Progress className="mt-2" value={(docs / 4) * 100} barClassName="bg-ok" />

            <ul className="mt-5 flex flex-col gap-2">
              {household.members.map((m) => (
                <li key={m.id} className="flex items-center gap-3 rounded-xl bg-elevated p-2.5">
                  <PartyAvatar member={m} />
                  <div>
                    <p className="font-display text-sm">{m.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {roleLabel(m.role)} · {m.age}
                      {m.employed ? " · employed" : ""}
                      {m.student ? " · student" : ""}
                      {m.disabled ? " · disability" : ""}
                      {m.veteran ? " · veteran" : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-2">
              <Button
                onClick={() => {
                  setSheet(null);
                  setTab("screen");
                }}
              >
                Recheck eligibility
              </Button>
              <Button variant="outline" onClick={() => setSheet("seals")}>
                Manage documents
              </Button>
              <Button variant="ghost" onClick={() => resetDemo()}>
                Restore demo household
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
