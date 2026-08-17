export function filterCommands(commands, query) {
  if (!query.trim()) return commands;
  const q = query.toLowerCase();

  const filterEntries = (entries) => {
    const result = {};
    for (const [id, def] of Object.entries(entries)) {
      const titleMatch = id.toLowerCase().includes(q);
      const filteredChildren = def.related_commands
        ? filterEntries(def.related_commands)
        : {};
      const hasMatchingChildren = Object.keys(filteredChildren).length > 0;

      if (titleMatch || hasMatchingChildren) {
        result[id] = {
          ...def,
          related_commands: hasMatchingChildren ? filteredChildren : def.related_commands,
        };
      }
    }
    return result;
  };

  return filterEntries(commands);
}

export function deriveExpandedFromFilter(commands, prefix = '') {
  const expanded = {};
  for (const [id, def] of Object.entries(commands)) {
    const path = prefix ? `${prefix}/${id}` : id;
    expanded[path] = true;
    if (def.related_commands) {
      Object.assign(expanded, deriveExpandedFromFilter(def.related_commands, path));
    }
  }
  return expanded;
}

export function collapseSubtree(expandedRows, path) {
  const next = { ...expandedRows };
  for (const key of Object.keys(next)) {
    if (key === path || key.startsWith(path + '/')) {
      delete next[key];
    }
  }
  return next;
}

/**
 * Recursively walk the command tree, building a flat list of searchable
 * entries. Stops descending into any node that is locked (has a password
 * and has not been bypassed) — nothing behind a lock is indexed, including
 * the locked node's own descendants. The locked node itself IS included
 * (so the player can see "this exists and is locked"), but its children
 * are not.
 */
export function buildSearchIndex(tree, discoveredPasswords = {}, basePath = '', depth = 0) {
  let results = [];

  for (const [id, def] of Object.entries(tree)) {
    const path = basePath ? `${basePath}/${id}` : id;
    const hasBlocker = Boolean(def.password);
    const isBypassed = Boolean(discoveredPasswords[path]);

    results.push({
      id,
      path,
      depth,
      preview: def.preview ?? null,
      favicon: def.favicon ?? null,
      hasBlocker,
      isBypassed,
    });

    // Don't descend past a locked, unbypassed node.
    if (hasBlocker && !isBypassed) continue;

    if (def.related_commands && Object.keys(def.related_commands).length > 0) {
      results = results.concat(
        buildSearchIndex(def.related_commands, discoveredPasswords, path, depth + 1)
      );
    }
  }

  return results;
}

/**
 * Normalize a string for fuzzy-ish matching: lowercase, strip common
 * punctuation, trim whitespace.
 */
function normalize(str) {
  return String(str)
    .toLowerCase()
    .replace(/['’"`.,!?]/g, '')
    .trim();
}

/** Normalize and also strip all whitespace. */
function normalizeNoSpace(str) {
  return normalize(str).replace(/\s+/g, '');
}

/**
 * Filter a search index by query string. Matches against the entry's
 * display name (id) only, with normalization for punctuation/whitespace.
 * Returns up to `limit` results, best matches first.
 */
export function searchIndex_filter(index, query, limit = 20) {
  const q = normalize(query);
  if (!q) return [];

  const qNoSpace = normalizeNoSpace(query);

  const scored = [];
  for (const entry of index) {
    const name = normalize(entry.id);
    const nameNoSpace = normalizeNoSpace(entry.id);

    let score;
    if (name === q) score = 0;
    else if (name.startsWith(q)) score = 1;
    else if (name.includes(q)) score = 2;
    else if (qNoSpace && nameNoSpace.includes(qNoSpace)) score = 3;
    else score = -1;

    if (score >= 0) scored.push({ entry, score });
  }

  scored.sort((a, b) => a.score - b.score || a.entry.id.localeCompare(b.entry.id));

  return scored.slice(0, limit).map(x => x.entry);
}

/**
 * Given a full path like "a/b/c", return all ancestor paths plus the
 * path itself, in order from root to leaf:
 * ["a", "a/b", "a/b/c"]
 */
export function getAncestorPaths(path) {
  const parts = path.split('/');
  const result = [];
  for (let i = 0; i < parts.length; i++) {
    result.push(parts.slice(0, i + 1).join('/'));
  }
  return result;
}
