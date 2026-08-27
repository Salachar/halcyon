import { ALL_GEAR } from '@data/gear';
import { arrayCompositedStats } from '@utils/vehicleEconomy';

import './slaveToVehicleModal.css';

// Lists vehicles from the CHARACTER'S OWN gear that carry a Comms/
// Sensor Array — the only valid slave targets, since the Array is the
// vehicle's actual Matrix presence; a vehicle with no Array attached
// has nothing to offer. Confirmed this stays single-character: a
// player only ever sees vehicles they've bought or been sent a copy
// of themselves, never another party member's — no cross-character
// lookup exists or is needed here. Slaving targets the ARRAY's own
// instance id (via the normal addSlavedDevice mechanism), not the
// vehicle's — the vehicle itself isn't a Matrix device, its Array is.
export default function SlaveToVehicleModal({ character, onSlave, onClose }) {
  const candidates = Object.entries(character.gearManager.gear)
    .filter(([, entry]) => {
      const item = ALL_GEAR[entry.itemId];
      return item && (item.category === 'vehicle' || item.category === 'drone');
    })
    .map(([vehicleId, vehicleEntry]) => {
      const arrayAttachment = character.gearManager.attachmentsOf(vehicleId)
        .find(([, e]) => e.itemId === 'comms_sensor_array');
      if (!arrayAttachment) return null;
      const [arrayInstanceId] = arrayAttachment;
      return {
        vehicleLabel: ALL_GEAR[vehicleEntry.itemId].label,
        arrayInstanceId,
        stats: arrayCompositedStats(character, arrayInstanceId),
      };
    })
    .filter(Boolean);

  return (
    <div className="sr-modal-backdrop" onClick={onClose}>
      <div className="sr-modal sr-stv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sr-modal-header">
          <h3 className="sr-modal-title">Slave to Vehicle</h3>
          <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {candidates.length === 0 ? (
          <p className="sr-stv-hint">No owned vehicles with a Comms/Sensor Array attached yet.</p>
        ) : (
          candidates.map((c) => (
            <div key={c.arrayInstanceId} className="sr-stv-row">
              <div>
                <span className="sr-stv-vehicle-name">{c.vehicleLabel}</span>
                <span className="sr-stv-stats">ASDF {c.stats.attack}/{c.stats.sleaze}/{c.stats.dataProcessing}/{c.stats.firewall}</span>
              </div>
              <button className="sr-btn sr-btn--primary" onClick={() => onSlave(c.arrayInstanceId)}>Slave</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
