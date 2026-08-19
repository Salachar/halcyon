import { useState } from 'react';

import './numberEntryModal.css';

// Generic "get a positive integer from someone with no real keyboard"
// keypad — no domain knowledge, doesn't know what the number is for.
// Digits append (tap 1 then 0 to build "10"), C clears, ⌫ removes the
// last digit. Caller supplies title/confirmLabel and gets the final
// integer back through onConfirm.
export default function NumberEntryModal({ open, title = 'Enter Amount', confirmLabel = 'Add', onConfirm, onClose }) {
  const [value, setValue] = useState('');

  if (!open) return null;

  const amount = parseInt(value, 10) || 0;

  const handleDigit = (d) => setValue((prev) => (prev.length >= 5 ? prev : prev + String(d)));
  const handleBackspace = () => setValue((prev) => prev.slice(0, -1));
  const handleClear = () => setValue('');

  const handleClose = () => {
    setValue('');
    onClose();
  };

  const handleConfirm = () => {
    if (amount > 0) onConfirm(amount);
    setValue('');
    onClose();
  };

  return (
    <div className="sr-modal-backdrop" onClick={handleClose}>
      <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sr-modal-header">
          <h3 className="sr-modal-title">{title}</h3>
          <button className="sr-modal-close" onClick={handleClose} aria-label="Close">×</button>
        </div>

        <div className="sr-keypad-display">{value || '0'}</div>

        <div className="sr-keypad-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
            <button key={d} className="sr-keypad-key" onClick={() => handleDigit(d)}>{d}</button>
          ))}
          <button className="sr-keypad-key sr-keypad-key--action" onClick={handleClear}>C</button>
          <button className="sr-keypad-key" onClick={() => handleDigit(0)}>0</button>
          <button className="sr-keypad-key sr-keypad-key--action" onClick={handleBackspace}>⌫</button>
        </div>

        <div className="sr-modal-actions">
          <button className="sr-btn sr-btn--secondary" onClick={handleClose}>Cancel</button>
          <button className="sr-btn sr-btn--primary" disabled={amount <= 0} onClick={handleConfirm}>
            {confirmLabel}{amount > 0 ? ` ${amount}` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}
