import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEFAULT_APPLICATIONS, DEFAULT_HOUSEHOLD } from "@/data/default-household";
import { activeSlotCount, matchAll, matchProgram } from "@/data/eligibility";
import { programById } from "@/data/live-catalog";
import { rankFor } from "@/data/ranks";
import type {
  Application,
  ApplicationStatus,
  Category,
  Household,
  PartyMember,
  TabId,
  VerifyKey,
} from "@/data/types";

export type SheetKind = "program" | "bundle" | "party" | "recast" | "seals" | "catalog" | null;

interface CrestState {
  household: Household;
  applications: Record<string, Application>;
  tab: TabId;
  sheet: SheetKind;
  focusId: string | null;
  ledgerFilter: "all" | "matched" | Category;
  eligStep: number;
  saved: string[];
  catalogUrl: string;
  accountReady: boolean;
  setAccountReady: (ready: boolean) => void;
  hydrateAccount: (payload: {
    household: Household;
    applications: Record<string, Application>;
    saved: string[];
    eligStep: number;
    tab?: TabId;
  }) => void;
  setTab: (tab: TabId) => void;
  setSheet: (sheet: SheetKind, focusId?: string | null) => void;
  setLedgerFilter: (filter: CrestState["ledgerFilter"]) => void;
  setCatalogUrl: (url: string) => void;
  setEligStep: (step: number) => void;
  toggleSaved: (id: string) => void;
  enterHall: () => void;
  updateHousehold: (patch: Partial<Household>) => void;
  setMembers: (members: PartyMember[]) => void;
  verify: (key: VerifyKey) => void;
  submitProgram: (programId: string, bundleId?: string) => { ok: boolean; message: string };
  submitBundle: (bundleId: string, programIds: string[]) => { ok: boolean; message: string };
  withdraw: (programId: string) => void;
  resolveReview: (programId: string) => void;
  resetDemo: () => void;
}

function canAffordSlot(
  applications: Record<string, Application>,
  household: Household,
  extra = 1,
): boolean {
  const used = activeSlotCount(applications);
  const cap = rankFor(household.xp).slots;
  return used + extra <= cap;
}

export const useCrest = create<CrestState>()(
  persist(
    (set, get) => ({
      household: DEFAULT_HOUSEHOLD,
      applications: DEFAULT_APPLICATIONS,
      tab: "hall",
      sheet: null,
      focusId: null,
      ledgerFilter: "all",
      eligStep: 2,
      saved: ["diaper", "weatherize"],
      catalogUrl: "",
      accountReady: false,
      setAccountReady: (accountReady) => set({ accountReady }),
      hydrateAccount: (payload) =>
        set({
          household: payload.household,
          applications: payload.applications,
          saved: payload.saved,
          eligStep: payload.eligStep,
          tab: payload.tab ?? "hall",
          sheet: null,
          focusId: null,
        }),
      setTab: (tab) => set({ tab, sheet: null, focusId: null }),
      setSheet: (sheet, focusId = null) => set({ sheet, focusId }),
      setLedgerFilter: (ledgerFilter) => set({ ledgerFilter }),
      setCatalogUrl: (catalogUrl) => set({ catalogUrl }),
      setEligStep: (eligStep) => set({ eligStep }),
      toggleSaved: (id) =>
        set((s) => ({
          saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id],
        })),
      enterHall: () =>
        set((s) => ({
          household: { ...s.household, entered: true, xp: Math.max(s.household.xp, 40) },
        })),
      updateHousehold: (patch) => set((s) => ({ household: { ...s.household, ...patch } })),
      setMembers: (members) => set((s) => ({ household: { ...s.household, members } })),
      verify: (key) =>
        set((s) => {
          if (s.household.verified[key]) return s;
          return {
            household: {
              ...s.household,
              verified: { ...s.household.verified, [key]: true },
              xp: s.household.xp + 40,
            },
          };
        }),
      submitProgram: (programId, bundleId) => {
        const { household, applications } = get();
        const existing = applications[programId];
        if (existing && existing.status !== "idle") {
          if (existing.status === "awarded") {
            return { ok: false, message: "This benefit is already approved." };
          }
          return { ok: false, message: "This application is already in progress." };
        }
        const match = matchAll(household).find((m) => m.program.id === programId);
        const program = programById(programId);
        if (!program) {
          return { ok: false, message: "That program is not in this directory." };
        }
        if (program.listing === "advisory") {
          return { ok: false, message: "This is a reality check, not something you can apply for." };
        }
        if (program.listing === "directory") {
          return { ok: false, message: "Open the official directory instead of filing here." };
        }
        if (!match?.eligible) {
          return { ok: false, message: "Your household does not clear this program yet." };
        }
        if (!canAffordSlot(applications, household, 1)) {
          return { ok: false, message: "No open application slots. Finish a review first." };
        }
        const now = Date.now();
        set({
          applications: {
            ...applications,
            [programId]: {
              programId,
              status: match.missingDocs.length ? "needs-docs" : "in-review",
              submittedAt: now,
              monthlyAward: match.monthlyAward,
              bundleId,
            },
          },
          household: { ...household, xp: household.xp + 25 },
        });
        return {
          ok: true,
          message: match.missingDocs.length
            ? "Filed with missing documents. Verify them to move review."
            : "Application filed. The agency has the packet.",
        };
      },
      submitBundle: (bundleId, programIds) => {
        const { household, applications } = get();
        const fresh = programIds.filter((id) => {
          const st = applications[id]?.status;
          return !st || st === "idle";
        });
        if (fresh.length === 0) {
          return { ok: false, message: "Every program in this bundle is already filed." };
        }
        const eligible = fresh.filter((id) => {
          const p = programById(id);
          if (!p) return false;
          const m = matchProgram(p, household);
          return m.eligible && m.monthlyAward > 0;
        });
        if (eligible.length === 0) {
          return { ok: false, message: "No program in this bundle clears your household yet." };
        }
        if (!canAffordSlot(applications, household, 1)) {
          return { ok: false, message: "A combined filing still needs one open slot." };
        }
        const next = { ...applications };
        const now = Date.now();
        for (const id of eligible) {
          const match = matchProgram(programById(id)!, household);
          next[id] = {
            programId: id,
            status: match.missingDocs.length ? "needs-docs" : "in-review",
            submittedAt: now,
            monthlyAward: match.monthlyAward,
            bundleId,
          };
        }
        set({
          applications: next,
          household: { ...household, xp: household.xp + 55 },
        });
        return {
          ok: true,
          message: `Combined application filed — ${eligible.length} programs, one packet.`,
        };
      },
      withdraw: (programId) =>
        set((s) => {
          const next = { ...s.applications };
          delete next[programId];
          return { applications: next };
        }),
      resolveReview: (programId) =>
        set((s) => {
          const app = s.applications[programId];
          if (!app) return s;
          const match = matchProgram(programById(programId)!, s.household);
          const awarded = match.eligible && match.missingDocs.length === 0;
          const status: ApplicationStatus = awarded ? "awarded" : "needs-docs";
          return {
            applications: {
              ...s.applications,
              [programId]: {
                ...app,
                status,
                awardedAt: awarded ? Date.now() : app.awardedAt,
                monthlyAward: awarded ? match.monthlyAward : app.monthlyAward,
              },
            },
            household: {
              ...s.household,
              xp: s.household.xp + (awarded ? 70 : 0),
            },
          };
        }),
      resetDemo: () =>
        set({
          household: { ...DEFAULT_HOUSEHOLD, entered: true },
          applications: DEFAULT_APPLICATIONS,
          tab: "hall",
          sheet: null,
          focusId: null,
          ledgerFilter: "all",
          saved: ["food-bank", "weatherize"],
          eligStep: 2,
          catalogUrl: get().catalogUrl,
        }),
    }),
    {
      name: "civic-v3",
      storage: createJSONStorage(() =>
        typeof window === "undefined"
          ? {
              getItem: () => null,
              setItem: () => undefined,
              removeItem: () => undefined,
            }
          : localStorage,
      ),
      partialize: (s) => ({
        household: s.household,
        applications: s.applications,
        saved: s.saved,
        eligStep: s.eligStep,
        catalogUrl: s.catalogUrl,
      }),
    },
  ),
);
