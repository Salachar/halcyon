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
  _noiseBase = 0; // manually set — "distance and terrain puts it at 5." Persistent within a scene, GM zeroes it out or resets it as circumstances change. Auto/optional modifiers on top of this are computed at display time, never stored (see deviceModifiers.js).
  _overwatchScore = 0; // manually set — confirmed formula (+1/hit on illegal actions, +1/round illegal User access, +3/round illegal Admin access) is never auto-applied, since that means simulating an opposed test against a target this project deliberately doesn't model. Player/GM adds it up, same "manual honesty" pattern as everything else. Convergence at 40.

  constructor(data = {}) {
    this._hackedDevices = data.hackedDevices || [];
    this._noiseBase = typeof data.noiseBase === 'number' ? data.noiseBase : 0;
    this._overwatchScore = typeof data.overwatchScore === 'number' ? data.overwatchScore : 0;
  }

  get hackedDevices() { return this._hackedDevices; }

  addHackedDevice(name, access, notes, tags = []) {
    const id = crypto.randomUUID();
    this._hackedDevices = [...this._hackedDevices, { id, name, access, notes, tags }];
    return id;
  }

  updateHackedDevice(id, updates) {
    this._hackedDevices = this._hackedDevices.map((d) => (d.id === id ? { ...d, ...updates } : d));
  }

  removeHackedDevice(id) {
    this._hackedDevices = this._hackedDevices.filter((d) => d.id !== id);
  }

  get noiseBase() { return this._noiseBase; }
  setNoiseBase(value) { this._noiseBase = value; }

  get overwatchScore() { return this._overwatchScore; }
  setOverwatchScore(value) { this._overwatchScore = Math.max(0, value); }

  toJSON() {
    return { hackedDevices: this._hackedDevices, noiseBase: this._noiseBase, overwatchScore: this._overwatchScore };
  }
}

export default MatrixManager;
