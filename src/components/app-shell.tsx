import { useMemo } from "react";
import { Toaster } from "sonner";
import { StatusBar } from "@/components/shell/status-bar";
import { TabBar } from "@/components/shell/tab-bar";
import { HallView } from "@/components/views/hall-view";
import { LedgerView } from "@/components/views/ledger-view";
import { ScreenView } from "@/components/views/screen-view";
import { QuestsView } from "@/components/views/quests-view";
import { ProgramSheet } from "@/components/sheets/program-sheet";
import { BundleSheet } from "@/components/sheets/bundle-sheet";
import { PartySheet } from "@/components/sheets/party-sheet";
import { SealsSheet } from "@/components/sheets/seals-sheet";
import { CatalogSheet } from "@/components/sheets/catalog-sheet";
import { CatalogSync } from "@/components/catalog-sync";
import { ProfileSync } from "@/components/profile-sync";
import { LoginPanel } from "@/components/login-panel";
import { Onboarding } from "@/components/onboarding";
import { matchAll } from "@/data/eligibility";
import { useLivePrograms } from "@/data/live-catalog";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useCrest } from "@/store/use-crest";

export function AppShell() {
  const { user, isPending } = useCurrentUserState();
  const household = useCrest((s) => s.household);
  const tab = useCrest((s) => s.tab);
  const eligStep = useCrest((s) => s.eligStep);
  const accountReady = useCrest((s) => s.accountReady);
  const programs = useLivePrograms();
  const matches = useMemo(() => matchAll(household, programs), [household, programs]);

  if (isPending || (user && !accountReady)) {
    return (
      <div className="flex min-h-dvh justify-center bg-secondary">
        <ProfileSync />
        <div className="flex min-h-dvh w-full max-w-md flex-col bg-background px-5 pt-8 shadow-[var(--shadow-lift)]">
          <div className="h-8 w-32 animate-pulse rounded-full bg-foreground/10" />
          <div className="mt-8 h-10 w-56 animate-pulse rounded-full bg-foreground/10" />
          <div className="mt-6 h-60 animate-pulse rounded-3xl bg-foreground/10" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-dvh justify-center bg-secondary">
        <ProfileSync />
        <LoginPanel />
      </div>
    );
  }

  if (eligStep < 2) {
    return (
      <>
        <ProfileSync />
        <Onboarding />
      </>
    );
  }

  return (
    <div className="flex min-h-dvh justify-center bg-secondary">
      <CatalogSync />
      <ProfileSync />
      <div className="flex min-h-dvh w-full max-w-md flex-col bg-background shadow-[var(--shadow-lift)]">
        <StatusBar />
        <main className="flex-1 overflow-y-auto scroll-pt-16">
          {tab === "hall" && <HallView matches={matches} />}
          {tab === "ledger" && <LedgerView matches={matches} />}
          {tab === "screen" && <ScreenView matches={matches} />}
          {tab === "quests" && <QuestsView matches={matches} />}
        </main>
        <TabBar />
        <ProgramSheet />
        <BundleSheet />
        <PartySheet />
        <SealsSheet />
        <CatalogSheet />
      </div>
      <Toaster
        theme="light"
        position="top-center"
        toastOptions={{
          className: "font-sans bg-card text-foreground border-border",
        }}
      />
    </div>
  );
}
