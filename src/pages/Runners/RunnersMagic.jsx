import { Section, Panel } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import SpellCard from '@components/SpellCard';
import PowerCard from '@components/PowerCard';
import MentorSpiritCard from '@components/MentorSpiritCard';
import ComplexFormCard from '@components/ComplexFormCard';
import { SPELLS, SPELLS_BY_CATEGORY } from '@data/character/spells';
import { POWERS, POWER_IDS, MYSTIC_ADEPT_SPLIT_NOTE } from '@data/character/powers';
import { MENTOR_SPIRITS, MENTOR_SPIRIT_IDS } from '@data/character/mentor_spirits';
import { COMPLEX_FORMS, COMPLEX_FORM_IDS, TECHNOMANCER_COMPLEX_FORM_NOTE } from '@data/character/complex_forms';

const SCHOOL_LABELS = {
  combat: 'Combat',
  detection: 'Detection',
  health: 'Health',
  illusion: 'Illusion',
  manipulation: 'Manipulation',
};

export default function ShadowrunnersMagic() {
  return (
    <>
      <Section>
        <Panel>
          <p>The actual pick-lists behind Rules &gt; Magic and the technomancer content in Rules &gt; The Matrix — every Spell, Adept Power, Mentor Spirit, and Complex Form.</p>
        </Panel>
      </Section>

      <CollapsibleSection id="sr-magic-spells" title="Spells">
        {Object.entries(SPELLS_BY_CATEGORY).map(([category, ids]) => (
          <Section title={SCHOOL_LABELS[category]} key={category}>
            {ids.map((id) => (
              <SpellCard key={id} spell={SPELLS[id]} />
            ))}
          </Section>
        ))}
      </CollapsibleSection>

      <CollapsibleSection id="sr-magic-powers" title="Adept Powers">
        <Panel>
          <p>{MYSTIC_ADEPT_SPLIT_NOTE}</p>
        </Panel>
        <Section>
          {POWER_IDS.map((id) => (
            <PowerCard key={id} power={POWERS[id]} />
          ))}
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="sr-magic-mentors" title="Mentor Spirits">
        <Section>
          {MENTOR_SPIRIT_IDS.map((id) => (
            <MentorSpiritCard key={id} spirit={MENTOR_SPIRITS[id]} />
          ))}
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="sr-magic-complex-forms" title="Complex Forms (Technomancer)">
        <Panel>
          <p>{TECHNOMANCER_COMPLEX_FORM_NOTE}</p>
        </Panel>
        <Section>
          {COMPLEX_FORM_IDS.map((id) => (
            <ComplexFormCard key={id} form={COMPLEX_FORMS[id]} />
          ))}
        </Section>
      </CollapsibleSection>
    </>
  );
}
