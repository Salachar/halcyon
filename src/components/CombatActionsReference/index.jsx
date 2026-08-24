import { useState } from 'react';

import { COMBAT_ACTIONS, COMBAT_ACTION_IDS, COMBAT_EDGE_ACTIONS } from '@data/character/combat_actions';
import { SKILLS } from '@data/character/skills';
import PoolBuilder from '@components/PoolBuilder';

import './combatActionsReference.css';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Reference + rolling for the 40 confirmed Combat Actions — real
// rolling only where an action is genuinely its OWN standalone test
// (hasTest: true — Avoid Incoming, Trip, Observe in Detail, Sprint).
// Most Minor Actions need no test at all, and several (Block, Dodge,
// Hit the Dirt) modify a DIFFERENT existing roll (Defense) rather than
// being a test of their own — those stay reference-only, same as
// Attack/Cast Spell/Counterspell/Astral Projection, which the source
// itself just points at their own chapters. Attack specifically is
// never rolled from here at all — it lives on the weapon's own row in
// GearList, where the correct skill is unambiguous.
//
// Edge Actions table shown separately, reference-only — only names/
// costs/associated actions were confirmed, not full mechanical text
// for each (Shank, Tumble, Wrest, etc.), so nothing here is spendable.
export default function CombatActionsReference({ character }) {
  const [timingFilter, setTimingFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const entries = COMBAT_ACTION_IDS
    .map((id) => [id, COMBAT_ACTIONS[id]])
    .filter(([, action]) => timingFilter === 'all' || action.timing === timingFilter);

  const grouped = {
    minor: entries.filter(([, a]) => a.actionType === 'minor'),
    major: entries.filter(([, a]) => a.actionType === 'major'),
  };

  return (
    <div className="sr-car">
      <div className="sr-car-filters">
        <button className={timingFilter === 'all' ? 'sr-btn sr-btn--primary' : 'sr-btn sr-btn--secondary'} onClick={() => setTimingFilter('all')}>All</button>
        <button className={timingFilter === 'initiative' ? 'sr-btn sr-btn--primary' : 'sr-btn sr-btn--secondary'} onClick={() => setTimingFilter('initiative')}>Initiative Only</button>
        <button className={timingFilter === 'anytime' ? 'sr-btn sr-btn--primary' : 'sr-btn sr-btn--secondary'} onClick={() => setTimingFilter('anytime')}>Anytime</button>
      </div>

      {['minor', 'major'].map((type) => {
        const typeEntries = grouped[type];
        if (typeEntries.length === 0) return null;
        return (
          <div key={type} className="sr-car-type-group">
            <div className="sr-car-type-title">{capitalize(type)} Actions</div>
            {typeEntries.map(([id, action]) => {
              const expanded = expandedId === id;
              return (
                <div key={id} className="sr-car-row">
                  <div className="sr-car-row-header">
                    <span className="sr-car-row-name">{action.label}</span>
                    <div className="sr-car-row-badges">
                      <span className={action.timing === 'anytime' ? 'sr-car-badge sr-car-badge--anytime' : 'sr-car-badge'}>
                        {action.timing === 'anytime' ? 'Anytime' : 'Initiative'}
                      </span>
                      {action.hasTest && character && (
                        <button
                          className="sr-btn sr-btn--secondary"
                          onClick={() => setExpandedId((prev) => (prev === id ? null : id))}
                        >
                          {expanded ? 'Hide' : 'Roll'}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="sr-car-row-description">{action.description}</div>

                  {expanded && action.hasTest && character && (
                    <div className="sr-car-row-builder">
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

      <div className="sr-car-type-group">
        <div className="sr-car-type-title">Edge Actions</div>
        <table className="sr-car-edge-table">
          <thead>
            <tr><th>Action</th><th>Cost</th><th>Associated Action</th></tr>
          </thead>
          <tbody>
            {COMBAT_EDGE_ACTIONS.map((e) => (
              <tr key={e.id}>
                <td>{e.label}</td>
                <td className="sr-car-edge-cost">{e.cost}</td>
                <td>{e.associatedAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
