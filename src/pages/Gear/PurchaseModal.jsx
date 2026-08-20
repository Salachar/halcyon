import { useState } from 'react';
import { isConfigurable, configLabel, configRange, resolveCost, defaultConfig } from './gearPurchase';
import { isGradeable, resolveEssenceCost } from '@utils/augmentationEconomy';
import { AUGMENTATION_GRADES } from '@data/gear/augmentations';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Viewable with no character selected — shows full item detail and cost
// regardless. Only the Buy action itself is gated: disabled with no
// character, or with insufficient nuyen. `onPurchase` receives
// { itemId, ...config } — resolving that into an actual character
// mutation (deduct nuyen, add to inventory) is the caller's job.
export default function PurchaseModal({ item, character, onPurchase, onClose }) {
  const configurable = isConfigurable(item);
  const gradeable = isGradeable(item);
  const [config, setConfig] = useState(() => defaultConfig(item));

  const cost = resolveCost(item, config);
  const essenceCost = gradeable ? resolveEssenceCost(item, config) : null;
  const affordable = character != null && character.nuyen >= cost;
  const [min, max] = configRange(item);

  // Explicit, not Object.keys(config)[0] — config can now carry both a
  // rating/capacity/units key AND a grade key on gradeable items, so
  // grabbing "the first key" is no longer a safe way to find this one.
  const configKey = 'rating' in config ? 'rating' : 'capacity' in config ? 'capacity' : 'units' in config ? 'units' : null;

  return (
    <div className="sr-modal-backdrop" onClick={onClose}>
      <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sr-modal-header">
          <h3 className="sr-modal-title">{item.label}</h3>
          <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {item.description && <p className="sr-modal-description">{item.description}</p>}

        {configurable && configKey && (
          <div className="sr-modal-config">
            <label className="sr-modal-config-label">{configLabel(item)}</label>
            <input
              type="number"
              className="sr-number-input"
              min={min}
              max={max}
              value={config[configKey]}
              onChange={(e) => {
                const v = Math.max(min, Math.min(max, Number(e.target.value) || min));
                setConfig((c) => ({ ...c, [configKey]: v }));
              }}
            />
          </div>
        )}

        {gradeable && (
          <div className="sr-modal-config">
            <label className="sr-modal-config-label">Grade</label>
            <select
              className="sr-number-input"
              value={config.grade || 'standard'}
              onChange={(e) => setConfig((c) => ({ ...c, grade: e.target.value }))}
            >
              {Object.keys(AUGMENTATION_GRADES).map((grade) => (
                <option key={grade} value={grade}>{capitalize(grade)}</option>
              ))}
            </select>
          </div>
        )}

        <div className="sr-modal-cost">
          Cost: <strong>{cost.toLocaleString()}¥</strong>
          {gradeable && (
            <span className="sr-modal-essence"> · Essence: <strong>{essenceCost.toFixed(2)}</strong></span>
          )}
        </div>

        {!character && <p className="sr-modal-hint">Select a character to purchase.</p>}
        {character && !affordable && <p className="sr-modal-hint sr-modal-hint--danger">Not enough nuyen.</p>}

        <div className="sr-modal-actions">
          <button className="sr-btn sr-btn--secondary" onClick={onClose}>Cancel</button>
          <button
            className="sr-btn sr-btn--primary"
            disabled={!affordable}
            onClick={() => onPurchase({ itemId: item.id, ...config })}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
