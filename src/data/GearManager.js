// Owns everything gear-related: the collection itself (now instance-id
// keyed, not item-id keyed — the fix for the "two identical rifles"
// problem), PAN, and Essence (including manual adjustments for strains,
// homebrew effects, or corrections — see the "player honesty" framing
// from that conversation: pool sizes stay freely editable, transactions
// that consume them are where the math and gating live).
//
// A real, persistent instance living on Character (`character.gearManager`),
// not a stateless data-holder Character reaches into directly. Every
// consumer goes through character.gearManager.*, full stop — no
// compatibility shim, no dual API on Character itself.

import { ALL_GEAR } from '@data/gear';
import { isGradeable, resolveEssenceCost } from '@utils/augmentationEconomy';

// Small, fixed vocabulary — easy to expand later, just strings in an
// array. Not meant to be exhaustive Matrix mechanics, just common
// narrative states worth a quick visual flag.
export const DEVICE_STATUSES = [
  { key: 'targeted', label: 'Targeted' },
  { key: 'hacked', label: 'Hacked' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'jammed', label: 'Jammed' },
];

class GearManager {
  _gear = {}; // { [instanceId]: { itemId, config, attachedTo: instanceId | null } }
  _pan = { masterId: null, slaved: [] }; // instance ids, not item ids — same reason gear moved to instances
  _deviceStatus = {}; // { [instanceId]: string[] } — narrative-only, see toggleDeviceStatus below
  _matrixDamage = 0; // current damage on whichever device is Primary — see matrixMonitorMax below for the max
  _essenceAdjustments = []; // [{ amount, note }] — manual, stacks with the automatic gear-based deduction

  constructor(data = {}) {
    this._gear = data.gear || {};
    this._pan = data.pan || { masterId: null, slaved: [] };
    this._deviceStatus = data.deviceStatus || {};
    this._matrixDamage = typeof data.matrixDamage === 'number' ? data.matrixDamage : 0;
    this._essenceAdjustments = data.essenceAdjustments || [];
  }

  // ---- Gear collection ----

  get gear() { return this._gear; }

  add(itemId, config = {}) {
    const instanceId = crypto.randomUUID();
    this._gear[instanceId] = { itemId, config, attachedTo: null };
    return instanceId;
  }

  // Cascades on purpose: children attached to the removed instance don't
  // vanish (they're still owned, just unattached — a detached suppressor
  // is still a suppressor in inventory), and any PAN reference to this
  // instance is cleared so nothing dangles.
  remove(instanceId) {
    if (!this._gear[instanceId]) return;
    delete this._gear[instanceId];

    Object.values(this._gear).forEach((entry) => {
      if (entry.attachedTo === instanceId) entry.attachedTo = null;
    });

    if (this._pan.masterId === instanceId) {
      this._pan = { ...this._pan, masterId: null };
    }
    if (this._pan.slaved.includes(instanceId)) {
      this._pan = { ...this._pan, slaved: this._pan.slaved.filter((id) => id !== instanceId) };
    }

    if (this._deviceStatus[instanceId]) {
      const nextStatus = { ...this._deviceStatus };
      delete nextStatus[instanceId];
      this._deviceStatus = nextStatus;
    }
  }

  countOf(itemId) {
    return Object.values(this._gear).filter((entry) => entry.itemId === itemId).length;
  }

  instancesOf(itemId) {
    return Object.entries(this._gear).filter(([, entry]) => entry.itemId === itemId);
  }

  // ---- Attachments ----
  // Uniform relationship regardless of what the attachment actually
  // does mechanically — a Suppressor and a (someday) standalone
  // grenade-launcher attachment both just get attachedTo set. Whatever
  // varies (integrated weapon stats, etc.) lives on the item's own
  // catalog data, not in how the relationship itself is stored.

  attach(childInstanceId, parentInstanceId) {
    if (!this._gear[childInstanceId] || !this._gear[parentInstanceId]) return;
    if (childInstanceId === parentInstanceId) return;
    this._gear[childInstanceId].attachedTo = parentInstanceId;
  }

  detach(childInstanceId) {
    if (!this._gear[childInstanceId]) return;
    this._gear[childInstanceId].attachedTo = null;
  }

  attachmentsOf(parentInstanceId) {
    return Object.entries(this._gear).filter(([, entry]) => entry.attachedTo === parentInstanceId);
  }

  // ---- PAN (Personal Area Network) ----
  // Same enforced invariant as before: a device can't be both master and
  // slaved — setting something as master auto-unslaves it if it was.
  // UI for this is intentionally not wired back up yet post-refactor;
  // the data/methods exist so nothing needs revisiting once it is.

  get pan() { return this._pan; }
  set pan(value) { this._pan = value; }

  setPanMaster(instanceId) {
    if (this._pan.masterId === instanceId) {
      this._pan = { ...this._pan, masterId: null };
    } else {
      this._pan = { masterId: instanceId, slaved: this._pan.slaved.filter((id) => id !== instanceId) };
    }
  }

  addSlavedDevice(instanceId) {
    if (instanceId === this._pan.masterId) return;
    if (this._pan.slaved.includes(instanceId)) return;
    this._pan = { ...this._pan, slaved: [...this._pan.slaved, instanceId] };
  }

  removeSlavedDevice(instanceId) {
    this._pan = { ...this._pan, slaved: this._pan.slaved.filter((id) => id !== instanceId) };
  }

  // ---- Device Status ----
  // Purely narrative bookkeeping — the GM says "they've targeted your
  // commlink," the player taps it, done. No mark counts, no Overwatch
  // Score, no simulated hacking — same "manual honesty, not a system
  // policing behavior" instinct as everything else in this app. Applies
  // uniformly to master and slaved devices, so it's its own map rather
  // than living inside pan's shape.

  getDeviceStatus(instanceId) {
    return this._deviceStatus[instanceId] || [];
  }

  toggleDeviceStatus(instanceId, status) {
    const current = this.getDeviceStatus(instanceId);
    const next = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];
    this._deviceStatus = { ...this._deviceStatus, [instanceId]: next };
  }

  // ---- Matrix Condition Monitor ----
  // Belongs here, not on Character — its max is derived from whichever
  // device is currently Primary (Device Rating/2 rounded up + 8, same
  // formula shape as Physical/Stun, just keyed to Device Rating instead
  // of Body/Willpower), so it's genuinely tied to PAN state, not a fixed
  // per-attribute value. Swapping Primary devices changes the max; the
  // damage value itself persists across that swap. Technomancers don't
  // have one at all — their Matrix damage lands on Stun directly, no
  // extra plumbing needed since that track already exists. Returns 0
  // when there's no Primary device or it lacks a Device Rating —
  // callers should treat 0 as "don't show this," same as Dice treating
  // null as "don't render a roller."

  get matrixMonitorMax() {
    const masterId = this._pan.masterId;
    if (!masterId || !this._gear[masterId]) return 0;
    const item = ALL_GEAR[this._gear[masterId].itemId];
    const deviceRating = item?.stats?.deviceRating;
    if (deviceRating == null) return 0;
    return Math.ceil(deviceRating / 2) + 8;
  }

  get matrixDamage() { return this._matrixDamage; }
  set matrixDamage(value) {
    this._matrixDamage = Math.max(0, Math.min(this.matrixMonitorMax, value));
  }

  // ---- Essence ----
  // 6 (RAW baseline) + manual adjustments − installed cyberware/bioware
  // costs. No more "* quantity" multiplication — every gear entry is
  // already exactly one unit now, which was the actual bug in the old
  // shape, not something this getter needs to compensate for anymore.

  get essence() {
    let essence = 6;
    this._essenceAdjustments.forEach((adj) => { essence += adj.amount; });
    Object.values(this._gear).forEach((entry) => {
      const item = ALL_GEAR[entry.itemId];
      if (!item || !isGradeable(item)) return;
      essence -= resolveEssenceCost(item, entry.config);
    });
    return Math.max(0, Math.round(essence * 100) / 100);
  }

  get essenceAdjustments() { return this._essenceAdjustments; }

  addEssenceAdjustment(amount, note = '') {
    this._essenceAdjustments = [...this._essenceAdjustments, { amount, note }];
  }

  removeEssenceAdjustment(index) {
    this._essenceAdjustments = this._essenceAdjustments.filter((_, i) => i !== index);
  }

  toJSON() {
    return {
      gear: this._gear,
      pan: this._pan,
      deviceStatus: this._deviceStatus,
      matrixDamage: this._matrixDamage,
      essenceAdjustments: this._essenceAdjustments,
    };
  }
}

export default GearManager;
