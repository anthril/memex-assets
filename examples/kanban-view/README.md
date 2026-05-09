# Kanban View

Renders any section as a kanban board by columnising its pages on the
`status` frontmatter field. Default columns are *To Do*, *In Progress*,
and *Done*; pages without a `status` value land in an *Unsorted* column.
Dragging a card between columns rewrites the page's `status` frontmatter
in place — that's why the manifest requests the `frontmatter:write`
permission.

![Kanban view screenshot placeholder](./screenshot.png)
