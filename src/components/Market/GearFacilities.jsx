import { useState } from 'react';

import { Section, GearTable } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import PurchaseModal from '@components/PurchaseModal';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { formatAvailability, formatCost } from '@utils/gearFormat';
import { gearByTag } from '@utils/gearTags';
import '@styles/gearBuyButton.css';

// The missing piece — facilities.js's 7 items had data and an attach
// flow (CapacityAttachModal, wired in OwnedVehiclesList) but nowhere
// to actually BUY one first. Same shape as every other GearXXX.jsx
// Market tab (GearMagicalGoods, GearMatrixDevices) — buy it here, then
// attach it to a mothership vehicle from the Vehicles tab.
export default function GearFacilities({  character, vehicle }) {
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
    { label: 'Facility', render: (i) => i.label },
    { label: 'Slots Used', render: (i) => i.stats.facilityCapacityUsed },
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

  const facilities = gearByTag('facility');
  const upgrades = gearByTag('facility_upgrade');
  // Sectioned by which Facility each upgrade is meant for — facilityType
  // is a plain data field on each upgrade (facilities.js), purely for
  // this display grouping; it doesn't restrict what can actually be
  // attached anywhere. Facilities with zero real upgrades yet (Workshop,
  // Armory, Crew Quarters, Moon Pool, Weapons Facility) get an honest
  // "no upgrades yet" line instead of not appearing at all.
  const upgradesByFacility = facilities.map((facility) => ({
    facility,
    upgrades: upgrades.filter((u) => u.facilityType === facility.id),
  }));

  return (
    <>
      <CollapsibleSection id="gear-facilities" title="Facilities" defaultOpen>
        <GearTable items={facilities} columns={columns} />
        <Section>
          <p className="sr-gear-facilities-note">
            Facility slots (Facility Capacity) live on the mothership vehicle itself — buy a Facility here, then attach it from that vehicle's row on the Vehicles tab. Vehicle Bay is required before a vehicle can store other vehicles aboard it. Every Facility can take Upgrades below through its own Upgrade Capacity, attached from that Facility's own section on the Vehicles tab.
          </p>
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="gear-facility-upgrades" title="Facility Upgrades">
        <Section>
          <p className="sr-gear-facilities-note">
            Attach any of these to an installed Facility from that Facility's own section on the Vehicles tab — soft-gated against that Facility's Upgrade Capacity, same as any other Capacity pool in this app. This grouping is for browsing convenience only; nothing stops attaching an upgrade to a different Facility than the one it's listed under here.
          </p>
        </Section>
        {upgradesByFacility.map(({ facility, upgrades: facilityUpgrades }) => (
          <div key={facility.id} style={{ marginBottom: '1rem' }}>
            <div style={{ fontWeight: 700, color: 'var(--sr-blue-bright)', fontSize: '0.85rem', margin: '0.5rem 0' }}>
              {facility.label}
            </div>
            {facilityUpgrades.length === 0 ? (
              <Section>
                <p className="sr-gear-facilities-note">No upgrades confirmed yet for this Facility.</p>
              </Section>
            ) : (
              <GearTable items={facilityUpgrades} columns={upgradeColumns} />
            )}
          </div>
        ))}
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
