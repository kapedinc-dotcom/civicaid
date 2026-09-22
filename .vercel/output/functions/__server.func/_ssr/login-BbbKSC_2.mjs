import { v as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as useCurrentUserState, r as LoginPanel } from "./login-panel-CWdwL27D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BbbKSC_2.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh items-center justify-center bg-secondary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 w-48 animate-pulse rounded-full bg-foreground/10" })
	});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh justify-center bg-secondary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPanel, {})
	});
}
//#endregion
export { Login as component };
