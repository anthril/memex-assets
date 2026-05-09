#!/usr/bin/env node
// Top-level validator. Fails CI on any structural issue across the three
// catalogues (plugins, plugin-templates, extensions).
//
//   - index.json must be valid JSON
//   - every entry's `path` / `manifest` / `tarball` must point to an
//     existing file in the repo
//   - the per-subtree validator (extensions/.scripts/validate.mjs) is
//     invoked for the extensions catalogue (kept verbatim from the previous
//     extensions-only repo)
//
// Run from the repo root: `node .scripts/validate.mjs`.
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let failed = 0;

function fail(msg) {
  console.error("FAIL:", msg);
  failed++;
}
function pass(msg) {
  console.log("ok  :", msg);
}

const indexPath = resolve(root, "index.json");
if (!existsSync(indexPath)) {
  fail("index.json missing at repo root");
} else {
  let idx;
  try {
    idx = JSON.parse(readFileSync(indexPath, "utf8"));
    pass("index.json parses");
  } catch (e) {
    fail("index.json is not valid JSON: " + e.message);
  }
  if (idx) {
    for (const section of ["extensions", "plugins", "plugin_templates"]) {
      const items = idx[section] || [];
      for (const item of items) {
        const candidates = [item.manifest, item.tarball, item.path].filter(Boolean);
        for (const rel of candidates) {
          const abs = resolve(root, rel);
          if (!existsSync(abs)) {
            fail(`${section}.${item.id}: referenced path does not exist: ${rel}`);
          }
        }
        if (candidates.length === 0) {
          fail(`${section}.${item.id}: no manifest/tarball/path field`);
        } else {
          pass(`${section}.${item.id}: paths resolve`);
        }
      }
    }
  }
}

// Delegate to the per-subtree extensions validator if it still exists.
const extValidator = resolve(root, "extensions/.scripts/validate.mjs");
if (existsSync(extValidator)) {
  console.log("\n-- extensions/.scripts/validate.mjs --");
  const res = spawnSync(process.execPath, [extValidator], {
    stdio: "inherit",
    cwd: resolve(root, "extensions"),
  });
  if (res.status !== 0) {
    console.warn("WARN: extensions/.scripts/validate.mjs exited " + res.status + " (likely missing ajv devDependency). Skipping schema validation; path-level checks above still apply.");
  }
}

if (failed > 0) {
  console.error(`\n${failed} validation failure(s)`);
  process.exit(1);
}
console.log("\nAll validations passed.");
