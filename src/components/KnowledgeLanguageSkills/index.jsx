import { useState } from 'react';

import { useCharacterManager } from '@hooks/useCharacterManager';
import {
  LANGUAGE_TIERS, LANGUAGE_TIER_LABELS,
  knowledgeLanguagePointBudget, knowledgeLanguagePointsRemaining, hasNativeLanguage,
  POST_CREATION_KARMA_COST,
} from '@utils/knowledgeEconomy';

import './knowledgeLanguageSkills.css';

// Genuinely different shape from every other skill/known-list system
// built this session — no fixed catalog (fully freeform, GM-approved
// names per RAW), no ranks or dice pool of their own. Pre-creation-
// finish, additions are free against the Logic-based point pool
// (soft-gated, never blocks — matches the "inform, don't police"
// pattern everywhere else). Post-finish, the point pool stops being
// the relevant currency at all — additions cost real Karma instead,
// same shape as Quality advancement.
export default function KnowledgeLanguageSkills({ character }) {
  const { touch } = useCharacterManager();
  const [newKnowledge, setNewKnowledge] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const finished = character.creationProgress.skills;
  const budget = knowledgeLanguagePointBudget(character);
  const remaining = knowledgeLanguagePointsRemaining(character);
  const overBudget = remaining < 0;
  const nativeTaken = hasNativeLanguage(character);
  const karmaAffordable = character.karma >= POST_CREATION_KARMA_COST;

  const addKnowledge = () => {
    if (!newKnowledge.trim()) return;
    if (finished) {
      if (!karmaAffordable) return;
      character.karma -= POST_CREATION_KARMA_COST;
    }
    character.addKnowledgeSkill(newKnowledge.trim());
    touch();
    setNewKnowledge('');
  };

  const removeKnowledge = (id) => {
    character.removeKnowledgeSkill(id);
    touch();
  };

  const addLanguage = () => {
    if (!newLanguage.trim()) return;
    if (finished) {
      if (!karmaAffordable) return;
      character.karma -= POST_CREATION_KARMA_COST;
    }
    character.addLanguage(newLanguage.trim());
    touch();
    setNewLanguage('');
  };

  const raiseTier = (id, currentTier) => {
    const nextIndex = LANGUAGE_TIERS.indexOf(currentTier) + 1;
    const nextTier = LANGUAGE_TIERS[nextIndex];
    if (!nextTier || nextTier === 'native') return; // Expert is the advancement ceiling; Native is creation-only, set separately
    if (finished) {
      if (!karmaAffordable) return;
      character.karma -= POST_CREATION_KARMA_COST;
    }
    character.updateLanguageTier(id, nextTier);
    touch();
  };

  const setNative = (id) => {
    // Creation-only grant, soft-gated (not hard-blocked) — a homebrew
    // table or GM exception should still be possible, matching this
    // project's established philosophy throughout.
    character.updateLanguageTier(id, 'native');
    touch();
  };

  const removeLanguage = (id) => {
    character.removeLanguage(id);
    touch();
  };

  return (
    <div className="sr-knowledge-language">
      {finished ? (
        <p className="sr-kl-hint">Character creation is finished — new Knowledge skills and Language tier-ups cost {POST_CREATION_KARMA_COST} Karma each.</p>
      ) : (
        <div className="sr-kl-budget">
          <span className="sr-kl-budget-label">Knowledge/Language Points</span>
          <span className={overBudget ? 'sr-kl-budget-count sr-kl-budget-count--over' : 'sr-kl-budget-count'}>
            {budget - remaining}/{budget}{overBudget ? ' — Over Budget' : ''}
          </span>
        </div>
      )}

      <div className="sr-kl-section-title">Knowledge Skills</div>
      {character.knowledgeSkills.length === 0 && <p className="sr-kl-hint">None yet.</p>}
      {character.knowledgeSkills.map((k) => (
        <div key={k.id} className="sr-kl-row">
          <span>{k.label}</span>
          <button className="sr-btn sr-btn--secondary" onClick={() => removeKnowledge(k.id)}>Remove</button>
        </div>
      ))}
      <div className="sr-kl-add">
        <input
          type="text"
          className="sr-number-input"
          placeholder="e.g. Seattle Gangs, Sixth World History..."
          value={newKnowledge}
          onChange={(e) => setNewKnowledge(e.target.value)}
        />
        <button className="sr-btn sr-btn--primary" disabled={finished && !karmaAffordable} onClick={addKnowledge}>
          {finished ? `Add (${POST_CREATION_KARMA_COST} Karma)` : 'Add'}
        </button>
      </div>

      <div className="sr-kl-section-title">Languages</div>
      {character.languages.length === 0 && <p className="sr-kl-hint">None yet — pick a free Native language at creation.</p>}
      {character.languages.map((l) => {
        const canRaise = l.tier !== 'expert' && l.tier !== 'native';
        const canGoNative = !finished && !nativeTaken && l.tier !== 'native';
        return (
          <div key={l.id} className="sr-kl-row">
            <div>
              <span>{l.label}</span>
              <span className="sr-kl-row-tier">{LANGUAGE_TIER_LABELS[l.tier]}</span>
            </div>
            <div className="sr-kl-row-actions">
              {canRaise && (
                <button className="sr-btn sr-btn--secondary" disabled={finished && !karmaAffordable} onClick={() => raiseTier(l.id, l.tier)}>
                  {finished ? `Raise (${POST_CREATION_KARMA_COST} Karma)` : 'Raise'}
                </button>
              )}
              {canGoNative && (
                <button className="sr-btn sr-btn--secondary" onClick={() => setNative(l.id)}>Set Native</button>
              )}
              <button className="sr-btn sr-btn--secondary" onClick={() => removeLanguage(l.id)}>Remove</button>
            </div>
          </div>
        );
      })}
      <div className="sr-kl-add">
        <input
          type="text"
          className="sr-number-input"
          placeholder="e.g. Sperethiel, Cityspeak, Japanese..."
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
        />
        <button className="sr-btn sr-btn--primary" disabled={finished && !karmaAffordable} onClick={addLanguage}>
          {finished ? `Add (${POST_CREATION_KARMA_COST} Karma)` : 'Add'}
        </button>
      </div>
    </div>
  );
}
