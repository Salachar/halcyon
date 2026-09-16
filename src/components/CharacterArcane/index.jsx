import { Section, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import KnownSpells from '@components/KnownSpells';
import KnownRituals from '@components/KnownRituals';
import BoundSpirits from '@components/BoundSpirits';
import AdeptPowers from '@components/AdeptPowers';
import InitiationTracker from '@components/InitiationTracker';
import KnownComplexForms from '@components/KnownComplexForms';
import CompiledSprites from '@components/CompiledSprites';
import SubmersionTracker from '@components/SubmersionTracker';
import SustainedTracker from '@components/SustainedTracker';

// Magic types that can EVER have a nonzero known-spell budget under
// some configuration — Aspected-Conjuring currently resolves to 0 via
// magicEconomy.js, but Conjuring is still a real possible pick within
// 'aspected'. Copied from the old CharacterSheet.jsx unchanged.
const SPELL_CAPABLE_MAGIC_TYPES = ['full', 'aspected', 'mysticAdept'];

// New bucket tab — every magic/Resonance system in one place,
// technomancer content (Complex Forms/Compiled Sprites/Submersion)
// included alongside magician content (Spells/Rituals/Bound Spirits/
// Adept Powers/Initiation). Deliberately not split into separate
// Magic/Resonance tabs yet — "its okay if its sort of a bucket for
// that stuff right now," with everything kept modular enough to split
// apart later once the real shape of this tab is clearer from use.
export default function CharacterArcane({ character }) {
  const showSpells = SPELL_CAPABLE_MAGIC_TYPES.includes(character.magicType);
  const showComplexForms = character.magicType === 'technomancer';
  const showAdeptPowers = character.magicType === 'adept' || character.magicType === 'mysticAdept';
  const showInitiation = showSpells || showAdeptPowers;
  const showSustained = showSpells || showComplexForms;
  const hasAnyMagic = showSpells || showComplexForms || showAdeptPowers;

  return (
    <>
      {!hasAnyMagic && (
        <Section>
          <Callout title="No Magic or Resonance" variant="note">
            This character is Mundane — nothing to show here yet.
          </Callout>
        </Section>
      )}

      {showSpells && (
        <CollapsibleSection id="sheet-spells" title="Spells" defaultOpen>
          <Section>
            <KnownSpells character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showSpells && (
        <CollapsibleSection id="sheet-rituals" title="Rituals" defaultOpen>
          <Section>
            <KnownRituals character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showSpells && (
        <CollapsibleSection id="sheet-spirits" title="Bound Spirits" defaultOpen>
          <Section>
            <BoundSpirits character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showAdeptPowers && (
        <CollapsibleSection id="sheet-adept-powers" title="Adept Powers" defaultOpen>
          <Section>
            <AdeptPowers character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showInitiation && (
        <CollapsibleSection id="sheet-initiation" title="Initiation" defaultOpen>
          <Section>
            <InitiationTracker character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showComplexForms && (
        <CollapsibleSection id="sheet-complex-forms" title="Complex Forms" defaultOpen>
          <Section>
            <KnownComplexForms character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showComplexForms && (
        <CollapsibleSection id="sheet-sprites" title="Compiled Sprites" defaultOpen>
          <Section>
            <CompiledSprites character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showComplexForms && (
        <CollapsibleSection id="sheet-submersion" title="Submersion" defaultOpen>
          <Section>
            <SubmersionTracker character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showSustained && (
        <CollapsibleSection id="sheet-sustained" title="Sustained" defaultOpen>
          <Section>
            <SustainedTracker character={character} />
          </Section>
        </CollapsibleSection>
      )}
    </>
  );
}
