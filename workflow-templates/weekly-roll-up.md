---
title: Weekly roll-up
slug: weekly-roll-up
type: workflow
status: draft
owner: unassigned
created: 2026-05-12
updated: 2026-05-12
permissions:
  - workspace:read
  - workspace:write
  - llm:invoke
trigger:
  kind: schedule-cron
  cron: "0 17 * * fri"
steps:
  - id: read-log
    action: page.read
    params:
      path: log.md
  - id: weekly-summary
    action: llm.complete
    params:
      system: "Summarise the past 7 days of log entries into 5 bullet points: what shipped, what's stuck, what's planned."
      prompt: ${read-log.body}
      max_tokens: 400
  - id: append-roll-up
    action: workspace.log
    params:
      event: weekly-roll-up
      subject: "Week ending ${trigger.at}"
      body: ${weekly-summary.output}
---

# Weekly roll-up

Friday 17:00. Reads `log.md`, asks the LLM for a 5-bullet summary of the
week, and appends the result back to `log.md` as a `weekly-roll-up` event.
