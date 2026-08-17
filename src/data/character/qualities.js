// Single source of truth for character Qualities — positive and negative.
// Same id-keyed shape and reasoning as SKILLS: O(1) lookup, one place
// to fix a typo, reused by the Shadowrunners reference tab and (later)
// the character creator/live sheet's quality picker.
//
// karmaCost is what a positive quality costs to buy, or what Karma bonus
// a negative quality grants — same number, opposite direction, per the
// book's own framing ("Bonus" on negative qualities is really just cost
// paid the other way). Leveled qualities (Built Tough, Focused
// Concentration, Dependents, Glass Jaw) use karmaCostPerLevel +
// levelRange instead — same costPerRating pattern GEAR already
// established, reused here rather than inventing new field names for
// the same idea.
//
// requiresSelection marks qualities that need a pick at purchase time
// (an attribute, a skill, an element, a spirit/sprite class, a substance,
// a stressor, a group) — not a numeric level, just a one-time choice.

export const QUALITIES = {
  // ==================== POSITIVE ====================

  ambidextrous: {
    label: 'Ambidextrous',
    type: 'positive',
    karmaCost: 4,
    description: 'No penalty for off-hand weapon use.',
  },

  analytical_mind: {
    label: 'Analytical Mind',
    type: 'positive',
    karmaCost: 3,
    description: 'Gain a bonus Edge on any Logic-based test.',
  },

  aptitude: {
    label: 'Aptitude (Skill)',
    type: 'positive',
    karmaCost: 12,
    requiresSelection: 'skill',
    description: "Selected skill's maximum is 10 instead of 9, and max starting rank is 7 instead of 6.",
  },

  astral_chameleon: {
    label: 'Astral Chameleon',
    type: 'positive',
    karmaCost: 9,
    description: 'Others get –2 dice on tests to recognize your aura/astral signature; your astral signature fades in half the normal time.',
  },

  blandness: {
    label: 'Blandness',
    type: 'positive',
    karmaCost: 8,
    description: "Others take a –2 penalty on Memory tests to recall if they've seen you before, and the threshold to notice you following/observing them is +1. Lost if you acquire something permanently distinctive; negated (not lost) by temporary distinctive changes.",
  },

  built_tough: {
    label: 'Built Tough',
    type: 'positive',
    karmaCostPerLevel: 4,
    levelRange: [1, 4],
    description: 'Additional boxes on your Physical Condition Monitor equal to the rank of this quality.',
  },

  catlike: {
    label: 'Catlike',
    type: 'positive',
    karmaCost: 12,
    description: 'Bonus Edge on all tests for balance, falling, and landing safely.',
  },

  dermal_deposits_quality: {
    label: 'Dermal Deposits',
    type: 'positive',
    karmaCost: 7,
    description: '1 level of natural Armor; Unarmed Melee attacks inflict Physical damage.',
  },

  double_jointed: {
    label: 'Double-Jointed',
    type: 'positive',
    karmaCost: 12,
    description: 'Bonus Edge on tests involving grappling, escaping bonds, flexibility, or fitting into tight spaces.',
  },

  elemental_resistance: {
    label: '(Elemental) Resistance',
    type: 'positive',
    karmaCost: 12,
    requiresSelection: 'element',
    description: 'Select an elemental damage type. Gain a point of Edge before your Defense test when attacked by that type (including unarmed spirit attacks of that type).',
  },

  exceptional_attribute: {
    label: 'Exceptional (Attribute)',
    type: 'positive',
    karmaCost: 12,
    requiresSelection: 'attribute',
    description: 'Select a Physical or Mental attribute — its maximum (not current) rank increases by 1. Purchasable once per attribute.',
  },

  first_impression: {
    label: 'First Impression',
    type: 'positive',
    karmaCost: 12,
    description: '2 Edge for Social tests during your first meeting with anyone; Heat and Reputation are ignored for that first encounter.',
  },

  focused_concentration: {
    label: 'Focused Concentration',
    type: 'positive',
    karmaCostPerLevel: 12,
    levelRange: [1, 3],
    description: 'Sustain 1 additional spell or complex form per level without the sustain penalty — the spell must have a modified Drain Value under 7.',
  },

  gearhead: {
    label: 'Gearhead',
    type: 'positive',
    karmaCost: 10,
    description: 'Edge on Repair tests for any vehicle; can spend Edge during downtime to make Extended Repair tests.',
  },

  guts: {
    label: 'Guts',
    type: 'positive',
    karmaCost: 12,
    description: 'Edge when resisting Intimidation or effects that cause the Frightened status.',
  },

  hardening_quality: {
    label: 'Hardening',
    type: 'positive',
    karmaCost: 10,
    description: 'Use-it-or-lose-it bonus Edge on Matrix Damage Resistance tests; can convert up to two boxes of Matrix damage to Stun damage instead.',
  },

  high_pain_tolerance: {
    label: 'High Pain Tolerance',
    type: 'positive',
    karmaCost: 7,
    description: 'Reduce your wound penalty by 1, to a minimum of 0.',
  },

  home_ground: {
    label: 'Home Ground',
    type: 'positive',
    karmaCost: 10,
    requiresSelection: 'location',
    description: 'Select a neighborhood or Matrix host — Outdoors and Perception tests there gain a use-it-or-lose-it Edge.',
  },

  human_looking: {
    label: 'Human-Looking',
    type: 'positive',
    karmaCost: 8,
    description: 'Appear human at first glance; +2 dice on Disguise tests to hide your actual metatype.',
  },

  indomitable: {
    label: 'Indomitable',
    type: 'positive',
    karmaCost: 12,
    description: 'Edge Boost costs are reduced by 1 on tests involving Willpower.',
  },

  juryrigger: {
    label: 'Juryrigger',
    type: 'positive',
    karmaCost: 12,
    description: 'Gain a use-it-or-lose-it Edge on Juryrigging tests.',
  },

  long_reach: {
    label: 'Long Reach',
    type: 'positive',
    karmaCost: 12,
    description: 'Close range for melee weapons extends to 5 meters instead of 3.',
  },

  low_light_vision_quality: {
    label: 'Low-Light Vision',
    type: 'positive',
    karmaCost: 6,
    description: 'See clearly in any light level short of total darkness.',
  },

  magic_resistance: {
    label: 'Magic Resistance',
    type: 'positive',
    karmaCost: 8,
    description: 'Use-it-or-lose-it Edge on Magic Resistance tests; Health spells cast on you treat your Essence as 2 points lower.',
  },

  mentor_spirit: {
    label: 'Mentor Spirit',
    type: 'positive',
    karmaCost: 10,
    requiresSelection: 'mentorSpirit',
    description: 'Gain the listed benefits of your chosen mentor spirit — lose them if you stray from its tenets.',
  },

  photographic_memory: {
    label: 'Photographic Memory',
    type: 'positive',
    karmaCost: 12,
    description: 'Use-it-or-lose-it bonus Edge on Memory tests.',
  },

  quick_healer: {
    label: 'Quick Healer',
    type: 'positive',
    karmaCost: 8,
    description: 'Halves the interval for natural healing tests — Stun heals after half an hour, Physical after half a day.',
  },

  resistance_to_pathogens: {
    label: 'Resistance to Pathogens',
    type: 'positive',
    karmaCost: 12,
    description: 'Use-it-or-lose-it bonus Edge on Pathogen Resistance tests.',
  },

  spirit_sprite_affinity: {
    label: 'Spirit/Sprite Affinity',
    type: 'positive',
    karmaCost: 14,
    requiresSelection: 'spiritClass',
    repeatable: true,
    description: 'Bonus Edge on Conjuring/Tasking tests for a chosen class of spirit/sprite. Repeatable for different classes.',
  },

  thermographic_vision_quality: {
    label: 'Thermographic Vision',
    type: 'positive',
    karmaCost: 8,
    description: 'See heat differentials in total darkness.',
  },

  toughness: {
    label: 'Toughness',
    type: 'positive',
    karmaCost: 12,
    description: 'Use-it-or-lose-it bonus Edge on Damage Resistance tests.',
  },

  toxin_resistance: {
    label: 'Toxin Resistance',
    type: 'positive',
    karmaCost: 12,
    description: 'Use-it-or-lose-it bonus Edge on Toxin Resistance tests.',
  },

  will_to_live: {
    label: 'Will to Live',
    type: 'positive',
    karmaCostPerLevel: 8,
    levelRange: [1, 3],
    description: '2 additional Damage Overflow boxes per rank.',
  },

  // ==================== NEGATIVE ====================

  addiction: {
    label: 'Addiction (Substance)',
    type: 'negative',
    karmaCostPerLevel: 2,
    levelRange: [1, 6],
    requiresSelection: 'substance',
    description: 'Cannot earn or spend Edge during withdrawal; –2 dice pool penalty while in withdrawal, increasing by 1 for each withdrawal period passed.',
    withdrawalTimeByLevel: {
      1: '1 week',
      2: '3 days',
      3: '1 day',
      4: '12 hours',
      5: '6 hours',
      6: '1 hour',
    },
  },

  allergy: {
    label: 'Allergy (Substance, Severity)',
    type: 'negative',
    requiresSelection: 'substance+severity',
    description: 'Cannot spend/earn Edge while exposed. Karma bonus and secondary effect scale with how common the substance is and how severe the reaction is.',
    allergyTable: [
      { commonality: 'Rare', severity: 'Mild', karmaBonus: 9, effect: '–2 dice pool on Physical-attribute tests while exposed.' },
      { commonality: 'Uncommon', severity: 'Moderate', karmaBonus: 6, effect: '–4 dice pool on Physical-attribute tests while exposed.' },
      { commonality: 'Seasonal', severity: 'Severe', karmaBonus: 3, effect: '–4 dice pool as above, plus 1 box unresisted Physical damage per minute of exposure.' },
      { commonality: 'Common', severity: 'Extreme', karmaBonus: 20, effect: '–6 dice pool on all actions, plus 1 box unresisted Physical damage per 30 seconds of exposure.' },
    ],
  },

  ar_vertigo: {
    label: 'AR Vertigo',
    type: 'negative',
    karmaCost: 10,
    description: 'Cannot gain/spend Edge while using AR; gain the Nauseated status while using it and for one hour after.',
  },

  astral_beacon: {
    label: 'Astral Beacon',
    type: 'negative',
    karmaCost: 10,
    description: 'Untrained for Stealth tests on the astral plane; can never take the masking metamagic. Assensing tests against you get a free Edge and –1 threshold; Astral Tracking tests against you get 2 Edge and half threshold.',
  },

  bad_luck: {
    label: 'Bad Luck',
    type: 'negative',
    karmaCost: 10,
    description: 'Both 1s and 2s count toward glitches (not critical glitches).',
  },

  bad_rep: {
    label: 'Bad Rep',
    type: 'negative',
    karmaCost: 8,
    description: 'Cannot spend Edge on Social tests; assisting a Social Teamwork test blocks Edge for everyone involved and gives the opponent a point instead.',
  },

  combat_paralysis: {
    label: 'Combat Paralysis',
    type: 'negative',
    karmaCost: 8,
    description: 'Initiative Score halved at combat start; no Move/Sprint in the first round, act last that round. Movement restored after round 1, but Initiative Score stays halved.',
  },

  dependents: {
    label: 'Dependents',
    type: 'negative',
    karmaCostPerLevel: 4,
    levelRange: [1, 3],
    description: 'A percentage of every score (job payments, fenced goods, gambling winnings) goes to support the people who depend on you — 5% at level 1, 10% at level 2, 25% at level 3.',
  },

  distinctive_style: {
    label: 'Distinctive Style',
    type: 'negative',
    karmaCost: 6,
    description: "Cannot gain or spend Edge when not visibly in your distinctive look. Others get +2 dice on Memory tests to recall your appearance or whether they've seen you before.",
  },

  elf_poser: {
    label: 'Elf Poser',
    type: 'negative',
    karmaCost: 6,
    description: 'Elves, orks, and trolls gain a point of Edge on Influence (Etiquette) tests made against you.',
  },

  glass_jaw: {
    label: 'Glass Jaw',
    type: 'negative',
    karmaCostPerLevel: 4,
    levelRange: [1, 3],
    description: '1 less Stun box per level of this quality, down to a minimum of 2 boxes.',
  },

  gremlins: {
    label: 'Gremlins',
    type: 'negative',
    karmaCost: 6,
    description: 'Whenever you use a device, roll 2D6 — a 1 on either die means it glitches (reset with a Minor Action); snake eyes means it critically glitches and is destroyed, possibly hurting you with shock or biofeedback.',
  },

  honorbound: {
    label: 'Honorbound',
    type: 'negative',
    karmaCost: 10,
    requiresSelection: 'code',
    description: "Choose a code of tenets. Break one, and you can't spend or earn Edge for 24 hours — repeated or additional violations stack the penalty further.",
  },

  impaired_attribute: {
    label: 'Impaired (Attribute)',
    type: 'negative',
    karmaCostPerLevel: 8,
    requiresSelection: 'attribute',
    description: "Chosen attribute's maximum decreases by 1 per level, to a minimum of 2.",
  },

  incompetent_skill: {
    label: 'Incompetent (Skill)',
    type: 'negative',
    karmaCost: 10,
    requiresSelection: 'skill',
    description: 'Cannot gain ranks in the selected skill — must be one you could otherwise use (no Magic skills without Magic, no Tasking without Resonance). Selectable once.',
  },

  in_debt: {
    label: 'In Debt',
    type: 'negative',
    karmaCost: 0,
    description: 'Converting Karma to cash gets 5,000¥ instead of 2,000¥ per point, but each point also puts you 5,000¥ into debt at 500¥/point monthly interest. Unpaid interest brings collectors. Buyable off with money. Creation-only, not available during gameplay.',
  },

  insomnia: {
    label: 'Insomnia',
    type: 'negative',
    karmaCost: 4,
    description: "Body + Willpower (3) test each day for a proper night's rest; failure caps Edge gain and spend at 2 for the day. A sleep regulator drops the threshold to 1; medication (50¥/dose) drops it to 2.",
  },

  loss_of_confidence: {
    label: 'Loss of Confidence',
    type: 'negative',
    karmaCost: 6,
    description: 'Willpower (2) test as a Minor Action each encounter; failure means no Edge gain/spend for the whole encounter.',
  },

  low_pain_tolerance: {
    label: 'Low Pain Tolerance',
    type: 'negative',
    karmaCost: 10,
    description: 'All wound modifiers are doubled.',
  },

  ork_poser: {
    label: 'Ork Poser',
    type: 'negative',
    karmaCost: 6,
    description: 'Elves, orks, and trolls gain Edge on Influence (Etiquette) tests against you.',
  },

  prejudiced: {
    label: 'Prejudiced (Group)',
    type: 'negative',
    karmaCost: 8,
    requiresSelection: 'group',
    description: 'Cannot gain/use Edge while the object of your prejudice is present, unless directly opposing them. Use carefully and only with full group buy-in — never as cover for real-world prejudice.',
  },

  scorched: {
    label: 'Scorched',
    type: 'negative',
    karmaCost: 6,
    description: 'Cannot spend Edge while accessing the Matrix — commlinks, smartlinks, any data-in source.',
  },

  sensitive_system: {
    label: 'Sensitive System',
    type: 'negative',
    karmaCost: 8,
    description: 'Essence costs doubled for cyberware/bioware/nanoware (geneware unaffected). Incompatible with having a Magic or Resonance rating.',
  },

  simsense_vertigo: {
    label: 'Simsense Vertigo',
    type: 'negative',
    karmaCost: 6,
    description: 'Cannot gain/spend Edge while accessing the Matrix via VR; Nauseated status for one hour after logging off.',
  },

  sinner: {
    label: 'SINner',
    type: 'negative',
    karmaCost: 8,
    description: '10% lifestyle cost increase, even with a Fake SIN; opponents get a point of Edge on Trace Icon actions against you.',
  },

  social_stress: {
    label: 'Social Stress',
    type: 'negative',
    karmaCost: 8,
    requiresSelection: 'stressor',
    description: 'Select a specific social stressor. Charisma (2) test as a Minor Action on encountering it — failure blocks Edge gain/spend until you succeed, or skip the test and let opposing tests gain a bonus Edge instead.',
  },

  spirit_sprite_bane: {
    label: 'Spirit/Sprite Bane',
    type: 'negative',
    karmaCost: 12,
    requiresSelection: 'spiritClass',
    repeatable: true,
    description: 'Chosen spirit/sprite class gets bonus Edge against your Conjuring/Tasking attempts, and will attack you first and relentlessly in combat. Repeatable for different classes.',
  },

  uncouth: {
    label: 'Uncouth',
    type: 'negative',
    karmaCost: 6,
    description: 'Cannot spend Edge on any test using Charisma.',
  },

  uneducated: {
    label: 'Uneducated',
    type: 'negative',
    karmaCost: 6,
    description: 'Cannot spend Edge on any test using Logic.',
  },

  unsteady_hands: {
    label: 'Unsteady Hands',
    type: 'negative',
    karmaCost: 4,
    description: "Cannot spend Edge on Agility tests that directly involve the hands (sleight-of-hand, weapon attacks) — running doesn't count, even though the hands are in motion.",
  },

  weak_immune_system: {
    label: 'Weak Immune System',
    type: 'negative',
    karmaCost: 8,
    description: 'Cannot spend Edge resisting infection; +1 threshold to fight off any infection; –1 dice pool penalty on all tests while ill.',
  },
};

export const QUALITY_IDS = Object.keys(QUALITIES);
export const POSITIVE_QUALITY_IDS = QUALITY_IDS.filter((id) => QUALITIES[id].type === 'positive');
export const NEGATIVE_QUALITY_IDS = QUALITY_IDS.filter((id) => QUALITIES[id].type === 'negative');
