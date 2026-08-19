import { QUALITIES } from '@data/character/qualities';

// Karma math for adding a quality — shared by QualityCreationModal and
// QualityAdvancementModal, not owned by either. Resolved against the
// two documented rules from ShadowrunnersCreation.jsx:
//  - Pre-finish (character.creationProgress.qualities is false):
//    positive costs normal Karma, negative grants its normal bonus.
//  - Post-finish: positive costs 2x normal Karma; negative grants NO
//    bonus at all ("can't purchase new negative qualities post-creation
//    to farm Karma"). A negative can still be added, it just carries no
//    karma — a GM narratively landing a complication.

export function resolveQualityKarma(quality, qualitiesFinished, level) {
  const base = quality.karmaCostPerLevel != null
    ? quality.karmaCostPerLevel * (level || 1)
    : quality.karmaCost;

  if (quality.type === 'negative') {
    return qualitiesFinished ? 0 : base;
  }
  return qualitiesFinished ? base * 2 : base;
}

// Negative qualities never gate on affordability — nothing's being spent.
export function canAffordQuality(character, quality, level) {
  if (quality.type === 'negative') return true;
  const cost = resolveQualityKarma(quality, character.creationProgress.qualities, level);
  return character.karma >= cost;
}

// Sum of (negative bonuses) minus (positive costs) across everything the
// character already owns, always resolved at pre-finish rates — this
// tally only ever matters before Qualities is marked done.
export function netBonusKarma(character) {
  return character.qualities.reduce((sum, entry) => {
    const quality = QUALITIES[entry.qualityId];
    const karma = resolveQualityKarma(quality, false, entry.level);
    return quality.type === 'negative' ? sum + karma : sum - karma;
  }, 0);
}

// The two hard creation-time caps: max 6 qualities total, net bonus
// Karma capped at 20. Same category of enforcement as CreationModal's
// attribute budget and one-at-max rule — a real numeric constraint, not
// friction added to police intent. Both caps stop applying once
// Qualities is marked finished.
export function creationQualityCapsExceeded(character, quality, level) {
  if (character.creationProgress.qualities) return false;
  if (character.qualities.length >= 6) return true;
  if (quality.type === 'negative') {
    const karma = resolveQualityKarma(quality, false, level);
    if (netBonusKarma(character) + karma > 20) return true;
  }
  return false;
}
