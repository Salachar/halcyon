// Metamagics — learned one per Initiate Grade. Same id-keyed shape as
// POWERS/SPELLS/COMPLEX_FORMS. "Unless otherwise noted, metamagics can
// only be selected once" — Power Point is the one confirmed exception
// (repeatable: true, explicitly "as many times as you like").

export const METAMAGICS = {
  adept_centering: {
    label: 'Adept Centering',
    adeptOnly: true,
    description: "A Minor Action; opponents can't gain Edge from environmental conditions or Illusion-spell Attack/Defense shifts against you, on your turn when performed or their next turn after.",
  },
  centering: {
    label: 'Centering',
    adeptOnly: false,
    description: 'A Minor Action using a tradition-appropriate mundane activity (chanting, an instrument, dance, gestures — something non-subtle); adds dice equal to your Initiate Grade to Drain Resistance tests. Unusable if physically prevented from performing the activity.',
  },
  fixation: {
    label: 'Fixation',
    adeptOnly: false,
    description: "Spend Karma (up to the preparation's Potency) when creating it; it then loses Potency at 1/day instead of 1/(current Potency x 2 hours), and gains a dice-pool bonus against Disjoining equal to Karma spent.",
  },
  flexible_signature: {
    label: 'Flexible Signature',
    adeptOnly: false,
    description: "Alter your own astral signature at will (disguise it, forge another's assensed signature, or shorten its lifespan). Reading a forged signature adds your Initiate Grade to the Assensing threshold; enough net hits reveal both the fake and the real signature. Can only forge signatures you've actually assensed. Also shortens your natural signature's duration by your Grade in hours.",
  },
  masking: {
    label: 'Masking',
    adeptOnly: false,
    description: "Change how your aura/astral form appears (mundane, or Magic rank altered by up to your Initiate Grade, or even disguised as a different type of thing if you can astrally perceive). Reading it becomes Opposed against your Magic + Initiate Grade; net hits reveal the mask and the truth. Can also mask a number of bonded foci equal to your Grade.",
  },
  power_point: {
    label: 'Power Point',
    adeptOnly: false,
    repeatable: true,
    description: 'Adept or Mystic Adept only — take a Power Point instead of a metamagic. Repeatable as many times as desired.',
  },
  quickening: {
    label: 'Quickening',
    adeptOnly: false,
    description: 'A Major Action; spend Karma (1 to the number of hits on the original casting) while sustaining a spell to make it permanent, gaining a dispelling-resistance dice bonus equal to Karma spent.',
  },
  spell_shaping: {
    label: 'Spell Shaping',
    adeptOnly: false,
    description: "For every -1 dice pool penalty taken on the Spellcasting test (up to your Magic rank), adjust an area spell's radius by \u00b11 meter or carve out a 1-meter \"safe bubble\" within it. Must be declared at casting; doesn't affect Drain Value (unlike Increase Area).",
  },
  shielding: {
    label: 'Shielding',
    adeptOnly: false,
    description: 'When declaring Boosted Defense, add dice equal to your Initiate Grade directly to the spell-defense pool (not usable for other Counterspelling purposes, including Dispelling).',
  },
};

export const METAMAGIC_IDS = Object.keys(METAMAGICS);

export const INITIATION_NOTE =
  'First initiation sets Initiate Grade to 1; each subsequent initiation raises it by 1, capped at your Magic rating (if Magic ever drops below your current Grade, the Grade drops to match, losing its bonuses). To initiate: [highest Magic skill] + Magic (desired Initiate Grade) Extended test, 1-month interval, spending (10 + desired Initiate Grade) Karma. On completion: maximum Magic rank rises to 6 + Initiate Grade (reduced by 1 per full point of Essence lost, and Magic still has to be raised with Karma separately to actually reach it), astral projection gains metaplane access at Grade 1+, and you learn one metamagic.';
