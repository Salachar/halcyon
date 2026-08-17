// ─── Keys ────────────────────────────────────────────────────────────────────

export const SHADOWSEA_CONTENT_SIZE_KEY  = 'shadowsea_content_size';
export const SHADOWSEA_NODES_EXPANDED_KEY = 'shadowsea_nodes_expanded';
export const SHADOWSEA_NODES_INDENT_KEY = 'shadowsea_node_indent';
export const SHADOWSEA_EXTRACTED_KEY = 'shadowsea_extracted';
export const SHADOWSEA_WALLET_KEY = 'shadowsea_wallet';
export const SHADOWSEA_BOOKMARKS_KEY = 'shadowsea_bookmarks';
export const SHADOWSEA_PASSWORDS_KEY  = 'shadowsea_passwords';
export const SHADOWSEA_PASSWORD_ATTEMPTS_KEY = 'shadowsea_password_attempts';

export const HALCYON_COLLAPSED_SECTIONS_KEY = 'halcyon_collapsed_sections_states';
export const HALCYON_LAST_SELECTED_CHARACTER_KEY = 'halcyon_last_selected';
export const HALCYON_SAVED_CHARACTERS_KEY = 'halcyon_saved_characters';
export const HALCYON_NOTES_KEY = 'halcyon_notes';
export const HALCYON_SHARED_FEED_KEY = 'halcyon_shared_feed';
export const HALCYON_WS_HOST_KEY = 'halcyon_ws_host';
export const HALCYON_WS_NAME_KEY = 'halcyon_player_name';

function get(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error(`Failed to load ${key}:`, e);
    return fallback;
  }
}

function set(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save ${key}:`, e);
  }
}

// ─── Passwords ───────────────────────────────────────────────────────────────

export const getDiscoveredPasswords = () => get(SHADOWSEA_PASSWORDS_KEY, {});
export const saveDiscoveredPasswords = (passwords) => set(SHADOWSEA_PASSWORDS_KEY, passwords);

// ─── Extracted Items ──────────────────────────────────────────────────────────

export const getExtracted = () => get(SHADOWSEA_EXTRACTED_KEY, {});
export const saveExtracted = (extracted) => set(SHADOWSEA_EXTRACTED_KEY, extracted);

// ─── Wallet ───────────────────────────────────────────────────────────────────

export const getWallet = () => get(SHADOWSEA_WALLET_KEY, { credits: 0, items: [] });

export function saveWallet(wallet) {
  set(SHADOWSEA_WALLET_KEY, wallet);
  window.dispatchEvent(new Event('walletUpdated'));
}

export function getNotes() {
  try {
    const saved = localStorage.getItem(HALCYON_NOTES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Failed to load notes:', e);
    return [];
  }
}

export function saveNotes(notes) {
  try {
    localStorage.setItem(HALCYON_NOTES_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('Failed to save notes:', e);
  }
}
