import { useState } from 'react';

import { SPRITE_TYPES, SPRITE_TYPE_IDS, SPRITE_POWERS, SPRITE_POWER_IDS, SPRITE_MECHANICS_NOTE } from '@data/character/sprites';
import { useCharacterManager } from '@hooks/useCharacterManager';

import './compiledSprites.css';

// Tracks the RELATIONSHIP (which sprites are compiled, registered
// status, tasks remaining), not a computed opponent/ally stat block —
// same boundary as BoundSpirits. Compiling/Registering aren't
// auto-rolled (same deliberate scope as KnownComplexForms), so tasks-
// remaining is entered manually after the player rolls it themselves.
//
// `registered` is the one real structural addition over Spirits — it's
// not cosmetic, it changes what a sprite actually is: unregistered
// caps at one at a time with a hard (Level x 2)-hour limit; registered
// has no time limit, counts against a (Resonance) cap instead, and
// unlocks the registered-only task types (Loaned/Remote/Re-register/
// Standby/Sustain Complex Form) — shown in the mechanics note, not
// modeled as separate actions here.
export default function CompiledSprites({ character }) {
  const { touch } = useCharacterManager();
  const [showAdd, setShowAdd] = useState(false);
  const [newType, setNewType] = useState(SPRITE_TYPE_IDS[0]);
  const [newLevel, setNewLevel] = useState(3);
  const [newTasks, setNewTasks] = useState(1);
  const [newRegistered, setNewRegistered] = useState(false);

  const sprites = character.compiledSprites;

  const addSprite = () => {
    character.addCompiledSprite({ type: newType, level: newLevel, tasksRemaining: newTasks, registered: newRegistered });
    touch();
    setShowAdd(false);
    setNewLevel(3);
    setNewTasks(1);
    setNewRegistered(false);
  };

  const adjustTasks = (id, delta) => {
    const sprite = sprites.find((s) => s.id === id);
    character.updateCompiledSprite(id, { tasksRemaining: Math.max(0, sprite.tasksRemaining + delta) });
    touch();
  };

  const toggleRegistered = (id, current) => {
    character.updateCompiledSprite(id, { registered: !current });
    touch();
  };

  const removeSprite = (id) => {
    character.removeCompiledSprite(id);
    touch();
  };

  return (
    <div className="sr-compiled-sprites">
      <p className="sr-cs-note">{SPRITE_MECHANICS_NOTE}</p>

      {sprites.length === 0 ? (
        <p className="sr-cs-hint">No sprites currently compiled.</p>
      ) : (
        sprites.map((s) => (
          <div key={s.id} className="sr-cs-row">
            <div>
              <span className="sr-cs-row-name">
                {SPRITE_TYPES[s.type]?.label ?? s.type} (Level {s.level})
                <span className="sr-cs-registered-badge">{s.registered ? 'Registered' : 'Unregistered'}</span>
              </span>
              <span className="sr-cs-row-services">{s.tasksRemaining} task{s.tasksRemaining === 1 ? '' : 's'} remaining</span>
            </div>
            <div className="sr-cs-row-actions">
              <button className="sr-icon-btn" onClick={() => adjustTasks(s.id, -1)}>−</button>
              <button className="sr-icon-btn" onClick={() => adjustTasks(s.id, 1)}>+</button>
              <button className="sr-btn sr-btn--secondary" onClick={() => toggleRegistered(s.id, s.registered)}>
                {s.registered ? 'Unregister' : 'Register'}
              </button>
              <button className="sr-btn sr-btn--secondary" onClick={() => removeSprite(s.id)}>Remove</button>
            </div>
          </div>
        ))
      )}

      {showAdd ? (
        <div className="sr-cs-add">
          <select className="sr-number-input" value={newType} onChange={(e) => setNewType(e.target.value)}>
            {SPRITE_TYPE_IDS.map((id) => <option key={id} value={id}>{SPRITE_TYPES[id].label}</option>)}
          </select>
          <input type="number" className="sr-number-input" value={newLevel} onChange={(e) => setNewLevel(Number(e.target.value))} min={1} placeholder="Level" />
          <input type="number" className="sr-number-input" value={newTasks} onChange={(e) => setNewTasks(Number(e.target.value))} min={0} placeholder="Tasks" />
          <label className="sr-cs-add-toggle">
            <input type="checkbox" checked={newRegistered} onChange={(e) => setNewRegistered(e.target.checked)} />
            Registered
          </label>
          <button className="sr-btn sr-btn--primary" onClick={addSprite}>Add</button>
          <button className="sr-btn sr-btn--secondary" onClick={() => setShowAdd(false)}>Cancel</button>
        </div>
      ) : (
        <button className="sr-btn sr-btn--secondary" onClick={() => setShowAdd(true)}>+ Compile Sprite</button>
      )}

      <div className="sr-cs-reference">
        <div className="sr-cs-reference-title">Sprite Types</div>
        {SPRITE_TYPE_IDS.map((id) => {
          const t = SPRITE_TYPES[id];
          return (
            <div key={id} className="sr-cs-type-card">
              <div className="sr-cs-type-name">{t.label}</div>
              <div className="sr-cs-type-description">{t.description}</div>
              <div className="sr-cs-type-detail">{t.attributes}</div>
              <div className="sr-cs-type-detail">Initiative: {t.initiative}</div>
              <div className="sr-cs-type-detail">Skills: {t.skills}</div>
              <div className="sr-cs-type-detail">Powers: {t.powers}</div>
            </div>
          );
        })}
      </div>

      <div className="sr-cs-reference">
        <div className="sr-cs-reference-title">Sprite Powers</div>
        {SPRITE_POWER_IDS.map((id) => {
          const p = SPRITE_POWERS[id];
          return (
            <div key={id} className="sr-cs-type-card">
              <div className="sr-cs-type-name">{p.label}</div>
              <div className="sr-cs-type-description">{p.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
