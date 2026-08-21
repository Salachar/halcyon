import { useState } from 'react';

import { Section, GearTable, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import PurchaseModal from '@components/PurchaseModal';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { formatAvailability, formatCost } from '@utils/gearFormat';
import { gearByTag } from '@utils/gearTags';
import './gearBuyButton.css';

export default function GearMatrixDevices({ character }) {
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

  const commlinkColumns = [
    { label: 'Commlink', render: (i) => i.label },
    { label: 'Device Rating', render: (i) => i.stats.deviceRating },
    { label: 'Data Processing', render: (i) => i.stats.dataProcessing },
    { label: 'Firewall', render: (i) => i.stats.firewall },
    { label: 'Program Slots', render: (i) => i.stats.programSlots },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const cyberdeckColumns = [
    { label: 'Cyberdeck', render: (i) => i.label },
    { label: 'Device Rating', render: (i) => i.stats.deviceRating },
    { label: 'Attack', render: (i) => i.stats.attack },
    { label: 'Sleaze', render: (i) => i.stats.sleaze },
    { label: 'Program Slots', render: (i) => i.stats.programSlots },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];

  return (
    <>
      <CollapsibleSection id="gear-matrix-commlinks" title="Commlinks" defaultOpen>
        <GearTable items={gearByTag('commlink')} columns={commlinkColumns} />
        <Section>
          <Callout title="Data Processing / Firewall" variant="note">
            Two of the four Matrix Attributes — most people's whole Matrix presence runs through a commlink, not a cyberdeck.
          </Callout>
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="gear-matrix-decks" title="Cyberdecks">
        <GearTable items={gearByTag('cyberdeck')} columns={cyberdeckColumns} />
        <Section>
          <Callout title="Attack / Sleaze" variant="note">
            The other two Matrix Attributes — actually hacking requires a cyberdeck, not just a commlink.
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
