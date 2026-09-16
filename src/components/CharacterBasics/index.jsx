import { Section } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import DerivedValues from '@components/DerivedValues';
import Initiative from '@components/Initiative';
import CharacterQualities from '@components/CharacterQualities';

// New tab, matching the Foundry-style "Basics" landing page — Derived
// Values, unified Initiative (Physical/Astral/Matrix), and Qualities.
// Attributes themselves stay in the persistent CharacterHeader rather
// than living here, per the explicit call to keep them always visible
// regardless of active tab.
export default function CharacterBasics({ character }) {
  return (
    <>
      <CollapsibleSection id="sheet-derived-values" title="Derived Values" defaultOpen>
        <Section>
          <DerivedValues character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="sheet-initiative" title="Initiative" defaultOpen>
        <Section>
          <Initiative character={character} />
        </Section>
      </CollapsibleSection>

      <CharacterQualities character={character} />
    </>
  );
}
