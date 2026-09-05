import { useState } from 'react';

import { GearTable } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import PurchaseModal from '@components/PurchaseModal';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { formatAvailability, formatCost } from '@utils/gearFormat';
import { formatHandling, formatSeats, formatAcceleration, formatSpeedInterval, formatTopSpeed } from '@utils/vehicleGearFormat';
import { gearByTag } from '@utils/gearTags';
import '@styles/gearBuyButton.css';

export default function GearDrones({ character, vehicle }) {
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

  const vehicleColumns = [
    { label: 'Drone', render: (i) => i.label },
    { label: 'Handling', render: formatHandling },
    { label: 'Accel', render: formatAcceleration },
    { label: 'Speed Int.', render: formatSpeedInterval },
    { label: 'Top Speed', render: formatTopSpeed },
    { label: 'Body', render: (i) => i.stats.body },
    { label: 'Armor', render: (i) => i.stats.armor },
    { label: 'Pilot', render: (i) => i.stats.pilot },
    { label: 'Sensor', render: (i) => i.stats.sensor },
    { label: 'Seats', render: formatSeats },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];

  return (
    <>
      <CollapsibleSection id="gear-drones-micro" title="Microdrones">
        <GearTable items={gearByTag('microdrone')} columns={vehicleColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-drones-mini" title="Minidrones">
        <GearTable items={gearByTag('minidrone')} columns={vehicleColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-drones-small" title="Small Drones">
        <GearTable items={gearByTag('small_drone')} columns={vehicleColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-drones-medium" title="Medium Drones">
        <GearTable items={gearByTag('medium_drone')} columns={vehicleColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-drones-large" title="Large Drones">
        <GearTable items={gearByTag('large_drone')} columns={vehicleColumns} />
      </CollapsibleSection>

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
