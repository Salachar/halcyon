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
// their nature in this rules chapter.
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
// formula, so it gets a small `ratingTable` array instead.
//
// Cyberlimbs come in synthetic/obvious grades with different cost and
// Capacity but the same Essence/Availability — modeled as two full
// separate items (e.g. skull_synthetic, skull_obvious) rather than one
// item with two cost fields, since a player is choosing one grade, not
// buying both.
//
// CAPACITY FIELD SPLIT (this pass): per the project-wide convention,
// cyberlimbs are the housings (`cyberwareCapacityProvided`) and
// everything installed into them — accessories and implant weapons
// alike — are consumers (`cyberwareCapacityUsed[PerRating]`). This is
// the same pool `augmentations.js` uses for Cybereyes/Cyberears/their
// enhancement implants, confirming that file's tentative naming.
//
// FLAG — Essence-vs-Capacity ambiguity on Cyber Implant Weapons: the
// chapter intro says these are "installed into a cyberlimb (costs
// Capacity) or directly into flesh (costs Essence)," which reads as an
// either/or choice depending on install location. But the source table
// lists BOTH an Essence value AND a Capacity value for every single
// implant weapon (19 items total — the 9 melee weapons, plus 7
// firearm-implant slots and 3 accessories, all sharing the same
// duality), and this file stores both unconditionally on every item.
// DATA MARKED, LOGIC NOT YET BUILT: every affected item now carries
// `stats.installChoice: 'fleshOrCyberlimb'` so purchase-flow code can
// find them, but nothing reads that flag yet — the purchase modal still
// charges both Essence and Capacity unconditionally. Needs a real
// install-location choice added to the purchase flow (flesh vs.
// cyberlimb), which only charges the corresponding cost. Not a data fix
// at that point, a behavior change to augmentationEconomy.js/
// gearPurchase.js/PurchaseModal.

function limbPair(base, essence, availability, synthCost, synthCap, obviousCost, obviousCap) {
  return {
    [`${base.id}_synthetic`]: {
      id: `${base.id}_synthetic`,
      label: `${base.label} (Synthetic)`,
      category: 'cyberware',
      cost: synthCost,
      availability,
      legality: null,
      image: null,
      description: `${base.description} Synthetic grade — sacrifices some Capacity to pass as human.`,
      tags: ['cyberlimb'],
      stats: {
        essenceCost: essence,
        cyberwareCapacityProvided: synthCap,
      },
    },
    [`${base.id}_obvious`]: {
      id: `${base.id}_obvious`,
      label: `${base.label} (Obvious)`,
      category: 'cyberware',
      cost: obviousCost,
      availability,
      legality: null,
      image: null,
      description: `${base.description} Obvious grade — cold metal, visible pistons/myomer.`,
      tags: ['cyberlimb'],
      stats: {
        essenceCost: essence,
        cyberwareCapacityProvided: obviousCap,
      },
    },
  };
}

const cyberlimbs = {
  ...limbPair(
    {
      id: 'skull',
      label: 'Skull',
      description: 'Replaces head/face/neck bones and muscles; includes a cyberjaw at no extra cost/Capacity.',
    },
    0.75, 5, 15000, 2, 10000, 4,
  ),
  ...limbPair(
    {
      id: 'torso',
      label: 'Torso',
      description: 'Replaces core bones/muscles, neck to groin. Obvious versions remove genital function (excretion unaffected); organs stay but individually protected.',
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
      description: 'Partial replacement, forearm/hand only — no Strength/Agility attributes, no Condition Monitor box.',
    },
    0.45, 3, 12000, 5, 10000, 10,
  ),
  ...limbPair(
    {
      id: 'hand',
      label: 'Hand',
      description: 'Partial replacement — no Strength/Agility attributes, no Condition Monitor box.',
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
      description: 'Partial replacement, lower leg/foot only — no Strength/Agility attributes, no Condition Monitor box.',
    },
    0.45, 4, 12000, 6, 10000, 12,
  ),
  ...limbPair(
    {
      id: 'foot',
      label: 'Foot',
      description: 'Partial replacement — no Strength/Agility attributes, no Condition Monitor box.',
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
  description: 'Same as the standalone Armor cyberware, installed into a limb instead.',
  tags: ['cyberlimb_accessory'],
  stats: {
    ratingRange: [1, 6],
    cyberwareCapacityUsedPerRating: 1,
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
  description: 'Boosts Agility, Armor, or Strength on the limb (capped at augmented max +4). Agility/Strength only apply when that limb is doing the work; Armor always applies to Defense Rating.',
  tags: ['cyberlimb_accessory'],
  stats: {
    ratingRange: [1, 4],
    cyberwareCapacityUsedPerRating: 1,
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
  description: 'Functions as the gyro mount weapon accessory, installed in a limb.',
  tags: ['cyberlimb_accessory'],
  stats: {
    cyberwareCapacityUsed: 8,
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
  description: 'Functions as a hidden arm slide.',
  tags: ['cyberlimb_accessory'],
  stats: {
    cyberwareCapacityUsed: 3,
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
  description: 'Holds a weapon for convenience, not concealment, sized to the limb.',
  tags: ['cyberlimb_accessory'],
  stats: {
    cyberwareCapacityUsed: 5,
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
  // ratingRange [1,6] is inferred (source table just shows "[Rating]"
  // with no explicit max) — flagging as unconfirmed, same as Armor above.
  description: 'Needs one in each leg, matching ratings. Subtracts the rating from jump-test thresholds, minimum threshold 1.',
  tags: ['cyberlimb_accessory'],
  stats: {
    ratingRange: [1, 6],
    cyberwareCapacityUsedPerRating: 1,
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
  description: 'Functions as the standalone smuggling compartment.',
  tags: ['cyberlimb_accessory'],
  stats: {
    cyberwareCapacityUsed: 5,
  },
};

// ---- Cyber Implant Weapons ----
// Installed into a cyberlimb (costs Capacity) or directly into flesh
// (costs Essence). Retractable variants share the base version's
// combat stats — the difference is Capacity/cost/Concealability, not
// the weapon itself.

function implantWeapon(overrides) {
  return { category: 'cyberware', legality: null, image: null, ...overrides };
}

const cyberjaw = implantWeapon({
  id: 'cyberjaw',
  label: 'Cyberjaw',
  cost: 1500,
  availability: 2,
  description: 'Extra biting power.',
  tags: ['implant_weapon'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.1,
    cyberwareCapacityUsed: 1,
    damageValue: '5P',
    attackRatings: [2, null, null, null, null],
    skill: 'close_combat',
  },
});

const hardening = implantWeapon({
  id: 'hardening',
  label: 'Hardening',
  cost: 2500,
  availability: 2,
  description: 'Hardens skin/limb into a club-like striking surface. DV becomes 4P instead of 3P if Strength 7+.',
  tags: ['implant_weapon'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.1,
    cyberwareCapacityUsed: 1,
    damageValue: '3P',
    attackRatings: [6, null, null, null, null],
    skill: 'close_combat',
  },
});

const shock_limb = implantWeapon({
  id: 'shock_limb',
  label: 'Shock Limb',
  cost: 5000,
  availability: 3,
  description: 'Taser-like electrode jolt — hands most common, but shock kicks and head-butts exist.',
  tags: ['implant_weapon'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.25,
    cyberwareCapacityUsed: 1,
    damageValue: '4S(e)',
    attackRatings: [5, null, null, null, null],
    skill: 'close_combat',
  },
});

const handblade = implantWeapon({
  id: 'handblade',
  label: 'Handblade',
  cost: 2000,
  availability: 4,
  legality: 'illegal',
  description: 'A hand-mounted blade opposite the thumb.',
  tags: ['implant_weapon'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.15,
    cyberwareCapacityUsed: 1,
    damageValue: '3P',
    attackRatings: [6, null, null, null, null],
    skill: 'close_combat',
  },
});

const retractable_handblade = implantWeapon({
  id: 'retractable_handblade',
  label: 'Retractable Handblade',
  cost: 2500,
  availability: 4,
  legality: 'illegal',
  description: 'Same as the Handblade, retractable. Concealability threshold 8.',
  tags: ['implant_weapon'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.25,
    cyberwareCapacityUsed: 2,
    damageValue: '3P',
    attackRatings: [6, null, null, null, null],
    skill: 'close_combat',
  },
});

const hand_razors = implantWeapon({
  id: 'hand_razors',
  label: 'Hand Razors',
  cost: 1000,
  availability: 3,
  legality: 'illegal',
  description: 'Under-nail or nail-replacing claws.',
  tags: ['implant_weapon'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.15,
    cyberwareCapacityUsed: 1,
    damageValue: '2P',
    attackRatings: [6, null, null, null, null],
    skill: 'close_combat',
  },
});

const retractable_hand_razors = implantWeapon({
  id: 'retractable_hand_razors',
  label: 'Retractable Hand Razors',
  cost: 1250,
  availability: 3,
  legality: 'illegal',
  description: 'Same as Hand Razors, retractable. Concealability threshold 8.',
  tags: ['implant_weapon'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.25,
    cyberwareCapacityUsed: 2,
    damageValue: '2P',
    attackRatings: [6, null, null, null, null],
    skill: 'close_combat',
  },
});

const spurs = implantWeapon({
  id: 'spurs',
  label: 'Spurs',
  cost: 3000,
  availability: 4,
  legality: 'illegal',
  description: 'Wrist/knuckle spikes for stabbing punches/slaps.',
  tags: ['implant_weapon'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.15,
    cyberwareCapacityUsed: 1,
    damageValue: '3P',
    attackRatings: [7, null, null, null, null],
    skill: 'close_combat',
  },
});

const retractable_spurs = implantWeapon({
  id: 'retractable_spurs',
  label: 'Retractable Spurs',
  cost: 5000,
  availability: 4,
  legality: 'illegal',
  description: 'Same as Spurs, retractable. Concealability threshold 8.',
  tags: ['implant_weapon'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.25,
    cyberwareCapacityUsed: 3,
    damageValue: '3P',
    attackRatings: [7, null, null, null, null],
    skill: 'close_combat',
  },
});

// Firearm-class implants just make space — the weapon itself is bought
// separately (a Firearms-chapter item, not yet built). No damageValue
// here on purpose; `compatibleWith` marks what class of gun it fits,
// same pattern as ammo linking back to a weapon in Melee/Thrown.

const hold_out_implant = implantWeapon({
  id: 'hold_out_implant',
  label: 'Hold-Out Pistol Implant',
  cost: 2000,
  availability: 3,
  legality: 'licensed',
  description: 'Space for a hold-out pistol, bought separately. Implanted pistols get +2 Concealability.',
  tags: ['firearm_implant'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.1,
    cyberwareCapacityUsed: 2,
    compatibleWith: 'hold_out_pistol',
  },
});

const light_pistol_implant = implantWeapon({
  id: 'light_pistol_implant',
  label: 'Light Pistol Implant',
  cost: 3000,
  availability: 3,
  legality: 'licensed',
  description: 'Space for a light pistol, bought separately. Implanted pistols get +2 Concealability.',
  tags: ['firearm_implant'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.25,
    cyberwareCapacityUsed: 4,
    compatibleWith: 'light_pistol',
  },
});

const machine_pistol_implant = implantWeapon({
  id: 'machine_pistol_implant',
  label: 'Machine Pistol Implant',
  cost: 3500,
  availability: 4,
  legality: 'licensed',
  description: 'Space for a machine pistol, bought separately. Implanted pistols get +2 Concealability.',
  tags: ['firearm_implant'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.5,
    cyberwareCapacityUsed: 6,
    compatibleWith: 'machine_pistol',
  },
});

const heavy_pistol_implant = implantWeapon({
  id: 'heavy_pistol_implant',
  label: 'Heavy Pistol Implant',
  cost: 4300,
  availability: 4,
  legality: 'licensed',
  description: 'Space for a heavy pistol, bought separately. Implanted pistols get +2 Concealability.',
  tags: ['firearm_implant'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.5,
    cyberwareCapacityUsed: 6,
    compatibleWith: 'heavy_pistol',
  },
});

const smg_implant = implantWeapon({
  id: 'smg_implant',
  label: 'SMG Implant',
  cost: 4800,
  availability: 5,
  legality: 'licensed',
  description: 'Space for an SMG, bought separately. Larger guns get no Concealability change — still noticeable.',
  tags: ['firearm_implant'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 1,
    cyberwareCapacityUsed: 8,
    compatibleWith: 'smg',
  },
});

const shotgun_implant = implantWeapon({
  id: 'shotgun_implant',
  label: 'Shotgun Implant',
  cost: 8500,
  availability: 5,
  legality: 'licensed',
  description: 'Space for a shotgun, bought separately.',
  tags: ['firearm_implant'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 1.25,
    cyberwareCapacityUsed: 10,
    compatibleWith: 'shotgun',
  },
});

const grenade_launcher_implant = implantWeapon({
  id: 'grenade_launcher_implant',
  label: 'Grenade Launcher Implant',
  cost: 24000,
  availability: 6,
  legality: 'illegal',
  description: 'Space for a grenade launcher, bought separately.',
  tags: ['firearm_implant'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 1.5,
    cyberwareCapacityUsed: 15,
    compatibleWith: 'grenade_launcher',
  },
});

const external_clip_port = implantWeapon({
  id: 'external_clip_port',
  label: 'External Clip Port',
  cost: 1000,
  availability: 1,
  description: 'Accessory support for implanted firearms.',
  tags: ['firearm_implant'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.1,
    cyberwareCapacityUsed: 1,
  },
});

const implant_laser_sight = implantWeapon({
  id: 'implant_laser_sight',
  label: 'Laser Sight (Implant)',
  cost: 1000,
  availability: 1,
  description: 'Accessory support for implanted firearms.',
  tags: ['firearm_implant'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.1,
    cyberwareCapacityUsed: 1,
  },
});

const implant_silencer = implantWeapon({
  id: 'implant_silencer',
  label: 'Silencer/Suppressor (Implant)',
  cost: 1000,
  availability: 4,
  legality: 'illegal',
  description: 'Accessory support for implanted firearms.',
  tags: ['firearm_implant'],
  stats: {
    installChoice: 'fleshOrCyberlimb', // costs Capacity if installed into a cyberlimb, Essence if installed directly into flesh — not both at once. See file-header FLAG note; purchase-flow logic to actually branch on this doesn't exist yet.
    essenceCost: 0.1,
    cyberwareCapacityUsed: 2,
  },
});

// ---- Bioware ----

function bioware(overrides) {
  return { category: 'bioware', legality: null, image: null, ...overrides };
}

const adrenaline_pump = bioware({
  id: 'adrenaline_pump',
  label: 'Adrenaline Pump',
  cost: null,
  costPerRating: 55000,
  availability: 5,
  legality: 'illegal',
  description: 'Abdominal gland reservoir; triggers on a failed Composure test or voluntarily. While active: ignore injury modifiers, immune to Stun unconsciousness, +rating to Strength/Agility/Reaction/Willpower. Lasts (rating x 1D6) rounds; crash afterward deals Stun damage = half the active rounds.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 3],
    essencePerRating: 0.75,
  },
});

const bone_density_augmentation = bioware({
  id: 'bone_density_augmentation',
  label: 'Bone Density Augmentation',
  cost: null,
  costPerRating: 5000,
  availability: 4,
  legality: 'licensed',
  description: 'Denser/stronger bones; +rating Body vs. physical damage, unarmed damage becomes Physical. Incompatible with bone lacing.',
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
  },
});

const cats_eyes = bioware({
  id: 'cats_eyes',
  label: "Cat's Eyes",
  cost: 4000,
  availability: 3,
  description: 'Transgenic feline eyes; low-light vision, slit/reflective appearance. Incompatible with cybereye replacement.',
  tags: ['bioware_basic'],
  stats: {
    essenceCost: 0.1,
  },
});

const enhanced_articulation = bioware({
  id: 'enhanced_articulation',
  label: 'Enhanced Articulation',
  cost: 30000,
  availability: 4,
  description: '+1 Agility and bonus Edge moving through cramped/confined spaces.',
  tags: ['bioware_basic'],
  stats: {
    essenceCost: 0.2,
  },
});

const muscle_augmentation = bioware({
  id: 'muscle_augmentation',
  label: 'Muscle Augmentation',
  cost: null,
  costPerRating: 31000,
  availability: 4,
  legality: 'licensed',
  description: '+rating Strength. Incompatible with muscle replacement cyberware.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.2,
  },
});

const muscle_toner = bioware({
  id: 'muscle_toner',
  label: 'Muscle Toner',
  cost: null,
  costPerRating: 32000,
  availability: 4,
  legality: 'licensed',
  description: '+rating Agility. Incompatible with muscle replacement/enhanced articulation.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.2,
  },
});

const orthoskin = bioware({
  id: 'orthoskin',
  label: 'Orthoskin',
  cost: null,
  costPerRating: 6000,
  availability: 4,
  legality: 'licensed',
  description: 'Near-invisible biofiber skin webbing; +rating Defense Rating. Incompatible with dermal plating.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.25,
  },
});

const platelet_factories = bioware({
  id: 'platelet_factories',
  label: 'Platelet Factories',
  cost: 17000,
  availability: 4,
  description: 'Accelerated clotting; reduce any single instance of 2+ boxes of Physical damage by 1 box.',
  tags: ['bioware_basic'],
  stats: {
    essenceCost: 0.2,
  },
});

const skin_pocket = bioware({
  id: 'skin_pocket',
  label: 'Skin Pocket',
  cost: 12000,
  availability: 4,
  description: 'Nerveless flesh flap anywhere on the body, bioware equivalent of a smuggling compartment. Concealability threshold 10.',
  tags: ['bioware_basic'],
  stats: {
    essenceCost: 0.1,
  },
});

const suprathyroid_gland = bioware({
  id: 'suprathyroid_gland',
  label: 'Suprathyroid Gland',
  cost: 140000,
  availability: 5,
  legality: 'licensed',
  description: 'Supersedes thyroid function for a metabolic boost; +1 Agility/Body/Reaction/Strength. Needs double food intake and a 25% Lifestyle cost increase.',
  tags: ['bioware_basic'],
  stats: {
    essenceCost: 0.7,
  },
});

const symbiotes = bioware({
  id: 'symbiotes',
  label: 'Symbiotes',
  cost: null,
  costPerRating: 3500,
  availability: 4,
  description: 'Bloodstream micro-organisms; +rating dice pool on healing tests. Needs (rating x 200¥)/month in special food; unfed for a month, they die.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.2,
  },
});

const synthacardium = bioware({
  id: 'synthacardium',
  label: 'Synthacardium',
  cost: null,
  costPerRating: 30000,
  availability: 3,
  description: 'Enhanced heart efficiency; +rating dice pool on Athletics tests for running/swimming/climbing.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 3],
    essencePerRating: 0.1,
  },
});

const tailored_pheromones = bioware({
  id: 'tailored_pheromones',
  label: 'Tailored Pheromones',
  cost: null,
  costPerRating: 31000,
  availability: 4,
  legality: 'licensed',
  description: '+rating Charisma for Con/Influence tests, only within smelling range of the target. No effect on magic.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.2,
  },
});

const toxin_extractor = bioware({
  id: 'toxin_extractor',
  label: 'Toxin Extractor',
  cost: null,
  costPerRating: 4800,
  availability: 4,
  description: 'Enhanced liver filtering; –rating to Toxin Resistance test thresholds.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 6],
    essencePerRating: 0.2,
  },
});

const tracheal_filter = bioware({
  id: 'tracheal_filter',
  label: 'Tracheal Filter',
  cost: null,
  costPerRating: 4500,
  availability: 4,
  description: 'Traps airborne impurities before the lungs; +rating dice pool on Toxin Resistance vs. Inhalation-vector toxins.',
  tags: ['bioware_basic'],
  stats: {
    ratingRange: [1, 6],
    essencePerRating: 0.1,
  },
});

// ---- Cultured Bioware ----
// Grown specifically to match the recipient's own body/genetic profile — pricier still.

const cerebral_booster = bioware({
  id: 'cerebral_booster',
  label: 'Cerebral Booster',
  cost: null,
  costPerRating: 31500,
  availability: 5,
  description: 'Augmented cerebrum; +rating Logic.',
  tags: ['bioware_cultured'],
  stats: {
    ratingRange: [1, 3],
    essencePerRating: 0.2,
    cultured: true,
  },
});

const damage_compensator = bioware({
  id: 'damage_compensator',
  label: 'Damage Compensator',
  cost: null,
  costPerRating: 2000,
  availability: 5,
  legality: 'licensed',
  description: 'Nerve-pathway pain cutoffs; ignore (rating) damage boxes when determining injury modifiers.',
  tags: ['bioware_cultured'],
  stats: {
    ratingRange: [1, 12],
    essencePerRating: 0.1,
    cultured: true,
  },
});

const mnemonic_enhancer = bioware({
  id: 'mnemonic_enhancer',
  label: 'Mnemonic Enhancer',
  cost: null,
  costPerRating: 9000,
  availability: 5,
  description: '+rating dice pool on Knowledge, Language, and memory-related tests.',
  tags: ['bioware_cultured'],
  stats: {
    ratingRange: [1, 3],
    essencePerRating: 0.1,
    cultured: true,
  },
});

const pain_editor = bioware({
  id: 'pain_editor',
  label: 'Pain Editor',
  cost: 48000,
  availability: 5,
  legality: 'illegal',
  description: 'While active: ignore all injury modifiers, stay conscious even with a full Stun Monitor, +1 Willpower, -1 Intuition, +1 threshold on tactile Perception tests.',
  tags: ['bioware_cultured'],
  stats: {
    essenceCost: 0.3,
    cultured: true,
  },
});

const reflex_recorder = bioware({
  id: 'reflex_recorder',
  label: 'Reflex Recorder (Skill)',
  cost: 14000,
  availability: 5,
  description: '+1 to a chosen Physical-attribute-linked skill. Multiple recorders allowed for multiple skills, never two for the same skill.',
  tags: ['bioware_cultured'],
  stats: {
    essenceCost: 0.1,
    cultured: true,
  },
});

const sleep_regulator = bioware({
  id: 'sleep_regulator',
  label: 'Sleep Regulator',
  cost: 12000,
  availability: 5,
  description: 'Only 3 hours of sleep needed nightly; stay awake twice as long before Fatigued.',
  tags: ['bioware_cultured'],
  stats: {
    essenceCost: 0.1,
    cultured: true,
  },
});

const synaptic_booster = bioware({
  id: 'synaptic_booster',
  label: 'Synaptic Booster',
  cost: null,
  costPerRating: 95000,
  availability: 5,
  legality: 'licensed',
  description: '+1 Reaction (and Initiative Score) and +1 Initiative Die per rating. Always on. Incompatible with other Reaction/Initiative enhancements.',
  tags: ['bioware_cultured'],
  stats: {
    ratingRange: [1, 3],
    essencePerRating: 0.5,
    cultured: true,
  },
});

export const GEAR_CYBERWARE_BIOWARE = {
  ...cyberlimbs,
  cyberlimb_armor, cyberlimb_attribute_increase, gyromount, cyberlimb_slide, cyberlimb_holster, hydraulic_jacks, cyberlimb_smuggling_compartment,
  cyberjaw, hardening, shock_limb, handblade, retractable_handblade, hand_razors, retractable_hand_razors, spurs, retractable_spurs,
  hold_out_implant, light_pistol_implant, machine_pistol_implant, heavy_pistol_implant, smg_implant, shotgun_implant, grenade_launcher_implant,
  external_clip_port, implant_laser_sight, implant_silencer,
  adrenaline_pump, bone_density_augmentation, cats_eyes, enhanced_articulation, muscle_augmentation, muscle_toner, orthoskin,
  platelet_factories, skin_pocket, suprathyroid_gland, symbiotes, synthacardium, tailored_pheromones, toxin_extractor, tracheal_filter,
  cerebral_booster, damage_compensator, mnemonic_enhancer, pain_editor, reflex_recorder, sleep_regulator, synaptic_booster,
};

export const GEAR_CYBERWARE_BIOWARE_IDS = Object.keys(GEAR_CYBERWARE_BIOWARE);
