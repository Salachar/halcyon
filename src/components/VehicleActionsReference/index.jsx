import { useState } from 'react';

import { VEHICLE_ACTIONS, VEHICLE_ACTION_IDS, VEHICLE_MOVEMENT_NOTE, RIGGING_JUMP_IN_NOTE } from '@data/character/vehicle_actions';
import { SKILLS } from '@data/character/skills';
import PoolBuilder from '@components/PoolBuilder';

import './vehicleActionsReference.css';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Vehicle Rigging tests reference + rolling — every action here has a
// real, single-actor PoolBuilder roll (Handling/Crash/Ramming/Mounted
// Weapon Fire all resolve as the player's own side, GM or opposing
// player supplies the other, matching the same boundary as Matrix and
// Combat Actions). Speed Interval's cumulative penalty isn't baked
// into any default pool — it's added manually via PoolBuilder's own
// Add Modifier control when it applies, since it's a live, changing
// number tracked per-vehicle, not a fixed property of the test itself.
export default function VehicleActionsReference({ character }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="sr-var">
      <p className="sr-var-note">{VEHICLE_MOVEMENT_NOTE}</p>
      <p className="sr-var-note">{RIGGING_JUMP_IN_NOTE}</p>

      {VEHICLE_ACTION_IDS.map((id) => {
        const action = VEHICLE_ACTIONS[id];
        const expanded = expandedId === id;
        const skillLabel = SKILLS[action.skill]?.label ?? action.skill;

        return (
          <div key={id} className="sr-var-row">
            <div className="sr-var-row-header">
              <span className="sr-var-row-name">{action.label}</span>
              {character && (
                <button
                  className="sr-btn sr-btn--secondary"
                  onClick={() => setExpandedId((prev) => (prev === id ? null : id))}
                >
                  {expanded ? 'Hide' : 'Roll'}
                </button>
              )}
            </div>
            <div className="sr-var-row-skill">{skillLabel} + {capitalize(action.attribute)}</div>
            <div className="sr-var-row-threshold">Threshold: {action.threshold}</div>
            <div className="sr-var-row-description">{action.description}</div>

            {expanded && character && (
              <div className="sr-var-row-builder">
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
}
