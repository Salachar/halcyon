import { Page, PageHeader, Section, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import { useSelectedCharacter } from '@hooks/useCharacterManager';
import OwnedVehiclesList from '@components/OwnedVehiclesList';
import VehicleActionsReference from '@components/VehicleActionsReference';

// New tab — nothing hosted vehicle tracking before this. Buying
// vehicles/drones already worked (GearVehiclesDrones.jsx, the Market
// tab), same as it does for every other gear category; this is the
// "do something with what you own" layer, same shape every other
// domain got this session (PAN, Matrix Actions, Combat Actions).
//
// Facilities purchase now lives under the general Gear/Market
// multi-tab ("Vehicle Facilities"), matching every other GearXXX.jsx
// purchase table — moved back there after briefly living here, since
// showing it in two places at once was redundant. Buy a Facility from
// Market, then attach it from a vehicle's own row below.
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
