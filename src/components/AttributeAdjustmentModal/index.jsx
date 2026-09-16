import { ModalSmall } from '@components/Modal';
import { useCharacterManager } from '@hooks/useCharacterManager';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Minimal, generic — one shared modal for setting ANY attribute's
// persisting adjustment, rather than a separate one per attribute.
// `attr` is null when closed; the modal itself gates on that via
// ModalSmall's own `open` check. Deliberately doesn't touch
// AttributeBox.jsx at all (not loaded this session) — this sits
// entirely outside it, triggered by a wrapper in CharacterHeader.
//
// No range validation on the adjustment value — same reasoning as
// Character.setAttributeAdjustment itself: a permanent adjustment is
// explicitly meant to push past what character creation alone would
// allow (Wired Reflexes-style bonuses routinely exceed metatype caps).
export default function AttributeAdjustmentModal({ character, attr, onClose }) {
  const { touch } = useCharacterManager();

  if (!attr) return null;

  const base = character.getAttribute(attr);
  const adjustment = character.attributeAdjustments[attr] ?? 0;
  const effective = character.getEffectiveAttribute(attr);

  const handleChange = (value) => {
    character.setAttributeAdjustment(attr, value);
    touch();
  };

  return (
    <ModalSmall open onClose={onClose} title={`Adjust ${capitalize(attr)}`}>
      <p className="sr-modal-description">
        Base: <strong>{base}</strong> — this persists across sessions (Wired Reflexes,
        permanent cyberware, a lasting effect), not a one-off situational
        modifier. For a single roll's temporary bonus, use that roll's
        own PoolBuilder modifier instead.
      </p>
      <div className="sr-modal-config">
        <label className="sr-modal-config-label">Adjustment</label>
        <input
          type="number"
          className="sr-number-input"
          value={adjustment}
          onChange={(e) => handleChange(Number(e.target.value) || 0)}
        />
      </div>
      <div className="sr-modal-cost">
        Effective: <strong>{effective}</strong>
      </div>
    </ModalSmall>
  );
}
