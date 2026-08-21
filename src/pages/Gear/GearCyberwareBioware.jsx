import { useState } from 'react';

import { Section, GearTable, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';

import { formatAvailability, formatCost, formatEssence, formatCapacity, formatDamageValue, formatAttackRatings } from '@utils/gearFormat';
import { gearByTag } from '@utils/gearTags';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { useCharacterManager } from '@hooks/useCharacterManager';
import PurchaseModal from '@components/PurchaseModal';
import './gearBuyButton.css';

export default function GearCyberwareBioware({ character }) {
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

  const limbColumns = [
    { label: 'Limb', render: (i) => i.label },
    { label: 'Essence', render: formatEssence },
    { label: 'Capacity', render: formatCapacity },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const implantWeaponColumns = [
    { label: 'Weapon', render: (i) => i.label },
    { label: 'Essence', render: formatEssence },
    { label: 'Capacity', render: formatCapacity },
    { label: 'DV', render: formatDamageValue },
    { label: 'Attack Ratings (C/N/M/F/E)', render: formatAttackRatings },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const bioColumns = [
    { label: 'Item', render: (i) => i.label },
    { label: 'Essence', render: formatEssence },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];

  return (
    <>
      <CollapsibleSection id="gear-cw-limbs" title="Cyberlimbs" defaultOpen>
        <GearTable items={gearByTag('cyberlimb')} columns={limbColumns} />
        <Section title="Cyberlimb Accessories">
          <GearTable items={gearByTag('cyberlimb_accessory')} columns={limbColumns} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="gear-cw-implant-weapons" title="Cyber Implant Weapons">
        <GearTable items={gearByTag('implant_weapon')} columns={implantWeaponColumns} />
        <Section title="Firearm-Class Implants">
          <GearTable items={gearByTag('firearm_implant')} columns={limbColumns} />
          <Callout title="Bring Your Own Gun" variant="note">
            These make space — the actual firearm is bought separately from Gear &gt; Firearms/Explosives.
          </Callout>
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="gear-cw-bioware" title="Bioware">
        <GearTable items={gearByTag('bioware_basic')} columns={bioColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-cw-cultured" title="Cultured Bioware">
        <GearTable items={gearByTag('bioware_cultured')} columns={bioColumns} />
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
