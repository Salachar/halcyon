import './attributeBox.css';

// Shared attribute readout, three modes off the same visual shape:
//  - value only (CharacterSheet — a real character's current rating)
//  - value + range + onAdjust (CreationModal's attribute spend step)
//  - range only, no value (MetatypeCard — showing what's possible
//    before any character exists to have a value at all)
export default function AttributeBox({ label, value, range, onAdjust }) {
  const atMax = range && value != null && value === range[1];
  const rangeOnly = value == null && range;

  return (
    <div className={onAdjust ? 'sr-attr-box sr-attr-box--editable' : 'sr-attr-box'}>
      {onAdjust && (
        <button className="sr-icon-btn sr-attr-box-btn" onClick={() => onAdjust(-1)}>−</button>
      )}

      <div className="sr-attr-box-center">
        {rangeOnly ? (
          <div className="sr-attr-box-value sr-attr-box-value--range">{range[0]}–{range[1]}</div>
        ) : (
          <div className={atMax ? 'sr-attr-box-value sr-attr-box-value--max' : 'sr-attr-box-value'}>{value}</div>
        )}
        <div className="sr-attr-box-label">{label}</div>
        {!rangeOnly && range && <div className="sr-attr-box-range">{range[0]}–{range[1]}</div>}
      </div>

      {onAdjust && (
        <button className="sr-icon-btn sr-attr-box-btn" onClick={() => onAdjust(1)}>+</button>
      )}
    </div>
  );
}
