// Drones — split out of the former monolithic vehicles_drones.js into
// its own file (Vehicles / Watercraft / Drones), per request. Pure
// reorganization this pass — every stat here is unchanged from the
// original file, just relocated. See vehicles.js and watercraft.js
// for the other two splits, and vehicles.js for the shared header
// notes (wireless:true reasoning, weapon mount capacity rules) that
// apply to this file too.

const D = (overrides) => ({
  category: 'drone',
  legality: null,
  wireless: true,
  image: null,
  ...overrides,
});

// ---- Microdrones ----

const gmc_micromachine = D({
  id: 'gmc_micromachine',
  label: 'GMC Micromachine',
  cost: 450,
  availability: 2,
  description: 'A sophisticated toy-like wheeled drone with interchangeable bodies and self-righting oversized wheels.',
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
  },
});

const shiawase_kanmushi = D({
  id: 'shiawase_kanmushi',
  label: 'Shiawase Kanmushi',
  cost: 900,
  availability: 2,
  description: 'A 4-legged insectoid crawler for infiltrating secure facilities via gecko-tipped limbs; fragile (a finger or tag-eraser pulse disables it), short range but a strong Pilot system.',
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
  },
});

const sikorsky_bell_microskimmer_xxs = D({
  id: 'sikorsky_bell_microskimmer_xxs',
  label: 'Sikorsky-Bell Microskimmer XXS',
  cost: 850,
  availability: 2,
  description: 'Bottlecap-sized hoverjet drone; stacks with its larger cousins into one drone rack slot.',
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
  },
});

const mct_gnat = D({
  id: 'mct_gnat',
  label: 'MCT Gnat',
  cost: 800,
  availability: 2,
  description: 'Insect-sized and -mimicking; used in swarms carrying mini slap patches to land en masse on a target. Sold in packs of 10.',
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
  },
});

// ---- Minidrones ----

const gm_nissan_flip_flop = D({
  id: 'gm_nissan_flip_flop',
  label: 'GM-Nissan Flip-Flop',
  cost: 1000,
  availability: 2,
  description: 'A tracked, gyro-stabilized always-upright drone that can tumble/roll — good all-terrain speed on flat ground.',
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
  },
});

const shiawase_inu = D({
  id: 'shiawase_inu',
  label: 'Shiawase Inu',
  cost: 1100,
  availability: 2,
  description: 'A fuzzy-suited 4-legged "dog" drone (better suits at 500¥ for realism, though movement stays a bit robotic).',
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
  },
});

const horizon_flying_eye = D({
  id: 'horizon_flying_eye',
  label: 'Horizon Flying Eye',
  cost: 2000,
  availability: 2,
  description: 'An eyeball-sized omnidirectional-thrust flying/rolling surveillance drone. A flash-pak or smoke-grenade-equipped version costs +500¥.',
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
  },
});

const mct_hornet = D({
  id: 'mct_hornet',
  label: 'MCT Hornet',
  cost: 2100,
  availability: 2,
  description: 'A bulkier Fly-Spy relative reaching greater altitude, shaped like a tarantula hawk wasp, carrying a single-dose injector (payload sold separately).',
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
  },
});

// ---- Small Drones ----

const chrysler_nissan_pursuit_v = D({
  id: 'chrysler_nissan_pursuit_v',
  label: 'Chrysler-Nissan Pursuit V',
  cost: 11000,
  availability: 3,
  description: 'Low, flat, heavy, Formula-One-speed pursuit drone; outmaneuverable or out-gunnable, but nothing wheeled outruns it.',
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
  },
});

const aztechnology_crawler = D({
  id: 'aztechnology_crawler',
  label: 'Aztechnology Crawler',
  cost: 4500,
  availability: 2,
  description: 'A half-meter multi-terrain spider-like drone (nightmare fuel for the arachnophobic).',
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
  },
});

const cyberspace_designs_quadrotor = D({
  id: 'cyberspace_designs_quadrotor',
  label: 'Cyberspace Designs Quadrotor',
  cost: 5000,
  availability: 2,
  description: 'Lightweight high-altitude aerial surveillance quadcopter; only mountable weapon is an air-powered crossbow (Projectile, DV 3P, AR 2/10/4/2/—).',
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
  },
});

const lockheed_optic_x2 = D({
  id: 'lockheed_optic_x2',
  label: 'Lockheed Optic-X2',
  cost: 18000,
  availability: 3,
  description: "Deck-sized folded, hawk-sized deployed, arm-tossed VSTOL launch (can't hover); design/paint add +1 Perception threshold to spot it.",
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
  },
});

// ---- Medium Drones ----

const gm_nissan_doberman = D({
  id: 'gm_nissan_doberman',
  label: 'GM-Nissan Doberman',
  cost: 6500,
  availability: 2,
  description: 'A tracked day/night perimeter-patrol drone (poor on stairs); standard weapon mount.',
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
  },
});

const nissan_samurai = D({
  id: 'nissan_samurai',
  label: 'Nissan Samurai',
  cost: 4500,
  availability: 2,
  description: 'Bipedal combat drone with retractable arm/heel blades and an SMG-class mount + 50 rounds per arm. Fast but loses weapon access in quadrupedal movement mode.',
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
  },
});

const nissan_oni = D({
  id: 'nissan_oni',
  label: 'Nissan Oni',
  cost: 6700,
  availability: 2,
  description: 'Larger bipedal combat drone, rifle-class mount + 100 rounds per arm. Fast but loses weapon access in quadrupedal movement mode.',
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
  },
});

const mct_nissan_roto_drone = D({
  id: 'mct_nissan_roto_drone',
  label: 'MCT-Nissan Roto-Drone',
  cost: 5000,
  availability: 2,
  description: 'An enduringly popular modular rotor-top drone, swappable from camera to assault configuration in under a minute. Treat Body as +3 higher for weapon-mount/customization purposes.',
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
  },
});

const federated_boeing_blackhawk = D({
  id: 'federated_boeing_blackhawk',
  label: 'Federated Boeing Blackhawk',
  cost: 8000,
  availability: 3,
  description: 'A small-profile, hard-to-hit attack drone favored by Desert Wars teams; flies in coordinated "packs" (count as 1.5x their number for grunt-group attack purposes).',
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
  },
});

// ---- Large Drones ----

const steel_lynx_combat_drone = D({
  id: 'steel_lynx_combat_drone',
  label: 'Steel Lynx Combat Drone',
  cost: 25000,
  availability: 4,
  description: 'The archetypal "killing machine" — heavily armed/armored on telescoping wheeled limbs that let it pop up and shoot over cover; bonus Minor Action using Take Cover.',
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
  },
});

const ares_packmule = D({
  id: 'ares_packmule',
  label: 'Ares Packmule',
  cost: 10000,
  availability: 3,
  description: '"Hauling Ass" — a 4-legged rough-terrain cargo hauler; spec-ops teams often trade cargo capacity for a gyro-mounted HMG turret.',
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
  },
});

const cyberspace_designs_dalmatian = D({
  id: 'cyberspace_designs_dalmatian',
  label: 'Cyberspace Designs Dalmatian',
  cost: 10000,
  availability: 3,
  description: 'A fold-down VTOL recon drone (lawn-mower size folded, hang-glider size deployed), a Lone Star/Knight Errant patrol staple.',
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
  },
});

const ares_black_sky = D({
  id: 'ares_black_sky',
  label: 'Ares Black Sky',
  cost: 43000,
  availability: 5,
  description: 'A stealth air-to-ground support drone proven during the Boston lockdown; minimal-detection supply drops or strikes.',
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
  },
});

// ============================================================
// AQUATIC DRONES — paste into vehicles_drones.js
//
// Three underwater drones from "deadly-waves-sr6-adaptation.md",
// already re-derived into SR6 math in that doc (no SR4A conversion
// applied here). They use the existing D() helper and the existing
// size tags, so each one slots into the size section it belongs to
// rather than forming a new section — the extra 'aquatic' tag is
// inert today and exists only so an "Aquatic Drones" split is
// possible later without re-touching them.
//
// Placement:
//   lone_star_sea_eye     -> Drones: Minidrones
//   triax_shallows_skiff  -> Drones: Small Drones
//   as_marine_crawler     -> Drones: Large Drones
//
// Also add all three ids to the GEAR_VEHICLES_DRONES export object.
//
// SIGNAL DEGRADATION (optional rule from the source, worth knowing
// before anyone tries to run these deep or hijack one): water absorbs
// and distorts radio, acting like an area jammer whose rating rises
// with depth — 1 at 10m, 2 at 100m, 3 at 500m, 4 at 750m, 5 at 1000m.
// This is why the Skiff and Crawler both carry retrans units as
// standard, and why the Sea Eye is nearly impossible to suborn at
// range.
// ============================================================

const lone_star_sea_eye = D({
  id: 'lone_star_sea_eye',
  label: 'Lone Star Sea Eye',
  cost: 2200,
  availability: 5,
  description: "Originally built by Lone Star to inspect the undersides of boats and ships for smuggled containers and to assist forensic work on shallow wrecks. Still used for both, but also sold to shipping and repair outfits as a cheap way to spot-inspect a hull — common anywhere ships wait to return to sea. Available to anyone with the cash and a legitimate SIN. Its short signal range cuts both ways: it's easy to spot from a distance and very hard to hijack from one, since you have to be nearly on top of it to intercept the control signal, which also rules it out as a remote surveillance tool. Standard Equipment: ballast tanks 1, clearsight 1.",
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
  },
});

const triax_shallows_skiff = D({
  id: 'triax_shallows_skiff',
  label: 'Triax Shallows Skiff',
  cost: 14000,
  availability: '6R',
  description: "Triax's light work drone for aquatic construction and salvage, offering a choice of tethered control for deeper objectives or wireless within range of a surface transmitter. The standard retrans unit lets a rigger use it as a control node for other, less well-equipped drones on the same project, and the manipulator arm handles structures and components underwater. Found near every managed kelp farm, dry dock, and naval base on the planet — which makes it good cover for slipping something through a security perimeter, with the retrans unit helping hold signal in tight spots. Standard Equipment: ballast tanks 1, retrans unit 3, mechanical arm (full).",
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
  },
});

const as_marine_crawler = D({
  id: 'as_marine_crawler',
  label: 'Automation Systems Marine Crawler',
  cost: 51500,
  availability: '8R',
  description: "Developed to assist underwater mining and farming, the Crawler withstands the same depths an experienced diver can but for far longer, allowing greater productivity while keeping metahuman oversight. Propulsion combines its namesake tracks with strong waterjets for reaching designated spots on uneven seafloor. The offshore rig workhorse — used to strip deeper marine growth and terminate any toxic critters found doing the same. The retrans unit is disaster-mitigation kit: if the rig goes up, surviving drones can work to limit the spill or search for survivors. Some units have reportedly suffered hull failures after prolonged use. Standard Equipment: ballast tanks 2, retrans unit 5, mechanical arm (grapple).",
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
