import { useState, useEffect } from 'react';

import './dice.css';

// Rolls a Pool (see utils/pool.js) — locked to d6, 5s/6s count as hits
// per Rules > Core Mechanics. No game-specific knowledge here (no
// skill/weapon/character imports) — it just knows how to roll and
// display a Pool, however it was built. Collapsed by default; expand for
// the full component breakdown, dice-count adjustment, and the roll
// itself. Each die animates briefly before landing, and any settled die
// can be clicked to reroll just that one — the actual mechanical basis
// for the 1-cost Edge boost ("Reroll one die"), not just a visual flourish.
// `onHits(hits, { isGlitch, isCriticalGlitch })` fires whenever the dice
// settle, whether from the initial roll or a single-die reroll.
export default function Dice({ pool, onHits }) {
  const [expanded, setExpanded] = useState(false);
  const [diceCount, setDiceCount] = useState(pool.total);
  const [results, setResults] = useState(null);
  const [rollingIndices, setRollingIndices] = useState(new Set());

  // Resyncs whenever the underlying pool actually changes (rank spent,
  // attribute raised, etc.) — useState's initial value only applies on
  // first mount, so without this diceCount would freeze at whatever the
  // pool's total happened to be the moment this Dice instance first
  // rendered, silently ignoring every change after that.
  useEffect(() => {
    setDiceCount(pool.total);
    setResults(null);
    setRollingIndices(new Set());
  }, [pool.total]);

  // Notifies once the dice actually settle — after a full roll AND after
  // a single-die reroll, since either one can change the hit count. One
  // place computes and reports the outcome, rather than duplicating that
  // logic in both roll() and rerollDie().
  useEffect(() => {
    if (!results || rollingIndices.size > 0) return;
    if (results.some((v) => v === null)) return;
    const hits = results.filter((v) => v >= 5).length;
    const ones = results.filter((v) => v === 1).length;
    const isGlitch = ones > results.length / 2;
    const isCriticalGlitch = isGlitch && hits === 0;
    onHits?.(hits, { isGlitch, isCriticalGlitch });
  }, [results, rollingIndices]);

  // Animates one die (cycling random faces briefly before landing),
  // shared by both a full roll and a single-die reroll. Resolves once
  // that die has settled on its final value.
  const animateDie = (index) => {
    return new Promise((resolve) => {
      setRollingIndices((prev) => new Set(prev).add(index));

      const duration = 400;
      const interval = 60;
      let elapsed = 0;

      const intervalId = setInterval(() => {
        elapsed += interval;
        const value = 1 + Math.floor(Math.random() * 6);
        setResults((prev) => {
          const copy = [...(prev || [])];
          copy[index] = value;
          return copy;
        });

        if (elapsed >= duration) {
          clearInterval(intervalId);
          setRollingIndices((prev) => {
            const next = new Set(prev);
            next.delete(index);
            return next;
          });
          resolve();
        }
      }, interval);
    });
  };

  const roll = () => {
    setResults(Array.from({ length: diceCount }, () => null));
    for (let i = 0; i < diceCount; i++) animateDie(i);
  };

  const rerollDie = (index) => {
    if (!results || rollingIndices.size > 0) return;
    animateDie(index);
  };

  const reset = () => {
    setResults(null);
    setRollingIndices(new Set());
  };

  const rolledHits = results && !results.some((v) => v === null) ? results.filter((v) => v >= 5).length : null;
  const rolledOnes = results ? results.filter((v) => v === 1).length : 0;
  const isGlitch = rolledHits != null ? rolledOnes > diceCount / 2 : false;
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
            <button className="sr-btn sr-btn--primary" onClick={roll} disabled={diceCount === 0 || rollingIndices.size > 0}>Roll</button>
          </div>

          {results && (
            <div className="sr-dice-results">
              {results.map((v, i) => {
                const isRolling = rollingIndices.has(i);
                const rerollable = !isRolling && rollingIndices.size === 0;
                const className = [
                  'sr-die',
                  v != null && v >= 5 && 'sr-die--hit',
                  v === 1 && 'sr-die--one',
                  isRolling && 'sr-die--rolling',
                  rerollable && 'sr-die--rerollable',
                ].filter(Boolean).join(' ');
                return (
                  <button
                    key={i}
                    className={className}
                    onClick={() => rerollDie(i)}
                    disabled={!rerollable}
                    title="Reroll this die"
                  >
                    {v ?? ''}
                  </button>
                );
              })}
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
        </div>
      )}
    </div>
  );
}
