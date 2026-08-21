// Firearms, Accessories, Ammo & Explosives catalog — the largest gear
// chapter. Same envelope as GEAR.js, using the weapon-family stats shape
// established in GEAR_MELEE_THROWN.js (damageValue, attackRatings,
// skill), extended with `modes` and `ammo` for real guns.
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
// 6. `wireless: true` marks weapons/accessories with a real electronic/
//    networked component — smartgun systems specifically, plus a couple
//    of explicit cases (wireless capacitors, wireless-triggered coating,
//    an Airburst Link's own wireless requirement). Mechanical accessories
//    (laser sights, gas-vent systems, stocks, tripods/bipods) stay
//    unmarked — no data component. See the PAN conversation for the
//    full per-item reasoning.

function firearm(overrides) {
  return { category: 'firearm', legality: 'licensed', skill: 'firearms', ...overrides };
}
function firearmWireless(overrides) {
  return firearm({ wireless: true, ...overrides });
}
function exoticFirearm(overrides) {
  return { category: 'firearm', legality: 'licensed', skill: 'exotic_weapons', ...overrides };
}
function exoticFirearmWireless(overrides) {
  return exoticFirearm({ wireless: true, ...overrides });
}
function weaponAccessory(overrides) {
  return { category: 'weapon_accessory', legality: null, ...overrides };
}
function weaponAccessoryWireless(overrides) {
  return weaponAccessory({ wireless: true, ...overrides });
}
function explosiveItem(overrides) {
  return { category: 'explosive', legality: 'illegal', ...overrides };
}

// ============================================================================
// TASERS — accept top-mounted accessories only
// ============================================================================

const defiance_super_shock = firearm({
  id: 'defiance_super_shock',
  label: 'Defiance Super Shock',
  cost: 340,
  availability: 1,
  legality: null,
  description: 'Fires up to 4 wired darts (20m wire), more powerful but shorter-ranged than wireless models; usable point-blank in Close Combat for the same damage.',
  tags: ['taser'],
  stats: {
    damageValue: '6S(e)',
    modes: ['SS'],
    attackRatings: [10, 6, null, null, null],
    ammo: {
      capacity: 4,
      container: 'm',
    },
  },
});

const yamaha_pulsar_i = firearmWireless({
  id: 'yamaha_pulsar_i',
  label: 'Yamaha Pulsar I',
  cost: 325,
  availability: 1,
  legality: null,
  description: 'Wireless capacitors mean longer range but less punch, firing faster for repeat hits. No melee grip contacts.',
  tags: ['taser'],
  stats: {
    damageValue: '4S(e)',
    modes: ['SS'],
    attackRatings: [9, 9, null, null, null],
    ammo: {
      capacity: 4,
      container: 'm',
    },
  },
});

const yamaha_pulsar_ii = firearmWireless({
  id: 'yamaha_pulsar_ii',
  label: 'Yamaha Pulsar II',
  cost: 350,
  availability: 1,
  legality: null,
  description: 'As the Pulsar I, plus melee grip contacts — treat as a Close Combat Club attack.',
  tags: ['taser'],
  stats: {
    damageValue: '4S(e)',
    modes: ['SS'],
    attackRatings: [9, 9, null, null, null],
    ammo: {
      capacity: 4,
      container: 'm',
    },
  },
});

// ============================================================================
// HOLD-OUTS — can't take accessories or modifications
// ============================================================================

const fichetti_tiffani_needler = firearmWireless({
  id: 'fichetti_tiffani_needler',
  label: 'Fichetti Tiffani Needler',
  cost: 435,
  availability: 2,
  description: "The world's most popular designer handgun; color-changing coating via wireless signal, caseless flechette-only.",
  tags: ['holdout'],
  stats: {
    damageValue: '3P',
    modes: ['SS'],
    attackRatings: [10, 6, 2, null, null],
    ammo: {
      capacity: 4,
      container: 'c',
    },
  },
});

const streetline_special = firearm({
  id: 'streetline_special',
  label: 'Streetline Special',
  cost: 200,
  availability: 2,
  description: 'Cheap 3D-nanoprinted composite construction, harder to detect with MAD scanners (+1 threshold).',
  tags: ['holdout'],
  stats: {
    damageValue: '2P',
    modes: ['SS'],
    attackRatings: [8, 8, null, null, null],
    ammo: {
      capacity: 6,
      container: 'c',
    },
  },
});

const walther_palm_pistol = firearm({
  id: 'walther_palm_pistol',
  label: 'Walther Palm Pistol',
  cost: 345,
  availability: 2,
  description: 'Double-barreled over-under derringer; Burst Fire = both barrels at once, only 6-shot capacity.',
  tags: ['holdout'],
  stats: {
    damageValue: '2P',
    modes: ['SS', 'BF'],
    attackRatings: [12, 7, null, null, null],
    ammo: {
      capacity: 6,
      container: 'b',
    },
  },
});

// ============================================================================
// LIGHT PISTOLS — top and barrel mounts
// ============================================================================

const ares_light_fire_70 = firearm({
  id: 'ares_light_fire_70',
  label: 'Ares Light Fire 70',
  cost: 350,
  availability: 3,
  description: 'Special-ops design with a built-in barrel silencer (+3 threshold to notice).',
  tags: ['light_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA'],
    attackRatings: [10, 7, 6, null, null],
    ammo: {
      capacity: 16,
      container: 'c',
    },
  },
});

const ares_light_fire_75 = firearmWireless({
  id: 'ares_light_fire_75',
  label: 'Ares Light Fire 75',
  cost: 400,
  availability: 3,
  description: 'As the 70, plus preloaded smartlink hardware. Not legally common.',
  tags: ['light_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA'],
    attackRatings: [10, 7, 6, null, null],
    ammo: {
      capacity: 16,
      container: 'c',
    },
  },
});

const beretta_101t = firearm({
  id: 'beretta_101t',
  label: 'Beretta 101T',
  cost: 260,
  availability: 2,
  description: 'Shares a frame with the 201T for easy disguise. Detachable shoulder stock, often lost before street sale.',
  tags: ['light_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA'],
    attackRatings: [9, 8, 6, null, null],
    ammo: {
      capacity: 21,
      container: 'c',
    },
  },
});

const beretta_201t = firearm({
  id: 'beretta_201t',
  label: 'Beretta 201T',
  cost: 460,
  availability: 3,
  description: "Automatic fire capability, popular where heavy/machine pistols are restricted.",
  tags: ['light_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA', 'FA'],
    attackRatings: [9, 8, 6, null, null],
    ammo: {
      capacity: 21,
      container: 'c',
    },
  },
});

const colt_america_l36 = firearm({
  id: 'colt_america_l36',
  label: 'Colt America L36',
  cost: 230,
  availability: 2,
  description: "Cheap, concealable, an ownership-swap feature abused by cops and crooks alike.",
  tags: ['light_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA'],
    attackRatings: [8, 8, 6, null, null],
    ammo: {
      capacity: 11,
      container: 'c',
    },
  },
});

const fichetti_security_600 = firearm({
  id: 'fichetti_security_600',
  label: 'Fichetti Security 600',
  cost: 390,
  availability: 3,
  description: '30-round magazine security sidearm, popular with deckers for the ammo buffer. Detachable folding stock and laser sight.',
  tags: ['light_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA'],
    attackRatings: [10, 9, 6, null, null],
    ammo: {
      capacity: 30,
      container: 'c',
    },
  },
});

const ruger_redhawk = firearm({
  id: 'ruger_redhawk',
  label: 'Ruger Redhawk',
  cost: 250,
  availability: 2,
  description: 'Single/double firing selector: double action = Semi-Auto Fire, single action = Burst Fire.',
  tags: ['light_pistol'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [7, 10, 7, null, null],
    ammo: {
      capacity: 8,
      container: 'cy',
    },
  },
});

// ============================================================================
// MACHINE PISTOLS — top and barrel mounts
// ============================================================================

const ares_crusader_ii = firearmWireless({
  id: 'ares_crusader_ii',
  label: 'Ares Crusader II',
  cost: 520,
  availability: 4,
  description: 'High capacity, gas-vent recoil compensation, preloaded smartgun.',
  tags: ['machine_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA', 'BF'],
    attackRatings: [9, 9, 7, null, null],
    ammo: {
      capacity: 40,
      container: 'c',
    },
  },
});

const ceska_black_scorpion = firearm({
  id: 'ceska_black_scorpion',
  label: 'Ceska Black Scorpion',
  cost: 510,
  availability: 3,
  description: 'Small, Burst Fire capable, integral folding stock.',
  tags: ['machine_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA', 'BF'],
    attackRatings: [10, 9, 8, null, null],
    ammo: {
      capacity: 35,
      container: 'c',
    },
  },
});

const steyr_tmp = firearm({
  id: 'steyr_tmp',
  label: 'Steyr TMP',
  cost: 690,
  availability: 3,
  description: 'Lightweight polymer frame with full-auto capability. Standard top-mounted laser sight.',
  tags: ['machine_pistol'],
  stats: {
    damageValue: '2P',
    modes: ['SA', 'FA'],
    attackRatings: [8, 8, 6, null, null],
    ammo: {
      capacity: 30,
      container: 'c',
    },
  },
});

// ============================================================================
// HEAVY PISTOLS — top and barrel mounts
// ============================================================================

const ares_predator_vi = firearmWireless({
  id: 'ares_predator_vi',
  label: 'Ares Predator VI',
  cost: 750,
  availability: 2,
  description: 'Standard smartgun, Burst Fire, variable ammunition system letting one magazine carry different ammo types.',
  tags: ['heavy_pistol'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [10, 10, 8, null, null],
    ammo: {
      capacity: 15,
      container: 'c',
    },
  },
});

const ares_viper_slivergun = firearm({
  id: 'ares_viper_slivergun',
  label: 'Ares Viper Slivergun',
  cost: 610,
  availability: 4,
  description: 'Fires flechette-classed metal slivers unique to this gun. Burst Fire, integrated barrel silencer, large capacity.',
  tags: ['heavy_pistol'],
  stats: {
    damageValue: '2P(fl)',
    modes: ['SA', 'BF'],
    attackRatings: [13, 9, 7, null, null],
    ammo: {
      capacity: 30,
      container: 'c',
    },
  },
});

const browning_ultra_power = firearm({
  id: 'browning_ultra_power',
  label: 'Browning Ultra Power',
  cost: 315,
  availability: 2,
  description: "The Predator's former rival, cheaper, hasn't kept pace tech-wise. Built-in top laser sight.",
  tags: ['heavy_pistol'],
  stats: {
    damageValue: '3P',
    modes: ['SA'],
    attackRatings: [10, 9, 6, null, null],
    ammo: {
      capacity: 10,
      container: 'c',
    },
  },
});

const colt_government_2076 = firearm({
  id: 'colt_government_2076',
  label: 'Colt Government 2076',
  cost: 275,
  availability: 3,
  description: "A callback to the classic Manhunter design after post-'60s hacking fears sidelined the electronic-fire 2076. Integral laser sight.",
  tags: ['heavy_pistol'],
  stats: {
    damageValue: '3P',
    modes: ['SA'],
    attackRatings: [10, 8, 6, null, null],
    ammo: {
      capacity: 14,
      container: 'c',
    },
  },
});

const colt_manhunter = firearmWireless({
  id: 'colt_manhunter',
  label: 'Colt Manhunter',
  cost: 500,
  availability: 3,
  description: 'The smartgun-equipped variant of the 2076, carrying the classic Manhunter name.',
  tags: ['heavy_pistol'],
  stats: {
    damageValue: '3P',
    modes: ['SA'],
    attackRatings: [10, 8, 6, null, null],
    ammo: {
      capacity: 14,
      container: 'c',
    },
  },
});

const ruger_super_warhawk = firearm({
  id: 'ruger_super_warhawk',
  label: 'Ruger Super Warhawk',
  cost: 400,
  availability: 3,
  description: 'Flashy chrome revolver, big holes out of the box, more precise with upgrades.',
  tags: ['heavy_pistol'],
  stats: {
    damageValue: '4P',
    modes: ['SA'],
    attackRatings: [8, 11, 8, null, null],
    ammo: {
      capacity: 6,
      container: 'cy',
    },
  },
});

// ============================================================================
// SUBMACHINE GUNS — top and barrel mounts
// ============================================================================

const colt_cobra_tz100 = firearm({
  id: 'colt_cobra_tz100',
  label: 'Colt Cobra TZ-100',
  cost: 730,
  availability: 2,
  description: 'Folding stock. First of an increasing-accessory line, popular with security and trid shows alike.',
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [9, 9, 6, null, null],
    ammo: {
      capacity: 32,
      container: 'c',
    },
  },
});

const colt_cobra_tz110 = firearm({
  id: 'colt_cobra_tz110',
  label: 'Colt Cobra TZ-110',
  cost: 785,
  availability: 2,
  description: 'As the TZ-100, plus a laser sight.',
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [10, 10, 7, null, null],
    ammo: {
      capacity: 32,
      container: 'c',
    },
  },
});

const colt_cobra_tz120 = firearm({
  id: 'colt_cobra_tz120',
  label: 'Colt Cobra TZ-120',
  cost: 840,
  availability: 3,
  description: 'As the TZ-110, plus a gas-vent system.',
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [10, 11, 8, null, null],
    ammo: {
      capacity: 32,
      container: 'c',
    },
  },
});

const fn_p93_praetor = firearm({
  id: 'fn_p93_praetor',
  label: 'FN P93 Praetor',
  cost: 925,
  availability: 4,
  description: 'Intimidating bullpup design; integrated rigid stock, laser sight, and a 3-setting flashlight.',
  tags: ['smg'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [9, 12, 7, null, null],
    ammo: {
      capacity: 50,
      container: 'c',
    },
  },
});

const hk_227 = firearmWireless({
  id: 'hk_227',
  label: 'HK-227',
  cost: 825,
  availability: 3,
  description: 'Built on the century-old MP5 frame; retractable stock, smartgun, integral barrel silencer.',
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [10, 11, 8, null, null],
    ammo: {
      capacity: 28,
      container: 'c',
    },
  },
});

const ingram_smartgun_xi = firearmWireless({
  id: 'ingram_smartgun_xi',
  label: 'Ingram Smartgun XI',
  cost: 750,
  availability: 3,
  description: 'A legendary street samurai weapon of choice since the 2050s; gas-vent, smartgun, integral silencer.',
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [11, 9, 6, null, null],
    ammo: {
      capacity: 32,
      container: 'c',
    },
  },
});

const sck_model_100 = firearmWireless({
  id: 'sck_model_100',
  label: 'SCK Model 100',
  cost: 725,
  availability: 3,
  description: 'Japanacorp standard issue (Red Samurai-associated); internal smartgun, folding stock.',
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF'],
    attackRatings: [10, 10, 7, null, null],
    ammo: {
      capacity: 30,
      container: 'c',
    },
  },
});

const uzi_v = firearm({
  id: 'uzi_v',
  label: 'Uzi V',
  cost: 455,
  availability: 2,
  description: "Spinrad Global's latest entry; integral folding stock, built-in top laser sight.",
  tags: ['smg'],
  stats: {
    damageValue: '3P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [8, 8, 7, null, null],
    ammo: {
      capacity: 24,
      container: 'c',
    },
  },
});

// ============================================================================
// SHOTGUNS — stats are for normal slug rounds; top, barrel, underbarrel mounts
// ============================================================================

const defiance_t250 = firearm({
  id: 'defiance_t250',
  label: 'Defiance T-250',
  cost: 330,
  availability: 2,
  description: 'Semi-auto street howitzer, gas-operated with a secondary pump action to clear glitch-jams. Short-barreled variant: Concealability 3, DV 3P, AR 8/8/4/-/-.',
  tags: ['shotgun'],
  stats: {
    damageValue: '4P',
    modes: ['SS', 'SA'],
    attackRatings: [7, 10, 6, null, null],
    ammo: {
      capacity: 5,
      container: 'm',
    },
  },
});

const mossberg_cmdt = firearm({
  id: 'mossberg_cmdt',
  label: 'Mossberg CMDT',
  cost: 700,
  availability: 4,
  description: '10-round clip or 24-round drum, burst fire, top laser sight.',
  tags: ['shotgun'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF'],
    attackRatings: [4, 11, 7, null, null],
    ammo: {
      capacity: 10,
      container: 'c',
    },
  },
});

const pjss_model_55 = firearm({
  id: 'pjss_model_55',
  label: 'PJSS Model 55',
  cost: 325,
  availability: 5,
  description: 'A European hunter/trap-shooter status symbol; rigid stock with shock pad, can fire both barrels at once as a short burst.',
  tags: ['shotgun'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF (short)'],
    attackRatings: [3, 12, 8, null, null],
    ammo: {
      capacity: 2,
      container: 'b',
    },
  },
});

const remington_roomsweeper = firearm({
  id: 'remington_roomsweeper',
  label: 'Remington Roomsweeper',
  cost: 325,
  availability: 2,
  description: 'Double-barreled, pistol-gripped; loadable with Heavy Pistol rounds for an inaccurate hand cannon if not using flechette.',
  tags: ['shotgun'],
  stats: {
    damageValue: '5P',
    modes: ['SA'],
    attackRatings: [9, 8, 4, null, null],
    ammo: {
      capacity: 8,
      container: 'm',
    },
  },
});

// ============================================================================
// RIFLES — top, barrel, underbarrel mounts
// ============================================================================

const ak_97 = firearm({
  id: 'ak_97',
  label: 'AK-97',
  cost: 2100,
  availability: 2,
  description: 'The eternal classic, unchanged look since the 20th century.',
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [4, 11, 9, 7, 1],
    ammo: {
      capacity: 38,
      container: 'c',
    },
  },
});

const ares_alpha = firearmWireless({
  id: 'ares_alpha',
  label: 'Ares Alpha',
  cost: 3400,
  availability: 5,
  description: 'Made famous by Ares Firewatch; integrated underbarrel grenade launcher, smartgun, superior handling design.',
  tags: ['rifle'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [4, 10, 9, 7, 2],
    ammo: {
      capacity: 42,
      container: 'c',
    },
    integratedWeapons: [
      {
        label: 'Grenade Launcher (Underbarrel)',
        modes: ['SS'],
        damageValue: 'As grenade loaded',
        attackRatings: [4, 10, 6, 2, null],
        ammo: {
          capacity: 6,
          container: 'c',
        },
      },
    ],
  },
});

const colt_m23 = firearm({
  id: 'colt_m23',
  label: 'Colt M23',
  cost: 2100,
  availability: 2,
  description: 'Cheap, mass-produced, everywhere. Can mount 2 additional underbarrel accessories (3 total).',
  tags: ['rifle'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [5, 8, 8, 8, 1],
    ammo: {
      capacity: 40,
      container: 'c',
    },
  },
});

const fn_har = firearm({
  id: 'fn_har',
  label: 'FN-HAR',
  cost: 2100,
  availability: 3,
  description: 'The private-security/HTR fear-inducer; laser sight and gas-vent system.',
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [3, 11, 10, 6, 1],
    ammo: {
      capacity: 35,
      container: 'c',
    },
  },
});

const yamaha_raiden = firearmWireless({
  id: 'yamaha_raiden',
  label: 'Yamaha Raiden',
  cost: 3200,
  availability: 5,
  description: 'Japanacorp/Imperial Marine standard; electronic firing, integral silencer, smartgun, underbarrel shotgun/grenade launcher.',
  tags: ['rifle'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [4, 11, 10, 7, 2],
    ammo: {
      capacity: 60,
      container: 'c',
    },
    integratedWeapons: [
      {
        label: 'Grenade Launcher (Underbarrel)',
        modes: ['SS'],
        damageValue: 'As grenade loaded',
        attackRatings: [4, 11, 7, 1, null],
        ammo: {
          capacity: 4,
          container: 'c',
        },
      },
      {
        label: 'Shotgun (Underbarrel)',
        modes: ['SS', 'SA'],
        damageValue: '4P',
        attackRatings: [7, 9, 8, null, null],
        ammo: {
          capacity: 2,
          container: 'b',
        },
      },
    ],
  },
});

const ares_desert_strike = firearm({
  id: 'ares_desert_strike',
  label: 'Ares Desert Strike',
  cost: 11000,
  availability: 4,
  legality: 'illegal',
  description: 'Built for harsh conditions; rigid stock with shock pad, detachable imaging scope.',
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SA'],
    attackRatings: [3, 10, 10, 10, 10],
    ammo: {
      capacity: 14,
      container: 'c',
    },
  },
});

const cavalier_arms_crockett_ebr = firearm({
  id: 'cavalier_arms_crockett_ebr',
  label: 'Cavalier Arms Crockett EBR',
  cost: 9050,
  availability: 5,
  legality: 'illegal',
  description: 'A burst-fire-capable sniper rifle; accurate at range but bursts sacrifice repeat precision. Rigid stock with shock pad, detachable imaging scope.',
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SA', 'BF'],
    attackRatings: [3, 8, 11, 8, 8],
    ammo: {
      capacity: 20,
      container: 'c',
    },
  },
});

const ranger_arms_sm5 = firearmWireless({
  id: 'ranger_arms_sm5',
  label: 'Ranger Arms SM-5',
  cost: 13200,
  availability: 5,
  legality: 'illegal',
  description: 'A silenced sniper rifle built for quick in-and-out work; silencer, imaging scope, smartgun, rigid stock. Fits in a briefcase (assembly/breakdown: Firearms + Logic (6, Major Action) Extended test). Note: referred to as "SM-6" in the book\'s prose but "SM-5" in its own stat table — used the table\'s naming here.',
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SA'],
    attackRatings: [3, 6, 9, 11, 12],
    ammo: {
      capacity: 15,
      container: 'c',
    },
  },
});

const remington_900 = firearm({
  id: 'remington_900',
  label: 'Remington 900',
  cost: 12000,
  availability: 3,
  description: 'Classic wooden bolt-action hunting rifle, top imaging scope standard, no underbarrel mounting.',
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SS'],
    attackRatings: [2, 7, 10, 12, 11],
    ammo: {
      capacity: 5,
      container: 'm',
    },
  },
});

const ruger_101 = firearm({
  id: 'ruger_101',
  label: 'Ruger 101',
  cost: 11100,
  availability: 2,
  description: 'Gas-operated hunting favorite, built-in imaging scope, rigid stock with shock pad.',
  tags: ['rifle'],
  stats: {
    damageValue: '5P',
    modes: ['SA'],
    attackRatings: [2, 6, 10, 12, 11],
    ammo: {
      capacity: 8,
      container: 'm',
    },
  },
});

const barret_model_122 = firearmWireless({
  id: 'barret_model_122',
  label: 'Barret Model 122',
  cost: 15200,
  availability: 6,
  legality: 'illegal',
  description: 'An anti-materiel rifle for tearing through vehicles/APCs; silencer, smartgun, folding bipod.',
  tags: ['rifle'],
  stats: {
    damageValue: '6P',
    modes: ['SA'],
    attackRatings: [1, 8, 11, 16, 14],
    ammo: {
      capacity: 10,
      container: 'c',
    },
  },
});

// ============================================================================
// MACHINE GUNS / ASSAULT CANNONS — top, barrel, underbarrel mounts.
// Medium/Heavy MGs need Strength 3+/5+ and are designed vehicle-mounted.
// ============================================================================

const ingram_valiant = firearm({
  id: 'ingram_valiant',
  label: 'Ingram Valiant',
  cost: 4175,
  availability: 4,
  description: 'Light MG, mercenary favorite; rigid stock with shock pad, laser sight, barrel gas-vent.',
  tags: ['machine_gun'],
  stats: {
    damageValue: '4P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [2, 11, 12, 7, 3],
    ammo: {
      options: [
        { capacity: 50, container: 'c' },
        { capacity: 100, container: 'belt' },
      ],
    },
  },
});

const stoner_ares_m202 = firearm({
  id: 'stoner_ares_m202',
  label: 'Stoner-Ares M202',
  cost: 6900,
  availability: 4,
  description: 'Medium MG, tremendous punch, brutally simple, often seen with trolls. Strength 3+.',
  tags: ['machine_gun'],
  stats: {
    damageValue: '5P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [1, 10, 11, 7, 6],
    ammo: {
      options: [
        { capacity: 50, container: 'c' },
        { capacity: 100, container: 'belt' },
      ],
    },
  },
});

const rpk_hmg = firearm({
  id: 'rpk_hmg',
  label: 'RPK HMG',
  cost: 8000,
  availability: 5,
  description: 'Heavy MG, Eastern European/Asian military staple, usually vehicle-mounted; comes with a detachable tripod. Strength 5+.',
  tags: ['machine_gun'],
  stats: {
    damageValue: '6P',
    modes: ['SA', 'BF', 'FA'],
    attackRatings: [1, 10, 12, 8, 7],
    ammo: {
      options: [
        { capacity: 50, container: 'c' },
        { capacity: 100, container: 'belt' },
      ],
    },
  },
});

const panther_xxl = firearmWireless({
  id: 'panther_xxl',
  label: 'Panther XXL',
  cost: 10000,
  availability: 6,
  legality: 'illegal',
  description: 'Assault cannon; bulky, ugly, deadly. Built-in smartgun system.',
  tags: ['machine_gun'],
  stats: {
    damageValue: '7P',
    modes: ['SA'],
    attackRatings: [1, 9, 12, 8, 6],
    ammo: {
      capacity: 15,
      container: 'c',
    },
  },
});

// ============================================================================
// SPECIAL WEAPONS (EXOTIC) — Exotic Weapons skill
// ============================================================================

const ares_super_squirt = exoticFirearm({
  id: 'ares_super_squirt',
  label: 'Ares Super Squirt',
  cost: 560,
  availability: 3,
  description: "A nonlethal DMSO-gel-pack \"paintball marker\" despite the name. No direct damage; drives a chosen chemical payload into the target's bloodstream as a Contact-vector toxin.",
  tags: ['special_weapon'],
  stats: {
    damageValue: 'Special',
    modes: ['SS'],
    attackRatings: [8, 12, 9, null, null],
    ammo: {
      capacity: 20,
      container: 'c',
    },
  },
});

const parashield_dart_pistol = exoticFirearm({
  id: 'parashield_dart_pistol',
  label: 'Parashield DART Pistol',
  cost: 510,
  availability: 2,
  description: 'The industry standard dart weapon; top accessories only.',
  tags: ['special_weapon'],
  stats: {
    damageValue: '1P + special',
    modes: ['SS'],
    attackRatings: [9, 10, 8, null, null],
    ammo: {
      capacity: 5,
      container: 'c',
    },
  },
});

const parashield_dart_rifle = exoticFirearm({
  id: 'parashield_dart_rifle',
  label: 'Parashield DART Rifle',
  cost: 710,
  availability: 3,
  description: 'Includes a top imaging scope, can mount top/underbarrel.',
  tags: ['special_weapon'],
  stats: {
    damageValue: '1P + special',
    modes: ['SS'],
    attackRatings: [5, 8, 11, 3, null],
    ammo: {
      capacity: 6,
      container: 'm',
    },
  },
});

// ============================================================================
// LAUNCHERS — Exotic Weapons skill; fire minigrenades or missiles/rockets
// ============================================================================

const ares_antioch_ii = exoticFirearmWireless({
  id: 'ares_antioch_ii',
  label: 'Ares Antioch II',
  cost: 5900,
  availability: 3,
  description: 'Integral smartgun, secondary wireless-activation trigger setting for launched projectiles.',
  tags: ['launcher'],
  stats: {
    damageValue: 'As grenade loaded',
    modes: ['SS'],
    attackRatings: [null, 6, 8, 6, 5],
    ammo: {
      capacity: 8,
      container: 'm',
    },
  },
});

const armtech_mgl6 = exoticFirearm({
  id: 'armtech_mgl6',
  label: 'ArmTech MGL-6',
  cost: 1800,
  availability: 4,
  description: 'Bullpup pistol-style semi-auto grenade launcher.',
  tags: ['launcher'],
  stats: {
    damageValue: 'As grenade loaded',
    modes: ['SA'],
    attackRatings: [null, 8, 8, 3, null],
    ammo: {
      capacity: 6,
      container: 'c',
    },
  },
});

const armtech_mgl12 = exoticFirearm({
  id: 'armtech_mgl12',
  label: 'ArmTech MGL-12',
  cost: 5000,
  availability: 4,
  description: 'Bullpup rifle-style semi-auto grenade launcher.',
  tags: ['launcher'],
  stats: {
    damageValue: 'As grenade loaded',
    modes: ['SA'],
    attackRatings: [null, 8, 9, 6, 2],
    ammo: {
      capacity: 12,
      container: 'c',
    },
  },
});

const aztechnology_striker = exoticFirearm({
  id: 'aztechnology_striker',
  label: 'Aztechnology Striker',
  cost: 7000,
  availability: 5,
  description: 'Missile launcher; disposable warhead, reusable tube.',
  tags: ['launcher'],
  stats: {
    damageValue: 'As missile loaded',
    modes: ['SS'],
    attackRatings: [null, 4, 10, 9, 6],
    ammo: {
      capacity: 1,
      container: 'ml',
    },
  },
});

const onotari_interceptor = exoticFirearmWireless({
  id: 'onotari_interceptor',
  label: 'Onotari Interceptor',
  cost: 9000,
  availability: 5,
  description: 'Saeder-Krupp military missile launcher with two independently-loadable barrels. An internal smartgun controls a fire-safety interlock preventing simultaneous firing — some remove it, to the detriment of firer and target alike; firing both splits the attack dice pool, resolves each shot independently, and the firer resists 6P Fire damage.',
  tags: ['launcher'],
  stats: {
    damageValue: 'As missile loaded',
    modes: ['SS'],
    attackRatings: [null, 5, 9, 10, 8],
    ammo: {
      capacity: 2,
      container: 'ml',
    },
  },
});

// ============================================================================
// ACCESSORIES — most attach to a mount (top/barrel/underbarrel), one per mount
// ============================================================================

const airburst_link = weaponAccessoryWireless({
  id: 'airburst_link',
  label: 'Airburst Link',
  mount: null,
  cost: 600,
  availability: 3,
  description: 'Smartgun rangefinder accessory for grenade/rocket launchers; halves scatter when using the wireless link trigger. Requires wireless on both launcher and ordnance.',
  tags: ['weapon_accessory'],
  stats: {},
});

const bipod = weaponAccessory({
  id: 'bipod',
  label: 'Bipod',
  mount: 'underbarrel',
  cost: 200,
  availability: 1,
  description: '+2 Attack Rating when deployed prone/sitting.',
  tags: ['weapon_accessory'],
  stats: {},
});

const concealable_holster = weaponAccessory({
  id: 'concealable_holster',
  label: 'Concealable Holster',
  mount: null,
  cost: 150,
  availability: 1,
  description: '+1 Concealability threshold. Pistols (incl. machine pistols) and tasers only.',
  tags: ['weapon_accessory'],
  stats: {},
});

const gas_vent_system = weaponAccessory({
  id: 'gas_vent_system',
  label: 'Gas-Vent System',
  mount: 'barrel',
  cost: 500,
  availability: 3,
  description: 'Permanent once installed; removes the SA Attack Rating penalty, reduces BF penalty to 2.',
  tags: ['weapon_accessory'],
  stats: {},
});

const weapon_gyro_mount = weaponAccessory({
  id: 'weapon_gyro_mount',
  label: 'Gyro Mount (Weapon)',
  mount: 'underbarrel',
  cost: 1400,
  availability: 3,
  description: 'Heavy harness for a rifle/MG; negates SA/BF penalties, +3 AR on Full-Auto, lowers medium/heavy MG Strength requirements to 2+/4+.',
  tags: ['weapon_accessory'],
  stats: {},
});

const weapon_hidden_arm_slide = weaponAccessory({
  id: 'weapon_hidden_arm_slide',
  label: 'Hidden Arm Slide',
  mount: null,
  cost: 350,
  availability: 2,
  description: 'Holds a Hold-out/Light Pistol/Taser under clothing; Minor Action + gesture draws it, granting bonus Edge on first use and +1 Concealability.',
  tags: ['weapon_accessory'],
  stats: {},
});

const imaging_scope_weapon_accessory = weaponAccessoryWireless({
  id: 'imaging_scope_weapon_accessory',
  label: 'Imaging Scope (Weapon Accessory)',
  mount: 'top',
  cost: 350,
  availability: 1,
  description: 'Micro camera + vision magnification, Capacity 3. Needs Take Aim to benefit; denies the target Edge from a higher Defense Rating.',
  tags: ['weapon_accessory'],
  stats: {
    capacity: 3,
  },
});

const laser_sight_weapon_accessory = weaponAccessory({
  id: 'laser_sight_weapon_accessory',
  label: 'Laser Sight (Weapon Accessory)',
  mount: 'top or underbarrel',
  cost: 125,
  availability: 1,
  description: '+1 Attack Rating (not cumulative with smartlink).',
  tags: ['weapon_accessory'],
  stats: {},
});

const periscope_weapon_accessory = weaponAccessoryWireless({
  id: 'periscope_weapon_accessory',
  label: 'Periscope (Weapon Accessory)',
  mount: 'top',
  cost: 70,
  availability: 2,
  description: 'Fire around corners; reduces the Cover IV penalty to -1. Upgradeable with vision enhancements, Capacity 3.',
  tags: ['weapon_accessory'],
  stats: {
    capacity: 3,
  },
});

const quick_draw_holster = weaponAccessory({
  id: 'quick_draw_holster',
  label: 'Quick-Draw Holster',
  mount: null,
  cost: 175,
  availability: 2,
  description: 'Bonus Minor Action on a Quick-Draw action.',
  tags: ['weapon_accessory'],
  stats: {},
});

const shock_pads = weaponAccessory({
  id: 'shock_pads',
  label: 'Shock Pads',
  mount: null,
  cost: 50,
  availability: 2,
  description: 'Rigid-stock accessory; -1 to SA/BF Attack Rating penalties.',
  tags: ['weapon_accessory'],
  stats: {},
});

const silencer_suppressor_weapon_accessory = weaponAccessory({
  id: 'silencer_suppressor_weapon_accessory',
  label: 'Silencer/Suppressor (Weapon Accessory)',
  mount: 'barrel',
  cost: 500,
  availability: 4,
  legality: 'illegal',
  description: 'Not compatible with revolvers/shotguns; +2 threshold to notice the use/locate the firer.',
  tags: ['weapon_accessory'],
  stats: {},
});

const smart_firing_platform = weaponAccessoryWireless({
  id: 'smart_firing_platform',
  label: 'Smart Firing Platform',
  mount: 'underbarrel',
  cost: 2500,
  availability: 5,
  description: 'A robotic tripod mounting one smartgun weapon, fired by its own pilot (DR 3, Targeting autosoft Rating 3). Negates SA/BF penalties, +3 AR on Full-Auto.',
  tags: ['weapon_accessory'],
  stats: {},
});

const smartgun_system_internal = weaponAccessoryWireless({
  id: 'smartgun_system_internal',
  label: 'Smartgun System, Internal',
  mount: null,
  cost: 500,
  availability: 1,
  legality: 'licensed',
  description: 'Camera + rangefinder; via DNI, switch modes/eject clips/fire without a trigger pull, and fire from cover without Attack penalties. With a smartlink, +2 Attack Rating across all ranges. Adds to the weapon price rather than being bought standalone.',
  tags: ['weapon_accessory'],
  stats: {},
});

const smartgun_system_external = weaponAccessoryWireless({
  id: 'smartgun_system_external',
  label: 'Smartgun System, External',
  mount: 'top or underbarrel',
  cost: 200,
  availability: 2,
  legality: 'licensed',
  description: 'As the internal version; mounts via an Engineering + Logic (4, 1 hour) Extended test. Camera has Capacity 1 for vision enhancements.',
  tags: ['weapon_accessory'],
  stats: {
    capacity: 1,
  },
});

const spare_clip = weaponAccessory({
  id: 'spare_clip',
  label: 'Spare Clip',
  mount: null,
  cost: 5,
  availability: 2,
  description: 'An unloaded magazine for a specific weapon.',
  tags: ['weapon_accessory'],
  stats: {},
});

const speed_loader = weaponAccessory({
  id: 'speed_loader',
  label: 'Speed Loader',
  mount: null,
  cost: 25,
  availability: 1,
  description: 'Weapon-specific; lets a revolver fully reload as a Minor Action.',
  tags: ['weapon_accessory'],
  stats: {},
});

const tripod = weaponAccessory({
  id: 'tripod',
  label: 'Tripod',
  mount: 'underbarrel',
  cost: 500,
  availability: 2,
  description: 'Negates SA/BF penalties, +3 AR on Full-Auto when deployed kneeling/sitting.',
  tags: ['weapon_accessory'],
  stats: {},
});

// ============================================================================
// AMMO — reference tables, not per-combination items (see file header)
// ============================================================================

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
  {
    weaponClass: 'Hold-out/Light Pistol/Machine Pistol',
    availability: 1,
    costPer10: 5,
  },
  {
    weaponClass: 'Heavy Pistol/SMG',
    availability: 1,
    costPer10: 10,
  },
  {
    weaponClass: 'Rifles',
    availability: 2,
    legality: 'licensed',
    costPer10: 20,
  },
  {
    weaponClass: 'Taser',
    availability: 1,
    costPer10: 10,
  },
  {
    weaponClass: 'Injection Dart',
    availability: 2,
    costPer10: 5,
    note: '+ cost of toxin payload',
  },
  {
    weaponClass: 'Assault Cannon',
    availability: 4,
    legality: 'illegal',
    costPer10: 50,
  },
  {
    weaponClass: 'Machine Gun',
    availability: 2,
    legality: 'licensed',
    costPer10: 15,
  },
  {
    weaponClass: 'DMSO',
    availability: 1,
    costPer10: 10,
  },
  {
    weaponClass: 'Shotgun',
    availability: 2,
    legality: 'licensed',
    costPer10: 15,
  },
];

// Only "Regular" (unmodified) ammo per class gets a real purchasable
// item — everything else is AMMO_BASE_COST_BY_CLASS x an AMMO_TYPES
// modifier, computed rather than pre-built.

const ammo_pistol_regular = {
  id: 'ammo_pistol_regular',
  label: 'Ammo, Regular (Hold-out/Light/Machine Pistol)',
  category: 'ammo',
  cost: 5,
  availability: 1,
  legality: null,
  description: 'Per 10 rounds.',
  tags: ['ammo'],
  stats: {
    weaponClass: 'Hold-out/Light Pistol/Machine Pistol',
  },
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
  stats: {
    weaponClass: 'Heavy Pistol/SMG',
  },
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
  stats: {
    weaponClass: 'Rifles',
  },
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
  stats: {
    weaponClass: 'Taser',
  },
};

const ammo_injection_dart_regular = {
  id: 'ammo_injection_dart_regular',
  label: 'Injection Dart',
  category: 'ammo',
  cost: 5,
  availability: 2,
  legality: null,
  description: 'Per 10 darts, plus the cost of whatever toxin payload is loaded. Delivery needs 1+ net hit vs. an unarmored target or 2+ vs. any armor.',
  tags: ['ammo'],
  stats: {
    weaponClass: 'Injection Dart',
  },
};

const ammo_assault_cannon_regular = {
  id: 'ammo_assault_cannon_regular',
  label: 'Ammo, Assault Cannon',
  category: 'ammo',
  cost: 50,
  availability: 4,
  legality: 'illegal',
  description: "Per 10 rounds. The only ammo type assault cannons load — can't be modified with other ammo types.",
  tags: ['ammo'],
  stats: {
    weaponClass: 'Assault Cannon',
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
  stats: {
    weaponClass: 'Machine Gun',
  },
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
  stats: {
    weaponClass: 'DMSO',
  },
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
  stats: {
    weaponClass: 'Shotgun',
  },
};

// ============================================================================
// GRENADES — arm after 5m travel, damage decreases GZ -> Close -> Near
// ============================================================================

const grenade_stun = explosiveItem({
  id: 'grenade_stun',
  label: 'Grenade, Stun',
  cost: 100,
  availability: 4,
  legality: 'licensed',
  description: 'Flash-bang; anyone in the Blast also gets Blinded I, Deafened I, and Dazed.',
  tags: ['grenade'],
  stats: {
    damageValue: '10S/8S/6S',
    blast: 15,
  },
});

const grenade_fragmentation = explosiveItem({
  id: 'grenade_fragmentation',
  label: 'Grenade, Fragmentation',
  cost: 150,
  availability: 4,
  description: 'Classic wide-area shrapnel grenade.',
  tags: ['grenade'],
  stats: {
    damageValue: '16P/12P/8P',
    blast: 20,
  },
});

const grenade_high_explosive = explosiveItem({
  id: 'grenade_high_explosive',
  label: 'Grenade, High Explosive',
  cost: 150,
  availability: 4,
  description: 'Powerful blast over a smaller area than Fragmentation.',
  tags: ['grenade'],
  stats: {
    damageValue: '16P/10P/4P',
    blast: 15,
  },
});

const grenade_gas = explosiveItem({
  id: 'grenade_gas',
  label: 'Grenade, Gas',
  cost: 50,
  availability: 4,
  description: 'Any chemical/toxin payload; cloud lasts ~10 rounds. Cost is the grenade shell plus 20 doses of chemical payload.',
  tags: ['grenade'],
  stats: {},
});

const grenade_smoke = explosiveItem({
  id: 'grenade_smoke',
  label: 'Grenade, Smoke/Thermal Smoke',
  cost: 50,
  availability: 4,
  description: 'Obscures vision — Blinded I (acting through the smoke) or Blinded II (acting from within it); lasts ~10 rounds.',
  tags: ['grenade'],
  stats: {},
});

const flash_pak = explosiveItem({
  id: 'flash_pak',
  label: 'Flash-Pak',
  cost: 125,
  availability: 4,
  legality: 'licensed',
  description: 'A 10x10x2cm strobing device (not a grenade proper). Anyone using standard vision in range gets Blinded (worse with low-light, better with flare compensation, no effect on thermographic/ultrasound). 10 charges, 1/round used.',
  tags: ['grenade'],
  stats: {
    damageValue: 'BIII/BII/BI',
    blast: 10,
  },
});

// ============================================================================
// ROCKETS AND MISSILES — arm after 10m travel
// ============================================================================

const rocket_anti_vehicle = explosiveItem({
  id: 'rocket_anti_vehicle',
  label: 'Anti-Vehicle Rocket',
  cost: 2800,
  availability: 5,
  description: 'Shaped-charge warhead for burning/punching through vehicles/barriers; smaller blast than HE, +2 Attack Rating vs. vehicles.',
  tags: ['rocket'],
  stats: {
    damageValue: '12P/8P/4P',
    blast: 10,
  },
});

const rocket_fragmentation = explosiveItem({
  id: 'rocket_fragmentation',
  label: 'Fragmentation Rocket',
  cost: 2000,
  availability: 5,
  description: 'Anti-personnel shrapnel; poor against structures/vehicles.',
  tags: ['rocket'],
  stats: {
    damageValue: '16P/12P/8P',
    blast: 30,
  },
});

const rocket_high_explosive = explosiveItem({
  id: 'rocket_high_explosive',
  label: 'High Explosive Rocket',
  cost: 2100,
  availability: 5,
  description: 'Heavy damage in a small area, grenade-like but larger.',
  tags: ['rocket'],
  stats: {
    damageValue: '16P/10P/4P',
    blast: 20,
  },
});

const rocket_gas = explosiveItem({
  id: 'rocket_gas',
  label: 'Gas Rocket',
  cost: 750,
  availability: 4,
  description: 'As the Gas grenade, delivered at range. Cost is the rocket plus a 100-dose payload.',
  tags: ['rocket'],
  stats: {},
});

const rocket_smoke = explosiveItem({
  id: 'rocket_smoke',
  label: 'Smoke/Thermal Smoke Rocket',
  cost: 1200,
  availability: 4,
  description: 'As the Smoke grenade, delivered at range.',
  tags: ['rocket'],
  stats: {},
});

export const MISSILE_VARIANT_MODIFIER = {
  description: 'Any rocket above can be bought as a missile variant instead — same DV/Blast, +1 Availability, +2 Attack Rating, cost = rocket cost + (Sensor rating x 500¥) for the guidance system.',
  availabilityModifier: 1,
  attackRatingBonus: 2,
  costPerSensorRating: 500,
};

// ============================================================================
// CONVENTIONAL EXPLOSIVES — Rating-banded package pricing
// ============================================================================

export const EXPLOSIVE_RATING_BANDS = [
  {
    ratingRange: [1, 3],
    availability: 1,
    costPerRating: 10,
  },
  {
    ratingRange: [4, 6],
    availability: 2,
    costPerRating: 50,
  },
  {
    ratingRange: [7, 9],
    availability: 3,
    costPerRating: 100,
  },
  {
    ratingRange: [10, 12],
    availability: 4,
    costPerRating: 250,
  },
  {
    ratingRange: [13, 15],
    availability: 5,
    costPerRating: 500,
  },
  {
    ratingRange: [16, 18],
    availability: 6,
    costPerRating: 1000,
  },
  {
    ratingRange: [19, 20],
    availability: 7,
    costPerRating: 5000,
  },
];

const explosive_package_plastic = explosiveItem({
  id: 'explosive_package_plastic',
  label: 'Explosive Package, Plastic',
  cost: null,
  availability: null,
  description: 'Stable, moldable, adhesive, military-grade; color-tinted by detonation current needed. Bought at a chosen Rating combining power and quantity — see EXPLOSIVE_RATING_BANDS. Packages can\'t be combined across rating bands.',
  tags: ['conventional_explosive'],
  stats: {
    ratingRange: [1, 20],
  },
});

const explosive_package_foam = explosiveItem({
  id: 'explosive_package_foam',
  label: 'Explosive Package, Foam',
  cost: null,
  availability: null,
  description: 'Shaving-cream-consistency plastic explosive in an aerosol can, good for spraying into crevices. Detonates the same way as regular plastic; same rating-band pricing.',
  tags: ['conventional_explosive'],
  stats: {
    ratingRange: [1, 20],
  },
});

const detonator_cap = explosiveItem({
  id: 'detonator_cap',
  label: 'Detonator Cap',
  cost: 75,
  availability: 4,
  description: 'Inserted into an explosive mass, set off by programmable timer or radio signal. Setting the timer is a Major Action.',
  tags: ['conventional_explosive'],
  stats: {},
});

export const GEAR_FIREARMS_EXPLOSIVES = {
  defiance_super_shock, yamaha_pulsar_i, yamaha_pulsar_ii,
  fichetti_tiffani_needler, streetline_special, walther_palm_pistol,
  ares_light_fire_70, ares_light_fire_75, beretta_101t, beretta_201t, colt_america_l36, fichetti_security_600, ruger_redhawk,
  ares_crusader_ii, ceska_black_scorpion, steyr_tmp,
  ares_predator_vi, ares_viper_slivergun, browning_ultra_power, colt_government_2076, colt_manhunter, ruger_super_warhawk,
  colt_cobra_tz100, colt_cobra_tz110, colt_cobra_tz120, fn_p93_praetor, hk_227, ingram_smartgun_xi, sck_model_100, uzi_v,
  defiance_t250, mossberg_cmdt, pjss_model_55, remington_roomsweeper,
  ak_97, ares_alpha, colt_m23, fn_har, yamaha_raiden, ares_desert_strike, cavalier_arms_crockett_ebr, ranger_arms_sm5, remington_900, ruger_101, barret_model_122,
  ingram_valiant, stoner_ares_m202, rpk_hmg, panther_xxl,
  ares_super_squirt, parashield_dart_pistol, parashield_dart_rifle,
  ares_antioch_ii, armtech_mgl6, armtech_mgl12, aztechnology_striker, onotari_interceptor,
  airburst_link, bipod, concealable_holster, gas_vent_system, weapon_gyro_mount, weapon_hidden_arm_slide,
  imaging_scope_weapon_accessory, laser_sight_weapon_accessory, periscope_weapon_accessory, quick_draw_holster, shock_pads,
  silencer_suppressor_weapon_accessory, smart_firing_platform, smartgun_system_internal, smartgun_system_external,
  spare_clip, speed_loader, tripod,
  ammo_pistol_regular, ammo_heavy_pistol_smg_regular, ammo_rifle_regular, ammo_taser_regular, ammo_injection_dart_regular,
  ammo_assault_cannon_regular, ammo_machine_gun_regular, ammo_dmso, ammo_shotgun_regular,
  grenade_stun, grenade_fragmentation, grenade_high_explosive, grenade_gas, grenade_smoke, flash_pak,
  rocket_anti_vehicle, rocket_fragmentation, rocket_high_explosive, rocket_gas, rocket_smoke,
  explosive_package_plastic, explosive_package_foam, detonator_cap,
};

export const GEAR_FIREARMS_EXPLOSIVES_IDS = Object.keys(GEAR_FIREARMS_EXPLOSIVES);
