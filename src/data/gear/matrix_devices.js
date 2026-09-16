// Commlinks, cyberdecks, M-TOCs, Tac-Apps, RCCs and the Living Persona
// — unlike almost everything else in Gear, these are named, pre-built
// products with fixed Matrix stats baked into a fixed price, not a
// flat-cost or rating-scaled item. The D/F (Data Processing/Firewall)
// and A/S (Attack/Sleaze) pairs are two of the four Matrix Attributes
// everything Matrix-mechanical is built on — a decker's whole
// capability in a hack comes from whatever device they're carrying.
// That's the actual reason this needed its own file instead of fitting
// the usual costPerRating shape.
//
// Verified against 09a-matrix-basics-and-actions.md (Commlinks/Cyberdecks
// tables, pp. ~170-184): all 12 items' Device Rating, D/F or A/S,
// Program Slots, Availability, and Cost are exact matches to source —
// no stat corrections needed. No "Wireless Bonus:" text exists for these
// items in source; they ARE the wireless connectivity, not an accessory
// with an optional bonus, so `wireless: true` alone is correct and
// complete. There is no `wirelessBonuses` anywhere in this file, and
// that's right rather than an omission.
//
// ============================================================================
// SCHEMA PASSES 1 AND 2 (both applied at once — this file hadn't had
// either yet):
//
// S1. TWO PRE-SCHEMA EFFECT FIELDS UNIFIED. This file had NO `effect`
//     field, but it had two fields doing that job under different
//     names: `stats.notes` on the three M-TOCs and `stats.rules` on the
//     nine Tac-Apps. Both were prose strings packing three to five
//     distinct mechanics each. Both are now `effects` arrays, one
//     mechanic per entry, matching every other gear file.
//     `stats.edgeStorage` — an identical prose paragraph repeated
//     verbatim on all three M-TOCs — folded in the same way, hoisted to
//     a shared constant.
// S2. `description` IS NOW OMITTABLE. Worth noting the commlinks,
//     cyberdecks and RCCs come out of this with NO effects at all:
//     their descriptions really are pure positioning flavor
//     ("Mid-range commlink"), and every mechanical fact about them
//     already lives in a structured stat. That's the rule working, not
//     a gap.
// D1. `referenceOnly: true` where no live computed field drives any of
//     the item's effects. One item here is backed — ECM Warrior II,
//     whose `conditionalModifiers.noise` genuinely drives the Noise
//     reduction its effect names.
// D2. `GEAR_MATRIX_DEVICES_IDS` WAS NEVER EXPORTED. Every other gear
//     file exports `<NAME>_IDS = Object.keys(<NAME>)`; this one stopped
//     at the item map. Anything iterating the catalog's files uniformly
//     by ID list would have silently skipped every commlink,
//     cyberdeck, M-TOC, Tac-App, RCC, and the Living Persona. Added.
// D3. `MTOC_STANDARD_CAPABILITIES` WAS EXPORTED BUT UNUSED. The old
//     header claimed the six shared capabilities were "captured in
//     `standardCapabilities` (shared reference) and each item's own
//     stats.notes" — but no item had a `standardCapabilities` field,
//     and the notes strings didn't repeat them either. The constant
//     sat unreferenced, so those six capabilities appeared nowhere a
//     player could see. Now spread into each M-TOC's `effects`.
// ============================================================================

function commlinkDevice(overrides) {
  return { wireless: true, category: 'commlink', legality: null, image: null, tags: ['commlink'], ...overrides };
}
function cyberdeckDevice(overrides) {
  return { wireless: true, category: 'cyberdeck', legality: 'illegal', image: null, tags: ['cyberdeck'], ...overrides };
}

const meta_link = commlinkDevice({
  id: 'meta_link', label: 'Meta Link', cost: 100, availability: 2,
  description: 'Entry-level commlink.',
  stats: { deviceRating: 1, dataProcessing: 1, firewall: 0, matrixCapacityProvided: 0 },
});
const sony_emperor = commlinkDevice({
  id: 'sony_emperor', label: 'Sony Emperor', cost: 700, availability: 2,
  description: 'Mid-range commlink.',
  stats: { deviceRating: 2, dataProcessing: 1, firewall: 1, matrixCapacityProvided: 1 },
});
const renraku_sensei = commlinkDevice({
  id: 'renraku_sensei', label: 'Renraku Sensei', cost: 1000, availability: 2,
  description: 'Mid-range commlink, Data Processing-favored.',
  stats: { deviceRating: 3, dataProcessing: 2, firewall: 0, matrixCapacityProvided: 1 },
});
const erika_elite = commlinkDevice({
  id: 'erika_elite', label: 'Erika Elite', cost: 2500, availability: 2,
  description: 'Upper-mid commlink.',
  stats: { deviceRating: 4, dataProcessing: 2, firewall: 1, matrixCapacityProvided: 2 },
});
const hermes_ikon = commlinkDevice({
  id: 'hermes_ikon', label: 'Hermes Ikon', cost: 5000, availability: 3,
  description: 'High-end commlink, Data Processing-favored.',
  stats: { deviceRating: 5, dataProcessing: 3, firewall: 0, matrixCapacityProvided: 2 },
});
const transys_avalon = commlinkDevice({
  id: 'transys_avalon', label: 'Transys Avalon', cost: 8000, availability: 3,
  description: 'Top-tier commlink.',
  stats: { deviceRating: 6, dataProcessing: 3, firewall: 1, matrixCapacityProvided: 3 },
});

const erika_mcd6 = cyberdeckDevice({
  id: 'erika_mcd6', label: 'Erika MCD-6', cost: 24750, availability: 3,
  description: 'Entry-level cyberdeck.',
  stats: { deviceRating: 1, attack: 4, sleaze: 3, matrixCapacityProvided: 2 },
});
const spinrad_falcon = cyberdeckDevice({
  id: 'spinrad_falcon', label: 'Spinrad Falcon', cost: 61500, availability: 3,
  description: 'Mid-range cyberdeck.',
  stats: { deviceRating: 2, attack: 5, sleaze: 4, matrixCapacityProvided: 4 },
});
const mct_360 = cyberdeckDevice({
  id: 'mct_360', label: 'MCT 360', cost: 95000, availability: 3,
  description: 'Mid-range cyberdeck.',
  stats: { deviceRating: 3, attack: 6, sleaze: 5, matrixCapacityProvided: 6 },
});
const renraku_kitsune = cyberdeckDevice({
  id: 'renraku_kitsune', label: 'Renraku Kitsune', cost: 107000, availability: 4,
  description: 'Upper-mid cyberdeck.',
  stats: { deviceRating: 4, attack: 7, sleaze: 6, matrixCapacityProvided: 8 },
});
const shiawase_cyber6 = cyberdeckDevice({
  id: 'shiawase_cyber6', label: 'Shiawase Cyber-6', cost: 172500, availability: 5,
  description: 'High-end cyberdeck.',
  stats: { deviceRating: 5, attack: 8, sleaze: 7, matrixCapacityProvided: 10 },
});
const fairlight_excalibur = cyberdeckDevice({
  id: 'fairlight_excalibur', label: 'Fairlight Excalibur', cost: 410600, availability: 6,
  description: 'Top-tier cyberdeck.',
  stats: { deviceRating: 6, attack: 9, sleaze: 8, matrixCapacityProvided: 12 },
});

// M-TOC (Mobile Tactical Operations Center) — Pantheon Industries'
// tac-net terminal, from Shadowrun: Firing Squad (Honing Your Edge /
// Tactical Networks, pp. 89-91). Roughly half the size of a cyberdeck;
// operates like one (same D/F-only Matrix presence, no hacking
// capability) whether standalone or linked to a cyberdeck/RCC.
//
// Every Mark shares six standard capabilities plus the Edge-banking
// rule, then adds its own ambush-detection/AR package. All three are
// spread into each item's `effects` (D3 above — they used to sit in an
// exported constant nothing referenced). `stats.maxUsers` stays
// structured as the hard cap on linked team members.
function mtocDevice(overrides) {
  return { wireless: true, category: 'mtoc', legality: 'illegal', image: null, tags: ['mtoc'], ...overrides };
}

export const MTOC_STANDARD_CAPABILITIES = [
  'Enhanced audio and image link.',
  'Team member biomonitor.',
  'Team member weapon status and access — ammo count, operational status, biometric access.',
  "Access to linked team members' gear, including commlinks and other communications gear.",
  'Real-time tactical and strategic evaluation software.',
  'GPS and mapsoft navigation software.',
];

const MTOC_EDGE_STORAGE = [
  'Can bank Edge, up to its own Device Rating, that would otherwise evaporate.',
  'Any linked member can transfer personal or stored Edge to another via a Minor Action.',
];

const mtoc_mark_1 = mtocDevice({
  id: 'mtoc_mark_1', label: 'M-TOC Mark I', cost: 25000, availability: 8, legality: 'licensed',
  referenceOnly: true,
  description: 'Security and law-enforcement tac-net — hostage situations, specialized-response gaps. Cost-effective enough to issue to rank-and-file patrol officers.',
  stats: {
    deviceRating: 3, dataProcessing: 4, firewall: 3, matrixCapacityProvided: 2, maxUsers: 9,
    effects: [
      'Lowers the threshold by 1 for Perception tests to detect an ambush.',
      'IFF software: +1 on Perception tests to spot concealed weapons and to identify subjects via facial recognition.',
      '+1 Attack Rating for all linked smartgun weapons.',
      ...MTOC_EDGE_STORAGE,
      ...MTOC_STANDARD_CAPABILITIES,
    ],
  },
});
const mtoc_mark_2 = mtocDevice({
  id: 'mtoc_mark_2', label: 'M-TOC Mark II', cost: 65000, availability: 9,
  referenceOnly: true,
  description: 'Front-line military tac-net, combat-specialized over the Mark I. Physically resistant to external and Matrix damage; modular components ease field repair.',
  stats: {
    deviceRating: 5, dataProcessing: 6, firewall: 5, matrixCapacityProvided: 4, maxUsers: 15,
    effects: [
      'Lowers the threshold by 2 for Perception tests to detect an ambush.',
      '+1 Attack Rating for all linked smartgun weapons.',
      'Enhanced encryption raises the threshold for all Cracking tests by 1.',
      'Modular construction lowers the threshold for repairing damage by 2.',
      'Rugged construction grants -1 to all physical damage taken.',
      ...MTOC_EDGE_STORAGE,
      ...MTOC_STANDARD_CAPABILITIES,
    ],
  },
});
const mtoc_mark_3 = mtocDevice({
  id: 'mtoc_mark_3', label: 'M-TOC Mark III', cost: 95000, availability: 12,
  referenceOnly: true,
  description: "Special Forces-grade tac-net — the most advanced tactical software on the market, harder to crack, and it assists users' own hacking attempts. The user cap is kept low to prevent system overload, a minor drawback given how few SF-sized teams exist.",
  stats: {
    deviceRating: 7, dataProcessing: 7, firewall: 6, matrixCapacityProvided: 6, maxUsers: 10,
    effects: [
      'Lowers the threshold by 1 for Perception tests to detect an ambush.',
      '+2 Attack Rating for all linked and smartgun weapons.',
      'Enhanced encryption raises the threshold for enemy Cracking tests by 3.',
      'Modular construction lowers the threshold for repairing damage by 2.',
      'Rugged construction grants -1 to all physical damage taken.',
      ...MTOC_EDGE_STORAGE,
      ...MTOC_STANDARD_CAPABILITIES,
    ],
  },
});

// Tac-Apps — proprietary M-TOC programs (functionally the M-TOC's
// equivalent of cyberdeck programs), swappable per mission profile.
// All nine share the same Availability(I)/Cost shape but each occupies
// a program slot and has a distinct rules effect, so kept as separate
// purchasable items rather than one generic "Tac-App" line.
function tacApp(overrides) {
  return { category: 'tac_app', legality: 'illegal', image: null, tags: ['tac_app'], cost: 200, ...overrides };
}

const tac_app_artillery_barrage = tacApp({
  id: 'tac_app_artillery_barrage', label: 'Artillery Barrage', availability: 5,
  referenceOnly: true,
  description: 'Additional targeting data for launch-type weapons, and a way to rain fire from a smartgun-equipped long arm like a miniature artillery piece.',
  stats: {
    matrixCapacityUsed: 1,
    effects: [
      '+1 dice pool for grenade launchers, rocket launchers, and mortars.',
      'No weapon-related penalties for shooting assault rifles, machine guns, or assault cannons while active.',
      'The shooter still needs at least some line of sight, or a known target location.',
    ],
  },
});
const tac_app_co_pilot = tacApp({
  id: 'tac_app_co_pilot', label: 'Co-Pilot', availability: 3,
  referenceOnly: true,
  description: 'Lets a team member take control of a linked vehicle or drone, freeing a rigger for other tasks — not considered optimal control.',
  stats: {
    matrixCapacityUsed: 1,
    effects: [
      'A new operator or driver controls a vehicle via commlink or AR gloves at a -1 dice pool penalty.',
      "Drones can only be issued commands as if from the captain's chair.",
    ],
  },
});
const tac_app_door_gunner = tacApp({
  id: 'tac_app_door_gunner', label: 'Door Gunner', availability: 5,
  referenceOnly: true,
  description: 'Advanced control and targeting software letting a secondary team member operate a mounted, remote-capable vehicle weapon — "it\'s just like having the weapon in your hands."',
  stats: {
    matrixCapacityUsed: 1,
    effects: [
      'A new operator or gunner controls a vehicle weapon via commlink or AR glove with no penalty.',
      'Requires that the operator can receive smartlink targeting data.',
    ],
  },
});
// NOT referenceOnly: conditionalModifiers.noise drives the Noise
// reduction this effect names.
const tac_app_ecm_warrior_ii = tacApp({
  id: 'tac_app_ecm_warrior_ii', label: 'ECM Warrior II', availability: 4,
  description: 'Extra "electronic ammo" for engaging enemy hackers and cutting through Noise.',
  stats: {
    matrixCapacityUsed: 1,
    // Range-gated — the app has no location tracking to verify the (DR
    // x 5)m condition, so this is a conditionalModifier (optional,
    // player/GM-confirmed toggle in NoiseTracker), not an unconditional
    // deviceModifier like Signal Scrubber's flat, always-on -2.
    conditionalModifiers: { noise: -2 },
    effects: [
      '+2 on all offensive Cracking tests while active.',
      '-2 to all Noise within Device Rating x 5 meters of the device running the app.',
    ],
  },
});
const tac_app_junk_wall = tacApp({
  id: 'tac_app_junk_wall', label: 'Junk Wall', availability: 2,
  referenceOnly: true,
  description: "Layers benign \"junk code\" onto the network and linked devices' firewalls, forcing a hacker through the added layers to gain access.",
  stats: {
    matrixCapacityUsed: 1,
    effects: ["Adds half the M-TOC's Device Rating, rounded up, to a linked cyberjack's or RCC's Firewall rating."],
  },
});
const tac_app_mobile_medic = tacApp({
  id: 'tac_app_mobile_medic', label: 'Mobile Medic', availability: 3,
  referenceOnly: true,
  description: "Works with a medkit to feed the user real-time emergency medical instruction, guiding treatment even from someone who doesn't know how to administer aid.",
  stats: {
    matrixCapacityUsed: 1,
    effects: ["Adds half the Device Rating to the user's First Aid dice pool, or +1 to a medkit's Rating."],
  },
});
const tac_app_sneak_sneak = tacApp({
  id: 'tac_app_sneak_sneak', label: 'Sneak-Sneak', availability: 3,
  referenceOnly: true,
  description: 'Tracking algorithms and image evaluation flag hazards and obstacles that could give the user away, and suggest alternate paths or methods.',
  stats: {
    matrixCapacityUsed: 1,
    effects: ['+2 dice pool on all Stealth (Sneaking) tests.'],
  },
});
const tac_app_team_leader = tacApp({
  id: 'tac_app_team_leader', label: 'Team Leader', availability: 3,
  referenceOnly: true,
  description: 'Feeds the designated leader data projections on the current tactical situation — sensor data, team biometrics, weapon status, environment — to aid decision-making and coordination.',
  stats: {
    matrixCapacityUsed: 1,
    effects: [
      "Provides a pool of bonus dice equal to the M-TOC's Device Rating for teamwork, navigation, perception, and maneuver tests.",
      'The pool can be broken up and assigned as needed, but only once per combat engagement.',
    ],
  },
});
const tac_app_target_artist = tacApp({
  id: 'tac_app_target_artist', label: 'Target Artist', availability: 3,
  referenceOnly: true,
  description: 'Pairs with Artillery Barrage — takes targeting data from any source with line of sight, a teammate or a drone, and paints the target for a shooter who lacks LOS themselves. Also rapidly IDs and designates targets, obstacles, and hazards on a mapsoft overlay.',
  stats: {
    matrixCapacityUsed: 1,
    effects: [
      'Allows the shooter to attack without direct line of sight.',
      'Designated targets can then be hit with the Called Shot action as an anytime action.',
    ],
  },
});

// Rigger Command Console (RCC), "captain's chair" — the rigger
// equivalent of a cyberdeck/commlink, verified against 10-rigging.md's
// full 10-item table (confirmed identically across three source
// copies). No Attack/Sleaze at all in core rules — the FAQ is explicit
// that combining a cyberdeck with an RCC isn't possible, and any
// offensive capability needs a separate expansion-book add-on — so an
// RCC is D/F-only, same persona shape as a commlink. Device Rating
// does triple duty: it's the RCC's own Matrix defense rating, the
// basis for (Rating x 3) slaved drone capacity, and the amount Noise
// penalties are reduced by. `slavedDroneCapacity` is stored directly
// (Device Rating x 3) rather than left for the UI to recompute, same
// reasoning as any other derived-but-frequently-displayed number.
//
// These carry no `effects`: everything mechanical about an RCC is
// already a structured stat, and the descriptions are pure market
// positioning.
function rccDevice(overrides) {
  return { wireless: true, category: 'rcc', legality: 'licensed', image: null, tags: ['rcc'], ...overrides };
}

const rcc_scratch_built_junk = rccDevice({
  id: 'rcc_scratch_built_junk', label: 'Scratch-Built Junk', cost: 1400, availability: 1,
  description: 'A cobbled-together RCC, cheap and unreliable-looking but functional.',
  stats: { deviceRating: 1, dataProcessing: 3, firewall: 2, slavedDroneCapacity: 3 },
});
const rcc_allegiance_control_center = rccDevice({
  id: 'rcc_allegiance_control_center', label: 'Allegiance Control Center', cost: 8000, availability: 3,
  description: 'Entry-level commercial RCC.',
  stats: { deviceRating: 2, dataProcessing: 3, firewall: 3, slavedDroneCapacity: 6 },
});
const rcc_essy_motors_dronemaster = rccDevice({
  id: 'rcc_essy_motors_dronemaster', label: 'Essy Motors DroneMaster', cost: 16000, availability: 3,
  description: 'Mid-range RCC, Data Processing and Firewall balanced evenly.',
  stats: { deviceRating: 3, dataProcessing: 4, firewall: 4, slavedDroneCapacity: 9 },
});
const rcc_horizon_overseer = rccDevice({
  id: 'rcc_horizon_overseer', label: 'Horizon Overseer', cost: 32000, availability: 4,
  description: 'Upper-mid RCC, Data Processing-favored.',
  stats: { deviceRating: 4, dataProcessing: 5, firewall: 4, slavedDroneCapacity: 12 },
});
const rcc_maersk_spider = rccDevice({
  id: 'rcc_maersk_spider', label: 'Maersk Spider', cost: 34000, availability: 5,
  description: 'Upper-mid RCC, Firewall-favored.',
  stats: { deviceRating: 4, dataProcessing: 4, firewall: 5, slavedDroneCapacity: 12 },
});
const rcc_vulcan_liegelord = rccDevice({
  id: 'rcc_vulcan_liegelord', label: 'Vulcan Liegelord', cost: 66000, availability: 5,
  description: 'High-end RCC, Data Processing-favored.',
  stats: { deviceRating: 5, dataProcessing: 6, firewall: 5, slavedDroneCapacity: 15 },
});
const rcc_proteus_poseidon = rccDevice({
  id: 'rcc_proteus_poseidon', label: 'Proteus Poseidon', cost: 68000, availability: 6,
  description: 'High-end RCC, Firewall-favored.',
  stats: { deviceRating: 5, dataProcessing: 5, firewall: 6, slavedDroneCapacity: 15 },
});
const rcc_transys_eidolon = rccDevice({
  id: 'rcc_transys_eidolon', label: 'Transys Eidolon', cost: 75000, availability: 7,
  description: 'Top-tier RCC, Data Processing-favored.',
  stats: { deviceRating: 6, dataProcessing: 6, firewall: 5, slavedDroneCapacity: 18 },
});
const rcc_ares_red_dog_series = rccDevice({
  id: 'rcc_ares_red_dog_series', label: 'Ares Red Dog Series', cost: 95000, availability: 8,
  description: 'Top-tier RCC, Data Processing-favored, higher-end than the Eidolon.',
  stats: { deviceRating: 6, dataProcessing: 7, firewall: 6, slavedDroneCapacity: 18 },
});
const rcc_aztechnology_tlaloc = rccDevice({
  id: 'rcc_aztechnology_tlaloc', label: 'Aztechnology Tlaloc', cost: 140000, availability: 9,
  description: 'Best RCC on the market, Firewall-favored.',
  stats: { deviceRating: 6, dataProcessing: 8, firewall: 7, slavedDroneCapacity: 18 },
});

// Living Persona — a technomancer's Resonance-linked alternative to a
// commlink/cyberdeck. Confirmed: "A living persona still uses the same
// four Matrix attributes as a device, but their ratings are determined
// by your Mental attributes." Auto-granted at character creation for
// technomancers, permanently Primary, never purchased (cost 0, never
// shown in Market — pulled in nowhere via gearByTag).
//
// Deliberately its own category, NOT 'commlink' — this is what keeps
// it out of PRIMARY_CAPABLE_CATEGORIES (panGrouping.js) automatically,
// no ID-specific check needed: "Make/Unset Primary" never renders
// since canBePrimary just checks category membership. Genuinely zero
// Program Slots of its own (no matrixCapacityProvided) — a technomancer
// needs the Emulate complex form specifically because they lack this;
// giving Living Persona slots would contradict that rule directly.
//
// `wireless: true` stays SET (required for isEffectivelyWireless to
// pass, which every rotation/composite check gates through) even
// though DeviceRow suppresses the on/off toggle button for this
// category specifically — the underlying mechanic reads straight off
// this catalog flag, completely independent of that UI suppression.
//
// ASDF values are NOT static stats here — compositePersonaStats
// resolves them live off the character's own Mental attributes via
// LIVING_PERSONA_ATTRIBUTE_MAP (panGrouping.js): Attack<-Charisma,
// Sleaze<-Intuition, Data Processing<-Logic, Firewall<-Willpower,
// Device Rating<-Resonance (the last one currently unused in practice
// since Matrix CM is explicitly skipped for technomancers already —
// see DeviceMatrixTrack — but noted for completeness).
const living_persona = {
  id: 'living_persona', label: 'Living Persona',
  category: 'living_persona', wireless: true, legality: null, image: null,
  tags: ['living_persona'], cost: 0, availability: null,
  referenceOnly: true,
  description: "A technomancer's own Resonance-linked connection to the Matrix — no device required.",
  stats: {
    effects: [
      'Matrix attributes are derived from the Mental attributes, not from a purchased stat block.',
      'Has no Program Slots of its own — a technomancer needs the Emulate complex form to run programs.',
      'Always Primary, and never purchased.',
    ],
  },
};

export const GEAR_MATRIX_DEVICES = {
  meta_link, sony_emperor, renraku_sensei, erika_elite, hermes_ikon, transys_avalon,
  erika_mcd6, spinrad_falcon, mct_360, renraku_kitsune, shiawase_cyber6, fairlight_excalibur,
  mtoc_mark_1, mtoc_mark_2, mtoc_mark_3,
  tac_app_artillery_barrage, tac_app_co_pilot, tac_app_door_gunner, tac_app_ecm_warrior_ii,
  tac_app_junk_wall, tac_app_mobile_medic, tac_app_sneak_sneak, tac_app_team_leader, tac_app_target_artist,
  rcc_scratch_built_junk, rcc_allegiance_control_center, rcc_essy_motors_dronemaster, rcc_horizon_overseer,
  rcc_maersk_spider, rcc_vulcan_liegelord, rcc_proteus_poseidon, rcc_transys_eidolon,
  rcc_ares_red_dog_series, rcc_aztechnology_tlaloc,
  living_persona,
};

// D2: this export was missing entirely — every other gear file has one.
export const GEAR_MATRIX_DEVICES_IDS = Object.keys(GEAR_MATRIX_DEVICES);
