import { formatCost } from '@utils/gearFormat';

// Shared identity+stats block for Card and Carousel modes — name,
// cost, description, then whatever stat columns the calling
// GearXXX.jsx already defined for Table mode (minus the first/name
// column and the last/buy column, sliced off by MarketSection before
// this ever sees them). Derived straight from the same `columns` array
// Table mode already uses, so nothing needs a second definition — that
// stays the single source of truth for what "a stat" is for a given
// item type, no rebuilding it per view mode.
//
// Cost is shown here too even though it's also in the columns array
// (and thus could appear a second time in the stat list below) — a
// small, harmless duplication rather than special-casing one column.
export default function GearStatsBlock({ item, statColumns }) {
  return (
    <div className="sr-gear-stats-block">
      <div className="sr-gear-stats-header">
        <span className="sr-gear-stats-name">{item.label}</span>
        <span className="sr-gear-stats-cost">{formatCost(item)}</span>
      </div>

      {item.description && <p className="sr-gear-stats-description">{item.description}</p>}

      {statColumns.length > 0 && (
        <div className="sr-gear-stats-list">
          {statColumns.map((col, i) => (
            <div key={i} className="sr-gear-stats-row">
              <span className="sr-gear-stats-label">{col.label}</span>
              <span className="sr-gear-stats-value">{col.render(item)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
