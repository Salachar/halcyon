import { Section, GearTable, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import { formatAvailability, formatCost, formatEssence, formatCapacity } from '@utils/gearFormat';
import { gearByTag } from './gearTags';
import { AUGMENTATION_GRADES } from '@data/gear/augmentations';

const basicColumns = [
  { label: 'Item', render: (i) => i.label },
  { label: 'Avail', render: formatAvailability },
  { label: 'Cost', render: formatCost },
];
const headwareColumns = [
  { label: 'Item', render: (i) => i.label },
  { label: 'Essence', render: formatEssence },
  { label: 'Capacity', render: formatCapacity },
  { label: 'Avail', render: formatAvailability },
  { label: 'Cost', render: formatCost },
];

export default function GearAugmentations() {
  return (
    <>
      <Callout title="Grades" variant="critical">
        {Object.entries(AUGMENTATION_GRADES).map(([grade, m]) => (
          <div key={grade} style={{ marginBottom: '0.25rem' }}>
            <strong style={{ textTransform: 'capitalize' }}>{grade}</strong>: Essence ×{m.essenceMultiplier}, Cost ×{m.costMultiplier}, Availability {m.availabilityModifier >= 0 ? '+' : ''}{m.availabilityModifier}
          </div>
        ))}
        Applies to every item below — listed prices are standard grade.
      </Callout>

      <CollapsibleSection id="gear-aug-biotech" title="Biotech Basics">
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
    </>
  );
}
