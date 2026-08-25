// Knowledge & Language skill economy — genuinely different shape from
// buildSkillPool/skillEconomy.js: these have no ranks and no dice pool
// of their own, they unlock bonus info off OTHER tests (Perception,
// Memory). Fully freeform names too — the "catalog" is whatever the
// player proposes and the GM approves, not a fixed list, so there's no
// KNOWLEDGE_SKILLS data file the way SPELLS/POWERS/etc. have one.
//
// Confirmed cost shape: free points at creation = Logic score, plus
// one free Native language (creation-only grant, never purchasable
// later — "the only way to gain a Native language is as part of the
// character creation process"). 1 point per Knowledge skill; a
// Language starts at Base (1 point) and each tier-up costs another
// point, "as if it were an additional Knowledge skill" — so Base=1,
// Specialist=2, Expert=3 points total invested, Native=0 (free-only).
// Post-creation: 3 Karma per new Knowledge skill or Language tier-up
// (capped at Expert — Native locked to creation only, no exception).

export const LANGUAGE_TIERS = ['base', 'specialist', 'expert', 'native'];
export const LANGUAGE_TIER_LABELS = {
  base: 'Base', specialist: 'Specialist', expert: 'Expert', native: 'Native',
};
const LANGUAGE_TIER_POINT_COST = { base: 1, specialist: 2, expert: 3, native: 0 };

export function knowledgeLanguagePointBudget(character) {
  return character.getAttribute('logic');
}

export function knowledgeLanguagePointsSpent(character) {
  const knowledgeCost = character.knowledgeSkills.length;
  const languageCost = character.languages.reduce((sum, lang) => sum + (LANGUAGE_TIER_POINT_COST[lang.tier] ?? 0), 0);
  return knowledgeCost + languageCost;
}

export function knowledgeLanguagePointsRemaining(character) {
  return knowledgeLanguagePointBudget(character) - knowledgeLanguagePointsSpent(character);
}

export function hasNativeLanguage(character) {
  return character.languages.some((lang) => lang.tier === 'native');
}

// Post-creation Karma cost — flat 3, same for a new Knowledge skill or
// a Language tier-up, confirmed identical treatment ("as if it were an
// additional Knowledge skill").
export const POST_CREATION_KARMA_COST = 3;
