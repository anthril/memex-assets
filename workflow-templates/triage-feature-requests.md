---
title: Triage incoming feature requests
slug: triage-feature-requests
type: workflow
status: draft
owner: unassigned
created: 2026-05-12
updated: 2026-05-12
permissions:
  - workspace:read
  - frontmatter:write
  - llm:invoke
trigger:
  kind: frontmatter-write
  matches:
    type: feature-request
    status: incoming
steps:
  - id: read
    action: page.read
    params:
      path: ${trigger.path}
  - id: classify
    action: llm.classify
    params:
      input: ${read.body}
      categories:
        - bug
        - feature
        - support
      prompt: Categorise this feature request.
  - id: route
    action: page.setFrontmatter
    params:
      path: ${trigger.path}
      key: category
      value: ${classify.output}
  - id: mark-triaged
    action: page.setFrontmatter
    params:
      path: ${trigger.path}
      key: status
      value: triaged
---

# Triage incoming feature requests

Fires when a page with `type: feature-request, status: incoming` is saved.
Classifies the body into bug / feature / support via the LLM and stamps the
result onto the page's `category` frontmatter field.

Toggle `status: active` in frontmatter to enable.
