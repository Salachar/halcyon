import { isGradeable, gradeCostMultiplier, resolveEssenceCost, needsInstallChoice } from '@utils/augmentationEconomy';

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
  const ratingRange = item.ratingRange || item.stats?.ratingRange;
  const capacityRange = item.capacityRange || item.stats?.capacityRange;
  if (ratingRange) return ratingRange;
  if (capacityRange) return capacityRange;
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

// defaultConfig accepts an optional starting rating/capacity override —
// used by the cyberlimb Enhance flow, which needs to open pre-filled at
// "next rating" rather than the item's raw minimum.
//
// installLocation defaults to 'flesh' for items with an install choice
// — the conservative default (full Essence charged), so the player has
// to explicitly opt into "cyberlimb" rather than accidentally getting a
// free Essence pass by not touching the field.
export function defaultConfig(item, overrideStart) {
  const config = {};
  const ratingRange = item.ratingRange || item.stats?.ratingRange;
  const capacityRange = item.capacityRange || item.stats?.capacityRange;
  if (ratingRange) config.rating = overrideStart ?? ratingRange[0];
  else if (capacityRange) config.capacity = overrideStart ?? capacityRange[0];
  else if (item.costPerUnit != null) config.units = 1;
  if (isGradeable(item)) config.grade = 'standard';
  if (needsInstallChoice(item)) config.installLocation = 'flesh';
  return config;
}

// Cheap "at a glance" check for dimming the $ button in a GearTable row,
// before anyone's opened the modal or picked a config — uses the
// item's default config as a heuristic (cheapest plausible version),
// not a guarantee every rating/grade combo is affordable. No character
// selected = don't dim anything, same "reference works without a
// character" rule the whole Gear tab already follows.
//
// defaultConfig's 'flesh' default here is deliberately the stricter
// case for this heuristic too — Essence-charged, not Capacity-charged
// — so this errs toward under-promising affordability rather than
// over-promising it if the player would've actually picked cyberlimb.
export function canAffordItem(character, item) {
  if (!character) return true;

  const config = defaultConfig(item);
  const cost = resolveCost(item, config);
  if (character.nuyen < cost) return false;

  if (isGradeable(item)) {
    const essenceCost = resolveEssenceCost(item, config);
    if (character.essence - essenceCost < 0) return false;
  }

  return true;
}

// Actually applies a purchase to a character — deducts nuyen, adds one
// new instance to gearManager. `purchase` is whatever PurchaseModal's
// onPurchase receives: { itemId, ...config }. Returns the new instance
// id on success, or null if spendNuyen fails (shouldn't happen in
// normal use, since the Buy button is already disabled when
// unaffordable — this is just a defensive check).
export function commitPurchase(character, item, purchase) {
  const cost = resolveCost(item, purchase);
  if (!character.spendNuyen(cost)) return null;

  const { itemId, ...config } = purchase;
  return character.gearManager.add(itemId, config);
}

// Same result as commitPurchase, minus the nuyen deduction — "the
// player found it" acquisition path. Doubles as the correction/undo
// mechanism for the whole app: remove a mistaken purchase, re-grab the
// right one for free, no separate refund system needed. Essence still
// applies here (checked by the caller before this is reachable) — this
// bypasses cost, not physical capacity.
export function commitFreeGrab(character, item, purchase) {
  const { itemId, ...config } = purchase;
  return character.gearManager.add(itemId, config);
}
