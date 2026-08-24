import { useState } from 'react';

import { Section, GearTable, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import PurchaseModal from '@components/PurchaseModal';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { formatAvailability, formatCost } from '@utils/gearFormat';
import { gearByTag } from '@utils/gearTags';
import './gearBuyButton.css';

export default function GearMagicalGoods({ character }) {
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

  const focusColumns = [
    { label: 'Focus', render: (i) => i.label },
    { label: 'Bonding Cost (Karma)', render: (i) => `Force × ${i.stats.bondingKarmaPerRating}` },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const formulaColumns = [
    { label: 'Formula', render: (i) => i.label },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const supplyColumns = [
    { label: 'Supply', render: (i) => i.label },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];

  return (
    <>
      <CollapsibleSection id="gear-magic-foci" title="Foci" defaultOpen>
        <GearTable items={gearByTag('focus')} columns={focusColumns} />
        <Section>
          <Callout title="Bonding" variant="note">
            Bonding cost is Karma, not Nuyen — spend it through the normal Karma controls on the character sheet once you decide to bond. Owning an unbonded focus is allowed; it just doesn't do anything yet.
          </Callout>
          <Callout title="Sub-Types" variant="note">
            Several focus categories have multiple named sub-effects (Enchanting: Alchemical/Disenchanting; Metamagic: Centering/Flexible Signature/Masking/Spell Shaping; Spell: four types, e.g. Counterspelling) chosen when the focus is created — pricing is identical within a category regardless of which is picked, so they're not separate catalog entries here.
          </Callout>
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="gear-magic-formulae" title="Formulae">
        <GearTable items={gearByTag('formula')} columns={formulaColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-magic-supplies" title="Magical Supplies">
        <GearTable items={gearByTag('magical_supply')} columns={supplyColumns} />
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
