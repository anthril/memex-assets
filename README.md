# Memex Extensions

Public catalogue of **Memex extensions** — declarative bundles that reshape
how a Memex workspace looks and behaves without shipping executable code.

The Memex desktop app fetches `index.json` from this repo's `main` branch on
each Marketplace open and lists what's available; users install one with a
single click and the desktop client downloads the manifest + assets directly
from `examples/<id>/` here.

> Looking for the Memex desktop app? Installers live at
> [`anthril/memex-releases`](https://github.com/anthril/memex-releases).

## What is an extension?

A declarative bundle that contributes one or more of:

- **Frontmatter schemas** — typed shapes for a kind of page (e.g. `task`,
  `project`, `contact`).
- **Views** — alternate renderings of a section (e.g. kanban, gallery,
  calendar) selected by frontmatter.
- **Panel packs** — collections of right-pane panels that surface relevant
  metadata for a profile or domain.
- **Palette additions** — pre-baked commands that streamline repetitive
  edits (e.g. *Move task to Done*).

Extensions are **distinct from plugins**. Plugins ship JavaScript that runs
in the renderer; extensions ship only manifest + JSON assets. Extensions
have no executable surface, are safe to enable by default, and are described
fully by their manifest.

## Catalogue

| Extension | Type | Summary |
|---|---|---|
| [`crm`](examples/crm) | `workspace-transform` | Schemas + filters for contacts, companies, deals. |
| [`kanban-view`](examples/kanban-view) | `view` | Columnises pages in a section by their `status` frontmatter. |
| [`project-management`](examples/project-management) | `workspace-transform` | Schemas + filters + palette actions for tasks, projects, milestones. |

The same data is served as machine-readable JSON at
[`index.json`](./index.json).

## How extensions install

When you click **Install** in the Memex desktop app's Marketplace tab, the
client:

1. Reads `index.json` from this repo via `https://raw.githubusercontent.com/anthril/memex-extensions/main/index.json`.
2. Downloads the chosen extension's `manifest.json` and any referenced
   schema / view JSON files.
3. Validates the manifest against [`manifest.schema.json`](./manifest.schema.json).
4. Writes the bundle to your workspace at
   `<workspace>/.memex/.extensions/<id>/`.
5. Adds the id to `memex.config.json#/extensions/enabled` so the extension
   activates on next workspace open.

Extensions disabled via `memex.config.json#/extensions/disabled` are skipped
even if listed as enabled. Ordering is deterministic by `enabled` array
position.

## Repo layout

```
.
├── README.md                     this file
├── CONTRIBUTING.md               how to propose an extension
├── LICENSE                       MIT
├── manifest.schema.json          JSON Schema (draft-2020-12)
├── index.json                    machine-readable catalogue (Memex client reads this)
├── .scripts/validate.mjs         catalogue + manifest validator (run by CI)
└── examples/
    └── <id>/
        ├── manifest.json         required
        ├── README.md             human-readable description
        └── schemas/ | views/     optional, referenced by manifest entry points
```

## Contributing

1. Fork the repo.
2. Add `examples/<your-id>/manifest.json` (and any JSON assets it references).
3. Add an entry to `index.json`.
4. Run `node .scripts/validate.mjs` locally.
5. Open a PR. CI validates the manifest + index entry; merge requires green CI.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full review process.

## Why a public repo, not an opaque marketplace?

- Every byte the desktop client installs is auditable in the open.
- Anyone can fork and self-host their own extension catalogue by setting
  `MEMEX_EXTENSIONS_INDEX_URL` in the desktop preferences.
- Versioning is git-native — bump `version` in `manifest.json` and reference
  a new tarball; users see the upgrade on next Marketplace refresh.

## License

MIT — see [LICENSE](./LICENSE).
