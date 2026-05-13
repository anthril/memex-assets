---
title: Stale "needs review" tagger
slug: needs-review
type: workflow
status: draft
owner: unassigned
created: 2026-05-12
updated: 2026-05-12
permissions:
  - workspace:read
  - frontmatter:write
trigger:
  kind: schedule-interval
  intervalSecs: 86400
steps:
  - id: noop
    action: branch
    params:
      condition: "true"
      then: scheduled
---

# Needs review tagger

Daily 24-hour interval. The current scheduler is a stub — once the
[Phase 9.3 trigger / scheduler implementation lands](#) this workflow will
walk every page whose `updated:` is older than 30 days, stamp
`status: needs-review`, and emit one `workspace.log` entry per touched
page.

The template ships in `draft` so it doesn't dispatch by default.
