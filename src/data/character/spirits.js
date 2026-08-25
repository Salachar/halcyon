// Spirits — Conjuring's summoned allies. Full/Aspected(Sorcery)/Mystic
// Adept magicians only (Aspected-Conjuring summons but doesn't have a
// separate known-spell list the way Sorcery/Enchanting aspects do —
// this section is relevant to them regardless of that distinction).
//
// Stat formulas are stored as reference TEXT, not computed — a spirit's
// Force is chosen fresh at summoning, and per the project's established
// "don't simulate the other side" boundary (same reasoning as Hacked
// Devices, Hosts), this app tracks the relationship (which spirits are
// bound, how many services remain), not a live-computed opponent/ally
// stat block. The GM narrates what the spirit actually does.
//
// All 6 types confirmed complete (Beast's stat block was the last one
// found).

export const SPIRIT_TYPES = {
  air: {
    label: 'Air',
    description: 'Speed and concealability — weak Body/Strength, strong Agility/Reaction.',
    attributes: 'B F-2, A F+3, R F+4, S F-3, W F, L F, I F, C F, M F, Ess F',
    initiative: '[(F x 2) + 4] + 2D6',
    astralInitiative: '(F x 2) + 3D6',
    defenseRating: 'F - 2',
    skills: 'Astral, Athletics, Close Combat, Exotic Ranged Weapon, Perception',
    powers: 'Accident, Astral Form, Concealment, Confusion, Engulf (Air), Materialization, Movement, Sapience, Search',
    weaknesses: 'Allergy (Inhalation vector toxins, Severe)',
    optionalPowers: 'Elemental Attack (Cold or Electricity), Energy Aura (Cold or Electricity), Fear, Guard, Noxious Breath, Psychokinesis',
  },
  beast: {
    label: 'Beast',
    description: 'One of the two non-elemental spirit types, resembling animals.',
    attributes: 'B F+2, A F+1, R F, S F+2, W F, L F, I F, C F, M F, Ess F',
    initiative: '(F x 2) + 2D6',
    astralInitiative: '(F x 2) + 3D6',
    defenseRating: 'F + 2',
    skills: 'Astral, Close Combat, Perception',
    powers: 'Animal Control, Astral Form, Enhanced Senses (hearing, low-light vision, smell), Fear, Materialization, Movement, Sapience',
    weaknesses: 'Allergy (silver, Severe)',
    optionalPowers: 'Concealment, Confusion, Guard, Natural Weapon (claws/bite), Noxious Breath, Search, Venom',
  },
  earth: {
    label: 'Earth',
    description: 'Tanky and durable — strong Body/Strength, weak Agility/Reaction.',
    attributes: 'B F+4, A F-2, R F-1, S F+4, W F, L F-1, I F, C F, M F, Ess F',
    initiative: '[(F x 2) - 1] + 2D6',
    astralInitiative: '(F x 2) + 3D6',
    defenseRating: 'F + 4',
    skills: 'Astral, Close Combat, Exotic Ranged Weapon, Perception',
    powers: 'Astral Form, Binding, Guard, Materialization, Movement, Sapience, Search',
    weaknesses: 'Allergy (Electricity, Severe)',
    optionalPowers: 'Concealment, Confusion, Elemental Attack (Chemical), Engulf (Earth), Fear',
  },
  fire: {
    label: 'Fire',
    description: 'Aggressive and fast — strong Reaction/Agility, weak Strength.',
    attributes: 'B F+1, A F+2, R F+3, S F-2, W F, L F, I F+1, C F, M F, Ess F',
    initiative: '[(F x 2) + 4] + 2D6',
    astralInitiative: '(F x 2) + 3D6',
    defenseRating: 'F + 1',
    skills: 'Astral, Athletics, Close Combat, Exotic Ranged Weapon, Perception',
    powers: 'Accident, Astral Form, Confusion, Elemental Attack (Fire), Energy Aura (Fire), Engulf (Fire), Materialization, Sapience',
    weaknesses: 'Allergy (Cold, Severe), Vulnerability (fire extinguishers)',
    optionalPowers: 'Fear, Guard, Noxious Breath, Search',
  },
  kin: {
    label: 'Kin (Kindred)',
    description: 'The other non-elemental type, resembling people — social/utility-leaning.',
    attributes: 'B F+1, A F, R F+2, S F-2, W F, L F, I F+1, C F, M F, Ess F',
    initiative: '[(F x 2) + 3] + 2D6',
    astralInitiative: '(F x 2) + 3D6',
    defenseRating: 'F + 1',
    skills: 'Astral, Close Combat, Perception, Sorcery',
    powers: 'Accident, Astral Form, Concealment, Confusion, Enhanced Senses (low-light vision, thermographic vision), Guard, Influence, Materialization, Sapience, Search',
    weaknesses: 'Allergy (ferrous metal, Severe)',
    optionalPowers: 'Fear, Innate Spell (any one spell known by the summoner; only one spell effect may be added), Movement, Psychokinesis',
  },
  water: {
    label: 'Water',
    description: 'Balanced, mobility-leaning — even attributes, decent Reaction.',
    attributes: 'B F, A F+1, R F+2, S F, W F, L F, I F, C F, M F, Ess F',
    initiative: '[(F x 2) + 2] + 2D6',
    astralInitiative: '(F x 2) + 3D6',
    defenseRating: 'F',
    skills: 'Astral, Athletics (Swimming), Close Combat, Exotic Ranged Weapon, Perception',
    powers: 'Astral Form, Concealment, Confusion, Engulf (Water), Materialization, Movement, Sapience, Search',
    weaknesses: 'Allergy (fire, Severe)',
    optionalPowers: 'Accident, Binding, Elemental Attack (Cold), Energy Aura (Cold), Guard, Weather Control',
  },
};

export const SPIRIT_TYPE_IDS = Object.keys(SPIRIT_TYPES);

// Reference note — the actual confirmed mechanics, not spirit-specific
// data, so it lives here rather than repeated per type.
export const SPIRIT_MECHANICS_NOTE =
  'Summoning: choose Force, roll Conjuring + Magic vs. (Force x 2) — at least 1 net hit needed, services obtained = net hits. Resist Drain (spirit\'s hits, not net) as if casting a spell. Spirits return home automatically after one sunrise-and-sunset cycle, or immediately if Drain knocks you unconscious. Max combined active Force across all your spirits = Magic x 3. Banishing: Major Action, Conjuring + Magic vs. (Force x 2) — net hits reduce remaining services by 1 each, zero sends it home; Drain = twice the spirit\'s hits. Reagents spent equal to Force grant a bonus Edge on either test. Each spirit gets one optional power per full 3 points of Force, chosen at summoning and fixed thereafter. Spirits have their own Condition Monitor ((Force/2)+8, Willpower-based) — filling it disrupts them home.';
