// The Priority Table — the five rows (A-E) x five categories (Metatype,
// Attributes, Skills, Magic/Resonance, Resources) that Character
// Creation Step Two assigns. This is the actual numeric data behind
// everything ShadowrunnersCreation.jsx describes conceptually — without
// this, nothing in the creator can compute how many points a character
// actually has.
//
// magicResonance is itself keyed by magicType (full | aspected |
// mysticAdept | adept | technomancer) since the value genuinely differs
// per type at the same priority row — not a single number like the
// other four categories. 'mundane' isn't listed per-row since it's only
// ever available at row E and grants nothing (see MUNDANE_NOTE).
//
// metatype.availableMetatypes lists which metatypes can be picked if
// this row is assigned to Metatype — human/elf notably don't appear
// until row C, which is *why* row selection interacts with metatype
// choice the way the book's own Tom/Alyson example illustrates.

export const PRIORITY_TABLE = {
  A: {
    metatype: {
      availableMetatypes: ['dwarf', 'ork', 'troll'],
      adjustmentPoints: 13,
    },
    attributePoints: 24,
    skillPoints: 32,
    magicResonance: {
      full: 4,
      aspected: 5,
      mysticAdept: 4,
      adept: 4,
      technomancer: 4,
    },
    resources: 450000,
  },

  B: {
    metatype: {
      availableMetatypes: ['dwarf', 'elf', 'ork', 'troll'],
      adjustmentPoints: 11,
    },
    attributePoints: 16,
    skillPoints: 24,
    magicResonance: {
      full: 3,
      aspected: 4,
      mysticAdept: 3,
      adept: 3,
      technomancer: 3,
    },
    resources: 275000,
  },

  C: {
    metatype: {
      availableMetatypes: ['dwarf', 'elf', 'human', 'ork', 'troll'],
      adjustmentPoints: 9,
    },
    attributePoints: 12,
    skillPoints: 20,
    magicResonance: {
      full: 2,
      aspected: 3,
      mysticAdept: 2,
      adept: 2,
      technomancer: 2,
    },
    resources: 150000,
  },

  D: {
    metatype: {
      availableMetatypes: ['dwarf', 'elf', 'human', 'ork', 'troll'],
      adjustmentPoints: 4,
    },
    attributePoints: 8,
    skillPoints: 16,
    magicResonance: {
      full: 1,
      aspected: 2,
      mysticAdept: 1,
      adept: 1,
      technomancer: 1,
    },
    resources: 50000,
  },

  E: {
    metatype: {
      availableMetatypes: ['dwarf', 'elf', 'human', 'ork', 'troll'],
      adjustmentPoints: 1,
    },
    attributePoints: 2,
    skillPoints: 10,
    magicResonance: null, // mundane-only at this row — see MUNDANE_NOTE
    resources: 8000,
  },
};

export const PRIORITY_ROWS = Object.keys(PRIORITY_TABLE);

export const MUNDANE_NOTE =
  'Mundane (no Magic or Resonance) is only selectable at Priority row E, and grants no Magic/Resonance value at all — the row\'s points go entirely elsewhere for a mundane character.';

// Aspected magicians get +1 Magic over Full at every row except E
// (5 vs 4 at A, 4 vs 3 at B, etc.) — the book calls this out explicitly
// as compensation for being locked to a single magical skill
// (Sorcery-only, Conjuring-only, or Enchanting-only) for their entire
// magical career.
export const ASPECTED_TRADEOFF_NOTE =
  "Aspected magicians get +1 Magic over Full at the same priority row, as a deliberate tradeoff for being limited to a single magical skill (Sorcery, Conjuring, or Enchanting) permanently.";

// Variant rules referenced in Shadowrunners > Character Creation, now
// as computable data rather than just prose.
export const PRIORITY_VARIANTS = {
  lowPower: {
    label: 'Low-Power / Street-Level',
    description: 'Apply the values from one row lower than the row actually chosen (e.g. choosing Priority B for Attributes gets Priority C\'s 12 points instead). Since nothing is lower than row E, a row E selection effectively becomes a second row-E selection.',
  },
  primeRunner: {
    label: 'Prime Runner',
    description: 'Double the customization Karma from 50 to 100. No change to the Priority Table itself.',
  },
};
