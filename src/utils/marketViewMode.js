// View-mode persistence for MarketSection — same exact pattern as
// CollapsibleSection's own collapse-state storage (one JSON blob,
// keyed by section id), kept in its own small file since I don't have
// localStorage.js loaded this session. Worth consolidating this
// constant into that file alongside HALCYON_COLLAPSED_SECTIONS_KEY
// whenever it's next touched — not urgent, just tidier long-term.

const HALCYON_MARKET_VIEW_MODES_KEY = 'halcyon_market_view_modes';

function readViewModes() {
  try {
    const stored = localStorage.getItem(HALCYON_MARKET_VIEW_MODES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function writeViewMode(id, mode) {
  try {
    const modes = readViewModes();
    modes[id] = mode;
    localStorage.setItem(HALCYON_MARKET_VIEW_MODES_KEY, JSON.stringify(modes));
  } catch (e) {
    console.error('Failed to save market view mode:', e);
  }
}

// Only the mode itself persists — carousel position is NOT tracked,
// resets to the first item every visit, same as any other transient
// UI state elsewhere in this app.
export function getStoredViewMode(id, fallback) {
  const saved = readViewModes()[id];
  return saved !== undefined ? saved : fallback;
}

export function setStoredViewMode(id, mode) {
  writeViewMode(id, mode);
}
