#!/usr/bin/env node
/**
 * Validate every assets/extensions/examples/<id>/manifest.json against
 * manifest.schema.json. Prints a summary table and exits non-zero on any
 * failure.
 *
 * devDeps: ajv, ajv-formats. The CI workflow installs them on the fly via
 * `npm install --no-save ajv ajv-formats` before invoking this script.
 *
 * Usage:
 *   node .scripts/validate.mjs
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SCHEMA_PATH = join(ROOT, 'manifest.schema.json');
const EXAMPLES_DIR = join(ROOT, 'examples');

let Ajv2020;
let addFormats;
try {
  ({ default: Ajv2020 } = await import('ajv/dist/2020.js'));
  ({ default: addFormats } = await import('ajv-formats'));
} catch (err) {
  console.error(
    'Missing devDependency "ajv" and/or "ajv-formats". Install with:',
  );
  console.error('  npm install --no-save ajv ajv-formats');
  console.error('Underlying error:', err.message);
  process.exit(2);
}

const schema = JSON.parse(await readFile(SCHEMA_PATH, 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

const entries = await readdir(EXAMPLES_DIR, { withFileTypes: true });
const manifestPaths = [];
for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const candidate = join(EXAMPLES_DIR, entry.name, 'manifest.json');
  try {
    await stat(candidate);
    manifestPaths.push(candidate);
  } catch {
    // skip directories without a manifest
  }
}

if (manifestPaths.length === 0) {
  console.error('No example manifests found under', EXAMPLES_DIR);
  process.exit(1);
}

const results = [];
for (const path of manifestPaths) {
  const rel = relative(ROOT, path);
  let manifest;
  try {
    manifest = JSON.parse(await readFile(path, 'utf8'));
  } catch (err) {
    results.push({ id: rel, ok: false, errors: [`parse error: ${err.message}`] });
    continue;
  }
  const ok = validate(manifest);
  results.push({
    id: manifest.id ?? rel,
    ok,
    errors: ok
      ? []
      : (validate.errors ?? []).map(
          (e) => `${e.instancePath || '/'} ${e.message}`,
        ),
  });
}

const colW = Math.max(8, ...results.map((r) => r.id.length));
const pad = (s, n) => String(s).padEnd(n);
console.log(`${pad('ID', colW)}  STATUS  DETAIL`);
console.log(`${'-'.repeat(colW)}  ------  ------`);
let failed = 0;
for (const r of results) {
  const status = r.ok ? 'PASS' : 'FAIL';
  const detail = r.ok ? '' : r.errors.join('; ');
  if (!r.ok) failed += 1;
  console.log(`${pad(r.id, colW)}  ${pad(status, 6)}  ${detail}`);
}

console.log('');
console.log(
  `Validated ${results.length} manifest(s); ${failed} failure(s).`,
);
process.exit(failed === 0 ? 0 : 1);
