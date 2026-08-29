import { useState } from 'react';

import { Section, GearTable, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import PurchaseModal from '@components/PurchaseModal';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { formatAvailability, formatCost } from '@utils/gearFormat';
import { gearByTag } from '@utils/gearTags';
import { MTOC_STANDARD_CAPABILITIES } from '@data/gear/matrix_devices';
import '@styles/gearBuyButton.css';

export default function GearMatrixDevices({  character, vehicle }) {
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
    { label: 'Program Slots', render: (i) => i.stats.matrixCapacityProvided },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const cyberdeckColumns = [
    { label: 'Cyberdeck', render: (i) => i.label },
    { label: 'Device Rating', render: (i) => i.stats.deviceRating },
    { label: 'Attack', render: (i) => i.stats.attack },
    { label: 'Sleaze', render: (i) => i.stats.sleaze },
    { label: 'Program Slots', render: (i) => i.stats.matrixCapacityProvided },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const mtocColumns = [
    { label: 'Unit', render: (i) => i.label },
    { label: 'Device Rating', render: (i) => i.stats.deviceRating },
    { label: 'D/F', render: (i) => `${i.stats.dataProcessing}/${i.stats.firewall}` },
    { label: 'Program Slots', render: (i) => i.stats.matrixCapacityProvided },
    { label: 'Max Users', render: (i) => i.stats.maxUsers },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const tacAppColumns = [
    { label: 'Tac-App', render: (i) => i.label },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const rccColumns = [
    { label: 'RCC', render: (i) => i.label },
    { label: 'Device Rating', render: (i) => i.stats.deviceRating },
    { label: 'Data Processing', render: (i) => i.stats.dataProcessing },
    { label: 'Firewall', render: (i) => i.stats.firewall },
    { label: 'Slaved Drones', render: (i) => i.stats.slavedDroneCapacity },
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

      <CollapsibleSection id="gear-matrix-mtoc" title="Tactical Networks (M-TOC)">
        <GearTable items={gearByTag('mtoc')} columns={mtocColumns} />
        <Section>
          <Callout title="Standard Capabilities (all Marks)" variant="note">
            <ul>
              {MTOC_STANDARD_CAPABILITIES.map((cap) => <li key={cap}>{cap}</li>)}
            </ul>
          </Callout>
          <Callout title="Operating an M-TOC" variant="note">
            Runs like a cyberdeck with no hacking capability — its only Matrix attributes are Data Processing and Firewall (or it takes on the ratings of whatever Matrix device it's linked to). Requires an operator (usually a Matrix specialist, though a suitably equipped/skilled rigger can do it) to keep it running; whoever maintains the network grants everyone linked in access to gathered information.
          </Callout>
          <Callout title="Edge Storage & Sharing" variant="note">
            An M-TOC can bank Edge that a linked player earns beyond what they can keep, up to a number of points equal to its Device Rating. Any linked member can transfer personal or stored Edge to another via a Minor Action; normal rules on when situational Edge evaporates still apply.
          </Callout>
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="gear-matrix-tac-apps" title="Tac-Apps">
        <GearTable items={gearByTag('tac_app')} columns={tacAppColumns} />
        <Section>
          <Callout title="Tac-Apps" variant="note">
            M-TOC-specific programs, functionally equivalent to cyberdeck programs — swap them between missions to fit the profile. Each app occupies one of the M-TOC's active program slots.
          </Callout>
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="gear-matrix-rcc" title="Rigger Command Consoles (RCC)">
        <GearTable items={gearByTag('rcc')} columns={rccColumns} />
        <Section>
          <Callout title="No Attack or Sleaze" variant="note">
            An RCC has no offensive Matrix capability at all in core rules — Data Processing and Firewall only, same persona shape as a commlink. It can still serve as a Primary device (any real ASDF presence generates a full persona), just one that can never perform Attack/Sleaze-gated actions on its own.
          </Callout>
          <Callout title="Slaved Drones" variant="note">
            Controls up to (Device Rating × 3) slaved drones — issue one command to any number of them as a single Minor Action. Hacking a slaved drone means breaching the RCC first, not the drone itself. Device Rating also reduces Noise penalties by that amount.
          </Callout>
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
