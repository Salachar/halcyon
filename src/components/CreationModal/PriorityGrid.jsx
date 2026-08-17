import { PRIORITY_TABLE, PRIORITY_ROWS } from '@data/character/priority_table';

const CATEGORIES = [
  { key: 'metatype', label: 'Metatype' },
  { key: 'attributes', label: 'Attributes' },
  { key: 'skills', label: 'Skills' },
  { key: 'magicResonance', label: 'Magic/Resonance' },
  { key: 'resources', label: 'Resources' },
];

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function MetatypeCell({ row }) {
  const m = PRIORITY_TABLE[row].metatype;
  return <>{m.availableMetatypes.map(capitalize).join('/')} ({m.adjustmentPoints})</>;
}

function MagicCell({ row }) {
  const m = PRIORITY_TABLE[row].magicResonance;
  if (!m) return <span className="sr-priority-mundane">Mundane only</span>;
  return (
    <div className="sr-priority-magic-stack">
      <div>Full {m.full}</div>
      <div>Aspected {m.aspected}</div>
      <div>Adept {m.adept}</div>
      <div>Mystic {m.mysticAdept}</div>
      <div>Techno {m.technomancer}</div>
    </div>
  );
}

// The full A-E x 5-category reference table. Click a cell to assign that
// row to that category — clicking the already-assigned cell toggles it
// off, cells claimed by another category are disabled. Wide modal makes
// this comfortable to tap directly rather than needing a dropdown.
export default function PriorityGrid({ priorities, usedRows, onAssign }) {
  const handleClick = (categoryKey, row) => {
    const takenByOther = usedRows.includes(row) && priorities[categoryKey] !== row;
    if (takenByOther) return;
    const next = priorities[categoryKey] === row ? null : row;
    onAssign(categoryKey, next);
  };

  return (
    <table className="sr-table sr-priority-grid">
      <thead>
        <tr>
          <th></th>
          {CATEGORIES.map((cat) => (
            <th key={cat.key}>{cat.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {PRIORITY_ROWS.map((row) => (
          <tr key={row}>
            <td className="sr-priority-row-label">{row}</td>
            {CATEGORIES.map((cat) => {
              const isAssigned = priorities[cat.key] === row;
              const takenByOther = usedRows.includes(row) && !isAssigned;
              const className = [
                'sr-priority-cell',
                isAssigned && 'sr-priority-cell--assigned',
                takenByOther && 'sr-priority-cell--taken',
                !takenByOther && 'sr-priority-cell--clickable',
              ].filter(Boolean).join(' ');

              return (
                <td key={cat.key} className={className} onClick={() => handleClick(cat.key, row)}>
                  {cat.key === 'metatype' && <MetatypeCell row={row} />}
                  {cat.key === 'attributes' && `${PRIORITY_TABLE[row].attributePoints} pts`}
                  {cat.key === 'skills' && `${PRIORITY_TABLE[row].skillPoints} pts`}
                  {cat.key === 'magicResonance' && <MagicCell row={row} />}
                  {cat.key === 'resources' && `${PRIORITY_TABLE[row].resources.toLocaleString()}¥`}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
