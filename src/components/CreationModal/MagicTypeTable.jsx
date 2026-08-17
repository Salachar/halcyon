import '@components/MetatypeTable/metatypeTable.css';

const MAGIC_TYPES = ['full', 'aspected', 'adept', 'mysticAdept', 'technomancer', 'mundane'];

const MAGIC_TYPE_LABELS = {
  full: 'Full Magician',
  aspected: 'Aspected Magician',
  adept: 'Adept',
  mysticAdept: 'Mystic Adept',
  technomancer: 'Technomancer',
  mundane: 'Mundane',
};

const MAGIC_TYPE_DESCRIPTIONS = {
  full: 'Casts and summons across all three schools. Spells known = Magic × 2.',
  aspected: 'Locked to one magical skill (Sorcery, Conjuring, or Enchanting) permanently — +1 Magic over Full at the same row as compensation.',
  adept: 'No spellcasting or summoning. Power points = Magic, spent on Adept Powers.',
  mysticAdept: 'Splits Magic between adept powers and spells — chosen at creation.',
  technomancer: 'Resonance instead of Magic. Complex forms known = Resonance × 2.',
  mundane: 'No Magic or Resonance at all. Only legal at Priority row E.',
};

// Same always-visible-with-dimming pattern as MetatypeTable. `magicRow` is
// PRIORITY_TABLE[assignedRow] or null if nothing's assigned yet — before
// that, every type shows its description with no value and nothing dims.
export default function MagicTypeTable({ magicRow }) {
  return (
    <table className="sr-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Description</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {MAGIC_TYPES.map((type) => {
          let unavailable = false;
          let value = '—';

          if (magicRow) {
            const rowGrantsMagic = magicRow.magicResonance != null;
            if (type === 'mundane') {
              unavailable = rowGrantsMagic; // mundane only legal when the row is E (grants nothing)
            } else {
              unavailable = !rowGrantsMagic; // every other type needs a real Magic/Resonance value
              value = rowGrantsMagic ? magicRow.magicResonance[type] : '—';
            }
          }

          return (
            <tr key={type} className={unavailable ? 'sr-priority-row--unavailable' : ''}>
              <td>{MAGIC_TYPE_LABELS[type]}</td>
              <td className="sr-table-cell-note">{MAGIC_TYPE_DESCRIPTIONS[type]}</td>
              <td>{value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
