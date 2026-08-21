// Owns Matrix-session state that isn't PAN (which stays on GearManager,
// since it's about the character's own gear). Starts small — just
// hacked-device tracking — but composed the same way GearManager is on
// Character, anticipating this growing (Overwatch Score, persona
// display) once the Matrix tab itself gets built out further.

export const ACCESS_LEVELS = [
  { key: 'outsider', label: 'Outsider' },
  { key: 'user', label: 'User' },
  { key: 'admin', label: 'Admin' },
];

class MatrixManager {
  _hackedDevices = []; // [{ id, name, access, notes }] — freeform, not linked to any gear/character. These are devices the player doesn't own.

  constructor(data = {}) {
    this._hackedDevices = data.hackedDevices || [];
  }

  get hackedDevices() { return this._hackedDevices; }

  addHackedDevice(name, access = 'outsider', notes = '') {
    const id = crypto.randomUUID();
    this._hackedDevices = [...this._hackedDevices, { id, name, access, notes }];
    return id;
  }

  updateHackedDevice(id, updates) {
    this._hackedDevices = this._hackedDevices.map((d) => (d.id === id ? { ...d, ...updates } : d));
  }

  removeHackedDevice(id) {
    this._hackedDevices = this._hackedDevices.filter((d) => d.id !== id);
  }

  toJSON() {
    return { hackedDevices: this._hackedDevices };
  }
}

export default MatrixManager;
