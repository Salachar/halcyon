import { useState } from 'react';

import { Page, PageHeader, Tabs } from '@components/PageComponents';
import { useCharacterManager } from '@hooks/useCharacterManager';
import GearSearch from './GearSearch';

import GearMeleeThrown from './GearMeleeThrown';
import GearFirearmsExplosives from './GearFirearmsExplosives';
import GearArmorElectronics from './GearArmorElectronics';
import GearSensorsSecuritySurvival from './GearSensorsSecuritySurvival';
import GearAugmentations from './GearAugmentations';
import GearCyberwareBioware from './GearCyberwareBioware';
import GearVehiclesDrones from './GearVehiclesDrones';

const TABS = [
  { key: 'melee', label: 'Melee/Thrown' },
  { key: 'firearms', label: 'Firearms/Explosives' },
  { key: 'armor', label: 'Armor/Electronics' },
  { key: 'sensors', label: 'Sensors/Security/Survival' },
  { key: 'augmentations', label: 'Headware/Eyeware/Bodyware' },
  { key: 'cyberware', label: 'Cyberlimbs/Bioware' },
  { key: 'vehicles', label: 'Vehicles/Drones' },
];

export default function Gear() {
  const [activeTab, setActiveTab] = useState('melee');
  const { currentCharacter } = useCharacterManager();

  return (
    <Page>
      <PageHeader
        title="Gear"
        subtitle="Browse everything for sale — tap $ on an item to configure and buy"
      />

      <GearSearch />

      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'melee' && <GearMeleeThrown character={currentCharacter} />}
      {activeTab === 'firearms' && <GearFirearmsExplosives character={currentCharacter} />}
      {activeTab === 'armor' && <GearArmorElectronics character={currentCharacter} />}
      {activeTab === 'sensors' && <GearSensorsSecuritySurvival character={currentCharacter} />}
      {activeTab === 'augmentations' && <GearAugmentations character={currentCharacter} />}
      {activeTab === 'cyberware' && <GearCyberwareBioware character={currentCharacter} />}
      {activeTab === 'vehicles' && <GearVehiclesDrones character={currentCharacter} />}
    </Page>
  );
}
