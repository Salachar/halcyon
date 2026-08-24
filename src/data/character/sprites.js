// Sprites — Compiling's Matrix-native allies. Technomancer only.
// Same "stored as reference text, not computed" reasoning as
// spirits.js — a sprite's Level is chosen fresh at compiling, this
// tracks the relationship (which sprites are compiled, registered
// status, tasks remaining), not a live opponent/ally stat block.

export const SPRITE_TYPES = {
  courier: {
    label: 'Courier',
    description: 'Secure message delivery and tracking specialist.',
    attributes: 'Attack L, Sleaze L+3, Data Processing L+1, Firewall L+2',
    initiative: '(L x 2) + 1 + 4D6',
    skills: 'Electronics, Cracking',
    powers: 'Cookie, Hash',
  },
  crack: {
    label: 'Crack',
    description: 'Low-profile, stays under the radar — the go-to for a quiet run.',
    attributes: 'Attack L, Sleaze L+3, Data Processing L+2, Firewall L+1',
    initiative: '(L x 2) + 2 + 4D6',
    skills: 'Electronics, Cracking',
    powers: 'Phantom, Suppression',
  },
  data: {
    label: 'Data',
    description: 'Masters of finding and manipulating data — great researchers.',
    attributes: 'Attack L-1, Sleaze L, Data Processing L+4, Firewall L+1',
    initiative: '(L x 2) + 4 + 4D6',
    skills: 'Electronics, Cracking',
    powers: 'Camouflage, Watermark',
  },
  fault: {
    label: 'Fault',
    description: 'Combat-oriented — cold and tenacious in a Matrix fight.',
    attributes: 'Attack L+3, Sleaze L, Data Processing L+1, Firewall L+2',
    initiative: '(L x 2) + 1 + 4D6',
    skills: 'Electronics, Cracking',
    powers: 'Electron Storm, Trap',
  },
  machine: {
    label: 'Machine',
    description: 'Most likely to interact with the physical world (through a device) — electronics experts.',
    attributes: 'Attack L+1, Sleaze L, Data Processing L+3, Firewall L+2',
    initiative: '(L x 2) + 3 + 4D6',
    skills: 'Electronics, Engineering',
    powers: 'Diagnostics, Override, Stability',
  },
};

export const SPRITE_TYPE_IDS = Object.keys(SPRITE_TYPES);

export const SPRITE_POWERS = {
  camouflage: {
    label: 'Camouflage',
    description: 'Conceals a file within another, invisible to Matrix searches. Only a targeted Matrix Perception test looking specifically for it can find/extract it — even the sprite itself needs that test.',
  },
  cookie: {
    label: 'Cookie',
    description: "Cracking + Resonance vs. Intuition + Firewall to tag a target persona with a silently-running tracking file, protected at the sprite's level. Logs hosts entered, communication metadata, programs used — depth scales with net hits (1 = bare outline, 4+ = detailed). Transfers to the sprite after a set time (deleted if the sprite's offline then). Detectable via Matrix Perception on the carrier; removable by stripping protection then deleting.",
  },
  diagnostics: {
    label: 'Diagnostics',
    description: "Electronics + Level test; +1 die per hit to a character's Electronics/Engineering/Piloting use or repair attempt on a device. Takes the sprite's full attention — lasts until it stops focusing on it.",
  },
  electron_storm: {
    label: 'Electron Storm',
    description: 'Cracking + Resonance vs. Intuition + Firewall; on success and each subsequent sustaining action, deals (Resonance) DV Matrix damage plus 2 levels of Noise to the target. Ends immediately if the sprite takes any Matrix damage.',
  },
  hash: {
    label: 'Hash',
    description: "Protects a carried file with a sprite-only-removable algorithm. Reverts to normal if the sprite stops carrying it.",
  },
  override: {
    label: 'Override',
    description: 'Electronics + Level vs. Device Rating + Firewall; success gives the sprite total control of an autopiloted device, substituting its Level for the Pilot rating.',
  },
  phantom: {
    label: 'Phantom',
    description: "Hides a persona/device from Matrix searches — finding it needs a targeted Matrix Perception test. The sprite can raise that threshold via an Electronics + Resonance test (net hits = threshold).",
  },
  stability: {
    label: 'Stability',
    description: 'Used on a persona/device the sprite has User/Admin access to — ignores standard glitches, downgrades critical glitches to regular ones (Gremlins/Accident-induced included).',
  },
  suppression: {
    label: 'Suppression',
    description: "While active in a host, delays newly-launched IC by (Level/2) rounds — delayed IC can't act or be targeted during that delay.",
  },
  trap: {
    label: 'Trap',
    description: 'Cracking + Level vs. Willpower + Firewall; success locks the target out of taking actions while sustained, ending once the sprite\'s attention shifts elsewhere.',
  },
  watermark: {
    label: 'Watermark',
    description: "Tags an icon with an invisible, overwrite-able, message-carrying Resonance-only marking. Erasable via Erase Matrix Signature, otherwise lasts as long as the icon does.",
  },
};

export const SPRITE_POWER_IDS = Object.keys(SPRITE_POWERS);

export const SPRITE_MECHANICS_NOTE =
  "Compiling: choose Level and type, roll Tasking + Resonance vs. (Level x 2) Opposed — net hits become tasks owed. Resist Fading (the sprite's hits, not net) with Willpower + Charisma. Only one UNREGISTERED sprite at a time; it exists for (Level x 2) hours and accumulates OS. Tasks must be well-defined: one use of a sprite power, one combat round of related Matrix Actions, or ongoing cybercombat until resolved/released — generally confined to your current host, sending it elsewhere counts as a remote task (after which it returns to the Resonance regardless of remaining tasks). Registering: (Level) hours, neither party can do anything else meanwhile (OS doesn't accumulate during it). At the end: Tasking + Resonance vs. (Level x 2) Opposed test, Fading = 2 DV per hit (not net), minimum 2. One net hit registers it — OS resets to 0, net hits add to owed tasks, no more time limit. You can then hold (Resonance) registered sprites plus one unregistered. Registered-only task types: Loaned Task, Remote Task, Re-register Sprite, Standby, Sustain Complex Form. Decompiling: Tasking + Resonance vs. (sprite's level, +compiler's Resonance if registered) Opposed test — net hits remove tasks, zero decompiles it.";
