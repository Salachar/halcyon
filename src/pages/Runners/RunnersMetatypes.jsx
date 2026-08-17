import { Section, Panel } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import MetatypeTable from '@components/MetatypeTable';
import AttributeInfo from '@components/AttributeInfo';
import { RACIAL_QUALITY_NOTE } from '@data/character/metatypes';

export default function ShadowrunnersMetatypes() {
  return (
    <>
      <Section>
        <Panel>
          <p>Five metatypes: Human, Dwarf, Elf, Ork, Troll. Which ones are available to pick depends on your Metatype priority row — see Character Creation &gt; Priority Table (higher rows unlock more options; Troll only appears at the highest rows).</p>
        </Panel>
      </Section>

      <CollapsibleSection id="sr-metatypes-details" title="Metatypes" defaultOpen>
        <MetatypeTable />
        <p style={{ color: 'var(--sr-text-muted)', fontSize: '0.85rem', marginTop: '0.75rem' }}>{RACIAL_QUALITY_NOTE}</p>
      </CollapsibleSection>

      <CollapsibleSection id="sr-attributes" title="Attributes">
        <Section>
          <AttributeInfo />
        </Section>
      </CollapsibleSection>
    </>
  );
}
