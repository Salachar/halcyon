import { useState } from 'react';

import { SKILL_IDS, SKILLS } from '@data/character/skills';
import { ATTRIBUTE_IDS, ATTRIBUTES } from '@data/character/attributes';
import { buildOpenPool } from '@utils/skillEconomy';
import Dice from '@components/Dice';

import './poolBuilder.css';

// One shared, fully-editable pool builder — the generalization the
// project's been moving toward: a single roller, geared to the
// situation by default, with nothing locked down. Skill and Attribute
// are independent dropdowns (any skill can pair with any attribute,
// not constrained to what that skill itself defines as valid — the
// user should be able to make Jack Out a Perception/Charisma roll if
// they want), arbitrary named modifiers can be added or removed
// freely, and Reset snaps everything back to the original geared
// default in one click. Feeds the resulting pool straight into Dice,
// unmodified — Dice doesn't know or care that this pool came from an
// editable builder instead of a fixed buildSkillPool call.
//
// Collapsed by default now — editing controls (skill/attribute swap,
// modifiers, reset) sit behind a small pencil toggle, so a plain roll
// stays one tap on Dice's own collapsed summary, matching the original
// "sleek/hidden" ask: nothing about the free-editing capability should
// cost a plain roller anything visually. The pencil gets a filled dot
// whenever the pool has actually drifted from its geared default, so
// a collapsed row still hints something's been changed underneath.
//
// Only one real consumer today (MatrixActionsReference, Combat/Vehicle
// Actions References) — nothing stops a retrofitted SkillRow importing
// this directly once that migration happens.
export default function PoolBuilder({ character, defaultSkillId, defaultAttribute, onHits }) {
  const [editing, setEditing] = useState(false);
  const [skillId, setSkillId] = useState(defaultSkillId ?? '');
  const [attributeKey, setAttributeKey] = useState(defaultAttribute ?? 'logic');
  const [extras, setExtras] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');

  const basePool = buildOpenPool(character, skillId, attributeKey);
  const extrasTotal = extras.reduce((sum, e) => sum + e.value, 0);
  const pool = {
    ...basePool,
    components: [...basePool.components, ...extras],
    total: Math.max(0, basePool.total + extrasTotal),
  };

  const handleReset = () => {
    setSkillId(defaultSkillId ?? '');
    setAttributeKey(defaultAttribute ?? 'logic');
    setExtras([]);
  };

  const handleAddModifier = () => {
    const value = Number(newValue);
    if (!value) return;
    setExtras((prev) => [...prev, { id: crypto.randomUUID(), label: newLabel || 'Modifier', value, source: 'manual' }]);
    setNewLabel('');
    setNewValue('');
  };

  const removeModifier = (id) => {
    setExtras((prev) => prev.filter((e) => e.id !== id));
  };

  const isDefault = skillId === (defaultSkillId ?? '') && attributeKey === (defaultAttribute ?? 'logic') && extras.length === 0;

  return (
    <div className="sr-pool-builder">
      <div className="sr-pool-builder-collapsed-row">
        <button
          className={isDefault ? 'sr-icon-btn' : 'sr-icon-btn sr-pool-builder-edit-btn--changed'}
          onClick={() => setEditing((v) => !v)}
          title={editing ? 'Done editing' : 'Edit pool'}
        >
          ✎
        </button>
        <span className="sr-pool-builder-summary-label">
          {SKILLS[skillId]?.label ?? 'No Skill'} + {ATTRIBUTES[attributeKey]?.label ?? attributeKey}
        </span>
      </div>

      {editing && (
        <div className="sr-pool-builder-edit">
          <div className="sr-pool-builder-row">
            <div className="sr-pool-builder-field">
              <span className="sr-pool-builder-label">Skill</span>
              <select className="sr-number-input" value={skillId} onChange={(e) => setSkillId(e.target.value)}>
                <option value="">None</option>
                {SKILL_IDS.map((id) => <option key={id} value={id}>{SKILLS[id].label}</option>)}
              </select>
            </div>
            <div className="sr-pool-builder-field">
              <span className="sr-pool-builder-label">Attribute</span>
              <select className="sr-number-input" value={attributeKey} onChange={(e) => setAttributeKey(e.target.value)}>
                {ATTRIBUTE_IDS.map((id) => <option key={id} value={id}>{ATTRIBUTES[id].label}</option>)}
              </select>
            </div>
          </div>

          {extras.length > 0 && (
            <div className="sr-pool-builder-extras">
              {extras.map((e) => (
                <div key={e.id} className="sr-pool-builder-extra-row">
                  <span>{e.label} {e.value >= 0 ? '+' : ''}{e.value}</span>
                  <button className="sr-icon-btn" onClick={() => removeModifier(e.id)} title="Remove">−</button>
                </div>
              ))}
            </div>
          )}

          <div className="sr-pool-builder-add">
            <div className="sr-pool-builder-field sr-pool-builder-add-label">
              <span className="sr-pool-builder-label">Add Modifier</span>
              <input type="text" className="sr-number-input" placeholder="Label" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
            </div>
            <div className="sr-pool-builder-field sr-pool-builder-add-value">
              <span className="sr-pool-builder-label">Dice</span>
              <input type="number" className="sr-number-input" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
            </div>
            <button className="sr-btn sr-btn--secondary" onClick={handleAddModifier}>Add</button>
          </div>

          <div className="sr-pool-builder-actions">
            <button className="sr-btn sr-btn--secondary" disabled={isDefault} onClick={handleReset}>Reset to Default</button>
          </div>
        </div>
      )}

      <Dice pool={pool} onHits={onHits} />
    </div>
  );
}
