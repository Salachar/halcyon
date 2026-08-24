import { useState } from 'react';

import { METAMAGICS, METAMAGIC_IDS, INITIATION_NOTE } from '@data/character/metamagics';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { initiationKarmaCost } from '@utils/magicEconomy';

import './initiationTracker.css';

// Initiate Grade, capped at effective Magic — raising it spends real
// Karma (10 + desired Grade) and prompts for a metamagic pick.
// Non-repeatable metamagics already known drop out of the picker;
// Power Point stays available every time (confirmed repeatable). This
// is the piece that actually closes the previously-flagged gap: taking
// Power Point here now genuinely grows a Mystic Adept's frozen pool,
// via powerPointBudget's metamagic-bonus check in magicEconomy.js.
export default function InitiationTracker({ character }) {
  const { touch } = useCharacterManager();
  const [pickingMetamagic, setPickingMetamagic] = useState(false);

  const grade = character.initiateGrade;
  const magic = character.effectiveMagicResonance;
  const nextGrade = grade + 1;
  const cost = initiationKarmaCost(nextGrade);
  const atCap = grade >= magic;
  const affordable = character.karma >= cost;

  const known = character.metamagics;
  const knownIds = new Set(known.map((m) => m.metamagicId));
  const availableMetamagics = METAMAGIC_IDS.filter((id) => METAMAGICS[id].repeatable || !knownIds.has(id));

  const raiseGrade = () => {
    if (atCap || !affordable) return;
    character.karma -= cost;
    character.initiateGrade = nextGrade;
    touch();
    setPickingMetamagic(true);
  };

  const pickMetamagic = (id) => {
    character.addMetamagic(id);
    touch();
    setPickingMetamagic(false);
  };

  const removeMetamagic = (index) => {
    character.removeMetamagicAt(index);
    touch();
  };

  return (
    <div className="sr-initiation">
      <p className="sr-init-note">{INITIATION_NOTE}</p>

      <div className="sr-init-header">
        <span className="sr-init-label">Initiate Grade</span>
        <span className="sr-init-grade">{grade} <span className="sr-init-cap">/ Magic {magic}</span></span>
      </div>

      {atCap ? (
        <p className="sr-init-hint">At cap — raise Magic to initiate further.</p>
      ) : (
        <button className="sr-btn sr-btn--primary" disabled={!affordable || pickingMetamagic} onClick={raiseGrade}>
          Initiate to Grade {nextGrade} ({cost} Karma)
        </button>
      )}

      {pickingMetamagic && (
        <div className="sr-init-picker">
          <div className="sr-init-picker-title">Choose a Metamagic</div>
          {availableMetamagics.map((id) => (
            <button key={id} className="sr-btn sr-btn--secondary" onClick={() => pickMetamagic(id)}>
              {METAMAGICS[id].label}
            </button>
          ))}
        </div>
      )}

      {known.length > 0 && (
        <div className="sr-init-known">
          <div className="sr-init-known-title">Known Metamagics</div>
          {known.map((m, i) => (
            <div key={i} className="sr-init-known-row">
              <span>{METAMAGICS[m.metamagicId]?.label ?? m.metamagicId}</span>
              <button className="sr-btn sr-btn--secondary" onClick={() => removeMetamagic(i)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      <div className="sr-init-reference">
        <div className="sr-init-reference-title">All Metamagics</div>
        {METAMAGIC_IDS.map((id) => {
          const m = METAMAGICS[id];
          return (
            <div key={id} className="sr-init-metamagic-card">
              <div className="sr-init-metamagic-name">
                {m.label}{m.adeptOnly && ' (Adept Only)'}{m.repeatable && ' (Repeatable)'}
              </div>
              <div className="sr-init-metamagic-description">{m.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
