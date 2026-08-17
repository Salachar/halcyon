// Generic dice-pool primitives. No game-specific knowledge lives here —
// a Pool is a snapshot of "how many dice, and why," assembled fresh
// right before a roll by a feature-specific builder (buildSkillPool,
// buildWeaponPool, buildMatrixActionPool, etc. — colocated with
// whichever feature needs them, not defined here). Never stored on a
// character, always recomputed — same "derived, not stored" instinct
// as everything else in this system.
//
// Shape: { total, components: [{ label, value, source }], diceType, hitThreshold }
// hitThreshold is optional — Simple Tests have one, Opposed Tests don't
// (they compare hit totals directly instead).

export function createPool(diceType = 'd6', hitThreshold = null) {
  return { total: 0, components: [], diceType, hitThreshold };
}

// Skips zero-value components — keeps the breakdown clean (no "Wound: 0"
// cluttering a pool where nothing's actually wrong).
export function addComponent(pool, label, value, source) {
  if (!value) return pool;
  return {
    ...pool,
    components: [...pool.components, { label, value, source }],
    total: pool.total + value,
  };
}

export function applyEdgeBoost(pool, boost) {
  return addComponent(pool, boost.label, boost.diceBonus, 'edge');
}
