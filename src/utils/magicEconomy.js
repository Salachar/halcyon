import { PRIORITY_TABLE } from '@data/character/priority_table';
import { POWERS } from '@data/character/powers';

// Combat skills specifically, for Improved Ability's doubled cost per
// level — not directly confirmed as an explicit "isCombat" flag
// anywhere in skills.js, inferred from general convention (the three
// skills that resolve a physical attack roll). Worth verifying/
// correcting if this list is wrong.
const COMBAT_SKILLS = ['close_combat', 'firearms', 'exotic_weapons'];

// The priority-table Magic/Resonance value, recomputed fresh — NOT
// character.magicResonance, which is a plain mutable field that gets
// directly overwritten if Karma or adjustment points ever raise Magic
// later (Character.js has no separate "base" vs "current" split for
// it). Every known-count formula explicitly requires "the Magic in the
// Priority table, not as altered with any points, Karma, or any other
// adjustments" — so this has to be recomputed from the original
// priority pick every time, the same lookup CreationModal itself does
// inline at creation (magicRow.magicResonance[magicType]).
export function originalMagicOrResonance(character) {
  const row = character.priorities?.magicResonance ? PRIORITY_TABLE[character.priorities.magicResonance] : null;
  if (!row?.magicResonance) return 0;
  return row.magicResonance[character.magicType] ?? 0;
}

// Cost for one known power entry — real shape confirmed against
// powers.js: `cost` (flat) or `costPerLevel` (a plain number for most
// powers, but an OBJECT for Improved Ability specifically —
// { combat, other } — since combat skills cost double per level).
// `entry.selection` holds the chosen skill for Improved Ability;
// checked against COMBAT_SKILLS above to pick the right tier.
function powerCost(def, entry) {
  if (!def) return 0;
  if (def.cost != null) return def.cost;
  if (typeof def.costPerLevel === 'number') return def.costPerLevel * (entry.level ?? 1);
  if (typeof def.costPerLevel === 'object') {
    const tier = COMBAT_SKILLS.includes(entry.selection) ? 'combat' : 'other';
    return (def.costPerLevel[tier] ?? 0) * (entry.level ?? 1);
  }
  return 0;
}

// Power Points currently spent — the live sum across every known
// power. Used both for the Power Point display itself and (for Mystic
// Adepts specifically) subtracted from their capped pool to derive the
// spell budget, since that split is purchase-driven, not a separate
// stored "I dedicate X points" decision — confirmed: "They first
// purchase adept powers up to a maximum of their Magic attribute then
// multiply the remaining Magic by 2."
function powerPointsSpent(character) {
  return character.powers.reduce((sum, entry) => sum + powerCost(POWERS[entry.powerId], entry), 0);
}

// Power Point budget/pool — genuinely different shape per Adept type,
// not a shared formula:
//   adept: tracks LIVE Magic (character.effectiveMagicResonance,
//     already Essence-loss-adjusted) — confirmed unqualified: "whenever
//     adept characters gain or lose a point of Magic, they also gain or
//     lose a power point." Grows with Karma advancement.
//   mysticAdept: FIXED at the priority-table value (doesn't grow with
//     Karma — only the Power Point Initiation metamagic adds more,
//     which this app doesn't track), but still reduced by CURRENT
//     Essence loss — confirmed: "not adjusted with Karma or adjustment
//     points (but it is reduced by Essence loss)."
// Power Point metamagic — confirmed: "If you're an adept or mystic
// adept, you can gain a Power Point instead of a metamagic... take
// this as many times as you like." This is what actually closes the
// gap flagged earlier: without it, a Mystic Adept's pool was
// permanently frozen at creation with no way to ever grow — this is
// their real, in-rules growth path, and it applies to pure Adepts too,
// stacking on top of their own Magic-linked growth.
function powerPointMetamagicBonus(character) {
  return character.metamagics.filter((m) => m.metamagicId === 'power_point').length;
}

export function powerPointBudget(character) {
  const metamagicBonus = powerPointMetamagicBonus(character);
  if (character.magicType === 'adept') {
    return character.effectiveMagicResonance + metamagicBonus;
  }
  if (character.magicType === 'mysticAdept') {
    return Math.max(0, originalMagicOrResonance(character) - character.magicPointsLostToEssence) + metamagicBonus;
  }
  return 0;
}

export function powerPointsRemaining(character) {
  return powerPointBudget(character) - powerPointsSpent(character);
}

// Initiation / Submersion — confirmed identical formula, kept as two
// named functions since they're conceptually separate processes (the
// source itself never treats them as one thing), even though the math
// happens to match exactly.
export function initiationKarmaCost(desiredGrade) {
  return 10 + desiredGrade;
}

export function submersionKarmaCost(desiredGrade) {
  return 10 + desiredGrade;
}

// Known-spell/ritual budget — same combined pool for both per FAQ
// ("Rituals still have to be picked separately, out of the same
// allowance of known spells"). Genuinely different per magic type, not
// a single shared formula:
//   full: Magic x 2
//   aspected: Magic x 2 for Sorcery/Enchanting aspects, 0 for
//     Conjuring (they summon spirits, no known-spell list) — reads
//     character.magicAspect to tell which
//   adept: 0 — pure adepts spend everything on Power Points instead
//   mysticAdept: derived from powerPointBudget above (already
//     Essence-loss-adjusted, correctly NOT growing with Karma) minus
//     whatever's actually been spent on powers, doubled
//   technomancer / mundane: 0 (Complex Forms and nothing, respectively)
export function knownSpellBudget(character) {
  const magic = originalMagicOrResonance(character);

  if (character.magicType === 'full') return magic * 2;
  if (character.magicType === 'aspected') return character.magicAspect === 'conjuring' ? 0 : magic * 2;
  if (character.magicType === 'mysticAdept') {
    return Math.max(0, powerPointBudget(character) - powerPointsSpent(character)) * 2;
  }
  return 0; // adept, technomancer, mundane
}

// Complex Forms — Resonance x 2, technomancer-only, no sub-type split
// the way Spells has to handle (Aspected magicians differ by aspect;
// technomancers don't have an equivalent branching). Confirmed: "When
// they select their Resonance Priority, they also select a number of
// complex forms equal to Resonance x 2 (using the Resonance figure
// from the Priority table, not the number as adjusted)."
export function knownComplexFormBudget(character) {
  if (character.magicType !== 'technomancer') return 0;
  return originalMagicOrResonance(character) * 2;
}
