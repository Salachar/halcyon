import { ModalSmall } from '@components/Modal';
import NoiseTracker from '@components/NoiseTracker';

// Thin wrapper — NoiseTracker itself is completely unchanged internally,
// same "consolidate into a header-triggered modal without touching the
// working component" relationship EdgeModal has to Edge. Noise moved
// into the persistent header because it represents ambient/
// environmental interference (Vehicle Additions, Augments, and Gear
// can all shift it) rather than something scoped only to active
// Matrix work — universally relevant, same reasoning Edge/Nuyen
// already earned their spot on.
export default function NoiseModal({ open, character, onClose }) {
  return (
    <ModalSmall open={open} onClose={onClose} title="Noise">
      <NoiseTracker character={character} />
    </ModalSmall>
  );
}
