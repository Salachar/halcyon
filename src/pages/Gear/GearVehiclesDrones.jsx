import { useState } from 'react';

import { Section, GearTable } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import PurchaseModal from '@components/PurchaseModal';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { formatAvailability, formatCost } from '@utils/gearFormat';
import { gearByTag } from '@utils/gearTags';
import './gearBuyButton.css';

function formatHandling(i) {
  const h = i.stats.handling;
  return h.offRoad != null ? `${h.onRoad}/${h.offRoad}` : String(h.onRoad);
}
function formatSeats(i) {
  const s = i.stats.seats;
  if (s == null) return '—';
  if (typeof s === 'object') return `${s.crew} / ${s.total}`;
  return String(s);
}

export default function GearVehiclesDrones({ character }) {
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
    { label: 'Vehicle', render: (i) => i.label },
    { label: 'Handling', render: formatHandling },
    { label: 'Accel', render: (i) => i.stats.acceleration },
    { label: 'Speed Int.', render: (i) => i.stats.speedInterval },
    { label: 'Top Speed', render: (i) => i.stats.topSpeed },
    { label: 'Body', render: (i) => i.stats.body },
    { label: 'Armor', render: (i) => i.stats.armor },
    { label: 'Pilot', render: (i) => i.stats.pilot },
    { label: 'Sensor', render: (i) => i.stats.sensor },
    { label: 'Seats', render: formatSeats },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const modColumns = [
    { label: 'Modification', render: (i) => i.label },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];

  return (
    <>
      <CollapsibleSection id="gear-veh-bikes" title="Bikes">
        <GearTable items={gearByTag('bike')} columns={vehicleColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-veh-cars" title="Cars">
        <GearTable items={gearByTag('car')} columns={vehicleColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-veh-trucks" title="Trucks and Vans">
        <GearTable items={gearByTag('truck')} columns={vehicleColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-veh-boats" title="Boats">
        <GearTable items={gearByTag('boat')} columns={vehicleColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-veh-subs" title="Submarines">
        <GearTable items={gearByTag('submarine')} columns={vehicleColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-veh-fixedwing" title="Fixed-Wing Aircraft">
        <GearTable items={gearByTag('fixed_wing')} columns={vehicleColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-veh-rotorcraft" title="Rotorcraft">
        <GearTable items={gearByTag('rotorcraft')} columns={vehicleColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-veh-vtol" title="VTOL/VSTOL">
        <GearTable items={gearByTag('vtol')} columns={vehicleColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-veh-drones" title="Drones">
        <Section title="Microdrones">
          <GearTable items={gearByTag('microdrone')} columns={vehicleColumns} />
        </Section>
        <Section title="Minidrones">
          <GearTable items={gearByTag('minidrone')} columns={vehicleColumns} />
        </Section>
        <Section title="Small Drones">
          <GearTable items={gearByTag('small_drone')} columns={vehicleColumns} />
        </Section>
        <Section title="Medium Drones">
          <GearTable items={gearByTag('medium_drone')} columns={vehicleColumns} />
        </Section>
        <Section title="Large Drones">
          <GearTable items={gearByTag('large_drone')} columns={vehicleColumns} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="gear-veh-mods" title="Vehicle Modifications">
        <GearTable items={gearByTag('vehicle_mod')} columns={modColumns} />
      </CollapsibleSection>

      {purchaseItem && (
        <PurchaseModal
          item={purchaseItem}
          character={character}
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
