// Single source of truth for Mentor Spirits — 13 archetypes. Same
// id-keyed shape as SKILLS/QUALITIES/SPELLS/POWERS.
//
// Every mentor spirit grants three advantages (general, magician-only,
// adept-only) plus one disadvantage, all always active. Mystic Adepts
// pick either the adept or magician advantage at acceptance — that
// choice is permanent, not something this data models per character
// (it's a creation-time decision, not a property of the spirit itself).
//
// This is what the `mentor_spirit` Quality in QUALITIES.js points at
// via requiresSelection: 'mentorSpirit'.

export const MENTOR_SPIRITS = {
  bear: {
    label: 'Bear',
    archetypeTags: ['Strength', 'Protection'],
    generalAdvantage: 'Edge Boosts cost 1 less for tests to resist damage (not including Drain).',
    magicianAdvantage: 'Edge Boosts cost 1 less for Health spells, preparations, and Health spell rituals.',
    adeptAdvantage: '1 free level of Rapid Healing.',
    disadvantage: 'Risk of going berserk on taking Physical damage in combat, or if someone under your care is badly injured — Charisma + Willpower test to avoid or shorten it (3 rounds minus 1 per hit).',
  },

  cat: {
    label: 'Cat',
    archetypeTags: ['Mystery', 'Stealth'],
    generalAdvantage: 'Edge Boosts cost 1 less for Athletics or Stealth tests (choose one).',
    magicianAdvantage: 'Edge Boosts cost 1 less for spells, preparations, and spell rituals in the Illusion category.',
    adeptAdvantage: 'Free Traceless Walk power.',
    disadvantage: "Can't land an incapacitating attack without succeeding a Willpower + Charisma (3) test at the start of combat; taking any Physical damage ends the restraint.",
  },

  coyote: {
    label: 'Coyote',
    archetypeTags: ['Deception', 'Mischief'],
    generalAdvantage: 'Edge Boosts cost 1 less for Con tests.',
    magicianAdvantage: 'Edge Boosts cost 1 less for spells, preparations, and spell rituals in the Manipulation category.',
    adeptAdvantage: 'Free Vocal Control power.',
    disadvantage: "Must succeed a Willpower + Charisma (3) test to avoid exploiting someone else's misfortune or pulling a clever trick/prank, even at a friend's expense.",
  },

  dog: {
    label: 'Dog',
    archetypeTags: ['Friendship', 'Loyalty'],
    generalAdvantage: 'Edge Boosts cost 1 less for Outdoors tests.',
    magicianAdvantage: 'Edge Boosts cost 1 less for Detection spells, preparations, and rituals.',
    adeptAdvantage: '2 free levels of Improved Sense.',
    disadvantage: "Can't leave someone behind, betray comrades, or let another sacrifice themselves in your place without a successful Willpower + Charisma (3) test.",
  },

  dragonslayer: {
    label: 'Dragonslayer',
    archetypeTags: ['Heroism', 'Adventure'],
    generalAdvantage: 'Edge Boosts cost 1 less for Influence tests.',
    magicianAdvantage: 'Edge Boosts cost 1 less for spells, preparations, and spell rituals in the Combat category.',
    adeptAdvantage: 'Free Danger Sense power.',
    disadvantage: "Breaking a promise — even accidentally — imposes a –1 penalty to all actions until it's made good.",
  },

  eagle: {
    label: 'Eagle',
    archetypeTags: ['Nature', 'Warding'],
    generalAdvantage: 'Edge Boosts cost 1 less for Perception tests.',
    magicianAdvantage: 'Edge Boosts cost 1 less when summoning air spirits.',
    adeptAdvantage: '1 free level of Combat Sense.',
    disadvantage: 'Gains the Allergy Quality (pollutants, Mild) with no Karma bonus for it.',
  },

  fire_bringer: {
    label: 'Fire-Bringer',
    archetypeTags: ['Invention', 'Generosity'],
    generalAdvantage: 'Edge Boosts cost 1 less for Engineering or Enchanting tests (choose one).',
    magicianAdvantage: 'Edge Boosts cost 1 less for spells, preparations, and spell rituals in the Manipulation category.',
    adeptAdvantage: '1 free level of Improved Ability (any non-combat skill).',
    disadvantage: "Can't refuse a sincere request for help without a successful Willpower + Charisma (3) test.",
  },

  mountain: {
    label: 'Mountain',
    archetypeTags: ['Endurance', 'Stubbornness'],
    generalAdvantage: 'Edge Boosts cost 1 less for Outdoors tests.',
    magicianAdvantage: 'Edge Boosts cost 1 less for Counterspelling and anchored rituals.',
    adeptAdvantage: '2 free levels of Mystic Armor.',
    disadvantage: 'Must succeed a Willpower + Charisma (3) test to abandon a plan already in motion, or to proceed without one.',
  },

  rat: {
    label: 'Rat',
    archetypeTags: ['Survival', 'Scavenging'],
    generalAdvantage: 'Edge Boosts cost 1 less for Stealth tests.',
    magicianAdvantage: 'Edge Boosts cost 1 less for Enchanting tests when harvesting reagents; reagents of any tradition work at full strength for you.',
    adeptAdvantage: '1 free level of Pain Resistance.',
    disadvantage: 'Must succeed a Willpower + Charisma (3) test to avoid fleeing or hiding in combat; forced to fight if there is no escape available.',
  },

  sea: {
    label: 'Sea',
    archetypeTags: ['Chaos', 'Greed'],
    generalAdvantage: 'Edge Boosts cost 1 less for Athletics tests while swimming; +1 meter/round base swim speed.',
    magicianAdvantage: 'Edge Boosts cost 1 less when summoning water spirits.',
    adeptAdvantage: '1 free level of Improved Ability (Athletics).',
    disadvantage: 'Must succeed a Willpower + Charisma (3) test to give something away or otherwise be charitable.',
  },

  seducer: {
    label: 'Seducer',
    archetypeTags: ['Seductress', 'Temptation'],
    generalAdvantage: 'Edge Boosts cost 1 less for Con tests.',
    magicianAdvantage: 'Edge Boosts cost 1 less for spells, preparations, and spell rituals in the Illusion category.',
    adeptAdvantage: '1 free level of Improved Ability (Con or Influence, chosen at selection).',
    disadvantage: 'Must succeed a Willpower + Charisma (3) test to resist an available vice or indulgence.',
  },

  shark: {
    label: 'Shark',
    archetypeTags: ['Hunger', 'Violence'],
    generalAdvantage: 'Edge Boosts cost 1 less for Close Combat tests (blades or unarmed).',
    magicianAdvantage: 'Edge Boosts cost 1 less for spells, preparations, and spell rituals in the Combat category.',
    adeptAdvantage: 'Free Killing Hands power.',
    disadvantage: 'Risk of going berserk on taking Physical damage (Charisma + Willpower test to avoid); will keep attacking downed bodies if no live targets remain.',
  },

  snake: {
    label: 'Snake',
    archetypeTags: ['Knowledge', 'Curiosity'],
    generalAdvantage: '2 free Knowledge skills related to magic.',
    magicianAdvantage: 'Edge Boosts cost 1 less for spells, preparations, and spell rituals in the Detection category.',
    adeptAdvantage: 'Free Kinesics power.',
    disadvantage: 'Must succeed a Willpower + Charisma (3) test to resist pursuing rumored secrets or knowledge.',
  },
};

export const MENTOR_SPIRIT_IDS = Object.keys(MENTOR_SPIRITS);
