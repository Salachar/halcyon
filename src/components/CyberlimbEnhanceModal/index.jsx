import { useState } from 'react';

import { ALL_GEAR } from '@data/gear';
import { useCharacterManager } from '@hooks/useCharacterManager';
import PurchaseModal from '@components/PurchaseModal';
import ConfirmationModal from '@components/ConfirmationModal';
import { commitPurchase, commitFreeGrab } from '@utils/gearPurchase';
import { wouldExceedCapacity } from '@utils/gearCapacity';

// Thin wrapper around PurchaseModal for the "Enhance a specific owned
// limb" flow — pre-fills the rating at "next" instead of the item's raw
// minimum, and on success replaces whatever was already attached of
// this type (no leftovers — that's the whole point of "Enhance" over a
// normal purchase) before attaching the new instance to the limb.
// Works identically whether the enhancement is bought or found for free
// — both paths call the same replace-then-attach logic.
//
// Capacity check added: soft-gate only, matching the "honorbound"
// philosophy — never blocks the enhancement, just confirms first if it
// would put the limb over its Cyberware Capacity. The replaced
// attachment (existingInstanceId) is excluded from the "currently
// used" total before checking, since it's about to be removed either
// way — otherwise every Enhance would double-count against its own
// predecessor's usage.
export default function CyberlimbEnhanceModal({ character, limbInstanceId, enhancementItemId, nextRating, existingInstanceId, onClose }) {
  const { touch } = useCharacterManager();
  const item = ALL_GEAR[enhancementItemId];
  const limbEntry = character.gearManager.gear[limbInstanceId];
  const limbItem = limbEntry ? ALL_GEAR[limbEntry.itemId] : null;
  const [pendingConfirm, setPendingConfirm] = useState(null); // { purchase, commitFn }

  if (!item) return null;

  const applyReplacement = (newInstanceId) => {
    if (!newInstanceId) return;
    if (existingInstanceId) character.gearManager.remove(existingInstanceId);
    character.gearManager.attach(newInstanceId, limbInstanceId);
    touch();
    onClose();
  };

  const otherAttachments = limbItem
    ? character.gearManager.attachmentsOf(limbInstanceId)
        .filter(([instanceId]) => instanceId !== existingInstanceId)
        .map(([, entry]) => ({ item: ALL_GEAR[entry.itemId], config: entry.config }))
    : [];

  const handleCommit = (purchase, commitFn) => {
    if (limbItem) {
      const overCapacity = wouldExceedCapacity(
        limbItem, limbEntry.config, otherAttachments, item, purchase, 'cyberware'
      );
      if (overCapacity) {
        setPendingConfirm({ purchase, commitFn });
        return;
      }
    }
    applyReplacement(commitFn(character, item, purchase));
  };

  const handleConfirmOverCapacity = () => {
    const { purchase, commitFn } = pendingConfirm;
    applyReplacement(commitFn(character, item, purchase));
    setPendingConfirm(null);
  };

  return (
    <>
      <PurchaseModal
        item={item}
        character={character}
        initialConfig={{ rating: nextRating }}
        onClose={onClose}
        onPurchase={(purchase) => handleCommit(purchase, commitPurchase)}
        onFreeGrab={(purchase) => handleCommit(purchase, commitFreeGrab)}
      />

      {pendingConfirm && limbItem && (
        <ConfirmationModal
          open
          title="Over Capacity"
          message={`This puts ${limbItem.label} over Capacity. Attach anyway?`}
          confirmLabel="Attach Anyway"
          cancelLabel="Cancel"
          onConfirm={handleConfirmOverCapacity}
          onCancel={() => setPendingConfirm(null)}
        />
      )}
    </>
  );
}
