import { useState } from 'react';

import { POWERS, POWER_IDS } from '@data/character/powers';
import { SKILLS } from '@data/character/skills';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { powerPointBudget, powerPointsRemaining } from '@utils/magicEconomy';

import './adeptPowers.css';

const PHYSICAL_ATTRIBUTES = [
  { key: 'body', label: 'Body' },
  { key: 'agility', label: 'Agility' },
  { key: 'reaction', label: 'Reaction' },
  { key: 'strength', label: 'Strength' },
];
const SENSES = [
  { key: 'sight', label: 'Sight' },
  { key: 'hearing', label: 'Hearing' },
  { key: 'touch', label: 'Touch' },
  { key: 'taste', label: 'Taste' },
  { key: 'smell', label: 'Smell' },
];
// Not directly confirmed as an explicit "isCombat" flag anywhere in
// skills.js — inferred from general convention for Improved Ability's
// doubled cost. Worth verifying/correcting if wrong.
const COMBAT_SKILLS = ['close_combat', 'firearms', 'exotic_weapons'];

function activationLabel(a) {
  return { minor: 'Minor Action', major: 'Major Action', passive: 'Passive' }[a] || a;
}

// Real cost shape confirmed against powers.js: `cost` (flat) or
// `costPerLevel` (a plain number for most powers, an OBJECT for
// Improved Ability specifically — { combat, other }).
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

function selectionOptions(def, character) {
  if (def.requiresSelection === 'physicalAttribute') return PHYSICAL_ATTRIBUTES;
  if (def.requiresSelection === 'sense') return SENSES;
  if (def.requiresSelection === 'skill') {
    // "Boosts a skill you have at least 1 rank in" — filtered here,
    // not hard-enforced elsewhere; a 0-rank skill just never appears
    // as an option rather than being blocked after picking it.
    return Object.keys(SKILLS)
      .filter((id) => character.getSkillRank(id) > 0)
      .map((id) => ({ key: id, label: SKILLS[id].label }));
  }
  return [];
}

function selectionLabel(def, selection, character) {
  return selectionOptions(def, character).find((o) => o.key === selection)?.label ?? selection;
}

// Adept Powers — a Power Point SPEND (powerPointBudget/
// powerPointsRemaining, magicEconomy.js), genuinely different shape
// from KnownSpells/KnownComplexForms' flat pick-N-count. Four distinct
// instance shapes depending on the power's own fields:
//   flat, no selection         -> simple Learn/Remove toggle
//   leveled, no selection      -> single instance, level stepper
//   flat, requires selection   -> multiple instances (one per distinct
//                                  selection), no level (Improved Sense)
//   leveled, requires selection -> multiple instances, EACH with its
//                                  own level stepper (Attribute Boost,
//                                  Improved Physical Attribute,
//                                  Improved Ability) — not all three
//                                  carry an explicit repeatable: true
//                                  flag in the data, but their own
//                                  description text implies it
//                                  ("if this power is purchased
//                                  multiple times..."), so requiring a
//                                  selection is treated as the real
//                                  signal for multi-instance support.
// Soft-gated against budget, same "inform, don't block" pattern as
// everywhere else — spending past budget just turns the count red.
export default function AdeptPowers({ character }) {
  const { touch } = useCharacterManager();
  const [pendingSelectionFor, setPendingSelectionFor] = useState(null);

  const budget = powerPointBudget(character);
  const remaining = powerPointsRemaining(character);
  const spent = budget - remaining;
  const overBudget = remaining < 0;

  const learnSimple = (powerId) => {
    character.addPower(powerId);
    touch();
  };

  const learnLeveled = (powerId) => {
    character.addPower(powerId, { level: 1 });
    touch();
  };

  const learnWithSelection = (powerId, selection, leveled) => {
    character.addPower(powerId, leveled ? { selection, level: 1 } : { selection });
    touch();
    setPendingSelectionFor(null);
  };

  const adjustLevel = (index, delta, cap) => {
    const entry = character.powers[index];
    const nextLevel = (entry.level ?? 1) + delta;
    if (nextLevel < 1) return;
    if (cap && nextLevel > cap) return;
    character.updatePowerAt(index, { level: nextLevel });
    touch();
  };

  const removeAt = (index) => {
    character.removePowerAt(index);
    touch();
  };

  return (
    <div className="sr-adept-powers">
      <div className="sr-ap-budget">
        <span className="sr-ap-budget-label">Power Points</span>
        <span className={overBudget ? 'sr-ap-budget-count sr-ap-budget-count--over' : 'sr-ap-budget-count'}>
          {spent}/{budget}{overBudget ? ' — Over Budget' : ''}
        </span>
      </div>

      {POWER_IDS.map((powerId) => {
        const def = POWERS[powerId];
        const hasLevels = def.costPerLevel != null;
        const hasSelection = Boolean(def.requiresSelection);
        const entries = character.powers.map((e, i) => ({ ...e, index: i })).filter((e) => e.powerId === powerId);
        const picking = pendingSelectionFor === powerId;
        const options = hasSelection ? selectionOptions(def, character) : [];
        const levelCap = def.levelRange ? def.levelRange[1] : null;

        return (
          <div key={powerId} className={entries.length > 0 ? 'sr-ap-row sr-ap-row--known' : 'sr-ap-row'}>
            <div className="sr-ap-row-main">
              <div>
                <span className="sr-ap-row-name">{def.label}</span>
                <span className="sr-ap-row-meta">
                  {def.cost != null && `${def.cost} PP`}
                  {typeof def.costPerLevel === 'number' && `${def.costPerLevel} PP/level`}
                  {typeof def.costPerLevel === 'object' && `${def.costPerLevel.other} PP/level (${def.costPerLevel.combat} combat)`}
                  {' · '}{activationLabel(def.activation)}
                </span>

                {entries.map((e) => (
                  <div key={e.index} className="sr-ap-instance">
                    <span className="sr-ap-instance-label">
                      {e.selection && selectionLabel(def, e.selection, character)}
                      {hasLevels && ` Level ${e.level ?? 1}`}
                      {` — ${powerCost(def, e)} PP`}
                    </span>
                    <div className="sr-ap-instance-actions">
                      {hasLevels && (
                        <>
                          <button className="sr-icon-btn" onClick={() => adjustLevel(e.index, -1, levelCap)}>−</button>
                          <button className="sr-icon-btn" onClick={() => adjustLevel(e.index, 1, levelCap)}>+</button>
                        </>
                      )}
                      <button className="sr-btn sr-btn--secondary" onClick={() => removeAt(e.index)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              {hasSelection ? (
                <button className="sr-btn sr-btn--primary" onClick={() => setPendingSelectionFor(picking ? null : powerId)}>
                  {picking ? 'Cancel' : 'Learn Another'}
                </button>
              ) : (
                entries.length === 0 && (
                  <button
                    className="sr-btn sr-btn--primary"
                    onClick={() => (hasLevels ? learnLeveled(powerId) : learnSimple(powerId))}
                  >
                    Learn
                  </button>
                )
              )}
            </div>

            {picking && (
              <div className="sr-ap-picker">
                {options.length === 0 ? (
                  <p className="sr-ap-hint">
                    {def.requiresSelection === 'skill' ? 'No skills with at least 1 rank yet.' : 'No options available.'}
                  </p>
                ) : (
                  options.map((opt) => (
                    <button
                      key={opt.key}
                      className="sr-btn sr-btn--secondary"
                      onClick={() => learnWithSelection(powerId, opt.key, hasLevels)}
                    >
                      {opt.label}
                    </button>
                  ))
                )}
              </div>
            )}

            <p className="sr-ap-row-description">{def.description}</p>
          </div>
        );
      })}
    </div>
  );
}
