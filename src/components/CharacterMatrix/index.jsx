import { Section } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import NetworkPanel from '@components/NetworkPanel';
import ProgramsList from '@components/ProgramsList';
import MatrixCombatRatings from '@components/MatrixCombatRatings';
import MatrixActionsReference from '@components/MatrixActionsReference';
import HackedDevices from '@components/HackedDevices';

// Matrix tab — relocated from the old global Matrix.jsx. Matrix
// Initiative moved to the new Basics tab as part of the consolidated
// Physical/Astral/Matrix Initiative display (CharacterBasics.jsx,
// Initiative component) — the old standalone MatrixInitiative
// component this section used to render is retired. Matrix Edge
// Actions moved into the consolidated EdgeModal (triggered from the
// Edge token in CharacterHeader) — removed from here directly.
// Overwatch Score and Noise both moved into the persistent
// CharacterHeader too (their own tokens, opening OverwatchModal/
// NoiseModal) — also removed from here; NetworkPanel, ProgramsList,
// MatrixCombatRatings, MatrixActionsReference, and HackedDevices are
// what's left as genuinely Matrix-tab-scoped content.
//
// Technomancer content (Complex Forms/Compiled Sprites/Submersion)
// does NOT live here — it's in the Arcane tab, per the explicit call
// to keep all magic/Resonance content (mage and technomancer alike)
// in one bucket for now.
export default function CharacterMatrix({ character }) {
  return (
    <>
      <CollapsibleSection id="matrix-pan" title="Personal Area Network" defaultOpen>
        <Section>
          <NetworkPanel character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="matrix-programs" title="Programs" defaultOpen>
        <Section>
          <ProgramsList character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="matrix-combat-ratings" title="Attack / Defense Rating" defaultOpen>
        <Section>
          <MatrixCombatRatings character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="matrix-actions" title="Matrix Actions" defaultOpen>
        <Section>
          <MatrixActionsReference character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="matrix-hacked" title="Hacked Devices" defaultOpen>
        <Section>
          <HackedDevices character={character} />
        </Section>
      </CollapsibleSection>
    </>
  );
}
