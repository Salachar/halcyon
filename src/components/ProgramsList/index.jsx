import { useState } from 'react';

import { ALL_GEAR } from '@data/gear';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { isConsumerFor, wouldExceedCapacity } from '@utils/gearCapacity';
import { MATRIX_CATEGORIES } from '@utils/panGrouping';
import ConfirmationModal from '@components/ConfirmationModal';

import './programsList.css';

// Consumer-centric view of every owned Program/Tac-App — the inverse
// of CapacityAttachModal's housing-centric picker. The problem this
// solves: buying a Program and then having no way to load it without
// leaving the Matrix tab for the character sheet's GearList was a real
// hurdle, not just an inconvenience. Lists every matrix-pool consumer
// the character owns, shows which device (if any) currently houses it,
// and lets you Load/Move/Unload directly from here.
//
// "Move" reuses the same capacity soft-gate as everywhere else — if
// the destination is already full, a ConfirmationModal confirms before
// proceeding, never blocks.
export default function ProgramsList({ character }) {
  const { touch } = useCharacterManager();
  const [pickerFor, setPickerFor] = useState(null); // instanceId of the program currently choosing a device
  const [pendingConfirm, setPendingConfirm] = useState(null); // { programId, housingId, message }

  const gear = character.gearManager.gear;
  const programs = Object.entries(gear).filter(([, entry]) => isConsumerFor(ALL_GEAR[entry.itemId], 'matrix'));
  const matrixHousings = Object.entries(gear).filter(([, entry]) => MATRIX_CATEGORIES.includes(ALL_GEAR[entry.itemId]?.category));

  if (programs.length === 0) {
    return <p className="sr-pl-hint">No Programs or Tac-Apps owned yet.</p>;
  }

  const attachTo = (programId, housingId) => {
    const programItem = ALL_GEAR[gear[programId].itemId];
    const housingEntry = gear[housingId];
    const housingItem = ALL_GEAR[housingEntry.itemId];
    const existingAttachments = character.gearManager.attachmentsOf(housingId)
      .map(([, e]) => ({ item: ALL_GEAR[e.itemId], config: e.config }));

    const overCapacity = wouldExceedCapacity(
      housingItem, housingEntry.config, existingAttachments, programItem, gear[programId].config, 'matrix'
    );
    if (overCapacity) {
      setPendingConfirm({
        programId, housingId,
        message: `This puts ${housingItem.label} over Program Slots. Attach anyway?`,
      });
      return;
    }
    doAttach(programId, housingId);
  };

  const doAttach = (programId, housingId) => {
    character.gearManager.attach(programId, housingId);
    touch();
    setPickerFor(null);
    setPendingConfirm(null);
  };

  const detach = (programId) => {
    character.gearManager.detach(programId);
    touch();
  };

  return (
    <div className="sr-programs-list">
      {programs.map(([id, entry]) => {
        const item = ALL_GEAR[entry.itemId];
        const housingId = entry.attachedTo;
        const housingItem = housingId ? ALL_GEAR[gear[housingId]?.itemId] : null;

        return (
          <div key={id} className="sr-pl-row">
            <div className="sr-pl-row-main">
              <div>
                <span className="sr-pl-row-name">{item.label}</span>
                <span className={housingItem ? 'sr-pl-row-status sr-pl-row-status--loaded' : 'sr-pl-row-status'}>
                  {housingItem ? `Loaded on ${housingItem.label}` : 'Unloaded'}
                </span>
              </div>
              <div className="sr-pl-row-actions">
                <button className="sr-btn sr-btn--secondary" onClick={() => setPickerFor((prev) => (prev === id ? null : id))}>
                  {housingItem ? 'Move' : 'Load'}
                </button>
                {housingItem && (
                  <button className="sr-btn sr-btn--secondary" onClick={() => detach(id)}>Unload</button>
                )}
              </div>
            </div>

            {pickerFor === id && (
              <div className="sr-pl-picker">
                {matrixHousings.length === 0 ? (
                  <p className="sr-pl-hint">No commlink, cyberdeck, M-TOC, or RCC owned yet.</p>
                ) : (
                  matrixHousings.map(([hId, hEntry]) => (
                    <button
                      key={hId}
                      className="sr-btn sr-btn--secondary"
                      disabled={hId === housingId}
                      onClick={() => attachTo(id, hId)}
                    >
                      {ALL_GEAR[hEntry.itemId].label}
                    </button>
                  ))
                )}
                <button className="sr-btn sr-btn--secondary" onClick={() => setPickerFor(null)}>Cancel</button>
              </div>
            )}
          </div>
        );
      })}

      {pendingConfirm && (
        <ConfirmationModal
          open
          title="Over Program Slots"
          message={pendingConfirm.message}
          confirmLabel="Attach Anyway"
          cancelLabel="Cancel"
          onConfirm={() => doAttach(pendingConfirm.programId, pendingConfirm.housingId)}
          onCancel={() => setPendingConfirm(null)}
        />
      )}
    </div>
  );
}
