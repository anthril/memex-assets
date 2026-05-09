# Memex Plugin Templates (Profiles)

Curated starter workspaces for [Memex by Anthril](https://github.com/anthril/memex).

## What is this

Memex *plugin templates* — usually called **profiles** — define the initial shape of a Memex workspace:

- Top-level folders under `.memex/`
- Frontmatter schemas and required fields
- Sidebar / homepage / command-palette section filters (v2)
- Dated-folder rules (e.g. `meetings/DDMMYYYY-HHMM`)
- Naming exceptions, README-required globs, log entry format

Each profile is a **starting point**, not a straitjacket. After you create a workspace from a profile you can mix-and-match — add folders, edit `memex.config.json`, swap sections — without breaking the contract enforced by the Memex hooks.

## Catalogue

The eight bundled profiles:

| Profile | Schema | Use case | Headline folders |
|---|---|---|---|
| `generic` | v1 | Minimal default — flat `topics/` tree, useful for any project that just wants the agent contract and an index. | `topics/` |
| `personal-journal` | v1 | Daily journaling and reflection capture. | `raw/`, `wiki/`, `reflections/` |
| `book-companion` | v1 | Reading notes, chapter timelines, character/place wiki for one book. | `raw/`, `wiki/`, plus `timeline.md` |
| `research-project` | v1 | Software/research project with architecture, systems, and research streams. | `raw/`, `wiki/`, `research/`, `architecture/`, `systems/` |
| `research-wiki` | v1 | Lightweight wiki overlaid on raw research notes. | `raw/`, `wiki/` |
| `engineering-ops` | v1 | Ops-flavoured engineering workspace with audits, incidents, and planning. | `planning/`, `entities/`, `.audits/`, `.research/`, `.incidents/` |
| `company` | v2 | Internal company knowledge base — people, teams, products, customers, policies, playbooks, decisions, OKRs, meetings. | `people/`, `teams/`, `products/`, `customers/`, `policies/`, `playbooks/`, `meetings/`, `decisions/`, `okrs/` |
| `personal-knowledge-graph` | v2 | Zettelkasten / PKM with literature notes, fleeting notes, maps of content, and a daily journal. | `notes/`, `literature/`, `fleeting/`, `maps/`, `daily/` |

Schemas:
- **v1** — `allowedTopLevel` + flat `index.sections` array.
- **v2** — adds `sectionsV2` (filterable section definitions used by sidebar/homepage/command palette), `templates`, `plugins`, and richer `frontmatter.enum`.

See [`.memex/adr/0001-config-schema-v2.md`](https://github.com/anthril/memex/blob/main/.memex/adr/0001-config-schema-v2.md) for the schema rationale.

## How profiles are used

The Memex setup wizard copies the chosen profile into your workspace location and stamps in the project name (replacing `{{ProjectName}}` placeholders in `CLAUDE.md` and similar).

- Consumer: [`crates/memex-templates/`](https://github.com/anthril/memex/tree/main/crates/memex-templates) loads, lists, and instantiates profiles.
- Tauri bridge: [`apps/desktop/src/lib.rs::list_profile_templates`](https://github.com/anthril/memex/blob/main/apps/desktop/src/lib.rs) exposes the catalogue to the desktop UI.

After instantiation, the workspace is independent — editing `memex.config.json` in your workspace does not affect the template.

## Repo layout

```
assets/plugin-templates/
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── .github/workflows/validate.yml
├── .scripts/validate.mjs
└── <profile-name>/
    ├── memex.config.json   # required — schema v1 or v2
    ├── CLAUDE.md           # optional — Claude Code instructions
    ├── .gitignore          # optional — keeps user-data dirs out of the template
    └── .memex/             # optional starter tree (e.g. index.md, AGENTS.md)
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). PRs welcome — especially profiles for use cases not covered above.

## License

MIT — see [LICENSE](./LICENSE).
