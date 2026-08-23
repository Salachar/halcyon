import { Page, PageHeader, Section, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import { useSelectedCharacter } from '@hooks/useCharacterManager';
import NetworkPanel from '@components/NetworkPanel';
import ProgramsList from '@components/ProgramsList';
import MatrixCombatRatings from '@components/MatrixCombatRatings';
import MatrixInitiative from '@components/MatrixInitiative';
import MatrixActionsReference from '@components/MatrixActionsReference';
import MatrixEdgeActions from '@components/MatrixEdgeActions';
import OverwatchTracker from '@components/OverwatchTracker';
import NoiseTracker from '@components/NoiseTracker';
import HackedDevices from '@components/HackedDevices';

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

      <CollapsibleSection id="matrix-initiative" title="Matrix Initiative" defaultOpen>
        <Section>
          <MatrixInitiative character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="matrix-actions" title="Matrix Actions" defaultOpen>
        <Section>
          <MatrixActionsReference character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="matrix-edge" title="Matrix Edge Actions" defaultOpen>
        <Section>
          <MatrixEdgeActions character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="matrix-overwatch" title="Overwatch Score" defaultOpen>
        <Section>
          <OverwatchTracker character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="matrix-noise" title="Noise" defaultOpen>
        <Section>
          <NoiseTracker character={character} />
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
