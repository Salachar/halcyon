import { ALL_GEAR } from '@data/gear';
import { useCharacterManager } from '@hooks/useCharacterManager';
import PurchaseModal from '@components/PurchaseModal';
import { commitPurchase, commitFreeGrab } from '@utils/gearPurchase';

// Thin wrapper around PurchaseModal for the "Enhance a specific owned
// limb" flow — pre-fills the rating at "next" instead of the item's raw
// minimum, and on success replaces whatever was already attached of
// this type (no leftovers — that's the whole point of "Enhance" over a
// normal purchase) before attaching the new instance to the limb.
// Works identically whether the enhancement is bought or found for free
// — both paths call the same replace-then-attach logic.
export default function CyberlimbEnhanceModal({ character, limbInstanceId, enhancementItemId, nextRating, existingInstanceId, onClose }) {
  const { touch } = useCharacterManager();
  const item = ALL_GEAR[enhancementItemId];
  if (!item) return null;

  const applyReplacement = (newInstanceId) => {
    if (!newInstanceId) return;
    if (existingInstanceId) character.gearManager.remove(existingInstanceId);
    character.gearManager.attach(newInstanceId, limbInstanceId);
    touch();
    onClose();
  };

  return (
    <PurchaseModal
      item={item}
      character={character}
      initialConfig={{ rating: nextRating }}
      onClose={onClose}
      onPurchase={(purchase) => applyReplacement(commitPurchase(character, item, purchase))}
      onFreeGrab={(purchase) => applyReplacement(commitFreeGrab(character, item, purchase))}
    />
  );
}
