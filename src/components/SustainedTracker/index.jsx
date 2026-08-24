import { useState } from 'react';

import { SPELLS } from '@data/character/spells';
import { COMPLEX_FORMS } from '@data/character/complex_forms';
import { useCharacterManager } from '@hooks/useCharacterManager';

import './sustainedTracker.css';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Shared between Spells and Complex Forms — confirmed identical
// mechanic for both ("-2 dice pool penalty... for each spell they
// sustain" / "Every sustained complex form imposes a -2 dice pool
// penalty on all actions"). Deliberately freeform storage (see
// Character.js's own sustainedEffects comment) rather than a reference
// into the known lists — Quick Add just prefills a label from whatever
// currently-known Sustained-duration spells/forms exist, it doesn't
// keep any link to them afterward. A dropped known spell/form doesn't
// orphan or corrupt anything already being tracked here.
export default function SustainedTracker({ character }) {
  const { touch } = useCharacterManager();
  const [customLabel, setCustomLabel] = useState('');

  const sustained = character.sustainedEffects;
  const penalty = sustained.length * 2;

  const sustainableSpells = character.spells.filter((id) => SPELLS[id]?.duration === 'S');
  const sustainableForms = character.complexForms.filter((e) => COMPLEX_FORMS[e.formId]?.duration === 'S');

  const addSustained = (label) => {
    if (!label.trim()) return;
    character.addSustainedEffect(label.trim());
    touch();
    setCustomLabel('');
  };

  const removeSustained = (id) => {
    character.removeSustainedEffect(id);
    touch();
  };

  return (
    <div className="sr-sustained">
      <div className="sr-sustained-header">
        <span className="sr-sustained-label">Sustaining</span>
        <span className="sr-sustained-penalty">
          {sustained.length > 0 ? `−${penalty} dice pool (${sustained.length})` : 'Nothing'}
        </span>
      </div>

      {sustained.length > 0 && (
        <div className="sr-sustained-list">
          {sustained.map((e) => (
            <div key={e.id} className="sr-sustained-row">
              <span>{e.label}</span>
              <button className="sr-btn sr-btn--secondary" onClick={() => removeSustained(e.id)}>Drop</button>
            </div>
          ))}
        </div>
      )}

      {(sustainableSpells.length > 0 || sustainableForms.length > 0) && (
        <div className="sr-sustained-quickpick">
          <div className="sr-sustained-quickpick-label">Quick Add</div>
          {sustainableSpells.map((id) => (
            <button key={id} className="sr-btn sr-btn--secondary" onClick={() => addSustained(SPELLS[id].label)}>
              {SPELLS[id].label}
            </button>
          ))}
          {sustainableForms.map((e, i) => (
            <button
              key={i}
              className="sr-btn sr-btn--secondary"
              onClick={() => addSustained(`${COMPLEX_FORMS[e.formId].label}${e.selection ? ` (${capitalize(e.selection)})` : ''}`)}
            >
              {COMPLEX_FORMS[e.formId].label}{e.selection ? ` (${capitalize(e.selection)})` : ''}
            </button>
          ))}
        </div>
      )}

      <div className="sr-sustained-add">
        <input
          type="text"
          className="sr-number-input"
          placeholder="Custom label..."
          value={customLabel}
          onChange={(ev) => setCustomLabel(ev.target.value)}
        />
        <button className="sr-btn sr-btn--primary" onClick={() => addSustained(customLabel)}>Add</button>
      </div>
    </div>
  );
}
