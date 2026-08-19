import { createPool, addComponent } from '@utils/pool';
import { SKILLS } from '@data/character/skills';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// The first real Pool builder — proves out the "shape shared, construction
// not" design from way back. Colocated with SkillRow since it's the only
// consumer right now; nothing stops Combat importing this directly later
// if a weapon pool ever needs a plain skill+attribute base to build on.
//
// Returns null when the skill genuinely can't be attempted (rank 0 on a
// skill that isn't untrainable) — callers should treat null as "don't
// render a roller," not as an empty pool.
//
// Wound penalty is applied here since a skill test is never Damage
// Resistance — the one exemption the rule carves out. A future
// buildResistancePool (or similar) needs to deliberately NOT call this
// same step, not inherit it by accident.
export function buildSkillPool(character, skillId, { useSecondary = false } = {}) {
  const def = SKILLS[skillId];
  if (!def) return null;

  const rank = character.getSkillRank(skillId);
  if (rank === 0 && !def.untrained) return null;

  const attrKey = useSecondary && def.secondaryAttribute ? def.secondaryAttribute : def.primaryAttribute;
  const attrValue = character.getAttribute(attrKey);

  let pool = createPool();
  pool = rank > 0
    ? addComponent(pool, def.label, rank, 'skill')
    : addComponent(pool, `${def.label} (untrained)`, -1, 'untrained');
  pool = addComponent(pool, capitalize(attrKey), attrValue, 'attribute');
  pool = addComponent(pool, 'Wound Penalty', -character.woundPenalty, 'wound');

  // A dice pool can't go negative — addComponent is a pure accumulator
  // with no opinion on that, so the floor lives here, where Shadowrun's
  // actual dice-pool semantics are known.
  return { ...pool, total: Math.max(0, pool.total) };
}

// Cumulative Karma cost climbing from one rank to another — matches the
// advancement table (5 x new rank per step) exactly. A single-step raise
// just resolves to 5 x toRank, but this stays correct if that ever needs
// to jump more than one rank at once (e.g. a GM grant).
export function karmaCost(fromRank, toRank) {
  let total = 0;
  for (let r = fromRank + 1; r <= toRank; r++) {
    total += 5 * r;
  }
  return total;
}

// Whether this character has Aptitude for this specific skill — checked
// for real against Character.qualities' actual shape, even though no
// quality-picking UI exists yet. Always false today, correct whenever
// qualities land, rather than a hardcoded cap that'd need revisiting.
export function hasAptitude(character, skillId) {
  return character.qualities.some((q) => q.qualityId === 'aptitude' && q.selection === skillId);
}
