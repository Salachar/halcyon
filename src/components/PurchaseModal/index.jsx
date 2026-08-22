import { useState } from 'react';
import { isConfigurable, configLabel, configRange, resolveCost, defaultConfig } from '@utils/gearPurchase';
import { isGradeable, resolveEssenceCost, needsInstallChoice } from '@utils/augmentationEconomy';
import { AUGMENTATION_GRADES } from '@data/gear/augmentations';
import ConfirmationModal from '@components/ConfirmationModal';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Viewable with no character selected — shows full item detail and cost
// regardless. Buy is gated on Nuyen + Essence. Found It (Free) is gated
// on Essence only — it's an acquisition path ("the player found it"),
// not a way around physical capacity — and doubles as the app's
// correction/undo mechanism generally: remove a mistake, re-grab the
// right thing for free, no separate refund system needed.
//
// `initialConfig` lets a caller override the starting rating/capacity
// (used by the cyberlimb Enhance flow to open pre-filled at "next
// rating" rather than the item's raw minimum) — omit it for normal use.
export default function PurchaseModal({ item, character, initialConfig, onPurchase, onFreeGrab, onClose }) {
  const configurable = isConfigurable(item);
  const gradeable = isGradeable(item);
  const installChoice = needsInstallChoice(item);
  const [config, setConfig] = useState(() => initialConfig || defaultConfig(item));
  const [freeGrabConfirmOpen, setFreeGrabConfirmOpen] = useState(false);

  const cost = resolveCost(item, config);
  const essenceCost = gradeable ? resolveEssenceCost(item, config) : null;
  const remainingEssence = character && gradeable ? character.essence - essenceCost : null;

  const affordableNuyen = character != null && character.nuyen >= cost;
  const affordableEssence = !gradeable || remainingEssence == null || remainingEssence >= 0;
  const affordable = affordableNuyen && affordableEssence;
  const grabbable = character != null && affordableEssence;

  const [min, max] = configRange(item);

  // Explicit, not Object.keys(config)[0] — config can now carry a
  // rating/capacity/units key AND a grade key AND an installLocation
  // key on affected items, so grabbing "the first key" is no longer a
  // safe way to find this one.
  const configKey = 'rating' in config ? 'rating' : 'capacity' in config ? 'capacity' : 'units' in config ? 'units' : null;

  const purchase = { itemId: item.id, ...config };

  return (
    <>
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

          {installChoice && (
            <div className="sr-modal-config">
              <label className="sr-modal-config-label">Install Into</label>
              <select
                className="sr-number-input"
                value={config.installLocation || 'flesh'}
                onChange={(e) => setConfig((c) => ({ ...c, installLocation: e.target.value }))}
              >
                <option value="flesh">Flesh (costs Essence)</option>
                <option value="cyberlimb">Cyberlimb (costs Capacity)</option>
              </select>
              {config.installLocation === 'cyberlimb' && (
                <p className="sr-modal-hint">
                  No Essence charged. Attach to a specific limb after purchase — that step checks the limb's remaining Capacity.
                </p>
              )}
            </div>
          )}

          <div className="sr-modal-cost">
            Cost: <strong>{cost.toLocaleString()}¥</strong>
            {gradeable && (
              <span className="sr-modal-essence"> · Essence: <strong>{essenceCost.toFixed(2)}</strong></span>
            )}
          </div>

          {!character && <p className="sr-modal-hint">Select a character to purchase.</p>}
          {character && !affordableNuyen && <p className="sr-modal-hint sr-modal-hint--danger">Not enough nuyen.</p>}
          {character && affordableNuyen && !affordableEssence && (
            <p className="sr-modal-hint sr-modal-hint--danger">Not enough Essence — this would take you to {remainingEssence.toFixed(2)}.</p>
          )}

          <div className="sr-modal-actions">
            <button className="sr-btn sr-btn--secondary" onClick={onClose}>Cancel</button>
            {onFreeGrab && (
              <button
                className="sr-btn sr-btn--secondary"
                disabled={!grabbable}
                onClick={() => setFreeGrabConfirmOpen(true)}
              >
                Found It (Free)
              </button>
            )}
            <button
              className="sr-btn sr-btn--primary"
              disabled={!affordable}
              onClick={() => onPurchase(purchase)}
            >
              Buy
            </button>
          </div>
        </div>
      </div>

      {onFreeGrab && (
        <ConfirmationModal
          open={freeGrabConfirmOpen}
          title="Add for Free"
          message={`Add ${item.label}${gradeable ? ` (${capitalize(config.grade || 'standard')} grade, Essence ${essenceCost.toFixed(2)})` : ''} without spending Nuyen?`}
          confirmLabel="Add"
          cancelLabel="Cancel"
          onConfirm={() => { onFreeGrab(purchase); setFreeGrabConfirmOpen(false); }}
          onCancel={() => setFreeGrabConfirmOpen(false)}
        />
      )}
    </>
  );
}
