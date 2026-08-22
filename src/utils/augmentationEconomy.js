import { AUGMENTATION_GRADES } from '@data/gear/augmentations';

// Grade math — shared between the purchase flow (gear-tab/gearPurchase.js,
// which needs the cost multiplier) and Character's essence getter (which
// needs the essence multiplier). Neither owns this; both depend on it,
// same reasoning that moved qualityEconomy.js to @utils/ once two
// consumers needed it.
//
// Only cyberware/cyberware_accessory/bioware are gradeable — biotech
// (medkits, DocWagon, patches) is consumables, not augmentation, and
// grade doesn't apply to it.

const GRADEABLE_CATEGORIES = ['cyberware', 'cyberware_accessory', 'bioware'];

export function isGradeable(item) {
  return GRADEABLE_CATEGORIES.includes(item.category);
}

export function gradeCostMultiplier(grade) {
  return AUGMENTATION_GRADES[grade]?.costMultiplier ?? 1;
}

export function gradeEssenceMultiplier(grade) {
  return AUGMENTATION_GRADES[grade]?.essenceMultiplier ?? 1;
}

// Device Rating resolver — confirmed against the FAQ's own guideline
// table ("if not provided [explicitly], use the following table"), not
// invented. Checked in priority order:
//
//   1. Vehicles/drones use Sensor as Device Rating (explicit FAQ rule)
//      — reads live off the item's own sensor stat, never duplicated.
//   2. An explicit stats.deviceRating always wins (commlinks, cyberdecks,
//      cyberjacks, some electronics accessories state their own real
//      number in source).
//   3. Gradeable cyberware/bioware resolves from the purchased grade,
//      using the FAQ's own tier language: Average(2)/Smart(3)/
//      Advanced(4)/Cutting Edge(5) map onto standard-or-used/alpha/
//      beta/delta. This is the actual fix for "delta should be 5" —
//      computed from config at read time, never stored flat, so it
//      moves correctly if someone reads the same item at a different
//      grade.
//   4. Everything else that's a real PAN node (wireless: true) with no
//      more specific guidance defaults to the FAQ's Average(2) tier,
//      which explicitly names "weapons" alongside basic cyberware —
//      covers the rest of the catalog without guessing.
//
// Returns null for anything that isn't a PAN node at all — callers
// (matrixMonitorMaxFor, formatItemDetails) should treat null the same
// way they already treat "no Device Rating," i.e. don't show a Matrix
// CM or a DR line for it.
const GRADE_DEVICE_RATING = {
  standard: 2,
  used: 2,
  alphaware: 3,
  betaware: 4,
  deltaware: 5,
};

export function resolveDeviceRating(item, config = {}) {
  const stats = item.stats || {};

  if (stats.sensor != null) return stats.sensor;
  if (stats.deviceRating != null) return stats.deviceRating;

  // Everything below only applies to real PAN nodes — being gradeable
  // cyberware doesn't by itself make something Matrix-relevant (a
  // plain, non-wireless cyberlimb has no networked component at all,
  // confirmed no Wireless Bonus text exists anywhere in that chapter).
  // Grade only picks the TIER for something that's already wireless,
  // it doesn't grant PAN-node status on its own.
  if (!item.wireless) return null;

  if (isGradeable(item)) return GRADE_DEVICE_RATING[config.grade || 'standard'] ?? 2;

  return 2;
}

// Cyber Implant Weapons flagged with stats.installChoice: 'fleshOrCyberlimb'
// (see cyberware_bioware.js file header) are an either/or per the source:
// installed into a cyberlimb costs Capacity, installed into flesh costs
// Essence — not both, which is what every purchase charged before this
// fix. Doesn't touch anything about HOW the Capacity side gets checked
// against a specific limb's capacity — that's a separate attach-time
// concern (gearCapacity.js), this just stops charging Essence for a
// weapon the player said isn't going into flesh at all.
export function needsInstallChoice(item) {
  return item.stats?.installChoice === 'fleshOrCyberlimb';
}

// Base essence (rating-scaled if applicable) x the grade multiplier.
// config.grade defaults to 'standard' if absent — matters for gear
// entries saved before grade tracking existed, so they resolve as
// Standard rather than crashing on a missing key.
export function resolveEssenceCost(item, config = {}) {
  const stats = item.stats || {};

  if (needsInstallChoice(item) && config.installLocation === 'cyberlimb') {
    return 0;
  }

  const base = stats.essencePerRating != null
    ? stats.essencePerRating * (config.rating ?? 1)
    : stats.essenceCost ?? 0;

  return base * gradeEssenceMultiplier(config.grade || 'standard');
}
