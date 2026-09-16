// Cyberlimbs, Cyber Implant Weapons & Bioware catalog.
// Same envelope as GEAR.js.
//
// Verified against 13f-gear-cyberlimbs-implant-weapons-bioware.md (Gear
// Part 6, pp. 288-294) in full, front to back. Every cost/Essence/
// Availability/Capacity number in this file matched source exactly —
// no numeric corrections needed anywhere. This chapter also has NO
// "Wireless bonus:" text at all (confirmed by a full-text search), so
// unlike every other file in this pass, there's nothing to add there —
// cyberlimbs, implant weapons, and bioware are all non-networked by
// their nature in this rules chapter. No item here carries `wireless`
// or `wirelessBonuses`, and that's correct rather than an omission.
//
// New wrinkle this category needed: bioware/cyberware costs and Essence
// are overwhelmingly Rating-scaled by simple multiplication (Essence =
// Rating x factor, Cost = Rating x factor) — unlike the Bow's more
// unusual formula, these are consistent enough to standardize as
// `essencePerRating` / `costPerRating` + `ratingRange` on every scalable
// item, rather than one-off formula strings each time.
//
// Bone Density Augmentation is the one exception — its DV/Attack Rating
// per rating comes from an actual lookup table in the book, not a
// formula, so it gets a small `ratingTable` array instead. That same
// shape is now also used by the Mechanical Arms in additions.js.
//
// Cyberlimbs come in synthetic/obvious grades with different cost and
// Capacity but the same Essence/Availability — modeled as two full
// separate items (e.g. skull_synthetic, skull_obvious) rather than one
// item with two cost fields, since a player is choosing one grade, not
// buying both.
//
// CAPACITY FIELD SPLIT: per the project-wide convention, cyberlimbs are
// the housings (`cyberwareCapacityProvided`) and everything installed
// into them — accessories and implant weapons alike — are consumers
// (`cyberwareCapacityUsed[PerRating]`). This is the same pool
// `augmentations.js` uses for Cybereyes/Cyberears/their enhancement
// implants, confirming that file's tentative naming.
//
// FLAG — Essence-vs-Capacity ambiguity on Cyber Implant Weapons: the
// chapter intro says these are "installed into a cyberlimb (costs
// Capacity) or directly into flesh (costs Essence)," which reads as an
// either/or choice depending on install location. But the source table
// lists BOTH an Essence value AND a Capacity value for every single
// implant weapon (19 items — the 9 melee weapons, plus 7 firearm-implant
// slots and 3 accessories), and this file stores both unconditionally.
// DATA MARKED, LOGIC NOT YET BUILT: `stats.installChoice:
// 'fleshOrCyberlimb'` is now set once by the `implantWeapon()` factory
// rather than repeated as an identical inline comment on all 19 items,
// but nothing reads the flag yet — the purchase modal still charges
// both Essence and Capacity unconditionally. Needs a real
// install-location choice in the purchase flow, which is a behavior
// change to augmentationEconomy.js / gearPurchase.js / PurchaseModal,
// not a data fix.
//
// ============================================================================
// SCHEMA PASSES 1 AND 2 (both applied at once — this file hadn't had
// either yet):
//
// S1. `effects` ARRAYS. This file had NO effect field at all; every
//     mechanical fact lived in `description` prose, and this chapter is
//     almost entirely mechanical prose. So this is extraction, not a
//     rename. One distinct mechanic per entry, active mechanics first
//     and restrictions/incompatibilities last. No `wirelessBonuses`
//     anywhere — see the note above.
// S2. `description` IS NOW OMITTABLE — delete it and lose no gameplay
//     information. Numbers already in a structured field are NOT
//     restated: each limb's Capacity lives only in
//     `cyberwareCapacityProvided`, Bone Density's per-Rating DV and
//     Attack Rating only in `ratingTable`, and every Essence figure
//     only in `essenceCost` / `essencePerRating`.
// D1. `referenceOnly: true` — "no live computed field DRIVES any of
//     this item's effects." Backing fields for this file are
//     `damageValue`, `attackRatings`, root `skill`, `ratingTable`, and
//     `compatibleWith`; purchase-time configuration (`ratingRange`,
//     `costPerRating`, `essencePerRating`, capacity fields) does not
//     count. Bioware scores badly here on purpose: "+Rating Strength"
//     and its cousins have no attribute-modifier field anywhere in the
//     catalog to drive them.
// D2. `skill` MOVED TO THE ITEM ROOT on all 9 melee implant weapons.
//     They were the last holdouts carrying `stats.skill` after the two
//     shields and the grapple gun were fixed; X1 is now closed
//     catalog-wide.
// D3. `defaultAttachments` ON BOTH SKULLS. The source says a Skull
//     "includes a cyberjaw at no extra cost/Capacity" — and `cyberjaw`
//     is a real item in this same file. Since it's explicitly free of
//     both cost AND Capacity, it can't be the normal purchasable SKU;
//     it takes a `builtIn` integral SKU, `cyberjaw_integral`, following
//     the same pattern as the weapon integrals in
//     firearms_explosives.js.
// D5. `biochromatic_tattoos` WAS NEVER EXPORTED. It was defined in the
//     file but absent from the GEAR_CYBERWARE_BIOWARE export object, so
//     it existed as dead code and never appeared in the catalog at all.
//     Now exported, and switched to the `bioware()` factory it should
//     have used instead of a hand-built object literal.
// D4. TWO BROKEN `compatibleWith` REFERENCES FIXED. Five of the seven
//     firearm implants pointed at real weapon tags; two did not.
//     'hold_out_pistol' -> 'holdout' and 'grenade_launcher' ->
//     'launcher', matching the tags actually used in
//     firearms_explosives.js. Silent bug: anything resolving an
//     implant's compatible weapons found nothing for those two.
// ============================================================================

const PARTIAL_LIMB_EFFECTS = [
  'Provides no Strength or Agility attribute.',
  'Adds no Condition Monitor box.',
];

function limbPair(base, essence, availability, synthCost, synthCap, obviousCost, obviousCap) {
  const shared = base.effects ?? [];
  const mk = (grade, cost, capacity, gradeText, gradeEffects) => ({
    id: `${base.id}_${grade}`,
    label: `${base.label} (${grade === 'synthetic' ? 'Synthetic' : 'Obvious'})`,
    category: 'cyberware',
    cost,
    availability,
    legality: null,
    image: null,
    ...(shared.length || gradeEffects.length ? { referenceOnly: true } : {}),
    description: `${base.description} ${gradeText}`,
    tags: ['cyberlimb'],
    stats: {
      essenceCost: essence,
      cyberwareCapacityProvided: capacity,
      ...(shared.length || gradeEffects.length ? { effects: [...shared, ...gradeEffects] } : {}),
      ...(base.defaultAttachments ? { defaultAttachments: base.defaultAttachments } : {}),
    },
  });
  return {
    [`${base.id}_synthetic`]: mk('synthetic', synthCost, synthCap,
      'Synthetic grade — sacrifices some Capacity to pass as human.', base.syntheticEffects ?? []),
    [`${base.id}_obvious`]: mk('obvious', obviousCost, obviousCap,
      'Obvious grade — cold metal, visible pistons and myomer.', base.obviousEffects ?? []),
  };
}

const cyberlimbs = {
  // D3: the included cyberjaw is a real catalog item, seeded as the
  // free built-in SKU rather than the 1,500¥ / 1-Capacity purchasable one.
  ...limbPair(
    {
      id: 'skull',
      label: 'Skull',
      description: 'Replaces the bones and muscles of the head, face, and neck.',
      defaultAttachments: ['cyberjaw_integral'],
    },
    0.75, 5, 15000, 2, 10000, 4,
  ),
  ...limbPair(
    {
      id: 'torso',
      label: 'Torso',
      description: 'Replaces the core bones and muscles, neck to groin.',
      effects: ['Organs remain in place, individually protected.'],
      obviousEffects: ['Removes genital function. Excretion is unaffected.'],
    },
    1.5, 4, 25000, 5, 20000, 10,
  ),
  ...limbPair(
    {
      id: 'arm',
      label: 'Arm',
      description: 'Full shoulder-down replacement.',
    },
    1, 4, 20000, 8, 15000, 15,
  ),
  ...limbPair(
    {
      id: 'forearm',
      label: 'Forearm',
      description: 'Partial replacement — forearm and hand only.',
      effects: PARTIAL_LIMB_EFFECTS,
    },
    0.45, 3, 12000, 5, 10000, 10,
  ),
  ...limbPair(
    {
      id: 'hand',
      label: 'Hand',
      description: 'Partial replacement.',
      effects: PARTIAL_LIMB_EFFECTS,
    },
    0.25, 3, 6000, 2, 5000, 4,
  ),
  ...limbPair(
    {
      id: 'leg',
      label: 'Leg',
      description: 'Full hip-down replacement.',
    },
    1, 4, 20000, 10, 15000, 20,
  ),
  ...limbPair(
    {
      id: 'lower_leg',
      label: 'Lower Leg',
      description: 'Partial replacement — lower leg and foot only.',
      effects: PARTIAL_LIMB_EFFECTS,
    },
    0.45, 4, 12000, 6, 10000, 12,
  ),
  ...limbPair(
    {
      id: 'foot',
      label: 'Foot',
      description: 'Partial replacement.',
      effects: PARTIAL_LIMB_EFFECTS,
    },
    0.25, 4, 6000, 2, 5000, 4,
  ),
};

// ---- Cyberlimb Accessories ----

const cyberlimb_armor = {
  id: 'cyberlimb_armor',
  label: 'Cyberlimb Armor',
  category: 'cyberware_accessory',
  cost: null,
  costPerRating: 5000,
  // Availability is malformed in source: the table cell literally
  // reads "(L)" with no Rating number, unlike Attribute Increase right
  // below it which clearly shows "Rating". Left null rather than
  // guessing a formula. ratingRange [1,6] is also NOT stated in this
  // table (just "[Rating]") — it's inferred from the general Rating
  // convention used elsewhere, not confirmed against a "standalone
  // Armor cyberware" table, which doesn't appear anywhere in the
  // provided source files. Flagging both as unconfirmed.
  availability: null,
  legality: 'licensed',
  image: null,
  referenceOnly: true,
  tags: ['cyberlimb_accessory'],
  stats: {
    ratingRange: [1, 6],
    cyberwareCapacityUsedPerRating: 1,
    effects: ['Functions as the standalone Armor cyberware, installed into a limb instead.'],
  },
};

const cyberlimb_attribute_increase = {
  id: 'cyberlimb_attribute_increase',
  label: 'Cyberlimb Attribute Increase',
  category: 'cyberware_accessory',
  cost: null,
  costPerRating: 5000,
  availability: null,
  availabilityEqualsRating: true, // source: Availability = "Rating" plainly, no suffix
  legality: null,
  image: null,
  referenceOnly: true,
  tags: ['cyberlimb_accessory'],
  stats: {
    ratingRange: [1, 4],
    cyberwareCapacityUsedPerRating: 1,
    effects: [
      'Boosts Agility, Armor, or Strength on the limb, capped at the augmented maximum +4.',
      'Agility and Strength apply only when that limb is doing the work.',
      'Armor always applies to Defense Rating.',
    ],
  },
};

const gyromount = {
  id: 'gyromount',
  label: 'Gyromount',
  category: 'cyberware_accessory',
  cost: 6000,
  availability: 5,
  legality: 'illegal',
  image: null,
  referenceOnly: true,
  tags: ['cyberlimb_accessory'],
  stats: {
    cyberwareCapacityUsed: 8,
    effects: ['Functions as the Gyro Mount weapon accessory, installed in a limb.'],
  },
};

const cyberlimb_slide = {
  id: 'cyberlimb_slide',
  label: 'Slide',
  category: 'cyberware_accessory',
  cost: 3000,
  availability: 5,
  legality: 'licensed',
  image: null,
  referenceOnly: true,
  tags: ['cyberlimb_accessory'],
  stats: {
    cyberwareCapacityUsed: 3,
    effects: ['Functions as a Hidden Arm Slide.'],
  },
};

const cyberlimb_holster = {
  id: 'cyberlimb_holster',
  label: 'Holster',
  category: 'cyberware_accessory',
  cost: 2000,
  availability: 4,
  legality: null,
  image: null,
  referenceOnly: true,
  description: 'Sized to the limb it goes into.',
  tags: ['cyberlimb_accessory'],
  stats: {
    cyberwareCapacityUsed: 5,
    effects: ['Holds a weapon for convenience, not concealment.'],
  },
};

const hydraulic_jacks = {
  id: 'hydraulic_jacks',
  label: 'Hydraulic Jacks',
  category: 'cyberware_accessory',
  cost: null,
  costPerRating: 2500,
  availability: 4,
  legality: null,
  image: null,
  referenceOnly: true,
  // ratingRange [1,6] is inferred (source table just shows "[Rating]"
  // with no explicit max) — flagging as unconfirmed, same as Armor above.
  tags: ['cyberlimb_accessory'],
  stats: {
    ratingRange: [1, 6],
    cyberwareCapacityUsedPerRating: 1,
    effects: [
      'Subtracts its Rating from jump-test thresholds, to a minimum threshold of 1.',
      'Requires one in each leg, at matching Ratings.',
    ],
  },
};

const cyberlimb_smuggling_compartment = {
  id: 'cyberlimb_smuggling_compartment',
  label: 'Smuggling Compartment',
  category: 'cyberware_accessory',
  cost: 6000,
  availability: 2,
  legality: null,
  image: null,
  referenceOnly: true,
  tags: ['cyberlimb_accessory'],
  stats: {
    cyberwareCapacityUsed: 5,
    effects: ['Functions as the standalone Smuggling Compartment.'],
  },
};

// ---- Cyber Implant Weapons ----
// Installed into a cyberlimb (costs Capacity) or directly into flesh
// (costs Essence) — `installChoice` is set once here by the factory
// rather than repeated as an identical comment on all 19 items. See the
// file-header FLAG note: nothing branches on it yet, so the purchase
// flow still charges both.
//
// Retractable variants share the base version's combat stats — the
// difference is Capacity, cost, and Concealability, not the weapon.

function implantWeapon(overrides) {
  const { stats = {}, ...rest } = overrides;
  return {
    category: 'cyberware',
    legality: null,
    image: null,
    ...rest,
    stats: {
      installChoice: 'fleshOrCyberlimb',
      ...stats,
    },
  };
}

// D3: the free built-in cyberjaw a Skull ships with. Not purchasable
// and not removable, and it costs neither Essence nor Capacity — which
// is exactly why it can't just reference the 1,500¥ SKU below.
const cyberjaw_integral = {
  id: 'cyberjaw_integral',
  label: 'Cyberjaw (Integral)',
  category: 'cyberware',
  legality: null,
  image: null,
  mount: null,
  builtIn: true,
  cost: null,
  availability: null,
  skill: 'close_combat',
  description: 'The cyberjaw that comes built into a cyberskull.',
  tags: ['implant_weapon'],
  stats: {
    damageValue: '5P',
    attackRatings: [2, null, null, null, null],
    effects: ['Included with a cyberskull at no Essence or Capacity cost.'],
  },
};

const cyberjaw = implantWeapon({
  id: 'cyberjaw',
  label: 'Cyberjaw',
  cost: 1500,
  availability: 2,
  skill: 'close_combat',
  description: 'Extra biting power.',
  tags: ['implant_weapon'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 1,
    damageValue: '5P',
    attackRatings: [2, null, null, null, null],
  },
});

const hardening = implantWeapon({
  id: 'hardening',
  label: 'Hardening',
  cost: 2500,
  availability: 2,
  skill: 'close_combat',
  referenceOnly: true,
  description: 'Hardens skin or limb into a club-like striking surface.',
  tags: ['implant_weapon'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 1,
    damageValue: '3P',
    attackRatings: [6, null, null, null, null],
    effects: ['Damage Value becomes 4P instead of 3P at Strength 7+.'],
  },
});

const shock_limb = implantWeapon({
  id: 'shock_limb',
  label: 'Shock Limb',
  cost: 5000,
  availability: 3,
  skill: 'close_combat',
  description: 'A taser-like electrode jolt — hands are most common, but shock kicks and head-butts exist.',
  tags: ['implant_weapon'],
  stats: {
    essenceCost: 0.25,
    cyberwareCapacityUsed: 1,
    damageValue: '4S(e)',
    attackRatings: [5, null, null, null, null],
  },
});

const handblade = implantWeapon({
  id: 'handblade',
  label: 'Handblade',
  cost: 2000,
  availability: 4,
  legality: 'illegal',
  skill: 'close_combat',
  description: 'A hand-mounted blade opposite the thumb.',
  tags: ['implant_weapon'],
  stats: {
    essenceCost: 0.15,
    cyberwareCapacityUsed: 1,
    damageValue: '3P',
    attackRatings: [6, null, null, null, null],
  },
});

const retractable_handblade = implantWeapon({
  id: 'retractable_handblade',
  label: 'Retractable Handblade',
  cost: 2500,
  availability: 4,
  legality: 'illegal',
  skill: 'close_combat',
  referenceOnly: true,
  description: 'As the Handblade, but it retracts.',
  tags: ['implant_weapon'],
  stats: {
    essenceCost: 0.25,
    cyberwareCapacityUsed: 2,
    damageValue: '3P',
    attackRatings: [6, null, null, null, null],
    effects: ['Concealability threshold 8.'],
  },
});

const hand_razors = implantWeapon({
  id: 'hand_razors',
  label: 'Hand Razors',
  cost: 1000,
  availability: 3,
  legality: 'illegal',
  skill: 'close_combat',
  description: 'Under-nail or nail-replacing claws.',
  tags: ['implant_weapon'],
  stats: {
    essenceCost: 0.15,
    cyberwareCapacityUsed: 1,
    damageValue: '2P',
    attackRatings: [6, null, null, null, null],
  },
});

const retractable_hand_razors = implantWeapon({
  id: 'retractable_hand_razors',
  label: 'Retractable Hand Razors',
  cost: 1250,
  availability: 3,
  legality: 'illegal',
  skill: 'close_combat',
  referenceOnly: true,
  description: 'As Hand Razors, but they retract.',
  tags: ['implant_weapon'],
  stats: {
    essenceCost: 0.25,
    cyberwareCapacityUsed: 2,
    damageValue: '2P',
    attackRatings: [6, null, null, null, null],
    effects: ['Concealability threshold 8.'],
  },
});

const spurs = implantWeapon({
  id: 'spurs',
  label: 'Spurs',
  cost: 3000,
  availability: 4,
  legality: 'illegal',
  skill: 'close_combat',
  description: 'Wrist and knuckle spikes, for stabbing punches and slaps.',
  tags: ['implant_weapon'],
  stats: {
    essenceCost: 0.15,
    cyberwareCapacityUsed: 1,
    damageValue: '3P',
    attackRatings: [7, null, null, null, null],
  },
});

const retractable_spurs = implantWeapon({
  id: 'retractable_spurs',
  label: 'Retractable Spurs',
  cost: 5000,
  availability: 4,
  legality: 'illegal',
  skill: 'close_combat',
  referenceOnly: true,
  description: 'As Spurs, but they retract.',
  tags: ['implant_weapon'],
  stats: {
    essenceCost: 0.25,
    cyberwareCapacityUsed: 3,
    damageValue: '3P',
    attackRatings: [7, null, null, null, null],
    effects: ['Concealability threshold 8.'],
  },
});

// Firearm-class implants just make space — the weapon itself is bought
// separately. No damageValue here on purpose; `compatibleWith` names
// the weapon TAG the slot accepts, matching the tags actually used in
// firearms_explosives.js.
//
// D4 (this pass): two of these pointed at tags that don't exist —
// 'hold_out_pistol' (real tag: 'holdout') and 'grenade_launcher' (real
// tag: 'launcher'). Both corrected. The other five already matched.

const PISTOL_IMPLANT_CONCEALABILITY = 'Implanted pistols gain +2 Concealability.';

const hold_out_implant = implantWeapon({
  id: 'hold_out_implant',
  label: 'Hold-Out Pistol Implant',
  cost: 2000,
  availability: 3,
  legality: 'licensed',
  tags: ['firearm_implant'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 2,
    compatibleWith: 'holdout',
    effects: [
      'Provides space for a hold-out pistol, bought separately.',
      PISTOL_IMPLANT_CONCEALABILITY,
    ],
  },
});

const light_pistol_implant = implantWeapon({
  id: 'light_pistol_implant',
  label: 'Light Pistol Implant',
  cost: 3000,
  availability: 3,
  legality: 'licensed',
  tags: ['firearm_implant'],
  stats: {
    essenceCost: 0.25,
    cyberwareCapacityUsed: 4,
    compatibleWith: 'light_pistol',
    effects: [
      'Provides space for a light pistol, bought separately.',
      PISTOL_IMPLANT_CONCEALABILITY,
    ],
  },
});

const machine_pistol_implant = implantWeapon({
  id: 'machine_pistol_implant',
  label: 'Machine Pistol Implant',
  cost: 3500,
  availability: 4,
  legality: 'licensed',
  tags: ['firearm_implant'],
  stats: {
    essenceCost: 0.5,
    cyberwareCapacityUsed: 6,
    compatibleWith: 'machine_pistol',
    effects: [
      'Provides space for a machine pistol, bought separately.',
      PISTOL_IMPLANT_CONCEALABILITY,
    ],
  },
});

const heavy_pistol_implant = implantWeapon({
  id: 'heavy_pistol_implant',
  label: 'Heavy Pistol Implant',
  cost: 4300,
  availability: 4,
  legality: 'licensed',
  tags: ['firearm_implant'],
  stats: {
    essenceCost: 0.5,
    cyberwareCapacityUsed: 6,
    compatibleWith: 'heavy_pistol',
    effects: [
      'Provides space for a heavy pistol, bought separately.',
      PISTOL_IMPLANT_CONCEALABILITY,
    ],
  },
});

const smg_implant = implantWeapon({
  id: 'smg_implant',
  label: 'SMG Implant',
  cost: 4800,
  availability: 5,
  legality: 'licensed',
  tags: ['firearm_implant'],
  stats: {
    essenceCost: 1,
    cyberwareCapacityUsed: 8,
    compatibleWith: 'smg',
    effects: [
      'Provides space for an SMG, bought separately.',
      'No Concealability change — a gun this size stays noticeable.',
    ],
  },
});

const shotgun_implant = implantWeapon({
  id: 'shotgun_implant',
  label: 'Shotgun Implant',
  cost: 8500,
  availability: 5,
  legality: 'licensed',
  tags: ['firearm_implant'],
  stats: {
    essenceCost: 1.25,
    cyberwareCapacityUsed: 10,
    compatibleWith: 'shotgun',
    effects: ['Provides space for a shotgun, bought separately.'],
  },
});

const grenade_launcher_implant = implantWeapon({
  id: 'grenade_launcher_implant',
  label: 'Grenade Launcher Implant',
  cost: 24000,
  availability: 6,
  legality: 'illegal',
  tags: ['firearm_implant'],
  stats: {
    essenceCost: 1.5,
    cyberwareCapacityUsed: 15,
    compatibleWith: 'launcher',
    effects: ['Provides space for a grenade launcher, bought separately.'],
  },
});

const external_clip_port = implantWeapon({
  id: 'external_clip_port',
  label: 'External Clip Port',
  cost: 1000,
  availability: 1,
  referenceOnly: true,
  tags: ['firearm_implant'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 1,
    effects: ['Accessory support for an implanted firearm.'],
  },
});

const implant_laser_sight = implantWeapon({
  id: 'implant_laser_sight',
  label: 'Laser Sight (Implant)',
  cost: 1000,
  availability: 1,
  referenceOnly: true,
  tags: ['firearm_implant'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 1,
    effects: ['Accessory support for an implanted firearm.'],
  },
});

const implant_silencer = implantWeapon({
  id: 'implant_silencer',
  label: 'Silencer/Suppressor (Implant)',
  cost: 1000,
  availability: 4,
  legality: 'illegal',
  referenceOnly: true,
  tags: ['firearm_implant'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 2,
    effects: ['Accessory support for an implanted firearm.'],
  },
});

// ---- Bioware ----
// Almost everything here is referenceOnly: "+Rating Strength" and its
// cousins have no attribute-modifier field anywhere in the catalog to
// drive them. Bone Density Augmentation is the one exception — its
// `ratingTable` genuinely drives its unarmed damage.

function bioware(overrides) {
  return { category: 'bioware', legality: null, image: null, ...overrides };
}

const biochromatic_tattoos = bioware({
  id: 'biochromatic_tattoos', label: 'Biochromatic Tattoos',
  cost: 4000, availability: 7,
  referenceOnly: true,
  description: 'Pre-nanotech mood-reactive tattoos feeding directly into the nervous system, glowing in shifting colors tied to emotional intensity.',
  tags: ['bioware'],
  stats: {
    essenceCost: 0.03,
    effects: [
      'Only installable at a facility-level location.',
      'Removal typically costs additional Essence equal to the installation cost.',
    ],
  },
});

const adrenaline_pump = bioware({
  id: 'adrenaline_pump',
  label: 'Adrenaline Pump',
  cost: null,
  costPerRating: 55000,
  availability: 5,
  legality: 'illegal',
  referenceOnly: true,
  description: 'An abdominal gland reservoir.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 3],
    essencePerRating: 0.75,
    effects: [
      'Triggers on a failed Composure test, or voluntarily.',
      'While active: ignore injury modifiers, immune to Stun unconsciousness, and +Rating to Strength, Agility, Reaction, and Willpower.',
      'Lasts Rating x 1D6 rounds.',
      'The crash afterward deals Stun damage equal to half the active rounds.',
    ],
  },
});

// NOT referenceOnly: ratingTable drives the unarmed damage this effect
// names, the same way Mechanical Arm bands drive melee DV.
const bone_density_augmentation = bioware({
  id: 'bone_density_augmentation',
  label: 'Bone Density Augmentation',
  cost: null,
  costPerRating: 5000,
  availability: 4,
  legality: 'licensed',
  description: 'Denser, stronger bones.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.3,
    ratingTable: [
      { rating: 1, damageValue: '3P', attackRatingBonus: 1 },
      { rating: 2, damageValue: '3P', attackRatingBonus: 2 },
      { rating: 3, damageValue: '4P', attackRatingBonus: 2 },
      { rating: 4, damageValue: '4P', attackRatingBonus: 3 },
    ],
    effects: [
      'Unarmed damage becomes Physical.',
      '+Rating Body against physical damage.',
      'Incompatible with bone lacing.',
    ],
  },
});

const cats_eyes = bioware({
  id: 'cats_eyes',
  label: "Cat's Eyes",
  cost: 4000,
  availability: 3,
  referenceOnly: true,
  description: 'Transgenic feline eyes, slit-pupilled and reflective.',
  tags: ['bioware_basic'],
  stats: {
    essenceCost: 0.1,
    effects: [
      'Grants low-light vision.',
      'Incompatible with cybereye replacement.',
    ],
  },
});

const enhanced_articulation = bioware({
  id: 'enhanced_articulation',
  label: 'Enhanced Articulation',
  cost: 30000,
  availability: 4,
  referenceOnly: true,
  tags: ['bioware_basic'],
  stats: {
    essenceCost: 0.2,
    effects: [
      '+1 Agility.',
      'Bonus Edge moving through cramped or confined spaces.',
    ],
  },
});

const muscle_augmentation = bioware({
  id: 'muscle_augmentation',
  label: 'Muscle Augmentation',
  cost: null,
  costPerRating: 31000,
  availability: 4,
  legality: 'licensed',
  referenceOnly: true,
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.2,
    effects: [
      '+Rating Strength.',
      'Incompatible with muscle replacement cyberware.',
    ],
  },
});

const muscle_toner = bioware({
  id: 'muscle_toner',
  label: 'Muscle Toner',
  cost: null,
  costPerRating: 32000,
  availability: 4,
  legality: 'licensed',
  referenceOnly: true,
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.2,
    effects: [
      '+Rating Agility.',
      'Incompatible with muscle replacement and enhanced articulation.',
    ],
  },
});

const orthoskin = bioware({
  id: 'orthoskin',
  label: 'Orthoskin',
  cost: null,
  costPerRating: 6000,
  availability: 4,
  legality: 'licensed',
  referenceOnly: true,
  description: 'Near-invisible biofiber webbing worked through the skin.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.25,
    effects: [
      '+Rating Defense Rating.',
      'Incompatible with dermal plating.',
    ],
  },
});

const platelet_factories = bioware({
  id: 'platelet_factories',
  label: 'Platelet Factories',
  cost: 17000,
  availability: 4,
  referenceOnly: true,
  description: 'Accelerated clotting.',
  tags: ['bioware_basic'],
  stats: {
    essenceCost: 0.2,
    effects: ['Reduce any single instance of 2+ boxes of Physical damage by 1 box.'],
  },
});

const skin_pocket = bioware({
  id: 'skin_pocket',
  label: 'Skin Pocket',
  cost: 12000,
  availability: 4,
  referenceOnly: true,
  description: 'A nerveless flesh flap, placeable anywhere on the body.',
  tags: ['bioware_basic'],
  stats: {
    essenceCost: 0.1,
    effects: [
      'The bioware equivalent of a smuggling compartment.',
      'Concealability threshold 10.',
    ],
  },
});

const suprathyroid_gland = bioware({
  id: 'suprathyroid_gland',
  label: 'Suprathyroid Gland',
  cost: 140000,
  availability: 5,
  legality: 'licensed',
  referenceOnly: true,
  description: 'Supersedes thyroid function for a permanent metabolic boost.',
  tags: ['bioware_basic'],
  stats: {
    essenceCost: 0.7,
    effects: [
      '+1 Agility, Body, Reaction, and Strength.',
      'Requires double food intake and a 25% Lifestyle cost increase.',
    ],
  },
});

const symbiotes = bioware({
  id: 'symbiotes',
  label: 'Symbiotes',
  cost: null,
  costPerRating: 3500,
  availability: 4,
  referenceOnly: true,
  description: 'Bloodstream micro-organisms.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.2,
    effects: [
      '+Rating dice pool on healing tests.',
      'Requires Rating x 200¥ per month in special food; unfed for a month, they die.',
    ],
  },
});

const synthacardium = bioware({
  id: 'synthacardium',
  label: 'Synthacardium',
  cost: null,
  costPerRating: 30000,
  availability: 3,
  referenceOnly: true,
  description: 'Enhanced heart efficiency.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 3],
    essencePerRating: 0.1,
    effects: ['+Rating dice pool on Athletics tests for running, swimming, and climbing.'],
  },
});

const tailored_pheromones = bioware({
  id: 'tailored_pheromones',
  label: 'Tailored Pheromones',
  cost: null,
  costPerRating: 31000,
  availability: 4,
  legality: 'licensed',
  referenceOnly: true,
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.2,
    effects: [
      '+Rating Charisma for Con and Influence tests.',
      'Only works within smelling range of the target.',
      'No effect on magic.',
    ],
  },
});

const toxin_extractor = bioware({
  id: 'toxin_extractor',
  label: 'Toxin Extractor',
  cost: null,
  costPerRating: 4800,
  availability: 4,
  referenceOnly: true,
  description: 'Enhanced liver filtering.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 6],
    essencePerRating: 0.2,
    effects: ['-Rating to Toxin Resistance test thresholds.'],
  },
});

const tracheal_filter = bioware({
  id: 'tracheal_filter',
  label: 'Tracheal Filter',
  cost: null,
  costPerRating: 4500,
  availability: 4,
  referenceOnly: true,
  description: 'Traps airborne impurities before they reach the lungs.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 6],
    essencePerRating: 0.1,
    effects: ['+Rating dice pool on Toxin Resistance tests against Inhalation-vector toxins.'],
  },
});

// ---- Cultured Bioware ----
// Grown specifically to match the recipient's own body and genetic
// profile — pricier still.

const cerebral_booster = bioware({
  id: 'cerebral_booster',
  label: 'Cerebral Booster',
  cost: null,
  costPerRating: 31500,
  availability: 5,
  referenceOnly: true,
  description: 'An augmented cerebrum.',
  tags: ['bioware_cultured'],
  stats: {
    ratingRange: [1, 3],
    essencePerRating: 0.2,
    cultured: true,
    effects: ['+Rating Logic.'],
  },
});

const damage_compensator = bioware({
  id: 'damage_compensator',
  label: 'Damage Compensator',
  cost: null,
  costPerRating: 2000,
  availability: 5,
  legality: 'licensed',
  referenceOnly: true,
  description: 'Nerve-pathway pain cutoffs.',
  tags: ['bioware_cultured'],
  stats: {
    ratingRange: [1, 12],
    essencePerRating: 0.1,
    cultured: true,
    effects: ['Ignore Rating damage boxes when determining injury modifiers.'],
  },
});

const mnemonic_enhancer = bioware({
  id: 'mnemonic_enhancer',
  label: 'Mnemonic Enhancer',
  cost: null,
  costPerRating: 9000,
  availability: 5,
  referenceOnly: true,
  tags: ['bioware_cultured'],
  stats: {
    ratingRange: [1, 3],
    essencePerRating: 0.1,
    cultured: true,
    effects: ['+Rating dice pool on Knowledge, Language, and memory-related tests.'],
  },
});

const pain_editor = bioware({
  id: 'pain_editor',
  label: 'Pain Editor',
  cost: 48000,
  availability: 5,
  legality: 'illegal',
  referenceOnly: true,
  tags: ['bioware_cultured'],
  stats: {
    essenceCost: 0.3,
    cultured: true,
    effects: [
      'While active: ignore all injury modifiers.',
      'Stay conscious even with a full Stun Monitor.',
      '+1 Willpower, -1 Intuition.',
      '+1 threshold on tactile Perception tests.',
    ],
  },
});

const reflex_recorder = bioware({
  id: 'reflex_recorder',
  label: 'Reflex Recorder (Skill)',
  cost: 14000,
  availability: 5,
  referenceOnly: true,
  tags: ['bioware_cultured'],
  stats: {
    essenceCost: 0.1,
    cultured: true,
    effects: [
      '+1 to a chosen Physical-attribute-linked skill.',
      'Multiple recorders are allowed for multiple skills, but never two for the same skill.',
    ],
  },
});

const sleep_regulator = bioware({
  id: 'sleep_regulator',
  label: 'Sleep Regulator',
  cost: 12000,
  availability: 5,
  referenceOnly: true,
  tags: ['bioware_cultured'],
  stats: {
    essenceCost: 0.1,
    cultured: true,
    effects: [
      'Only 3 hours of sleep needed nightly.',
      'Stay awake twice as long before becoming Fatigued.',
    ],
  },
});

const synaptic_booster = bioware({
  id: 'synaptic_booster',
  label: 'Synaptic Booster',
  cost: null,
  costPerRating: 95000,
  availability: 5,
  legality: 'licensed',
  referenceOnly: true,
  description: 'Always on.',
  tags: ['bioware_cultured'],
  stats: {
    ratingRange: [1, 3],
    essencePerRating: 0.5,
    cultured: true,
    effects: [
      '+1 Reaction, and +1 Initiative Score, per Rating.',
      '+1 Initiative Die per Rating.',
      'Incompatible with other Reaction and Initiative enhancements.',
    ],
  },
});

export const GEAR_CYBERWARE_BIOWARE = {
  ...cyberlimbs,
  cyberlimb_armor, cyberlimb_attribute_increase, gyromount, cyberlimb_slide, cyberlimb_holster, hydraulic_jacks, cyberlimb_smuggling_compartment,
  cyberjaw, cyberjaw_integral, hardening, shock_limb, handblade, retractable_handblade, hand_razors, retractable_hand_razors, spurs, retractable_spurs,
  hold_out_implant, light_pistol_implant, machine_pistol_implant, heavy_pistol_implant, smg_implant, shotgun_implant, grenade_launcher_implant,
  external_clip_port, implant_laser_sight, implant_silencer,
  biochromatic_tattoos,
  adrenaline_pump, bone_density_augmentation, cats_eyes, enhanced_articulation, muscle_augmentation, muscle_toner, orthoskin,
  platelet_factories, skin_pocket, suprathyroid_gland, symbiotes, synthacardium, tailored_pheromones, toxin_extractor, tracheal_filter,
  cerebral_booster, damage_compensator, mnemonic_enhancer, pain_editor, reflex_recorder, sleep_regulator, synaptic_booster,
};

export const GEAR_CYBERWARE_BIOWARE_IDS = Object.keys(GEAR_CYBERWARE_BIOWARE);
