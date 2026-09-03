import { useState } from 'react';

import MarketSection from '@components/MarketSection';
import PurchaseModal from '@components/PurchaseModal';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';
import { formatAvailability, formatCost } from '@utils/gearFormat';
import { formatHandling, formatSeats, formatAcceleration, formatSpeedInterval, formatTopSpeed, formatLength } from '@utils/vehicleGearFormat';
import { gearByTag } from '@utils/gearTags';
import '@styles/gearBuyButton.css';

// Migrated onto MarketSection (Table/Card/Carousel switching) — the
// proving ground for that component before the other 11 Market tabs
// get the same treatment. Sectioning/partitioning logic below is
// completely unchanged from before; only the render primitive swapped
// from CollapsibleSection+GearTable to MarketSection, which wraps both
// internally and adds the view-mode toggle in the same header slot.
//
// EVERY CATEGORY IS ITS OWN TOP-LEVEL SECTION. There are no "Boats"
// and "Submarines" wrappers — the roster is 73 vessels, and burying
// fourteen categories two levels deep meant two clicks to reach
// anything. The old `gear-water-boats` and `gear-water-subs` ids are
// therefore gone; any persisted open/closed state stored against them
// is orphaned and can be cleared.
//
// The `boat` and `submarine` tags still exist on the data and still do
// real work here — they decide which section list an item is drawn
// from, which keeps a stray subcategory tag from cross-contaminating
// the other group. They just no longer correspond to anything the user
// sees.
//
// The wrinkle these sections solve: subcategory tags are deliberately
// NOT mutually exclusive. The Lurssen Mobius is genuinely both a ship
// and a yacht; the Wavecutter MPAC is a motorboat by hull class and a
// patrol craft by purpose; the Cutty Sark II is a sailing ship. Eleven
// boats carry two subcategory tags, so rendering one section per tag
// would show those rows twice, each with its own live buy button.
//
// `priority` resolves that: every item is claimed by the lowest-
// numbered section whose tag it carries, and appears there only.
// Priority is independent of array order, which is display order and
// runs roughly small to large before descending into the water. The two
// orders genuinely differ — Yachts displays fifth but claims second, so
// the Sovereign-Class and the Mobius land under Yachts instead of being
// swallowed by Ships.
//
// Anything carrying a group tag but no subcategory tag falls into an
// "Unsorted" section that renders only when non-empty. Without it, a
// vessel added later as just ['boat'] would silently vanish from the
// page rather than showing up somewhere obvious enough to notice.

const BOAT_SECTIONS = [
  { tag: 'personal_watercraft', id: 'gear-water-personal', title: 'Personal Watercraft', priority: 9 },
  { tag: 'powerboat', id: 'gear-water-powerboats', title: 'Powerboats', priority: 6 },
  { tag: 'sailboat', id: 'gear-water-sailboats', title: 'Sailboats', priority: 4 },
  { tag: 'motorboat', id: 'gear-water-motorboats', title: 'Motorboats', priority: 5 },
  { tag: 'yacht', id: 'gear-water-yachts', title: 'Yachts', priority: 2 },
  { tag: 'working_craft', id: 'gear-water-working', title: 'Working & Industrial Craft', priority: 7 },
  { tag: 'patrol_craft', id: 'gear-water-patrol', title: 'Patrol Craft & Corvettes', priority: 1 },
  { tag: 'ship', id: 'gear-water-ships', title: 'Ships', priority: 3 },
  { tag: 'semi_sub', id: 'gear-water-semisubs', title: 'Semi-Submersibles', priority: 8 },
];

const SUBMARINE_SECTIONS = [
  { tag: 'dpv', id: 'gear-water-dpvs', title: 'Diver Propulsion Vehicles', priority: 1 },
  { tag: 'minisub', id: 'gear-water-minisubs', title: 'Minisubs', priority: 2 },
  { tag: 'submersible', id: 'gear-water-submersibles', title: 'Submersibles', priority: 3 },
  { tag: 'cargo_sub', id: 'gear-water-cargosubs', title: 'Cargo Submarines', priority: 4 },
  { tag: 'attack_sub', id: 'gear-water-attacksubs', title: 'Attack Submarines', priority: 5 },
];

// gearByTag does no ordering of its own (confirmed: it's just
// Object.values(ALL_GEAR).filter(...)), so items came out in whatever
// order watercraft.js declared them — an authorial/thematic sequence,
// not price or alphabetical. Sorting each bucket by cost here instead.
function partitionByTag(groupTag, sections) {
  const byPriority = [...sections].sort((a, b) => a.priority - b.priority);
  const buckets = new Map(sections.map((s) => [s.tag, []]));
  const unsorted = [];
  for (const item of gearByTag(groupTag)) {
    const home = byPriority.find((s) => item.tags?.includes(s.tag));
    if (home) buckets.get(home.tag).push(item);
    else unsorted.push(item);
  }
  for (const bucket of buckets.values()) {
    bucket.sort((a, b) => a.cost - b.cost);
  }
  unsorted.sort((a, b) => a.cost - b.cost);
  return { buckets, unsorted };
}

export default function GearWatercraft({ character, vehicle }) {
  const [purchaseItem, setPurchaseItem] = useState(null);
  const { touch } = useCharacterManager();

  const buyColumn = {
    label: '',
    render: (item) => {
      const owned = character?.gearManager?.countOf(item.id) ?? 0;
      const affordable = canAffordItem(character, item);
      return (
        <div className="sr-gear-buy-cell">
          <button
            className={affordable ? 'sr-buy-btn' : 'sr-buy-btn sr-buy-btn--unaffordable'}
            onClick={() => setPurchaseItem(item)}
            title={`Buy ${item.label}`}
          >
            $
          </button>
          {owned > 0 && <span className="sr-gear-owned-badge">×{owned}</span>}
        </div>
      );
    },
  };

  const vehicleColumns = [
    { label: 'Vessel', render: (i) => i.label },
    { label: 'Length', render: formatLength },
    { label: 'Handling', render: formatHandling },
    { label: 'Accel', render: formatAcceleration },
    { label: 'Speed Int.', render: formatSpeedInterval },
    { label: 'Top Speed', render: formatTopSpeed },
    { label: 'Body', render: (i) => i.stats.body },
    { label: 'Armor', render: (i) => i.stats.armor },
    { label: 'Slots', render: (i) => i.stats.additionCapacityProvided ?? '—' },
    { label: 'Pilot', render: (i) => i.stats.pilot ?? '—' },
    { label: 'Sensor', render: (i) => i.stats.sensor ?? '—' },
    { label: 'Seats', render: formatSeats },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];

  const boats = partitionByTag('boat', BOAT_SECTIONS);
  const submarines = partitionByTag('submarine', SUBMARINE_SECTIONS);

  const renderSections = ({ buckets, unsorted }, sections, unsortedId) => (
    <>
      {sections.map(({ tag, id, title }) => {
        const items = buckets.get(tag);
        if (!items.length) return null;
        return (
          <MarketSection
            key={tag}
            id={id}
            title={title}
            items={items}
            columns={vehicleColumns}
            renderBuyButton={buyColumn.render}
          />
        );
      })}
      {unsorted.length > 0 && (
        <MarketSection
          id={unsortedId}
          title="Unsorted"
          items={unsorted}
          columns={vehicleColumns}
          renderBuyButton={buyColumn.render}
        />
      )}
    </>
  );

  return (
    <>
      {renderSections(boats, BOAT_SECTIONS, 'gear-water-boats-unsorted')}
      {renderSections(submarines, SUBMARINE_SECTIONS, 'gear-water-subs-unsorted')}

      {purchaseItem && (
        <PurchaseModal
          item={purchaseItem}
          character={character}
          vehicle={vehicle}
          onClose={() => setPurchaseItem(null)}
          onPurchase={(purchase) => {
            commitPurchase(character, purchaseItem, purchase);
            touch();
            setPurchaseItem(null);
          }}
          onFreeGrab={(purchase) => {
            commitFreeGrab(character, purchaseItem, purchase);
            touch();
            setPurchaseItem(null);
          }}
        />
      )}
    </>
  );
}
