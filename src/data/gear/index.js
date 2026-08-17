// Combines all 7 gear category files into one lookup. Lives at
// src/data/gear/index.js alongside the category files themselves.
//
// ALL_GEAR is keyed by id (same reasoning as every individual category
// file) — this is also the thing the Net Interface can eventually use
// to pull items by id out of an extractable, per the very first gear
// conversation: one flat, O(1)-lookup catalog spanning every category.

import { GEAR_MELEE_THROWN } from './melee_thrown';
import { GEAR_VEHICLES_DRONES } from './vehicles_drones';
import { GEAR_CYBERWARE_BIOWARE } from './cyberware_bioware';
import { GEAR_AUGMENTATIONS } from './augmentations';
import { GEAR_SENSORS_SECURITY_SURVIVAL } from './sensors_security_survival';
import { GEAR_ARMOR_ELECTRONICS } from './armor_electronics';
import { GEAR_FIREARMS_EXPLOSIVES } from './firearms_explosives';

export {
  GEAR_MELEE_THROWN,
  GEAR_VEHICLES_DRONES,
  GEAR_CYBERWARE_BIOWARE,
  GEAR_AUGMENTATIONS,
  GEAR_SENSORS_SECURITY_SURVIVAL,
  GEAR_ARMOR_ELECTRONICS,
  GEAR_FIREARMS_EXPLOSIVES,
};

export const ALL_GEAR = {
  ...GEAR_MELEE_THROWN,
  ...GEAR_VEHICLES_DRONES,
  ...GEAR_CYBERWARE_BIOWARE,
  ...GEAR_AUGMENTATIONS,
  ...GEAR_SENSORS_SECURITY_SURVIVAL,
  ...GEAR_ARMOR_ELECTRONICS,
  ...GEAR_FIREARMS_EXPLOSIVES,
};

export const ALL_GEAR_IDS = Object.keys(ALL_GEAR);
