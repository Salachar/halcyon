import { useCharacterManager } from '@hooks/useCharacterManager';
import { MATRIX_EDGE_ACTIONS } from '@data/character/matrix_actions';

import './matrixEdgeActions.css';

// Spends from the SAME shared Edge pool the generic Edge component
// tracks (character.currentEdge) — just a different, Matrix-flavored
// menu of what that Edge can buy. Doesn't duplicate Edge's own value
// readout/adjustment controls; if that's wanted alongside this, drop
// the regular Edge component in nearby.
export default function MatrixEdgeActions({ character }) {
  const { touch } = useCharacterManager();

  const useAction = (action) => {
    if (!character.spendEdge(action.cost)) return;
    touch();
  };

  return (
    <div className="sr-mea">
      <div className="sr-mea-note">Requires a cyberjack or Resonance rating to use.</div>
      {MATRIX_EDGE_ACTIONS.map((action) => {
        const affordable = character.currentEdge >= action.cost;
        return (
          <div
            key={action.id}
            className={affordable ? 'sr-mea-action' : 'sr-mea-action sr-mea-action--unavailable'}
          >
            <div className="sr-mea-action-info">
              <div className="sr-mea-action-name">
                {action.label} <span className="sr-mea-action-cost">({action.cost})</span>
              </div>
              <p className="sr-mea-action-description">{action.description}</p>
            </div>
            <button className="sr-btn sr-btn--primary" disabled={!affordable} onClick={() => useAction(action)}>
              Use
            </button>
          </div>
        );
      })}
    </div>
  );
}
