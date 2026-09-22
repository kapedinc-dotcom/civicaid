import { useEffect, useState } from "react";
import { FileUp, Phone, ShieldCheck, Upload } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { programById } from "@/data/programs";
import { formatAward } from "@/lib/utils";
import { useCrest } from "@/store/use-crest";
import type { MatchResult } from "@/data/types";
import { cn } from "@/lib/utils";

const VAULT = [
  { id: "tax", name: "2023 tax return", meta: "PDF · Verified", ok: true },
  { id: "pay", name: "October paystub", meta: "Scan · Verified", ok: true },
  { id: "util", name: "Utility bill", meta: "Needed for energy aid", ok: false },
];

function statusLabel(status: string): string {
  if (status === "awarded") return "Approved";
  if (status === "needs-docs") return "Needs a file";
  return "In review";
}

export function QuestsView({ matches }: { matches: MatchResult[] }) {
  const applications = useCrest((s) => s.applications);
  const setSheet = useCrest((s) => s.setSheet);
  const resolveReview = useCrest((s) => s.resolveReview);
  const verify = useCrest((s) => s.verify);
  const saved = useCrest((s) => s.saved);
  const [filter, setFilter] = useState<"active" | "saved">("active");

  const rows = Object.values(applications).filter((a) => a.status !== "idle");
  const action = rows.find((a) => a.status === "needs-docs");
  const actionProgram = action ? programById(action.programId) : undefined;
  const savedMatches = matches.filter((m) => saved.includes(m.program.id));

  useEffect(() => {
    const due = rows.filter(
      (a) => a.status === "in-review" && a.submittedAt && Date.now() - a.submittedAt > 2600,
    );
    if (due.length === 0) return;
    const t = window.setTimeout(() => {
      for (const a of due) resolveReview(a.programId);
    }, 400);
    return () => window.clearTimeout(t);
  }, [rows, resolveReview]);

  return (
    <div className="flex flex-col gap-5 px-5 pb-10 pt-6">
      <section>
        <h1 className="font-display text-3xl italic tracking-tight">Tracker</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {rows.length} applications · {saved.length} saved
        </p>
      </section>

      {action && actionProgram ? (
        <div className="rounded-2xl bg-lilac p-4 text-lilac-fg">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-foreground">1 action needed</p>
            <Badge tone="lilac">Urgent</Badge>
          </div>
          <p className="mt-2 text-sm text-foreground">
            {actionProgram.shortName} is waiting on proof of income.
          </p>
          <Button
            size="sm"
            className="mt-3"
            onClick={() => {
              verify("income");
              verify("residency");
              window.setTimeout(() => resolveReview(action.programId), 300);
            }}
          >
            <Upload className="size-4" /> Upload document
          </Button>
        </div>
      ) : null}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setFilter("active")}
          className={cn(
            "h-10 rounded-full px-4 text-xs font-medium",
            filter === "active"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground shadow-[var(--shadow-border)]",
          )}
        >
          Applications ({rows.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter("saved")}
          className={cn(
            "h-10 rounded-full px-4 text-xs font-medium",
            filter === "saved"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground shadow-[var(--shadow-border)]",
          )}
        >
          Saved ({saved.length})
        </button>
      </div>

      {filter === "active" ? (
        <div className="flex flex-col gap-3">
          {rows.map((a) => {
            const program = programById(a.programId);
            const match = matches.find((m) => m.program.id === a.programId);
            if (!program) return null;
            const award = formatAward(
              a.monthlyAward || match?.monthlyAward || 0,
              program.valueKind,
            );
            const step = a.status === "awarded" ? 3 : a.status === "needs-docs" ? 2 : 2;
            return (
              <button
                key={a.programId}
                type="button"
                onClick={() => setSheet("program", a.programId)}
                className="rounded-2xl bg-card p-4 text-left shadow-[var(--shadow-border)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-display text-lg leading-snug">{program.shortName}</p>
                    <p className="text-xs text-muted-foreground">{program.agency}</p>
                  </div>
                  <Badge
                    tone={
                      a.status === "awarded" ? "ok" : a.status === "needs-docs" ? "peach" : "lilac"
                    }
                  >
                    {statusLabel(a.status)}
                  </Badge>
                </div>
                {a.status === "awarded" ? (
                  <p className="mt-3 font-display text-2xl tabular-nums">
                    {award.value}
                    <span className="ml-1 text-sm text-muted-foreground">{award.suffix}</span>
                  </p>
                ) : (
                  <div className="mt-3">
                    <Progress
                      value={(step / 3) * 100}
                      barClassName={a.status === "needs-docs" ? "bg-ok" : "bg-primary"}
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      {a.status === "needs-docs"
                        ? "Waiting on a document"
                        : "Agency is reviewing"}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
          {rows.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">No applications yet.</p>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {savedMatches.map((m) => {
            const award = formatAward(m.monthlyAward, m.program.valueKind);
            return (
              <button
                key={m.program.id}
                type="button"
                onClick={() => setSheet("program", m.program.id)}
                className="rounded-2xl bg-card p-4 text-left shadow-[var(--shadow-border)]"
              >
                <p className="font-display text-lg">{m.program.shortName}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.program.agency}</p>
                <p className="mt-2 font-display tabular-nums">
                  {award.value}
                  <span className="ml-1 text-sm text-muted-foreground">{award.suffix}</span>
                </p>
              </button>
            );
          })}
          {savedMatches.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">Nothing saved yet.</p>
          ) : null}
        </div>
      )}

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl">Documents</h2>
          <button type="button" className="h-11 text-sm text-ok" onClick={() => setSheet("seals")}>
            Manage
          </button>
        </div>
        {VAULT.map((d) => (
          <div
            key={d.id}
            className={
              d.ok
                ? "flex items-center gap-3 rounded-xl bg-card px-3 py-3 shadow-[var(--shadow-border)]"
                : "flex items-center gap-3 rounded-xl bg-warn-soft px-3 py-3"
            }
          >
            <FileUp className="size-4 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.meta}</p>
            </div>
            {d.ok ? (
              <Badge tone="ok">
                <ShieldCheck className="size-3" /> Ready
              </Badge>
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  verify("residency");
                  toast.success("Utility bill uploaded.");
                }}
              >
                Upload
              </Button>
            )}
          </div>
        ))}
      </section>

      <section className="rounded-2xl bg-secondary p-4">
        <p className="text-xs uppercase tracking-wide text-ok">Free local help</p>
        <h2 className="mt-1 font-display text-xl">Need a person on the line?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          211 can walk you through missing documents, pantries, and county offices.
        </p>
        <Button
          className="mt-4 w-full"
          size="lg"
          onClick={() => {
            window.location.href = "tel:211";
          }}
        >
          <Phone className="size-4" /> Dial 211
        </Button>
      </section>
    </div>
  );
}
