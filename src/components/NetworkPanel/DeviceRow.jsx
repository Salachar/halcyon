import { ALL_GEAR } from '@data/gear';
import { panCategoryOf, PRIMARY_CAPABLE_CATEGORIES } from '@utils/panGrouping';
import { PanStat, StatusChips, StatusExpand, WirelessToggle, DeviceMatrixTrack } from './PanPrimitives';

import './deviceRow.css';

// One device row — used for Slaved, Slavable, Matrix Devices, and for
// nested children under a housing. `depth` adds a small indent + a
// connecting mark for nested items — lighter-weight than a full
// recursive tree. `showStatus` gates status chips + Matrix CM (only
// things actually networked get either — a hacker targets what's
// connected, not a spare commlink in a pocket). `isPrimary` relabels
// "Make Primary" to "Unset Primary" rather than hiding it — setPanMaster
// already toggles off when called on the same instance again, so this
// stays the only, correct way to clear Primary from this list.
//
// showMatrixStats (ASDF row) and canBePrimary (Make/Unset Primary) are
// deliberately SEPARATE checks, not one shared boolean — Cyberjacks are
// panCategoryOf === 'matrix' (they carry real D/F and belong in the
// Matrix Devices zone with their stats visible) but per
// PRIMARY_CAPABLE_CATEGORIES (panGrouping.js) can never be Primary —
// they're a supporting implant, not a standalone persona. Commlinks,
// cyberdecks, RCCs, and M-TOCs all qualify by category, but canBePrimary
// ALSO excludes all of them for a technomancer character specifically
// (see its own inline comment below) — their persona comes from them,
// not from whichever device they happen to be carrying.
//
// `onAttach`, when provided, renders an "Attach" button — lets a
// housing (any of the four Capacity pools, matrix included) accept a
// consumer directly from the PAN/Matrix Devices view, same as GearList
// already does on the character sheet. Parents decide whether to pass
// it (only for depth 0 rows that are actually a housing for something)
// — DeviceRow itself stays pool-agnostic, it just renders what it's
// given, matching how onPromote/onSecondary already work.
export default function DeviceRow({ character, instanceId, entry, showStatus, depth = 0, onPromote, isPrimary, secondaryLabel, onSecondary, onAttach, expandedId, setExpandedId, touch }) {
  const item = ALL_GEAR[entry.itemId];
  if (!item) return null;
  const stats = item.stats || {};
  const showMatrixStats = panCategoryOf(item) === 'matrix';
  // Technomancers are excluded here entirely, not just Living Persona's
  // own category — confirmed: "you'll access the Matrix through your
  // living persona INSTEAD OF a device." That's not a default pick
  // among interchangeable options the way a decker's commlink is; it's
  // how their access fundamentally works. A technomancer who also owns
  // a commlink for other reasons can still slave it in for rotation,
  // it just can never become the thing they access the Matrix through.
  const canBePrimary = PRIMARY_CAPABLE_CATEGORIES.includes(item.category) && character.magicType !== 'technomancer';
  // item.wireless stays checked directly against the catalog for
  // isEffectivelyWireless (GearManager) — that's the real mechanic and
  // it's untouched. This local flag only gates the ON/OFF BUTTON and
  // the dim-when-off styling; Living Persona is excluded from it
  // specifically because there's nothing for a technomancer to
  // meaningfully switch off here (see Running Silent on PersonaHeader
  // for the actual "going quiet" mechanic) — the underlying rotation
  // math still works correctly regardless, since it reads the catalog
  // flag directly, not this variable.
  const isWirelessCapable = item.wireless === true && item.category !== 'living_persona';
  const wirelessOn = character.gearManager.isWirelessOn(instanceId);
  const effectivelyOn = character.gearManager.isEffectivelyWireless(instanceId);
  const status = character.gearManager.getDeviceStatus(instanceId);
  const expanded = expandedId === instanceId;

  const handleToggleWireless = () => {
    character.gearManager.setWirelessOn(instanceId, !wirelessOn);
    touch();
  };
  const handleToggleStatus = (statusKey) => {
    character.gearManager.toggleDeviceStatus(instanceId, statusKey);
    touch();
  };

  const rowClass = [
    'sr-pan-row',
    depth > 0 ? 'sr-pan-row--nested' : '',
    isWirelessCapable && !effectivelyOn ? 'sr-pan-row--dim' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={rowClass} style={depth > 0 ? { marginLeft: `${depth * 1.25}rem` } : undefined}>
      <div className="sr-pan-row-main">
        <div className="sr-pan-row-identity">
          <div className="sr-pan-row-name">
            {depth > 0 && <span className="sr-pan-row-branch">└</span>}
            {item.label}
          </div>
          {showMatrixStats && (
            <div className="sr-pan-row-stats">
              <span className="sr-pan-row-stat">ATK <strong>{stats.attack ?? '—'}</strong></span>
              <span className="sr-pan-row-stat">SLZ <strong>{stats.sleaze ?? '—'}</strong></span>
              <span className="sr-pan-row-stat">DP <strong>{stats.dataProcessing ?? '—'}</strong></span>
              <span className="sr-pan-row-stat">FW <strong>{stats.firewall ?? '—'}</strong></span>
            </div>
          )}
          {stats.wirelessBonus && showStatus && (
            effectivelyOn ? (
              <div className="sr-pan-row-bonus">Wireless bonus: {stats.wirelessBonus}</div>
            ) : (
              <div className="sr-pan-row-bonus sr-pan-row-bonus--inactive">Wireless off — no bonus, not defended by the network</div>
            )
          )}
          {showStatus && <StatusChips status={status} />}
        </div>
        <div className="sr-pan-row-actions">
          {isWirelessCapable && <WirelessToggle on={wirelessOn} onChange={handleToggleWireless} />}
          {canBePrimary && onPromote && <button className="sr-btn sr-btn--secondary" onClick={onPromote}>{isPrimary ? 'Unset Primary' : 'Make Primary'}</button>}
          {onAttach && <button className="sr-btn sr-btn--secondary" onClick={onAttach}>Attach</button>}
          {!isPrimary && <button className="sr-btn sr-btn--secondary" onClick={onSecondary}>{secondaryLabel}</button>}
          {showStatus && (
            <button className="sr-icon-btn" onClick={() => setExpandedId((prev) => (prev === instanceId ? null : instanceId))} title="Status">⚙</button>
          )}
        </div>
      </div>
      {showStatus && <StatusExpand expanded={expanded} status={status} onToggle={handleToggleStatus} />}
      {showStatus && <DeviceMatrixTrack character={character} instanceId={instanceId} touch={touch} />}
    </div>
  );
}
