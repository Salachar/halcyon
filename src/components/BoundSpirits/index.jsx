import { useState } from 'react';

import { SPIRIT_TYPES, SPIRIT_TYPE_IDS, SPIRIT_MECHANICS_NOTE } from '@data/character/spirits';
import { useCharacterManager } from '@hooks/useCharacterManager';

import './boundSpirits.css';

// Tracks the RELATIONSHIP (which spirits are bound, services
// remaining), not a computed opponent/ally stat block — matches the
// project's established "don't simulate the other side" boundary.
// Summoning itself isn't auto-rolled (same deliberate scope as
// KnownSpells — tracking first, actionable rolling is separate future
// work), so services-remaining is entered manually after the player
// rolls it themselves, not computed here.
export default function BoundSpirits({ character }) {
  const { touch } = useCharacterManager();
  const [showAdd, setShowAdd] = useState(false);
  const [newType, setNewType] = useState(SPIRIT_TYPE_IDS[0]);
  const [newForce, setNewForce] = useState(3);
  const [newServices, setNewServices] = useState(1);

  const spirits = character.boundSpirits;

  const addSpirit = () => {
    character.addBoundSpirit({ type: newType, force: newForce, servicesRemaining: newServices });
    touch();
    setShowAdd(false);
    setNewForce(3);
    setNewServices(1);
  };

  const adjustServices = (id, delta) => {
    const spirit = spirits.find((s) => s.id === id);
    character.updateBoundSpirit(id, { servicesRemaining: Math.max(0, spirit.servicesRemaining + delta) });
    touch();
  };

  const removeSpirit = (id) => {
    character.removeBoundSpirit(id);
    touch();
  };

  return (
    <div className="sr-bound-spirits">
      <p className="sr-bs-note">{SPIRIT_MECHANICS_NOTE}</p>

      {spirits.length === 0 ? (
        <p className="sr-bs-hint">No spirits currently bound.</p>
      ) : (
        spirits.map((s) => (
          <div key={s.id} className="sr-bs-row">
            <div>
              <span className="sr-bs-row-name">{SPIRIT_TYPES[s.type]?.label ?? s.type} (Force {s.force})</span>
              <span className="sr-bs-row-services">{s.servicesRemaining} service{s.servicesRemaining === 1 ? '' : 's'} remaining</span>
            </div>
            <div className="sr-bs-row-actions">
              <button className="sr-icon-btn" onClick={() => adjustServices(s.id, -1)}>−</button>
              <button className="sr-icon-btn" onClick={() => adjustServices(s.id, 1)}>+</button>
              <button className="sr-btn sr-btn--secondary" onClick={() => removeSpirit(s.id)}>Remove</button>
            </div>
          </div>
        ))
      )}

      {showAdd ? (
        <div className="sr-bs-add">
          <select className="sr-number-input" value={newType} onChange={(e) => setNewType(e.target.value)}>
            {SPIRIT_TYPE_IDS.map((id) => <option key={id} value={id}>{SPIRIT_TYPES[id].label}</option>)}
          </select>
          <input type="number" className="sr-number-input" value={newForce} onChange={(e) => setNewForce(Number(e.target.value))} min={1} placeholder="Force" />
          <input type="number" className="sr-number-input" value={newServices} onChange={(e) => setNewServices(Number(e.target.value))} min={0} placeholder="Services" />
          <button className="sr-btn sr-btn--primary" onClick={addSpirit}>Add</button>
          <button className="sr-btn sr-btn--secondary" onClick={() => setShowAdd(false)}>Cancel</button>
        </div>
      ) : (
        <button className="sr-btn sr-btn--secondary" onClick={() => setShowAdd(true)}>+ Bind Spirit</button>
      )}

      <div className="sr-bs-reference">
        <div className="sr-bs-reference-title">Spirit Types</div>
        {SPIRIT_TYPE_IDS.map((id) => {
          const t = SPIRIT_TYPES[id];
          return (
            <div key={id} className="sr-bs-type-card">
              <div className="sr-bs-type-name">{t.label}</div>
              <div className="sr-bs-type-description">{t.description}</div>
              {t.attributes && (
                <>
                  <div className="sr-bs-type-detail">{t.attributes}</div>
                  <div className="sr-bs-type-detail">Initiative: {t.initiative} · Astral Initiative: {t.astralInitiative}</div>
                  <div className="sr-bs-type-detail">Defense Rating: {t.defenseRating}</div>
                  <div className="sr-bs-type-detail">Skills: {t.skills}</div>
                  <div className="sr-bs-type-detail">Powers: {t.powers}</div>
                  <div className="sr-bs-type-detail">Weaknesses: {t.weaknesses}</div>
                  <div className="sr-bs-type-detail">Optional Powers: {t.optionalPowers}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
