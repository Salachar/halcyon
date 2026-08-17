import {
  HALCYON_LAST_SELECTED_CHARACTER_KEY,
  HALCYON_SAVED_CHARACTERS_KEY,
  HALCYON_COLLAPSED_SECTIONS_KEY,
} from '@utils/localStorage';

import Character from '@data/Character';

class CharacterManager {
  _characters = {};
  _last_selected_id = null;
  _listeners = new Set();

  constructor(opts = {}) {
    this.load();
  }

  get characters() {
    return this._characters;
  }

  get lastSelectedId() {
    return this._last_selected_id;
  }

  // The one thing Gear/Skills/Combat/Matrix actually want — resolved here
  // once, rather than every consumer doing characters[lastSelectedId] itself.
  get currentCharacter() {
    return this._last_selected_id ? this._characters[this._last_selected_id] ?? null : null;
  }

  // ---- Subscription ----
  // Lets React components re-render when something changes the manager
  // from outside React (including load() at construction time, before any
  // component has mounted). useCharacterManager below is the consumer.
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  _notify() {
    this._listeners.forEach((fn) => fn());
  }

  setLastSelected(id) {
    this._last_selected_id = id;
    try {
      localStorage.setItem(HALCYON_LAST_SELECTED_CHARACTER_KEY, id);
    } catch (e) {
      console.error('Failed to save last selected:', e);
    }
    this._notify();
  }

  // Call after mutating a character in place (character.nuyen -= cost,
  // character.skills.firearms.rank = 3, etc.) — characters are mutable
  // class instances, so React has no way to notice a field changed
  // unless something explicitly triggers a re-render. Persists to
  // localStorage and notifies subscribers, same as add/delete already do.
  touch() {
    this.save();
    this._notify();
  }

  addCharacter(new_character) {
    if (!new_character) {
      console.log('No character passed to manager');
      return;
    }
    if (!new_character.id) {
      console.log('Character with no id, stop that');
      return;
    }
    this._characters[new_character.id] = new_character;
    this.save();
    this._notify();
  }

  deleteCharacter(id) {
    delete this._characters[id];

    if (this._last_selected_id === id) {
      this._last_selected_id = null;
      localStorage.removeItem(HALCYON_LAST_SELECTED_CHARACTER_KEY);
    }

    try {
      const stored = localStorage.getItem(HALCYON_COLLAPSED_SECTIONS_KEY);
      if (stored) {
        const states = JSON.parse(stored);
        delete states[id];
        localStorage.setItem(HALCYON_COLLAPSED_SECTIONS_KEY, JSON.stringify(states));
      }
    } catch (e) {
      console.error('Error cleaning up collapse states:', e);
    }

    this.save();
    this._notify();
  }

  save() {
    try {
      const chars = this.characters;
      const charJSON = {};
      Object.keys(chars).forEach((c_id) => {
        const c = chars[c_id];
        charJSON[c.id] = c.toJSON();
      });

      localStorage.setItem(HALCYON_SAVED_CHARACTERS_KEY, JSON.stringify(charJSON));
    } catch (e) {
      console.log('Failed to save characters', e);
    }
  }

  load() {
    try {
      const lastSelected = localStorage.getItem(HALCYON_LAST_SELECTED_CHARACTER_KEY);
      if (lastSelected) {
        this._last_selected_id = lastSelected;
      }
    } catch (e) {
      console.error('Failed to load last selected:', e);
    }

    try {
      const chars = localStorage.getItem(HALCYON_SAVED_CHARACTERS_KEY);
      if (!chars) return;
      const parsed = JSON.parse(chars);
      Object.keys(parsed).forEach((c_id) => {
        // Direct assignment, not this.addCharacter() — addCharacter now
        // also saves + notifies, which during initial hydration would
        // mean N redundant localStorage writes and N notifications fired
        // before any component has even subscribed yet.
        this._characters[c_id] = new Character(parsed[c_id]);
      });
    } catch (e) {
      console.log('Failed to load characters', e);
    }
  }
}

export default new CharacterManager();
