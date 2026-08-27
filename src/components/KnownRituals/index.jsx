import { RITUALS, RITUAL_IDS, RITUAL_KEYWORDS, RITUAL_PROCESS_NOTE } from '@data/character/rituals';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { knownSpellBudget, combinedSpellRitualCount } from '@utils/magicEconomy';

import './knownRituals.css';

// Rituals share the SAME allowance as Spells (combinedSpellRitualCount,
// magicEconomy.js) — the budget readout here matches KnownSpells'
// exactly, just counted from the combined total either component would
// show. Toggling past budget still works, same "inform, don't block"
// soft-gate as everywhere else. No category filter needed — only 5
// real rituals exist.
export default function KnownRituals({ character }) {
  const { touch } = useCharacterManager();

  const budget = knownSpellBudget(character);
  const known = character.rituals;
  const combinedSpent = combinedSpellRitualCount(character);
  const overBudget = combinedSpent > budget;

  const toggleRitual = (ritualId) => {
    if (known.includes(ritualId)) {
      character.removeRitual(ritualId);
    } else {
      character.addRitual(ritualId);
    }
    touch();
  };

  return (
    <div className="sr-known-rituals">
      <div className="sr-kr-budget">
        <span className="sr-kr-budget-label">Known Spells & Rituals</span>
        <span className={overBudget ? 'sr-kr-budget-count sr-kr-budget-count--over' : 'sr-kr-budget-count'}>
          {combinedSpent}/{budget}{overBudget ? ' — Over Budget' : ''}
        </span>
      </div>

      <p className="sr-kr-note">{RITUAL_PROCESS_NOTE}</p>

      {RITUAL_IDS.map((id) => {
        const ritual = RITUALS[id];
        const isKnown = known.includes(id);
        return (
          <div key={id} className={isKnown ? 'sr-kr-row sr-kr-row--known' : 'sr-kr-row'}>
            <div className="sr-kr-row-header">
              <div>
                <span className="sr-kr-row-name">{ritual.label}</span>
                <span className="sr-kr-row-meta">
                  {ritual.keywords.join(', ')} · Threshold {ritual.threshold} · {ritual.duration}
                </span>
              </div>
              <button
                className={isKnown ? 'sr-btn sr-btn--secondary' : 'sr-btn sr-btn--primary'}
                onClick={() => toggleRitual(id)}
              >
                {isKnown ? 'Remove' : 'Learn'}
              </button>
            </div>
            <div className="sr-kr-row-description">{ritual.description}</div>
          </div>
        );
      })}

      <div className="sr-kr-reference">
        <div className="sr-kr-reference-title">Ritual Keywords</div>
        {Object.values(RITUAL_KEYWORDS).map((kw) => (
          <div key={kw.label} className="sr-kr-keyword-card">
            <div className="sr-kr-keyword-name">{kw.label}</div>
            <div className="sr-kr-keyword-description">{kw.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
