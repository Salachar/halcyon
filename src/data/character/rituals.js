// Rituals — learned and Karma-costed the same as Spells, out of the
// SAME known-spell allowance (confirmed: "Rituals still have to be
// picked separately, out of the same allowance of known spells").
// Stored as their own list (character.rituals) for clarity of what's
// what, but the budget check in magicEconomy.js's
// combinedSpellRitualCount counts both lists together against one
// shared pool — KnownSpells and KnownRituals both need to read that
// combined count, not their own list length alone, or the two
// components' budgets would silently disagree with each other.
//
// 5 rituals confirmed with complete text, matching the standard SR6
// core Magic chapter's full ritual list — treated as complete, not
// partial, unlike some other catalogs in this project that were
// explicitly flagged as cut off.

export const RITUALS = {
  circle_of_healing: {
    label: 'Circle of Healing',
    keywords: ['Anchored', 'Spell'],
    threshold: 7,
    duration: '5 hours to perform',
    description: "Casts a Health spell (the leader's own known Health spell) on every target within a sphere around the anchor, radius equal to the leader's Magic rating. Net hits from the sealing step become the spell's net hits, applied as a positive dice-pool modifier to healing tests performed in the circle — any elemental aspect (Cooling Heal, Warming Heal) carries over too. The circle lasts a number of days equal to the sealing step's net hits.",
  },
  circle_of_protection: {
    label: 'Circle of Protection',
    keywords: ['Anchored'],
    threshold: 6,
    duration: '4 hours to perform',
    description: "A sphere around the anchor, radius equal to the leader's Magic rating, combining the Physical Barrier and Mana Barrier spells (dual-natured) with Structure equal to the leader's Magic + the final Sorcery test's net hits. Protects against outside physical objects and magical attacks; ends immediately if anything inside crosses the barrier outward. Lasts a number of hours equal to the sealing step's net hits.",
  },
  curse: {
    label: 'Curse',
    keywords: ['Material Link', 'Spell'],
    threshold: 5,
    duration: '3 hours to perform',
    description: "Casts an Illusion spell (the leader's own known Illusion spell) on a target through a material link instead of a normal mystic link/line of sight — works on any target regardless of range, as long as a link exists (multiple targets each need their own link). The link is consumed as part of the offering. The spell itself resolves normally (Teamwork-eligible, normal tests/Drain). While the spell is sustained, a trackable link exists between the target and the ritual group.",
  },
  prodigal_spell: {
    label: 'Prodigal Spell',
    keywords: ['Spell', 'Spotter'],
    threshold: 6,
    duration: '4 hours to perform',
    description: "Casts any Combat spell the leader knows at a target out of line of sight. Direct combat spells travel astrally to the target; indirect ones travel physically, requiring a clear (not necessarily straight) path from the foundation to the target.",
  },
  remote_sensing: {
    label: 'Remote Sensing',
    keywords: ['Spell', 'Spotter'],
    threshold: 5,
    duration: '3 hours to perform',
    description: "Casts any Detection spell the leader knows with area increased to (leader's Magic + total Sorcery test hits) x 100 meters. The spell's subject must be present in the foundation when the ritual begins, but can then leave while participants sustain the spell — every participant shares whatever the subject perceives through it. A targeted version (Mind Link, Mind Probe) needs a spotter with eyes on the actual target.",
  },
};

export const RITUAL_IDS = Object.keys(RITUALS);

export const RITUAL_KEYWORDS = {
  anchored: {
    label: 'Anchored',
    description: "Needs a physical or mystical focal point (an object, a symbol, the foundation itself) that can't move relative to the Earth for the ritual's duration — moving it collapses the ritual and ends the effect early.",
  },
  material_link: {
    label: 'Material Link',
    description: "Needs something that was once part of the target — a structural piece of an object (not a loose item), or a tissue sample for a living being. Hair/blood/fluids stay viable 4-5 hours; a larger sample (finger, \"pound of flesh\") lasts 3-4 days. Chemical preservation destroys viability instantly; frozen samples last up to a year.",
  },
  minion: {
    label: 'Minion',
    description: "Creates a semi-autonomous entity bound to the ritual leader, capped at their Charisma rating in simultaneous minions.",
  },
  spell: {
    label: 'Spell',
    description: "Used alongside a spell the leader already knows — only the leader needs to know it, not the rest of the group. Mentor spirit modifiers to that spell carry over to the ritual. Susceptible to Dispelling.",
  },
  spotter: {
    label: 'Spotter',
    description: "If the target isn't in the leader's line of sight, a group member (or their spirit) who can astrally perceive the target must physically or astrally travel to do so — the one explicit exception to \"no leaving the foundation.\" Doesn't join the sealing Teamwork test, but still takes the same Drain as everyone else.",
  },
};

export const RITUAL_PROCESS_NOTE =
  '1. Choose a Ritual Leader — knows the ritual, performs the sealing step; participants just need to be willing, not know it themselves. All effects carry the leader\'s astral signature. Off-tradition participants take a -2 dice pool penalty. Solo caster is automatically leader. 2. Choose the Ritual — and any incorporated spell (only the leader needs to know it). 3. Set Up the Foundation — a magical lodge (permanent or reagent-based temporary) matching the leader\'s tradition; no participant may leave before completion without failing the ritual (except a designated Spotter). 4. Spend Reagents — the specified amount, or the threshold if unspecified; extra reagents beyond the initial offering reduce final Drain by 1 per dram, minimum 2. 5. Perform the Ritual — duration is ritual-specific. 6. Seal the Ritual — leader rolls Sorcery + Magic vs. the ritual\'s threshold (Teamwork-eligible); net hits apply per the ritual\'s own description. Every participant then resists Drain equal to hits on a (Threshold x 2) test, minimum 2 — Physical if the leader\'s sealing hits exceeded their Magic, otherwise Stun. FAILURE: a participant leaving after Step 3, the leader being incapacitated before Step 6, or the foundation being disrupted — every participant takes Stun Drain equal to twice the hits on a threshold-sized test, reagents wasted. A glitch during any step can add Drain, raise the threshold, or force the leader to seal alone; a critical glitch is GM\'s discretion.';
