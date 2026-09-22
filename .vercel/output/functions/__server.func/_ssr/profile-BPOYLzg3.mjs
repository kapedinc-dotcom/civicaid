import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as authMiddleware } from "./middleware-CVHvBhdv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BPOYLzg3.js
function asJson(value, fallback) {
	if (value == null) return fallback;
	if (typeof value === "string") try {
		return JSON.parse(value);
	} catch {
		return fallback;
	}
	return value;
}
function toPayload(row) {
	return {
		household: asJson(row.household, blankFallback()),
		applications: asJson(row.applications, {}),
		saved: asJson(row.saved, []),
		eligStep: Number(row.elig_step) || 0
	};
}
function blankFallback() {
	return {
		surname: "",
		city: "Ontario",
		state: "CA",
		zip: "91761",
		monthlyIncome: 0,
		monthlyRent: 0,
		xp: 0,
		entered: true,
		verified: {
			identity: false,
			income: false,
			residency: false,
			household: false
		},
		members: []
	};
}
var loadProfile_createServerFn_handler = createServerRpc({
	id: "f8745d92712f742dccf87270d7acf704e3ce897cbdd3eb8ccbf04778e7561011",
	name: "loadProfile",
	filename: "src/data/profile.ts"
}, (opts) => loadProfile.__executeServer(opts));
var loadProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadProfile_createServerFn_handler, async ({ context }) => {
	const { getSql } = await import("./db-CvgYQMWO.mjs").then((n) => n.t).then((n) => n.t);
	const row = (await (await getSql())`
      select household, applications, saved, elig_step
      from profiles
      where user_id = ${context.userId}
      limit 1
    `)[0];
	return row ? toPayload(row) : null;
});
var saveProfile_createServerFn_handler = createServerRpc({
	id: "6390c9ff08b2a59f7c7b227d0becfb065f507c829252d253e7dbda3941b9fb12",
	name: "saveProfile",
	filename: "src/data/profile.ts"
}, (opts) => saveProfile.__executeServer(opts));
var saveProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(saveProfile_createServerFn_handler, async ({ context, data }) => {
	const { getSql } = await import("./db-CvgYQMWO.mjs").then((n) => n.t).then((n) => n.t);
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
	return { ok: true };
});
//#endregion
export { loadProfile_createServerFn_handler, saveProfile_createServerFn_handler };
