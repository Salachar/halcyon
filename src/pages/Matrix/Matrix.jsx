import { Page, PageHeader, Section, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import { useSelectedCharacter } from '@hooks/useCharacterManager';
import NetworkPanel from '@components/NetworkPanel';
import HackedDevices from '@components/HackedDevices';

// PAN is shared with CharacterSheet (same component, same underlying
// gearManager data) — it's about the character's own gear, so it
// belongs in both places. Hacked Devices is Matrix-page-only: it's
// freeform tracking of devices the player doesn't own, which has no
// reason to appear on the character sheet itself.
export default function Matrix() {
  const character = useSelectedCharacter();

  if (!character) {
    return (
      <Page>
        <PageHeader title="Matrix" subtitle="Personal Area Network and session hacking notes" />
        <Section>
          <Callout title="No Character Selected" variant="note">
            Select a character from the Characters tab first.
          </Callout>
        </Section>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader title="Matrix" subtitle="Personal Area Network and session hacking notes" />

      <CollapsibleSection id="matrix-pan" title="Personal Area Network" defaultOpen>
        <Section>
          <NetworkPanel character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="matrix-hacked" title="Hacked Devices" defaultOpen>
        <Section>
          <HackedDevices character={character} />
        </Section>
      </CollapsibleSection>
    </Page>
  );
}
