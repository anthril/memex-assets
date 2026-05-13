---
title: Manual test workflow
slug: manual-test
type: workflow
status: active
owner: unassigned
created: 2026-05-12
updated: 2026-05-12
permissions: []
trigger:
  kind: manual
steps:
  - id: greet
    action: branch
    params:
      condition: "${user.name}"
      then: "Hello, ${user.name}!"
      else: "Hello, anonymous!"
  - id: pause
    action: await
    params:
      seconds: 1
---

# Manual test workflow

The simplest possible workflow — no triggers, no LLM, no network.
Click "Run" from the workflow editor or palette to dispatch.

Use this template to confirm the runtime is wired (permission gating,
context interpolation, step trace) before authoring something heavier.
