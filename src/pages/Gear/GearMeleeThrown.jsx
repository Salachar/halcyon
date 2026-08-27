import { useState } from 'react';

import { Section, GearTable } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';

import { formatDamageValue, formatAttackRatings, formatAvailability, formatCost } from '@utils/gearFormat';
import { gearByTag } from '@utils/gearTags';

import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { SKILLS } from '@data/character/skills';
import { useCharacterManager } from '@hooks/useCharacterManager';
import PurchaseModal from '@components/PurchaseModal';
import '@styles/gearBuyButton.css';

export default function GearMeleeThrown({ character }) {
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

  const weaponColumns = [
    { label: 'Weapon', render: (i) => i.label },
    { label: 'DV', render: formatDamageValue },
    { label: 'Attack Ratings (C/N/M/F/E)', render: formatAttackRatings },
    { label: 'Skill', render: (i) => SKILLS[i.stats.skill]?.label ?? i.stats.skill ?? '—' },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];

  const ammoColumns = [
    { label: 'Item', render: (i) => i.label },
    { label: 'Compatible With', render: (i) => i.stats.compatibleWith ?? '—' },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];

  return (
    <>
      <CollapsibleSection id="gear-melee-blades" title="Blades" defaultOpen>
        <GearTable items={gearByTag('blade')} columns={weaponColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-melee-clubs" title="Clubs">
        <GearTable items={gearByTag('club')} columns={weaponColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-melee-other" title="Other (Unarmed / Exotic)">
        <GearTable items={gearByTag('unarmed', 'exotic')} columns={weaponColumns} />
      </CollapsibleSection>
      <CollapsibleSection id="gear-melee-thrown" title="Thrown / Projectile">
        <Section>
          <GearTable items={gearByTag('thrown')} columns={weaponColumns} />
        </Section>
        <Section title="Ammo">
          <GearTable items={gearByTag('ammo')} columns={ammoColumns} />
        </Section>
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
