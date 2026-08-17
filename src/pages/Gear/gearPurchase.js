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
// only one axis is ever relevant per item, matching formatCost's branching.
export function resolveCost(item, config = {}) {
  if (item.costBase != null && item.costPerRating != null) {
    return item.costBase + item.costPerRating * (config.rating ?? 0);
  }
  if (item.costPerRating != null) return item.costPerRating * (config.rating ?? 0);
  if (item.costPerCapacity != null) return item.costPerCapacity * (config.capacity ?? 0);
  if (item.costPerUnit != null) return item.costPerUnit * (config.units ?? 1);
  return item.cost ?? 0;
}

export function defaultConfig(item) {
  if (item.ratingRange) return { rating: item.ratingRange[0] };
  if (item.capacityRange) return { capacity: item.capacityRange[0] };
  if (item.costPerUnit != null) return { units: 1 };
  return {};
}
