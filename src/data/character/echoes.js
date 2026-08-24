// Echoes — one gained per Submersion Grade. Same id-keyed shape as
// METAMAGICS. "Unless otherwise noted, you can't pick the same Echo
// more than once. When Echoes can be taken multiple times, their
// bonuses stack."
//
// INCOMPLETE — more Echoes are confirmed to exist beyond Skinlink
// (the original excerpt cut off there), just not yet found in source.

// Living Network resolved a real ambiguity flagged when this file was
// first built — confirmed via errata/FAQ consensus: without it, a
// technomancer's Living Persona can only ever be a SLAVE in someone
// else's PAN, never a master with anything subordinated to it.
// "Until you have the Living Network echo, [technomancers and RCCs]
// don't [interact]. Once you do... you can subordinate an RCC into
// your living persona's PAN" — confirmed the same applies to any
// device, not just RCCs specifically. This is now enforced as a
// soft-gate on the Slave action itself (NetworkPanel), not just
// documented here — see that component's own comment.

export const ECHOES = {
  living_network: {
    label: 'Living Network',
    repeatable: false,
    description: "Your living persona can act as a MASTER in a PAN, subordinating other devices to it — without this Echo, your living persona can only ever be a slave in someone else's network. Only selected once. Note: subordinating an RCC doesn't grant your persona the RCC's own Noise Reduction/Sharing features — those still only apply to drones subordinated to the RCC itself within the linked PAN.",
  },
  machine_mind: {
    label: 'Machine Mind',
    repeatable: false,
    description: 'You gain the benefits of a Rating 1 Control Rig. Only selected once.',
  },
  matrix_attribute_upgrade: {
    label: 'Matrix Attribute Upgrade',
    repeatable: true,
    requiresSelection: 'matrixAttribute',
    maxPerSelection: 2,
    description: "Upgrade one of your living persona's Matrix Attributes by 1. May be taken multiple times, but each Matrix Attribute may only be upgraded twice.",
  },
  neurofilter: {
    label: 'NeuroFilter',
    repeatable: true,
    maxCount: 2,
    description: '+1 dice pool bonus to resist biofeedback damage. May be taken twice.',
  },
  overclocking: {
    label: 'Overclocking',
    repeatable: false,
    description: "Accelerates your living persona in the Matrix — an additional Minor Action and +1D6 Initiative Dice while in hot-sim VR.",
  },
  resonance_link: {
    label: 'Resonance Link',
    repeatable: false,
    description: "A low-level, one-way empathic link with another technomancer of your choice — you sense their dominant mood/emotions and know when they're under attack, stress, pain, or danger. One-directional unless both of you take the Echo with each other, creating a two-way link.",
  },
  skinlink: {
    label: 'Skinlink',
    repeatable: false,
    description: 'Connect to a device as if using a DNI simply by touching it. Only selected once.',
  },
};

export const ECHO_IDS = Object.keys(ECHOES);

export const SUBMERSION_NOTE =
  'Deepens a Technomancer\'s Resonance connection. First submersion sets Submersion Grade to 1; each subsequent submersion raises it by 1, capped at your Resonance rating. Cost: (10 + desired Submersion Grade) Karma, (Grade + 1) weeks. Each grade also grants an Echo. This catalog is INCOMPLETE — the source cut off mid-list; more Echoes exist beyond what\'s captured here.';
