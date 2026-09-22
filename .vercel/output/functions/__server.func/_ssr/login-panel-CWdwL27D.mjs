import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as signIn, t as authClient } from "./client-CVqXY6bk.mjs";
import { t as GROK_PROVIDERS } from "./server-DF7TQW-l.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-panel-CWdwL27D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatUsd(n, compact = false) {
	const rounded = Math.round(n);
	if (compact && Math.abs(rounded) >= 1e3) {
		const k = rounded / 1e3;
		const digits = k >= 10 || Number.isInteger(k) ? 0 : 1;
		return `$${k.toFixed(digits)}k`;
	}
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(rounded);
}
function formatUsdMo(n, compact = false) {
	return `${formatUsd(n, compact)}/mo`;
}
function formatAward(n, kind) {
	if (kind === "seasonal") return {
		value: formatUsd(n * 6),
		suffix: "/ winter season"
	};
	if (kind === "annual") return {
		value: formatUsd(n * 12),
		suffix: "/ year"
	};
	if (kind === "one-time") return {
		value: formatUsd(Math.max(n, n * 6)),
		suffix: " avg"
	};
	return {
		value: formatUsd(n),
		suffix: "/mo"
	};
}
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}
function daysFromNow(days) {
	const d = /* @__PURE__ */ new Date();
	d.setHours(23, 59, 0, 0);
	d.setDate(d.getDate() + days);
	return d;
}
function firstName(full) {
	return full.trim().split(/\s+/)[0] ?? full;
}
function greeting() {
	const hour = Number(new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		hour12: false,
		timeZone: "America/Los_Angeles"
	}).format(/* @__PURE__ */ new Date()));
	const h = Number.isFinite(hour) ? hour % 24 : (/* @__PURE__ */ new Date()).getHours();
	if (h < 12) return "Good morning";
	if (h < 17) return "Good afternoon";
	return "Good evening";
}
function emptyMember(id, name, age, role) {
	return {
		id,
		name,
		age,
		role,
		employed: role !== "child",
		student: false,
		disabled: false,
		pregnant: false,
		veteran: false
	};
}
function CivicMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-accent", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "2",
				y: "2",
				width: "28",
				height: "28",
				rx: "8",
				fill: "currentColor",
				fillOpacity: "0.14"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 8.2c-3.4 2.4-5.6 5.6-5.6 8.6 0 3.1 2.5 5.2 5.6 5.2s5.6-2.1 5.6-5.2c0-3-2.2-6.2-5.6-8.6Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 11.4c.6 1.6 1.6 2.8 1.6 4.2 0 1.3-.8 2.2-1.6 2.2s-1.6-.9-1.6-2.2c0-1.4 1-2.6 1.6-4.2Z",
				fill: "var(--color-background)"
			})
		]
	});
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium select-none whitespace-nowrap rounded-full text-sm transition-[scale,background-color,color,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			outline: "bg-card text-foreground shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
			danger: "bg-destructive/12 text-destructive hover:bg-destructive/20",
			inverse: "bg-card/95 text-foreground hover:bg-card"
		},
		size: {
			default: "h-11 min-h-11 px-5",
			sm: "h-9 min-h-9 px-3.5 text-xs",
			lg: "h-12 min-h-12 px-6",
			icon: "size-11 min-h-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = (0, import_react.forwardRef)(({ className, variant, size, type = "button", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	type,
	className: cn(buttonVariants({
		variant,
		size
	}), className),
	...props
}));
Button.displayName = "Button";
function LoginPanel() {
	const router = useRouter();
	const [mode, setMode] = (0, import_react.useState)("up");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		setError(null);
		try {
			if (mode === "up") {
				const result = await authClient.signUp.email({
					email: email.trim(),
					password,
					name: name.trim() || email.trim()
				});
				if (result.error) throw new Error(result.error.message || "Could not create that account.");
			} else {
				const result = await authClient.signIn.email({
					email: email.trim(),
					password
				});
				if (result.error) throw new Error(result.error.message || "Email or password did not match.");
			}
			await router.invalidate();
			await router.navigate({ to: "/" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh w-full max-w-md flex-col justify-center bg-background px-6 py-10 shadow-[var(--shadow-lift)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CivicMark, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg tracking-tight",
					children: "CivicAid"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-8 font-display text-3xl italic tracking-tight",
				children: mode === "up" ? "Create your account" : "Welcome back"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted-foreground",
				children: mode === "up" ? "A few questions after this, so we only show what you qualify for." : "Sign in to pick up your screening answers and applications."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-8 flex flex-col gap-3",
				children: [
					mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Full name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							autoComplete: "name",
							required: true,
							className: "mt-1.5 flex h-12 w-full rounded-2xl bg-elevated px-4 text-sm shadow-[var(--shadow-border)]"
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							autoComplete: "email",
							required: true,
							className: "mt-1.5 flex h-12 w-full rounded-2xl bg-elevated px-4 text-sm shadow-[var(--shadow-border)]"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							autoComplete: mode === "up" ? "new-password" : "current-password",
							minLength: 8,
							required: true,
							className: "mt-1.5 flex h-12 w-full rounded-2xl bg-elevated px-4 text-sm shadow-[var(--shadow-border)]"
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-destructive",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						disabled: busy,
						children: busy ? "Please wait…" : mode === "up" ? "Create account" : "Sign in"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-xs uppercase tracking-wide text-muted-foreground",
					children: "or"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-col gap-2",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => signIn(p.providerId, { callbackURL: "/" }),
						children: ["Continue with ", p.label]
					}, p.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-6 h-11 text-sm font-medium text-ok",
					onClick: () => {
						setError(null);
						setMode(mode === "up" ? "in" : "up");
					},
					children: mode === "up" ? "I already have an account" : "Create an account"
				})
			] })
		]
	});
}
//#endregion
export { daysFromNow as a, formatAward as c, greeting as d, initials as f, cn as i, formatUsd as l, useCurrentUserState as m, CivicMark as n, emptyMember as o, useCurrentUser as p, LoginPanel as r, firstName as s, Button as t, formatUsdMo as u };
