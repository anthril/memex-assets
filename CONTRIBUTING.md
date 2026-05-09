# Contributing a Memex Extension

Thanks for considering a contribution! Extensions are the easiest way to
share workspace-shape patterns (schemas, views, panel packs) with other
Memex users.

## Before you start

1. Read [`README.md`](./README.md) for the catalogue and how extensions
   are loaded.
2. Read [`manifest.schema.json`](./manifest.schema.json) — it is the
   normative contract for what a manifest may contain.
3. Make sure your idea is **declarative**. If you find yourself wanting to
   ship JavaScript, you want a *plugin* (ADR 0004), not an extension.

## Requirements for acceptance

- The `manifest.json` validates against `manifest.schema.json`. CI runs
  `npx ajv-cli validate -s manifest.schema.json -d "examples/*/manifest.json"`
  on every push and PR; failures block merge.
- The directory name and the manifest `id` are identical and **kebab-case**
  (`^[a-z][a-z0-9]*(-[a-z0-9]+)*$`).
- The manifest `version` follows [semver 2.0.0](https://semver.org/).
  Bump major on breaking changes (renamed schema fields, removed
  permissions).
- No PII or secrets in any file under your extension directory. The
  reviewer will reject anything containing tokens, real email addresses,
  customer names, etc. Use `example.com` and obviously-fake placeholders.
- Bundled assets stay **under 5 MB total** per extension. Extensions are
  metadata, not asset stores.
- Each extension ships a short `README.md` that explains what it does in
  plain language and (eventually) screenshots of the behaviour.
- Permissions in the manifest are **minimal**. Don't request
  `frontmatter:write` if you only contribute schemas.

## Naming

- `id`: kebab-case, descriptive, namespaced if necessary
  (e.g. `acme-incidents` rather than `incidents`).
- `name`: human-readable, may use spaces and capitalisation.
- Schema files inside `schemas/` use the singular noun for the kind they
  describe: `task.json`, `contact.json`, etc.

## Versioning

- Initial submission: `0.1.0`.
- Backwards-compatible additions: bump minor.
- Backwards-incompatible changes (schema field renames, removed filters,
  raised `minimumMemexVersion`): bump major.

## Local validation

From `assets/extensions/`:

```sh
npx ajv-cli validate -s manifest.schema.json -d "examples/*/manifest.json"
# or
node .scripts/validate.mjs
```

## License

By submitting, you agree your contribution is released under the MIT
licence in [LICENSE](./LICENSE).
