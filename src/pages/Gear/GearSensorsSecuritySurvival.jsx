import { useState } from 'react';

import { Section, GearTable, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import PurchaseModal from '@components/PurchaseModal';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { formatAvailability, formatCost, formatCapacity } from '@utils/gearFormat';
import { gearByTag } from '@utils/gearTags';
import { SENSOR_PACKAGE_MAX_RATING, SENSOR_FUNCTIONS } from '@data/gear/sensors_security_survival';
import { resolveDeviceRating } from '@utils/augmentationEconomy';

import './gearBuyButton.css';

export default function GearSensorsSecuritySurvival({ character }) {
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
  const housingColumns = [
    { label: 'Device', render: (i) => i.label },
    { label: 'Capacity', render: formatCapacity },
    { label: 'Device Rating', render: (i) => resolveDeviceRating(i, {}) ?? '—' },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const securityColumns = [
    { label: 'Item', render: (i) => i.label },
    { label: 'Structure', render: (i) => i.stats.structure ?? '—' },
    { label: 'Device Rating', render: (i) => resolveDeviceRating(i, {}) ?? '—' },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const toolColumns = [
    { label: 'Item', render: (i) => i.label },
    { label: 'DV', render: (i) => i.stats.damageValue ?? '—' },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];

  return (
    <>
      <CollapsibleSection id="gear-sss-auditory" title="Auditory Devices">
        <GearTable items={gearByTag('auditory')} columns={housingColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-sss-sensors" title="Sensors">
        <GearTable items={gearByTag('sensor')} columns={housingColumns} />
        <Section title="Sensor Packages (Max Rating by Housing)">
          <table className="sr-table">
            <thead><tr><th>Housing</th><th>Max Rating</th></tr></thead>
            <tbody>{SENSOR_PACKAGE_MAX_RATING.map((p) => <tr key={p.housing}><td>{p.housing}</td><td>{p.maxRating}</td></tr>)}</tbody>
          </table>
        </Section>
        <Section title="Sensor Functions">
          <table className="sr-table">
            <thead><tr><th>Function</th><th>Max Range</th></tr></thead>
            <tbody>{SENSOR_FUNCTIONS.map((f) => <tr key={f.label}><td>{f.label}</td><td>{typeof f.maxRange === 'number' ? `${f.maxRange}m` : (f.maxRange ?? '—')}</td></tr>)}</tbody>
          </table>
          <Callout title="Not Separate SKUs" variant="note">
            Functions above cost the same as whatever Single Sensor / Sensor Array slot they're loaded into — they're a configuration choice, not their own priced item.
          </Callout>
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="gear-sss-security" title="Security Devices">
        <GearTable items={gearByTag('security')} columns={securityColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-sss-breaking" title="Breaking and Entering Gear">
        <GearTable items={gearByTag('breaking_entering')} columns={toolColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-sss-chemicals" title="Industrial Chemicals">
        <GearTable items={gearByTag('industrial_chemical')} columns={toolColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-sss-survival" title="Survival Gear">
        <GearTable items={gearByTag('survival')} columns={toolColumns} />
        <Section title="Grapple Gun Family">
          <GearTable items={gearByTag('grapple_gun_family')} columns={basicColumns} />
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
