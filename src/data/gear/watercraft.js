// Watercraft — split out of the former monolithic vehicles_drones.js
// (Vehicles / Watercraft / Drones). This pass takes the file from 18
// entries to 73, importing the full official Double Clutch water
// catalog plus the homebrew and Deadly Waves rosters.
//
// SOURCES AND THEIR PRECEDENCE:
//
// 1. "Double-Clutch-03a-...powerboats-sailboats-motorboats.md" and
//    "Double-Clutch-03b-...ships-submersibles-submarines.md" — the
//    official SR6 catalog. Highest authority; imported verbatim.
// 2. Recalibrated large homebrew vessels (Ares Cutlass, Zeppelinwerke
//    Sovereign, Wuxing Meridian, Saeder-Krupp Ballastline, Aztechnology
//    Marejada) — priced against real Double Clutch anchors rather than
//    the original guesses, which ran roughly two orders of magnitude
//    too cheap.
// 3. The homebrew roster (Sendaku Marchesa, Wuxing Longhaul, Ha-Tech
//    Bollard, Redfin Draghunter, GMC Dredgeline) — costs corrected
//    against real small-craft anchors (Evo Waterking, Corsair line,
//    Wavecutter MPAC).
// 4. Deadly Waves (SR4A) vessels, already re-derived into SR6 math
//    against the project's own anchors. Used as-is; no further
//    SR4A->SR6 conversion applied here.
//
// PRICING NOTE: no source here (official or homebrew) is treated as
// gospel — each is a guide, not an authority. GMC Riverine and Sea Ray
// Cottonmouth were both re-priced up from their originally-printed
// values after a cross-category sanity check (an armed 8-seat gunboat
// costing about the same as an unarmed 2-seat sports car doesn't hold
// up); Maersk Shipyards Wavecutter MPAC likewise moved well above its
// printed 342,000¥ once compared against a similarly-armored vessel
// from a different source (Deadly Waves' Aztechnology Tiburon). Treat
// any other entry that feels off the same way — nudge it and move on.
//
// TWO ENTRIES FROM DEADLY WAVES ARE INTENTIONALLY ABSENT: the
// Aztechnology Nightrunner (same vessel line as the existing
// Sunrunner/Nightrunner) and the GMC Riverine (already present with
// current SR6 numbers).
//
// NOT A NAME COLLISION: "GMC Wave Cutter" (a two-seat jetski) and
// "Maersk Shipyards Wavecutter MPAC" (the party's 28m patrol craft)
// are genuinely different vehicles from different books. Both names
// are kept verbatim. A Wavecutter can legitimately carry Wave Cutters.
//
// A handful of numeric collisions between homebrew and official
// entries (identical Cost or Body values landing on two different
// hulls by coincidence) were nudged apart during cleanup so every
// vessel has a distinct number; none of the adjustments are large
// enough to matter at the table.
//
// SHIPS IN COMBAT: Double Clutch defines a "ship" as any vessel over
// 25m capable of operating smaller craft from itself, and rules that
// ships generally aren't meant to be fought through Vehicle Combat
// math — they're plot devices, set pieces, and heist targets. Boarding
// one is also a different legal proposition than boarding a boat (you
// enter the jurisdiction of whatever flag it flies), and ships support
// wards, ritual foundations, and lodges the way a Hearth does. There's
// no app mechanism enforcing any of this — it's GM judgment call, same
// as everything else left manual in this project. In practice the
// Body/Seats/Cost numbers on these hulls gate them on their own.
//
// TAGS: 'boat' and 'submarine' remain the two tags the UI renders
// (GearVehiclesDrones.jsx calls gearByTag on exactly those). Every
// entry still carries one of them, so nothing changes visually. The
// additional subcategory tags below are inert today and exist so the
// Boats table can be split later without re-touching every entry:
//   boat subcategories ... 'personal_watercraft', 'powerboat',
//     'sailboat', 'motorboat', 'yacht', 'working_craft', 'patrol_craft',
//     'ship', 'semi_sub'
//   submarine subcategories ... 'dpv', 'submersible', 'minisub',
//     'cargo_sub', 'attack_sub'
//
// DUAL-MODE STATS: roughly twenty entries list two values for movement
// stats under different operating conditions (powered vs. rowed, sail
// vs. inboard engine, submerged vs. surfaced). The old ad-hoc fields on
// zodiac_whisper (accelerationRowed / speedIntervalRowed /
// topSpeedRowed, plus handling.offRoadNote) are replaced with a single
// `altMode` object carrying a label and only the stats that differ.
// Note that `handling.offRoadNote` never rendered at all — formatHandling
// in GearVehiclesDrones.jsx only reads `handling.offRoad` — so the
// Whisper's rowed handling has been invisible in the table until now.
// See the companion note for the two-line formatter change that surfaces
// altMode. For submarines the PRIMARY stats are the submerged values
// and altMode carries the surfaced ones, matching how the source prints
// them.
//
// ADDITION CAPACITY (`additionCapacityProvided`): per the Additions &
// Capacity primer, this is a soft-gate guideline number, not a derived
// formula — it only exists on vehicles roomy/crewed enough that hosting
// a Medbay/Armory/Comms Array/Vehicle Bay/etc. makes sense at all.
// Personal watercraft, small open-hull powerboats, RIBs, DPVs, and all
// small drones/subs carry no such stat (they simply can't host
// Additions). Values below are a first pass, eyeballed off Body/role,
// not precision-tuned — nudge freely later.

// Once, near the top of watercraft.js
const rawImages = import.meta.glob('/src/images/vehicles/watercraft/*.png', { eager: true, import: 'default' });
const images = Object.fromEntries(
  Object.entries(rawImages).map(([path, url]) => [path.split('/').pop().replace('.png', ''), url])
);

const V = (overrides) => ({
  category: 'vehicle',
  legality: null,
  wireless: true,
  image: null,
  ...overrides,
});

// ============================================================
// PERSONAL WATERCRAFT — wetbikes, scooters, sea-sleds
// (No additionCapacityProvided anywhere in this section — too small
// to host any Addition.)
// ============================================================

const mitsubishi_waterbug = V({
  id: 'mitsubishi_waterbug',
  label: 'Mitsubishi Waterbug',
  image: images.mitsubishi_waterbug ?? null,
  cost: 7500,
  availability: 2,
  description: 'A one-person (two at a push) wetbike whose quinjet system — a stern waterjet plus two sideways-pointing pairs — gives it turning ability nothing else on the water matches. Popular for recreation, security patrol, and beach insertions. Weapon mounts are a poor idea: past bare steerage speed the firing angle is unworkable, so passengers are better off shooting over the side.',
  tags: ['boat', 'personal_watercraft'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 15,
    speedInterval: 25,
    topSpeed: 80,
    body: 5,
    armor: 3,
    pilot: 1,
    sensor: null,
    seats: 1,
  },
});

const mitsubishi_waveskipper = V({
  id: 'mitsubishi_waveskipper',
  label: 'Mitsubishi Waveskipper',
  image: images.mitsubishi_waveskipper ?? null,
  cost: 9000,
  availability: 2,
  description: 'The enlarged 2079 follow-up to the Waterbug, running a septjet system and seating two comfortably (three at a push). Less nimble than its predecessor but in high enough demand to carry a waitlist measured in months. Same weapon-mount caveat applies.',
  tags: ['boat', 'personal_watercraft'],
  stats: {
    handling: { onRoad: 5 },
    acceleration: 15,
    speedInterval: 20,
    topSpeed: 80,
    body: 6,
    armor: 3,
    pilot: 1,
    sensor: null,
    seats: 2,
  },
});

const suzuki_watersport = V({
  id: 'suzuki_watersport',
  label: 'Suzuki Watersport',
  image: images.suzuki_watersport ?? null,
  cost: 4000,
  availability: 1,
  description: "A thirty-year staple of wageslave leisure — pedestrian performance keeps the insurance affordable and a healthy secondhand market keeps it within reach of anyone who wants one. The Puget Sound swarms with them on the first warm day after winter. Runs an older generation of software and hardware than anything else in its class.",
  tags: ['boat', 'personal_watercraft'],
  stats: {
    handling: { onRoad: 5 },
    acceleration: 12,
    speedInterval: 10,
    topSpeed: 60,
    body: 3,
    armor: 1,
    pilot: 1,
    sensor: 1,
    seats: 1,
  },
});

const gmc_wave_cutter = V({
  id: 'gmc_wave_cutter',
  label: 'GMC Wave Cutter',
  image: images.gmc_wave_cutter ?? null,
  cost: 7800,
  availability: 1,
  description: "GMC's enlarged family wave runner, built to carry two adults, with better performance and better dealer service than its competitors. Its autopilot — lifted wholesale from a delivery-drone program — includes passenger-retrieval and return-home routines that make it drivable by younger family members, and reliable right up until something happens that isn't already in the database.",
  tags: ['boat', 'personal_watercraft'],
  stats: {
    handling: { onRoad: 6 },
    acceleration: 15,
    speedInterval: 12,
    topSpeed: 70,
    body: 4,
    armor: 2,
    pilot: 3,
    sensor: 1,
    seats: 2,
  },
});

// ============================================================
// POWERBOATS — small, fast, almost always open-topped
// ============================================================

const kawasaki_stingray = V({
  id: 'kawasaki_stingray',
  label: 'Kawasaki Stingray',
  image: images.kawasaki_stingray ?? null,
  cost: 12500,
  availability: 2,
  description: 'A proper monohull small boat rather than a wetbike — more comfortable, far more modifiable, and notably more stable and usable at low speed, which makes it a real option for a subtle insertion.',
  tags: ['boat', 'powerboat'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 22,
    speedInterval: 40,
    topSpeed: 110,
    body: 7,
    armor: 3,
    pilot: 1,
    sensor: 1,
    seats: 2,
  },
});

const kawasaki_manta_ray = V({
  id: 'kawasaki_manta_ray',
  label: 'Kawasaki Manta Ray',
  image: images.kawasaki_manta_ray ?? null,
  cost: 15500,
  availability: 2,
  description: 'The larger of the Kawasaki monohull pair — a seat more, a little more hull, slightly better handling, slightly less outright acceleration than the Stingray.',
  tags: ['boat', 'powerboat'],
  stats: {
    handling: { onRoad: 5 },
    acceleration: 20,
    speedInterval: 35,
    topSpeed: 110,
    body: 8,
    armor: 3,
    pilot: 1,
    sensor: 1,
    seats: 3,
  },
});

const zodiac_whisper_civilian = V({
  id: 'zodiac_whisper_civilian',
  label: 'Zodiac Whisper (Civilian)',
  image: images.zodiac_whisper_civilian ?? null,
  cost: 5000,
  availability: 2,
  description: 'A small flat-bottomed inflatable, deflatable for storage and light enough for two metahumans (or one troll) to carry, steered by the outboard motor itself with no built-in electronics — a genuine throwback. Standard Equipment: easy assembly/disassembly. Only Powertrain mods can be installed. Alternate stats apply when rowed.',
  tags: ['boat', 'powerboat'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 15,
    speedInterval: 25,
    topSpeed: 50,
    body: 4,
    armor: 2,
    pilot: null,
    sensor: null,
    seats: 4,
    altMode: {
      label: 'Rowed',
      handling: 4,
      acceleration: 5,
      speedInterval: 5,
      topSpeed: 10,
    },
  },
});

const zodiac_whisper = V({
  id: 'zodiac_whisper',
  label: 'Zodiac Whisper (Military)',
  image: images.zodiac_whisper_industrial ?? null,
  cost: 11000,
  availability: 7,
  description: 'The military variant of the Whisper — tougher, air-droppable, and favored by real special forces (UCAS SEALs, British SBS) for exactly the kind of insertion and exfil work it excels at. Small enough to stow in the bay of a larger vessel like the Wavecutter MPAC. Standard Equipment: easy assembly/disassembly, passive stealth features. Only Powertrain mods can be installed. Alternate stats apply when rowed.',
  tags: ['boat', 'powerboat'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 15,
    speedInterval: 25,
    topSpeed: 60,
    body: 5,
    armor: 4,
    pilot: null,
    sensor: null,
    seats: 4,
    altMode: {
      label: 'Rowed',
      handling: 4,
      acceleration: 5,
      speedInterval: 5,
      topSpeed: 10,
    },
  },
});

const bae_atlantic_pacific_28 = V({
  id: 'bae_atlantic_pacific_28',
  label: 'BAE Systems Atlantic/Pacific 28',
  image: images.bae_pacific ?? null,
  cost: 35000,
  availability: 3,
  description: "A 9-meter rigid inflatable, the newest in BAE's line, exceptionally durable and very hard to sink — developed alongside the RNLI, hence its use in lifeboats. The Atlantic runs outboards; the Pacific runs an inboard waterjet and is the version navies and security forces buy, since unlike a true inflatable a RIB can mount weapons. Standard Equipment: increased structural integrity 4.",
  tags: ['boat', 'powerboat'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 15,
    speedInterval: 15,
    topSpeed: 60,
    body: 8,
    armor: 5,
    pilot: 2,
    sensor: 3,
    seats: 8,
  },
});

const marine_technologies_barracuda = V({
  id: 'marine_technologies_barracuda',
  label: 'Marine Technologies Barracuda',
  image: images.marine_technologies_barracuda ?? null,
  cost: 32000,
  availability: 4,
  description: "The classic rigid-hull inflatable, shipped with three different outboard brackets so the buyer can pick their own engine. Advanced polymers and composites shrug off long salt-water and pollution exposure, and a basic sensor suite comes standard with upgrade kits available for crowded or restricted waterways. Favored by cash-strapped anti-piracy units for its range and toughness — tougher than the BAE 28, though without its structural reinforcement.",
  tags: ['boat', 'powerboat'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 12,
    speedInterval: 15,
    topSpeed: 75,
    body: 12,
    armor: 8,
    pilot: 2,
    sensor: 2,
    seats: 8,
  },
});

const zemlya_poltava_swordsman = V({
  id: 'zemlya_poltava_swordsman',
  label: 'Zemlya-Poltava Swordsman',
  image: images.zemlya_poltava_swordsman ?? null,
  cost: 25000,
  availability: 2,
  description: "A classic seven-meter utility design updated many times over a long production history — folding canopy, two sleeping berths, modern wireless connectivity, twin outboards for cruising power and redundancy. Handles lakes and rivers easily. Standard Equipment: satellite communication. Worth knowing before you modify one: any real upgrade degrades its performance, and re-engining to compensate for the added weight is obvious to any experienced onlooker. Good for a soft approach, nothing harder.",
  tags: ['boat', 'powerboat'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 10,
    speedInterval: 15,
    topSpeed: 90,
    body: 12,
    armor: 4,
    pilot: 2,
    sensor: 2,
    seats: 6,
    additionCapacityProvided: 1,
  },
});

const mostrans_wave_glider = V({
  id: 'mostrans_wave_glider',
  label: 'MosTrans Wave Glider',
  image: images.mostrans_wave_glider ?? null,
  cost: 350000,
  availability: 6,
  description: "A long, low-slung racing hull for people who pick speed over comfort — four engines pushing water through both ducted jets and traditional screws, and a crew compartment kept spartan to save weight and drag. A modified Wave Glider took Seattle's Independence Cup last year, shortly after nearly removing a spectator's sailboat from the race.",
  tags: ['boat', 'powerboat'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 18,
    speedInterval: 20,
    topSpeed: 130,
    body: 8,
    armor: 3,
    pilot: 2,
    sensor: 1,
    seats: 3,
  },
});

const colorado_craft_hydroconvertable = V({
  id: 'colorado_craft_hydroconvertable',
  label: 'Colorado Craft "Cigarette" Hydroconvertable',
  image: images.colorado_craft_hydroconvertable ?? null,
  cost: 55000,
  availability: 4,
  description: "The definition of speed and a Light Limited Class mainstay for twenty years — an open-topped six-meter hull that switches from planing to hydrofoil configuration mid-run with a switch and a push on the throttle. The current model adds fuel economy and wake-reduction gear to satisfy new safe-boating rules in some jurisdictions.",
  tags: ['boat', 'powerboat'],
  stats: {
    handling: { onRoad: 5 },
    acceleration: 20,
    speedInterval: 22,
    topSpeed: 145,
    body: 6,
    armor: 2,
    pilot: 1,
    sensor: 1,
    seats: 2,
  },
});

const sea_ray_cottonmouth = V({
  id: 'sea_ray_cottonmouth',
  label: 'Sea Ray Cottonmouth',
  image: images.sea_ray_cottonmouth ?? null,
  cost: 200000,
  availability: '6(I)',
  description: "A fragile but lightning-fast 14-meter cigarette boat, common (and hazardous to navigation) in Caribbean waters and frequently bought by people with more nuyen than sense. It blurs the powerboat/motorboat line — an enclosed cabin with two small berths makes it the only powerboat class worth jumping into. Four factory-fitted small-arms mounts make it more threat than most boats expect, and it's small enough to fit some ships' small-boat holds. Standard Equipment: amenities (squatter), living space (low) x2, increased acceleration 1, 2x standard weapon mount with blow-away panels front, 2x rear, rigger adaptation.",
  tags: ['boat', 'powerboat'],
  stats: {
    handling: { onRoad: 5 },
    acceleration: 50,
    speedInterval: 40,
    topSpeed: 180,
    body: 8,
    armor: 4,
    pilot: 3,
    sensor: 3,
    seats: 4,
    additionCapacityProvided: 1,
  },
});

const samuvani_criscraft_otter = V({
  id: 'samuvani_criscraft_otter',
  label: 'Samuvani CrisCraft Otter',
  image: images.samuvani_criscraft_otter ?? null,
  cost: 25000,
  availability: 2,
  description: 'A plain 5m open-hull all-purpose craft, ubiquitous worldwide.',
  tags: ['boat', 'powerboat'],
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
  image: images.aztechnology_nightrunner ?? null,
  cost: 39000,
  availability: 3,
  description: 'A rebranded (formerly illicit-reputation "Nightrunner") craft with a sealable canopy and generous cargo/cruising space. Corrosion-proof hull and components throughout, with a low-powered trolling motor running off batteries or an optional Suncell.',
  tags: ['boat', 'powerboat'],
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
    additionCapacityProvided: 1,
  },
});

const gmc_riverine = V({
  id: 'gmc_riverine',
  label: 'GMC Riverine',
  image: images.gmc_riverine ?? null,
  cost: 400000,
  availability: 4,
  description: 'An armored gunboat, sometimes disguised as unarmed to avoid drawing law-enforcement attention. Typically mounts one weapon in a turret above the crew compartment, with room on the aft deck for either a drone rack or a second mount. Civilian sales exist, generally used and post-decertification.',
  tags: ['boat', 'powerboat', 'patrol_craft'],
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
    additionCapacityProvided: 3,
  },
});

// ============================================================
// SAILBOATS
// Rigger adaptation always includes solo-sailing automation. Nearly
// all carry at least an outboard for harbor use, since HarborGuide
// requires it and pure sailing in a harbor generally isn't feasible.
// ============================================================

const horizon_freedom = V({
  id: 'horizon_freedom',
  label: 'Horizon Freedom',
  image: images.horizon_freedom ?? null,
  cost: 3500,
  availability: 2,
  description: "An enlarged-dinghy range aimed at kids and new sailors — too small for an inboard, but it takes a small outboard (500¥ extra) or can simply be rowed. A common choice for a quiet waterfront insertion. Alternate top speed applies under the mini-outboard.",
  tags: ['boat', 'sailboat'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 2,
    speedInterval: 3,
    topSpeed: 10,
    body: 4,
    armor: 3,
    pilot: null,
    sensor: null,
    seats: 5,
    altMode: {
      label: 'Mini-outboard',
      topSpeed: 8,
    },
  },
});

const corsair_elysium = V({
  id: 'corsair_elysium',
  label: 'Corsair Elysium',
  image: images.corsair_elysium ?? null,
  cost: 73000,
  availability: 3,
  description: "A single-mast monohull that trades berthing and storage space for a much bigger engine than a sailboat this size normally carries — still slower than a dedicated powerboat, but faster than most cabin cruisers, with extra bow thrusters and a large articulated waterjet nozzle for maneuvering. Visually near-identical to the Ellipse above the waterline. Standard Equipment: amenities (middle), living space (low) x6, improved economy 1. Alternate stats apply under inboard engine.",
  tags: ['boat', 'sailboat'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 10,
    speedInterval: 10,
    topSpeed: 20,
    body: 12,
    armor: 9,
    pilot: 2,
    sensor: 3,
    seats: 6,
    additionCapacityProvided: 1,
    altMode: {
      label: 'Under engine',
      handling: 5,
      speedInterval: 20,
      topSpeed: 50,
    },
  },
});

const corsair_ellipse = V({
  id: 'corsair_ellipse',
  label: 'Corsair Ellipse',
  image: images.corsair_ellipse ?? null,
  cost: 58000,
  availability: 3,
  description: "The traditional alternative to the Elysium for sailors who object to a large engine eating their storage — smaller powerplant, a normal rudder instead of thrusters and a steerable nozzle. Standard Equipment: amenities (middle), living space (middle) x6. Alternate stats apply under inboard engine.",
  tags: ['boat', 'sailboat'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 8,
    speedInterval: 10,
    topSpeed: 20,
    body: 12,
    armor: 9,
    pilot: 2,
    sensor: 3,
    seats: 6,
    additionCapacityProvided: 1,
    altMode: {
      label: 'Under engine',
      acceleration: 3,
      speedInterval: 5,
      topSpeed: 10,
    },
  },
});

const corsair_panther = V({
  id: 'corsair_panther',
  label: 'Corsair Panther',
  image: images.corsair_panther ?? null,
  cost: 130000,
  availability: 3,
  description: "The catamaran-hulled cousin of the Elysium — faster on the water thanks to catamaran hydrodynamics, with dual slightly-smaller inboards giving about 20% more power than the monohulls. Berths eight comfortably for months at sea on suncell-topped batteries. Standard Equipment: amenities (middle), living space (low) x8, improved economy 1, suncell. Alternate stats apply under inboard engine.",
  tags: ['boat', 'sailboat'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 10,
    speedInterval: 10,
    topSpeed: 30,
    body: 14,
    armor: 9,
    pilot: 2,
    sensor: 3,
    seats: 8,
    additionCapacityProvided: 2,
    altMode: {
      label: 'Under engine',
      handling: 5,
      acceleration: 20,
      speedInterval: 30,
      topSpeed: 60,
    },
  },
});

const corsair_puma = V({
  id: 'corsair_puma',
  label: 'Corsair Puma',
  image: images.corsair_puma ?? null,
  cost: 98000,
  availability: 3,
  description: "The cheaper, more traditional (and notably non-black) version of the Panther. Same hull and berthing, more conventional propulsion. Standard Equipment: amenities (middle), living space (low) x8, improved economy 1, suncell. Alternate stats apply under inboard engine.",
  tags: ['boat', 'sailboat'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 10,
    speedInterval: 10,
    topSpeed: 30,
    body: 14,
    armor: 9,
    pilot: 2,
    sensor: 3,
    seats: 8,
    additionCapacityProvided: 2,
    altMode: {
      label: 'Under engine',
      acceleration: 4,
      speedInterval: 5,
      topSpeed: 15,
    },
  },
});

const corsair_trident = V({
  id: 'corsair_trident',
  label: 'Corsair Trident',
  image: images.corsair_trident ?? null,
  cost: 145000,
  availability: 4,
  description: "A single-mast trimaran and among the fastest sailboats made — two engines (one in each outrigger's central hull) plus retracting outriggers give it speed no reasonable person expects from a sailboat. Spacious central-hull berthing plus clever outrigger storage lets it stay at sea for months. Standard Equipment: amenities (middle), living space (varies) x8, suncell, improved economy 1. Alternate stats apply under inboard engine.",
  tags: ['boat', 'sailboat'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 15,
    speedInterval: 10,
    topSpeed: 30,
    body: 16,
    armor: 9,
    pilot: 2,
    sensor: 3,
    seats: 8,
    additionCapacityProvided: 2,
    altMode: {
      label: 'Under engine',
      handling: 5,
      speedInterval: 20,
      topSpeed: 60,
    },
  },
});

const corsair_triton = V({
  id: 'corsair_triton',
  label: 'Corsair Triton',
  image: images.corsair_triton ?? null,
  cost: 115000,
  availability: 2,
  description: "The Trident's single-engine sibling, popular with novice and experienced sailors alike — a group of them is currently past 220 days at sea attempting an endurance record. Standard Equipment: amenities (middle), living space (varies) x8, suncell. Alternate top speed applies under inboard engine.",
  tags: ['boat', 'sailboat'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 10,
    speedInterval: 10,
    topSpeed: 30,
    body: 16,
    armor: 9,
    pilot: 2,
    sensor: 3,
    seats: 8,
    additionCapacityProvided: 2,
    altMode: {
      label: 'Under engine',
      topSpeed: 15,
    },
  },
});

const sendaku_marlin = V({
  id: 'sendaku_marlin',
  label: 'Sendaku Marlin',
  image: images.sendaku_marlin ?? null,
  cost: 58000,
  availability: 8,
  description: "A sailing yacht of respectable lineage with just enough modern touches to appeal to the romantic in a corporate executive — a small engine below decks keeps passengers from being becalmed (and satisfies the regulators), and there's a full bar on the rear deck with an optional hot tub. The scantily clad compatriots frequently seen aboard are not standard equipment; Sendaku's sales rep can arrange them separately, along with other services, if the owner signs an annual maintenance agreement. Standard Equipment: sail power, living amenities (high).",
  tags: ['boat', 'sailboat', 'yacht'],
  stats: {
    handling: { onRoad: 1 },
    acceleration: 5,
    speedInterval: 12,
    topSpeed: 45,
    body: 16,
    armor: 6,
    pilot: 1,
    sensor: 2,
    seats: 8,
    additionCapacityProvided: 2,
  },
});

const wuxing_schooner = V({
  id: 'wuxing_schooner',
  label: 'Wuxing Schooner',
  image: images.wuxing_schooner ?? null,
  cost: 3900000,
  availability: 12,
  description: "A two-masted long-distance luxury sailing vessel with extensive living arrangements, though in practice it spends more time as a party venue in exclusive marinas than crossing open ocean — especially popular with wealthy boating enthusiasts in the CAS. Wuxing bought a Charleston repair facility to guarantee factory-authorized service. Standard Equipment: sail power, living amenities (luxury).",
  tags: ['boat', 'sailboat', 'yacht'],
  stats: {
    handling: { onRoad: 1 },
    acceleration: 6,
    speedInterval: 12,
    topSpeed: 50,
    body: 18,
    armor: 6,
    pilot: 3,
    sensor: 3,
    seats: 14,
    additionCapacityProvided: 3,
  },
});

// ============================================================
// MOTORBOATS — comfort and stability over pure speed
// ============================================================

const evo_waterking = V({
  id: 'evo_waterking',
  label: 'Evo Waterking',
  image: images.evo_waterking ?? null,
  cost: 71000,
  availability: 2,
  description: "An 18-meter cabin cruiser, one of the most common and accessible boats on the water thanks to an enormous secondhand market. A compact engine maximizes interior space: stern seating over the engine, a forward galley and dining cabin, a head and shower, two two-berth cabins on the main deck, plus another head and four more cabins below. Minor mods adapt it for diving or fishing, which gives it a useful veneer of legitimacy — though it is emphatically not a getaway boat. Standard Equipment: amenities (middle), living space (middle) x12.",
  tags: ['boat', 'motorboat'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 2,
    speedInterval: 5,
    topSpeed: 25,
    body: 18,
    armor: 10,
    pilot: 3,
    sensor: 2,
    seats: 12,
    additionCapacityProvided: 2,
  },
});

const evo_aquavida_1 = V({
  id: 'evo_aquavida_1',
  label: 'Evo Aquavida 1',
  image: images.evo_aquavida_1 ?? null,
  cost: 93000,
  availability: 2,
  description: "A 9-meter houseboat/motorboat hybrid in the one-cabin layout — main-deck living area, galley, bathroom, and a pilot house above with extra seating. Standard Equipment: amenities (middle), living space (middle) x2, winch (basic).",
  tags: ['boat', 'motorboat'],
  stats: {
    handling: { onRoad: 5 },
    acceleration: 2,
    speedInterval: 5,
    topSpeed: 20,
    body: 14,
    armor: 10,
    pilot: 2,
    sensor: 3,
    seats: 8,
    additionCapacityProvided: 2,
  },
});

const evo_aquavida_2 = V({
  id: 'evo_aquavida_2',
  label: 'Evo Aquavida 2',
  image: images.evo_aquavida_2 ?? null,
  cost: 133000,
  availability: 2,
  description: "The two-cabin layout of the Aquavida — same hull and identical performance, reconfigured interior and a considerably higher price. Standard Equipment: amenities (middle), living space (middle) x4, winch (basic).",
  tags: ['boat', 'motorboat'],
  stats: {
    handling: { onRoad: 5 },
    acceleration: 2,
    speedInterval: 5,
    topSpeed: 20,
    body: 14,
    armor: 10,
    pilot: 2,
    sensor: 3,
    seats: 8,
    additionCapacityProvided: 2,
  },
});

const mitsubishi_water_home = V({
  id: 'mitsubishi_water_home',
  label: 'Mitsubishi Water Home',
  image: images.mitsubishi_water_home ?? null,
  cost: 87000,
  availability: 6,
  description: "Mitsubishi's mass-production take on the venerable houseboat — cast fiberglass hull, composite superstructure, integrated appliances covering most modern-home conveniences, and an upper hull resin-coated against acid rain. Large, slow, and built for calm water and mooring; its low freeboard would swamp in open ocean. Hybrid electric propulsion with a small diesel backup. Standard Equipment: suncell, amenities (middle). Makes a decent safe house with the option of casually relocating a few kilometers, and a meeting place that keeps everyone honest — nobody brings heavy ordnance to a negotiation held above their own escape route.",
  tags: ['boat', 'motorboat'],
  stats: {
    handling: { onRoad: 1 },
    acceleration: 4,
    speedInterval: 8,
    topSpeed: 25,
    body: 20,
    armor: 5,
    pilot: 2,
    sensor: 1,
    seats: 8,
    additionCapacityProvided: 3,
  },
});

// ============================================================
// YACHTS
// ============================================================

const sendaku_marchesa = V({
  id: 'sendaku_marchesa',
  label: 'Sendaku Marchesa',
  image: images.sendaku_marchesa ?? null,
  cost: 220000,
  availability: 6,
  description: "A mid-size luxury cruiser built for comfort over capability — sun deck, small galley, a stabilized ride that won't upset a client's drink. No armor plating to speak of; anyone bringing this into a fight made a poor life choice.",
  tags: ['boat', 'motorboat', 'yacht'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 8,
    speedInterval: 20,
    topSpeed: 70,
    body: 16,
    armor: 6,
    pilot: 3,
    sensor: 3,
    seats: 10,
    additionCapacityProvided: 2,
  },
});

const dolphin_ii = V({
  id: 'dolphin_ii',
  label: 'Dolphin II',
  image: images.dolphin_ii ?? null,
  cost: 280000,
  availability: 13,
  description: "The redesigned Dolphin, rebuilt below decks around entertainment and functional amenities for a clientele that expects both. Satellite comms keep passengers connected to their patrons, and extra fuel capacity plus Suncell extend the diesel-electric drive's endurance considerably. Its enhanced security precautions — including a concealed remote weapon mount as standard — are marketed as reducing the ability of terrorists to interfere with legitimate ocean travel. The professional escort's yacht. Standard Equipment: satellite communications, additional fuel tank, suncell, weapon mount (concealed, flexible, remote).",
  tags: ['boat', 'motorboat', 'yacht'],
  stats: {
    handling: { onRoad: 1 },
    acceleration: 8,
    speedInterval: 15,
    topSpeed: 65,
    body: 20,
    armor: 7,
    pilot: 3,
    sensor: 4,
    seats: 12,
    additionCapacityProvided: 3,
  },
});

const zeppelinwerke_elite_cruiser = V({
  id: 'zeppelinwerke_elite_cruiser',
  label: 'Zeppelinwerke Elite Cruiser',
  image: images.zeppelinwerke_elite_cruiser ?? null,
  cost: 5500000,
  availability: 14,
  description: "A large, ostentatious display of wealth and privilege, normally berthed in an exclusive marina and rarely on open water for longer than a weekend. Owners keep a living crew and rarely convert to rigger control, because the crew is itself part of the status symbol. Advanced communications, safety features, limited self-repair drones, custom appearance packages. Built by Proteus at its North Sea arkoblocks and shipped to customers aboard other vessels. Standard Equipment: satellite communication, enhanced image screens, drone rack (mini), pimped ride 2.",
  tags: ['boat', 'motorboat', 'yacht'],
  stats: {
    handling: { onRoad: 0 },
    acceleration: 10,
    speedInterval: 15,
    topSpeed: 60,
    body: 26,
    armor: 9,
    pilot: 4,
    sensor: 4,
    seats: 16,
    additionCapacityProvided: 4,
  },
});

const zeppelinwerke_sovereign_class = V({
  id: 'zeppelinwerke_sovereign_class',
  label: 'Zeppelinwerke Sovereign-Class Superyacht',
  image: images.zeppelinwerke_sovereign_class ?? null,
  cost: 240000000,
  availability: 12,
  description: "A step up from even the Elite Cruiser's excess — same manufacturer lineage, a full generation and two orders of magnitude further up the price scale. Full crew quarters, a helipad, an actual pool, and enough range to cross an ocean without stopping anywhere the owner doesn't want to be seen. Built to be a destination in itself, not just transportation.",
  tags: ['boat', 'ship', 'yacht'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 9,
    speedInterval: 10,
    topSpeed: 55,
    body: 32,
    armor: 12,
    pilot: 5,
    sensor: 5,
    seats: 20,
    additionCapacityProvided: 6,
  },
});

const lurssen_mobius = V({
  id: 'lurssen_mobius',
  label: 'Lurssen Mobius',
  image: images.lurssen_mobius ?? null,
  cost: 400000000,
  availability: 9,
  description: "A 140-meter ultra-luxury superyacht — the archetypal shadowrunner big-score dream and, for a rigger, the ultimate dream job. Fully automated with thirty service drones (at least eight anthroform models doubling as security) capable of handling any passenger need including piloting, though most owners prefer a human at the helm. Five decks: lower (machinery, drone-only), virtua (an internal dock for one 15m and four 5-10m craft plus a dozen personal watercraft, and a reconfigurable AR/physical virtuadeck), living (ten guest cabins plus an owner's stateroom with its own gym, office, conference room and entertainment suite), entertainment (four bars, six hot tubs, a pool, a bow sunning deck with helicopter pad access), and sun. Also carries two mini-blimps, ten Roto-Drones, and optional concealed charging for eight Steel Lynx ground combat drones.",
  tags: ['boat', 'ship', 'yacht'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 10,
    speedInterval: 10,
    topSpeed: 50,
    body: 36,
    armor: 14,
    pilot: 6,
    sensor: 5,
    seats: 22,
    additionCapacityProvided: 8,
  },
});

// ============================================================
// THE PLAYERS' VESSEL
// ============================================================

const wavecutter_mpac = V({
  id: 'wavecutter_mpac',
  label: 'Maersk Shipyards Wavecutter MPAC',
  image: images.wavecutter_mpac ?? null,
  cost: 2600000,
  availability: '8(I)',
  description: "A 28-meter maritime patrol and assault craft built for coast guard, corporate security, and paramilitary customers who need corvette-adjacent capability without a navy's procurement budget. Hardened hull, a proper onboard Matrix suite, electronic countermeasures, and a small craft bay aft big enough for a RIB or a pair of personal watercraft. Genuinely rare outside government and cartel hands — most that reach civilian or shadow ownership were decommissioned, seized, or simply never accounted for. Anyone who sees one on open water assumes it belongs to someone worth avoiding.",
  tags: ['boat', 'motorboat', 'patrol_craft'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 10,
    speedInterval: 25,
    topSpeed: 100,
    body: 25,
    armor: 20,
    pilot: 4,
    sensor: 5,
    seats: 12,
    additionCapacityProvided: 6,
  },
});

// ============================================================
// WORKING & INDUSTRIAL CRAFT
// ============================================================

const ha_tech_bollard_class = V({
  id: 'ha_tech_bollard_class',
  label: 'Ha-Tech Bollard-Class Harbor Tugboat',
  image: images.ha_tech_bollard_class ?? null,
  cost: 55000,
  availability: 3,
  description: 'Small, stubby, absurdly strong for its size — built to muscle freighters and tankers into their berths, not to go anywhere fast. A favorite low-key smuggling platform precisely because nobody expects a tugboat to be carrying anything but rope and diesel.',
  tags: ['boat', 'working_craft'],
  stats: {
    handling: { onRoad: 2 },
    acceleration: 8,
    speedInterval: 8,
    topSpeed: 40,
    body: 16,
    armor: 5,
    pilot: 2,
    sensor: 2,
    seats: 4,
    additionCapacityProvided: 1,
  },
});

const redfin_marine_draghunter = V({
  id: 'redfin_marine_draghunter',
  label: 'Redfin Marine Draghunter Trawler',
  image: images.redfin_marine_draghunter ?? null,
  cost: 64000,
  availability: 4,
  description: 'A working fishing boat, nets and winches included, built to spend weeks at sea in rough water without complaint. Common cover for smuggling runs and a favorite of anyone who needs a boat nobody will ask questions about.',
  tags: ['boat', 'working_craft'],
  stats: {
    handling: { onRoad: 2 },
    acceleration: 9,
    speedInterval: 12,
    topSpeed: 55,
    body: 18,
    armor: 5,
    pilot: 2,
    sensor: 2,
    seats: 6,
    additionCapacityProvided: 1,
  },
});

const gmc_dredgeline_workbarge = V({
  id: 'gmc_dredgeline_workbarge',
  label: 'GMC Dredgeline Workbarge',
  image: images.gmc_dredgeline_workbarge ?? null,
  cost: 140000,
  availability: 4,
  description: 'A flat-decked, self-propelled barge fitted with a crane and dredging arm — port maintenance, salvage work, or hauling something too big and awkward for a normal deck. Slow, ugly, and everywhere; a fixture in any working harbor.',
  tags: ['boat', 'working_craft'],
  stats: {
    handling: { onRoad: 0 },
    acceleration: 4,
    speedInterval: 8,
    topSpeed: 25,
    body: 22,
    armor: 4,
    pilot: 1,
    sensor: 2,
    seats: 4,
    additionCapacityProvided: 1,
  },
});

// ============================================================
// PATROL CRAFT & CORVETTES
// ============================================================

const ares_cutlass_class = V({
  id: 'ares_cutlass_class',
  label: 'Ares Cutlass-Class Patrol Craft',
  image: images.ares_cutlass_class ?? null,
  cost: 8500000,
  availability: '16F',
  description: "A lean coastal-interdiction hull, well below true naval-corvette scale — what a corp security division or a wealthy cartel buys when a real warship is overkill (and unaffordable) but a Wavecutter-tier boat isn't enough gun. 2 weapon mounts (1 turret, 1 flexible), both external/armored/manned.",
  tags: ['boat', 'patrol_craft'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 15,
    speedInterval: 15,
    topSpeed: 110,
    body: 28,
    armor: 22,
    pilot: 5,
    sensor: 5,
    seats: 18,
    additionCapacityProvided: 4,
  },
});

const aztechnology_tiburon = V({
  id: 'aztechnology_tiburon',
  label: 'Aztechnology Tiburon',
  image: images.aztechnology_tiburon ?? null,
  cost: 2400000,
  availability: '29F',
  description: "Marketed as a stealth design when introduced; its profile is now in every detection platform's database, and the outdated signature-reduction tech offers only limited protection. What survives is its nearly legendary versatility — sold in a range of sub-versions each with its own armament fit, and still selling strongly to corporate buyers. These stats represent the combat variant; the standard model is much less heavily armed. 3x weapon mounts (external, flexible, armored, manned), signature masking 1.",
  tags: ['boat', 'patrol_craft'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 18,
    speedInterval: 15,
    topSpeed: 130,
    body: 26,
    armor: 18,
    pilot: 2,
    sensor: 4,
    seats: 10,
    additionCapacityProvided: 4,
  },
});

const blohm_voss_river_commander = V({
  id: 'blohm_voss_river_commander',
  label: 'Blohm & Voss River Commander',
  image: images.blohm_voss_river_commander ?? null,
  cost: 3500000,
  availability: '30F',
  description: "A classic design with considerably more cargo space than a patrol corvette usually carries, and larger than most of its competition. Nearly thirty years in production, with annual output slowly declining as more modern designs and better marketing eat into Blohm & Voss's share. 1x reinforced weapon mount (external, turret, armored, manned) plus 3x weapon mounts (external, flexible, manned).",
  tags: ['boat', 'patrol_craft'],
  stats: {
    handling: { onRoad: 2 },
    acceleration: 15,
    speedInterval: 15,
    topSpeed: 100,
    body: 28,
    armor: 16,
    pilot: 3,
    sensor: 5,
    seats: 14,
    additionCapacityProvided: 5,
  },
});

// ============================================================
// SHIPS — SAIL
// ============================================================

const cutty_sark_ii = V({
  id: 'cutty_sark_ii',
  label: 'Cutty Sark II',
  image: images.cutty_sark_ii ?? null,
  cost: 54835700,
  availability: 9,
  description: "An exact museum-piece replica of the 19th-century tea clipper, built with period-authentic skills, materials, and processes by a corporate-sponsored university consortium, now a living floating museum with a permanent crew of 30 and 12 guest berths carrying a years-long waitlist. Deliberately carries no modern electronics whatsoever — no Matrix icon, no sensors, no dogbrain, no propulsion but wind. The crew, on the other hand, are heavily augmented and combat-capable, and repelled a pirate boarding a few years back with thoroughly modern weapons. For every 5 crew unable to assist with sailing, increase Handling by 1 and reduce Acceleration and Speed Interval by 1. Standard Equipment: amenities (middle), living space (low) x28, living space (middle) x14.",
  tags: ['boat', 'ship', 'sailboat'],
  stats: {
    handling: { onRoad: 5 },
    acceleration: 10,
    speedInterval: 10,
    topSpeed: 30,
    body: 36,
    armor: 12,
    pilot: null,
    sensor: null,
    seats: 42,
    additionCapacityProvided: 5,
  },
});

const mv_poseidons_endeavour = V({
  id: 'mv_poseidons_endeavour',
  label: "MV Poseidon's Endeavour",
  image: images.mv_poseidons_endeavour ?? null,
  cost: 13000000,
  availability: 9,
  description: "The technological opposite of the Cutty Sark II — a modern hull with a fully automated control system and revolutionary rotating wing-shaped sails, one per mast across three masts, reaching speeds previously unheard of under sail, with full electrical power for very long range. Astonishingly, a single sufficiently skilled rigger can sail her, though extra hands are needed for maintenance and for coming alongside in port. One of the first vessels fitted with Network Sharing Enhancement. Standard Equipment: amenities (middle), improved economy, living space (middle) x34, nanomaintenance repair system 2, network sharing enhancement, rigger adaptation, rigger cocoon, suncell.",
  tags: ['boat', 'ship', 'sailboat'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 8,
    speedInterval: 12,
    topSpeed: 50,
    body: 40,
    armor: 18,
    pilot: 4,
    sensor: 5,
    seats: 34,
    additionCapacityProvided: 6,
  },
});

// ============================================================
// SHIPS — PASSENGER
// ============================================================

const tranquility_princess = V({
  id: 'tranquility_princess',
  label: 'Tranquility Princess',
  image: images.tranquility_princess ?? null,
  cost: 980000000,
  availability: 9,
  description: "The latest liner in Princess Cruises' State-class (Princess being a Maersk subsidiary), built for comfort with more — and slightly cheaper — cabins than older liners, all-inclusive tickets, and a guaranteed evening in the Gala Ballroom for every passenger. 412m long, 48m beam, one of the top twelve cruise liners afloat, carrying 5,490 passengers and 1,211 crew at a stately 26 knots on four propeller pods driven by a micro-fission reactor. Currently running a Carib League and eastern-seaboard route. Standard Equipment: amenities (luxury), improved stability 3, integrated Matrix device (10x satellite link, 6x RCC, 85x ports), living space across all tiers x6,700, rigger adaptation, rigger cocoon, suncell.",
  tags: ['boat', 'ship'],
  stats: {
    length: '412m',
    handling: { onRoad: 3 },
    acceleration: 8,
    speedInterval: 10,
    topSpeed: 40,
    body: 34,
    armor: 16,
    pilot: 4,
    sensor: 5,
    seats: 95,
    additionCapacityProvided: 10,
  },
});

const cunard_princess_victoria = V({
  id: 'cunard_princess_victoria',
  label: 'Cunard Princess Victoria Liner',
  image: images.cunard_princess_victoria ?? null,
  cost: 147000000,
  availability: '30R',
  description: "Cunard produces one Princess Victoria-class liner a year, either replacing older vessels or selling to minor lines; most are actually built by Wuxing in Asian yards. Like most liners they stay in or near established shipping lanes to avoid pirates and freelancers. The latest version shows how far automation has cut operating costs — nearly two thousand passengers carried in luxury with a housekeeping staff of ten, drones handling maintenance that used to require a dry dock, and most of the 300-person crew devoted to customer service rather than actually running the ship. A week-long cruise gives ample time to case security before an extraction. Standard Equipment: amenities (high), extra entry/exit points.",
  tags: ['boat', 'ship'],
  stats: {
    length: '260m',
    handling: { onRoad: 0 },
    acceleration: 2,
    speedInterval: 15,
    topSpeed: 90,
    body: 31,
    armor: 10,
    pilot: 3,
    sensor: 4,
    seats: 2000,
    additionCapacityProvided: 10,
  },
});

// ============================================================
// SHIPS — CARGO
// ============================================================

const wuxing_longhaul_class = V({
  id: 'wuxing_longhaul_class',
  label: 'Wuxing Longhaul-Class Freighter',
  image: images.wuxing_longhaul_class ?? null,
  cost: 38000000,
  availability: '10R',
  description: "A slow, unglamorous workhorse moving containers between ports on a regional/coastal network rather than crossing an ocean. Not built to run from anything — its best defense is looking too boring to bother with.",
  tags: ['boat', 'ship'],
  stats: {
    handling: { onRoad: 1 },
    acceleration: 5,
    speedInterval: 10,
    topSpeed: 50,
    body: 30,
    armor: 10,
    pilot: 2,
    sensor: 2,
    seats: 12,
    additionCapacityProvided: 3,
  },
});

const maersk_jorgenson_fast_freighter = V({
  id: 'maersk_jorgenson_fast_freighter',
  label: 'Maersk-Jorgenson Fast Freighter',
  image: images.maersk_jorgenson_fast_freighter ?? null,
  cost: 11750000,
  availability: '21R',
  description: "Maersk has shipped cargo across the ocean for over a century, with hulls for hire in nearly every major port. The current favored model prioritizes speedy delivery over pure fuel efficiency, and its integral container cranes let it unload itself — meeting contracts without depending on chief competitor Wuxing's whims. Sometimes fitted with sky sails. Standard Equipment: special machinery (crane).",
  tags: ['boat', 'ship'],
  stats: {
    length: '300m',
    handling: { onRoad: 1 },
    acceleration: 4,
    speedInterval: 12,
    topSpeed: 120,
    body: 30,
    armor: 22,
    pilot: 1,
    sensor: 3,
    seats: 20,
    additionCapacityProvided: 4,
  },
});

const red_wheel_type_68 = V({
  id: 'red_wheel_type_68',
  label: 'Red Wheel Type 68 Freighter',
  image: images.red_wheel_type_68 ?? null,
  cost: 19000000,
  availability: '24R',
  description: "Wuxing's most recent rigger-controlled freighter class, nine a year out of the Geoje Island yard using enhanced mega-block construction. Capable of sailing with nobody aboard, relying on autopilot and a rigger's remote link to reach its destination — a harbor pilot meets it hours out for a manual inspection, since it will not stop for anything smaller in its path. Rarely sold outright; Wuxing leases them, generally with a Wuxing rigger supplied and preferential maintenance terms provided repairs happen at a Wuxing facility. Standard Equipment: rigger adaptation, satellite communications, nanomaintenance system 1, fuzzy logic, interior cameras.",
  tags: ['boat', 'ship'],
  stats: {
    length: '350m',
    handling: { onRoad: 0 },
    acceleration: 2,
    speedInterval: 10,
    topSpeed: 75,
    body: 26,
    armor: 18,
    pilot: 4,
    sensor: 4,
    seats: 6,
    additionCapacityProvided: 3,
  },
});

const wuxing_meridian_class = V({
  id: 'wuxing_meridian_class',
  label: 'Wuxing Meridian-Class Container Ship',
  image: images.wuxing_meridian_class ?? null,
  cost: 640000000,
  availability: '12R',
  description: "One of thousands of near-identical container haulers keeping the world's ports fed — automated cranes, skeleton crew, and enough deck space to lose a body (or a shipping container full of contraband) without anyone noticing for weeks.",
  tags: ['boat', 'ship'],
  stats: {
    length: '320m',
    handling: { onRoad: 2 },
    acceleration: 6,
    speedInterval: 12,
    topSpeed: 70,
    body: 42,
    armor: 14,
    pilot: 3,
    sensor: 4,
    seats: 24,
    additionCapacityProvided: 6,
  },
});

const saeder_krupp_ballastline = V({
  id: 'saeder_krupp_ballastline',
  label: 'Saeder-Krupp Ballastline Bulk Carrier',
  image: images.saeder_krupp_ballastline ?? null,
  cost: 480000000,
  availability: '10R',
  description: "Built to haul ore, grain, and raw materials by the tens of thousands of tons — enormous, slab-sided, and nearly featureless. Its hull is its whole personality; there's nothing subtle about a Ballastline arriving in port. Priced below the comparably-sized Meridian-Class container ship, reflecting how much simpler its handling gear is by comparison.",
  tags: ['boat', 'ship'],
  stats: {
    length: '290m',
    handling: { onRoad: 1 },
    acceleration: 4,
    speedInterval: 10,
    topSpeed: 60,
    body: 45,
    armor: 12,
    pilot: 2,
    sensor: 3,
    seats: 20,
    additionCapacityProvided: 6,
  },
});

const aztechnology_marejada_class = V({
  id: 'aztechnology_marejada_class',
  label: 'Aztechnology Marejada-Class Tanker',
  image: images.aztechnology_marejada_class ?? null,
  cost: 720000000,
  availability: '12R',
  description: "A floating hazard by design — millions of liters of crude or refined product in a hull that's one bad day away from an environmental catastrophe. Corp-flagged tankers get quiet naval escort more often than anyone likes to admit.",
  tags: ['boat', 'ship'],
  stats: {
    length: '330m',
    handling: { onRoad: 1 },
    acceleration: 4,
    speedInterval: 10,
    topSpeed: 55,
    body: 46,
    armor: 10,
    pilot: 2,
    sensor: 3,
    seats: 22,
    additionCapacityProvided: 6,
  },
});

const maersk_double_l_class = V({
  id: 'maersk_double_l_class',
  label: 'Maersk Double L-Class UHCS',
  image: images.maersk_double_l_class ?? null,
  cost: 186500000,
  availability: 9,
  description: "The current pinnacle of mass maritime freight — an Ultra-Huge Cargo Ship built to the Mega-Max standard introduced with the Panama Canal's third-phase expansion, with 98 in service and hull #100 due summer 2082. 625m long, 72m beam, up to 26m draft fully laden, holding as much as 35,000 TEU at a maximum 26 knots (typically run at 20 for efficiency) on twin electric impeller pods driven by a pair of small fusion reactors plus suncell. Limited to the handful of Mega-Max-capable ports — Everett, serving Seattle/Portland/Tacoma, is the only fully operational one on the West Coast since Los Angeles's port was nearly destroyed. The 13 officers and 63 crew live in high comfort, and Maersk has revived the old merchant-navy tradition of letting them bring family aboard for the length of a contract.",
  tags: ['boat', 'ship'],
  stats: {
    length: '625m',
    handling: { onRoad: 6 },
    acceleration: 4,
    speedInterval: 8,
    topSpeed: 40,
    body: 70,
    armor: 12,
    pilot: 4,
    sensor: 3,
    seats: 19,
    additionCapacityProvided: 10,
  },
});

const factory_ship = V({
  id: 'factory_ship',
  label: 'Factory Ship',
  image: images.factory_ship ?? null,
  cost: 7000000000,
  availability: 9,
  description: "Long rumored and now confirmed real: at most two dozen still operating worldwide, many having been lost during the nanopocalypse. Each is a self-contained floating factory producing goods at roughly the output of two land-based plants, powered by two or more fusion reactors and mostly fully automated, with a few dozen crew maintaining the drones — though at least two are known to use meaningful metahuman labor on their assembly lines. Whichever megacorp owns one defends it with a massive security detail, heavy firepower, and combat-augmented crew. Standard Equipment: amenities (high), command and control comms, electronic countermeasures 4, integrated Matrix device (2x satellite link, 4x RCC, 30x ports), living space x225, network sharing enhancement, rigger adaptation, rigger cocoon, RAM plating 4, passive stealth features.",
  tags: ['boat', 'ship'],
  stats: {
    handling: { onRoad: 5 },
    acceleration: 5,
    speedInterval: 10,
    topSpeed: 20,
    body: 90,
    armor: 22,
    pilot: 4,
    sensor: 6,
    seats: 225,
    additionCapacityProvided: 12,
  },
});

// ============================================================
// SHIPS — MILITARY
// ============================================================

const shiawase_aohana_class = V({
  id: 'shiawase_aohana_class',
  label: 'Shiawase Aohana-Class Frigate',
  image: images.shiawase_aohana_class ?? null,
  cost: 98000000,
  availability: '30F',
  description: "Shiawase isn't known for military production, but has sold this frigate to the Imperial Navy for close to fifteen years. Primarily an Anti-Submarine Warfare platform — fully outfitted vessels deploy a variety of torpedoes and rocket-boosted weapons plus a helicopter or drone to extend detection radius. Shiawase began selling this lighter-armed export version six years ago; sales are modest, but it supplements the line's Japanese orders. A serious threat to anything trying to slip past underwater. 1x reinforced turret mount plus 1x turret mount (both armored/manned), 2x torpedo launchers, helicopter/drone pad.",
  tags: ['boat', 'ship'],
  stats: {
    length: '110m',
    handling: { onRoad: 3 },
    acceleration: 10,
    speedInterval: 18,
    topSpeed: 105,
    body: 32,
    armor: 26,
    pilot: 4,
    sensor: 6,
    seats: 40,
    additionCapacityProvided: 6,
  },
});

const aztechnology_cipactli_class = V({
  id: 'aztechnology_cipactli_class',
  label: 'Aztechnology Cipactli-Class Corvette',
  image: images.aztechnology_cipactli_class ?? null,
  cost: 185389000,
  availability: '9(I)',
  description: "A general-purpose littoral warship named for the Aztec sea monster, equally capable in anti-ship, anti-submarine, and anti-air roles, forming the mainstay of the Aztlan/Aztechnology navy and doing double duty as Caribbean gunboats. Three vertical-launch missile batteries (anti-air forward, anti-submarine amidships, anti-ship aft), a bow-mounted 115mm naval gun for shore support, and four Tortoise CIWS point-defense systems — 20mm autocannon plus twin direct-fire missile pods — that a jumped-in rigger can redirect against surface targets. Heavy automation keeps the crew to 15 officers and 80 crew, including at least four dedicated riggers. 114m long, 13m beam, 3,100 tonnes. Standard Equipment: amenities (middle), electronic countermeasures 2, improved stability 1, increased structural integrity 1, life safety system 2, living space x95, mil-spec plate 4, network sharing enhancement, ram plating 2, rigger adaptation, rigger cocoon.",
  tags: ['boat', 'ship'],
  stats: {
    length: '114m',
    handling: { onRoad: 4 },
    acceleration: 15,
    speedInterval: 15,
    topSpeed: 70,
    body: 44,
    armor: 28,
    pilot: 4,
    sensor: 6,
    seats: 95,
    additionCapacityProvided: 8,
  },
});

const uss_ranger_class = V({
  id: 'uss_ranger_class',
  label: 'USS Ranger-Class Battlecruiser',
  image: images.uss_ranger_class ?? null,
  cost: 123694000,
  availability: '9(I)',
  description: "The recently launched lead ship of a planned five-ship UCAS class reviving the battlecruiser concept — battleship-grade missile firepower, faster and less armored — meant to handle both smaller surface combatants and enemy carriers, and effectively kicking off a new naval arms race. Two miniature fusion cores drive four impeller pods and eight thrusters to a brisk 45 knots. Believed to mount three heavy naval railgun turrets (two forward, one aft, two guns each) plus directional and vertical-launch SAM and anti-ship batteries where a fourth turret would sit, backed by six next-gen CIWS and four secondary turrets — rumored able to engage twenty-plus large surface combatants at once. Very hard to photograph thanks to passive stealth features; roughly 400m long, sized to fit the Neopanamax locks. Sea-trial crew is 27 officers and 210 crew; final complement is expected around 55 officers and 450 crew once armed.",
  tags: ['boat', 'ship'],
  stats: {
    length: '~400m',
    handling: { onRoad: 5 },
    acceleration: 12,
    speedInterval: 8,
    topSpeed: 60,
    body: 60,
    armor: 45,
    pilot: 6,
    sensor: 6,
    seats: 535,
    additionCapacityProvided: 10,
  },
});

// ============================================================
// SEMI-SUBMERSIBLES — run mostly awash, hard to spot
// (No additionCapacityProvided — bare smuggling/insertion hulls.)
// ============================================================

const cartel_courier = V({
  id: 'cartel_courier',
  label: 'Cartel Courier',
  image: images.cartel_courier ?? null,
  cost: 53000,
  availability: '8R',
  description: "Cartels have run semi-submersibles for close to eighty years; construction has standardized and nanoforge technology has made the hulls cheap. Law enforcement has gotten much better at detecting them, but enough still get through that the Courier stays in production and in use, even in the contested waters off Colombia. Cheap enough that operators sink them rather than risk an empty return trip. Standard Equipment: signature masking 3, multifuel engine.",
  tags: ['boat', 'semi_sub'],
  stats: {
    handling: { onRoad: 1 },
    acceleration: 4,
    speedInterval: 8,
    topSpeed: 50,
    body: 16,
    armor: 4,
    pilot: 2,
    sensor: 1,
    seats: 2,
  },
});

const sk_subskimmer = V({
  id: 'sk_subskimmer',
  label: 'SK Subskimmer',
  image: images.sk_subskimmer ?? null,
  cost: 25000,
  availability: 6,
  description: "An inflatable boat and diver-propulsion vehicle in one, marketed hard to mercenary commands, Aegean diving tours, and special-forces buyers worldwide. The outboard normally runs on hydrocarbons with a battery system for underwater use, and a snorkel option extends submerged range by running the sealed outboard. Small signature, seats five comfortably — a solid way to slip a team past patrols, and a pleasant way to watch a reef if nobody's shooting. Standard Equipment: ballast tanks 1.",
  tags: ['boat', 'semi_sub'],
  stats: {
    length: '15m',
    handling: { onRoad: 2 },
    acceleration: 6,
    speedInterval: 10,
    topSpeed: 35,
    body: 8,
    armor: 2,
    pilot: 2,
    sensor: 1,
    seats: 5,
  },
});

// ============================================================
// SUBMERSIBLES
// A submersible operates underwater but can't function fully
// independently — it must return to a tender, surface base, or parent
// submarine/aquacology.
//
// CRUSH DEPTH (Double Clutch): any vessel beyond its crush depth must
// resist 10P damage every combat round, doubling for every additional
// 10 meters past it. No amount of burnt Edge reverses a hull collapse.
// ============================================================

const aquadyne_dpv_basic = V({
  id: 'aquadyne_dpv_basic',
  label: 'AquaDyne DPV (Basic)',
  image: images.aquadyne_dpv_basic ?? null,
  cost: 500,
  availability: 1,
  description: "Less a vehicle than an accessory — a handheld electric motor and shrouded propeller for scuba divers, worked by a simple throttle. The basic grade is a battery, a motor, and handlebars: cheap, and absolutely everywhere. Battery capacity 6 hours.",
  tags: ['submarine', 'dpv', 'submersible'],
  stats: {
    handling: { onRoad: 2 },
    acceleration: 3,
    speedInterval: 5,
    topSpeed: 10,
    body: 4,
    armor: 2,
    pilot: null,
    sensor: null,
    seats: 1,
  },
});

const aquadyne_dpv_sport = V({
  id: 'aquadyne_dpv_sport',
  label: 'AquaDyne DPV (Sport)',
  image: images.aquadyne_dpv_sport ?? null,
  cost: 1500,
  availability: 1,
  description: "Nearly twice the length of the basic unit and much faster off the mark — it won't outrun a powerboat, but it might outrun a small shark. Considerably louder, which is a real liability for infiltration work. Higher-end units add a universal data port for AR datajack control; full rigger jump-in doesn't work well on any of them. Battery capacity 4 hours.",
  tags: ['submarine', 'dpv', 'submersible'],
  stats: {
    handling: { onRoad: 3 },
    acceleration: 8,
    speedInterval: 5,
    topSpeed: 15,
    body: 5,
    armor: 2,
    pilot: null,
    sensor: null,
    seats: 1,
  },
});

const aquadyne_dpv_hunter = V({
  id: 'aquadyne_dpv_hunter',
  label: 'AquaDyne DPV (Hunter)',
  image: images.aquadyne_dpv_hunter ?? null,
  cost: 1700,
  availability: 1,
  description: "The mid-sized grade, with a quieter motor and screw and a speargun mount — aimed at spearfishing divers who need speed while staying covert, which makes it the obvious pick for anyone else who needs the same thing. Battery capacity 5 hours. Standard Equipment: passive stealth features.",
  tags: ['submarine', 'dpv', 'submersible'],
  stats: {
    handling: { onRoad: 2 },
    acceleration: 3,
    speedInterval: 5,
    topSpeed: 10,
    body: 4,
    armor: 4,
    pilot: null,
    sensor: null,
    seats: 1,
  },
});

const proteus_lamprey = V({
  id: 'proteus_lamprey',
  label: 'Proteus Lamprey',
  image: images.proteus_lamprey ?? null,
  cost: 15000,
  availability: 2,
  description: "A 4-passenger underwater sea-sled; passengers use their own scuba gear or built-in systems (doubles cost, 16 metahuman-hours of air total). Each seat can swap for a small-drone rack, or two seats for a medium drone. Manned depth limit 100m; drone-loaded models reach 200m on tether/remote, since wireless doesn't reach that deep. Civilian model — see also the military Sea Snake variant.",
  tags: ['submarine', 'submersible'],
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
  image: images.proteus_sea_snake ?? null,
  cost: 15000,
  availability: 4,
  description: "Military variant of the Proteus Lamprey, used for spec-ops aquatic insertion — identical stats, higher Availability. Passengers use their own scuba gear or built-in systems (doubles cost, 16 metahuman-hours of air total). Each seat can swap for a small-drone rack, or two seats for a medium drone. Manned depth limit 100m; drone-loaded models reach 200m on tether/remote.",
  tags: ['submarine', 'submersible'],
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

const maersk_riptide = V({
  id: 'maersk_riptide',
  label: 'Maersk Shipyards Riptide',
  image: images.maersk_riptide ?? null,
  cost: 26300,
  availability: 5,
  description: "A four-seat swimmer delivery vehicle in the WWII manned-torpedo tradition, minus the warhead, carrying enough gear and cargo for embarked special-forces troops to survive weeks behind enemy lines. Easy to assemble and disassemble, since not every parent submarine has proper launch and recovery facilities. Open-topped, so embarked soldiers can use their weapons; high sides add protection and hydrodynamic efficiency, which matters given a finite battery unless it can recharge before exfil. In service with nearly every special-ops community worldwide, plus several AA megacorps, mercenary units, and aquatic-specialist runner teams. Battery capacity 16 hours. Standard Equipment: easy assembly/disassembly, open construction, passive stealth features.",
  tags: ['submarine', 'submersible'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 5,
    speedInterval: 10,
    topSpeed: 20,
    body: 9,
    armor: 8,
    pilot: 2,
    sensor: 3,
    seats: 4,
  },
});

const ynt_delfin = V({
  id: 'ynt_delfin',
  label: 'YNT Delfin',
  image: images.ynt_delfin ?? null,
  cost: 110000,
  availability: 3,
  description: 'A 3-person sub with interchangeable (including offensive) attachments; used for rescue, patrol, or aquacology recon/resupply.',
  tags: ['submarine', 'submersible', 'minisub'],
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

const vulkan_delphin_rq7 = V({
  id: 'vulkan_delphin_rq7',
  label: 'Vulkan Delphin RQ7',
  image: images.vulkan_delphin_rq7 ?? null,
  cost: 450000,
  availability: '12R',
  description: "A large mini-sub carrying up to eight passengers and crew, regularly used by aquablocks for security and maintenance work, common as a tourist vehicle for wreck viewing, and used by salvage firms recovering offshore rigs lost to hurricanes. Fills the gap between the three-seat YNT Delfin and the deep-diving Proteus Marianas. Standard Equipment: ballast tanks 2, life support 2, mechanical grapple.",
  tags: ['submarine', 'submersible', 'minisub'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 10,
    speedInterval: 10,
    topSpeed: 65,
    body: 14,
    armor: 14,
    pilot: 3,
    sensor: 3,
    seats: 8,
    additionCapacityProvided: 2,
  },
});

const proteus_marianas = V({
  id: 'proteus_marianas',
  label: 'Proteus Marianas',
  image: images.proteus_marianas ?? null,
  cost: 195000,
  availability: 7,
  description: "One of the largest dry submersibles capable of reaching the bottom of the Marianas Trench, crewed by six (helm, engineer, four passengers) for extended mineral-exploration, biological-research, and aquacology-siting work. Two integrated cyberarms let the helm — or another VCR-equipped crew member — do complex manipulation directly on site, often far more practical than running a fiber-optic tether to a drone from kilometers away. Typically hosted and launched by a mothership with heavy-duty cranes; crew enter and exit through a dorsal hatch. Battery/air capacity 56 hours; crush depth 11,000m. Standard Equipment: amenities (low), enhanced sensors, extreme environment modification (depth), integrated cyberarm x2, network sharing enhancement, rigger adaptation.",
  tags: ['submarine', 'submersible'],
  stats: {
    handling: { onRoad: 4 },
    acceleration: 6,
    speedInterval: 5,
    topSpeed: 10,
    body: 15,
    armor: 9,
    pilot: 3,
    sensor: 6,
    seats: 6,
    additionCapacityProvided: 2,
  },
});

// ============================================================
// SUBMARINES
// Always dry, always independent — inner and outer hull, pressurized
// to one atmosphere, capable of staying down for weeks or months.
// PRIMARY stats below are SUBMERGED; altMode carries surfaced values.
// ============================================================

const aztech_profit_transport = V({
  id: 'aztech_profit_transport',
  label: 'Aztech Profit Transport',
  image: images.aztech_profit_transport ?? null,
  cost: 530000,
  availability: '8R',
  description: "A medium-range submarine configured as a cargo carrier, intentionally built without acoustic reduction — which makes it far easier to locate than a military boat, and is either terrible design or excellent cover depending who you ask. Normally runs at fifty meters, carrying ten container equivalents in the forward hold with the aft hold for non-containerized goods, handled by a small crane and conveyor. Sold unarmed, though many buyers bolt on a deck weapon to discourage piracy while surfaced. Standard Equipment: ballast tanks 1, life support 2, special machinery (collapsible crane).",
  tags: ['submarine', 'cargo_sub'],
  stats: {
    handling: { onRoad: 1 },
    acceleration: 5,
    speedInterval: 8,
    topSpeed: 45,
    body: 20,
    armor: 8,
    pilot: 3,
    sensor: 2,
    seats: 4,
    additionCapacityProvided: 3,
  },
});

const kravenor_triton_class = V({
  id: 'kravenor_triton_class',
  label: 'Kravenor Triton-Class Submarine',
  image: images.kravenor_triton_class ?? null,
  cost: 17250000,
  availability: 28,
  description: "One of the most common commercial freight submarines on the water, larger than most current military designs at thirty thousand tons submerged. Recent models add labor-saving technology to assist the small crew, and a reliable fusion reactor makes the Triton a favorite for the Arctic cargo run linking the Far East to Europe. Barely slows for anything. Standard Equipment: ballast tanks 1, life support 2, rigger adaptation.",
  tags: ['submarine', 'cargo_sub'],
  stats: {
    length: '170m',
    handling: { onRoad: 1 },
    acceleration: 3,
    speedInterval: 10,
    topSpeed: 90,
    body: 28,
    armor: 18,
    pilot: 3,
    sensor: 3,
    seats: 12,
    additionCapacityProvided: 4,
  },
});

const proteus_sea_class = V({
  id: 'proteus_sea_class',
  label: 'Proteus Sea-Class Cargo Submarine',
  image: images.proteus_sea_class ?? null,
  cost: 1300000000,
  availability: 7,
  description: "A Panamax-standard cargo sub used to move sensitive freight in secrecy and security, avoiding the pirates and critters that plague surface shipping — intercepting a submarine's cargo is vastly harder than boarding a ship. No longer the largest cargo-sub class (Wuxing's T718 took that title in 2079), but Proteus operates more of them than Wuxing and Maersk combined, thanks to a network of arkoblocks and aquacologies needing secure resupply. Three separate interconnected inner hulls, unusual at its depth rating; the largest holds 2,600 TEU, loadable via port-side conveyors or clamshell dorsal cargo doors, letting it dock directly with an aquacology or load at a conventional freight terminal. 280m long, 28m beam, sitting unusually high when surfaced to meet Panamax. Crush depth 1,600m. Alternate stats apply when surfaced.",
  tags: ['submarine', 'cargo_sub'],
  stats: {
    length: '280m',
    handling: { onRoad: 3 },
    acceleration: 8,
    speedInterval: 15,
    topSpeed: 40,
    body: 44,
    armor: 16,
    pilot: 3,
    sensor: 5,
    seats: 93,
    additionCapacityProvided: 8,
    altMode: {
      label: 'Surfaced',
      handling: 6,
      speedInterval: 10,
      topSpeed: 30,
    },
  },
});

const krasnaya_sormova_vaneyev_class = V({
  id: 'krasnaya_sormova_vaneyev_class',
  label: 'Krasnaya Sormova Vaneyev-Class Submarine',
  image: images.krasnaya_sormova_vaneyev_class ?? null,
  cost: 47000000,
  availability: '33F',
  description: "A diesel-electric boat normally operating as a hunter-killer in shallow water, built at the single Krasnaya Sormova yard in Kosmomolsk. Sold to a number of nations and independent parties — not directly to known pirates, but a number have found their way into less savory hands regardless. Frequently seen along the west coast of South America, though recent conflict has thinned their numbers considerably. Its sonic-dampening technology has aged out against modern sonar databases. Roughly fifty tonnes of cargo capacity if repurposed. 4x large torpedo tubes. Standard Equipment: ballast tanks 2, lock-on countermeasures, life support 2.",
  tags: ['submarine', 'attack_sub'],
  stats: {
    length: '175m',
    handling: { onRoad: 4 },
    acceleration: 8,
    speedInterval: 12,
    topSpeed: 110,
    body: 30,
    armor: 32,
    pilot: 5,
    sensor: 6,
    seats: 24,
    additionCapacityProvided: 5,
  },
});

const jin_shio_class = V({
  id: 'jin_shio_class',
  label: 'Japanese Imperial Navy Shio-Class SSI',
  image: images.jin_shio_class ?? null,
  cost: 4900000000,
  availability: '9(I)',
  description: "The Imperial Navy's premier attack boat, roughly analogous in size and shape to a pre-Crash SSN but with a much smaller crew. A single fusion-powered electric pump-jet drives it to 52 knots near-silently. 100m long, 11.5m beam, classic black cigar profile, six 533mm tubes firing anti-ship torpedoes, cruise missiles, and submarine-launched SAMs, crewed by 65. Crush depth 900m. Standard Equipment: amenities (middle), electronic countermeasures 4, enhanced sensors, extreme environment modification (depth), living space x65, network sharing enhancement, passive stealth features, rigger adaptation, rigger cocoon. Alternate stats apply when surfaced.",
  tags: ['submarine', 'attack_sub'],
  stats: {
    length: '100m',
    handling: { onRoad: 4 },
    acceleration: 15,
    speedInterval: 15,
    topSpeed: 60,
    body: 51,
    armor: 26,
    pilot: 4,
    sensor: 6,
    seats: 65,
    additionCapacityProvided: 8,
    altMode: {
      label: 'Surfaced',
      handling: 6,
      speedInterval: 10,
      topSpeed: 40,
    },
  },
});

export const GEAR_WATERCRAFT = {
  // Personal watercraft
  mitsubishi_waterbug, mitsubishi_waveskipper, suzuki_watersport, gmc_wave_cutter,
  // Powerboats
  kawasaki_stingray, kawasaki_manta_ray, zodiac_whisper_civilian, zodiac_whisper,
  bae_atlantic_pacific_28, marine_technologies_barracuda, zemlya_poltava_swordsman,
  mostrans_wave_glider, colorado_craft_hydroconvertable, sea_ray_cottonmouth,
  samuvani_criscraft_otter, aztechnology_sunrunner, gmc_riverine,
  // Sailboats
  horizon_freedom, corsair_elysium, corsair_ellipse, corsair_panther, corsair_puma,
  corsair_trident, corsair_triton, sendaku_marlin, wuxing_schooner,
  // Motorboats
  evo_waterking, evo_aquavida_1, evo_aquavida_2, mitsubishi_water_home,
  // Yachts
  sendaku_marchesa, dolphin_ii, zeppelinwerke_elite_cruiser,
  zeppelinwerke_sovereign_class, lurssen_mobius,
  // The players' vessel
  wavecutter_mpac,
  // Working craft
  ha_tech_bollard_class, redfin_marine_draghunter, gmc_dredgeline_workbarge,
  // Patrol craft and corvettes
  ares_cutlass_class, aztechnology_tiburon, blohm_voss_river_commander,
  // Ships — sail
  cutty_sark_ii, mv_poseidons_endeavour,
  // Ships — passenger
  tranquility_princess, cunard_princess_victoria,
  // Ships — cargo
  wuxing_longhaul_class, maersk_jorgenson_fast_freighter, red_wheel_type_68,
  wuxing_meridian_class, saeder_krupp_ballastline, aztechnology_marejada_class,
  maersk_double_l_class, factory_ship,
  // Ships — military
  shiawase_aohana_class, aztechnology_cipactli_class, uss_ranger_class,
  // Semi-submersibles
  cartel_courier, sk_subskimmer,
  // Submersibles
  aquadyne_dpv_basic, aquadyne_dpv_sport, aquadyne_dpv_hunter,
  proteus_lamprey, proteus_sea_snake, maersk_riptide, ynt_delfin,
  vulkan_delphin_rq7, proteus_marianas,
  // Submarines
  aztech_profit_transport, kravenor_triton_class, proteus_sea_class,
  krasnaya_sormova_vaneyev_class, jin_shio_class,
};

export const GEAR_WATERCRAFT_IDS = Object.keys(GEAR_WATERCRAFT);
