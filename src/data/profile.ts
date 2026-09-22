import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import type { Application, Household } from "./types";

export type ProfilePayload = {
  household: Household;
  applications: Record<string, Application>;
  saved: string[];
  eligStep: number;
};

type ProfileRow = {
  household: Household | string;
  applications: Record<string, Application> | string;
  saved: string[] | string;
  elig_step: number | string;
};

function asJson<T>(value: T | string, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value;
}

function toPayload(row: ProfileRow): ProfilePayload {
  return {
    household: asJson(row.household, blankFallback()),
    applications: asJson(row.applications, {}),
    saved: asJson(row.saved, []),
    eligStep: Number(row.elig_step) || 0,
  };
}

function blankFallback(): Household {
  return {
    surname: "",
    city: "Ontario",
    state: "CA",
    zip: "91761",
    monthlyIncome: 0,
    monthlyRent: 0,
    xp: 0,
    entered: true,
    verified: { identity: false, income: false, residency: false, household: false },
    members: [],
  };
}

export const loadProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<ProfilePayload | null> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<ProfileRow>`
      select household, applications, saved, elig_step
      from profiles
      where user_id = ${context.userId}
      limit 1
    `;
    const row = rows[0];
    return row ? toPayload(row) : null;
  });

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: ProfilePayload) => data)
  .handler(async ({ context, data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const household = JSON.stringify(data.household);
    const applications = JSON.stringify(data.applications);
    const saved = JSON.stringify(data.saved);
    await sql`
      insert into profiles (user_id, household, applications, saved, elig_step, updated_at)
      values (${context.userId}, ${household}::jsonb, ${applications}::jsonb, ${saved}::jsonb, ${data.eligStep}, now())
      on conflict (user_id) do update set
        household = excluded.household,
        applications = excluded.applications,
        saved = excluded.saved,
        elig_step = excluded.elig_step,
        updated_at = now()
    `;
    return { ok: true as const };
  });
