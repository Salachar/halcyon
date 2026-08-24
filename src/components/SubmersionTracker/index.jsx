import { useState } from 'react';

import { ECHOES, ECHO_IDS, SUBMERSION_NOTE } from '@data/character/echoes';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { submersionKarmaCost } from '@utils/magicEconomy';

import './submersionTracker.css';

const MATRIX_ATTRIBUTES = [
  { key: 'attack', label: 'Attack' },
  { key: 'sleaze', label: 'Sleaze' },
  { key: 'dataProcessing', label: 'Data Processing' },
  { key: 'firewall', label: 'Firewall' },
];

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Submersion Grade, capped at Resonance — same shape as
// InitiationTracker (raising it spends real Karma, prompts an Echo
// pick). Matrix Attribute Upgrade needs a two-step pick (which
// attribute) — same pattern KnownComplexForms uses for Diffusion/
// Infusion, since a flat single-click picker would silently lose the
// selection. Non-repeatable Echoes already known drop out of the
// picker, matching "unless otherwise noted, you can't pick the same
// Echo more than once." The catalog itself is confirmed INCOMPLETE
// (echoes.js) — the mechanism works fully regardless of how many
// entries exist in it.
export default function SubmersionTracker({ character }) {
  const { touch } = useCharacterManager();
  const [pickingEcho, setPickingEcho] = useState(false);
  const [pickingSelectionFor, setPickingSelectionFor] = useState(null);

  const grade = character.submersionGrade;
  const resonance = character.effectiveMagicResonance;
  const nextGrade = grade + 1;
  const cost = submersionKarmaCost(nextGrade);
  const atCap = grade >= resonance;
  const affordable = character.karma >= cost;

  const known = character.echoes;
  const knownIds = new Set(known.map((e) => e.echoId));
  const hasEchoCatalog = ECHO_IDS.length > 0;
  const availableEchoes = ECHO_IDS.filter((id) => ECHOES[id].repeatable || !knownIds.has(id));

  const raiseGrade = () => {
    if (atCap || !affordable) return;
    character.karma -= cost;
    character.submersionGrade = nextGrade;
    touch();
    if (hasEchoCatalog) setPickingEcho(true);
  };

  const pickEcho = (id) => {
    const def = ECHOES[id];
    if (def.requiresSelection) {
      setPickingSelectionFor(id);
      return;
    }
    character.addEcho(id);
    touch();
    setPickingEcho(false);
  };

  const pickEchoWithSelection = (id, selection) => {
    character.addEcho(id, { selection });
    touch();
    setPickingEcho(false);
    setPickingSelectionFor(null);
  };

  const removeEcho = (index) => {
    character.removeEchoAt(index);
    touch();
  };

  const selectionLabel = (echoId, selection) => {
    if (ECHOES[echoId]?.requiresSelection === 'matrixAttribute') {
      return MATRIX_ATTRIBUTES.find((a) => a.key === selection)?.label ?? selection;
    }
    return selection;
  };

  return (
    <div className="sr-submersion">
      <p className="sr-sub-note">{SUBMERSION_NOTE}</p>

      <div className="sr-sub-header">
        <span className="sr-sub-label">Submersion Grade</span>
        <span className="sr-sub-grade">{grade} <span className="sr-sub-cap">/ Resonance {resonance}</span></span>
      </div>

      {atCap ? (
        <p className="sr-sub-hint">At cap — raise Resonance to submerge further.</p>
      ) : (
        <button className="sr-btn sr-btn--primary" disabled={!affordable || pickingEcho} onClick={raiseGrade}>
          Submerge to Grade {nextGrade} ({cost} Karma)
        </button>
      )}

      {pickingEcho && hasEchoCatalog && !pickingSelectionFor && (
        <div className="sr-sub-picker">
          <div className="sr-sub-picker-title">Choose an Echo</div>
          {availableEchoes.map((id) => (
            <button key={id} className="sr-btn sr-btn--secondary" onClick={() => pickEcho(id)}>
              {ECHOES[id].label}
            </button>
          ))}
        </div>
      )}

      {pickingSelectionFor && (
        <div className="sr-sub-picker">
          <div className="sr-sub-picker-title">{ECHOES[pickingSelectionFor].label} — Choose Matrix Attribute</div>
          {MATRIX_ATTRIBUTES.map((attr) => (
            <button key={attr.key} className="sr-btn sr-btn--secondary" onClick={() => pickEchoWithSelection(pickingSelectionFor, attr.key)}>
              {attr.label}
            </button>
          ))}
        </div>
      )}

      {pickingEcho && !hasEchoCatalog && (
        <p className="sr-sub-hint">Echo catalog not yet available — Grade raised, Echo pick pending.</p>
      )}

      {known.length > 0 && (
        <div className="sr-sub-known">
          <div className="sr-sub-known-title">Known Echoes</div>
          {known.map((e, i) => (
            <div key={i} className="sr-sub-known-row">
              <span>
                {ECHOES[e.echoId]?.label ?? e.echoId}
                {e.selection && ` (${selectionLabel(e.echoId, e.selection)})`}
              </span>
              <button className="sr-btn sr-btn--secondary" onClick={() => removeEcho(i)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      {!hasEchoCatalog && (
        <p className="sr-sub-hint">Echo catalog not yet confirmed against source — grade tracking works, the reference list below is empty until that data exists.</p>
      )}
    </div>
  );
}
