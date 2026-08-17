// Formatting helpers shared by every Gear sub-tab. Centralized here so a
// pricing-shape change (see the "wrinkles" noted across all 7 GEAR_*.js
// files — costPerRating, costPerCapacity, costPerUnit, costMonthly, etc.)
// only needs handling once, not reimplemented per sub-tab.

export function formatCost(item) {
  if (item.costRange) return `${item.costRange[0]}¥–${item.costRange[1]}¥`;
  if (item.costMonthly != null) return `${item.costMonthly.toLocaleString()}¥/mo or ${item.costYearly.toLocaleString()}¥/yr`;
  if (item.costBase != null && item.costPerRating != null) return `${item.costBase}¥ + Rating × ${item.costPerRating}¥`;
  if (item.costPerRating != null) return `Rating × ${item.costPerRating.toLocaleString()}¥`;
  if (item.costPerCapacity != null) return `Capacity × ${item.costPerCapacity.toLocaleString()}¥`;
  if (item.costPerUnit != null) {
    const unit = item.unitLength ? `${item.unitLength}m` : item.unitQuantity ? `${item.unitQuantity}` : 'unit';
    return `${item.costPerUnit}¥ per ${unit}`;
  }
  if (item.cost != null) return `${item.cost.toLocaleString()}¥`;
  return '—';
}

export function formatAvailability(item) {
  if (item.availabilityEqualsRating) return 'Rating';
  if (item.availabilityFormula) return item.availabilityFormula;
  if (item.availability == null) return '—';
  const suffix = item.legality === 'illegal' ? ' (I)' : item.legality === 'licensed' ? ' (L)' : '';
  return `${item.availability}${suffix}`;
}

export function formatDamageValue(item) {
  return item.stats?.damageValue ?? item.stats?.damageValueFormula ?? '—';
}

export function formatAttackRatings(item) {
  const ar = item.stats?.attackRatings;
  if (Array.isArray(ar)) return ar.map((v) => (v == null ? '—' : v)).join('/');
  return item.stats?.attackRatingsFormula ?? '—';
}

export function formatEssence(item) {
  if (item.stats?.essencePerRating != null) return `Rating × ${item.stats.essencePerRating}`;
  if (item.stats?.essenceCost != null) return String(item.stats.essenceCost);
  return '—';
}

export function formatCapacity(item) {
  if (item.stats?.capacityRange) return `${item.stats.capacityRange[0]}–${item.stats.capacityRange[1]}`;
  if (item.stats?.capacityPerRating != null) return `Rating × ${item.stats.capacityPerRating}`;
  if (item.stats?.capacity != null) return String(item.stats.capacity);
  return '—';
}
