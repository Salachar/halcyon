// One place declaring what "done" means per creation section — the
// callout at the top of the sheet and each section's own header badge
// both read from this, rather than each computing their own version of
// "is this section complete" and risking disagreement.
//
// Skills is deliberately computed (skillPointsRemaining === 0), not
// stored — it's already a reliable, one-way signal (once points hit
// zero, SkillRow's decrement falls through to Karma-refund, never back
// to points, so it can't un-zero itself). Qualities is stored on
// character.creationProgress, since "done with Qualities" isn't
// otherwise derivable from any other field.

export const CREATION_SECTIONS = [
  {
    key: 'skills',
    label: 'Skills',
    isComplete: (character) => character.skillPointsRemaining === 0,
  },
  {
    key: 'qualities',
    label: 'Qualities',
    isComplete: (character) => Boolean(character.creationProgress.qualities),
  },
];

export function getIncompleteSections(character) {
  return CREATION_SECTIONS.filter((section) => !section.isComplete(character));
}

export function isSectionComplete(character, key) {
  const section = CREATION_SECTIONS.find((s) => s.key === key);
  return section ? section.isComplete(character) : true;
}
