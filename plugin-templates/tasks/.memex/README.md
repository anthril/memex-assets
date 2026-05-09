---
title: "{{ProjectName}} — Tasks"
slug: readme
type: rule
status: active
owner: human
date: 2026-05-09
created: 2026-05-09
updated: 2026-05-09
---

# {{ProjectName}}

A Memex **Tasks** workspace. Plan, prioritise, and ship work — Kanban for
status, Calendar for due dates, Timeline for sequencing.

## Files

- `index.md` — auto-maintained dashboard
- `log.md` — append-only activity log
- `tasks/` — one `.md` per task; frontmatter drives the views
- `epics/` — multi-task parents
- `milestones/` — release / sprint anchors
- `inbox/` — quick captures awaiting triage
- `archive/` — closed tasks

## How the views read a task

Switch the active tab's view (graph / kanban / calendar / timeline icons in the
tab strip) to see the same tasks rendered three ways:

- **Kanban** groups by `status:` (columns: backlog → planned → in-progress →
  blocked → in-review → done).
- **Calendar** plots tasks on their `date:` cell.
- **Timeline** sorts tasks along the `date:` X-axis, grouped by `tags:` /
  `type:` chips.

Edit a task's `status:` or `date:` frontmatter and all three views update on the
next save.

## Getting started

1. Capture a few raw todos into `inbox/`.
2. Promote one into `tasks/` with full frontmatter (see [CLAUDE.md](../CLAUDE.md)).
3. Open the Kanban view to drag it through statuses.

See the seed task at [`tasks/welcome.md`](tasks/welcome.md) for a working
example.
