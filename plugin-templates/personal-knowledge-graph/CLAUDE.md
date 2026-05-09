# {{ProjectName}} — Claude Instructions

This workspace uses the **Personal Knowledge Graph** profile of [Memex](https://github.com/anthril/memex). Zettelkasten-flavoured: atomic notes, dense linking, daily journaling, source-grounded literature notes.

## Agent contract

All agents follow [.memex/AGENTS.md](.memex/AGENTS.md). Hooks enforce frontmatter discipline at tool-call time.

## Key indices

- [.memex/index.md](.memex/index.md) — top-level Map of Content (MOC) — this is the entry hub
- [.memex/notes/](.memex/notes/) — **atomic notes** (one idea per note, Zettel-style ID prefix)
- [.memex/literature/](.memex/literature/) — source-grounded notes (book/article excerpts + commentary)
- [.memex/fleeting/](.memex/fleeting/) — daily quick-capture, processed into `notes/`
- [.memex/maps/](.memex/maps/) — higher-level MOC pages, hand-curated
- [.memex/daily/](.memex/daily/) — `YYYY-MM-DD.md` daily journal
- [memex.config.json](memex.config.json) — schema (v2)

## Working principles

- **Wikilinks first.** Use `[[other-note]]` whenever referring to another idea — the graph view depends on dense linking.
- **One idea per note.** If a note grows past ~500 words and contains multiple distinct ideas, split it.
- **Tag with `#hashtag/sub`.** Tags are extracted from body and frontmatter.
- **Daily notes via Ctrl+Shift+D.** Captures fleeting thoughts; the user processes them into `notes/` later.

## Project-specific additions
