import { ModalSmall } from '@components/Modal';
import OverwatchTracker from '@components/OverwatchTracker';

// Thin wrapper — OverwatchTracker itself is completely unchanged
// internally. Conceptually more Matrix-specific than Noise, but placed
// alongside the other header tokens anyway for consistency.
export default function OverwatchModal({ open, character, onClose }) {
  return (
    <ModalSmall open={open} onClose={onClose} title="Overwatch Score">
      <OverwatchTracker character={character} />
    </ModalSmall>
  );
}
