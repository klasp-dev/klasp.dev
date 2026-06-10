#!/usr/bin/env node
// Refresh src/data/surfaces.json from the canonical source in the klasp repo
// (docs/surfaces.json on main). The site renders its version string and the
// capability matrix from this vendored copy, so syncing it after a klasp
// release keeps the site from drifting — no hand-editing of markup.
//
// Usage:
//   node scripts/sync-surfaces.mjs           # fetch canonical -> vendored copy
//   node scripts/sync-surfaces.mjs --check   # exit 1 if vendored copy is stale
//
// Node 18+ (uses global fetch + top-level await). No external deps.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CANONICAL =
  "https://raw.githubusercontent.com/klasp-dev/klasp/main/docs/surfaces.json";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dest = join(resolve(__dirname, ".."), "src", "data", "surfaces.json");
const check = process.argv.includes("--check");

const res = await fetch(CANONICAL);
if (!res.ok) {
  console.error(`error: GET ${CANONICAL} -> ${res.status}`);
  process.exit(1);
}
const remote = await res.text();
const local = readFileSync(dest, "utf8");

// Compare parsed JSON so whitespace/formatting differences don't matter.
const same =
  JSON.stringify(JSON.parse(remote)) === JSON.stringify(JSON.parse(local));

if (check) {
  if (!same) {
    console.error(
      "error: src/data/surfaces.json is stale vs klasp main. Run: node scripts/sync-surfaces.mjs",
    );
    process.exit(1);
  }
  console.log("ok src/data/surfaces.json matches klasp main");
} else if (same) {
  console.log("src/data/surfaces.json already current");
} else {
  writeFileSync(dest, remote.endsWith("\n") ? remote : `${remote}\n`);
  console.log("src/data/surfaces.json updated from klasp main");
}
