import { writeFileSync } from "node:fs";
import { PROGRAMS } from "../src/data/catalog";
import { programsToCsv } from "../src/data/sheet-catalog";

const csv = programsToCsv(PROGRAMS);
writeFileSync("public/civicaid-catalog.csv", csv);
console.log(`Wrote public/civicaid-catalog.csv (${PROGRAMS.length} programs)`);
