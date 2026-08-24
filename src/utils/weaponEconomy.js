// Firing mode + ammo type modifiers — confirmed against source directly.
// Attack Rating is computed precisely here since it's the literal dice
// pool comparison (Attack Rating vs. Defense Rating). Damage Value
// modifiers are shown as reference text instead of auto-combined into
// one resolved string — the data itself is irregular (most ammo types
// are a plain number, but Gel converts the damage type entirely to
// "Stun" and Stick-n-Shock is the string "-1S(e)" with an exploit tag
// baked in) — auto-resolving that cleanly would mean guessing at cases
// that don't reduce to simple arithmetic.
//
// Burst Fire is ONE selectable mode using its narrow-burst numbers
// (AR-4/DV+2), not forked into narrow/wide variants — wide burst
// doesn't modify AR/DV at all, it's a targeting choice (split the pool
// across two targets), not a firing-mode stat change. Shown as
// reference text alongside BF instead.

export const FIRE_MODE_MODIFIERS = {
  SS: {
    label: 'Single Shot',
    attackRatingModifier: 0,
    damageValueModifier: 0,
    roundsUsed: 1,
    note: 'Every ranged weapon can fire SS even if not listed among its modes.',
  },
  SA: {
    label: 'Semi-Auto',
    attackRatingModifier: -2,
    damageValueModifier: 1,
    roundsUsed: 2,
  },
  BF: {
    label: 'Burst Fire',
    attackRatingModifier: -4,
    damageValueModifier: 2,
    roundsUsed: 4,
    note: 'Or wide burst: split your dice pool across two targets instead, each treated as SA — no AR/DV change, just a targeting choice.',
  },
  FA: {
    label: 'Full Auto',
    attackRatingModifier: -6,
    damageValueModifier: 0,
    roundsUsed: 10,
    note: 'Hits every valid target in a 1m-radius area (each defender rolls separately); radius expandable by 1m per additional -2 Attack Rating, as long as Attack Rating stays above 0.',
  },
};

// Every weapon can fire SS regardless of its own stats.modes list —
// confirmed directly. The rest of a weapon's selectable modes come
// from its own data.
export function availableModesFor(item) {
  const modes = new Set(['SS', ...(item.stats?.modes || [])]);
  return Array.from(modes).filter((m) => FIRE_MODE_MODIFIERS[m]);
}

export const AMMO_TYPE_MODIFIERS = {
  Regular: { attackRatingModifier: 0, damageValueNote: 'No modifier — base case.' },
  APDS: { attackRatingModifier: 2, damageValueNote: '-1' },
  Explosive: { attackRatingModifier: 0, damageValueNote: '+1. Critical glitch = misfire: resist the weapon\'s own DV, attack misses, weapon destroyed.' },
  Flechette: { attackRatingModifier: 1, damageValueNote: '-1' },
  Gel: { attackRatingModifier: 0, damageValueNote: 'Converts damage to Stun. Target tests Agility (2) or Body (4) or goes Prone (threshold +1 on BF/FA).' },
  'Stick-n-Shock': { attackRatingModifier: 1, damageValueNote: '-1, converts to Stun (e), applies Zapped.' },
  Caseless: { attackRatingModifier: 0, damageValueNote: 'No modifier — rarity/trackability only.' },
};

export const AMMO_TYPE_OPTIONS = Object.keys(AMMO_TYPE_MODIFIERS);

// Effective Attack Ratings — base (5-value range-band array, nulls
// preserved for ranges the weapon can't reach) + mode modifier + ammo
// modifier, applied uniformly across every non-null range. Confirmed
// against the worked example directly: an AR modifier changes every
// listed range equally, not per-range.
export function resolveEffectiveAttackRatings(item, selectedMode, loadedAmmoType) {
  const base = item.stats?.attackRatings || [];
  const modeModifier = FIRE_MODE_MODIFIERS[selectedMode]?.attackRatingModifier ?? 0;
  const ammoModifier = AMMO_TYPE_MODIFIERS[loadedAmmoType]?.attackRatingModifier ?? 0;
  const totalModifier = modeModifier + ammoModifier;

  return base.map((val) => (val == null ? null : val + totalModifier));
}

// Ammo capacity for whatever container is currently selected — most
// weapons have one flat ammo.capacity; the three Machine Guns have
// ammo.options (clip vs. belt) instead, needing a container choice to
// resolve which capacity applies.
export function resolveAmmoCapacity(item, ammoContainer) {
  const ammo = item.stats?.ammo;
  if (!ammo) return null;
  if (ammo.options) {
    const match = ammo.options.find((o) => o.container === ammoContainer);
    return match?.capacity ?? ammo.options[0]?.capacity ?? null;
  }
  return ammo.capacity ?? null;
}
