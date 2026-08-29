import { useState, useMemo } from 'react';

import { GearTable } from '@components/PageComponents';
import { formatCost, formatAvailability } from '@utils/gearFormat';
import { ALL_GEAR } from '@data/gear';

const CATEGORY_LABELS = {
  melee_weapon: 'Melee Weapon', thrown_weapon: 'Thrown Weapon', ammo: 'Ammo',
  armor: 'Armor', firearm: 'Firearm', weapon_accessory: 'Weapon Accessory', explosive: 'Explosive',
  cyberware: 'Cyberware', cyberware_accessory: 'Cyberware Accessory', bioware: 'Bioware',
  biotech: 'Biotech', electronics: 'Electronics', software: 'Software', id_credit: 'ID/Credit',
  tool: 'Tool', optical: 'Optical', sensor_housing: 'Sensor', security: 'Security',
  vehicle: 'Vehicle', drone: 'Drone', vehicle_mod: 'Vehicle Mod',
};

// Searches across every category at once — the person doesn't need to
// know which of the 7 sub-tabs an item lives under. Deliberately simple
// (label + description substring match, generic 3-column result table)
// rather than per-category-aware, since the whole point is not having
// to know the category to find something.
export default function GearSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return Object.values(ALL_GEAR).filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [query]);

  const columns = [
    { label: 'Item', render: (i) => i.label },
    { label: 'Category', render: (i) => CATEGORY_LABELS[i.category] || i.category },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
  ];

  return (
    <div className="sr-gear-search">
      <input
        type="text"
        className="sr-search-input"
        placeholder="Search all gear…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.trim() && (
        results.length > 0 ? (
          <GearTable items={results} columns={columns} />
        ) : (
          <p style={{ color: 'var(--sr-text-dim)', fontSize: '0.85rem' }}>No matches.</p>
        )
      )}
    </div>
  );
}
