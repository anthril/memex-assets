# Contributing to Memex Plugin Templates

Thanks for considering a profile contribution. Profiles are how Memex meets new use cases without bloating the core, so well-shaped community profiles are valuable.

## Proposing a new profile

1. Open a PR against `main` adding a new directory `<profile-name>/`.
2. In the PR description, include:
   - **Rationale** — why this profile, what gap it fills.
   - **Use case** — who would pick this profile in the setup wizard.
   - **Differences** vs. the closest existing profile (so we know it's not a near-duplicate).
3. CI ([`.github/workflows/validate.yml`](./.github/workflows/validate.yml)) will validate your `memex.config.json`. PRs cannot merge with a failing validator.

If you're unsure whether a profile belongs, open an issue first.

## Required files per profile

| File | Required | Notes |
|---|---|---|
| `memex.config.json` | yes | Schema v1 or v2. Validated in CI. |
| `.memex/index.md` | yes | Minimum starter tree — at least the index. |
| `CLAUDE.md` | optional | Claude Code instructions. Use `{{ProjectName}}` for the stamped name. |
| `.gitignore` | optional | Keep user-data folders out of the template tree (see Privacy below). |

## Schema requirements

Every `memex.config.json` must include:

- `version` — string, `"1"` or `"2"`.
- `profile` — non-empty string, must match the directory name.
- `root` — non-empty string, conventionally `".memex"`.
- `allowedTopLevel` (v1) **or** `sectionsV2` array (v2). v2 profiles still typically include `allowedTopLevel`.
- `frontmatter` — at minimum `appliesTo`, `required`, and any `enum` constraints.

Upstream schema lives in [`crates/memex-templates/`](https://github.com/anthril/memex/tree/main/crates/memex-templates) and the JSON Schema referenced by `$schema` in each config.

See [ADR 0001](https://github.com/anthril/memex/blob/main/.memex/adr/0001-config-schema-v2.md) for the v1 → v2 rationale.

## Validation

Local check (Node 18+):

```
node assets/plugin-templates/.scripts/validate.mjs
```

The same script runs in CI. It checks JSON validity, required fields, and v2-specific shape (`sectionsV2` must be an array). A richer validator is planned via the future `memex-validate-profile` binary in `crates/memex-templates/`.

## Naming

- Use **kebab-case**.
- Be **descriptive**, not cryptic. `bookkeeping-ledger` is good; `bk1` is not.
- Avoid trademarked names unless you own the trademark.

## Privacy

Profiles are public templates. They MUST NOT include:

- Personally identifiable information (PII)
- Real names of individuals or organisations
- Real customer / partner / vendor data
- Secrets, tokens, API keys, credentials
- Anything specific to your own workspace

Use a `.gitignore` inside the profile to keep **user-data** folders out of the template tree:

```
# Inside <profile>/.gitignore
.memex/.state/
.memex/.open-questions/
.memex/.rules/
```

These are populated at runtime in the user's workspace and are not template scaffolding.
