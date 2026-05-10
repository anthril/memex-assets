# {{ProjectName}} — PPC audit & optimisation workspace

This workspace runs on the **PPC audit & optimisation** profile, scoped to Google Ads (Search, Shopping, Performance Max) and Meta Ads (Facebook + Instagram). It tracks accounts, audits, findings, recommendations, and experiments.

## Folder map

- `.memex/accounts/` — one folder per ad account; holds account-level docs, naming conventions, conversion-tracking notes.
- `.memex/audits/` — date-stamped audit reports. Spawn a fresh folder per audit cycle.
- `.memex/optimisations/` — implemented changes, KPI deltas, before/after notes.
- `.memex/.tasks/` — outstanding optimisation tasks (audit-tasks).
- `.memex/.review/` — recommendations awaiting approval.
- `.memex/.open-questions/` — unresolved items raised during audit.
- `.memex/.templates/` — copy-paste audit checklists for Google + Meta.
- `.memex/.config/types/` — per-type definitions (statuses, properties, templates).

## Workflow

1. **Audit kickoff.** Copy `.memex/.templates/google-ads-audit.md` and/or `.memex/.templates/meta-ads-audit.md` into `audits/<date>-<account>/`. Walk the checklist; every red flag becomes a `finding` page.
2. **Triage findings.** For each finding write a `recommendation` page. Status starts at `proposed`; flips to `approved` once stakeholder signs off.
3. **Implement + measure.** When a recommendation is implemented, log an `optimisation` page summarising what changed. If the change is hypothesis-driven, file an `experiment` page first; conclude it with the result.
4. **Weekly review.** Copy `.memex/.templates/monthly-review.md` (works at any cadence) into `optimisations/`; pull KPIs and link the closed/open recommendations.

## Status conventions

- **Audit / audit-task:** `draft → in-progress → done`
- **Finding:** `open → triaged → wont-fix | done`
- **Recommendation:** `proposed → approved → implemented | rejected`
- **Experiment:** `planned → running → concluded`

## Project-specific additions
