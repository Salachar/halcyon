import { useState } from 'react';

import { useCharacterManager } from '@hooks/useCharacterManager';

import './essenceAdjustmentModal.css';

// Purely a UI layer — GearManager.addEssenceAdjustment/
// removeEssenceAdjustment already do the real work (essence's own
// getter already sums these in). This is the "player honesty" escape
// valve made concrete: a list, not one running number, so a strain, a
// homebrew effect, and a GM correction can each sit as their own
// removable line instead of collapsing into an unexplained total. If
// official Vampirism logic ever exists, deleting the one manual entry
// for it is the whole migration.
export default function EssenceAdjustmentModal({ character, open, onClose }) {
  const { touch } = useCharacterManager();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  if (!open) return null;

  const adjustments = character.gearManager.essenceAdjustments;

  const handleAdd = () => {
    const value = parseFloat(amount);
    if (!value) return;
    character.gearManager.addEssenceAdjustment(value, note.trim());
    setAmount('');
    setNote('');
    touch();
  };

  const handleRemove = (index) => {
    character.gearManager.removeEssenceAdjustment(index);
    touch();
  };

  return (
    <div className="sr-modal-backdrop" onClick={onClose}>
      <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sr-modal-header">
          <h3 className="sr-modal-title">Essence Adjustments</h3>
          <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <p className="sr-essence-current">
          Current Essence: <strong>{character.essence.toFixed(2)}</strong> — 6 base + adjustments − installed cyberware/bioware
        </p>

        {adjustments.length === 0 ? (
          <p className="sr-essence-adj-empty">No manual adjustments yet.</p>
        ) : (
          <div className="sr-essence-adj-list">
            {adjustments.map((adj, i) => (
              <div className="sr-essence-adj-row" key={i}>
                <span className={adj.amount >= 0 ? 'sr-essence-adj-amount sr-essence-adj-amount--positive' : 'sr-essence-adj-amount sr-essence-adj-amount--negative'}>
                  {adj.amount >= 0 ? '+' : ''}{adj.amount}
                </span>
                <span className="sr-essence-adj-note">{adj.note || '—'}</span>
                <button className="sr-icon-btn" onClick={() => handleRemove(i)} title="Remove">−</button>
              </div>
            ))}
          </div>
        )}

        <div className="sr-essence-adj-form">
          <input
            type="number"
            step="0.1"
            className="sr-number-input sr-essence-adj-amount-input"
            placeholder="±Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            className="sr-number-input sr-essence-adj-note-input"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button className="sr-btn sr-btn--primary" onClick={handleAdd} disabled={!amount}>Add</button>
        </div>

        <div className="sr-modal-actions">
          <button className="sr-btn sr-btn--secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
