// Biotech Basics + Headware/Eyeware/Earware/Bodyware catalog.
// Same envelope as GEAR.js.
//
// Two new wrinkles this category needed:
//
// 1. DocWagon contracts are subscriptions, not one-time purchases —
//    `cost: null` with `stats.costMonthly`/`costYearly` instead of a
//    flat number, since "cost >= character.nuyen" doesn't make sense
//    for a recurring service.
// 2. Several "Rating 1-5" item families (Cybereyes/Cyberears basic,
//    Wired Reflexes) do NOT scale linearly — cost and Capacity jump
//    unevenly per rating (e.g. cybereyes cost 1000/4000/6000/10000/16000,
//    not a clean multiplier). Those are modeled as separate real items
//    per rating rather than forced into a costPerRating formula that
//    would just be wrong.
//
// Also worth flagging: the Grade system (standard/alphaware/betaware/
// deltaware/used — multiplies Essence/cost/Availability) applies
// globally to every cyberware item in this file AND in
// GEAR_CYBERWARE_BIOWARE.js. It's a purchase-time modifier, not
// per-item data, so it's exported once here as AUGMENTATION_GRADES
// rather than duplicated onto every item — though since it's genuinely
// shared across two files, it may want to move to a shared gear-utils
// file once we're wiring this into an actual purchase flow.

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
// Augmentations subsection), which doesn't currently cover them. Flagging
// as a real content gap, not solving it here.

function biotech(overrides) {
  return { category: 'biotech', legality: null, ...overrides };
}
function headware(overrides) {
  return { category: 'cyberware', legality: null, ...overrides };
}

// ---- Biotech Basics ----

const biomonitor = biotech({
  id: 'biomonitor',
  label: 'Biomonitor',
  cost: 300,
  availability: 2,
  description: 'Tracks heart rate/blood pressure/temperature, analyzes blood/sweat/skin samples. Worn or integrated into clothing/commlinks.',
  tags: ['biotech'],
  stats: {},
});

const docwagon_basic = biotech({
  id: 'docwagon_basic',
  label: 'DocWagon: Basic',
  cost: null,
  availability: 1,
  description: 'Armed trauma team arrival under 10 minutes in covered metro areas, or the emergency care is free. Resuscitation and HTR service each carry a 5,000¥ premium.',
  tags: ['biotech'],
  stats: {
    costMonthly: 500,
    costYearly: 5000,
  },
});

const docwagon_gold = biotech({
  id: 'docwagon_gold',
  label: 'DocWagon: Gold',
  cost: null,
  availability: 1,
  description: '1 free resuscitation/year, 50% off HTR, 10% off extended care.',
  tags: ['biotech'],
  stats: {
    costMonthly: 2500,
    costYearly: 25000,
  },
});

const docwagon_platinum = biotech({
  id: 'docwagon_platinum',
  label: 'DocWagon: Platinum',
  cost: null,
  availability: 1,
  description: '4 free resuscitations/year, 50% off extended care, free HTR (death compensation still applies).',
  tags: ['biotech'],
  stats: {
    costMonthly: 5000,
    costYearly: 50000,
  },
});

const docwagon_super_platinum = biotech({
  id: 'docwagon_super_platinum',
  label: 'DocWagon: Super-Platinum',
  cost: null,
  availability: 1,
  description: '5 free resuscitations/year, free HTR, no death compensation owed.',
  tags: ['biotech'],
  stats: {
    costMonthly: 10000,
    costYearly: 100000,
  },
});

const disposable_syringe = biotech({
  id: 'disposable_syringe',
  label: 'Disposable Syringe',
  cost: 10,
  availability: 2,
  description: 'Single-use, delivers Injection-vector toxins.',
  tags: ['biotech'],
  stats: {},
});

const medkit = biotech({
  id: 'medkit',
  label: 'Medkit',
  cost: null,
  costPerRating: 250,
  availability: 3,
  description: 'Drug supplies, bandages, tools, and a talkative expert-system doctor. Counts as a Kit for Biotech tests. Supplies consumed per use, up to 5 sets stored in the case.',
  tags: ['biotech'],
  stats: {
    ratingRange: [1, 6],
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
  description: 'Cancels/negates the Poisoned status for most toxins. Rare substances may need a matching specific antidote.',
  tags: ['biotech'],
  stats: {},
});

const chem_patch = biotech({
  id: 'chem_patch',
  label: 'Chem Patch',
  cost: 200,
  availability: 3,
  description: 'A "blank" patch loadable with one dose of any chemical/toxin.',
  tags: ['biotech'],
  stats: {},
});

const stim_patch = biotech({
  id: 'stim_patch',
  label: 'Stim Patch',
  cost: null,
  costPerRating: 25,
  availability: 3,
  description: 'Clears (rating) boxes of Stun damage and cancels Dazed; lasts (rating x 10) minutes, then deals (rating + 1) unresisted Stun damage. No resting while active.',
  tags: ['biotech'],
  stats: {
    ratingRange: [1, 6],
  },
});

const tranq_patch = biotech({
  id: 'tranq_patch',
  label: 'Tranq Patch',
  cost: null,
  availability: 3,
  description: 'Inflicts Stun damage equal to its rating, resisted by Body only.',
  tags: ['biotech'],
  stats: {
    ratingRange: [1, 12],
    costRatingSquaredMultiplier: 10, // cost = (Rating x Rating) x 10¥ — the one non-linear biotech cost
  },
});

const trauma_patch = biotech({
  id: 'trauma_patch',
  label: 'Trauma Patch',
  cost: 500,
  availability: 3,
  description: 'Heals 1d6+1 Overflow damage immediately on application. Always wireless, connects to the Matrix the instant it\'s applied.',
  tags: ['biotech'],
  stats: {},
});

// ---- Headware ----

const commlink_implant = headware({
  id: 'commlink_implant',
  label: 'Commlink (Implant)',
  cost: 2000,
  availability: 2,
  description: 'Implanted commlink with a free sim module; popular with corporate operatives. Devices under Device Rating 5 generally aren\'t installed in-skull for security reasons. Cost is the implant slot only — plus the price of the commlink device itself. Bricking: 6P (Body-resisted).',
  tags: ['headware'],
  stats: {
    essenceCost: 0.2,
    capacity: 2,
  },
});

const control_rig = headware({
  id: 'control_rig',
  label: 'Control Rig',
  cost: null,
  costPerRating: 30000,
  availability: 4,
  legality: 'licensed',
  description: 'Harnesses midbrain processing for direct rigged-vehicle/drone control. Built-in sim module (DNI), universal data connector. While jumped in: rating as a dice pool bonus/threshold reduction on vehicle operation tests, plus a bonus Edge point.',
  tags: ['headware'],
  stats: {
    ratingRange: [1, 3],
    essencePerRating: 1,
  },
});

const cortex_kink_bomb = headware({
  id: 'cortex_kink_bomb',
  label: 'Cortex Kink Bomb',
  cost: 10000,
  availability: 6,
  legality: 'illegal',
  description: 'Destroys specific headware or causes targeted trauma (blindness, stuttering, hearing loss). 5P, Body-resisted. Remote/time/sound-triggered.',
  tags: ['headware'],
  stats: {
    essenceCost: 0,
    capacity: 1,
  },
});

const cortex_microbomb = headware({
  id: 'cortex_microbomb',
  label: 'Cortex Microbomb',
  cost: 25000,
  availability: 6,
  legality: 'illegal',
  description: 'Kills the bearer. 18P, Body-resisted. Remote/time/sound-triggered.',
  tags: ['headware'],
  stats: {
    essenceCost: 0,
    capacity: 2,
  },
});

const cortex_area_bomb = headware({
  id: 'cortex_area_bomb',
  label: 'Cortex Area Bomb',
  cost: 40000,
  availability: 6,
  legality: 'illegal',
  description: 'Kills the bearer and detonates like a fragmentation grenade, damage resisted separately. Remote/time/sound-triggered.',
  tags: ['headware'],
  stats: {
    essenceCost: 0,
    capacity: 3,
  },
});

const cyberdeck_implant = headware({
  id: 'cyberdeck_implant',
  label: 'Cyberdeck (Implant)',
  cost: 5000,
  availability: 4,
  legality: 'licensed',
  description: 'An implanted deck, convenient for on-the-go hackers, common among government/military deckers. Cost is the implant slot only — plus the price of the cyberdeck itself. Bricking: 8P (Body-resisted).',
  tags: ['headware'],
  stats: {
    essenceCost: 0.4,
    capacity: 4,
  },
});

const cyberjacks = headware({
  id: 'cyberjacks',
  label: 'Cyberjacks',
  cost: null,
  availability: null,
  description: "Harness brain processing power for Matrix protocols/encryption. Provide Data Processing/Firewall ratings decks no longer have natively, double as a standard datajack, and enable special Matrix Edge Actions. Full stats live on the Matrix gear table (not yet built).",
  tags: ['headware'],
  stats: {},
});

const datajack = headware({
  id: 'datajack',
  label: 'Datajack',
  cost: 1000,
  availability: 2,
  description: 'DNI plus a retractable ~1m micro-cable for direct device interfacing, with its own storage cache. Two datajack users can string a private fiberoptic link immune to radio interception.',
  tags: ['headware'],
  stats: {
    essenceCost: 0.1,
  },
});

const datalock = headware({
  id: 'datalock',
  label: 'Datalock',
  cost: null,
  costPerRating: 1000,
  availability: 4,
  description: "Turns the bearer into a walking data safe; Device Rating = its own rating, protecting stored data from unauthorized access — even the bearer's own mental access. Not wireless-enabled.",
  tags: ['headware'],
  stats: {
    ratingRange: [1, 12],
    essenceCost: 0.1,
  },
});

const olfactory_booster = headware({
  id: 'olfactory_booster',
  label: 'Olfactory Booster',
  cost: null,
  costPerRating: 4000,
  availability: 3,
  description: 'Massively enhanced smell — emotions via sweat, tailored pheromone marks, propellant/explosive/chem-warfare traces — with a cutoff to ignore intense odors. Use-it-or-lose-it bonus Edge on scent Perception tests.',
  tags: ['headware'],
  stats: {
    ratingRange: [1, 3],
    essenceCost: 0.2,
  },
});

const simrig_implant = headware({
  id: 'simrig_implant',
  label: 'Simrig (Implant)',
  cost: 4000,
  availability: 4,
  legality: 'licensed',
  description: 'Implanted simsense recorder for later replay/sale.',
  tags: ['headware'],
  stats: {
    essenceCost: 0.2,
  },
});

const skilljack = headware({
  id: 'skilljack',
  label: 'Skilljack',
  cost: null,
  costPerRating: 20000,
  availability: 4,
  description: 'Interprets knowsofts/linguasofts as your own knowledge; can run activesofts too, but only as Knowledge Skills without skillwires. Total running skills capped at (rating x 2), single skill capped at the skilljack\'s rating. Can\'t Edge-boost skilljack-sourced skills.',
  tags: ['headware'],
  stats: {
    ratingRange: [1, 6],
    essencePerRating: 0.1,
  },
});

const taste_booster = headware({
  id: 'taste_booster',
  label: 'Taste Booster',
  cost: null,
  costPerRating: 3000,
  availability: 3,
  description: 'Like the olfactory booster, for taste — also enables AR/VR "taste tracks." Use-it-or-lose-it bonus Edge on taste Perception tests.',
  tags: ['headware'],
  stats: {
    ratingRange: [1, 3],
    essenceCost: 0.2,
  },
});

const tooth_compartment = headware({
  id: 'tooth_compartment',
  label: 'Tooth Compartment',
  cost: 800,
  availability: 4,
  description: 'Hollow tooth, storage (tiny items, <=5mm) or breakable (triggers a linked effect like a tracking signal or poison release). Opened via wireless signal, hidden catch, or a hard bite.',
  tags: ['headware'],
  stats: {
    essenceCost: 0,
  },
});

const ultrasound_sensor = headware({
  id: 'ultrasound_sensor',
  label: 'Ultrasound Sensor',
  cost: 3600,
  availability: 4,
  description: 'Implanted ultrasound; replaces normal vision when active, switchable between active sonar/passive sonar/off.',
  tags: ['headware'],
  stats: {
    essenceCost: 0.3,
    capacity: 2,
  },
});

const voice_modulator = headware({
  id: 'voice_modulator',
  label: 'Voice Modulator',
  cost: null,
  costPerRating: 5000,
  availability: 4,
  legality: 'licensed',
  description: 'Perfect pitch, huge vocal range/volume (up to 100 dB), near-perfect vocal impressions and playback of captured voices. Bonus Edge on sound-based Con tests.',
  tags: ['headware'],
  stats: {
    ratingRange: [1, 3],
    essenceCost: 0.2,
  },
});

// ---- Eyeware ----
// Cybereyes basic don't scale linearly — 5 real items, not a formula.

const cybereyes_basic_1 = headware({
  id: 'cybereyes_basic_1',
  label: 'Cybereyes, Basic (Rating 1)',
  cost: 1000,
  availability: 2,
  description: '20/20 vision both eyes, image link, built-in camera, plus enhancement Capacity.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.1,
    capacity: 1,
  },
});

const cybereyes_basic_2 = headware({
  id: 'cybereyes_basic_2',
  label: 'Cybereyes, Basic (Rating 2)',
  cost: 4000,
  availability: 2,
  description: '20/20 vision both eyes, image link, built-in camera, plus enhancement Capacity.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.2,
    capacity: 4,
  },
});

const cybereyes_basic_3 = headware({
  id: 'cybereyes_basic_3',
  label: 'Cybereyes, Basic (Rating 3)',
  cost: 6000,
  availability: 3,
  description: '20/20 vision both eyes, image link, built-in camera, plus enhancement Capacity.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.3,
    capacity: 8,
  },
});

const cybereyes_basic_4 = headware({
  id: 'cybereyes_basic_4',
  label: 'Cybereyes, Basic (Rating 4)',
  cost: 10000,
  availability: 3,
  description: '20/20 vision both eyes, image link, built-in camera, plus enhancement Capacity.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.4,
    capacity: 12,
  },
});

const cybereyes_basic_5 = headware({
  id: 'cybereyes_basic_5',
  label: 'Cybereyes, Basic (Rating 5)',
  cost: 16000,
  availability: 3,
  description: '20/20 vision both eyes, image link, built-in camera, plus enhancement Capacity.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.5,
    capacity: 16,
  },
});

const flare_compensation = headware({
  id: 'flare_compensation',
  label: 'Flare Compensation',
  cost: 1000,
  availability: 2,
  description: 'Implanted visual enhancement.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.1,
    capacity: 1,
  },
});

const image_link_implant = headware({
  id: 'image_link_implant',
  label: 'Image Link (Implant)',
  cost: 800,
  availability: 2,
  description: 'Implanted visual enhancement.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.1,
  },
});

const low_light_vision_implant = headware({
  id: 'low_light_vision_implant',
  label: 'Low-Light Vision (Implant)',
  cost: 1500,
  availability: 2,
  description: 'Implanted visual enhancement.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.1,
    capacity: 2,
  },
});

const ocular_drone = headware({
  id: 'ocular_drone',
  label: 'Ocular Drone',
  cost: 6000,
  availability: 3,
  description: 'Installs a small drone (treat as a Horizon Flying Eye) in the socket, functioning as a normal cybereye until removed and piloted separately. Removed: Blindness I in that eye (Blindness III if both are remote).',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.3,
    capacity: 6,
  },
});

const retinal_duplication = headware({
  id: 'retinal_duplication',
  label: 'Retinal Duplication',
  cost: null,
  costPerRating: 20000,
  availability: 5,
  legality: 'illegal',
  description: 'Loads a recorded retina scan for near-perfect impersonation against retinal scanners (Opposed test, duplication rating vs. scanner rating). Stores up to (rating) retinas; switching patterns takes 1 minute.',
  tags: ['eyeware'],
  stats: {
    ratingRange: [1, 6],
    essenceCost: 0.1,
    capacity: 1,
  },
});

const smartlink_implant = headware({
  id: 'smartlink_implant',
  label: 'Smartlink (Implant)',
  cost: 4000,
  availability: 3,
  legality: 'licensed',
  description: 'Implanted visual enhancement.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.2,
    capacity: 3,
  },
});

const thermographic_vision_implant = headware({
  id: 'thermographic_vision_implant',
  label: 'Thermographic Vision (Implant)',
  cost: 2000,
  availability: 2,
  description: 'Implanted visual enhancement.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.1,
    capacity: 2,
  },
});

const vision_enhancement_implant = headware({
  id: 'vision_enhancement_implant',
  label: 'Vision Enhancement (Implant)',
  cost: 4000,
  availability: 3,
  description: 'Implanted visual enhancement.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.1,
    capacity: 2,
  },
});

const vision_magnification_implant = headware({
  id: 'vision_magnification_implant',
  label: 'Vision Magnification (Implant)',
  cost: 2000,
  availability: 3,
  description: 'Implanted visual enhancement.',
  tags: ['eyeware'],
  stats: {
    essenceCost: 0.1,
    capacity: 2,
  },
});

// ---- Earware ----
// Cyberears basic also don't scale linearly — 5 real items.

const cyberears_basic_1 = headware({
  id: 'cyberears_basic_1',
  label: 'Cyberears, Basic (Rating 1)',
  cost: 1000,
  availability: 2,
  description: 'Normal-range hearing (like an omnidirectional mic), sound link, enhancement Capacity. Bonus Edge against hearing interference.',
  tags: ['earware'],
  stats: {
    essenceCost: 0.1,
    capacity: 1,
  },
});

const cyberears_basic_2 = headware({
  id: 'cyberears_basic_2',
  label: 'Cyberears, Basic (Rating 2)',
  cost: 3000,
  availability: 2,
  description: 'Normal-range hearing (like an omnidirectional mic), sound link, enhancement Capacity. Bonus Edge against hearing interference.',
  tags: ['earware'],
  stats: {
    essenceCost: 0.2,
    capacity: 4,
  },
});

const cyberears_basic_3 = headware({
  id: 'cyberears_basic_3',
  label: 'Cyberears, Basic (Rating 3)',
  cost: 4500,
  availability: 3,
  description: 'Normal-range hearing (like an omnidirectional mic), sound link, enhancement Capacity. Bonus Edge against hearing interference.',
  tags: ['earware'],
  stats: {
    essenceCost: 0.3,
    capacity: 8,
  },
});

const cyberears_basic_4 = headware({
  id: 'cyberears_basic_4',
  label: 'Cyberears, Basic (Rating 4)',
  cost: 7500,
  availability: 3,
  description: 'Normal-range hearing (like an omnidirectional mic), sound link, enhancement Capacity. Bonus Edge against hearing interference.',
  tags: ['earware'],
  stats: {
    essenceCost: 0.4,
    capacity: 12,
  },
});

const cyberears_basic_5 = headware({
  id: 'cyberears_basic_5',
  label: 'Cyberears, Basic (Rating 5)',
  cost: 11000,
  availability: 3,
  description: 'Normal-range hearing (like an omnidirectional mic), sound link, enhancement Capacity. Bonus Edge against hearing interference.',
  tags: ['earware'],
  stats: {
    essenceCost: 0.5,
    capacity: 16,
  },
});

const audio_enhancement_implant = headware({
  id: 'audio_enhancement_implant',
  label: 'Audio Enhancement (Implant)',
  cost: 4000,
  availability: 2,
  description: 'Implanted audio enhancement.',
  tags: ['earware'],
  stats: {
    essenceCost: 0.1,
    capacity: 1,
  },
});

const balance_augmenter = headware({
  id: 'balance_augmenter',
  label: 'Balance Augmenter',
  cost: 8000,
  availability: 3,
  description: '+1 die on balance-related tests — climbing, narrow platforms, landing jumps.',
  tags: ['earware'],
  stats: {
    essenceCost: 0.1,
    capacity: 4,
  },
});

const damper = headware({
  id: 'damper',
  label: 'Damper',
  cost: 2250,
  availability: 2,
  description: 'Reduces the Deafened status by 1 level whenever inflicted.',
  tags: ['earware'],
  stats: {
    essenceCost: 0.1,
    capacity: 1,
  },
});

const select_sound_filter = headware({
  id: 'select_sound_filter',
  label: 'Select Sound Filter',
  cost: null,
  costPerRating: 3500,
  availability: 4,
  description: 'Implanted sound filtering.',
  tags: ['earware'],
  stats: {
    ratingRange: [1, 6],
    essenceCost: 0.1,
    capacityPerRating: 1,
  },
});

const sound_link_implant = headware({
  id: 'sound_link_implant',
  label: 'Sound Link (Implant)',
  cost: 1000,
  availability: 2,
  description: 'Plays linked audio (PAN sources, headware memory, datajack) directly. Common in immersive AR.',
  tags: ['earware'],
  stats: {
    essenceCost: 0.1,
  },
});

const spatial_recognizer = headware({
  id: 'spatial_recognizer',
  label: 'Spatial Recognizer',
  cost: 4000,
  availability: 3,
  description: 'Implanted audio enhancement.',
  tags: ['earware'],
  stats: {
    essenceCost: 0.1,
    capacity: 2,
  },
});

// ---- Bodyware ----

const bone_lacing_plastic = headware({
  id: 'bone_lacing_plastic',
  label: 'Bone Lacing (Plastic)',
  cost: 8000,
  availability: 3,
  legality: 'licensed',
  description: 'Reinforcing lattice in the bones. Incompatible with other bone-affecting augmentations (e.g. bone density augmentation).',
  tags: ['bodyware'],
  stats: {
    essenceCost: 0.5,
    bodyBonus: 1,
    defenseRatingBonus: 1,
    unarmedDamageValue: '3P',
    unarmedAttackRatingBonus: 1,
  },
});

const bone_lacing_aluminum = headware({
  id: 'bone_lacing_aluminum',
  label: 'Bone Lacing (Aluminum)',
  cost: 18000,
  availability: 4,
  legality: 'licensed',
  description: 'Reinforcing lattice in the bones. Incompatible with other bone-affecting augmentations.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 1,
    bodyBonus: 2,
    defenseRatingBonus: 1,
    unarmedDamageValue: '4P',
    unarmedAttackRatingBonus: 2,
  },
});

const bone_lacing_titanium = headware({
  id: 'bone_lacing_titanium',
  label: 'Bone Lacing (Titanium)',
  cost: 30000,
  availability: 6,
  legality: 'licensed',
  description: 'Reinforcing lattice in the bones. Incompatible with other bone-affecting augmentations.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 1.5,
    bodyBonus: 2,
    defenseRatingBonus: 2,
    unarmedDamageValue: '4P',
    unarmedAttackRatingBonus: 3,
  },
});

const dermal_plating = headware({
  id: 'dermal_plating',
  label: 'Dermal Plating',
  cost: null,
  costPerRating: 4000,
  availability: 4,
  legality: 'licensed',
  description: "Visible bonded plates; +Defense Rating equal to rating. Can't combine with other skin-based Defense Rating augmentations (like orthoskin).",
  tags: ['bodyware'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.3,
  },
});

const fingertip_compartment = headware({
  id: 'fingertip_compartment',
  label: 'Fingertip Compartment',
  cost: 3000,
  availability: 2,
  description: 'Hollowed fingertip, holds micro-items. Concealability threshold 8. Popular for hiding a monofilament whip.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 0.1,
    capacity: 1,
  },
});

const grapple_gun_implant = headware({
  id: 'grapple_gun_implant',
  label: 'Grapple Gun (Implanted)',
  cost: 5000,
  availability: 3,
  description: 'As the standard grapple gun, with 60m of microwire stored internally.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 0.5,
    capacity: 4,
  },
});

const internal_air_tank = headware({
  id: 'internal_air_tank',
  label: 'Internal Air Tank',
  cost: null,
  costPerRating: 4500,
  availability: 2,
  description: 'Replaces part of a lung; hold your breath up to (rating) hours, full Inhalation-toxin immunity while holding it. Refill: 5 minutes via intake valve, or 6 hours of normal breathing.',
  tags: ['bodyware'],
  stats: {
    ratingRange: [1, 4],
    essenceCost: 0.25,
    capacityPerRating: 1,
  },
});

const muscle_replacement = headware({
  id: 'muscle_replacement',
  label: 'Muscle Replacement',
  cost: null,
  costPerRating: 30000,
  availability: 3,
  legality: 'licensed',
  description: 'Vat-grown muscle plus skeletal reinforcement; +rating to both Strength and Agility. Incompatible with muscle augmentation/muscle toner bioware.',
  tags: ['bodyware'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.7,
  },
});

const reaction_enhancers = headware({
  id: 'reaction_enhancers',
  label: 'Reaction Enhancers',
  cost: null,
  costPerRating: 15000,
  availability: 4,
  legality: 'licensed',
  description: '+rating to Reaction (adjust Initiative accordingly). Incompatible with other Reaction enhancements, including wired reflexes.',
  tags: ['bodyware'],
  stats: {
    ratingRange: [1, 4],
    essencePerRating: 0.3,
  },
});

const skillwires = headware({
  id: 'skillwires',
  label: 'Skillwires',
  cost: null,
  costPerRating: 20000,
  availability: 4,
  description: 'Neuromuscular overlay controllers; lets activesofts run at up to the skillwire\'s rating, but only via an implanted skilljack.',
  tags: ['bodyware'],
  stats: {
    ratingRange: [1, 6],
    essencePerRating: 0.1,
  },
});

const smuggling_compartment_bodyware = headware({
  id: 'smuggling_compartment_bodyware',
  label: 'Smuggling Compartment (Bodyware)',
  cost: 7500,
  availability: 3,
  description: 'Hollowed body cavity for small/miniature items, up to about a light pistol. Concealability threshold 8.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 0.2,
  },
});

// Wired Reflexes 1-4 do NOT scale linearly (cost roughly quadruples per
// step, Availability jumps from L to I at rating 3) — 4 real items.

const wired_reflexes_1 = headware({
  id: 'wired_reflexes_1',
  label: 'Wired Reflexes 1',
  cost: 40000,
  availability: 3,
  legality: 'licensed',
  description: 'Invasive neural/adrenaline boosters. Each rating: +1 Reaction (and Initiative Score) and +1 Initiative Die while active. Incompatible with other Reaction/Initiative augmentations.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 1,
  },
});

const wired_reflexes_2 = headware({
  id: 'wired_reflexes_2',
  label: 'Wired Reflexes 2',
  cost: 150000,
  availability: 3,
  legality: 'licensed',
  description: 'Invasive neural/adrenaline boosters. Each rating: +1 Reaction (and Initiative Score) and +1 Initiative Die while active. Incompatible with other Reaction/Initiative augmentations.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 2,
  },
});

const wired_reflexes_3 = headware({
  id: 'wired_reflexes_3',
  label: 'Wired Reflexes 3',
  cost: 250000,
  availability: 4,
  legality: 'illegal',
  description: 'Invasive neural/adrenaline boosters. Each rating: +1 Reaction (and Initiative Score) and +1 Initiative Die while active. Incompatible with other Reaction/Initiative augmentations.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 3,
  },
});

const wired_reflexes_4 = headware({
  id: 'wired_reflexes_4',
  label: 'Wired Reflexes 4',
  cost: 400000,
  availability: 6,
  legality: 'illegal',
  description: 'Invasive neural/adrenaline boosters. Each rating: +1 Reaction (and Initiative Score) and +1 Initiative Die while active. Incompatible with other Reaction/Initiative augmentations.',
  tags: ['bodyware'],
  stats: {
    essenceCost: 4,
  },
});

export const GEAR_AUGMENTATIONS = {
  biomonitor, docwagon_basic, docwagon_gold, docwagon_platinum, docwagon_super_platinum,
  disposable_syringe, medkit, medkit_supplies, antidote_patch, chem_patch, stim_patch, tranq_patch, trauma_patch,
  commlink_implant, control_rig, cortex_kink_bomb, cortex_microbomb, cortex_area_bomb, cyberdeck_implant, cyberjacks,
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
