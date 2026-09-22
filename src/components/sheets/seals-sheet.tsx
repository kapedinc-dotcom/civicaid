import { Drawer } from "vaul";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { labelBadge } from "@/data/eligibility";
import { useCrest } from "@/store/use-crest";
import type { VerifyKey } from "@/data/types";
import { cn } from "@/lib/utils";

const DOCS: { key: VerifyKey; how: string }[] = [
  { key: "identity", how: "Photo ID for the lead. Confirms the filing name." },
  { key: "income", how: "Pay stub, award letter, or tax transcript. Unlocks exact SNAP math." },
  { key: "residency", how: "Lease or utility bill in this ZIP. Required for energy credits." },
  { key: "household", how: "Birth records or SSNs for every household member." },
];

export function SealsSheet() {
  const sheet = useCrest((s) => s.sheet);
  const setSheet = useCrest((s) => s.setSheet);
  const household = useCrest((s) => s.household);
  const verify = useCrest((s) => s.verify);
  const applications = useCrest((s) => s.applications);
  const resolveReview = useCrest((s) => s.resolveReview);
  const open = sheet === "seals";

  const stamp = (key: VerifyKey) => {
    verify(key);
    toast.success(`${labelBadge(key)} verified.`);
    window.setTimeout(() => {
      for (const app of Object.values(useCrest.getState().applications)) {
        if (app.status === "needs-docs" || app.status === "in-review") {
          resolveReview(app.programId);
        }
      }
    }, 350);
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
            <img
              src="/images/documents.jpg"
              alt=""
              className="mb-4 h-28 w-full rounded-2xl object-cover"
            />
            <Drawer.Title className="font-display text-xl tracking-tight">
              Document vault
            </Drawer.Title>
            <p className="mt-1 text-sm text-muted-foreground">
              Verify these once. Each check raises your match score and turns estimates into exact
              awards.
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {DOCS.map((s) => {
                const on = household.verified[s.key];
                return (
                  <li
                    key={s.key}
                    className="flex items-start gap-3 rounded-xl bg-elevated p-3 shadow-[var(--shadow-border)]"
                  >
                    <ShieldCheck className={cn("mt-0.5 size-5", on ? "text-ok" : "text-subtle")} />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm">{labelBadge(s.key)}</p>
                      <p className="text-sm text-muted-foreground">{s.how}</p>
                    </div>
                    {on ? (
                      <span className="text-xs uppercase tracking-wide text-ok">Verified</span>
                    ) : (
                      <Button size="sm" onClick={() => stamp(s.key)}>
                        Verify
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-subtle">
              {Object.values(applications).filter((a) => a.status === "needs-docs").length}{" "}
              applications waiting on a document.
            </p>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
