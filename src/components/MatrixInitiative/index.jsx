import { ALL_GEAR } from '@data/gear';
import { getCompositedPersonaStats } from '@utils/panGrouping';

import './matrixInitiative.css';

// Computed, read-only — depends on Device Mode (already tracked on
// Persona) plus the same composited Data Processing PersonaStatsBlock
// already shows, never stored or edited separately. Confirmed formula:
// dice stack on top of the normal 1D6, capped at 5D6 total overall
// (across every Initiative-boosting source, not just this — noted, not
// enforced, since nothing else that stacks dice is tracked here).
//
// AR: Reaction + Intuition — identical to normal Initiative, no bonus
// dice. Shown as a reminder, not a separate roller.
// VR (Cold Sim): Intuition + Data Processing, +1 extra d6 (2D6 total).
// VR (Hot Sim): Intuition + Data Processing, +2 extra d6 (3D6 total).
export default function MatrixInitiative({ character }) {
  const compositedStats = getCompositedPersonaStats(character, ALL_GEAR);

  if (!compositedStats) {
    return <p className="sr-mi-hint">No Primary device set — Matrix Initiative unavailable.</p>;
  }

  const deviceMode = character.gearManager.deviceMode;
  const intuition = character.getAttribute('intuition');
  const reaction = character.getAttribute('reaction');
  const dataProcessing = compositedStats.dataProcessing ?? 0;

  let base, extraDice, formula;
  if (deviceMode === 'AR') {
    base = reaction + intuition;
    extraDice = 0;
    formula = `Reaction (${reaction}) + Intuition (${intuition})`;
  } else if (deviceMode === 'VR') {
    base = intuition + dataProcessing;
    extraDice = 1;
    formula = `Intuition (${intuition}) + Data Processing (${dataProcessing})`;
  } else {
    base = intuition + dataProcessing;
    extraDice = 2;
    formula = `Intuition (${intuition}) + Data Processing (${dataProcessing})`;
  }

  const totalDice = Math.min(5, 1 + extraDice);

  return (
    <div className="sr-mi">
      <div className="sr-mi-header">
        <span className="sr-mi-label">Matrix Initiative</span>
        <span>{deviceMode}</span>
      </div>
      <div className="sr-mi-formula">{formula}</div>
      <div className="sr-mi-score">Initiative Score: <strong>{base}</strong> + {totalDice}D6</div>
      {totalDice >= 5 && <div className="sr-mi-cap-note">5D6 cap reached — any further Initiative dice from other sources are lost.</div>}
    </div>
  );
}
