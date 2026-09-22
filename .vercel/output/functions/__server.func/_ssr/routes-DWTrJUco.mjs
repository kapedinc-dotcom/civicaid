import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { i as signOut } from "./client-CVqXY6bk.mjs";
import { n as CONNECTOR_TOKEN_READY_EVENT } from "./types-BU_vzhZ-.mjs";
import { a as hasGateSessionMarker } from "./server-DF7TQW-l.mjs";
import { a as FILTERS, c as bundleById, d as percentOfFpl, i as DRIVE_CATALOG, l as federalPovertyLevel, n as CATEGORY_IMAGES, o as PROGRAMS, r as CATEGORY_META, s as START_DOORS, t as CATALOG_POLL_MS, u as parseSheetCsv } from "./sheet-catalog-CCDj7Uml.mjs";
import { t as authMiddleware } from "./middleware-CVHvBhdv.mjs";
import { C as Baby, E as Accessibility, S as Bookmark, T as ArrowLeft, _ as ExternalLink, a as ShieldAlert, b as CircleCheck, c as Plus, d as Minus, f as MapPin, g as FileUp, h as GraduationCap, i as ShieldCheck, l as Phone, m as Heart, o as Search, p as LayoutGrid, r as Shield, s as RefreshCw, t as Upload, u as PersonStanding, v as Compass, w as ArrowRight, x as Check, y as ClipboardCheck } from "../_libs/lucide-react.mjs";
import { t as createSsrRpc } from "./router-CIyIR1zB.mjs";
import { a as daysFromNow, c as formatAward, d as greeting, f as initials, i as cn, l as formatUsd, m as useCurrentUserState, n as CivicMark, o as emptyMember, p as useCurrentUser, r as LoginPanel, s as firstName, t as Button, u as formatUsdMo } from "./login-panel-CWdwL27D.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DWTrJUco.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function isLoginRequired(result) {
	return result.ok === false && result.loginRequired === true;
}
function isConnectorPending(result) {
	return result.ok === false && result.pending === true;
}
function isFramed() {
	try {
		return window.self !== window.top;
	} catch {
		return true;
	}
}
function redirectToLoginIfRequired(result) {
	if (!isLoginRequired(result)) return false;
	const url = result.loginUrl;
	if (!url) return false;
	if (typeof window === "undefined") return false;
	if (isFramed()) {
		const opened = window.open(url, "_blank");
		if (opened) {
			opened.opener = null;
			return true;
		}
	}
	window.location.assign(url);
	return true;
}
function PartyAvatar({ member, size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex shrink-0 items-center justify-center rounded-full bg-mint font-display font-medium text-ok shadow-[var(--shadow-border)]", size === "sm" ? "size-8 text-xs" : size === "lg" ? "size-14 text-base" : "size-11 text-sm"),
		"aria-hidden": "true",
		children: initials(member.name)
	});
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Render children only once we KNOW the visitor is signed out (`isPending` has
* cleared and there is no user). Hidden while the session is still loading.
*/
function SignedOut({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function AuthSlot() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-8 animate-pulse rounded-full bg-foreground/10" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-[11rem] [&_span.text-sm.font-medium]:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: "h-11 text-sm font-medium text-ok",
		children: "Sign in"
	}) });
}
var DEFAULT_HOUSEHOLD = {
	surname: "Chen",
	city: "Ontario",
	state: "CA",
	zip: "91761",
	monthlyIncome: 3200,
	monthlyRent: 1650,
	xp: 180,
	entered: true,
	verified: {
		identity: true,
		income: true,
		residency: false,
		household: true
	},
	members: [
		{
			id: "m1",
			name: "Maya Chen",
			age: 34,
			role: "self",
			employed: true,
			student: false,
			disabled: false,
			pregnant: false,
			veteran: false
		},
		{
			id: "m2",
			name: "Jordan Chen",
			age: 36,
			role: "partner",
			employed: true,
			student: false,
			disabled: true,
			pregnant: false,
			veteran: false
		},
		{
			id: "m3",
			name: "Aiden Chen",
			age: 3,
			role: "child",
			employed: false,
			student: false,
			disabled: false,
			pregnant: false,
			veteran: false
		}
	]
};
var DEFAULT_APPLICATIONS = {
	calfresh: {
		programId: "calfresh",
		status: "awarded",
		awardedAt: Date.now() - 3456e6,
		monthlyAward: 430
	},
	liheap: {
		programId: "liheap",
		status: "needs-docs",
		submittedAt: Date.now() - 3456e5,
		monthlyAward: 75
	},
	"medi-cal": {
		programId: "medi-cal",
		status: "in-review",
		submittedAt: Date.now() - 1728e5,
		monthlyAward: 630
	}
};
var current = PROGRAMS;
var meta = {
	source: "bundled",
	lastSynced: null,
	lastChecked: null,
	error: null,
	pending: false,
	loginRequired: false
};
var listeners = /* @__PURE__ */ new Set();
function emit() {
	for (const listener of listeners) listener();
}
function getPrograms() {
	return current;
}
function getCatalogMeta() {
	return meta;
}
function setPrograms(next) {
	current = next.length > 0 ? next : PROGRAMS;
	emit();
}
function setCatalogMeta(patch) {
	meta = {
		...meta,
		...patch
	};
	emit();
}
function subscribePrograms(listener) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
function programById(id) {
	return current.find((p) => p.id === id);
}
function useLivePrograms() {
	return (0, import_react.useSyncExternalStore)(subscribePrograms, getPrograms, getPrograms);
}
function useCatalogMeta() {
	return (0, import_react.useSyncExternalStore)(subscribePrograms, getCatalogMeta, getCatalogMeta);
}
function awardContext(h) {
	const size = Math.max(1, h.members.length);
	const annualIncome = h.monthlyIncome * 12;
	const fpl = federalPovertyLevel(size);
	const fplPct = percentOfFpl(annualIncome, size);
	const children = h.members.filter((m) => m.role === "child" || m.age < 18);
	return {
		size,
		annualIncome,
		monthlyIncome: h.monthlyIncome,
		monthlyRent: h.monthlyRent,
		fpl,
		fplPct,
		children,
		members: h.members,
		state: h.state,
		renting: h.monthlyRent > 0
	};
}
function evalRule(rule, ctx, verified) {
	switch (rule.type) {
		case "max_fpl": {
			const cap = rule.percent;
			const ok = ctx.fplPct <= cap + 8;
			const close = ctx.fplPct <= cap + 25;
			return {
				ok,
				required: true,
				note: ok ? `Income is ${Math.round(ctx.fplPct)}% of poverty (limit ~${cap}%).` : close ? `Income is close to the cap (${Math.round(ctx.fplPct)}% vs ${cap}%).` : `Income is above the cap (${Math.round(ctx.fplPct)}% vs ${cap}%).`
			};
		}
		case "child_under": {
			const ok = ctx.children.some((c) => c.age < rule.age);
			return {
				ok,
				required: true,
				note: ok ? `A child under ${rule.age} is in the household.` : `Needs a child under ${rule.age}.`
			};
		}
		case "min_children": {
			const pool = ctx.children.filter((c) => rule.ageMax == null ? true : c.age < rule.ageMax);
			const ok = pool.length >= rule.count;
			return {
				ok,
				required: true,
				note: ok ? `${pool.length} qualifying ${pool.length === 1 ? "child" : "children"} in the household.` : `Needs ${rule.count}+ child${rule.count > 1 ? "ren" : ""}` + (rule.ageMax ? ` under ${rule.ageMax}` : "") + "."
			};
		}
		case "working_or_student": {
			const ok = ctx.members.some((m) => m.employed || m.student);
			return {
				ok,
				required: true,
				note: ok ? "Someone in the household is working or in school." : "Needs a working or student adult."
			};
		}
		case "renting": return {
			ok: ctx.renting,
			required: true,
			note: ctx.renting ? "Household is renting." : "Needs a listed rental cost."
		};
		case "has_disabled": {
			const ok = ctx.members.some((m) => m.disabled);
			return {
				ok,
				required: true,
				note: ok ? "A household member has a disability." : "Needs a disability on a household member."
			};
		}
		case "has_veteran": {
			const ok = ctx.members.some((m) => m.veteran);
			return {
				ok,
				required: true,
				note: ok ? "A household member is a veteran." : "Needs a veteran or active-duty member."
			};
		}
		case "min_age": {
			const ok = ctx.members.some((m) => m.age >= rule.age);
			return {
				ok,
				required: true,
				note: ok ? `A household member is ${rule.age}+.` : `Needs a household member age ${rule.age}+.`
			};
		}
		case "tribal": return {
			ok: false,
			required: true,
			note: "Must live on or near a participating reservation or FDPIR service area."
		};
		case "pregnant_or_young_child": {
			const ok = ctx.members.some((m) => m.pregnant) || ctx.children.some((c) => c.age < rule.age);
			return {
				ok,
				required: true,
				note: ok ? "Pregnancy or a young child is listed." : `Needs pregnancy or a child under ${rule.age}.`
			};
		}
		case "state": {
			const ok = rule.states.includes(ctx.state);
			return {
				ok,
				required: true,
				note: ok ? `Available in ${ctx.state}.` : `This listing is for ${rule.states.join(", ")}.`
			};
		}
		case "requires_verify": {
			const ok = verified[rule.badge];
			return {
				ok,
				required: false,
				note: ok ? `${labelBadge(rule.badge)} is verified.` : `${labelBadge(rule.badge)} still needs a document — award is estimated.`
			};
		}
		default: return {
			ok: true,
			required: false,
			note: ""
		};
	}
}
function labelBadge(key) {
	switch (key) {
		case "identity": return "Identity";
		case "income": return "Income";
		case "residency": return "Residency";
		case "household": return "Household";
	}
}
function matchProgram(program, household) {
	const ctx = awardContext(household);
	const reasons = [];
	const blockers = [];
	let requiredFails = 0;
	let requiredPasses = 0;
	let bonus = 0;
	for (const rule of program.rules) {
		const result = evalRule(rule, ctx, household.verified);
		if (result.required) {
			if (result.ok) {
				requiredPasses += 1;
				reasons.push(result.note);
			} else {
				requiredFails += 1;
				blockers.push(result.note);
			}
		} else if (result.ok) {
			bonus += 8;
			reasons.push(result.note);
		} else reasons.push(result.note);
	}
	if (program.listing === "directory") reasons.push("Open directory — this is a locator, not a payout.");
	if (program.listing === "advisory") blockers.push(program.notes || "This is a reality check, not a program you can apply for.");
	const eligible = program.listing === "advisory" ? false : requiredFails === 0;
	const ruleTotal = program.rules.filter((r) => r.type !== "requires_verify").length;
	let score = ruleTotal === 0 ? eligible ? 78 + bonus : 20 : Math.round(requiredPasses / Math.max(1, ruleTotal) * 72 + bonus);
	if (eligible && ruleTotal > 0) score += 18;
	if (program.urgent && eligible) score += 4;
	if (household.verified.identity) score += 2;
	if (program.listing === "directory" && eligible) score = Math.max(score, 70);
	if (program.listing === "advisory") score = 8;
	const rawAward = Math.max(0, program.award(ctx));
	let monthlyAward = eligible && program.listing === "benefit" ? rawAward : 0;
	if (eligible && program.listing === "benefit" && rawAward <= 0) reasons.push("In-kind or waitlist help — not a monthly cash award.");
	score = Math.max(8, Math.min(99, score));
	const missingDocs = program.documents.filter((doc) => isDocMissing(doc, household.verified));
	return {
		program,
		eligible,
		score,
		monthlyAward,
		reasons,
		blockers,
		missingDocs,
		deadline: program.deadlineDays != null ? daysFromNow(program.deadlineDays) : null
	};
}
function isDocMissing(doc, verified) {
	const d = doc.toLowerCase();
	if ((/\b(photo\s*)?id\b/.test(d) || d.includes("photo id")) && !verified.identity) return true;
	if ((d.includes("income") || d.includes("w-2") || d.includes("pay stub") || d.includes("1099")) && !verified.income) return true;
	if ((d.includes("address") || d.includes("lease") || d.includes("residency") || d.includes("utility") || d.includes("shutoff") || d.includes("past-due")) && !verified.residency) return true;
	if ((d.includes("birth") || d.includes("ssn") || d.includes("immunization") || d.includes("household") || d.includes("child")) && !verified.household) return true;
	return false;
}
function matchAll(household, programs = getPrograms()) {
	return programs.map((p) => matchProgram(p, household)).sort((a, b) => {
		const rank = (m) => m.program.listing === "advisory" ? 2 : m.program.listing === "directory" ? 1 : 0;
		if (rank(a) !== rank(b)) return rank(a) - rank(b);
		if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
		if (a.program.urgent !== b.program.urgent) return a.program.urgent ? -1 : 1;
		return b.score - a.score;
	});
}
function matchTier(m) {
	if (m.program.listing !== "benefit") return "explore";
	if (m.eligible) return "qualify";
	if (m.score >= 48) return "close";
	return "explore";
}
function tierMatches(matches, tier) {
	return matches.filter((m) => matchTier(m) === tier);
}
function sortByRelevance(matches) {
	const rank = (m) => matchTier(m) === "qualify" ? 0 : matchTier(m) === "close" ? 1 : 2;
	return [...matches].sort((a, b) => {
		if (rank(a) !== rank(b)) return rank(a) - rank(b);
		if (a.score !== b.score) return b.score - a.score;
		if (a.monthlyAward !== b.monthlyAward) return b.monthlyAward - a.monthlyAward;
		return a.missingDocs.length - b.missingDocs.length;
	});
}
function potentialMonthly(matches) {
	return matches.filter((m) => m.eligible && m.program.listing === "benefit").reduce((sum, m) => sum + m.monthlyAward, 0);
}
function activeSlotCount(applications) {
	const active = Object.values(applications).filter((a) => [
		"submitted",
		"in-review",
		"needs-docs",
		"bundled"
	].includes(a.status));
	const bundleIds = new Set(active.map((a) => a.bundleId).filter(Boolean));
	return active.filter((a) => !a.bundleId).length + bundleIds.size;
}
function sealCount(v) {
	return [
		"identity",
		"income",
		"residency",
		"household"
	].filter((k) => v[k]).length;
}
function roleLabel(role) {
	switch (role) {
		case "self": return "You";
		case "partner": return "Partner";
		case "child": return "Child";
		case "elder": return "Elder";
		case "dependent": return "Dependent";
	}
}
var RANKS = [
	{
		level: 1,
		name: "Newcomer",
		minXp: 0,
		slots: 3
	},
	{
		level: 2,
		name: "Resident",
		minXp: 100,
		slots: 4
	},
	{
		level: 3,
		name: "Steward",
		minXp: 240,
		slots: 5
	},
	{
		level: 4,
		name: "Advocate",
		minXp: 480,
		slots: 6
	},
	{
		level: 5,
		name: "Warden",
		minXp: 820,
		slots: 7
	}
];
function rankFor(xp) {
	let current = RANKS[0];
	for (const r of RANKS) if (xp >= r.minXp) current = r;
	return current;
}
function canAffordSlot(applications, household, extra = 1) {
	const used = activeSlotCount(applications);
	const cap = rankFor(household.xp).slots;
	return used + extra <= cap;
}
var useCrest = create()(persist((set, get) => ({
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
	hydrateAccount: (payload) => set({
		household: payload.household,
		applications: payload.applications,
		saved: payload.saved,
		eligStep: payload.eligStep,
		tab: payload.tab ?? "hall",
		sheet: null,
		focusId: null
	}),
	setTab: (tab) => set({
		tab,
		sheet: null,
		focusId: null
	}),
	setSheet: (sheet, focusId = null) => set({
		sheet,
		focusId
	}),
	setLedgerFilter: (ledgerFilter) => set({ ledgerFilter }),
	setCatalogUrl: (catalogUrl) => set({ catalogUrl }),
	setEligStep: (eligStep) => set({ eligStep }),
	toggleSaved: (id) => set((s) => ({ saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id] })),
	enterHall: () => set((s) => ({ household: {
		...s.household,
		entered: true,
		xp: Math.max(s.household.xp, 40)
	} })),
	updateHousehold: (patch) => set((s) => ({ household: {
		...s.household,
		...patch
	} })),
	setMembers: (members) => set((s) => ({ household: {
		...s.household,
		members
	} })),
	verify: (key) => set((s) => {
		if (s.household.verified[key]) return s;
		return { household: {
			...s.household,
			verified: {
				...s.household.verified,
				[key]: true
			},
			xp: s.household.xp + 40
		} };
	}),
	submitProgram: (programId, bundleId) => {
		const { household, applications } = get();
		const existing = applications[programId];
		if (existing && existing.status !== "idle") {
			if (existing.status === "awarded") return {
				ok: false,
				message: "This benefit is already approved."
			};
			return {
				ok: false,
				message: "This application is already in progress."
			};
		}
		const match = matchAll(household).find((m) => m.program.id === programId);
		const program = programById(programId);
		if (!program) return {
			ok: false,
			message: "That program is not in this directory."
		};
		if (program.listing === "advisory") return {
			ok: false,
			message: "This is a reality check, not something you can apply for."
		};
		if (program.listing === "directory") return {
			ok: false,
			message: "Open the official directory instead of filing here."
		};
		if (!match?.eligible) return {
			ok: false,
			message: "Your household does not clear this program yet."
		};
		if (!canAffordSlot(applications, household, 1)) return {
			ok: false,
			message: "No open application slots. Finish a review first."
		};
		const now = Date.now();
		set({
			applications: {
				...applications,
				[programId]: {
					programId,
					status: match.missingDocs.length ? "needs-docs" : "in-review",
					submittedAt: now,
					monthlyAward: match.monthlyAward,
					bundleId
				}
			},
			household: {
				...household,
				xp: household.xp + 25
			}
		});
		return {
			ok: true,
			message: match.missingDocs.length ? "Filed with missing documents. Verify them to move review." : "Application filed. The agency has the packet."
		};
	},
	submitBundle: (bundleId, programIds) => {
		const { household, applications } = get();
		const fresh = programIds.filter((id) => {
			const st = applications[id]?.status;
			return !st || st === "idle";
		});
		if (fresh.length === 0) return {
			ok: false,
			message: "Every program in this bundle is already filed."
		};
		const eligible = fresh.filter((id) => {
			const p = programById(id);
			if (!p) return false;
			const m = matchProgram(p, household);
			return m.eligible && m.monthlyAward > 0;
		});
		if (eligible.length === 0) return {
			ok: false,
			message: "No program in this bundle clears your household yet."
		};
		if (!canAffordSlot(applications, household, 1)) return {
			ok: false,
			message: "A combined filing still needs one open slot."
		};
		const next = { ...applications };
		const now = Date.now();
		for (const id of eligible) {
			const match = matchProgram(programById(id), household);
			next[id] = {
				programId: id,
				status: match.missingDocs.length ? "needs-docs" : "in-review",
				submittedAt: now,
				monthlyAward: match.monthlyAward,
				bundleId
			};
		}
		set({
			applications: next,
			household: {
				...household,
				xp: household.xp + 55
			}
		});
		return {
			ok: true,
			message: `Combined application filed — ${eligible.length} programs, one packet.`
		};
	},
	withdraw: (programId) => set((s) => {
		const next = { ...s.applications };
		delete next[programId];
		return { applications: next };
	}),
	resolveReview: (programId) => set((s) => {
		const app = s.applications[programId];
		if (!app) return s;
		const match = matchProgram(programById(programId), s.household);
		const awarded = match.eligible && match.missingDocs.length === 0;
		const status = awarded ? "awarded" : "needs-docs";
		return {
			applications: {
				...s.applications,
				[programId]: {
					...app,
					status,
					awardedAt: awarded ? Date.now() : app.awardedAt,
					monthlyAward: awarded ? match.monthlyAward : app.monthlyAward
				}
			},
			household: {
				...s.household,
				xp: s.household.xp + (awarded ? 70 : 0)
			}
		};
	}),
	resetDemo: () => set({
		household: {
			...DEFAULT_HOUSEHOLD,
			entered: true
		},
		applications: DEFAULT_APPLICATIONS,
		tab: "hall",
		sheet: null,
		focusId: null,
		ledgerFilter: "all",
		saved: ["food-bank", "weatherize"],
		eligStep: 2,
		catalogUrl: get().catalogUrl
	})
}), {
	name: "civic-v3",
	storage: createJSONStorage(() => typeof window === "undefined" ? {
		getItem: () => null,
		setItem: () => void 0,
		removeItem: () => void 0
	} : localStorage),
	partialize: (s) => ({
		household: s.household,
		applications: s.applications,
		saved: s.saved,
		eligStep: s.eligStep,
		catalogUrl: s.catalogUrl
	})
}));
function StatusBar() {
	const household = useCrest((s) => s.household);
	const setSheet = useCrest((s) => s.setSheet);
	const lead = household.members.find((m) => m.role === "self") ?? household.members[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "safe-top sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-14 items-center justify-between gap-2 px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CivicMark, { className: "size-8 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg tracking-tight",
					children: "CivicAid"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSheet("party"),
					className: "rounded-full",
					"aria-label": "Open household profile",
					children: lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyAvatar, {
						member: lead,
						size: "sm"
					}) : null
				})]
			})]
		})
	});
}
var TABS = [
	{
		id: "hall",
		label: "Discover",
		icon: Compass
	},
	{
		id: "ledger",
		label: "Browse",
		icon: LayoutGrid
	},
	{
		id: "screen",
		label: "Eligibility",
		icon: ClipboardCheck
	},
	{
		id: "quests",
		label: "Tracker",
		icon: CircleCheck
	}
];
function TabBar() {
	const tab = useCrest((s) => s.tab);
	const setTab = useCrest((s) => s.setTab);
	const setLedgerFilter = useCrest((s) => s.setLedgerFilter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "safe-bottom sticky bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-sm",
		"aria-label": "Primary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-4 px-3 py-2",
			children: TABS.map((item) => {
				const active = tab === item.id;
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							if (item.id === "ledger") setLedgerFilter("all");
							setTab(item.id);
						},
						className: cn("flex h-12 min-w-[4.75rem] flex-col items-center justify-center gap-0.5 rounded-full px-3 text-xs font-medium tracking-wide transition-[color,background-color] duration-150 ease-out", active ? "bg-primary text-primary-foreground" : "text-muted-foreground"),
						"aria-current": active ? "page" : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-4",
							strokeWidth: active ? 2.2 : 1.7
						}), item.label]
					})
				}, item.id);
			})
		})
	});
}
function Badge({ className, tone = "muted", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", tone === "muted" && "bg-secondary text-muted-foreground", tone === "accent" && "bg-mint text-ok", tone === "ok" && "bg-ok-soft text-ok", tone === "warn" && "bg-warn-soft text-warn", tone === "danger" && "bg-destructive/12 text-destructive", tone === "lilac" && "bg-lilac text-lilac-fg", tone === "peach" && "bg-peach text-warn", className),
		...props
	});
}
var GAP = 12;
var PAD = 20;
var LOCK = 8;
var FLICK = .42;
var SNAP_RATIO = .2;
var SNAP_MS = 320;
var SNAP_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
function emptyDrag() {
	return {
		pointerId: null,
		startX: 0,
		startY: 0,
		lastX: 0,
		lastT: 0,
		vx: 0,
		offset: 0,
		axis: "undecided",
		dragging: false
	};
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
function HeroCarousel({ matches }) {
	const setSheet = useCrest((s) => s.setSheet);
	const viewportRef = (0, import_react.useRef)(null);
	const trackRef = (0, import_react.useRef)(null);
	const indexRef = (0, import_react.useRef)(0);
	const dragRef = (0, import_react.useRef)(emptyDrag());
	const [index, setIndex] = (0, import_react.useState)(0);
	const [slideW, setSlideW] = (0, import_react.useState)(0);
	const last = Math.max(0, matches.length - 1);
	const restX = (0, import_react.useCallback)((i) => -clamp(i, 0, last) * ((slideW || 0) + GAP), [last, slideW]);
	const paint = (0, import_react.useCallback)((x, animate) => {
		const track = trackRef.current;
		if (!track) return;
		const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		track.style.transition = animate && !reduce ? `transform ${SNAP_MS}ms ${SNAP_EASE}` : "none";
		track.style.transform = `translate3d(${x}px,0,0)`;
	}, []);
	const goTo = (0, import_react.useCallback)((next) => {
		const i = clamp(next, 0, last);
		indexRef.current = i;
		setIndex(i);
		paint(restX(i), true);
	}, [
		last,
		paint,
		restX
	]);
	(0, import_react.useLayoutEffect)(() => {
		const vp = viewportRef.current;
		if (!vp) return;
		const measure = () => {
			const width = vp.clientWidth * .78;
			setSlideW(width);
		};
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(vp);
		return () => ro.disconnect();
	}, [matches.length]);
	(0, import_react.useLayoutEffect)(() => {
		paint(restX(indexRef.current), false);
	}, [
		slideW,
		paint,
		restX
	]);
	(0, import_react.useEffect)(() => {
		const vp = viewportRef.current;
		if (!vp) return;
		const blockScroll = (e) => {
			if (dragRef.current.axis === "x") e.preventDefault();
		};
		vp.addEventListener("touchmove", blockScroll, { passive: false });
		return () => vp.removeEventListener("touchmove", blockScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		window.__heroCarousel = {
			getIndex: () => indexRef.current,
			goTo,
			swipe: (dir) => goTo(indexRef.current + dir)
		};
		return () => {
			delete window.__heroCarousel;
		};
	}, [goTo]);
	const onPointerDown = (e) => {
		if (e.button !== 0) return;
		dragRef.current = {
			...emptyDrag(),
			pointerId: e.pointerId,
			startX: e.clientX,
			startY: e.clientY,
			lastX: e.clientX,
			lastT: performance.now()
		};
		paint(restX(indexRef.current), false);
	};
	const onPointerMove = (e) => {
		const drag = dragRef.current;
		if (drag.pointerId !== e.pointerId) return;
		const dx = e.clientX - drag.startX;
		const dy = e.clientY - drag.startY;
		if (drag.axis === "undecided") {
			if (Math.hypot(dx, dy) < LOCK) return;
			drag.axis = Math.abs(dx) > Math.abs(dy) * 1.15 ? "x" : "y";
			if (drag.axis === "x") {
				drag.dragging = true;
				viewportRef.current?.setPointerCapture(e.pointerId);
			}
		}
		if (drag.axis !== "x") return;
		const now = performance.now();
		const dt = now - drag.lastT;
		if (dt > 0) drag.vx = (e.clientX - drag.lastX) / dt;
		drag.lastX = e.clientX;
		drag.lastT = now;
		let offset = dx;
		const i = indexRef.current;
		if (i === 0 && offset > 0) offset *= .32;
		if (i === last && offset < 0) offset *= .32;
		drag.offset = offset;
		paint(restX(i) + offset, false);
	};
	const endPointer = (e) => {
		const drag = dragRef.current;
		if (drag.pointerId !== e.pointerId) return;
		if (viewportRef.current?.hasPointerCapture(e.pointerId)) viewportRef.current.releasePointerCapture(e.pointerId);
		if (drag.axis === "x") {
			const width = slideW || viewportRef.current?.clientWidth || 1;
			let next = indexRef.current;
			if (drag.offset < -width * SNAP_RATIO || drag.vx < -.42) next += 1;
			else if (drag.offset > width * SNAP_RATIO || drag.vx > FLICK) next -= 1;
			goTo(next);
		}
		window.setTimeout(() => {
			dragRef.current.dragging = false;
		}, 40);
		dragRef.current.pointerId = null;
		dragRef.current.axis = "undecided";
		dragRef.current.offset = 0;
		dragRef.current.vx = 0;
	};
	if (matches.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-roledescription": "carousel",
		"aria-label": "Top benefits you qualify for",
		className: "-mx-5 select-none",
		onKeyDown: (e) => {
			if (e.key === "ArrowRight") {
				e.preventDefault();
				goTo(index + 1);
			}
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				goTo(index - 1);
			}
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: viewportRef,
			"data-hero-scroller": true,
			tabIndex: 0,
			onPointerDown,
			onPointerMove,
			onPointerUp: endPointer,
			onPointerCancel: endPointer,
			className: "overflow-hidden touch-pan-y",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: trackRef,
				"data-hero-track": true,
				className: "flex will-change-transform",
				style: {
					gap: GAP,
					paddingInline: PAD
				},
				children: matches.map((m, i) => {
					const award = formatAward(m.monthlyAward, m.program.valueKind);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						"data-slide": true,
						"aria-label": `${m.program.shortName}, slide ${i + 1} of ${matches.length}`,
						className: "relative shrink-0 overflow-hidden rounded-3xl",
						style: { width: slideW || "78%" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								if (dragRef.current.dragging) return;
								setSheet("program", m.program.id);
							},
							className: "relative block h-60 w-full overflow-hidden text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: m.program.image ?? "/images/liheap-hero.jpg",
									alt: "",
									draggable: false,
									className: "pointer-events-none h-full w-full object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/25 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute left-3 top-3 rounded-full bg-ok/90 px-2.5 py-1 text-xs font-medium text-primary-foreground",
									children: [
										"You qualify · ",
										m.score,
										"%"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-x-0 bottom-0 p-5 text-primary-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs uppercase tracking-wide text-primary-foreground/70",
											children: m.program.agency
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-display text-2xl italic leading-tight",
											children: m.program.shortName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex items-end justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-xl tabular-nums",
												children: m.monthlyAward > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [award.value, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-1 text-sm text-primary-foreground/75",
													children: award.suffix
												})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-base",
													children: "In-kind help"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex h-10 items-center rounded-full bg-card px-4 text-sm font-medium text-foreground",
												children: ["Review ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 size-4" })]
											})]
										})
									]
								})
							]
						})
					}, m.program.id);
				})
			})
		}), matches.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-center justify-center gap-3 px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "sr-only",
				"aria-live": "polite",
				children: [
					matches[index]?.program.shortName,
					", ",
					index + 1,
					" of ",
					matches.length
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-11 items-center justify-center gap-2",
				children: matches.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Show ${m.program.shortName}`,
					"aria-current": i === index,
					onClick: () => goTo(i),
					className: "flex h-11 items-center justify-center px-0.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block h-2 rounded-full transition-[width,background-color] duration-200", i === index ? "w-6 bg-foreground" : "w-2 bg-foreground/40") })
				}, m.program.id))
			})]
		}) : null]
	});
}
function HallView({ matches }) {
	const household = useCrest((s) => s.household);
	const applications = useCrest((s) => s.applications);
	const setSheet = useCrest((s) => s.setSheet);
	const setTab = useCrest((s) => s.setTab);
	const setLedgerFilter = useCrest((s) => s.setLedgerFilter);
	const lead = household.members.find((m) => m.role === "self") ?? household.members[0];
	const ranked = sortByRelevance(matches);
	const qualify = ranked.filter((m) => m.eligible && m.program.listing === "benefit");
	const close = tierMatches(ranked, "close");
	const potential = potentialMonthly(matches);
	const slides = qualify.slice(0, 6);
	const curated = qualify.slice(6, 8);
	const near = qualify.length < 3 ? close.slice(0, 2) : [];
	const activeCount = Object.values(applications).filter((a) => a.status !== "idle").length;
	const doors = START_DOORS.filter((d) => (!d.state || d.state === household.state) && d.id !== "benefits-gov");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in flex flex-col gap-7 px-5 pb-10 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					tone: "ok",
					children: [qualify.length, " for you"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-3 font-display text-3xl italic leading-tight tracking-tight",
					children: [
						greeting(),
						", ",
						firstName(lead.name)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted-foreground",
					children: [
						qualify.length === 0 ? "Nothing is advertised yet. Finish Eligibility, or keep browsing categories." : `${qualify.length} programs you qualify for, about `,
						qualify.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium text-foreground",
							children: [formatUsd(potential), "/mo"]
						}) : null,
						qualify.length > 0 ? " in estimated support." : null
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroCarousel, { matches: slides }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-card px-4 py-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-muted-foreground",
							children: "Active"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-3xl tabular-nums",
							children: activeCount
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "applications"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-card px-4 py-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-muted-foreground",
							children: "Support"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-3xl tabular-nums",
							children: formatUsd(potential)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "estimated / month"
						})
					]
				})]
			}),
			curated.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "For you"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "More matches from your answers"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setLedgerFilter("matched");
							setTab("ledger");
						},
						className: "h-11 text-sm font-medium text-ok",
						children: "All matches"
					})]
				}), curated.map((m, i) => {
					const award = formatAward(m.monthlyAward, m.program.valueKind);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSheet("program", m.program.id),
						className: cn("rounded-2xl p-4 text-left", i === 0 ? "bg-lilac text-lilac-fg" : "bg-peach"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-medium",
										children: [
											"You qualify · ",
											m.score,
											"%"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-lg leading-snug text-foreground",
										children: m.program.shortName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
										children: m.program.summary
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-card px-3 py-2 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg tabular-nums text-foreground",
									children: m.monthlyAward > 0 ? award.value : "—"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: m.monthlyAward > 0 ? award.suffix : "In-kind"
								})]
							})]
						})
					}, m.program.id);
				})]
			}) : null,
			near.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Might qualify"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Close, but something is still missing"
					}),
					near.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSheet("program", m.program.id),
						className: "rounded-2xl bg-card p-4 text-left shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-medium text-warn",
								children: [
									"Not advertised · ",
									m.score,
									"%"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-lg",
								children: m.program.shortName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: m.blockers[0] ?? "One screening answer still blocks this."
							})
						]
					}, m.program.id))
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Apply on official sites"
				}), doors.map((door) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: door.href,
					target: "_blank",
					rel: "noreferrer",
					className: "flex items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-11 items-center justify-center rounded-xl bg-mint text-ok",
						children: door.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: door.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: door.detail
						})]
					})]
				}, door.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4 text-warn" }), " Never pay to apply"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Real programs do not charge a fee, and no .gov office will ask for a gift card."
				})]
			})
		]
	});
}
var CATEGORY_CARDS = FILTERS.filter((f) => f.id !== "all");
function valueLine(match) {
	if (match.program.listing === "advisory") return "Reality check";
	if (match.program.listing === "directory") return "Free locator";
	const award = formatAward(match.monthlyAward, match.program.valueKind);
	if (match.eligible && match.monthlyAward > 0) return `${award.value}${award.suffix}`;
	if (match.eligible) return "In-kind / waitlist";
	return match.blockers[0] ?? "Not a match";
}
function ProgramRow({ match, quiet }) {
	const setSheet = useCrest((s) => s.setSheet);
	const saved = useCrest((s) => s.saved);
	const toggleSaved = useCrest((s) => s.toggleSaved);
	const bookmarked = saved.includes(match.program.id);
	const cat = CATEGORY_META[match.program.category];
	const tier = matchTier(match);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]", quiet && "opacity-70"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: tier === "qualify" ? "ok" : quiet ? "muted" : cat.tone,
				children: tier === "qualify" ? "You qualify" : tier === "close" ? "Might qualify" : cat.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => toggleSaved(match.program.id),
				className: "flex size-11 shrink-0 items-center justify-center text-muted-foreground",
				"aria-label": bookmarked ? "Unsave" : "Save",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: cn("size-4", bookmarked && "fill-foreground text-foreground") })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setSheet("program", match.program.id),
			className: "w-full text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl leading-snug",
					children: match.program.shortName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
					children: quiet ? match.blockers[0] ?? match.program.summary : match.program.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("font-display text-base tabular-nums", quiet && "text-muted-foreground"),
						children: quiet ? "Not advertised" : valueLine(match)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium text-ok",
						children: "Details"
					})]
				})
			]
		})]
	});
}
function LedgerView({ matches }) {
	const setLedgerFilter = useCrest((s) => s.setLedgerFilter);
	const ledgerFilter = useCrest((s) => s.ledgerFilter);
	const programs = useLivePrograms();
	const [query, setQuery] = (0, import_react.useState)("");
	const browsing = ledgerFilter !== "all";
	const matchedOnly = ledgerFilter === "matched";
	const list = (0, import_react.useMemo)(() => {
		return sortByRelevance(matches).filter((m) => {
			if (matchedOnly) return matchTier(m) === "qualify";
			if (ledgerFilter !== "all" && m.program.category !== ledgerFilter) return false;
			if (query.trim()) {
				const q = query.trim().toLowerCase();
				if (!`${m.program.name} ${m.program.shortName} ${m.program.agency} ${m.program.summary}`.toLowerCase().includes(q)) return false;
			}
			return true;
		});
	}, [
		matches,
		ledgerFilter,
		query,
		matchedOnly
	]);
	const qualify = list.filter((m) => matchTier(m) === "qualify");
	const close = list.filter((m) => matchTier(m) === "close");
	const explore = list.filter((m) => matchTier(m) === "explore");
	const activeLabel = matchedOnly ? "Your matches" : CATEGORY_CARDS.find((c) => c.id === ledgerFilter)?.label ?? "Browse";
	if (!browsing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 px-5 pb-10 pt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl italic tracking-tight",
			children: "Browse"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Start with a kind of help. Matches sit up top once you pick one."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3",
			children: CATEGORY_CARDS.map((cat) => {
				const forYou = matches.filter((m) => m.program.category === cat.id && matchTier(m) === "qualify").length;
				const count = programs.filter((p) => p.category === cat.id).length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setQuery("");
						setLedgerFilter(cat.id);
					},
					className: "relative min-h-40 overflow-hidden rounded-2xl text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: CATEGORY_IMAGES[cat.id],
							alt: "",
							className: "absolute inset-0 size-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-foreground/35 via-foreground/40 to-foreground/50" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex min-h-40 flex-col items-center justify-center px-3 text-center text-primary-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl tracking-tight text-balance drop-shadow-sm",
								children: cat.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 text-xs text-primary-foreground/80",
								children: forYou > 0 ? `${forYou} for you` : `${count} program${count === 1 ? "" : "s"}`
							})]
						})
					]
				}, cat.id);
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 px-5 pb-10 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setQuery("");
						setLedgerFilter("all");
					},
					className: "flex size-11 items-center justify-center rounded-full",
					"aria-label": "All categories",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl tracking-tight",
					children: activeLabel
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "sr-only",
				htmlFor: "ledger-search",
				children: [
					"Search ",
					activeLabel,
					" programs"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "ledger-search",
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: `Search ${activeLabel.toLowerCase()}…`,
					className: "flex h-12 w-full rounded-2xl bg-card pl-10 pr-4 text-sm text-foreground shadow-[var(--shadow-border)] placeholder:text-subtle"
				})]
			}),
			qualify.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs uppercase tracking-wide text-muted-foreground",
					children: [qualify.length, " you qualify for"]
				}), qualify.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramRow, { match: m }, m.program.id))]
			}) : null,
			close.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wide text-muted-foreground",
					children: "Might qualify"
				}), close.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramRow, { match: m }, m.program.id))]
			}) : null,
			explore.length > 0 && !matchedOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wide text-muted-foreground",
					children: "Other programs · not advertised"
				}), explore.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramRow, {
					match: m,
					quiet: true
				}, m.program.id))]
			}) : null,
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-16 text-center text-sm text-muted-foreground",
				children: "Nothing matches that search."
			}) : null
		]
	});
}
var INCOME_BANDS = [
	{
		max: 2499,
		label: "Under $2,500",
		sub: "Under $30,000 / year"
	},
	{
		max: 4e3,
		label: "$2,500 – $4,000",
		sub: "$30,000 – $48,000 / year"
	},
	{
		max: 5500,
		label: "$4,000 – $5,500",
		sub: "$48,000 – $66,000 / year"
	},
	{
		max: 9e3,
		label: "$5,500+",
		sub: "Above $66,000 / year"
	}
];
var NEEDS$1 = [
	{
		key: "under5",
		label: "Child under 5",
		icon: Baby,
		apply: (m) => m.role === "child" && m.age < 5
	},
	{
		key: "pregnant",
		label: "Pregnant",
		icon: Heart,
		apply: (m) => m.pregnant
	},
	{
		key: "senior",
		label: "65 or older",
		icon: PersonStanding,
		apply: (m) => m.age >= 65
	},
	{
		key: "disabled",
		label: "Disability",
		icon: Accessibility,
		apply: (m) => m.disabled
	},
	{
		key: "veteran",
		label: "Veteran",
		icon: Shield,
		apply: (m) => m.veteran
	},
	{
		key: "student",
		label: "Student",
		icon: GraduationCap,
		apply: (m) => m.student
	}
];
function ScreenView({ matches }) {
	const household = useCrest((s) => s.household);
	const updateHousehold = useCrest((s) => s.updateHousehold);
	const setMembers = useCrest((s) => s.setMembers);
	const eligStep = useCrest((s) => s.eligStep);
	const setEligStep = useCrest((s) => s.setEligStep);
	const setTab = useCrest((s) => s.setTab);
	const setLedgerFilter = useCrest((s) => s.setLedgerFilter);
	const setSheet = useCrest((s) => s.setSheet);
	const potential = potentialMonthly(matches);
	const eligible = matches.filter((m) => m.eligible && m.monthlyAward > 0).length;
	const selectedBand = INCOME_BANDS.findIndex((b) => household.monthlyIncome <= b.max);
	const bandIndex = selectedBand === -1 ? INCOME_BANDS.length - 1 : selectedBand;
	const needOn = (key) => {
		const def = NEEDS$1.find((n) => n.key === key);
		return household.members.some(def.apply);
	};
	const toggleNeed = (key) => {
		if (key === "under5") {
			if (needOn("under5")) setMembers(household.members.filter((m) => !(m.role === "child" && m.age < 5)));
			else setMembers([...household.members, emptyMember(`c${Date.now()}`, "Child", 3, "child")]);
			return;
		}
		const self = household.members.find((m) => m.role === "self") ?? household.members[0];
		if (!self) return;
		if (key === "pregnant") setMembers(household.members.map((m) => m.id === self.id ? {
			...m,
			pregnant: !m.pregnant
		} : m));
		if (key === "senior") setMembers(household.members.map((m) => m.id === self.id ? {
			...m,
			age: m.age >= 65 ? 34 : 68
		} : m));
		if (key === "disabled") {
			const partner = household.members.find((m) => m.role === "partner") ?? self;
			setMembers(household.members.map((m) => m.id === partner.id ? {
				...m,
				disabled: !m.disabled
			} : m));
		}
		if (key === "veteran") setMembers(household.members.map((m) => m.id === self.id ? {
			...m,
			veteran: !m.veteran
		} : m));
		if (key === "student") setMembers(household.members.map((m) => m.id === self.id ? {
			...m,
			student: !m.student
		} : m));
	};
	const setSize = (next) => {
		const size = Math.max(1, Math.min(8, next));
		let members = [...household.members];
		while (members.length < size) {
			const i = members.length;
			members.push(emptyMember(`n${Date.now()}${i}`, i === 1 ? "Partner" : `Child ${i - 1}`, i === 1 ? 34 : 6, i === 1 ? "partner" : "child"));
		}
		while (members.length > size) {
			if (members[members.length - 1]?.role === "self") break;
			members = members.slice(0, -1);
		}
		setMembers(members);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 px-5 pb-10 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl italic tracking-tight",
				children: "Eligibility"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted-foreground",
				children: "A short household picture. Changes stay on your account."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1.5 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-ok" }), " Zip code"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "ok",
							children: [
								household.city,
								", ",
								household.state
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-4xl tabular-nums tracking-tight",
						children: household.zip
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "San Bernardino County — local energy and county aid may apply"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Household size"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "People who share expenses"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSize(household.members.length - 1),
									className: "flex size-11 items-center justify-center rounded-full bg-secondary",
									"aria-label": "Decrease household size",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-6 text-center font-display text-2xl tabular-nums",
									children: household.members.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSize(household.members.length + 1),
									className: "flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground",
									"aria-label": "Increase household size",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-col gap-1 text-sm text-muted-foreground",
						children: household.members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							m.name,
							" · ",
							roleLabel(m.role),
							" · ",
							m.age
						] }, m.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSheet("party"),
						className: "mt-2 h-11 text-sm font-medium text-ok",
						children: "Edit roles"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Monthly income"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Pre-tax household total"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-col gap-2",
						children: INCOME_BANDS.map((b, i) => {
							const on = i === bandIndex;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => updateHousehold({ monthlyIncome: i === 0 ? 2200 : i === 1 ? 3200 : i === 2 ? 4800 : 6200 }),
								className: cn("flex items-center justify-between rounded-xl px-3 py-3 text-left", on ? "bg-elevated shadow-[var(--shadow-border)]" : "bg-card shadow-[var(--shadow-border)]"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("flex size-5 items-center justify-center rounded-full border", on ? "border-primary bg-primary" : "border-input bg-card"),
										children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-primary-foreground" }) : null
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: b.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: b.sub
									})] })]
								})
							}, b.label);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Needs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Select anything that applies"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: NEEDS$1.map((n) => {
							const on = needOn(n.key);
							const Icon = n.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleNeed(n.key),
								className: cn("inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium", on ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
									n.label,
									on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : null
								]
							}, n.key);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-secondary px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-lg",
					children: [eligible, " matched programs"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"About ",
						formatUsdMo(potential),
						" in support"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				onClick: () => {
					setEligStep(Math.min(4, eligStep + 1));
					setLedgerFilter("matched");
					setTab("hall");
				},
				children: "See what you qualify for"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setSheet("catalog"),
				className: "h-11 text-sm text-muted-foreground",
				children: "Benefits spreadsheet"
			})
		]
	});
}
function Progress({ value, className, barClassName }) {
	const pct = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full bg-foreground/10", className),
		role: "progressbar",
		"aria-valuenow": Math.round(pct),
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full origin-left rounded-full bg-primary transition-[transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", barClassName),
			style: { transform: `scaleX(${pct / 100})` }
		})
	});
}
var VAULT = [
	{
		id: "tax",
		name: "2023 tax return",
		meta: "PDF · Verified",
		ok: true
	},
	{
		id: "pay",
		name: "October paystub",
		meta: "Scan · Verified",
		ok: true
	},
	{
		id: "util",
		name: "Utility bill",
		meta: "Needed for energy aid",
		ok: false
	}
];
function statusLabel(status) {
	if (status === "awarded") return "Approved";
	if (status === "needs-docs") return "Needs a file";
	return "In review";
}
function QuestsView({ matches }) {
	const applications = useCrest((s) => s.applications);
	const setSheet = useCrest((s) => s.setSheet);
	const resolveReview = useCrest((s) => s.resolveReview);
	const verify = useCrest((s) => s.verify);
	const saved = useCrest((s) => s.saved);
	const [filter, setFilter] = (0, import_react.useState)("active");
	const rows = Object.values(applications).filter((a) => a.status !== "idle");
	const action = rows.find((a) => a.status === "needs-docs");
	const actionProgram = action ? programById(action.programId) : void 0;
	const savedMatches = matches.filter((m) => saved.includes(m.program.id));
	(0, import_react.useEffect)(() => {
		const due = rows.filter((a) => a.status === "in-review" && a.submittedAt && Date.now() - a.submittedAt > 2600);
		if (due.length === 0) return;
		const t = window.setTimeout(() => {
			for (const a of due) resolveReview(a.programId);
		}, 400);
		return () => window.clearTimeout(t);
	}, [rows, resolveReview]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 px-5 pb-10 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl italic tracking-tight",
				children: "Tracker"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [
					rows.length,
					" applications · ",
					saved.length,
					" saved"
				]
			})] }),
			action && actionProgram ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-lilac p-4 text-lilac-fg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground",
							children: "1 action needed"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "lilac",
							children: "Urgent"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-foreground",
						children: [actionProgram.shortName, " is waiting on proof of income."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						className: "mt-3",
						onClick: () => {
							verify("income");
							verify("residency");
							window.setTimeout(() => resolveReview(action.programId), 300);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), " Upload document"]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setFilter("active"),
					className: cn("h-10 rounded-full px-4 text-xs font-medium", filter === "active" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground shadow-[var(--shadow-border)]"),
					children: [
						"Applications (",
						rows.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setFilter("saved"),
					className: cn("h-10 rounded-full px-4 text-xs font-medium", filter === "saved" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground shadow-[var(--shadow-border)]"),
					children: [
						"Saved (",
						saved.length,
						")"
					]
				})]
			}),
			filter === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [rows.map((a) => {
					const program = programById(a.programId);
					const match = matches.find((m) => m.program.id === a.programId);
					if (!program) return null;
					const award = formatAward(a.monthlyAward || match?.monthlyAward || 0, program.valueKind);
					const step = a.status === "awarded" ? 3 : a.status === "needs-docs" ? 2 : 2;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSheet("program", a.programId),
						className: "rounded-2xl bg-card p-4 text-left shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg leading-snug",
									children: program.shortName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: program.agency
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: a.status === "awarded" ? "ok" : a.status === "needs-docs" ? "peach" : "lilac",
								children: statusLabel(a.status)
							})]
						}), a.status === "awarded" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 font-display text-2xl tabular-nums",
							children: [award.value, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-sm text-muted-foreground",
								children: award.suffix
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: step / 3 * 100,
								barClassName: a.status === "needs-docs" ? "bg-ok" : "bg-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: a.status === "needs-docs" ? "Waiting on a document" : "Agency is reviewing"
							})]
						})]
					}, a.programId);
				}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-12 text-center text-sm text-muted-foreground",
					children: "No applications yet."
				}) : null]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [savedMatches.map((m) => {
					const award = formatAward(m.monthlyAward, m.program.valueKind);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSheet("program", m.program.id),
						className: "rounded-2xl bg-card p-4 text-left shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg",
								children: m.program.shortName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: m.program.agency
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-display tabular-nums",
								children: [award.value, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-sm text-muted-foreground",
									children: award.suffix
								})]
							})
						]
					}, m.program.id);
				}), savedMatches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-12 text-center text-sm text-muted-foreground",
					children: "Nothing saved yet."
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Documents"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 text-sm text-ok",
						onClick: () => setSheet("seals"),
						children: "Manage"
					})]
				}), VAULT.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: d.ok ? "flex items-center gap-3 rounded-xl bg-card px-3 py-3 shadow-[var(--shadow-border)]" : "flex items-center gap-3 rounded-xl bg-warn-soft px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "size-4 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: d.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: d.meta
							})]
						}),
						d.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "ok",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), " Ready"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => {
								verify("residency");
								toast.success("Utility bill uploaded.");
							},
							children: "Upload"
						})
					]
				}, d.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-secondary p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wide text-ok",
						children: "Free local help"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-xl",
						children: "Need a person on the line?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "211 can walk you through missing documents, pantries, and county offices."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-4 w-full",
						size: "lg",
						onClick: () => {
							window.location.href = "tel:211";
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), " Dial 211"]
					})
				]
			})
		]
	});
}
function formatRemaining(ms) {
	if (ms <= 0) return "Closed";
	const totalMin = Math.floor(ms / 6e4);
	const days = Math.floor(totalMin / 1440);
	const hours = Math.floor((totalMin - days * 60 * 24) / 60);
	const mins = totalMin % 60;
	if (days >= 2) return `${days}d ${hours}h`;
	if (days >= 1) return `${days}d ${hours}h`;
	if (hours >= 1) return `${hours}h ${mins}m`;
	return `${mins}m`;
}
function Countdown({ to, className }) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(Date.now()), 3e4);
		return () => window.clearInterval(id);
	}, []);
	const remaining = to.getTime() - now;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("tabular-nums", remaining > 0 && remaining < 6048e5 ? "text-warn" : "text-muted-foreground", remaining <= 0 && "text-destructive", className),
		children: formatRemaining(remaining)
	});
}
function firstPhone(raw) {
	if (!raw) return null;
	const m = raw.match(/(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|211)/);
	if (!m) return null;
	const digits = m[0].replace(/[^\d]/g, "");
	if (m[0].includes("211") && digits === "211") return "211";
	return digits;
}
function ProgramSheet() {
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
	const program = focusId ? programById(focusId) : void 0;
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
		} else toast.error(res.message);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange: (next) => {
			if (!next) setSheet(null);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-40 bg-foreground/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			className: "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] max-w-md flex-col overflow-hidden rounded-t-3xl bg-card shadow-[var(--shadow-lift)] outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cover,
						alt: "",
						className: "h-52 w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-x-0 top-3 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-10 rounded-full bg-card/90" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-y-auto px-6 pb-10 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wide text-muted-foreground",
						children: program.agency
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
						className: "mt-1 font-display text-2xl tracking-tight",
						children: program.shortName
					}),
					program.name !== program.shortName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: program.name
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center gap-2",
						children: [
							program.listing === "benefit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: tier === "qualify" ? "ok" : tier === "close" ? "warn" : "muted",
								children: tier === "qualify" ? "You qualify" : tier === "close" ? "Might qualify" : "Not advertised"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl tabular-nums",
								children: program.listing === "directory" ? "Directory" : program.listing === "advisory" ? "Reality check" : match.eligible && match.monthlyAward > 0 ? `${award.value}${award.suffix}` : match.eligible ? "In-kind" : "Not a match"
							}),
							program.urgent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "warn",
								children: "Urgent"
							}) : null,
							program.listing === "advisory" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "danger",
								children: "Not an application"
							}) : null,
							app && app.status !== "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: app.status === "awarded" ? "ok" : "accent",
								children: app.status.replace("-", " ")
							}) : null
						]
					}),
					match.deadline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							"Closes in ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, { to: match.deadline }),
							" · ",
							program.renewal
						]
					}),
					program.receive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm",
						children: program.receive
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm",
						children: program.plain
					}),
					program.incomeGuideline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 rounded-xl bg-elevated px-3 py-2 text-xs text-muted-foreground",
						children: program.incomeGuideline
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 font-display text-sm",
						children: tier === "qualify" ? "Why you qualify" : tier === "close" ? "What’s still missing" : "Why this isn’t up front"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground",
						children: [match.blockers.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-destructive",
							children: ["· ", r]
						}, r)), match.reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", r] }, r))]
					}),
					program.howToApply ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 font-display text-sm",
						children: "How to apply"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: program.howToApply
					})] }) : null,
					program.timeline || program.cost || program.asOf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs leading-relaxed text-subtle",
						children: [
							program.timeline,
							program.cost,
							program.asOf ? `As of ${program.asOf}` : null
						].filter(Boolean).join(" · ")
					}) : null,
					program.documents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 font-display text-sm",
						children: "Documents"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-col gap-1.5 text-sm",
						children: program.documents.map((d) => {
							const missing = match.missingDocs.includes(d);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: missing ? "text-warn" : "text-muted-foreground",
								children: [missing ? "Needed · " : "Ready · ", d]
							}, d);
						})
					})] }),
					program.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 rounded-2xl bg-warn-soft px-4 py-3 text-sm leading-relaxed text-foreground",
						children: program.notes
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col gap-2",
						children: [
							href ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => window.open(href, "_blank", "noopener,noreferrer"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), program.listing === "directory" ? "Open official directory" : "Open official site"]
							}) : null,
							tel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => {
									window.location.href = `tel:${tel}`;
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), tel === "211" ? "Dial 211" : `Call ${tel}`]
							}) : program.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: program.phone
							}) : null,
							program.listing === "benefit" && (!app || app.status === "idle") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: href ? "outline" : "default",
								onClick: onFile,
								disabled: !match.eligible,
								children: match.eligible ? "Track this application" : "Household does not clear yet"
							}),
							app && app.status === "needs-docs" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => setSheet("seals"),
								children: "Upload missing documents"
							}),
							app && app.status !== "idle" && app.status !== "awarded" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => {
									withdraw(program.id);
									toast("Application withdrawn.");
									setSheet(null);
								},
								children: "Withdraw"
							}),
							app?.status === "awarded" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-ok",
								children: "This benefit is already approved and active."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => toggleSaved(program.id),
								children: bookmarked ? "Saved" : "Save for later"
							})
						]
					})
				]
			})]
		})] })
	});
}
function BundleSheet() {
	const sheet = useCrest((s) => s.sheet);
	const focusId = useCrest((s) => s.focusId);
	const setSheet = useCrest((s) => s.setSheet);
	const household = useCrest((s) => s.household);
	const submitBundle = useCrest((s) => s.submitBundle);
	const setTab = useCrest((s) => s.setTab);
	const applications = useCrest((s) => s.applications);
	const bundle = focusId ? bundleById(focusId) : void 0;
	const open = sheet === "bundle" && Boolean(bundle);
	if (!bundle) return null;
	const rows = bundle.programIds.map((id) => programById(id)).filter((p) => Boolean(p)).map((p) => ({
		program: p,
		match: matchProgram(p, household)
	}));
	const yieldSum = rows.filter((r) => r.match.eligible).reduce((s, r) => s + r.match.monthlyAward, 0);
	const docs = Array.from(new Set(rows.flatMap((r) => r.program.documents)));
	const onFile = () => {
		const res = submitBundle(bundle.id, bundle.programIds);
		if (res.ok) {
			toast.success(res.message);
			setSheet(null);
			setTab("quests");
		} else toast.error(res.message);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange: (next) => {
			if (!next) setSheet(null);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-40 bg-foreground/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			className: "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] max-w-md flex-col rounded-t-3xl bg-card shadow-[var(--shadow-lift)] outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-10 rounded-full bg-foreground/15" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-y-auto px-5 pb-8 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs uppercase tracking-wide text-muted-foreground",
						children: [bundle.tag, " · one packet"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
						className: "font-display text-xl tracking-tight",
						children: bundle.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: bundle.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-2xl tabular-nums",
						children: formatUsdMo(yieldSum)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 font-display text-sm",
						children: "Programs in this bundle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-col gap-2",
						children: rows.map(({ program, match }) => {
							const st = applications[program.id]?.status;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-2 rounded-md bg-elevated px-3 py-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [program.name, st ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-xs text-muted-foreground",
									children: st
								}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-muted-foreground",
									children: match.eligible ? formatUsdMo(match.monthlyAward) : "blocked"
								})]
							}, program.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 font-display text-sm",
						children: "Shared packet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 text-sm text-muted-foreground",
						children: docs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", d] }, d))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6 w-full",
						onClick: onFile,
						children: "File combined application"
					})
				]
			})]
		})] })
	});
}
function PartySheet() {
	const sheet = useCrest((s) => s.sheet);
	const setSheet = useCrest((s) => s.setSheet);
	const household = useCrest((s) => s.household);
	const setTab = useCrest((s) => s.setTab);
	const resetDemo = useCrest((s) => s.resetDemo);
	const open = sheet === "party";
	const ctx = awardContext(household);
	const docs = sealCount(household.verified);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange: (next) => {
			if (!next) setSheet(null);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-40 bg-foreground/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			className: "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] max-w-md flex-col rounded-t-3xl bg-card shadow-[var(--shadow-lift)] outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-10 rounded-full bg-foreground/15" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-y-auto px-5 pb-8 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs uppercase tracking-wide text-muted-foreground",
						children: [
							household.city,
							", ",
							household.state,
							" · ",
							household.zip
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Title, {
						className: "font-display text-xl tracking-tight",
						children: [household.surname, " household"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							household.members.length,
							" people · ",
							formatUsd(household.monthlyIncome),
							"/mo ·",
							" ",
							Math.round(ctx.fplPct),
							"% FPL"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs uppercase tracking-wide text-muted-foreground",
						children: [
							"Documents verified ",
							docs,
							"/4"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						className: "mt-2",
						value: docs / 4 * 100,
						barClassName: "bg-ok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 flex flex-col gap-2",
						children: household.members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 rounded-xl bg-elevated p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyAvatar, { member: m }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm",
								children: m.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									roleLabel(m.role),
									" · ",
									m.age,
									m.employed ? " · employed" : "",
									m.student ? " · student" : "",
									m.disabled ? " · disability" : "",
									m.veteran ? " · veteran" : ""
								]
							})] })]
						}, m.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => {
									setSheet(null);
									setTab("screen");
								},
								children: "Recheck eligibility"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setSheet("seals"),
								children: "Manage documents"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => resetDemo(),
								children: "Restore demo household"
							})
						]
					})
				]
			})]
		})] })
	});
}
var DOCS = [
	{
		key: "identity",
		how: "Photo ID for the lead. Confirms the filing name."
	},
	{
		key: "income",
		how: "Pay stub, award letter, or tax transcript. Unlocks exact SNAP math."
	},
	{
		key: "residency",
		how: "Lease or utility bill in this ZIP. Required for energy credits."
	},
	{
		key: "household",
		how: "Birth records or SSNs for every household member."
	}
];
function SealsSheet() {
	const sheet = useCrest((s) => s.sheet);
	const setSheet = useCrest((s) => s.setSheet);
	const household = useCrest((s) => s.household);
	const verify = useCrest((s) => s.verify);
	const applications = useCrest((s) => s.applications);
	const resolveReview = useCrest((s) => s.resolveReview);
	const open = sheet === "seals";
	const stamp = (key) => {
		verify(key);
		toast.success(`${labelBadge(key)} verified.`);
		window.setTimeout(() => {
			for (const app of Object.values(useCrest.getState().applications)) if (app.status === "needs-docs" || app.status === "in-review") resolveReview(app.programId);
		}, 350);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange: (next) => {
			if (!next) setSheet(null);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-40 bg-foreground/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			className: "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] max-w-md flex-col rounded-t-3xl bg-card shadow-[var(--shadow-lift)] outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-10 rounded-full bg-foreground/15" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-y-auto px-5 pb-8 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/documents.jpg",
						alt: "",
						className: "mb-4 h-28 w-full rounded-2xl object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
						className: "font-display text-xl tracking-tight",
						children: "Document vault"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Verify these once. Each check raises your match score and turns estimates into exact awards."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 flex flex-col gap-3",
						children: DOCS.map((s) => {
							const on = household.verified[s.key];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3 rounded-xl bg-elevated p-3 shadow-[var(--shadow-border)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: cn("mt-0.5 size-5", on ? "text-ok" : "text-subtle") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-sm",
											children: labelBadge(s.key)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: s.how
										})]
									}),
									on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-wide text-ok",
										children: "Verified"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										onClick: () => stamp(s.key),
										children: "Verify"
									})
								]
							}, s.key);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-xs text-subtle",
						children: [
							Object.values(applications).filter((a) => a.status === "needs-docs").length,
							" ",
							"applications waiting on a document."
						]
					})
				]
			})]
		})] })
	});
}
var MESSAGE_RULES = [
	{
		needles: ["not_connected", "failed_precondition"],
		kind: "not_connected",
		message: "Connect this connector in Grok to load your data."
	},
	{
		needles: ["scope_denied"],
		kind: "scope_denied",
		message: "This view isn't available — the app requested a tool outside its grant."
	},
	{
		needles: ["access_denied"],
		kind: "access_denied",
		message: "You don't have access to this data."
	}
];
function matchMessageRule(raw) {
	return MESSAGE_RULES.find((rule) => rule.needles.some((needle) => raw.includes(needle)));
}
function classifyCallToolError(result) {
	if (result.ok) return null;
	const detail = result.errorMessage || void 0;
	const raw = (result.errorMessage ?? "").toLowerCase();
	if (isConnectorPending(result)) return {
		kind: "pending",
		message: "Connecting to your data…",
		detail
	};
	if (raw.includes("missing_connector_token")) return {
		kind: "error",
		message: "Open this app from Grok to load your data.",
		detail
	};
	if (isLoginRequired(result)) return {
		kind: "login",
		message: "Continue with Grok to load your data.",
		detail
	};
	const rule = matchMessageRule(raw);
	if (rule) return {
		kind: rule.kind,
		message: rule.message,
		detail
	};
	return {
		kind: "error",
		message: detail ?? "Something went wrong. Try again.",
		detail
	};
}
var getConnectorReadiness = createServerFn({ method: "POST" }).handler(createSsrRpc("ac303419f3bd6f94ee837f95e91005a600278deed4876cb96a25aa0d69185951"));
var READINESS_PROBE_DELAYS_MS = [
	1e3,
	2e3,
	3e3,
	5e3
];
var READINESS_PROBE_MAX_TOTAL_MS = 18e4;
function readinessProbeDelayMs(attempt) {
	return READINESS_PROBE_DELAYS_MS[Math.min(Math.max(attempt, 0), READINESS_PROBE_DELAYS_MS.length - 1)];
}
function readinessProbeExhausted(startedAtMs, nowMs) {
	return nowMs - startedAtMs >= READINESS_PROBE_MAX_TOTAL_MS;
}
var READINESS_PROBE_TIMEOUT_MS = 1e4;
function withTimeout(promise, ms) {
	return new Promise((resolve) => {
		const timer = setTimeout(() => resolve(null), ms);
		const settle = (value) => {
			clearTimeout(timer);
			resolve(value);
		};
		promise.then(settle, () => settle(null));
	});
}
async function isConnectorReady() {
	return (await withTimeout(getConnectorReadiness(), READINESS_PROBE_TIMEOUT_MS))?.ready === true;
}
/**
* While `waiting` is true (a connector call returned `pending`), probes the
* server for the connector token and calls `refetch` once it is present. The
* probe is a header check on the app's own server — it never reaches the gate.
* A `connector-token-ready` bridge event from the Grok preview chrome triggers
* `refetch` immediately. A top-level page (download/export, local dev, the
* sandbox's own `npm run preview`) is not framed by any preview, so no token
* can ever arrive: the hook reports `not_embedded` without probing. Any framed
* page probes, even when the parent origin cannot be resolved (empty referrer,
* no `ancestorOrigins`): the token comes through the preview proxy, and the
* bridge event is only the faster signal.
*/
function useRefetchWhenConnectorReady(waiting, refetch) {
	const refetchRef = (0, import_react.useRef)(refetch);
	const [timedOut, setTimedOut] = (0, import_react.useState)(false);
	const [notEmbedded, setNotEmbedded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		refetchRef.current = refetch;
	}, [refetch]);
	(0, import_react.useEffect)(() => {
		if (!waiting) return;
		if (!isFramed()) {
			setNotEmbedded(true);
			return () => setNotEmbedded(false);
		}
		let cancelled = false;
		let refetching = false;
		let attempt = 0;
		let timer;
		const startedAt = Date.now();
		const runRefetch = async () => {
			if (refetching) return;
			refetching = true;
			try {
				await refetchRef.current();
			} catch {} finally {
				refetching = false;
			}
		};
		const schedule = () => {
			timer = setTimeout(probe, readinessProbeDelayMs(attempt));
			attempt += 1;
		};
		const probe = async () => {
			if (cancelled || readinessProbeExhausted(startedAt, Date.now())) return;
			const ready = await isConnectorReady();
			if (cancelled) return;
			if (ready) await runRefetch();
			if (!cancelled) schedule();
		};
		const onTokenReady = () => {
			runRefetch();
		};
		const deadline = setTimeout(() => {
			if (!cancelled) setTimedOut(true);
		}, READINESS_PROBE_MAX_TOTAL_MS);
		window.addEventListener(CONNECTOR_TOKEN_READY_EVENT, onTokenReady);
		schedule();
		return () => {
			cancelled = true;
			clearTimeout(deadline);
			if (timer !== void 0) clearTimeout(timer);
			window.removeEventListener(CONNECTOR_TOKEN_READY_EVENT, onTokenReady);
			setTimedOut(false);
		};
	}, [waiting]);
	if (!waiting) return "idle";
	if (notEmbedded) return "not_embedded";
	return timedOut ? "timed_out" : "waiting";
}
var pullCatalogFromDrive = createServerFn({ method: "POST" }).validator((data) => ({
	fileId: typeof data?.fileId === "string" ? data.fileId.trim() : "",
	since: typeof data?.since === "string" ? data.since.trim() : ""
})).handler(createSsrRpc("16c1e6e358ffa83e64b89be01c90b8994011832edd8a5ed4d4f88432a16fda46"));
var pullCatalogSheet = createServerFn({ method: "POST" }).validator((data) => {
	if (!data || typeof data.url !== "string" || !data.url.trim()) throw new Error("Paste a Google Sheets link.");
	return { url: data.url.trim() };
}).handler(createSsrRpc("035ef7af06dc1df33121d6287d5addc99687bf44eb28547c1004f798327b22c2"));
var inflight = null;
function syncCatalog(opts) {
	if (inflight) return inflight;
	inflight = runSync(opts).finally(() => {
		inflight = null;
	});
	return inflight;
}
async function runSync(opts) {
	const quiet = Boolean(opts?.quiet);
	if (!quiet) setCatalogMeta({
		pending: true,
		error: null
	});
	const url = opts?.url?.trim();
	const since = quiet ? getCatalogMeta().modifiedTime : void 0;
	const result = url ? await pullCatalogSheet({ data: { url } }) : await pullCatalogFromDrive({ data: { since } });
	if (!result.ok) {
		const error = classifyCallToolError({
			ok: false,
			data: null,
			pending: result.pending,
			loginRequired: result.loginRequired,
			loginUrl: result.loginUrl,
			errorMessage: result.errorMessage
		})?.message ?? result.errorMessage;
		if (!quiet || getCatalogMeta().source === "bundled") setCatalogMeta({
			pending: Boolean(result.pending),
			loginRequired: Boolean(result.loginRequired),
			loginUrl: result.loginUrl,
			error,
			lastChecked: Date.now()
		});
		else setCatalogMeta({
			pending: false,
			lastChecked: Date.now()
		});
		if (result.loginRequired && !quiet) redirectToLoginIfRequired({
			ok: false,
			data: null,
			pending: result.pending,
			loginRequired: true,
			loginUrl: result.loginUrl,
			errorMessage: result.errorMessage
		});
		return {
			ok: false,
			error,
			loginRequired: result.loginRequired,
			loginUrl: result.loginUrl
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
			source: result.source
		});
		return {
			ok: true,
			unchanged: true
		};
	}
	const next = parseSheetCsv(result.csv);
	if (next.length === 0) {
		const error = "No active rows found. Keep the header row and set active to TRUE.";
		setCatalogMeta({
			pending: false,
			error,
			lastChecked: Date.now()
		});
		return {
			ok: false,
			error
		};
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
		loginUrl: void 0,
		name: result.name,
		webViewLink: result.webViewLink
	});
	return {
		ok: true,
		count: next.length
	};
}
function CatalogSync() {
	const catalogUrl = useCrest((s) => s.catalogUrl);
	const pending = useCatalogMeta().pending;
	const sync = (0, import_react.useCallback)((quiet = false) => syncCatalog({
		url: catalogUrl || void 0,
		quiet
	}), [catalogUrl]);
	useRefetchWhenConnectorReady(pending && !catalogUrl, () => sync(false));
	(0, import_react.useEffect)(() => {
		sync(false);
		const tick = window.setInterval(() => {
			if (document.visibilityState !== "visible") return;
			if (getCatalogMeta().loginRequired) return;
			sync(true);
		}, CATALOG_POLL_MS);
		const onVis = () => {
			if (document.visibilityState === "visible") sync(true);
		};
		document.addEventListener("visibilitychange", onVis);
		return () => {
			window.clearInterval(tick);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, [sync]);
	return null;
}
function ago(ts) {
	if (!ts) return "Waiting for the first sync";
	const sec = Math.max(1, Math.round((Date.now() - ts) / 1e3));
	if (sec < 60) return `Checked ${sec}s ago`;
	return `Checked ${Math.round(sec / 60)}m ago`;
}
function CatalogSheet() {
	const sheet = useCrest((s) => s.sheet);
	const setSheet = useCrest((s) => s.setSheet);
	const catalogUrl = useCrest((s) => s.catalogUrl);
	const setCatalogUrl = useCrest((s) => s.setCatalogUrl);
	const programs = useLivePrograms();
	const meta = useCatalogMeta();
	const [draft, setDraft] = (0, import_react.useState)(catalogUrl);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const open = sheet === "catalog";
	const href = meta.webViewLink ?? DRIVE_CATALOG.webViewLink;
	const refresh = async (url) => {
		setBusy(true);
		try {
			const result = await syncCatalog({ url });
			if (result.ok && result.unchanged) toast("Already up to date.");
			else if (result.ok) toast.success(`${result.count} benefits are live from the sheet.`);
			else if (result.loginRequired && result.loginUrl) redirectToLoginIfRequired({
				ok: false,
				data: null,
				loginRequired: true,
				loginUrl: result.loginUrl
			});
			else if (result.error) toast.error(result.error);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange: (next) => {
			if (!next) setSheet(null);
			else setDraft(catalogUrl);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-40 bg-foreground/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			className: "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] max-w-md flex-col rounded-t-3xl bg-card shadow-[var(--shadow-lift)] outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-10 rounded-full bg-foreground/15" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-y-auto px-5 pb-10 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wide text-muted-foreground",
						children: "Auto-updating"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
						className: "font-display text-2xl tracking-tight",
						children: DRIVE_CATALOG.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted-foreground",
						children: "Your edits land in the app within a few seconds. Official amounts — SNAP, FPL, SSI, tax credits — refresh every morning at 8:00 am Pacific."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm",
						children: [
							programs.length,
							" programs · ",
							ago(meta.lastChecked ?? meta.lastSynced)
						]
					}),
					meta.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-destructive",
						children: meta.error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => refresh(catalogUrl || void 0),
							disabled: busy || meta.pending,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), busy || meta.pending ? "Syncing…" : "Refresh now"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => window.open(href, "_blank", "noopener,noreferrer"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), "Open in Google Sheets"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-xs uppercase tracking-wide text-muted-foreground",
						children: "Use a different sheet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-2 block text-sm font-medium",
						htmlFor: "sheet-url",
						children: "Google Sheets link"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "sheet-url",
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						placeholder: "https://docs.google.com/spreadsheets/d/…",
						className: "mt-2 flex h-12 w-full rounded-2xl bg-elevated px-4 text-sm text-foreground shadow-[var(--shadow-border)] placeholder:text-subtle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-2 h-11 text-sm font-medium text-ok",
						onClick: async () => {
							const url = draft.trim();
							if (!url) {
								toast.error("Paste a Google Sheets link first.");
								return;
							}
							setCatalogUrl(url);
							await refresh(url);
						},
						children: "Connect this link instead"
					}),
					catalogUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 text-sm text-muted-foreground",
						onClick: () => {
							setCatalogUrl("");
							setDraft("");
							refresh();
							toast("Back to CivicAid Benefits in Drive.");
						},
						children: "Use the Drive catalog"
					}) : null
				]
			})]
		})] })
	});
}
function blankHousehold(name) {
	const trimmed = name.trim() || "You";
	const parts = trimmed.split(/\s+/);
	return {
		surname: parts.length > 1 ? parts[parts.length - 1] : trimmed,
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
		members: [{
			id: "m1",
			name: trimmed,
			age: 30,
			role: "self",
			employed: false,
			student: false,
			disabled: false,
			pregnant: false,
			veteran: false
		}]
	};
}
var loadProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f8745d92712f742dccf87270d7acf704e3ce897cbdd3eb8ccbf04778e7561011"));
var saveProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("6390c9ff08b2a59f7c7b227d0becfb065f507c829252d253e7dbda3941b9fb12"));
var AUTHED_KEY = "civic-authed";
function ProfileSync() {
	const { user, isPending } = useCurrentUserState();
	const household = useCrest((s) => s.household);
	const applications = useCrest((s) => s.applications);
	const saved = useCrest((s) => s.saved);
	const eligStep = useCrest((s) => s.eligStep);
	const hydrateAccount = useCrest((s) => s.hydrateAccount);
	const setAccountReady = useCrest((s) => s.setAccountReady);
	const resetDemo = useCrest((s) => s.resetDemo);
	const ready = (0, import_react.useRef)(false);
	const userId = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
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
		loadProfile().then((row) => {
			if (cancelled) return;
			if (row && row.household.members.length > 0) {
				const local = useCrest.getState();
				hydrateAccount(local.eligStep > row.eligStep ? {
					...row,
					eligStep: local.eligStep,
					household: local.household
				} : row);
			} else {
				const name = user.displayName || user.primaryEmail || "You";
				hydrateAccount({
					household: blankHousehold(name),
					applications: {},
					saved: [],
					eligStep: 0,
					tab: "screen"
				});
			}
			ready.current = true;
			setAccountReady(true);
		}).catch(() => {
			if (!cancelled) {
				ready.current = true;
				setAccountReady(true);
			}
		});
		return () => {
			cancelled = true;
		};
	}, [
		user,
		isPending,
		hydrateAccount,
		resetDemo,
		setAccountReady
	]);
	(0, import_react.useEffect)(() => {
		if (!user || !ready.current) return;
		const timer = window.setTimeout(() => {
			const latest = useCrest.getState();
			saveProfile({ data: {
				household: latest.household,
				applications: latest.applications,
				saved: latest.saved,
				eligStep: latest.eligStep
			} }).catch(() => {});
		}, 700);
		return () => window.clearTimeout(timer);
	}, [
		user,
		household,
		applications,
		saved,
		eligStep
	]);
	return null;
}
var STEPS = 4;
var INCOME = [
	{
		label: "Under $2,500",
		sub: "Under $30,000 / year",
		value: 2200
	},
	{
		label: "$2,500 – $4,000",
		sub: "$30,000 – $48,000 / year",
		value: 3200
	},
	{
		label: "$4,000 – $5,500",
		sub: "$48,000 – $66,000 / year",
		value: 4800
	},
	{
		label: "$5,500+",
		sub: "Above $66,000 / year",
		value: 6200
	}
];
var NEEDS = [
	{
		key: "under5",
		label: "Child under 5",
		icon: Baby
	},
	{
		key: "pregnant",
		label: "Pregnant",
		icon: Heart
	},
	{
		key: "senior",
		label: "65 or older",
		icon: PersonStanding
	},
	{
		key: "disabled",
		label: "Disability",
		icon: Accessibility
	},
	{
		key: "veteran",
		label: "Veteran",
		icon: Shield
	},
	{
		key: "student",
		label: "Student",
		icon: GraduationCap
	}
];
function needOn(members, key) {
	if (key === "under5") return members.some((m) => m.role === "child" && m.age < 5);
	if (key === "pregnant") return members.some((m) => m.pregnant);
	if (key === "senior") return members.some((m) => m.age >= 65);
	if (key === "disabled") return members.some((m) => m.disabled);
	if (key === "veteran") return members.some((m) => m.veteran);
	if (key === "student") return members.some((m) => m.student);
	return false;
}
var QUIZ_KEY = "civic-quiz-step";
function Onboarding() {
	const household = useCrest((s) => s.household);
	const updateHousehold = useCrest((s) => s.updateHousehold);
	const setMembers = useCrest((s) => s.setMembers);
	const setEligStep = useCrest((s) => s.setEligStep);
	const setTab = useCrest((s) => s.setTab);
	const [step, setStep] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return 0;
		const saved = Number(sessionStorage.getItem(QUIZ_KEY) || 0);
		return saved >= 0 && saved < STEPS ? saved : 0;
	});
	const [zip, setZip] = (0, import_react.useState)(household.zip);
	const [income, setIncome] = (0, import_react.useState)(null);
	const lead = household.members.find((m) => m.role === "self") ?? household.members[0];
	const setSize = (next) => {
		const size = Math.max(1, Math.min(8, next));
		let members = [...household.members];
		while (members.length < size) {
			const i = members.length;
			members.push(emptyMember(`n${Date.now()}${i}`, i === 1 ? "Partner" : `Child ${i - 1}`, i === 1 ? 34 : 6, i === 1 ? "partner" : "child"));
		}
		while (members.length > size) {
			if (members[members.length - 1]?.role === "self") break;
			members = members.slice(0, -1);
		}
		setMembers(members);
	};
	const toggleNeed = (key) => {
		const self = household.members.find((m) => m.role === "self") ?? household.members[0];
		if (!self) return;
		if (key === "under5") {
			if (needOn(household.members, "under5")) setMembers(household.members.filter((m) => !(m.role === "child" && m.age < 5)));
			else setMembers([...household.members, emptyMember(`c${Date.now()}`, "Child", 3, "child")]);
			return;
		}
		setMembers(household.members.map((m) => {
			if (key === "pregnant" && m.id === self.id) return {
				...m,
				pregnant: !m.pregnant
			};
			if (key === "senior" && m.id === self.id) return {
				...m,
				age: m.age >= 65 ? 34 : 68
			};
			if (key === "disabled" && m.id === self.id) return {
				...m,
				disabled: !m.disabled
			};
			if (key === "veteran" && m.id === self.id) return {
				...m,
				veteran: !m.veteran
			};
			if (key === "student" && m.id === self.id) return {
				...m,
				student: !m.student
			};
			return m;
		}));
	};
	const next = () => {
		if (step === 0) {
			const code = zip.replace(/\D/g, "").slice(0, 5);
			if (code.length !== 5) return;
			updateHousehold({ zip: code });
		}
		if (step === 2 && income != null) updateHousehold({ monthlyIncome: income });
		if (step < 3) {
			const nextStep = step + 1;
			sessionStorage.setItem(QUIZ_KEY, String(nextStep));
			setStep(nextStep);
			return;
		}
		sessionStorage.removeItem(QUIZ_KEY);
		setEligStep(2);
		setTab("hall");
		const latest = useCrest.getState();
		saveProfile({ data: {
			household: latest.household,
			applications: latest.applications,
			saved: latest.saved,
			eligStep: 2
		} });
	};
	const canContinue = step === 0 ? zip.replace(/\D/g, "").length === 5 : step === 2 ? income != null : true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh justify-center bg-secondary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-dvh w-full max-w-md flex-col bg-background px-5 pb-8 pt-6 shadow-[var(--shadow-lift)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CivicMark, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg tracking-tight",
							children: "CivicAid"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium text-muted-foreground",
						children: [
							step + 1,
							" of ",
							STEPS
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex gap-1.5",
					"aria-hidden": true,
					children: Array.from({ length: STEPS }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1 flex-1 rounded-full", i <= step ? "bg-foreground" : "bg-foreground/15") }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-1 flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-muted-foreground",
							children: lead ? `Hi ${firstName(lead.name)}` : "Your household"
						}),
						step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-3xl italic tracking-tight",
								children: "Where do you live?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "ZIP code decides which local programs apply."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-6 block text-sm font-medium",
								children: ["ZIP code", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									inputMode: "numeric",
									autoComplete: "postal-code",
									value: zip,
									onChange: (e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5)),
									className: "mt-1.5 flex h-14 w-full rounded-2xl bg-elevated px-4 font-display text-2xl tabular-nums shadow-[var(--shadow-border)]"
								})]
							})
						] }) : null,
						step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-3xl italic tracking-tight",
								children: "Who shares expenses?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Count everyone in the household, including you."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 flex items-center justify-center gap-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSize(household.members.length - 1),
										className: "flex size-12 items-center justify-center rounded-full bg-secondary",
										"aria-label": "Decrease household size",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "w-16 text-center font-display text-6xl tabular-nums",
										children: household.members.length
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSize(household.members.length + 1),
										className: "flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground",
										"aria-label": "Increase household size",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-center text-sm text-muted-foreground",
								children: household.members.length === 1 ? "Just you" : `${household.members.length} people`
							})
						] }) : null,
						step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-3xl italic tracking-tight",
								children: "What’s the monthly income?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Pre-tax, for the whole household."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex flex-col gap-2",
								children: INCOME.map((band) => {
									const on = income === band.value;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setIncome(band.value),
										className: cn("flex min-h-14 items-center justify-between rounded-2xl px-4 py-3 text-left", on ? "bg-primary text-primary-foreground" : "bg-card shadow-[var(--shadow-border)]"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-sm font-medium",
											children: band.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-xs", on ? "text-primary-foreground/75" : "text-muted-foreground"),
											children: band.sub
										})] }), on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : null]
									}, band.label);
								})
							})
						] }) : null,
						step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-3xl italic tracking-tight",
								children: "Anything else that applies?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Pick all that fit. Skip if none do."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex flex-col gap-2",
								children: NEEDS.map((n) => {
									const on = needOn(household.members, n.key);
									const Icon = n.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => toggleNeed(n.key),
										className: cn("flex min-h-14 items-center gap-3 rounded-2xl px-4 text-left text-sm font-medium", on ? "bg-primary text-primary-foreground" : "bg-card shadow-[var(--shadow-border)]"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex-1",
												children: n.label
											}),
											on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : null
										]
									}, n.key);
								})
							})
						] }) : null
					]
				}, step),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center gap-3",
					children: [step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setStep(step - 1),
						className: "h-12 px-2 text-sm font-medium",
						children: "Back"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "lg",
						className: "flex-1",
						disabled: !canContinue,
						onClick: next,
						children: step === 3 ? "See my matches" : "Continue"
					})]
				})
			]
		})
	});
}
function AppShell() {
	const { user, isPending } = useCurrentUserState();
	const household = useCrest((s) => s.household);
	const tab = useCrest((s) => s.tab);
	const eligStep = useCrest((s) => s.eligStep);
	const accountReady = useCrest((s) => s.accountReady);
	const programs = useLivePrograms();
	const matches = (0, import_react.useMemo)(() => matchAll(household, programs), [household, programs]);
	if (isPending || user && !accountReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh justify-center bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSync, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-dvh w-full max-w-md flex-col bg-background px-5 pt-8 shadow-[var(--shadow-lift)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-32 animate-pulse rounded-full bg-foreground/10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-10 w-56 animate-pulse rounded-full bg-foreground/10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-60 animate-pulse rounded-3xl bg-foreground/10" })
			]
		})]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh justify-center bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSync, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPanel, {})]
	});
	if (eligStep < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSync, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh justify-center bg-secondary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-dvh w-full max-w-md flex-col bg-background shadow-[var(--shadow-lift)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBar, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "flex-1 overflow-y-auto scroll-pt-16",
						children: [
							tab === "hall" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HallView, { matches }),
							tab === "ledger" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerView, { matches }),
							tab === "screen" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenView, { matches }),
							tab === "quests" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestsView, { matches })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramSheet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BundleSheet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartySheet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SealsSheet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogSheet, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "light",
				position: "top-center",
				toastOptions: { className: "font-sans bg-card text-foreground border-border" }
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component, redirectToLoginIfRequired as n, isLoginRequired as t };
