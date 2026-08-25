import { useState } from 'react';

import { useCharacterManager } from '@hooks/useCharacterManager';
import { ACCESS_LEVELS } from '@data/MatrixManager';

import './hackedDevices.css';

// Quick-glance categories — matches the "cyberware, camera, weapon,
// vehicle, etc." shape discussed earlier, Host included per the
// decision that Hosts are just "large outside networks" and don't
// need their own tracked system, just a tag here. Multi-select, not
// exclusive — a hacked drone might reasonably be tagged both Drone and
// Vehicle.
const DEVICE_TAGS = [
  { key: 'camera', label: 'Camera' },
  { key: 'cyberware', label: 'Cyberware' },
  { key: 'device', label: 'Device' },
  { key: 'drone', label: 'Drone' },
  { key: 'host', label: 'Host' },
  { key: 'vehicle', label: 'Vehicle' },
  { key: 'weapon', label: 'Weapon' },
];

// A manual, freeform "little PAN" for devices the player doesn't own —
// no gear linkage, no computed access level. The GM already knows the
// real access level (they run the target), this is purely a memory aid
// across a session where someone's hacked into several things at once.
// Matrix-page-only, unlike NetworkPanel — this has nothing to do with
// the character's own gear/PAN.
//
// One modal now serves both Add and Edit (editingId set = editing) —
// previously only access level could be changed after creation; name,
// notes, and tags were locked in at add time with no way back. Notes
// is a textarea now, not a single-line input, for genuinely longer
// notes rather than a one-line label.
export default function HackedDevices({ character }) {
  const { touch } = useCharacterManager();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [access, setAccess] = useState('outsider');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState([]);
  const [tagFilter, setTagFilter] = useState(null);

  const devices = character.matrixManager.hackedDevices;
  const visibleDevices = tagFilter ? devices.filter((d) => (d.tags || []).includes(tagFilter)) : devices;

  const handleAccessChange = (id, newAccess) => {
    character.matrixManager.updateHackedDevice(id, { access: newAccess });
    touch();
  };

  const handleRemove = (id) => {
    character.matrixManager.removeHackedDevice(id);
    touch();
  };

  const resetForm = () => {
    setName('');
    setAccess('outsider');
    setNotes('');
    setTags([]);
    setEditingId(null);
    setModalOpen(false);
  };

  const openAdd = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEdit = (device) => {
    setName(device.name);
    setAccess(device.access);
    setNotes(device.notes || '');
    setTags(device.tags || []);
    setEditingId(device.id);
    setModalOpen(true);
  };

  const toggleTag = (key) => {
    setTags((prev) => (prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    if (editingId) {
      character.matrixManager.updateHackedDevice(editingId, { name: name.trim(), access, notes: notes.trim(), tags });
    } else {
      character.matrixManager.addHackedDevice(name.trim(), access, notes.trim(), tags);
    }
    touch();
    resetForm();
  };

  return (
    <div className="hd-list">
      {devices.length > 0 && (
        <div className="hd-filter-row">
          {DEVICE_TAGS.map((tag) => (
            <button
              key={tag.key}
              className={tagFilter === tag.key ? 'sr-btn sr-btn--primary' : 'sr-btn sr-btn--secondary'}
              onClick={() => setTagFilter((prev) => (prev === tag.key ? null : tag.key))}
            >
              {tag.label}
            </button>
          ))}
        </div>
      )}

      {visibleDevices.length === 0 ? (
        <p className="hd-empty">{tagFilter ? 'No hacked devices with that tag.' : 'No hacked devices tracked yet.'}</p>
      ) : (
        visibleDevices.map((d) => (
          <div className="hd-row" key={d.id}>
            <div className="hd-row-main" onClick={() => openEdit(d)}>
              <div className="hd-row-name">{d.name}</div>
              {(d.tags || []).length > 0 && (
                <div className="hd-row-tags">
                  {d.tags.map((t) => (
                    <span key={t} className="hd-tag-chip">{DEVICE_TAGS.find((dt) => dt.key === t)?.label ?? t}</span>
                  ))}
                </div>
              )}
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

      <button className="sr-btn sr-btn--secondary" onClick={openAdd} style={{ marginTop: '0.5rem' }}>
        + Add Hacked Device
      </button>

      {modalOpen && (
        <div className="sr-modal-backdrop" onClick={resetForm}>
          <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sr-modal-header">
              <h3 className="sr-modal-title">{editingId ? 'Edit Hacked Device' : 'Add Hacked Device'}</h3>
              <button className="sr-modal-close" onClick={resetForm} aria-label="Close">×</button>
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
              <span className="hd-modal-label">Tags</span>
              <div className="hd-modal-tags">
                {DEVICE_TAGS.map((tag) => (
                  <button
                    key={tag.key}
                    type="button"
                    className={tags.includes(tag.key) ? 'sr-btn sr-btn--primary' : 'sr-btn sr-btn--secondary'}
                    onClick={() => toggleTag(tag.key)}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hd-modal-field">
              <span className="hd-modal-label">Notes (optional)</span>
              <textarea
                className="sr-number-input hd-modal-input hd-modal-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything worth remembering"
                rows={4}
              />
            </div>

            <div className="sr-modal-actions">
              <button className="sr-btn sr-btn--secondary" onClick={resetForm}>Cancel</button>
              <button className="sr-btn sr-btn--primary" disabled={!name.trim()} onClick={handleSave}>
                {editingId ? 'Save' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
