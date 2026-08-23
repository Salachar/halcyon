import { DEVICE_STATUSES } from '@data/GearManager';
import { ALL_GEAR } from '@data/gear';
import { computeCapacity } from '@utils/gearCapacity';

import './panPrimitives.css';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Dash for "this device doesn't have this attribute," not 0 — matches
// the confirmed rule ("0 for any attribute the device lacks") but reads
// as "absent" rather than "present but zero."
export function PanStat({ label, value }) {
  return (
    <div className="sr-pan-stat">
      <span className="sr-pan-stat-label">{label}</span>
      <span className={value != null ? 'sr-pan-stat-value' : 'sr-pan-stat-value sr-pan-stat-value--absent'}>
        {value != null ? value : '—'}
      </span>
    </div>
  );
}

// Signal-strength framing for Remote Device Limit — a filled gauge
// instead of bare "5/8" text, colored by how full it is.
export function SignalGauge({ used, limit }) {
  if (limit === 0) return null;
  const pct = Math.min(100, (used / limit) * 100);
  const level = used >= limit ? 'full' : pct >= 75 ? 'high' : pct >= 40 ? 'mid' : 'low';
  return (
    <div className="sr-pan-gauge">
      <div className="sr-pan-gauge-label">
        Remote Device Limit <span className="sr-pan-gauge-count">{used}/{limit}</span>
      </div>
      <div className="sr-pan-gauge-track">
        <div className={`sr-pan-gauge-fill sr-pan-gauge-fill--${level}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// Compact icon-style chips for marked/bricked/link-locked — stackable,
// scannable, not a wall of text badges. Real icon art doesn't exist
// yet, so these are short letter chips with a full label in the title
// tooltip — easy to swap for real icons later without touching the
// data model at all.
export function StatusChips({ status }) {
  if (status.length === 0) return null;
  return (
    <div className="sr-pan-status-chips">
      {status.map((key) => {
        const def = DEVICE_STATUSES.find((s) => s.key === key);
        return (
          <span key={key} className={`sr-pan-status-chip sr-pan-status-chip--${key}`} title={def?.label || key}>
            {(def?.label || key).charAt(0)}
          </span>
        );
      })}
    </div>
  );
}

export function StatusExpand({ expanded, status, onToggle }) {
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

// Per-device wireless toggle — only ever rendered by DeviceRow for
// items that are actually wireless: true. Purely physical/Capacity-only
// attachments (a Damper nested under Cyberears) have nothing to turn
// off and correctly get no toggle under that same check.
export function WirelessToggle({ on, onChange }) {
  return (
    <button
      className={on ? 'sr-pan-wireless-toggle sr-pan-wireless-toggle--on' : 'sr-pan-wireless-toggle'}
      onClick={onChange}
      title={on ? 'Wireless on — tap to go dark' : 'Wireless off — tap to reconnect'}
    >
      {on ? 'ON' : 'OFF'}
    </button>
  );
}

// Real "X/Y" Capacity readout for a housing device — same data GearList
// shows on the character sheet (armor/device/cyberware/matrix pools all
// resolve through the same computeCapacity), a separate copy here since
// NetworkPanel stays self-contained rather than reaching into GearList's
// local components. `attachments` should be [instanceId, entry] pairs
// from attachmentsOf, same shape DeviceRow/MatrixDevicesList already
// pass around.
export function PanCapacitySummary({ housingItem, housingConfig, attachments, pool }) {
  const items = attachments.map(([, entry]) => ({ item: ALL_GEAR[entry.itemId], config: entry.config }));
  const { provided, used, overCapacity } = computeCapacity(housingItem, housingConfig, items, pool);
  if (provided === 0 && used === 0) return null;
  return (
    <div className={overCapacity ? 'sr-pan-capacity sr-pan-capacity--over' : 'sr-pan-capacity'}>
      {pool === 'matrix' ? 'Program Slots' : 'Capacity'}: {used}/{provided}{overCapacity ? ' — Over Capacity' : ''}
    </div>
  );
}

// Per-device Matrix Condition Monitor — only for devices with a real
// Device Rating (matrixMonitorMaxFor returns 0 otherwise), independent
// track per device, sized off that device's own rating.
export function DeviceMatrixTrack({ character, instanceId, touch }) {
  const isTechnomancer = character.magicType === 'technomancer';
  const max = character.gearManager.matrixMonitorMaxFor(instanceId);
  if (isTechnomancer || max === 0) return null;

  const damage = character.gearManager.getDeviceDamage(instanceId);
  const handleChange = (value) => {
    character.gearManager.setDeviceDamage(instanceId, value);
    touch();
  };

  return (
    <div className="sr-pan-mcm">
      <div className="sr-pan-mcm-head">
        <span className="sr-pan-mcm-label">Matrix CM</span>
        <span className="sr-pan-mcm-count">{damage}/{max}</span>
      </div>
      <div className="sr-pan-mcm-rows">
        {Array.from({ length: max }, (_, i) => {
          const filled = i < damage;
          const isLastFilled = filled && i === damage - 1;
          return (
            <button
              key={i}
              className={filled ? 'sr-pan-mcm-box sr-pan-mcm-box--filled' : 'sr-pan-mcm-box'}
              onClick={() => handleChange(isLastFilled ? damage - 1 : i + 1)}
              title={`Mark up to box ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
