import { useState } from 'react';

import './quickAdjustModal.css';

// Generic quick +/- adjuster — no domain knowledge (doesn't know about
// Nuyen, Karma, or anything else). A sign toggle plus a row of preset
// buttons that each apply instantly on tap, no confirm step, matching
// the "no unnecessary friction" call — this is a companion app for a
// table that's already agreed on what's happening, not a system
// defending against misuse. A custom-amount field covers whatever the
// presets don't. Stays open after each tap so several quick adjustments
// can happen in a row before closing.
export default function QuickAdjustModal({
  open,
  title = 'Adjust',
  presets = [1, 5, 10, 50, 100],
  currentValue,
  valueLabel = '',
  onAdjust,
  onClose,
}) {
  const [sign, setSign] = useState(1);
  const [customValue, setCustomValue] = useState('');

  if (!open) return null;

  const applyPreset = (amount) => {
    onAdjust(sign * amount);
  };

  const applyCustom = () => {
    const amount = parseInt(customValue, 10);
    if (!amount || amount <= 0) return;
    onAdjust(sign * amount);
    setCustomValue('');
  };

  return (
    <div className="sr-modal-backdrop" onClick={onClose}>
      <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sr-modal-header">
          <h3 className="sr-modal-title">{title}</h3>
          <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {currentValue != null && (
          <div className="sr-quickadjust-current">
            {currentValue.toLocaleString()}{valueLabel && ` ${valueLabel}`}
          </div>
        )}

        <div className="sr-quickadjust-sign">
          <button className={sign === 1 ? 'sr-btn sr-btn--primary' : 'sr-btn sr-btn--secondary'} onClick={() => setSign(1)}>
            + Add
          </button>
          <button className={sign === -1 ? 'sr-btn sr-btn--danger' : 'sr-btn sr-btn--secondary'} onClick={() => setSign(-1)}>
            − Subtract
          </button>
        </div>

        <div className="sr-quickadjust-presets">
          {presets.map((p) => (
            <button key={p} className="sr-quickadjust-preset" onClick={() => applyPreset(p)}>
              {sign === 1 ? '+' : '−'}{p}
            </button>
          ))}
        </div>

        <div className="sr-quickadjust-custom">
          <input
            type="number"
            className="sr-number-input"
            placeholder="Custom amount"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyCustom()}
          />
          <button className="sr-btn sr-btn--secondary" onClick={applyCustom} disabled={!customValue}>Apply</button>
        </div>

        <div className="sr-modal-actions">
          <button className="sr-btn sr-btn--secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
