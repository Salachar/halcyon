import { sumDeviceModifiersGlobal } from '@utils/deviceModifiers';
import { arrayCompositedStats } from '@utils/vehicleEconomy';

// Fixed category ordering for PAN display — Cyberware (sub-ordered by
// body location: head -> eyes -> ears -> torso -> limbs), then
// Weapons, then Gear/Accessories. No user-customizable sort — nothing
// mechanical depends on order, a predictable scheme beats a "smart"
// one that has to be learned.

const CYBERWARE_SUBORDER = {
  headware: 0,           // head
  eyeware: 1,             // eyes
  earware: 2,              // ears
  bodyware: 3,               // torso (general bodyware, no more specific location given)
  cyberlimb: 4,                // limbs — the limb itself
  cyberlimb_accessory: 4,        // installed IN a limb, grouped with it
  implant_weapon: 4,               // installed in flesh or a limb, same bucket either way
  firearm_implant: 4,
};

function cyberwareSubOrder(item) {
  for (const tag of item.tags || []) {
    if (CYBERWARE_SUBORDER[tag] != null) return CYBERWARE_SUBORDER[tag];
  }
  return 5; // unrecognized cyberware tag — sorts last within the category rather than crashing
}

/**
 * Every category that provides real ASDF-relevant capability and
 * belongs in the Matrix Devices zone — commlink/cyberdeck (full
 * persona, standalone), cyberjack (D/F-only, but a supporting implant,
 * not standalone), mtoc/rcc (D/F-only, standalone — an M-TOC or RCC is
 * a complete persona shape on its own, just without Attack/Sleaze).
 *
 * PRIMARY_CAPABLE_CATEGORIES is the narrower subset eligible for
 * "Make Primary" — confirmed against the FAQ: "Only actions linked to
 * Attack or Sleaze require those attributes. You can perform other
 * Matrix actions, even illegal ones, using just a commlink." That's
 * why a commlink (often 0 Firewall or 0 Data Processing on cheap
 * models) already works as Primary — any real ASDF presence generates
 * a full persona, A/S just gates which specific actions it can take.
 * RCC/M-TOC have the identical D/F-only shape, so the same logic
 * applies to them. Cyberjacks are the one exclusion: per their own
 * description they "provide Data Processing/Firewall ratings decks no
 * longer have natively" — they only function HOUSED inside an existing
 * persona, never as a standalone one, so they can never be Primary.
 *
 * living_persona is the same kind of exclusion as Cyberjacks, different
 * reason: a technomancer's Living Persona is IN MATRIX_CATEGORIES (it's
 * a full ASDF-bearing persona, belongs in the Matrix Devices zone) but
 * NOT in PRIMARY_CAPABLE_CATEGORIES — not because it can't stand alone
 * (it's the opposite, it's the only thing that's ALWAYS the technomancer's
 * persona), but because it's set as Primary exactly once, at character
 * creation, and never through the normal promote flow — excluding it
 * here is what keeps "Make/Unset Primary" from ever rendering on its
 * row, no ID-specific check needed anywhere else.
 *
 * comm_sensor_array is a third, different reason again: a vehicle's
 * Comms/Sensor Array only ever reaches a character's PAN by being
 * deliberately slaved there ("Slave to Vehicle"), never promoted — a
 * whole separate vehicle's Matrix presence can't sensibly become
 * someone's own Primary persona. Its actual ASDF isn't a static catalog
 * stat either — it's resolved dynamically from its own attached
 * Comm Sensor Enhancement Modules, same "read live, not from the
 * catalog" pattern as Living Persona, just pointed at
 * arrayCompositedStats (vehicleEconomy.js) instead of Mental attributes.
 */
export const MATRIX_CATEGORIES = ['commlink', 'cyberdeck', 'cyberjack', 'mtoc', 'rcc', 'living_persona', 'comm_sensor_array'];
export const PRIMARY_CAPABLE_CATEGORIES = ['commlink', 'cyberdeck', 'mtoc', 'rcc'];

/**
 * Top-level PAN category for an item: 'matrix' | 'cyberware' | 'weapons'
 * | 'gear'. Matrix = MATRIX_CATEGORIES above, which gets its own zone
 * (MatrixDevicesList) rather than falling into the Gear catch-all.
 * Cyberware = everything else in that category/'bioware'. Weapons =
 * firearms and wireless melee/thrown items. Gear = everything else —
 * the catch-all, not a precisely bounded set.
 */
export function panCategoryOf(item) {
  if (MATRIX_CATEGORIES.includes(item.category)) return 'matrix';
  if (item.category === 'cyberware' || item.category === 'bioware') return 'cyberware';
  if (item.category === 'firearm' || ['melee_weapon', 'thrown_weapon'].includes(item.category)) return 'weapons';
  return 'gear';
}

const TOP_CATEGORY_ORDER = { matrix: -1, cyberware: 0, weapons: 1, gear: 2 };

/**
 * Sort comparator for a flat list of [instanceId, entry] pairs — sorts
 * by top-level PAN category first, then cyberware sub-order within
 * that category, then label alphabetically as a stable tiebreaker.
 */
export function panSortComparator(ALL_GEAR) {
  return (a, b) => {
    const itemA = ALL_GEAR[a[1].itemId];
    const itemB = ALL_GEAR[b[1].itemId];
    if (!itemA || !itemB) return 0;

    const catA = panCategoryOf(itemA);
    const catB = panCategoryOf(itemB);
    if (catA !== catB) return TOP_CATEGORY_ORDER[catA] - TOP_CATEGORY_ORDER[catB];

    if (catA === 'cyberware') {
      const subA = cyberwareSubOrder(itemA);
      const subB = cyberwareSubOrder(itemB);
      if (subA !== subB) return subA - subB;
    }

    return itemA.label.localeCompare(itemB.label);
  };
}

export const PAN_CATEGORY_LABELS = {
  matrix: 'Matrix Devices',
  cyberware: 'Cyberware',
  weapons: 'Weapons',
  gear: 'Gear / Accessories',
};

//
// Living Persona's ASDF isn't a static catalog stat — it moves with
// the character's own Mental attributes, confirmed mapping: Attack<-
// Charisma, Sleaze<-Intuition, Data Processing<-Logic, Firewall<-
// Willpower. Resolved live here rather than baked into ALL_GEAR, which
// would go stale the moment the character advances.
const LIVING_PERSONA_ATTRIBUTE_MAP = {
  attack: 'charisma',
  sleaze: 'intuition',
  dataProcessing: 'logic',
  firewall: 'willpower',
};

function resolveDeviceAttrValue(character, item, attr, instanceId) {
  if (item?.id === 'living_persona') {
    return character.getAttribute(LIVING_PERSONA_ATTRIBUTE_MAP[attr]);
  }
  if (item?.id === 'comms_sensor_array') {
    return arrayCompositedStats(character, instanceId)[attr];
  }
  return item?.stats?.[attr];
}

// Composited Persona ASDF — the confirmed rule: "you can rotate any
// non-zero attributes through your persona, even if they originated
// from different devices." Each attribute resolves independently to
// the HIGHEST non-zero value found across every EFFECTIVELY wireless
// Matrix-category device (Primary + slaved commlinks/decks/Living
// Persona) — a wireless-off device contributes nothing, same as if it
// weren't there at all. Confirmed the rule means "rotate to whichever
// is best," not "whichever is found first" — a Primary with its own
// modest Attack shouldn't shadow a better Attack sitting on a slaved
// device just because it's checked first.
//
// Global unconditional deviceModifiers (Toolbox's +1 Data Processing,
// currently the only one confirmed) stack on top of the rotated base
// — checked across the WHOLE PAN via sumDeviceModifiersGlobal, not
// just matrixEntries, since a Program can be loaded on any slaved
// device, not only a Matrix-category one. Always resolves to a real
// number (0 minimum), never null — confirmed: "If the device doesn't
// possess one or more of the Matrix attributes, then the applicable
// attribute is treated as if it were 0." That's specifically about the
// PERSONA level; an individual device still correctly shows a dash for
// an attribute it structurally lacks (see PanStat, used directly on
// DeviceRow's own per-item readout, reading raw item.stats — this
// function's null-free output only affects the composited persona
// display, e.g. PersonaStatsBlock).
export function compositePersonaStats(character, matrixEntries, ALL_GEAR) {
  const attrs = ['attack', 'sleaze', 'dataProcessing', 'firewall'];
  const result = {};
  for (const attr of attrs) {
    let best = null;
    for (const [instanceId, entry] of matrixEntries) {
      if (!character.gearManager.isEffectivelyWireless(instanceId)) continue;
      const item = ALL_GEAR[entry.itemId];
      const val = resolveDeviceAttrValue(character, item, attr, instanceId);
      if (val != null && val !== 0 && (best == null || val > best)) {
        best = val;
      }
    }
    const modifierSum = sumDeviceModifiersGlobal(character, attr);
    result[attr] = (best ?? 0) + modifierSum;
  }
  return result;
}

// Convenience wrapper for callers that just want "this character's
// current composited ASDF" — Matrix Initiative, Attack/Defense Rating —
// without reconstructing the Primary-plus-matrix-slaved entries list
// themselves. NetworkPanel's own orchestrator builds that list inline
// because it ALSO needs it for rendering MatrixDevicesList, so it isn't
// routed through this — this is for simpler consumers that only need
// the final numbers. Returns null when no Primary device is set.
export function getCompositedPersonaStats(character, ALL_GEAR) {
  const gear = character.gearManager.gear;
  const pan = character.gearManager.pan;
  if (!pan.masterId || !gear[pan.masterId]) return null;

  const comparator = panSortComparator(ALL_GEAR);
  const matrixSlaved = pan.slaved
    .map((id) => [id, gear[id]])
    .filter(([, e]) => e && !e.attachedTo && panCategoryOf(ALL_GEAR[e.itemId]) === 'matrix')
    .sort(comparator);
  const matrixEntries = [[pan.masterId, gear[pan.masterId]], ...matrixSlaved];

  return compositePersonaStats(character, matrixEntries, ALL_GEAR);
}
