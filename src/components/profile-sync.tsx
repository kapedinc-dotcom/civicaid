import { useEffect, useRef } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { blankHousehold } from "@/data/blank-household";
import { loadProfile, saveProfile } from "@/data/profile";
import { useCrest } from "@/store/use-crest";

const AUTHED_KEY = "civic-authed";

export function ProfileSync() {
  const { user, isPending } = useCurrentUserState();
  const household = useCrest((s) => s.household);
  const applications = useCrest((s) => s.applications);
  const saved = useCrest((s) => s.saved);
  const eligStep = useCrest((s) => s.eligStep);
  const hydrateAccount = useCrest((s) => s.hydrateAccount);
  const setAccountReady = useCrest((s) => s.setAccountReady);
  const resetDemo = useCrest((s) => s.resetDemo);
  const ready = useRef(false);
  const userId = useRef<string | null>(null);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      ready.current = false;
      userId.current = null;
      setAccountReady(false);
      if (typeof window !== "undefined" && sessionStorage.getItem(AUTHED_KEY)) {
        sessionStorage.removeItem(AUTHED_KEY);
        resetDemo();
      }
      return;
    }
    if (typeof window !== "undefined") sessionStorage.setItem(AUTHED_KEY, "1");
    if (userId.current === user.id && ready.current) return;
    userId.current = user.id;
    ready.current = false;
    let cancelled = false;
    loadProfile()
      .then((row) => {
        if (cancelled) return;
        if (row && row.household.members.length > 0) {
          const local = useCrest.getState();
          hydrateAccount(
            local.eligStep > row.eligStep
              ? { ...row, eligStep: local.eligStep, household: local.household }
              : row,
          );
        } else {
          const name = user.displayName || user.primaryEmail || "You";
          hydrateAccount({
            household: blankHousehold(name),
            applications: {},
            saved: [],
            eligStep: 0,
            tab: "screen",
          });
        }
        ready.current = true;
        setAccountReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          ready.current = true;
          setAccountReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user, isPending, hydrateAccount, resetDemo, setAccountReady]);

  useEffect(() => {
    if (!user || !ready.current) return;
    const timer = window.setTimeout(() => {
      const latest = useCrest.getState();
      void saveProfile({
        data: {
          household: latest.household,
          applications: latest.applications,
          saved: latest.saved,
          eligStep: latest.eligStep,
        },
      }).catch(() => {
        /* Keep working locally if the save lags. */
      });
    }, 700);
    return () => window.clearTimeout(timer);
  }, [user, household, applications, saved, eligStep]);

  return null;
}
