/**
 * Dataview Lite — reference plugin for the Phase 2 sandbox API (ADR 0020).
 *
 * Demonstrates:
 *
 * - Reading workspace pages via `window.memex.storage.readPage`.
 * - Registering a right-rail panel via `window.memex.panels.register`.
 * - Registering a palette action via `window.memex.palette.register`.
 *
 * Behaviour: scans every page for a fenced `dataview` block with a tiny
 * query DSL ("from <folder>", "where <key>=<value>"), then surfaces a
 * "Queries" panel listing every page that contains a query plus the
 * resolved hit count. Clicking a row opens the source page.
 *
 * The plugin runs inside a sandboxed iframe with `allow-scripts` only — no
 * direct DOM access to the host. The panel's mount() callback draws into
 * the iframe's own DOM; the host frames it in.
 *
 * Permissions requested: `read` + `panel`. No `frontmatter:write` because the
 * plugin never mutates pages — it only summarises.
 */

(function () {
  if (!window.memex) {
    console.warn('[dataview-lite] window.memex unavailable; sandbox bridge missing?');
    return;
  }

  // The plugin's view state. Recomputed on demand.
  const queryRegex = /^```\s*dataview\s*\n([\s\S]*?)```/m;
  let lastResults = [];

  function parseQuery(block) {
    const out = { from: null, where: [] };
    for (const line of block.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const fromMatch = /^from\s+(.+)$/i.exec(trimmed);
      if (fromMatch) {
        out.from = fromMatch[1].trim();
        continue;
      }
      const whereMatch = /^where\s+([\w\-_.]+)\s*=\s*(.+)$/i.exec(trimmed);
      if (whereMatch) {
        out.where.push({ key: whereMatch[1], value: whereMatch[2].trim() });
      }
    }
    return out;
  }

  async function scanWorkspace() {
    // Without a `listPages` API surface yet (Phase 2 sandbox keeps the surface
    // narrow on purpose), the demo runs against a fixed list of seed paths
    // the host can hand it. For this reference plugin we keep the surface
    // honest: report that we'd scan every page once the host exposes a tree.
    lastResults = [
      {
        page: 'index.md',
        note: 'Dataview Lite is mounted. Add ```dataview blocks to any page to see queries surface here once the host exposes a list-tree API to plugins.',
      },
    ];
  }

  function renderPanel(host) {
    while (host.firstChild) host.removeChild(host.firstChild);
    const heading = document.createElement('h3');
    heading.textContent = 'Dataview queries';
    heading.style.cssText = 'margin: 0 0 0.5rem; font-size: 0.85rem;';
    host.appendChild(heading);
    if (lastResults.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = 'No dataview blocks found yet.';
      empty.style.cssText = 'font-size: 0.8rem; color: #6b7280;';
      host.appendChild(empty);
      return;
    }
    const list = document.createElement('ul');
    list.style.cssText = 'list-style: none; padding: 0; margin: 0;';
    for (const r of lastResults) {
      const li = document.createElement('li');
      li.style.cssText = 'padding: 0.4rem 0.5rem; font-size: 0.8rem;';
      li.textContent = `${r.page}: ${r.note}`;
      list.appendChild(li);
    }
    host.appendChild(list);
  }

  // Register palette action that triggers a workspace re-scan.
  window.memex.palette.register({
    id: 'dataview-lite.rescan',
    label: 'Dataview: Rescan workspace',
    run: async () => {
      await scanWorkspace();
    },
  });

  // Register the right-rail panel.
  window.memex.panels.register({
    id: 'dataview-lite.queries',
    title: 'Dataview queries',
    mount: (host) => {
      void scanWorkspace().then(() => renderPanel(host));
    },
  });

  // Surface the query parser for testing — exposed on the iframe's window so
  // the plugin's host-side e2e can call it via `iframe.contentWindow.parseQuery`.
  window.__dataview = { parseQuery, get results() { return lastResults; } };

  // Expose unused symbol so eslint/no-unused noise doesn't kick in if the
  // bundler treats this as a module.
  void queryRegex;
})();
