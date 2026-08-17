// Auditory Devices, Sensors, Security & Survival Gear catalog.
// Same envelope as GEAR.js.
//
// New wrinkle here: several items are priced per unit of length rather
// than per unit or per rating (Microwire is 50¥ per 100m, Myomeric rope
// 200¥ per 10m). Modeled as `costPerUnit` + `unitLength` rather than a
// flat cost, similar spirit to costPerRating but the scaling axis is
// meters, not a purchased Rating.
//
// Also: Sensor Functions (Atmosphere sensor, Motion sensor, etc.) and
// Sensor Packages (max rating by housing type) aren't separately priced
// SKUs — every function costs the same as whatever generic sensor slot
// it's loaded into (Single Sensor / Sensor Array). They're exported as
// reference constants instead of gear items, since "buying" one really
// means configuring an already-purchased sensor housing.

function sensorHousing(overrides) {
  return { category: 'sensor_housing', legality: null, ...overrides };
}
function security(overrides) {
  return { category: 'security', legality: null, ...overrides };
}
function tool(overrides) {
  return { category: 'tool', legality: null, ...overrides };
}
function survival(overrides) {
  return { category: 'survival', legality: null, ...overrides };
}

// ---- Auditory Devices ----

const directional_microphone = sensorHousing({
  id: 'directional_microphone',
  label: 'Directional Microphone',
  cost: null,
  costPerCapacity: 50,
  availability: 2,
  description: 'Eavesdrops up to 100m away, must be pointed at the target. Solid objects/loud sound interfere.',
  tags: ['auditory'],
  stats: {
    capacityRange: [1, 6],
  },
});

const earbuds = sensorHousing({
  id: 'earbuds',
  label: 'Earbuds',
  cost: null,
  costPerCapacity: 50,
  availability: 1,
  description: 'Hard to spot, near-indistinguishable from standard commlink/music-player earbuds.',
  tags: ['auditory'],
  stats: {
    capacityRange: [1, 3],
  },
});

const headphones = sensorHousing({
  id: 'headphones',
  label: 'Headphones',
  cost: null,
  costPerCapacity: 50,
  availability: 1,
  description: 'Full headset, bulkier but more Capacity.',
  tags: ['auditory'],
  stats: {
    capacityRange: [1, 6],
  },
});

const laser_mic = sensorHousing({
  id: 'laser_mic',
  label: 'Laser Mic',
  cost: null,
  costPerCapacity: 100,
  availability: 2,
  description: 'Bounces a laser off a solid surface (like a windowpane) to read vibrations as sound. Max range 100m.',
  tags: ['auditory'],
  stats: {
    capacityRange: [1, 6],
  },
});

const omnidirectional_mic = sensorHousing({
  id: 'omnidirectional_mic',
  label: 'Omnidirectional Mic',
  cost: null,
  costPerCapacity: 50,
  availability: 1,
  description: 'Standard pickup, usually built into/linked with a commlink. Micro version is Capacity 1 only, max range 5m.',
  tags: ['auditory'],
  stats: {
    capacityRange: [1, 6],
  },
});

const audio_enhancement = sensorHousing({
  id: 'audio_enhancement',
  label: 'Audio Enhancement',
  cost: 500,
  availability: 1,
  description: 'Hear beyond normal frequency range, fine nuance discrimination, block distracting noise. +1 dice pool on aural Perception tests.',
  tags: ['auditory'],
  stats: {
    capacity: 1,
  },
});

const select_sound_filter_device = sensorHousing({
  id: 'select_sound_filter_device',
  label: 'Select Sound Filter (Device)',
  cost: null,
  costPerRating: 250,
  availability: 3,
  description: 'Blocks background noise, focuses on chosen sound patterns (up to rating of them loaded). Actively listens to one group at a time, records/alerts on the rest. Standalone version — see also the implanted headware version.',
  tags: ['auditory'],
  stats: {
    ratingRange: [1, 3],
    capacityPerRating: 1,
  },
});

const spatial_recognizer_device = sensorHousing({
  id: 'spatial_recognizer_device',
  label: 'Spatial Recognizer (Device)',
  cost: 1000,
  availability: 2,
  description: "Pinpoints a sound's source; use-it-or-lose-it bonus Edge on the relevant Perception test. Standalone version — see also the implanted headware version.",
  tags: ['auditory'],
  stats: {
    capacity: 2,
  },
});

// ---- Sensors ----

const handheld_housing = sensorHousing({
  id: 'handheld_housing',
  label: 'Handheld Housing',
  cost: null,
  costPerCapacity: 100,
  availability: 1,
  description: 'Portable sensor housing.',
  tags: ['sensor'],
  stats: {
    capacityRange: [1, 3],
  },
});

const wall_mounted_housing = sensorHousing({
  id: 'wall_mounted_housing',
  label: 'Wall-Mounted Housing',
  cost: null,
  costPerCapacity: 250,
  availability: 1,
  description: 'Fixed sensor housing.',
  tags: ['sensor'],
  stats: {
    capacityRange: [1, 6],
  },
});

const sensor_array = sensorHousing({
  id: 'sensor_array',
  label: 'Sensor Array',
  cost: null,
  costPerRating: 1000,
  availability: 3,
  description: 'Multiple sensor functions, one per rating point, purchased separately. Using it for Perception substitutes the sensor rating for the Perception skill.',
  tags: ['sensor'],
  stats: {
    ratingRange: [2, 8],
  },
});

const single_sensor = sensorHousing({
  id: 'single_sensor',
  label: 'Single Sensor',
  cost: null,
  costPerRating: 100,
  availability: 2,
  description: 'One sensor function (see SENSOR_FUNCTIONS for the available list and max ranges).',
  tags: ['sensor'],
  stats: {
    capacity: 1,
    ratingRange: [1, 8],
  },
});

// Reference data, not purchasable items — see file header note.

export const SENSOR_PACKAGE_MAX_RATING = [
  { housing: 'RFID, audio/visual device, headware', maxRating: 2 },
  { housing: 'Handheld device, small (or smaller) drone', maxRating: 3 },
  { housing: 'Wall-mounted device, medium drone', maxRating: 4 },
  { housing: 'Large drone, cyberlimb', maxRating: 5 },
  { housing: 'Motorcycle', maxRating: 6 },
  { housing: 'Vehicle (larger than a motorcycle)', maxRating: 7 },
  { housing: 'Building, complex', maxRating: 8 },
];

export const SENSOR_FUNCTIONS = [
  { label: 'Atmosphere sensor', maxRange: null, description: 'Real-time local weather/air analysis.' },
  { label: 'Camera', maxRange: 'Line of sight' },
  { label: 'Cyberware scanner', maxRange: 15, description: 'Millimeter-wave scan for implants/contraband; finds location only, not type.' },
  { label: 'Directional microphone', maxRange: null },
  { label: 'Geiger counter', maxRange: null, description: 'Radioactivity detection.' },
  { label: 'Laser microphone', maxRange: 100 },
  { label: 'Laser range finder', maxRange: 1000, description: 'Laser-reflection distance measurement.' },
  { label: 'MAD scanner', maxRange: 5, description: 'Detects weapons/metal concentrations.' },
  { label: 'Motion sensor', maxRange: 25, description: 'Ultrasound + low-power infrared for motion/temperature-change detection.' },
  { label: 'Olfactory sensor', maxRange: null, description: 'Airborne molecule analysis, functions like olfactory booster cyberware.' },
  { label: 'Omnidirectional microphone', maxRange: null },
  { label: 'Ultrasound', maxRange: 50, description: 'Active emitter/receiver builds a topographic map, sees past Invisibility. Blocked by optically-transparent materials like glass.' },
];

// ---- Security Devices ----

const containment_manacles = security({
  id: 'containment_manacles',
  label: 'Containment Manacles',
  cost: 250,
  availability: 3,
  description: 'Wrist+ankle restraint, restricts to 2m Move/3m Sprint and blocks cyber-implant weapon extension.',
  tags: ['security'],
  stats: {
    structure: 10,
  },
});

const key_lock = security({
  id: 'key_lock',
  label: 'Lock (Key)',
  cost: null,
  costPerRating: 10,
  availability: 2,
  description: "Old-fashioned, cheap, still around where tech hasn't caught up. Bypass with Engineering + Agility (Rating).",
  tags: ['security'],
  stats: {
    ratingRange: [1, 6],
  },
});

const maglock = security({
  id: 'maglock',
  label: 'Maglock',
  cost: null,
  costPerRating: 100,
  availability: 3,
  description: 'Electronic, electromagnet-sealed, biometric/keycard/passcard/RFID access options.',
  tags: ['security'],
  stats: {
    ratingRange: [1, 9],
  },
});

const keypad = security({
  id: 'keypad',
  label: 'Keypad',
  cost: 50,
  availability: 1,
  description: 'Maglock access option.',
  tags: ['security'],
  stats: {},
});

const card_reader = security({
  id: 'card_reader',
  label: 'Card Reader',
  cost: 50,
  availability: 1,
  description: 'Maglock access option.',
  tags: ['security'],
  stats: {},
});

const biometric_reader = security({
  id: 'biometric_reader',
  label: 'Biometric Reader',
  cost: 200,
  availability: 2,
  description: 'Maglock access option.',
  tags: ['security'],
  stats: {},
});

const metal_restraints = security({
  id: 'metal_restraints',
  label: 'Metal Restraints',
  cost: 20,
  availability: 1,
  description: 'Mechanical or wireless lock.',
  tags: ['security'],
  stats: {
    structure: 10,
  },
});

const plasteel_restraints = security({
  id: 'plasteel_restraints',
  label: 'Plasteel Restraints',
  cost: 50,
  availability: 2,
  description: 'Flash-fused, cut-only release.',
  tags: ['security'],
  stats: {
    structure: 12,
  },
});

const plastic_straps = security({
  id: 'plastic_straps',
  label: 'Plastic Straps (10)',
  cost: 5,
  availability: 1,
  description: 'Lightweight, disposable.',
  tags: ['security'],
  stats: {
    structure: 6,
  },
});

// ---- Breaking and Entering Gear ----

const autopicker = tool({
  id: 'autopicker',
  label: 'Autopicker',
  cost: 500,
  availability: 4,
  legality: 'licensed',
  description: 'Lockpick gun; +1 dice pool on mechanical lock-picking tests.',
  tags: ['breaking_entering'],
  stats: {},
});

const cellular_glove_molder = tool({
  id: 'cellular_glove_molder',
  label: 'Cellular Glove Molder',
  cost: null,
  costPerRating: 500,
  availability: 6,
  legality: 'illegal',
  description: 'Molds a print-mimicking "sleeve" from a lifted finger/palm print, fooling biometric locks.',
  tags: ['breaking_entering'],
  stats: {
    ratingRange: [1, 4],
  },
});

const chisel_wrecking_bar = tool({
  id: 'chisel_wrecking_bar',
  label: 'Chisel/Wrecking Bar',
  cost: 20,
  availability: 1,
  description: 'Doubles effective Strength when forcing a door/lock/container.',
  tags: ['breaking_entering'],
  stats: {},
});

const keycard_copier = tool({
  id: 'keycard_copier',
  label: 'Keycard Copier',
  cost: 600,
  availability: 4,
  legality: 'illegal',
  description: 'Copies a keycard in seconds; manufacturing a working duplicate needs an Electronics Kit + Electronics + Logic (2, 10 minutes) test. Some systems flag suspicious duplicate-key usage patterns.',
  tags: ['breaking_entering'],
  stats: {},
});

const lockpick_set = tool({
  id: 'lockpick_set',
  label: 'Lockpick Set',
  cost: 250,
  availability: 2,
  description: 'The classic mechanical burglary toolkit.',
  tags: ['breaking_entering'],
  stats: {},
});

const maglock_passkey = tool({
  id: 'maglock_passkey',
  label: 'Maglock Passkey',
  cost: null,
  costPerRating: 2000,
  availability: 3,
  legality: 'illegal',
  description: 'A maglock "skeleton key" fooling any cardreader-based maglock.',
  tags: ['breaking_entering'],
  stats: {
    ratingRange: [1, 4],
  },
});

const miniwelder = tool({
  id: 'miniwelder',
  label: 'Miniwelder',
  cost: 250,
  availability: 1,
  description: 'Small electric-arc cutting/welding tool, 30 minutes of power. Too small to be a good weapon, but DV 6 against barriers.',
  tags: ['breaking_entering'],
  stats: {
    damageValue: '6',
    target: 'barriers',
  },
});

const miniwelder_fuel_canister = tool({
  id: 'miniwelder_fuel_canister',
  label: 'Miniwelder Fuel Canister',
  cost: 80,
  availability: 1,
  description: 'Refill for the miniwelder.',
  tags: ['breaking_entering'],
  stats: {},
});

const monofilament_chainsaw = tool({
  id: 'monofilament_chainsaw',
  label: 'Monofilament Chainsaw',
  cost: 500,
  availability: 3,
  description: 'Monofilament-toothed portable saw for trees/doors/immovable objects. Not a viable melee weapon (no skill for it), DV 8 against barriers.',
  tags: ['breaking_entering'],
  stats: {
    damageValue: '8',
    target: 'barriers',
  },
});

const sequencer = tool({
  id: 'sequencer',
  label: 'Sequencer',
  cost: null,
  costPerRating: 250,
  availability: 4,
  legality: 'illegal',
  description: 'Defeats keypad-maglocks.',
  tags: ['breaking_entering'],
  stats: {
    ratingRange: [1, 6],
  },
});

// ---- Industrial Chemicals ----

const glue_solvent = tool({
  id: 'glue_solvent',
  label: 'Glue Solvent',
  cost: 90,
  availability: 1,
  description: 'Dissolves ~1 sq m of the fast-drying superglue below.',
  tags: ['industrial_chemical'],
  stats: {},
});

const glue_sprayer = tool({
  id: 'glue_sprayer',
  label: 'Glue Sprayer',
  cost: 150,
  availability: 1,
  description: 'Fast-drying aerosol superglue, ~1 sq m per can, hardens in 1 combat round. Resisting forced separation is a Body + Strength (5) Opposed test.',
  tags: ['industrial_chemical'],
  stats: {},
});

const thermite_burning_bar = tool({
  id: 'thermite_burning_bar',
  label: 'Thermite Burning Bar',
  cost: 500,
  availability: 5,
  legality: 'licensed',
  description: 'Melts through iron/steel/plasteel. Too slow/careful to use as a weapon except against someone already incapacitated.',
  tags: ['industrial_chemical'],
  stats: {
    damageValue: '10P(fire)',
  },
});

// ---- Survival Gear ----

const chemsuit = survival({
  id: 'chemsuit',
  label: 'Chemsuit',
  cost: null,
  costPerRating: 150,
  availability: 4,
  description: 'Impermeable coverall worn over clothes/armor, providing Chemical Protection. Not vacuum-sealed like a full hazmat suit.',
  tags: ['survival'],
  stats: {
    ratingRange: [1, 6],
  },
});

const climbing_gear = survival({
  id: 'climbing_gear',
  label: 'Climbing Gear',
  cost: 200,
  availability: 1,
  description: '100m rope (400kg test), harness, gloves, carabiners, crampons, pitons, etc.',
  tags: ['survival'],
  stats: {},
});

const diving_gear = survival({
  id: 'diving_gear',
  label: 'Diving Gear',
  cost: 2000,
  availability: 3,
  description: 'Wetsuit, partial facemask + snorkel, regulator, 2-hour air tank (+50¥/extra tank), inflatable surface vest. Wetsuit gives Rating 2 Cold Resistance.',
  tags: ['survival'],
  stats: {},
});

const flashlight = survival({
  id: 'flashlight',
  label: 'Flashlight',
  cost: 25,
  availability: 1,
  description: 'Long-lasting, bright. Low-light and infrared versions available; mountable on a weapon.',
  tags: ['survival'],
  stats: {},
});

const gas_mask = survival({
  id: 'gas_mask',
  label: 'Gas Mask',
  cost: 200,
  availability: 1,
  description: "Full-face air-supplied re-breather, immunity to Inhalation-vector toxins. 1-hour clean air (40¥ refills). Can't combine with a regular respirator.",
  tags: ['survival'],
  stats: {},
});

const gecko_tape_gloves = survival({
  id: 'gecko_tape_gloves',
  label: 'Gecko Tape Gloves',
  cost: 250,
  availability: 3,
  description: 'Microscopic-hair dry adhesive set enabling assisted climbing on nearly any surface. Useless when wet.',
  tags: ['survival'],
  stats: {},
});

const hazmat_suit = survival({
  id: 'hazmat_suit',
  label: 'Hazmat Suit',
  cost: 3000,
  availability: 3,
  description: 'Full-body, 4-hour internal air, full chemical seal, blocks Contact/Inhalation toxins. Standard sensor slot (often a Geiger counter, bought separately).',
  tags: ['survival'],
  stats: {},
});

const light_stick = survival({
  id: 'light_stick',
  label: 'Light Stick',
  cost: 25,
  availability: 1,
  description: '3 hours of soft chemical light, 10m radius.',
  tags: ['survival'],
  stats: {},
});

const magnesium_torch_flare = survival({
  id: 'magnesium_torch_flare',
  label: 'Magnesium Torch/Flare',
  cost: 5,
  availability: 1,
  description: '5 minutes of bright torchlight to 20m. Striking someone with it does 3P Fire damage.',
  tags: ['survival'],
  stats: {
    damageValue: '3P(fire)',
  },
});

const microflare_launcher = survival({
  id: 'microflare_launcher',
  label: 'Microflare Launcher',
  cost: 175,
  availability: 1,
  description: 'Fires colored flares 200m up, illuminating a city-block-sized area for a couple minutes. Hitting a person is an untrained skill check, 3P Fire damage.',
  tags: ['survival'],
  stats: {
    damageValue: '3P(fire)',
  },
});

const microflares = survival({
  id: 'microflares',
  label: 'Microflares',
  cost: 25,
  availability: 1,
  description: 'Ammunition for the microflare launcher.',
  tags: ['survival'],
  stats: {},
});

const rappelling_gloves = survival({
  id: 'rappelling_gloves',
  label: 'Rappelling Gloves',
  cost: 50,
  availability: 1,
  description: 'Better grip on a grapple line, use-it-or-lose-it bonus Edge on grip tests. Required to safely use microwire or stealth rope.',
  tags: ['survival'],
  stats: {},
});

const respirator = survival({
  id: 'respirator',
  label: 'Respirator',
  cost: null,
  costPerRating: 50,
  availability: 1,
  description: 'Filter mask, blocks Inhalation-vector toxins, adds its rating as a dice pool bonus resisting them.',
  tags: ['survival'],
  stats: {
    ratingRange: [1, 6],
  },
});

const survival_kit = survival({
  id: 'survival_kit',
  label: 'Survival Kit',
  cost: 200,
  availability: 2,
  description: 'Knife, lighter, matches, compass, string saw, thermal blanket, 7 days of soy ration bars, water purifier, fishing line/hook, and more.',
  tags: ['survival'],
  stats: {},
});

// ---- Grapple Gun family ----

const grapple_gun = survival({
  id: 'grapple_gun',
  label: 'Grapple Gun',
  cost: 500,
  availability: 3,
  description: 'Fires a grappling hook/rope up to 60m or 100m (line-dependent). Firearms test threshold to hit = (Range/20, rounded up). Internal winch retracts the line or hauls loads up to 10kg. Usable untrained as a weapon.',
  tags: ['grapple_gun_family'],
  stats: {
    damageValue: '1S',
    attackRatings: [1, null, null, null, null],
    skill: 'firearms',
  },
});

const microwire = survival({
  id: 'microwire',
  label: 'Microwire',
  cost: null,
  costPerUnit: 50,
  unitLength: 100,
  availability: 2,
  description: 'Extremely thin near-monofilament rope, fires to 100m, supports up to 100kg. Nearly invisible (Perception threshold 6); only safely gripped with rappelling gloves, otherwise inflicts 5P damage.',
  tags: ['grapple_gun_family'],
  stats: {},
});

const myomeric_rope = survival({
  id: 'myomeric_rope',
  label: 'Myomeric Rope',
  cost: null,
  costPerUnit: 200,
  unitLength: 10,
  availability: 4,
  description: 'Special fiber, remotely controllable movement (up to 30m length, 2m/round), can wind around obstacles or tie itself off.',
  tags: ['grapple_gun_family'],
  stats: {},
});

const standard_rope = survival({
  id: 'standard_rope',
  label: 'Standard Rope',
  cost: null,
  costPerUnit: 50,
  unitLength: 100,
  availability: 1,
  description: 'Reaches 60m, supports up to 400kg.',
  tags: ['grapple_gun_family'],
  stats: {},
});

const stealth_rope = survival({
  id: 'stealth_rope',
  label: 'Stealth Rope',
  cost: null,
  costPerUnit: 85,
  unitLength: 100,
  availability: 3,
  legality: 'illegal',
  description: 'Reaches 60m, supports up to 400kg. Dissolves to dust (near-traceless) when touched with a catalyst stick.',
  tags: ['grapple_gun_family'],
  stats: {},
});

const catalyst_stick = survival({
  id: 'catalyst_stick',
  label: 'Catalyst Stick',
  cost: 120,
  availability: 3,
  legality: 'illegal',
  description: 'Reusable — dissolves stealth rope on contact.',
  tags: ['grapple_gun_family'],
  stats: {},
});

export const GEAR_SENSORS_SECURITY_SURVIVAL = {
  directional_microphone, earbuds, headphones, laser_mic, omnidirectional_mic,
  audio_enhancement, select_sound_filter_device, spatial_recognizer_device,
  handheld_housing, wall_mounted_housing, sensor_array, single_sensor,
  containment_manacles, key_lock, maglock, keypad, card_reader, biometric_reader, metal_restraints, plasteel_restraints, plastic_straps,
  autopicker, cellular_glove_molder, chisel_wrecking_bar, keycard_copier, lockpick_set, maglock_passkey, miniwelder, miniwelder_fuel_canister, monofilament_chainsaw, sequencer,
  glue_solvent, glue_sprayer, thermite_burning_bar,
  chemsuit, climbing_gear, diving_gear, flashlight, gas_mask, gecko_tape_gloves, hazmat_suit, light_stick, magnesium_torch_flare, microflare_launcher, microflares, rappelling_gloves, respirator, survival_kit,
  grapple_gun, microwire, myomeric_rope, standard_rope, stealth_rope, catalyst_stick,
};

export const GEAR_SENSORS_SECURITY_SURVIVAL_IDS = Object.keys(GEAR_SENSORS_SECURITY_SURVIVAL);
