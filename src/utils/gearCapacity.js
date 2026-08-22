// Generic capacity-check utility, shared across the three separate
// capacity pools (cyberware/armor/device) established in the schema
// split. Soft-gate only, matching the "honorbound" philosophy used
// everywhere else — never blocks an attach, just tells the caller
// whether it would put the housing over capacity so the UI can confirm
// before proceeding. A pen-and-paper table would never stop someone
// from writing down a fourth attachment on a 3-slot rifle; this
// shouldn't either.
//
// `pool` is one of 'cyberware' | 'armor' | 'device' — resolves to the
// matching `{pool}CapacityProvided`/`{pool}CapacityUsed` stat field
// pair (plus the Range/PerRating/EqualsRating variants).

// `housingConfig` matters for configurable housings — glasses/cameras/
// contacts/etc. are bought at a chosen Capacity within a range
// (deviceCapacityProvidedRange), so the real provided number lives on
// the purchased instance's own config.capacity, not a fixed catalog
// stat. Fixed housings (armor jackets, cyberlimbs) just use the flat
// stat and ignore config entirely.
function resolveProvided(housingItem, housingConfig, pool) {
  const stats = housingItem?.stats || {};
  const rangeKey = `${pool}CapacityProvidedRange`;
  const flatKey = `${pool}CapacityProvided`;

  if (stats[rangeKey] != null && housingConfig?.capacity != null) {
    return housingConfig.capacity;
  }
  if (stats[flatKey] != null) return stats[flatKey];
  return 0;
}

function resolveUsedByOne(consumerItem, consumerConfig, pool) {
  const stats = consumerItem?.stats || {};
  const perRatingKey = `${pool}CapacityUsedPerRating`;
  const flatKey = `${pool}CapacityUsed`;

  if (stats[perRatingKey] != null) {
    const rating = consumerConfig?.rating ?? 1;
    return stats[perRatingKey] * rating;
  }
  if (stats[flatKey] != null) return stats[flatKey];
  return 0;
}

/**
 * Computes capacity usage for a housing instance against everything
 * currently attached to it.
 *
 * @param {object} housingItem - the resolved catalog item for the housing (ALL_GEAR[...])
 * @param {object} housingConfig - the housing INSTANCE's own purchase config (entry.config) — needed to resolve Range-based provided capacity
 * @param {Array<{item: object, config: object}>} attachments - resolved catalog items + purchase config for each thing currently attached to this housing
 * @param {'cyberware'|'armor'|'device'} pool
 * @returns {{ provided: number, used: number, overCapacity: boolean, remaining: number }}
 */
export function computeCapacity(housingItem, housingConfig, attachments, pool) {
  const provided = resolveProvided(housingItem, housingConfig, pool);
  const used = attachments.reduce(
    (sum, { item, config }) => sum + resolveUsedByOne(item, config, pool),
    0
  );
  return {
    provided,
    used,
    overCapacity: used > provided,
    remaining: provided - used,
  };
}

/**
 * Projects what capacity usage WOULD be if one more item were attached
 * — the actual check to run before showing a confirmation modal.
 */
export function wouldExceedCapacity(housingItem, housingConfig, existingAttachments, candidateItem, candidateConfig, pool) {
  const current = computeCapacity(housingItem, housingConfig, existingAttachments, pool);
  const addedUsage = resolveUsedByOne(candidateItem, candidateConfig, pool);
  return current.used + addedUsage > current.provided;
}

/**
 * Identifies whether an item can act as a housing or a consumer for a
 * given pool, purely by presence of the relevant stat field — no
 * hardcoded category/tag lists to keep in sync as new items get added.
 */
export function isHousingFor(item, pool) {
  const stats = item?.stats || {};
  return stats[`${pool}CapacityProvided`] != null || stats[`${pool}CapacityProvidedRange`] != null;
}

export function isConsumerFor(item, pool) {
  const stats = item?.stats || {};
  return stats[`${pool}CapacityUsed`] != null || stats[`${pool}CapacityUsedPerRating`] != null;
}

// Within the 'cyberware' pool specifically, there are real anatomical
// sub-locations that shouldn't cross-attach even though they draw from
// the same Capacity type — a Smartlink implant belongs in Cybereyes,
// not bolted onto an arm. Armor and device pools don't have this
// problem (any mod genuinely fits any armor item; any device accessory
// genuinely fits any device housing), so this only matters for
// cyberware. Mapped from tags already on the data rather than a new
// field — the tags already faithfully distinguish these families,
// nothing needed adding to the gear files themselves.
const CYBERWARE_FAMILY_BY_TAG = {
  eyeware: 'eyeware',
  earware: 'earware',
  cyberlimb: 'cyberlimb',
  cyberlimb_accessory: 'cyberlimb',
  implant_weapon: 'cyberlimb',
  firearm_implant: 'cyberlimb',
};

export function cyberwareFamilyOf(item) {
  if (!item?.tags) return null;
  for (const tag of item.tags) {
    if (CYBERWARE_FAMILY_BY_TAG[tag]) return CYBERWARE_FAMILY_BY_TAG[tag];
  }
  return null;
}
