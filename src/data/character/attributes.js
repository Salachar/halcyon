// Single source of truth for what each attribute actually governs — a
// real content gap until now (Rules/Shadowrunners never explained
// attributes themselves, only their ranges per metatype). Descriptions
// pulled directly from the rulebook's own Character Traits section, not
// paraphrased from memory.
//
// Only the 8 core attributes + Edge live here. Magic/Resonance/Essence
// are technically "Special Attributes" too, but they're already handled
// elsewhere in this system (Character's magicResonance field, Rules >
// Magic) — duplicating their explanation here would just create a
// second, driftable copy of the same content.

export const ATTRIBUTES = {
  body: {
    label: 'Body',
    group: 'physical',
    description: 'General sturdiness, integrity, and health. Sometimes correlates with size, but not perfectly. Governs resisting damage and toxins.',
  },

  agility: {
    label: 'Agility',
    group: 'physical',
    description: 'Nimbleness, speed, flexibility, and hand-eye coordination. The key attribute for combat and most athletic activity.',
  },

  reaction: {
    label: 'Reaction',
    group: 'physical',
    description: 'Quickness of response, distinct from Agility\'s raw speed. One of the key defensive attributes, and used in piloting and controlling vehicles or drones.',
  },

  strength: {
    label: 'Strength',
    group: 'physical',
    description: 'Raw muscle power — lifting, carrying, and hitting hard. Comes up in some Athletics tests and is important in unarmed combat.',
  },

  willpower: {
    label: 'Willpower',
    group: 'mental',
    description: 'The ability to persevere through hardship, pain, and deception. Very important for magic-based characters, who use it to sustain channeling mana, and important for resisting some attacks and illusions.',
  },

  logic: {
    label: 'Logic',
    group: 'mental',
    description: 'The rational, analytical, puzzle-solving part of the mind. Deckers and technomancers use it frequently; useful to anyone for pattern recognition.',
  },

  intuition: {
    label: 'Intuition',
    group: 'mental',
    description: 'Gut instinct and sudden insight. Helps characters react to danger, perceive threats, and resist some magical threats.',
  },

  charisma: {
    label: 'Charisma',
    group: 'mental',
    description: 'The pull exerted on other people — looks, speaking ability, fashion sense, sheer presence, or some combination. Governs persuading others. Faces thrive on it.',
  },

  edge: {
    label: 'Edge',
    group: 'special',
    description: 'Guts, risk, and heedless disregard for danger and good sense — the thing that lets shadowrunners survive where others don\'t. Detailed fully in Rules > Core Mechanics.',
  },
};

export const ATTRIBUTE_IDS = Object.keys(ATTRIBUTES);
