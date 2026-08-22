import { useState } from 'react';

import { ALL_GEAR } from '@data/gear';
import { useCharacterManager } from '@hooks/useCharacterManager';
import ConfirmationModal from '@components/ConfirmationModal';
import { isConsumerFor, wouldExceedCapacity, cyberwareFamilyOf } from '@utils/gearCapacity';
import { needsInstallChoice } from '@utils/augmentationEconomy';

import './capacityAttachModal.css';

// Generic attach flow shared by all three capacity pools — lists owned,
// unattached items that consume the given pool (identified purely by
// presence of the {pool}CapacityUsed[PerRating] stat), tap one to
// attach. Soft-gates on capacity via ConfirmationModal, same
// "honorbound" pattern as CyberlimbEnhanceModal and everywhere else —
// never blocks, just confirms first if it would put the housing over
// Capacity.
//
// Cyberware gets one extra filter armor/device don't need: real
// anatomical sub-families (eyeware/earware/cyberlimb) within the same
// Capacity pool, so a Smartlink implant only offers to attach to
// Cybereyes, not an arm — see cyberwareFamilyOf in gearCapacity.js.
//
// Unlike WeaponAttachModal (which stays purely informational — no
// structured mount-capacity data exists to check against), this DOES
// enforce a soft check, since Capacity is real structured data now.
export default function CapacityAttachModal({ character, housingInstanceId, pool, onClose }) {
  const { touch } = useCharacterManager();
  const housingEntry = character.gearManager.gear[housingInstanceId];
  const housingItem = housingEntry ? ALL_GEAR[housingEntry.itemId] : null;
  const [pendingConfirm, setPendingConfirm] = useState(null); // { instanceId }

  if (!housingItem) return null;

  // Cyberware is the one pool with real anatomical sub-families
  // (eyeware/earware/cyberlimb) that shouldn't cross-attach even though
  // they share one Capacity type — a Smartlink implant belongs in
  // Cybereyes, not an arm. null means the housing has no known family
  // (shouldn't happen for real cyberware housings, but if it does,
  // don't apply a filter that would just hide everything).
  const housingFamily = pool === 'cyberware' ? cyberwareFamilyOf(housingItem) : null;

  const available = Object.entries(character.gearManager.gear).filter(([, entry]) => {
    if (entry.attachedTo) return false;
    const item = ALL_GEAR[entry.itemId];
    if (!isConsumerFor(item, pool)) return false;
    if (housingFamily && cyberwareFamilyOf(item) !== housingFamily) return false;
    // Items with a flesh/cyberlimb install choice (Cyber Implant Weapons)
    // only belong in this list if THIS specific instance was actually
    // bought for cyberlimb installation. A flesh-installed one already
    // paid its Essence and is done — it has no relationship to a limb's
    // Capacity and shouldn't be attachable to one at all.
    if (pool === 'cyberware' && needsInstallChoice(item) && entry.config?.installLocation !== 'cyberlimb') {
      return false;
    }
    return true;
  });

  const existingAttachments = character.gearManager.attachmentsOf(housingInstanceId)
    .map(([, entry]) => ({ item: ALL_GEAR[entry.itemId], config: entry.config }));

  const attachInstance = (instanceId) => {
    character.gearManager.attach(instanceId, housingInstanceId);
    touch();
    onClose();
  };

  const handleSelect = (instanceId, entry) => {
    const item = ALL_GEAR[entry.itemId];
    const overCapacity = wouldExceedCapacity(
      housingItem, housingEntry.config, existingAttachments, item, entry.config, pool
    );
    if (overCapacity) {
      setPendingConfirm({ instanceId });
      return;
    }
    attachInstance(instanceId);
  };

  return (
    <>
      <div className="sr-modal-backdrop" onClick={onClose}>
        <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
          <div className="sr-modal-header">
            <h3 className="sr-modal-title">Attach to {housingItem.label}</h3>
            <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
          </div>

          {available.length === 0 ? (
            <p className="sr-cap-attach-empty">
              {housingFamily
                ? `No unattached ${housingFamily} accessories owned.`
                : 'No unattached compatible items owned.'}
            </p>
          ) : (
            available.map(([instanceId, entry]) => {
              const item = ALL_GEAR[entry.itemId];
              return (
                <div className="sr-cap-attach-row" key={instanceId} onClick={() => handleSelect(instanceId, entry)}>
                  <span className="sr-cap-attach-row-name">{item.label}</span>
                </div>
              );
            })
          )}

          <div className="sr-modal-actions">
            <button className="sr-btn sr-btn--secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      {pendingConfirm && (
        <ConfirmationModal
          open
          title="Over Capacity"
          message={`This puts ${housingItem.label} over Capacity. Attach anyway?`}
          confirmLabel="Attach Anyway"
          cancelLabel="Cancel"
          onConfirm={() => { attachInstance(pendingConfirm.instanceId); setPendingConfirm(null); }}
          onCancel={() => setPendingConfirm(null)}
        />
      )}
    </>
  );
}
