// Melee/Thrown gear catalog — full list from the Melee/Thrown chapter.
// Same envelope as GEAR.js; this file just holds the actual items for
// this one category rather than growing the schema-example file forever.
//
// RE-CHECKED against 13a-gear-melee-thrown.md (Gear Part 1, pp.
// 244-250) in full as part of the wireless-bonus/capacity verification
// pass. This file was flagged "already done" going into that pass, but
// the full source read found it was NOT actually complete — 11 items
// were missing real "Wireless bonus:" text (Combat/Survival Knife,
// Forearm Snap Blades, Extendable Baton, Stun Baton, Telescoping Staff,
// Shock Gloves, Monofilament Whip, Injection Arrow, Injection Bolt,
// Throwing Knives, Throwing Stars), three of which (Stun Baton, Shock
// Gloves, Monofilament Whip) were missing `wireless: true` entirely —
// Stun Baton and Shock Gloves were even explicitly called out in an
// earlier version of this comment as "considered and NOT marked," which
// turned out to be wrong once read against the actual source prose
// instead of the condensed description. Same blind spot as every other
// file in this pass, just caught late. All fixed.
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
//    `attributeOverride` on stats is optional — only present when an
//    item breaks its skill's default attribute.
//
// `wireless: true` is rare in this category — most of it is just
// physical objects. The DATA carries it on twelve items: three
// explicitly name "wireless signal" as an activation option for their
// extend/retract mechanism (Forearm Snap Blades, Extendable Baton,
// Telescoping Staff); Stun Baton, Shock Gloves, and Monofilament Whip
// also have real Wireless Bonus text (recharging/activation/targeting)
// that the original pass missed; Telescoping Ladder Staff has its own;
// and Combat/Survival Knife, Injection Arrow, Injection Bolt, Throwing
// Knives, and Throwing Stars each carry real wireless-dependent bonus
// text too (GPS/biomonitor display, delayed-injection triggers, and the
// smartlink tracking-tag bonus, respectively) — twelve items total, not
// seven; an earlier draft of this note undercounted by five.
//
// ============================================================================
// SCHEMA PASSES 1 AND 2 (both applied at once — this file hadn't had
// either yet):
//
// S1. `wirelessBonus` -> `wirelessBonuses`, plus `effects` extracted
//     from `description` prose. Both ARRAYS of plain strings, one
//     distinct mechanic per entry, active mechanics first and
//     restrictions last. Several bonuses here were two mechanics in one
//     string (Shock Gloves' activation Minor Action AND its inductive
//     recharge; the throwing weapons' tracking tag AND the smartlink
//     dice bonus) and are now split.
// S2. `description` IS NOW OMITTABLE.
// D1. `referenceOnly: true` where no live computed field drives any of
//     the item's effects. Six items here ARE backed and are commented
//     as such — the projectile family, whose `compatibleWith` /
//     `deliversPayload` / formula fields genuinely drive what their
//     effects describe, plus Monofilament Whip, whose critical-glitch
//     rule resolves against its own `damageValue`.
// D2. `skill` MOVED TO THE ITEM ROOT on all 29 weapons. THIS FILE WAS
//     THE ACTUAL HOLDOUT: earlier passes moved `stats.skill` -> root on
//     the two shields, the grapple gun, and the nine melee implant
//     weapons, each time citing "the convention melee_thrown.js already
//     uses" — which was wrong. Only firearms_explosives.js used root
//     `skill`; this file used `stats.skill` throughout. Now consistent
//     catalog-wide.
// D3. TELESCOPING LADDER STAFF HAD NO `skill` AT ALL. It carries a
//     damageValue and attackRatings, so it's usable as a weapon, but
//     with no skill nothing could resolve an attack with it. Given
//     close_combat to match every other club in the file. Its tags were
//     also `['melee_weapon']` — the category name, not one of the
//     blade/club/unarmed/exotic tags the rest of the file uses — so
//     tag-based filtering skipped it. Now `['club']`.
// D4. `compatibleWith` NOW RESOLVES. Arrow pointed at 'bow' (a real
//     item ID) while Bolt pointed at 'crossbow' (neither an ID nor a
//     tag — nothing at all). Both now resolve against TAGS, matching
//     the convention cyberware_bioware.js's firearm implants use, and
//     the weapons gained the matching `bow` / `crossbow` tags.
// D5. `availabilityFormula` ON BOW AND ARROW. Both had
//     `availability: null` with the real formula stranded in a trailing
//     comment ("(Rating/3)(L)"). `availabilityFormula` already exists —
//     armor_electronics.js's Tutorsoft uses it — so the formula is now
//     data rather than a comment.
//
// KNOWN COMPROMISE, unchanged: Combat/Survival Knife is ONE item for
// both variants. Combat stats are identical either way, so it fails the
// variant-split test — but the wireless bonus applies only to the
// survival variant, which one item can't express. Flagged, not resolved.
// ============================================================================

const READIED_THROWN_EFFECT = 'Up to Agility/2 of them can be readied at once with a single Ready Weapon action.';

const THROWN_TAG_WIRELESS = [
  'A hit leaves a trackable wireless tag in the target.',
  'A wirelessly-linked smartlink user gets +1 dice pool on subsequent attacks against a tagged target.',
];

const INJECTION_PAYLOAD_EFFECTS = [
  'Delivers base damage plus one dose of a drug or toxin, on a hit dealing at least 1 box of damage after resistance.',
];

const INJECTION_PAYLOAD_WIRELESS = [
  'Injection can be delayed until triggered wirelessly.',
  'Only 1 net hit is needed to deliver the payload, rather than a full damage box.',
];

// ---- Blades ----

const combat_axe = {
  id: 'combat_axe',
  label: 'Combat Axe',
  category: 'melee_weapon',
  cost: 500,
  availability: 4,
  legality: null,
  image: null,
  skill: 'close_combat',
  description: 'Single or double blade with a spring-loaded thrusting point, sometimes for glass-breaking. Deadlier than a firearm in the right hands.',
  tags: ['blade'],
  stats: { damageValue: '5P', attackRatings: [9, null, null, null, null] },
};

// KNOWN COMPROMISE: one item for both variants — see the header note.
const combat_survival_knife = {
  id: 'combat_survival_knife',
  label: 'Combat/Survival Knife',
  category: 'melee_weapon',
  cost: 220,
  availability: 2,
  legality: null,
  image: null,
  skill: 'close_combat',
  wireless: true, // survival variant's GPS monitor — see file header note
  referenceOnly: true,
  description: 'Simple, chisel-pointed for armor penetration, and carbon-coated to avoid reflections.',
  tags: ['blade'],
  stats: {
    damageValue: '3P',
    attackRatings: [8, 2, null, null, null],
    effects: [
      'Thrown to a maximum range of 20m.',
      'The survival variant adds a GPS monitor, mini-multitool, and micro-lighter in the handle — combat stats are the same either way.',
    ],
    wirelessBonuses: ['Displays a local map/GPS ARO and basic biomonitor data in hand (survival variant).'],
  },
};

const forearm_snap_blades = {
  id: 'forearm_snap_blades',
  label: 'Forearm Snap Blades',
  category: 'melee_weapon',
  cost: 185,
  availability: 3,
  legality: null,
  image: null,
  skill: 'close_combat',
  wireless: true,
  referenceOnly: true,
  description: 'Three blades worn along the forearm.',
  tags: ['blade'],
  stats: {
    damageValue: '3P',
    attackRatings: [6, null, null, null, null],
    effects: ['Extend and retract via muscle command or wireless signal.'],
    wirelessBonuses: ['An extra Minor Action on the turn the blades are extended or retracted.'],
  },
};

const knife = {
  id: 'knife',
  label: 'Knife',
  category: 'melee_weapon',
  cost: 20,
  availability: 1,
  legality: null,
  image: null,
  skill: 'close_combat',
  referenceOnly: true,
  description: 'A catchall term for various blade styles sharing the same stats.',
  tags: ['blade'],
  stats: {
    damageValue: '2P',
    attackRatings: [6, 1, null, null, null],
    effects: ['Thrown to a maximum range of 20m.'],
  },
};

const katana = {
  id: 'katana',
  label: 'Katana',
  category: 'melee_weapon',
  cost: 350,
  availability: 3,
  legality: null,
  image: null,
  skill: 'close_combat',
  description: 'The iconic two-handed samurai sword.',
  tags: ['blade'],
  stats: { damageValue: '4P', attackRatings: [10, null, null, null, null] },
};

const polearm = {
  id: 'polearm',
  label: 'Polearm',
  category: 'melee_weapon',
  cost: 210,
  availability: 2,
  legality: null,
  image: null,
  skill: 'close_combat',
  referenceOnly: true,
  description: 'A long blade-tipped staff.',
  tags: ['blade'],
  stats: {
    damageValue: '4P',
    attackRatings: [8, null, null, null, null],
    effects: [
      'Keeps distance, or strikes mounted targets.',
      'Nearly impossible to conceal.',
    ],
  },
};

const sword = {
  id: 'sword',
  label: 'Sword',
  category: 'melee_weapon',
  cost: 320,
  availability: 3,
  legality: null,
  image: null,
  skill: 'close_combat',
  description: "A heavy one-handed blade — the world's dominant weapon for millennia before firearms.",
  tags: ['blade'],
  stats: { damageValue: '3P', attackRatings: [9, null, null, null, null] },
};

// ---- Clubs ----

const club = {
  id: 'club',
  label: 'Club',
  category: 'melee_weapon',
  cost: 65,
  availability: 1,
  legality: null,
  image: null,
  skill: 'close_combat',
  description: 'Covers a whole range of improvised and simple bludgeons — axe handle, bat, crowbar, tire iron, wrench, nail-studded 2x4. Priced as a proper police baton.',
  tags: ['club'],
  stats: { damageValue: '3S', attackRatings: [6, null, null, null, null] },
};

const extendable_baton = {
  id: 'extendable_baton',
  label: 'Extendable Baton',
  category: 'melee_weapon',
  cost: 52,
  availability: 2,
  legality: null,
  image: null,
  skill: 'close_combat',
  wireless: true,
  referenceOnly: true,
  tags: ['club'],
  stats: {
    damageValue: '2S',
    attackRatings: [5, null, null, null, null],
    effects: [
      'Telescopes out via wrist-flick or wireless signal.',
      'Concealability threshold 4 retracted, 2 extended.',
    ],
    wirelessBonuses: ['Bonus Minor Action on the turn you extend or retract it.'],
  },
};

const sap = {
  id: 'sap',
  label: 'Sap',
  category: 'melee_weapon',
  cost: 75,
  availability: 1,
  legality: null,
  image: null,
  skill: 'close_combat',
  referenceOnly: true,
  description: 'A blackjack — short and flexible.',
  tags: ['club'],
  stats: {
    damageValue: '2S',
    attackRatings: [6, null, null, null, null],
    effects: ['Concealability threshold 4.'],
  },
};

const staff = {
  id: 'staff',
  label: 'Staff',
  category: 'melee_weapon',
  cost: 150,
  availability: 1,
  legality: null,
  image: null,
  skill: 'close_combat',
  description: 'The classic big stick — composite, hardwood, high-carbon steel, whatever suits.',
  tags: ['club'],
  stats: { damageValue: '4S', attackRatings: [8, null, null, null, null] },
};

const stun_baton = {
  id: 'stun_baton',
  label: 'Stun Baton',
  category: 'melee_weapon',
  cost: 600,
  availability: 2,
  legality: null,
  image: null,
  skill: 'close_combat',
  wireless: true,
  referenceOnly: true,
  description: 'A riot-control staple.',
  tags: ['club'],
  stats: {
    damageValue: '5S(e)',
    attackRatings: [6, null, null, null, null],
    effects: ['10 charges; regains 1 per 10 seconds while plugged in.'],
    wirelessBonuses: ['Recharges wirelessly, at 1 charge per half hour of wireless-enabled time.'],
  },
};

const telescoping_staff = {
  id: 'telescoping_staff',
  label: 'Telescoping Staff',
  category: 'melee_weapon',
  cost: 250,
  availability: 2,
  legality: null,
  image: null,
  skill: 'close_combat',
  wireless: true,
  referenceOnly: true,
  tags: ['club'],
  stats: {
    damageValue: '4S',
    attackRatings: [8, null, null, null, null],
    effects: [
      'Collapses down to stun-baton or sword size.',
      'Extends and retracts via twist-lock or wireless signal.',
    ],
    wirelessBonuses: ['Bonus Minor Action on the turn you extend or retract it.'],
  },
};

// D3: this had NO `skill` and used the category name as its tag. Both
// fixed — see the header note.
const telescoping_ladder_staff = {
  id: 'telescoping_ladder_staff',
  label: 'Telescoping Ladder Staff',
  category: 'melee_weapon',
  cost: 750,
  availability: 4,
  legality: null,
  image: null,
  skill: 'close_combat',
  wireless: true,
  referenceOnly: true,
  description: 'Collapses to a 12cm-diameter, 150cm cylinder.',
  tags: ['club'],
  stats: {
    damageValue: '3S',
    attackRatings: [8, null, null, null, null],
    effects: [
      'Extends 6m, with climbing nodules snapping out for rapid ascent.',
      'Extend or retract is a Minor Action.',
      'Usable for up to 6m of extra vertical movement.',
    ],
    wirelessBonuses: ['Bonus Minor Action on extend or retract.'],
  },
};

// ---- Other (Unarmed / Exotic) ----

const bike_chain = {
  id: 'bike_chain',
  label: 'Bike Chain',
  category: 'melee_weapon',
  cost: 15,
  availability: 1,
  legality: null,
  image: null,
  skill: 'close_combat',
  referenceOnly: true,
  description: 'Favored by go-gangs.',
  tags: ['unarmed'],
  stats: {
    damageValue: '2S',
    attackRatings: [5, null, null, null, null],
    effects: ['Grants a bonus Minor Action on a turn you use the Trip Minor Action with it.'],
  },
};

const bullwhip = {
  id: 'bullwhip',
  label: 'Bullwhip',
  category: 'melee_weapon',
  cost: 255,
  availability: 4,
  legality: null,
  image: null,
  skill: 'exotic_weapons',
  referenceOnly: true,
  description: 'A cattle-driving leather cord — brutal on bare flesh, mostly a tripping hazard against armor.',
  tags: ['exotic'],
  stats: {
    damageValue: '1P',
    attackRatings: [6, null, null, null, null],
    attributeOverride: 'reaction', // uses Reaction instead of Strength for Attack Rating
    effects: [
      'Grants a bonus Minor Action on a turn you use the Trip Minor Action with it.',
      'Requires an Exotic Weapons specialization.',
    ],
  },
};

const knucks = {
  id: 'knucks',
  label: 'Knucks',
  category: 'melee_weapon',
  cost: 100,
  availability: 1,
  legality: null,
  image: null,
  skill: 'close_combat',
  description: 'From a roll of quarters to Ares Hardliner Gloves — upgrades a fist from potentially deadly to reliably deadly.',
  tags: ['unarmed'],
  stats: { damageValue: '3P', attackRatings: [6, null, null, null, null] },
};

const shock_gloves = {
  id: 'shock_gloves',
  label: 'Shock Gloves',
  category: 'melee_weapon',
  cost: 790,
  availability: 4,
  legality: null,
  image: null,
  skill: 'close_combat',
  wireless: true,
  referenceOnly: true,
  description: 'Insulated gloves that discharge current on contact once activated.',
  tags: ['unarmed'],
  stats: {
    damageValue: '4S(e)',
    attackRatings: [5, null, null, null, null],
    effects: [
      'Inflicts Zapped.',
      '10 charges; 1 per 10 seconds to recharge.',
    ],
    wirelessBonuses: [
      'Bonus Minor Action when activating a charge.',
      'Inductive recharge at 1 charge per half hour of wireless-enabled time.',
    ],
  },
};

// NOT referenceOnly: the critical-glitch rule resolves against this
// item's own damageValue.
const monofilament_whip = {
  id: 'monofilament_whip',
  label: 'Monofilament Whip',
  category: 'melee_weapon',
  cost: 1300,
  availability: 6,
  legality: 'illegal',
  image: null,
  skill: 'exotic_weapons',
  wireless: true,
  description: 'A glowing, terrifying 2-meter monofilament line that cuts through armor, flesh, and bone like butter.',
  tags: ['exotic'],
  stats: {
    damageValue: '6P',
    attackRatings: [14, null, null, null, null],
    attributeOverride: 'reaction', // uses Reaction instead of Strength for Attack Rating
    effects: [
      "A critical glitch always forces the wielder to resist the weapon's own base damage.",
      'Requires an Exotic Weapons specialization.',
    ],
    wirelessBonuses: [
      'Visual targeting assist gives +2 Attack Rating.',
      'The safety system auto-retracts on a critical glitch instead of hitting you.',
    ],
  },
};

// ---- Thrown/Projectile (Athletics skill) ----
// D4: Bow and the three Crossbows gained `bow` / `crossbow` tags so
// their ammo's `compatibleWith` resolves against a tag, the same way
// the firearm implants in cyberware_bioware.js do.

// NOT referenceOnly: damageValueFormula and attackRatingsFormula drive
// the Rating-scaling this item's effects describe.
const bow = {
  id: 'bow',
  label: 'Bow',
  category: 'thrown_weapon',
  cost: null, // Rating-scaled — see costBase/costPerRating
  costBase: 100,
  costPerRating: 10,
  availability: null,
  availabilityFormula: 'Rating/3', // D5: was a trailing comment, now data
  legality: 'licensed',
  image: null,
  skill: 'athletics',
  description: 'Traditional or compound; hacker-proof if kept simple.',
  tags: ['thrown', 'bow'],
  stats: {
    ratingRange: [1, 14],
    damageValueFormula: '(Rating/2)P',
    attackRatingsFormula: '(Rating/2)/(Rating)/(Rating/4)/—/—',
    effects: [
      'Rating sets both the minimum Strength required and the damage.',
      'Arrows must meet or exceed the bow\u2019s Rating.',
    ],
  },
};

// NOT referenceOnly: compatibleWith drives the pairing this describes.
const arrow = {
  id: 'arrow',
  label: 'Arrow',
  category: 'ammo',
  cost: null,
  costPerRating: 2,
  availability: null,
  availabilityFormula: 'Rating/3', // D5: was a trailing comment, now data
  legality: null,
  image: null,
  tags: ['ammo'],
  stats: {
    ratingRange: [1, 14],
    compatibleWith: 'bow',
    effects: ["Must meet or exceed the firing bow's Rating."],
  },
};

// NOT referenceOnly: compatibleWith + deliversPayload drive the effects.
// FLAG: this had `costPerRating` with NO `ratingRange`, so the Rating
// its price scales on couldn't be chosen. Given [1,14] to match its
// sibling `arrow`; the "base Rating 8" note is source text, kept as an
// effect rather than folded into the range, since the source frames it
// as a starting point rather than a floor.
const injection_arrow = {
  id: 'injection_arrow',
  label: 'Injection Arrow',
  category: 'ammo',
  cost: null,
  costPerRating: 20,
  availability: 4,
  legality: null,
  image: null,
  wireless: true,
  tags: ['ammo'],
  stats: {
    ratingRange: [1, 14],
    compatibleWith: 'bow',
    deliversPayload: true,
    effects: [
      ...INJECTION_PAYLOAD_EFFECTS,
      'Base Rating 8 — higher Ratings need a heavier bow.',
    ],
    wirelessBonuses: INJECTION_PAYLOAD_WIRELESS,
  },
};

const crossbow_light = {
  id: 'crossbow_light',
  label: 'Crossbow, Light',
  category: 'thrown_weapon',
  cost: 150,
  availability: 3,
  legality: null,
  image: null,
  skill: 'athletics',
  referenceOnly: true,
  description: 'One-handed, modern autoloading design.',
  tags: ['thrown', 'crossbow'],
  stats: {
    damageValue: '2P',
    attackRatings: [6, 8, 2, null, null],
    effects: ['4-bolt internal magazine.'],
  },
};

const crossbow_standard = {
  id: 'crossbow_standard',
  label: 'Crossbow, Standard',
  category: 'thrown_weapon',
  cost: 290,
  availability: 3,
  legality: 'licensed',
  image: null,
  skill: 'athletics',
  referenceOnly: true,
  description: 'Two-handed autoloading crossbow.',
  tags: ['thrown', 'crossbow'],
  stats: {
    damageValue: '3P',
    attackRatings: [2, 10, 4, 2, null],
    effects: ['4-bolt internal magazine.'],
  },
};

const crossbow_heavy = {
  id: 'crossbow_heavy',
  label: 'Crossbow, Heavy',
  category: 'thrown_weapon',
  cost: 425,
  availability: 4,
  legality: 'licensed',
  image: null,
  skill: 'athletics',
  referenceOnly: true,
  description: 'Two-handed autoloading crossbow.',
  tags: ['thrown', 'crossbow'],
  stats: {
    damageValue: '4P',
    attackRatings: [2, 8, 6, 4, null],
    effects: ['4-bolt internal magazine.'],
  },
};

// NOT referenceOnly: compatibleWith drives the pairing.
const bolt = {
  id: 'bolt',
  label: 'Bolt',
  category: 'ammo',
  cost: 5,
  availability: 2,
  legality: null,
  image: null,
  tags: ['ammo'],
  stats: {
    compatibleWith: 'crossbow',
    effects: ['Standard crossbow ammunition.'],
  },
};

// NOT referenceOnly: compatibleWith + deliversPayload drive the effects.
const injection_bolt = {
  id: 'injection_bolt',
  label: 'Injection Bolt',
  category: 'ammo',
  cost: 50,
  availability: 4,
  legality: null,
  image: null,
  wireless: true,
  tags: ['ammo'],
  stats: {
    compatibleWith: 'crossbow',
    deliversPayload: true,
    effects: INJECTION_PAYLOAD_EFFECTS,
    wirelessBonuses: INJECTION_PAYLOAD_WIRELESS,
  },
};

const throwing_knives = {
  id: 'throwing_knives',
  label: 'Throwing Knives',
  category: 'thrown_weapon',
  cost: 155,
  availability: 2,
  legality: null,
  image: null,
  skill: 'athletics',
  wireless: true,
  referenceOnly: true,
  tags: ['thrown'],
  stats: {
    damageValue: '2P',
    attackRatings: [10, 9, 3, null, null],
    effects: [READIED_THROWN_EFFECT],
    wirelessBonuses: THROWN_TAG_WIRELESS,
  },
};

const throwing_stars = {
  id: 'throwing_stars',
  label: 'Throwing Stars',
  category: 'thrown_weapon',
  cost: 160,
  availability: 2,
  legality: null,
  image: null,
  skill: 'athletics',
  wireless: true,
  referenceOnly: true,
  tags: ['thrown'],
  stats: {
    damageValue: '2P',
    attackRatings: [9, 11, 5, null, null],
    effects: [READIED_THROWN_EFFECT],
    wirelessBonuses: THROWN_TAG_WIRELESS,
  },
};

export const GEAR_MELEE_THROWN = {
  combat_axe, combat_survival_knife, forearm_snap_blades, knife, katana, polearm, sword,
  club, extendable_baton, sap, staff, stun_baton, telescoping_staff,
  bike_chain, bullwhip, knucks, shock_gloves, monofilament_whip,
  bow, arrow, injection_arrow, crossbow_light, crossbow_standard, crossbow_heavy,
  bolt, injection_bolt, throwing_knives, throwing_stars,
  telescoping_ladder_staff,
};

export const GEAR_MELEE_THROWN_IDS = Object.keys(GEAR_MELEE_THROWN);
