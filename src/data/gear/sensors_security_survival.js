// Auditory Devices, Sensors, Security & Survival Gear catalog.
// Same envelope as GEAR.js.
//
// Verified against 13d-gear-sensors-security-survival.md (Gear Part 4,
// pp. 275-281) in full, front to back.
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
//
// `wireless: true` marks items whose readings/function only matter
// because they transmit somewhere (AR display, alert, remote read,
// RFID access), not just "has Capacity" or "is electronic." Auditory/
// Sensor housings are wireless as a family — the Sensor Package table
// itself groups them with RFID/headware/commlinks as the same
// compatible-device family the PAN rules describe. Security devices and
// Breaking/Entering tools are split by whether they manipulate an
// electronic/RFID signal (wireless) or are purely mechanical (not).
// CORRECTION: the line below used to claim Survival Gear has NO
// wireless items at all. That was wrong — it was written from the
// condensed descriptions, not the source prose, which is exactly the
// blind spot this whole project pass exists to catch. Gas Mask, Gecko
// Tape Gloves, and Hazmat Suit all have real "Wireless bonus:" text in
// source and are marked `wireless: true` accordingly. See the PAN
// conversation for the rest of the per-item reasoning.
//
// CAPACITY FIELD SPLIT: per the project-wide convention, all Capacity
// here — auditory device housings, audio enhancements, sensor
// housings, and the sensor array/single sensor's own capacity cost —
// falls into the same "electronics/optical" pool established in
// armor_electronics.js (that file's capacity-split note explicitly
// groups sensor housings into the same pool as glasses/goggles), so it
// uses the same `deviceCapacityProvided[Range]` (housings) /
// `deviceCapacityUsed[PerRating]` (things installed into them) fields,
// not a separate audio-specific pool.
//
// ============================================================================
// SCHEMA PASS 2 (the resolved-decisions pass) — applied on top of
// everything in PASS 1 below:
//
// D1. `referenceOnly: true` — a new item-root boolean meaning "no stat
//     field on this item lets the app apply ANY of its effects; a human
//     adjudicates all of them." The test is deliberately mechanical so
//     it isn't a per-item judgment call: an effect is BACKED only if a
//     live computed field drives it — `damageValue`, `attackRatings`,
//     `skill`, `structure`, `structuralArmor`, `flatDicePool`,
//     `deviceModifiers`, or a `deviceCapacityProvided/Used` field.
//     Purchase-time configuration (`ratingRange`, `costPer*`,
//     `deviceRating`) does NOT count, since nothing reads it at play
//     time. Item-level rather than per-entry, because per-entry would
//     force `effects` entries to become objects and reverse the
//     plain-string decision. 39 of the 48 items with effects qualify;
//     the 9 that don't each carry a comment saying what backs them.
// D2. BALLISTIC TENTS get `structuralArmor` + `structure` instead of
//     the orphan `armorRating`, and lose `stats.size`. See the comment
//     at the items themselves.
// D3. `skill` MOVED TO THE ITEM ROOT on `grapple_gun`.
// D4. CARD READER IS NO LONGER WIRELESS; Metal Restraints keeps its
//     flag. See the comments at both items.
// D5. `defaultAttachments` on CLIMBING GEAR and DIVING GEAR. Hazmat
//     Suit deliberately gets none and takes `deviceCapacityProvided: 1`
//     instead.
//
// SCHEMA PASS 1 — the original array/omittable-description pass:
//
// S1. `wirelessBonus` -> `wirelessBonuses`, and mechanical prose
//     extracted from `description` into a new `effects` — both ARRAYS
//     of plain strings, one distinct mechanic per entry, ordered active
//     mechanics first and restrictions/compatibility last. This file
//     was unusually prose-heavy: nearly every description here was
//     load-bearing rules text with a sentence of flavor wrapped around
//     it, so the extraction is larger than in armor_electronics.js.
// S2. `description` IS NOW OMITTABLE — delete it and lose no gameplay
//     information. Numbers already in a structured field are NOT
//     restated in `effects`: the Miniwelder's and Monofilament
//     Chainsaw's barrier DV live only in `damageValue`/`target`, each
//     housing's Capacity only in `deviceCapacityProvided[Range]`, and
//     the Sensor Array's Capacity cost only in
//     `deviceCapacityUsedEqualsRating`.
// S3. VARIANT SPLIT: Omnidirectional Mic's description buried a "micro
//     version" with a DIFFERENT fixed Capacity (1, not the 1-6 range)
//     and a DIFFERENT max range (5m). Two fixed, non-Rating-scaled
//     differences at once, so it's a real separate purchase — split
//     out as `omnidirectional_mic_micro`. Direct precedent: the same
//     source pattern already produced a standalone `micro_camera` in
//     armor_electronics.js rather than a note on `camera`.
// S4. NO `defaultAttachments` AND NO `builtIn` ITEMS IN THIS FILE.
//     Several items describe INCLUDED equipment (Climbing Gear's rope,
//     Diving Gear's Cold Resistance wetsuit, Hazmat Suit's sensor
//     slot), but each either explicitly says the component is bought
//     separately or differs from the standalone catalog item's own
//     stats. Flagged in the summary rather than forced into references
//     that would misstate what the player actually gets.
// ============================================================================

// Shared by both Ballistic Tent variants — identical deployment and
// camouflage behaviour, differing only in armor and price.
const BALLISTIC_TENT_EFFECTS = [
  'Self-inflating and steel-strutted; deployable in under 3 minutes.',
  '+2 dice on Stealth tests when set against a building — the fabric doubles as urban camouflage.',
];

function sensorHousing(overrides) {
  return { category: 'sensor_housing', legality: null, image: null, ...overrides };
}
function sensorHousingWireless(overrides) {
  return sensorHousing({ wireless: true, ...overrides });
}
function security(overrides) {
  return { category: 'security', legality: null, image: null, ...overrides };
}
function securityWireless(overrides) {
  return security({ wireless: true, ...overrides });
}
function tool(overrides) {
  return { category: 'tool', legality: null, image: null, ...overrides };
}
function toolWireless(overrides) {
  return tool({ wireless: true, ...overrides });
}
function survival(overrides) {
  return { category: 'survival', legality: null, image: null, ...overrides };
}
function survivalWireless(overrides) {
  return survival({ wireless: true, ...overrides });
}

// ---- Auditory Devices ----

const directional_microphone = sensorHousingWireless({
  id: 'directional_microphone',
  label: 'Directional Microphone',
  cost: null,
  costPerCapacity: 50,
  availability: 2,
  referenceOnly: true,
  tags: ['auditory'],
  stats: {
    deviceCapacityProvidedRange: [1, 6],
    effects: [
      'Eavesdrops on targets up to 100m away.',
      'Must be pointed at the target.',
      'Solid objects and loud ambient sound interfere.',
    ],
  },
});

const earbuds = sensorHousingWireless({
  id: 'earbuds',
  label: 'Earbuds',
  cost: null,
  costPerCapacity: 50,
  availability: 1,
  description: 'Hard to spot, and near-indistinguishable from standard commlink or music-player earbuds.',
  tags: ['auditory'],
  stats: {
    deviceCapacityProvidedRange: [1, 3],
  },
});

const headphones = sensorHousingWireless({
  id: 'headphones',
  label: 'Headphones',
  cost: null,
  costPerCapacity: 50,
  availability: 1,
  description: 'A full headset — bulkier than earbuds, and it shows.',
  tags: ['auditory'],
  stats: {
    deviceCapacityProvidedRange: [1, 6],
  },
});

const laser_mic = sensorHousingWireless({
  id: 'laser_mic',
  label: 'Laser Mic',
  cost: null,
  costPerCapacity: 100,
  availability: 2,
  referenceOnly: true,
  tags: ['auditory'],
  stats: {
    deviceCapacityProvidedRange: [1, 6],
    effects: [
      'Bounces a laser off a solid surface, such as a windowpane, to read its vibrations as sound.',
      'Maximum range 100m.',
    ],
  },
});

const omnidirectional_mic = sensorHousingWireless({
  id: 'omnidirectional_mic',
  label: 'Omnidirectional Mic',
  cost: null,
  costPerCapacity: 50,
  availability: 1,
  description: 'The standard pickup, usually built into or linked with a commlink.',
  referenceOnly: true,
  tags: ['auditory'],
  stats: {
    deviceCapacityProvidedRange: [1, 6],
    effects: ['Picks up sound from all directions at once.'],
  },
});

// Split out from the standard mic's own description ("Micro version is
// Capacity 1 only, max range 5m") — a fixed Capacity instead of the
// 1-6 range AND a hard range limit the full-size version doesn't have,
// so it's a separate purchase rather than a config of the same item.
// Same treatment micro_camera already gets in armor_electronics.js.
const omnidirectional_mic_micro = sensorHousingWireless({
  id: 'omnidirectional_mic_micro',
  label: 'Omnidirectional Mic, Micro',
  cost: 50,
  availability: 1,
  description: 'The pinhead-sized version, for when the full-size pickup is too obvious.',
  referenceOnly: true,
  tags: ['auditory'],
  stats: {
    deviceCapacityProvided: 1,
    effects: [
      'Picks up sound from all directions at once.',
      'Maximum range 5m.',
    ],
  },
});

// NOTE: "+1 dice pool on aural Perception tests" is exactly the shape
// `flatDicePool` was built for (see additions.js), but this item has no
// such field, so nothing can apply the bonus — hence referenceOnly.
// Adding `flatDicePool: 1` would flip that; flagged rather than done.
const audio_enhancement = sensorHousingWireless({
  id: 'audio_enhancement',
  label: 'Audio Enhancement',
  cost: 500,
  availability: 1,
  referenceOnly: true,
  tags: ['auditory'],
  stats: {
    deviceCapacityUsed: 1,
    effects: [
      '+1 dice pool on aural Perception tests.',
      'Hear beyond the normal frequency range.',
      'Fine nuance discrimination, and blocks distracting noise.',
    ],
  },
});

const select_sound_filter_device = sensorHousingWireless({
  id: 'select_sound_filter_device',
  label: 'Select Sound Filter (Device)',
  cost: null,
  costPerRating: 250,
  availability: 3,
  description: 'The standalone version — see also the implanted headware version.',
  referenceOnly: true,
  tags: ['auditory'],
  stats: {
    ratingRange: [1, 3],
    deviceCapacityUsedPerRating: 1,
    effects: [
      'Blocks background noise and focuses on chosen sound patterns, up to Rating of them loaded.',
      'Actively listens to one group at a time, recording or alerting on the rest.',
    ],
  },
});

const spatial_recognizer_device = sensorHousingWireless({
  id: 'spatial_recognizer_device',
  label: 'Spatial Recognizer (Device)',
  cost: 1000,
  availability: 2,
  description: 'The standalone version — see also the implanted headware version.',
  referenceOnly: true,
  tags: ['auditory'],
  stats: {
    deviceCapacityUsed: 2,
    effects: [
      "Pinpoints a sound's source.",
      'Use-it-or-lose-it bonus Edge on the relevant Perception test.',
    ],
    wirelessBonuses: ['+1 dice pool on source-finding tests, stacking with other modifiers.'],
  },
});

// ---- Sensors ----

const handheld_housing = sensorHousingWireless({
  id: 'handheld_housing',
  label: 'Handheld Housing',
  cost: null,
  costPerCapacity: 100,
  availability: 1,
  description: 'A portable sensor housing.',
  tags: ['sensor'],
  stats: {
    deviceCapacityProvidedRange: [1, 3],
  },
});

const wall_mounted_housing = sensorHousingWireless({
  id: 'wall_mounted_housing',
  label: 'Wall-Mounted Housing',
  cost: null,
  costPerCapacity: 250,
  availability: 1,
  description: 'A fixed sensor housing.',
  tags: ['sensor'],
  stats: {
    deviceCapacityProvidedRange: [1, 6],
  },
});

// Capacity column in source literally reads "Rating" for the array —
// its Capacity-cost (as installed in a housing) equals its own chosen
// Rating, not a separate fixed number. The flag mirrors the existing
// availabilityEqualsRating pattern used elsewhere in the catalog.
// Not referenceOnly: deviceCapacityUsedEqualsRating is what actually
// enforces "one sensor function per Rating point."
const sensor_array = sensorHousingWireless({
  id: 'sensor_array',
  label: 'Sensor Array',
  cost: null,
  costPerRating: 1000,
  availability: 3,
  tags: ['sensor'],
  stats: {
    ratingRange: [2, 8],
    deviceCapacityUsedEqualsRating: true,
    effects: [
      'Holds one sensor function per Rating point, each purchased separately.',
      'Using it for Perception substitutes the sensor Rating for the Perception skill.',
    ],
  },
});

const single_sensor = sensorHousingWireless({
  id: 'single_sensor',
  label: 'Single Sensor',
  cost: null,
  costPerRating: 100,
  availability: 2,
  tags: ['sensor'],
  stats: {
    deviceCapacityUsed: 1,
    ratingRange: [1, 8],
    effects: ['Holds one sensor function — see SENSOR_FUNCTIONS for the list and maximum ranges.'],
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
  description: 'A combined wrist and ankle restraint.',
  referenceOnly: true,
  tags: ['security'],
  stats: {
    structure: 10,
    effects: [
      'Restricts the wearer to 2m Move and 3m Sprint.',
      'Blocks cyber-implant weapon extension.',
    ],
  },
});

const key_lock = security({
  id: 'key_lock',
  label: 'Lock (Key)',
  cost: null,
  costPerRating: 10,
  availability: 2,
  description: "Old-fashioned and cheap, still around where tech hasn't caught up.",
  referenceOnly: true,
  tags: ['security'],
  stats: {
    ratingRange: [1, 6],
    effects: ['Bypass with Engineering + Agility (Rating).'],
  },
});

const maglock = securityWireless({
  id: 'maglock',
  label: 'Maglock',
  cost: null,
  costPerRating: 100,
  availability: 3,
  referenceOnly: true,
  tags: ['security'],
  stats: {
    ratingRange: [1, 9],
    effects: [
      'Electromagnetically sealed.',
      'Takes biometric, keycard, passcard, or RFID access options.',
    ],
  },
});

const keypad = security({
  id: 'keypad',
  label: 'Keypad',
  cost: 50,
  availability: 1,
  referenceOnly: true,
  tags: ['security'],
  stats: { effects: ['A maglock access option.'] },
});

// D4: demoted from securityWireless this pass. No source description
// exists for this item, and its table-mates (Keypad, Biometric Reader,
// Plasteel Restraints) are all plain physical hardware.
const card_reader = security({
  id: 'card_reader',
  label: 'Card Reader',
  cost: 50,
  availability: 1,
  referenceOnly: true,
  tags: ['security'],
  stats: { effects: ['A maglock access option.'] },
});

// NOTE: this is `security` (not wireless) while card_reader is
// wireless, even though a biometric reader is at least as electronic.
// Carried over unchanged; flagged in the summary rather than guessed at.
const biometric_reader = security({
  id: 'biometric_reader',
  label: 'Biometric Reader',
  cost: 200,
  availability: 2,
  referenceOnly: true,
  tags: ['security'],
  stats: { effects: ['A maglock access option.'] },
});

// KEEPS wireless, unlike its table-mates: this one has explicit
// "mechanical or wireless lock" text in source, so D4's elimination
// argument doesn't reach it.
const metal_restraints = securityWireless({
  id: 'metal_restraints',
  label: 'Metal Restraints',
  cost: 20,
  availability: 1,
  referenceOnly: true,
  tags: ['security'],
  stats: {
    structure: 10,
    effects: ['Closes with either a mechanical or a wireless lock.'],
  },
});

const plasteel_restraints = security({
  id: 'plasteel_restraints',
  label: 'Plasteel Restraints',
  cost: 50,
  availability: 2,
  referenceOnly: true,
  tags: ['security'],
  stats: {
    structure: 12,
    effects: ['Flash-fused — release requires cutting them off.'],
  },
});

const plastic_straps = security({
  id: 'plastic_straps',
  label: 'Plastic Straps (10)',
  cost: 5,
  availability: 1,
  description: 'Lightweight and disposable.',
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
  description: 'A lockpick gun.',
  referenceOnly: true,
  tags: ['breaking_entering'],
  stats: { effects: ['+1 dice pool on mechanical lock-picking tests.'] },
});

const cellular_glove_molder = tool({
  id: 'cellular_glove_molder',
  label: 'Cellular Glove Molder',
  cost: null,
  costPerRating: 500,
  availability: 6,
  legality: 'illegal',
  referenceOnly: true,
  tags: ['breaking_entering'],
  stats: {
    ratingRange: [1, 4],
    effects: [
      'Molds a print-mimicking "sleeve" from a lifted finger or palm print.',
      'Fools biometric locks.',
    ],
  },
});

const chisel_wrecking_bar = tool({
  id: 'chisel_wrecking_bar',
  label: 'Chisel/Wrecking Bar',
  cost: 20,
  availability: 1,
  referenceOnly: true,
  tags: ['breaking_entering'],
  stats: { effects: ['Doubles effective Strength when forcing a door, lock, or container.'] },
});

const keycard_copier = toolWireless({
  id: 'keycard_copier',
  label: 'Keycard Copier',
  cost: 600,
  availability: 4,
  legality: 'illegal',
  referenceOnly: true,
  tags: ['breaking_entering'],
  stats: {
    effects: [
      'Copies a keycard in seconds.',
      'Manufacturing a working duplicate needs an Electronics Kit and an Electronics + Logic (2, 10 minutes) test.',
      'Some systems flag suspicious duplicate-key usage patterns.',
    ],
  },
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

const maglock_passkey = toolWireless({
  id: 'maglock_passkey',
  label: 'Maglock Passkey',
  cost: null,
  costPerRating: 2000,
  availability: 3,
  legality: 'illegal',
  description: 'A maglock "skeleton key."',
  referenceOnly: true,
  tags: ['breaking_entering'],
  stats: {
    ratingRange: [1, 4],
    effects: ['Fools any cardreader-based maglock.'],
    wirelessBonuses: ['+1 to its effective Rating.'],
  },
});

const miniwelder = tool({
  id: 'miniwelder',
  label: 'Miniwelder',
  cost: 250,
  availability: 1,
  description: 'A small electric-arc cutting and welding tool.',
  tags: ['breaking_entering'],
  stats: {
    damageValue: '6',
    target: 'barriers',
    effects: [
      '30 minutes of power per canister.',
      'Too small to be an effective weapon.',
    ],
  },
});

const miniwelder_fuel_canister = tool({
  id: 'miniwelder_fuel_canister',
  label: 'Miniwelder Fuel Canister',
  cost: 80,
  availability: 1,
  description: 'A refill for the miniwelder.',
  tags: ['breaking_entering'],
  stats: {},
});

const monofilament_chainsaw = tool({
  id: 'monofilament_chainsaw',
  label: 'Monofilament Chainsaw',
  cost: 500,
  availability: 3,
  description: 'A monofilament-toothed portable saw for trees, doors, and immovable objects.',
  tags: ['breaking_entering'],
  stats: {
    damageValue: '8',
    target: 'barriers',
    effects: ['Not a viable melee weapon — no skill covers it.'],
  },
});

const sequencer = toolWireless({
  id: 'sequencer',
  label: 'Sequencer',
  cost: null,
  costPerRating: 250,
  availability: 4,
  legality: 'illegal',
  referenceOnly: true,
  tags: ['breaking_entering'],
  stats: {
    ratingRange: [1, 6],
    effects: ['Defeats keypad maglocks.'],
    wirelessBonuses: ['+1 to its effective Rating.'],
  },
});

// ---- Industrial Chemicals ----

const glue_solvent = tool({
  id: 'glue_solvent',
  label: 'Glue Solvent',
  cost: 90,
  availability: 1,
  referenceOnly: true,
  tags: ['industrial_chemical'],
  stats: { effects: ['Dissolves about 1 sq m of Glue Sprayer superglue.'] },
});

const glue_sprayer = tool({
  id: 'glue_sprayer',
  label: 'Glue Sprayer',
  cost: 150,
  availability: 1,
  description: 'Fast-drying aerosol superglue.',
  referenceOnly: true,
  tags: ['industrial_chemical'],
  stats: {
    effects: [
      'Covers about 1 sq m per can.',
      'Hardens in 1 combat round.',
      'Resisting forced separation is a Body + Strength (5) Opposed test.',
    ],
  },
});

const thermite_burning_bar = tool({
  id: 'thermite_burning_bar',
  label: 'Thermite Burning Bar',
  cost: 500,
  availability: 5,
  legality: 'licensed',
  wireless: true,
  tags: ['industrial_chemical'],
  stats: {
    damageValue: '10P(fire)',
    effects: [
      'Melts through iron, steel, and plasteel.',
      'Too slow and careful to use as a weapon, except against someone already incapacitated.',
    ],
    wirelessBonuses: ['Can be activated and deactivated wirelessly.'],
  },
});

// ---- Survival Gear ----

const chemsuit = survival({
  id: 'chemsuit',
  label: 'Chemsuit',
  cost: null,
  costPerRating: 150,
  availability: 4,
  description: 'An impermeable coverall worn over clothes or armor.',
  referenceOnly: true,
  tags: ['survival'],
  stats: {
    ratingRange: [1, 6],
    effects: [
      'Provides Chemical Protection equal to its Rating.',
      'Not vacuum-sealed the way a full hazmat suit is.',
    ],
  },
});

// D5: the kit's "100m rope (400kg test)" IS standard_rope — that item
// is sold as a 100m coil (costPerUnit 50 / unitLength 100) rated to
// 400kg, and its "reaches 60m" is firing range, not coil length.
const climbing_gear = survival({
  id: 'climbing_gear',
  label: 'Climbing Gear',
  cost: 200,
  availability: 1,
  referenceOnly: true,
  description: 'Harness, gloves, carabiners, crampons, pitons, and a full coil of rope.',
  tags: ['survival'],
  stats: {
    effects: ['Includes a full set of climbing hardware alongside its rope.'],
    defaultAttachments: ['standard_rope'],
  },
});

// D5: the wetsuit's Cold Resistance references armor_cold_resistance
// in armor_electronics.js. defaultAttachments entries are bare ids with
// no Rating slot by decision, so this seeds at that item's Rating 1 and
// is upgraded to 2 out of band.
// KNOWN GAP: armor_cold_resistance costs armorCapacityUsed 3, and
// diving_gear has no armorCapacityProvided pool at all.
const diving_gear = survival({
  id: 'diving_gear',
  label: 'Diving Gear',
  cost: 2000,
  availability: 3,
  description: 'Wetsuit, partial facemask and snorkel, regulator, and inflatable surface vest.',
  referenceOnly: true,
  tags: ['survival'],
  stats: {
    effects: [
      'The wetsuit provides Rating 2 Cold Resistance.',
      '2-hour air tank; extra tanks cost 50¥ each.',
    ],
    defaultAttachments: ['armor_cold_resistance'],
  },
});

const flashlight = survival({
  id: 'flashlight',
  label: 'Flashlight',
  cost: 25,
  availability: 1,
  description: 'Long-lasting and bright.',
  referenceOnly: true,
  tags: ['survival'],
  stats: {
    effects: [
      'Mountable on a weapon.',
      'Low-light and infrared versions available.',
    ],
  },
});

const gas_mask = survivalWireless({
  id: 'gas_mask',
  label: 'Gas Mask',
  cost: 200,
  availability: 1,
  description: 'A full-face air-supplied re-breather.',
  referenceOnly: true,
  tags: ['survival'],
  stats: {
    effects: [
      'Immunity to Inhalation-vector toxins.',
      '1 hour of clean air; refills cost 40¥.',
      "Can't be combined with a regular respirator.",
    ],
    wirelessBonuses: ['Analyzes and reports on the surrounding, unbreathed air.'],
  },
});

const gecko_tape_gloves = survivalWireless({
  id: 'gecko_tape_gloves',
  label: 'Gecko Tape Gloves',
  cost: 250,
  availability: 3,
  description: 'A microscopic-hair dry adhesive set.',
  referenceOnly: true,
  tags: ['survival'],
  stats: {
    effects: [
      'Enables assisted climbing on nearly any surface.',
      'Useless when wet.',
    ],
    wirelessBonuses: ['Can temporarily neutralize the adhesive, to avoid self-sticking while donning or doffing.'],
  },
});

// D5: NO defaultAttachments — source says the sensor is bought
// separately, and "Geiger counter" names a SENSOR_FUNCTIONS entry, not
// a real item. The empty slot is modeled as capacity instead, which is
// also what keeps this one off referenceOnly.
const hazmat_suit = survivalWireless({
  id: 'hazmat_suit',
  label: 'Hazmat Suit',
  cost: 3000,
  availability: 3,
  description: 'A full-body sealed suit.',
  tags: ['survival'],
  stats: {
    deviceCapacityProvided: 1,
    effects: [
      'Full chemical seal — blocks Contact- and Inhalation-vector toxins.',
      '4 hours of internal air.',
      'Has a standard sensor slot, often a Geiger counter; the sensor is bought separately.',
    ],
    wirelessBonuses: ['Environmental analysis and reporting.'],
  },
});

const light_stick = survival({
  id: 'light_stick',
  label: 'Light Stick',
  cost: 25,
  availability: 1,
  referenceOnly: true,
  tags: ['survival'],
  stats: { effects: ['3 hours of soft chemical light out to a 10m radius.'] },
});

const magnesium_torch_flare = survival({
  id: 'magnesium_torch_flare',
  label: 'Magnesium Torch/Flare',
  cost: 5,
  availability: 1,
  tags: ['survival'],
  stats: {
    damageValue: '3P(fire)',
    effects: [
      '5 minutes of bright torchlight out to 20m.',
      'Striking someone with it inflicts its Fire damage.',
    ],
  },
});

const microflare_launcher = survival({
  id: 'microflare_launcher',
  label: 'Microflare Launcher',
  cost: 175,
  availability: 1,
  tags: ['survival'],
  stats: {
    damageValue: '3P(fire)',
    effects: [
      'Fires colored flares 200m up, illuminating a city-block-sized area for a couple of minutes.',
      'Hitting a person is an untrained skill check.',
    ],
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
  referenceOnly: true,
  tags: ['survival'],
  stats: {
    effects: [
      'Better grip on a grapple line — use-it-or-lose-it bonus Edge on grip tests.',
      'Required to safely handle microwire or stealth rope.',
    ],
  },
});

const respirator = survival({
  id: 'respirator',
  label: 'Respirator',
  cost: null,
  costPerRating: 50,
  availability: 1,
  description: 'A filter mask.',
  referenceOnly: true,
  tags: ['survival'],
  stats: {
    ratingRange: [1, 6],
    effects: [
      'Blocks Inhalation-vector toxins.',
      'Adds its Rating as a dice pool bonus resisting them.',
    ],
  },
});

const survival_kit = survival({
  id: 'survival_kit',
  label: 'Survival Kit',
  cost: 200,
  availability: 2,
  description: 'Knife, lighter, matches, compass, string saw, thermal blanket, seven days of soy ration bars, water purifier, fishing line and hook, and more.',
  tags: ['survival'],
  stats: {},
});

// ---- Grapple Gun family ----

// D3: `skill` moved from stats to the item root this pass, matching
// every weapon in firearms_explosives.js and melee_thrown.js.
const grapple_gun = survival({
  id: 'grapple_gun',
  label: 'Grapple Gun',
  cost: 500,
  availability: 3,
  skill: 'firearms',
  tags: ['grapple_gun_family'],
  stats: {
    damageValue: '1S',
    attackRatings: [1, null, null, null, null],
    effects: [
      'Fires a grappling hook and rope up to 60m or 100m, depending on the line loaded.',
      'Firearms test threshold to hit = Range / 20, rounded up.',
      'Internal winch retracts the line or hauls loads up to 10kg.',
      'Usable untrained as a weapon.',
    ],
  },
});

const microwire = survival({
  id: 'microwire',
  label: 'Microwire',
  cost: null,
  costPerUnit: 50,
  unitLength: 100,
  availability: 2,
  description: 'Extremely thin near-monofilament line.',
  referenceOnly: true,
  tags: ['grapple_gun_family'],
  stats: {
    effects: [
      'Fires to 100m, supporting up to 100kg.',
      'Nearly invisible — Perception threshold 6 to spot.',
      'Only safely gripped with rappelling gloves; otherwise it inflicts 5P damage.',
    ],
  },
});

const myomeric_rope = survivalWireless({
  id: 'myomeric_rope',
  label: 'Myomeric Rope',
  cost: null,
  costPerUnit: 200,
  unitLength: 10,
  availability: 4,
  description: 'A special contractile fiber.',
  referenceOnly: true,
  tags: ['grapple_gun_family'],
  stats: {
    effects: [
      'Remotely controllable movement, up to 30m of length at 2m per round.',
      'Can wind around obstacles or tie itself off.',
    ],
  },
});

const standard_rope = survival({
  id: 'standard_rope',
  label: 'Standard Rope',
  cost: null,
  costPerUnit: 50,
  unitLength: 100,
  availability: 1,
  referenceOnly: true,
  tags: ['grapple_gun_family'],
  stats: { effects: ['Reaches 60m, supporting up to 400kg.'] },
});

const stealth_rope = survival({
  id: 'stealth_rope',
  label: 'Stealth Rope',
  cost: null,
  costPerUnit: 85,
  unitLength: 100,
  availability: 3,
  legality: 'illegal',
  referenceOnly: true,
  tags: ['grapple_gun_family'],
  stats: {
    effects: [
      'Reaches 60m, supporting up to 400kg.',
      'Dissolves to near-traceless dust when touched with a catalyst stick.',
    ],
  },
});

const catalyst_stick = survival({
  id: 'catalyst_stick',
  label: 'Catalyst Stick',
  cost: 120,
  availability: 3,
  legality: 'illegal',
  referenceOnly: true,
  tags: ['grapple_gun_family'],
  stats: {
    effects: [
      'Dissolves stealth rope on contact.',
      'Reusable.',
    ],
  },
});

// D2: `armorRating` -> `structuralArmor`, plus a `structure` value
// alongside it, matching how SR6 barriers carry both. A tent is a
// barrier, not worn armor: its Armor is what the shelter itself absorbs
// before being breached, not a Defense Rating for whoever shelters in
// it. `size` drops out of stats — nothing else in the catalog maps onto
// it, so "Large" is plain description text now.
// THE `structure` NUMBERS ARE INVENTED. The source table gives Armor
// only. Flagged, not presented as confirmed.
const ballistic_tent = survival({
  id: 'ballistic_tent',
  label: 'Ballistic Tent',
  referenceOnly: true,
  tags: ['survival'],
  cost: 1100,
  availability: 2,
  description: 'A packable hard shelter, Large size when pitched.',
  stats: {
    structuralArmor: 4,
    structure: 6,
    effects: BALLISTIC_TENT_EFFECTS,
  },
});

const ballistic_tent_military_grade = survival({
  id: 'ballistic_tent_military_grade',
  label: 'Ballistic Tent (Military Grade)',
  referenceOnly: true,
  tags: ['survival'],
  cost: 4500,
  availability: 4,
  description: 'The upgraded Ballistic Tent, a later variant deployed for Desert Wars use. Large size when pitched.',
  stats: {
    structuralArmor: 8,
    structure: 8,
    effects: BALLISTIC_TENT_EFFECTS,
  },
});

export const GEAR_SENSORS_SECURITY_SURVIVAL = {
  directional_microphone, earbuds, headphones, laser_mic, omnidirectional_mic, omnidirectional_mic_micro,
  audio_enhancement, select_sound_filter_device, spatial_recognizer_device,
  handheld_housing, wall_mounted_housing, sensor_array, single_sensor,
  containment_manacles, key_lock, maglock, keypad, card_reader, biometric_reader, metal_restraints, plasteel_restraints, plastic_straps,
  autopicker, cellular_glove_molder, chisel_wrecking_bar, keycard_copier, lockpick_set, maglock_passkey, miniwelder, miniwelder_fuel_canister, monofilament_chainsaw, sequencer,
  glue_solvent, glue_sprayer, thermite_burning_bar,
  chemsuit, climbing_gear, diving_gear, flashlight, gas_mask, gecko_tape_gloves, hazmat_suit, light_stick, magnesium_torch_flare, microflare_launcher, microflares, rappelling_gloves, respirator, survival_kit,
  grapple_gun, microwire, myomeric_rope, standard_rope, stealth_rope, catalyst_stick,
  ballistic_tent, ballistic_tent_military_grade,
};

export const GEAR_SENSORS_SECURITY_SURVIVAL_IDS = Object.keys(GEAR_SENSORS_SECURITY_SURVIVAL);
