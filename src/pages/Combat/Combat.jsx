import { Page, PageHeader, Section, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import { useSelectedCharacter } from '@hooks/useCharacterManager';
import CombatActionsReference from '@components/CombatActionsReference';

// New — nothing hosted Combat Actions before this (RulesCombat.jsx
// stays reference-only, five short paragraphs). Attack itself isn't
// rolled from here — it lives on the weapon's own row in GearList,
// where the correct skill is unambiguous; this is the step-by-step
// reference + rolling for everything else. An Initiative widget is
// the natural next piece to add here, not yet built.
export default function Combat() {
  const character = useSelectedCharacter();

  return (
    <Page>
      <PageHeader title="Combat" subtitle="Actions, timing, and Edge" />

      {!character && (
        <Section>
          <Callout title="No Character Selected" variant="note">
            Select a character from the Characters tab to enable rolling — the reference below still works without one.
          </Callout>
        </Section>
      )}

      <CollapsibleSection id="combat-actions" title="Combat Actions" defaultOpen>
        <Section>
          <CombatActionsReference character={character} />
        </Section>
      </CollapsibleSection>
    </Page>
  );
}
