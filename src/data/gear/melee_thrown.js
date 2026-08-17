// Melee/Thrown gear catalog — full list from the Melee/Thrown chapter.
// Same envelope as GEAR.js; this file just holds the actual items for
// this one category rather than growing the schema-example file forever.
//
// Two wrinkles this category surfaced that the schema didn't cover yet:
//
// 1. Bow/Arrow/Injection Arrow scale by a purchased Rating — cost, DV,
//    and Attack Ratings are all formulas, not fixed values. `costBase`/
//    `costPerRating` handle the cost side; DV/Attack Ratings fall back
//    to a raw formula string (damageValueFormula/attackRatingsFormula)
//    for just these, rather than forcing every item through the same
//    numeric-array shape.
// 2. Bullwhip/Monofilament Whip use Reaction instead of Strength for
//    Attack Rating, overriding close_combat's normal attribute pairing.
//    `attributeOverride` on stats is new — optional, only present when
//    an item breaks its skill's default attribute.

// ---- Blades ----

const combat_axe = {
  id: 'combat_axe',
  label: 'Combat Axe',
  category: 'melee_weapon',
  cost: 500,
  availability: 4,
  legality: null,
  description: 'Single or double blade with a spring-loaded thrusting point, sometimes for glass-breaking. Deadlier than a firearm in the right hands.',
  tags: ['blade'],
  stats: { damageValue: '5P', attackRatings: [9, null, null, null, null], skill: 'close_combat' },
};

const combat_survival_knife = {
  id: 'combat_survival_knife',
  label: 'Combat/Survival Knife',
  category: 'melee_weapon',
  cost: 220,
  availability: 2,
  legality: null,
  description: 'Simple, chisel-pointed for armor penetration, carbon-coated to avoid reflections. The survival variant adds a GPS monitor, mini-multitool, and micro-lighter in the handle — same combat stats either way. Thrown max range 20m.',
  tags: ['blade'],
  stats: { damageValue: '3P', attackRatings: [8, 2, null, null, null], skill: 'close_combat' },
};

const forearm_snap_blades = {
  id: 'forearm_snap_blades',
  label: 'Forearm Snap Blades',
  category: 'melee_weapon',
  cost: 185,
  availability: 3,
  legality: null,
  description: 'Three blades that extend/retract via muscle command or wireless signal.',
  tags: ['blade'],
  stats: { damageValue: '3P', attackRatings: [6, null, null, null, null], skill: 'close_combat' },
};

const knife = {
  id: 'knife',
  label: 'Knife',
  category: 'melee_weapon',
  cost: 20,
  availability: 1,
  legality: null,
  description: 'Catchall term for various blade styles sharing the same stats. Thrown max range 20m.',
  tags: ['blade'],
  stats: { damageValue: '2P', attackRatings: [6, 1, null, null, null], skill: 'close_combat' },
};

const katana = {
  id: 'katana',
  label: 'Katana',
  category: 'melee_weapon',
  cost: 350,
  availability: 3,
  legality: null,
  description: 'The iconic two-handed samurai sword.',
  tags: ['blade'],
  stats: { damageValue: '4P', attackRatings: [10, null, null, null, null], skill: 'close_combat' },
};

const polearm = {
  id: 'polearm',
  label: 'Polearm',
  category: 'melee_weapon',
  cost: 210,
  availability: 2,
  legality: null,
  description: 'A long blade-tipped staff — keeps distance or strikes mounted targets. Nearly impossible to conceal.',
  tags: ['blade'],
  stats: { damageValue: '4P', attackRatings: [8, null, null, null, null], skill: 'close_combat' },
};

const sword = {
  id: 'sword',
  label: 'Sword',
  category: 'melee_weapon',
  cost: 320,
  availability: 3,
  legality: null,
  description: "A heavy one-handed blade — the world's dominant weapon for millennia before firearms.",
  tags: ['blade'],
  stats: { damageValue: '3P', attackRatings: [9, null, null, null, null], skill: 'close_combat' },
};

// ---- Clubs ----

const club = {
  id: 'club',
  label: 'Club',
  category: 'melee_weapon',
  cost: 65,
  availability: 1,
  legality: null,
  description: 'Covers a whole range of improvised/simple bludgeons — axe handle, bat, crowbar, tire iron, wrench, nail-studded 2x4. Priced as a proper police baton.',
  tags: ['club'],
  stats: { damageValue: '3S', attackRatings: [6, null, null, null, null], skill: 'close_combat' },
};

const extendable_baton = {
  id: 'extendable_baton',
  label: 'Extendable Baton',
  category: 'melee_weapon',
  cost: 52,
  availability: 2,
  legality: null,
  description: 'Telescopes out via wrist-flick or wireless signal. Concealability threshold 4 retracted, 2 extended.',
  tags: ['club'],
  stats: { damageValue: '2S', attackRatings: [5, null, null, null, null], skill: 'close_combat' },
};

const sap = {
  id: 'sap',
  label: 'Sap',
  category: 'melee_weapon',
  cost: 75,
  availability: 1,
  legality: null,
  description: 'A blackjack — short, flexible, and easy to conceal (Concealability threshold 4).',
  tags: ['club'],
  stats: { damageValue: '2S', attackRatings: [6, null, null, null, null], skill: 'close_combat' },
};

const staff = {
  id: 'staff',
  label: 'Staff',
  category: 'melee_weapon',
  cost: 150,
  availability: 1,
  legality: null,
  description: 'The classic big stick — composite, hardwood, high-carbon steel, whatever suits.',
  tags: ['club'],
  stats: { damageValue: '4S', attackRatings: [8, null, null, null, null], skill: 'close_combat' },
};

const stun_baton = {
  id: 'stun_baton',
  label: 'Stun Baton',
  category: 'melee_weapon',
  cost: 600,
  availability: 2,
  legality: null,
  description: 'Riot-control staple, 10 charges, regains 1 per 10 seconds while plugged in.',
  tags: ['club'],
  stats: { damageValue: '5S(e)', attackRatings: [6, null, null, null, null], skill: 'close_combat' },
};

const telescoping_staff = {
  id: 'telescoping_staff',
  label: 'Telescoping Staff',
  category: 'melee_weapon',
  cost: 250,
  availability: 2,
  legality: null,
  description: 'Collapses down to stun-baton or sword size; extends/retracts via twist-lock or wireless signal.',
  tags: ['club'],
  stats: { damageValue: '4S', attackRatings: [8, null, null, null, null], skill: 'close_combat' },
};

// ---- Other (Unarmed / Exotic) ----

const bike_chain = {
  id: 'bike_chain',
  label: 'Bike Chain',
  category: 'melee_weapon',
  cost: 15,
  availability: 1,
  legality: null,
  description: 'Favored by go-gangs. Grants a bonus Minor Action on a turn you use the Trip Minor Action with it.',
  tags: ['unarmed'],
  stats: { damageValue: '2S', attackRatings: [5, null, null, null, null], skill: 'close_combat' },
};

const bullwhip = {
  id: 'bullwhip',
  label: 'Bullwhip',
  category: 'melee_weapon',
  cost: 255,
  availability: 4,
  legality: null,
  description: 'Cattle-driving leather cord, brutal on bare flesh, mostly a tripping hazard against armor. Same Trip bonus as the bike chain. Requires an Exotic Weapons specialization.',
  tags: ['exotic'],
  stats: {
    damageValue: '1P',
    attackRatings: [6, null, null, null, null],
    skill: 'exotic_weapons',
    attributeOverride: 'reaction', // uses Reaction instead of Strength for Attack Rating
  },
};

const knucks = {
  id: 'knucks',
  label: 'Knucks',
  category: 'melee_weapon',
  cost: 100,
  availability: 1,
  legality: null,
  description: 'From a roll of quarters to Ares Hardliner Gloves — upgrades a fist from potentially deadly to reliably deadly.',
  tags: ['unarmed'],
  stats: { damageValue: '3P', attackRatings: [6, null, null, null, null], skill: 'close_combat' },
};

const shock_gloves = {
  id: 'shock_gloves',
  label: 'Shock Gloves',
  category: 'melee_weapon',
  cost: 790,
  availability: 4,
  legality: null,
  description: 'Insulated gloves that discharge current on contact once activated; inflicts Zapped. 10 charges, 1 per 10 seconds to recharge.',
  tags: ['unarmed'],
  stats: { damageValue: '4S(e)', attackRatings: [5, null, null, null, null], skill: 'close_combat' },
};

const monofilament_whip = {
  id: 'monofilament_whip',
  label: 'Monofilament Whip',
  category: 'melee_weapon',
  cost: 1300,
  availability: 6,
  legality: 'illegal',
  description: "A glowing, terrifying 2-meter monofilament line that cuts through armor, flesh, and bone like butter. A critical glitch always forces the wielder to resist the weapon's own base damage. Requires an Exotic Weapons specialization.",
  tags: ['exotic'],
  stats: {
    damageValue: '6P',
    attackRatings: [14, null, null, null, null],
    skill: 'exotic_weapons',
    attributeOverride: 'reaction', // uses Reaction instead of Strength for Attack Rating
  },
};

// ---- Thrown/Projectile (Athletics skill) ----

const bow = {
  id: 'bow',
  label: 'Bow',
  category: 'thrown_weapon',
  cost: null, // Rating-scaled — see costBase/costPerRating
  costBase: 100,
  costPerRating: 10,
  availability: null, // (Rating/3)(L) — scales with chosen Rating, always licensed
  legality: 'licensed',
  description: 'Traditional or compound; hacker-proof if kept simple. Rating sets both minimum Strength required and damage (max Rating 14); arrows must meet or exceed the bow\'s Rating.',
  tags: ['thrown'],
  stats: {
    ratingRange: [1, 14],
    damageValueFormula: '(Rating/2)P',
    attackRatingsFormula: '(Rating/2)/(Rating)/(Rating/4)/—/—',
    skill: 'athletics',
  },
};

const arrow = {
  id: 'arrow',
  label: 'Arrow',
  category: 'ammo',
  cost: null,
  costPerRating: 2,
  availability: null, // (Rating/3)
  legality: null,
  description: "Must meet or exceed the firing bow's Rating.",
  tags: ['ammo'],
  stats: { ratingRange: [1, 14], compatibleWith: 'bow' },
};

const injection_arrow = {
  id: 'injection_arrow',
  label: 'Injection Arrow',
  category: 'ammo',
  cost: null,
  costPerRating: 20,
  availability: 4,
  legality: null,
  description: 'Delivers base damage plus one dose of a drug/toxin on a hit dealing at least 1 box of damage after resistance. Base Rating 8 — higher Ratings need a heavier bow.',
  tags: ['ammo'],
  stats: { compatibleWith: 'bow', deliversPayload: true },
};

const crossbow_light = {
  id: 'crossbow_light',
  label: 'Crossbow, Light',
  category: 'thrown_weapon',
  cost: 150,
  availability: 3,
  legality: null,
  description: 'One-handed; modern autoloading design with a 4-bolt internal magazine.',
  tags: ['thrown'],
  stats: { damageValue: '2P', attackRatings: [6, 8, 2, null, null], skill: 'athletics' },
};

const crossbow_standard = {
  id: 'crossbow_standard',
  label: 'Crossbow, Standard',
  category: 'thrown_weapon',
  cost: 290,
  availability: 3,
  legality: 'licensed',
  description: 'Two-handed autoloading crossbow, 4-bolt internal magazine.',
  tags: ['thrown'],
  stats: { damageValue: '3P', attackRatings: [2, 10, 4, 2, null], skill: 'athletics' },
};

const crossbow_heavy = {
  id: 'crossbow_heavy',
  label: 'Crossbow, Heavy',
  category: 'thrown_weapon',
  cost: 425,
  availability: 4,
  legality: 'licensed',
  description: 'Two-handed autoloading crossbow, 4-bolt internal magazine.',
  tags: ['thrown'],
  stats: { damageValue: '4P', attackRatings: [2, 8, 6, 4, null], skill: 'athletics' },
};

const bolt = {
  id: 'bolt',
  label: 'Bolt',
  category: 'ammo',
  cost: 5,
  availability: 2,
  legality: null,
  description: 'Standard crossbow ammunition.',
  tags: ['ammo'],
  stats: { compatibleWith: 'crossbow' },
};

const injection_bolt = {
  id: 'injection_bolt',
  label: 'Injection Bolt',
  category: 'ammo',
  cost: 50,
  availability: 4,
  legality: null,
  description: 'Delivers base damage plus one dose of a drug/toxin on a hit dealing at least 1 box of damage after resistance.',
  tags: ['ammo'],
  stats: { compatibleWith: 'crossbow', deliversPayload: true },
};

const throwing_knives = {
  id: 'throwing_knives',
  label: 'Throwing Knives',
  category: 'thrown_weapon',
  cost: 155,
  availability: 2,
  legality: null,
  description: 'Up to (Agility/2) can be readied at once with a single Ready Weapon action.',
  tags: ['thrown'],
  stats: { damageValue: '2P', attackRatings: [10, 9, 3, null, null], skill: 'athletics' },
};

const throwing_stars = {
  id: 'throwing_stars',
  label: 'Throwing Stars',
  category: 'thrown_weapon',
  cost: 160,
  availability: 2,
  legality: null,
  description: 'Up to (Agility/2) can be readied at once with a single Ready Weapon action.',
  tags: ['thrown'],
  stats: { damageValue: '2P', attackRatings: [9, 11, 5, null, null], skill: 'athletics' },
};

export const GEAR_MELEE_THROWN = {
  combat_axe, combat_survival_knife, forearm_snap_blades, knife, katana, polearm, sword,
  club, extendable_baton, sap, staff, stun_baton, telescoping_staff,
  bike_chain, bullwhip, knucks, shock_gloves, monofilament_whip,
  bow, arrow, injection_arrow, crossbow_light, crossbow_standard, crossbow_heavy,
  bolt, injection_bolt, throwing_knives, throwing_stars,
};

export const GEAR_MELEE_THROWN_IDS = Object.keys(GEAR_MELEE_THROWN);
