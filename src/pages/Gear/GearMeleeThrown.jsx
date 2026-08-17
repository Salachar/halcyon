import { useState } from 'react';

import { Section, GearTable } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import { formatDamageValue, formatAttackRatings, formatAvailability, formatCost } from '@utils/gearFormat';
import { gearByTag } from './gearTags';
import { SKILLS } from '@data/character/skills';
import PurchaseModal from './PurchaseModal';

export default function GearMeleeThrown({ character }) {
  const [purchaseItem, setPurchaseItem] = useState(null);

  const buyColumn = {
    label: '',
    render: (item) => (
      <button className="sr-buy-btn" onClick={() => setPurchaseItem(item)} title={`Buy ${item.label}`}>$</button>
    ),
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
      <CollapsibleSection id="gear-melee-blades" title="Blades">
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
            // TODO: character.purchaseItem(purchase) once Character exists —
            // deduct nuyen, add { itemId, ...config } to inventory.
            console.log('purchase', purchase);
            setPurchaseItem(null);
          }}
        />
      )}
    </>
  );
}
