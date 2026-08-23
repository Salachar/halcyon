import { ALL_GEAR } from '@data/gear';
import { getCompositedPersonaStats } from '@utils/panGrouping';

import './matrixCombatRatings.css';

// Attack Rating (Attack + Sleaze) and Defense Rating (Data Processing +
// Firewall) — confirmed Cybercombat formula, computed off the same
// composited PAN stats PersonaStatsBlock already shows. Pure derived
// display, no manual input — same "derive, don't duplicate" instinct
// as everything else computed in this app.
export default function MatrixCombatRatings({ character }) {
  const stats = getCompositedPersonaStats(character, ALL_GEAR);

  if (!stats) {
    return <p className="sr-mcr-hint">No Primary device set — Attack/Defense Rating unavailable.</p>;
  }

  const attackRating = (stats.attack ?? 0) + (stats.sleaze ?? 0);
  const defenseRating = (stats.dataProcessing ?? 0) + (stats.firewall ?? 0);

  return (
    <div className="sr-mcr">
      <div className="sr-mcr-stat">
        <span className="sr-mcr-label">Attack Rating</span>
        <span className="sr-mcr-value">{attackRating}</span>
        <span className="sr-mcr-formula">Attack + Sleaze</span>
      </div>
      <div className="sr-mcr-stat">
        <span className="sr-mcr-label">Defense Rating</span>
        <span className="sr-mcr-value">{defenseRating}</span>
        <span className="sr-mcr-formula">Data Processing + Firewall</span>
      </div>
    </div>
  );
}
