import { ALL_GEAR } from '@data/gear';
import DeviceRow from './DeviceRow';
import { PanCapacitySummary } from './PanPrimitives';
import { PAN_CATEGORY_LABELS } from '@utils/panGrouping';

import './matrixDevicesList.css';

// Flat top-level list of Matrix-category devices (commlinks/cyberdecks/
// M-TOC/RCC) — but each parent now nests its own attached Programs the
// same way CategorySection nests a Smartlink under Cybereyes, since
// Program Slots is the fourth Capacity pool (matrixCapacityProvided/
// matrixCapacityUsed) — same provider/consumer shape as armor/device/
// cyberware, just applied to a device instead of a limb or a jacket.
// A Capacity summary line shows on the parent whenever it actually
// provides Program Slots (0/0 renders nothing, same as PanCapacitySummary
// everywhere else). Primary always renders first when `primaryId` is
// given (Slaved context); Slavable has no primary concept, so that prop
// is just omitted there. "Make Primary" relabels to "Unset Primary" on
// whichever row IS the current Primary — see DeviceRow's own comment.
//
// `onAttachRequest(instanceId, pool)`, when provided, wires an "Attach"
// button onto each top-level device row — lets a Program get loaded
// directly from here instead of needing a trip to the character
// sheet's GearList first. Always pool 'matrix' here, since nothing but
// matrix-category devices ever appears in this list.
export default function MatrixDevicesList({ character, entries, showStatus, primaryId, onPromote, secondaryLabel, onSecondary, onAttachRequest, expandedId, setExpandedId, touch }) {
  if (entries.length === 0) return null;

  const ordered = primaryId
    ? [...entries].sort((a, b) => (a[0] === primaryId ? -1 : b[0] === primaryId ? 1 : 0))
    : entries;

  return (
    <div className="sr-pan-matrix-devices">
      <div className="sr-pan-category-title sr-pan-category-title--matrix">{PAN_CATEGORY_LABELS.matrix}</div>
      {ordered.map(([instanceId, entry]) => {
        const item = ALL_GEAR[entry.itemId];
        const attachments = character.gearManager.attachmentsOf(instanceId);
        return (
          <div key={instanceId}>
            <DeviceRow
              character={character}
              instanceId={instanceId}
              entry={entry}
              showStatus={showStatus}
              depth={0}
              onPromote={onPromote ? () => onPromote(instanceId) : null}
              isPrimary={instanceId === primaryId}
              secondaryLabel={secondaryLabel}
              onSecondary={() => onSecondary(instanceId)}
              onAttach={onAttachRequest ? () => onAttachRequest(instanceId, 'matrix') : null}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
              touch={touch}
            />
            {item && (
              <PanCapacitySummary housingItem={item} housingConfig={entry.config} attachments={attachments} pool="matrix" />
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
