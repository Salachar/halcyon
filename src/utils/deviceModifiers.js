import { ALL_GEAR } from '@data/gear';

// Generic mechanism for "a loaded item modifies something while
// active in the PAN" — Toolbox boosting Data Processing, Signal
// Scrubber reducing Noise, Virtual Machine boosting its own housing's
// Program Slots, etc. Two tiers, matching whether the app can actually
// verify the condition:
//
// - deviceModifiers: unconditional, always applies whenever the item is
//   active (see GearManager.isActiveInPan) — safe to auto-sum.
// - conditionalModifiers: the effect is real, but gated on something
//   the app has no way to verify (range, "while active" caveats) — never
//   auto-applied, only surfaced as an optional toggle the player/GM
//   confirms is actually true right now.
//
// Uses isActiveInPan, not isEffectivelyWireless — Programs/Tac-Apps
// have no `wireless: true` flag at all (no on/off state of their own,
// they're either loaded or they aren't), so gating through the
// wireless-specific check meant they could never pass it, silently
// excluding every Program regardless of whether it was actually
// attached. isActiveInPan only requires the full wireless cascade for
// items that are actually wireless-capable.
//
// GLOBAL scope — sums across the character's ENTIRE PAN (Primary +
// Slaved + nested attachments), for effects that boost the whole
// persona (Toolbox, Signal Scrubber). Virtual Machine's +2 Program
// Slots is housing-scoped instead (only boosts the specific device
// it's loaded into) — that's wired directly into gearCapacity.js's
// computeCapacity, not through this global sum.

export function sumDeviceModifiersGlobal(character, statName) {
  const gear = character.gearManager.gear;
  let total = 0;
  for (const instanceId of Object.keys(gear)) {
    if (!character.gearManager.isActiveInPan(instanceId)) continue;
    const item = ALL_GEAR[gear[instanceId].itemId];
    const bonus = item?.stats?.deviceModifiers?.[statName];
    if (bonus) total += bonus;
  }
  return total;
}

export function collectConditionalModifiers(character, statName) {
  const gear = character.gearManager.gear;
  const results = [];
  for (const instanceId of Object.keys(gear)) {
    if (!character.gearManager.isActiveInPan(instanceId)) continue;
    const item = ALL_GEAR[gear[instanceId].itemId];
    const bonus = item?.stats?.conditionalModifiers?.[statName];
    if (bonus) results.push({ id: instanceId, label: item.label, value: bonus });
  }
  return results;
}
