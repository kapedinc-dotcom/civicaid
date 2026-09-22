import { useState } from "react";
import { Drawer } from "vaul";
import { toast } from "sonner";
import { ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DRIVE_CATALOG } from "@/data/catalog-source";
import { useCatalogMeta, useLivePrograms } from "@/data/live-catalog";
import { syncCatalog } from "@/components/catalog-sync";
import { useCrest } from "@/store/use-crest";
import { redirectToLoginIfRequired } from "@/lib/app-data";

function ago(ts: number | null): string {
  if (!ts) return "Waiting for the first sync";
  const sec = Math.max(1, Math.round((Date.now() - ts) / 1000));
  if (sec < 60) return `Checked ${sec}s ago`;
  const min = Math.round(sec / 60);
  return `Checked ${min}m ago`;
}

export function CatalogSheet() {
  const sheet = useCrest((s) => s.sheet);
  const setSheet = useCrest((s) => s.setSheet);
  const catalogUrl = useCrest((s) => s.catalogUrl);
  const setCatalogUrl = useCrest((s) => s.setCatalogUrl);
  const programs = useLivePrograms();
  const meta = useCatalogMeta();
  const [draft, setDraft] = useState(catalogUrl);
  const [busy, setBusy] = useState(false);
  const open = sheet === "catalog";
  const href = meta.webViewLink ?? DRIVE_CATALOG.webViewLink;

  const refresh = async (url?: string) => {
    setBusy(true);
    try {
      const result = await syncCatalog({ url });
      if (result.ok && result.unchanged) toast("Already up to date.");
      else if (result.ok) toast.success(`${result.count} benefits are live from the sheet.`);
      else if (result.loginRequired && result.loginUrl) {
        redirectToLoginIfRequired({
          ok: false,
          data: null,
          loginRequired: true,
          loginUrl: result.loginUrl,
        });
      } else if (result.error) toast.error(result.error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) setSheet(null);
        else setDraft(catalogUrl);
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-foreground/30" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] max-w-md flex-col rounded-t-3xl bg-card shadow-[var(--shadow-lift)] outline-none">
          <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-foreground/15" />
          <div className="overflow-y-auto px-5 pb-10 pt-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Auto-updating
            </p>
            <Drawer.Title className="font-display text-2xl tracking-tight">
              {DRIVE_CATALOG.name}
            </Drawer.Title>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Your edits land in the app within a few seconds. Official amounts — SNAP,
              FPL, SSI, tax credits — refresh every morning at 8:00 am Pacific.
            </p>

            <p className="mt-4 text-sm">
              {programs.length} programs · {ago(meta.lastChecked ?? meta.lastSynced)}
            </p>
            {meta.error ? (
              <p className="mt-2 text-sm text-destructive">{meta.error}</p>
            ) : null}

            <div className="mt-5 flex flex-col gap-2">
              <Button
                onClick={() => refresh(catalogUrl || undefined)}
                disabled={busy || meta.pending}
              >
                <RefreshCw className="size-4" />
                {busy || meta.pending ? "Syncing…" : "Refresh now"}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
              >
                <ExternalLink className="size-4" />
                Open in Google Sheets
              </Button>
            </div>

            <p className="mt-6 text-xs uppercase tracking-wide text-muted-foreground">
              Use a different sheet
            </p>
            <label className="mt-2 block text-sm font-medium" htmlFor="sheet-url">
              Google Sheets link
            </label>
            <input
              id="sheet-url"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/…"
              className="mt-2 flex h-12 w-full rounded-2xl bg-elevated px-4 text-sm text-foreground shadow-[var(--shadow-border)] placeholder:text-subtle"
            />
            <button
              type="button"
              className="mt-2 h-11 text-sm font-medium text-ok"
              onClick={async () => {
                const url = draft.trim();
                if (!url) {
                  toast.error("Paste a Google Sheets link first.");
                  return;
                }
                setCatalogUrl(url);
                await refresh(url);
              }}
            >
              Connect this link instead
            </button>
            {catalogUrl ? (
              <button
                type="button"
                className="h-11 text-sm text-muted-foreground"
                onClick={() => {
                  setCatalogUrl("");
                  setDraft("");
                  void refresh();
                  toast("Back to CivicAid Benefits in Drive.");
                }}
              >
                Use the Drive catalog
              </button>
            ) : null}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
