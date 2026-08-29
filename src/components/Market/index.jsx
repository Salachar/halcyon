import { useState } from 'react';

import { Tabs } from '@components/PageComponents';
import GearSearch from './GearSearch';

import GearMeleeThrown from './GearMeleeThrown';
import GearFirearmsExplosives from './GearFirearmsExplosives';
import GearArmorElectronics from './GearArmorElectronics';
import GearSensorsSecuritySurvival from './GearSensorsSecuritySurvival';
import GearAugmentations from './GearAugmentations';
import GearCyberwareBioware from './GearCyberwareBioware';
import GearVehicles from './GearVehicles';
import GearWatercraft from './GearWatercraft';
import GearDrones from './GearDrones';
import GearMatrixDevices from './GearMatrixDevices';
import GearMagicalGoods from './GearMagicalGoods';
import GearAdditions from './GearAdditions';

import './market.css';

const TABS = [
  { key: 'melee', label: 'Melee/Thrown' },
  { key: 'firearms', label: 'Firearms/Explosives' },
  { key: 'armor', label: 'Armor/Electronics' },
  { key: 'sensors', label: 'Sensors/Security/Survival' },
  { key: 'augmentations', label: 'Headware/Eyeware/Bodyware' },
  { key: 'cyberware', label: 'Cyberlimbs/Bioware' },
  { key: 'vehicles', label: 'Vehicles' },
  { key: 'watercraft', label: 'Watercraft' },
  { key: 'drones', label: 'Drones' },
  { key: 'additions', label: 'Vehicle Additions' },
  { key: 'matrix', label: 'Matrix Devices' },
  { key: 'magical_goods', label: 'Magical Goods' },
];

// The real Market, pulled out of Gear.jsx so it's usable anywhere, not
// just as a full page — Gear.jsx is now just a thin shell around this.
// `defaultTab` lets a caller open pre-scrolled to a relevant tab
// (e.g. "additions" from a vehicle attach flow) instead of always
// starting at "melee" — tab-to-context mapping isn't attempted here,
// callers just pass whichever key makes sense for them; the actual
// tab organization itself isn't considered final yet either, so this
// deliberately doesn't try to be smarter than "open here if asked."
//
// `vehicle` is optional context — when present, PurchaseModal (opened
// from any tab here) can show a small reference stat line (e.g. "This
// vehicle's Body: 14") next to a Body-scaled item's input, purely
// informational, never auto-filling or gating the value.
export default function Market({ character, defaultTab = 'melee', vehicle }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="sr-market">
      <GearSearch />

      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'melee' && <GearMeleeThrown character={character} vehicle={vehicle} />}
      {activeTab === 'firearms' && <GearFirearmsExplosives character={character} vehicle={vehicle} />}
      {activeTab === 'armor' && <GearArmorElectronics character={character} vehicle={vehicle} />}
      {activeTab === 'sensors' && <GearSensorsSecuritySurvival character={character} vehicle={vehicle} />}
      {activeTab === 'augmentations' && <GearAugmentations character={character} vehicle={vehicle} />}
      {activeTab === 'cyberware' && <GearCyberwareBioware character={character} vehicle={vehicle} />}
      {activeTab === 'vehicles' && <GearVehicles character={character} vehicle={vehicle} />}
      {activeTab === 'watercraft' && <GearWatercraft character={character} vehicle={vehicle} />}
      {activeTab === 'drones' && <GearDrones character={character} vehicle={vehicle} />}
      {activeTab === 'additions' && <GearAdditions character={character} vehicle={vehicle} />}
      {activeTab === 'matrix' && <GearMatrixDevices character={character} vehicle={vehicle} />}
      {activeTab === 'magical_goods' && <GearMagicalGoods character={character} vehicle={vehicle} />}
    </div>
  );
}
