// Formatting helpers shared by every Gear sub-tab. Centralized here so a
// pricing-shape change (see the "wrinkles" noted across all 12 GEAR_*.js
// files — costPerRating, costPerCapacity, costPerUnit, costMonthly, etc.)
// only needs handling once, not reimplemented per sub-tab.

import { isGradeable, resolveEssenceCost, resolveDeviceRating } from '@utils/augmentationEconomy';

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
  const suffix = item.legality === 'illegal' ? ' (I)' : item.legality === 'licensed' ? ' (L)' : item.legality === 'restricted' ? ' (R)' : item.legality === 'forbidden' ? ' (F)' : '';
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

// Updated for the capacity field split — armor/device/cyberware are
// three separate pools now (armorCapacityProvided/Used, etc.), each
// checked in turn rather than one flat `capacity` field that no longer
// exists anywhere in the data. Works for both housings (Provided) and
// consumers (Used) without the caller needing to say which — a given
// item only ever has one of these six fields set, never more than one,
// so whichever matches first is the right one.
export function formatCapacity(item) {
  const stats = item.stats || {};
  const pools = ['armor', 'device', 'cyberware'];

  for (const pool of pools) {
    const providedRange = stats[`${pool}CapacityProvidedRange`];
    const provided = stats[`${pool}CapacityProvided`];
    const usedPerRating = stats[`${pool}CapacityUsedPerRating`];
    const used = stats[`${pool}CapacityUsed`];

    if (providedRange) return `${providedRange[0]}–${providedRange[1]}`;
    if (provided != null) return String(provided);
    if (usedPerRating != null) return `Rating × ${usedPerRating}`;
    if (used != null) return String(used);
  }

  return '—';
}

// SCHEMA UPDATE: the gear catalog's schema pass (11 of 12 category
// files, everything except sensors_security_survival.js so far)
// converted `stats.effect` / `stats.wirelessBonus` from single strings
// into `stats.effects` / `stats.wirelessBonuses` ARRAYS — one distinct
// mechanic per entry, so a component can render a real list instead of
// a single comma-joined sentence. This function, and the two call
// sites in GearList and GearDetailModal, are the actual consumers that
// needed updating to match; nothing rendered correctly off the new
// shape before this pass.
//
// BACKWARD COMPATIBILITY: sensors_security_survival.js has not been
// through the schema pass yet and may still carry the old singular
// `stats.effect` / `stats.wirelessBonus` strings (or, on many items,
// nothing at all — that file predates the effects/wirelessBonus
// convention entirely). Rather than let that file render broken or
// require touching it under time pressure, both getters below check
// the new array field FIRST and fall back to wrapping the old singular
// field in a one-element array if present. Delete the fallback once
// sensors_security_survival.js gets its own schema pass; until then
// this keeps every file rendering, new or old.
function resolveEffects(stats) {
  if (Array.isArray(stats.effects)) return stats.effects;
  if (stats.effect) return [stats.effect];
  return [];
}
function resolveWirelessBonuses(stats) {
  if (Array.isArray(stats.wirelessBonuses)) return stats.wirelessBonuses;
  if (stats.wirelessBonus) return [stats.wirelessBonus];
  return [];
}

// Shared "what does this item actually do" summary — extracted from
// GearList so Market and the sheet can never quietly drift apart on
// what Essence/DV/AR/effects/wireless bonuses look like, even though
// they render in different layouts (Market's per-tab table columns vs.
// GearList's stacked cards) and that split is staying as-is for now.
// Returns the joined "parts" line separately from wirelessBonuses/
// effects, since both of those get their own visual treatment wherever
// they're shown, not folded into the same string.
//
// `referenceOnly` is now surfaced here too. Across the catalog's
// schema pass this flag means "this text is real and accurate, but no
// live computed field in this app currently drives it — the player has
// to read it and apply it themselves, the same way they'd read any
// other line in the rulebook." Consumers use it to visually distinguish
// that reminder-style text from the small set of effects a live stat
// (flatDicePool, deviceModifiers, damageValue+attackRatings+skill,
// ratingTable, compatibleWith, conditionalModifiers, integratedWeapons,
// altMode, etc.) is actually already computing. It's item-level, not
// per-effect-line — an item's `effects` and `wirelessBonuses` share one
// referenceOnly value, since the flag describes the item's overall
// mechanization status, not each individual line within it.
export function formatItemDetails(item, config = {}) {
  const stats = item.stats || {};
  const parts = [];

  if (isGradeable(item)) {
    parts.push(`Essence ${resolveEssenceCost(item, config).toFixed(2)}`);
  }
  if (stats.damageValue || stats.damageValueFormula) {
    parts.push(`DV ${formatDamageValue(item)}`);
  }
  if (stats.attackRatings || stats.attackRatingsFormula) {
    parts.push(`AR ${formatAttackRatings(item)}`);
  }
  const deviceRating = resolveDeviceRating(item, config);
  if (deviceRating != null) {
    parts.push(`DR ${deviceRating}`);
  }

  const pools = ['armor', 'device', 'cyberware'];
  for (const pool of pools) {
    const perRatingKey = `${pool}CapacityUsedPerRating`;
    const flatKey = `${pool}CapacityUsed`;
    if (stats[perRatingKey] != null) {
      const rating = config?.rating ?? 1;
      parts.push(`Uses ${stats[perRatingKey] * rating} Capacity`);
      break;
    }
    if (stats[flatKey] != null) {
      parts.push(`Uses ${stats[flatKey]} Capacity`);
      break;
    }
  }

  return {
    line: parts.length ? parts.join(' · ') : null,
    effects: resolveEffects(stats),
    wirelessBonuses: resolveWirelessBonuses(stats),
    referenceOnly: Boolean(item.referenceOnly),
  };
}
