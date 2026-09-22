import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { i as GoogleDriveTools, r as ConnectorType } from "./types-BU_vzhZ-.mjs";
import { f as toCsvExportUrl, i as DRIVE_CATALOG } from "./sheet-catalog-CCDj7Uml.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fetch-sheet-CN0cpidf.js
function csvFromDriveData(data) {
	if (typeof data === "string" && data.includes(",")) return data;
	if (!data || typeof data !== "object") return null;
	const row = data;
	for (const key of [
		"content",
		"text",
		"csv",
		"body"
	]) {
		const value = row[key];
		if (typeof value === "string" && value.trim()) return value;
	}
	if (row.file && typeof row.file === "object") return csvFromDriveData(row.file);
	return null;
}
function filesFromSearch(data) {
	if (!data || typeof data !== "object") return [];
	const row = data;
	const raw = Array.isArray(row.files) ? row.files : Array.isArray(data) ? data : [];
	const out = [];
	for (const file of raw) {
		if (!file || typeof file !== "object") continue;
		const item = file;
		const id = item.file_id ?? item.id;
		if (typeof id !== "string" || !id) continue;
		out.push({
			fileId: id,
			name: typeof item.name === "string" ? item.name : "",
			modifiedTime: typeof item.modified_time === "string" ? item.modified_time : typeof item.modifiedTime === "string" ? item.modifiedTime : void 0,
			webViewLink: typeof item.web_view_link === "string" ? item.web_view_link : typeof item.webViewLink === "string" ? item.webViewLink : void 0
		});
	}
	return out;
}
function newestCatalog(files) {
	const named = files.filter((f) => f.name.toLowerCase().includes("civicaid"));
	const pool = named.length > 0 ? named : files;
	if (pool.length === 0) return null;
	return [...pool].sort((a, b) => (b.modifiedTime ?? "").localeCompare(a.modifiedTime ?? ""))[0];
}
function failFromTool(result) {
	return {
		ok: false,
		pending: result.pending,
		loginRequired: result.loginRequired,
		loginUrl: result.loginUrl,
		errorMessage: result.errorMessage ?? "Could not read Google Drive."
	};
}
var pullCatalogFromDrive_createServerFn_handler = createServerRpc({
	id: "16c1e6e358ffa83e64b89be01c90b8994011832edd8a5ed4d4f88432a16fda46",
	name: "pullCatalogFromDrive",
	filename: "src/data/fetch-sheet.ts"
}, (opts) => pullCatalogFromDrive.__executeServer(opts));
var pullCatalogFromDrive = createServerFn({ method: "POST" }).validator((data) => ({
	fileId: typeof data?.fileId === "string" ? data.fileId.trim() : "",
	since: typeof data?.since === "string" ? data.since.trim() : ""
})).handler(pullCatalogFromDrive_createServerFn_handler, async ({ data }) => {
	const { callTool } = await import("./client.server-Bd-cQKlJ.mjs");
	const options = { connectorType: ConnectorType.GoogleDrive };
	const search = await callTool(GoogleDriveTools.search, {
		query: DRIVE_CATALOG.name,
		mime_type_filter: "application/vnd.google-apps.spreadsheet",
		max_results: 10,
		title_only: true
	}, options);
	if (!search.ok) return failFromTool(search);
	const newest = newestCatalog(filesFromSearch(search.data));
	const fileId = newest?.fileId || data.fileId || DRIVE_CATALOG.fileId;
	const modifiedTime = newest?.modifiedTime;
	const webViewLink = newest?.webViewLink ?? DRIVE_CATALOG.webViewLink;
	const name = newest?.name || DRIVE_CATALOG.name;
	if (!fileId) return {
		ok: false,
		errorMessage: "CivicAid Benefits was not found in Google Drive."
	};
	if (data.since && modifiedTime && modifiedTime === data.since) return {
		ok: true,
		csv: "",
		source: "drive",
		fileId,
		name,
		webViewLink,
		modifiedTime,
		unchanged: true
	};
	const read = await callTool(GoogleDriveTools.readFile, {
		file_id: fileId,
		max_chars: 4e5
	}, options);
	if (!read.ok) return failFromTool(read);
	const csv = csvFromDriveData(read.data);
	if (!csv || !csv.includes("id")) return {
		ok: false,
		errorMessage: "The sheet did not return a catalog table."
	};
	const meta = read.data && typeof read.data === "object" ? read.data : {};
	return {
		ok: true,
		csv,
		source: "drive",
		fileId,
		name: typeof meta.name === "string" ? meta.name : name,
		webViewLink: typeof meta.web_view_link === "string" ? meta.web_view_link : webViewLink,
		modifiedTime
	};
});
var pullCatalogSheet_createServerFn_handler = createServerRpc({
	id: "035ef7af06dc1df33121d6287d5addc99687bf44eb28547c1004f798327b22c2",
	name: "pullCatalogSheet",
	filename: "src/data/fetch-sheet.ts"
}, (opts) => pullCatalogSheet.__executeServer(opts));
var pullCatalogSheet = createServerFn({ method: "POST" }).validator((data) => {
	if (!data || typeof data.url !== "string" || !data.url.trim()) throw new Error("Paste a Google Sheets link.");
	return { url: data.url.trim() };
}).handler(pullCatalogSheet_createServerFn_handler, async ({ data }) => {
	const exportUrl = toCsvExportUrl(data.url);
	if (!exportUrl) return {
		ok: false,
		errorMessage: "That does not look like a Google Sheet link."
	};
	if (!/^https:\/\/docs\.google\.com\/spreadsheets\//i.test(exportUrl)) return {
		ok: false,
		errorMessage: "Only Google Sheets links can be loaded."
	};
	const res = await fetch(exportUrl, { redirect: "follow" });
	if (!res.ok) return {
		ok: false,
		errorMessage: "Google could not export that sheet. Share it as anyone with the link can view."
	};
	const csv = await res.text();
	const head = csv.slice(0, 200).toLowerCase();
	if (head.includes("<!doctype") || head.includes("<html") || head.includes("sign in")) return {
		ok: false,
		errorMessage: "The sheet is private. Connect Drive, or share as anyone with the link."
	};
	return {
		ok: true,
		csv,
		source: "url"
	};
});
//#endregion
export { pullCatalogFromDrive_createServerFn_handler, pullCatalogSheet_createServerFn_handler };
