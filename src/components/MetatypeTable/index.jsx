import { METATYPES, METATYPE_IDS } from '@data/character/metatypes';
import { QUALITIES } from '@data/character/qualities';

import './metatypeTable.css';

function formatRacialQuality(entry) {
  const quality = QUALITIES[entry.qualityId];
  const label = quality?.label ?? entry.qualityId;
  return entry.level ? `${label} ${entry.level}` : label;
}

function formatRange([min, max]) {
  return `${min}–${max}`;
}

// Compact comparison table — all 5 metatypes always shown. Reference-only
// use (Shadowrunners page): pass nothing, nothing dims. Creation-flow use:
// pass `availableMetatypes` once a Priority row's assigned, and rows not
// in that list dim to 60% opacity — still readable, clearly not selectable.
export default function MetatypeTable({ availableMetatypes }) {
  return (
    <table className="sr-table sr-metatype-table">
      <thead>
        <tr>
          <th>Metatype</th>
          <th>Unique Abilities</th>
          <th>Body</th>
          <th>Agility</th>
          <th>Reaction</th>
          <th>Strength</th>
          <th>Willpower</th>
          <th>Logic</th>
          <th>Intuition</th>
          <th>Charisma</th>
          <th>Edge</th>
        </tr>
      </thead>
      <tbody>
        {METATYPE_IDS.map((id) => {
          const m = METATYPES[id];
          const isAvailable = !availableMetatypes || availableMetatypes.includes(id);
          return (
            <tr key={id} className={isAvailable ? '' : 'sr-priority-row--unavailable'}>
              <td>{m.label}</td>
              <td className="sr-table-cell-note">
                {m.racialQualities.length > 0 ? m.racialQualities.map(formatRacialQuality).join(', ') : '—'}
              </td>
              <td>{formatRange(m.attributeRanges.body)}</td>
              <td>{formatRange(m.attributeRanges.agility)}</td>
              <td>{formatRange(m.attributeRanges.reaction)}</td>
              <td>{formatRange(m.attributeRanges.strength)}</td>
              <td>{formatRange(m.attributeRanges.willpower)}</td>
              <td>{formatRange(m.attributeRanges.logic)}</td>
              <td>{formatRange(m.attributeRanges.intuition)}</td>
              <td>{formatRange(m.attributeRanges.charisma)}</td>
              <td>{formatRange(m.attributeRanges.edge)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
