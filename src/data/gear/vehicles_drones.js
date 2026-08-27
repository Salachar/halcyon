// Vehicles/Drones gear catalog — full list from the Vehicles and Drones chapter.
// Same envelope as GEAR.js. Stat shape here is the most uniform of any
// category — every item just fills the same vehicle stat block, no
// per-item variance the way weapon DV notation had.
//
// Verified against 13g-gear-vehicles-drones.md (Gear Part 7/Final, pp.
// 294-304) in full. Every stat on every vehicle/drone item already
// matched source exactly except the one gap noted below — a strong
// contrast to earlier files, and expected given this chapter's tables
// are the most uniform in the book.
//
// Two irregularities in the source table worth flagging:
//
// 1. A few rows list "X/Y" for Seats (GMC Bulldog, Ares Roadmaster, Ares
//    Dragon, Ares Venture, GMC Banshee) — that's crew seats / total
//    capacity for the SAME vehicle, not two variants. Modeled as
//    `seats: { crew, total }` instead of a plain number for just these.
// 2. Two rows pack two genuinely different vehicles into one line
//    (Federated Boeing Commuter/Osprey X, Nissan Samurai/Oni) — every
//    stat differs between them, so those got split into two real items
//    rather than forced into one row with slash-separated stats.
//    CORRECTION (this pass): a THIRD such row was missed — Proteus
//    Lamprey/Sea Snake lists Availability as "2/4", and the prose
//    explicitly calls the Availability-4 version the military "Sea
//    Snake" variant (same stats otherwise). The original build kept
//    this as one item with a description footnote instead of splitting
//    it like the other two dual-vehicle rows — added `proteus_sea_snake`
//    as a real second item to match the established pattern.
//
// `wireless: true` is set for EVERY vehicle and drone here, unlike the
// other gear files — this isn't an item-by-item judgment call. Every
// entry carries `pilot`/`sensor` stats, meaning it's inherently a
// Matrix-connected node by what it fundamentally is (autonomous Pilot
// control, sensor readings, rigger operability), not something that
// happens to have a networked feature. Drones are the textbook example
// of "devices slaved for remote operation" in the Matrix rules. Vehicle
// Modifications is the one section with real per-item calls: Rigger
// Interface is the literal DNI-connection mod (wireless); the weapon
// mounts are physical hardware (not); Manual Operation is explicitly
// the non-networked alternative (not).
// Full-text search confirms this chapter has no "Wireless bonus:" text
// anywhere — the one "wireless" mention (Proteus Lamprey's "wireless
// doesn't reach that deep") is a limitation, not a bonus, so nothing to
// add there.
//
// WEAPON MOUNT CAPACITY (this pass, per brief investigation ask):
// previously informational-only. The source states vehicles can carry
// mounts up to (unaugmented Body / 3, rounded down), and a heavy mount
// "counts as 2 mounts" — both are crisp, computable rules, not vague
// prose, so they're now modeled: `mountSlotsUsed` on each mount item,
// plus an exported `VEHICLE_WEAPON_MOUNT_RULES` reference constant
// (same pattern as SENSOR_PACKAGE_MAX_RATING in
// sensors_security_survival.js) carrying the max-mounts formula and
// each mount type's carry capacity/fire arc.

const V = (overrides) => ({
  category: 'vehicle',
  legality: null,
  wireless: true,
  image: null,
  ...overrides,
});
const D = (overrides) => ({
  category: 'drone',
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

// ---- Boats ----

const samuvani_criscraft_otter = V({
  id: 'samuvani_criscraft_otter',
  label: 'Samuvani CrisCraft Otter',
  cost: 25000,
  availability: 2,
  description: 'A plain 5m open-hull all-purpose craft, ubiquitous worldwide.',
  tags: ['boat'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 10,
    speedInterval: 15,
    topSpeed: 90,
    body: 6,
    armor: 4,
    pilot: 2,
    sensor: 2,
    seats: 6,
  },
});

const aztechnology_sunrunner = V({
  id: 'aztechnology_sunrunner',
  label: 'Aztechnology Sunrunner/Nightrunner',
  cost: 39000,
  availability: 3,
  description: 'A rebranded (formerly illicit-reputation "Nightrunner") craft with a sealable canopy and generous cargo/cruising space.',
  tags: ['boat'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 20,
    speedInterval: 20,
    topSpeed: 120,
    body: 10,
    armor: 8,
    pilot: 3,
    sensor: 3,
    seats: 5,
  },
});

const gmc_riverine = V({
  id: 'gmc_riverine',
  label: 'GMC Riverine',
  cost: 113000,
  availability: 4,
  description: 'An armored gunboat, sometimes disguised as unarmed to avoid drawing law-enforcement attention.',
  tags: ['boat'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 15,
    speedInterval: 15,
    topSpeed: 100,
    body: 14,
    armor: 12,
    pilot: 4,
    sensor: 4,
    seats: 8,
    facilityCapacityProvided: 3,
  },
});

// ---- Submarines ----

const proteus_lamprey = V({
  id: 'proteus_lamprey',
  label: 'Proteus Lamprey/Sea Snake',
  cost: 15000,
  availability: 2,
  description: '4-passenger underwater sea-sled; passengers use their own scuba gear or built-in systems (doubles cost, 16 metahuman-hours of air total). Each seat can swap for a small-drone rack, or two seats for a medium drone. Manned depth limit 100m; drone-loaded models reach 200m on tether/remote (wireless doesn\'t reach that deep). Civilian model — see also the military Sea Snake variant.',
  tags: ['submarine'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 13,
    speedInterval: 10,
    topSpeed: 60,
    body: 2,
    armor: 1,
    pilot: 2,
    sensor: 1,
    seats: 4,
  },
});

const proteus_sea_snake = V({
  id: 'proteus_sea_snake',
  label: 'Proteus Sea Snake',
  cost: 15000,
  availability: 4,
  description: 'Military variant of the Proteus Lamprey, used for spec-ops aquatic insertion — identical stats, higher Availability. Passengers use their own scuba gear or built-in systems (doubles cost, 16 metahuman-hours of air total). Each seat can swap for a small-drone rack, or two seats for a medium drone. Manned depth limit 100m; drone-loaded models reach 200m on tether/remote (wireless doesn\'t reach that deep).',
  tags: ['submarine'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 13,
    speedInterval: 10,
    topSpeed: 60,
    body: 2,
    armor: 1,
    pilot: 2,
    sensor: 1,
    seats: 4,
  },
});

const ynt_delfin = V({
  id: 'ynt_delfin',
  label: 'YNT Delfin',
  cost: 110000,
  availability: 3,
  description: 'A 3-person sub with interchangeable (including offensive) attachments; used for rescue, patrol, or aquacology recon/resupply.',
  tags: ['submarine'],
  stats: {
    handling: { onRoad: 5 },
    acceleration: 18,
    speedInterval: 10,
    topSpeed: 70,
    body: 6,
    armor: 12,
    pilot: 3,
    sensor: 3,
    seats: 3,
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

// ---- Drones: Microdrones ----

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

// ---- Drones: Minidrones ----

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

// ---- Drones: Small Drones ----

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

// ---- Drones: Medium Drones ----

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

// ---- Drones: Large Drones ----

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

// ---- Vehicle Modifications ----
// Not built from V()/D() — these attach to a vehicle rather than being
// one, so no automatic wireless. Judged individually instead.

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
  description: 'Holds an assault rifle or smaller plus 250 rounds. Vehicles can carry mounts up to (unaugmented Body / 3, rounded down).',
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
  description: 'Counts as 2 mounts. Holds anything plus 500 belted rounds or up to (Body) rockets/missiles.',
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

// Reference data, not a purchasable item — see file header note.
// Captures the weapon-mount capacity system requested by this pass's
// investigation: how many mounts a vehicle can carry, and what each
// mount type holds/how it fires.
export const VEHICLE_WEAPON_MOUNT_RULES = {
  maxMountsFormula: 'floor(unaugmented Body / 3)',
  fireArc: '90 degrees, both horizontal and vertical; fires remotely unless Manual Operation is added (vehicles only, not drones)',
  mounts: {
    standard: { slotsUsed: 1, holds: 'Assault Rifle or smaller, plus 250 rounds' },
    heavy: { slotsUsed: 2, holds: 'Anything, plus 500 belted rounds or up to (Body) rockets/missiles' },
  },
};

export const GEAR_VEHICLES_DRONES = {
  dodge_scoot, harley_davidson_scorpion, yamaha_growler, suzuki_mirage,
  chrysler_nissan_jackrabbit, honda_spirit, eurocar_westwind_x80, hyundai_shin_hyung, ford_americar, saeder_krupp_bentley_concordat, mitsubishi_nightsky,
  toyota_gopher, gmc_bulldog_step_van, range_rover_2080, ares_roadmaster,
  samuvani_criscraft_otter, aztechnology_sunrunner, gmc_riverine,
  proteus_lamprey, proteus_sea_snake, ynt_delfin,
  artemis_nightwing, cessna_c750, mct_sikorsky_bell_seahawk,
  ares_dragon, mct_sikorsky_bell_wolfhound, northrup_wasp,
  ares_venture, gmc_banshee, federated_boeing_commuter, federated_boeing_osprey_x,
  gmc_micromachine, shiawase_kanmushi, sikorsky_bell_microskimmer_xxs, mct_gnat,
  gm_nissan_flip_flop, shiawase_inu, horizon_flying_eye, mct_hornet,
  chrysler_nissan_pursuit_v, aztechnology_crawler, cyberspace_designs_quadrotor, lockheed_optic_x2,
  gm_nissan_doberman, nissan_samurai, nissan_oni, mct_nissan_roto_drone, federated_boeing_blackhawk,
  steel_lynx_combat_drone, ares_packmule, cyberspace_designs_dalmatian, ares_black_sky,
  rigger_interface, standard_weapon_mount, heavy_weapon_mount, manual_operation,
};

export const GEAR_VEHICLES_DRONES_IDS = Object.keys(GEAR_VEHICLES_DRONES);
