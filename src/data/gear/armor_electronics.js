// Clothing/Armor & Electronics catalog.
// Same envelope as GEAR.js.
//
// Verified against 13c-gear-armor-electronics.md (Gear Part 3, pp.
// 265-275) in full, front to back. Corrections from that pass:
//
// A few new/reused wrinkles:
//
// 1. RFID tags are sold "per 10" — reused costPerUnit from the Sensors
//    file, but added `unitQuantity` alongside `unitLength` since this is
//    a discrete count (10 tags), not a length of rope.
// 2. Some Availability values scale WITH the chosen Rating rather than
//    being fixed (Autosoft: Availability = Rating; Tutorsoft: Availability
//    = Rating/3). Marked with `availabilityEqualsRating` /
//    `availabilityFormula` rather than a fixed availability number.
// 3. Several items here (Simrig, and all 7 Visual Enhancements) have a
//    same-named IMPLANT counterpart already built in
//    GEAR_AUGMENTATIONS.js, priced differently (implants cost more —
//    Essence + surgery vs. just clipping something external on).
//    Suffixed `_accessory` here to avoid id collisions; NOT duplicates.
// 4. Biometric Reader is listed in this chapter too, but it's the exact
//    same item (200¥, Availability 2) already built as `biometric_reader`
//    in GEAR_SENSORS_SECURITY_SURVIVAL.js — skipped here rather than
//    creating a confusing near-duplicate.
// 5. Commlinks and Cyberdecks are now their own dedicated file —
//    see matrix_devices.js — not stubbed here anymore.
// 6. `wireless: true` marks items that are real PAN nodes — slavable,
//    contributing ASDF-adjacent function, or otherwise networked —
//    versus physical/mechanical items that just happen to sit in the
//    same catalog section. Two tiers of confidence, not one: some are
//    confirmed directly by the item's own description (contacts "must
//    be wireless," accessories are blanket-wireless per the chapter's
//    own rule, datachip explicitly is NOT), the rest are judgment calls
//    based on function (Matrix Perception tests, slaving language,
//    AR-dependent tech). See the PAN conversation for the full
//    reasoning per item — not repeated here.
//    CORRECTION (this pass): the old reasoning under this note assumed
//    jammers/tag_eraser/white_noise_generator/data_tap were NOT PAN
//    nodes because they "act on" wireless devices rather than being
//    slaved to one. That assumption was wrong for a different reason
//    than PAN membership — the source text gives all four an explicit
//    "Wireless bonus:" line, and per the wireless-bonus data rule, any
//    item with real wireless-bonus text gets `wireless: true` regardless
//    of whether it's a sensible thing to slave. Updated below.
// 7. CAPACITY FIELD SPLIT (this pass): the old flat `capacity` /
//    `capacityRange` fields were ambiguous between two totally separate
//    pools in this file alone — armor's mod-capacity pool and the
//    optical/electronics housings' accessory-capacity pool. Split per
//    the project-wide convention:
//      - Armor items (housings) → `armorCapacityProvided[Range]`
//      - Armor mods (consumers) → `armorCapacityUsed[PerRating]`
//      - Optical/electronics housings (binoculars, camera, contacts,
//        glasses, goggles, imaging scope, monocle) →
//        `deviceCapacityProvided[Range]`
//      - Visual Enhancement accessories, i.e. the consumer side
//        (flare compensation, image link, etc.) → `deviceCapacityUsed`
//    NOTE: Helmet's Capacity is device capacity, not armor capacity —
//    resolved this pass. See the comment directly above the `helmet`
//    const for the reasoning. Full Body Armor Helmet was left as
//    armorCapacityProvided — its description doesn't carry the same
//    explicit "for accessories" language, so recategorizing it wasn't
//    confirmed the same way; worth a second look if its source entry
//    turns out to say the same thing.

function clothingArmor(overrides) {
  return { category: 'armor', legality: null, image: null, ...overrides };
}
function electronics(overrides) {
  return { category: 'electronics', legality: null, image: null, ...overrides };
}
function electronics_w(overrides) {
  return electronics({ wireless: true, ...overrides });
}
function software(overrides) {
  return { category: 'software', legality: null, image: null, ...overrides };
}
function idGear(overrides) {
  return { category: 'id_credit', legality: null, image: null, ...overrides };
}
function tool(overrides) {
  return { category: 'tool', legality: null, image: null, ...overrides };
}
function opticalDevice(overrides) {
  return { category: 'optical', legality: null, image: null, ...overrides };
}
function opticalDeviceWireless(overrides) {
  return opticalDevice({ wireless: true, ...overrides });
}

// ---- Clothing ----

const clothing = clothingArmor({ id: 'clothing', label: 'Clothing', cost: null, costRange: [10, 10000], availability: 1, description: 'From cheap soy-based "flats" to high style. Can weave in commlinks, music players, and other electronics.', tags: ['clothing'], stats: {} });
const electrochromic_feature = clothingArmor({ id: 'electrochromic_feature', label: 'Electrochromic Feature', cost: 75, availability: 1, wireless: true, description: 'Voltage-reactive threads change color or display text/images/patterns. Minor Action to set, 2 combat rounds to fully complete.', tags: ['clothing'], stats: { wirelessBonus: 'Changing settings becomes a free Minor Action, and the fabric can display images/text/video streamed from your commlink.' } });
const feedback_feature = clothingArmor({ id: 'feedback_feature', label: 'Feedback Feature', cost: 150, availability: 2, description: 'Haptic clothing adding a tactile AR component.', tags: ['clothing'], stats: {} });

// ---- Armor ----

const synthleather_jacket = clothingArmor({ id: 'synthleather_jacket', label: 'Synthleather Jacket', cost: 300, availability: 1, description: 'The eternal street-type style, with a modicum of protection.', tags: ['armor_item'], stats: { defenseRating: 1, armorCapacityProvided: 3 } });
const actioneer_business_clothes = clothingArmor({ id: 'actioneer_business_clothes', label: 'Actioneer Business Clothes', cost: 1500, availability: 2, description: 'Armored suit favored by Mr. Johnsons, faces, and fixers. Includes a concealable holster.', tags: ['armor_item'], stats: { defenseRating: 2, armorCapacityProvided: 6 } });
const armor_clothing = clothingArmor({ id: 'armor_clothing', label: 'Armor Clothing', cost: 500, availability: 2, description: 'Lightweight ballistic weave, nearly undetectable as armor.', tags: ['armor_item'], stats: { defenseRating: 2, armorCapacityProvided: 4 } });
const armor_jacket = clothingArmor({ id: 'armor_jacket', label: 'Armor Jacket', cost: 1000, availability: 2, description: 'Solid protection without excessive attention.', tags: ['armor_item'], stats: { defenseRating: 4, armorCapacityProvided: 8 } });
const armor_vest = clothingArmor({ id: 'armor_vest', label: 'Armor Vest', cost: 750, availability: 2, description: 'Flexible, worn under regular clothes without showing bulk.', tags: ['armor_item'], stats: { defenseRating: 3, armorCapacityProvided: 6 } });
const chameleon_suit = clothingArmor({ id: 'chameleon_suit', label: 'Chameleon Suit', cost: 2000, availability: 4, legality: 'illegal', wireless: true, description: 'Full-body ruthenium-polymer coating with a sensor suite that scans and replicates surroundings. Bonus Edge on Stealth tests to hide while active.', tags: ['armor_item'], stats: { defenseRating: 2, armorCapacityProvided: 4, wirelessBonus: '+2 Defense Rating while active.' } });
const full_body_armor = clothingArmor({ id: 'full_body_armor', label: 'Full Body Armor', cost: 2000, availability: 4, legality: 'licensed', description: 'Military/security heavy-duty gear, intimidating and attention-drawing. Modifiable for environmental adaptation or a full chemical seal. Comes with a helmet.', tags: ['armor_item'], stats: { defenseRating: 5, armorCapacityProvided: 10 } });
// Availability is "—" in the source table (not a stated number) — the
// row prices the bundled helmet separately from the suit it ships with,
// rather than as its own purchasable Availability-rated item. Left null
// rather than guessing.
const full_body_armor_helmet = clothingArmor({ id: 'full_body_armor_helmet', label: 'Full Body Armor Helmet', cost: 500, availability: null, description: 'The helmet included with Full Body Armor, priced separately.', tags: ['armor_item'], stats: { defenseRating: 2, armorCapacityProvided: 6 } });
const lined_coat = clothingArmor({ id: 'lined_coat', label: 'Lined Coat', cost: 900, availability: 2, description: 'A popular armored duster. Bonus Edge on tests to spot things hidden underneath it.', tags: ['armor_item'], stats: { defenseRating: 3, armorCapacityProvided: 7 } });
const urban_explorer_jumpsuit = clothingArmor({ id: 'urban_explorer_jumpsuit', label: 'Urban Explorer Jumpsuit', cost: 800, availability: 2, description: 'Armored "flats" for couriers/athletes/freerunners, with a built-in music player and biomonitor.', tags: ['armor_item'], stats: { defenseRating: 3, armorCapacityProvided: 6 } });

// ---- Armor Mods ----
// NOTE: the source table's Availability column is malformed for these
// four (only Capacity + Cost values present, Availability missing) —
// left as null rather than guessing a number.

const armor_chemical_protection = clothingArmor({ id: 'armor_chemical_protection', label: 'Chemical Protection', cost: null, costPerRating: 250, availability: null, description: 'Neutralizes the Corrosive status a number of times equal to its rating, against Contact-vector chemical attacks.', tags: ['armor_mod'], stats: { ratingRange: [1, 6], armorCapacityUsed: 3 } });
const armor_chemical_seal = clothingArmor({ id: 'armor_chemical_seal', label: 'Chemical Seal', cost: 3000, availability: 5, wireless: true, description: 'Full body armor only. Airtight seal, blocks all Contact/Inhalation-vector chemical statuses for up to 1 hour of total use. Also neutralizes Corrosive 6 times before wearing out.', tags: ['armor_mod'], stats: { armorCapacityUsed: 6, wirelessBonus: 'Activating the seal becomes a Minor Action instead of a Major Action.' } });
const armor_cold_resistance = clothingArmor({ id: 'armor_cold_resistance', label: 'Cold Resistance', cost: null, costPerRating: 250, availability: null, description: 'Cancels Chilled status a number of times equal to its rating, then wears out.', tags: ['armor_mod'], stats: { ratingRange: [1, 6], armorCapacityUsed: 3 } });
const armor_fire_resistance = clothingArmor({ id: 'armor_fire_resistance', label: 'Fire Resistance', cost: null, costPerRating: 250, availability: null, description: 'Cancels Burning status a number of times equal to its rating, then wears out.', tags: ['armor_mod'], stats: { ratingRange: [1, 6], armorCapacityUsed: 3 } });
const armor_electricity_resistance = clothingArmor({ id: 'armor_electricity_resistance', label: 'Electricity Resistance', cost: null, costPerRating: 250, availability: null, description: 'Cancels Zapped status a number of times equal to its rating, then wears out.', tags: ['armor_mod'], stats: { ratingRange: [1, 6], armorCapacityUsed: 3 } });

// ---- Helmets & Shields ----

// Helmet capacity is device capacity, not armor capacity — resolved
// this pass. The source prose is explicit: a helmet's Capacity is "for
// accessories (trode nets, vision enhancements)," the same category of
// thing deviceCapacityUsed items consume everywhere else in this file
// (Visual Enhancement accessories, RFID tags). It just happened to sit
// in the same stat table as Defense Rating/Capacity/Avail/Cost as other
// armor, which made it look armor-capacity-shaped at a glance.
const helmet = clothingArmor({ id: 'helmet', label: 'Helmet', cost: 200, availability: 1, description: 'Wide variety, Capacity for accessories (trode nets, vision enhancements).', tags: ['helmet_shield'], stats: { defenseRating: 1, deviceCapacityProvided: 4 } });
const ballistic_shield = clothingArmor({
  id: 'ballistic_shield', label: 'Ballistic Shield', cost: 900, availability: 4,
  description: 'SWAT/urban-combat standard, clear plasteel window, built-in ladder-frame for climbing short obstacles.',
  tags: ['helmet_shield'], stats: { defenseRating: 2, armorCapacityProvided: 2, damageValue: '2S', attackRatings: [4, null, null, null, null], skill: 'close_combat' },
});
const riot_shield = clothingArmor({
  id: 'riot_shield', label: 'Riot Shield', cost: 1200, availability: 4, wireless: true,
  description: 'The "taser shield" cousin, adding an electrical Close Combat attack (Stun Baton characteristics). 10 charges, 1 per 10 seconds plugged in.',
  tags: ['helmet_shield'], stats: { defenseRating: 2, armorCapacityProvided: 2, damageValue: '4S(e)', attackRatings: [4, null, null, null, null], skill: 'close_combat', wirelessBonus: 'Recharges via induction, 1 charge per hour, instead of needing to be plugged in.' },
});

// ---- Electronics Accessories ----
// "All peripheral accessories are wireless" is a blanket rule stated
// directly by the chapter — every item here uses electronics_w, not a
// judgment call.

const ar_gloves = electronics_w({ id: 'ar_gloves', label: 'AR Gloves', cost: 150, availability: 1, description: 'Manual AR interaction — "touch"/"hold" AROs, tactile force-feedback, weight/temperature sensing.', tags: ['electronics_accessory'], stats: { deviceRating: 3, wirelessBonus: 'Can perform a chemical analysis of held objects.' } });
const electronic_paper = electronics_w({ id: 'electronic_paper', label: 'Electronic Paper', cost: 5, availability: 1, description: 'A foldable/rollable ultrathin display, writable/erasable wirelessly.', tags: ['electronics_accessory'], stats: { deviceRating: 1 } });
const printer = electronics_w({ id: 'printer', label: 'Printer', cost: 25, availability: 1, description: 'Full-color hardcopy printing with attached paper supply.', tags: ['electronics_accessory'], stats: { deviceRating: 3 } });
const satellite_link = electronics_w({ id: 'satellite_link', label: 'Satellite Link', cost: 500, availability: 3, description: 'Uplinks to LEO satellites for Matrix access where no local network exists; caps distance-based Noise penalty at -5. Includes a portable dish.', tags: ['electronics_accessory'], stats: { deviceRating: 4 } });
// Availability shown as "—" in source for the base Sim Module (only the
// Hot Sim upgrade has a stated Availability, "2(I)") — left null rather
// than guessing a number.
const sim_module = electronics_w({ id: 'sim_module', label: 'Sim Module', cost: 100, availability: null, description: 'Full simsense/AR/VR experience via DNI. Can be upgraded for hot-sim.', tags: ['electronics_accessory'], stats: {} });
const sim_module_hot_sim = electronics_w({ id: 'sim_module_hot_sim', label: 'Sim Module (Hot Sim)', cost: 250, availability: 2, legality: 'illegal', description: 'Full VR range, at real brain-frying risk.', tags: ['electronics_accessory'], stats: {} });
// legality corrected null <- 'licensed': the source Availability column
// for Simrig is a plain "4" with no "(L)" suffix, unlike items in this
// same file that ARE licensed (e.g. jammer_area "4(L)"). Flagging this
// since real-world SR6 books do sometimes license simrigs — worth a
// second look if that's a sourcebook errata rather than an intentional
// omission.
const simrig_accessory = electronics_w({ id: 'simrig_accessory', label: 'Simrig (Accessory)', cost: 1000, availability: 4, legality: null, description: 'Records simsense experience data (sensory/emotive) from the wearer; needs a working sim module + DNI to record. External version — see also the implanted headware version.', tags: ['electronics_accessory'], stats: { deviceRating: 3 } });
const subvocal_mic = electronics_w({ id: 'subvocal_mic', label: 'Subvocal Microphone', cost: 50, availability: 2, description: 'Adhesive throat patch for subvocalized speech; eavesdroppers can neither gain nor spend Edge on their Perception test.', tags: ['electronics_accessory'], stats: { deviceRating: 3 } });
const trid_projector = electronics_w({ id: 'trid_projector', label: 'Trid Projector', cost: 200, availability: 1, description: 'Projects a 5m-cube 3D hologram. Convincingly realistic only with real artistic effort.', tags: ['electronics_accessory'], stats: { deviceRating: 3 } });
const trodes = electronics_w({ id: 'trodes', label: 'Trodes', cost: 70, availability: 1, description: 'An electrode/ultrasound net providing DNI, in any headwear form factor.', tags: ['electronics_accessory'], stats: { deviceRating: 3 } });

// ---- RFID Tags (sold per 10) ----
// Datachip explicitly is NOT wireless ("needs a universal data
// connector"); the other three carry Device Ratings and/or explicit
// Matrix Perception language.

const standard_tags = electronics_w({ id: 'standard_tags', label: 'Standard Tags', cost: null, costPerUnit: 1, unitQuantity: 10, availability: 1, description: 'Tiny chips embedded in nearly every product, used for geo-tagging, tracking, access control.', tags: ['rfid'], stats: { deviceRating: 1 } });
const datachip = electronics({ id: 'datachip', label: 'Datachip', cost: null, costPerUnit: 5, unitQuantity: 10, availability: 1, description: 'Offline storage (2cm x 6cm), no wireless — needs a universal data connector to read/write.', tags: ['rfid'], stats: { deviceRating: 1 } });
const security_stealth_tags = electronics_w({ id: 'security_stealth_tags', label: 'Security/Stealth Tags', cost: null, costPerUnit: 10, unitQuantity: 10, availability: 2, description: 'Usually subdermally implanted for tracking people; EMP-hardened against tag erasers. The stealth variant runs silent, rolling 10 dice on the opposed Matrix Perception test.', tags: ['rfid'], stats: { deviceRating: 3 } });
const sensor_tags = electronics_w({ id: 'sensor_tags', label: 'Sensor Tags', cost: null, costPerUnit: 40, unitQuantity: 10, availability: 2, description: 'Records 24 hours of data from a linked sensor (rating 2 max, sold separately), then shuts off or overwrites. Retrieval needs proximity (within 1m) unless wireless is enabled.', tags: ['rfid'], stats: { deviceRating: 2, wirelessBonus: 'Enables real-time monitoring (owner only) and lets recordings be transferred remotely.' } });

// ---- Communications and Countermeasures ----
// CORRECTED this pass: the old note here said jammers/tag_eraser/
// white_noise_generator/data_tap weren't PAN nodes because they "act
// on" wireless devices rather than being slaved to one. That reasoning
// missed that the source gives all four an explicit "Wireless bonus:"
// line — per the wireless-bonus data rule, that means `wireless: true`
// regardless of whether slaving one to a PAN makes practical sense.
// data_tap in particular is physically cable-based but still has a
// wireless-triggered self-destruct function, so it gets the flag too.
// micro_transceiver explicitly discusses slaving; bug_scanner performs
// a Matrix Perception test as its core function.

const bug_scanner = electronics_w({ id: 'bug_scanner', label: 'Bug Scanner', cost: 200, availability: 3, description: 'Locates wireless devices within 20m via signal strength; Electronics + Logic as an opposed Matrix Perception test, any net hit finds it.', tags: ['comms_countermeasure'], stats: { wirelessBonus: 'Gain +2 free hits, and the opposed test only needs to tie the target rather than beat it.' } });
const data_tap = electronics_w({ id: 'data_tap', label: 'Data Tap', cost: 300, availability: 2, description: 'Clip onto a data cable for a direct connection to devices on either end (Noise no longer applies while attached); removable without damaging the cable.', tags: ['comms_countermeasure'], stats: { wirelessBonus: 'Can self-destruct on command (Minor Action); choose whether it damages the cable or just severs the tap\u2019s own connection.' } });
const headjammer = electronics({ id: 'headjammer', label: 'Headjammer', cost: null, costPerRating: 150, availability: 5, legality: 'illegal', description: 'Neutralizes an implanted commlink/cyberdeck like any jammer, but limited to that specific device.', tags: ['comms_countermeasure'], stats: { ratingRange: [1, 6] } });
const jammer_area = electronics_w({ id: 'jammer_area', label: 'Jammer, Area', cost: null, costPerRating: 200, availability: 4, legality: 'licensed', description: 'Floods a spherical area with jamming noise equal to its Device Rating; -1 rating per 10m from center.', tags: ['comms_countermeasure'], stats: { ratingRange: [1, 6], wirelessBonus: 'Can exempt specific devices or personas you designate from the jamming effect.' } });
const jammer_directional = electronics_w({ id: 'jammer_directional', label: 'Jammer, Directional', cost: null, costPerRating: 200, availability: 4, legality: 'licensed', description: 'Floods a 30-degree-spread cone with jamming noise; -1 rating per 30m.', tags: ['comms_countermeasure'], stats: { ratingRange: [1, 6], wirelessBonus: 'Can exempt specific devices or personas you designate from the jamming effect.' } });
const micro_transceiver = electronics_w({ id: 'micro_transceiver', label: 'Micro-Transceiver', cost: 100, availability: 1, description: 'Short-range (1km) voice comm, an earbud + adhesive subvocal mic. Best slaved to something better for secure comms.', tags: ['comms_countermeasure'], stats: { deviceRating: 2 } });
const tag_eraser = electronics_w({ id: 'tag_eraser', label: 'Tag Eraser', cost: 450, availability: 3, description: 'Handheld EMP tool; within 5mm of a device, delivers 10 boxes of Matrix damage. Too short-range for vehicles/most drones/maglocks/cyberware. 1 charge, fully recharges in 10 seconds plugged in.', tags: ['comms_countermeasure'], stats: { wirelessBonus: 'Fully recharges via induction in an hour, without needing to be plugged in.' } });
const white_noise_generator = electronics_w({ id: 'white_noise_generator', label: 'White Noise Generator', cost: null, costPerRating: 50, availability: 3, description: 'Floods a (rating)-meter radius with audio-surveillance-blocking noise; -rating penalty on Perception tests to overhear conversations in range.', tags: ['comms_countermeasure'], stats: { ratingRange: [1, 6], wirelessBonus: 'Triples the generator\u2019s effective radius.' } });

// ---- Software ----

const autosoft = software({ id: 'autosoft', label: 'Autosoft', cost: null, costPerRating: 500, availability: null, availabilityEqualsRating: true, description: 'Drone-operation program. Availability equals the chosen Rating.', tags: ['software'], stats: { ratingRange: [1, 9] } });

// const cyberprogram_basic = software({ id: 'cyberprogram_basic', label: 'Cyberprogram, Basic', cost: 60, availability: 1, description: 'Basic Matrix program.', tags: ['software'], stats: {} });
// const cyberprogram_hacking = software({ id: 'cyberprogram_hacking', label: 'Cyberprogram, Hacking', cost: 250, availability: 4, legality: 'illegal', description: 'Hacking Matrix program.', tags: ['software'], stats: {} });
// ---- Matrix Programs ----
// Real named programs, replacing the two generic Cyberprogram stubs
// above — confirmed against the actual Matrix chapter's Programs
// section. Flat cost-per-tier confirmed by the stubs' own prior
// values (60¥/Avail 1/legal for Basic, 250¥/Avail 4/illegal for
// Hacking) — every program in a tier costs the same, only the effect
// differs, same shape as the Tac-Apps in matrix_devices.js.
// matrixCapacityUsed: 1 — each loaded program consumes one Program
// Slot (now `stats.matrixCapacityProvided` on the housing device),
// same provider/consumer relationship as every other Capacity pool.

const program_baby_monitor = software({ id: 'program_baby_monitor', label: 'Baby Monitor', cost: 60, availability: 1, description: 'Know your current Overwatch Score without needing an action.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_browse = software({ id: 'program_browse', label: 'Browse', cost: 60, availability: 1, description: 'Matrix Search actions: gain 1 Edge, spend it immediately on that action or it disappears.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_configurator = software({ id: 'program_configurator', label: 'Configurator', cost: 60, availability: 1, description: 'Store an alternate deck configuration; swap to it instead of manually changing two attributes.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_edit = software({ id: 'program_edit', label: 'Edit', cost: 60, availability: 1, description: 'Edit File action: gain 1 Edge, spend it immediately or it vanishes.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_encryption = software({ id: 'program_encryption', label: 'Encryption', cost: 60, availability: 1, description: '+2 dice on the Encrypt File action.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_signal_scrubber = software({ id: 'program_signal_scrubber', label: 'Signal Scrubber', cost: 60, availability: 1, description: 'Reduces Noise by 2.', tags: ['software'], stats: { matrixCapacityUsed: 1, deviceModifiers: { noise: -2 } } });
const program_toolbox = software({ id: 'program_toolbox', label: 'Toolbox', cost: 60, availability: 1, description: '+1 to Data Processing.', tags: ['software'], stats: { matrixCapacityUsed: 1, deviceModifiers: { dataProcessing: 1 } } });
const program_virtual_machine = software({ id: 'program_virtual_machine', label: 'Virtual Machine', cost: 60, availability: 1, description: '2 extra program slots; take 1 extra unresisted box of Matrix damage when attacked.', tags: ['software'], stats: { matrixCapacityUsed: 1, deviceModifiers: { matrixCapacityProvided: 2 } } });

const program_armor = software({ id: 'program_armor', label: 'Armor', cost: 250, availability: 4, legality: 'illegal', description: '+2 Defense Rating.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_biofeedback = software({ id: 'program_biofeedback', label: 'Biofeedback', cost: 250, availability: 4, legality: 'illegal', description: 'Matrix attacks cause Stun (cold-sim) or Physical (hot-sim) biofeedback damage. Attack-linked.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_biofeedback_filter = software({ id: 'program_biofeedback_filter', label: 'Biofeedback Filter', cost: 250, availability: 4, legality: 'illegal', description: 'Allows Device Rating or Body to soak Matrix damage.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_blackout = software({ id: 'program_blackout', label: 'Blackout', cost: 250, availability: 4, legality: 'illegal', description: 'Like Biofeedback, but Stun damage only. Attack-linked.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_decryption = software({ id: 'program_decryption', label: 'Decryption', cost: 250, availability: 4, legality: 'illegal', description: '+2 dice on the Crack File action.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_defuse = software({ id: 'program_defuse', label: 'Defuse', cost: 250, availability: 4, legality: 'illegal', description: 'Allows Device Rating or Body to soak Data Bomb damage.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_exploit = software({ id: 'program_exploit', label: 'Exploit', cost: 250, availability: 4, legality: 'illegal', description: "Reduces the hacking target's Defense Rating by 2.", tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_fork = software({ id: 'program_fork', label: 'Fork', cost: 250, availability: 4, legality: 'illegal', description: 'Hit two targets with a single Matrix action, without splitting your dice pool.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_lockdown = software({ id: 'program_lockdown', label: 'Lockdown', cost: 250, availability: 4, legality: 'illegal', description: 'Inflicting Matrix damage also causes link-lock.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_overclock = software({ id: 'program_overclock', label: 'Overclock', cost: 250, availability: 4, legality: 'illegal', description: '+2 dice to a Matrix action, one of which must be the Wild Die.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_stealth = software({ id: 'program_stealth', label: 'Stealth', cost: 250, availability: 4, legality: 'illegal', description: 'Use-it-or-lose-it Edge on Hide actions. Sleaze-linked.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });
const program_trace = software({ id: 'program_trace', label: 'Trace', cost: 250, availability: 4, legality: 'illegal', description: 'Use-it-or-lose-it Edge on Trace Icon actions. Sleaze-linked.', tags: ['software'], stats: { matrixCapacityUsed: 1 } });


const datasoft = software({ id: 'datasoft', label: 'Datasoft', cost: 120, availability: 2, description: 'A narrow Knowledge-skill database (e.g. one gang instead of all Seattle gangs); used exactly like a Knowledge skill.', tags: ['software'], stats: {} });
const mapsoft = software({ id: 'mapsoft', label: 'Mapsoft', cost: 100, availability: 2, description: 'Detailed data (streets, listings, topography, census, GPS, environment) for a ~5,000 sq km area, with route-planning.', tags: ['software'], stats: {} });
const shopsoft = software({ id: 'shopsoft', label: 'Shopsoft', cost: 150, availability: 2, description: 'Comparison-shopping program (pricing, reviews) for a specific goods category; +1 dice pool on Matrix Search tests to buy/sell that category.', tags: ['software'], stats: {} });
const activesofts = software({ id: 'activesofts', label: 'Activesofts', cost: null, costPerRating: 5000, availability: 4, description: 'Replace non-Magic/Resonance active skills; number usable at once capped by skillwire rating. Requires a skillwire.', tags: ['software'], stats: { ratingRange: [1, 6] } });
const knowsofts = software({ id: 'knowsofts', label: 'Knowsofts', cost: 2500, availability: 2, description: 'Replace Knowledge skills, no ratings, capped by skilljack rating. Requires a skilljack.', tags: ['software'], stats: {} });
const linguasofts = software({ id: 'linguasofts', label: 'Linguasofts', cost: null, costPerRating: 1500, availability: 1, description: 'Replace language skills, capped by skilljack rating. Rating maps to proficiency: 1=basic, 2=specialist, 3=expert, 4=expert (cap). Requires a skilljack.', tags: ['software'], stats: { ratingRange: [1, 4] } });
const tutorsoft = software({ id: 'tutorsoft', label: 'Tutorsoft', cost: null, costPerRating: 400, availability: null, availabilityFormula: 'Rating/3', description: 'A virtual private tutor; makes Instruction tests with a dice pool of (rating x 2). Cannot teach Magic/Resonance skills.', tags: ['software'], stats: { ratingRange: [1, 6] } });

// ---- ID and Credit ----

const credstick_standard = idGear({ id: 'credstick_standard', label: 'Certified Credstick, Standard', cost: 5, availability: 1, description: 'Untraceable, unregistered funds; requires no ID to use.', tags: ['id_credit'], stats: { maxValue: 5000 } });
const credstick_silver = idGear({ id: 'credstick_silver', label: 'Certified Credstick, Silver', cost: 20, availability: 1, description: 'Untraceable, unregistered funds; requires no ID to use.', tags: ['id_credit'], stats: { maxValue: 20000 } });
const credstick_gold = idGear({ id: 'credstick_gold', label: 'Certified Credstick, Gold', cost: 100, availability: 2, description: 'Untraceable, unregistered funds; requires no ID to use.', tags: ['id_credit'], stats: { maxValue: 100000 } });
const credstick_platinum = idGear({ id: 'credstick_platinum', label: 'Certified Credstick, Platinum', cost: 500, availability: 3, description: 'Untraceable, unregistered funds; requires no ID to use.', tags: ['id_credit'], stats: { maxValue: 500000 } });
const credstick_ebony = idGear({ id: 'credstick_ebony', label: 'Certified Credstick, Ebony', cost: 1000, availability: 5, description: 'Untraceable, unregistered funds; requires no ID to use.', tags: ['id_credit'], stats: { maxValue: 1000000 } });
const fake_sin = idGear({ id: 'fake_sin', label: 'Fake SIN', cost: null, costPerRating: 2500, availability: 4, legality: 'illegal', description: "Rating tested against verification systems. Most runners keep 2+ fakes — a clean one for everyday life, a shadier one for runs.", tags: ['id_credit'], stats: { ratingRange: [1, 6] } });
const fake_license = idGear({ id: 'fake_license', label: 'Fake License', cost: null, costPerRating: 200, availability: 4, legality: 'illegal', description: "Needed for anything requiring a license (L). Attaches to a specific fake SIN, its rating capped by that SIN's rating.", tags: ['id_credit'], stats: { ratingRange: [1, 6] } });

// ---- Tools ----
// Previously misused idGear as the factory (worked, since it's the same
// shape, but semantically confusing) — now a real tool() factory.

const electronics_kit = tool({ id: 'electronics_kit', label: 'Kit', cost: 500, availability: 1, description: "Portable, basic repairs. Without at least a kit in the field, some skills can't be used actively at all.", tags: ['electronics_tool'], stats: {} });
const electronics_shop = tool({ id: 'electronics_shop', label: 'Shop', cost: 5000, availability: 4, description: 'Van-transportable, more advanced. +1 dice pool for on-site tests, stocked with standard spare parts.', tags: ['electronics_tool'], stats: {} });
const electronics_facility = tool({ id: 'electronics_facility', label: 'Facility', cost: 50000, availability: 7, description: 'Building-bound, immobile, most advanced. Same bonus/parts as a shop, plus a bonus Edge usable on Extended tests within it.', tags: ['electronics_tool'], stats: {} });

// ---- Optical and Imaging Devices ----
// Contacts explicitly "must be wireless" — extended to the other
// Capacity-bearing imaging housings in the same family. binoculars_optical
// is explicitly the non-smart, optical-only version. endoscope/periscope/
// mage_sight_goggles are physical/mechanical (fiber cable, mirror tube,
// rope-linked lens) — not wireless.

const binoculars = opticalDeviceWireless({ id: 'binoculars', label: 'Binoculars', cost: null, costPerCapacity: 50, availability: 1, description: 'Built-in vision magnification.', tags: ['optical_device'], stats: { deviceCapacityProvidedRange: [1, 3] } });
const binoculars_optical = opticalDevice({ id: 'binoculars_optical', label: 'Binoculars, Optical', cost: 50, availability: 1, description: 'Optical-only version, image link only. Spellcasters can use these to cast at distant targets.', tags: ['optical_device'], stats: {} });
const camera = opticalDeviceWireless({ id: 'camera', label: 'Camera', cost: null, costPerCapacity: 100, availability: 1, description: 'Stills/video/trideo, upgradeable with vision and audio enhancements.', tags: ['optical_device'], stats: { deviceCapacityProvidedRange: [1, 6] } });
const micro_camera = opticalDeviceWireless({ id: 'micro_camera', label: 'Micro-Camera', cost: 100, availability: 1, description: 'Capacity 1 version of the standard camera.', tags: ['optical_device'], stats: { deviceCapacityProvided: 1 } });
const contacts = opticalDeviceWireless({ id: 'contacts', label: 'Contacts', cost: null, costPerCapacity: 200, availability: 2, description: 'Worn directly on the eyes, nearly undetectable, but limited enhancement space. Must be wireless.', tags: ['optical_device'], stats: { deviceCapacityProvidedRange: [1, 3] } });
const endoscope = opticalDevice({ id: 'endoscope', label: 'Endoscope', cost: 250, availability: 3, description: 'A 1m+ fiber-optic cable for peeking around corners/under doors/into tight spaces.', tags: ['optical_device'], stats: {} });
const glasses = opticalDeviceWireless({ id: 'glasses', label: 'Glasses', cost: null, costPerCapacity: 100, availability: 1, description: 'Lightweight frames, hard to distinguish from ordinary prescription/sunglasses.', tags: ['optical_device'], stats: { deviceCapacityProvidedRange: [1, 4] } });
const goggles = opticalDeviceWireless({ id: 'goggles', label: 'Goggles', cost: null, costPerCapacity: 50, availability: 1, description: 'Bulky, strapped on, hard to dislodge, largest enhancement capacity.', tags: ['optical_device'], stats: { deviceCapacityProvidedRange: [1, 6] } });
const imaging_scope = opticalDeviceWireless({ id: 'imaging_scope', label: 'Imaging Scope', cost: 300, availability: 1, description: 'Vision enhancer/display, usually top-mounted on weapons.', tags: ['optical_device'], stats: { deviceCapacityProvided: 3 } });
const monocle = opticalDeviceWireless({ id: 'monocle', label: 'Monocle', cost: null, costPerCapacity: 120, availability: 1, description: 'Headband/helmet flip-down arm, or old-fashioned chain with smart adhesive.', tags: ['optical_device'], stats: { deviceCapacityProvidedRange: [1, 4] } });
const mage_sight_goggles = opticalDevice({ id: 'mage_sight_goggles', label: 'Mage Sight Goggles', cost: 3000, availability: 5, description: 'Heavy goggles connected via myomeric rope (10/20/30m lengths) to a fiber-optic/lens end, letting spellcasters get line of sight while staying out of sight.', tags: ['optical_device'], stats: {} });
const periscope = opticalDevice({ id: 'periscope', label: 'Periscope', cost: 50, availability: 2, description: 'L-shaped dual-mirror tube for looking, shooting, or casting around corners.', tags: ['optical_device'], stats: {} });

// ---- Visual Enhancements ----
// External accessory versions — see GEAR_AUGMENTATIONS.js for the
// same-named implant versions (priced higher — Essence + surgery). All
// wireless — AR/vision-tech installed into the housings above.

const flare_compensation_accessory = opticalDeviceWireless({ id: 'flare_compensation_accessory', label: 'Flare Compensation (Accessory)', cost: 250, availability: 1, description: 'Blocks blinding flashes/glare; bonus Edge if the opposition lacks the same.', tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 1 } });
const image_link_accessory = opticalDeviceWireless({ id: 'image_link_accessory', label: 'Image Link (Accessory)', cost: 25, availability: 1, description: 'Displays visual info (AROs, text, images, video) in your field of vision; required to truly "see" AR.', tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 1 } });
const low_light_vision_accessory = opticalDeviceWireless({ id: 'low_light_vision_accessory', label: 'Low-Light Vision (Accessory)', cost: 500, availability: 2, description: 'Normal vision down to starlight levels; bonus Edge if the opposition lacks it.', tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 1 } });
// legality corrected null <- 'licensed': source Availability column for
// Smartlink is a plain "2", no "(L)" suffix, unlike smartlink-adjacent
// weapon accessories elsewhere in the catalog that ARE marked licensed.
// Flagging — real-world SR6 core book usually licenses smartlink
// systems, so this may be an inconsistency worth confirming against a
// second source rather than a deliberate omission.
const smartlink_accessory = opticalDeviceWireless({ id: 'smartlink_accessory', label: 'Smartlink (Accessory)', cost: 2000, availability: 2, legality: null, description: 'The vision side of a smartgun system: range, ammo status, and a targeting dot in your field of view.', tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 2 } });
const thermographic_vision_accessory = opticalDeviceWireless({ id: 'thermographic_vision_accessory', label: 'Thermographic Vision (Accessory)', cost: 500, availability: 2, description: "Infrared/heat-pattern vision. Bonus Edge if the opposition lacks it.", tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 1 } });
const ultrasound_link = opticalDeviceWireless({ id: 'ultrasound_link', label: 'Ultrasound Link', cost: 300, availability: 1, description: 'Visual overlay for an ultrasound accessory.', tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 1 } });
const vision_enhancement_accessory = opticalDeviceWireless({ id: 'vision_enhancement_accessory', label: 'Vision Enhancement (Accessory)', cost: 500, availability: 1, description: '+1 dice pool on all visual Perception tests.', tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 2 } });
const vision_magnification_accessory = opticalDeviceWireless({ id: 'vision_magnification_accessory', label: 'Vision Magnification (Accessory)', cost: 250, availability: 1, description: 'Up to 50x zoom; +2 Attack Rating at Medium/Far/Extreme range where the weapon already has a nonzero rating there.', tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 1 } });

export const GEAR_ARMOR_ELECTRONICS = {
  clothing, electrochromic_feature, feedback_feature,
  synthleather_jacket, actioneer_business_clothes, armor_clothing, armor_jacket, armor_vest, chameleon_suit, full_body_armor, full_body_armor_helmet, lined_coat, urban_explorer_jumpsuit,
  armor_chemical_protection, armor_chemical_seal, armor_cold_resistance, armor_fire_resistance, armor_electricity_resistance,
  helmet, ballistic_shield, riot_shield,
  ar_gloves, electronic_paper, printer, satellite_link, sim_module, sim_module_hot_sim, simrig_accessory, subvocal_mic, trid_projector, trodes,
  standard_tags, datachip, security_stealth_tags, sensor_tags,
  bug_scanner, data_tap, headjammer, jammer_area, jammer_directional, micro_transceiver, tag_eraser, white_noise_generator,
  autosoft,

  // cyberprogram_basic, cyberprogram_hacking,
  program_baby_monitor, program_browse, program_configurator, program_edit, program_encryption, program_signal_scrubber, program_toolbox, program_virtual_machine,
  program_armor, program_biofeedback, program_biofeedback_filter, program_blackout, program_decryption, program_defuse, program_exploit, program_fork, program_lockdown, program_overclock, program_stealth, program_trace,

  datasoft, mapsoft, shopsoft, activesofts, knowsofts, linguasofts, tutorsoft,
  credstick_standard, credstick_silver, credstick_gold, credstick_platinum, credstick_ebony, fake_sin, fake_license,
  electronics_kit, electronics_shop, electronics_facility,
  binoculars, binoculars_optical, camera, micro_camera, contacts, endoscope, glasses, goggles, imaging_scope, monocle, mage_sight_goggles, periscope,
  flare_compensation_accessory, image_link_accessory, low_light_vision_accessory, smartlink_accessory, thermographic_vision_accessory, ultrasound_link, vision_enhancement_accessory, vision_magnification_accessory,
};

export const GEAR_ARMOR_ELECTRONICS_IDS = Object.keys(GEAR_ARMOR_ELECTRONICS);
