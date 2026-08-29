import { useState } from 'react';

import { commitPurchase, commitFreeGrab } from '@utils/gearPurchase';
import { formatCost } from '@utils/gearFormat';
import PurchaseModal from '@components/PurchaseModal';

import './marketBrowseModal.css';

// Generic, reusable — takes only character/items/touch/onClose, no
// vehicle- or attach-flow-specific knowledge at all. Meant to stack ON
// TOP of whatever picker opened it, not replace it: buying here closes
// just this modal, and the picker underneath re-derives its own list
// straight from character.gearManager.gear on its next render (same
// "recompute, don't cache" instinct as everywhere else in this app),
// so the newly-bought item just appears as attachable automatically —
// no explicit refresh wiring needed, just calling touch() to trigger
// the re-render.
//
// Deliberately no character/vehicle pricing context here — that
// question got scoped down separately (Body-scaled items like Ram
// Plate resolve their own dynamic cost through PurchaseModal's
// ratingLabel mechanism regardless of where this modal was opened
// from, no context-passing needed for that to work).
//
// `items` is caller-supplied — whoever opens this decides what's
// relevant to show (all Additions, upgrades sorted Preferred-first for
// a specific housing, every item matching a Storage Unit's preferred
// categories, or just an arbitrary Market slice for some future,
// non-vehicle use of this same component).
export default function MarketBrowseModal({ character, items, touch, onClose }) {
  const [purchaseItem, setPurchaseItem] = useState(null);

  return (
    <div className="sr-modal-backdrop" onClick={onClose}>
      <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sr-modal-header">
          <h3 className="sr-modal-title">Browse Market</h3>
          <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {items.length === 0 ? (
          <p className="sr-market-browse-hint">Nothing to show here.</p>
        ) : (
          <div className="sr-market-browse-list">
            {items.map((item) => (
              <div key={item.id} className="sr-market-browse-row">
                <span>{item.label}</span>
                <span className="sr-market-browse-cost">{formatCost(item)}</span>
                <button className="sr-btn sr-btn--primary" onClick={() => setPurchaseItem(item)}>Buy</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {purchaseItem && (
        <PurchaseModal
          item={purchaseItem}
          character={character}
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
    </div>
  );
}
