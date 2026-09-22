import { useCallback, useEffect } from "react";
import {
  classifyCallToolError,
  redirectToLoginIfRequired,
  useRefetchWhenConnectorReady,
} from "@/lib/app-data";
import { CATALOG_POLL_MS } from "@/data/catalog-source";
import { pullCatalogFromDrive, pullCatalogSheet } from "@/data/fetch-sheet";
import { parseSheetCsv } from "@/data/sheet-catalog";
import { getCatalogMeta, setCatalogMeta, setPrograms, useCatalogMeta } from "@/data/live-catalog";
import { useCrest } from "@/store/use-crest";

let inflight: Promise<{
  ok: boolean;
  count?: number;
  unchanged?: boolean;
  error?: string;
  loginRequired?: boolean;
  loginUrl?: string;
}> | null = null;

export function syncCatalog(opts?: { url?: string; quiet?: boolean }) {
  if (inflight) return inflight;
  inflight = runSync(opts).finally(() => {
    inflight = null;
  });
  return inflight;
}

async function runSync(opts?: { url?: string; quiet?: boolean }): Promise<{
  ok: boolean;
  count?: number;
  unchanged?: boolean;
  error?: string;
  loginRequired?: boolean;
  loginUrl?: string;
}> {
  const quiet = Boolean(opts?.quiet);
  if (!quiet) setCatalogMeta({ pending: true, error: null });
  const url = opts?.url?.trim();
  const since = quiet ? getCatalogMeta().modifiedTime : undefined;
  const result = url
    ? await pullCatalogSheet({ data: { url } })
    : await pullCatalogFromDrive({ data: { since } });

  if (!result.ok) {
    const classified = classifyCallToolError({
      ok: false,
      data: null,
      pending: result.pending,
      loginRequired: result.loginRequired,
      loginUrl: result.loginUrl,
      errorMessage: result.errorMessage,
    });
    const error = classified?.message ?? result.errorMessage;
    if (!quiet || getCatalogMeta().source === "bundled") {
      setCatalogMeta({
        pending: Boolean(result.pending),
        loginRequired: Boolean(result.loginRequired),
        loginUrl: result.loginUrl,
        error,
        lastChecked: Date.now(),
      });
    } else {
      setCatalogMeta({ pending: false, lastChecked: Date.now() });
    }
    if (result.loginRequired && !quiet) {
      redirectToLoginIfRequired({
        ok: false,
        data: null,
        pending: result.pending,
        loginRequired: true,
        loginUrl: result.loginUrl,
        errorMessage: result.errorMessage,
      });
    }
    return {
      ok: false,
      error,
      loginRequired: result.loginRequired,
      loginUrl: result.loginUrl,
    };
  }

  if (result.unchanged) {
    setCatalogMeta({
      pending: false,
      error: null,
      lastChecked: Date.now(),
      modifiedTime: result.modifiedTime,
      fileId: result.fileId,
      name: result.name,
      webViewLink: result.webViewLink,
      source: result.source,
    });
    return { ok: true, unchanged: true };
  }

  const next = parseSheetCsv(result.csv);
  if (next.length === 0) {
    const error = "No active rows found. Keep the header row and set active to TRUE.";
    setCatalogMeta({ pending: false, error, lastChecked: Date.now() });
    return { ok: false, error };
  }
  setPrograms(next);
  setCatalogMeta({
    source: result.source,
    lastSynced: Date.now(),
    lastChecked: Date.now(),
    modifiedTime: result.modifiedTime,
    fileId: result.fileId,
    error: null,
    pending: false,
    loginRequired: false,
    loginUrl: undefined,
    name: result.name,
    webViewLink: result.webViewLink,
  });
  return { ok: true, count: next.length };
}

export function CatalogSync() {
  const catalogUrl = useCrest((s) => s.catalogUrl);
  const pending = useCatalogMeta().pending;
  const sync = useCallback(
    (quiet = false) => syncCatalog({ url: catalogUrl || undefined, quiet }),
    [catalogUrl],
  );

  useRefetchWhenConnectorReady(pending && !catalogUrl, () => sync(false));

  useEffect(() => {
    void sync(false);
    const tick = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      const state = getCatalogMeta();
      if (state.loginRequired) return;
      void sync(true);
    }, CATALOG_POLL_MS);
    const onVis = () => {
      if (document.visibilityState === "visible") void sync(true);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(tick);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [sync]);

  return null;
}
