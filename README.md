# Memex Assets

Public catalogue of community-contributable building blocks for **Memex by
Anthril** — workspace knowledge bases editable from the desktop / web app.

> Looking for the desktop app? Installers + release notes live at
> [`anthril/memex-releases`](https://github.com/anthril/memex-releases).

This repo has three subdirectories, each with its own README + contribution
guide:

| Subtree | What lives here | Shipped by | Trigger |
|---|---|---|---|
| **[`plugin-templates/`](./plugin-templates)** | Workspace profiles — initial folder layout + `memex.config.json` + frontmatter rules + seed pages for a domain (engineering, research, tasks, etc.) | Baked into the desktop binary at compile time via `include_dir!` | Picked in the setup wizard when the user creates a new workspace |
| **[`plugins/`](./plugins)** | Executable JavaScript plugins that run inside a workspace and may write through the permission-gated `MemexPluginAPI` | Installed per-workspace into `<wks>/.memex/.plugins/<id>/` | User installs from the marketplace, or drops the folder in manually |
| **[`extensions/`](./extensions)** | Declarative bundles — frontmatter schemas, alternate views, panel packs, palette additions — manifest + JSON only, **no executable surface** | Installed per-workspace into `<wks>/.memex/.extensions/<id>/` | User installs from the marketplace |

## How the desktop app reads this repo

- **Plugin templates** are compile-time embedded — when the desktop crate
  builds, every file under `plugin-templates/` is baked into the binary so
  the setup wizard works offline. New templates land in the next release.
- **Plugins** and **extensions** are fetched at runtime by the Memex
  marketplace API (`/api/v1/marketplace/extensions`) which reads
  [`index.json`](./index.json) at this repo's `main` branch via the
  `raw.githubusercontent.com` CDN, with a 5-minute cache layer in front.
  Edits to `index.json` go live within five minutes of merge.

## Development workflow

This repo is consumed by the Memex monorepo as a **git submodule** at
`assets/`. To work on Memex against your local edits:

```bash
# In the parent repo:
cd memex
git submodule update --init --recursive

# Make changes inside assets/ (the submodule) — git treats it as a separate repo
cd assets
git checkout main
# edit, commit, push to anthril/memex-assets

# Back in the parent: record the new submodule SHA
cd ..
git add assets
git commit -m "chore(assets): bump submodule"
```

Or, if you only want to ship a new extension / plugin without touching the
parent app:

```bash
git clone https://github.com/anthril/memex-assets
cd memex-assets
# add your contribution under extensions/examples/<id>/ etc.
# run validators, open a PR
```

## Repo layout

```
.
├── README.md                       this file
├── LICENSE                         MIT (covers everything in this repo)
├── index.json                      machine-readable top-level catalogue
├── .scripts/validate.mjs           runs every per-subtree validator
├── .github/workflows/validate.yml  CI gate on every PR
├── plugin-templates/               (see plugin-templates/README.md)
├── plugins/                        (see plugins/README.md ↗ TBD)
└── extensions/                     (see extensions/README.md)
```

## Contributing

Fork the repo, open a PR. CI validates every manifest + the top-level
catalogue. See the per-subtree CONTRIBUTING files for the rules specific to
plugins / templates / extensions.

## License

MIT — see [LICENSE](./LICENSE). Subtrees inherit the same licence unless
their own LICENSE file says otherwise.
