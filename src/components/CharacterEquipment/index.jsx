import { Section } from '@components/PageComponents';
import GearList from '@components/GearList';

// The outer "Gear" CollapsibleSection is gone — redundant now that
// GearList has its own real per-category CollapsibleSections (Weapons/
// Armor/Cyberware & Bioware/Electronics-Software-Tools/Ammo &
// Explosives). A collapsible wrapping collapsibles added a layer with
// no purpose once the category split existed. Section itself stays,
// for the same padding/spacing every other tab's content gets.
export default function CharacterEquipment({ character }) {
  return (
    <Section>
      <GearList character={character} />
    </Section>
  );
}
