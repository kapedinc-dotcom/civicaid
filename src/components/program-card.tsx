import { Badge } from "@/components/ui/badge";
import { CATEGORY_META } from "@/data/programs";
import { formatAward } from "@/lib/utils";
import type { Application, MatchResult } from "@/data/types";
import { cn } from "@/lib/utils";

const STATUS_TONE: Record<string, "muted" | "accent" | "ok" | "warn" | "danger"> = {
  awarded: "ok",
  "in-review": "accent",
  "needs-docs": "warn",
  submitted: "accent",
  bundled: "accent",
};

export function ProgramCard({
  match,
  application,
  onOpen,
}: {
  match: MatchResult;
  application?: Application;
  onOpen: () => void;
}) {
  const { program, score, eligible, monthlyAward } = match;
  const status = application?.status;
  const payout = status === "awarded" ? application?.monthlyAward || monthlyAward : monthlyAward;
  const award = formatAward(payout, program.valueKind);
  const cat = CATEGORY_META[program.category];

  return (
    <button
      type="button"
      onClick={onOpen}
      className="relative w-full overflow-hidden rounded-2xl bg-card p-4 pt-5 text-left shadow-[var(--shadow-border)] transition-[box-shadow,scale] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)] active:scale-[0.99]"
    >
      <span className={cn("absolute inset-x-0 top-0 h-1", cat.bar)} />
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-display text-base tracking-tight">{program.name}</p>
          <p className="truncate text-xs text-muted-foreground">{program.agency}</p>
        </div>
        <span className={cn("shrink-0 tabular-nums text-xs font-medium", eligible ? "text-ok" : "text-subtle")}>
          {score}%
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span className="font-display text-sm tabular-nums text-foreground">
          {status === "awarded" || eligible ? `${award.value}${award.suffix}` : "—"}
        </span>
        {program.urgent && <Badge tone="warn">Urgent</Badge>}
        {status && status !== "idle" && (
          <Badge tone={STATUS_TONE[status] ?? "muted"}>{status.replace("-", " ")}</Badge>
        )}
      </div>
    </button>
  );
}
