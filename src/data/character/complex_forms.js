// Single source of truth for Complex Forms — the technomancer equivalent
// of spells, 15 total. Same id-keyed shape as SPELLS.
//
// fadeValue is the technomancer version of a spell's drainValue —
// resisted with Willpower + Logic, Physical if it exceeds Resonance,
// otherwise Stun (same "exceeds the relevant attribute" pattern
// Sorcery's Drain uses, just with Resonance in place of Magic).
// duration: 'I' | 'S' | 'P' — no 'L' (Limited) here, unlike spells.
//
// requiresSelection marks forms that need a pick at purchase/use time
// (a Matrix attribute, a program) — same convention as SKILLS/QUALITIES.
// repeatable marks forms purchasable more than once for different
// selections (Diffusion/Infusion per attribute, Emulate per program).

export const COMPLEX_FORMS = {
  cleaner: {
    label: 'Cleaner',
    fadeValue: 2,
    duration: 'P',
    description: 'Electronics + Resonance test; each hit reduces your own Overwatch Score by 1.',
  },

  diffusion: {
    label: 'Diffusion (Matrix Attribute)',
    fadeValue: 4,
    duration: 'S',
    requiresSelection: 'matrixAttribute',
    repeatable: true,
    description: "Electronics + Resonance vs. Willpower + Firewall, opposed; each net hit reduces the chosen Matrix attribute by 1 (minimum 1). Repeatable per attribute.",
  },

  editor: {
    label: 'Editor',
    fadeValue: 3,
    duration: 'P',
    description: 'Take the Edit File action on a file without the proper access level, as long as you can detect the file.',
  },

  emulate: {
    label: 'Emulate (Program)',
    fadeValue: null,
    duration: 'S',
    requiresSelection: 'program',
    repeatable: true,
    description: "Run one chosen program as if you had it installed, including autosofts (at a rating equal to your current Data Processing). Repeatable per program. No Fade Value — running the emulated program doesn't itself cost Fading.",
  },

  infusion: {
    label: 'Infusion (Matrix Attribute)',
    fadeValue: 4,
    duration: 'S',
    requiresSelection: 'matrixAttribute',
    repeatable: true,
    description: 'Electronics + Resonance (4) simple test; each net hit raises the chosen Matrix attribute by 1, up to double its normal rating. Repeatable per attribute.',
  },

  mirrored_persona: {
    label: 'Mirrored Persona',
    fadeValue: 3,
    duration: 'S',
    description: "Electronics + Resonance test; hits set the rating of a duplicate persona. Attackers need a Matrix Perception test (threshold = that rating) to target you instead — failing it hits the duplicate and ends the form.",
  },

  pulse_storm: {
    label: 'Pulse Storm',
    fadeValue: 3,
    duration: 'I',
    description: "Electronics + Resonance vs. Logic + Data Processing; each net hit raises the target's Noise rating by 1.",
  },

  puppeteer: {
    label: 'Puppeteer',
    fadeValue: 5,
    duration: 'S',
    description: 'Take the Control Device action on a device without the proper access level, as long as you can detect the device.',
  },

  resonance_channel: {
    label: 'Resonance Channel',
    fadeValue: 2,
    duration: 'S',
    description: 'Electronics + Resonance test; each hit reduces your own Noise level by 1.',
  },

  resonance_spike: {
    label: 'Resonance Spike',
    fadeValue: 4,
    duration: 'I',
    description: 'Cracking + Resonance vs. Willpower + Firewall; each net hit deals 1 box of unresisted Matrix damage.',
  },

  resonance_veil: {
    label: 'Resonance Veil',
    fadeValue: 4,
    duration: 'S',
    description: 'Electronics + Resonance vs. Intuition + Data Processing; creates a convincing fake Matrix event. Even a suspicious target needs a Matrix Perception test (threshold = your net hits) to see through it.',
  },

  static_bomb: {
    label: 'Static Bomb',
    fadeValue: 6,
    duration: 'I',
    description: 'Electronics + Resonance vs. Intuition + Data Processing against everyone who can detect you; anyone rolling zero net hits loses track of you and must re-Perceive before acting against you again.',
  },

  static_veil: {
    label: 'Static Veil',
    fadeValue: 3,
    duration: 'S',
    description: "Electronics + Resonance vs. Willpower/Firewall + Firewall; while sustained, illegal host access via a sprite doesn't add to your Overwatch Score (illegal actions themselves still do).",
  },

  stitches: {
    label: 'Stitches',
    fadeValue: 4,
    duration: 'P',
    description: "Electronics + Resonance test; each net hit repairs 1 box of Matrix damage on a sprite.",
  },

  tattletale: {
    label: 'Tattletale',
    fadeValue: 3,
    duration: 'P',
    description: "Electronics + Resonance test; each hit raises the target's Overwatch Score by 1.",
  },
};

export const COMPLEX_FORM_IDS = Object.keys(COMPLEX_FORMS);

// Reference note, not form data — Technomancers get (initial Resonance
// × 2) complex forms at creation (using the Priority-table Resonance
// value, before Karma/adjustment points), more purchasable later with
// Karma. Attack Rating for any complex form = Electronics + Resonance.
export const TECHNOMANCER_COMPLEX_FORM_NOTE =
  'Technomancers start with (initial Resonance × 2) complex forms at creation. Attack Rating when using any complex form is Electronics + Resonance. Every sustained complex form imposes a –2 dice pool penalty on all actions.';
