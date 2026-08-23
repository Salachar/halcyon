import { useState } from 'react';

import { DEVICE_MODES } from '@data/GearManager';
import { AVATAR_URLS } from '@utils/avatarImages';
import AvatarPickerModal from '@components/AvatarPickerModal';

import './personaHeader.css';

// Persona mini-header — name, icon (real avatar art once picked, a
// letter placeholder until then), Running Silent, Device Mode.
// Persona/Device Mode are session-state describing what the character
// is DOING in the Matrix right now, not who they are — Matrix-tab-only
// by design, not duplicated on the character sheet.
export default function PersonaHeader({ character, touch }) {
  const persona = character.gearManager.persona;
  const deviceMode = character.gearManager.deviceMode;
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);

  const handleNameChange = (name) => {
    character.gearManager.setPersona({ name });
    touch();
  };
  const handleDescriptionChange = (iconDescription) => {
    character.gearManager.setPersona({ iconDescription });
    touch();
  };
  const handleSilentToggle = () => {
    character.gearManager.setPersona({ runningSilent: !persona.runningSilent });
    touch();
  };
  const handleModeChange = (mode) => {
    character.gearManager.setDeviceMode(mode);
    touch();
  };
  const handleIconSelect = (iconId) => {
    character.gearManager.setPersona({ iconId });
    touch();
  };

  return (
    <div className="sr-pan-persona">
      <button
        className="sr-pan-persona-face"
        onClick={() => setAvatarPickerOpen(true)}
        title="Choose an icon"
      >
        {persona.iconId != null && AVATAR_URLS[persona.iconId] ? (
          <img src={AVATAR_URLS[persona.iconId]} alt="Persona icon" className="sr-pan-persona-face-img" />
        ) : (
          (persona.name || '?').charAt(0).toUpperCase()
        )}
      </button>
      <div className="sr-pan-persona-fields">
        <input
          type="text"
          className="sr-number-input sr-pan-persona-name"
          placeholder="Persona name"
          value={persona.name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <input
          type="text"
          className="sr-number-input sr-pan-persona-desc"
          placeholder="Icon description (flavor)"
          value={persona.iconDescription}
          onChange={(e) => handleDescriptionChange(e.target.value)}
        />
        <div className="sr-pan-persona-controls">
          <button
            className={persona.runningSilent ? 'sr-btn sr-btn--secondary sr-pan-silent--on' : 'sr-btn sr-btn--secondary'}
            onClick={handleSilentToggle}
          >
            {persona.runningSilent ? 'Running Silent' : 'Not Running Silent'}
          </button>
          <select className="sr-number-input" value={deviceMode} onChange={(e) => handleModeChange(e.target.value)}>
            {DEVICE_MODES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {avatarPickerOpen && (
        <AvatarPickerModal
          currentIconId={persona.iconId}
          onSelect={handleIconSelect}
          onClose={() => setAvatarPickerOpen(false)}
        />
      )}
    </div>
  );
}
