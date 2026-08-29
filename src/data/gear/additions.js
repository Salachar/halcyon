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
//
// CSM DESIGN (corrected this pass): NOT 4 mutually-exclusive "roles" —
// arrayCompositedStats takes the BEST value per attribute across
// EVERYTHING attached, so exclusive roles never created a real choice
// (a player with enough Upgrade slots could just attach several and
// get the best of all of them). The actual intended shape: a LONGFORM
// collection bought incrementally over a campaign (5-6+ attached is
// normal, not exceptional), where the real decision isn't "which
// attribute" but "how do I want to pay for a given attribute ceiling."
// Two CSMs can offer the identical peak value on the same attribute and
// still be meaningfully different: a cheap one might tax you elsewhere
// (raise Noise, reduce the Array's own Program Slots) to hit that
// number, while an expensive one hits the same number clean — or even
// bundles a second bonus (Noise reduction, bonus Program Slots) on top.
// The tension is economic (cheap-with-a-cost vs. expensive-and-clean),
// not "pick your build."
//
// E-SOFTS: real, sourced (Double Clutch pt. 6C) rigger-specific Matrix
// programs. These are Programs, not room Upgrades — they load into the
// Array's separate matrixCapacityProvided pool (via matrixCapacityUsed),
// exactly like a commlink's program slots, NOT through
// upgradeCapacityUsed the way CSMs do. Category/tags corrected this
// pass — they no longer carry 'addition_upgrade' at all (see the esoft
// factory's own comment for why that was a real bug, not a style
// choice). Source text didn't give a price/Availability table for
// these, so costs below are inferred placeholders using standard
// Illegal-autosoft economics — flagged honestly in each description,
// same treatment Retrans Unit's Noise value already got.
//
// EVERY PREVIOUSLY-BARE FACILITY (Workshop, Armory, Crew Quarters,
// Moon Pool, Weapons Facility, plus more content for Medbay and the
// Comms/Sensor Array) now has real Upgrade content — a mix of stat
// bonuses (flatDicePool), Storage Units, and pure reference-only
// effects with no live mechanism yet (same honest category
// Network Sharing Enhancement and Rigger Cocoon already used). None of
// this is sourced from Double Clutch — it's original content built to
// round the system out, called out in each item's own comment.

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

// ---- Medbay Upgrades ----
// Valkyrie Module is the original confirmed content. Everything below
// it is new homebrew, filling the room out with a mix of a narrower
// stat-based module, a Storage Unit, and two reference-only effects.

const valkyrie_module = upgrade({
  id: 'valkyrie_module', label: 'Valkyrie Module',
  additionType: 'medbay',
  cost: 3000, availability: 4,
  description: "Built-in auto-doc (Rating 4 Biotech autosoft) plus medical systems (Rating 6 medkit), combining for 10 dice on First Aid/Medkit healing tests. This app has no character-side First Aid test mechanism to wire the number into yet, but the 10-die pool is still rollable directly off the module itself.",
  stats: { upgradeCapacityUsed: 1, flatDicePool: 10 },
});

const trauma_stabilizer = upgrade({
  id: 'trauma_stabilizer', label: 'Trauma Stabilizer',
  additionType: 'medbay',
  cost: 4500, availability: 5,
  description: "Auto-stabilizes a dying character without requiring a roll, buying time until real treatment is possible. Reference-only — no dying/stabilization mechanism exists yet to hook this into.",
  stats: { upgradeCapacityUsed: 1 },
});

const cybertech_diagnostic_cradle = upgrade({
  id: 'cybertech_diagnostic_cradle', label: 'Cybertech Diagnostic Cradle',
  additionType: 'medbay',
  cost: 2500, availability: 4,
  description: "A narrower cousin of the Valkyrie Module, specialized for Essence/cyberware-related diagnostic and maintenance tests rather than general First Aid.",
  stats: { upgradeCapacityUsed: 1, flatDicePool: 4 },
});

const pharma_synthesizer = upgrade({
  id: 'pharma_synthesizer', label: 'Pharma Synthesizer',
  additionType: 'medbay',
  cost: 5000, availability: 6,
  legality: 'restricted',
  description: "A Storage Unit preferring drugs/chemicals, with reference text that it can synthesize basic compounds from raw stock over downtime. No crafting mechanism exists yet — the storage/sorting half works today, the synthesis half is flavor.",
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: ['drug'] },
});

const overflow_cots = upgrade({
  id: 'overflow_cots', label: 'Overflow Cots',
  additionType: 'medbay',
  cost: 800, availability: 2,
  description: "No dice bonus — pure fiction. The Medbay can now stabilize and treat multiple patients simultaneously instead of one at a time.",
  stats: { upgradeCapacityUsed: 1 },
});

const workshop_fabrication_bay = addition({
  id: 'workshop_fabrication_bay', label: 'Workshop / Fabrication Bay',
  cost: 6000, availability: 3,
  description: 'A dedicated repair/customization bay housing — bonuses come from whatever upgrade modules are installed.',
});

// ---- Workshop Upgrades ----
// All homebrew — this room had zero confirmed content before now.

const automated_assistance_software = upgrade({
  id: 'automated_assistance_software', label: 'Automated Assistance Software',
  additionType: 'workshop_fabrication_bay',
  cost: 3500, availability: 4,
  description: "Grants a bonus Edge point specifically on repair tests performed in this Workshop. Reference-only — no Edge-granting-by-location mechanism exists yet to auto-apply this.",
  stats: { upgradeCapacityUsed: 1 },
});

const enhanced_welding_station = upgrade({
  id: 'enhanced_welding_station', label: 'Enhanced Welding Station',
  additionType: 'workshop_fabrication_bay',
  cost: 2000, availability: 3,
  description: "Reduces the time a repair or fabrication job takes — no dice bonus, a pure time-cost effect.",
  stats: { upgradeCapacityUsed: 1 },
});

const precision_toolkit = upgrade({
  id: 'precision_toolkit', label: 'Precision Toolkit',
  additionType: 'workshop_fabrication_bay',
  cost: 2800, availability: 3,
  description: "A genuine bonus dice pool for Engineering tests performed in this Workshop, same shape as the Valkyrie Module but for a different skill.",
  stats: { upgradeCapacityUsed: 1, flatDicePool: 6 },
});

const fabricator_3d = upgrade({
  id: 'fabricator_3d', label: '3D Fabricator',
  additionType: 'workshop_fabrication_bay',
  cost: 6000, availability: 6,
  description: "Prints basic gear/ammo components from raw material over downtime — gated by time rather than a roll. Reference-only; no downtime-crafting mechanism exists yet.",
  stats: { upgradeCapacityUsed: 1 },
});

const scrap_sorter = upgrade({
  id: 'scrap_sorter', label: 'Scrap Sorter',
  additionType: 'workshop_fabrication_bay',
  cost: 900, availability: 2,
  description: "A Storage Unit preferring salvaged/junk gear — feeds the 3D Fabricator narratively, or just keeps scavenged parts organized.",
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: ['salvage'] },
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

// ---- Comm Sensor Modules (Upgrades, rotate into the Array's ASDF) ----
// Redesigned this pass — see file header note on CSM DESIGN. A
// longform collection, not 4 exclusive roles: multiple modules
// targeting the SAME attribute at the SAME peak value, differentiated
// by whether hitting that number costs something elsewhere (Noise,
// Program Slots) or comes bundled with a bonus, and priced
// accordingly. Expect a real Array to accumulate 5-6+ of these over a
// campaign.

function csm(overrides) {
  const { stats: overrideStats, ...rest } = overrides;
  return {
    category: 'addition_upgrade', legality: null, image: null, tags: ['addition_upgrade', 'csm'],
    additionType: 'comms_sensor_array',
    ...rest,
    // Default +1 Program Slot per module — a CSM that explicitly sets
    // its own deviceModifiers (the Scrapyard/Overclocked/Dragnet-style
    // "costs you a slot" items) REPLACES this default entirely rather
    // than adding to it, giving that module's stated cost as a true
    // net effect instead of a base bonus plus a separate penalty.
    stats: { upgradeCapacityUsed: 1, deviceModifiers: { matrixCapacityProvided: 1 }, ...overrideStats },
  };
}

// -- Entry-level, no strings attached --
const csm_starter_array = csm({
  id: 'csm_starter_array', label: 'Starter Array',
  cost: 1200, availability: 2,
  description: "A basic, competent-everywhere module with no downside and no standout — the first CSM most riggers buy, and the floor everything else gets measured against.",
  stats: { attack: 2, sleaze: 2, dataProcessing: 2, firewall: 2 },
});

// -- Firewall/Sleaze ("defense") pair: cheap-with-a-tax vs. expensive-and-clean --
const csm_scrapyard_firewall = csm({
  id: 'csm_scrapyard_firewall', label: 'Scrapyard Firewall Patch',
  cost: 2000, availability: 4,
  description: "Cheap Firewall 4 — salvaged, cobbled-together hardware that works, but eats into the Array's own Program Slots to do it (-1 Program Slot while attached). The budget way to hit a defensive number, if you can spare the room.",
  stats: { firewall: 4, deviceModifiers: { matrixCapacityProvided: -1 } },
});
const csm_aegis_firewall = csm({
  id: 'csm_aegis_firewall', label: 'Aegis Firewall Array',
  cost: 6500, availability: 6,
  legality: 'restricted',
  description: "The same Firewall 4 the Scrapyard patch offers, but properly engineered — no Program Slot cost, no compromises. Pay more, keep your room.",
  stats: { firewall: 4 },
});

// -- Sleaze pair: leaky-cheap vs. premium-with-a-bonus --
const csm_whisper_sleaze_chip = csm({
  id: 'csm_whisper_sleaze_chip', label: 'Whisper Sleaze Chip',
  cost: 2200, availability: 4,
  legality: 'restricted',
  description: "Sleaze 4 on the cheap — the shielding is thin enough that the module itself leaks a little (+2 Noise while attached). Fine if you're not already fighting for signal.",
  stats: { sleaze: 4, deviceModifiers: { noise: 2 } },
});
const csm_ghostline_sleaze_suite = csm({
  id: 'csm_ghostline_sleaze_suite', label: 'Ghostline Sleaze Suite',
  cost: 7000, availability: 7,
  legality: 'restricted',
  description: "The same Sleaze 4, properly shielded — and shielded well enough that it actively cleans up the signal around it (-2 Noise while attached) instead of just avoiding making it worse.",
  stats: { sleaze: 4, deviceModifiers: { noise: -2 } },
});

// -- Attack/DataProcessing ("offense") pair: taxed vs. clean --
const csm_overclocked_attack_core = csm({
  id: 'csm_overclocked_attack_core', label: 'Overclocked Attack Core',
  cost: 3200, availability: 5,
  legality: 'restricted',
  description: "Attack 5 pushed past its rated limits — hits hard, but the overclocking draws enough resources to cost the Array a Program Slot while attached (-1 Program Slot).",
  stats: { attack: 5, deviceModifiers: { matrixCapacityProvided: -1 } },
});
const csm_blackout_attack_array = csm({
  id: 'csm_blackout_attack_array', label: 'Blackout Attack Array',
  cost: 8500, availability: 7,
  legality: 'forbidden',
  description: "The same Attack 5, built to spec instead of pushed past it — no Program Slot cost. Priced like the military-grade hardware it is.",
  stats: { attack: 5 },
});
const csm_dragnet_processing_unit = csm({
  id: 'csm_dragnet_processing_unit', label: 'Dragnet Processing Unit',
  cost: 3000, availability: 5,
  description: "Data Processing 5 crammed into a small footprint — the tradeoff is heat, which the Array bleeds off by running its Program Slots slightly hot (-1 Program Slot while attached).",
  stats: { dataProcessing: 5, deviceModifiers: { matrixCapacityProvided: -1 } },
});

// -- Rare "gives you room instead of taking it" options --
const csm_efficient_processing_node = csm({
  id: 'csm_efficient_processing_node', label: 'Efficient Processing Node',
  cost: 4000, availability: 5,
  description: "A modest Data Processing 3 — nothing special on its own, but its power management is efficient enough to free up an extra Program Slot on the Array while attached (+1 Program Slot, on top of this module's own +1).",
  stats: { dataProcessing: 3, deviceModifiers: { matrixCapacityProvided: 2 } },
});
const csm_redundant_node_cluster = csm({
  id: 'csm_redundant_node_cluster', label: 'Redundant Node Cluster',
  cost: 5000, availability: 5,
  description: "A flat, unremarkable +3 across all four attributes — the point isn't any single number, it's that its redundant architecture frees up an extra Program Slot while attached (+1 Program Slot, on top of this module's own +1). A reasonable early pickup for a rigger still deciding what their Array needs to specialize in.",
  stats: { attack: 3, sleaze: 3, dataProcessing: 3, firewall: 3, deviceModifiers: { matrixCapacityProvided: 2 } },
});

// ---- Other Comms/Sensor Array Upgrades (generic upgrade pool) ----

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

const passive_listening_suite = upgrade({
  id: 'passive_listening_suite', label: 'Passive Listening Suite',
  additionType: 'comms_sensor_array',
  cost: 3200, availability: 4,
  legality: 'restricted',
  description: "Picks up ambient Matrix chatter near the vehicle — GM-narrated intel rather than a rollable effect.",
  stats: { upgradeCapacityUsed: 1 },
});

const directional_antenna = upgrade({
  id: 'directional_antenna', label: 'Directional Antenna',
  additionType: 'comms_sensor_array',
  cost: 2600, availability: 4,
  description: "A bonus dice pool specifically for Matrix Perception/Search tests run from this vehicle, distinct from the Array's own base ASDF.",
  stats: { upgradeCapacityUsed: 1, flatDicePool: 3 },
});

const dead_drop_cache = upgrade({
  id: 'dead_drop_cache', label: 'Dead Drop Cache',
  additionType: 'comms_sensor_array',
  cost: 600, availability: 2,
  description: "A small Storage Unit preferring data chips and physical media — flavor for covert exchanges.",
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: ['data_chip'] },
});

// ---- E-Softs (Programs, attach through the Array's Matrix Capacity) ----
// Real, sourced content (Double Clutch pt. 6C) — a hybrid of autosofts
// and cyberprograms built for riggers to work the Matrix on their own
// terms without a full cyberdeck. Attack Rating = e-soft rating + the
// running RCC's device rating. These consume matrixCapacityUsed, NOT
// upgradeCapacityUsed — they're Programs, gated exactly like a
// commlink's program slots, a fully separate pool from the CSMs above.
//
// CORRECTED this pass: category/tags no longer include 'addition_upgrade'
// at all. That tag is what UpgradeAttachPicker filters on for the
// generic Upgrade pool — leaving it on these meant an E-Soft was
// attachable through BOTH pickers at once: correctly via
// ProgramAttachPicker (consumes matrixCapacityUsed as intended), but
// ALSO via UpgradeAttachPicker, where wouldExceedCapacity checked for
// an upgradeCapacityUsed stat these items never had — meaning it
// attached for free, consumed zero Upgrade slots, AND then didn't even
// show up in CommsSensorArrayPanel's own Program list (which excludes
// anything tagged 'addition_upgrade'). Net effect: an E-Soft attached
// via the wrong picker became invisible and free, bypassing both
// Capacity pools simultaneously. Fixed by giving these their own
// distinct category/tags with no overlap with the Upgrade pool at all.
//
// Source text didn't give a price/Availability table for these — costs
// below are inferred placeholders using standard Illegal-autosoft
// pricing, flagged honestly rather than presented as confirmed.

function esoft(overrides) {
  return {
    category: 'program', legality: 'illegal', image: null, tags: ['esoft', 'program'],
    additionType: 'comms_sensor_array',
    stats: { matrixCapacityUsed: 1 },
    ...overrides,
  };
}

const esoft_crash_and_burn = esoft({
  id: 'esoft_crash_and_burn', label: 'E-Soft: Crash and Burn',
  cost: 2000, availability: '8(I)',
  description: "Enables the Data Spike Matrix action, but only against vehicle/drone Matrix icons; grants a virtual Attack attribute equal to its rating. Counts as a hacking cyberprogram for Overwatch Score. Cost/Availability not given in source — inferred placeholder, standard Illegal-autosoft economics.",
});
const esoft_emergency_override = esoft({
  id: 'esoft_emergency_override', label: 'E-Soft: Emergency Override',
  cost: 2000, availability: '8(I)',
  description: "Grants Matrix Attack Rating benefit to the Spoof Command action, but only against vehicle/drone-interfacing devices (traffic lights, crossing arms, retractable bollards, etc.). Counts as a hacking cyberprogram for OS. Cost/Availability not given in source — inferred placeholder.",
});
const esoft_reroute_signal = esoft({
  id: 'esoft_reroute_signal', label: 'E-Soft: Reroute Signal',
  cost: 1500, availability: '7(I)',
  description: "While running, grants a virtual Sleaze attribute equal to its rating, usable only when defending against Trace Icon. Cost/Availability not given in source — inferred placeholder.",
});
const esoft_run_silent_run_deep = esoft({
  id: 'esoft_run_silent_run_deep', label: 'E-Soft: Run Silent, Run Deep',
  cost: 1500, availability: '7(I)',
  description: "While the RCC's PAN is running silent, grants a virtual Sleaze attribute equal to its rating, usable only to defend against Matrix Perception tests targeting the PAN. Cost/Availability not given in source — inferred placeholder.",
});
const esoft_slim_jim = esoft({
  id: 'esoft_slim_jim', label: 'E-Soft: Slim Jim',
  cost: 2000, availability: '8(I)',
  description: "Enables Brute Force and Control Device, but only against vehicle/drone Matrix icons; grants a virtual Attack attribute equal to its rating. Counts as a hacking cyberprogram for OS. Cost/Availability not given in source — inferred placeholder.",
});
const esoft_smartsoft = esoft({
  id: 'esoft_smartsoft', label: 'E-Soft: Smartsoft',
  cost: 1800, availability: '7(I)',
  description: "When shared from an RCC, all drones in the network benefit from a sensor lock achieved by any one participating drone. Non-stat, coordination-flavored effect. Cost/Availability not given in source — inferred placeholder.",
});
const esoft_swarm = esoft({
  id: 'esoft_swarm', label: 'E-Soft: Swarm',
  cost: 1800, availability: '7(I)',
  description: "When shared from an RCC, drones attacking as a Grunt Group count each drone after the first as two participants. Non-stat, Grunt-Group-rules-flavored effect. Cost/Availability not given in source — inferred placeholder.",
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

// ---- Other Armory Upgrades ----
// All homebrew.

const reloading_bench = upgrade({
  id: 'reloading_bench', label: 'Reloading Bench',
  additionType: 'armory',
  cost: 1800, availability: 3,
  description: "Reduces the team's ongoing ammunition cost over time — no dice bonus, a quiet economy perk.",
  stats: { upgradeCapacityUsed: 1 },
});

const zeroing_rig = upgrade({
  id: 'zeroing_rig', label: 'Zeroing Rig',
  additionType: 'armory',
  cost: 1200, availability: 3,
  description: "A one-time bonus on a weapon's next shot after being serviced/sighted-in here. Reference-only; no live \"serviced weapon\" state exists to track this yet.",
  stats: { upgradeCapacityUsed: 1 },
});

const customization_station = upgrade({
  id: 'customization_station', label: 'Customization Station',
  additionType: 'armory',
  cost: 2200, availability: 4,
  legality: 'illegal',
  description: "Enables installing weapon mods without needing a full Workshop — a narrower, cheaper alternative.",
  stats: { upgradeCapacityUsed: 1 },
});

const armored_rack = upgrade({
  id: 'armored_rack', label: 'Armored Rack',
  additionType: 'armory',
  cost: 900, availability: 3,
  description: "Reinforces the Weapon Rack itself so stored guns are protected if the vehicle takes damage. No stat bonus of its own.",
  stats: { upgradeCapacityUsed: 1 },
});

const crew_quarters = addition({
  id: 'crew_quarters', label: 'Crew Quarters / Common Area',
  cost: 4000, availability: 2,
  description: 'A lifestyle-adjacent downtime housing — bonuses come from whatever upgrade modules are installed.',
});

// ---- Crew Quarters Upgrades ----
// All homebrew — this room had zero confirmed content before now.

const proper_galley = upgrade({
  id: 'proper_galley', label: 'Proper Galley',
  additionType: 'crew_quarters',
  cost: 2500, availability: 2,
  description: "A bonus to Stun recovery / downtime healing rate for anyone aboard. Reference-only; no downtime-healing mechanism exists yet.",
  stats: { upgradeCapacityUsed: 1 },
});

const meditation_space = upgrade({
  id: 'meditation_space', label: 'Meditation Space',
  additionType: 'crew_quarters',
  cost: 3000, availability: 3,
  description: "A quiet, magically-suitable space — a small bonus tied to Drain resistance or Astral-adjacent activity for Awakened characters. Reference-only; deliberately niche, giving Crew Quarters a reason a caster specifically would want it.",
  stats: { upgradeCapacityUsed: 1 },
});

const entertainment_suite = upgrade({
  id: 'entertainment_suite', label: 'Entertainment Suite',
  additionType: 'crew_quarters',
  cost: 1500, availability: 2,
  description: "Pure fiction, zero mechanical effect — a GM hook for downtime roleplay scenes.",
  stats: { upgradeCapacityUsed: 1 },
});

const lockable_bunks = upgrade({
  id: 'lockable_bunks', label: 'Lockable Bunks',
  additionType: 'crew_quarters',
  cost: 800, availability: 1,
  description: "Personal Storage Units per crew member, preferring nothing in particular — generic personal effects.",
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: [] },
});

const moon_pool = addition({
  id: 'moon_pool', label: 'Moon Pool / Dive Locker',
  cost: 7000, availability: 3,
  description: 'A nautical-flavored storage and launch housing for underwater gear or small submersibles — bonuses come from whatever upgrade modules are installed.',
});

// ---- Moon Pool Upgrades ----
// All homebrew — this room had zero confirmed content before now.

const sonar_suite = upgrade({
  id: 'sonar_suite', label: 'Sonar Suite',
  additionType: 'moon_pool',
  cost: 3800, availability: 5,
  description: "A bonus to Perception tests specifically underwater. Reference-only; no live underwater-Perception mechanism exists yet.",
  stats: { upgradeCapacityUsed: 1 },
});

const launch_cradle = upgrade({
  id: 'launch_cradle', label: 'Launch Cradle',
  additionType: 'moon_pool',
  cost: 4200, availability: 4,
  description: "A Storage Unit preferring submersibles and DPVs specifically, distinct from Vehicle Bay's broader vehicle/drone preference.",
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: ['submersible', 'dpv'] },
});

const decompression_chamber = upgrade({
  id: 'decompression_chamber', label: 'Decompression Chamber',
  additionType: 'moon_pool',
  cost: 3000, availability: 4,
  description: "Narratively prevents/treats decompression sickness after deep dives. No roll involved.",
  stats: { upgradeCapacityUsed: 1 },
});

const bioluminescent_lure_rig = upgrade({
  id: 'bioluminescent_lure_rig', label: 'Bioluminescent Lure Rig',
  additionType: 'moon_pool',
  cost: 350, availability: 2,
  description: "A weird, purely decorative fixture with zero mechanical effect. Not everything needs a function.",
  stats: { upgradeCapacityUsed: 1 },
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

// ---- Vehicle Bay Upgrades ----
// All homebrew.

const quick_launch_rails = upgrade({
  id: 'quick_launch_rails', label: 'Quick-Launch Rails',
  additionType: 'vehicle_bay',
  cost: 5000, availability: 5,
  description: "Reduces the action cost/timing to launch a stored vehicle — relevant to any Vehicle Bay, including the Wavecutter MPAC's own small craft bay (normally 1 Major Action to launch, 3 to recover). Reference-only; not wired to override the base rule automatically.",
  stats: { upgradeCapacityUsed: 1 },
});

const diagnostic_umbilical = upgrade({
  id: 'diagnostic_umbilical', label: 'Diagnostic Umbilical',
  additionType: 'vehicle_bay',
  cost: 3500, availability: 4,
  description: "Auto-repairs minor Condition Monitor damage on a docked vehicle between sessions — no roll required.",
  stats: { upgradeCapacityUsed: 1 },
});

const weapons_facility = addition({
  id: 'weapons_facility', label: 'Weapons Facility',
  cost: 6000, availability: 5,
  legality: 'illegal',
  description: 'Dedicated space for vehicle armament and large ordnance (Gunnery, Demolitions) — distinct from the Armory\'s personal small-arms focus.',
});

// ---- Weapons Facility Upgrades ----
// All homebrew — this room had zero confirmed content before now
// beyond Ram Plate below (which is real, and lives with the other
// Hardpoint Upgrades further down).

const gunnery_targeting_rig = upgrade({
  id: 'gunnery_targeting_rig', label: 'Gunnery Targeting Rig',
  additionType: 'weapons_facility',
  cost: 4500, availability: 6,
  legality: 'illegal',
  description: "The vehicle-weapon equivalent of the Valkyrie Module — a genuine bonus dice pool for Gunnery tests, rollable directly off the module even though no live vehicle-weapon-fire mechanism exists yet to auto-apply it.",
  stats: { upgradeCapacityUsed: 1, flatDicePool: 6 },
});

const demolitions_bench = upgrade({
  id: 'demolitions_bench', label: 'Demolitions Bench',
  additionType: 'weapons_facility',
  cost: 3800, availability: 6,
  legality: 'illegal',
  description: "Enables assembling explosive charges from raw components over downtime. Reference-only; no downtime-crafting mechanism exists yet.",
  stats: { upgradeCapacityUsed: 1 },
});

const blast_rated_storage = upgrade({
  id: 'blast_rated_storage', label: 'Blast-Rated Storage',
  additionType: 'weapons_facility',
  cost: 2200, availability: 5,
  legality: 'illegal',
  description: "A Storage Unit preferring explosives, narratively reducing accidental-detonation risk. Safety flavor, not a mechanical effect.",
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: ['explosive'] },
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

// ---- Ram Plate ----
const ram_plate = upgrade({
  id: 'ram_plate', label: 'Ram Plate',
  additionType: 'hardpoint',
  costPerRating: 250,
  ratingLabel: 'Body',
  ratingRange: [1, 40],
  availability: 3,
  legality: 'illegal',
  description: "Adds the vehicle's own Body to its Ramming Attack Rating, and halves return collision damage. Cost = Body x 250¥ — enter the vehicle's actual current Body rating in the Body field when purchasing.",
  stats: { upgradeCapacityUsed: 1 },
});

// ---- Mechanical Arm ----
function mechanicalArm(overrides) {
  return {
    category: 'addition_upgrade', legality: null, image: null, tags: ['addition_upgrade', 'mechanical_arm'],
    additionType: 'hardpoint',
    description: "A vehicle-mounted mechanical arm — limited range of motion, useful for basic tasks (moving boxes, shifting rubble). Total working length = vehicle Body x 20cm. Fine motor control tasks halve the operator's controlling attribute (Logic in VR). Can melee attack if remotely operated or with a [Close Combat] Targeting autosoft — AR = Sensor + Arm Strength, resolved with Close Combat + Sensor. Can be upgraded to the next size tier for that tier's price if the correct hardpoint is available, becoming the lowest Strength in the new tier.",
    stats: { upgradeCapacityUsed: 1 },
    ...overrides,
  };
}

const mechanical_arm_small = mechanicalArm({
  id: 'mechanical_arm_small', label: 'Mechanical Arm (Small, Str 1-2)',
  cost: 2000, availability: 2,
});
const mechanical_arm_medium = mechanicalArm({
  id: 'mechanical_arm_medium', label: 'Mechanical Arm (Medium, Str 3-5)',
  cost: 4000, availability: 2,
});
const mechanical_arm_large = mechanicalArm({
  id: 'mechanical_arm_large', label: 'Mechanical Arm (Large, Str 6-10)',
  cost: 7000, availability: 3,
});
const mechanical_arm_huge = mechanicalArm({
  id: 'mechanical_arm_huge', label: 'Mechanical Arm (Huge, Str 11-20)',
  cost: 11000, availability: 5,
});

// ---- Winch ----
function winch(overrides) {
  return {
    category: 'addition_upgrade', legality: null, image: null, tags: ['addition_upgrade', 'winch'],
    additionType: 'hardpoint',
    stats: { upgradeCapacityUsed: 1 },
    ...overrides,
  };
}

const winch_rating_1 = winch({
  id: 'winch_rating_1', label: 'Winch (Rating 1)',
  cost: 750, availability: 2,
  description: "A steel cable on a powered drum with a latching hook — ~100m of cable, supports up to 10 tons if the vehicle itself is heavy enough. If wirelessly enabled, the hook can be released remotely. Must attach to a Standard hardpoint.",
});
const winch_rating_2 = winch({
  id: 'winch_rating_2', label: 'Winch (Rating 2, Enhanced)',
  cost: 4000, availability: 4,
  description: "Replaces the hook with gecko-grip/magnetic tech, attaching to any surface without manually placing a hook — activate/deactivate remotely via wireless command. Must attach to a Standard hardpoint.",
});

// ---- Pop-Out Concealment ----
function popOutConcealment(overrides) {
  return {
    category: 'addition_upgrade', legality: 'illegal', image: null, tags: ['addition_upgrade', 'pop_out_concealment'],
    additionType: 'hardpoint',
    description: "Stores a weapon mount out of sight under the vehicle's skin — deploy/retract each cost a Minor Action. Harder to detect than blow-away panels (Perception 4 to suspect something's hidden). Fully reusable, but cumbersome and expensive.",
    ...overrides,
  };
}

const pop_out_concealment_small = popOutConcealment({
  id: 'pop_out_concealment_small', label: 'Pop-Out Concealment (Small)',
  cost: 1500, availability: 2,
  stats: { upgradeCapacityUsed: 0.5 },
});
const pop_out_concealment_standard = popOutConcealment({
  id: 'pop_out_concealment_standard', label: 'Pop-Out Concealment (Standard)',
  cost: 3000, availability: 3,
  stats: { upgradeCapacityUsed: 1 },
});
const pop_out_concealment_large = popOutConcealment({
  id: 'pop_out_concealment_large', label: 'Pop-Out Concealment (Large)',
  cost: 4500, availability: 3,
  stats: { upgradeCapacityUsed: 2 },
});
const pop_out_concealment_huge = popOutConcealment({
  id: 'pop_out_concealment_huge', label: 'Pop-Out Concealment (Huge)',
  cost: 6000, availability: 4,
  stats: { upgradeCapacityUsed: 3 },
});

// ---- Rigger Cocoon ----
const rigger_cocoon = upgrade({
  id: 'rigger_cocoon', label: 'Rigger Cocoon',
  additionType: null, // attaches directly to the vehicle's native Upgrade Capacity, not to a purchasable Addition
  cost: 3000, availability: 4,
  description: "Fire resistant, own O2 supply, biomed sensors — counts as Rating 6 passenger protection, Fire Resistance 2, and Rating 2 life safety (4 hours of O2) for its occupant only. Takes 2 combat rounds to enter; a Minor Action quick-release exits. Not installable on drones. Attaches directly to the vehicle itself, through its native Upgrade Capacity — every vehicle already inherently has a cockpit, it's not a purchasable Addition. Reference-only in this app — no passenger-protection/fire-resistance mechanism exists to wire these numbers into.",
  stats: { upgradeCapacityUsed: 1 },
});

export const GEAR_ADDITIONS = {
  medbay, valkyrie_module, trauma_stabilizer, cybertech_diagnostic_cradle, pharma_synthesizer, overflow_cots,
  workshop_fabrication_bay, automated_assistance_software, enhanced_welding_station, precision_toolkit, fabricator_3d, scrap_sorter,
  comms_sensor_array,
  csm_starter_array, csm_scrapyard_firewall, csm_aegis_firewall, csm_whisper_sleaze_chip, csm_ghostline_sleaze_suite,
  csm_overclocked_attack_core, csm_blackout_attack_array, csm_dragnet_processing_unit,
  csm_efficient_processing_node, csm_redundant_node_cluster,
  retrans_unit, network_sharing_enhancement, passive_listening_suite, directional_antenna, dead_drop_cache,
  esoft_crash_and_burn, esoft_emergency_override, esoft_reroute_signal, esoft_run_silent_run_deep, esoft_slim_jim, esoft_smartsoft, esoft_swarm,
  armory, weapon_rack, reloading_bench, zeroing_rig, customization_station, armored_rack,
  crew_quarters, proper_galley, meditation_space, entertainment_suite, lockable_bunks,
  moon_pool, sonar_suite, launch_cradle, decompression_chamber, bioluminescent_lure_rig,
  vehicle_bay, quick_launch_rails, diagnostic_umbilical,
  weapons_facility, gunnery_targeting_rig, demolitions_bench, blast_rated_storage,
  hardpoint_small, hardpoint_standard, hardpoint_large, hardpoint_huge,
  ram_plate,
  mechanical_arm_small, mechanical_arm_medium, mechanical_arm_large, mechanical_arm_huge,
  winch_rating_1, winch_rating_2,
  pop_out_concealment_small, pop_out_concealment_standard, pop_out_concealment_large, pop_out_concealment_huge,
  weapon_mount_small, weapon_mount_small_turreted, weapon_mount_standard, weapon_mount_standard_turreted, weapon_mount_large, weapon_mount_large_turreted,
  drone_rack_mini_micro, drone_rack_small, drone_rack_medium, drone_rack_large,
  rigger_cocoon,
};

export const GEAR_ADDITIONS_IDS = Object.keys(GEAR_ADDITIONS);
