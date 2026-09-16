import { Section } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import OwnedVehiclesList from '@components/OwnedVehiclesList';
import VehicleActionsReference from '@components/VehicleActionsReference';

// Vehicles tab — relocated as-is from the old global Vehicles.jsx.
export default function CharacterVehicles({ character }) {
  return (
    <>
      <CollapsibleSection id="vehicles-owned" title="Owned Vehicles" defaultOpen>
        <Section>
          <OwnedVehiclesList character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="vehicles-actions" title="Rigging Tests" defaultOpen>
        <Section>
          <VehicleActionsReference character={character} />
        </Section>
      </CollapsibleSection>
    </>
  );
}
