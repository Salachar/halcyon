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
// CSM DESIGN: NOT 4 mutually-exclusive "roles" — arrayCompositedStats
// takes the BEST value per attribute across EVERYTHING attached, so
// exclusive roles never created a real choice (a player with enough
// Upgrade slots could just attach several and get the best of all of
// them). The actual intended shape: a LONGFORM collection bought
// incrementally over a campaign (5-6+ attached is normal, not
// exceptional), where the real decision isn't "which attribute" but
// "how do I want to pay for a given attribute ceiling." Two CSMs can
// offer the identical peak value on the same attribute and still be
// meaningfully different: a cheap one might tax you elsewhere (raise
// Noise, reduce the Array's own Program Slots) to hit that number,
// while an expensive one hits the same number clean — or even bundles
// a second bonus (Noise reduction, bonus Program Slots) on top. The
// tension is economic (cheap-with-a-cost vs. expensive-and-clean), not
// "pick your build."
//
// E-SOFTS: real, sourced (Double Clutch pt. 6C) rigger-specific Matrix
// programs. These are Programs, not room Upgrades — they load into the
// Array's separate matrixCapacityProvided pool (via matrixCapacityUsed),
// exactly like a commlink's program slots, NOT through
// upgradeCapacityUsed the way CSMs do. Category/tags are deliberately
// disjoint from the Upgrade pool (see the esoft factory's own comment
// for why that was a real bug, not a style choice). Source text didn't
// give a price/Availability table for these, so costs below are
// inferred placeholders using standard Illegal-autosoft economics —
// flagged honestly in each description, same treatment Retrans Unit's
// Noise value already got.
//
// EVERY PREVIOUSLY-BARE FACILITY (Workshop, Armory, Crew Quarters,
// Moon Pool, Weapons Facility, plus more content for Medbay and the
// Comms/Sensor Array) now has real Upgrade content — a mix of stat
// bonuses (flatDicePool), Storage Units, and pure reference-only
// effects with no live mechanism yet (same honest category
// Network Sharing Enhancement and Rigger Cocoon already used). None of
// this is sourced from Double Clutch — it's original content built to
// round the system out, called out in each item's own comment.
//
// ============================================================================
// SCHEMA PASS 2 (the resolved-decisions pass) — applied on top of
// everything in PASS 1 below:
//
// D1. `referenceOnly: true` on 51 of the 61 items carrying `effects`.
//     The test (canonical wording in sensors_security_survival.js): an
//     effect is BACKED only if a live computed field DRIVES that
//     specific effect. This file has the HIGHEST backed rate in the
//     catalog so far — 10 items — because it's the one place
//     `flatDicePool` and `deviceModifiers` were already being used for
//     exactly that (Valkyrie Module, Cybertech Diagnostic Cradle,
//     Precision Toolkit, Directional Antenna, Gunnery Targeting Rig,
//     Retrans Unit), plus the four Mechanical Arms now that they carry
//     a real melee `damageValue`. This retires S3 below: the
//     implementation-status caveats that pass 1 pushed into code
//     comments now have a real field.
// D2. E-SOFTS mirror `autosoft` economics — source says they're
//     "considered a form of Illegal autosoft for the purposes of
//     availability, price, and maximum rating." Flat placeholder costs
//     and their disclaimers are gone; see the esoft factory comment.
//     The confirmed Attack Rating formula is now an effects entry on
//     the three Attack-granting e-softs.
// D3. MECHANICAL ARMS carry their real banded stats. Strength is a
//     `ratingRange` per tier with `ratingLabel: 'Strength'`, melee
//     `damageValue`, and `requiresHardpoint`; the whole band table is
//     exported as MECHANICAL_ARM_BANDS. The four arms stay four items
//     by decision rather than collapsing into one Rating-selected item.
// D4. POP-OUT CONCEALMENT RESTRUCTURED into concealed Hardpoints.
//     This fixes a hard bug: as Upgrades they consumed 0.5/1/2/3 of a
//     Hardpoint's fixed 1-slot pool, so Large and Huge could never
//     attach to anything. See the comment at the items.
//
// SCHEMA PASS 1 — the original array/omittable-description pass:
//
// S1. `effects` / `wirelessBonuses` ARRAYS. Unlike the weapon files,
//     this one had NO effect or wirelessBonus fields at all — every
//     mechanical fact lived in `description` prose. So this wasn't a
//     rename, it was an extraction: 48 items now carry real `effects`
//     entries, one distinct mechanic per entry, ordered active
//     mechanics first and restrictions/compatibility last. Shared
//     effect text on factory-built families (weapon mounts, mechanical
//     arms, pop-out concealment) is hoisted into a constant rather
//     than repeated per item.
// S2. `description` IS NOW OMITTABLE — delete it and lose no gameplay
//     information. Numbers already held in a structured field are NOT
//     restated in `effects` (flatDicePool, deviceModifiers,
//     storagePreferredCategories, upgradeCapacityUsed), so e.g. the
//     Valkyrie Module's "10 dice" lives only in flatDicePool and the
//     Scrapyard Firewall's "-1 Program Slot" lives only in
//     deviceModifiers.
// S3. (SUPERSEDED BY D1 — the caveats now have a real field.)
//     IMPLEMENTATION-STATUS NOTES MOVED TO CODE COMMENTS. A lot of
//     this file's prose was "...Reference-only; no mechanism exists yet
//     to wire this into" — that's a note to whoever implements the
//     feature, not a game rule, and it isn't gameplay information the
//     omittable-description test is meant to protect. The game effect
//     now lives in `effects`; the app-status caveat is a comment. See
//     the open question in the pass summary about whether this
//     deserves a real `referenceOnly: true` flag instead — several
//     dozen items would use it, and players arguably should see it.
// S4. NO `defaultAttachments` AND NO `builtIn` ITEMS IN THIS FILE.
//     (Still true after pass 2.)
//     Nothing here is described as shipping with another catalog item
//     pre-installed — Hardpoints HOLD things, but what goes in them is
//     a purchase the player makes. Hardpoint-to-Upgrade compatibility
//     is expressed through `additionType` + the Capacity pools, which
//     is a different (and already-working) mechanism. Deliberately not
//     forced in.
// ============================================================================

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

// The 10-die pool lives in flatDicePool and is rollable directly off
// the module. There's no character-side First Aid test mechanism to
// wire it into yet.
const valkyrie_module = upgrade({
  id: 'valkyrie_module', label: 'Valkyrie Module',
  additionType: 'medbay',
  cost: 3000, availability: 4,
  description: 'The confirmed flagship Medbay module — a surgical suite in a box.',
  stats: {
    upgradeCapacityUsed: 1,
    flatDicePool: 10,
    effects: [
      'Combines a built-in auto-doc (Rating 4 Biotech autosoft) and medical systems (Rating 6 medkit) for First Aid and Medkit healing tests.',
    ],
  },
});

// Reference-only — no dying/stabilization mechanism exists yet.
const trauma_stabilizer = upgrade({
  id: 'trauma_stabilizer', label: 'Trauma Stabilizer',
  referenceOnly: true,
  additionType: 'medbay',
  cost: 4500, availability: 5,
  stats: {
    upgradeCapacityUsed: 1,
    effects: [
      'Auto-stabilizes a dying character with no test required.',
      'Buys time until real treatment is possible.',
    ],
  },
});

const cybertech_diagnostic_cradle = upgrade({
  id: 'cybertech_diagnostic_cradle', label: 'Cybertech Diagnostic Cradle',
  additionType: 'medbay',
  cost: 2500, availability: 4,
  description: 'A narrower cousin of the Valkyrie Module, built around a cyberlimb jig rather than a surgical bed.',
  stats: {
    upgradeCapacityUsed: 1,
    flatDicePool: 4,
    effects: [
      'Bonus dice on Essence and cyberware-related diagnostic and maintenance tests.',
      'Does not apply to general First Aid.',
    ],
  },
});

// The storage half works today; the synthesis half is reference-only —
// no crafting mechanism exists yet.
const pharma_synthesizer = upgrade({
  id: 'pharma_synthesizer', label: 'Pharma Synthesizer',
  referenceOnly: true,
  additionType: 'medbay',
  cost: 5000, availability: 6,
  legality: 'restricted',
  stats: {
    upgradeCapacityUsed: 1,
    storagePreferredCategories: ['drug'],
    effects: ['Can synthesize basic compounds from raw stock over downtime.'],
  },
});

const overflow_cots = upgrade({
  id: 'overflow_cots', label: 'Overflow Cots',
  referenceOnly: true,
  additionType: 'medbay',
  cost: 800, availability: 2,
  description: 'Fold-down racks along the bulkhead. No dice bonus — pure fiction.',
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['The Medbay can stabilize and treat multiple patients simultaneously instead of one at a time.'],
  },
});

const workshop_fabrication_bay = addition({
  id: 'workshop_fabrication_bay', label: 'Workshop / Fabrication Bay',
  cost: 6000, availability: 3,
  description: 'A dedicated repair/customization bay housing — bonuses come from whatever upgrade modules are installed.',
});

// ---- Workshop Upgrades ----
// All homebrew — this room had zero confirmed content before now.

// Reference-only — no Edge-granting-by-location mechanism exists yet
// to auto-apply this.
const automated_assistance_software = upgrade({
  id: 'automated_assistance_software', label: 'Automated Assistance Software',
  referenceOnly: true,
  additionType: 'workshop_fabrication_bay',
  cost: 3500, availability: 4,
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['Grants a bonus Edge point on repair tests performed in this Workshop.'],
  },
});

const enhanced_welding_station = upgrade({
  id: 'enhanced_welding_station', label: 'Enhanced Welding Station',
  referenceOnly: true,
  additionType: 'workshop_fabrication_bay',
  cost: 2000, availability: 3,
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['Reduces the time a repair or fabrication job takes. No dice bonus — a pure time-cost effect.'],
  },
});

const precision_toolkit = upgrade({
  id: 'precision_toolkit', label: 'Precision Toolkit',
  additionType: 'workshop_fabrication_bay',
  cost: 2800, availability: 3,
  description: 'Micrometers, jigs, and a calibrated bench — the Valkyrie Module\u2019s shape, aimed at a different skill.',
  stats: {
    upgradeCapacityUsed: 1,
    flatDicePool: 6,
    effects: ['Bonus dice on Engineering tests performed in this Workshop.'],
  },
});

// Reference-only — no downtime-crafting mechanism exists yet.
const fabricator_3d = upgrade({
  id: 'fabricator_3d', label: '3D Fabricator',
  referenceOnly: true,
  additionType: 'workshop_fabrication_bay',
  cost: 6000, availability: 6,
  stats: {
    upgradeCapacityUsed: 1,
    effects: [
      'Prints basic gear and ammo components from raw material over downtime.',
      'Gated by time rather than by a test.',
    ],
  },
});

const scrap_sorter = upgrade({
  id: 'scrap_sorter', label: 'Scrap Sorter',
  additionType: 'workshop_fabrication_bay',
  cost: 900, availability: 2,
  description: 'Feeds the 3D Fabricator narratively, or just keeps scavenged parts organized.',
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
  referenceOnly: true,
  category: 'comm_sensor_array', legality: null, image: null, wireless: true,
  tags: ['addition'],
  cost: 10000, availability: 4,
  description: "A vehicle's own permanent Matrix device. Comm Sensor Enhancement Modules attach through the same generic upgrade pool as any other Addition and rotate in for the best value; Programs load into its Program Slots the normal, Matrix-Capacity-gated way.",
  stats: {
    additionCapacityUsed: 1,
    attack: 1, sleaze: 1, dataProcessing: 1, firewall: 1,
    deviceRating: 1,
    matrixCapacityProvided: 2,
    upgradeCapacityProvided: 3,
    effects: [
      'Each attached Comm Sensor Enhancement Module adds +1 to the Array\u2019s own Condition Monitor.',
      'A character can Slave to Vehicle from their own PAN once they own a copy of the vehicle carrying one.',
    ],
  },
};

// ---- Comm Sensor Modules (Upgrades, rotate into the Array's ASDF) ----
// See file header note on CSM DESIGN. A longform collection, not 4
// exclusive roles: multiple modules targeting the SAME attribute at
// the SAME peak value, differentiated by whether hitting that number
// costs something elsewhere (Noise, Program Slots) or comes bundled
// with a bonus, and priced accordingly. Expect a real Array to
// accumulate 5-6+ of these over a campaign.
//
// NOTE ON `effects` HERE: CSM tradeoffs are already fully structured —
// the attribute values and every Noise / Program Slot cost live in
// deviceModifiers. Restating them in `effects` would duplicate a
// structured field, so these items carry flavor descriptions only.
// That's the schema working as intended, not a gap.

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
  description: 'A basic, competent-everywhere module with no downside and no standout — the first CSM most riggers buy, and the floor everything else gets measured against.',
  stats: { attack: 2, sleaze: 2, dataProcessing: 2, firewall: 2 },
});

// -- Firewall pair: cheap-with-a-tax vs. expensive-and-clean --
const csm_scrapyard_firewall = csm({
  id: 'csm_scrapyard_firewall', label: 'Scrapyard Firewall Patch',
  cost: 2000, availability: 4,
  description: 'Salvaged, cobbled-together hardware that genuinely works, but eats into the Array\u2019s own Program Slots to do it. The budget way to hit a defensive number, if you can spare the room.',
  stats: { firewall: 4, deviceModifiers: { matrixCapacityProvided: -1 } },
});
const csm_aegis_firewall = csm({
  id: 'csm_aegis_firewall', label: 'Aegis Firewall Array',
  cost: 6500, availability: 6,
  legality: 'restricted',
  description: 'The same Firewall the Scrapyard patch offers, but properly engineered — no Program Slot cost, no compromises. Pay more, keep your room.',
  stats: { firewall: 4 },
});

// -- Sleaze pair: leaky-cheap vs. premium-with-a-bonus --
const csm_whisper_sleaze_chip = csm({
  id: 'csm_whisper_sleaze_chip', label: 'Whisper Sleaze Chip',
  cost: 2200, availability: 4,
  legality: 'restricted',
  description: 'Sleaze on the cheap — the shielding is thin enough that the module itself leaks a little. Fine if you\u2019re not already fighting for signal.',
  stats: { sleaze: 4, deviceModifiers: { noise: 2 } },
});
const csm_ghostline_sleaze_suite = csm({
  id: 'csm_ghostline_sleaze_suite', label: 'Ghostline Sleaze Suite',
  cost: 7000, availability: 7,
  legality: 'restricted',
  description: 'The same Sleaze, properly shielded — and shielded well enough that it actively cleans up the signal around it instead of just avoiding making it worse.',
  stats: { sleaze: 4, deviceModifiers: { noise: -2 } },
});

// -- Attack/DataProcessing pair: taxed vs. clean --
const csm_overclocked_attack_core = csm({
  id: 'csm_overclocked_attack_core', label: 'Overclocked Attack Core',
  cost: 3200, availability: 5,
  legality: 'restricted',
  description: 'Pushed past its rated limits — hits hard, but the overclocking draws enough resources to cost the Array a Program Slot.',
  stats: { attack: 5, deviceModifiers: { matrixCapacityProvided: -1 } },
});
const csm_blackout_attack_array = csm({
  id: 'csm_blackout_attack_array', label: 'Blackout Attack Array',
  cost: 8500, availability: 7,
  legality: 'forbidden',
  description: 'The same Attack value, built to spec instead of pushed past it. Priced like the military-grade hardware it is.',
  stats: { attack: 5 },
});
const csm_dragnet_processing_unit = csm({
  id: 'csm_dragnet_processing_unit', label: 'Dragnet Processing Unit',
  cost: 3000, availability: 5,
  description: 'Serious Data Processing crammed into a small footprint — the tradeoff is heat, which the Array bleeds off by running its Program Slots slightly hot.',
  stats: { dataProcessing: 5, deviceModifiers: { matrixCapacityProvided: -1 } },
});

// -- Rare "gives you room instead of taking it" options --
const csm_efficient_processing_node = csm({
  id: 'csm_efficient_processing_node', label: 'Efficient Processing Node',
  cost: 4000, availability: 5,
  description: 'A modest Data Processing figure — nothing special on its own, but its power management is efficient enough to free up an extra Program Slot on top of the usual one.',
  stats: { dataProcessing: 3, deviceModifiers: { matrixCapacityProvided: 2 } },
});
const csm_redundant_node_cluster = csm({
  id: 'csm_redundant_node_cluster', label: 'Redundant Node Cluster',
  cost: 5000, availability: 5,
  description: 'Flat and unremarkable across all four attributes — the point isn\u2019t any single number, it\u2019s that the redundant architecture frees up an extra Program Slot. A reasonable early pickup for a rigger still deciding what their Array needs to specialize in.',
  stats: { attack: 3, sleaze: 3, dataProcessing: 3, firewall: 3, deviceModifiers: { matrixCapacityProvided: 2 } },
});

// ---- Other Comms/Sensor Array Upgrades (generic upgrade pool) ----

// Exact Noise value not confirmed by source (only "stripping
// accumulated Noise" is stated) — the -2 in deviceModifiers is an
// inferred placeholder matching Signal Scrubber's own value.
const retrans_unit = upgrade({
  id: 'retrans_unit', label: 'Retrans Unit',
  additionType: 'comms_sensor_array',
  cost: 7000, availability: 3,
  stats: {
    upgradeCapacityUsed: 1,
    deviceModifiers: { noise: -2 },
    effects: [
      'Strips accumulated Noise and rebroadcasts the signal as if it originated at the unit itself.',
      'Can rebroadcast for a whole linked network.',
    ],
  },
});

// Reference-only — no multi-rigger PAN-sharing mechanism exists yet.
const network_sharing_enhancement = upgrade({
  id: 'network_sharing_enhancement', label: 'Network Sharing Enhancement',
  referenceOnly: true,
  additionType: 'comms_sensor_array',
  cost: 85000, availability: 9,
  legality: 'illegal',
  stats: {
    upgradeCapacityUsed: 1,
    effects: [
      'Lets a rigged vehicle share its network like a mobile host.',
      'Rating sets the maximum simultaneous "captain" plus participant riggers.',
      'Still only one jump-in per device at a time.',
    ],
  },
});

const passive_listening_suite = upgrade({
  id: 'passive_listening_suite', label: 'Passive Listening Suite',
  referenceOnly: true,
  additionType: 'comms_sensor_array',
  cost: 3200, availability: 4,
  legality: 'restricted',
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['Picks up ambient Matrix chatter near the vehicle — GM-narrated intel rather than a rollable effect.'],
  },
});

const directional_antenna = upgrade({
  id: 'directional_antenna', label: 'Directional Antenna',
  additionType: 'comms_sensor_array',
  cost: 2600, availability: 4,
  stats: {
    upgradeCapacityUsed: 1,
    flatDicePool: 3,
    effects: ['Bonus dice on Matrix Perception and Search tests run from this vehicle, distinct from the Array\u2019s own base ASDF.'],
  },
});

const dead_drop_cache = upgrade({
  id: 'dead_drop_cache', label: 'Dead Drop Cache',
  additionType: 'comms_sensor_array',
  cost: 600, availability: 2,
  description: 'A small shielded void behind a panel, for covert exchanges.',
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
// Category/tags deliberately do NOT include 'addition_upgrade'. That
// tag is what UpgradeAttachPicker filters on for the generic Upgrade
// pool — leaving it on these meant an E-Soft was attachable through
// BOTH pickers at once: correctly via ProgramAttachPicker (consumes
// matrixCapacityUsed as intended), but ALSO via UpgradeAttachPicker,
// where wouldExceedCapacity checked for an upgradeCapacityUsed stat
// these items never had — meaning it attached for free, consumed zero
// Upgrade slots, AND then didn't even show up in
// CommsSensorArrayPanel's own Program list (which excludes anything
// tagged 'addition_upgrade'). Net effect: an E-Soft attached via the
// wrong picker became invisible and free, bypassing both Capacity
// pools simultaneously. Fixed by giving these their own distinct
// category/tags with no overlap with the Upgrade pool at all.
//
// PRICING RESOLVED (pass 2): source states "e-softs are considered a
// form of Illegal autosoft for the purposes of availability, price, and
// maximum rating." So these now mirror the `autosoft` item in
// armor_electronics.js exactly — ratingRange [1,9], costPerRating 500,
// availabilityEqualsRating — differing only in being permanently
// illegal where autosoft is unrestricted. The old flat
// cost/availability numbers and their "inferred placeholder"
// disclaimers are gone; nothing here is a guess any more.
//
// AVAILABILITY was also the only STRING availability in the catalog
// ('8(I)'), which double-rendered as "8(I) (I)" because
// formatAvailability() appends its own legality suffix. Now derived
// from Rating like autosoft's.

// Confirmed source formula. Flagged referenceOnly at the item level
// because nothing in this codebase computes an RCC's Device Rating —
// no RCC mechanism exists yet.
const ESOFT_ATTACK_RATING = 'Matrix Attack Rating = this e-soft\u2019s Rating + the Device Rating of the RCC running it.';

function esoft(overrides) {
  const { stats = {}, ...rest } = overrides;
  return {
    category: 'program', legality: 'illegal', image: null, tags: ['esoft', 'program'],
    additionType: 'comms_sensor_array',
    cost: null,
    costPerRating: 500,
    availability: null,
    availabilityEqualsRating: true,
    referenceOnly: true,
    ...rest,
    stats: {
      matrixCapacityUsed: 1,
      ratingRange: [1, 9],
      ...stats,
    },
  };
}

const esoft_crash_and_burn = esoft({
  id: 'esoft_crash_and_burn', label: 'E-Soft: Crash and Burn',
  stats: {
    effects: [
      'Enables the Data Spike Matrix action.',
      'Grants a virtual Attack attribute equal to its Rating.',
      ESOFT_ATTACK_RATING,
      'Usable only against vehicle and drone Matrix icons.',
      'Counts as a hacking cyberprogram for Overwatch Score.',
    ],
  },
});
const esoft_emergency_override = esoft({
  id: 'esoft_emergency_override', label: 'E-Soft: Emergency Override',
  stats: {
    effects: [
      'Grants the Matrix Attack Rating benefit to the Spoof Command action.',
      ESOFT_ATTACK_RATING,
      'Usable only against vehicle/drone-interfacing devices — traffic lights, crossing arms, retractable bollards, and the like.',
      'Counts as a hacking cyberprogram for Overwatch Score.',
    ],
  },
});
const esoft_reroute_signal = esoft({
  id: 'esoft_reroute_signal', label: 'E-Soft: Reroute Signal',
  stats: {
    effects: [
      'While running, grants a virtual Sleaze attribute equal to its Rating.',
      'Usable only when defending against Trace Icon.',
    ],
  },
});
const esoft_run_silent_run_deep = esoft({
  id: 'esoft_run_silent_run_deep', label: 'E-Soft: Run Silent, Run Deep',
  stats: {
    effects: [
      'Grants a virtual Sleaze attribute equal to its Rating while the RCC\u2019s PAN is running silent.',
      'Usable only to defend against Matrix Perception tests targeting the PAN.',
    ],
  },
});
const esoft_slim_jim = esoft({
  id: 'esoft_slim_jim', label: 'E-Soft: Slim Jim',
  stats: {
    effects: [
      'Enables the Brute Force and Control Device Matrix actions.',
      'Grants a virtual Attack attribute equal to its Rating.',
      ESOFT_ATTACK_RATING,
      'Usable only against vehicle and drone Matrix icons.',
      'Counts as a hacking cyberprogram for Overwatch Score.',
    ],
  },
});
const esoft_smartsoft = esoft({
  id: 'esoft_smartsoft', label: 'E-Soft: Smartsoft',
  stats: {
    effects: [
      'When shared from an RCC, all drones in the network benefit from a sensor lock achieved by any one participating drone.',
    ],
  },
});
const esoft_swarm = esoft({
  id: 'esoft_swarm', label: 'E-Soft: Swarm',
  stats: {
    effects: [
      'When shared from an RCC, drones attacking as a Grunt Group count each drone after the first as two participants.',
    ],
  },
});

const armory = addition({
  id: 'armory', label: 'Armory',
  cost: 5000, availability: 4,
  legality: 'illegal',
  description: 'A secure weapon/gear storage housing — the "gun cage." Bonuses come from whatever upgrade modules are installed, including its own Weapon Rack.',
});

// The concrete "generic gear storage" case — a real Storage Unit, not
// just vehicles/drones. Preferring firearms specifically (category
// 'firearm', matching firearms_explosives.js) since Armory is framed
// as the personal-small-arms gun cage. Anything else can still be
// stored here; it just sorts into "Other" rather than "Preferred."
const weapon_rack = upgrade({
  id: 'weapon_rack', label: 'Weapon Rack',
  additionType: 'armory',
  cost: 1500, availability: 3,
  legality: 'illegal',
  description: "Secure storage for the team's own carried weapons.",
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: ['firearm'] },
});

// ---- Other Armory Upgrades ----
// All homebrew.

const reloading_bench = upgrade({
  id: 'reloading_bench', label: 'Reloading Bench',
  referenceOnly: true,
  additionType: 'armory',
  cost: 1800, availability: 3,
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['Reduces the team\u2019s ongoing ammunition cost over time. No dice bonus — a quiet economy perk.'],
  },
});

// Reference-only — no live "serviced weapon" state exists to track this.
const zeroing_rig = upgrade({
  id: 'zeroing_rig', label: 'Zeroing Rig',
  referenceOnly: true,
  additionType: 'armory',
  cost: 1200, availability: 3,
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['A one-time bonus on a weapon\u2019s next shot after it is serviced and sighted in here.'],
  },
});

const customization_station = upgrade({
  id: 'customization_station', label: 'Customization Station',
  referenceOnly: true,
  additionType: 'armory',
  cost: 2200, availability: 4,
  legality: 'illegal',
  description: 'A narrower, cheaper alternative to a full Workshop.',
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['Enables installing weapon mods without a Workshop / Fabrication Bay.'],
  },
});

const armored_rack = upgrade({
  id: 'armored_rack', label: 'Armored Rack',
  referenceOnly: true,
  additionType: 'armory',
  cost: 900, availability: 3,
  description: 'Ablative plate and shock mounts around the Weapon Rack itself.',
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['Stored weapons are protected if the vehicle takes damage.'],
  },
});

const crew_quarters = addition({
  id: 'crew_quarters', label: 'Crew Quarters / Common Area',
  cost: 4000, availability: 2,
  description: 'A lifestyle-adjacent downtime housing — bonuses come from whatever upgrade modules are installed.',
});

// ---- Crew Quarters Upgrades ----
// All homebrew — this room had zero confirmed content before now.

// Reference-only — no downtime-healing mechanism exists yet.
const proper_galley = upgrade({
  id: 'proper_galley', label: 'Proper Galley',
  referenceOnly: true,
  additionType: 'crew_quarters',
  cost: 2500, availability: 2,
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['Bonus to Stun recovery and downtime healing rate for anyone aboard.'],
  },
});

// Reference-only. Deliberately niche — it gives Crew Quarters a reason
// a caster specifically would want it.
const meditation_space = upgrade({
  id: 'meditation_space', label: 'Meditation Space',
  referenceOnly: true,
  additionType: 'crew_quarters',
  cost: 3000, availability: 3,
  description: 'A quiet, magically suitable corner of the vehicle.',
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['A small bonus to Drain resistance and Astral-adjacent activity, for Awakened characters only.'],
  },
});

const entertainment_suite = upgrade({
  id: 'entertainment_suite', label: 'Entertainment Suite',
  additionType: 'crew_quarters',
  cost: 1500, availability: 2,
  description: 'Trid rig, sim deck, and a wall of terrible snacks. Pure fiction, zero mechanical effect — a GM hook for downtime roleplay scenes.',
  stats: { upgradeCapacityUsed: 1 },
});

const lockable_bunks = upgrade({
  id: 'lockable_bunks', label: 'Lockable Bunks',
  additionType: 'crew_quarters',
  cost: 800, availability: 1,
  description: 'Personal Storage Units per crew member, preferring nothing in particular — generic personal effects.',
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: [] },
});

const moon_pool = addition({
  id: 'moon_pool', label: 'Moon Pool / Dive Locker',
  cost: 7000, availability: 3,
  description: 'A nautical-flavored storage and launch housing for underwater gear or small submersibles — bonuses come from whatever upgrade modules are installed.',
});

// ---- Moon Pool Upgrades ----
// All homebrew — this room had zero confirmed content before now.

// Reference-only — no live underwater-Perception mechanism exists yet.
const sonar_suite = upgrade({
  id: 'sonar_suite', label: 'Sonar Suite',
  referenceOnly: true,
  additionType: 'moon_pool',
  cost: 3800, availability: 5,
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['Bonus to Perception tests made underwater.'],
  },
});

const launch_cradle = upgrade({
  id: 'launch_cradle', label: 'Launch Cradle',
  additionType: 'moon_pool',
  cost: 4200, availability: 4,
  description: "A powered cradle and rail, narrower than Vehicle Bay's broader vehicle/drone preference.",
  stats: { upgradeCapacityUsed: 1, storagePreferredCategories: ['submersible', 'dpv'] },
});

const decompression_chamber = upgrade({
  id: 'decompression_chamber', label: 'Decompression Chamber',
  referenceOnly: true,
  additionType: 'moon_pool',
  cost: 3000, availability: 4,
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['Prevents and treats decompression sickness after deep dives, with no test involved.'],
  },
});

const bioluminescent_lure_rig = upgrade({
  id: 'bioluminescent_lure_rig', label: 'Bioluminescent Lure Rig',
  additionType: 'moon_pool',
  cost: 350, availability: 2,
  description: 'A weird, purely decorative fixture with zero mechanical effect. Not everything needs a function.',
  stats: { upgradeCapacityUsed: 1 },
});

// A real Storage Unit, preferring vehicles/drones — this is what
// retires the old bespoke "Store Vehicle" mechanism entirely. Same
// generic mechanism a Weapon Rack or Drone Rack uses, just a different
// preference list.
const vehicle_bay = addition({
  id: 'vehicle_bay', label: 'Vehicle Bay',
  referenceOnly: true,
  cost: 15000, availability: 4,
  description: 'A proper bay for storing and launching other vehicles — bay door, cleared structural space, and tie-down/locking hardware.',
  stats: {
    additionCapacityUsed: 2,
    upgradeCapacityProvided: 3,
    storagePreferredCategories: ['vehicle', 'drone'],
    effects: ['Launching a stored vehicle costs 1 Major Action; recovering one costs 3.'],
  },
});

// ---- Vehicle Bay Upgrades ----
// All homebrew.

// Reference-only — not wired to override the base launch/recover rule
// automatically. Relevant to any Vehicle Bay, including the Wavecutter
// MPAC's own small craft bay.
const quick_launch_rails = upgrade({
  id: 'quick_launch_rails', label: 'Quick-Launch Rails',
  referenceOnly: true,
  additionType: 'vehicle_bay',
  cost: 5000, availability: 5,
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['Reduces the action cost and timing to launch a stored vehicle.'],
  },
});

const diagnostic_umbilical = upgrade({
  id: 'diagnostic_umbilical', label: 'Diagnostic Umbilical',
  referenceOnly: true,
  additionType: 'vehicle_bay',
  cost: 3500, availability: 4,
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['Auto-repairs minor Condition Monitor damage on a docked vehicle between sessions, with no test required.'],
  },
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

// The dice pool is rollable directly off the module; there's no live
// vehicle-weapon-fire mechanism yet to auto-apply it.
const gunnery_targeting_rig = upgrade({
  id: 'gunnery_targeting_rig', label: 'Gunnery Targeting Rig',
  additionType: 'weapons_facility',
  cost: 4500, availability: 6,
  legality: 'illegal',
  description: 'The vehicle-weapon equivalent of the Valkyrie Module.',
  stats: {
    upgradeCapacityUsed: 1,
    flatDicePool: 6,
    effects: ['Bonus dice on Gunnery tests.'],
  },
});

// Reference-only — no downtime-crafting mechanism exists yet.
const demolitions_bench = upgrade({
  id: 'demolitions_bench', label: 'Demolitions Bench',
  referenceOnly: true,
  additionType: 'weapons_facility',
  cost: 3800, availability: 6,
  legality: 'illegal',
  stats: {
    upgradeCapacityUsed: 1,
    effects: ['Assemble explosive charges from raw components over downtime.'],
  },
});

const blast_rated_storage = upgrade({
  id: 'blast_rated_storage', label: 'Blast-Rated Storage',
  referenceOnly: true,
  additionType: 'weapons_facility',
  cost: 2200, availability: 5,
  legality: 'illegal',
  description: 'Safety flavor rather than a mechanical effect.',
  stats: {
    upgradeCapacityUsed: 1,
    storagePreferredCategories: ['explosive'],
    effects: ['Narratively reduces accidental-detonation risk for stored explosives.'],
  },
});

// ---- Hardpoints ----
// Real confirmed pricing, adapted from Double Clutch's own "mod slot"
// cost scale (0.5/1/2/3) into this app's additionCapacityUsed terms
// (1/1/2/3) — a reasonable adaptation, not a direct unit conversion,
// since our Addition Capacity isn't the same unit as DC's mod slots.
// Each Hardpoint provides exactly 1 Upgrade slot regardless of size —
// Weapon Mounts, Drone Racks, Ram Plates, Winches, and Mechanical Arms
// all attach through that one slot.
//
// The what-fits list on each size is genuine compatibility
// information, so it lives in `effects` rather than prose.

function hardpoint(overrides) {
  return {
    category: 'addition', legality: null, image: null, tags: ['addition', 'hardpoint'],
    stats: { upgradeCapacityProvided: 1 },
    ...overrides,
  };
}

const hardpoint_small = hardpoint({
  id: 'hardpoint_small', label: 'Small Hardpoint',
  referenceOnly: true,
  cost: 800, availability: 2,
  stats: {
    additionCapacityUsed: 1,
    upgradeCapacityProvided: 1,
    effects: ['Holds a small weapon mount, micro/mini drone rack, small mechanical arm (Str 2), or a device up to 2 liters.'],
  },
});
const hardpoint_standard = hardpoint({
  id: 'hardpoint_standard', label: 'Standard Hardpoint',
  referenceOnly: true,
  cost: 1500, availability: 2,
  stats: {
    additionCapacityUsed: 1,
    upgradeCapacityProvided: 1,
    effects: ['Holds a standard weapon mount, small drone rack, turreted small weapon mount, medium mechanical arm (Str 5), sidecar/trailer attachment, ram plate, winch, or a device up to 25 liters.'],
  },
});
const hardpoint_large = hardpoint({
  id: 'hardpoint_large', label: 'Large Hardpoint',
  referenceOnly: true,
  cost: 3000, availability: 3,
  stats: {
    additionCapacityUsed: 2,
    upgradeCapacityProvided: 1,
    effects: ['Holds a large weapon mount, turreted standard weapon mount, medium drone rack, large mechanical arm (Str 10), fifth wheel, ladder, manlift, or a device up to ~250 liters.'],
  },
});
const hardpoint_huge = hardpoint({
  id: 'hardpoint_huge', label: 'Huge Hardpoint',
  referenceOnly: true,
  cost: 8000, availability: 4,
  stats: {
    additionCapacityUsed: 3,
    upgradeCapacityProvided: 1,
    effects: ['Holds a turreted large weapon mount, large drone rack, huge mechanical arm (Str 20), or other heavy construction equipment or very large device up to ~2,500 liters.'],
  },
});

// ---- Weapon Mounts (Upgrades, attach to a Hardpoint) ----
// Both bonuses are confirmed real. No live vehicle-weapon-fire
// mechanism exists yet to auto-apply them.

const WEAPON_MOUNT_EFFECTS = [
  '+2 Attack Rating on the mounted weapon.',
  'Halves burst-fire Attack Rating penalties — better recoil compensation.',
];

function weaponMount(overrides) {
  return {
    category: 'addition_upgrade', legality: 'illegal', image: null, tags: ['addition_upgrade', 'weapon_mount'],
    additionType: 'hardpoint',
    stats: { upgradeCapacityUsed: 1, effects: WEAPON_MOUNT_EFFECTS },
    ...overrides,
  };
}

const weapon_mount_small = weaponMount({
  id: 'weapon_mount_small', label: 'Small Weapon Mount',
  referenceOnly: true,
  cost: 1500, availability: 3,
});
const weapon_mount_small_turreted = weaponMount({
  id: 'weapon_mount_small_turreted', label: 'Small Weapon Mount (Turreted)',
  referenceOnly: true,
  cost: 6500, availability: 5,
});
const weapon_mount_standard = weaponMount({
  id: 'weapon_mount_standard', label: 'Standard Weapon Mount',
  referenceOnly: true,
  cost: 2500, availability: 4,
});
const weapon_mount_standard_turreted = weaponMount({
  id: 'weapon_mount_standard_turreted', label: 'Standard Weapon Mount (Turreted)',
  referenceOnly: true,
  cost: 8500, availability: 6,
});
const weapon_mount_large = weaponMount({
  id: 'weapon_mount_large', label: 'Large Weapon Mount',
  referenceOnly: true,
  cost: 5000, availability: 5,
});
const weapon_mount_large_turreted = weaponMount({
  id: 'weapon_mount_large_turreted', label: 'Large Weapon Mount (Turreted)',
  referenceOnly: true,
  cost: 12000, availability: 7,
});

// ---- Drone Racks (Upgrades, attach to a Hardpoint, Storage Units) ----
// Capacity counts are reference only — not enforced by the Storage
// Unit mechanism, which doesn't cap item counts.

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
  referenceOnly: true,
  cost: 1000, availability: 3,
  stats: {
    upgradeCapacityUsed: 1,
    storagePreferredCategories: ['microdrone', 'minidrone'],
    effects: ['Holds up to 5 mini or microdrones.'],
  },
});
const drone_rack_small = droneRack({
  id: 'drone_rack_small', label: 'Small Drone Rack',
  referenceOnly: true,
  cost: 2000, availability: 3,
  stats: {
    upgradeCapacityUsed: 1,
    storagePreferredCategories: ['small_drone'],
    effects: ['Holds up to 3 small drones.'],
  },
});
const drone_rack_medium = droneRack({
  id: 'drone_rack_medium', label: 'Medium Drone Rack',
  referenceOnly: true,
  cost: 5000, availability: 4,
  stats: {
    upgradeCapacityUsed: 1,
    storagePreferredCategories: ['medium_drone'],
    effects: ['Holds 1 medium drone.'],
  },
});
const drone_rack_large = droneRack({
  id: 'drone_rack_large', label: 'Large Drone Rack',
  referenceOnly: true,
  cost: 10000, availability: 6,
  stats: {
    upgradeCapacityUsed: 1,
    storagePreferredCategories: ['large_drone'],
    effects: ['Holds 1 large drone.'],
  },
});

// ---- Ram Plate ----
const ram_plate = upgrade({
  id: 'ram_plate', label: 'Ram Plate',
  referenceOnly: true,
  additionType: 'hardpoint',
  costPerRating: 250,
  ratingLabel: 'Body',
  ratingRange: [1, 40],
  availability: 3,
  legality: 'illegal',
  description: "Cost = Body x 250¥ — enter the vehicle's actual current Body rating in the Body field when purchasing.",
  stats: {
    upgradeCapacityUsed: 1,
    effects: [
      'Adds the vehicle\u2019s own Body to its Ramming Attack Rating.',
      'Halves return collision damage.',
    ],
  },
});

// ---- Mechanical Arm ----
// D4 (pass 2): Strength is a real banded stat, not a label decoration.
// Source table bands Arm Strength -> Arm Size -> required Hardpoint ->
// melee DV -> Availability -> Cost, all stepping together, so this is
// the same shape as Bone Density Augmentation's ratingTable rather
// than a linear ratingRange + costPerRating pair.
//
// The four arms stay FOUR SEPARATE ITEMS by decision (not collapsed
// into one Rating-selected item), so each carries its own band from the
// table below and the full table is exported for reference.
//
// All four DV values (2P/3P/4P/5P) are directly confirmed by source —
// the full table states every band explicitly, endpoints and middle
// both. (An earlier draft of this comment guessed the middle two were
// interpolated; they weren't, they're sourced the same as the rest.)

export const MECHANICAL_ARM_BANDS = [
  { size: 'Small',  strengthRange: [1, 2],   hardpoint: 'hardpoint_small',    damageValue: '2P', availability: 2, cost: 2000 },
  { size: 'Medium', strengthRange: [3, 5],   hardpoint: 'hardpoint_standard', damageValue: '3P', availability: 2, cost: 4000 },
  { size: 'Large',  strengthRange: [6, 10],  hardpoint: 'hardpoint_large',    damageValue: '4P', availability: 3, cost: 7000 },
  { size: 'Huge',   strengthRange: [11, 20], hardpoint: 'hardpoint_huge',     damageValue: '5P', availability: 5, cost: 11000 },
];

const MECHANICAL_ARM_EFFECTS = [
  'Total working length = vehicle Body x 20cm.',
  'Can melee attack if remotely operated or running a [Close Combat] Targeting autosoft — Attack Rating = Sensor + Arm Strength, resolved with Close Combat + Sensor.',
  'Can be upgraded to the next size tier for that tier\u2019s price if the correct hardpoint is available, entering the new tier at its lowest Strength.',
  'Fine motor control tasks halve the operator\u2019s controlling attribute (Logic in VR).',
  'Limited range of motion — best at basic tasks like moving boxes or shifting rubble.',
];

function mechanicalArm(overrides) {
  const { band, stats = {}, ...rest } = overrides;
  return {
    category: 'addition_upgrade', legality: null, image: null, tags: ['addition_upgrade', 'mechanical_arm'],
    additionType: 'hardpoint',
    // Root `skill`, matching every other weapon-shaped item in the
    // catalog — the arms' own effect says the melee attack resolves
    // with Close Combat + Sensor, so a damageValue without a skill was
    // an attack nothing could roll.
    skill: 'close_combat',
    ratingLabel: 'Strength',
    ratingRange: band.strengthRange,
    cost: band.cost,
    availability: band.availability,
    description: 'A vehicle-mounted mechanical arm.',
    ...rest,
    stats: {
      upgradeCapacityUsed: 1,
      damageValue: band.damageValue,
      requiresHardpoint: band.hardpoint,
      effects: MECHANICAL_ARM_EFFECTS,
      ...stats,
    },
  };
}

const mechanical_arm_small = mechanicalArm({
  id: 'mechanical_arm_small', label: 'Mechanical Arm (Small, Str 1-2)',
  band: MECHANICAL_ARM_BANDS[0],
});
const mechanical_arm_medium = mechanicalArm({
  id: 'mechanical_arm_medium', label: 'Mechanical Arm (Medium, Str 3-5)',
  band: MECHANICAL_ARM_BANDS[1],
});
const mechanical_arm_large = mechanicalArm({
  id: 'mechanical_arm_large', label: 'Mechanical Arm (Large, Str 6-10)',
  band: MECHANICAL_ARM_BANDS[2],
});
const mechanical_arm_huge = mechanicalArm({
  id: 'mechanical_arm_huge', label: 'Mechanical Arm (Huge, Str 11-20)',
  band: MECHANICAL_ARM_BANDS[3],
});

// ---- Winch ----
// Both winches gained `wireless: true` + real wirelessBonuses this
// pass — their remote-release and remote-grip behaviour was described
// as wireless-conditional in prose but had no wireless flag at all,
// so it could never surface as a wireless bonus.

function winch(overrides) {
  return {
    category: 'addition_upgrade', legality: null, image: null, tags: ['addition_upgrade', 'winch'],
    additionType: 'hardpoint',
    wireless: true,
    stats: { upgradeCapacityUsed: 1 },
    ...overrides,
  };
}

const winch_rating_1 = winch({
  id: 'winch_rating_1', label: 'Winch (Rating 1)',
  referenceOnly: true,
  cost: 750, availability: 2,
  description: 'A steel cable on a powered drum with a latching hook.',
  stats: {
    upgradeCapacityUsed: 1,
    effects: [
      'About 100m of cable.',
      'Supports up to 10 tons, if the vehicle itself is heavy enough.',
      'Must attach to a Standard hardpoint.',
    ],
    wirelessBonuses: ['The hook can be released remotely.'],
  },
});
const winch_rating_2 = winch({
  id: 'winch_rating_2', label: 'Winch (Rating 2, Enhanced)',
  referenceOnly: true,
  cost: 4000, availability: 4,
  description: 'Replaces the hook with gecko-grip and magnetic tech.',
  stats: {
    upgradeCapacityUsed: 1,
    effects: [
      'Attaches to any surface without manually placing a hook.',
      'About 100m of cable.',
      'Supports up to 10 tons, if the vehicle itself is heavy enough.',
      'Must attach to a Standard hardpoint.',
    ],
    wirelessBonuses: ['Activate or deactivate the grip remotely via wireless command.'],
  },
});

// ---- Pop-Out Concealment (Concealed Hardpoints) ----
// D5 (pass 2) — RESTRUCTURED. These were modeled as Upgrades that
// install INTO a Hardpoint's own upgradeCapacityProvided slot, which is
// fixed at exactly 1 for every Hardpoint size. Their raw DC mod-slot
// cost (0.5/1/2/3, carried over unconverted) was being measured against
// that fixed 1, so Large and Huge could never attach to anything at
// all, and Small (0.5) plus the weapon mount it conceals (1) overflowed
// too.
//
// The confirmed rule is "the pop-out concealment systems requiring the
// same number of mod slots as the matching hardpoint" — which means
// Pop-Out Concealment IS a hardpoint, a concealed one, not something
// bolted into a visible one. So these are now built with the same
// hardpoint() factory, consuming the SAME already-adapted
// additionCapacityUsed as their visible equivalents (1/1/2/3, not the
// raw 0.5/1/2/3), and providing their own 1 Upgrade slot.
//
// A player picks one or the other at purchase time: visible hardpoint
// or concealed hardpoint, never both on the same mount point. Cost and
// Availability below are Pop-Out's own illegal-flagged pricing, not a
// copy of the visible Hardpoint table.

const POP_OUT_CONCEALMENT_EFFECTS = [
  'Sits out of sight under the vehicle\u2019s skin until deployed.',
  'Deploying or retracting each costs a Minor Action.',
  'Fully reusable, but cumbersome and expensive.',
  'Perception (4) to suspect something is hidden — harder to detect than blow-away panels.',
];

function popOutConcealment(overrides) {
  const { fits, stats = {}, ...rest } = overrides;
  return {
    category: 'addition', legality: 'illegal', image: null,
    tags: ['addition', 'hardpoint', 'pop_out_concealment'],
    referenceOnly: true,
    ...rest,
    stats: {
      upgradeCapacityProvided: 1,
      effects: [fits, ...POP_OUT_CONCEALMENT_EFFECTS],
      ...stats,
    },
  };
}

const pop_out_concealment_small = popOutConcealment({
  id: 'pop_out_concealment_small', label: 'Pop-Out Concealment (Small)',
  cost: 1500, availability: 2,
  fits: 'Holds a small weapon mount, micro/mini drone rack, small mechanical arm (Str 2), or a device up to 2 liters.',
  stats: { additionCapacityUsed: 1, upgradeCapacityProvided: 1 },
});
const pop_out_concealment_standard = popOutConcealment({
  id: 'pop_out_concealment_standard', label: 'Pop-Out Concealment (Standard)',
  cost: 3000, availability: 3,
  fits: 'Holds a standard weapon mount, small drone rack, turreted small weapon mount, medium mechanical arm (Str 5), sidecar/trailer attachment, ram plate, winch, or a device up to 25 liters.',
  stats: { additionCapacityUsed: 1, upgradeCapacityProvided: 1 },
});
const pop_out_concealment_large = popOutConcealment({
  id: 'pop_out_concealment_large', label: 'Pop-Out Concealment (Large)',
  cost: 4500, availability: 3,
  fits: 'Holds a large weapon mount, turreted standard weapon mount, medium drone rack, large mechanical arm (Str 10), fifth wheel, ladder, manlift, or a device up to ~250 liters.',
  stats: { additionCapacityUsed: 2, upgradeCapacityProvided: 1 },
});
const pop_out_concealment_huge = popOutConcealment({
  id: 'pop_out_concealment_huge', label: 'Pop-Out Concealment (Huge)',
  cost: 6000, availability: 4,
  fits: 'Holds a turreted large weapon mount, large drone rack, huge mechanical arm (Str 20), or other heavy construction equipment or very large device up to ~2,500 liters.',
  stats: { additionCapacityUsed: 3, upgradeCapacityProvided: 1 },
});

// ---- Rigger Cocoon ----
// Attaches directly to the vehicle's native Upgrade Capacity, not to a
// purchasable Addition — every vehicle already inherently has a
// cockpit. Reference-only: no passenger-protection or fire-resistance
// mechanism exists yet to wire these numbers into.
const rigger_cocoon = upgrade({
  id: 'rigger_cocoon', label: 'Rigger Cocoon',
  referenceOnly: true,
  additionType: null,
  cost: 3000, availability: 4,
  description: 'A fire-resistant shell with its own O2 supply and biomed sensors.',
  stats: {
    upgradeCapacityUsed: 1,
    effects: [
      'Counts as Rating 6 passenger protection for its occupant only.',
      'Fire Resistance 2.',
      'Rating 2 life safety — 4 hours of O2.',
      'Takes 2 combat rounds to enter; a Minor Action quick-release exits.',
      'Not installable on drones.',
    ],
  },
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
