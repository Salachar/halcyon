// Single source of truth for the 19 fixed Active Skills.
//
// Keyed by id rather than an array — every consumer (Rules tab looping
// over all of them, buildSkillPool doing SKILLS[skillId] on every roll,
// the character creator validating a pick) looks these up by id far more
// often than it iterates, so O(1) lookup wins over array.find().
//
// This is the thing that gets saved on a character: character.skills
// keys MUST match these ids exactly (e.g. character.skills.close_combat),
// since it's the same id used everywhere else a skill is referenced.
//
// primaryAttribute / secondaryAttribute use the same lowercase attribute
// keys as Character's attributes object (agility, logic, etc.) — not
// display names — so buildSkillPool can read character.attributes[key]
// directly without a translation layer.

export const SKILLS = {
  astral: {
    label: 'Astral',
    primaryAttribute: 'intuition',
    secondaryAttribute: 'willpower', // astral combat only
    untrained: false,
    specializations: ['Astral Combat', 'Astral Signatures', 'Emotional States', 'Spirit Types'],
    description: 'Assensing astral auras and astral combat. Usable only by full/aspected magicians, or adepts and mystic adepts with Astral Perception.',
  },
  athletics: {
    label: 'Athletics',
    primaryAttribute: 'agility',
    secondaryAttribute: 'strength', // extra-resistance tests (mud, etc.)
    untrained: true,
    specializations: ['Archery', 'Climbing', 'Flying', 'Gymnastics', 'Sprinting', 'Swimming', 'Throwing'],
    description: 'Physical grace and prowess — sprinting, dodging, thrown weapons, climbing, swimming, diving.',
  },
  biotech: {
    label: 'Biotech',
    primaryAttribute: 'logic',
    secondaryAttribute: 'intuition', // rare, off-the-books approaches
    untrained: false,
    specializations: ['Biotechnology', 'Cybertechnology', 'First Aid', 'Medicine'],
    description: 'Metahuman biology and how augmentations interact with it. First Aid, Healing, analyzing/repairing/installing cyberware.',
  },
  close_combat: {
    label: 'Close Combat',
    primaryAttribute: 'agility',
    secondaryAttribute: null,
    untrained: true,
    specializations: ['Blades', 'Clubs', 'Unarmed Combat'],
    description: 'Punching, stabbing, clubbing — anything up close and personal. Base Unarmed damage is 2S.',
  },
  con: {
    label: 'Con',
    primaryAttribute: 'charisma',
    secondaryAttribute: null,
    untrained: true,
    specializations: ['Acting', 'Disguise', 'Impersonation', 'Performance'],
    description: "Persuasion by acting as someone or something you're not. Opposed by Intuition + Willpower.",
  },
  conjuring: {
    label: 'Conjuring',
    primaryAttribute: 'magic',
    secondaryAttribute: null,
    untrained: false,
    specializations: ['Banishing', 'Summoning'],
    description: 'Summons, binds, and banishes spirits.',
  },
  cracking: {
    label: 'Cracking',
    primaryAttribute: 'logic',
    secondaryAttribute: null,
    untrained: false,
    specializations: ['Cybercombat', 'Electronic Warfare', 'Hacking'],
    description: 'The illegal side of Matrix actions.',
  },
  electronics: {
    label: 'Electronics',
    primaryAttribute: 'logic',
    secondaryAttribute: 'intuition', // kludge work
    untrained: true,
    specializations: ['Computer', 'Hardware', 'Software'],
    description: 'The legal side of Matrix work — commlinks, software, hardware tuning.',
  },
  enchanting: {
    label: 'Enchanting',
    primaryAttribute: 'magic',
    secondaryAttribute: null,
    untrained: false,
    specializations: ['Alchemy', 'Artificing', 'Disenchanting'],
    description: 'Crafts, and sometimes demolishes, foci, fetishes, and other magically imbued items.',
  },
  engineering: {
    label: 'Engineering',
    primaryAttribute: 'logic',
    secondaryAttribute: 'intuition', // juryrigging (lockpicking uses agility instead — see note below)
    untrained: true,
    specializations: [
      'Aeronautics Mechanic', 'Armorer', 'Automotive Mechanic', 'Demolitions',
      'Gunnery', 'Industrial Mechanic', 'Lockpicking', 'Nautical Mechanic',
    ],
    description: 'Building, repairing, juryrigging, and vehicle gunnery. Lockpicking specifically pairs with Agility, not Logic.',
  },
  exotic_weapons: {
    label: 'Exotic Weapons',
    primaryAttribute: 'agility',
    secondaryAttribute: null,
    untrained: false,
    specializations: [], // selected per weapon type at purchase time, not a fixed list
    requiresSpecialization: true, // unique to this skill — can't be used at all without one
    description: 'Weapons unusual enough to need dedicated training. A specialization is mandatory just to use this skill — and unlike every other skill, ranks apply across every specialization you hold.',
  },
  firearms: {
    label: 'Firearms',
    primaryAttribute: 'agility',
    secondaryAttribute: null,
    untrained: true,
    specializations: [
      'Tasers', 'Hold-Outs', 'Light Pistols', 'Machine Pistols', 'Heavy Pistols',
      'Submachine Guns', 'Shotguns', 'Rifles', 'Machine Guns', 'Assault Cannons',
    ],
    description: 'Firearms + Agility vs. Reaction + Intuition. If it goes bang, it goes here.',
  },
  influence: {
    label: 'Influence',
    primaryAttribute: 'charisma',
    secondaryAttribute: 'logic', // clear-argument approach, mainly Negotiation
    untrained: true,
    specializations: ['Etiquette', 'Instruction', 'Intimidation', 'Leadership', 'Negotiation'],
    description: "The honest counterpart to Con — inspiring teammates, negotiating pay, making consequences clear.",
  },
  outdoors: {
    label: 'Outdoors',
    primaryAttribute: 'intuition',
    secondaryAttribute: null,
    untrained: true,
    specializations: ['Navigation', 'Survival', 'Tracking'], // also selectable by environment (Woods, Desert, Urban, etc.)
    description: 'Tracking, foraging, and route-finding outside the sprawl.',
  },
  perception: {
    label: 'Perception',
    primaryAttribute: 'intuition',
    secondaryAttribute: 'logic', // pattern recognition
    untrained: true,
    specializations: ['Visual', 'Aural', 'Tactile'], // also selectable by environment
    description: 'Noticing things — people who want to stay hidden, patterns in information, whatever the scene needs spotted.',
  },
  piloting: {
    label: 'Piloting',
    primaryAttribute: 'reaction',
    secondaryAttribute: null,
    untrained: true,
    specializations: ['Ground Craft', 'Aircraft', 'Watercraft'],
    description: 'Vehicle maneuvers, tailing, and losing a tail.',
  },
  sorcery: {
    label: 'Sorcery',
    primaryAttribute: 'magic',
    secondaryAttribute: null,
    untrained: false,
    specializations: ['Counterspelling', 'Ritual Spellcasting', 'Spellcasting'],
    description: 'Spellcasting and counterspelling — the bulk of what a magician actually does in a fight.',
  },
  stealth: {
    label: 'Stealth',
    primaryAttribute: 'agility',
    secondaryAttribute: null,
    untrained: true,
    specializations: ['Camouflage', 'Palming', 'Sneaking'],
    description: "Anything a character doesn't want noticed.",
  },
  tasking: {
    label: 'Tasking',
    primaryAttribute: 'resonance',
    secondaryAttribute: null,
    untrained: false,
    specializations: ['Compiling', 'Decompiling', 'Registering'],
    description: 'Technomancer-only — compiling, decompiling, and registering sprites.',
  },
};

// Small helpers, so callers don't reach into the shape directly everywhere
export const SKILL_IDS = Object.keys(SKILLS);

export function isUntrainable(skillId) {
  return SKILLS[skillId]?.untrained ?? false;
}
