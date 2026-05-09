# {{ProjectName}} — Claude Instructions

This workspace uses the **Company** profile of [Memex](https://github.com/anthril/memex). It is shaped for an organisation's internal knowledge base — people, teams, products, customers, policies, playbooks, meetings, decisions, and OKRs all live here.

## Agent contract

All agents working in this repo MUST follow [.memex/AGENTS.md](.memex/AGENTS.md) for documentation, folder placement, and feature-completion requirements.

The documentation system is enforced by hooks shipped in the `memex` Claude Code plugin. Edits that bypass it will be blocked at tool-call time.

## Key indices

- [.memex/index.md](.memex/index.md) — entry hub
- [.memex/about.md](.memex/about.md) — mission, team, locations
- [.memex/people/](.memex/people/) — one page per teammate
- [.memex/teams/](.memex/teams/) — team charters
- [.memex/products/](.memex/products/) — product/service pages
- [.memex/customers/](.memex/customers/) — CRM-lite (links into Lumioh CRM if relevant)
- [.memex/policies/](.memex/policies/) — HR, security, finance
- [.memex/playbooks/](.memex/playbooks/) — SOPs, runbooks
- [.memex/decisions/](.memex/decisions/) — company-level decisions (cf. ADR but business)
- [.memex/okrs/](.memex/okrs/) — quarterly OKRs
- [.memex/meetings/](.memex/meetings/) — chronological meeting notes
- [memex.config.json](memex.config.json) — schema (v2)

## Slash commands

The Memex plugin registers `/new-meeting`, `/new-decision`, `/new-okr` for this profile. They scaffold pages from `.templates/`.

## Project-specific additions
