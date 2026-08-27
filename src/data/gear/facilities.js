// Vehicle Facilities — the 5th Capacity pool (facilityCapacityProvided/
// Used), same generic provider/consumer shape as armor/device/
// cyberware/matrix. Every Facility ALSO provides a 6th pool —
// upgradeCapacityProvided/Used — since real Double Clutch content
// confirms Facilities generally take upgrade modules, not just Comms/
// Sensor Array specifically. Same soft-gated mechanism, same
// CapacityAttachModal, just a new pool name; nothing new to build for
// this to work, isHousingFor/isConsumerFor/computeCapacity are already
// fully generic on stat presence, not category or a hardcoded pool
// list. Comm Sensor Enhancement Modules (csm_1-5) used to be a bespoke,
// genuinely uncapped mechanism, hardcoded to the Array specifically —
// migrated onto this same generic pool now, matching every other
// upgrade. The soft cap itself models something real: if a Medbay's
// upgrade slots are full and someone wants to add a big new module
// (an MRI machine, say), the answer isn't a hard block — it's "install
// a second Medbay for that," same as any other Capacity pool
// overflow in this app.
//
// Vehicle Bay is a real Facility here, consuming slots like anything
// else — it's the actual installed infrastructure (bay door,
// structural rework, tie-down hardware) that makes storing another
// vehicle aboard feasible, not a passive side effect of merely having
// Facility slots. OwnedVehiclesList's "can this vehicle store other
// vehicles" check looks for THIS specific item attached, not just
// nonzero facilityCapacityProvided.
//
// Several upgrades below now have REAL confirmed numbers from Double
// Clutch (Rigger Cocoon, Valkyrie Module, Retrans Unit) rather than
// TBD placeholder text — each flagged with what's confirmed vs. what's
// still an inferred/unconfirmed value (Retrans Unit's exact Noise
// reduction, specifically). Facility housings themselves (Medbay,
// Armory, Crew Quarters, Moon Pool base entries) still carry no
// mechanical bonus of their own — the bonus lives on the upgrade
// module now, matching "Facilities are housings, upgrades are content"
// exactly.
//
// Every upgrade also carries facilityType (matching the intended
// Facility's own id) — purely for MARKET DISPLAY grouping, not
// enforced anywhere. Attach still goes through the fully generic
// upgrade Capacity pool regardless of type — nothing stops attaching a
// Valkyrie Module to an Armory if someone actually wants to, matching
// the "inform, don't block" pattern everywhere else in this app.
//
// A follow-up content pass against Double Clutch's own modification
// chapters confirmed the GENERAL pattern (Portable Facility ties a
// vehicle-facility to a real skill specialization — Medicine, Hardware,
// Armorer, Automotive Mechanic) and real skill names to reference
// (Engineering's Armorer/Automotive Mechanic/Nautical Mechanic,
// Biotech for First Aid/Medicine), but turned up no discrete, priced
// upgrade items with real bonus numbers for Workshop, Armory, Crew
// Quarters, Moon Pool, or Weapons Facility specifically — those stay
// honestly empty rather than getting invented placeholder content the
// way CSM tiers did.

function facility(overrides) {
  return {
    category: 'facility', legality: null, image: null, tags: ['facility'],
    stats: { facilityCapacityUsed: 1, upgradeCapacityProvided: 3 },
    ...overrides,
  };
}

function upgrade(overrides) {
  return {
    category: 'facility_upgrade', legality: null, image: null, tags: ['facility_upgrade'],
    ...overrides,
  };
}

const medbay = facility({
  id: 'medbay', label: 'Medbay',
  cost: 8000, availability: 4,
  description: 'A dedicated medical bay housing — bonuses come from whatever upgrade modules are installed (see Valkyrie Module).',
});

const workshop_fabrication_bay = facility({
  id: 'workshop_fabrication_bay', label: 'Workshop / Fabrication Bay',
  cost: 6000, availability: 3,
  description: 'A dedicated repair/customization bay housing — bonuses come from whatever upgrade modules are installed. No real upgrade content confirmed yet for this specific Facility.',
});

// A real Matrix device now, not just a Facility with TBD flavor text —
// its own base ASDF, deviceRating (feeds matrixMonitorMaxFor's already-
// generic formula directly, no new CM code needed for its base value),
// and matrixCapacityProvided for Programs (a genuinely SEPARATE pool
// from upgradeCapacityProvided below — Programs are Capacity-gated
// through the Matrix pool exactly like a commlink; CSMs and other
// upgrades go through the generic upgrade pool instead). Category is
// 'comm_sensor_array' (a MATRIX_CATEGORIES entry, see panGrouping.js)
// rather than 'facility' — Capacity checks are stat-presence-based,
// not category-based, so this doesn't cost it its facilityCapacityUsed
// consumption on the mothership vehicle; category only controls
// PAN-zone routing and Primary-eligibility, and this needs to route to
// the Matrix zone once slaved into a character's PAN while never being
// eligible to become anyone's Primary. Its real ASDF is dynamic, not
// these static numbers — see arrayCompositedStats (vehicleEconomy.js),
// which rotates in whatever its attached CSMs contribute; these are
// just the floor. Bullshit placeholder stats throughout.
const comms_sensor_array = {
  id: 'comms_sensor_array', label: 'Comms/Sensor Array',
  category: 'comm_sensor_array', legality: null, image: null, wireless: true,
  tags: ['facility'],
  cost: 10000, availability: 4,
  description: "A vehicle's own permanent Matrix device — Comm Sensor Enhancement Modules attach to it through the same generic upgrade pool as any other Facility and rotate in for the best value, same instinct as Program rotation elsewhere; each attached module also adds +1 to the Array's own Condition Monitor as a redundancy bonus. Programs load into its Program Slots the normal, Matrix-Capacity-gated way. A character can Slave to Vehicle from their own PAN once they own a copy of the vehicle carrying one of these.",
  stats: {
    facilityCapacityUsed: 1,
    attack: 1, sleaze: 1, dataProcessing: 1, firewall: 1,
    deviceRating: 1,
    matrixCapacityProvided: 2,
    upgradeCapacityProvided: 3,
  },
};

function csm(overrides) {
  return {
    category: 'facility_upgrade', legality: null, image: null, tags: ['facility_upgrade', 'csm'],
    facilityType: 'comms_sensor_array',
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

// Confirmed real, non-placeholder content — strips accumulated Noise,
// rebroadcasts for a whole linked network. Same shape as Signal
// Scrubber's proven deviceModifiers.noise mechanism, which already
// flows correctly through sumDeviceModifiersGlobal the moment this
// Array is slaved into a character's PAN (isInPan walks UP the
// attachedTo chain, so Retrans Unit -> Array -> slaved PAN resolves
// correctly with zero new code). The exact Noise value ISN'T
// confirmed by source (only "stripping accumulated Noise" is stated,
// no number) — -2 here is an inferred placeholder matching Signal
// Scrubber's own value, not a sourced one.
const retrans_unit = upgrade({
  id: 'retrans_unit', label: 'Retrans Unit',
  facilityType: 'comms_sensor_array',
  cost: 7000, availability: 3,
  description: "Strips accumulated Noise and rebroadcasts the signal, as if originating at the unit itself; can rebroadcast for a whole linked network. Exact Noise value not confirmed by source (only \"stripping accumulated Noise\" is stated) — the number here is an inferred placeholder matching Signal Scrubber's own value.",
  stats: { upgradeCapacityUsed: 1, deviceModifiers: { noise: -2 } },
});

// Confirmed real content, reference-only — this app has no multi-
// rigger PAN-sharing mechanism to hook a number into (Slave to Vehicle
// is single-character by design, per the earlier confirmed scope).
// Real source number: Rating = max simultaneous captain + participant
// riggers, cost scales 85,000¥ base.
const network_sharing_enhancement = upgrade({
  id: 'network_sharing_enhancement', label: 'Network Sharing Enhancement',
  facilityType: 'comms_sensor_array',
  cost: 85000, availability: 9,
  legality: 'illegal',
  description: "Lets a rigged vehicle share its network like a mobile host — Rating sets the max simultaneous \"captain\" + participant riggers (still only one jump-in per device at a time). The captain assigns which subsystems others can control as if separate devices, enabling teamwork tests between them. Reference-only in this app — no multi-rigger PAN-sharing mechanism exists to wire this into.",
  stats: { upgradeCapacityUsed: 1 },
});

const armory = facility({
  id: 'armory', label: 'Armory',
  cost: 5000, availability: 4,
  legality: 'illegal',
  description: 'A secure weapon/gear storage housing — bonuses come from whatever upgrade modules are installed. No real upgrade content confirmed yet for this specific Facility.',
});

const crew_quarters = facility({
  id: 'crew_quarters', label: 'Crew Quarters / Common Area',
  cost: 4000, availability: 2,
  description: 'A lifestyle-adjacent downtime housing — bonuses come from whatever upgrade modules are installed. No real upgrade content confirmed yet for this specific Facility.',
});

const moon_pool = facility({
  id: 'moon_pool', label: 'Moon Pool / Dive Locker',
  cost: 7000, availability: 3,
  description: 'A nautical-flavored storage and launch housing for underwater gear or small submersibles — bonuses come from whatever upgrade modules are installed. No real upgrade content confirmed yet for this specific Facility.',
});

// Real installed infrastructure, not a passive side effect of having
// Facility slots at all — a bay door mechanism, structural rework to
// clear an open bay, tie-down/locking hardware so cargo doesn't shift.
// This is the actual prerequisite for storing a vehicle inside
// another one — see OwnedVehiclesList's isMothership check, which
// looks for THIS specific Facility attached, not just nonzero
// facilityCapacityProvided. Uses 2 facility slots to reflect its size
// relative to the other Facilities here — a judgment call, not a
// confirmed source number.
const vehicle_bay = facility({
  id: 'vehicle_bay', label: 'Vehicle Bay',
  cost: 15000, availability: 4,
  description: 'A proper bay for storing and launching other vehicles — bay door, cleared structural space, and tie-down/locking hardware. Required before other vehicles can actually be stored aboard.',
  stats: { facilityCapacityUsed: 2, upgradeCapacityProvided: 3 },
});

// A dedicated pilot/crew station housing for Rigger Cocoon and similar
// content — didn't exist before this pass.
const cockpit_facility = facility({
  id: 'cockpit_facility', label: 'Cockpit Facility',
  cost: 5000, availability: 3,
  description: 'A dedicated pilot/crew station housing — bonuses come from whatever upgrade modules are installed (see Rigger Cocoon).',
});

// Confirmed real content. "Not installable on drones" is noted, not
// enforced — informational, matching this app's "inform, don't block"
// pattern throughout.
const rigger_cocoon = upgrade({
  id: 'rigger_cocoon', label: 'Rigger Cocoon',
  facilityType: 'cockpit_facility',
  cost: 3000, availability: 4,
  description: "Fire resistant, own O2 supply, biomed sensors — counts as Rating 6 passenger protection, Fire Resistance 2, and Rating 2 life safety (4 hours of O2) for its occupant only. Takes 2 combat rounds to enter; a Minor Action quick-release exits. Not installable on drones. Reference-only in this app — no passenger-protection/fire-resistance mechanism exists to wire these numbers into.",
  stats: { upgradeCapacityUsed: 1 },
});

// Confirmed real content — the actual number Medbay never had.
const valkyrie_module = upgrade({
  id: 'valkyrie_module', label: 'Valkyrie Module',
  facilityType: 'medbay',
  cost: 3000, availability: 4,
  description: "Built-in auto-doc (Rating 4 Biotech autosoft) plus medical systems (Rating 6 medkit), combining for 10 dice on First Aid/Medkit healing tests. This app has no character-side First Aid test mechanism to wire the number into yet, but the 10-die pool is still rollable directly off the module itself.",
  stats: { upgradeCapacityUsed: 1, flatDicePool: 10 },
});

// Structure only — real upgrade-module content (targeting computers,
// turret stabilization, whatever Double Clutch's actual weapon-system
// upgrades turn out to be) needs its own research pass. This is NOT
// the weapon mount system itself (mountCapacityProvided/mountSlotsUsed,
// vehicleEconomy.js/WeaponMountsPanel) — mounts stay exactly as they
// are, Body-derived, unaffected by Facility/Upgrade Capacity at all.
// This Facility is purely for upgrades TO weapon systems, once real
// modules exist to attach to it.
const weapons_facility = facility({
  id: 'weapons_facility', label: 'Weapons Facility',
  cost: 6000, availability: 5,
  legality: 'illegal',
  description: 'A dedicated space for weapon-system upgrades (targeting, stabilization, ammo handling) — separate from the mounts themselves, which remain Body-derived and unaffected by this. No real upgrade content confirmed yet for this specific Facility.',
});

export const GEAR_FACILITIES = {
  medbay, workshop_fabrication_bay, comms_sensor_array, armory, crew_quarters, moon_pool, vehicle_bay,
  cockpit_facility, weapons_facility,
  csm_1, csm_2, csm_3, csm_4, csm_5,
  retrans_unit, network_sharing_enhancement, rigger_cocoon, valkyrie_module,
};

export const GEAR_FACILITIES_IDS = Object.keys(GEAR_FACILITIES);
