import { useState } from 'react';

import { useCharacterManager } from '@hooks/useCharacterManager';
import { ACCESS_LEVELS } from '@data/MatrixManager';

import './hackedDevices.css';

// A manual, freeform "little PAN" for devices the player doesn't own —
// no gear linkage, no computed access level. The GM already knows the
// real access level (they run the target), this is purely a memory aid
// across a session where someone's hacked into several things at once.
// Matrix-page-only, unlike NetworkPanel — this has nothing to do with
// the character's own gear/PAN.
export default function HackedDevices({ character }) {
  const { touch } = useCharacterManager();
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [access, setAccess] = useState('outsider');
  const [notes, setNotes] = useState('');

  const devices = character.matrixManager.hackedDevices;

  const handleAccessChange = (id, newAccess) => {
    character.matrixManager.updateHackedDevice(id, { access: newAccess });
    touch();
  };

  const handleRemove = (id) => {
    character.matrixManager.removeHackedDevice(id);
    touch();
  };

  const handleAdd = () => {
    if (!name.trim()) return;
    character.matrixManager.addHackedDevice(name.trim(), access, notes.trim());
    setName('');
    setAccess('outsider');
    setNotes('');
    setAddOpen(false);
    touch();
  };

  const handleCancel = () => {
    setName('');
    setAccess('outsider');
    setNotes('');
    setAddOpen(false);
  };

  return (
    <div className="hd-list">
      {devices.length === 0 ? (
        <p className="hd-empty">No hacked devices tracked yet.</p>
      ) : (
        devices.map((d) => (
          <div className="hd-row" key={d.id}>
            <div className="hd-row-main">
              <div className="hd-row-name">{d.name}</div>
              {d.notes && <div className="hd-row-notes">{d.notes}</div>}
            </div>
            <div className="hd-row-access">
              <select
                className={`sr-number-input hd-access-${d.access}`}
                value={d.access}
                onChange={(e) => handleAccessChange(d.id, e.target.value)}
              >
                {ACCESS_LEVELS.map((lvl) => (
                  <option key={lvl.key} value={lvl.key}>{lvl.label}</option>
                ))}
              </select>
            </div>
            <button className="sr-icon-btn" onClick={() => handleRemove(d.id)} title="Remove">−</button>
          </div>
        ))
      )}

      <button className="sr-btn sr-btn--secondary" onClick={() => setAddOpen(true)} style={{ marginTop: '0.5rem' }}>
        + Add Hacked Device
      </button>

      {addOpen && (
        <div className="sr-modal-backdrop" onClick={handleCancel}>
          <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sr-modal-header">
              <h3 className="sr-modal-title">Add Hacked Device</h3>
              <button className="sr-modal-close" onClick={handleCancel} aria-label="Close">×</button>
            </div>

            <div className="hd-modal-field">
              <span className="hd-modal-label">Name</span>
              <input
                type="text"
                className="sr-number-input hd-modal-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Security camera, hallway 3"
                autoFocus
              />
            </div>

            <div className="hd-modal-field">
              <span className="hd-modal-label">Access Level</span>
              <select
                className="sr-number-input hd-modal-input"
                value={access}
                onChange={(e) => setAccess(e.target.value)}
              >
                {ACCESS_LEVELS.map((lvl) => (
                  <option key={lvl.key} value={lvl.key}>{lvl.label}</option>
                ))}
              </select>
            </div>

            <div className="hd-modal-field">
              <span className="hd-modal-label">Notes (optional)</span>
              <input
                type="text"
                className="sr-number-input hd-modal-input"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything worth remembering"
              />
            </div>

            <div className="sr-modal-actions">
              <button className="sr-btn sr-btn--secondary" onClick={handleCancel}>Cancel</button>
              <button className="sr-btn sr-btn--primary" disabled={!name.trim()} onClick={handleAdd}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
