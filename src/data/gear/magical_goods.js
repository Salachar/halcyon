// Magical Goods — Foci, Formulae, and Magical Supplies. Confirmed
// pricing table, verified against source directly (not condensed
// notes). Force-scaled throughout, same shape as any other Rating-
// scaled item elsewhere in this catalog (costPerRating/
// availabilityEqualsRating/availabilityFormula) — "Force" is just this
// item family's own name for the same "chosen scaling number" concept,
// now made explicit with `ratingLabel: 'Force'` (same pattern Ram
// Plate uses for 'Body' and the Mechanical Arms for 'Strength').
//
// Bonding Cost is Karma, not Nuyen — a genuinely new field
// (bondingKarmaPerRating) nothing else in this catalog needed before.
// NOT wired into PurchaseModal's automatic afford/deduct flow — bonding
// is a separate step from purchasing (you can own an unbonded focus),
// and Karma deduction already has its own manual flow on CharacterSheet.
// This is reference data for the player to act on themselves, same
// "manual honesty" pattern as everything else non-automated in this app.
//
// Focus sub-type mechanical effects (which specific Enchanting/
// Metamagic/Spell/Power/Qi/Spirit/Weapon focus variant does what) are
// NOT modeled as separate catalog entries — pricing is identical within
// a category regardless of which named sub-type is chosen at creation,
// and only a handful of sub-types have confirmed mechanical text
// (Enchanting: Alchemical, Disenchanting; Metamagic: Centering, Flexible
// Signature, Masking, Spell Shaping). The rest are real, just not
// captured here — flagged, not invented.
//
// ============================================================================
// SCHEMA PASSES 1 AND 2 (both applied at once — this file hadn't had
// either yet):
//
// S1. `effects` ARRAYS extracted from `description` prose. Every focus
//     description was a mechanical effect with a sentence of framing
//     around it. No `wirelessBonuses` anywhere — nothing in this
//     chapter is a Matrix device, and no item carries `wireless`.
// S2. `description` IS NOW OMITTABLE. The formula items keep only
//     their pricing-ratio note, which is a purchase-shape fact rather
//     than a play effect.
// D1. `referenceOnly: true` on every item carrying `effects`. Nothing
//     here is backed: `bondingKarmaPerRating` and `costPerRating` are
//     purchase-time configuration, which the backing test explicitly
//     excludes, and no focus effect is driven by a computed field.
// D2. `GEAR_MAGICAL_GOODS_IDS` WAS NEVER EXPORTED. Every other gear
//     file ends with `<NAME>_IDS = Object.keys(<NAME>)`; this one
//     stopped at the item map, so anything iterating the catalog's
//     files by ID list silently skipped all 22 items. Same bug found
//     in matrix_devices.js. Added.
// D3. THE SEVEN FOCUS FORMULAE HAD NO `stats` OBJECT AT ALL. The
//     `focusFormula()` factory never set one, unlike `spellFormula()`
//     right beside it. Every other item in the catalog — all 685 —
//     has a stats object, so any consumer reading `item.stats.foo`
//     would throw on exactly these seven. Now `stats: {}` in the
//     factory.
// D4. THOSE SAME SEVEN ALSO HAD `cost`/`availability` UNDEFINED rather
//     than `null`. Every other Rating-scaled item in the catalog sets
//     them explicitly to null so the formatters have something
//     definite to render. Now set in the factory.
//
// ============================================================================
// FLAG — NO `ratingRange` ANYWHERE, ON 15 FORCE-SCALED ITEMS.
//
// Every one of the 7 foci, 7 focus formulae, and Magical Lodge
// Materials carries `costPerRating` with no `ratingRange` to go with
// it. Across the other ten gear files, all 67 `costPerRating` items
// have one — this file is the sole exception, and without a range
// there's no bound for a Force selector to offer, so the price can't
// actually be computed at purchase time.
//
// NOT resolved here because the right numbers aren't in the data:
// Force bounds differ by focus type and interact with the character's
// own Magic rating, and Qi Focus adds a further constraint of its own
// ("Force must equal 4x the Power Point cost of the power it holds",
// preserved as an effect below). Inventing a flat [1,6] would be a
// guess dressed as data. `ratingLabel: 'Force'` IS set throughout,
// since that much is confirmed by the source's own vocabulary.
// ============================================================================

function focus(overrides) {
  return {
    category: 'focus', legality: 'licensed', image: null, tags: ['focus'],
    cost: null, availability: null,
    ratingLabel: 'Force',
    referenceOnly: true,
    ...overrides,
  };
}

const enchanting_focus = focus({
  id: 'enchanting_focus', label: 'Enchanting Focus',
  costPerRating: 5000,
  availabilityEqualsRating: true,
  stats: {
    bondingKarmaPerRating: 3,
    effects: [
      'Empowers Enchanting skill tests.',
      'Sub-type is chosen at creation. Alchemical adds Force dice to preparation-creation tests.',
      'Disenchanting adds Force dice when in contact with another artifact being disenchanted.',
    ],
  },
});

const metamagic_focus = focus({
  id: 'metamagic_focus', label: 'Metamagic Focus',
  costPerRating: 9000,
  availabilityEqualsRating: true,
  stats: {
    bondingKarmaPerRating: 3,
    effects: [
      "Adds Force to the initiate's grade when using one specific metamagic.",
      'Sub-type is chosen at creation. Confirmed variants: Centering (Drain Resistance), Flexible Signature (raising observers\u2019 Assensing threshold), Masking (resisting Assensing), and Spell Shaping (spell shaping capacity).',
      'Supports an initiate\u2019s higher forms of magic only.',
    ],
  },
});

const power_focus = focus({
  id: 'power_focus', label: 'Power Focus',
  costPerRating: 18000,
  availabilityFormula: 'Force + 3',
  stats: {
    bondingKarmaPerRating: 6,
    effects: [
      'Temporarily increases effective Magic rating by its Force.',
      'Adds to Sorcery dice pools, and to anything else Magic is involved in.',
    ],
  },
});

const qi_focus = focus({
  id: 'qi_focus', label: 'Qi Focus',
  description: 'Can be an object, or worked into a body modification — a tattoo, ritual scarring, a piercing.',
  costPerRating: 3000,
  availabilityEqualsRating: true,
  stats: {
    bondingKarmaPerRating: 2,
    effects: [
      'Channels mana into a single specific Adept Power at a specific level, chosen when the focus is created.',
      'Force must equal 4x the Power Point cost of the power it holds.',
      'Adepts and Mystic Adepts only.',
    ],
  },
});

const spell_focus = focus({
  id: 'spell_focus', label: 'Spell Focus',
  costPerRating: 4000,
  availabilityEqualsRating: true,
  stats: {
    bondingKarmaPerRating: 2,
    effects: [
      'Attuned at creation to rituals, or to one of the five spell categories: Combat, Detection, Health, Illusion, Manipulation.',
      'The attunement is permanent and cannot be changed.',
      'Four named types exist; only Counterspelling has confirmed mechanical text — it adds Force dice to a Counterspelling attempt in the same category.',
    ],
  },
});

const spirit_focus = focus({
  id: 'spirit_focus', label: 'Spirit Focus',
  description: 'Mechanical effect not confirmed against source this pass — pricing only.',
  costPerRating: 4000,
  availabilityEqualsRating: true,
  stats: {
    bondingKarmaPerRating: 2,
    effects: ['Empowers Conjuring.'],
  },
});

const weapon_focus = focus({
  id: 'weapon_focus', label: 'Weapon Focus',
  costPerRating: 7000,
  availabilityFormula: 'Force + 3',
  stats: {
    bondingKarmaPerRating: 3,
    effects: [
      'Adds its Force to Astral Combat tests while wielded.',
      'Effective against astral forms whether using astral perception or projection.',
      'Can be carried while astrally projecting.',
      'Damage matches its physical-world damage; the wielder chooses Stun or Physical in astral combat.',
    ],
  },
});

// ---- Formulae ----
// Focus formulae cost 25% of their matching focus type's own Force-
// scaled cost, and share that focus type's own Availability shape
// ("As focus") — confirmed as a ratio, not a flat price, so each of
// the 7 mirrors its focus above rather than being one generic item.
// Ratios verified: 5000/1250, 9000/2250, 18000/4500, 3000/750,
// 4000/1000, 4000/1000, 7000/1750 — all exactly 25%.
//
// D3/D4: this factory now sets `stats`, `cost`, and `availability`,
// which it previously left undefined on all seven items.

function focusFormula(overrides) {
  return {
    category: 'formula', legality: 'licensed', image: null, tags: ['formula'],
    cost: null, availability: null,
    ratingLabel: 'Force',
    stats: {},
    ...overrides,
  };
}

const enchanting_focus_formula = focusFormula({
  id: 'enchanting_focus_formula', label: 'Enchanting Focus Formula',
  description: '25% of an Enchanting Focus\u2019s own cost, at the same Availability shape.',
  costPerRating: 1250,
  availabilityEqualsRating: true,
});
const metamagic_focus_formula = focusFormula({
  id: 'metamagic_focus_formula', label: 'Metamagic Focus Formula',
  description: '25% of a Metamagic Focus\u2019s own cost, at the same Availability shape.',
  costPerRating: 2250,
  availabilityEqualsRating: true,
});
const power_focus_formula = focusFormula({
  id: 'power_focus_formula', label: 'Power Focus Formula',
  description: '25% of a Power Focus\u2019s own cost, at the same Availability shape.',
  costPerRating: 4500,
  availabilityFormula: 'Force + 3',
});
const qi_focus_formula = focusFormula({
  id: 'qi_focus_formula', label: 'Qi Focus Formula',
  description: '25% of a Qi Focus\u2019s own cost, at the same Availability shape.',
  costPerRating: 750,
  availabilityEqualsRating: true,
});
const spell_focus_formula = focusFormula({
  id: 'spell_focus_formula', label: 'Spell Focus Formula',
  description: '25% of a Spell Focus\u2019s own cost, at the same Availability shape.',
  costPerRating: 1000,
  availabilityEqualsRating: true,
});
const spirit_focus_formula = focusFormula({
  id: 'spirit_focus_formula', label: 'Spirit Focus Formula',
  description: '25% of a Spirit Focus\u2019s own cost, at the same Availability shape.',
  costPerRating: 1000,
  availabilityEqualsRating: true,
});
const weapon_focus_formula = focusFormula({
  id: 'weapon_focus_formula', label: 'Weapon Focus Formula',
  description: '25% of a Weapon Focus\u2019s own cost, at the same Availability shape.',
  costPerRating: 1750,
  availabilityFormula: 'Force + 3',
});

const ritual_spellcasting_formula = {
  id: 'ritual_spellcasting_formula', label: 'Ritual Spellcasting Formula',
  category: 'formula', legality: 'licensed', image: null, tags: ['formula'],
  cost: 1000, availability: 3,
  referenceOnly: true,
  stats: {
    effects: ['Required in order to perform Ritual Spellcasting.'],
  },
};

function spellFormula(overrides) {
  return {
    category: 'formula', legality: 'licensed', image: null, tags: ['formula'],
    referenceOnly: true,
    stats: {},
    ...overrides,
  };
}
const spell_formula_combat = spellFormula({
  id: 'spell_formula_combat', label: 'Spell Formula (Combat)',
  cost: 2000, availability: 3,
  stats: { effects: ['Required in order to learn a Combat-category spell.'] },
});
const spell_formula_detection = spellFormula({
  id: 'spell_formula_detection', label: 'Spell Formula (Detection)',
  cost: 500, availability: 2,
  stats: { effects: ['Required in order to learn a Detection-category spell.'] },
});
const spell_formula_health = spellFormula({
  id: 'spell_formula_health', label: 'Spell Formula (Health)',
  cost: 500, availability: 2,
  stats: { effects: ['Required in order to learn a Health-category spell.'] },
});
const spell_formula_illusion = spellFormula({
  id: 'spell_formula_illusion', label: 'Spell Formula (Illusion)',
  cost: 1000, availability: 3,
  stats: { effects: ['Required in order to learn an Illusion-category spell.'] },
});
const spell_formula_manipulation = spellFormula({
  id: 'spell_formula_manipulation', label: 'Spell Formula (Manipulation)',
  cost: 1500, availability: 3,
  stats: { effects: ['Required in order to learn a Manipulation-category spell.'] },
});

// ---- Magical Supplies ----

const magical_lodge_materials = {
  id: 'magical_lodge_materials', label: 'Magical Lodge Materials',
  category: 'magical_supply', legality: 'licensed', image: null, tags: ['magical_supply'],
  cost: null, costPerRating: 500, availability: null, availabilityEqualsRating: true,
  ratingLabel: 'Force',
  referenceOnly: true,
  stats: {
    effects: ['Materials for constructing a magical lodge.'],
  },
};

// NOTE: `costPerUnit` here is per single dram, so there's no
// `unitQuantity` alongside it — unlike the RFID tags (per 10) and the
// ropes (per 100m) elsewhere in the catalog, which both pair it with a
// unit count.
const reagents = {
  id: 'reagents', label: 'Reagents',
  category: 'magical_supply', legality: null, image: null, tags: ['magical_supply'],
  cost: null, costPerUnit: 50, availability: 2,
  referenceOnly: true,
  description: 'Sold per dram.',
  stats: {
    effects: [
      'Used for alchemical preparation, artificing, banishing, binding, counterspelling, magical lodges, ritual spellcasting, and summoning.',
    ],
  },
};

export const GEAR_MAGICAL_GOODS = {
  enchanting_focus, metamagic_focus, power_focus, qi_focus, spell_focus, spirit_focus, weapon_focus,
  enchanting_focus_formula, metamagic_focus_formula, power_focus_formula, qi_focus_formula,
  spell_focus_formula, spirit_focus_formula, weapon_focus_formula,
  ritual_spellcasting_formula,
  spell_formula_combat, spell_formula_detection, spell_formula_health, spell_formula_illusion, spell_formula_manipulation,
  magical_lodge_materials, reagents,
};

// D2: this export was missing entirely — every other gear file has one.
export const GEAR_MAGICAL_GOODS_IDS = Object.keys(GEAR_MAGICAL_GOODS);
