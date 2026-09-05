import { useState } from 'react';

import GearCatalogueFeature from './GearCatalogueFeature';

// Pure paging state now — all rendering lives in GearCatalogueFeature.
// Position is deliberately NOT persisted (only the chosen view mode
// is) — every visit starts back at the first item, same as any other
// transient UI state elsewhere in this app.
export default function GearCarousel({ items, statColumns, renderBuyButton }) {
  const [index, setIndex] = useState(0);

  if (items.length === 0) {
    return <p className="sr-veh-hint">Nothing to show here.</p>;
  }

  // Defensive clamp — items is re-derived fresh on most renders (e.g.
  // gearByTag), so its length can change out from under a stale index
  // rather than the array simply mutating in place.
  const clampedIndex = Math.min(index, items.length - 1);
  const item = items[clampedIndex];

  return (
    <GearCatalogueFeature
      item={item}
      statColumns={statColumns}
      renderBuyButton={renderBuyButton}
      onPrev={() => setIndex((i) => Math.max(0, i - 1))}
      onNext={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
      canPrev={clampedIndex > 0}
      canNext={clampedIndex < items.length - 1}
      indexLabel={`${clampedIndex + 1} / ${items.length}`}
    />
  );
}
