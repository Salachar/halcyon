// Combines every gear category file into one lookup. Lives at
// src/data/gear/index.js alongside the category files themselves.
//
// ALL_GEAR is keyed by id (same reasoning as every individual category
// file) — this is also the thing the Net Interface can eventually use
// to pull items by id out of an extractable, per the very first gear
// conversation: one flat, O(1)-lookup catalog spanning every category.
//
// REBUILT this pass to match the current 12-file structure. The old
// index still imported a single monolithic GEAR_VEHICLES_DRONES and
// had no entries at all for additions.js, matrix_devices.js, or
// magical_goods.js — three real files that existed on disk but were
// never wired in here, so nothing importing ALL_GEAR could ever see a
// Comms/Sensor Array, a commlink, or a focus. vehicles_drones.js is
// also gone, split three ways per its own header notes (vehicles.js /
// drones.js / watercraft.js).
//
// FLAG: sensors_security_survival.js has NOT been through the effects[]/
// wirelessBonuses[]/referenceOnly schema pass the other 11 files have.
// It still uses the old singular effect/wirelessBonus shape (or no
// shape at all, in places). It's included here because the catalog
// needs it — Diving Gear, Climbing Gear, ropes, and the survival tools
// live nowhere else — but any consumer of ALL_GEAR should not assume
// every item has the new array fields. gearFormat.js's formatItemDetails
// is written defensively for exactly this reason: it checks the new
// array fields first and falls back to the old singular ones so this
// file doesn't render broken. Re-run the schema pass on this file when
// it's next touched for any other reason.

import { GEAR_FIREARMS_EXPLOSIVES, GEAR_FIREARMS_EXPLOSIVES_IDS } from './firearms_explosives';
import { GEAR_ADDITIONS, GEAR_ADDITIONS_IDS, MECHANICAL_ARM_BANDS } from './additions';
import { GEAR_ARMOR_ELECTRONICS, GEAR_ARMOR_ELECTRONICS_IDS } from './armor_electronics';
import { GEAR_AUGMENTATIONS, GEAR_AUGMENTATIONS_IDS, AUGMENTATION_GRADES } from './augmentations';
import { GEAR_CYBERWARE_BIOWARE, GEAR_CYBERWARE_BIOWARE_IDS } from './cyberware_bioware';
import { GEAR_DRONES, GEAR_DRONES_IDS, UNDERWATER_SIGNAL_DEGRADATION } from './drones';
import { GEAR_VEHICLES, GEAR_VEHICLES_IDS, VEHICLE_WEAPON_MOUNT_RULES } from './vehicles';
import { GEAR_WATERCRAFT, GEAR_WATERCRAFT_IDS, CRUSH_DEPTH_RULE } from './watercraft';
import { GEAR_MELEE_THROWN, GEAR_MELEE_THROWN_IDS } from './melee_thrown';
import { GEAR_MATRIX_DEVICES, GEAR_MATRIX_DEVICES_IDS, MTOC_STANDARD_CAPABILITIES } from './matrix_devices';
import { GEAR_MAGICAL_GOODS, GEAR_MAGICAL_GOODS_IDS } from './magical_goods';
import { GEAR_SENSORS_SECURITY_SURVIVAL, GEAR_SENSORS_SECURITY_SURVIVAL_IDS } from './sensors_security_survival';

export {
  GEAR_FIREARMS_EXPLOSIVES,
  GEAR_ADDITIONS,
  GEAR_ARMOR_ELECTRONICS,
  GEAR_AUGMENTATIONS,
  GEAR_CYBERWARE_BIOWARE,
  GEAR_DRONES,
  GEAR_VEHICLES,
  GEAR_WATERCRAFT,
  GEAR_MELEE_THROWN,
  GEAR_MATRIX_DEVICES,
  GEAR_MAGICAL_GOODS,
  GEAR_SENSORS_SECURITY_SURVIVAL,
};

// Reference tables/constants each file exports alongside its items —
// re-exported here so a single `import from '@data/gear'` reaches all
// of them, same reasoning as the item maps themselves.
export {
  MECHANICAL_ARM_BANDS,
  AUGMENTATION_GRADES,
  UNDERWATER_SIGNAL_DEGRADATION,
  VEHICLE_WEAPON_MOUNT_RULES,
  CRUSH_DEPTH_RULE,
  MTOC_STANDARD_CAPABILITIES,
};

export const ALL_GEAR = {
  ...GEAR_FIREARMS_EXPLOSIVES,
  ...GEAR_ADDITIONS,
  ...GEAR_ARMOR_ELECTRONICS,
  ...GEAR_AUGMENTATIONS,
  ...GEAR_CYBERWARE_BIOWARE,
  ...GEAR_DRONES,
  ...GEAR_VEHICLES,
  ...GEAR_WATERCRAFT,
  ...GEAR_MELEE_THROWN,
  ...GEAR_MATRIX_DEVICES,
  ...GEAR_MAGICAL_GOODS,
  ...GEAR_SENSORS_SECURITY_SURVIVAL,
};

export const ALL_GEAR_IDS = Object.keys(ALL_GEAR);
