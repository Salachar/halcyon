// Firearms, Accessories, Ammo & Explosives catalog — the largest gear
// chapter. Same envelope as GEAR.js, using the weapon-family stats shape
// established in GEAR_MELEE_THROWN.js (damageValue, attackRatings,
// skill), extended with `modes` and `ammo` for real guns.
//
// RE-CHECKED against 13b-gear-firearms-explosives.md (Gear Part 2, pp.
// 251-264) in full as part of the wireless-bonus/capacity verification
// pass. This file was flagged "already done" going into that pass, but
// like melee_thrown.js, the full source read found it was NOT actually
// complete — and by a much wider margin. Two systemic misses, both
// corrected below:
//
// A. THE UNIVERSAL FIREARM BONUS. The very first line of this chapter
//    states: "Wireless bonus (all firearms): every modern gun is
//    wireless-equipped with a digital ammo counter and loaded-ammo-type
//    ARO; with DNI, gain a bonus Minor Action on any turn you eject a
//    clip or change fire modes." That's not a per-item callout to hunt
//    for — it's a blanket rule covering every Taser/Hold-out/Pistol/
//    SMG/Shotgun/Rifle/Machine Gun/Assault Cannon in the chapter. The
//    original pass only set `wireless: true` on specific standout
//    weapons (smartgun-equipped ones, a couple of explicit cases),
//    missing that the base bonus applies universally. Fixed by moving
//    `wireless: true` + the universal bonus text into the `firearm()`
//    factory itself, so every true-firearm item gets it by default;
//    `firearmWireless()` is now a no-op alias kept only so existing call
//    sites don't need touching. Individual weapons with genuinely
//    ADDITIONAL bonus text beyond the universal one (Defiance Super
//    Shock, Yamaha Pulsar I/II, Fichetti Tiffani Needler, Colt America
//    L36, Ruger Redhawk) list that extra text in their own
//    `stats.wirelessBonuses`, which the factory prepends the universal
//    entry to automatically.
//    NOTE: `exoticFirearm()` was deliberately NOT given this same
//    treatment — it's shared between two source subsections (Special
//    Weapons and Launchers) with their own separate, non-overlapping
//    blanket bonuses, so folding the ammo-counter text in there would
//    misapply it. Those items are handled individually instead.
// B. WHOLE SECTIONS with a blanket "Wireless bonus (all X):" line were
//    missed entirely, not just specific items within them: ALL 5 base
//    Grenades (link-trigger-via-commlink-ARO bonus), ALL 5 Rockets/
//    Missiles (link-trigger-without-DNI bonus), and ALL 5 Launchers
//    (their own link-trigger-without-DNI bonus). Plus 13 of the ~19
//    Accessories were individually missing real per-item Wireless Bonus
//    text (several missing `wireless: true` outright): Bipod,
//    Concealable Holster, Gyro Mount, Hidden Arm Slide, Imaging Scope,
//    Laser Sight, Periscope, Silencer/Suppressor, Smart Firing Platform,
//    Smartgun System (Internal + External), Spare Clip, Tripod. Flash-
//    Pak and Detonator Cap were also missing their own specific bonus
//    text. All fixed below — see each item for its added text.
//
// New wrinkles:
//
// 1. Integrated weapons — Ares Alpha and Yamaha Raiden each have a
//    second (and third) weapon built into the same gun (grenade
//    launcher, underbarrel shotgun). Not separate purchasable items —
//    modeled as `stats.integratedWeapons: [...]` on the parent rifle.
// 2. Dual ammo capacity — the three Machine Guns can load either a clip
//    or a belt at different capacities. `ammo.options: [...]` instead
//    of one fixed capacity/container.
// 3. Ammo types (APDS, Explosive, Flechette, etc.) are modifiers applied
//    to a weapon-class's base ammo cost, not separate SKUs — same
//    "reference data, not purchasable items" treatment as Sensor
//    Functions. AMMO_TYPES + AMMO_BASE_COST_BY_CLASS are exported as
//    reference tables; only "regular" ammo per class gets a real item,
//    since building all ~45 class x type combinations by hand isn't
//    worth it when the modifier math is this simple.
// 4. Conventional Explosives are bought as a Rating-banded package
//    where the cost-per-Rating jumps at each band (not one continuous
//    formula) — modeled as an `EXPLOSIVE_RATING_BANDS` lookup table,
//    same spirit as Bone Density Augmentation's ratingTable.
// 5. A few accessories here share a name with items already built in
//    other files (Imaging Scope, Laser Sight, Silencer/Suppressor,
//    Periscope, Smartgun System) but are priced differently — these are
//    the weapon-mount-specific versions. Suffixed `_weapon_accessory`
//    to avoid id collisions; genuinely different SKUs, not duplicates.
// 6. CAPACITY FIELD SPLIT: Imaging Scope, Periscope, and Smartgun
//    System (External) are optical/device housings providing Capacity
//    for vision enhancements — same pool as their counterparts in
//    armor_electronics.js — so their `capacity` fields are
//    `deviceCapacityProvided`.
// 7. DEFAULT ATTACHMENTS: dozens of weapon descriptions claim a
//    built-in accessory (integral silencer, built-in laser sight,
//    preloaded/internal smartgun, barrel gas-vent) with no stat
//    consequence anywhere in the data — the bonus text existed only as
//    prose. Modeled as `stats.defaultAttachments: [itemId, ...]`, a
//    flat list of real accessory items the weapon ships with. The list
//    takes ANY accessory id; whether a given entry can be removed is a
//    property of the referenced ITEM (`builtIn`), not of the reference.
// 8. VARIANT SPLIT: Defiance T-250's short-barreled version and
//    Mossberg CMDT's drum-magazine option were previously buried in
//    prose as alternate configurations of the same item. Split into
//    real standalone items — different Concealability/DV/AR/ammo, not
//    a Rating-scaled config choice, same reasoning distinct barrel-
//    length revolvers would be separate weapons rather than one item
//    with a config toggle.
//
// SCHEMA PASS 2 (the resolved-decisions pass) — applied on top of
// everything in PASS 1 below:
//
// D1. `referenceOnly: true` on all 55 items carrying `effects`. The
//     test (see sensors_security_survival.js for the canonical wording)
//     is that an effect counts as BACKED only if a live computed field
//     DRIVES it — `flatDicePool`, `deviceModifiers`, `structure`,
//     `structuralArmor`, or a device-capacity field. NOTHING in this
//     file qualifies: `damageValue`/`attackRatings`/`modes`/`ammo` all
//     drive the attack roll, not the separate rules the effects
//     describe ("caseless flechette only," "Requires Strength 3+,"
//     "Can mount 2 additional underbarrel accessories"). So the flag is
//     universal here. That's an honest signal about how little of this
//     chapter is mechanized, not a bug in the test.
// D1b. VERIFICATION FOLLOW-UP: the original D1 pass scoped itself to
//     "items carrying effects" only, and never ran wirelessBonuses-only
//     items through the same test — but the universal firearm wireless
//     bonus (ammo counter/ARO/bonus Minor Action) is exactly as
//     unmechanized as everything else here, and every single firearm
//     item carries it via the factory. That left 43 items with real,
//     unbacked wirelessBonuses text and no referenceOnly flag. Fixed
//     below — every one of those 43 now carries the flag too. This
//     also covers a few accessory-only items (Spare Clip) and two
//     explosive items (Grenade/Rocket Fragmentation and High Explosive)
//     whose wirelessBonuses were the same oversight.
// D2. NEW INTEGRAL SKUs: `bipod_integral` and `flashlight_integral`.
//     See D3/D4 below for who uses them.
// D3. RANGER ARMS SM-5 and BARRET MODEL 122 now take
//     `silencer_suppressor_integral` rather than the removable
//     barrel-mount SKU — "a silenced sniper rifle" that breaks down as
//     one unit, and an anti-materiel rifle whose suppressor is part of
//     the build. The Barret's "folding bipod" likewise takes
//     `bipod_integral`: a bipod that folds against the receiver is part
//     of the rifle. Note bipod_integral KEEPS its full +2, unlike
//     laser_sight_integral — a bipod bonus is conditional on being
//     deployed, so it can't have been folded into a printed AR.
// D4. FN P93 PRAETOR's 3-setting flashlight gets `flashlight_integral`,
//     a dedicated SKU rather than a reference to the plain 25¥
//     `flashlight` in sensors_security_survival.js. That item is a
//     basic mountable light with no vision-mode switching, so the
//     reference would attach the wrong stats.
// D5. ACCESSORY-COMPATIBILITY RULES SURFACED. Two families had their
//     restrictions living only in section comments, where a player
//     never sees them: the three Tasers ("accepts top-mounted
//     accessories only") and the three Hold-outs ("can't take
//     accessories or modifications"). Both are now `effects` entries on
//     each item. The permissive section notes ("top and barrel mounts"
//     on pistols, SMGs, shotguns, rifles) were NOT surfaced — they
//     describe the default rather than a restriction, and doing so
//     would add a near-identical line to 40+ items.
// D6. DEFIANCE T-250, SHORT-BARRELED differentiated. See the FUDGED
//     comment at the item — ammo capacity dropped 5 -> 4, invented.
//
// STILL DELIBERATELY UNCHANGED: Remington 900's "top imaging scope
// standard" and Parashield Dart Rifle's "Includes a top imaging scope"
// keep the REMOVABLE scope SKU. "Standard" and "includes" describe what
// ships in the box, not something welded on, unlike Ruger 101's
// "built-in imaging scope."
//
// SCHEMA PASS 1 — the original array/omittable-description pass:
//
// 9. `effect` -> `effects`, and `wirelessBonus` -> `wirelessBonuses`.
//    Both are now ARRAYS of plain strings, one distinct mechanic per
//    entry, so the renderer decides layout instead of the data baking
//    it into comma-joined prose. Ordering convention: active mechanics
//    first, restrictions and compatibility limits last. This also kills
//    three string-concatenation sites — the `firearm()` factory and the
//    two launchers that template-literal'd the blanket launcher bonus
//    onto their own text now just spread arrays.
// 10. `description` IS NOW OMITTABLE. The rule: you must be able to
//    delete an item's description and lose no gameplay information.
//    Anything mechanical that lived in prose has moved into `effects`,
//    including restrictions ("not compatible with revolvers/shotguns"),
//    activation tests, and Strength requirements. Several purely
//    mechanical accessories legitimately end up with no meaningful
//    flavor left — that's correct, not an omission. Purchase-shape
//    notes ("per 10 rounds") stay in `description`, since they're
//    pricing facts rather than play effects.
// 11. `builtIn: true` — a new item-root flag meaning "welded to its
//    parent: not removable, not separately purchasable." Such items are
//    always `mount: null` (they consume no accessory mount — that's
//    most of the point of being integral) and carry `cost: null` /
//    `availability: null`, since they're never bought on their own.
//    This reverses wrinkle 7's original "removable instances rather
//    than a separate built-in concept" — deliberately. The removable
//    model let a player strip 1,500Y of accessories off a 750Y Ingram
//    Smartgun XI, and it double-counted bonuses the source had already
//    folded into printed stats. Note `smartgun_system_internal` is NOT
//    flagged: it already behaves correctly and stays installable into
//    a gun a character already owns.
// 12. INTEGRAL SKUs. Three new `_integral` accessories, following the
//    existing `smartgun_system_internal` vs `_external` precedent —
//    same accessory, two SKUs, the integral one occupying no mount:
//      - silencer_suppressor_integral  (keeps its full effect)
//      - imaging_scope_integral        (keeps its full effect + Capacity)
//      - laser_sight_integral          (NO Attack Rating bonus — see below)
//    laser_sight_integral is deliberately effect-free because the
//    source has ALREADY folded the +1 into the printed Attack Ratings
//    of every weapon that ships with one. Proof: Colt Cobra TZ-100
//    (no sight) is 9/9/6, and the TZ-110 — described as "the TZ-100
//    plus a laser sight" — is 10/10/7, exactly +1 across every
//    populated band. Seeding the normal +1 item there would count it
//    twice. Contrast the smartgun, whose +2 is conditional on the
//    CHARACTER having a smartlink and so cannot be printed on a gun:
//    Ares Light Fire 70 and 75 have identical 10/7/6 despite the 75
//    adding smartlink hardware. So `builtIn` (removability) and
//    baked-into-stats are INDEPENDENT properties — do not "fix"
//    laser_sight_integral by giving it a bonus.

const UNIVERSAL_FIREARM_WIRELESS_BONUS = 'Every modern gun is wireless-equipped with a digital ammo counter and loaded-ammo-type ARO; with DNI, gain a bonus Minor Action on any turn you eject a clip or change fire modes.';

function firearm(overrides) {
  const { stats = {}, ...rest } = overrides;
  return {
    category: 'firearm',
    legality: 'licensed',
    skill: 'firearms',
    wireless: true,
    image: null,
    ...rest,
    stats: {
      ...stats,
      wirelessBonuses: [UNIVERSAL_FIREARM_WIRELESS_BONUS, ...(stats.wirelessBonuses ?? [])],
    },
  };
}
function firearmWireless(overrides) {
  return firearm({ ...overrides });
}
function exoticFirearm(overrides) {
  return { category: 'firearm', legality: 'licensed', skill: 'exotic_weapons', image: null, ...overrides };
}
function exoticFirearmWireless(overrides) {
  return exoticFirearm({ wireless: true, ...overrides });
}
function weaponAccessory(overrides) {
  return { category: 'weapon_accessory', legality: null, image: null, ...overrides };
}
function weaponAccessoryWireless(overrides) {
  return weaponAccessory({ wireless: true, ...overrides });
}
function integralAccessory(overrides) {
  return {
    category: 'weapon_accessory',
    legality: null,
    image: null,
    mount: null,
    builtIn: true,
    cost: null,
    availability: null,
    ...overrides,
  };
}
function explosiveItem(overrides) {
  return { category: 'explosive', legality: 'illegal', image: null, ...overrides };
}

const defiance_super_shock = firearm({
  id: 'defiance_super_shock',
  label: 'Defiance Super Shock',
  cost: 340,
  availability: 1,
  legality: null,
  description: 'A wired-dart taser — more powerful but shorter-ranged than the wireless models.',
  referenceOnly: true,
  tags: ['taser'],
  stats: {
    damageValue: '6S(e)',
    modes: ['SS'],
    attackRatings: [10, 6, null, null, null],
    ammo: { capacity: 4, container: 'm' },
    effects: [
      'Fires wired darts on 20m of wire.',
      'Usable point-blank in Close Combat for the same damage.',
      'Accepts top-mounted accessories only.',
    ],
    wirelessBonuses: ['A hit reveals the target\u2019s general Condition Monitor status.'],
  },
});

const yamaha_pulsar_i = firearmWireless({
  id: 'yamaha_pulsar_i',
  label: 'Yamaha Pulsar I',
  cost: 325,
  availability: 1,
  legality: null,
  description: 'Wireless capacitors mean longer range but less punch, firing faster for repeat hits.',
  referenceOnly: true,
  tags: ['taser'],
  stats: {
    damageValue: '4S(e)',
    modes: ['SS'],
    attackRatings: [9, 9, null, null, null],
    ammo: { capacity: 4, container: 'm' },
    effects: [
      'No melee grip contacts — no Close Combat option.',
      'Accepts top-mounted accessories only.',
    ],
    wirelessBonuses: ['A hit reveals the target\u2019s general Condition Monitor status.'],
  },
});

const yamaha_pulsar_ii = firearmWireless({
  id: 'yamaha_pulsar_ii',
  label: 'Yamaha Pulsar II',
  cost: 350,
  availability: 1,
  legality: null,
  description: 'As the Pulsar I, plus melee grip contacts.',
  referenceOnly: true,
  tags: ['taser'],
  stats: {
    damageValue: '4S(e)',
    modes: ['SS'],
    attackRatings: [9, 9, null, null, null],
    ammo: { capacity: 4, container: 'm' },
    effects: [
      'Melee grip contacts — treat as a Close Combat Club attack.',
      'Accepts top-mounted accessories only.',
    ],
    wirelessBonuses: ['A hit reveals the target\u2019s general Condition Monitor status.'],
  },
});

const fichetti_tiffani_needler = firearmWireless({
  id: 'fichetti_tiffani_needler',
  label: 'Fichetti Tiffani Needler',
  cost: 435,
  availability: 2,
  description: "The world's most popular designer handgun, with a color-changing coating driven by its wireless signal.",
  referenceOnly: true,
  tags: ['holdout'],
  stats: {
    damageValue: '3P',
    modes: ['SS'],
    attackRatings: [10, 6, 2, null, null],
    ammo: { capacity: 4, container: 'c' },
    effects: [
      'Caseless flechette ammo only.',
      "Can't take accessories or modifications.",
    ],
    wirelessBonuses: [
      'Change the coating\u2019s color as a Minor Action.',
      'A camo pattern raises visual Concealability threshold by 1.',
    ],
  },
});

const streetline_special = firearm({
  id: 'streetline_special',
  label: 'Streetline Special',
  cost: 200,
  availability: 2,
  description: 'Cheap 3D-nanoprinted composite construction.',
  referenceOnly: true,
  tags: ['holdout'],
  stats: {
    damageValue: '2P',
    modes: ['SS'],
    attackRatings: [8, 8, null, null, null],
    ammo: { capacity: 6, container: 'c' },
    effects: [
      '+1 threshold to detect with MAD scanners.',
      "Can't take accessories or modifications.",
    ],
  },
});

const walther_palm_pistol = firearm({
  id: 'walther_palm_pistol',
  label: 'Walther Palm Pistol',
  cost: 345,
  availability: 2,
  description: 'A double-barreled over-under derringer.',
  referenceOnly: true,
  tags: ['holdout'],
  stats: {
    damageValue: '2P',
    modes: ['SS', 'BF'],
    attackRatings: [12, 7, null, null, null],
    ammo: { capacity: 6, container: 'b' },
    effects: [
      'Burst Fire fires both barrels at once instead of a normal Burst.',
      "Can't take accessories or modifications.",
    ],
  },
});

const ares_light_fire_70 = firearm({
  id: 'ares_light_fire_70',
  label: 'Ares Light Fire 70',
  cost: 350,
  availability: 3,
  description: 'A special-ops design built around its integral suppressor.',
  referenceOnly: true,
  tags: ['light_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA'],
    attackRatings: [10, 7, 6, null, null],
    ammo: { capacity: 16, container: 'c' },
    defaultAttachments: ['silencer_suppressor_integral'],
  },
});

const ares_light_fire_75 = firearmWireless({
  id: 'ares_light_fire_75',
  label: 'Ares Light Fire 75',
  cost: 400,
  availability: 3,
  description: 'As the 70, plus preloaded smartlink hardware. Not legally common.',
  referenceOnly: true,
  tags: ['light_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA'],
    attackRatings: [10, 7, 6, null, null],
    ammo: { capacity: 16, container: 'c' },
    defaultAttachments: ['silencer_suppressor_integral', 'smartgun_system_internal'],
  },
});

const beretta_101t = firearm({
  id: 'beretta_101t',
  label: 'Beretta 101T',
  cost: 260,
  availability: 2,
  description: 'Shares a frame with the 201T for easy disguise. Ships with a detachable shoulder stock, more often than not lost before street sale.',
  referenceOnly: true,
  tags: ['light_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA'],
    attackRatings: [9, 8, 6, null, null],
    ammo: { capacity: 21, container: 'c' },
  },
});

const beretta_201t = firearm({
  id: 'beretta_201t',
  label: 'Beretta 201T',
  cost: 460,
  availability: 3,
  description: 'Automatic fire capability, popular where heavy and machine pistols are restricted.',
  referenceOnly: true,
  tags: ['light_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA', 'FA'],
    attackRatings: [9, 8, 6, null, null],
    ammo: { capacity: 21, container: 'c' },
  },
});

const colt_america_l36 = firearm({
  id: 'colt_america_l36',
  label: 'Colt America L36',
  cost: 230,
  availability: 2,
  description: 'Cheap and concealable, with an ownership-swap feature abused by cops and crooks alike.',
  referenceOnly: true,
  tags: ['light_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA'],
    attackRatings: [8, 8, 6, null, null],
    ammo: { capacity: 11, container: 'c' },
    wirelessBonuses: ['Alter ownership data with a Minor Action.'],
  },
});

const fichetti_security_600 = firearm({
  id: 'fichetti_security_600',
  label: 'Fichetti Security 600',
  cost: 390,
  availability: 3,
  description: 'A 30-round security sidearm, popular with deckers for the ammo buffer. Ships with a detachable folding stock.',
  referenceOnly: true,
  tags: ['light_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA'],
    attackRatings: [10, 9, 6, null, null],
    ammo: { capacity: 30, container: 'c' },
    defaultAttachments: ['laser_sight_integral'],
  },
});

const ruger_redhawk = firearm({
  id: 'ruger_redhawk',
  label: 'Ruger Redhawk',
  cost: 250,
  availability: 2,
  description: 'A heavy revolver with a single/double firing selector.',
  referenceOnly: true,
  tags: ['light_pistol'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [7, 10, 7, null, null],
    ammo: { capacity: 8, container: 'cy' },
    effects: ['Double action fires Semi-Auto; single action fires Burst Fire.'],
    wirelessBonuses: ['Bonus Minor Action when switching firing mode.'],
  },
});

const ares_crusader_ii = firearmWireless({
  id: 'ares_crusader_ii',
  label: 'Ares Crusader II',
  cost: 520,
  availability: 4,
  description: 'A high-capacity machine pistol sold ready to run.',
  referenceOnly: true,
  tags: ['machine_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA', 'BF'],
    attackRatings: [9, 9, 7, null, null],
    ammo: { capacity: 40, container: 'c' },
    defaultAttachments: ['gas_vent_system', 'smartgun_system_internal'],
  },
});

const ceska_black_scorpion = firearm({
  id: 'ceska_black_scorpion',
  label: 'Ceska Black Scorpion',
  cost: 510,
  availability: 3,
  description: 'Small, Burst Fire capable, with an integral folding stock.',
  referenceOnly: true,
  tags: ['machine_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA', 'BF'],
    attackRatings: [10, 9, 8, null, null],
    ammo: { capacity: 35, container: 'c' },
  },
});

const steyr_tmp = firearm({
  id: 'steyr_tmp',
  label: 'Steyr TMP',
  cost: 690,
  availability: 3,
  description: 'A lightweight polymer frame with full-auto capability.',
  referenceOnly: true,
  tags: ['machine_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA', 'FA'],
    attackRatings: [8, 8, 6, null, null],
    ammo: { capacity: 30, container: 'c' },
    defaultAttachments: ['laser_sight_integral'],
  },
});

const ares_predator_vi = firearmWireless({
  id: 'ares_predator_vi',
  label: 'Ares Predator VI',
  cost: 750,
  availability: 2,
  description: 'The definitive runner sidearm, sold with its smartgun already fitted.',
  referenceOnly: true,
  tags: ['heavy_pistol'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [10, 10, 8, null, null],
    ammo: { capacity: 15, container: 'c' },
    effects: ['Variable ammunition system — one magazine can carry mixed ammo types.'],
    defaultAttachments: ['smartgun_system_internal'],
  },
});

const ares_viper_slivergun = firearm({
  id: 'ares_viper_slivergun',
  label: 'Ares Viper Slivergun',
  cost: 610,
  availability: 4,
  description: 'A large-capacity burst-fire pistol built around an integrated barrel suppressor.',
  referenceOnly: true,
  tags: ['heavy_pistol'],
  stats: {
    damageValue: '2P(fl)',
    modes: ['SA', 'BF'],
    attackRatings: [13, 9, 7, null, null],
    ammo: { capacity: 30, container: 'c' },
    effects: ['Fires only its own flechette-classed metal slivers.'],
    defaultAttachments: ['silencer_suppressor_integral'],
  },
});

const browning_ultra_power = firearm({
  id: 'browning_ultra_power',
  label: 'Browning Ultra Power',
  cost: 315,
  availability: 2,
  description: "The Predator's former rival — cheaper, and it hasn't kept pace tech-wise.",
  referenceOnly: true,
  tags: ['heavy_pistol'],
  stats: {
    damageValue: '3P',
    modes: ['SA'],
    attackRatings: [10, 9, 6, null, null],
    ammo: { capacity: 10, container: 'c' },
    defaultAttachments: ['laser_sight_integral'],
  },
});

const colt_government_2076 = firearm({
  id: 'colt_government_2076',
  label: 'Colt Government 2076',
  cost: 275,
  availability: 3,
  description: "A callback to the classic Manhunter design after post-'60s hacking fears sidelined the electronic-fire 2076.",
  referenceOnly: true,
  tags: ['heavy_pistol'],
  stats: {
    damageValue: '3P',
    modes: ['SA'],
    attackRatings: [10, 8, 6, null, null],
    ammo: { capacity: 14, container: 'c' },
    defaultAttachments: ['laser_sight_integral'],
  },
});

const colt_manhunter = firearmWireless({
  id: 'colt_manhunter',
  label: 'Colt Manhunter',
  cost: 500,
  availability: 3,
  description: 'The smartgun-equipped variant of the 2076, carrying the classic Manhunter name.',
  referenceOnly: true,
  tags: ['heavy_pistol'],
  stats: {
    damageValue: '3P',
    modes: ['SA'],
    attackRatings: [10, 8, 6, null, null],
    ammo: { capacity: 14, container: 'c' },
    defaultAttachments: ['smartgun_system_internal'],
  },
});

const ruger_super_warhawk = firearm({
  id: 'ruger_super_warhawk',
  label: 'Ruger Super Warhawk',
  cost: 400,
  availability: 3,
  description: 'Flashy chrome revolver — big holes out of the box, more precise with upgrades.',
  referenceOnly: true,
  tags: ['heavy_pistol'],
  stats: {
    damageValue: '4P',
    modes: ['SA'],
    attackRatings: [8, 11, 8, null, null],
    ammo: { capacity: 6, container: 'cy' },
  },
});

const colt_cobra_tz100 = firearm({
  id: 'colt_cobra_tz100',
  label: 'Colt Cobra TZ-100',
  cost: 730,
  availability: 2,
  description: 'Folding stock. First of an increasing-accessory line, popular with security and trid shows alike.',
  referenceOnly: true,
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [9, 9, 6, null, null],
    ammo: { capacity: 32, container: 'c' },
  },
});

const colt_cobra_tz110 = firearm({
  id: 'colt_cobra_tz110',
  label: 'Colt Cobra TZ-110',
  cost: 785,
  availability: 2,
  description: 'As the TZ-100, plus a laser sight.',
  referenceOnly: true,
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [10, 10, 7, null, null],
    ammo: { capacity: 32, container: 'c' },
    defaultAttachments: ['laser_sight_integral'],
  },
});

const colt_cobra_tz120 = firearm({
  id: 'colt_cobra_tz120',
  label: 'Colt Cobra TZ-120',
  cost: 840,
  availability: 3,
  description: 'As the TZ-110, plus a gas-vent system.',
  referenceOnly: true,
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [10, 11, 8, null, null],
    ammo: { capacity: 32, container: 'c' },
    defaultAttachments: ['laser_sight_integral', 'gas_vent_system'],
  },
});

const fn_p93_praetor = firearm({
  id: 'fn_p93_praetor',
  label: 'FN P93 Praetor',
  cost: 925,
  availability: 4,
  description: 'An intimidating bullpup design with an integrated rigid stock.',
  referenceOnly: true,
  tags: ['smg'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [9, 12, 7, null, null],
    ammo: { capacity: 50, container: 'c' },
    defaultAttachments: ['laser_sight_integral', 'flashlight_integral'],
  },
});

const hk_227 = firearmWireless({
  id: 'hk_227',
  label: 'HK-227',
  cost: 825,
  availability: 3,
  description: 'Built on the century-old MP5 frame, with a retractable stock.',
  referenceOnly: true,
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [10, 11, 8, null, null],
    ammo: { capacity: 28, container: 'c' },
    defaultAttachments: ['smartgun_system_internal', 'silencer_suppressor_integral'],
  },
});

const ingram_smartgun_xi = firearmWireless({
  id: 'ingram_smartgun_xi',
  label: 'Ingram Smartgun XI',
  cost: 750,
  availability: 3,
  description: 'A legendary street samurai weapon of choice since the 2050s.',
  referenceOnly: true,
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [11, 9, 6, null, null],
    ammo: { capacity: 32, container: 'c' },
    defaultAttachments: ['gas_vent_system', 'smartgun_system_internal', 'silencer_suppressor_integral'],
  },
});

const sck_model_100 = firearmWireless({
  id: 'sck_model_100',
  label: 'SCK Model 100',
  cost: 725,
  availability: 3,
  description: 'Japanacorp standard issue, associated with the Red Samurai. Folding stock.',
  referenceOnly: true,
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [10, 10, 7, null, null],
    ammo: { capacity: 30, container: 'c' },
    defaultAttachments: ['smartgun_system_internal'],
  },
});

const uzi_v = firearm({
  id: 'uzi_v',
  label: 'Uzi V',
  cost: 455,
  availability: 2,
  description: "Spinrad Global's latest entry, with an integral folding stock.",
  referenceOnly: true,
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [8, 8, 7, null, null],
    ammo: { capacity: 24, container: 'c' },
    defaultAttachments: ['laser_sight_integral'],
  },
});

const defiance_t250 = firearm({
  id: 'defiance_t250',
  label: 'Defiance T-250',
  cost: 330,
  availability: 2,
  description: 'A semi-auto street howitzer, gas-operated with a secondary pump action to clear glitch-jams.',
  referenceOnly: true,
  tags: ['shotgun'],
  stats: {
    damageValue: '4P',
    modes: ['SS', 'SA'],
    attackRatings: [7, 10, 6, null, null],
    ammo: { capacity: 5, container: 'm' },
  },
});

const defiance_t250_short_barreled = firearm({
  id: 'defiance_t250_short_barreled',
  label: 'Defiance T-250, Short-Barreled',
  cost: 330,
  availability: 2,
  description: 'The T-250 with the barrel cut down — trades range and capacity for concealability.',
  referenceOnly: true,
  tags: ['shotgun'],
  stats: {
    damageValue: '3P',
    modes: ['SS', 'SA'],
    attackRatings: [8, 8, 4, null, null],
    ammo: { capacity: 4, container: 'm' },
    effects: ['Concealability 3.'],
  },
});

const mossberg_cmdt = firearm({
  id: 'mossberg_cmdt',
  label: 'Mossberg CMDT',
  cost: 700,
  availability: 4,
  description: 'A burst-fire combat shotgun fed from a 10-round clip.',
  referenceOnly: true,
  tags: ['shotgun'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF'],
    attackRatings: [4, 11, 7, null, null],
    ammo: { capacity: 10, container: 'c' },
    defaultAttachments: ['laser_sight_integral'],
  },
});

const mossberg_cmdt_drum = firearm({
  id: 'mossberg_cmdt_drum',
  label: 'Mossberg CMDT, Drum-Fed',
  cost: 700,
  availability: 4,
  description: 'The CMDT running a 24-round drum instead of the standard clip.',
  referenceOnly: true,
  tags: ['shotgun'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF'],
    attackRatings: [4, 11, 7, null, null],
    ammo: { capacity: 24, container: 'drum' },
    defaultAttachments: ['laser_sight_integral'],
  },
});

const pjss_model_55 = firearm({
  id: 'pjss_model_55',
  label: 'PJSS Model 55',
  cost: 325,
  availability: 5,
  description: 'A European hunter and trap-shooter status symbol.',
  referenceOnly: true,
  tags: ['shotgun'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF (short)'],
    attackRatings: [3, 12, 8, null, null],
    ammo: { capacity: 2, container: 'b' },
    effects: ['Burst Fire fires both barrels at once as a short burst.'],
    defaultAttachments: ['shock_pads'],
  },
});

const remington_roomsweeper = firearm({
  id: 'remington_roomsweeper',
  label: 'Remington Roomsweeper',
  cost: 325,
  availability: 2,
  description: 'Double-barreled and pistol-gripped — an inaccurate hand cannon.',
  referenceOnly: true,
  tags: ['shotgun'],
  stats: {
    damageValue: '5P',
    modes: ['SA'],
    attackRatings: [9, 8, 4, null, null],
    ammo: { capacity: 8, container: 'm' },
    effects: ['Can load Heavy Pistol rounds when not firing flechette.'],
  },
});

const ak_97 = firearm({
  id: 'ak_97',
  label: 'AK-97',
  cost: 2100,
  availability: 2,
  description: 'The eternal classic, unchanged in look since the 20th century.',
  referenceOnly: true,
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [4, 11, 9, 7, 1],
    ammo: { capacity: 38, container: 'c' },
  },
});

const ares_alpha = firearmWireless({
  id: 'ares_alpha',
  label: 'Ares Alpha',
  cost: 3400,
  availability: 5,
  description: 'Made famous by Ares Firewatch; a superior handling design with an integrated underbarrel grenade launcher.',
  referenceOnly: true,
  tags: ['rifle'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [4, 10, 9, 7, 2],
    ammo: { capacity: 42, container: 'c' },
    integratedWeapons: [
      {
        label: 'Grenade Launcher (Underbarrel)',
        modes: ['SS'],
        damageValue: 'As grenade loaded',
        attackRatings: [4, 10, 6, 2, null],
        ammo: { capacity: 6, container: 'c' },
      },
    ],
    defaultAttachments: ['smartgun_system_internal'],
  },
});

const colt_m23 = firearm({
  id: 'colt_m23',
  label: 'Colt M23',
  cost: 2100,
  availability: 2,
  description: 'Cheap, mass-produced, everywhere.',
  referenceOnly: true,
  tags: ['rifle'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [5, 8, 8, 8, 1],
    ammo: { capacity: 40, container: 'c' },
    effects: ['Can mount 2 additional underbarrel accessories (3 total).'],
  },
});

const fn_har = firearm({
  id: 'fn_har',
  label: 'FN-HAR',
  cost: 2100,
  availability: 3,
  description: 'The private-security and HTR fear-inducer.',
  referenceOnly: true,
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [3, 11, 10, 6, 1],
    ammo: { capacity: 35, container: 'c' },
    defaultAttachments: ['laser_sight_integral', 'gas_vent_system'],
  },
});

const yamaha_raiden = firearmWireless({
  id: 'yamaha_raiden',
  label: 'Yamaha Raiden',
  cost: 3200,
  availability: 5,
  description: 'Japanacorp and Imperial Marine standard; electronic firing, with an underbarrel shotgun and grenade launcher.',
  referenceOnly: true,
  tags: ['rifle'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [4, 11, 10, 7, 2],
    ammo: { capacity: 60, container: 'c' },
    integratedWeapons: [
      {
        label: 'Grenade Launcher (Underbarrel)',
        modes: ['SS'],
        damageValue: 'As grenade loaded',
        attackRatings: [4, 11, 7, 1, null],
        ammo: { capacity: 4, container: 'c' },
      },
      {
        label: 'Shotgun (Underbarrel)',
        modes: ['SS', 'SA'],
        damageValue: '4P',
        attackRatings: [7, 9, 8, null, null],
        ammo: { capacity: 2, container: 'b' },
      },
    ],
    defaultAttachments: ['silencer_suppressor_integral', 'smartgun_system_internal'],
  },
});

const ares_desert_strike = firearm({
  id: 'ares_desert_strike',
  label: 'Ares Desert Strike',
  cost: 11000,
  availability: 4,
  legality: 'illegal',
  description: 'A sniper rifle built for harsh conditions, on a rigid stock.',
  referenceOnly: true,
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SA'],
    attackRatings: [3, 10, 10, 10, 10],
    ammo: { capacity: 14, container: 'c' },
    defaultAttachments: ['imaging_scope_weapon_accessory', 'shock_pads'],
  },
});

const cavalier_arms_crockett_ebr = firearm({
  id: 'cavalier_arms_crockett_ebr',
  label: 'Cavalier Arms Crockett EBR',
  cost: 9050,
  availability: 5,
  legality: 'illegal',
  description: 'A burst-fire-capable sniper rifle on a rigid stock — accurate at range, though bursts sacrifice repeat precision.',
  referenceOnly: true,
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SA', 'BF'],
    attackRatings: [3, 8, 11, 8, 8],
    ammo: { capacity: 20, container: 'c' },
    defaultAttachments: ['imaging_scope_weapon_accessory', 'shock_pads'],
  },
});

const ranger_arms_sm5 = firearmWireless({
  id: 'ranger_arms_sm5',
  label: 'Ranger Arms SM-5',
  cost: 13200,
  availability: 5,
  legality: 'illegal',
  description: 'A silenced sniper rifle on a rigid stock, built for quick in-and-out work.',
  referenceOnly: true,
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SA'],
    attackRatings: [3, 6, 9, 11, 12],
    ammo: { capacity: 15, container: 'c' },
    effects: ['Fits in a briefcase — Firearms + Logic (6, Major Action) Extended Test to assemble or break down.'],
    defaultAttachments: ['silencer_suppressor_integral', 'imaging_scope_weapon_accessory', 'smartgun_system_internal'],
  },
});

const remington_900 = firearm({
  id: 'remington_900',
  label: 'Remington 900',
  cost: 12000,
  availability: 3,
  description: 'A classic wooden bolt-action hunting rifle.',
  referenceOnly: true,
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SS'],
    attackRatings: [2, 7, 10, 12, 11],
    ammo: { capacity: 5, container: 'm' },
    effects: ['No underbarrel mounting.'],
    defaultAttachments: ['imaging_scope_weapon_accessory'],
  },
});

const ruger_101 = firearm({
  id: 'ruger_101',
  label: 'Ruger 101',
  cost: 11100,
  availability: 2,
  description: 'A gas-operated hunting favorite on a rigid stock.',
  referenceOnly: true,
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SA'],
    attackRatings: [2, 6, 10, 12, 11],
    ammo: { capacity: 8, container: 'm' },
    defaultAttachments: ['imaging_scope_integral', 'shock_pads'],
  },
});

const barret_model_122 = firearmWireless({
  id: 'barret_model_122',
  label: 'Barret Model 122',
  cost: 15200,
  availability: 6,
  legality: 'illegal',
  description: 'An anti-materiel rifle for tearing through vehicles and APCs.',
  referenceOnly: true,
  tags: ['rifle'],
  stats: {
    damageValue: '6P',
    modes: ['SA'],
    attackRatings: [1, 8, 11, 16, 14],
    ammo: { capacity: 10, container: 'c' },
    defaultAttachments: ['silencer_suppressor_integral', 'smartgun_system_internal', 'bipod_integral'],
  },
});

const ingram_valiant = firearm({
  id: 'ingram_valiant',
  label: 'Ingram Valiant',
  cost: 4175,
  availability: 4,
  description: 'A light MG on a rigid stock, and a mercenary favorite.',
  referenceOnly: true,
  tags: ['machine_gun'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [2, 11, 12, 7, 3],
    ammo: { options: [{ capacity: 50, container: 'c' }, { capacity: 100, container: 'belt' }] },
    defaultAttachments: ['laser_sight_integral', 'gas_vent_system', 'shock_pads'],
  },
});

const stoner_ares_m202 = firearm({
  id: 'stoner_ares_m202',
  label: 'Stoner-Ares M202',
  cost: 6900,
  availability: 4,
  description: 'A medium MG with tremendous punch — brutally simple, and often seen with trolls.',
  referenceOnly: true,
  tags: ['machine_gun'],
  stats: {
    damageValue: '5P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [1, 10, 11, 7, 6],
    ammo: { options: [{ capacity: 50, container: 'c' }, { capacity: 100, container: 'belt' }] },
    effects: ['Requires Strength 3+.'],
  },
});

const rpk_hmg = firearm({
  id: 'rpk_hmg',
  label: 'RPK HMG',
  cost: 8000,
  availability: 5,
  description: 'A heavy MG, Eastern European and Asian military staple, usually vehicle-mounted.',
  referenceOnly: true,
  tags: ['machine_gun'],
  stats: {
    damageValue: '6P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [1, 10, 12, 8, 7],
    ammo: { options: [{ capacity: 50, container: 'c' }, { capacity: 100, container: 'belt' }] },
    effects: ['Requires Strength 5+.'],
    defaultAttachments: ['tripod'],
  },
});

const panther_xxl = firearmWireless({
  id: 'panther_xxl',
  label: 'Panther XXL',
  cost: 10000,
  availability: 6,
  legality: 'illegal',
  description: 'An assault cannon — bulky, ugly, deadly.',
  referenceOnly: true,
  tags: ['machine_gun'],
  stats: {
    damageValue: '7P',
    modes: ['SA'],
    attackRatings: [1, 9, 12, 8, 6],
    ammo: { capacity: 15, container: 'c' },
    defaultAttachments: ['smartgun_system_internal'],
  },
});

const ares_super_squirt = exoticFirearm({
  id: 'ares_super_squirt',
  label: 'Ares Super Squirt',
  cost: 560,
  availability: 3,
  description: 'A nonlethal DMSO-gel-pack "paintball marker" despite the name.',
  referenceOnly: true,
  tags: ['special_weapon'],
  stats: {
    damageValue: 'Special',
    modes: ['SS'],
    attackRatings: [8, 12, 9, null, null],
    ammo: { capacity: 20, container: 'c' },
    effects: [
      'No direct damage — drives a chosen chemical payload into the target\u2019s bloodstream as a Contact-vector toxin.',
    ],
  },
});

const parashield_dart_pistol = exoticFirearmWireless({
  id: 'parashield_dart_pistol',
  label: 'Parashield DART Pistol',
  cost: 510,
  availability: 2,
  description: 'The industry standard dart weapon.',
  referenceOnly: true,
  tags: ['special_weapon'],
  stats: {
    damageValue: '1P + special',
    modes: ['SS'],
    attackRatings: [9, 10, 8, null, null],
    ammo: { capacity: 5, container: 'c' },
    effects: ['Top-mounted accessories only.'],
    wirelessBonuses: [
      'Reports hit and injection success.',
      'Provides a low-fidelity (Device Rating 1) heart-rate/pulse readout.',
    ],
  },
});

const parashield_dart_rifle = exoticFirearmWireless({
  id: 'parashield_dart_rifle',
  label: 'Parashield DART Rifle',
  cost: 710,
  availability: 3,
  description: 'The shoulder-fired dart weapon, sold with a scope fitted.',
  referenceOnly: true,
  tags: ['special_weapon'],
  stats: {
    damageValue: '1P + special',
    modes: ['SS'],
    attackRatings: [5, 8, 11, 3, null],
    ammo: { capacity: 6, container: 'm' },
    effects: ['Can mount top and underbarrel accessories.'],
    wirelessBonuses: [
      'Reports hit and injection success.',
      'Provides a low-fidelity (Device Rating 1) heart-rate/pulse readout.',
    ],
    defaultAttachments: ['imaging_scope_weapon_accessory'],
  },
});

const LAUNCHER_WIRELESS_BONUS = 'Wireless link trigger available even without DNI.';

const ares_antioch_ii = exoticFirearmWireless({
  id: 'ares_antioch_ii',
  label: 'Ares Antioch II',
  cost: 5900,
  availability: 3,
  description: 'A grenade launcher with a secondary wireless-activation trigger setting for launched projectiles.',
  referenceOnly: true,
  tags: ['launcher'],
  stats: {
    damageValue: 'As grenade loaded',
    modes: ['SS'],
    attackRatings: [null, 6, 8, 6, 5],
    ammo: { capacity: 8, container: 'm' },
    wirelessBonuses: [LAUNCHER_WIRELESS_BONUS],
    defaultAttachments: ['smartgun_system_internal'],
  },
});

const armtech_mgl6 = exoticFirearmWireless({
  id: 'armtech_mgl6',
  label: 'ArmTech MGL-6',
  cost: 1800,
  availability: 4,
  description: 'A bullpup pistol-style semi-auto grenade launcher.',
  referenceOnly: true,
  tags: ['launcher'],
  stats: {
    damageValue: 'As grenade loaded',
    modes: ['SA'],
    attackRatings: [null, 8, 8, 3, null],
    ammo: { capacity: 6, container: 'c' },
    wirelessBonuses: [LAUNCHER_WIRELESS_BONUS],
  },
});

const armtech_mgl12 = exoticFirearmWireless({
  id: 'armtech_mgl12',
  label: 'ArmTech MGL-12',
  cost: 5000,
  availability: 4,
  description: 'A bullpup rifle-style semi-auto grenade launcher.',
  referenceOnly: true,
  tags: ['launcher'],
  stats: {
    damageValue: 'As grenade loaded',
    modes: ['SA'],
    attackRatings: [null, 8, 9, 6, 2],
    ammo: { capacity: 12, container: 'c' },
    wirelessBonuses: [LAUNCHER_WIRELESS_BONUS],
  },
});

const aztechnology_striker = exoticFirearmWireless({
  id: 'aztechnology_striker',
  label: 'Aztechnology Striker',
  cost: 7000,
  availability: 5,
  description: 'A missile launcher with a disposable warhead and a reusable tube.',
  referenceOnly: true,
  tags: ['launcher'],
  stats: {
    damageValue: 'As missile loaded',
    modes: ['SS'],
    attackRatings: [null, 4, 10, 9, 6],
    ammo: { capacity: 1, container: 'ml' },
    wirelessBonuses: [
      LAUNCHER_WIRELESS_BONUS,
      '+1 dice pool if Matrix-connected, and no other bonus-applying system is active.',
    ],
  },
});

const onotari_interceptor = exoticFirearmWireless({
  id: 'onotari_interceptor',
  label: 'Onotari Interceptor',
  cost: 9000,
  availability: 5,
  description: 'A Saeder-Krupp military missile launcher with two independently-loadable barrels. Some owners strip out the safety interlock, to the detriment of firer and target alike.',
  referenceOnly: true,
  tags: ['launcher'],
  stats: {
    damageValue: 'As missile loaded',
    modes: ['SS'],
    attackRatings: [null, 5, 9, 10, 8],
    ammo: { capacity: 2, container: 'ml' },
    effects: [
      'An internal smartgun runs a fire-safety interlock preventing simultaneous firing.',
      'Firing both barrels splits the attack dice pool and resolves each shot independently.',
      'Firing both barrels makes the firer resist 6P Fire damage.',
    ],
    wirelessBonuses: [
      LAUNCHER_WIRELESS_BONUS,
      'The smartlink bonus applies, but the safety interlock can\u2019t be disabled this way.',
    ],
    defaultAttachments: ['smartgun_system_internal'],
  },
});

const airburst_link = weaponAccessoryWireless({
  id: 'airburst_link',
  label: 'Airburst Link',
  mount: null,
  cost: 600,
  availability: 3,
  description: 'A smartgun rangefinder accessory for grenade and rocket launchers.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      'Halves scatter when using the wireless link trigger.',
      'Requires wireless active on both the launcher and the ordnance.',
    ],
  },
});

const bipod = weaponAccessoryWireless({
  id: 'bipod',
  label: 'Bipod',
  mount: 'underbarrel',
  cost: 200,
  availability: 1,
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      '+2 Attack Rating when deployed prone or sitting.',
      'Requires a rigid stock.',
    ],
    wirelessBonuses: ['+3 Attack Rating instead of +2 when deployed.'],
  },
});

const concealable_holster = weaponAccessoryWireless({
  id: 'concealable_holster',
  label: 'Concealable Holster',
  mount: null,
  cost: 150,
  availability: 1,
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      '+1 Concealability threshold.',
      'Pistols (including machine pistols) and tasers only.',
    ],
    wirelessBonuses: ['An additional +1 Concealability threshold via active color/shape-shifting.'],
  },
});

const gas_vent_system = weaponAccessory({
  id: 'gas_vent_system',
  label: 'Gas-Vent System',
  mount: 'barrel',
  cost: 500,
  availability: 3,
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      'Removes the SA Attack Rating penalty.',
      'Reduces the BF Attack Rating penalty to 2.',
      'Permanent once installed.',
    ],
  },
});

const weapon_gyro_mount = weaponAccessoryWireless({
  id: 'weapon_gyro_mount',
  label: 'Gyro Mount (Weapon)',
  mount: 'underbarrel',
  cost: 1400,
  availability: 3,
  description: 'A heavy harness for a rifle or MG.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      'Negates SA/BF Attack Rating penalties.',
      '+3 Attack Rating on Full-Auto.',
      'Lowers medium/heavy MG Strength requirements to 2+/4+.',
    ],
    wirelessBonuses: ['Quick-release exit becomes a Minor Action instead of a Major Action.'],
  },
});

const weapon_hidden_arm_slide = weaponAccessoryWireless({
  id: 'weapon_hidden_arm_slide',
  label: 'Hidden Arm Slide',
  mount: null,
  cost: 350,
  availability: 2,
  description: 'A spring rig worn along the forearm, under clothing.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      'A Minor Action plus a gesture draws the weapon, granting bonus Edge on first use.',
      '+1 Concealability.',
      'Holds a Hold-out, Light Pistol, or Taser only.',
    ],
    wirelessBonuses: ['Bonus Minor Action when activating.'],
  },
});

const imaging_scope_weapon_accessory = weaponAccessoryWireless({
  id: 'imaging_scope_weapon_accessory',
  label: 'Imaging Scope (Weapon Accessory)',
  mount: 'top',
  cost: 350,
  availability: 1,
  description: 'A micro camera paired with vision magnification.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    deviceCapacityProvided: 3,
    effects: [
      'Denies the target Edge from a higher Defense Rating.',
      'Requires a Take Aim action to benefit.',
    ],
    wirelessBonuses: ['Shareable "line of sight" feed with the team.'],
  },
});

const laser_sight_weapon_accessory = weaponAccessoryWireless({
  id: 'laser_sight_weapon_accessory',
  label: 'Laser Sight (Weapon Accessory)',
  mount: 'top or underbarrel',
  cost: 125,
  availability: 1,
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      '+1 Attack Rating.',
      'Not cumulative with a smartlink.',
    ],
    wirelessBonuses: [
      '+2 Attack Rating instead of +1.',
      'Bonus Minor Action on activation or deactivation.',
    ],
  },
});

const periscope_weapon_accessory = weaponAccessoryWireless({
  id: 'periscope_weapon_accessory',
  label: 'Periscope (Weapon Accessory)',
  mount: 'top',
  cost: 70,
  availability: 2,
  description: 'Lets the firer shoot around corners. Upgradeable with vision enhancements.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    deviceCapacityProvided: 3,
    effects: ['Reduces the Cover IV penalty to -1.'],
    wirelessBonuses: ['Reduces the Cover IV penalty to 0 instead of -1.'],
  },
});

const quick_draw_holster = weaponAccessory({
  id: 'quick_draw_holster',
  label: 'Quick-Draw Holster',
  mount: null,
  cost: 175,
  availability: 2,
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: ['Bonus Minor Action on a Quick-Draw action.'],
  },
});

const shock_pads = weaponAccessory({
  id: 'shock_pads',
  label: 'Shock Pads',
  mount: null,
  cost: 50,
  availability: 2,
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      '-1 to SA/BF Attack Rating penalties.',
      'Requires a rigid stock.',
    ],
  },
});

const silencer_suppressor_weapon_accessory = weaponAccessoryWireless({
  id: 'silencer_suppressor_weapon_accessory',
  label: 'Silencer/Suppressor (Weapon Accessory)',
  mount: 'barrel',
  cost: 500,
  availability: 4,
  legality: 'illegal',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      '+2 threshold to notice the shot or locate the firer.',
      'Not compatible with revolvers or shotguns.',
    ],
    wirelessBonuses: ['An AR alert if someone nearby reacts to the muffled shot.'],
  },
});

const smart_firing_platform = weaponAccessoryWireless({
  id: 'smart_firing_platform',
  label: 'Smart Firing Platform',
  mount: 'underbarrel',
  cost: 2500,
  availability: 5,
  description: 'A robotic tripod that aims and fires the weapon it carries.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      'Negates SA/BF Attack Rating penalties.',
      '+3 Attack Rating on Full-Auto.',
      'Fires under its own pilot (Device Rating 3, Targeting autosoft Rating 3).',
      'Mounts one smartgun-equipped weapon.',
    ],
    wirelessBonuses: ['Can be fired remotely via an implanted smartlink in VR, substituting your own dice pools.'],
  },
});

const SMARTGUN_SYSTEM_WIRELESS_BONUSES = [
  '+1 dice pool.',
  'Bonus Minor Action on Reload Smartgun or Change Device Mode.',
];

const SMARTGUN_SYSTEM_EFFECTS = [
  'With a smartlink, +2 Attack Rating across all ranges.',
  'Via DNI, switch modes, eject clips, and fire without a trigger pull.',
  'Fire from cover without Attack penalties.',
];

const smartgun_system_internal = weaponAccessoryWireless({
  id: 'smartgun_system_internal',
  label: 'Smartgun System, Internal',
  mount: null,
  cost: 500,
  availability: 1,
  legality: 'licensed',
  description: 'A camera and rangefinder fitted inside the weapon itself.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      ...SMARTGUN_SYSTEM_EFFECTS,
      'Adds to the weapon price rather than being bought standalone.',
    ],
    wirelessBonuses: SMARTGUN_SYSTEM_WIRELESS_BONUSES,
  },
});

const smartgun_system_external = weaponAccessoryWireless({
  id: 'smartgun_system_external',
  label: 'Smartgun System, External',
  mount: 'top or underbarrel',
  cost: 200,
  availability: 2,
  legality: 'licensed',
  description: 'The rail-mounted version of the internal system.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    deviceCapacityProvided: 1,
    effects: [
      ...SMARTGUN_SYSTEM_EFFECTS,
      'Mounts via an Engineering + Logic (4, 1 hour) Extended Test.',
    ],
    wirelessBonuses: SMARTGUN_SYSTEM_WIRELESS_BONUSES,
  },
});

const spare_clip = weaponAccessoryWireless({
  id: 'spare_clip',
  label: 'Spare Clip',
  mount: null,
  cost: 5,
  availability: 2,
  description: 'An unloaded magazine for a specific weapon.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    wirelessBonuses: ['Live ammo count even without a smartgun system.'],
  },
});

const speed_loader = weaponAccessory({
  id: 'speed_loader',
  label: 'Speed Loader',
  mount: null,
  cost: 25,
  availability: 1,
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      'Lets a revolver fully reload as a Minor Action.',
      'Weapon-specific.',
    ],
  },
});

const tripod = weaponAccessoryWireless({
  id: 'tripod',
  label: 'Tripod',
  mount: 'underbarrel',
  cost: 500,
  availability: 2,
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      'Negates SA/BF Attack Rating penalties when deployed.',
      '+3 Attack Rating on Full-Auto when deployed.',
      'Deployed kneeling or sitting.',
    ],
    wirelessBonuses: ['Free Minor Action on fold, deploy, or remove.'],
  },
});

const silencer_suppressor_integral = integralAccessory({
  id: 'silencer_suppressor_integral',
  label: 'Silencer/Suppressor (Integral)',
  wireless: true,
  description: 'A suppressor built into the weapon\u2019s barrel or shroud rather than threaded onto it.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: ['+2 threshold to notice the shot or locate the firer.'],
    wirelessBonuses: ['An AR alert if someone nearby reacts to the muffled shot.'],
  },
});

const laser_sight_integral = integralAccessory({
  id: 'laser_sight_integral',
  label: 'Laser Sight (Integral)',
  description: 'A laser sight machined into the weapon rather than rail-mounted.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      'Attack Rating bonus is already included in this weapon\u2019s listed Attack Ratings.',
      'Not cumulative with a smartlink.',
    ],
  },
});

const bipod_integral = integralAccessory({
  id: 'bipod_integral',
  label: 'Bipod (Integral)',
  wireless: true,
  description: 'A bipod that folds flat against the receiver rather than clipping on.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      '+2 Attack Rating when deployed prone or sitting.',
      'Requires a rigid stock.',
    ],
    wirelessBonuses: ['+3 Attack Rating instead of +2 when deployed.'],
  },
});

const flashlight_integral = integralAccessory({
  id: 'flashlight_integral',
  label: 'Flashlight, 3-Setting (Integral)',
  description: 'A weapon light built into the fore-end, switchable between three output modes.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    effects: [
      'Three settings, tuned to benefit low-light, thermographic, or regular vision.',
      'Switching setting is a Minor Action.',
    ],
  },
});

const imaging_scope_integral = integralAccessory({
  id: 'imaging_scope_integral',
  label: 'Imaging Scope (Integral)',
  wireless: true,
  description: 'A magnifying optic built into the weapon\u2019s receiver.',
  referenceOnly: true,
  tags: ['weapon_accessory'],
  stats: {
    deviceCapacityProvided: 3,
    effects: [
      'Denies the target Edge from a higher Defense Rating.',
      'Requires a Take Aim action to benefit.',
    ],
    wirelessBonuses: ['Shareable "line of sight" feed with the team.'],
  },
});

export const AMMO_TYPES = [
  {
    label: 'APDS',
    attackRatingModifier: 2,
    damageValueModifier: -1,
    costMultiplier: 3,
    description: 'Armor-piercing discarding sabot — ultra-hard penetrator at high velocity.',
  },
  {
    label: 'Explosive',
    attackRatingModifier: 0,
    damageValueModifier: 1,
    costMultiplier: 2,
    description: 'Shaped-charge slugs. A critical glitch causes a misfire — the attacker resists the weapon\'s own DV, the attack misses, and the weapon is destroyed.',
  },
  {
    label: 'Flechette',
    attackRatingModifier: 1,
    damageValueModifier: -1,
    costMultiplier: 1.5,
    description: 'More spread, less kinetic energy than standard rounds.',
  },
  {
    label: 'Gel',
    attackRatingModifier: 0,
    damageValueModifier: 'Stun',
    costMultiplier: 1.5,
    description: 'Flattens on impact; nonlethal subdual. A hit target tests Agility (2) or Body (4) or goes Prone.',
  },
  {
    label: 'Stick-n-Shock',
    attackRatingModifier: 1,
    damageValueModifier: '-1S(e)',
    costMultiplier: 2,
    description: 'Turns any gun into a taser — Stun damage + Zapped, less punch than a standard round.',
  },
  {
    label: 'Caseless',
    attackRatingModifier: 0,
    damageValueModifier: 0,
    costMultiplier: 2,
    description: 'Rarer than cased — harder to track, harder to find.',
  },
];

export const AMMO_BASE_COST_BY_CLASS = [
  { weaponClass: 'Hold-out/Light Pistol/Machine Pistol', availability: 1, costPer10: 5 },
  { weaponClass: 'Heavy Pistol/SMG', availability: 1, costPer10: 10 },
  { weaponClass: 'Rifles', availability: 2, legality: 'licensed', costPer10: 20 },
  { weaponClass: 'Taser', availability: 1, costPer10: 10 },
  { weaponClass: 'Injection Dart', availability: 2, costPer10: 5, note: '+ cost of toxin payload' },
  { weaponClass: 'Assault Cannon', availability: 4, legality: 'illegal', costPer10: 50 },
  { weaponClass: 'Machine Gun', availability: 2, legality: 'licensed', costPer10: 15 },
  { weaponClass: 'DMSO', availability: 1, costPer10: 10 },
  { weaponClass: 'Shotgun', availability: 2, legality: 'licensed', costPer10: 15 },
];

const ammo_pistol_regular = {
  id: 'ammo_pistol_regular',
  label: 'Ammo, Regular (Hold-out/Light/Machine Pistol)',
  category: 'ammo',
  cost: 5,
  availability: 1,
  legality: null,
  description: 'Per 10 rounds.',
  tags: ['ammo'],
  stats: { weaponClass: 'Hold-out/Light Pistol/Machine Pistol' },
};

const ammo_heavy_pistol_smg_regular = {
  id: 'ammo_heavy_pistol_smg_regular',
  label: 'Ammo, Regular (Heavy Pistol/SMG)',
  category: 'ammo',
  cost: 10,
  availability: 1,
  legality: null,
  description: 'Per 10 rounds.',
  tags: ['ammo'],
  stats: { weaponClass: 'Heavy Pistol/SMG' },
};

const ammo_rifle_regular = {
  id: 'ammo_rifle_regular',
  label: 'Ammo, Regular (Rifle)',
  category: 'ammo',
  cost: 20,
  availability: 2,
  legality: 'licensed',
  description: 'Per 10 rounds.',
  tags: ['ammo'],
  stats: { weaponClass: 'Rifles' },
};

const ammo_taser_regular = {
  id: 'ammo_taser_regular',
  label: 'Ammo, Regular (Taser)',
  category: 'ammo',
  cost: 10,
  availability: 1,
  legality: null,
  description: 'Per 10 rounds/darts.',
  tags: ['ammo'],
  stats: { weaponClass: 'Taser' },
};

const ammo_injection_dart_regular = {
  id: 'ammo_injection_dart_regular',
  label: 'Injection Dart',
  category: 'ammo',
  cost: 5,
  availability: 2,
  legality: null,
  description: 'Per 10 darts, plus the cost of whatever toxin payload is loaded.',
  referenceOnly: true,
  tags: ['ammo'],
  stats: {
    weaponClass: 'Injection Dart',
    effects: ['Delivery needs 1+ net hit against an unarmored target, or 2+ against any armor.'],
  },
};

const ammo_assault_cannon_regular = {
  id: 'ammo_assault_cannon_regular',
  label: 'Ammo, Assault Cannon',
  category: 'ammo',
  cost: 50,
  availability: 4,
  legality: 'illegal',
  description: 'Per 10 rounds.',
  referenceOnly: true,
  tags: ['ammo'],
  stats: {
    weaponClass: 'Assault Cannon',
    effects: ['The only ammo assault cannons load — can\u2019t be modified with other ammo types.'],
  },
};

const ammo_machine_gun_regular = {
  id: 'ammo_machine_gun_regular',
  label: 'Ammo, Regular (Machine Gun)',
  category: 'ammo',
  cost: 15,
  availability: 2,
  legality: 'licensed',
  description: 'Per 10 rounds.',
  tags: ['ammo'],
  stats: { weaponClass: 'Machine Gun' },
};

const ammo_dmso = {
  id: 'ammo_dmso',
  label: 'DMSO',
  category: 'ammo',
  cost: 10,
  availability: 1,
  legality: null,
  description: 'Per 10 doses. Carrier compound for chemical/toxin delivery.',
  tags: ['ammo'],
  stats: { weaponClass: 'DMSO' },
};

const ammo_shotgun_regular = {
  id: 'ammo_shotgun_regular',
  label: 'Ammo, Regular (Shotgun)',
  category: 'ammo',
  cost: 15,
  availability: 2,
  legality: 'licensed',
  description: 'Per 10 rounds.',
  tags: ['ammo'],
  stats: { weaponClass: 'Shotgun' },
};

const GRENADE_WIRELESS_BONUS = 'Wireless link trigger usable via commlink ARO even without DNI.';

const grenade_stun = explosiveItem({
  id: 'grenade_stun',
  label: 'Grenade, Stun',
  cost: 100,
  availability: 4,
  legality: 'licensed',
  wireless: true,
  description: 'Flash-bang.',
  referenceOnly: true,
  tags: ['grenade'],
  stats: {
    damageValue: '10S/8S/6S',
    blast: 15,
    effects: ['Anyone in the Blast also gets Blinded I, Deafened I, and Dazed.'],
    wirelessBonuses: [GRENADE_WIRELESS_BONUS],
  },
});

const grenade_fragmentation = explosiveItem({
  id: 'grenade_fragmentation',
  label: 'Grenade, Fragmentation',
  cost: 150,
  availability: 4,
  wireless: true,
  description: 'Classic wide-area shrapnel grenade.',
  referenceOnly: true,
  tags: ['grenade'],
  stats: {
    damageValue: '16P/12P/8P',
    blast: 20,
    wirelessBonuses: [GRENADE_WIRELESS_BONUS],
  },
});

const grenade_high_explosive = explosiveItem({
  id: 'grenade_high_explosive',
  label: 'Grenade, High Explosive',
  cost: 150,
  availability: 4,
  wireless: true,
  description: 'Powerful blast over a smaller area than Fragmentation.',
  referenceOnly: true,
  tags: ['grenade'],
  stats: {
    damageValue: '16P/10P/4P',
    blast: 15,
    wirelessBonuses: [GRENADE_WIRELESS_BONUS],
  },
});

const grenade_gas = explosiveItem({
  id: 'grenade_gas',
  label: 'Grenade, Gas',
  cost: 50,
  availability: 4,
  wireless: true,
  description: 'Cost is the grenade shell plus 20 doses of chemical payload.',
  referenceOnly: true,
  tags: ['grenade'],
  stats: {
    effects: [
      'Carries any chemical or toxin payload.',
      'The cloud lasts about 10 rounds.',
    ],
    wirelessBonuses: [GRENADE_WIRELESS_BONUS],
  },
});

const grenade_smoke = explosiveItem({
  id: 'grenade_smoke',
  label: 'Grenade, Smoke/Thermal Smoke',
  cost: 50,
  availability: 4,
  wireless: true,
  description: 'Obscures vision across a wide area.',
  referenceOnly: true,
  tags: ['grenade'],
  stats: {
    effects: [
      'Blinded I acting through the smoke, or Blinded II acting from within it.',
      'Lasts about 10 rounds.',
    ],
    wirelessBonuses: [GRENADE_WIRELESS_BONUS],
  },
});

const flash_pak = explosiveItem({
  id: 'flash_pak',
  label: 'Flash-Pak',
  cost: 125,
  availability: 4,
  legality: 'licensed',
  wireless: true,
  description: 'A 10x10x2cm strobing device, not a grenade proper.',
  referenceOnly: true,
  tags: ['grenade'],
  stats: {
    damageValue: 'BIII/BII/BI',
    blast: 10,
    effects: [
      'Anyone using standard vision in range gets Blinded — worse with low-light, better with flare compensation, no effect on thermographic or ultrasound.',
      '10 charges, 1 used per round.',
    ],
    wirelessBonuses: [
      'Can spare a subscribed or paired character from the effect.',
      'Recharges by induction at 1 charge per hour.',
    ],
  },
});

const ROCKET_WIRELESS_BONUS = 'Wireless link trigger without DNI.';

const rocket_anti_vehicle = explosiveItem({
  id: 'rocket_anti_vehicle',
  label: 'Anti-Vehicle Rocket',
  cost: 2800,
  availability: 5,
  wireless: true,
  description: 'A shaped-charge warhead for burning through vehicles and barriers.',
  referenceOnly: true,
  tags: ['rocket'],
  stats: {
    damageValue: '12P/8P/4P',
    blast: 10,
    effects: ['+2 Attack Rating vs. vehicles.'],
    wirelessBonuses: [ROCKET_WIRELESS_BONUS],
  },
});

const rocket_fragmentation = explosiveItem({
  id: 'rocket_fragmentation',
  label: 'Fragmentation Rocket',
  cost: 2000,
  availability: 5,
  wireless: true,
  description: 'Anti-personnel shrapnel; poor against structures and vehicles.',
  referenceOnly: true,
  tags: ['rocket'],
  stats: {
    damageValue: '16P/12P/8P',
    blast: 30,
    wirelessBonuses: [ROCKET_WIRELESS_BONUS],
  },
});

const rocket_high_explosive = explosiveItem({
  id: 'rocket_high_explosive',
  label: 'High Explosive Rocket',
  cost: 2100,
  availability: 5,
  wireless: true,
  description: 'Heavy damage in a small area — grenade-like, but larger.',
  referenceOnly: true,
  tags: ['rocket'],
  stats: {
    damageValue: '16P/10P/4P',
    blast: 20,
    wirelessBonuses: [ROCKET_WIRELESS_BONUS],
  },
});

const rocket_gas = explosiveItem({
  id: 'rocket_gas',
  label: 'Gas Rocket',
  cost: 750,
  availability: 4,
  wireless: true,
  description: 'Cost is the rocket plus a 100-dose payload.',
  referenceOnly: true,
  tags: ['rocket'],
  stats: {
    effects: [
      'Carries any chemical or toxin payload, delivered at range.',
      'The cloud lasts about 10 rounds.',
    ],
    wirelessBonuses: [ROCKET_WIRELESS_BONUS],
  },
});

const rocket_smoke = explosiveItem({
  id: 'rocket_smoke',
  label: 'Smoke/Thermal Smoke Rocket',
  cost: 1200,
  availability: 4,
  wireless: true,
  description: 'The Smoke grenade, delivered at range.',
  referenceOnly: true,
  tags: ['rocket'],
  stats: {
    effects: [
      'Blinded I acting through the smoke, or Blinded II acting from within it.',
      'Lasts about 10 rounds.',
    ],
    wirelessBonuses: [ROCKET_WIRELESS_BONUS],
  },
});

export const MISSILE_VARIANT_MODIFIER = {
  description: 'Any rocket above can be bought as a missile variant instead — same DV/Blast, +1 Availability, +2 Attack Rating, cost = rocket cost + (Sensor rating x 500¥) for the guidance system.',
  availabilityModifier: 1,
  attackRatingBonus: 2,
  costPerSensorRating: 500,
};

export const EXPLOSIVE_RATING_BANDS = [
  { ratingRange: [1, 3], availability: 1, costPerRating: 10 },
  { ratingRange: [4, 6], availability: 2, costPerRating: 50 },
  { ratingRange: [7, 9], availability: 3, costPerRating: 100 },
  { ratingRange: [10, 12], availability: 4, costPerRating: 250 },
  { ratingRange: [13, 15], availability: 5, costPerRating: 500 },
  { ratingRange: [16, 18], availability: 6, costPerRating: 1000 },
  { ratingRange: [19, 20], availability: 7, costPerRating: 5000 },
];

const explosive_package_plastic = explosiveItem({
  id: 'explosive_package_plastic',
  label: 'Explosive Package, Plastic',
  cost: null,
  availability: null,
  description: 'Stable, moldable, adhesive, military-grade; color-tinted by the detonation current needed. Bought at a chosen Rating combining power and quantity — see EXPLOSIVE_RATING_BANDS.',
  referenceOnly: true,
  tags: ['conventional_explosive'],
  stats: {
    ratingRange: [1, 20],
    effects: ['Packages can\u2019t be combined across rating bands.'],
  },
});

const explosive_package_foam = explosiveItem({
  id: 'explosive_package_foam',
  label: 'Explosive Package, Foam',
  cost: null,
  availability: null,
  description: 'Shaving-cream-consistency plastic explosive in an aerosol can, good for spraying into crevices. Same rating-band pricing as regular plastic.',
  referenceOnly: true,
  tags: ['conventional_explosive'],
  stats: {
    ratingRange: [1, 20],
    effects: [
      'Detonates the same way as regular plastic explosive.',
      'Packages can\u2019t be combined across rating bands.',
    ],
  },
});

const detonator_cap = explosiveItem({
  id: 'detonator_cap',
  label: 'Detonator Cap',
  cost: 75,
  availability: 4,
  wireless: true,
  description: 'Inserted into an explosive mass, set off by programmable timer or radio signal.',
  referenceOnly: true,
  tags: ['conventional_explosive'],
  stats: {
    effects: ['Setting the timer is a Major Action.'],
    wirelessBonuses: [
      'Set the timer as a Minor Action instead of a Major Action.',
      'Adds a Minor Action DNI-linked "detonate" command.',
    ],
  },
});

export const GEAR_FIREARMS_EXPLOSIVES = {
  defiance_super_shock, yamaha_pulsar_i, yamaha_pulsar_ii,
  fichetti_tiffani_needler, streetline_special, walther_palm_pistol,
  ares_light_fire_70, ares_light_fire_75, beretta_101t, beretta_201t, colt_america_l36, fichetti_security_600, ruger_redhawk,
  ares_crusader_ii, ceska_black_scorpion, steyr_tmp,
  ares_predator_vi, ares_viper_slivergun, browning_ultra_power, colt_government_2076, colt_manhunter, ruger_super_warhawk,
  colt_cobra_tz100, colt_cobra_tz110, colt_cobra_tz120, fn_p93_praetor, hk_227, ingram_smartgun_xi, sck_model_100, uzi_v,
  defiance_t250, defiance_t250_short_barreled, mossberg_cmdt, mossberg_cmdt_drum, pjss_model_55, remington_roomsweeper,
  ak_97, ares_alpha, colt_m23, fn_har, yamaha_raiden, ares_desert_strike, cavalier_arms_crockett_ebr, ranger_arms_sm5, remington_900, ruger_101, barret_model_122,
  ingram_valiant, stoner_ares_m202, rpk_hmg, panther_xxl,
  ares_super_squirt, parashield_dart_pistol, parashield_dart_rifle,
  ares_antioch_ii, armtech_mgl6, armtech_mgl12, aztechnology_striker, onotari_interceptor,
  airburst_link, bipod, concealable_holster, gas_vent_system, weapon_gyro_mount, weapon_hidden_arm_slide,
  imaging_scope_weapon_accessory, laser_sight_weapon_accessory, periscope_weapon_accessory, quick_draw_holster, shock_pads,
  silencer_suppressor_weapon_accessory, smart_firing_platform, smartgun_system_internal, smartgun_system_external,
  spare_clip, speed_loader, tripod,
  silencer_suppressor_integral, laser_sight_integral, imaging_scope_integral, bipod_integral, flashlight_integral,
  ammo_pistol_regular, ammo_heavy_pistol_smg_regular, ammo_rifle_regular, ammo_taser_regular, ammo_injection_dart_regular,
  ammo_assault_cannon_regular, ammo_machine_gun_regular, ammo_dmso, ammo_shotgun_regular,
  grenade_stun, grenade_fragmentation, grenade_high_explosive, grenade_gas, grenade_smoke, flash_pak,
  rocket_anti_vehicle, rocket_fragmentation, rocket_high_explosive, rocket_gas, rocket_smoke,
  explosive_package_plastic, explosive_package_foam, detonator_cap,
};

export const GEAR_FIREARMS_EXPLOSIVES_IDS = Object.keys(GEAR_FIREARMS_EXPLOSIVES);
