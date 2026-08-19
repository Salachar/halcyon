import { ALL_GEAR } from '@data/gear';
import { useCharacterManager } from '@hooks/useCharacterManager';

import './gearList.css';

// Just enough to show what a purchase config resolved to — matches the
// same three shapes used everywhere else a config gets displayed
// (PurchaseModal's stepper, GearTable columns).
function formatConfig(config) {
  if (!config) return null;
  if (config.rating != null) return `Rating ${config.rating}`;
  if (config.capacity != null) return `Capacity ${config.capacity}`;
  if (config.units != null) return `${config.units} unit${config.units === 1 ? '' : 's'}`;
  return null;
}

// character.gear is keyed by item id — { [itemId]: { quantity, config } }.
// Resolved against ALL_GEAR for display; an id with no match in ALL_GEAR
// (stale data, a renamed item) is skipped rather than crashing the row.
export default function GearList({ character }) {
  const { touch } = useCharacterManager();
  const ownedIds = Object.keys(character.gear);

  const handleRemove = (itemId) => {
    character.removeGear(itemId, 1);
    touch();
  };

  if (ownedIds.length === 0) {
    return <p className="sr-gear-list-empty">No gear owned yet — buy something from the Gear tab.</p>;
  }

  return (
    <div className="sr-gear-list">
      {ownedIds.map((itemId) => {
        const entry = character.gear[itemId];
        const item = ALL_GEAR[itemId];
        if (!item) return null;
        const configLabel = formatConfig(entry.config);

        return (
          <div className="sr-gear-list-row" key={itemId}>
            <div className="sr-gear-list-identity">
              <div className="sr-gear-list-name">{item.label}</div>
              {configLabel && <div className="sr-gear-list-config">{configLabel}</div>}
            </div>
            <div className="sr-gear-list-quantity">×{entry.quantity}</div>
            <button className="sr-icon-btn" onClick={() => handleRemove(itemId)} title="Remove one">−</button>
          </div>
        );
      })}
    </div>
  );
}
