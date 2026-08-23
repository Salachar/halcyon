import { ALL_GEAR } from '@data/gear';
import { isHousingFor } from '@utils/gearCapacity';
import DeviceRow from './DeviceRow';
import { PanCapacitySummary } from './PanPrimitives';
import { PAN_CATEGORY_LABELS } from '@utils/panGrouping';

import './categorySection.css';

const CAPACITY_POOLS = ['armor', 'device', 'cyberware'];

// A full category zone (Cyberware / Weapons / Gear) — parents get a
// DeviceRow, their attachments render immediately after at depth+1.
// Matrix-category devices (commlinks/cyberdecks) never route through
// here — they live in their own MatrixDevicesList instead, so this
// only ever sees cyberware/weapons/gear.
//
// Capacity summary now shown here too, for parity with
// MatrixDevicesList's Program Slots readout — whichever of
// armor/device/cyberware the item actually provides (an item only ever
// houses one pool), or nothing at all for items with no capacity
// concept (a plain firearm, say). `onAttachRequest(instanceId, pool)`
// wires the same "Attach" button MatrixDevicesList has, whenever a row
// is actually a housing for something.
export default function CategorySection({ category, entries, character, showStatus, onPromote, secondaryLabel, onSecondary, onAttachRequest, expandedId, setExpandedId, touch }) {
  if (entries.length === 0) return null;
  return (
    <div className="sr-pan-category">
      <div className={`sr-pan-category-title sr-pan-category-title--${category}`}>{PAN_CATEGORY_LABELS[category]}</div>
      {entries.map(([instanceId, entry]) => {
        const item = ALL_GEAR[entry.itemId];
        const attachments = character.gearManager.attachmentsOf(instanceId);
        const housingPool = item ? CAPACITY_POOLS.find((pool) => isHousingFor(item, pool)) : null;
        return (
          <div key={instanceId}>
            <DeviceRow
              character={character}
              instanceId={instanceId}
              entry={entry}
              showStatus={showStatus}
              depth={0}
              onPromote={onPromote ? () => onPromote(instanceId) : null}
              secondaryLabel={secondaryLabel}
              onSecondary={() => onSecondary(instanceId)}
              onAttach={housingPool && onAttachRequest ? () => onAttachRequest(instanceId, housingPool) : null}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
              touch={touch}
            />
            {housingPool && item && (
              <PanCapacitySummary housingItem={item} housingConfig={entry.config} attachments={attachments} pool={housingPool} />
            )}
            {attachments.map(([attId, attEntry]) => (
              <DeviceRow
                key={attId}
                character={character}
                instanceId={attId}
                entry={attEntry}
                showStatus={showStatus}
                depth={1}
                secondaryLabel={secondaryLabel}
                onSecondary={() => onSecondary(attId)}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
                touch={touch}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
