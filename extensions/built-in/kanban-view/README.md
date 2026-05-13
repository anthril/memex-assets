# Kanban View

Bundled view extension shipped with Memex (ADR 0038). Renders any section as a kanban board, columnising pages by their `status` frontmatter (To Do / In Progress / Done). Drag a card to update its status.

## Status

- **Bundled with Memex** — pre-installed on fresh workspaces via `memex.config.json#/extensions/builtinEnabled`.
- **Quick-bar entry** — appears in the sidebar quick bar (ADR 0038) under the Columns icon. Shortcut: `Mod+B`.
- **Disable** — Settings → Extensions → Kanban View. The bundle stays in tree; disabling only suppresses the entry points.

## Schema

The view treats `status` as the column key. Allowed values come from the workspace's `frontmatter.enum.status` (or `frontmatter.statusByType.<type>` per ADR 0035 when a per-type override is declared).

## Source

See `manifest.json` for the entry point declarations. The view module itself lives at `apps/web/src/lib/views/kanban/` in the desktop tree — bundled extensions are in-tree code referenced by manifest, not external sandboxed JS.
