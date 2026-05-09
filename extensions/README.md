# Memex Extensions

Seed marketplace for **Memex extensions** — workspace-shape transforms that
reshape how a workspace looks and behaves without shipping executable code.

## What is this

A Memex *extension* is a declarative bundle that contributes one or more of:

- **Frontmatter schemas** — typed shapes for a kind of page (e.g. `task`,
  `project`, `contact`).
- **Views** — alternate renderings of a section (e.g. kanban, gallery,
  calendar) selected by frontmatter.
- **Panel packs** — collections of right-pane panels that surface relevant
  metadata for a profile or domain.
- **Palette additions** — pre-baked commands that streamline repetitive
  edits (e.g. *Move task to Done*).

Extensions are **distinct from plugins** (see [`.memex/adr/0004-plugin-api.md`](../../.memex/adr/0004-plugin-api.md)).
Plugins ship JavaScript that runs in the renderer and may write through the
permission-gated `MemexPluginAPI`. Extensions ship only manifest + JSON
assets — they have no executable surface, are safe to enable by default,
and are described fully by their manifest. The full extension contract is
defined in `.memex/adr/0018-extension-system.md` (lands alongside the
loader implementation).

## Catalogue

| Extension | Type | Summary | Profiles |
|---|---|---|---|
| [`kanban-view`](examples/kanban-view) | `view` | Columnises pages in a section by their `status` frontmatter. | `*` |
| [`project-management`](examples/project-management) | `workspace-transform` | Schemas + filters + palette actions for tasks, projects, milestones. | `*` |
| [`crm`](examples/crm) | `workspace-transform` | Schemas + filters for contacts, companies, deals. | `company`, `engineering-ops` |

## How extensions are loaded

When Memex opens a workspace it scans
`<workspace>/.memex/.extensions/<id>/manifest.json`. Each manifest is
validated against [`manifest.schema.json`](./manifest.schema.json). An
extension is **activated** only if its `id` appears in
`memex.config.json#/extensions/enabled`. Extensions disabled via
`memex.config.json#/extensions/disabled` are skipped even if listed as
enabled.

Ordering of contributions is deterministic — extensions are activated in
the order they appear in `enabled`, and conflicting entry points (e.g. two
extensions claiming the same view ID) cause the later extension to lose
that contribution; a warning surfaces in the extension browser.

## Repo layout

```
assets/extensions/
├── README.md                     # this file
├── CONTRIBUTING.md               # how to propose an extension
├── LICENSE                       # MIT
├── manifest.schema.json          # JSON Schema (draft-2020-12)
├── .scripts/
│   └── validate.mjs              # CI validator
├── .github/workflows/
│   └── validate.yml              # CI workflow
└── examples/
    └── <id>/
        ├── manifest.json         # required
        ├── README.md             # human-readable description
        └── schemas/              # optional, referenced by manifest.entryPoints.schemas
```

The example directories contain the manifest and any JSON assets the
manifest references. No JavaScript — extensions are intentionally
declarative.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). All submissions must pass the
JSON Schema validator (run automatically in CI).

## License

MIT — see [LICENSE](./LICENSE).
