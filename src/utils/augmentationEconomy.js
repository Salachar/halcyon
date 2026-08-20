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

// Base essence (rating-scaled if applicable) x the grade multiplier.
// config.grade defaults to 'standard' if absent — matters for gear
// entries saved before grade tracking existed, so they resolve as
// Standard rather than crashing on a missing key.
export function resolveEssenceCost(item, config = {}) {
  const stats = item.stats || {};
  const base = stats.essencePerRating != null
    ? stats.essencePerRating * (config.rating ?? 1)
    : stats.essenceCost ?? 0;

  return base * gradeEssenceMultiplier(config.grade || 'standard');
}
