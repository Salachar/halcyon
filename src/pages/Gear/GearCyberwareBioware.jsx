import { Section, GearTable, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import { formatAvailability, formatCost, formatEssence, formatCapacity, formatDamageValue, formatAttackRatings } from '@utils/gearFormat';
import { gearByTag } from './gearTags';

const limbColumns = [
  { label: 'Limb', render: (i) => i.label },
  { label: 'Essence', render: formatEssence },
  { label: 'Capacity', render: formatCapacity },
  { label: 'Avail', render: formatAvailability },
  { label: 'Cost', render: formatCost },
];
const implantWeaponColumns = [
  { label: 'Weapon', render: (i) => i.label },
  { label: 'Essence', render: formatEssence },
  { label: 'Capacity', render: formatCapacity },
  { label: 'DV', render: formatDamageValue },
  { label: 'Attack Ratings (C/N/M/F/E)', render: formatAttackRatings },
  { label: 'Avail', render: formatAvailability },
  { label: 'Cost', render: formatCost },
];
const bioColumns = [
  { label: 'Item', render: (i) => i.label },
  { label: 'Essence', render: formatEssence },
  { label: 'Avail', render: formatAvailability },
  { label: 'Cost', render: formatCost },
];

export default function GearCyberwareBioware() {
  return (
    <>
      <CollapsibleSection id="gear-cw-limbs" title="Cyberlimbs">
        <GearTable items={gearByTag('cyberlimb')} columns={limbColumns} />
        <Section title="Cyberlimb Accessories">
          <GearTable items={gearByTag('cyberlimb_accessory')} columns={limbColumns} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="gear-cw-implant-weapons" title="Cyber Implant Weapons">
        <GearTable items={gearByTag('implant_weapon')} columns={implantWeaponColumns} />
        <Section title="Firearm-Class Implants">
          <GearTable items={gearByTag('firearm_implant')} columns={limbColumns} />
          <Callout title="Bring Your Own Gun" variant="note">
            These make space — the actual firearm is bought separately from Gear &gt; Firearms/Explosives.
          </Callout>
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="gear-cw-bioware" title="Bioware">
        <GearTable items={gearByTag('bioware_basic')} columns={bioColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-cw-cultured" title="Cultured Bioware">
        <GearTable items={gearByTag('bioware_cultured')} columns={bioColumns} />
      </CollapsibleSection>
    </>
  );
}
