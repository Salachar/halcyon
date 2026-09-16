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
//    CORRECTION: the old reasoning under this note assumed
//    jammers/tag_eraser/white_noise_generator/data_tap were NOT PAN
//    nodes because they "act on" wireless devices rather than being
//    slaved to one. That assumption was wrong for a different reason
//    than PAN membership — the source text gives all four an explicit
//    "Wireless bonus:" line, and per the wireless-bonus data rule, any
//    item with real wireless-bonus text gets `wireless: true` regardless
//    of whether it's a sensible thing to slave.
// 7. CAPACITY FIELD SPLIT: the old flat `capacity` / `capacityRange`
//    fields were ambiguous between two totally separate pools in this
//    file alone — armor's mod-capacity pool and the optical/electronics
//    housings' accessory-capacity pool. Split per the project-wide
//    convention:
//      - Armor items (housings) → `armorCapacityProvided[Range]`
//      - Armor mods (consumers) → `armorCapacityUsed[PerRating]`
//      - Optical/electronics housings (binoculars, camera, contacts,
//        glasses, goggles, imaging scope, monocle) →
//        `deviceCapacityProvided[Range]`
//      - Visual Enhancement accessories, i.e. the consumer side
//        (flare compensation, image link, etc.) → `deviceCapacityUsed`
//    NOTE: Helmet's Capacity is device capacity, not armor capacity.
//    See the comment directly above the `helmet` const for the
//    reasoning. Full Body Armor Helmet was left as
//    armorCapacityProvided — its description doesn't carry the same
//    explicit "for accessories" language, so recategorizing it wasn't
//    confirmed the same way; worth a second look if its source entry
//    turns out to say the same thing.
//
// ============================================================================
// SCHEMA PASS 2 (the resolved-decisions pass) — applied on top of
// everything in PASS 1 below:
//
// D1. `referenceOnly: true` on 87 of the 90 items carrying `effects`.
//     The test (canonical wording in sensors_security_survival.js): an
//     effect is BACKED only if a live computed field DRIVES that
//     specific effect, not merely if the item happens to own some
//     structured field. Only three qualify here — Full Body Armor,
//     Camera, and Riot Shield — each with a comment at the item saying
//     which field backs which effect.
//     Note Signal Scrubber and Toolbox are absent from the sweep
//     entirely: they have NO effects, because their whole effect is
//     already in `deviceModifiers`. That's the omittable-description
//     rule and D1 agreeing with each other.
// D2. LINED COAT'S EFFECT DIRECTION CORRECTED. Source reads "provides
//     a bonus Edge AGAINST tests to spot items hidden underneath" —
//     Edge "against" a test belongs to the resisting side, i.e. the
//     wearer, not the searcher. See the comment at the item.
// D3. `skill` MOVED TO THE ITEM ROOT on `ballistic_shield` and
//     `riot_shield`, matching every weapon in firearms_explosives.js
//     and melee_thrown.js.
// D4. `defaultAttachments` ON MICRO-TRANSCEIVER — its "adhesive
//     subvocal mic" is the standalone `subvocal_mic` item in this same
//     file, and the price supports it (a 50¥ item inside a 100¥
//     whole). Third `defaultAttachments` in this file, and the second
//     that stays within it.
//
// UNCHANGED BY DECISION: Security/Stealth Tags stays ONE item. The
// source header is "Security tag/stealth tag" as a single combined
// entry, and the body calls the stealth version a "variant" — so the
// original one-item handling was already right. Concealability also
// stays as `effects` prose rather than becoming a field this round,
// since the catalog needs both values AND modifiers and one scalar
// can't hold "+1".
//
// SCHEMA PASS 1 — the original array/omittable-description pass:
//
// S1. `wirelessBonus` -> `wirelessBonuses`, and mechanical prose
//     extracted from `description` into a new `effects` — both ARRAYS
//     of plain strings, one distinct mechanic per entry, ordered active
//     mechanics first and restrictions/compatibility last. Repeated
//     text shared across a family (the five credsticks) is hoisted to
//     a constant rather than restated per item.
// S2. `description` IS NOW OMITTABLE — delete it and lose no gameplay
//     information. Numbers already held in a structured field are NOT
//     restated in `effects`: Signal Scrubber's "-2 Noise" and Toolbox's
//     "+1 Data Processing" live only in `deviceModifiers`, Autosoft's
//     "Availability equals Rating" only in `availabilityEqualsRating`,
//     and each optical housing's Capacity only in
//     `deviceCapacityProvided[Range]`.
// S3. `defaultAttachments` — two confirmed cases in this file, both
//     items whose own description says they SHIP WITH another real
//     catalog item: Full Body Armor comes with its helmet (already a
//     separate item here), and Actioneer Business Clothes includes a
//     concealable holster (a real item in firearms_explosives.js —
//     this is the catalog's first cross-file defaultAttachments
//     reference, which the flat-id shape supports fine). Neither is
//     `builtIn`: a helmet comes off, and nothing in either weapon's
//     stat block has the holster's bonus baked in, so seeding the
//     normal removable SKUs is correct.
// S4. NO `builtIn` ITEMS IN THIS FILE. Nothing here is welded to a
//     parent the way an integral suppressor is.
//
// TWO DATA BUGS FOUND AND FIXED — see the DragonSilk/DragonThread block
// for both (wrong capacity field, wrong tags). Flagged in the summary
// rather than buried.
// ============================================================================

const CREDSTICK_EFFECTS = [
  'Holds untraceable, unregistered funds.',
  'Requires no ID to use.',
];

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

const clothing = clothingArmor({
  id: 'clothing', label: 'Clothing', cost: null, costRange: [10, 10000], availability: 1,
  description: 'From cheap soy-based "flats" to high style.',
  referenceOnly: true,
  tags: ['clothing'],
  stats: { effects: ['Can have commlinks, music players, and other electronics woven in.'] },
});
const electrochromic_feature = clothingArmor({
  id: 'electrochromic_feature', label: 'Electrochromic Feature', cost: 75, availability: 1, wireless: true,
  description: 'Voltage-reactive threads that change color or display text, images, and patterns.',
  referenceOnly: true,
  tags: ['clothing'],
  stats: {
    effects: ['A Minor Action sets a new pattern; the change takes 2 combat rounds to fully complete.'],
    wirelessBonuses: [
      'Changing settings becomes a free Minor Action.',
      'The fabric can display images, text, or video streamed from your commlink.',
    ],
  },
});
const feedback_feature = clothingArmor({
  id: 'feedback_feature', label: 'Feedback Feature', cost: 150, availability: 2,
  description: 'Haptic clothing woven through with microactuators.',
  referenceOnly: true,
  tags: ['clothing'],
  stats: { effects: ['Adds a tactile component to AR.'] },
});

// ---- Armor ----

const synthleather_jacket = clothingArmor({ id: 'synthleather_jacket', label: 'Synthleather Jacket', cost: 300, availability: 1, description: 'The eternal street-type style, with a modicum of protection.', tags: ['armor_item'], stats: { defenseRating: 1, armorCapacityProvided: 3 } });
const actioneer_business_clothes = clothingArmor({
  id: 'actioneer_business_clothes', label: 'Actioneer Business Clothes', cost: 1500, availability: 2,
  description: 'Armored suit favored by Mr. Johnsons, faces, and fixers.',
  tags: ['armor_item'],
  // Cross-file reference: concealable_holster lives in
  // firearms_explosives.js. Removable rather than builtIn — the holster
  // has no mount, and nothing in this suit's stat block has its
  // Concealability bonus baked in.
  stats: { defenseRating: 2, armorCapacityProvided: 6, defaultAttachments: ['concealable_holster'] },
});
const armor_clothing = clothingArmor({ id: 'armor_clothing', label: 'Armor Clothing', cost: 500, availability: 2, description: 'Lightweight ballistic weave, nearly undetectable as armor.', tags: ['armor_item'], stats: { defenseRating: 2, armorCapacityProvided: 4 } });
const armor_jacket = clothingArmor({ id: 'armor_jacket', label: 'Armor Jacket', cost: 1000, availability: 2, description: 'Solid protection without excessive attention.', tags: ['armor_item'], stats: { defenseRating: 4, armorCapacityProvided: 8 } });
const armor_vest = clothingArmor({ id: 'armor_vest', label: 'Armor Vest', cost: 750, availability: 2, description: 'Flexible, worn under regular clothes without showing bulk.', tags: ['armor_item'], stats: { defenseRating: 3, armorCapacityProvided: 6 } });
const chameleon_suit = clothingArmor({
  id: 'chameleon_suit', label: 'Chameleon Suit', cost: 2000, availability: 4, legality: 'illegal', wireless: true,
  description: 'Full-body ruthenium-polymer coating with a sensor suite that scans and replicates its surroundings.',
  referenceOnly: true,
  tags: ['armor_item'],
  stats: {
    defenseRating: 2, armorCapacityProvided: 4,
    effects: ['Bonus Edge on Stealth tests to hide while active.'],
    wirelessBonuses: ['+2 Defense Rating while active.'],
  },
});
// NOT referenceOnly: armorCapacityProvided is what actually enables
// the environmental-adaptation / chemical-seal mods this effect names.
const full_body_armor = clothingArmor({
  id: 'full_body_armor', label: 'Full Body Armor', cost: 2000, availability: 4, legality: 'licensed',
  description: 'Military and security heavy-duty gear — intimidating, and it draws attention.',
  tags: ['armor_item'],
  stats: {
    defenseRating: 5, armorCapacityProvided: 10,
    effects: ['Modifiable for environmental adaptation or a full chemical seal.'],
    defaultAttachments: ['full_body_armor_helmet'],
  },
});
// Availability is "—" in the source table (not a stated number) — the
// row prices the bundled helmet separately from the suit it ships with,
// rather than as its own purchasable Availability-rated item. Left null
// rather than guessing.
const full_body_armor_helmet = clothingArmor({ id: 'full_body_armor_helmet', label: 'Full Body Armor Helmet', cost: 500, availability: null, description: 'The helmet included with Full Body Armor, priced separately.', tags: ['armor_item'], stats: { defenseRating: 2, armorCapacityProvided: 6 } });
const lined_coat = clothingArmor({
  id: 'lined_coat', label: 'Lined Coat', cost: 900, availability: 2,
  description: 'A popular armored duster.',
  referenceOnly: true,
  tags: ['armor_item'],
  // DIRECTION CORRECTED (pass 2). Source reads "provides a bonus Edge
  // AGAINST tests to spot items hidden underneath" — Edge "against" a
  // test is Edge on the RESISTING side. The wearer is the one hiding
  // things under the coat, so the wearer holds the Edge when someone
  // else's Perception test comes looking. The old wording handed it to
  // the searcher, which was backwards.
  stats: {
    defenseRating: 3, armorCapacityProvided: 7,
    effects: ['The wearer gains bonus Edge resisting Perception tests to spot items hidden underneath the coat.'],
  },
});
const urban_explorer_jumpsuit = clothingArmor({
  id: 'urban_explorer_jumpsuit', label: 'Urban Explorer Jumpsuit', cost: 800, availability: 2,
  description: 'Armored "flats" for couriers, athletes, and freerunners.',
  referenceOnly: true,
  tags: ['armor_item'],
  // RESOLVED: `biomonitor` is a real item in augmentations.js, so the
  // jumpsuit's built-in one is now a real reference rather than prose.
  // The music player has no catalog equivalent and stays an effect.
  stats: {
    defenseRating: 3, armorCapacityProvided: 6,
    effects: ['Includes a built-in music player.'],
    defaultAttachments: ['biomonitor'],
  },
});

// ---- Armor Mods ----
// NOTE: the source table's Availability column is malformed for these
// four (only Capacity + Cost values present, Availability missing) —
// left as null rather than guessing a number.

const armor_chemical_protection = clothingArmor({
  id: 'armor_chemical_protection', label: 'Chemical Protection', cost: null, costPerRating: 250, availability: null,
  referenceOnly: true,
  tags: ['armor_mod'],
  stats: {
    ratingRange: [1, 6], armorCapacityUsed: 3,
    effects: [
      'Neutralizes the Corrosive status a number of times equal to its Rating, then wears out.',
      'Applies against Contact-vector chemical attacks only.',
    ],
  },
});
const armor_chemical_seal = clothingArmor({
  id: 'armor_chemical_seal', label: 'Chemical Seal', cost: 3000, availability: 5, wireless: true,
  description: 'An airtight overlay with its own seals and cuffs.',
  referenceOnly: true,
  tags: ['armor_mod'],
  stats: {
    armorCapacityUsed: 6,
    effects: [
      'Blocks all Contact- and Inhalation-vector chemical statuses for up to 1 hour of total use.',
      'Neutralizes Corrosive 6 times before wearing out.',
      'Full Body Armor only.',
    ],
    wirelessBonuses: ['Activating the seal becomes a Minor Action instead of a Major Action.'],
  },
});
const armor_cold_resistance = clothingArmor({
  id: 'armor_cold_resistance', label: 'Cold Resistance', cost: null, costPerRating: 250, availability: null,
  referenceOnly: true,
  tags: ['armor_mod'],
  stats: { ratingRange: [1, 6], armorCapacityUsed: 3, effects: ['Cancels the Chilled status a number of times equal to its Rating, then wears out.'] },
});
const armor_fire_resistance = clothingArmor({
  id: 'armor_fire_resistance', label: 'Fire Resistance', cost: null, costPerRating: 250, availability: null,
  referenceOnly: true,
  tags: ['armor_mod'],
  stats: { ratingRange: [1, 6], armorCapacityUsed: 3, effects: ['Cancels the Burning status a number of times equal to its Rating, then wears out.'] },
});
const armor_electricity_resistance = clothingArmor({
  id: 'armor_electricity_resistance', label: 'Electricity Resistance', cost: null, costPerRating: 250, availability: null,
  referenceOnly: true,
  tags: ['armor_mod'],
  stats: { ratingRange: [1, 6], armorCapacityUsed: 3, effects: ['Cancels the Zapped status a number of times equal to its Rating, then wears out.'] },
});

// ---- DragonSilk / DragonThread ----
// TWO BUGS FIXED THIS PASS, both silent:
//
//  (a) These four were the ONLY items in the catalog using
//      `capacityProvided`. That field is in neither the armor pool
//      (`armorCapacityProvided`) nor the device pool
//      (`deviceCapacityProvided`), and formatCapacity() doesn't read it
//      either — so their Capacity rendered as "—" AND contributed
//      nothing to any pool. They're armor, so: armorCapacityProvided.
//      Wrinkle 7's capacity split above evidently missed this block.
//  (b) They carried `tags: ['armor', 'clothing']` while every other
//      armor item in the file uses `['armor_item']`. 'armor' is the
//      CATEGORY, not a tag used anywhere, so tag-based filtering
//      skipped these four entirely. Now ['armor_item'].

const dragonsilk_clothing = clothingArmor({
  id: 'dragonsilk_clothing', label: 'DragonSilk Clothing',
  referenceOnly: true,
  tags: ['armor_item', 'clothing'],
  cost: 5000, availability: 6,
  description: "Century Dynamics Interactive Media's softer fabric variant, woven into dresses, shirts, and fine attire.",
  stats: {
    defenseRating: 1, armorCapacityProvided: 8,
    effects: ['Shifts randomly through a red-orange or blue-violet spectrum. No thermochromic property.'],
  },
});

const dragonthread_vest = clothingArmor({
  id: 'dragonthread_vest', label: 'DragonThread Vest',
  referenceOnly: true,
  tags: ['armor_item', 'clothing'],
  cost: 2000, availability: 4,
  description: 'Kinetically absorptive fibers in a thermochromic weave. Available in blue, red, or green.',
  stats: { defenseRating: 3, armorCapacityProvided: 8, effects: ['Shifts color with ambient temperature.'] },
});

const dragonthread_jacket = clothingArmor({
  id: 'dragonthread_jacket', label: 'DragonThread Jacket',
  referenceOnly: true,
  tags: ['armor_item', 'clothing'],
  cost: 3000, availability: 4,
  description: 'As DragonThread Vest, jacket cut.',
  stats: { defenseRating: 3, armorCapacityProvided: 10, effects: ['Shifts color with ambient temperature.'] },
});

const dragonthread_duster = clothingArmor({
  id: 'dragonthread_duster', label: 'DragonThread Duster',
  referenceOnly: true,
  tags: ['armor_item', 'clothing'],
  cost: 4000, availability: 5,
  description: 'As DragonThread Vest, duster cut.',
  stats: { defenseRating: 3, armorCapacityProvided: 12, effects: ['Shifts color with ambient temperature.'] },
});

// ---- Helmets & Shields ----

// Helmet capacity is device capacity, not armor capacity. The source
// prose is explicit: a helmet's Capacity is "for accessories (trode
// nets, vision enhancements)," the same category of thing
// deviceCapacityUsed items consume everywhere else in this file
// (Visual Enhancement accessories, RFID tags). It just happened to sit
// in the same stat table as Defense Rating/Capacity/Avail/Cost as other
// armor, which made it look armor-capacity-shaped at a glance.
const helmet = clothingArmor({
  id: 'helmet', label: 'Helmet', cost: 200, availability: 1,
  description: 'Available in a wide variety of styles. Its Capacity takes accessories — trode nets, vision enhancements, and the like.',
  tags: ['helmet_shield'], stats: { defenseRating: 1, deviceCapacityProvided: 4 },
});
// D3 (pass 2): `skill` moved from stats to the item root on both
// shields, matching every weapon in firearms_explosives.js and
// melee_thrown.js.
const ballistic_shield = clothingArmor({
  id: 'ballistic_shield', label: 'Ballistic Shield', cost: 900, availability: 4,
  skill: 'close_combat',
  description: 'SWAT and urban-combat standard, with a clear plasteel window.',
  referenceOnly: true,
  tags: ['helmet_shield'],
  stats: {
    defenseRating: 2, armorCapacityProvided: 2, damageValue: '2S',
    attackRatings: [4, null, null, null, null],
    effects: ['Built-in ladder frame for climbing short obstacles.'],
  },
});
// NOT referenceOnly: damageValue + attackRatings + root skill are what
// make the electrical Close Combat attack this effect names real.
const riot_shield = clothingArmor({
  id: 'riot_shield', label: 'Riot Shield', cost: 1200, availability: 4, wireless: true,
  skill: 'close_combat',
  description: 'The "taser shield" cousin of the ballistic model.',
  tags: ['helmet_shield'],
  stats: {
    defenseRating: 2, armorCapacityProvided: 2, damageValue: '4S(e)',
    attackRatings: [4, null, null, null, null],
    effects: [
      'Adds an electrical Close Combat attack with Stun Baton characteristics.',
      '10 charges; recharges 1 per 10 seconds while plugged in.',
    ],
    wirelessBonuses: ['Recharges via induction at 1 charge per hour, without needing to be plugged in.'],
  },
});

// ---- Electronics Accessories ----
// "All peripheral accessories are wireless" is a blanket rule stated
// directly by the chapter — every item here uses electronics_w, not a
// judgment call.

const ar_gloves = electronics_w({
  id: 'ar_gloves', label: 'AR Gloves', cost: 150, availability: 1,
  description: 'Thin haptic gloves for working AR by hand.',
  referenceOnly: true,
  tags: ['electronics_accessory'],
  stats: {
    deviceRating: 3,
    effects: [
      'Manual AR interaction — "touch" and "hold" AROs.',
      'Tactile force feedback, plus weight and temperature sensing.',
    ],
    wirelessBonuses: ['Can perform a chemical analysis of held objects.'],
  },
});
const electronic_paper = electronics_w({ id: 'electronic_paper', label: 'Electronic Paper', cost: 5, availability: 1, description: 'A foldable, rollable ultrathin display.', referenceOnly: true, tags: ['electronics_accessory'], stats: { deviceRating: 1, effects: ['Writable and erasable wirelessly.'] } });
const printer = electronics_w({ id: 'printer', label: 'Printer', cost: 25, availability: 1, description: 'Full-color hardcopy printing with attached paper supply.', tags: ['electronics_accessory'], stats: { deviceRating: 3 } });
const satellite_link = electronics_w({
  id: 'satellite_link', label: 'Satellite Link', cost: 500, availability: 3,
  description: 'Includes a portable dish.',
  referenceOnly: true,
  tags: ['electronics_accessory'],
  stats: {
    deviceRating: 4,
    effects: [
      'Uplinks to LEO satellites for Matrix access where no local network exists.',
      'Caps the distance-based Noise penalty at -5.',
    ],
  },
});
// Availability shown as "—" in source for the base Sim Module (only the
// Hot Sim upgrade has a stated Availability, "2(I)") — left null rather
// than guessing a number.
const sim_module = electronics_w({
  id: 'sim_module', label: 'Sim Module', cost: 100, availability: null,
  referenceOnly: true,
  tags: ['electronics_accessory'],
  stats: {
    effects: [
      'Provides the full simsense, AR, and VR experience via DNI.',
      'Can be upgraded for hot sim.',
    ],
  },
});
const sim_module_hot_sim = electronics_w({
  id: 'sim_module_hot_sim', label: 'Sim Module (Hot Sim)', cost: 250, availability: 2, legality: 'illegal',
  referenceOnly: true,
  tags: ['electronics_accessory'],
  stats: { effects: ['Full VR range, at real brain-frying risk.'] },
});
// legality corrected null <- 'licensed': the source Availability column
// for Simrig is a plain "4" with no "(L)" suffix, unlike items in this
// same file that ARE licensed (e.g. jammer_area "4(L)"). Flagging this
// since real-world SR6 books do sometimes license simrigs — worth a
// second look if that's a sourcebook errata rather than an intentional
// omission.
const simrig_accessory = electronics_w({
  id: 'simrig_accessory', label: 'Simrig (Accessory)', cost: 1000, availability: 4, legality: null,
  description: 'The external version — see also the implanted headware version in GEAR_AUGMENTATIONS.js.',
  referenceOnly: true,
  tags: ['electronics_accessory'],
  stats: {
    deviceRating: 3,
    effects: [
      'Records simsense experience data, sensory and emotive, from the wearer.',
      'Requires a working sim module and DNI to record.',
    ],
  },
});
const subvocal_mic = electronics_w({
  id: 'subvocal_mic', label: 'Subvocal Microphone', cost: 50, availability: 2,
  description: 'An adhesive throat patch.',
  referenceOnly: true,
  tags: ['electronics_accessory'],
  stats: {
    deviceRating: 3,
    effects: [
      'Picks up subvocalized speech.',
      'Eavesdroppers can neither gain nor spend Edge on their Perception test.',
    ],
  },
});
const trid_projector = electronics_w({
  id: 'trid_projector', label: 'Trid Projector', cost: 200, availability: 1,
  description: 'Convincingly realistic only with real artistic effort behind it.',
  referenceOnly: true,
  tags: ['electronics_accessory'],
  stats: { deviceRating: 3, effects: ['Projects a 5m-cube 3D hologram.'] },
});
const trodes = electronics_w({ id: 'trodes', label: 'Trodes', cost: 70, availability: 1, description: 'An electrode and ultrasound net, in any headwear form factor.', referenceOnly: true, tags: ['electronics_accessory'], stats: { deviceRating: 3, effects: ['Provides DNI.'] } });

// ---- RFID Tags (sold per 10) ----
// Datachip explicitly is NOT wireless ("needs a universal data
// connector"); the other three carry Device Ratings and/or explicit
// Matrix Perception language.

const standard_tags = electronics_w({ id: 'standard_tags', label: 'Standard Tags', cost: null, costPerUnit: 1, unitQuantity: 10, availability: 1, description: 'Tiny chips embedded in nearly every product.', referenceOnly: true, tags: ['rfid'], stats: { deviceRating: 1, effects: ['Used for geo-tagging, tracking, and access control.'] } });
const datachip = electronics({
  id: 'datachip', label: 'Datachip', cost: null, costPerUnit: 5, unitQuantity: 10, availability: 1,
  description: 'A 2cm x 6cm slab of offline storage.',
  referenceOnly: true,
  tags: ['rfid'],
  stats: { deviceRating: 1, effects: ['No wireless — requires a universal data connector to read or write.'] },
});
const security_stealth_tags = electronics_w({
  id: 'security_stealth_tags', label: 'Security/Stealth Tags', cost: null, costPerUnit: 10, unitQuantity: 10, availability: 2,
  referenceOnly: true,
  tags: ['rfid'],
  stats: {
    deviceRating: 3,
    effects: [
      'Usually subdermally implanted, for tracking people.',
      'EMP-hardened against tag erasers.',
      'The stealth variant runs silent, rolling 10 dice on the opposed Matrix Perception test.',
    ],
  },
});
const sensor_tags = electronics_w({
  id: 'sensor_tags', label: 'Sensor Tags', cost: null, costPerUnit: 40, unitQuantity: 10, availability: 2,
  referenceOnly: true,
  tags: ['rfid'],
  stats: {
    deviceRating: 2,
    effects: [
      'Records 24 hours of data from a linked sensor (Rating 2 max, sold separately), then shuts off or overwrites.',
      'Retrieval requires proximity within 1m unless wireless is enabled.',
    ],
    wirelessBonuses: [
      'Enables real-time monitoring, for the owner only.',
      'Recordings can be transferred remotely.',
    ],
  },
});

// ---- Communications and Countermeasures ----
// All four of jammers/tag_eraser/white_noise_generator/data_tap get
// `wireless: true` because the source gives each an explicit "Wireless
// bonus:" line — per the wireless-bonus data rule, that's sufficient
// regardless of whether slaving one to a PAN makes practical sense.
// data_tap in particular is physically cable-based but still has a
// wireless-triggered self-destruct function. micro_transceiver
// explicitly discusses slaving; bug_scanner performs a Matrix
// Perception test as its core function.

const bug_scanner = electronics_w({
  id: 'bug_scanner', label: 'Bug Scanner', cost: 200, availability: 3,
  referenceOnly: true,
  tags: ['comms_countermeasure'],
  stats: {
    effects: [
      'Locates wireless devices within 20m by signal strength.',
      'Electronics + Logic as an opposed Matrix Perception test; any net hit finds it.',
    ],
    wirelessBonuses: [
      '+2 free hits.',
      'The opposed test only needs to tie the target rather than beat it.',
    ],
  },
});
const data_tap = electronics_w({
  id: 'data_tap', label: 'Data Tap', cost: 300, availability: 2,
  description: 'A slim clamp that bites onto a data cable.',
  referenceOnly: true,
  tags: ['comms_countermeasure'],
  stats: {
    effects: [
      'Gives a direct connection to the devices on either end of the cable.',
      'Noise no longer applies while attached.',
      'Removable without damaging the cable.',
    ],
    wirelessBonuses: [
      'Can self-destruct on command as a Minor Action.',
      'Choose whether self-destruction damages the cable or just severs the tap\u2019s own connection.',
    ],
  },
});
const headjammer = electronics({
  id: 'headjammer', label: 'Headjammer', cost: null, costPerRating: 150, availability: 5, legality: 'illegal',
  referenceOnly: true,
  tags: ['comms_countermeasure'],
  stats: {
    ratingRange: [1, 6],
    effects: [
      'Neutralizes an implanted commlink or cyberdeck the way any jammer would.',
      'Limited to that one specific device.',
    ],
  },
});
const jammer_area = electronics_w({
  id: 'jammer_area', label: 'Jammer, Area', cost: null, costPerRating: 200, availability: 4, legality: 'licensed',
  referenceOnly: true,
  tags: ['comms_countermeasure'],
  stats: {
    ratingRange: [1, 6],
    effects: [
      'Floods a spherical area with jamming noise equal to its Device Rating.',
      '-1 rating per 10m from center.',
    ],
    wirelessBonuses: ['Can exempt specific devices or personas you designate from the jamming effect.'],
  },
});
const jammer_directional = electronics_w({
  id: 'jammer_directional', label: 'Jammer, Directional', cost: null, costPerRating: 200, availability: 4, legality: 'licensed',
  referenceOnly: true,
  tags: ['comms_countermeasure'],
  stats: {
    ratingRange: [1, 6],
    effects: [
      'Floods a 30-degree cone with jamming noise.',
      '-1 rating per 30m.',
    ],
    wirelessBonuses: ['Can exempt specific devices or personas you designate from the jamming effect.'],
  },
});
// D4 (pass 2): the "adhesive subvocal mic" half of this unit IS the
// standalone subvocal_mic item in this same file, and the price math
// supports it — a 50¥ item inside the 100¥ whole. Removable rather
// than builtIn: nothing in this item's stats has the mic's
// eavesdropper-Edge effect baked in.
const micro_transceiver = electronics_w({
  id: 'micro_transceiver', label: 'Micro-Transceiver', cost: 100, availability: 1,
  description: 'An earbud paired with an adhesive throat patch.',
  referenceOnly: true,
  tags: ['comms_countermeasure'],
  stats: {
    deviceRating: 2,
    effects: [
      'Short-range voice communication, out to 1km.',
      'Best slaved to something better for secure comms.',
    ],
    defaultAttachments: ['subvocal_mic'],
  },
});
const tag_eraser = electronics_w({
  id: 'tag_eraser', label: 'Tag Eraser', cost: 450, availability: 3,
  description: 'A handheld EMP wand.',
  referenceOnly: true,
  tags: ['comms_countermeasure'],
  stats: {
    effects: [
      'Delivers 10 boxes of Matrix damage to a device within 5mm.',
      'Too short-ranged for vehicles, most drones, maglocks, and cyberware.',
      '1 charge; fully recharges in 10 seconds while plugged in.',
    ],
    wirelessBonuses: ['Fully recharges via induction in an hour, without needing to be plugged in.'],
  },
});
const white_noise_generator = electronics_w({
  id: 'white_noise_generator', label: 'White Noise Generator', cost: null, costPerRating: 50, availability: 3,
  referenceOnly: true,
  tags: ['comms_countermeasure'],
  stats: {
    ratingRange: [1, 6],
    effects: [
      'Floods a Rating-meter radius with audio-surveillance-blocking noise.',
      'Imposes a -Rating penalty on Perception tests to overhear conversations in range.',
    ],
    wirelessBonuses: ['Triples the generator\u2019s effective radius.'],
  },
});

// ---- Software ----

const autosoft = software({ id: 'autosoft', label: 'Autosoft', cost: null, costPerRating: 500, availability: null, availabilityEqualsRating: true, description: 'Drone-operation program.', tags: ['software'], stats: { ratingRange: [1, 9] } });

// ---- Matrix Programs ----
// Real named programs, replacing two generic Cyberprogram stubs that
// used to sit here (removed this pass — they were already commented
// out and fully superseded). Confirmed against the actual Matrix
// chapter's Programs section. Flat cost-per-tier confirmed by the
// stubs' own prior values (60¥/Avail 1/legal for Basic, 250¥/Avail 4/
// illegal for Hacking) — every program in a tier costs the same, only
// the effect differs, same shape as the Tac-Apps in matrix_devices.js.
// matrixCapacityUsed: 1 — each loaded program consumes one Program
// Slot (`stats.matrixCapacityProvided` on the housing device), same
// provider/consumer relationship as every other Capacity pool.
//
// Signal Scrubber and Toolbox carry NO effects entries on purpose:
// their entire effect is already in deviceModifiers, and restating it
// would duplicate a structured field.

const program_baby_monitor = software({ id: 'program_baby_monitor', label: 'Baby Monitor', cost: 60, availability: 1, referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['Know your current Overwatch Score without needing an action.'] } });
const program_browse = software({ id: 'program_browse', label: 'Browse', cost: 60, availability: 1, referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['Matrix Search actions gain 1 Edge, which must be spent immediately on that action or it disappears.'] } });
const program_configurator = software({ id: 'program_configurator', label: 'Configurator', cost: 60, availability: 1, referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['Stores an alternate deck configuration; swap to it instead of manually changing two attributes.'] } });
const program_edit = software({ id: 'program_edit', label: 'Edit', cost: 60, availability: 1, referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['The Edit File action gains 1 Edge, which must be spent immediately or it vanishes.'] } });
const program_encryption = software({ id: 'program_encryption', label: 'Encryption', cost: 60, availability: 1, referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['+2 dice on the Encrypt File action.'] } });
const program_signal_scrubber = software({ id: 'program_signal_scrubber', label: 'Signal Scrubber', cost: 60, availability: 1, description: 'Cleans up a noisy connection.', tags: ['software'], stats: { matrixCapacityUsed: 1, deviceModifiers: { noise: -2 } } });
const program_toolbox = software({ id: 'program_toolbox', label: 'Toolbox', cost: 60, availability: 1, description: 'General-purpose utilities that keep the deck responsive.', tags: ['software'], stats: { matrixCapacityUsed: 1, deviceModifiers: { dataProcessing: 1 } } });
const program_virtual_machine = software({ id: 'program_virtual_machine', label: 'Virtual Machine', cost: 60, availability: 1, description: 'Runs programs inside a sandbox, at the cost of a thinner margin against attack.', referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, deviceModifiers: { matrixCapacityProvided: 2 }, effects: ['Take 1 extra unresisted box of Matrix damage when attacked.'] } });

const program_armor = software({ id: 'program_armor', label: 'Armor', cost: 250, availability: 4, legality: 'illegal', referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['+2 Defense Rating.'] } });
const program_biofeedback = software({ id: 'program_biofeedback', label: 'Biofeedback', cost: 250, availability: 4, legality: 'illegal', referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['Matrix attacks cause biofeedback damage — Stun in cold sim, Physical in hot sim.', 'Attack-linked.'] } });
const program_biofeedback_filter = software({ id: 'program_biofeedback_filter', label: 'Biofeedback Filter', cost: 250, availability: 4, legality: 'illegal', referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['Allows Device Rating or Body to soak Matrix damage.'] } });
const program_blackout = software({ id: 'program_blackout', label: 'Blackout', cost: 250, availability: 4, legality: 'illegal', referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['As Biofeedback, but Stun damage only.', 'Attack-linked.'] } });
const program_decryption = software({ id: 'program_decryption', label: 'Decryption', cost: 250, availability: 4, legality: 'illegal', referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['+2 dice on the Crack File action.'] } });
const program_defuse = software({ id: 'program_defuse', label: 'Defuse', cost: 250, availability: 4, legality: 'illegal', referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['Allows Device Rating or Body to soak Data Bomb damage.'] } });
const program_exploit = software({ id: 'program_exploit', label: 'Exploit', cost: 250, availability: 4, legality: 'illegal', referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ["Reduces the hacking target's Defense Rating by 2."] } });
const program_fork = software({ id: 'program_fork', label: 'Fork', cost: 250, availability: 4, legality: 'illegal', referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['Hit two targets with a single Matrix action, without splitting your dice pool.'] } });
const program_lockdown = software({ id: 'program_lockdown', label: 'Lockdown', cost: 250, availability: 4, legality: 'illegal', referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['Inflicting Matrix damage also causes link-lock.'] } });
const program_overclock = software({ id: 'program_overclock', label: 'Overclock', cost: 250, availability: 4, legality: 'illegal', referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['+2 dice to a Matrix action, one of which must be the Wild Die.'] } });
const program_stealth = software({ id: 'program_stealth', label: 'Stealth', cost: 250, availability: 4, legality: 'illegal', referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['Use-it-or-lose-it Edge on Hide actions.', 'Sleaze-linked.'] } });
const program_trace = software({ id: 'program_trace', label: 'Trace', cost: 250, availability: 4, legality: 'illegal', referenceOnly: true, tags: ['software'], stats: { matrixCapacityUsed: 1, effects: ['Use-it-or-lose-it Edge on Trace Icon actions.', 'Sleaze-linked.'] } });

const datasoft = software({
  id: 'datasoft', label: 'Datasoft', cost: 120, availability: 2,
  description: 'A narrow Knowledge-skill database — one gang, say, rather than all of Seattle\u2019s.',
  referenceOnly: true,
  tags: ['software'], stats: { effects: ['Used exactly like a Knowledge skill.'] },
});
const mapsoft = software({
  id: 'mapsoft', label: 'Mapsoft', cost: 100, availability: 2,
  referenceOnly: true,
  tags: ['software'],
  stats: {
    effects: [
      'Detailed data — streets, listings, topography, census, GPS, environment — for a ~5,000 sq km area.',
      'Includes route planning.',
    ],
  },
});
const shopsoft = software({
  id: 'shopsoft', label: 'Shopsoft', cost: 150, availability: 2,
  description: 'Comparison-shopping software covering pricing and reviews for one goods category.',
  referenceOnly: true,
  tags: ['software'], stats: { effects: ['+1 dice pool on Matrix Search tests to buy or sell that category.'] },
});
const activesofts = software({
  id: 'activesofts', label: 'Activesofts', cost: null, costPerRating: 5000, availability: 4,
  referenceOnly: true,
  tags: ['software'],
  stats: {
    ratingRange: [1, 6],
    effects: [
      'Replaces non-Magic, non-Resonance active skills.',
      'The number usable at once is capped by skillwire Rating.',
      'Requires a skillwire.',
    ],
  },
});
const knowsofts = software({
  id: 'knowsofts', label: 'Knowsofts', cost: 2500, availability: 2,
  referenceOnly: true,
  tags: ['software'],
  stats: {
    effects: [
      'Replaces Knowledge skills. No Rating.',
      'The number usable at once is capped by skilljack Rating.',
      'Requires a skilljack.',
    ],
  },
});
const linguasofts = software({
  id: 'linguasofts', label: 'Linguasofts', cost: null, costPerRating: 1500, availability: 1,
  referenceOnly: true,
  tags: ['software'],
  stats: {
    ratingRange: [1, 4],
    effects: [
      'Replaces language skills.',
      'Rating maps to proficiency: 1 basic, 2 specialist, 3 expert, 4 expert (cap).',
      'The number usable at once is capped by skilljack Rating.',
      'Requires a skilljack.',
    ],
  },
});
const tutorsoft = software({
  id: 'tutorsoft', label: 'Tutorsoft', cost: null, costPerRating: 400, availability: null, availabilityFormula: 'Rating/3',
  description: 'A virtual private tutor.',
  referenceOnly: true,
  tags: ['software'],
  stats: {
    ratingRange: [1, 6],
    effects: [
      'Makes Instruction tests with a dice pool of Rating x 2.',
      'Cannot teach Magic or Resonance skills.',
    ],
  },
});

// ---- ID and Credit ----
// The five credsticks differ only in cost and maxValue; their shared
// mechanical text is hoisted to CREDSTICK_EFFECTS above.

const credstick_standard = idGear({ id: 'credstick_standard', label: 'Certified Credstick, Standard', cost: 5, availability: 1, referenceOnly: true, tags: ['id_credit'], stats: { maxValue: 5000, effects: CREDSTICK_EFFECTS } });
const credstick_silver = idGear({ id: 'credstick_silver', label: 'Certified Credstick, Silver', cost: 20, availability: 1, referenceOnly: true, tags: ['id_credit'], stats: { maxValue: 20000, effects: CREDSTICK_EFFECTS } });
const credstick_gold = idGear({ id: 'credstick_gold', label: 'Certified Credstick, Gold', cost: 100, availability: 2, referenceOnly: true, tags: ['id_credit'], stats: { maxValue: 100000, effects: CREDSTICK_EFFECTS } });
const credstick_platinum = idGear({ id: 'credstick_platinum', label: 'Certified Credstick, Platinum', cost: 500, availability: 3, referenceOnly: true, tags: ['id_credit'], stats: { maxValue: 500000, effects: CREDSTICK_EFFECTS } });
const credstick_ebony = idGear({ id: 'credstick_ebony', label: 'Certified Credstick, Ebony', cost: 1000, availability: 5, referenceOnly: true, tags: ['id_credit'], stats: { maxValue: 1000000, effects: CREDSTICK_EFFECTS } });
const fake_sin = idGear({
  id: 'fake_sin', label: 'Fake SIN', cost: null, costPerRating: 2500, availability: 4, legality: 'illegal',
  description: 'Most runners keep two or more — a clean one for everyday life, a shadier one for runs.',
  referenceOnly: true,
  tags: ['id_credit'], stats: { ratingRange: [1, 6], effects: ['Rating is tested against verification systems.'] },
});
const fake_license = idGear({
  id: 'fake_license', label: 'Fake License', cost: null, costPerRating: 200, availability: 4, legality: 'illegal',
  referenceOnly: true,
  tags: ['id_credit'],
  stats: {
    ratingRange: [1, 6],
    effects: [
      'Required for anything that needs a license (L).',
      'Attaches to a specific fake SIN; its Rating is capped by that SIN\u2019s Rating.',
    ],
  },
});

// ---- Tools ----
// Previously misused idGear as the factory (worked, since it's the same
// shape, but semantically confusing) — now a real tool() factory.

const electronics_kit = tool({
  id: 'electronics_kit', label: 'Kit', cost: 500, availability: 1,
  description: 'Portable, for basic repairs.',
  referenceOnly: true,
  tags: ['electronics_tool'],
  stats: { effects: ["Without at least a kit in the field, some skills can't be used actively at all."] },
});
const electronics_shop = tool({
  id: 'electronics_shop', label: 'Shop', cost: 5000, availability: 4,
  description: 'Van-transportable, and considerably more advanced than a kit.',
  referenceOnly: true,
  tags: ['electronics_tool'],
  stats: { effects: ['+1 dice pool for on-site tests.', 'Stocked with standard spare parts.'] },
});
const electronics_facility = tool({
  id: 'electronics_facility', label: 'Facility', cost: 50000, availability: 7,
  description: 'The most advanced tier.',
  referenceOnly: true,
  tags: ['electronics_tool'],
  stats: {
    effects: [
      '+1 dice pool for on-site tests.',
      'Stocked with standard spare parts.',
      'Bonus Edge usable on Extended tests performed within it.',
      'Building-bound and immobile.',
    ],
  },
});

// ---- Optical and Imaging Devices ----
// Contacts explicitly "must be wireless" — extended to the other
// Capacity-bearing imaging housings in the same family. binoculars_optical
// is explicitly the non-smart, optical-only version. endoscope/periscope/
// mage_sight_goggles are physical/mechanical (fiber cable, mirror tube,
// rope-linked lens) — not wireless.

const binoculars = opticalDeviceWireless({ id: 'binoculars', label: 'Binoculars', cost: null, costPerCapacity: 50, availability: 1, referenceOnly: true, tags: ['optical_device'], stats: { deviceCapacityProvidedRange: [1, 3], effects: ['Built-in vision magnification.'] } });
const binoculars_optical = opticalDevice({
  id: 'binoculars_optical', label: 'Binoculars, Optical', cost: 50, availability: 1,
  description: 'The non-smart, optical-only version.',
  referenceOnly: true,
  tags: ['optical_device'],
  stats: { effects: ['Image link only — takes no other enhancements.', 'Spellcasters can use these to cast at distant targets.'] },
});
// NOT referenceOnly: deviceCapacityProvidedRange drives the
// "upgradeable with vision and audio enhancements" effect.
const camera = opticalDeviceWireless({ id: 'camera', label: 'Camera', cost: null, costPerCapacity: 100, availability: 1, tags: ['optical_device'], stats: { deviceCapacityProvidedRange: [1, 6], effects: ['Captures stills, video, and trideo.', 'Upgradeable with vision and audio enhancements.'] } });
const micro_camera = opticalDeviceWireless({ id: 'micro_camera', label: 'Micro-Camera', cost: 100, availability: 1, description: 'The fixed-Capacity 1 version of the standard camera.', referenceOnly: true, tags: ['optical_device'], stats: { deviceCapacityProvided: 1, effects: ['Captures stills, video, and trideo.'] } });
const contacts = opticalDeviceWireless({
  id: 'contacts', label: 'Contacts', cost: null, costPerCapacity: 200, availability: 2,
  description: 'Worn directly on the eyes.',
  referenceOnly: true,
  tags: ['optical_device'],
  stats: { deviceCapacityProvidedRange: [1, 3], effects: ['Nearly undetectable in use.', 'Must be wireless.'] },
});
const endoscope = opticalDevice({ id: 'endoscope', label: 'Endoscope', cost: 250, availability: 3, referenceOnly: true, tags: ['optical_device'], stats: { effects: ['A 1m+ fiber-optic cable for looking around corners, under doors, and into tight spaces.'] } });
const glasses = opticalDeviceWireless({ id: 'glasses', label: 'Glasses', cost: null, costPerCapacity: 100, availability: 1, description: 'Lightweight frames, hard to distinguish from ordinary prescription or sunglasses.', tags: ['optical_device'], stats: { deviceCapacityProvidedRange: [1, 4] } });
const goggles = opticalDeviceWireless({ id: 'goggles', label: 'Goggles', cost: null, costPerCapacity: 50, availability: 1, description: 'Bulky and strapped on, but hard to dislodge.', tags: ['optical_device'], stats: { deviceCapacityProvidedRange: [1, 6] } });
const imaging_scope = opticalDeviceWireless({ id: 'imaging_scope', label: 'Imaging Scope', cost: 300, availability: 1, description: 'A vision enhancer and display, usually top-mounted on a weapon.', tags: ['optical_device'], stats: { deviceCapacityProvided: 3 } });
const monocle = opticalDeviceWireless({ id: 'monocle', label: 'Monocle', cost: null, costPerCapacity: 120, availability: 1, description: 'On a headband or helmet flip-down arm, or an old-fashioned chain with smart adhesive.', tags: ['optical_device'], stats: { deviceCapacityProvidedRange: [1, 4] } });
const mage_sight_goggles = opticalDevice({
  id: 'mage_sight_goggles', label: 'Mage Sight Goggles', cost: 3000, availability: 5,
  description: 'Heavy goggles on a myomeric rope, ending in a fiber-optic lens head.',
  referenceOnly: true,
  tags: ['optical_device'],
  stats: {
    effects: [
      'Lets a spellcaster get line of sight while staying out of sight.',
      'Rope comes in 10m, 20m, or 30m lengths.',
    ],
  },
});
const periscope = opticalDevice({ id: 'periscope', label: 'Periscope', cost: 50, availability: 2, description: 'An L-shaped dual-mirror tube.', referenceOnly: true, tags: ['optical_device'], stats: { effects: ['Look, shoot, or cast around corners.'] } });

// ---- Visual Enhancements ----
// External accessory versions — see GEAR_AUGMENTATIONS.js for the
// same-named implant versions (priced higher — Essence + surgery). All
// wireless — AR/vision-tech installed into the housings above.

const flare_compensation_accessory = opticalDeviceWireless({ id: 'flare_compensation_accessory', label: 'Flare Compensation (Accessory)', cost: 250, availability: 1, referenceOnly: true, tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 1, effects: ['Blocks blinding flashes and glare.', 'Bonus Edge if the opposition lacks the same.'] } });
const image_link_accessory = opticalDeviceWireless({ id: 'image_link_accessory', label: 'Image Link (Accessory)', cost: 25, availability: 1, referenceOnly: true, tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 1, effects: ['Displays visual information — AROs, text, images, video — in your field of vision.', 'Required to truly see AR.'] } });
const low_light_vision_accessory = opticalDeviceWireless({ id: 'low_light_vision_accessory', label: 'Low-Light Vision (Accessory)', cost: 500, availability: 2, referenceOnly: true, tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 1, effects: ['Normal vision down to starlight levels.', 'Bonus Edge if the opposition lacks it.'] } });
// legality corrected null <- 'licensed': source Availability column for
// Smartlink is a plain "2", no "(L)" suffix, unlike smartlink-adjacent
// weapon accessories elsewhere in the catalog that ARE marked licensed.
// Flagging — real-world SR6 core book usually licenses smartlink
// systems, so this may be an inconsistency worth confirming against a
// second source rather than a deliberate omission.
const smartlink_accessory = opticalDeviceWireless({
  id: 'smartlink_accessory', label: 'Smartlink (Accessory)', cost: 2000, availability: 2, legality: null,
  description: 'The vision half of a smartgun system.',
  referenceOnly: true,
  tags: ['visual_enhancement'],
  stats: { deviceCapacityUsed: 2, effects: ['Displays range, ammo status, and a targeting dot in your field of view.'] },
});
const thermographic_vision_accessory = opticalDeviceWireless({ id: 'thermographic_vision_accessory', label: 'Thermographic Vision (Accessory)', cost: 500, availability: 2, referenceOnly: true, tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 1, effects: ['Infrared and heat-pattern vision.', 'Bonus Edge if the opposition lacks it.'] } });
const ultrasound_link = opticalDeviceWireless({ id: 'ultrasound_link', label: 'Ultrasound Link', cost: 300, availability: 1, referenceOnly: true, tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 1, effects: ['Visual overlay for an ultrasound accessory.'] } });
const vision_enhancement_accessory = opticalDeviceWireless({ id: 'vision_enhancement_accessory', label: 'Vision Enhancement (Accessory)', cost: 500, availability: 1, referenceOnly: true, tags: ['visual_enhancement'], stats: { deviceCapacityUsed: 2, effects: ['+1 dice pool on all visual Perception tests.'] } });
const vision_magnification_accessory = opticalDeviceWireless({
  id: 'vision_magnification_accessory', label: 'Vision Magnification (Accessory)', cost: 250, availability: 1,
  referenceOnly: true,
  tags: ['visual_enhancement'],
  stats: {
    deviceCapacityUsed: 1,
    effects: [
      'Up to 50x zoom.',
      '+2 Attack Rating at Medium, Far, and Extreme range, where the weapon already has a nonzero rating there.',
    ],
  },
});

export const GEAR_ARMOR_ELECTRONICS = {
  clothing, electrochromic_feature, feedback_feature,
  synthleather_jacket, actioneer_business_clothes, armor_clothing, armor_jacket, armor_vest, chameleon_suit, full_body_armor, full_body_armor_helmet, lined_coat, urban_explorer_jumpsuit,
  armor_chemical_protection, armor_chemical_seal, armor_cold_resistance, armor_fire_resistance, armor_electricity_resistance,
  dragonsilk_clothing, dragonthread_vest, dragonthread_jacket, dragonthread_duster,

  helmet, ballistic_shield, riot_shield,
  ar_gloves, electronic_paper, printer, satellite_link, sim_module, sim_module_hot_sim, simrig_accessory, subvocal_mic, trid_projector, trodes,
  standard_tags, datachip, security_stealth_tags, sensor_tags,
  bug_scanner, data_tap, headjammer, jammer_area, jammer_directional, micro_transceiver, tag_eraser, white_noise_generator,
  autosoft,

  program_baby_monitor, program_browse, program_configurator, program_edit, program_encryption, program_signal_scrubber, program_toolbox, program_virtual_machine,
  program_armor, program_biofeedback, program_biofeedback_filter, program_blackout, program_decryption, program_defuse, program_exploit, program_fork, program_lockdown, program_overclock, program_stealth, program_trace,

  datasoft, mapsoft, shopsoft, activesofts, knowsofts, linguasofts, tutorsoft,
  credstick_standard, credstick_silver, credstick_gold, credstick_platinum, credstick_ebony, fake_sin, fake_license,
  electronics_kit, electronics_shop, electronics_facility,
  binoculars, binoculars_optical, camera, micro_camera, contacts, endoscope, glasses, goggles, imaging_scope, monocle, mage_sight_goggles, periscope,
  flare_compensation_accessory, image_link_accessory, low_light_vision_accessory, smartlink_accessory, thermographic_vision_accessory, ultrasound_link, vision_enhancement_accessory, vision_magnification_accessory,
};

export const GEAR_ARMOR_ELECTRONICS_IDS = Object.keys(GEAR_ARMOR_ELECTRONICS);
