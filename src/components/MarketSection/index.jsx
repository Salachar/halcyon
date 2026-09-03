import { useState } from 'react';

import { CollapsibleSection } from '@components/CollapsibleSection';
import { GearTable } from '@components/PageComponents';
import { getStoredViewMode, setStoredViewMode } from '@utils/marketViewMode';

import ViewModeToggle from './ViewModeToggle';
import GearCardList from './GearCardList';
import GearCarousel from './GearCarousel';

import './marketSection.css';

const MODE_PRIORITY = ['table', 'card', 'carousel'];

// preferredDefault (defaultViewMode prop) wins if given and not itself
// excluded — otherwise falls through to the standard table-first
// priority order, same as before. This is only ever the STARTING
// point, not a lock — a stored per-user choice (getStoredViewMode)
// still overrides it on repeat visits, same as everything else here.
function resolveFallbackMode(excludedViewModes, preferredDefault) {
  if (preferredDefault && !excludedViewModes.includes(preferredDefault)) {
    return preferredDefault;
  }
  return MODE_PRIORITY.find((m) => !excludedViewModes.includes(m)) || 'table';
}

// Drop-in replacement for CollapsibleSection wherever a Market tab
// wants Table/Card/Carousel switching — same collapse behavior
// underneath (same component, same persistence), just with a
// ViewModeToggle riding in the existing headerExtra slot. Not a
// migration of every GearXXX.jsx tab yet — this is the reusable piece
// itself, adopted tab by tab from here.
//
// `columns` feeds GearTable unchanged for Table mode. `renderBuyButton`
// is meant to be the exact same function each GearXXX.jsx already
// builds for its table's buy column (buyColumn.render) — passed
// through as-is so Card/Carousel trigger the identical purchase flow,
// nothing duplicated.
//
// `defaultViewMode` lets a section open showier by default (e.g.
// Watercraft's image-heavy sections opening straight to Carousel)
// without changing what the first-ever visitor sees for sections that
// don't set it — omitting it preserves the original table-first
// behavior exactly.
//
// The stored mode is re-validated against excludedViewModes on every
// render, not just at load — if a section's exclusions change later
// and the previously-saved mode is no longer allowed, this falls back
// silently instead of trying to render a mode that's been turned off.
export default function MarketSection({
  id, title, items, columns, renderBuyButton, excludedViewModes = [], defaultOpen, defaultViewMode,
}) {
  const fallbackMode = resolveFallbackMode(excludedViewModes, defaultViewMode);
  const [mode, setMode] = useState(() => getStoredViewMode(id, fallbackMode));
  const effectiveMode = excludedViewModes.includes(mode) ? fallbackMode : mode;

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setStoredViewMode(id, newMode);
  };

  return (
    <CollapsibleSection
      id={id}
      title={title}
      defaultOpen={defaultOpen}
      headerExtra={
        <ViewModeToggle mode={effectiveMode} onChange={handleModeChange} excludedViewModes={excludedViewModes} />
      }
    >
      {effectiveMode === 'table' && <GearTable items={items} columns={columns} />}
      {effectiveMode === 'card' && <GearCardList items={items} renderBuyButton={renderBuyButton} />}
      {effectiveMode === 'carousel' && <GearCarousel items={items} renderBuyButton={renderBuyButton} />}
    </CollapsibleSection>
  );
}
