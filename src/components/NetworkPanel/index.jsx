import { useState } from 'react';

import { ALL_GEAR } from '@data/gear';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { DEVICE_STATUSES } from '@data/GearManager';

import './networkPanel.css';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const DEVICE_CATEGORIES = ['commlink', 'cyberdeck'];

// Commlinks/cyberdecks always sort first within whichever list they're
// in — an unselected second commlink sitting in the slavable list reads
// clearly as "the other option," not buried among ordinary accessories.
function sortDevicesFirst(entries) {
  return [...entries].sort((a, b) => {
    const aIsDevice = DEVICE_CATEGORIES.includes(ALL_GEAR[a[1].itemId]?.category);
    const bIsDevice = DEVICE_CATEGORIES.includes(ALL_GEAR[b[1].itemId]?.category);
    if (aIsDevice === bIsDevice) return 0;
    return aIsDevice ? -1 : 1;
  });
}

// Dash for "this device doesn't have this attribute," not 0 — matches
// the confirmed rule ("0 for any attribute the device lacks") but reads
// as "absent" rather than "present but zero," which is a real
// distinction worth preserving visually.
function PanStat({ label, value }) {
  return (
    <div className="sr-pan-stat">
      <span className="sr-pan-stat-label">{label}</span>
      <span className={value != null ? 'sr-pan-stat-value' : 'sr-pan-stat-value sr-pan-stat-value--absent'}>
        {value != null ? value : '—'}
      </span>
    </div>
  );
}

function StatusBadges({ status }) {
  if (status.length === 0) return null;
  return (
    <div className="sr-pan-status-badges">
      {status.map((key) => <span key={key} className="sr-pan-status-badge">{capitalize(key)}</span>)}
    </div>
  );
}

function StatusExpand({ expanded, status, onToggle }) {
  if (!expanded) return null;
  return (
    <div className="sr-pan-status-expand">
      {DEVICE_STATUSES.map((s) => (
        <label key={s.key} className="sr-pan-status-option">
          <input type="checkbox" checked={status.includes(s.key)} onChange={() => onToggle(s.key)} />
          {s.label}
        </label>
      ))}
    </div>
  );
}

// One row in the Slaved or Slavable list. `secondaryLabel`/`onSecondary`
// is "Slave" in the slavable list, "Unslave" in the slaved list — same
// row shape, different action available. Status marking only appears
// on things actually networked (this row only renders it when
// `showStatus` is true, i.e. never for slavable/unconnected devices —
// a hacker targets what's connected, not a spare commlink in a pocket).
function PanDeviceRow({ character, instanceId, entry, showStatus, onPromote, secondaryLabel, onSecondary, expandedId, setExpandedId, touch }) {
  const item = ALL_GEAR[entry.itemId];
  if (!item) return null;
  const stats = item.stats || {};
  const status = character.gearManager.getDeviceStatus(instanceId);
  const expanded = expandedId === instanceId;
  const isDevice = DEVICE_CATEGORIES.includes(item.category);

  const handleToggleStatus = (statusKey) => {
    character.gearManager.toggleDeviceStatus(instanceId, statusKey);
    touch();
  };

  return (
    <div className="sr-pan-row">
      <div className="sr-pan-row-main">
        <div className="sr-pan-row-identity">
          <div className="sr-pan-row-name">{item.label}</div>
          {isDevice && (
            <div className="sr-pan-row-stats">
              <span className="sr-pan-row-stat">ATK <strong>{stats.attack ?? '—'}</strong></span>
              <span className="sr-pan-row-stat">SLZ <strong>{stats.sleaze ?? '—'}</strong></span>
              <span className="sr-pan-row-stat">DP <strong>{stats.dataProcessing ?? '—'}</strong></span>
              <span className="sr-pan-row-stat">FW <strong>{stats.firewall ?? '—'}</strong></span>
            </div>
          )}
          {showStatus && <StatusBadges status={status} />}
        </div>
        <div className="sr-pan-row-actions">
          {isDevice && <button className="sr-btn sr-btn--secondary" onClick={onPromote}>Make Primary</button>}
          <button className="sr-btn sr-btn--secondary" onClick={onSecondary}>{secondaryLabel}</button>
          {showStatus && (
            <button className="sr-icon-btn" onClick={() => setExpandedId((prev) => (prev === instanceId ? null : instanceId))} title="Status">⚙</button>
          )}
        </div>
      </div>
      {showStatus && <StatusExpand expanded={expanded} status={status} onToggle={handleToggleStatus} />}
    </div>
  );
}

// PAN — a single Primary device up top (name, real A/S/D/F with dashes
// for whatever it lacks, Remote Device Limit from its Data Processing),
// then two lists: Slaved (networked now) and Slavable (owned, wireless,
// not yet networked — commlinks/decks always sort first in both). No
// Slaved-PAN nesting, no redundant Persona-as-Master row — dissolved
// into this single flat structure per the redesign. The Matrix
// Condition Monitor lives here too, since its max is derived from
// whichever device is currently Primary, not a fixed attribute —
// hidden entirely for technomancers, whose Matrix damage already lands
// on their ordinary Stun track.
export default function NetworkPanel({ character }) {
  const { touch } = useCharacterManager();
  const [expandedId, setExpandedId] = useState(null);

  const gear = character.gearManager.gear;
  const pan = character.gearManager.pan;
  const primaryEntry = pan.masterId ? gear[pan.masterId] : null;
  const primaryItem = primaryEntry ? ALL_GEAR[primaryEntry.itemId] : null;

  const slavedEntries = sortDevicesFirst(
    pan.slaved.map((id) => [id, gear[id]]).filter(([, e]) => e)
  );
  const slavableEntries = sortDevicesFirst(
    Object.entries(gear).filter(([id, entry]) => {
      if (id === pan.masterId || pan.slaved.includes(id)) return false;
      return ALL_GEAR[entry.itemId]?.wireless === true;
    })
  );

  const handlePromote = (instanceId) => {
    character.gearManager.setPanMaster(instanceId);
    touch();
  };
  const handleSlave = (instanceId) => {
    character.gearManager.addSlavedDevice(instanceId);
    touch();
  };
  const handleUnslave = (instanceId) => {
    character.gearManager.removeSlavedDevice(instanceId);
    touch();
  };
  const handleToggleStatus = (instanceId, statusKey) => {
    character.gearManager.toggleDeviceStatus(instanceId, statusKey);
    touch();
  };
  const handleMatrixDamageChange = (value) => {
    character.gearManager.matrixDamage = value;
    touch();
  };

  const isTechnomancer = character.magicType === 'technomancer';
  const matrixMax = character.gearManager.matrixMonitorMax;
  const matrixDamage = character.gearManager.matrixDamage;
  const primaryStatus = pan.masterId ? character.gearManager.getDeviceStatus(pan.masterId) : [];
  const primaryExpanded = expandedId === pan.masterId;

  return (
    <div className="sr-pan">
      {primaryItem ? (
        <div className="sr-pan-header">
          <div className="sr-pan-header-top">
            <div>
              <div className="sr-pan-header-name">{primaryItem.label}</div>
              <div className="sr-pan-header-role">Primary Device</div>
            </div>
            <button className="sr-icon-btn" onClick={() => setExpandedId((prev) => (prev === pan.masterId ? null : pan.masterId))} title="Status">⚙</button>
          </div>

          <div className="sr-pan-header-stats">
            <PanStat label="Attack" value={primaryItem.stats?.attack} />
            <PanStat label="Sleaze" value={primaryItem.stats?.sleaze} />
            <PanStat label="Data Proc" value={primaryItem.stats?.dataProcessing} />
            <PanStat label="Firewall" value={primaryItem.stats?.firewall} />
          </div>

          <div className="sr-pan-header-limit">
            Remote Device Limit: <strong>{primaryItem.stats?.dataProcessing ?? 0}</strong>
          </div>

          <StatusBadges status={primaryStatus} />
          <StatusExpand
            expanded={primaryExpanded}
            status={primaryStatus}
            onToggle={(key) => handleToggleStatus(pan.masterId, key)}
          />

          {!isTechnomancer && matrixMax > 0 && (
            <div className="sr-pan-mcm">
              <div className="sr-pan-mcm-head">
                <span className="sr-pan-mcm-label">Matrix Condition Monitor</span>
                <span className="sr-pan-mcm-count">{matrixDamage}/{matrixMax}</span>
              </div>
              <div className="sr-pan-mcm-rows">
                {Array.from({ length: matrixMax }, (_, i) => {
                  const filled = i < matrixDamage;
                  const isLastFilled = filled && i === matrixDamage - 1;
                  return (
                    <button
                      key={i}
                      className={filled ? 'sr-pan-mcm-box sr-pan-mcm-box--filled' : 'sr-pan-mcm-box'}
                      onClick={() => handleMatrixDamageChange(isLastFilled ? matrixDamage - 1 : i + 1)}
                      title={`Mark up to box ${i + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="sr-pan-hint">No Primary device set — promote a commlink or cyberdeck from the Slavable list below.</p>
      )}

      <div className="sr-pan-section-title">Slaved ({slavedEntries.length})</div>
      {slavedEntries.length === 0 ? (
        <p className="sr-pan-hint">Nothing slaved yet.</p>
      ) : (
        slavedEntries.map(([id, entry]) => (
          <PanDeviceRow
            key={id}
            character={character}
            instanceId={id}
            entry={entry}
            showStatus
            onPromote={() => handlePromote(id)}
            secondaryLabel="Unslave"
            onSecondary={() => handleUnslave(id)}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            touch={touch}
          />
        ))
      )}

      <div className="sr-pan-section-title">Slavable</div>
      {slavableEntries.length === 0 ? (
        <p className="sr-pan-hint">No wireless devices available to slave.</p>
      ) : (
        slavableEntries.map(([id, entry]) => (
          <PanDeviceRow
            key={id}
            character={character}
            instanceId={id}
            entry={entry}
            showStatus={false}
            onPromote={() => handlePromote(id)}
            secondaryLabel="Slave"
            onSecondary={() => handleSlave(id)}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            touch={touch}
          />
        ))
      )}
    </div>
  );
}
