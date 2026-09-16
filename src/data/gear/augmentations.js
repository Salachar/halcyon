// Biotech Basics + Headware/Eyeware/Earware/Bodyware catalog.
// Same envelope as GEAR.js.
//
// Verified against 13e-gear-biotech-headware-eyeware-earware-bodyware.md
// (Gear Part 5, pp. 281-288) in full, front to back.
//
// Two new wrinkles this category needed:
//
// 1. DocWagon contracts are subscriptions, not one-time purchases —
//    `cost: null` with `stats.costMonthly`/`costYearly` instead of a
//    flat number, since "cost >= character.nuyen" doesn't make sense
//    for a recurring service.
// 2. Several "Rating 1-5" item families (Cybereyes/Cyberears basic,
//    Wired Reflexes, and Cyberjacks) do NOT scale linearly — cost and
//    Capacity/Essence jump unevenly per rating (e.g. cybereyes cost
//    1000/4000/6000/10000/16000, not a clean multiplier). Those are
//    modeled as separate real items per rating rather than forced into
//    a costPerRating formula that would just be wrong. Cyberjacks in
//    particular were once a stub claiming its stats "live on the Matrix
//    gear table (not yet built)"; that table DOES exist
//    (09a-matrix-basics-and-actions.md) and is now reflected here.
//
// Also worth flagging: the Grade system (standard/alphaware/betaware/
// deltaware/used — multiplies Essence/cost/Availability) applies
// globally to every cyberware item in this file AND in
// GEAR_CYBERWARE_BIOWARE.js. It's a purchase-time modifier, not
// per-item data, so it's exported once here as AUGMENTATION_GRADES
// rather than duplicated onto every item — though since it's genuinely
// shared across two files, it may want to move to a shared gear-utils
// file once we're wiring this into an actual purchase flow.
//
// `wireless: true` marks real PAN nodes among these implants — Matrix
// hardware and image/sound-link tech that has a wireless-marked
// external accessory twin in GEAR_ARMOR_ELECTRONICS.js. An earlier
// version of this note claimed "most bodyware and sensory-booster items
// are physical/biological with no networked component"; that was wrong,
// written from condensed descriptions rather than source prose.
// Olfactory Booster, Taste Booster, Skilljack, Voice Modulator,
// Fingertip Compartment, Internal Air Tank, Reaction Enhancers,
// Skillwires, Smuggling Compartment, and all 4 Wired Reflexes ratings
// all have real "Wireless bonus:" text in source.
//
// CAPACITY FIELD SPLIT: per the project-wide convention, Capacity here
// is the cyberware pool (Essence-adjacent) — Cybereyes Basic and
// Cyberears Basic (by rating) are the housings and use
// `cyberwareCapacityProvided`; the bracketed `[N]` values throughout
// this file are the consumer side and use
// `cyberwareCapacityUsed[PerRating]`.
// FLAG: several bracketed-Capacity headware/bodyware items (Commlink
// implant [2], Cortex bombs [1]/[2]/[3], Cyberdeck implant [4],
// Ultrasound sensor [2], Fingertip Compartment [1], Grapple Gun
// Implant [4], Internal Air Tank [Rating]) aren't obviously consuming
// Cybereyes/Cyberears/cyberlimb capacity the way vision/audio
// enhancements are — the source never names what "houses" that
// capacity for them. Filed as `cyberwareCapacityUsed` for consistency,
// but this may actually be a distinct "headware slot" or "bodyware
// slot" pool the app doesn't model yet. Needs a decision, not guessed
// here.
//
// ============================================================================
// SCHEMA PASSES 1 AND 2 (both applied at once — this file hadn't had
// either yet):
//
// S1. `wirelessBonus` -> `wirelessBonuses`, plus `effects` extracted
//     from `description` prose. Both ARRAYS of plain strings, one
//     distinct mechanic per entry, active mechanics first and
//     restrictions/incompatibilities last.
// S2. `description` IS NOW OMITTABLE. Numbers already in a structured
//     field are not restated: each Cyberjack's D/F and VR Initiative
//     bonus live only in their own stats, every Essence figure only in
//     `essenceCost`/`essencePerRating`, and Bone Lacing's attribute
//     bonuses only in `bodyBonus`/`defenseRatingBonus`/
//     `unarmedDamageValue`/`unarmedAttackRatingBonus`.
// D1. `referenceOnly: true` on every item carrying `effects` — same
//     result as firearms_explosives.js and for the same reason. The
//     backing test is "a live computed field DRIVES this effect," and
//     nothing here qualifies: the Cyberjacks' D/F drive Matrix stats
//     rather than the "enables Matrix Edge Actions" rule, and Bone
//     Lacing's bonus fields drive its numbers rather than its
//     incompatibility clause.
// D2. THE EMPTY-IMPLANT GAP FIXED. Eleven implants had a description of
//     literally "Implanted visual enhancement." / "Implanted audio
//     enhancement." / "Implanted sound filtering." and NO mechanical
//     text at all — a player buying `smartlink_implant` saw nothing
//     about what it does, while the identically-named accessory twin in
//     armor_electronics.js carried its full effect list. Effects are
//     now mirrored from those twins. Same class of gap as Smartgun
//     System (External) having no effect entry in the weapons file.
// D3. `defaultAttachments` + THREE NEW `builtIn` SKUs. Four items
//     describe bundling something that exists as a real catalog item
//     AT NO EXTRA COST, which is exactly the integral-SKU case:
//       - Commlink (Implant) and Control Rig both include a free/
//         built-in sim module -> `sim_module_integral`
//       - Cybereyes Basic (all 5) include an image link
//         -> `image_link_integral`
//       - Cyberears Basic (all 5) include a sound link
//         -> `sound_link_integral`
//     Each integral SKU is free of the cost AND Essence its purchasable
//     twin charges, which is why it can't just reference the twin.
// D4. THIS FILE ANSWERS AN OPEN QUESTION FROM armor_electronics.js:
//     `biomonitor` is a real item and lives here, so Urban Explorer
//     Jumpsuit's "built-in biomonitor" can finally become a real
//     reference. That edit belongs in armor_electronics.js, not here.
// ============================================================================

export const AUGMENTATION_GRADES = {
  standard: {
    essenceMultiplier: 1,
    costMultiplier: 1,
    availabilityModifier: 0,
  },
  used: {
    essenceMultiplier: 1.1,
    costMultiplier: 0.5,
    availabilityModifier: -1,
  },
  alphaware: {
    essenceMultiplier: 0.8,
    costMultiplier: 1.2,
    availabilityModifier: 1,
  },
  betaware: {
    essenceMultiplier: 0.7,
    costMultiplier: 1.5,
    availabilityModifier: 2,
  },
  deltaware: {
    essenceMultiplier: 0.5,
    costMultiplier: 2.5,
    availabilityModifier: 3,
  },
};

// NOTE: Surgery/Recovery (implant damage = Essence Cost x 3, min 1 box)
// and Augmentation Overdrive are gameplay rules, not item data — they
// belong on the Rules tab (Shadowrunners > Advancement or a new
// Augmentations subsection), which doesn't currently cover them.
// Flagging as a real content gap, not solving it here.

// Basic cyberware carries no explicit Device Rating in source; 2 is the
// FAQ guideline default. Used by all 10 Cybereyes/Cyberears items.
const BASIC_CYBERWARE_DEVICE_RATING = 2;

const CYBERJACK_EFFECTS = [
  'Doubles as a standard datajack.',
  'Enables special Matrix Edge Actions.',
  'Interfaces more smoothly with a cyberdeck than a plain datajack, for better speed and response.',
];

const CYBEREYES_EFFECTS = [
  '20/20 vision in both eyes.',
  'Includes a built-in camera.',
];

const CYBEREARS_EFFECTS = [
  'Normal-range hearing, equivalent to an omnidirectional mic.',
  'Bonus Edge against hearing interference.',
];

const WIRED_REFLEXES_EFFECTS = [
  '+1 Reaction, and +1 Initiative Score, per Rating while active.',
  '+1 Initiative Die per Rating while active.',
  'Toggled manually as a Major Action, or wirelessly.',
  'Incompatible with other Reaction and Initiative augmentations.',
];

const WIRED_REFLEXES_WIRELESS = [
  'Becomes compatible with wireless-enabled Reaction Enhancers.',
  'Toggling on or off becomes a Minor Action instead of a Major Action.',
];

function biotech(overrides) {
  return { category: 'biotech', legality: null, image: null, ...overrides };
}
function biotechWireless(overrides) {
  return biotech({ wireless: true, ...overrides });
}
function headware(overrides) {
  return { category: 'cyberware', legality: null, image: null, ...overrides };
}
function headwareWireless(overrides) {
  return headware({ wireless: true, ...overrides });
}
// D3: integral implants — bundled with a parent implant at no cost and
// no Essence, so they can't reference the purchasable twin. Seeded only
// via a parent's stats.defaultAttachments; never sold on their own.
function integralImplant(overrides) {
  return {
    category: 'cyberware',
    legality: null,
    image: null,
    mount: null,
    builtIn: true,
    cost: null,
    availability: null,
    referenceOnly: true,
    ...overrides,
  };
}

// ---- Biotech Basics ----

const biomonitor = biotechWireless({
  id: 'biomonitor',
  label: 'Biomonitor',
  cost: 300,
  availability: 2,
  referenceOnly: true,
  description: 'Worn, or integrated into clothing or a commlink.',
  tags: ['biotech'],
  stats: {
    effects: [
      'Tracks heart rate, blood pressure, and temperature.',
      'Analyzes blood, sweat, and skin samples.',
    ],
    wirelessBonuses: [
      'Shares data with designated devices.',
      'Can auto-alert DocWagon or ambulance services at set thresholds.',
    ],
  },
});

const docwagon_basic = biotech({
  id: 'docwagon_basic',
  label: 'DocWagon: Basic',
  cost: null,
  availability: 1,
  referenceOnly: true,
  tags: ['biotech'],
  stats: {
    costMonthly: 500,
    costYearly: 5000,
    effects: [
      'Armed trauma team arrival under 10 minutes in covered metro areas, or the emergency care is free.',
      'Resuscitation and HTR service each carry a 5,000¥ premium.',
    ],
  },
});

const docwagon_gold = biotech({
  id: 'docwagon_gold',
  label: 'DocWagon: Gold',
  cost: null,
  availability: 1,
  referenceOnly: true,
  tags: ['biotech'],
  stats: {
    costMonthly: 2500,
    costYearly: 25000,
    effects: [
      '1 free resuscitation per year.',
      '50% off HTR.',
      '10% off extended care.',
    ],
  },
});

const docwagon_platinum = biotech({
  id: 'docwagon_platinum',
  label: 'DocWagon: Platinum',
  cost: null,
  availability: 1,
  referenceOnly: true,
  tags: ['biotech'],
  stats: {
    costMonthly: 5000,
    costYearly: 50000,
    effects: [
      '4 free resuscitations per year.',
      '50% off extended care.',
      'Free HTR; death compensation still applies.',
    ],
  },
});

const docwagon_super_platinum = biotech({
  id: 'docwagon_super_platinum',
  label: 'DocWagon: Super-Platinum',
  cost: null,
  availability: 1,
  referenceOnly: true,
  tags: ['biotech'],
  stats: {
    costMonthly: 10000,
    costYearly: 100000,
    effects: [
      '5 free resuscitations per year.',
      'Free HTR.',
      'No death compensation owed.',
    ],
  },
});

const disposable_syringe = biotech({
  id: 'disposable_syringe',
  label: 'Disposable Syringe',
  cost: 10,
  availability: 2,
  referenceOnly: true,
  tags: ['biotech'],
  stats: {
    effects: [
      'Delivers Injection-vector toxins.',
      'Single use.',
    ],
  },
});

const medkit = biotechWireless({
  id: 'medkit',
  label: 'Medkit',
  cost: null,
  costPerRating: 250,
  availability: 3,
  referenceOnly: true,
  description: 'Drug supplies, bandages, tools, and a talkative expert-system doctor.',
  tags: ['biotech'],
  stats: {
    ratingRange: [1, 6],
    effects: [
      'Counts as a Kit for Biotech tests.',
      'Supplies are consumed per use; up to 5 sets are stored in the case.',
    ],
    wirelessBonuses: ['+1 dice pool on healing tests.'],
  },
});

const medkit_supplies = biotech({
  id: 'medkit_supplies',
  label: 'Medkit Supplies',
  cost: 100,
  availability: 1,
  description: 'Restock for a consumed medkit set.',
  tags: ['biotech'],
  stats: {},
});

const antidote_patch = biotech({
  id: 'antidote_patch',
  label: 'Antidote Patch',
  cost: 150,
  availability: 3,
  referenceOnly: true,
  tags: ['biotech'],
  stats: {
    effects: [
      'Cancels the Poisoned status for most toxins.',
      'Rare substances may need a matching specific antidote.',
    ],
  },
});

const chem_patch = biotech({
  id: 'chem_patch',
  label: 'Chem Patch',
  cost: 200,
  availability: 3,
  referenceOnly: true,
  description: 'A "blank" patch.',
  tags: ['biotech'],
  stats: {
    effects: ['Loadable with one dose of any chemical or toxin.'],
  },
});

const stim_patch = biotech({
  id: 'stim_patch',
  label: 'Stim Patch',
  cost: null,
  costPerRating: 25,
  availability: 3,
  referenceOnly: true,
  tags: ['biotech'],
  stats: {
    ratingRange: [1, 6],
    effects: [
      'Clears Rating boxes of Stun damage and cancels Dazed.',
      'Lasts Rating x 10 minutes, then deals Rating + 1 unresisted Stun damage.',
      'No resting while active.',
    ],
  },
});

const tranq_patch = biotech({
  id: 'tranq_patch',
  label: 'Tranq Patch',
  cost: null,
  availability: 3,
  referenceOnly: true,
  tags: ['biotech'],
  stats: {
    ratingRange: [1, 12],
    costRatingSquaredMultiplier: 10, // cost = (Rating x Rating) x 10¥ — the one non-linear biotech cost
    effects: [
      'Inflicts Stun damage equal to its Rating.',
      'Resisted by Body only.',
    ],
  },
});

const trauma_patch = biotechWireless({
  id: 'trauma_patch',
  label: 'Trauma Patch',
  cost: 500,
  availability: 3,
  referenceOnly: true,
  description: 'Always wireless — it connects to the Matrix the instant it is applied.',
  tags: ['biotech'],
  stats: {
    effects: ['Heals 1d6+1 Overflow damage immediately on application.'],
  },
});

// ---- Integral Implants (D3) ----
// Seeded only via a parent implant's stats.defaultAttachments.

const sim_module_integral = integralImplant({
  id: 'sim_module_integral',
  label: 'Sim Module (Integral)',
  wireless: true,
  description: 'The sim module bundled into an implanted commlink or a control rig.',
  tags: ['headware'],
  stats: {
    effects: [
      'Provides the full simsense, AR, and VR experience via DNI.',
      'Included with its parent implant at no additional cost or Essence.',
    ],
  },
});

const image_link_integral = integralImplant({
  id: 'image_link_integral',
  label: 'Image Link (Integral)',
  wireless: true,
  description: 'The image link built into every grade of Cybereyes.',
  tags: ['eyeware'],
  stats: {
    effects: [
      'Displays visual information — AROs, text, images, video — in your field of vision.',
      'Required to truly see AR.',
      'Included with Cybereyes at no additional cost or Essence.',
    ],
  },
});

const sound_link_integral = integralImplant({
  id: 'sound_link_integral',
  label: 'Sound Link (Integral)',
  wireless: true,
  description: 'The sound link built into every grade of Cyberears.',
  tags: ['earware'],
  stats: {
    effects: [
      'Plays linked audio — PAN sources, headware memory, datajack — directly.',
      'Included with Cyberears at no additional cost or Essence.',
    ],
  },
});

// ---- Headware ----

const commlink_implant = headwareWireless({
  id: 'commlink_implant',
  label: 'Commlink (Implant)',
  cost: 2000,
  availability: 2,
  referenceOnly: true,
  description: 'An implanted commlink, popular with corporate operatives.',
  tags: ['headware'],
  stats: {
    essenceCost: 0.2,
    cyberwareCapacityUsed: 2,
    effects: [
      'Cost covers the implant slot only — the commlink device itself is bought separately.',
      'Bricking damage: 6P, Body-resisted.',
      "Devices under Device Rating 5 generally aren't installed in-skull, for security reasons.",
    ],
    defaultAttachments: ['sim_module_integral'],
  },
});

const control_rig = headware({
  id: 'control_rig',
  label: 'Control Rig',
  cost: null,
  costPerRating: 30000,
  availability: 4,
  legality: 'licensed',
  referenceOnly: true,
  description: 'Harnesses midbrain processing for direct rigged vehicle and drone control.',
  tags: ['headware'],
  stats: {
    ratingRange: [1, 3],
    essencePerRating: 1,
    effects: [
      'While jumped in, adds Rating as a dice pool bonus or threshold reduction on vehicle operation tests.',
      'While jumped in, grants a bonus Edge point.',
      'Includes a universal data connector.',
    ],
    defaultAttachments: ['sim_module_integral'],
  },
});

const cortex_kink_bomb = headwareWireless({
  id: 'cortex_kink_bomb',
  label: 'Cortex Kink Bomb',
  cost: 10000,
  availability: 6,
  legality: 'illegal',
  referenceOnly: true,
  tags: ['headware'],
  stats: {
    essenceCost: 0,
    cyberwareCapacityUsed: 1,
    effects: [
      'Destroys specific headware, or causes targeted trauma — blindness, stuttering, hearing loss.',
      '5P, Body-resisted.',
      'Remote, time, or sound triggered.',
    ],
  },
});

const cortex_microbomb = headwareWireless({
  id: 'cortex_microbomb',
  label: 'Cortex Microbomb',
  cost: 25000,
  availability: 6,
  legality: 'illegal',
  referenceOnly: true,
  tags: ['headware'],
  stats: {
    essenceCost: 0,
    cyberwareCapacityUsed: 2,
    effects: [
      'Kills the bearer.',
      '18P, Body-resisted.',
      'Remote, time, or sound triggered.',
    ],
  },
});

const cortex_area_bomb = headwareWireless({
  id: 'cortex_area_bomb',
  label: 'Cortex Area Bomb',
  cost: 40000,
  availability: 6,
  legality: 'illegal',
  referenceOnly: true,
  tags: ['headware'],
  stats: {
    essenceCost: 0,
    cyberwareCapacityUsed: 3,
    effects: [
      'Kills the bearer and detonates like a fragmentation grenade.',
      'The blast damage is resisted separately.',
      'Remote, time, or sound triggered.',
    ],
  },
});

const cyberdeck_implant = headwareWireless({
  id: 'cyberdeck_implant',
  label: 'Cyberdeck (Implant)',
  cost: 5000,
  availability: 4,
  legality: 'licensed',
  referenceOnly: true,
  description: 'An implanted deck — convenient on the go, and common among government and military deckers.',
  tags: ['headware'],
  stats: {
    essenceCost: 0.4,
    cyberwareCapacityUsed: 4,
    effects: [
      'Cost covers the implant slot only — the cyberdeck itself is bought separately.',
      'Bricking damage: 8P, Body-resisted.',
    ],
  },
});

// Cyberjacks do NOT scale linearly (Essence 1/1.5/2/2.3/2.6/3, cost
// jumps unevenly) — 6 real rating items, verified against
// 09a-matrix-basics-and-actions.md's Cyberjacks table. D/F and VR Init
// Dice Bonus are Matrix-facing stats (mirroring the commlink/cyberdeck
// shape in matrix_devices.js) layered onto a cyberware item, since a
// Cyberjack is headware that also functions as a datajack.

const cyberjack_1 = headwareWireless({
  id: 'cyberjack_1',
  label: 'Cyberjack (Rating 1)',
  category: 'cyberjack',
  cost: 45000,
  availability: 3,
  legality: 'licensed',
  referenceOnly: true,
  description: 'An invasive brain implant, wired straight into the deck.',
  tags: ['cyberjack'],
  stats: {
    deviceRating: 1,
    essenceCost: 1,
    dataProcessing: 4,
    firewall: 3,
    vrInitiativeDiceBonus: 1,
    effects: CYBERJACK_EFFECTS,
  },
});

const cyberjack_2 = headwareWireless({
  id: 'cyberjack_2',
  label: 'Cyberjack (Rating 2)',
  category: 'cyberjack',
  cost: 65000,
  availability: 3,
  legality: 'licensed',
  referenceOnly: true,
  description: 'An invasive brain implant, wired straight into the deck.',
  tags: ['cyberjack'],
  stats: {
    deviceRating: 2,
    essenceCost: 1.5,
    dataProcessing: 5,
    firewall: 4,
    vrInitiativeDiceBonus: 1,
    effects: CYBERJACK_EFFECTS,
  },
});

const cyberjack_3 = headwareWireless({
  id: 'cyberjack_3',
  label: 'Cyberjack (Rating 3)',
  category: 'cyberjack',
  cost: 80000,
  availability: 3,
  legality: 'licensed',
  referenceOnly: true,
  description: 'An invasive brain implant, wired straight into the deck.',
  tags: ['cyberjack'],
  stats: {
    deviceRating: 3,
    essenceCost: 2,
    dataProcessing: 6,
    firewall: 5,
    vrInitiativeDiceBonus: 1,
    effects: CYBERJACK_EFFECTS,
  },
});

const cyberjack_4 = headwareWireless({
  id: 'cyberjack_4',
  label: 'Cyberjack (Rating 4)',
  category: 'cyberjack',
  cost: 95000,
  availability: 4,
  legality: 'licensed',
  referenceOnly: true,
  description: 'An invasive brain implant, wired straight into the deck.',
  tags: ['cyberjack'],
  stats: {
    deviceRating: 4,
    essenceCost: 2.3,
    dataProcessing: 7,
    firewall: 6,
    vrInitiativeDiceBonus: 2,
    effects: CYBERJACK_EFFECTS,
  },
});

const cyberjack_5 = headwareWireless({
  id: 'cyberjack_5',
  label: 'Cyberjack (Rating 5)',
  category: 'cyberjack',
  cost: 140000,
  availability: 5,
  legality: 'licensed',
  referenceOnly: true,
  description: 'An invasive brain implant, wired straight into the deck.',
  tags: ['cyberjack'],
  stats: {
    deviceRating: 5,
    essenceCost: 2.6,
    dataProcessing: 8,
    firewall: 7,
    vrInitiativeDiceBonus: 2,
    effects: CYBERJACK_EFFECTS,
  },
});

const cyberjack_6 = headwareWireless({
  id: 'cyberjack_6',
  label: 'Cyberjack (Rating 6)',
  category: 'cyberjack',
  cost: 210000,
  availability: 6,
  legality: 'licensed',
  referenceOnly: true,
  description: 'An invasive brain implant, wired straight into the deck.',
  tags: ['cyberjack'],
  stats: {
    deviceRating: 6,
    essenceCost: 3,
    dataProcessing: 9,
    firewall: 8,
    vrInitiativeDiceBonus: 2,
    effects: CYBERJACK_EFFECTS,
  },
});

const datajack = headware({
  id: 'datajack',
  label: 'Datajack',
  cost: 1000,
  availability: 2,
  referenceOnly: true,
  description: 'A retractable ~1m micro-cable with its own storage cache.',
  tags: ['headware'],
  stats: {
    essenceCost: 0.1,
    effects: [
      'Provides DNI.',
      'Direct device interfacing via the micro-cable.',
      'Two datajack users can string a private fiberoptic link, immune to radio interception.',
    ],
  },
});

const datalock = headware({
  id: 'datalock',
  label: 'Datalock',
  cost: null,
  costPerRating: 1000,
  availability: 4,
  referenceOnly: true,
  description: 'Turns the bearer into a walking data safe.',
  tags: ['headware'],
  stats: {
    ratingRange: [1, 12],
    essenceCost: 0.1,
    effects: [
      'Device Rating equals its own Rating.',
      "Protects stored data from unauthorized access — including the bearer's own mental access.",
      'Not wireless-enabled.',
    ],
  },
});

const olfactory_booster = headwareWireless({
  id: 'olfactory_booster',
  label: 'Olfactory Booster',
  cost: null,
  costPerRating: 4000,
  availability: 3,
  referenceOnly: true,
  description: 'Massively enhanced smell, with a cutoff to ignore intense odors.',
  tags: ['headware'],
  stats: {
    ratingRange: [1, 3],
    essenceCost: 0.2,
    effects: [
      'Use-it-or-lose-it bonus Edge on scent Perception tests.',
      'Detects emotions via sweat, tailored pheromone marks, and propellant, explosive, or chem-warfare traces.',
    ],
    wirelessBonuses: ['+Rating dice pool on scent Perception tests.'],
  },
});

const simrig_implant = headwareWireless({
  id: 'simrig_implant',
  label: 'Simrig (Implant)',
  cost: 4000,
  availability: 4,
  legality: 'licensed',
  referenceOnly: true,
  tags: ['headware'],
  stats: {
    essenceCost: 0.2,
    effects: ['Records simsense for later replay or sale.'],
  },
});

const skilljack = headwareWireless({
  id: 'skilljack',
  label: 'Skilljack',
  cost: null,
  costPerRating: 20000,
  availability: 4,
  referenceOnly: true,
  tags: ['headware'],
  stats: {
    ratingRange: [1, 6],
    essencePerRating: 0.1,
    effects: [
      'Interprets knowsofts and linguasofts as your own knowledge.',
      'Can run activesofts too, but only as Knowledge Skills without skillwires.',
      "Total running skills capped at Rating x 2; a single skill is capped at the skilljack's Rating.",
      "Skilljack-sourced skills can't be Edge-boosted.",
    ],
    wirelessBonuses: [
      'The running-skills cap rises to Rating x 4.',
      'Skilljack-sourced skills can be Edge-boosted.',
    ],
  },
});

const taste_booster = headwareWireless({
  id: 'taste_booster',
  label: 'Taste Booster',
  cost: null,
  costPerRating: 3000,
  availability: 3,
  referenceOnly: true,
  description: 'Like the olfactory booster, but for taste.',
  tags: ['headware'],
  stats: {
    ratingRange: [1, 3],
    essenceCost: 0.2,
    effects: [
      'Use-it-or-lose-it bonus Edge on taste Perception tests.',
      'Enables AR and VR "taste tracks."',
    ],
    wirelessBonuses: ['+Rating dice pool on taste Perception tests.'],
  },
});

const tooth_compartment = headwareWireless({
  id: 'tooth_compartment',
  label: 'Tooth Compartment',
  cost: 800,
  availability: 4,
  referenceOnly: true,
  description: 'A hollow tooth.',
  tags: ['headware'],
  stats: {
    essenceCost: 0,
    effects: [
      'Stores tiny items up to 5mm, or holds a breakable payload that triggers a linked effect such as a tracking signal or poison release.',
      'Opened via wireless signal, hidden catch, or a hard bite.',
    ],
  },
});

const ultrasound_sensor = headware({
  id: 'ultrasound_sensor',
  label: 'Ultrasound Sensor',
  cost: 3600,
  availability: 4,
  referenceOnly: true,
  description: 'An implanted ultrasound emitter and receiver.',
  tags: ['headware'],
  stats: {
    essenceCost: 0.3,
    cyberwareCapacityUsed: 2,
    effects: [
      'Replaces normal vision while active.',
      'Switchable between active sonar, passive sonar, and off.',
    ],
  },
});

const voice_modulator = headwareWireless({
  id: 'voice_modulator',
  label: 'Voice Modulator',
  cost: null,
  costPerRating: 5000,
  availability: 4,
  legality: 'licensed',
  referenceOnly: true,
  tags: ['headware'],
  stats: {
    ratingRange: [1, 3],
    essenceCost: 0.2,
    effects: [
      'Bonus Edge on sound-based Con tests.',
      'Perfect pitch, and a huge vocal range and volume, up to 100 dB.',
      'Near-perfect vocal impressions, and playback of captured voices.',
    ],
    wirelessBonuses: ['+Rating dice pool on sound-based Con tests.'],
  },
});

// ---- Eyeware ----
// Cybereyes basic don't scale linearly — 5 real items, not a formula.
// All wireless: the image link is the exact tech marked wireless on
// external glasses/goggles in armor_electronics.js. Retinal Duplication
// is the one exception — a passive biometric payload read by an
// external scanner, not a networked device itself.
//
// D2: the seven bare "Implanted visual enhancement." items below now
// carry the same effects as their accessory twins in
// armor_electronics.js. They previously had no mechanical text at all.

const cybereyes_basic_1 = headwareWireless({
  id: 'cybereyes_basic_1',
  label: 'Cybereyes, Basic (Rating 1)',
  cost: 1000,
  availability: 2,
  referenceOnly: true,
  tags: ['eyeware'],
  stats: {
    deviceRating: BASIC_CYBERWARE_DEVICE_RATING,
    essenceCost: 0.1,
    cyberwareCapacityProvided: 1,
    effects: CYBEREYES_EFFECTS,
    defaultAttachments: ['image_link_integral'],
  },
});

const cybereyes_basic_2 = headwareWireless({
  id: 'cybereyes_basic_2',
  label: 'Cybereyes, Basic (Rating 2)',
  cost: 4000,
  availability: 2,
  referenceOnly: true,
  tags: ['eyeware'],
  stats: {
    deviceRating: BASIC_CYBERWARE_DEVICE_RATING,
    essenceCost: 0.2,
    cyberwareCapacityProvided: 4,
    effects: CYBEREYES_EFFECTS,
    defaultAttachments: ['image_link_integral'],
  },
});

const cybereyes_basic_3 = headwareWireless({
  id: 'cybereyes_basic_3',
  label: 'Cybereyes, Basic (Rating 3)',
  cost: 6000,
  availability: 3,
  referenceOnly: true,
  tags: ['eyeware'],
  stats: {
    deviceRating: BASIC_CYBERWARE_DEVICE_RATING,
    essenceCost: 0.3,
    cyberwareCapacityProvided: 8,
    effects: CYBEREYES_EFFECTS,
    defaultAttachments: ['image_link_integral'],
  },
});

const cybereyes_basic_4 = headwareWireless({
  id: 'cybereyes_basic_4',
  label: 'Cybereyes, Basic (Rating 4)',
  cost: 10000,
  availability: 3,
  referenceOnly: true,
  tags: ['eyeware'],
  stats: {
    deviceRating: BASIC_CYBERWARE_DEVICE_RATING,
    essenceCost: 0.4,
    cyberwareCapacityProvided: 12,
    effects: CYBEREYES_EFFECTS,
    defaultAttachments: ['image_link_integral'],
  },
});

const cybereyes_basic_5 = headwareWireless({
  id: 'cybereyes_basic_5',
  label: 'Cybereyes, Basic (Rating 5)',
  cost: 16000,
  availability: 3,
  referenceOnly: true,
  tags: ['eyeware'],
  stats: {
    deviceRating: BASIC_CYBERWARE_DEVICE_RATING,
    essenceCost: 0.5,
    cyberwareCapacityProvided: 16,
    effects: CYBEREYES_EFFECTS,
    defaultAttachments: ['image_link_integral'],
  },
});

const flare_compensation = headwareWireless({
  id: 'flare_compensation',
  label: 'Flare Compensation',
  cost: 1000,
  availability: 2,
  referenceOnly: true,
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 1,
    effects: [
      'Blocks blinding flashes and glare.',
      'Bonus Edge if the opposition lacks the same.',
    ],
  },
});

const image_link_implant = headwareWireless({
  id: 'image_link_implant',
  label: 'Image Link (Implant)',
  cost: 800,
  availability: 2,
  referenceOnly: true,
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.1,
    effects: [
      'Displays visual information — AROs, text, images, video — in your field of vision.',
      'Required to truly see AR.',
    ],
  },
});

const low_light_vision_implant = headwareWireless({
  id: 'low_light_vision_implant',
  label: 'Low-Light Vision (Implant)',
  cost: 1500,
  availability: 2,
  referenceOnly: true,
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 2,
    effects: [
      'Normal vision down to starlight levels.',
      'Bonus Edge if the opposition lacks it.',
    ],
  },
});

const ocular_drone = headwareWireless({
  id: 'ocular_drone',
  label: 'Ocular Drone',
  cost: 6000,
  availability: 3,
  referenceOnly: true,
  description: 'Installs a small drone in the eye socket — treat it as a Horizon Flying Eye.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.3,
    cyberwareCapacityUsed: 6,
    effects: [
      'Functions as a normal cybereye until removed and piloted separately.',
      'While removed: Blindness I in that eye, or Blindness III if both are remote.',
    ],
  },
});

const retinal_duplication = headware({
  id: 'retinal_duplication',
  label: 'Retinal Duplication',
  cost: null,
  costPerRating: 20000,
  availability: 5,
  legality: 'illegal',
  referenceOnly: true,
  description: 'Loads a recorded retina scan.',
  tags: ['eyeware'],
  stats: {
    ratingRange: [1, 6],
    essenceCost: 0.1,
    cyberwareCapacityUsed: 1,
    effects: [
      'Near-perfect impersonation against retinal scanners — Opposed test, duplication Rating vs. scanner Rating.',
      'Stores up to Rating retinas.',
      'Switching patterns takes 1 minute.',
    ],
  },
});

const smartlink_implant = headwareWireless({
  id: 'smartlink_implant',
  label: 'Smartlink (Implant)',
  cost: 4000,
  availability: 3,
  legality: 'licensed',
  referenceOnly: true,
  description: 'The vision half of a smartgun system.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.2,
    cyberwareCapacityUsed: 3,
    effects: ['Displays range, ammo status, and a targeting dot in your field of view.'],
  },
});

const thermographic_vision_implant = headwareWireless({
  id: 'thermographic_vision_implant',
  label: 'Thermographic Vision (Implant)',
  cost: 2000,
  availability: 2,
  referenceOnly: true,
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 2,
    effects: [
      'Infrared and heat-pattern vision.',
      'Bonus Edge if the opposition lacks it.',
    ],
  },
});

const vision_enhancement_implant = headwareWireless({
  id: 'vision_enhancement_implant',
  label: 'Vision Enhancement (Implant)',
  cost: 4000,
  availability: 3,
  referenceOnly: true,
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 2,
    effects: ['+1 dice pool on all visual Perception tests.'],
  },
});

const vision_magnification_implant = headwareWireless({
  id: 'vision_magnification_implant',
  label: 'Vision Magnification (Implant)',
  cost: 2000,
  availability: 3,
  referenceOnly: true,
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 2,
    effects: [
      'Up to 50x zoom.',
      '+2 Attack Rating at Medium, Far, and Extreme range, where the weapon already has a nonzero rating there.',
    ],
  },
});

// ---- Earware ----
// Cyberears basic also don't scale linearly — 5 real items. Wireless
// for the same reason as Cybereyes (sound link = the marked-wireless
// external tech); the four remaining earware items are physical or
// neurological effects with no networked component.

const cyberears_basic_1 = headwareWireless({
  id: 'cyberears_basic_1',
  label: 'Cyberears, Basic (Rating 1)',
  cost: 1000,
  availability: 2,
  referenceOnly: true,
  tags: ['earware'],
  stats: {
    deviceRating: BASIC_CYBERWARE_DEVICE_RATING,
    essenceCost: 0.1,
    cyberwareCapacityProvided: 1,
    effects: CYBEREARS_EFFECTS,
    defaultAttachments: ['sound_link_integral'],
  },
});

const cyberears_basic_2 = headwareWireless({
  id: 'cyberears_basic_2',
  label: 'Cyberears, Basic (Rating 2)',
  cost: 3000,
  availability: 2,
  referenceOnly: true,
  tags: ['earware'],
  stats: {
    deviceRating: BASIC_CYBERWARE_DEVICE_RATING,
    essenceCost: 0.2,
    cyberwareCapacityProvided: 4,
    effects: CYBEREARS_EFFECTS,
    defaultAttachments: ['sound_link_integral'],
  },
});

const cyberears_basic_3 = headwareWireless({
  id: 'cyberears_basic_3',
  label: 'Cyberears, Basic (Rating 3)',
  cost: 4500,
  availability: 3,
  referenceOnly: true,
  tags: ['earware'],
  stats: {
    deviceRating: BASIC_CYBERWARE_DEVICE_RATING,
    essenceCost: 0.3,
    cyberwareCapacityProvided: 8,
    effects: CYBEREARS_EFFECTS,
    defaultAttachments: ['sound_link_integral'],
  },
});

const cyberears_basic_4 = headwareWireless({
  id: 'cyberears_basic_4',
  label: 'Cyberears, Basic (Rating 4)',
  cost: 7500,
  availability: 3,
  referenceOnly: true,
  tags: ['earware'],
  stats: {
    deviceRating: BASIC_CYBERWARE_DEVICE_RATING,
    essenceCost: 0.4,
    cyberwareCapacityProvided: 12,
    effects: CYBEREARS_EFFECTS,
    defaultAttachments: ['sound_link_integral'],
  },
});

const cyberears_basic_5 = headwareWireless({
  id: 'cyberears_basic_5',
  label: 'Cyberears, Basic (Rating 5)',
  cost: 11000,
  availability: 3,
  referenceOnly: true,
  tags: ['earware'],
  stats: {
    deviceRating: BASIC_CYBERWARE_DEVICE_RATING,
    essenceCost: 0.5,
    cyberwareCapacityProvided: 16,
    effects: CYBEREARS_EFFECTS,
    defaultAttachments: ['sound_link_integral'],
  },
});

const audio_enhancement_implant = headwareWireless({
  id: 'audio_enhancement_implant',
  label: 'Audio Enhancement (Implant)',
  cost: 4000,
  availability: 2,
  referenceOnly: true,
  tags: ['earware'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 1,
    effects: [
      '+1 dice pool on aural Perception tests.',
      'Hear beyond the normal frequency range.',
      'Fine nuance discrimination, and blocks distracting noise.',
    ],
  },
});

const balance_augmenter = headware({
  id: 'balance_augmenter',
  label: 'Balance Augmenter',
  cost: 8000,
  availability: 3,
  referenceOnly: true,
  tags: ['earware'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 4,
    effects: ['+1 die on balance-related tests — climbing, narrow platforms, landing jumps.'],
  },
});

const damper = headware({
  id: 'damper',
  label: 'Damper',
  cost: 2250,
  availability: 2,
  referenceOnly: true,
  tags: ['earware'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 1,
    effects: ['Reduces the Deafened status by 1 level whenever it is inflicted.'],
  },
});

const select_sound_filter = headwareWireless({
  id: 'select_sound_filter',
  label: 'Select Sound Filter',
  cost: null,
  costPerRating: 3500,
  availability: 4,
  referenceOnly: true,
  tags: ['earware'],
  stats: {
    ratingRange: [1, 6],
    essenceCost: 0.1,
    cyberwareCapacityUsedPerRating: 1,
    effects: [
      'Blocks background noise and focuses on chosen sound patterns, up to Rating of them loaded.',
      'Actively listens to one group at a time, recording or alerting on the rest.',
    ],
  },
});

const sound_link_implant = headwareWireless({
  id: 'sound_link_implant',
  label: 'Sound Link (Implant)',
  cost: 1000,
  availability: 2,
  referenceOnly: true,
  description: 'Common in immersive AR.',
  tags: ['earware'],
  stats: {
    essenceCost: 0.1,
    effects: ['Plays linked audio — PAN sources, headware memory, datajack — directly.'],
  },
});

const spatial_recognizer = headwareWireless({
  id: 'spatial_recognizer',
  label: 'Spatial Recognizer',
  cost: 4000,
  availability: 3,
  referenceOnly: true,
  // FLAG: the external accessory version of this item (in
  // sensors_security_survival.js) has an explicit Wireless bonus ("+1
  // dice pool on source-finding tests"). This Earware chapter only
  // describes the implant as "the implanted version of the standard
  // audio enhancement" without restating that bonus text — not adding
  // it here without confirmation it's meant to carry over. The base
  // effects below ARE mirrored from the twin (see D2), since those the
  // source does imply; only the wireless bonus is withheld.
  tags: ['earware'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 2,
    effects: [
      "Pinpoints a sound's source.",
      'Use-it-or-lose-it bonus Edge on the relevant Perception test.',
    ],
  },
});

// ---- Bodyware ----
// All physical/biological modifications except where noted — the
// wireless ones below have real "Wireless bonus:" text in source.

const bone_lacing_plastic = headware({
  id: 'bone_lacing_plastic',
  label: 'Bone Lacing (Plastic)',
  cost: 8000,
  availability: 3,
  legality: 'licensed',
  referenceOnly: true,
  description: 'A reinforcing lattice worked through the bones.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 0.5,
    bodyBonus: 1,
    defenseRatingBonus: 1,
    unarmedDamageValue: '3P',
    unarmedAttackRatingBonus: 1,
    effects: ['Incompatible with other bone-affecting augmentations, such as bone density augmentation.'],
  },
});

const bone_lacing_aluminum = headware({
  id: 'bone_lacing_aluminum',
  label: 'Bone Lacing (Aluminum)',
  cost: 18000,
  availability: 4,
  legality: 'licensed',
  referenceOnly: true,
  description: 'A reinforcing lattice worked through the bones.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 1,
    bodyBonus: 2,
    defenseRatingBonus: 1,
    unarmedDamageValue: '4P',
    unarmedAttackRatingBonus: 2,
    effects: ['Incompatible with other bone-affecting augmentations.'],
  },
});

const bone_lacing_titanium = headware({
  id: 'bone_lacing_titanium',
  label: 'Bone Lacing (Titanium)',
  cost: 30000,
  availability: 6,
  legality: 'licensed',
  referenceOnly: true,
  description: 'A reinforcing lattice worked through the bones.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 1.5,
    bodyBonus: 2,
    defenseRatingBonus: 2,
    unarmedDamageValue: '4P',
    unarmedAttackRatingBonus: 3,
    effects: ['Incompatible with other bone-affecting augmentations.'],
  },
});

const dermal_plating = headware({
  id: 'dermal_plating',
  label: 'Dermal Plating',
  cost: null,
  costPerRating: 4000,
  availability: 4,
  legality: 'licensed',
  referenceOnly: true,
  description: 'Visible bonded plates.',
  tags: ['bodyware'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.3,
    effects: [
      '+Defense Rating equal to Rating.',
      "Can't combine with other skin-based Defense Rating augmentations, such as orthoskin.",
    ],
  },
});

const fingertip_compartment = headwareWireless({
  id: 'fingertip_compartment',
  label: 'Fingertip Compartment',
  cost: 3000,
  availability: 2,
  referenceOnly: true,
  description: 'A hollowed fingertip.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 0.1,
    cyberwareCapacityUsed: 1,
    effects: [
      'Holds micro-items.',
      'Popular for hiding a monofilament whip, using the fingertip as the control weight.',
      'Concealability threshold 8.',
    ],
    wirelessBonuses: [
      'Insert and retrieve becomes a Minor Action instead of a Major Action.',
      'Whip-spooling, when hiding a monofilament whip, also becomes a Minor Action.',
    ],
  },
});

const grapple_gun_implant = headware({
  id: 'grapple_gun_implant',
  label: 'Grapple Gun (Implanted)',
  cost: 5000,
  availability: 3,
  referenceOnly: true,
  description: 'As the standard grapple gun, implanted.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 0.5,
    cyberwareCapacityUsed: 4,
    // FLAG: `microwire` is a real item in sensors_security_survival.js,
    // but it's sold per 100m unit and this stores 60m — a partial unit
    // that a bare-id defaultAttachments reference can't express. Left
    // as an effect rather than forced into a reference that would
    // overstate what the player gets.
    effects: ['Stores 60m of microwire internally.'],
  },
});

const internal_air_tank = headwareWireless({
  id: 'internal_air_tank',
  label: 'Internal Air Tank',
  cost: null,
  costPerRating: 4500,
  availability: 2,
  referenceOnly: true,
  description: 'Replaces part of a lung.',
  tags: ['bodyware'],
  stats: {
    ratingRange: [1, 4],
    essenceCost: 0.25,
    cyberwareCapacityUsedPerRating: 1,
    effects: [
      'Hold your breath for up to Rating hours.',
      'Full Inhalation-toxin immunity while holding it.',
      'Refills in 5 minutes via the intake valve, or 6 hours of normal breathing.',
    ],
    wirelessBonuses: [
      'Activation and deactivation gain an extra Minor Action.',
      'Air level and purity are always known.',
    ],
  },
});

const muscle_replacement = headware({
  id: 'muscle_replacement',
  label: 'Muscle Replacement',
  cost: null,
  costPerRating: 30000,
  availability: 3,
  legality: 'licensed',
  referenceOnly: true,
  description: 'Vat-grown muscle plus skeletal reinforcement.',
  tags: ['bodyware'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.7,
    effects: [
      '+Rating to both Strength and Agility.',
      'Incompatible with muscle augmentation and muscle toner bioware.',
    ],
  },
});

const reaction_enhancers = headwareWireless({
  id: 'reaction_enhancers',
  label: 'Reaction Enhancers',
  cost: null,
  costPerRating: 15000,
  availability: 4,
  legality: 'licensed',
  referenceOnly: true,
  tags: ['bodyware'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.3,
    effects: [
      '+Rating to Reaction; adjust Initiative accordingly.',
      'Incompatible with other Reaction enhancements, including wired reflexes.',
    ],
    wirelessBonuses: ['Becomes compatible with a wireless-enabled Wired Reflexes system.'],
  },
});

const skillwires = headwareWireless({
  id: 'skillwires',
  label: 'Skillwires',
  cost: null,
  costPerRating: 20000,
  availability: 4,
  referenceOnly: true,
  description: 'A neuromuscular overlay controller.',
  tags: ['bodyware'],
  stats: {
    ratingRange: [1, 6],
    essencePerRating: 0.1,
    effects: [
      "Lets activesofts run at up to the skillwire's Rating.",
      'Requires an implanted skilljack.',
    ],
    wirelessBonuses: ['+1 dice pool on all skillwire-driven skill uses.'],
  },
});

const smuggling_compartment_bodyware = headwareWireless({
  id: 'smuggling_compartment_bodyware',
  label: 'Smuggling Compartment (Bodyware)',
  cost: 7500,
  availability: 3,
  referenceOnly: true,
  description: 'A hollowed body cavity.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 0.2,
    effects: [
      'Holds small or miniature items, up to about a light pistol.',
      'Concealability threshold 8.',
    ],
    wirelessBonuses: ['Insert and retrieve becomes a Minor Action instead of a Major Action.'],
  },
});

// Wired Reflexes 1-4 do NOT scale linearly (cost roughly quadruples per
// step, Availability jumps from L to I at rating 3) — 4 real items.

const wired_reflexes_1 = headwareWireless({
  id: 'wired_reflexes_1',
  label: 'Wired Reflexes 1',
  cost: 40000,
  availability: 3,
  legality: 'licensed',
  referenceOnly: true,
  description: 'Invasive neural and adrenaline boosters.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 1,
    effects: WIRED_REFLEXES_EFFECTS,
    wirelessBonuses: WIRED_REFLEXES_WIRELESS,
  },
});

const wired_reflexes_2 = headwareWireless({
  id: 'wired_reflexes_2',
  label: 'Wired Reflexes 2',
  cost: 150000,
  availability: 3,
  legality: 'licensed',
  referenceOnly: true,
  description: 'Invasive neural and adrenaline boosters.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 2,
    effects: WIRED_REFLEXES_EFFECTS,
    wirelessBonuses: WIRED_REFLEXES_WIRELESS,
  },
});

const wired_reflexes_3 = headwareWireless({
  id: 'wired_reflexes_3',
  label: 'Wired Reflexes 3',
  cost: 250000,
  availability: 4,
  legality: 'illegal',
  referenceOnly: true,
  description: 'Invasive neural and adrenaline boosters.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 3,
    effects: WIRED_REFLEXES_EFFECTS,
    wirelessBonuses: WIRED_REFLEXES_WIRELESS,
  },
});

const wired_reflexes_4 = headwareWireless({
  id: 'wired_reflexes_4',
  label: 'Wired Reflexes 4',
  cost: 400000,
  availability: 6,
  legality: 'illegal',
  referenceOnly: true,
  description: 'Invasive neural and adrenaline boosters.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 4,
    effects: WIRED_REFLEXES_EFFECTS,
    wirelessBonuses: WIRED_REFLEXES_WIRELESS,
  },
});

export const GEAR_AUGMENTATIONS = {
  biomonitor, docwagon_basic, docwagon_gold, docwagon_platinum, docwagon_super_platinum,
  disposable_syringe, medkit, medkit_supplies, antidote_patch, chem_patch, stim_patch, tranq_patch, trauma_patch,
  sim_module_integral, image_link_integral, sound_link_integral,
  commlink_implant, control_rig, cortex_kink_bomb, cortex_microbomb, cortex_area_bomb, cyberdeck_implant,
  cyberjack_1, cyberjack_2, cyberjack_3, cyberjack_4, cyberjack_5, cyberjack_6,
  datajack, datalock, olfactory_booster, simrig_implant, skilljack, taste_booster, tooth_compartment, ultrasound_sensor, voice_modulator,
  cybereyes_basic_1, cybereyes_basic_2, cybereyes_basic_3, cybereyes_basic_4, cybereyes_basic_5,
  flare_compensation, image_link_implant, low_light_vision_implant, ocular_drone, retinal_duplication,
  smartlink_implant, thermographic_vision_implant, vision_enhancement_implant, vision_magnification_implant,
  cyberears_basic_1, cyberears_basic_2, cyberears_basic_3, cyberears_basic_4, cyberears_basic_5,
  audio_enhancement_implant, balance_augmenter, damper, select_sound_filter, sound_link_implant, spatial_recognizer,
  bone_lacing_plastic, bone_lacing_aluminum, bone_lacing_titanium, dermal_plating, fingertip_compartment,
  grapple_gun_implant, internal_air_tank, muscle_replacement, reaction_enhancers, skillwires, smuggling_compartment_bodyware,
  wired_reflexes_1, wired_reflexes_2, wired_reflexes_3, wired_reflexes_4,
};

export const GEAR_AUGMENTATIONS_IDS = Object.keys(GEAR_AUGMENTATIONS);
