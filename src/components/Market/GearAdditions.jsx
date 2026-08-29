import { useState } from 'react';

import { GearTable } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import PurchaseModal from '@components/PurchaseModal';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { formatAvailability, formatCost } from '@utils/gearFormat';
import { gearByTag } from '@utils/gearTags';
import '@styles/gearBuyButton.css';

// Reorganized to match GearVehicles.jsx's pattern — each Addition
// (room) gets its own CollapsibleSection, with the room itself shown
// as a single-row table, a plain banner divider, then that room's own
// Upgrades below it. Replaces the earlier two-giant-lists structure
// (all Additions, then a completely separate section listing every
// Upgrade grouped underneath) — this way a room and its content live
// together, browsable the same way Bikes/Cars/Trucks are.
//
// Hardpoints get their own combined section (all 4 sizes as rows,
// since their Upgrades aren't size-specific — nothing here is size-
// gated). Rigger Cocoon has no room to sit under (it attaches directly
// to a vehicle's native Upgrade Capacity, not a purchasable Addition),
// so it gets a small standalone section instead of a fake room row.
//
// E-Softs are real, purchasable Programs (category 'program', not
// 'addition_upgrade' — they attach via ProgramAttachPicker's Matrix
// Capacity pool, not the generic Upgrade pool at all) — shown under
// Comms/Sensor Array in their own banner, with their own column set
// (Program Slots Used, not Upgrade Slots Used) rather than mixed into
// the regular Upgrade table.
export default function GearAdditions({ character, vehicle }) {
  const [purchaseItem, setPurchaseItem] = useState(null);
  const { touch } = useCharacterManager();

  const buyColumn = {
    label: '',
    render: (item) => {
      const owned = character?.gearManager?.countOf(item.id) ?? 0;
      const affordable = canAffordItem(character, item);
      return (
        <div className="sr-gear-buy-cell">
          <button
            className={affordable ? 'sr-buy-btn' : 'sr-buy-btn sr-buy-btn--unaffordable'}
            onClick={() => setPurchaseItem(item)}
            title={`Buy ${item.label}`}
          >
            $
          </button>
          {owned > 0 && <span className="sr-gear-owned-badge">×{owned}</span>}
        </div>
      );
    },
  };

  const roomColumns = [
    { label: 'Addition', render: (i) => i.label },
    { label: 'Slots Used', render: (i) => i.stats?.additionCapacityUsed ?? '—' },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const upgradeColumns = [
    { label: 'Upgrade', render: (i) => i.label },
    { label: 'Slots Used', render: (i) => i.stats?.upgradeCapacityUsed ?? '—' },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const esoftColumns = [
    { label: 'E-Soft', render: (i) => i.label },
    { label: 'Program Slots Used', render: (i) => i.stats?.matrixCapacityUsed ?? '—' },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];

  const additions = gearByTag('addition');
  const upgrades = gearByTag('addition_upgrade');
  const esofts = gearByTag('esoft');

  const namedAdditions = additions.filter((a) => !a.tags?.includes('hardpoint'));
  const hardpoints = additions.filter((a) => a.tags?.includes('hardpoint'));
  const hardpointUpgrades = upgrades.filter((u) => u.additionType === 'hardpoint');
  const directUpgrades = upgrades.filter((u) => u.additionType == null);

  return (
    <>
      {namedAdditions.map((addition) => {
        const additionUpgrades = upgrades.filter((u) => u.additionType === addition.id);
        const additionEsofts = addition.id === 'comms_sensor_array' ? esofts : [];
        return (
          <CollapsibleSection key={addition.id} id={`gear-addition-${addition.id}`} title={addition.label}>
            <GearTable items={[addition]} columns={roomColumns} />

            {additionUpgrades.length > 0 && (
              <>
                <div className="sr-addition-banner">Upgrades</div>
                <GearTable items={additionUpgrades} columns={upgradeColumns} />
              </>
            )}

            {additionEsofts.length > 0 && (
              <>
                <div className="sr-addition-banner">E-Softs (Programs)</div>
                <GearTable items={additionEsofts} columns={esoftColumns} />
              </>
            )}
          </CollapsibleSection>
        );
      })}

      {hardpoints.length > 0 && (
        <CollapsibleSection id="gear-addition-hardpoints" title="Hardpoints">
          <GearTable items={hardpoints} columns={roomColumns} />
          {hardpointUpgrades.length > 0 && (
            <>
              <div className="sr-addition-banner">Upgrades (any size, not size-gated)</div>
              <GearTable items={hardpointUpgrades} columns={upgradeColumns} />
            </>
          )}
        </CollapsibleSection>
      )}

      {directUpgrades.length > 0 && (
        <CollapsibleSection id="gear-addition-direct" title="Vehicle Upgrades (Direct)">
          <GearTable items={directUpgrades} columns={upgradeColumns} />
        </CollapsibleSection>
      )}

      {purchaseItem && (
        <PurchaseModal
          item={purchaseItem}
          character={character}
          vehicle={vehicle}
          onClose={() => setPurchaseItem(null)}
          onPurchase={(purchase) => {
            commitPurchase(character, purchaseItem, purchase);
            touch();
            setPurchaseItem(null);
          }}
          onFreeGrab={(purchase) => {
            commitFreeGrab(character, purchaseItem, purchase);
            touch();
            setPurchaseItem(null);
          }}
        />
      )}
    </>
  );
}
