// Vehicle Rigging derived stats — confirmed formulas, all computed
// live rather than stored, same "derive, don't duplicate" instinct as
// Matrix Attack/Defense Rating and everything else in this app.

import { ALL_GEAR } from '@data/gear';

function isCSM(item) {
  return Boolean(item?.tags?.includes('csm'));
}

// Comms/Sensor Array rotation — a small, standalone version of
// compositePersonaStats scoped to "one Array + its own attached CSMs,"
// not the character's general PAN rotation. No wireless/on-off checks
// needed — CSMs always contribute once attached, matching the
// deliberately minimal "no per-module UI" design (unlimited modules,
// best value wins, no toggle). The Array's own base stats act as the
// floor a CSM has to beat, not a value that itself gets excluded.
export function arrayCompositedStats(character, arrayInstanceId) {
  const arrayEntry = character.gearManager.gear[arrayInstanceId];
  if (!arrayEntry) return { attack: 0, sleaze: 0, dataProcessing: 0, firewall: 0 };
  const arrayItem = ALL_GEAR[arrayEntry.itemId];

  const csmItems = character.gearManager.attachmentsOf(arrayInstanceId)
    .map(([, e]) => ALL_GEAR[e.itemId])
    .filter(isCSM);

  const attrs = ['attack', 'sleaze', 'dataProcessing', 'firewall'];
  const result = {};
  for (const attr of attrs) {
    let best = arrayItem?.stats?.[attr] ?? 0;
    for (const csmItem of csmItems) {
      const val = csmItem?.stats?.[attr];
      if (val != null && val > best) best = val;
    }
    result[attr] = best;
  }
  return result;
}

// +1 Condition Monitor per attached CSM — a real, computed redundancy
// bonus per the confirmed design ("the condition marker has some
// +devices bonus"), not just flavor text. Added on top of the Array's
// own base Matrix CM (matrixMonitorMaxFor, GearManager — already fully
// generic, works unchanged here since the Array has a real
// deviceRating stat).
export function arrayConditionMonitorBonus(character, arrayInstanceId) {
  return character.gearManager.attachmentsOf(arrayInstanceId)
    .map(([, e]) => ALL_GEAR[e.itemId])
    .filter(isCSM)
    .length;
}

// Crossing a Speed Interval imposes a cumulative -1 to Handling AND
// vehicle-attack tests per interval crossed — confirmed as a running
// count (floor of current speed / interval), not a one-time flag.
export function speedIntervalPenalty(item, currentSpeed) {
  const interval = item.stats?.speedInterval;
  if (!interval || !currentSpeed) return 0;
  return Math.floor(currentSpeed / interval);
}

// Handling worsens 1 per 3 Condition Monitor boxes of damage taken —
// confirmed directly.
export function handlingDamagePenalty(damageBoxes) {
  return Math.floor((damageBoxes || 0) / 3);
}

// Ground vehicles carry separate on-road/off-road Handling ratings;
// boats/aircraft only ever populate onRoad in this catalog's data
// shape (see vehicles_drones.js) — reading whichever exists rather
// than assuming both are always present.
export function effectiveHandling(item, roadType, damageBoxes) {
  const handling = item.stats?.handling;
  if (!handling) return null;
  const base = roadType === 'offRoad' && handling.offRoad != null ? handling.offRoad : handling.onRoad;
  if (base == null) return null;
  return Math.max(0, base - handlingDamagePenalty(damageBoxes));
}

// Confirmed as a static derived number, not a dice pool — "an Attack
// Rating of the driver's Piloting skill + Sensor and a Defense Rating
// of the driver's Piloting + Armor." No attribute involved at all,
// unlike the Handling/Ramming tests themselves (which ARE Piloting +
// Reaction/Intuition dice pools, rolled through PoolBuilder instead).
export function vehicleAttackRating(item, driverPilotingRank) {
  const sensor = item.stats?.sensor;
  if (sensor == null) return null;
  return (driverPilotingRank || 0) + sensor;
}

export function vehicleDefenseRating(item, driverPilotingRank) {
  const armor = item.stats?.armor;
  if (armor == null) return null;
  return (driverPilotingRank || 0) + armor;
}

// Native Upgrade Capacity — every vehicle inherently has one, computed
// rather than a stored stat (same reasoning as the old mount capacity
// formula: avoids touching every existing catalog entry, and nothing
// drifts out of sync since it's derived fresh every time). This is
// what Rigger Cocoon attaches through now that Cockpit is no longer a
// purchasable Addition — a cockpit isn't new capability being
// installed, it's something every vehicle already has. Flat baseline
// (2) is a placeholder, not a confirmed source number.
//
// "Direct attachments" here means anything attached straight to the
// vehicle instance itself — excludes Additions (which consume the
// SEPARATE additionCapacityProvided pool) and excludes items with no
// upgradeCapacityUsed stat at all (plain vehicle mods like Rigger
// Interface, which aren't part of either Capacity pool).
const NATIVE_UPGRADE_SLOTS = 2;

export function nativeUpgradeCapacity(character, vehicleInstanceId) {
  const directAttachments = character.gearManager.attachmentsOf(vehicleInstanceId)
    .filter(([, e]) => !ALL_GEAR[e.itemId]?.tags?.includes('addition'));
  const used = directAttachments.reduce((sum, [, e]) => sum + (ALL_GEAR[e.itemId]?.stats?.upgradeCapacityUsed || 0), 0);
  return { provided: NATIVE_UPGRADE_SLOTS, used };
}

// Generic Storage preference check — used to sort a Storage Unit's
// attach picker into Preferred/Other sections, same intended/
// unintended split cyberware already has. PURELY a sorting signal,
// never a gate — a Storage Unit with no declared preference (or a
// candidate matching none of them) is still fully attachable, just
// shown in "Other." Matches against the candidate's own category OR
// any of its tags, since some preferences are category-shaped
// (Weapon Rack -> 'firearm') and some are tag-shaped (Drone Racks ->
// a specific size tag like 'large_drone', not the generic 'drone'
// category).
export function isPreferredForStorage(storageItem, candidateItem) {
  const preferred = storageItem?.stats?.storagePreferredCategories;
  if (!preferred || preferred.length === 0) return true;
  if (preferred.includes(candidateItem.category)) return true;
  return (candidateItem.tags || []).some((t) => preferred.includes(t));
}

// Same instinct as isPreferredForStorage above, for the Upgrade attach
// picker specifically — matches an upgrade's own additionType
// (additions.js) against whatever it's being attached to. Three
// housing shapes: a named Addition (additionType === that Addition's
// own id), a Hardpoint (additionType === 'hardpoint', shared by all 4
// sizes — nothing here is size-gated), or the vehicle's own native
// Upgrade Capacity (additionType == null — currently just Rigger
// Cocoon). Purely a sort signal, same as storage — never a gate.
export function isPreferredForAddition(housingItem, upgradeItem) {
  if (!housingItem) return true;
  const isNativeVehicle = housingItem.category === 'vehicle' || housingItem.category === 'drone';
  if (isNativeVehicle) return upgradeItem.additionType == null;
  if (housingItem.tags?.includes('hardpoint')) return upgradeItem.additionType === 'hardpoint';
  return upgradeItem.additionType === housingItem.id;
}
