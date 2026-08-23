import { useState } from 'react';

import { Section, GearTable, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';

import { formatAvailability, formatCost, formatEssence, formatCapacity } from '@utils/gearFormat';
import { gearByTag } from '@utils/gearTags';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { useCharacterManager } from '@hooks/useCharacterManager';
import PurchaseModal from '@components/PurchaseModal';
import { AUGMENTATION_GRADES } from '@data/gear/augmentations';
import { resolveDeviceRating } from '@utils/augmentationEconomy';

import './gearBuyButton.css';

export default function GearAugmentations({ character }) {
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
  const headwareColumns = [
    { label: 'Item', render: (i) => i.label },
    { label: 'Essence', render: formatEssence },
    { label: 'Capacity', render: formatCapacity },
    { label: 'Device Rating', render: (i) => resolveDeviceRating(i, {}) ?? '—' },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];

  return (
    <>
      <Callout title="Grades" variant="critical">
        {Object.entries(AUGMENTATION_GRADES).map(([grade, m]) => (
          <div key={grade} style={{ marginBottom: '0.25rem' }}>
            <strong style={{ textTransform: 'capitalize' }}>{grade}</strong>: Essence ×{m.essenceMultiplier}, Cost ×{m.costMultiplier}, Availability {m.availabilityModifier >= 0 ? '+' : ''}{m.availabilityModifier}
          </div>
        ))}
        Applies to every item below except Biotech Basics — grade is chosen when buying, in the purchase modal.
      </Callout>

      <CollapsibleSection id="gear-aug-biotech" title="Biotech Basics" defaultOpen>
        <GearTable items={gearByTag('biotech')} columns={basicColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-aug-headware" title="Headware">
        <GearTable items={gearByTag('headware')} columns={headwareColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-aug-eyeware" title="Eyeware">
        <GearTable items={gearByTag('eyeware')} columns={headwareColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-aug-earware" title="Earware">
        <GearTable items={gearByTag('earware')} columns={headwareColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-aug-bodyware" title="Bodyware">
        <GearTable items={gearByTag('bodyware')} columns={headwareColumns} />
        <Section>
          <Callout title="Not Yet on the Rules Tab" variant="note">
            Surgery/Recovery damage and Augmentation Overdrive are real rules covering everything on this page — they don't live in Rules yet.
          </Callout>
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
