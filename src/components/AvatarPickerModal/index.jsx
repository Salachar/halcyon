import { AVATAR_IDS, AVATAR_URLS } from '@utils/avatarImages';

import './avatarPickerModal.css';

// Grid picker for the 68 avatar presets. onSelect receives a number
// (the avatar id) or null (the explicit "no icon, back to the letter
// placeholder" option) — same shape persona.iconId already expects.
export default function AvatarPickerModal({ currentIconId, onSelect, onClose }) {
  const handlePick = (id) => {
    onSelect(id);
    onClose();
  };

  return (
    <div className="sr-modal-backdrop" onClick={onClose}>
      <div className="sr-modal sr-avatar-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sr-modal-header">
          <h3 className="sr-modal-title">Choose an Icon</h3>
          <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="sr-avatar-grid">
          <button className="sr-avatar-clear" onClick={() => handlePick(null)} title="No icon">
            None
          </button>
          {AVATAR_IDS.map((id) => (
            <button
              key={id}
              className={id === currentIconId ? 'sr-avatar-thumb sr-avatar-thumb--selected' : 'sr-avatar-thumb'}
              onClick={() => handlePick(id)}
            >
              <img src={AVATAR_URLS[id]} alt={`Avatar ${id}`} />
            </button>
          ))}
        </div>

        <div className="sr-modal-actions">
          <button className="sr-btn sr-btn--secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
