import { useCharacterManager } from '@hooks/useCharacterManager';
import { EDGE_BOOSTS } from '@data/character/edge_boosts';

import './edge.css';

// Live Edge tracker + Boosts reference, reusable identically wherever a
// scene needs it (Combat, Matrix). Every action here is a single instant
// tap — no confirm modals, no linkage to a specific roll, no gating
// beyond "can you afford it." This is a companion tool for a table
// that's already agreed on what's happening, not a system policing
// intent — see the "honorbound" framing this was built against.
//
// Deliberately decoupled from Dice: spending a boost here doesn't touch
// any roll, and Dice's own reroll button doesn't check Edge at all.
// The player taps a boost, narrates it, and separately clicks reroll on
// whichever die they're rerolling — two tools used together by choice,
// not one enforcing the other.
export default function Edge({ character }) {
  const { touch } = useCharacterManager();

  const adjust = (delta) => {
    character.currentEdge = character.currentEdge + delta;
    touch();
  };

  const useBoost = (boost) => {
    if (!character.spendEdge(boost.cost)) return;
    touch();
  };

  const endConfrontation = () => {
    character.resetEdge();
    touch();
  };

  return (
    <div className="sr-edge">
      <div className="sr-edge-header">
        <span className="sr-edge-label">Edge</span>
        <div className="sr-edge-controls">
          <button className="sr-icon-btn" onClick={() => adjust(-1)}>−</button>
          <span className="sr-edge-value">{character.currentEdge}</span>
          <button className="sr-icon-btn" onClick={() => adjust(1)}>+</button>
        </div>
        <button className="sr-btn sr-btn--secondary sr-edge-end" onClick={endConfrontation}>
          End Confrontation
        </button>
      </div>

      <div className="sr-edge-boosts">
        {EDGE_BOOSTS.map((boost) => {
          const affordable = character.currentEdge >= boost.cost;
          return (
            <div
              key={boost.id}
              className={affordable ? 'sr-edge-boost' : 'sr-edge-boost sr-edge-boost--unavailable'}
            >
              <div className="sr-edge-boost-info">
                <div className="sr-edge-boost-name">
                  {boost.label} <span className="sr-edge-boost-cost">({boost.cost})</span>
                </div>
                <p className="sr-edge-boost-description">{boost.description}</p>
              </div>
              <button className="sr-btn sr-btn--primary" disabled={!affordable} onClick={() => useBoost(boost)}>
                Use
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
