// Vehicle Additions (formerly "Facilities") — attach to the vehicle,
// consume its Addition Capacity. Every Addition also provides an
// Upgrade Capacity of its own, and either an Addition OR an Upgrade can
// optionally be a Storage Unit (storagePreferredCategories array) —
// generic gear storage, not a Capacity-gated relationship at all. A
// Storage Unit's preference list is PURELY for sorting the attach
// picker into Preferred/Other sections, matching cyberware's own
// intended/unintended split — never a gate. A Large Weapon Rack could
// technically hold a car if someone really wanted to; nothing stops it.
//
// Cockpit is GONE as a purchasable Addition — every vehicle now gets a
// small, computed (not stored) native Upgrade Capacity of its own,
// same "derive, don't duplicate" instinct as everything else vehicle-
// side (see nativeUpgradeCapacity, vehicleEconomy.js). Rigger Cocoon
// attaches straight to the vehicle through that native pool — a
// cockpit isn't new capability being installed, it's something every
// vehicle already inherently has.
//
// Hardpoints (Small/Standard/Large/Huge) are Additions like any other
// now, fully replacing the old mountSlotsUsed/floor(Body/3) mount
// system — confirmed no functional loss, hardpoints are a strict
// superset with real numbers the old system never had (+2 Attack
// Rating on mounted weapons, turreted variants costing a size-up).
// Each Hardpoint provides exactly 1 Upgrade slot — Weapon Mounts,
// Drone Racks, Ram Plates, Winches, and Mechanical Arms are all
// Upgrades that attach through it.
//
// Drone Racks are Storage Units preferring a specific drone-size tag
// (microdrone/minidrone/small_drone/medium_drone/large_drone — the
// same tags already used throughout vehicles_drones.js), not a generic
// "drone" category — so a disabled/destroyed Rack clearly identifies
// which specific drones went down with it, and the real size-tiered
// pricing (Mini/Micro=5 drones for 1,000¥ vs. Large=1 for 10,000¥)
// keeps meaning something instead of collapsing into one flat pool.
//
// Vehicle Bay is now just a Storage Unit preferring vehicle/drone —
// this RETIRES the old bespoke "Store Vehicle" mechanism in
// OwnedVehiclesList entirely. One generic mechanism, not several
// pretending to be different things.

function addition(overrides) {
  return {
    category: 'addition', legality: null, image: null, tags: ['addition'],
    stats: { additionCapacityUsed: 1, upgradeCapacityProvided: 3 },
    ...overrides,
  };
}

function upgrade(overrides) {
  return {
    category: 'addition_upgrade', legality: null, image: null, tags: ['addition_upgrade'],
    ...overrides,
  };
}

const medbay = addition({
  id: 'medbay', label: 'Medbay',
  cost: 8000, availability: 4,
  description: 'A dedicated medical bay housing — bonuses come from whatever upgrade modules are installed (see Valkyrie Module).',
});

const workshop_fabrication_bay = addition({
  id: 'workshop_fabrication_bay', label: 'Workshop / Fabrication Bay',
  cost: 6000, availability: 3,
  description: 'A dedicated repair/customization bay housing — bonuses come from whatever upgrade modules are installed. No real upgrade content confirmed yet for this specific Addition.',
});

// A real Matrix device — its own base ASDF, deviceRating, and
// matrixCapacityProvided for Programs (a SEPARATE pool from
// upgradeCapacityProvided — Programs are Matrix-Capacity-gated exactly
// like a commlink; CSMs and other upgrades go through the generic
// upgrade pool instead). Category 'comm_sensor_array' (a
// MATRIX_CATEGORIES entry) rather than 'addition' — Capacity checks
// are stat-presence-based, not category-based, so this doesn't cost it
// its additionCapacityUsed consumption on the mothership vehicle;
// category only controls PAN-zone routing and Primary-eligibility.
// Its real ASDF is dynamic (arrayCompositedStats, vehicleEconomy.js),
// rotating in whatever attached CSMs contribute — these are the floor.
const comms_sensor_array = {
  id: 'comms_sensor_array', label: 'Comms/Sensor Array',
  category: 'comm_sensor_array', legality: null, image: null, wireless: true,
  tags: ['addition'],
  cost: 10000, availability: 4,
  description: "A vehicle's own permanent Matrix device — Comm Sensor Enhancement Modules attach to it through the same generic upgrade pool as any other Addition and rotate in for the best value; each attached module also adds +1 to the Array's own Condition Monitor. Programs load into its Program Slots the normal, Matrix-Capacity-gated way. A character can Slave to Vehicle from their own PAN once they own a copy of the vehicle carrying one of these.",
  stats: {
    additionCapacityUsed: 1,
    attack: 1, sleaze: 1, dataProcessing: 1, firewall: 1,
    deviceRating: 1,
    matrixCapacityProvided: 2,
    upgradeCapacityProvided: 3,
  },
};

function csm(overrides) {
  return {
    category: 'addition_upgrade', legality: null, image: null, tags: ['addition_upgrade', 'csm'],
    additionType: 'comms_sensor_array',
    ...overrides,
  };
}

const csm_1 = csm({
  id: 'csm_1', label: 'Comm Sensor Enhancement Module I',
  cost: 500, availability: 2,
  description: "Attaches to a Comms/Sensor Array — contributes its stats to the Array's rotation (best value wins) and adds +1 to the Array's Condition Monitor. Placeholder stats.",
  stats: { upgradeCapacityUsed: 1, attack: 1, sleaze: 1, dataProcessing: 1, firewall: 1, deviceModifiers: { matrixCapacityProvided: 1 } },
});
const csm_2 = csm({
  id: 'csm_2', label: 'Comm Sensor Enhancement Module II',
  cost: 1500, availability: 3,
  description: "Attaches to a Comms/Sensor Array — contributes its stats to the Array's rotation (best value wins) and adds +1 to the Array's Condition Monitor. Placeholder stats.",
  stats: { upgradeCapacityUsed: 1, attack: 2, sleaze: 2, dataProcessing: 2, firewall: 2, deviceModifiers: { matrixCapacityProvided: 1 } },
});
const csm_3 = csm({
  id: 'csm_3', label: 'Comm Sensor Enhancement Module III',
  cost: 3000, availability: 4,
  description: "Attaches to a Comms/Sensor Array — contributes its stats to the Array's rotation (best value wins) and adds +1 to the Array's Condition Monitor. Placeholder stats.",
  stats: { upgradeCapacityUsed: 1, attack: 3, sleaze: 3, dataProcessing: 3, firewall: 3, deviceModifiers: { matrixCapacityProvided: 1 } },
});
const csm_4 = csm({
  id: 'csm_4', label: 'Comm Sensor Enhancement Module IV',
  cost: 5000, availability: 5,
  description: "Attaches to a Comms/Sensor Array — contributes its stats to the Array's rotation (best value wins) and adds +1 to the Array's Condition Monitor. Placeholder stats.",
  stats: { upgradeCapacityUsed: 1, attack: 4, sleaze: 4, dataProcessing: 4, firewall: 4, deviceModifiers: { matrixCapacityProvided: 1 } },
});
const csm_5 = csm({
  id: 'csm_5', label: 'Comm Sensor Enhancement Module V',
  cost: 8000, availability: 6,
  description: "Attaches to a Comms/Sensor Array — contributes its stats to the Array's rotation (best value wins) and adds +1 to the Array's Condition Monitor. Placeholder stats.",
  stats: { upgradeCapacityUsed: 1, attack: 5, sleaze: 5, dataProcessing: 5, firewall: 5, deviceModifiers: { matrixCapacityProvided: 1 } },
});

const retrans_unit = upgrade({
  id: 'retrans_unit', label: 'Retrans Unit',
  additionType: 'comms_sensor_array',
  cost: 7000, availability: 3,
  description: "Strips accumulated Noise and rebroadcasts the signal, as if originating at the unit itself; can rebroadcast for a whole linked network. Exact Noise value not confirmed by source (only \"stripping accumulated Noise\" is stated) — the number here is an inferred placeholder matching Signal Scrubber's own value.",
  stats: { upgradeCapacityUsed: 1, deviceModifiers: { noise: -2 } },
});

const network_sharing_enhancement = upgrade({
  id: 'network_sharing_enhancement', label: 'Network Sharing Enhancement',
  additionType: 'comms_sensor_array',
  cost: 85000, availability: 9,
  legality: 'illegal',
  description: "Lets a rigged vehicle share its network like a mobile host — Rating sets the max simultaneous \"captain\" + participant riggers (still only one jump-in per device at a time). Reference-only in this app — no multi-rigger PAN-sharing mechanism exists to wire this into.",
  stats: { upgradeCapacityUsed: 1 },
});

const armory = addition({
  id: 'armory', label: 'Armory',
  cost: 5000, availability: 4,
  legality: 'illegal',
  description: 'A secure weapon/gear storage housing (the "gun cage") — bonuses come from whatever upgrade modules are installed, including its own Weapon Rack for storing the team\'s small arms.',
});

// The concrete "generic gear storage" case — a real Storage Unit, not
// just vehicles/drones. Preferring firearms specifically (category
// 'firearm', matching firearms_explosives.js) since Armory is framed
// as the personal-small-arms gun cage.
const weapon_rack = upgrade({
  id: 'weapon_rack', label: 'Weapon Rack',
  additionType: 'armory',
  cost: 1500, availability: 3,
  legality: 'illegal',
  description: "Secure storage for the team's own carried weapons. A Storage Unit preferring firearms — anything else can still be stored here, it just shows up in \"Other\" rather than \"Preferred.\"",
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: ['firearm'] },
});

const crew_quarters = addition({
  id: 'crew_quarters', label: 'Crew Quarters / Common Area',
  cost: 4000, availability: 2,
  description: 'A lifestyle-adjacent downtime housing — bonuses come from whatever upgrade modules are installed. No real upgrade content confirmed yet for this specific Addition.',
});

const moon_pool = addition({
  id: 'moon_pool', label: 'Moon Pool / Dive Locker',
  cost: 7000, availability: 3,
  description: 'A nautical-flavored storage and launch housing for underwater gear or small submersibles — bonuses come from whatever upgrade modules are installed. No real upgrade content confirmed yet for this specific Addition.',
});

// A real Storage Unit now, preferring vehicles/drones — this is what
// retires the old bespoke "Store Vehicle" mechanism entirely. Same
// generic mechanism a Weapon Rack or Drone Rack uses, just a different
// preference list.
const vehicle_bay = addition({
  id: 'vehicle_bay', label: 'Vehicle Bay',
  cost: 15000, availability: 4,
  description: 'A proper bay for storing and launching other vehicles — bay door, cleared structural space, and tie-down/locking hardware. A Storage Unit preferring vehicles and drones.',
  stats: { additionCapacityUsed: 2, upgradeCapacityProvided: 3, storagePreferredCategories: ['vehicle', 'drone'] },
});

const weapons_facility = addition({
  id: 'weapons_facility', label: 'Weapons Facility',
  cost: 6000, availability: 5,
  legality: 'illegal',
  description: 'Dedicated space for vehicle armament and large ordnance (Gunnery, Demolitions) — distinct from the Armory\'s personal small-arms focus. No real upgrade content confirmed yet for this specific Addition.',
});

// ---- Hardpoints ----
// Real confirmed pricing, adapted from Double Clutch's own "mod slot"
// cost scale (0.5/1/2/3) into this app's additionCapacityUsed terms
// (1/1/2/3) — a reasonable adaptation, not a direct unit conversion,
// since our Addition Capacity isn't the same unit as DC's mod slots.
// Each Hardpoint provides exactly 1 Upgrade slot regardless of size —
// Weapon Mounts, Drone Racks, Ram Plates, Winches, and Mechanical Arms
// all attach through that one slot.

function hardpoint(overrides) {
  return {
    category: 'addition', legality: null, image: null, tags: ['addition', 'hardpoint'],
    stats: { upgradeCapacityProvided: 1 },
    ...overrides,
  };
}

const hardpoint_small = hardpoint({
  id: 'hardpoint_small', label: 'Small Hardpoint',
  cost: 800, availability: 2,
  description: 'Holds a small weapon mount, micro/mini drone rack, small mechanical arm (Str 2), or a device up to 2 liters.',
  stats: { additionCapacityUsed: 1, upgradeCapacityProvided: 1 },
});
const hardpoint_standard = hardpoint({
  id: 'hardpoint_standard', label: 'Standard Hardpoint',
  cost: 1500, availability: 2,
  description: 'Holds a standard weapon mount, small drone rack, turreted small weapon mount, medium mechanical arm (Str 5), sidecar/trailer attachment, ram plate, winch, or a device up to 25 liters.',
  stats: { additionCapacityUsed: 1, upgradeCapacityProvided: 1 },
});
const hardpoint_large = hardpoint({
  id: 'hardpoint_large', label: 'Large Hardpoint',
  cost: 3000, availability: 3,
  description: 'Holds a large weapon mount, turreted standard weapon mount, medium drone rack, large mechanical arm (Str 10), fifth wheel, ladder, manlift, or a device up to ~250 liters.',
  stats: { additionCapacityUsed: 2, upgradeCapacityProvided: 1 },
});
const hardpoint_huge = hardpoint({
  id: 'hardpoint_huge', label: 'Huge Hardpoint',
  cost: 8000, availability: 4,
  description: 'Holds a turreted large weapon mount, large drone rack, huge mechanical arm (Str 20), or other heavy construction equipment/very large device up to ~2,500 liters.',
  stats: { additionCapacityUsed: 3, upgradeCapacityProvided: 1 },
});

// ---- Weapon Mounts (Upgrades, attach to a Hardpoint) ----
// Real confirmed content — +2 Attack Rating and halved burst-fire AR
// penalties on the mounted weapon, kept as reference text rather than
// auto-wired, since there's no live "weapon fired from a vehicle
// mount" dice-pool mechanism in this app to hook it into yet (matches
// how Attack itself already routes through the weapon's own row, not
// a generic action).

function weaponMount(overrides) {
  return {
    category: 'addition_upgrade', legality: 'illegal', image: null, tags: ['addition_upgrade', 'weapon_mount'],
    additionType: 'hardpoint',
    description: 'Mounted weapons get +2 Attack Rating and halved burst-fire AR penalties (better recoil compensation) — confirmed real bonus, shown as reference text since no live vehicle-weapon-fire mechanism exists yet to auto-apply it.',
    stats: { upgradeCapacityUsed: 1 },
    ...overrides,
  };
}

const weapon_mount_small = weaponMount({
  id: 'weapon_mount_small', label: 'Small Weapon Mount',
  cost: 1500, availability: 3,
});
const weapon_mount_small_turreted = weaponMount({
  id: 'weapon_mount_small_turreted', label: 'Small Weapon Mount (Turreted)',
  cost: 6500, availability: 5,
});
const weapon_mount_standard = weaponMount({
  id: 'weapon_mount_standard', label: 'Standard Weapon Mount',
  cost: 2500, availability: 4,
});
const weapon_mount_standard_turreted = weaponMount({
  id: 'weapon_mount_standard_turreted', label: 'Standard Weapon Mount (Turreted)',
  cost: 8500, availability: 6,
});
const weapon_mount_large = weaponMount({
  id: 'weapon_mount_large', label: 'Large Weapon Mount',
  cost: 5000, availability: 5,
});
const weapon_mount_large_turreted = weaponMount({
  id: 'weapon_mount_large_turreted', label: 'Large Weapon Mount (Turreted)',
  cost: 12000, availability: 7,
});

// ---- Drone Racks (Upgrades, attach to a Hardpoint, Storage Units) ----
// Preferring a specific drone-SIZE tag, not the generic 'drone'
// category — matches the real, already-existing tags in
// vehicles_drones.js. Real confirmed drone counts kept in the
// description as reference (not enforced — nothing caps how many
// drones actually get attached, matching the "don't gate" instinct).

function droneRack(overrides) {
  return {
    category: 'addition_upgrade', legality: null, image: null, tags: ['addition_upgrade', 'drone_rack'],
    additionType: 'hardpoint',
    stats: { upgradeCapacityUsed: 1 },
    ...overrides,
  };
}

const drone_rack_mini_micro = droneRack({
  id: 'drone_rack_mini_micro', label: 'Mini/Micro Drone Rack',
  cost: 1000, availability: 3,
  description: 'Holds up to 5 mini/microdrones (reference count, not enforced). Preferred: micro/minidrones.',
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: ['microdrone', 'minidrone'] },
});
const drone_rack_small = droneRack({
  id: 'drone_rack_small', label: 'Small Drone Rack',
  cost: 2000, availability: 3,
  description: 'Holds up to 3 small drones (reference count, not enforced). Preferred: small drones.',
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: ['small_drone'] },
});
const drone_rack_medium = droneRack({
  id: 'drone_rack_medium', label: 'Medium Drone Rack',
  cost: 5000, availability: 4,
  description: 'Holds 1 medium drone (reference count, not enforced). Preferred: medium drones.',
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: ['medium_drone'] },
});
const drone_rack_large = droneRack({
  id: 'drone_rack_large', label: 'Large Drone Rack',
  cost: 10000, availability: 6,
  description: 'Holds 1 large drone (reference count, not enforced). Preferred: large drones.',
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: ['large_drone'] },
});

// ---- Rigger Cocoon ----
// Attaches DIRECTLY to the vehicle now, through its native (computed,
// not purchased) Upgrade Capacity — see nativeUpgradeCapacity,
// vehicleEconomy.js. Not installable on drones is noted, not enforced.
const rigger_cocoon = upgrade({
  id: 'rigger_cocoon', label: 'Rigger Cocoon',
  additionType: null, // attaches directly to the vehicle's native Upgrade Capacity, not to a purchasable Addition
  cost: 3000, availability: 4,
  description: "Fire resistant, own O2 supply, biomed sensors — counts as Rating 6 passenger protection, Fire Resistance 2, and Rating 2 life safety (4 hours of O2) for its occupant only. Takes 2 combat rounds to enter; a Minor Action quick-release exits. Not installable on drones. Attaches directly to the vehicle itself, through its native Upgrade Capacity — every vehicle already inherently has a cockpit, it's not a purchasable Addition. Reference-only in this app — no passenger-protection/fire-resistance mechanism exists to wire these numbers into.",
  stats: { upgradeCapacityUsed: 1 },
});

const valkyrie_module = upgrade({
  id: 'valkyrie_module', label: 'Valkyrie Module',
  additionType: 'medbay',
  cost: 3000, availability: 4,
  description: "Built-in auto-doc (Rating 4 Biotech autosoft) plus medical systems (Rating 6 medkit), combining for 10 dice on First Aid/Medkit healing tests. This app has no character-side First Aid test mechanism to wire the number into yet, but the 10-die pool is still rollable directly off the module itself.",
  stats: { upgradeCapacityUsed: 1, flatDicePool: 10 },
});

export const GEAR_ADDITIONS = {
  medbay, workshop_fabrication_bay, comms_sensor_array, armory, crew_quarters, moon_pool, vehicle_bay, weapons_facility,
  hardpoint_small, hardpoint_standard, hardpoint_large, hardpoint_huge,
  csm_1, csm_2, csm_3, csm_4, csm_5,
  retrans_unit, network_sharing_enhancement, valkyrie_module, rigger_cocoon, weapon_rack,
  weapon_mount_small, weapon_mount_small_turreted, weapon_mount_standard, weapon_mount_standard_turreted, weapon_mount_large, weapon_mount_large_turreted,
  drone_rack_mini_micro, drone_rack_small, drone_rack_medium, drone_rack_large,
};

export const GEAR_ADDITIONS_IDS = Object.keys(GEAR_ADDITIONS);
