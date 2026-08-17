import { useState } from 'react';

import './dice.css';

// Rolls a Pool (see utils/pool.js) — locked to d6, 5s/6s count as hits
// per Rules > Core Mechanics. No game-specific knowledge here (no
// skill/weapon/character imports) — it just knows how to roll and
// display a Pool, however it was built. Collapsed by default; expand for
// the full component breakdown, dice-count adjustment, and the roll
// itself. `onHits(hits, { isGlitch, isCriticalGlitch })` fires whenever
// a result is available, whether from the simulated roller or manual
// entry — callers (Edge, a future Combat step) can react to either
// the same way, without caring which path produced it.
export default function Dice({ pool, onHits }) {
  const [expanded, setExpanded] = useState(false);
  const [diceCount, setDiceCount] = useState(pool.total);
  const [results, setResults] = useState(null);
  const [manualHits, setManualHits] = useState('');

  const roll = () => {
    const rolled = Array.from({ length: diceCount }, () => 1 + Math.floor(Math.random() * 6));
    setResults(rolled);
    setManualHits('');
    const hits = rolled.filter((v) => v >= 5).length;
    const ones = rolled.filter((v) => v === 1).length;
    const isGlitch = ones > diceCount / 2;
    const isCriticalGlitch = isGlitch && hits === 0;
    onHits?.(hits, { isGlitch, isCriticalGlitch });
  };

  const reset = () => {
    setResults(null);
    setManualHits('');
  };

  const submitManualHits = () => {
    const hits = Math.max(0, Number(manualHits) || 0);
    setResults(null);
    // Manual entry has no individual dice, so glitch state can't be
    // inferred — that's a real limitation of this path, not an oversight.
    onHits?.(hits, { isGlitch: false, isCriticalGlitch: false });
  };

  const rolledHits = results ? results.filter((v) => v >= 5).length : null;
  const rolledOnes = results ? results.filter((v) => v === 1).length : 0;
  const isGlitch = results ? rolledOnes > diceCount / 2 : false;
  const isCriticalGlitch = isGlitch && rolledHits === 0;
  const passed = pool.hitThreshold != null && rolledHits != null ? rolledHits >= pool.hitThreshold : null;

  const summary = pool.components.map((c) => `${c.label} ${c.value >= 0 ? '+' : ''}${c.value}`).join(' ');

  return (
    <div className="sr-dice">
      <div className="sr-dice-header" onClick={() => setExpanded((v) => !v)}>
        <span className="sr-dice-summary">
          <strong>{diceCount}d6</strong>
          {pool.hitThreshold != null && <span className="sr-dice-threshold"> vs {pool.hitThreshold}</span>}
        </span>
        <span className="sr-dice-toggle">{expanded ? 'Hide' : 'Details'}</span>
      </div>

      {expanded && (
        <div className="sr-dice-body">
          {summary && <div className="sr-dice-breakdown">{summary}</div>}

          <div className="sr-dice-controls">
            <button className="sr-icon-btn" onClick={() => setDiceCount((n) => Math.max(0, n - 1))}>−</button>
            <span className="sr-dice-count">{diceCount}</span>
            <button className="sr-icon-btn" onClick={() => setDiceCount((n) => n + 1)}>+</button>
            <button className="sr-btn sr-btn--primary" onClick={roll} disabled={diceCount === 0}>Roll</button>
          </div>

          {results && (
            <div className="sr-dice-results">
              {results.map((v, i) => (
                <span key={i} className={v >= 5 ? 'sr-die sr-die--hit' : v === 1 ? 'sr-die sr-die--one' : 'sr-die'}>
                  {v}
                </span>
              ))}
            </div>
          )}

          {rolledHits != null && (
            <div className="sr-dice-outcome">
              <strong>{rolledHits} hit{rolledHits === 1 ? '' : 's'}</strong>
              {passed != null && (
                <span className={passed ? 'sr-dice-pass' : 'sr-dice-fail'}> · {passed ? 'Success' : 'Failure'}</span>
              )}
              {isCriticalGlitch && <span className="sr-dice-critical-glitch"> · Critical Glitch</span>}
              {isGlitch && !isCriticalGlitch && <span className="sr-dice-glitch"> · Glitch</span>}
              <button className="sr-btn sr-btn--secondary sr-dice-reset" onClick={reset}>Reset</button>
            </div>
          )}

          <div className="sr-dice-manual">
            <span className="sr-dice-manual-label">Rolled physical dice?</span>
            <input
              type="number"
              className="sr-number-input"
              placeholder="Hits"
              value={manualHits}
              onChange={(e) => setManualHits(e.target.value)}
            />
            <button className="sr-btn sr-btn--secondary" onClick={submitManualHits} disabled={manualHits === ''}>Use</button>
          </div>
        </div>
      )}
    </div>
  );
}
