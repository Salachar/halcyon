import { useState } from 'react';

import { Section, GearTable } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import PurchaseModal from '@components/PurchaseModal';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { formatAvailability, formatCost } from '@utils/gearFormat';
import { gearByTag } from '@utils/gearTags';
import '@styles/gearBuyButton.css';

// Renamed from GearFacilities.jsx — "Facilities" became "Additions"
// throughout (additions.js), matching the broader system rename.
// Same shape as every other GearXXX.jsx Market tab — buy it here, then
// attach it to a vehicle from that vehicle's own row on the Vehicles
// tab. Rigger Cocoon attaches directly to a vehicle's own native
// Upgrade Capacity now (Cockpit is gone as a purchasable Addition), so
// it shows under its own "Vehicle Upgrades (Direct)" group here rather
// than under any specific Addition.
export default function GearAdditions({ character }) {
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

  const columns = [
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

  const additions = gearByTag('addition');
  const upgrades = gearByTag('addition_upgrade');
  // Sectioned by which Addition each upgrade is meant for (additionType,
  // additions.js) — purely a display grouping, doesn't restrict what
  // can actually be attached anywhere. Rigger Cocoon has
  // additionType: null (attaches directly to a vehicle's native
  // Upgrade Capacity, not to any purchasable Addition), so it gets its
  // own group. Weapon Mounts/Drone Racks all share additionType:
  // 'hardpoint' (a generic marker, not any specific hardpoint_small/
  // standard/large/huge id — all 4 sizes accept the same upgrades,
  // nothing here is size-gated), so they get one shared "Hardpoint
  // Upgrades" group instead of being filtered per Addition id.
  const namedAdditions = additions.filter((a) => !a.tags?.includes('hardpoint'));
  const upgradesByAddition = namedAdditions.map((addition) => ({
    addition,
    upgrades: upgrades.filter((u) => u.additionType === addition.id),
  }));
  const directUpgrades = upgrades.filter((u) => u.additionType == null);
  const hardpointUpgrades = upgrades.filter((u) => u.additionType === 'hardpoint');

  return (
    <>
      <CollapsibleSection id="gear-additions" title="Additions" defaultOpen>
        <GearTable items={additions} columns={columns} />
        <Section>
          <p className="sr-gear-facilities-note">
            Addition slots (Addition Capacity) live on the vehicle itself — buy an Addition here, then attach it from that vehicle's row on the Vehicles tab. Vehicle Bay is a Storage Unit preferring vehicles/drones — attach one, then store other owned vehicles directly in it. Hardpoints (Small/Standard/Large/Huge) are Additions too, fully replacing the old weapon-mount system — attach weapon mounts, drone racks, and similar Upgrades to them below. Every Addition can take Upgrades through its own Upgrade Capacity.
          </p>
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="gear-addition-upgrades" title="Addition Upgrades">
        <Section>
          <p className="sr-gear-facilities-note">
            Attach any of these to an installed Addition from that Addition's own section on the Vehicles tab — soft-gated against that Addition's Upgrade Capacity, same as any other Capacity pool. This grouping is for browsing convenience only; nothing stops attaching an upgrade to a different Addition than the one it's listed under here.
          </p>
        </Section>

        {directUpgrades.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontWeight: 700, color: 'var(--sr-blue-bright)', fontSize: '0.85rem', margin: '0.5rem 0' }}>
              Vehicle Upgrades (Direct)
            </div>
            <GearTable items={directUpgrades} columns={upgradeColumns} />
          </div>
        )}

        {hardpointUpgrades.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontWeight: 700, color: 'var(--sr-blue-bright)', fontSize: '0.85rem', margin: '0.5rem 0' }}>
              Hardpoint Upgrades
            </div>
            <p className="sr-gear-facilities-note">
              Attaches to any Hardpoint (Small/Standard/Large/Huge) regardless of size — nothing here is size-gated.
            </p>
            <GearTable items={hardpointUpgrades} columns={upgradeColumns} />
          </div>
        )}

        {upgradesByAddition.map(({ addition, upgrades: additionUpgrades }) => (
          <div key={addition.id} style={{ marginBottom: '1rem' }}>
            <div style={{ fontWeight: 700, color: 'var(--sr-blue-bright)', fontSize: '0.85rem', margin: '0.5rem 0' }}>
              {addition.label}
            </div>
            {additionUpgrades.length === 0 ? (
              <Section>
                <p className="sr-gear-facilities-note">No upgrades confirmed yet for this Addition.</p>
              </Section>
            ) : (
              <GearTable items={additionUpgrades} columns={upgradeColumns} />
            )}
          </div>
        ))}
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
