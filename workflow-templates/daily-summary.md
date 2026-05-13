---
title: Daily summary
slug: daily-summary
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
  cron: "0 9 * * *"
steps:
  - id: read-log
    action: page.read
    params:
      path: log.md
  - id: summarise
    action: llm.summarise
    params:
      input: ${read-log.body}
  - id: write-summary
    action: page.write
    params:
      path: daily/${trigger.at}.md
      content: |
        ---
        title: Daily summary ${trigger.at}
        type: summary
        status: active
        ---

        ${summarise.output}
---

# Daily summary

Reads `log.md` every morning at 09:00, summarises it via the workspace's
configured LLM provider, and writes the summary to `daily/<date>.md`.

## Permissions

- **workspace:read** — reading `log.md`
- **workspace:write** — creating the daily summary page
- **llm:invoke** — invoking the summariser

Activate from Settings → Workflows once you've reviewed the steps.
