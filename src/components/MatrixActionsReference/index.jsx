import { useState } from 'react';

import { MATRIX_ACTIONS, MATRIX_ACTION_IDS, ACCESS_LEVEL_ORDER, ACTION_TYPE_LABELS } from '@data/character/matrix_actions';
import { SKILLS } from '@data/character/skills';
import PoolBuilder from '@components/PoolBuilder';

import './matrixActionsReference.css';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Reference + real, fully-editable rolling for every action that has a
// skill — routed through PoolBuilder now, not buildSkillPool directly,
// so Hide (Cracking+Intuition) and Jack Out (Electronics+Willpower)
// work exactly the same as the other 30 despite neither pairing
// matching what buildSkillPool's primary/secondary-only shape could
// build. One row expanded at a time, matching the "not 32 dropdowns
// rendered simultaneously" instinct — click Roll to open a row's
// PoolBuilder, pre-filled to the geared skill/attribute, fully editable
// from there.
//
// Filterable by a manually-selected "my current access level" (purely
// a display filter — never computed, never stored, matches the
// project's explicit no-target-simulation boundary) and legality.
// Grouped by action type (Minor/Major/Extended/Anytime), matching the
// book's own Quick Reference table shape.
export default function MatrixActionsReference({ character }) {
  const [myAccessLevel, setMyAccessLevel] = useState('outsider');
  const [legalityFilter, setLegalityFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const accessRank = ACCESS_LEVEL_ORDER.indexOf(myAccessLevel);

  const entries = MATRIX_ACTION_IDS
    .map((id) => [id, MATRIX_ACTIONS[id]])
    .filter(([, action]) => {
      if (legalityFilter === 'legal' && !action.legal) return false;
      if (legalityFilter === 'illegal' && action.legal) return false;
      return true;
    });

  const grouped = {};
  entries.forEach(([id, action]) => {
    const type = action.actionType;
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push([id, action]);
  });

  const typeOrder = ['minor', 'major', 'extended', 'anytime'];

  return (
    <div className="sr-mar">
      <div className="sr-mar-controls">
        <div className="sr-mar-control-group">
          <span className="sr-mar-control-label">My Access Level</span>
          <select className="sr-number-input" value={myAccessLevel} onChange={(e) => setMyAccessLevel(e.target.value)}>
            {ACCESS_LEVEL_ORDER.map((lvl) => <option key={lvl} value={lvl}>{capitalize(lvl)}</option>)}
          </select>
        </div>
        <div className="sr-mar-control-group">
          <span className="sr-mar-control-label">Legality</span>
          <select className="sr-number-input" value={legalityFilter} onChange={(e) => setLegalityFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="legal">Legal Only</option>
            <option value="illegal">Illegal Only</option>
          </select>
        </div>
      </div>

      {typeOrder.map((type) => {
        const typeEntries = grouped[type];
        if (!typeEntries || typeEntries.length === 0) return null;
        return (
          <div key={type} className="sr-mar-type-group">
            <div className="sr-mar-type-title">{ACTION_TYPE_LABELS[type]} Actions</div>
            {typeEntries.map(([id, action]) => {
              const requiredRank = Math.min(...action.accessLevels.map((lvl) => ACCESS_LEVEL_ORDER.indexOf(lvl)));
              const usable = accessRank >= requiredRank;
              const skillLabel = action.skill ? (SKILLS[action.skill]?.label ?? action.skill) : null;
              const attributeLabel = action.attribute ? capitalize(action.attribute) : null;
              const expanded = expandedId === id;

              const rowClass = [
                'sr-mar-row',
                action.legal ? 'sr-mar-row--legal' : 'sr-mar-row--illegal',
                !usable ? 'sr-mar-row--dim' : '',
              ].filter(Boolean).join(' ');

              return (
                <div key={id} className={rowClass}>
                  <div className="sr-mar-row-header">
                    <span className="sr-mar-row-name">{action.label}</span>
                    <div className="sr-mar-row-badges">
                      {!action.legal && <span className="sr-mar-badge sr-mar-badge--illegal">Illegal</span>}
                      <span className="sr-mar-badge">
                        {action.accessLevels.map(capitalize).join('/')}
                      </span>
                      {action.linkedAttribute && (
                        <span className="sr-mar-badge">{capitalize(action.linkedAttribute)}-Linked</span>
                      )}
                      {character && action.skill && (
                        <button
                          className="sr-btn sr-btn--secondary"
                          onClick={() => setExpandedId((prev) => (prev === id ? null : id))}
                        >
                          {expanded ? 'Hide' : 'Roll'}
                        </button>
                      )}
                    </div>
                  </div>
                  {skillLabel && (
                    <div className="sr-mar-row-roll">{skillLabel} + {attributeLabel}</div>
                  )}
                  <div className="sr-mar-row-opposed">Opposed by: {action.opposedBy}</div>
                  <div className="sr-mar-row-description">{action.description}</div>

                  {expanded && character && (
                    <div className="sr-mar-row-builder">
                      <PoolBuilder
                        character={character}
                        defaultSkillId={action.skill}
                        defaultAttribute={action.attribute}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
