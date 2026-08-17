import { Section, Panel, CardGrid, Card, GearTable } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import {
  PRIORITY_TABLE,
  PRIORITY_ROWS,
  MUNDANE_NOTE,
  ASPECTED_TRADEOFF_NOTE,
  PRIORITY_VARIANTS,
} from '@data/character/priority_table';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const priorityColumns = [
  { label: 'Priority', render: (row) => row.key },
  {
    label: 'Metatype (Adj. Points)',
    render: (row) => `${row.metatype.availableMetatypes.map(capitalize).join('/')} (${row.metatype.adjustmentPoints})`,
  },
  { label: 'Attributes', render: (row) => row.attributePoints },
  { label: 'Skills', render: (row) => row.skillPoints },
  {
    label: 'Magic/Resonance',
    render: (row) => row.magicResonance
      ? `Full ${row.magicResonance.full} · Aspected ${row.magicResonance.aspected} · Adept ${row.magicResonance.adept} · Mystic ${row.magicResonance.mysticAdept} · Techno ${row.magicResonance.technomancer}`
      : 'Mundane only',
  },
  { label: 'Resources', render: (row) => `${row.resources.toLocaleString()}¥` },
];

const priorityRows = PRIORITY_ROWS.map((key) => ({ key, ...PRIORITY_TABLE[key] }));

export default function ShadowrunnersCreation() {
  return (
    <>
      <Section title="The Six Steps">
        <CardGrid columns={3}>
          <Card title="Concept & Background" tagline="Step 1" />
          <Card title="Select Priorities" tagline="Step 2" detail="Metatype / Attributes / Skills / Magic-Resonance / Resources" />
          <Card title="Select Qualities" tagline="Step 3" />
          <Card title="Spend Customization Karma" tagline="Step 4" />
          <Card title="Buy Gear" tagline="Step 5" />
          <Card title="Finishing Touches" tagline="Step 6" detail="Contacts, and everything else that's left" />
        </CardGrid>
      </Section>

      <CollapsibleSection id="sr-creation-priority-table" title="Priority Table">
        <Panel>
          <p>Five rows, A through E. Each row gets assigned to exactly one category — Metatype, Attributes, Skills, Magic/Resonance, Resources — no repeats.</p>
        </Panel>
        <Section>
          <GearTable items={priorityRows} columns={priorityColumns} />
        </Section>
        <Section>
          <Panel solid>
            <p>{ASPECTED_TRADEOFF_NOTE}</p>
            <p>{MUNDANE_NOTE}</p>
          </Panel>
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="sr-creation-variants" title="Variant Rules">
        <Panel>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>{PRIORITY_VARIANTS.lowPower.label}</strong> — {PRIORITY_VARIANTS.lowPower.description}</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>{PRIORITY_VARIANTS.primeRunner.label}</strong> — {PRIORITY_VARIANTS.primeRunner.description}</p>
        </Panel>
      </CollapsibleSection>
    </>
  );
}
