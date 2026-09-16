import { Section } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import CombatActionsReference from '@components/CombatActionsReference';

// Combat tab — relocated from the old global Combat.jsx. Initiative
// moved to the new Basics tab as part of the consolidated Physical/
// Astral/Matrix Initiative display (CharacterBasics.jsx, Initiative
// component) — it landed here only briefly, before that consolidation.
// Attack itself still isn't rolled from here — it lives on the
// weapon's own row in GearList (Equipment tab), where the correct
// skill is unambiguous. This stays step-by-step reference + rolling
// for everything else.
export default function CharacterCombat({ character }) {
  return (
    <CollapsibleSection id="combat-actions" title="Combat Actions" defaultOpen>
      <Section>
        <CombatActionsReference character={character} />
      </Section>
    </CollapsibleSection>
  );
}
