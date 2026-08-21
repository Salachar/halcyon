import { ALL_GEAR } from '@data/gear';
import { useCharacterManager } from '@hooks/useCharacterManager';

import './weaponAttachModal.css';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Lists owned, unattached weapon_accessory instances — tap one to
// attach it. No mount-compatibility filtering: we don't have reliable
// structured data on which mounts a given weapon supports (only a few
// item descriptions mention it in prose), so this stays informational,
// same scope call as the mount-count summary on GearList. The player
// decides what makes sense; nothing here enforces it.
export default function WeaponAttachModal({ character, weaponInstanceId, onClose }) {
  const { touch } = useCharacterManager();

  const available = Object.entries(character.gearManager.gear).filter(([, entry]) => {
    const item = ALL_GEAR[entry.itemId];
    return item?.category === 'weapon_accessory' && !entry.attachedTo;
  });

  const handleAttach = (accessoryInstanceId) => {
    character.gearManager.attach(accessoryInstanceId, weaponInstanceId);
    touch();
    onClose();
  };

  return (
    <div className="sr-modal-backdrop" onClick={onClose}>
      <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sr-modal-header">
          <h3 className="sr-modal-title">Attach Accessory</h3>
          <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {available.length === 0 ? (
          <p className="sr-attach-empty">No unattached accessories owned — buy one from Gear &gt; Firearms/Explosives first.</p>
        ) : (
          available.map(([instanceId, entry]) => {
            const item = ALL_GEAR[entry.itemId];
            return (
              <div className="sr-attach-row" key={instanceId} onClick={() => handleAttach(instanceId)}>
                <span className="sr-attach-row-name">{item.label}</span>
                <span className="sr-attach-row-mount">{item.mount ? capitalize(item.mount) : 'No specific mount'}</span>
              </div>
            );
          })
        )}

        <div className="sr-modal-actions">
          <button className="sr-btn sr-btn--secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
