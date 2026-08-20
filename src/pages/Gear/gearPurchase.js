import { isGradeable, gradeCostMultiplier } from '@utils/augmentationEconomy';

// Cost resolution for the purchase flow — same branching shape as
// formatCost in gearFormat.js, but returns a real number instead of a
// display string, since the modal needs to check it against nuyen.

export function isConfigurable(item) {
  return item.costPerRating != null || item.costPerCapacity != null || item.costPerUnit != null;
}

export function configLabel(item) {
  if (item.costPerRating != null) return 'Rating';
  if (item.costPerCapacity != null) return 'Capacity';
  if (item.costPerUnit != null) return item.unitLength ? `Length (× ${item.unitLength}m)` : `Quantity (× ${item.unitQuantity ?? 1})`;
  return null;
}

export function configRange(item) {
  if (item.ratingRange) return item.ratingRange;
  if (item.capacityRange) return item.capacityRange;
  return [1, 10]; // costPerUnit items (rope, etc.) with no explicit range — how many "units" to buy
}

// config is { rating } or { capacity } or { units } depending on the item —
// only one of those axes is ever relevant per item, matching formatCost's
// branching. Grade is a SEPARATE, independent axis that stacks on top of
// whichever of those applies (a Rating 3 item at Beta grade needs both),
// rather than being one more mutually-exclusive branch.
export function resolveCost(item, config = {}) {
  let base;
  if (item.costBase != null && item.costPerRating != null) {
    base = item.costBase + item.costPerRating * (config.rating ?? 0);
  } else if (item.costPerRating != null) {
    base = item.costPerRating * (config.rating ?? 0);
  } else if (item.costPerCapacity != null) {
    base = item.costPerCapacity * (config.capacity ?? 0);
  } else if (item.costPerUnit != null) {
    base = item.costPerUnit * (config.units ?? 1);
  } else {
    base = item.cost ?? 0;
  }

  if (isGradeable(item)) {
    base *= gradeCostMultiplier(config.grade || 'standard');
  }

  return base;
}

export function defaultConfig(item) {
  const config = {};
  if (item.ratingRange) config.rating = item.ratingRange[0];
  else if (item.capacityRange) config.capacity = item.capacityRange[0];
  else if (item.costPerUnit != null) config.units = 1;
  if (isGradeable(item)) config.grade = 'standard';
  return config;
}

// Actually applies a purchase to a character — deducts nuyen, adds the
// item to inventory. `purchase` is whatever PurchaseModal's onPurchase
// receives: { itemId, ...config }. Returns false if spendNuyen fails
// (shouldn't happen in normal use, since the Buy button is already
// disabled when unaffordable — this is just a defensive check, not
// meant to drive any error UI).
export function commitPurchase(character, item, purchase) {
  const cost = resolveCost(item, purchase);
  if (!character.spendNuyen(cost)) return false;

  const { itemId, ...config } = purchase;
  character.addGear(itemId, config, 1);
  return true;
}
