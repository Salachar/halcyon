import { useCharacterManager } from '@hooks/useCharacterManager';

import './overwatchTracker.css';

const CONVERGENCE_THRESHOLD = 40;

// Manual counter, same shape as Noise's base — accumulates from real,
// confirmed triggers (+1 per total hit scored against you on an
// illegal action, +1/round of illegal User access per host, +3/round
// of illegal Admin access per host), but none of that is auto-applied
// here, since doing so would mean simulating an opposed test against a
// target — exactly what this project stays away from (Hacked Devices
// is notes, not a target model). Player/GM adds it up, taps the
// matching button. Convergence at 40: device bricks, forced dumpshock,
// physical location reported.
export default function OverwatchTracker({ character }) {
  const { touch } = useCharacterManager();

  const score = character.matrixManager.overwatchScore;
  const pct = Math.min(100, (score / CONVERGENCE_THRESHOLD) * 100);
  const level = score >= CONVERGENCE_THRESHOLD ? 'full' : pct >= 75 ? 'high' : pct >= 40 ? 'mid' : 'low';
  const atConvergence = score >= CONVERGENCE_THRESHOLD;

  const adjust = (delta) => {
    character.matrixManager.setOverwatchScore(score + delta);
    touch();
  };

  const reset = () => {
    character.matrixManager.setOverwatchScore(0);
    touch();
  };

  return (
    <div className="sr-os">
      <div className="sr-os-header">
        <span className="sr-os-label">Overwatch Score</span>
        <span className="sr-os-value">{score}<span className="sr-os-threshold">/{CONVERGENCE_THRESHOLD}</span></span>
      </div>

      <div className="sr-os-gauge-track">
        <div className={`sr-os-gauge-fill sr-os-gauge-fill--${level}`} style={{ width: `${pct}%` }} />
      </div>

      {atConvergence && (
        <div className="sr-os-convergence">Convergence — device bricks, dumpshock, location reported.</div>
      )}

      <div className="sr-os-controls">
        <button className="sr-btn sr-btn--secondary" onClick={() => adjust(1)}>+1 (Hit)</button>
        <button className="sr-btn sr-btn--secondary" onClick={() => adjust(3)}>+3 (Illegal Admin/rd)</button>
        <button className="sr-btn sr-btn--secondary" onClick={() => adjust(-1)}>−1</button>
        <button className="sr-btn sr-btn--secondary" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
