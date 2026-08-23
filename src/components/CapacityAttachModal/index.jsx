import { useState } from 'react';

import { ALL_GEAR } from '@data/gear';
import { useCharacterManager } from '@hooks/useCharacterManager';
import ConfirmationModal from '@components/ConfirmationModal';
import { isConsumerFor, wouldExceedCapacity, cyberwareFamilyOf } from '@utils/gearCapacity';
import { needsInstallChoice } from '@utils/augmentationEconomy';

import './capacityAttachModal.css';

const FAMILY_LABELS = {
  eyeware: 'Eyeware',
  earware: 'Earware',
  cyberlimb: 'Cyberlimb Accessories',
};

// Generic attach flow shared by all three capacity pools — lists owned,
// unattached items that consume the given pool (identified purely by
// presence of the {pool}CapacityUsed[PerRating] stat), tap one to
// attach. Soft-gates on capacity via ConfirmationModal, same
// "honorbound" pattern as CyberlimbEnhanceModal and everywhere else —
// never blocks, just confirms first if it would put the housing over
// Capacity.
//
// Cyberware gets one extra soft-gate armor/device don't need: real
// anatomical sub-families (eyeware/earware/cyberlimb) within the same
// Capacity pool — a Smartlink implant belongs in Cybereyes, not an arm.
// Family-matched items list first as "Compatible"; everything else
// still shows, grouped by ITS OWN family under "Other Cyberware,"
// de-emphasized — honorbound, not a hard filter. Selecting a mismatched
// item confirms before attaching, same as the capacity check; if BOTH
// apply, that's one combined message, not two stacked confirmations for
// a single click.
//
// Unlike WeaponAttachModal (which stays purely informational — no
// structured mount-capacity data exists to check against), this DOES
// soft-gate on capacity, since Capacity is real structured data now.
export default function CapacityAttachModal({ character, housingInstanceId, pool, onClose }) {
  const { touch } = useCharacterManager();
  const housingEntry = character.gearManager.gear[housingInstanceId];
  const housingItem = housingEntry ? ALL_GEAR[housingEntry.itemId] : null;
  const [pendingConfirm, setPendingConfirm] = useState(null); // { instanceId, message }

  if (!housingItem) return null;

  const housingFamily = pool === 'cyberware' ? cyberwareFamilyOf(housingItem) : null;

  const allAvailable = Object.entries(character.gearManager.gear).filter(([, entry]) => {
    if (entry.attachedTo) return false;
    const item = ALL_GEAR[entry.itemId];
    if (!isConsumerFor(item, pool)) return false;
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

  // Only cyberware splits into compatible/other — armor and device
  // pools have no family concept, any mod genuinely fits any armor
  // item and any accessory genuinely fits any device housing.
  let compatible = allAvailable;
  const otherByFamily = {};
  if (pool === 'cyberware' && housingFamily) {
    compatible = allAvailable.filter(([, entry]) => cyberwareFamilyOf(ALL_GEAR[entry.itemId]) === housingFamily);
    allAvailable
      .filter(([, entry]) => cyberwareFamilyOf(ALL_GEAR[entry.itemId]) !== housingFamily)
      .forEach(([instanceId, entry]) => {
        const fam = cyberwareFamilyOf(ALL_GEAR[entry.itemId]) || 'other';
        if (!otherByFamily[fam]) otherByFamily[fam] = [];
        otherByFamily[fam].push([instanceId, entry]);
      });
  }

  const existingAttachments = character.gearManager.attachmentsOf(housingInstanceId)
    .map(([, entry]) => ({ item: ALL_GEAR[entry.itemId], config: entry.config }));

  const attachInstance = (instanceId) => {
    character.gearManager.attach(instanceId, housingInstanceId);
    touch();
    onClose();
  };

  const handleSelect = (instanceId, entry) => {
    const item = ALL_GEAR[entry.itemId];
    const familyMismatch = pool === 'cyberware' && housingFamily && cyberwareFamilyOf(item) !== housingFamily;
    const overCapacity = wouldExceedCapacity(
      housingItem, housingEntry.config, existingAttachments, item, entry.config, pool
    );

    if (familyMismatch || overCapacity) {
      let message;
      if (familyMismatch && overCapacity) {
        message = `${item.label} doesn't belong in ${housingItem.label} and would put it over Capacity. Attach anyway?`;
      } else if (familyMismatch) {
        message = `${item.label} doesn't belong in ${housingItem.label}. Attach anyway?`;
      } else {
        message = `This puts ${housingItem.label} over Capacity. Attach anyway?`;
      }
      setPendingConfirm({ instanceId, message });
      return;
    }

    attachInstance(instanceId);
  };

  const renderRow = (instanceId, entry) => {
    const item = ALL_GEAR[entry.itemId];
    return (
      <div className="sr-cap-attach-row" key={instanceId} onClick={() => handleSelect(instanceId, entry)}>
        <span className="sr-cap-attach-row-name">{item.label}</span>
      </div>
    );
  };

  const showFamilySplit = pool === 'cyberware' && housingFamily;
  const otherFamilyKeys = Object.keys(otherByFamily);

  return (
    <>
      <div className="sr-modal-backdrop" onClick={onClose}>
        <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
          <div className="sr-modal-header">
            <h3 className="sr-modal-title">Attach to {housingItem.label}</h3>
            <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
          </div>

          {!showFamilySplit ? (
            allAvailable.length === 0 ? (
              <p className="sr-cap-attach-empty">No unattached compatible items owned.</p>
            ) : (
              allAvailable.map(([instanceId, entry]) => renderRow(instanceId, entry))
            )
          ) : (
            <>
              <div className="sr-cap-attach-section-title">Compatible</div>
              {compatible.length === 0 ? (
                <p className="sr-cap-attach-empty">No attachments owned specifically for {housingItem.label}.</p>
              ) : (
                compatible.map(([instanceId, entry]) => renderRow(instanceId, entry))
              )}

              {otherFamilyKeys.length > 0 && (
                <>
                  <div className="sr-cap-attach-section-title sr-cap-attach-section-title--muted">Other Cyberware</div>
                  {otherFamilyKeys.map((fam) => (
                    <div key={fam}>
                      <div className="sr-cap-attach-subgroup-title">{FAMILY_LABELS[fam] || fam}</div>
                      {otherByFamily[fam].map(([instanceId, entry]) => (
                        <div className="sr-cap-attach-row sr-cap-attach-row--muted" key={instanceId} onClick={() => handleSelect(instanceId, entry)}>
                          <span className="sr-cap-attach-row-name">{ALL_GEAR[entry.itemId].label}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              )}
            </>
          )}

          <div className="sr-modal-actions">
            <button className="sr-btn sr-btn--secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      {pendingConfirm && (
        <ConfirmationModal
          open
          title="Confirm Attachment"
          message={pendingConfirm.message}
          confirmLabel="Attach Anyway"
          cancelLabel="Cancel"
          onConfirm={() => { attachInstance(pendingConfirm.instanceId); setPendingConfirm(null); }}
          onCancel={() => setPendingConfirm(null)}
        />
      )}
    </>
  );
}
