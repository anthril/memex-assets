---
title: Tasks workspace — Claude Code playbook
slug: claude-tasks
type: rule
status: active
owner: human
date: 2026-05-09
created: 2026-05-09
updated: 2026-05-09
---

# Claude Code playbook — `{{ProjectName}}`

You are working in a Memex **Tasks** workspace. The shape:

```
.memex/
  index.md          ← derived dashboard, do not hand-edit
  log.md            ← append every notable change here
  tasks/            ← one .md per task, frontmatter drives Kanban + Calendar + Timeline
  epics/            ← parent issues; reference child tasks via wikilinks
  milestones/       ← release / sprint anchors with target dates
  inbox/            ← unprocessed captures; promote to tasks/ once triaged
  archive/          ← `status: done` items moved here on close
  .open-questions/  ← unresolved blockers / follow-ups
```

## Frontmatter contract — read carefully

Every task / epic / milestone page MUST declare:

| Field      | Required | Example                | Drives                                   |
|------------|----------|------------------------|------------------------------------------|
| `title`    | yes      | `"Fix login race"`     | Page title, list view label              |
| `slug`     | yes      | `fix-login-race`       | Filename + URL slug                      |
| `type`     | yes      | `task`                 | View filter; one of task/epic/milestone/bug/spike/chore |
| `status`   | yes      | `in-progress`          | Kanban column; one of backlog/planned/in-progress/blocked/in-review/done |
| `owner`    | yes      | `alice`                | Card chip; "@me" assignment              |
| `date`     | yes      | `2026-05-09`           | Calendar slot + Timeline X-axis position |
| `created`  | yes      | `2026-05-09`           | Audit / age sort                         |
| `updated`  | yes      | `2026-05-09`           | Last-touched age indicator               |
| `priority` | optional | `p1`                   | Card chip; sort weight                   |
| `tags`     | optional | `["auth","backend"]`   | Filter chips across all three views      |
| `epic`     | optional | `epic/user-auth`       | Wikilink-style parent reference          |

## Workflow

1. Capture into `inbox/` when you need a placeholder; status `backlog`.
2. Triage daily — promote inbox items into `tasks/` with full frontmatter.
3. Move work through statuses on the **Kanban** board (drag column → status change).
4. Use **Calendar** for due dates and sprint planning; tasks land on their `date:`.
5. Use **Timeline** for sequencing across milestones; the X-axis is `date:`.
6. On close: `status: done` and (optional) move file into `archive/`.

## Naming

`tasks/<status-prefix>-<slug>.md` is fine, but **the source of truth is the
`status:` frontmatter, not the filename**. Renaming a file does not change the
Kanban column — editing the frontmatter does.

If your project does sprints, prefix files with `YYYY-MM-DD-` so they sort
chronologically in the file tree:

```
tasks/2026-05-09-fix-login-race.md
```

The Calendar/Timeline date extractor will use the prefix as a fallback when no
explicit `date:` field is present, but explicit `date:` always wins.
