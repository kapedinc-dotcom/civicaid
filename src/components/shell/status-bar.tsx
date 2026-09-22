import { CivicMark } from "@/components/civic-mark";
import { PartyAvatar } from "@/components/party-avatar";
import { AuthSlot } from "@/components/auth-slot";
import { useCrest } from "@/store/use-crest";

export function StatusBar() {
  const household = useCrest((s) => s.household);
  const setSheet = useCrest((s) => s.setSheet);
  const lead = household.members.find((m) => m.role === "self") ?? household.members[0];

  return (
    <header className="safe-top sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between gap-2 px-4">
        <div className="flex min-w-0 items-center gap-2">
          <CivicMark className="size-8 shrink-0" />
          <p className="font-display text-lg tracking-tight">CivicAid</p>
        </div>
        <div className="flex items-center gap-2">
          <AuthSlot />
          <button
            type="button"
            onClick={() => setSheet("party")}
            className="rounded-full"
            aria-label="Open household profile"
          >
            {lead ? <PartyAvatar member={lead} size="sm" /> : null}
          </button>
        </div>
      </div>
    </header>
  );
}
