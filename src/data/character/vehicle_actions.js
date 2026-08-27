// Vehicle Rigging tests — confirmed against source directly. Real
// PoolBuilder rolling wired wherever a single-actor pool exists
// (Handling Test, Crash Test, Ramming vs. a vehicle, Ramming vs. a
// pedestrian, Mounted Weapon Fire) — matches the same "roll your own
// side, GM/opposing player supplies the other" boundary as Matrix
// Actions and Combat Actions. Speed Interval's cumulative penalty
// isn't baked into any default pool here — it's a live, changing
// number tracked per-vehicle (see the Owned Vehicles tracker), added
// as a manual modifier via PoolBuilder's own Add Modifier control when
// it applies, same as any other situational penalty in this app.
// Unmounted weapon fire from inside a vehicle isn't rollable from
// here either — same reasoning as Attack itself: it resolves through
// the specific weapon's own row in GearList, not a generic action.

export const VEHICLE_ACTIONS = {
  handling_test: {
    label: 'Handling Test',
    skill: 'piloting', attribute: 'reaction',
    threshold: "Vehicle's Handling rating (on-road or off-road, whichever applies)",
    description: "Made for anything tricky — following a car unseen, a hairpin turn at speed, jumping a gap. Normal driving needs no test at all. The GM adjusts the threshold up or down for maneuver difficulty. A failed Handling test forces an immediate Crash Test.",
  },
  crash_test: {
    label: 'Crash Test',
    skill: 'piloting', attribute: 'reaction',
    threshold: "Vehicle's Handling rating (same as the Handling Test that triggered it)",
    description: "Forced immediately after failing a Handling test. Same Piloting + Reaction pool, same Handling threshold, with Speed Interval and vehicle-damage penalties applied. Failing this means an actual crash — occupants resist damage equal to (speed in m/round / 10), reduced by any safety features (airbags, foam, seatbelts) before a standard Damage Resistance test.",
  },
  ramming_vehicle: {
    label: 'Ramming (vs. Vehicle)',
    skill: 'piloting', attribute: 'reaction',
    threshold: "Opposed — target vehicle's own Piloting + Reaction",
    description: "Using a vehicle/drone as a weapon against another vehicle. Attack Rating = driver's Piloting + Sensor; Defense Rating = driver's Piloting + Armor. Damage = (Body/2, rounded up) + 1 per current Speed Interval, Physical — the target deals the same back. Both sides resist with Body.",
  },
  ramming_pedestrian: {
    label: 'Ramming (vs. Pedestrian)',
    skill: 'piloting', attribute: 'reaction',
    threshold: "Opposed — target's Intuition + Reaction",
    description: "Same as Ramming a vehicle, but against a person on foot: opposed by the target's Intuition + Reaction instead of a driver's Piloting + Reaction. Damage to the pedestrian uses (target's Body/4, rounded up) rather than the full vehicle-vs-vehicle formula.",
  },
  mounted_weapon_fire: {
    label: 'Mounted Weapon Fire',
    skill: 'engineering', attribute: 'logic',
    threshold: 'Normal ranged attack rules, plus Speed Interval penalties',
    description: "Firing a weapon mounted on a vehicle — Engineering + Logic, not the weapon's own normal skill. Otherwise resolves as a standard ranged attack, with the current Speed Interval penalty applied on top.",
  },
};

export const VEHICLE_ACTION_IDS = Object.keys(VEHICLE_ACTIONS);

export const VEHICLE_MOVEMENT_NOTE =
  'Distance traveled per round = current speed +/- half the acceleration rate (if accelerating or decelerating), or just current speed if holding steady. Speed Interval: each time a vehicle\'s current speed crosses another Speed Interval threshold, it takes a cumulative -1 to all Handling tests AND vehicle-attack tests going forward. Handling worsens by 1 per 3 Condition Monitor boxes of damage taken. Vehicles/drones are immune to Stun damage at or below their Body rating, except from electricity.';

export const RIGGING_JUMP_IN_NOTE =
  'Jumping in requires an implanted Vehicle Control Rig, or a technomancer\'s Machine Mind Echo. While jumped in, Physical attributes are replaced with Mental ones for all tests on the device: Body->Willpower, Strength->Charisma, Agility->Logic, Reaction->Intuition. If physically present in a vehicle that crashes, real Body is still used to resist that damage. Only one controller (remote, jumped-in, or manual) at a time per vehicle/drone. Rigger ejection triggers: Reboot Device used against the vehicle, the controlling commlink/RCC being bricked, the vehicle being destroyed, or (if directly plugged in) being physically unplugged, which also causes Dumpshock.';
