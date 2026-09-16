// Drones — split out of the former monolithic vehicles_drones.js into
// its own file (Vehicles / Watercraft / Drones). See vehicles.js and
// watercraft.js for the other two splits, and vehicles.js for the
// shared header notes (wireless:true reasoning, weapon mount capacity
// rules) that apply to this file too.
//
// ============================================================================
// SCHEMA PASSES 1 AND 2 (both applied at once — this file hadn't had
// either yet):
//
// S1. `effects` ARRAYS extracted from `description` prose. This file
//     had no effect field at all, and a lot of real rules text was
//     parenthetical inside flavor sentences — "(a finger or tag-eraser
//     pulse disables it)", "count as 1.5x their number for grunt-group
//     attack purposes", "bonus Minor Action using Take Cover". No
//     `wirelessBonuses` anywhere: drones are wireless by nature (the
//     D() helper sets `wireless: true` on all of them) and the source
//     gives them no per-item wireless bonus text.
// S2. `description` IS NOW OMITTABLE.
// D1. `referenceOnly: true` where no live computed field drives any of
//     the item's effects. One item is backed — the Quadrotor, once its
//     buried weapon statblock became a real `integratedWeapons` entry.
// D2. TWO STRING AVAILABILITIES FIXED. Triax Shallows Skiff was
//     `availability: '6R'` and AS Marine Crawler `'8R'` — the only
//     non-numeric availabilities left anywhere in the catalog after the
//     E-Soft `'8(I)'` fix in additions.js. The trailing letter is
//     legality, not availability, and formatAvailability() appends its
//     own suffix from `legality`, so these would render doubled. Now
//     `availability: 6/8` with `legality: 'restricted'`, matching the
//     vocabulary the rest of the catalog uses.
// D3. QUADROTOR'S BURIED WEAPON IS NOW STRUCTURED. Its description
//     carried a full statblock in parentheses — "only mountable weapon
//     is an air-powered crossbow (Projectile, DV 3P, AR 2/10/4/2/—)".
//     `stats.integratedWeapons` already exists for exactly this (Ares
//     Alpha and Yamaha Raiden in firearms_explosives.js use it), so the
//     crossbow is now a real entry rather than prose.
// D4. THE SIGNAL DEGRADATION TABLE IS NOW DATA. The aquatic section's
//     comment block held a real optional rule with real numbers (jammer
//     rating 1 at 10m through 5 at 1000m) where nothing could read it.
//     Exported as UNDERWATER_SIGNAL_DEGRADATION, same treatment
//     SENSOR_FUNCTIONS gets in sensors_security_survival.js.
// D6. EVERY DRONE NOW SHIPS WITH A RIGGER INTERFACE. Rigger Interface's
//     own description in vehicles.js says "All drones include one
//     standard; vehicles need it installed separately" — and not one of
//     the 24 drones here represented that. Each now seeds
//     `rigger_interface_integral`, the free builtIn SKU (the 1,000¥
//     purchasable one would charge for something included).
// D5. STALE PASTE INSTRUCTIONS REMOVED. The aquatic block opened with
//     "paste into vehicles_drones.js", a placement list, and "Also add
//     all three ids to the GEAR_VEHICLES_DRONES export object" — all of
//     which had already been done. Replaced with a real section note.
//
// FLAGGED, NOT RESOLVED: the three aquatic drones list "Standard
// Equipment" in prose (ballast tanks, clearsight, retrans unit N,
// mechanical arm (full)/(grapple)). Several of those name real catalog
// items — `retrans_unit` and `mechanical_arm_*` both live in
// additions.js — but none can be referenced as-is: retrans unit has no
// Rating in the catalog while these specify 3 and 5; "full" and
// "grapple" aren't mechanical-arm sizes; and both items are
// addition_upgrades that need a Comms/Sensor Array or Hardpoint to
// attach through, which a drone doesn't have. Left as effects. Same
// shape as the Diving Gear capacity-pool gap in
// sensors_security_survival.js.
// ============================================================================

const D = (overrides) => ({
  category: 'drone',
  legality: null,
  wireless: true,
  image: null,
  ...overrides,
});

// D4: was buried in a comment. Water absorbs and distorts radio,
// acting like an area jammer whose rating rises with depth. This is why
// the Skiff and Crawler both carry retrans units as standard, and why
// the Sea Eye is nearly impossible to suborn at range. Optional rule,
// from the deadly-waves SR6 adaptation.
export const UNDERWATER_SIGNAL_DEGRADATION = [
  { depthMeters: 10, jammerRating: 1 },
  { depthMeters: 100, jammerRating: 2 },
  { depthMeters: 500, jammerRating: 3 },
  { depthMeters: 750, jammerRating: 4 },
  { depthMeters: 1000, jammerRating: 5 },
];

// ---- Microdrones ----

const gmc_micromachine = D({
  id: 'gmc_micromachine',
  label: 'GMC Micromachine',
  cost: 450,
  availability: 2,
  referenceOnly: true,
  description: 'A sophisticated toy-like wheeled drone.',
  tags: ['microdrone'],
  stats: {
    handling: { onRoad: 3, offRoad: 6 },
    acceleration: 5,
    speedInterval: 5,
    topSpeed: 25,
    body: 0,
    armor: 0,
    pilot: 1,
    sensor: 1,
    seats: null,
    effects: [
      'Interchangeable bodies.',
      'Self-righting oversized wheels.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const shiawase_kanmushi = D({
  id: 'shiawase_kanmushi',
  label: 'Shiawase Kanmushi',
  cost: 900,
  availability: 2,
  referenceOnly: true,
  description: 'A 4-legged insectoid crawler for infiltrating secure facilities.',
  tags: ['microdrone'],
  stats: {
    handling: { onRoad: 2, offRoad: 3 },
    acceleration: 4,
    speedInterval: 5,
    topSpeed: 15,
    body: 0,
    armor: 0,
    pilot: 3,
    sensor: 2,
    seats: null,
    effects: [
      'Gecko-tipped limbs climb almost any surface.',
      'Fragile — a finger or a tag-eraser pulse disables it.',
      'Short control range.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const sikorsky_bell_microskimmer_xxs = D({
  id: 'sikorsky_bell_microskimmer_xxs',
  label: 'Sikorsky-Bell Microskimmer XXS',
  cost: 850,
  availability: 2,
  referenceOnly: true,
  description: 'A bottlecap-sized hoverjet drone.',
  tags: ['microdrone'],
  stats: {
    handling: { onRoad: 2 },
    acceleration: 6,
    speedInterval: 10,
    topSpeed: 35,
    body: 0,
    armor: 0,
    pilot: 2,
    sensor: 1,
    seats: null,
    effects: ['Stacks with its larger cousins into a single drone rack slot.'],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const mct_gnat = D({
  id: 'mct_gnat',
  label: 'MCT Gnat',
  cost: 800,
  availability: 2,
  referenceOnly: true,
  description: 'Insect-sized and insect-mimicking.',
  tags: ['microdrone'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 4,
    speedInterval: 10,
    topSpeed: 30,
    body: 0,
    armor: 0,
    pilot: 2,
    sensor: 1,
    seats: null,
    effects: [
      'Used in swarms carrying mini slap patches, to land on a target en masse.',
      'Sold in packs of 10.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

// ---- Minidrones ----

const gm_nissan_flip_flop = D({
  id: 'gm_nissan_flip_flop',
  label: 'GM-Nissan Flip-Flop',
  cost: 1000,
  availability: 2,
  referenceOnly: true,
  description: 'A tracked, gyro-stabilized drone that rides permanently upright.',
  tags: ['minidrone'],
  stats: {
    handling: { onRoad: 2, offRoad: 4 },
    acceleration: 8,
    speedInterval: 15,
    topSpeed: 50,
    body: 1,
    armor: 0,
    pilot: 2,
    sensor: 1,
    seats: null,
    effects: [
      'Can tumble and roll to cross obstacles.',
      'Good all-terrain speed on flat ground.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const shiawase_inu = D({
  id: 'shiawase_inu',
  label: 'Shiawase Inu',
  cost: 1100,
  availability: 2,
  referenceOnly: true,
  description: 'A fuzzy-suited 4-legged "dog" drone.',
  tags: ['minidrone'],
  stats: {
    handling: { onRoad: 2, offRoad: 3 },
    acceleration: 6,
    speedInterval: 8,
    topSpeed: 24,
    body: 1,
    armor: 0,
    pilot: 2,
    sensor: 2,
    seats: null,
    effects: [
      'Better suits are available for 500¥, though the movement stays a bit robotic.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const horizon_flying_eye = D({
  id: 'horizon_flying_eye',
  label: 'Horizon Flying Eye',
  cost: 2000,
  availability: 2,
  referenceOnly: true,
  description: 'An eyeball-sized omnidirectional-thrust surveillance drone that flies or rolls.',
  tags: ['minidrone'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 15,
    speedInterval: 15,
    topSpeed: 40,
    body: 1,
    armor: 0,
    pilot: 2,
    sensor: 2,
    seats: null,
    effects: ['A flash-pak or smoke-grenade-equipped version costs +500¥.'],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const mct_hornet = D({
  id: 'mct_hornet',
  label: 'MCT Hornet',
  cost: 2100,
  availability: 2,
  referenceOnly: true,
  description: 'A bulkier Fly-Spy relative shaped like a tarantula hawk wasp.',
  tags: ['minidrone'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 20,
    speedInterval: 15,
    topSpeed: 35,
    body: 1,
    armor: 0,
    pilot: 2,
    sensor: 2,
    seats: null,
    effects: [
      'Reaches greater altitude than a Fly-Spy.',
      'Carries a single-dose injector; the payload is sold separately.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

// ---- Small Drones ----

const chrysler_nissan_pursuit_v = D({
  id: 'chrysler_nissan_pursuit_v',
  label: 'Chrysler-Nissan Pursuit V',
  cost: 11000,
  availability: 3,
  referenceOnly: true,
  description: 'A low, flat, heavy pursuit drone with Formula-One speed.',
  tags: ['small_drone'],
  stats: {
    handling: { onRoad: 3, offRoad: 6 },
    acceleration: 30,
    speedInterval: 50,
    topSpeed: 280,
    body: 4,
    armor: 2,
    pilot: 4,
    sensor: 3,
    seats: null,
    effects: ['Outmaneuverable and out-gunnable, but nothing wheeled outruns it.'],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const aztechnology_crawler = D({
  id: 'aztechnology_crawler',
  label: 'Aztechnology Crawler',
  cost: 4500,
  availability: 2,
  description: 'A half-meter multi-terrain spider-like drone — nightmare fuel for the arachnophobic.',
  tags: ['small_drone'],
  stats: {
    handling: { onRoad: 3, offRoad: 4 },
    acceleration: 8,
    speedInterval: 10,
    topSpeed: 30,
    body: 6,
    armor: 2,
    pilot: 2,
    sensor: 2,
    seats: null,
    defaultAttachments: ['rigger_interface_integral'],
  },
});

// D3: NOT referenceOnly — the integratedWeapons entry drives the
// weapon-restriction effect, the same way it does on Ares Alpha and
// Yamaha Raiden in firearms_explosives.js.
const cyberspace_designs_quadrotor = D({
  id: 'cyberspace_designs_quadrotor',
  label: 'Cyberspace Designs Quadrotor',
  cost: 5000,
  availability: 2,
  description: 'A lightweight high-altitude aerial surveillance quadcopter.',
  tags: ['small_drone'],
  stats: {
    handling: { onRoad: 2 },
    acceleration: 15,
    speedInterval: 20,
    topSpeed: 120,
    body: 3,
    armor: 1,
    pilot: 3,
    sensor: 2,
    seats: null,
    integratedWeapons: [
      {
        label: 'Air-Powered Crossbow',
        skill: 'athletics',
        damageValue: '3P',
        attackRatings: [2, 10, 4, 2, null],
      },
    ],
    effects: ['The air-powered crossbow is the only weapon it can mount.'],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const lockheed_optic_x2 = D({
  id: 'lockheed_optic_x2',
  label: 'Lockheed Optic-X2',
  cost: 18000,
  availability: 3,
  referenceOnly: true,
  description: 'Deck-sized folded, hawk-sized deployed.',
  tags: ['small_drone'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 15,
    speedInterval: 30,
    topSpeed: 140,
    body: 2,
    armor: 4,
    pilot: 4,
    sensor: 4,
    seats: null,
    effects: [
      'Its design and paint add +1 to the Perception threshold to spot it.',
      'Arm-tossed VSTOL launch.',
      "Can't hover.",
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

// ---- Medium Drones ----

const gm_nissan_doberman = D({
  id: 'gm_nissan_doberman',
  label: 'GM-Nissan Doberman',
  cost: 6500,
  availability: 2,
  referenceOnly: true,
  description: 'A tracked day/night perimeter-patrol drone.',
  tags: ['medium_drone'],
  stats: {
    handling: { onRoad: 3, offRoad: 5 },
    acceleration: 10,
    speedInterval: 15,
    topSpeed: 100,
    body: 4,
    armor: 6,
    pilot: 2,
    sensor: 3,
    seats: null,
    // FLAG: "standard weapon mount" names weapon_mount_standard in
    // additions.js, but that item is an addition_upgrade needing a
    // Hardpoint to attach through, and drones have no Hardpoint pool.
    // Left as an effect rather than a broken reference.
    effects: [
      'Comes with a standard weapon mount.',
      'Poor on stairs.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const nissan_samurai = D({
  id: 'nissan_samurai',
  label: 'Nissan Samurai',
  cost: 4500,
  availability: 2,
  referenceOnly: true,
  description: 'A bipedal combat drone with retractable arm and heel blades.',
  tags: ['medium_drone'],
  stats: {
    handling: { onRoad: 3, offRoad: 4 },
    acceleration: 10,
    speedInterval: 10,
    topSpeed: 30,
    body: 6,
    armor: 6,
    pilot: 3,
    sensor: 2,
    seats: null,
    effects: [
      'An SMG-class mount plus 50 rounds per arm.',
      'Loses weapon access while in quadrupedal movement mode.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const nissan_oni = D({
  id: 'nissan_oni',
  label: 'Nissan Oni',
  cost: 6700,
  availability: 2,
  referenceOnly: true,
  description: 'A larger bipedal combat drone.',
  tags: ['medium_drone'],
  stats: {
    handling: { onRoad: 3, offRoad: 4 },
    acceleration: 10,
    speedInterval: 8,
    topSpeed: 30,
    body: 9,
    armor: 10,
    pilot: 3,
    sensor: 2,
    seats: null,
    effects: [
      'A rifle-class mount plus 100 rounds per arm.',
      'Loses weapon access while in quadrupedal movement mode.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const mct_nissan_roto_drone = D({
  id: 'mct_nissan_roto_drone',
  label: 'MCT-Nissan Roto-Drone',
  cost: 5000,
  availability: 2,
  referenceOnly: true,
  description: 'An enduringly popular modular rotor-top drone.',
  tags: ['medium_drone'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 20,
    speedInterval: 30,
    topSpeed: 160,
    body: 5,
    armor: 6,
    pilot: 3,
    sensor: 2,
    seats: null,
    effects: [
      'Treat Body as 3 higher for weapon-mount and customization purposes.',
      'Swappable from camera to assault configuration in under a minute.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const federated_boeing_blackhawk = D({
  id: 'federated_boeing_blackhawk',
  label: 'Federated Boeing Blackhawk',
  cost: 8000,
  availability: 3,
  referenceOnly: true,
  description: 'A small-profile, hard-to-hit attack drone favored by Desert Wars teams.',
  tags: ['medium_drone'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 35,
    speedInterval: 40,
    topSpeed: 200,
    body: 8,
    armor: 6,
    pilot: 3,
    sensor: 3,
    seats: null,
    effects: ['Flies in coordinated packs — they count as 1.5x their number for grunt-group attack purposes.'],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

// ---- Large Drones ----

const steel_lynx_combat_drone = D({
  id: 'steel_lynx_combat_drone',
  label: 'Steel Lynx Combat Drone',
  cost: 25000,
  availability: 4,
  referenceOnly: true,
  description: 'The archetypal killing machine — heavily armed and armored, on telescoping wheeled limbs.',
  tags: ['large_drone'],
  stats: {
    handling: { onRoad: 3, offRoad: 5 },
    acceleration: 15,
    speedInterval: 15,
    topSpeed: 80,
    body: 12,
    armor: 16,
    pilot: 4,
    sensor: 4,
    seats: null,
    effects: [
      'Bonus Minor Action when using Take Cover.',
      'The telescoping limbs let it pop up and shoot over cover.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const ares_packmule = D({
  id: 'ares_packmule',
  label: 'Ares Packmule',
  cost: 10000,
  availability: 3,
  referenceOnly: true,
  description: '"Hauling Ass" — a 4-legged rough-terrain cargo hauler.',
  tags: ['large_drone'],
  stats: {
    handling: { onRoad: 3, offRoad: 4 },
    acceleration: 6,
    speedInterval: 5,
    topSpeed: 30,
    body: 8,
    armor: 6,
    pilot: 2,
    sensor: 1,
    seats: null,
    effects: ['Cargo capacity can be traded for a gyro-mounted HMG turret.'],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const cyberspace_designs_dalmatian = D({
  id: 'cyberspace_designs_dalmatian',
  label: 'Cyberspace Designs Dalmatian',
  cost: 10000,
  availability: 3,
  referenceOnly: true,
  description: 'A fold-down VTOL recon drone, a Lone Star and Knight Errant patrol staple.',
  tags: ['large_drone'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 13,
    speedInterval: 20,
    topSpeed: 130,
    body: 6,
    armor: 4,
    pilot: 3,
    sensor: 3,
    seats: null,
    effects: ['Lawn-mower sized folded, hang-glider sized deployed.'],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const ares_black_sky = D({
  id: 'ares_black_sky',
  label: 'Ares Black Sky',
  cost: 43000,
  availability: 5,
  referenceOnly: true,
  description: 'A stealth air-to-ground support drone, proven during the Boston lockdown.',
  tags: ['large_drone'],
  stats: {
    handling: { onRoad: 2 },
    acceleration: 25,
    speedInterval: 50,
    topSpeed: 300,
    body: 8,
    armor: 10,
    pilot: 4,
    sensor: 4,
    seats: null,
    effects: ['Minimal-detection supply drops or strikes.'],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

// ---- Aquatic Drones ----
// Three underwater drones from the deadly-waves SR6 adaptation, already
// re-derived into SR6 math in that doc (no SR4A conversion applied
// here). They use the existing D() helper and the existing size tags,
// so each sits in the size section it belongs to rather than forming
// its own; the extra 'aquatic' tag is inert today and exists only so an
// "Aquatic Drones" split is possible later without re-touching them.
//
// See UNDERWATER_SIGNAL_DEGRADATION above for the depth/jammer rule
// that explains why two of the three carry retrans units as standard.

const lone_star_sea_eye = D({
  id: 'lone_star_sea_eye',
  label: 'Lone Star Sea Eye',
  cost: 2200,
  availability: 5,
  referenceOnly: true,
  description: "Originally built by Lone Star to inspect the undersides of boats and ships for smuggled containers and to assist forensic work on shallow wrecks. Still used for both, but also sold to shipping and repair outfits as a cheap way to spot-inspect a hull — common anywhere ships wait to return to sea.",
  tags: ['minidrone', 'aquatic'],
  stats: {
    handling: { onRoad: 5 },
    acceleration: 6,
    speedInterval: 8,
    topSpeed: 25,
    body: 1,
    armor: 0,
    pilot: 3,
    sensor: 3,
    seats: null,
    effects: [
      'Standard equipment: ballast tanks 1, clearsight 1.',
      'Very hard to hijack at range — you have to be nearly on top of it to intercept the control signal.',
      'Its short signal range also rules it out as a remote surveillance tool, and makes it easy to spot from a distance.',
      'Available to anyone with the cash and a legitimate SIN.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const triax_shallows_skiff = D({
  id: 'triax_shallows_skiff',
  label: 'Triax Shallows Skiff',
  cost: 14000,
  availability: 6,          // D2: was the string '6R'
  legality: 'restricted',   // D2: the trailing R was legality, not availability
  referenceOnly: true,
  description: "Triax's light work drone for aquatic construction and salvage. Found near every managed kelp farm, dry dock, and naval base on the planet — which makes it good cover for slipping something through a security perimeter.",
  tags: ['small_drone', 'aquatic'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 8,
    speedInterval: 10,
    topSpeed: 40,
    body: 3,
    armor: 2,
    pilot: 2,
    sensor: 3,
    seats: null,
    effects: [
      'Standard equipment: ballast tanks 1, retrans unit 3, mechanical arm (full).',
      'Choice of tethered control for deeper objectives, or wireless within range of a surface transmitter.',
      'The retrans unit lets a rigger use it as a control node for other, less well-equipped drones on the same project, and helps hold signal in tight spots.',
      'The manipulator arm handles structures and components underwater.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

const as_marine_crawler = D({
  id: 'as_marine_crawler',
  label: 'Automation Systems Marine Crawler',
  cost: 51500,
  availability: 8,          // D2: was the string '8R'
  legality: 'restricted',   // D2: the trailing R was legality, not availability
  referenceOnly: true,
  description: 'Developed to assist underwater mining and farming — the offshore rig workhorse, used to strip deeper marine growth and terminate any toxic critters found doing the same.',
  tags: ['large_drone', 'aquatic'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 6,
    speedInterval: 8,
    topSpeed: 30,
    body: 6,
    armor: 5,
    pilot: 3,
    sensor: 4,
    seats: null,
    effects: [
      'Standard equipment: ballast tanks 2, retrans unit 5, mechanical arm (grapple).',
      'Withstands the same depths an experienced diver can, but for far longer.',
      'Propulsion combines tracks with strong waterjets for reaching designated spots on uneven seafloor.',
      'The retrans unit is disaster-mitigation kit: if the rig goes up, surviving drones can work to limit the spill or search for survivors.',
      'Some units have reportedly suffered hull failures after prolonged use.',
    ],
    defaultAttachments: ['rigger_interface_integral'],
  },
});

export const GEAR_DRONES = {
  gmc_micromachine, shiawase_kanmushi, sikorsky_bell_microskimmer_xxs, mct_gnat,
  gm_nissan_flip_flop, shiawase_inu, horizon_flying_eye, mct_hornet,
  chrysler_nissan_pursuit_v, aztechnology_crawler, cyberspace_designs_quadrotor, lockheed_optic_x2,
  gm_nissan_doberman, nissan_samurai, nissan_oni, mct_nissan_roto_drone, federated_boeing_blackhawk,
  steel_lynx_combat_drone, ares_packmule, cyberspace_designs_dalmatian, ares_black_sky,
  lone_star_sea_eye, triax_shallows_skiff, as_marine_crawler,
};

export const GEAR_DRONES_IDS = Object.keys(GEAR_DRONES);
