// The five metatypes and their attribute ranges/racial qualities. This
// is what the character creator validates attribute allocation against
// (each metatype shifts the normal 1-6 range per attribute) — it was
// previously just a hardcoded JSX <table> in ShadowrunnersMetatypes.jsx,
// not real data the creator could actually use.
//
// attributeRanges covers the 8 core attributes + Edge; Magic/Resonance
// isn't listed here since its range comes from the Priority Table
// (PRIORITY_TABLE.js) and magicType instead, not metatype.
//
// racialQualities link to real QUALITIES.js ids rather than duplicating
// quality text here — same "point at the single source of truth" move
// as GEAR items pointing at SKILLS ids for their `skill` field. `level`
// is only present for leveled qualities (Built Tough).

export const METATYPES = {
  human: {
    label: 'Human',
    attributeRanges: {
      body: [1, 6],
      agility: [1, 6],
      reaction: [1, 6],
      strength: [1, 6],
      willpower: [1, 6],
      logic: [1, 6],
      intuition: [1, 6],
      charisma: [1, 6],
      edge: [1, 7],
    },
    racialQualities: [],
  },

  dwarf: {
    label: 'Dwarf',
    attributeRanges: {
      body: [1, 7],
      agility: [1, 6],
      reaction: [1, 5],
      strength: [1, 8],
      willpower: [1, 7],
      logic: [1, 6],
      intuition: [1, 6],
      charisma: [1, 6],
      edge: [1, 6],
    },
    racialQualities: [
      { qualityId: 'toxin_resistance' },
      { qualityId: 'thermographic_vision_quality' },
    ],
  },

  elf: {
    label: 'Elf',
    attributeRanges: {
      body: [1, 6],
      agility: [1, 7],
      reaction: [1, 6],
      strength: [1, 6],
      willpower: [1, 6],
      logic: [1, 6],
      intuition: [1, 6],
      charisma: [1, 8],
      edge: [1, 6],
    },
    racialQualities: [
      { qualityId: 'low_light_vision_quality' },
    ],
  },

  ork: {
    label: 'Ork',
    attributeRanges: {
      body: [1, 8],
      agility: [1, 6],
      reaction: [1, 6],
      strength: [1, 8],
      willpower: [1, 6],
      logic: [1, 6],
      intuition: [1, 6],
      charisma: [1, 5],
      edge: [1, 6],
    },
    racialQualities: [
      { qualityId: 'low_light_vision_quality' },
      { qualityId: 'built_tough', level: 1 },
    ],
  },

  troll: {
    label: 'Troll',
    attributeRanges: {
      body: [1, 9],
      agility: [1, 5],
      reaction: [1, 6],
      strength: [1, 9],
      willpower: [1, 6],
      logic: [1, 6],
      intuition: [1, 6],
      charisma: [1, 5],
      edge: [1, 6],
    },
    racialQualities: [
      { qualityId: 'dermal_deposits_quality' },
      { qualityId: 'thermographic_vision_quality' },
      { qualityId: 'built_tough', level: 2 },
    ],
  },
};

export const METATYPE_IDS = Object.keys(METATYPES);

// Racial qualities are granted automatically and don't cost anything —
// not selected from the normal Quality pool, not counted against the
// 6-quality/20-Karma creation caps. Worth stating explicitly since
// METATYPES and QUALITIES are now cross-referenced and it'd be easy to
// assume otherwise.
export const RACIAL_QUALITY_NOTE =
  "Racial qualities are automatic and free — they don't count against the creation-time quality limits (6 qualities, 20 net Karma) that apply to normally-selected Qualities.";
