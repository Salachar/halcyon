import Market from '@components/Market';

import './marketModal.css';

// Replaces the earlier MarketBrowseModal (a filtered-items-only picker)
// with the real thing — the actual Market, full tabs and search
// included, just wrapped in a modal shell so it can stack on top of
// whatever attach flow opened it. `defaultTab`/`vehicle` pass straight
// through to Market unchanged (see that component for what they do).
//
// Buying here closes nothing automatically except via the modal's own
// close button/backdrop — the picker underneath re-derives its own
// list straight from character.gearManager.gear on its next render, so
// a newly-bought item just appears as attachable once this closes, no
// explicit refresh wiring needed.
export default function MarketModal({ character, defaultTab, vehicle, onClose }) {
  return (
    <div className="sr-modal-backdrop" onClick={onClose}>
      <div className="sr-modal sr-market-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sr-modal-header">
          <h3 className="sr-modal-title">Market</h3>
          <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <Market character={character} defaultTab={defaultTab} vehicle={vehicle} />
      </div>
    </div>
  );
}
