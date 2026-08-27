import { useState } from 'react';

import { ALL_GEAR } from '@data/gear';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { computeCapacity, wouldExceedCapacity } from '@utils/gearCapacity';
import CapacityAttachModal from '@components/CapacityAttachModal';
import ConfirmationModal from '@components/ConfirmationModal';
import Dice from '@components/Dice';
import {
  speedIntervalPenalty, effectiveHandling,
  vehicleAttackRating, vehicleDefenseRating,
  arrayCompositedStats, arrayConditionMonitorBonus,
  nativeUpgradeCapacity, isPreferredForStorage, isPreferredForAddition,
} from '@utils/vehicleEconomy';

import './ownedVehiclesList.css';

const CONTROL_MODES = [
  { key: '', label: 'No Driver' },
  { key: 'remote', label: 'Remote' },
  { key: 'jumped-in', label: 'Jumped In' },
  { key: 'manual', label: 'Manual' },
];

function isVehicleLike(item) {
  return item?.category === 'vehicle' || item?.category === 'drone';
}

// Cargo mode — a dead-end summary card for anything sitting inside
// someone's storage. Deliberately never expands into its own tree,
// no matter how outfitted it actually is underneath (a fully-loaded
// warship stored on a lift shows exactly the same simple card as an
// empty one) — Active mode only ever applies to top-level owned
// vehicles. "Take Out of Storage" (detach) is the only way back to
// Active mode; drilling into a stored vehicle's own configuration
// in-place is a deliberate future layer, not part of this build.
function CargoCard({ character, instanceId, item, touch }) {
  const stats = item.stats || {};

  const takeOut = () => {
    character.gearManager.detach(instanceId);
    touch();
  };

  return (
    <div className="sr-cargo-card">
      <div className="sr-cargo-card-header">
        <span className="sr-cargo-card-name">{item.label}</span>
        <button className="sr-btn sr-btn--secondary" onClick={takeOut}>Take Out of Storage</button>
      </div>
      <div className="sr-cargo-card-stats">
        {stats.handling && <span>Handling {stats.handling.onRoad}{stats.handling.offRoad != null ? `/${stats.handling.offRoad}` : ''}</span>}
        {stats.body != null && <span>Body {stats.body}</span>}
        {stats.armor != null && <span>Armor {stats.armor}</span>}
        {stats.pilot != null && <span>Pilot {stats.pilot}</span>}
        {stats.sensor != null && <span>Sensor {stats.sensor}</span>}
      </div>
    </div>
  );
}

// Whatever's currently attached to a Storage Unit — a plain gear item
// gets a simple row, anything vehicle-like gets the full CargoCard
// (dead-end, never expands).
function StoredContentsList({ character, storageInstanceId, touch }) {
  const contents = character.gearManager.attachmentsOf(storageInstanceId);
  if (contents.length === 0) return null;

  const detach = (childId) => {
    character.gearManager.detach(childId);
    touch();
  };

  return (
    <div className="sr-storage-contents">
      {contents.map(([id, e]) => {
        const item = ALL_GEAR[e.itemId];
        return isVehicleLike(item) ? (
          <CargoCard key={id} character={character} instanceId={id} item={item} touch={touch} />
        ) : (
          <div key={id} className="sr-storage-item-row">
            <span>{item.label}</span>
            <button className="sr-btn sr-btn--secondary" onClick={() => detach(id)}>Remove</button>
          </div>
        );
      })}
    </div>
  );
}

// Generic Storage attach — split Preferred/Other via
// isPreferredForStorage (vehicleEconomy.js), same intended/unintended
// instinct as cyberware. Never capacity-gated; nothing here checks a
// count or confirms an overflow, since Storage was deliberately built
// with no cap at all.
function StorageAttachPicker({ character, storageInstanceId, storageItem, touch, onClose }) {
  const owned = Object.entries(character.gearManager.gear).filter(([id, e]) => !e.attachedTo && id !== storageInstanceId);
  const preferred = owned.filter(([, e]) => isPreferredForStorage(storageItem, ALL_GEAR[e.itemId]));
  const other = owned.filter(([, e]) => !isPreferredForStorage(storageItem, ALL_GEAR[e.itemId]));

  const attach = (childId) => {
    character.gearManager.attach(childId, storageInstanceId);
    touch();
    onClose();
  };

  return (
    <div className="sr-modal-backdrop" onClick={onClose}>
      <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sr-modal-header">
          <h3 className="sr-modal-title">Store Item — {storageItem.label}</h3>
          <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {preferred.length > 0 && (
          <div className="sr-storage-picker-group">
            <div className="sr-storage-picker-group-title">Preferred</div>
            {preferred.map(([id, e]) => (
              <button key={id} className="sr-btn sr-btn--secondary" onClick={() => attach(id)}>{ALL_GEAR[e.itemId].label}</button>
            ))}
          </div>
        )}
        {other.length > 0 && (
          <div className="sr-storage-picker-group sr-storage-picker-group--other">
            <div className="sr-storage-picker-group-title">Other</div>
            {other.map(([id, e]) => (
              <button key={id} className="sr-btn sr-btn--secondary" onClick={() => attach(id)}>{ALL_GEAR[e.itemId].label}</button>
            ))}
          </div>
        )}
        {preferred.length === 0 && other.length === 0 && <p className="sr-veh-hint">No unattached items owned yet.</p>}
      </div>
    </div>
  );
}

// One row for an attached Upgrade — flatDicePool gets an inline Dice
// roller (Valkyrie Module), and if the upgrade is ITSELF a Storage
// Unit (Weapon Rack, Drone Racks), its own attach/contents render
// nested right underneath. This is the only "nesting" that exists —
// Upgrades can't take further Additions or Upgrades of their own,
// which is what keeps the whole tree from ever needing true recursion.
function UpgradeRow({ character, upgradeInstanceId, item, touch }) {
  const [showStoragePicker, setShowStoragePicker] = useState(false);
  const isStorage = item.stats?.storagePreferredCategories != null || item.tags?.includes('drone_rack') || item.id === 'weapon_rack';

  const detach = () => {
    character.gearManager.detach(upgradeInstanceId);
    touch();
  };

  return (
    <div className="sr-fu-row-block">
      <div className="sr-fu-row">
        <div className="sr-fu-row-main">
          <span>{item.label}</span>
          {item.stats?.flatDicePool != null && (
            <Dice pool={{ total: item.stats.flatDicePool, components: [{ label: item.label, value: item.stats.flatDicePool }] }} />
          )}
        </div>
        <div className="sr-fu-row-actions">
          {isStorage && (
            <button className="sr-btn sr-btn--secondary" onClick={() => setShowStoragePicker((v) => !v)}>Store Item</button>
          )}
          <button className="sr-btn sr-btn--secondary" onClick={detach}>Detach</button>
        </div>
      </div>

      {isStorage && showStoragePicker && (
        <StorageAttachPicker
          character={character}
          storageInstanceId={upgradeInstanceId}
          storageItem={item}
          touch={touch}
          onClose={() => setShowStoragePicker(false)}
        />
      )}
      {isStorage && <StoredContentsList character={character} storageInstanceId={upgradeInstanceId} touch={touch} />}
    </div>
  );
}

// The Comms/Sensor Array's OWN special display — ASDF rotation and CM
// (with the module redundancy bonus). Program Slots/attach still use
// the Matrix Capacity pool unchanged; CSMs and other upgrades go
// through the generic Upgrade pool below instead, shown via the same
// AdditionUpgradesPanel every other Addition uses.
function CommsSensorArrayPanel({ character, arrayInstanceId, touch }) {
  const [attachingProgram, setAttachingProgram] = useState(false);

  const arrayEntry = character.gearManager.gear[arrayInstanceId];
  const arrayItem = ALL_GEAR[arrayEntry.itemId];
  const stats = arrayCompositedStats(character, arrayInstanceId);
  const cmBonus = arrayConditionMonitorBonus(character, arrayInstanceId);
  const cmMax = character.gearManager.matrixMonitorMaxFor(arrayInstanceId) + cmBonus;
  const cmDamage = character.gearManager.getDeviceDamage(arrayInstanceId);

  const adjustCmDamage = (delta) => {
    character.gearManager.setDeviceDamage(arrayInstanceId, cmDamage + delta, cmMax);
    touch();
  };

  const programAttachments = character.gearManager.attachmentsOf(arrayInstanceId)
    .filter(([, e]) => !ALL_GEAR[e.itemId]?.tags?.includes('addition_upgrade'))
    .map(([, e]) => ({ item: ALL_GEAR[e.itemId], config: e.config }));
  const programCapacity = computeCapacity(arrayItem, arrayEntry.config, programAttachments, 'matrix');

  const detachProgram = (childInstanceId) => {
    character.gearManager.detach(childInstanceId);
    touch();
  };

  return (
    <div className="sr-csa-panel">
      <div className="sr-csa-header">
        <span className="sr-csa-title">Comms/Sensor Array</span>
        <span className="sr-csa-stats">ASDF {stats.attack}/{stats.sleaze}/{stats.dataProcessing}/{stats.firewall}</span>
      </div>
      <div className="sr-csa-substats">
        <span className="sr-csa-cm-controls">
          CM:
          <button className="sr-icon-btn" onClick={() => adjustCmDamage(-1)}>−</button>
          <strong>{cmDamage}</strong>/{cmMax}
          <button className="sr-icon-btn" onClick={() => adjustCmDamage(1)}>+</button>
          {cmBonus > 0 && <span className="sr-csa-cm-bonus-note">(base + {cmBonus} from modules)</span>}
        </span>
        <span>Program Slots: {programCapacity.used}/{programCapacity.provided}</span>
      </div>

      <div className="sr-csa-actions">
        <button className="sr-btn sr-btn--secondary" onClick={() => setAttachingProgram(true)}>Attach Program</button>
      </div>

      {programAttachments.length > 0 && (
        <div className="sr-csa-attached-list">
          {character.gearManager.attachmentsOf(arrayInstanceId)
            .filter(([, e]) => !ALL_GEAR[e.itemId]?.tags?.includes('addition_upgrade'))
            .map(([id, e]) => (
              <div key={id} className="sr-csa-attached-row">
                <span>{ALL_GEAR[e.itemId].label}</span>
                <button className="sr-btn sr-btn--secondary" onClick={() => detachProgram(id)}>Detach</button>
              </div>
            ))}
        </div>
      )}

      {attachingProgram && (
        <CapacityAttachModal
          character={character}
          housingInstanceId={arrayInstanceId}
          pool="matrix"
          onClose={() => setAttachingProgram(false)}
        />
      )}
    </div>
  );
}

// Generic Upgrade attach/display for any Addition (or, via the
// separate NativeUpgradePanel below, the vehicle itself). Soft-gated
// through CapacityAttachModal exactly like every other Capacity pool —
// confirms rather than blocks on overflow.
// Upgrade attach — same Preferred/Other split as Storage
// (isPreferredForAddition, vehicleEconomy.js), matched against
// additionType rather than category/tags. Deliberately NOT
// CapacityAttachModal — that component has no concept of "preferred
// for this specific housing," it just lists every valid consumer
// flat. Soft-gated the same way CapacityAttachModal already is
// (confirm-then-proceed on overflow, via wouldExceedCapacity) — this
// duplicates that one piece of logic rather than sharing it, since
// building the actual Preferred/Other split into CapacityAttachModal
// itself would need touching a component this session doesn't have a
// safe local copy of.
function UpgradeAttachPicker({ character, housingInstanceId, housingItem, touch, onClose, nativeCapacity }) {
  const [pendingOverflow, setPendingOverflow] = useState(null);

  const owned = Object.entries(character.gearManager.gear).filter(([id, e]) => {
    return !e.attachedTo && ALL_GEAR[e.itemId]?.tags?.includes('addition_upgrade');
  });
  const preferred = owned.filter(([, e]) => isPreferredForAddition(housingItem, ALL_GEAR[e.itemId]));
  const other = owned.filter(([, e]) => !isPreferredForAddition(housingItem, ALL_GEAR[e.itemId]));

  const doAttach = (upgradeInstanceId) => {
    character.gearManager.attach(upgradeInstanceId, housingInstanceId);
    touch();
    onClose();
  };

  const attach = (upgradeInstanceId) => {
    const upgradeEntry = character.gearManager.gear[upgradeInstanceId];
    const upgradeItem = ALL_GEAR[upgradeEntry.itemId];

    // nativeCapacity is passed for the vehicle's own native Upgrade
    // pool (Rigger Cocoon's case) — its provided/used are computed,
    // not a literal stat on the vehicle item, so wouldExceedCapacity
    // (which reads housingItem.stats.upgradeCapacityProvided directly)
    // can't be used for that case at all — it would read undefined and
    // incorrectly flag every attach as over capacity.
    let overCapacity;
    if (nativeCapacity) {
      const cost = upgradeItem.stats?.upgradeCapacityUsed || 0;
      overCapacity = nativeCapacity.used + cost > nativeCapacity.provided;
    } else {
      const housingEntry = character.gearManager.gear[housingInstanceId];
      const existingAttachments = character.gearManager.attachmentsOf(housingInstanceId)
        .filter(([, e]) => ALL_GEAR[e.itemId]?.tags?.includes('addition_upgrade'))
        .map(([, e]) => ({ item: ALL_GEAR[e.itemId], config: e.config }));
      overCapacity = wouldExceedCapacity(
        housingItem, housingEntry?.config, existingAttachments, upgradeItem, upgradeEntry.config, 'upgrade'
      );
    }

    if (overCapacity) {
      setPendingOverflow({ upgradeInstanceId, message: `This puts ${housingItem.label} over its Upgrade Capacity. Attach anyway?` });
      return;
    }
    doAttach(upgradeInstanceId);
  };

  return (
    <div className="sr-modal-backdrop" onClick={onClose}>
      <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sr-modal-header">
          <h3 className="sr-modal-title">Attach Upgrade — {housingItem.label}</h3>
          <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {preferred.length > 0 && (
          <div className="sr-storage-picker-group">
            <div className="sr-storage-picker-group-title">Preferred</div>
            {preferred.map(([id, e]) => (
              <button key={id} className="sr-btn sr-btn--secondary" onClick={() => attach(id)}>{ALL_GEAR[e.itemId].label}</button>
            ))}
          </div>
        )}
        {other.length > 0 && (
          <div className="sr-storage-picker-group sr-storage-picker-group--other">
            <div className="sr-storage-picker-group-title">Other</div>
            {other.map(([id, e]) => (
              <button key={id} className="sr-btn sr-btn--secondary" onClick={() => attach(id)}>{ALL_GEAR[e.itemId].label}</button>
            ))}
          </div>
        )}
        {preferred.length === 0 && other.length === 0 && <p className="sr-veh-hint">No unattached upgrades owned yet.</p>}
      </div>

      {pendingOverflow && (
        <ConfirmationModal
          open
          title="Over Upgrade Capacity"
          message={pendingOverflow.message}
          confirmLabel="Attach Anyway"
          cancelLabel="Cancel"
          onConfirm={() => doAttach(pendingOverflow.upgradeInstanceId)}
          onCancel={() => setPendingOverflow(null)}
        />
      )}
    </div>
  );
}

function AdditionUpgradesPanel({ character, housingInstanceId, touch }) {
  const [attaching, setAttaching] = useState(false);

  const housingEntry = character.gearManager.gear[housingInstanceId];
  const housingItem = ALL_GEAR[housingEntry.itemId];
  const attachments = character.gearManager.attachmentsOf(housingInstanceId)
    .filter(([, e]) => ALL_GEAR[e.itemId]?.tags?.includes('addition_upgrade'))
    .map(([id, e]) => ({ id, item: ALL_GEAR[e.itemId], config: e.config }));
  const capacity = computeCapacity(housingItem, housingEntry.config, attachments, 'upgrade');

  return (
    <div className="sr-fu-panel">
      <div className="sr-fu-header">
        <span className="sr-fu-title">Upgrades</span>
        <span className="sr-fu-capacity">{capacity.used}/{capacity.provided}</span>
        <button className="sr-btn sr-btn--secondary" onClick={() => setAttaching(true)}>Attach Upgrade</button>
      </div>

      {attachments.length > 0 && (
        <div className="sr-fu-list">
          {attachments.map(({ id, item }) => (
            <UpgradeRow key={id} character={character} upgradeInstanceId={id} item={item} touch={touch} />
          ))}
        </div>
      )}

      {attaching && (
        <UpgradeAttachPicker
          character={character}
          housingInstanceId={housingInstanceId}
          housingItem={housingItem}
          touch={touch}
          onClose={() => setAttaching(false)}
        />
      )}
    </div>
  );
}

// Every vehicle's own native Upgrade Capacity — computed, not stored
// (nativeUpgradeCapacity, vehicleEconomy.js). This is what Rigger
// Cocoon attaches through now that Cockpit isn't a purchasable
// Addition — a cockpit is something every vehicle already has, not
// new capability being installed. Same CapacityAttachModal reused,
// just pointed at the vehicle instance itself as the "housing" — the
// modal only cares about isConsumerFor(item, 'upgrade') matching, it
// doesn't care whether the housing's provided-capacity came from a
// stored stat or a computed function.
function NativeUpgradePanel({ character, vehicleInstanceId, vehicleItem, touch }) {
  const [attaching, setAttaching] = useState(false);
  const capacity = nativeUpgradeCapacity(character, vehicleInstanceId);
  const attachments = character.gearManager.attachmentsOf(vehicleInstanceId)
    .filter(([, e]) => !ALL_GEAR[e.itemId]?.tags?.includes('addition') && ALL_GEAR[e.itemId]?.stats?.upgradeCapacityUsed != null);

  return (
    <div className="sr-fu-panel">
      <div className="sr-fu-header">
        <span className="sr-fu-title">Vehicle Upgrades (native)</span>
        <span className="sr-fu-capacity">{capacity.used}/{capacity.provided}</span>
        <button className="sr-btn sr-btn--secondary" onClick={() => setAttaching(true)}>Attach Upgrade</button>
      </div>

      {attachments.length > 0 && (
        <div className="sr-fu-list">
          {attachments.map(([id, e]) => (
            <UpgradeRow key={id} character={character} upgradeInstanceId={id} item={ALL_GEAR[e.itemId]} touch={touch} />
          ))}
        </div>
      )}

      {attaching && (
        <UpgradeAttachPicker
          character={character}
          housingInstanceId={vehicleInstanceId}
          housingItem={vehicleItem}
          nativeCapacity={capacity}
          touch={touch}
          onClose={() => setAttaching(false)}
        />
      )}
    </div>
  );
}

// One owned vehicle/drone's live state — Condition Monitor, current
// speed (auto-computing the Speed Interval penalty), and control mode.
// Attack/Defense Rating assume the OWNING character is the driver,
// using their own Piloting rank — a reasonable default, not a hard
// rule.
//
// Additions are rendered generically now — Medbay, Armory, Comms/
// Sensor Array, and Hardpoints all flow through the exact same block,
// each showing its own Upgrades (and, if it's itself a Storage Unit,
// its own attach/contents). Vehicle Bay is no longer special-cased at
// all — it's just an Addition that happens to be a Storage Unit
// preferring vehicles/drones, same mechanism as a Weapon Rack
// preferring firearms.
function VehicleRow({ character, instanceId, entry, touch, onAttachAddition }) {
  const item = ALL_GEAR[entry.itemId];
  const state = character.gearManager.getVehicleState(instanceId);
  const maxCM = character.gearManager.vehicleMonitorMaxFor(instanceId);
  const damage = state.conditionMonitorDamage ?? 0;
  const speed = state.currentSpeed ?? 0;
  const controlMode = state.controlMode ?? '';

  const isGroundVehicle = item.stats?.handling?.offRoad != null;
  const [roadType, setRoadType] = useState('onRoad');

  const baseEffectiveHandling = effectiveHandling(item, roadType, damage);
  const siPenalty = speedIntervalPenalty(item, speed);
  const finalHandling = baseEffectiveHandling != null ? Math.max(0, baseEffectiveHandling - siPenalty) : null;

  const pilotingRank = character.getSkillRank('piloting');
  const ar = vehicleAttackRating(item, pilotingRank);
  const dr = vehicleDefenseRating(item, pilotingRank);

  const additionAttachments = character.gearManager.attachmentsOf(instanceId)
    .filter(([, e]) => ALL_GEAR[e.itemId]?.tags?.includes('addition'));

  const update = (updates) => {
    character.gearManager.setVehicleState(instanceId, updates);
    touch();
  };

  return (
    <div className="sr-veh-row">
      <div className="sr-veh-row-header">
        <span className="sr-veh-row-name">{item.label}</span>
        <select className="sr-number-input" value={controlMode} onChange={(e) => update({ controlMode: e.target.value })}>
          {CONTROL_MODES.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}
        </select>
      </div>

      <div className="sr-veh-stats-grid">
        <div className="sr-veh-stat">
          <span className="sr-veh-stat-label">Condition Monitor</span>
          <div className="sr-veh-cm-controls">
            <button className="sr-icon-btn" onClick={() => update({ conditionMonitorDamage: Math.max(0, damage - 1) })}>−</button>
            <span className="sr-veh-stat-value">{damage}/{maxCM}</span>
            <button className="sr-icon-btn" onClick={() => update({ conditionMonitorDamage: Math.min(maxCM, damage + 1) })}>+</button>
          </div>
        </div>

        <div className="sr-veh-stat">
          <span className="sr-veh-stat-label">Current Speed (m/round)</span>
          <input
            type="number"
            className="sr-number-input"
            value={speed}
            onChange={(e) => update({ currentSpeed: Math.max(0, Number(e.target.value)) })}
            min={0}
          />
          {siPenalty > 0 && <span className="sr-veh-penalty-note">−{siPenalty} to Handling/Attack tests</span>}
        </div>

        <div className="sr-veh-stat">
          <span className="sr-veh-stat-label">
            Handling{isGroundVehicle ? ` (${roadType === 'onRoad' ? 'On-Road' : 'Off-Road'})` : ''}
          </span>
          <span className="sr-veh-stat-value">{finalHandling ?? '—'}</span>
          {isGroundVehicle && (
            <button className="sr-btn sr-btn--secondary" onClick={() => setRoadType((r) => (r === 'onRoad' ? 'offRoad' : 'onRoad'))}>
              Switch to {roadType === 'onRoad' ? 'Off-Road' : 'On-Road'}
            </button>
          )}
        </div>

        <div className="sr-veh-stat">
          <span className="sr-veh-stat-label">Attack / Defense Rating</span>
          <span className="sr-veh-stat-value">{ar ?? '—'} / {dr ?? '—'}</span>
          <span className="sr-veh-stat-note">Using your own Piloting rank ({pilotingRank}) — override if someone else is driving.</span>
        </div>
      </div>

      <NativeUpgradePanel character={character} vehicleInstanceId={instanceId} vehicleItem={item} touch={touch} />

      <div className="sr-veh-additions">
        <div className="sr-veh-additions-header">
          <span className="sr-veh-additions-title">Additions</span>
          <button className="sr-btn sr-btn--secondary" onClick={() => onAttachAddition(instanceId)}>Attach Addition</button>
        </div>

        {additionAttachments.map(([facId, facEntry]) => {
          const facItem = ALL_GEAR[facEntry.itemId];
          const isArray = facEntry.itemId === 'comms_sensor_array';
          return (
            <AdditionBlock
              key={facId}
              character={character}
              additionInstanceId={facId}
              additionItem={facItem}
              isArray={isArray}
              touch={touch}
            />
          );
        })}
      </div>
    </div>
  );
}

// Split out so each Addition block can hold its own local storage-
// picker toggle state (React hooks can't live inside a .map callback
// directly).
function AdditionBlock({ character, additionInstanceId, additionItem, isArray, touch }) {
  const [showStoragePicker, setShowStoragePicker] = useState(false);
  const isStorage = additionItem?.stats?.storagePreferredCategories != null;

  const removeAddition = () => {
    character.gearManager.detach(additionInstanceId);
    touch();
  };

  return (
    <div className="sr-veh-facility-block">
      <div className="sr-veh-facility-block-header">
        <span className="sr-veh-facility-block-title">{additionItem.label}</span>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {isStorage && (
            <button className="sr-btn sr-btn--secondary" onClick={() => setShowStoragePicker((v) => !v)}>Store Item</button>
          )}
          <button className="sr-btn sr-btn--secondary" onClick={removeAddition}>Remove Addition</button>
        </div>
      </div>
      {isArray && <CommsSensorArrayPanel character={character} arrayInstanceId={additionInstanceId} touch={touch} />}
      <AdditionUpgradesPanel character={character} housingInstanceId={additionInstanceId} touch={touch} />
      {isStorage && showStoragePicker && (
        <StorageAttachPicker
          character={character}
          storageInstanceId={additionInstanceId}
          storageItem={additionItem}
          touch={touch}
          onClose={() => setShowStoragePicker(false)}
        />
      )}
      {isStorage && <StoredContentsList character={character} storageInstanceId={additionInstanceId} touch={touch} />}
    </div>
  );
}

export default function OwnedVehiclesList({ character }) {
  const { touch } = useCharacterManager();
  const [attachContext, setAttachContext] = useState(null); // vehicle instanceId currently attaching an Addition to

  // Top-level only — a stored vehicle shows as a CargoCard under
  // whatever Storage Unit holds it, not also as its own top-level row.
  const vehicles = Object.entries(character.gearManager.gear).filter(([, entry]) => {
    const item = ALL_GEAR[entry.itemId];
    return item && isVehicleLike(item) && !entry.attachedTo;
  });

  if (vehicles.length === 0) {
    return <p className="sr-veh-hint">No vehicles or drones owned yet — buy one from the Vehicles Market tab.</p>;
  }

  return (
    <div className="sr-owned-vehicles">
      {vehicles.map(([instanceId, entry]) => (
        <VehicleRow
          key={instanceId}
          character={character}
          instanceId={instanceId}
          entry={entry}
          touch={touch}
          onAttachAddition={setAttachContext}
        />
      ))}

      {attachContext && (
        <CapacityAttachModal
          character={character}
          housingInstanceId={attachContext}
          pool="addition"
          onClose={() => setAttachContext(null)}
        />
      )}
    </div>
  );
}
