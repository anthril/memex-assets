---
title: README
slug: readme
type: rule
status: active
created: 2026-05-10
updated: 2026-05-10
---

# Workspace map

Authored content lives under `.memex/`. The dot-prefixed folders are engine-managed; system tooling stores configuration, templates, tasks, and runtime state there.

| Folder | Purpose |
|---|---|
| `accounts/` | One folder per ad account. Each holds an `index.md` describing scope, naming convention, conversion-tracking setup, and integrations. |
| `audits/` | Date-stamped audits (`DDMMYYYY-HHMM`). Spawn a fresh folder per cycle from `.templates/google-ads-audit.md` or `meta-ads-audit.md`. |
| `optimisations/` | Implemented changes with before/after KPIs. |
| `.tasks/` | Outstanding optimisation tasks (audit-tasks). |
| `.review/` | Recommendations awaiting approval. |
| `.open-questions/` | Items raised during audit that still need an answer. |
| `.templates/` | Copy-paste audit checklists. |
| `.config/types/` | Per-type definitions (statuses, properties, templates). |
