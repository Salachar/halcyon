// The full Combat Actions list — confirmed against source directly
// (Game Timing and Actions). "Attack" itself deliberately isn't rolled
// from here — it lives on the weapon's own row in GearList, where the
// correct skill (Firearms/Close Combat/Exotic Weapons/etc.) is
// unambiguous; this stays reference-only for Attack, Cast Spell,
// Counterspell, and Astral Projection, all four of which the source
// itself just points at their own dedicated chapters rather than
// giving self-contained text.
//
// timing: 'initiative' (only on your own player turn) | 'anytime'
// (usable whenever you have an action left, even outside your turn,
// confirmed distinct from actionType which is just Minor vs Major).
// hasTest: true only for actions that are genuinely their OWN
// standalone roll — most Minor Actions explicitly need no test at
// all, and several (Block, Dodge, Hit the Dirt) modify a DIFFERENT
// existing test (Defense) rather than being a roll of their own.

export const COMBAT_ACTIONS = {
  // ==================== MINOR ACTIONS ====================
  activate_deactivate_focus: {
    label: 'Activate/Deactivate Focus',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: 'Activate or deactivate a bonded focus carried on your person.',
  },
  avoid_incoming: {
    label: 'Avoid Incoming',
    actionType: 'minor', timing: 'anytime', hasTest: true,
    skill: 'athletics', attribute: 'reaction',
    description: "Used off your own turn to get away from an incoming Blast or Gas attack. Roll Reaction + Athletics - Dodge Penalty; hits let you move that many meters in a direction of your choosing (scatter result isn't known until after you commit to a direction). Moving more than 2m means diving to the ground and gaining Prone at the end. Can't be used if you already took an Avoid Incoming, Move, or Sprint action this round, and prevents another for the rest of the round.",
  },
  block: {
    label: 'Block',
    actionType: 'minor', timing: 'anytime', hasTest: false,
    description: 'Adds your Close Combat skill to a single melee Defense test, in the same player turn the action is used.',
  },
  call_a_shot: {
    label: 'Call a Shot',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: 'Edge allows certain called shots with no or reduced dice penalty; alternatively, increase damage by 2 by taking a -4 dice pool penalty. Must be combined with the Attack action.',
  },
  change_device_mode: {
    label: 'Change Device Mode',
    actionType: 'minor', timing: 'anytime', hasTest: false,
    description: "Activate, deactivate, or switch the mode on any device linked by a direct neural interface — activating cyberware, changing a smartgun's firing settings, switching a commlink to hidden mode, turning wireless off, and so on.",
  },
  command_drone: {
    label: 'Command Drone',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: 'Issue a command to a controlled drone. If multiple drones share an RCC, the same command can go to all of them; different commands per drone need multiple Minor Actions.',
  },
  command_spirit: {
    label: 'Command Spirit',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: 'Issue a service command to a spirit or group of spirits under your control, or dismiss them. Multiple different services need multiple Minor Actions.',
  },
  dismiss_spirit: {
    label: 'Dismiss Spirit',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: "No separate write-up exists in source — this is the same mechanism as Command Spirit's own \"or dismiss them\" clause, just listed as its own named entry in the action table.",
  },
  dodge: {
    label: 'Dodge',
    actionType: 'minor', timing: 'anytime', hasTest: false,
    description: 'Adds your Athletics skill to a single combat Defense test, in the same player turn the action is used.',
  },
  drop_object: {
    label: 'Drop Object',
    actionType: 'minor', timing: 'anytime', hasTest: false,
    description: 'Drop a held object. May suffer damage depending on the fall.',
  },
  drop_prone: {
    label: 'Drop Prone',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: 'Drop to the ground, gaining the Prone status until using Stand Up.',
  },
  hit_the_dirt: {
    label: 'Hit the Dirt',
    actionType: 'minor', timing: 'anytime', hasTest: false,
    description: '+2 dice on the Defense test of an incoming attack. Gain Prone, but suffer a -2 dice pool penalty on active-skill tests until the end of your next turn, unless you Stand Up first.',
  },
  intercept: {
    label: 'Intercept',
    actionType: 'minor', timing: 'anytime', hasTest: false,
    description: 'If an opponent comes within Close range, go out of Initiative order and make an Attack, provided both a Minor and Major Action are still available. Counts as your Attack Major Action for the turn. Cannot be used with ranged weapons.',
  },
  move: {
    label: 'Move',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: '10 meters of movement. Only one Move action allowed per player turn.',
  },
  multiple_attacks: {
    label: 'Multiple Attacks',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: 'Attack more than one opponent, if ammunition, reach, and placement allow. Split your dice pool evenly among targets, or half each for two different attack forms (rounded down). Must be used with an Attack Major Action.',
  },
  quick_draw: {
    label: 'Quick Draw',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: 'Quick-draw a pistol, pistol-sized weapon, or small throwing weapon and immediately attack. Must be combined with the Attack action, and requires the appropriate gear/augmentation/quality.',
  },
  reload_smartgun: {
    label: 'Reload Smartgun',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: 'A character linked to a ready smartgun ejects the clip and slides in a new one with a mental command, given available ammo.',
  },
  shift_perception: {
    label: 'Shift Perception',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: 'A character capable of Astral Perception may shift perception to or from astral space.',
  },
  stand_up: {
    label: 'Stand Up',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: 'Get back to your feet and remove the Prone status.',
  },
  take_aim: {
    label: 'Take Aim',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: "+1 dice pool bonus. Only once per round, but carries over to the next round if unused, up to your Willpower as a max bonus — lost if a player turn passes without Take Aim or Attack. Usable with a ready firearm, bow, or exotic ranged weapon. If using vision magnification or a targeting scope, the first Take Aim just enables the modification, without extra bonus.",
  },
  take_cover: {
    label: 'Take Cover',
    actionType: 'minor', timing: 'initiative', hasTest: false,
    description: 'Use something in the area for protection, gaining Cover I-IV status, with the constraints that come with it.',
  },
  trip: {
    label: 'Trip',
    actionType: 'minor', timing: 'initiative', hasTest: true,
    skill: 'athletics', attribute: 'agility',
    description: "A melee attack focused on bringing the target down rather than damage. Must be combined with an Attack Major Action. Decrease base damage by 2; if it hits, the target rolls Athletics + Agility against the adjusted DV as a threshold — failure means the target gains Prone.",
  },

  // ==================== MAJOR ACTIONS ====================
  assist: {
    label: 'Assist',
    actionType: 'major', timing: 'anytime', hasTest: false,
    description: 'Become a helper on a Teamwork test.',
  },
  astral_projection: {
    label: 'Astral Projection',
    actionType: 'major', timing: 'initiative', hasTest: false,
    description: "A full or aspected magician may shift consciousness to or from the astral plane. Complete the moment it's declared, including for the rest of the current combat round. Full mechanics in the Magic chapter.",
  },
  attack: {
    label: 'Attack',
    actionType: 'major', timing: 'initiative', hasTest: false,
    description: 'Perform one of a variety of forms of attack. Rolled from the specific weapon being used, not from here — see that weapon\'s own row.',
  },
  banish_spirit: {
    label: 'Banish Spirit',
    actionType: 'major', timing: 'initiative', hasTest: false,
    description: 'Attempt a Banishing on a spirit. Full mechanics in the Magic chapter.',
  },
  cast_spell: {
    label: 'Cast Spell',
    actionType: 'major', timing: 'initiative', hasTest: false,
    description: 'Cast a spell. Full mechanics in the Magic chapter.',
  },
  cleanse: {
    label: 'Cleanse',
    actionType: 'major', timing: 'initiative', hasTest: false,
    description: 'Awakened characters erase traces of their own magical activity.',
  },
  counterspell: {
    label: 'Counterspell',
    actionType: 'major', timing: 'anytime', hasTest: false,
    description: 'See the Magic chapter for details.',
  },
  full_defense: {
    label: 'Full Defense',
    actionType: 'major', timing: 'anytime', hasTest: false,
    description: 'Add your Willpower to all Defense tests until the end of the combat round.',
  },
  manifest: {
    label: 'Manifest',
    actionType: 'major', timing: 'initiative', hasTest: false,
    description: 'A character who is astrally projecting appears as a ghostly form.',
  },
  observe_in_detail: {
    label: 'Observe in Detail',
    actionType: 'major', timing: 'initiative', hasTest: true,
    skill: 'perception', attribute: 'intuition',
    description: "A detailed observation (a Perception or Assensing test), for details obscured by the pace of combat — everyone in a fight is generally aware of everyone else's presence, but not necessarily their gear, or in hectic circumstances, their identity.",
  },
  pick_up_put_down_object: {
    label: 'Pick Up/Put Down Object',
    actionType: 'major', timing: 'initiative', hasTest: false,
    description: "Pick up an object within reach or put one down carefully. If the object is a weapon, this counts as readying it.",
  },
  ready_weapon: {
    label: 'Ready Weapon',
    actionType: 'major', timing: 'initiative', hasTest: false,
    description: 'Draw and ready a firearm, pull a melee weapon from a sheath, take out a grenade, or otherwise prepare a weapon — almost all weapons require this before use. Small weapons (throwing knives, shuriken) can be readied in bunches, up to your Agility, with one action.',
  },
  reload_weapon: {
    label: 'Reload Weapon',
    actionType: 'major', timing: 'initiative', hasTest: false,
    description: 'Weapons without an engaged smartlink require this to reload, refilling to max capacity given sufficient ammunition.',
  },
  rigger_jump_in: {
    label: 'Rigger Jump In',
    actionType: 'major', timing: 'initiative', hasTest: false,
    description: 'A character with a VCR and rigger-adapted vehicle/drone, or an RCC, jumps in to control it.',
  },
  sprint: {
    label: 'Sprint',
    actionType: 'major', timing: 'initiative', hasTest: true,
    skill: 'athletics', attribute: 'agility',
    description: 'Move at a sprint — starts at 15 meters, +1 meter per hit on an Athletics + Agility test. Only one Sprint per turn; cannot combine with Move or Avoid Incoming.',
  },
  summon_spirit: {
    label: 'Summon Spirit',
    actionType: 'major', timing: 'initiative', hasTest: false,
    description: 'Summon a spirit to assist. An already-summoned spirit is controlled via Command Spirit instead.',
  },
  use_simple_device: {
    label: 'Use Simple Device',
    actionType: 'major', timing: 'initiative', hasTest: false,
    description: 'Use any device activated with a simple movement (thumb trigger, single key, single icon tap). A device connected via DNI uses a Minor Action instead.',
  },
  use_skill: {
    label: 'Use Skill',
    actionType: 'major', timing: 'initiative', hasTest: false,
    description: 'Use an appropriate skill for whatever the situation calls for.',
  },
};

export const COMBAT_ACTION_IDS = Object.keys(COMBAT_ACTIONS);

// Edge Actions by cost — confirmed table, but only names/costs/
// associated actions were confirmed this pass, not full individual
// mechanical text for each (Shank, Tumble, Wrest, etc.) — flagged
// rather than invented.
export const COMBAT_EDGE_ACTIONS = [
  { id: 'shank', label: 'Shank', cost: 1, associatedAction: 'Melee Attack' },
  { id: 'sudden_insight', label: 'Sudden Insight', cost: 1, associatedAction: 'Any' },
  { id: 'tactical_roll', label: 'Tactical Roll', cost: 1, associatedAction: 'Hit the Dirt' },
  { id: 'tumble', label: 'Tumble', cost: 1, associatedAction: 'Melee Attack' },
  { id: 'bring_the_drama', label: 'Bring the Drama', cost: 2, associatedAction: 'Use Skill (Con)' },
  { id: 'fire_from_cover', label: 'Fire from Cover', cost: 2, associatedAction: 'Ranged Attack, must be in Cover IV' },
  { id: 'knockout_blow', label: 'Knockout Blow', cost: 2, associatedAction: 'Melee Attack' },
  { id: 'wrest', label: 'Wrest', cost: 2, associatedAction: 'Block' },
  { id: 'anticipation', label: 'Anticipation', cost: 4, associatedAction: 'Multiple Attacks, Ranged Attack' },
  { id: 'big_speech', label: 'Big Speech', cost: 4, associatedAction: 'Use Skill (Influence)' },
  { id: 'called_shot_disarm', label: 'Called Shot — Disarm', cost: 5, associatedAction: 'Any attack' },
  { id: 'called_shot_vitals', label: 'Called Shot — Vitals', cost: 5, associatedAction: 'Any attack' },
];
