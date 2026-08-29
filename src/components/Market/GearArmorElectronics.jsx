import { useState } from 'react';

import { Section, GearTable, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import PurchaseModal from '@components/PurchaseModal';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { formatAvailability, formatCost, formatCapacity } from '@utils/gearFormat';
import { gearByTag } from '@utils/gearTags';
import { resolveDeviceRating } from '@utils/augmentationEconomy';

import '@styles/gearBuyButton.css';

export default function GearArmorElectronics({  character, vehicle }) {
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

  const basicColumns = [
    { label: 'Item', render: (i) => i.label },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const armorColumns = [
    { label: 'Item', render: (i) => i.label },
    { label: 'Defense Rating', render: (i) => (i.stats.defenseRating != null ? `+${i.stats.defenseRating}` : '—') },
    { label: 'Capacity', render: formatCapacity },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const deviceColumns = [
    { label: 'Device', render: (i) => i.label },
    { label: 'Device Rating', render: (i) => resolveDeviceRating(i, {}) ?? '—' },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const opticalColumns = [
    { label: 'Item', render: (i) => i.label },
    { label: 'Capacity', render: formatCapacity },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const idColumns = [
    { label: 'Item', render: (i) => i.label },
    { label: 'Max Value', render: (i) => (i.stats.maxValue != null ? `${i.stats.maxValue.toLocaleString()}¥` : '—') },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];

  return (
    <>
      <CollapsibleSection id="gear-ae-clothing" title="Clothing">
        <GearTable items={gearByTag('clothing')} columns={basicColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-ae-armor" title="Armor">
        <GearTable items={gearByTag('armor_item')} columns={armorColumns} />
        <Section title="Armor Mods">
          <GearTable items={gearByTag('armor_mod')} columns={armorColumns} />
          <Callout title="Source Note" variant="note">Four of these five mods are missing an Availability value in the book's own table — left blank rather than guessed.</Callout>
        </Section>
        <Section title="Helmets & Shields">
          <GearTable items={gearByTag('helmet_shield')} columns={armorColumns} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="gear-ae-accessories" title="Electronics Accessories">
        <GearTable items={gearByTag('electronics_accessory')} columns={deviceColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-ae-rfid" title="RFID Tags">
        <GearTable items={gearByTag('rfid')} columns={deviceColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-ae-comms" title="Communications and Countermeasures">
        <GearTable items={gearByTag('comms_countermeasure')} columns={basicColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-ae-software" title="Software">
        <GearTable items={gearByTag('software')} columns={basicColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-ae-id" title="ID and Credit">
        <GearTable items={gearByTag('id_credit')} columns={idColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-ae-tools" title="Tools">
        <GearTable items={gearByTag('electronics_tool')} columns={basicColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-ae-optical" title="Optical and Imaging Devices">
        <GearTable items={gearByTag('optical_device')} columns={opticalColumns} />
        <Section title="Visual Enhancements">
          <GearTable items={gearByTag('visual_enhancement')} columns={opticalColumns} />
        </Section>
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
