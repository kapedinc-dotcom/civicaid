import { Drawer } from "vaul";
import { toast } from "sonner";
import { ExternalLink, Phone } from "lucide-react";
import { Countdown } from "@/components/countdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { programById, CATEGORY_IMAGES } from "@/data/programs";
import { matchProgram, matchTier } from "@/data/eligibility";
import { formatAward } from "@/lib/utils";
import { useCrest } from "@/store/use-crest";

function firstPhone(raw?: string): string | null {
  if (!raw) return null;
  const m = raw.match(/(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|211)/);
  if (!m) return null;
  const digits = m[0].replace(/[^\d]/g, "");
  if (m[0].includes("211") && digits === "211") return "211";
  return digits;
}

export function ProgramSheet() {
  const sheet = useCrest((s) => s.sheet);
  const focusId = useCrest((s) => s.focusId);
  const setSheet = useCrest((s) => s.setSheet);
  const household = useCrest((s) => s.household);
  const applications = useCrest((s) => s.applications);
  const submitProgram = useCrest((s) => s.submitProgram);
  const withdraw = useCrest((s) => s.withdraw);
  const setTab = useCrest((s) => s.setTab);
  const toggleSaved = useCrest((s) => s.toggleSaved);
  const saved = useCrest((s) => s.saved);

  const program = focusId ? programById(focusId) : undefined;
  const open = sheet === "program" && Boolean(program);
  if (!program) return null;
  const match = matchProgram(program, household);
  const tier = matchTier(match);
  const app = applications[program.id];
  const award = formatAward(match.monthlyAward, program.valueKind);
  const bookmarked = saved.includes(program.id);
  const tel = firstPhone(program.phone);
  const href = program.applyUrl || program.website;
  const cover = program.image ?? CATEGORY_IMAGES[program.category];

  const onFile = () => {
    const res = submitProgram(program.id);
    if (res.ok) {
      toast.success(res.message);
      setSheet(null);
      setTab("quests");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) setSheet(null);
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-foreground/30" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] max-w-md flex-col overflow-hidden rounded-t-3xl bg-card shadow-[var(--shadow-lift)] outline-none">
          <div className="relative shrink-0">
            <img src={cover} alt="" className="h-52 w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
            <div className="absolute inset-x-0 top-3 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-card/90" />
            </div>
          </div>
          <div className="overflow-y-auto px-6 pb-10 pt-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {program.agency}
            </p>
            <Drawer.Title className="mt-1 font-display text-2xl tracking-tight">
              {program.shortName}
            </Drawer.Title>
            {program.name !== program.shortName ? (
              <p className="mt-1 text-sm text-muted-foreground">{program.name}</p>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {program.listing === "benefit" ? (
                <Badge tone={tier === "qualify" ? "ok" : tier === "close" ? "warn" : "muted"}>
                  {tier === "qualify"
                    ? "You qualify"
                    : tier === "close"
                      ? "Might qualify"
                      : "Not advertised"}
                </Badge>
              ) : null}
              <p className="font-display text-2xl tabular-nums">
                {program.listing === "directory"
                  ? "Directory"
                  : program.listing === "advisory"
                    ? "Reality check"
                    : match.eligible && match.monthlyAward > 0
                      ? `${award.value}${award.suffix}`
                      : match.eligible
                        ? "In-kind"
                        : "Not a match"}
              </p>
              {program.urgent ? <Badge tone="warn">Urgent</Badge> : null}
              {program.listing === "advisory" ? <Badge tone="danger">Not an application</Badge> : null}
              {app && app.status !== "idle" ? (
                <Badge tone={app.status === "awarded" ? "ok" : "accent"}>
                  {app.status.replace("-", " ")}
                </Badge>
              ) : null}
            </div>
            {match.deadline && (
              <p className="mt-1 text-sm text-muted-foreground">
                Closes in <Countdown to={match.deadline} /> · {program.renewal}
              </p>
            )}

            {program.receive ? (
              <p className="mt-4 text-sm">{program.receive}</p>
            ) : (
              <p className="mt-4 text-sm">{program.plain}</p>
            )}

            {program.incomeGuideline ? (
              <p className="mt-3 rounded-xl bg-elevated px-3 py-2 text-xs text-muted-foreground">
                {program.incomeGuideline}
              </p>
            ) : null}

            <h3 className="mt-5 font-display text-sm">
              {tier === "qualify"
                ? "Why you qualify"
                : tier === "close"
                  ? "What’s still missing"
                  : "Why this isn’t up front"}
            </h3>
            <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
              {match.blockers.map((r) => (
                <li key={r} className="text-destructive">
                  · {r}
                </li>
              ))}
              {match.reasons.map((r) => (
                <li key={r}>· {r}</li>
              ))}
            </ul>

            {program.howToApply ? (
              <>
                <h3 className="mt-5 font-display text-sm">How to apply</h3>
                <p className="mt-2 text-sm text-muted-foreground">{program.howToApply}</p>
              </>
            ) : null}

            {program.timeline || program.cost || program.asOf ? (
              <p className="mt-4 text-xs leading-relaxed text-subtle">
                {[
                  program.timeline,
                  program.cost,
                  program.asOf ? `As of ${program.asOf}` : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : null}

            {program.documents.length > 0 && (
              <>
                <h3 className="mt-5 font-display text-sm">Documents</h3>
                <ul className="mt-2 flex flex-col gap-1.5 text-sm">
                  {program.documents.map((d) => {
                    const missing = match.missingDocs.includes(d);
                    return (
                      <li key={d} className={missing ? "text-warn" : "text-muted-foreground"}>
                        {missing ? "Needed · " : "Ready · "}
                        {d}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            {program.notes ? (
              <p className="mt-6 rounded-2xl bg-warn-soft px-4 py-3 text-sm leading-relaxed text-foreground">
                {program.notes}
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-2">
              {href ? (
                <Button
                  onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
                >
                  <ExternalLink className="size-4" />
                  {program.listing === "directory" ? "Open official directory" : "Open official site"}
                </Button>
              ) : null}
              {tel ? (
                <Button variant="outline" onClick={() => {
                  window.location.href = `tel:${tel}`;
                }}>
                  <Phone className="size-4" />
                  {tel === "211" ? "Dial 211" : `Call ${tel}`}
                </Button>
              ) : program.phone ? (
                <p className="text-sm text-muted-foreground">{program.phone}</p>
              ) : null}

              {program.listing === "benefit" && (!app || app.status === "idle") && (
                <Button
                  variant={href ? "outline" : "default"}
                  onClick={onFile}
                  disabled={!match.eligible}
                >
                  {match.eligible ? "Track this application" : "Household does not clear yet"}
                </Button>
              )}
              {app && app.status === "needs-docs" && (
                <Button onClick={() => setSheet("seals")}>Upload missing documents</Button>
              )}
              {app && app.status !== "idle" && app.status !== "awarded" && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    withdraw(program.id);
                    toast("Application withdrawn.");
                    setSheet(null);
                  }}
                >
                  Withdraw
                </Button>
              )}
              {app?.status === "awarded" && (
                <p className="text-sm text-ok">This benefit is already approved and active.</p>
              )}
              <Button variant="outline" onClick={() => toggleSaved(program.id)}>
                {bookmarked ? "Saved" : "Save for later"}
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
