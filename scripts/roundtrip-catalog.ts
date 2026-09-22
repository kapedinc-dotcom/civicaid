import { PROGRAMS } from "../src/data/catalog";
import { parseSheetCsv, programsToCsv } from "../src/data/sheet-catalog";

const next = parseSheetCsv(programsToCsv(PROGRAMS));
const missing = PROGRAMS.filter((p) => !next.some((n) => n.id === p.id)).map((p) => p.id);
console.log(JSON.stringify({ in: PROGRAMS.length, out: next.length, missing }, null, 2));
