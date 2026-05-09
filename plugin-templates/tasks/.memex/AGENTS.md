---
title: Agents — Tasks workspace
slug: agents
type: rule
status: active
owner: human
date: 2026-05-09
created: 2026-05-09
updated: 2026-05-09
---

# Agents

Operating principles for Claude / co-pilots working in this workspace.

## Default behaviour

- Read [`README.md`](README.md) before any non-trivial action.
- One task per file. If you want to break a task down, create child tasks under
  the same `epic:` and link them from the parent's body.
- Every page you create or modify must keep its `updated:` field current.

## Status conventions

- `backlog` — captured, not yet planned for any sprint.
- `planned` — committed for the current cycle but not started.
- `in-progress` — actively being worked.
- `blocked` — waiting on something external; the body must explain on whom/what.
- `in-review` — ready for review / PR open.
- `done` — closed; archive after one week.

## Don't

- Don't change the `created:` field after the page is born.
- Don't bypass `status:` by deleting tasks; archive them instead so the timeline
  still reflects history.
- Don't put dates only in filenames — the views read `date:` as the canonical
  source. The filename prefix is a fallback for display sort, nothing more.
