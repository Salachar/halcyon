import { useState } from 'react';

import { useCharacterManager } from '@hooks/useCharacterManager';
import { sumDeviceModifiersGlobal, collectConditionalModifiers } from '@utils/deviceModifiers';

import './noiseTracker.css';

// Three layers, matching how the actual rule works: a manually-set base
// (what the GM tells the player — "distance and terrain puts this at
// 5"), auto-applied unconditional modifiers from effectively-wireless
// gear (Signal Scrubber's flat -2, summed automatically), and optional
// conditional modifiers (ECM Warrior II's ranged -2) that the app can't
// verify on its own — listed but inert until the player/GM confirms the
// condition actually holds right now and taps Apply.
//
// The applied-optional set is session-only, plain useState — gone on
// refresh, never touches MatrixManager. Works the same whether the
// player rolls in-app or physically; this only ever computes the
// correct total, never forces a specific roll flow.
export default function NoiseTracker({ character }) {
  const { touch } = useCharacterManager();
  const [appliedIds, setAppliedIds] = useState(() => new Set());

  const base = character.matrixManager.noiseBase;
  const autoModifier = sumDeviceModifiersGlobal(character, 'noise');
  const conditionalOptions = collectConditionalModifiers(character, 'noise');
  const appliedTotal = conditionalOptions
    .filter((opt) => appliedIds.has(opt.id))
    .reduce((sum, opt) => sum + opt.value, 0);
  const effective = base + autoModifier + appliedTotal;

  const handleBaseChange = (value) => {
    character.matrixManager.setNoiseBase(value);
    touch();
  };

  const toggleApplied = (id) => {
    setAppliedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const resetOptional = () => setAppliedIds(new Set());

  return (
    <div className="sr-noise">
      <div className="sr-noise-header">
        <span className="sr-noise-label">Noise</span>
        <span className="sr-noise-effective">{effective}</span>
      </div>

      <div className="sr-noise-base-row">
        <span className="sr-noise-base-label">Base (set by GM)</span>
        <input
          type="number"
          className="sr-number-input"
          value={base}
          onChange={(e) => handleBaseChange(Number(e.target.value) || 0)}
        />
        <button className="sr-btn sr-btn--secondary" onClick={() => handleBaseChange(0)}>Zero Out</button>
      </div>

      {autoModifier !== 0 && (
        <div className="sr-noise-auto">Active gear: {autoModifier > 0 ? '+' : ''}{autoModifier}</div>
      )}

      {conditionalOptions.length > 0 && (
        <>
          <div className="sr-noise-optional-title">Conditional — verify before applying</div>
          {conditionalOptions.map((opt) => {
            const applied = appliedIds.has(opt.id);
            return (
              <div key={opt.id} className="sr-noise-optional-row">
                <span className="sr-noise-optional-label">
                  {opt.label}: {opt.value > 0 ? '+' : ''}{opt.value}
                </span>
                <button
                  className={applied ? 'sr-btn sr-btn--primary' : 'sr-btn sr-btn--secondary'}
                  onClick={() => toggleApplied(opt.id)}
                >
                  {applied ? 'Applied' : 'Apply'}
                </button>
              </div>
            );
          })}
          {appliedIds.size > 0 && (
            <button className="sr-btn sr-btn--secondary sr-noise-reset-all" onClick={resetOptional}>
              Reset All Applied
            </button>
          )}
        </>
      )}
    </div>
  );
}
