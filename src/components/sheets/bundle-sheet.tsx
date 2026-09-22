import { Drawer } from "vaul";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { bundleById, programById } from "@/data/programs";
import { matchProgram } from "@/data/eligibility";
import { formatUsdMo } from "@/lib/utils";
import { useCrest } from "@/store/use-crest";

export function BundleSheet() {
  const sheet = useCrest((s) => s.sheet);
  const focusId = useCrest((s) => s.focusId);
  const setSheet = useCrest((s) => s.setSheet);
  const household = useCrest((s) => s.household);
  const submitBundle = useCrest((s) => s.submitBundle);
  const setTab = useCrest((s) => s.setTab);
  const applications = useCrest((s) => s.applications);

  const bundle = focusId ? bundleById(focusId) : undefined;
  const open = sheet === "bundle" && Boolean(bundle);
  if (!bundle) return null;

  const rows = bundle.programIds
    .map((id) => programById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({ program: p, match: matchProgram(p, household) }));
  const yieldSum = rows
    .filter((r) => r.match.eligible)
    .reduce((s, r) => s + r.match.monthlyAward, 0);
  const docs = Array.from(new Set(rows.flatMap((r) => r.program.documents)));

  const onFile = () => {
    const res = submitBundle(bundle.id, bundle.programIds);
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
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] max-w-md flex-col rounded-t-3xl bg-card shadow-[var(--shadow-lift)] outline-none">
          <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-foreground/15" />
          <div className="overflow-y-auto px-5 pb-8 pt-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {bundle.tag} · one packet
            </p>
            <Drawer.Title className="font-display text-xl tracking-tight">{bundle.name}</Drawer.Title>
            <p className="mt-1 text-sm text-muted-foreground">{bundle.blurb}</p>
            <p className="mt-3 font-display text-2xl tabular-nums">{formatUsdMo(yieldSum)}</p>

            <h3 className="mt-5 font-display text-sm">Programs in this bundle</h3>
            <ul className="mt-2 flex flex-col gap-2">
              {rows.map(({ program, match }) => {
                const st = applications[program.id]?.status;
                return (
                  <li
                    key={program.id}
                    className="flex items-center justify-between gap-2 rounded-md bg-elevated px-3 py-2 text-sm"
                  >
                    <span>
                      {program.name}
                      {st ? <span className="ml-2 text-xs text-muted-foreground">{st}</span> : null}
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      {match.eligible ? formatUsdMo(match.monthlyAward) : "blocked"}
                    </span>
                  </li>
                );
              })}
            </ul>

            <h3 className="mt-5 font-display text-sm">Shared packet</h3>
            <ul className="mt-2 text-sm text-muted-foreground">
              {docs.map((d) => (
                <li key={d}>· {d}</li>
              ))}
            </ul>

            <Button className="mt-6 w-full" onClick={onFile}>
              File combined application
            </Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
