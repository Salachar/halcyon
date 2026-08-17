// Single source of truth for spells — 73 across the five schools (Combat,
// Detection, Health, Illusion, Manipulation). Same id-keyed shape as
// SKILLS/QUALITIES/GEAR.
//
// Shared fields every spell has: range (Touch | LOS | LOS(A) | Special),
// spellType (M = mana, only affects living/astral things; P = physical,
// affects the physical realm too), duration (I = Instantaneous,
// S = Sustained, L = Limited, P = Permanent), drainValue (base DV before
// any Amp Up/Increase Area adjustments), description.
//
// Combat spells add kind ('direct' | 'indirect') and area (bool) — that
// distinction drives which of two different damage-resolution paths the
// Rules > Core Mechanics text already describes (direct = the magic IS
// the damage, unresisted by Body; indirect = the magic creates an effect
// that's resisted by Body as normal).

export const SPELLS = {
  // ==================== COMBAT ====================

  acid_stream: {
    label: 'Acid Stream',
    category: 'combat',
    kind: 'indirect',
    area: false,
    range: 'LOS',
    spellType: 'P',
    duration: 'I',
    drainValue: 5,
    description: 'Chemical damage plus Corroded status (rating = net hits).',
  },

  toxic_wave: {
    label: 'Toxic Wave',
    category: 'combat',
    kind: 'indirect',
    area: true,
    range: 'LOS(A)',
    spellType: 'P',
    duration: 'I',
    drainValue: 6,
    description: 'Area version of Acid Stream.',
  },

  clout: {
    label: 'Clout',
    category: 'combat',
    kind: 'indirect',
    area: false,
    range: 'LOS',
    spellType: 'P',
    duration: 'I',
    drainValue: 3,
    description: 'Shapes air into a blow — Stun damage.',
  },

  blast: {
    label: 'Blast',
    category: 'combat',
    kind: 'indirect',
    area: true,
    range: 'LOS(A)',
    spellType: 'P',
    duration: 'I',
    drainValue: 4,
    description: 'Area version of Clout.',
  },

  flamestrike: {
    label: 'Flamestrike',
    category: 'combat',
    kind: 'indirect',
    area: false,
    range: 'LOS',
    spellType: 'P',
    duration: 'I',
    drainValue: 5,
    description: 'Fire damage plus Burning status (rating = net hits).',
  },

  fireball: {
    label: 'Fireball',
    category: 'combat',
    kind: 'indirect',
    area: true,
    range: 'LOS(A)',
    spellType: 'P',
    duration: 'I',
    drainValue: 6,
    description: 'Area version of Flamestrike.',
  },

  ice_spear: {
    label: 'Ice Spear',
    category: 'combat',
    kind: 'indirect',
    area: false,
    range: 'LOS',
    spellType: 'P',
    duration: 'I',
    drainValue: 5,
    description: 'Cold damage plus Chilled status (rounds = net hits).',
  },

  ice_storm: {
    label: 'Ice Storm',
    category: 'combat',
    kind: 'indirect',
    area: true,
    range: 'LOS(A)',
    spellType: 'P',
    duration: 'I',
    drainValue: 6,
    description: 'Area version of Ice Spear.',
  },

  lightning_bolt: {
    label: 'Lightning Bolt',
    category: 'combat',
    kind: 'indirect',
    area: false,
    range: 'LOS',
    spellType: 'P',
    duration: 'I',
    drainValue: 5,
    description: 'Electricity damage plus Zapped status (turns = net hits).',
  },

  lightning_ball: {
    label: 'Lightning Ball',
    category: 'combat',
    kind: 'indirect',
    area: true,
    range: 'LOS(A)',
    spellType: 'P',
    duration: 'I',
    drainValue: 6,
    description: 'Area version of Lightning Bolt.',
  },

  manabolt: {
    label: 'Manabolt',
    category: 'combat',
    kind: 'direct',
    area: false,
    range: 'LOS',
    spellType: 'M',
    duration: 'I',
    drainValue: 4,
    description: 'Pure mana strike — Physical damage, unresisted by Body.',
  },

  manaball: {
    label: 'Manaball',
    category: 'combat',
    kind: 'direct',
    area: true,
    range: 'LOS(A)',
    spellType: 'M',
    duration: 'I',
    drainValue: 5,
    description: 'Area version of Manabolt.',
  },

  powerbolt: {
    label: 'Powerbolt',
    category: 'combat',
    kind: 'direct',
    area: false,
    range: 'LOS',
    spellType: 'P',
    duration: 'I',
    drainValue: 4,
    description: 'A harsher version of Clout — Physical damage, unresisted.',
  },

  powerball: {
    label: 'Powerball',
    category: 'combat',
    kind: 'direct',
    area: true,
    range: 'LOS(A)',
    spellType: 'P',
    duration: 'I',
    drainValue: 5,
    description: 'Area version of Powerbolt.',
  },

  stunbolt: {
    label: 'Stunbolt',
    category: 'combat',
    kind: 'direct',
    area: false,
    range: 'LOS',
    spellType: 'M',
    duration: 'I',
    drainValue: 3,
    description: 'Stun-damage version of Manabolt.',
  },

  stunball: {
    label: 'Stunball',
    category: 'combat',
    kind: 'direct',
    area: true,
    range: 'LOS(A)',
    spellType: 'M',
    duration: 'I',
    drainValue: 4,
    description: 'Area version of Stunbolt.',
  },

  // ==================== DETECTION ====================

  analyze_device: {
    label: 'Analyze Device',
    category: 'detection',
    range: 'Touch',
    spellType: 'P',
    duration: 'S',
    drainValue: 2,
    description: 'Reveals info about an unknown device (opposed by its Object Resistance); if sustained, the first use of that device grants Edge equal to net hits.',
  },

  analyze_magic: {
    label: 'Analyze Magic',
    category: 'detection',
    range: 'Touch',
    spellType: 'P',
    duration: 'S',
    drainValue: 3,
    description: 'Like assensing without going astral; opposed test uses double the hits from the original casting that created the effect.',
  },

  analyze_truth: {
    label: 'Analyze Truth',
    category: 'detection',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: "Senses whether a directly-heard statement is believed true by the speaker (1+ net hit needed). Doesn't work on recordings or writing.",
  },

  clairaudience: {
    label: 'Clairaudience',
    category: 'detection',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: 'Subject hears sounds from a movable remote spot instead of nearby; hearing augmentations do not apply there.',
  },

  clairvoyance: {
    label: 'Clairvoyance',
    category: 'detection',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: 'Same as Clairaudience but for sight.',
  },

  combat_sense: {
    label: 'Combat Sense',
    category: 'detection',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: "Net hits add to the subject's Defense Rating and Surprise-test dice pool while sustained.",
  },

  detect_enemies: {
    label: 'Detect Enemies',
    category: 'detection',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: 'Reveals anyone within range who has hostile intent specifically toward the subject.',
  },

  detect_life: {
    label: 'Detect Life',
    category: 'detection',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: 'Reveals hidden sentient beings — not all living things.',
  },

  detect_magic: {
    label: 'Detect Magic',
    category: 'detection',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 4,
    description: 'Reveals active magic in range — foci, reagents, active spells/wards/rituals, spirits. Not Awakened people, critters, or dormant/permanent effects.',
  },

  mindlink: {
    label: 'Mindlink',
    category: 'detection',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: 'Mental communication link between caster and subject; must stay in sense range, though it can drop out and reconnect while sustained.',
  },

  mind_probe: {
    label: 'Mind Probe',
    category: 'detection',
    range: 'Touch',
    spellType: 'P',
    duration: 'S',
    drainValue: 5,
    description: 'Sorcery + Magic vs. Willpower + Logic; net hits determine depth of thought/memory access (1–2: surface thoughts; 3–4: conscious knowledge + recent memories; 5+: subconscious probing).',
  },

  // ==================== HEALTH ====================

  antidote: {
    label: 'Antidote',
    category: 'health',
    range: 'Touch',
    spellType: 'P',
    duration: 'P',
    drainValue: 5,
    description: "Each hit reduces a toxin's Power by 1 (can reroll on consecutive Major Actions without recasting); Power to 0 clears ongoing effects.",
  },

  cleansing_heal: {
    label: 'Cleansing Heal',
    category: 'health',
    range: 'Touch',
    spellType: 'P',
    duration: 'P',
    drainValue: 5,
    description: 'As Heal, plus removes the Corroded status.',
  },

  cooling_heal: {
    label: 'Cooling Heal',
    category: 'health',
    range: 'Touch',
    spellType: 'P',
    duration: 'P',
    drainValue: 5,
    description: 'As Heal, plus removes the Burning status.',
  },

  decrease_attribute: {
    label: 'Decrease Attribute',
    category: 'health',
    range: 'Touch',
    spellType: 'P',
    duration: 'S',
    drainValue: 3,
    description: "Opposed by Willpower + the chosen attribute; 1 point decrease per net hit applied (minimum 1), each hit beyond the first adds +1 Drain. Can't target Edge/Essence/Magic/Resonance.",
  },

  heal: {
    label: 'Heal',
    category: 'health',
    range: 'Touch',
    spellType: 'P',
    duration: 'P',
    drainValue: 3,
    description: 'Threshold (5 – Essence); heals 1 box of Stun, Physical, or Overflow damage per net hit. Any given injury can only be affected once by any Heal-type spell.',
  },

  increase_attribute: {
    label: 'Increase Attribute',
    category: 'health',
    range: 'Touch',
    spellType: 'P',
    duration: 'S',
    drainValue: 3,
    description: "Threshold (5 – Essence); +1 point per net hit applied (max +4), each hit beyond the first adds +1 Drain. Can't target Edge/Essence/Magic/Resonance.",
  },

  increase_reflexes: {
    label: 'Increase Reflexes',
    category: 'health',
    range: 'Touch',
    spellType: 'P',
    duration: 'S',
    drainValue: 5,
    description: '+1 Reaction and +1 Initiative Die per net hit applied, each hit beyond the first adds +1 Drain.',
  },

  resist_pain: {
    label: 'Resist Pain',
    category: 'health',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: 'Each net hit reduces damage-based dice pool penalties by 1.',
  },

  stabilize: {
    label: 'Stabilize',
    category: 'health',
    range: 'Touch',
    spellType: 'M',
    duration: 'P',
    drainValue: 3,
    description: "Threshold equals the target's Overflow boxes; meeting it clears all Overflow damage — regular damage is unaffected.",
  },

  warming_heal: {
    label: 'Warming Heal',
    category: 'health',
    range: 'Touch',
    spellType: 'P',
    duration: 'P',
    drainValue: 5,
    description: 'As Heal, plus removes the Chilled status.',
  },

  // ==================== ILLUSION ====================

  agony: {
    label: 'Agony',
    category: 'illusion',
    sense: 'single',
    range: 'LOS',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: 'Opposed by Willpower + Logic; net hits act as extra "damage boxes" for penalty purposes only, no lasting harm once dropped. Area-capable (+1 DV, 2m start).',
  },

  confusion: {
    label: 'Confusion',
    category: 'illusion',
    sense: 'multi',
    range: 'LOS',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: 'Opposed by Willpower + Logic; target gains Confused (#) status equal to net hits — dice pool penalty on non-Damage-Resistance tests. Area-capable.',
  },

  chaos: {
    label: 'Chaos',
    category: 'illusion',
    sense: 'multi',
    range: 'LOS',
    spellType: 'P',
    duration: 'S',
    drainValue: 4,
    description: 'Same as Confusion, but also affects cameras/microphones/tech. Area-capable, Shift Area usable.',
  },

  hush: {
    label: 'Hush',
    category: 'illusion',
    sense: 'single',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: 'Gives the target Silent (#) status (# = net hits) — the threshold for anyone trying to hear them.',
  },

  silence: {
    label: 'Silence',
    category: 'illusion',
    sense: 'single',
    range: 'Touch',
    spellType: 'P',
    duration: 'S',
    drainValue: 4,
    description: 'As Hush, but Silent (Improved) — also blocks microphones/tech.',
  },

  invisibility: {
    label: 'Invisibility',
    category: 'illusion',
    sense: 'single',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: 'Gives Invisible (#) status (# = net hits) — the threshold for anyone trying to see the target.',
  },

  improved_invisibility: {
    label: 'Improved Invisibility',
    category: 'illusion',
    sense: 'single',
    range: 'Touch',
    spellType: 'P',
    duration: 'S',
    drainValue: 4,
    description: 'As Invisibility, but also blocks cameras/tech.',
  },

  mask: {
    label: 'Mask',
    category: 'illusion',
    sense: 'multi',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: 'Changes appearance/sound/scent; hits set the threshold for a Willpower + Intuition test to see through it. Affects living beings only.',
  },

  physical_mask: {
    label: 'Physical Mask',
    category: 'illusion',
    sense: 'multi',
    range: 'Touch',
    spellType: 'P',
    duration: 'S',
    drainValue: 4,
    description: 'As Mask, but also fools cameras/microphones/tech.',
  },

  phantasm: {
    label: 'Phantasm',
    category: 'illusion',
    sense: 'multi',
    range: 'LOS(A)',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: 'Projects an image/sound/smell the caster has actually seen before, staying in their LOS; net hits set the threshold to see through it. Affects living beings.',
  },

  trid_phantasm: {
    label: 'Trid Phantasm',
    category: 'illusion',
    sense: 'multi',
    range: 'LOS(A)',
    spellType: 'P',
    duration: 'S',
    drainValue: 4,
    description: 'As Phantasm, but also fools cameras/microphones/tech.',
  },

  sensor_sneak: {
    label: 'Sensor Sneak',
    category: 'illusion',
    sense: 'multi',
    range: 'Touch',
    spellType: 'P',
    duration: 'S',
    drainValue: 2,
    description: 'Gives an Invisible (Improved)-equivalent status against technology/sensors only — no effect on living beings.',
  },

  // ==================== MANIPULATION ====================

  animate_metal: {
    label: 'Animate Metal',
    category: 'manipulation',
    range: 'LOS',
    spellType: 'P',
    duration: 'L',
    drainValue: 6,
    description: "Opposed by the material's Object Resistance; animates it per the Volume Reference table, moving up to 5m/round unless wheeled. Attack: 4P (metal), 3P (stone), 2S (wood), 1S (plastic).",
  },

  animate_plastic: {
    label: 'Animate Plastic',
    category: 'manipulation',
    range: 'LOS',
    spellType: 'P',
    duration: 'L',
    drainValue: 3,
    description: 'See Animate Metal.',
  },

  animate_stone: {
    label: 'Animate Stone',
    category: 'manipulation',
    range: 'LOS',
    spellType: 'P',
    duration: 'L',
    drainValue: 5,
    description: 'See Animate Metal.',
  },

  animate_wood: {
    label: 'Animate Wood',
    category: 'manipulation',
    range: 'LOS',
    spellType: 'P',
    duration: 'L',
    drainValue: 4,
    description: 'See Animate Metal.',
  },

  manipulation_armor: {
    label: 'Armor',
    category: 'manipulation',
    range: 'Touch',
    spellType: 'P',
    duration: 'S',
    drainValue: 4,
    description: "Net hits add to the target's Defense Rating.",
  },

  control_actions: {
    label: 'Control Actions',
    category: 'manipulation',
    range: 'LOS',
    spellType: 'M',
    duration: 'L',
    drainValue: 4,
    description: 'Opposed by Willpower + Logic; net hits = max duration in minutes. Target is aware but nearly powerless to resist; caster spends the matching action type to direct them. Area-capable.',
  },

  control_thoughts: {
    label: 'Control Thoughts',
    category: 'manipulation',
    range: 'LOS',
    spellType: 'M',
    duration: 'L',
    drainValue: 4,
    description: "As Control Actions, but shapes thoughts rather than actions; the target's awareness is uncertain, and self-destructive or friend-harming suggestions can be resisted with a Willpower + Logic test.",
  },

  darkness: {
    label: 'Darkness',
    category: 'manipulation',
    range: 'LOS(A)',
    spellType: 'P',
    duration: 'S',
    drainValue: 3,
    description: 'Lowers ambient light per net hit, affecting Environment/Visibility Edge. Area/Shift-capable.',
  },

  light: {
    label: 'Light',
    category: 'manipulation',
    range: 'LOS(A)',
    spellType: 'P',
    duration: 'S',
    drainValue: 3,
    description: 'As Darkness, but raises light instead.',
  },

  elemental_armor: {
    label: 'Elemental Armor',
    category: 'manipulation',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 5,
    description: 'As Armor, plus blocks one chosen elemental status (Cooling→Fire, Grounding→Electricity, Neutralizing→Chemical, Warming→Cold) even if damage still gets through.',
  },

  fling: {
    label: 'Fling',
    category: 'manipulation',
    range: 'LOS',
    spellType: 'P',
    duration: 'I',
    drainValue: 5,
    description: "Opposed by Object Resistance; ½kg thrown per net hit, net hits also set the threshold for the target's Reaction + Intuition dodge. Stun damage equals kg thrown, rounded up.",
  },

  focus_burst: {
    label: 'Focus Burst',
    category: 'manipulation',
    range: 'Touch',
    spellType: 'M',
    duration: 'L',
    drainValue: 7,
    description: "Opposed by (focus Force × 2); net hits temporarily raise the focus's effective rating by 1 for that many minutes. A critical glitch permanently reduces the focus's Force by 2.",
  },

  levitate: {
    label: 'Levitate',
    category: 'manipulation',
    range: 'LOS',
    spellType: 'P',
    duration: 'S',
    drainValue: 6,
    description: "50kg lifted per hit (unwilling targets resist with Body + Strength, reducing effective hits). Target must stay in the caster's sight or falls.",
  },

  mana_barrier: {
    label: 'Mana Barrier',
    category: 'manipulation',
    range: 'LOS(A)',
    spellType: 'M',
    duration: 'S',
    drainValue: 5,
    description: 'Structure = net hits + Magic. Blocks spirits, foci, dual-natured beings, preparations, reagents, spells, and astrally projecting mages — living beings and mundane objects pass through freely. Base 2m×2m, expandable with Increase Area.',
  },

  mystic_armor: {
    label: 'Mystic Armor',
    category: 'manipulation',
    range: 'Touch',
    spellType: 'M',
    duration: 'S',
    drainValue: 3,
    description: 'Net hits add to Defense Rating specifically in astral combat and against mana-type Combat spells.',
  },

  overclock: {
    label: 'Overclock',
    category: 'manipulation',
    range: 'LOS',
    spellType: 'P',
    duration: 'S',
    drainValue: 4,
    description: "Opposed by Object Resistance; net hits raise a device's Device Rating/Attack/Data Processing/Firewall/Sleaze by 1 each (caster's choice how many). The device takes Matrix Damage equal to hits used once the spell drops, resisted by Firewall.",
  },

  physical_barrier: {
    label: 'Physical Barrier',
    category: 'manipulation',
    range: 'LOS(A)',
    spellType: 'P',
    duration: 'S',
    drainValue: 6,
    description: 'Builds a wall, Structure = Magic + hits. Base 2m×2m×2cm, expandable with Increase Area.',
  },

  shape_metal: {
    label: 'Shape Metal',
    category: 'manipulation',
    range: 'LOS',
    spellType: 'P',
    duration: 'S',
    drainValue: 5,
    description: 'Opposed by Object Resistance; makes the material malleable, 1 m³ per net hit, retains its final shape when dropped.',
  },

  shape_plastic: {
    label: 'Shape Plastic',
    category: 'manipulation',
    range: 'LOS',
    spellType: 'P',
    duration: 'S',
    drainValue: 2,
    description: 'See Shape Metal.',
  },

  shape_stone: {
    label: 'Shape Stone',
    category: 'manipulation',
    range: 'LOS',
    spellType: 'P',
    duration: 'S',
    drainValue: 4,
    description: 'See Shape Metal.',
  },

  shape_wood: {
    label: 'Shape Wood',
    category: 'manipulation',
    range: 'LOS',
    spellType: 'P',
    duration: 'S',
    drainValue: 3,
    description: 'See Shape Metal.',
  },

  strengthen_wall: {
    label: 'Strengthen Wall',
    category: 'manipulation',
    range: 'LOS(A)',
    spellType: 'P',
    duration: 'S',
    drainValue: 4,
    description: 'Opposed by Object Resistance; +1 Structure per net hit, covering 4 m² of wall (more via Increase Area). Shift Area usable.',
  },

  thunder: {
    label: 'Thunder',
    category: 'manipulation',
    range: 'LOS(A)',
    spellType: 'P',
    duration: 'S',
    drainValue: 3,
    description: 'Shapes sound into a chosen noise, 2m-radius base (expandable); persists 1 round per hit after dropping, and net hits impose a dice-pool penalty on others trying to hear anything else in the area.',
  },

  vehicle_armor: {
    label: 'Vehicle Armor',
    category: 'manipulation',
    range: 'Touch',
    spellType: 'P',
    duration: 'S',
    drainValue: 6,
    description: "Opposed by the vehicle's Object Resistance; +1 point of Hardened Armor per net hit.",
  },
};

export const SPELL_IDS = Object.keys(SPELLS);
export const SPELLS_BY_CATEGORY = {
  combat: SPELL_IDS.filter((id) => SPELLS[id].category === 'combat'),
  detection: SPELL_IDS.filter((id) => SPELLS[id].category === 'detection'),
  health: SPELL_IDS.filter((id) => SPELLS[id].category === 'health'),
  illusion: SPELL_IDS.filter((id) => SPELLS[id].category === 'illusion'),
  manipulation: SPELL_IDS.filter((id) => SPELLS[id].category === 'manipulation'),
};
