import { useState } from 'react';

import { SPELLS } from '@data/character/spells';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { knownSpellBudget, combinedSpellRitualCount } from '@utils/magicEconomy';

import './knownSpells.css';

const CATEGORY_LABELS = {
  combat: 'Combat',
  detection: 'Detection',
  health: 'Health',
  illusion: 'Illusion',
  manipulation: 'Manipulation',
};
const CATEGORY_ORDER = ['combat', 'detection', 'health', 'illusion', 'manipulation'];

function durationLabel(d) {
  return { I: 'Instantaneous', S: 'Sustained', L: 'Limited', P: 'Permanent' }[d] || d;
}

// Known Spells — soft-gated against knownSpellBudget (magicEconomy.js),
// same "inform, don't block" pattern as everywhere else in this app.
// Toggling past budget still works; the count just turns red, matching
// Over Capacity's visual language elsewhere. The budget readout counts
// combinedSpellRitualCount, not just character.spells.length — Rituals
// share this same allowance, and a Ritual learned via KnownRituals has
// to show up here too or the two components would silently disagree
// about how much budget is left.
export default function KnownSpells({ character }) {
  const { touch } = useCharacterManager();
  const [categoryFilter, setCategoryFilter] = useState('all');

  const budget = knownSpellBudget(character);
  const known = character.spells;
  const combinedSpent = combinedSpellRitualCount(character);
  const overBudget = combinedSpent > budget;

  const toggleSpell = (spellId) => {
    if (known.includes(spellId)) {
      // Assumes removeSpell(spellId) exists on Character, following the
      // same add/remove pairing convention already used for Qualities
      // (addQuality/removeQuality) — not directly confirmed for Spells
      // specifically, since only addSpell turned up in what was
      // checked. If it doesn't exist, this is a one-line addition to
      // Character.js matching removeQuality's own shape exactly.
      character.removeSpell(spellId);
    } else {
      character.addSpell(spellId);
    }
    touch();
  };

  const spellIds = Object.keys(SPELLS).filter((id) => categoryFilter === 'all' || SPELLS[id].category === categoryFilter);
  const grouped = {};
  spellIds.forEach((id) => {
    const cat = SPELLS[id].category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(id);
  });

  return (
    <div className="sr-known-spells">
      <div className="sr-ks-budget">
        <span className="sr-ks-budget-label">Known Spells & Rituals</span>
        <span className={overBudget ? 'sr-ks-budget-count sr-ks-budget-count--over' : 'sr-ks-budget-count'}>
          {combinedSpent}/{budget}{overBudget ? ' — Over Budget' : ''}
        </span>
      </div>

      <div className="sr-ks-filters">
        <button className={categoryFilter === 'all' ? 'sr-btn sr-btn--primary' : 'sr-btn sr-btn--secondary'} onClick={() => setCategoryFilter('all')}>All</button>
        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            className={categoryFilter === cat ? 'sr-btn sr-btn--primary' : 'sr-btn sr-btn--secondary'}
            onClick={() => setCategoryFilter(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {CATEGORY_ORDER.filter((cat) => grouped[cat]?.length).map((cat) => (
        <div key={cat} className="sr-ks-category-group">
          <div className="sr-ks-category-title">{CATEGORY_LABELS[cat]}</div>
          {grouped[cat].map((id) => {
            const spell = SPELLS[id];
            const isKnown = known.includes(id);
            return (
              <div key={id} className={isKnown ? 'sr-ks-row sr-ks-row--known' : 'sr-ks-row'}>
                <div>
                  <span className="sr-ks-row-name">{spell.label}</span>
                  <span className="sr-ks-row-meta">
                    {spell.range} · {spell.spellType === 'M' ? 'Mana' : 'Physical'} · {durationLabel(spell.duration)} · DV {spell.drainValue}
                  </span>
                </div>
                <button
                  className={isKnown ? 'sr-btn sr-btn--secondary' : 'sr-btn sr-btn--primary'}
                  onClick={() => toggleSpell(id)}
                >
                  {isKnown ? 'Remove' : 'Learn'}
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
