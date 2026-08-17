import { useState } from 'react';
import { isConfigurable, configLabel, configRange, resolveCost, defaultConfig } from './gearPurchase';

// Viewable with no character selected — shows full item detail and cost
// regardless. Only the Buy action itself is gated: disabled with no
// character, or with insufficient nuyen. `onPurchase` receives
// { itemId, ...config } — resolving that into an actual character
// mutation (deduct nuyen, add to inventory) is the caller's job, since
// it depends on Character, which doesn't exist yet.
export default function PurchaseModal({ item, character, onPurchase, onClose }) {
  const configurable = isConfigurable(item);
  const [config, setConfig] = useState(() => defaultConfig(item));

  const cost = resolveCost(item, config);
  const affordable = character != null && character.nuyen >= cost;
  const [min, max] = configRange(item);
  const configKey = Object.keys(config)[0]; // 'rating' | 'capacity' | 'units'

  return (
    <div className="sr-modal-backdrop" onClick={onClose}>
      <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sr-modal-header">
          <h3 className="sr-modal-title">{item.label}</h3>
          <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {item.description && <p className="sr-modal-description">{item.description}</p>}

        {configurable && (
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
                setConfig({ [configKey]: v });
              }}
            />
          </div>
        )}

        <div className="sr-modal-cost">
          Cost: <strong>{cost.toLocaleString()}¥</strong>
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
