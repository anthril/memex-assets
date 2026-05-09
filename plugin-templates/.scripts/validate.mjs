#!/usr/bin/env node
// Memex plugin-templates profile validator.
//
// Walks every <profile>/memex.config.json under the parent directory of this
// script, asserts required fields, and prints a summary table. Exits non-zero
// on the first failure so CI fails loudly.
//
// A richer validator (full JSON Schema check, dated-folder format parsing,
// section-filter type inference) is planned via the future
// `memex-validate-profile` binary in `crates/memex-templates/`.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const ALLOWED_VERSIONS = new Set(["1", "2"]);

function listProfileDirs(dir) {
  return readdirSync(dir)
    .filter((name) => !name.startsWith(".") && name !== "node_modules")
    .map((name) => join(dir, name))
    .filter((p) => statSync(p).isDirectory());
}

function validateProfile(profileDir) {
  const name = profileDir.split(/[\\/]/).pop();
  const configPath = join(profileDir, "memex.config.json");
  const errors = [];

  let raw;
  try {
    raw = readFileSync(configPath, "utf8");
  } catch (e) {
    errors.push(`missing or unreadable memex.config.json (${e.code || e.message})`);
    return { name, version: "-", schema: "-", ok: false, errors };
  }

  let cfg;
  try {
    cfg = JSON.parse(raw);
  } catch (e) {
    errors.push(`invalid JSON: ${e.message}`);
    return { name, version: "-", schema: "-", ok: false, errors };
  }

  if (typeof cfg.version !== "string" || !ALLOWED_VERSIONS.has(cfg.version)) {
    errors.push(`version must be one of ${[...ALLOWED_VERSIONS].join(", ")} (got ${JSON.stringify(cfg.version)})`);
  }
  if (typeof cfg.profile !== "string" || cfg.profile.trim() === "") {
    errors.push(`profile must be a non-empty string`);
  } else if (cfg.profile !== name) {
    errors.push(`profile field "${cfg.profile}" does not match directory name "${name}"`);
  }
  if (typeof cfg.root !== "string" || cfg.root.trim() === "") {
    errors.push(`root must be a non-empty string`);
  }

  if (cfg.version === "2") {
    if (!Array.isArray(cfg.sectionsV2)) {
      errors.push(`v2 profile must define sectionsV2 as an array`);
    }
  }

  return {
    name,
    version: cfg.version ?? "-",
    schema: cfg.version === "2" ? "v2" : "v1",
    ok: errors.length === 0,
    errors,
  };
}

function pad(s, n) {
  s = String(s);
  return s + " ".repeat(Math.max(0, n - s.length));
}

const profiles = listProfileDirs(root).sort();
if (profiles.length === 0) {
  console.error(`no profile directories found under ${root}`);
  process.exit(2);
}

const results = profiles.map(validateProfile);

const nameW = Math.max(7, ...results.map((r) => r.name.length));
const verW = 7;
const statusW = 6;

console.log(`Profile validation summary  (${results.length} profiles)`);
console.log(`${pad("name", nameW)}  ${pad("schema", verW)}  status`);
console.log(`${"-".repeat(nameW)}  ${"-".repeat(verW)}  ${"-".repeat(statusW)}`);
for (const r of results) {
  console.log(`${pad(r.name, nameW)}  ${pad(r.schema, verW)}  ${r.ok ? "PASS" : "FAIL"}`);
}

const failed = results.filter((r) => !r.ok);
if (failed.length > 0) {
  console.error("");
  for (const r of failed) {
    console.error(`FAIL ${r.name}:`);
    for (const e of r.errors) console.error(`  - ${e}`);
  }
  process.exit(1);
}

console.log("");
console.log("All profiles valid.");
