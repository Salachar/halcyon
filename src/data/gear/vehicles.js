// Vehicles (ground and air, non-water) — split out of the former
// monolithic vehicles_drones.js (Vehicles / Watercraft / Drones), per
// request. Pure reorganization this pass — every stat here is
// unchanged from the original file, just relocated. See watercraft.js
// and drones.js for the other two splits.
//
// Verified against 13g-gear-vehicles-drones.md (Gear Part 7/Final, pp.
// 294-304) in full when originally built. Two irregularities in the
// source table worth carrying forward:
//
// 1. A few rows list "X/Y" for Seats (GMC Bulldog, Ares Roadmaster, Ares
//    Dragon, Ares Venture, GMC Banshee) — that's crew seats / total
//    capacity for the SAME vehicle, not two variants. Modeled as
//    `seats: { crew, total }` instead of a plain number for just these.
// 2. Two rows pack two genuinely different vehicles into one line
//    (Federated Boeing Commuter/Osprey X, Nissan Samurai/Oni — the
//    latter now lives in drones.js) — every stat differs between them,
//    so those got split into two real items.
//
// `wireless: true` is set for EVERY vehicle here — every entry carries
// `pilot`/`sensor` stats, meaning it's inherently a Matrix-connected
// node by what it fundamentally is, not something that happens to have
// a networked feature. Vehicle Modifications is the one section with
// real per-item calls: Rigger Interface is the literal DNI-connection
// mod (wireless); the weapon mounts are physical hardware (not);
// Manual Operation is explicitly the non-networked alternative (not).
// These mods live here as the "primary" vehicle file but apply
// universally across all three splits (watercraft, drones included).
//
// WEAPON MOUNT CAPACITY (mountSlotsUsed, VEHICLE_WEAPON_MOUNT_RULES)
// is now superseded by the Hardpoint system (additions.js) — kept here
// unchanged for reference/backward compatibility, but WeaponMountsPanel
// itself was retired in favor of Hardpoints. New builds should use
// Hardpoint Additions + Weapon Mount Upgrades instead.

const V = (overrides) => ({
  category: 'vehicle',
  legality: null,
  wireless: true,
  image: null,
  ...overrides,
});

// ---- Bikes ----

const dodge_scoot = V({
  id: 'dodge_scoot',
  label: 'Dodge Scoot',
  cost: 3000,
  availability: 2,
  description: "Compact, cheap, fuel-efficient. Not really shadowrunner gear unless you're blending in (or asking for a go-gang beatdown).",
  tags: ['bike'],
  stats: {
    handling: { onRoad: 5, offRoad: 7 },
    acceleration: 4,
    speedInterval: 10,
    topSpeed: 80,
    body: 2,
    armor: 0,
    pilot: 1,
    sensor: 0,
    seats: 2,
  },
});

const harley_davidson_scorpion = V({
  id: 'harley_davidson_scorpion',
  label: 'Harley-Davidson Scorpion',
  cost: 14000,
  availability: 2,
  description: 'The classic heavy chromed road hog, armored, go-ganger favorite.',
  tags: ['bike'],
  stats: {
    handling: { onRoad: 3, offRoad: 5 },
    acceleration: 16,
    speedInterval: 30,
    topSpeed: 200,
    body: 7,
    armor: 6,
    pilot: 1,
    sensor: 1,
    seats: 2,
  },
});

const yamaha_growler = V({
  id: 'yamaha_growler',
  label: 'Yamaha Growler',
  cost: 8000,
  availability: 2,
  description: 'Popular with thrill-seekers, wilderness types, and light-freight drug smugglers.',
  tags: ['bike'],
  stats: {
    handling: { onRoad: 3, offRoad: 3 },
    acceleration: 15,
    speedInterval: 20,
    topSpeed: 180,
    body: 6,
    armor: 4,
    pilot: 1,
    sensor: 1,
    seats: 2,
  },
});

const suzuki_mirage = V({
  id: 'suzuki_mirage',
  label: 'Suzuki Mirage',
  cost: 12000,
  availability: 2,
  description: 'A racing bike built for speed most riders never get comfortable using.',
  tags: ['bike'],
  stats: {
    handling: { onRoad: 2, offRoad: 6 },
    acceleration: 29,
    speedInterval: 30,
    topSpeed: 260,
    body: 4,
    armor: 2,
    pilot: 1,
    sensor: 1,
    seats: 1,
  },
});

// ---- Cars ----

const chrysler_nissan_jackrabbit = V({
  id: 'chrysler_nissan_jackrabbit',
  label: 'Chrysler-Nissan Jackrabbit',
  cost: 11000,
  availability: 2,
  description: 'Ubiquitous electric subcompact — anonymous, good for stakeouts/tailing, bad for car chases.',
  tags: ['car'],
  stats: {
    handling: { onRoad: 3, offRoad: 5 },
    acceleration: 20,
    speedInterval: 15,
    topSpeed: 160,
    body: 8,
    armor: 4,
    pilot: 2,
    sensor: 1,
    seats: 3,
  },
});

const honda_spirit = V({
  id: 'honda_spirit',
  label: 'Honda Spirit',
  cost: 13000,
  availability: 2,
  description: 'Three-wheeled two-seat commuter, cheap and everywhere.',
  tags: ['car'],
  stats: {
    handling: { onRoad: 4, offRoad: 5 },
    acceleration: 15,
    speedInterval: 20,
    topSpeed: 150,
    body: 10,
    armor: 3,
    pilot: 1,
    sensor: 1,
    seats: 4,
  },
});

const eurocar_westwind_x80 = V({
  id: 'eurocar_westwind_x80',
  label: 'Eurocar Westwind X80',
  cost: 115000,
  availability: 3,
  description: 'A top-tier luxury street machine pushing right up to the edge of street legality.',
  tags: ['car'],
  stats: {
    handling: { onRoad: 2, offRoad: 6 },
    acceleration: 24,
    speedInterval: 30,
    topSpeed: 250,
    body: 6,
    armor: 1,
    pilot: 4,
    sensor: 3,
    seats: 2,
  },
});

const hyundai_shin_hyung = V({
  id: 'hyundai_shin_hyung',
  label: 'Hyundai Shin-Hyung',
  cost: 20000,
  availability: 2,
  description: 'A powerful, tuner-community-favorite sedan, popular with Asian criminal factions and slumming rich kids alike.',
  tags: ['car'],
  stats: {
    handling: { onRoad: 3, offRoad: 5 },
    acceleration: 12,
    speedInterval: 25,
    topSpeed: 200,
    body: 7,
    armor: 1,
    pilot: 1,
    sensor: 1,
    seats: 3,
  },
});

const ford_americar = V({
  id: 'ford_americar',
  label: 'Ford Americar',
  cost: 16000,
  availability: 2,
  description: "Boring, reliable, cheap four-door sedan — the everyman's ride.",
  tags: ['car'],
  stats: {
    handling: { onRoad: 4, offRoad: 5 },
    acceleration: 9,
    speedInterval: 20,
    topSpeed: 160,
    body: 11,
    armor: 4,
    pilot: 1,
    sensor: 2,
    seats: 4,
  },
});

const saeder_krupp_bentley_concordat = V({
  id: 'saeder_krupp_bentley_concordat',
  label: 'Saeder-Krupp-Bentley Concordat',
  cost: 65000,
  availability: 3,
  description: 'An ostentatious dream car for corp youth.',
  tags: ['car'],
  stats: {
    handling: { onRoad: 3, offRoad: 5 },
    acceleration: 18,
    speedInterval: 30,
    topSpeed: 180,
    body: 14,
    armor: 8,
    pilot: 3,
    sensor: 3,
    seats: 4,
  },
});

const mitsubishi_nightsky = V({
  id: 'mitsubishi_nightsky',
  label: 'Mitsubishi Nightsky',
  cost: 259000,
  availability: 3,
  description: 'An armored limousine for execs, media stars, and Mr. Johnsons.',
  tags: ['car'],
  stats: {
    handling: { onRoad: 4, offRoad: 6 },
    acceleration: 10,
    speedInterval: 10,
    topSpeed: 160,
    body: 18,
    armor: 10,
    pilot: 3,
    sensor: 4,
    seats: 8,
  },
});

// ---- Trucks and Vans ----

const toyota_gopher = V({
  id: 'toyota_gopher',
  label: 'Toyota Gopher',
  cost: 25000,
  availability: 2,
  description: 'A once-mocked pickup, now a design/power/feature pinnacle. Off-road capable, roomy 4-door cab.',
  tags: ['truck'],
  stats: {
    handling: { onRoad: 4, offRoad: 4 },
    acceleration: 15,
    speedInterval: 15,
    topSpeed: 150,
    body: 12,
    armor: 6,
    pilot: 1,
    sensor: 1,
    seats: 4,
  },
});

const gmc_bulldog_step_van = V({
  id: 'gmc_bulldog_step_van',
  label: 'GMC Bulldog Step-Van',
  cost: 35000,
  availability: 2,
  description: 'The best-selling delivery van worldwide — armored, roomy, blends in anywhere with the right paint. A runner favorite.',
  tags: ['truck'],
  stats: {
    handling: { onRoad: 5, offRoad: 7 },
    acceleration: 10,
    speedInterval: 10,
    topSpeed: 140,
    body: 16,
    armor: 12,
    pilot: 2,
    sensor: 3,
    seats: { crew: 2, total: 10 },
  },
});

const range_rover_2080 = V({
  id: 'range_rover_2080',
  label: 'Range Rover Model 2080',
  cost: 73000,
  availability: 3,
  description: 'A status-symbol SUV with genuine off-road capability. Popular with security firms — and thus on the used market, blood stains included.',
  tags: ['truck'],
  stats: {
    handling: { onRoad: 4, offRoad: 5 },
    acceleration: 12,
    speedInterval: 20,
    topSpeed: 160,
    body: 16,
    armor: 10,
    pilot: 4,
    sensor: 4,
    seats: 7,
  },
});

const ares_roadmaster = V({
  id: 'ares_roadmaster',
  label: 'Ares Roadmaster',
  cost: 68000,
  availability: 2,
  description: 'A tank-like long-haul commercial van, heavily armored, easy remote-turret installation. Also used by security firms transporting valuables.',
  tags: ['truck'],
  stats: {
    handling: { onRoad: 5, offRoad: 7 },
    acceleration: 8,
    speedInterval: 10,
    topSpeed: 120,
    body: 18,
    armor: 16,
    pilot: 2,
    sensor: 2,
    seats: { crew: 2, total: 12 },
  },
});

// ---- Fixed-Wing Aircraft (needs a runway) ----

const artemis_nightwing = V({
  id: 'artemis_nightwing',
  label: 'Artemis Industries Nightwing',
  cost: 20000,
  availability: 2,
  description: 'A near-silent stealth glider disguised as a hobbyist toy; used by spec-ops and smugglers alike.',
  tags: ['fixed_wing'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 15,
    speedInterval: 25,
    topSpeed: 150,
    body: 2,
    armor: 0,
    pilot: 1,
    sensor: 1,
    seats: 1,
  },
});

const cessna_c750 = V({
  id: 'cessna_c750',
  label: 'Cessna C750',
  cost: 150000,
  availability: 2,
  description: 'Affordable, easy-to-maintain twin-prop for passengers/cargo (or surveillance in a pinch).',
  tags: ['fixed_wing'],
  stats: {
    handling: { onRoad: 5 },
    acceleration: 20,
    speedInterval: 25,
    topSpeed: 250,
    body: 8,
    armor: 2,
    pilot: 2,
    sensor: 1,
    seats: 4,
  },
});

const mct_sikorsky_bell_seahawk = V({
  id: 'mct_sikorsky_bell_seahawk',
  label: 'MCT-Sikorsky-Bell Seahawk',
  cost: 300000,
  availability: 2,
  description: 'A rescued design turned high-speed amphibious personal jet, 6 passengers or cargo, land-or-water capable.',
  tags: ['fixed_wing'],
  stats: {
    handling: { onRoad: 5 },
    acceleration: 30,
    speedInterval: 50,
    topSpeed: 500,
    body: 12,
    armor: 4,
    pilot: 2,
    sensor: 2,
    seats: 8,
  },
});

// ---- Rotorcraft (VTOL via rotors) ----

const ares_dragon = V({
  id: 'ares_dragon',
  label: 'Ares Dragon',
  cost: 360000,
  availability: 2,
  description: "The world's most recognizable cargo helicopter; double-rotor lifting power for heavy cargo, strike teams, or ordnance.",
  tags: ['rotorcraft'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 10,
    speedInterval: 30,
    topSpeed: 260,
    body: 22,
    armor: 10,
    pilot: 2,
    sensor: 3,
    seats: { crew: 2, total: 16 },
  },
});

const mct_sikorsky_bell_wolfhound = V({
  id: 'mct_sikorsky_bell_wolfhound',
  label: 'MCT-Sikorsky-Bell Wolfhound',
  cost: 423000,
  availability: 4,
  description: "A battle-and-boardroom-ready rotorcraft rapidly spreading across MCT's many markets.",
  tags: ['rotorcraft'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 20,
    speedInterval: 40,
    topSpeed: 320,
    body: 12,
    armor: 14,
    pilot: 4,
    sensor: 4,
    seats: 8,
  },
});

const northrup_wasp = V({
  id: 'northrup_wasp',
  label: 'Northrup Wasp',
  cost: 93000,
  availability: 3,
  description: "A fast, maneuverable single-seat police/security craft with a heavy weapon mount — a runner's bane in numbers.",
  tags: ['rotorcraft'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 25,
    speedInterval: 30,
    topSpeed: 330,
    body: 10,
    armor: 8,
    pilot: 3,
    sensor: 3,
    seats: 2,
  },
});

// ---- VTOL/VSTOL (fixed-wing adapted for vertical/short takeoff) ----

const ares_venture = V({
  id: 'ares_venture',
  label: 'Ares Venture',
  cost: 400000,
  availability: 3,
  description: 'A cheap, small, highly customizable "sleeper" LAV popular with security, military, and the smugglers they chase.',
  tags: ['vtol'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 40,
    speedInterval: 60,
    topSpeed: 680,
    body: 16,
    armor: 12,
    pilot: 2,
    sensor: 2,
    seats: { crew: 2, total: 8 },
  },
});

const gmc_banshee = V({
  id: 'gmc_banshee',
  label: 'GMC Banshee',
  cost: 1300000,
  availability: 4,
  description: 'A top-tier LAV for high-budget militaries and elite smuggler operations.',
  tags: ['vtol'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 60,
    speedInterval: 90,
    topSpeed: 900,
    body: 18,
    armor: 18,
    pilot: 4,
    sensor: 4,
    seats: { crew: 2, total: 12 },
  },
});

const federated_boeing_commuter = V({
  id: 'federated_boeing_commuter',
  label: 'Federated Boeing Commuter',
  cost: 350000,
  availability: 2,
  description: 'A repurposed battle-tested VTOL/VSTOL platform, exec-shuttle passenger variant.',
  tags: ['vtol'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 35,
    speedInterval: 60,
    topSpeed: 420,
    body: 16,
    armor: 10,
    pilot: 2,
    sensor: 2,
    seats: { crew: 2, total: 10 },
  },
});

const federated_boeing_osprey_x = V({
  id: 'federated_boeing_osprey_x',
  label: 'Federated Boeing Osprey X',
  cost: 800000,
  availability: 4,
  description: 'The combat/recon original the Commuter was repurposed from.',
  tags: ['vtol'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 35,
    speedInterval: 80,
    topSpeed: 420,
    body: 16,
    armor: 16,
    pilot: 4,
    sensor: 4,
    seats: { crew: 2, total: 10 },
  },
});

// ---- Vehicle Modifications ----
// Not built from V() — these attach to a vehicle rather than being
// one, so no automatic wireless. Judged individually instead. Applies
// universally across all three splits, kept here as the "primary"
// vehicle file.

const rigger_interface = {
  id: 'rigger_interface',
  label: 'Rigger Interface',
  category: 'vehicle_mod',
  cost: 1000,
  availability: 2,
  legality: null,
  wireless: true,
  image: null,
  description: "Lets a rigger jump in and feel like the vehicle rather than remote-controlling it. All drones include one standard; vehicles need it installed separately unless noted.",
  tags: ['vehicle_mod'],
  stats: {},
};

const standard_weapon_mount = {
  id: 'standard_weapon_mount',
  label: 'Standard Weapon Mount',
  category: 'vehicle_mod',
  cost: 2500,
  availability: 4,
  legality: 'illegal',
  image: null,
  description: 'Holds an assault rifle or smaller plus 250 rounds. Vehicles can carry mounts up to (unaugmented Body / 3, rounded down). Superseded by the Hardpoint system (additions.js) for new builds — kept for reference/backward compatibility.',
  tags: ['vehicle_mod'],
  stats: {
    mountSlotsUsed: 1,
  },
};

const heavy_weapon_mount = {
  id: 'heavy_weapon_mount',
  label: 'Heavy Weapon Mount',
  category: 'vehicle_mod',
  cost: 5000,
  availability: 5,
  legality: 'illegal',
  image: null,
  description: 'Counts as 2 mounts. Holds anything plus 500 belted rounds or up to (Body) rockets/missiles. Superseded by the Hardpoint system (additions.js) for new builds — kept for reference/backward compatibility.',
  tags: ['vehicle_mod'],
  stats: {
    mountSlotsUsed: 2,
  },
};

const manual_operation = {
  id: 'manual_operation',
  label: 'Manual Operation',
  category: 'vehicle_mod',
  cost: 500,
  // Source lists Availability as "+1" — a modifier on top of whatever
  // weapon mount it's added to, not a flat number. `null` alone would
  // look like an unknown/malformed value; using availabilityModifier
  // instead makes the relationship explicit.
  availability: null,
  availabilityModifier: 1,
  legality: null,
  image: null,
  description: 'Adds manual operation to a weapon mount. Vehicles only, not drones.',
  tags: ['vehicle_mod'],
  stats: {},
};

// Reference data, not a purchasable item. Superseded by the Hardpoint
// system (additions.js) for new builds — kept for reference/backward
// compatibility with anything already using the old mount system.
export const VEHICLE_WEAPON_MOUNT_RULES = {
  maxMountsFormula: 'floor(unaugmented Body / 3)',
  fireArc: '90 degrees, both horizontal and vertical; fires remotely unless Manual Operation is added (vehicles only, not drones)',
  mounts: {
    standard: { slotsUsed: 1, holds: 'Assault Rifle or smaller, plus 250 rounds' },
    heavy: { slotsUsed: 2, holds: 'Anything, plus 500 belted rounds or up to (Body) rockets/missiles' },
  },
};

export const GEAR_VEHICLES = {
  dodge_scoot, harley_davidson_scorpion, yamaha_growler, suzuki_mirage,
  chrysler_nissan_jackrabbit, honda_spirit, eurocar_westwind_x80, hyundai_shin_hyung, ford_americar, saeder_krupp_bentley_concordat, mitsubishi_nightsky,
  toyota_gopher, gmc_bulldog_step_van, range_rover_2080, ares_roadmaster,
  artemis_nightwing, cessna_c750, mct_sikorsky_bell_seahawk,
  ares_dragon, mct_sikorsky_bell_wolfhound, northrup_wasp,
  ares_venture, gmc_banshee, federated_boeing_commuter, federated_boeing_osprey_x,
  rigger_interface, standard_weapon_mount, heavy_weapon_mount, manual_operation,
};

export const GEAR_VEHICLES_IDS = Object.keys(GEAR_VEHICLES);
