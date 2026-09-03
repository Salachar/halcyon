import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import GearCatalogueFeature from './GearCatalogueFeature';

// One item at a time, paged with prev/next arrows. Position is
// deliberately NOT persisted (only the chosen view mode is) — every
// visit starts back at the first item, same as any other transient UI
// state elsewhere in this app. Index/count shown as plain text for
// now ("3 / 12") — dots or mini-previews are a real possibility later,
// but starting simple per the ask.
export default function GearCarousel({ items, renderBuyButton }) {
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
    <div className="sr-carousel">
      <div className="sr-carousel-nav">
        <button
          className="sr-icon-btn"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={clampedIndex === 0}
          aria-label="Previous"
        >
          <ChevronLeftIcon />
        </button>
        <span className="sr-carousel-index">{clampedIndex + 1} / {items.length}</span>
        <button
          className="sr-icon-btn"
          onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
          disabled={clampedIndex === items.length - 1}
          aria-label="Next"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <GearCatalogueFeature item={item} renderBuyButton={renderBuyButton} />
    </div>
  );
}
