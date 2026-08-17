// Single source of truth for Adept Powers — 22 total. Same id-keyed
// shape and reasoning as SKILLS/QUALITIES/SPELLS.
//
// activation: 'minor' | 'major' | 'passive' — matches the book's own
// "Cost / Activation" listing format per power.
//
// costPerLevel + no levelRange means the power scales with levels but
// the book doesn't state a hard numeric cap (practically capped by
// available power points, or by a formula like "1.5x current value" —
// noted in the description rather than modeled as a levelRange, since
// it's not a fixed number the way Improved Reflexes' cap of 4 is).
//
// Improved Ability is the one power whose cost depends on what you're
// applying it to (combat skill vs. any other skill) — costPerLevel is
// an object keyed by that distinction rather than a single number.

export const POWERS = {
  adrenaline_boost: {
    label: 'Adrenaline Boost',
    costPerLevel: 0.25,
    activation: 'minor',
    description: '+2 Initiative Score per level for (Magic) combat rounds. At the end of those rounds, take Drain equal to the level, resisted as normal.',
  },

  astral_perception: {
    label: 'Astral Perception',
    cost: 1,
    activation: 'minor',
    description: 'Gain the ability to astrally perceive. Dual-natured while using this power, and can attack astral forms.',
  },

  attribute_boost: {
    label: 'Attribute Boost (Attribute)',
    costPerLevel: 0.25,
    activation: 'major',
    requiresSelection: 'physicalAttribute',
    description: 'Roll Magic + rating; each hit temporarily boosts the chosen Physical attribute by 1 (max +4, dice pools only — not Initiative/Condition Monitor/Defense). Lasts (net hits) rounds, then Drain equal to the level.',
  },

  combat_sense: {
    label: 'Combat Sense',
    costPerLevel: 0.5,
    activation: 'passive',
    description: '+1 dice pool per level on defensive tests, including Surprise tests.',
  },

  critical_strike: {
    label: 'Critical Strike',
    costPerLevel: 1.0,
    activation: 'passive',
    description: '+1 DV per level on melee attacks; stacks with weapon and other adept bonuses unless prohibited.',
  },

  danger_sense: {
    label: 'Danger Sense',
    cost: 0.5,
    activation: 'passive',
    description: 'Edge before Surprise tests.',
  },

  direction_sense: {
    label: 'Direction Sense',
    cost: 0.25,
    activation: 'passive',
    description: 'May gain Edge on direction-related Outdoors tests (use-it-or-lose-it, spent immediately).',
  },

  enhanced_perception: {
    label: 'Enhanced Perception',
    cost: 0.5,
    activation: 'passive',
    description: 'Edge on Observe in Detail or Perception tests to find hidden things or overhear something not meant to be heard.',
  },

  enhanced_accuracy: {
    label: 'Enhanced Accuracy',
    cost: 0.5,
    activation: 'passive',
    description: '+2 Attack Rating with any weapon you wield.',
  },

  improved_ability: {
    label: 'Improved Ability (Skill)',
    costPerLevel: { combat: 1.0, other: 0.5 },
    activation: 'passive',
    requiresSelection: 'skill',
    description: 'Boosts a skill you have at least 1 rank in, up to 1.5× the original rating (rounded up) or the augmented max, whichever is lower. Combat skills cost double per level.',
  },

  improved_physical_attribute: {
    label: 'Improved Physical Attribute',
    costPerLevel: 1,
    activation: 'passive',
    requiresSelection: 'physicalAttribute',
    description: 'Boosts a chosen Physical attribute, up to 1.5× its current rating or the augmented max, whichever is lower.',
  },

  improved_reflexes: {
    label: 'Improved Reflexes',
    costPerLevel: 1,
    levelRange: [1, 4],
    activation: 'passive',
    description: "+1 Initiative Die and +1 Reaction per level. Can't combine with other Initiative/Reaction boosts.",
  },

  improved_sense: {
    label: 'Improved Sense',
    cost: 0.25,
    activation: 'passive',
    repeatable: true,
    requiresSelection: 'sense',
    description: 'Choose a sense (sight, hearing, touch, taste, smell) — use-it-or-lose-it Edge on tests using it, once per distinct instance of that sense. Repeatable, once per sense.',
  },

  killing_hands: {
    label: 'Killing Hands',
    cost: 0.5,
    activation: 'minor',
    description: 'Choose Stun or Physical for unarmed attacks. Combinable with other unarmed powers; counts as magical, bypassing normal-weapon protections and working against astral beings.',
  },

  kinesics: {
    label: 'Kinesics',
    cost: 0.25,
    activation: 'passive',
    description: 'Edge (once per encounter) resisting Social tests or attempts to read your emotions, intent, or truthfulness.',
  },

  power_mystic_armor: {
    label: 'Mystic Armor',
    costPerLevel: 0.25,
    activation: 'passive',
    description: '+1 Armor per level, cumulative with worn armor and raising Defense Rating accordingly. Also active on the astral plane.',
  },

  pain_resistance: {
    label: 'Pain Resistance',
    costPerLevel: 0.25,
    activation: 'passive',
    description: "Wound penalties kick in one box later on the Condition Monitor per level (e.g. level 1 delays the first penalty from 3 boxes to 4). Applies to both Stun and Physical Condition Monitors.",
  },

  rapid_healing: {
    label: 'Rapid Healing',
    costPerLevel: 0.5,
    activation: 'passive',
    description: '+1 hit per level on Healing tests performed to heal you.',
  },

  spell_resistance: {
    label: 'Spell Resistance',
    cost: 0.5,
    activation: 'passive',
    description: 'Edge when targeted by spells.',
  },

  traceless_walk: {
    label: 'Traceless Walk',
    cost: 0.5,
    activation: 'passive',
    description: "Leaves no trace of passage — no triggered tripwires/pressure pads/leg-movement traps. Hearing tests to detect your passage and Outdoors tests to track you can't gain or spend Edge.",
  },

  vocal_control: {
    label: 'Vocal Control',
    cost: 0.5,
    activation: 'passive',
    description: 'Control pitch/modulation of your voice at will. Edge (once per encounter) on Con or Influence tests involving your voice.',
  },

  wall_running: {
    label: 'Wall Running',
    cost: 0.5,
    activation: 'minor',
    description: "Sprint up a vertical surface. Can't be used twice in a row — needs at least one turn moving on a horizontal surface between uses, or you fall if there's no good hold when it ends.",
  },
};

export const POWER_IDS = Object.keys(POWERS);

// Reference note, not power data — Mystic Adepts split their Magic
// rating between spells and power points at creation (1 power point per
// Magic dedicated to the adept side; spells = mage-side Magic × 2).
// Relevant context for whoever's consuming POWERS for a mystic adept
// character, not something that belongs on any individual power entry.
export const MYSTIC_ADEPT_SPLIT_NOTE =
  'Mystic Adepts divide Magic between spells and power points at creation: 1 power point per point of Magic on the adept side, spells equal to (mage-side Magic × 2). Losing a point of Magic on the adept side also loses a power point, if any remain.';
