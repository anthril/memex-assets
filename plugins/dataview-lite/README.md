# Dataview Lite

Reference plugin for the Memex Phase 2 sandbox API (ADR 0020). Distinct from
the broader Obsidian Dataview plugin — this is a **tiny** reference implementation
that exercises every Phase 2 sandbox capability: storage read, palette action
registration, panel registration. Use it as a template when building your own
plugin.

## Install (sideload)

Until the marketplace ships, copy `manifest.json` + `index.js` into your wiki at:

```
<wiki>/.plugins/dataview-lite/
├── manifest.json
└── index.js
```

Then enable it via Settings → Plugins.

## What it demonstrates

| Sandbox capability | Where in `index.js` |
|---|---|
| `window.memex.palette.register` | `Dataview: Rescan workspace` palette entry. |
| `window.memex.panels.register` | Right-rail "Dataview queries" panel. |
| `window.memex.storage.readPage` | _Not yet — the demo stops at the panel scaffold so it stays tiny._ |

## What it does **not** do

- Mutate pages (no `frontmatter:write` permission requested).
- Talk to network (no permission for that exists by design).
- Spin up a WebWorker — the plugin uses the renderer thread inside its iframe.
  WebWorker compute lands in a follow-up sandbox runtime per
  `actions/phase-5-plugin-worker-runtime.md`.

## Why it's a reference

The Phase 2 sandbox API surface is small on purpose — the iframe + postMessage
bridge has a narrow attack surface and a low cognitive load for plugin authors.
This plugin is the canonical example that shows what real plugins should look
like once the marketplace opens.
