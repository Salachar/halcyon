import { Page, PageHeader, Section, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import { useSelectedCharacter } from '@hooks/useCharacterManager';
import OwnedVehiclesList from '@components/OwnedVehiclesList';
import VehicleActionsReference from '@components/VehicleActionsReference';

export default function Vehicles() {
  const character = useSelectedCharacter();

  return (
    <Page>
      <PageHeader title="Vehicles" subtitle="Owned vehicles, drones, and rigging" />

      {!character && (
        <Section>
          <Callout title="No Character Selected" variant="note">
            Select a character from the Characters tab first.
          </Callout>
        </Section>
      )}

      {character && (
        <CollapsibleSection id="vehicles-owned" title="Owned Vehicles" defaultOpen>
          <Section>
            <OwnedVehiclesList character={character} />
          </Section>
        </CollapsibleSection>
      )}

      <CollapsibleSection id="vehicles-actions" title="Rigging Tests" defaultOpen>
        <Section>
          <VehicleActionsReference character={character} />
        </Section>
      </CollapsibleSection>
    </Page>
  );
}
