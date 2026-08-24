// Magical Goods — Foci, Formulae, and Magical Supplies. Confirmed
// pricing table, verified against source directly (not condensed
// notes). Force-scaled throughout, same shape as any other Rating-
// scaled item elsewhere in this catalog (costPerRating/
// availabilityEqualsRating/availabilityFormula) — "Force" is just this
// item family's own name for the same "chosen scaling number" concept.
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

function focus(overrides) {
  return {
    category: 'focus', legality: 'licensed', image: null, tags: ['focus'],
    cost: null, availability: null,
    ...overrides,
  };
}

const enchanting_focus = focus({
  id: 'enchanting_focus', label: 'Enchanting Focus',
  description: 'Empowers Enchanting skill tests. Sub-type chosen at creation — confirmed variants include Alchemical (adds Force dice to preparation-creation tests) and Disenchanting (adds Force dice when in contact with another artifact being disenchanted).',
  costPerRating: 5000,
  availabilityEqualsRating: true,
  stats: { bondingKarmaPerRating: 3 },
});

const metamagic_focus = focus({
  id: 'metamagic_focus', label: 'Metamagic Focus',
  description: "Supports an initiate's higher forms of magic — adds Force to initiate grade when using a specific metamagic. Sub-type chosen at creation — confirmed variants include Centering (Drain Resistance), Flexible Signature (raising observers' Assensing threshold), Masking (resisting Assensing), and Spell Shaping (spell shaping capacity).",
  costPerRating: 9000,
  availabilityEqualsRating: true,
  stats: { bondingKarmaPerRating: 3 },
});

const power_focus = focus({
  id: 'power_focus', label: 'Power Focus',
  description: 'Temporarily increases effective Magic rating by its Force — adds to Sorcery dice pools and anything else Magic is involved in.',
  costPerRating: 18000,
  availabilityFormula: 'Force + 3',
  stats: { bondingKarmaPerRating: 6 },
});

const qi_focus = focus({
  id: 'qi_focus', label: 'Qi Focus',
  description: "Adept/Mystic Adept only — channels mana into a single, specific Adept Power at a specific level, chosen when the focus is created. Force must equal 4x the Power Point cost of the power it holds. Can be an object or worked into a body modification (tattoo, ritual scarring, piercing).",
  costPerRating: 3000,
  availabilityEqualsRating: true,
  stats: { bondingKarmaPerRating: 2 },
});

const spell_focus = focus({
  id: 'spell_focus', label: 'Spell Focus',
  description: "Attuned to rituals or to one of the five spell categories (Combat, Detection, Health, Illusion, Manipulation) at creation — permanent, can't be changed. Four named types exist; only Counterspelling (adds Force dice to a Counterspelling attempt in the same category) has confirmed mechanical text here.",
  costPerRating: 4000,
  availabilityEqualsRating: true,
  stats: { bondingKarmaPerRating: 2 },
});

const spirit_focus = focus({
  id: 'spirit_focus', label: 'Spirit Focus',
  description: 'Empowers Conjuring. Mechanical effect not confirmed against source this pass — pricing only.',
  costPerRating: 4000,
  availabilityEqualsRating: true,
  stats: { bondingKarmaPerRating: 2 },
});

const weapon_focus = focus({
  id: 'weapon_focus', label: 'Weapon Focus',
  description: 'Adds its Force to Astral Combat tests while wielded, effective against astral forms whether using astral perception or projection — can be carried while astrally projecting. Damage matches its physical-world damage, with the wielder choosing Stun or Physical in astral combat.',
  costPerRating: 7000,
  availabilityFormula: 'Force + 3',
  stats: { bondingKarmaPerRating: 3 },
});

// ---- Formulae ----
// Focus formulae cost 25% of their matching focus type's own Force-
// scaled cost, and share that focus type's own Availability shape
// ("As focus") — confirmed as a ratio, not a flat price, so each of
// the 7 mirrors its focus above rather than being one generic item.

function focusFormula(overrides) {
  return {
    category: 'formula', legality: 'licensed', image: null, tags: ['formula'],
    ...overrides,
  };
}

const enchanting_focus_formula = focusFormula({
  id: 'enchanting_focus_formula', label: 'Enchanting Focus Formula',
  description: '25% of an Enchanting Focus\u2019s own cost — same Availability shape ("As focus").',
  costPerRating: 1250,
  availabilityEqualsRating: true,
});
const metamagic_focus_formula = focusFormula({
  id: 'metamagic_focus_formula', label: 'Metamagic Focus Formula',
  description: '25% of a Metamagic Focus\u2019s own cost — same Availability shape ("As focus").',
  costPerRating: 2250,
  availabilityEqualsRating: true,
});
const power_focus_formula = focusFormula({
  id: 'power_focus_formula', label: 'Power Focus Formula',
  description: '25% of a Power Focus\u2019s own cost — same Availability shape ("As focus").',
  costPerRating: 4500,
  availabilityFormula: 'Force + 3',
});
const qi_focus_formula = focusFormula({
  id: 'qi_focus_formula', label: 'Qi Focus Formula',
  description: '25% of a Qi Focus\u2019s own cost — same Availability shape ("As focus").',
  costPerRating: 750,
  availabilityEqualsRating: true,
});
const spell_focus_formula = focusFormula({
  id: 'spell_focus_formula', label: 'Spell Focus Formula',
  description: '25% of a Spell Focus\u2019s own cost — same Availability shape ("As focus").',
  costPerRating: 1000,
  availabilityEqualsRating: true,
});
const spirit_focus_formula = focusFormula({
  id: 'spirit_focus_formula', label: 'Spirit Focus Formula',
  description: '25% of a Spirit Focus\u2019s own cost — same Availability shape ("As focus").',
  costPerRating: 1000,
  availabilityEqualsRating: true,
});
const weapon_focus_formula = focusFormula({
  id: 'weapon_focus_formula', label: 'Weapon Focus Formula',
  description: '25% of a Weapon Focus\u2019s own cost — same Availability shape ("As focus").',
  costPerRating: 1750,
  availabilityFormula: 'Force + 3',
});

const ritual_spellcasting_formula = {
  id: 'ritual_spellcasting_formula', label: 'Ritual Spellcasting Formula',
  category: 'formula', legality: 'licensed', image: null, tags: ['formula'],
  cost: 1000, availability: 3,
  description: 'Required to perform Ritual Spellcasting.',
  stats: {},
};

function spellFormula(overrides) {
  return {
    category: 'formula', legality: 'licensed', image: null, tags: ['formula'],
    stats: {},
    ...overrides,
  };
}
const spell_formula_combat = spellFormula({
  id: 'spell_formula_combat', label: 'Spell Formula (Combat)',
  description: 'Required to learn a Combat-category spell.',
  cost: 2000, availability: 3,
});
const spell_formula_detection = spellFormula({
  id: 'spell_formula_detection', label: 'Spell Formula (Detection)',
  description: 'Required to learn a Detection-category spell.',
  cost: 500, availability: 2,
});
const spell_formula_health = spellFormula({
  id: 'spell_formula_health', label: 'Spell Formula (Health)',
  description: 'Required to learn a Health-category spell.',
  cost: 500, availability: 2,
});
const spell_formula_illusion = spellFormula({
  id: 'spell_formula_illusion', label: 'Spell Formula (Illusion)',
  description: 'Required to learn an Illusion-category spell.',
  cost: 1000, availability: 3,
});
const spell_formula_manipulation = spellFormula({
  id: 'spell_formula_manipulation', label: 'Spell Formula (Manipulation)',
  description: 'Required to learn a Manipulation-category spell.',
  cost: 1500, availability: 3,
});

// ---- Magical Supplies ----

const magical_lodge_materials = {
  id: 'magical_lodge_materials', label: 'Magical Lodge Materials',
  category: 'magical_supply', legality: 'licensed', image: null, tags: ['magical_supply'],
  cost: null, costPerRating: 500, availability: null, availabilityEqualsRating: true,
  description: 'Materials for constructing a magical lodge.',
  stats: {},
};

const reagents = {
  id: 'reagents', label: 'Reagents',
  category: 'magical_supply', legality: null, image: null, tags: ['magical_supply'],
  cost: null, costPerUnit: 50, availability: 2,
  description: 'Sold per dram. Used for alchemical preparation, artificing, banishing, binding, counterspelling, magical lodges, ritual spellcasting, and summoning.',
  stats: {},
};

export const GEAR_MAGICAL_GOODS = {
  enchanting_focus, metamagic_focus, power_focus, qi_focus, spell_focus, spirit_focus, weapon_focus,
  enchanting_focus_formula, metamagic_focus_formula, power_focus_formula, qi_focus_formula,
  spell_focus_formula, spirit_focus_formula, weapon_focus_formula,
  ritual_spellcasting_formula,
  spell_formula_combat, spell_formula_detection, spell_formula_health, spell_formula_illusion, spell_formula_manipulation,
  magical_lodge_materials, reagents,
};
