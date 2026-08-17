import { Section, GearTable, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import { formatAvailability, formatCost, formatCapacity } from '@utils/gearFormat';
import { gearByTag } from './gearTags';
import { SENSOR_PACKAGE_MAX_RATING, SENSOR_FUNCTIONS } from '@data/gear/sensors_security_survival';

const basicColumns = [
  { label: 'Item', render: (i) => i.label },
  { label: 'Avail', render: formatAvailability },
  { label: 'Cost', render: formatCost },
];
const housingColumns = [
  { label: 'Device', render: (i) => i.label },
  { label: 'Capacity', render: formatCapacity },
  { label: 'Avail', render: formatAvailability },
  { label: 'Cost', render: formatCost },
];
const securityColumns = [
  { label: 'Item', render: (i) => i.label },
  { label: 'Structure', render: (i) => i.stats.structure ?? '—' },
  { label: 'Avail', render: formatAvailability },
  { label: 'Cost', render: formatCost },
];
const toolColumns = [
  { label: 'Item', render: (i) => i.label },
  { label: 'DV', render: (i) => i.stats.damageValue ?? '—' },
  { label: 'Avail', render: formatAvailability },
  { label: 'Cost', render: formatCost },
];

export default function GearSensorsSecuritySurvival() {
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
    </>
  );
}
