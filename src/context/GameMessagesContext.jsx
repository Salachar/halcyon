import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useSocket } from '@hooks/useSocket';
import ToastDisplay from '@components/Toast';

import {
  HALCYON_NOTES_KEY,
  SHADOWSEA_PASSWORDS_KEY,
  HALCYON_SHARED_FEED_KEY,
} from '@utils/localStorage';

function getStoredSharedFeed() {
  try {
    const saved = localStorage.getItem(HALCYON_SHARED_FEED_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
}

function saveSharedFeed(feed) {
  try { localStorage.setItem(HALCYON_SHARED_FEED_KEY, JSON.stringify(feed)); } catch {}
}

function getStoredPasswords() {
  try {
    const saved = localStorage.getItem(SHADOWSEA_PASSWORDS_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
}

function savePasswords(passwords) {
  try { localStorage.setItem(SHADOWSEA_PASSWORDS_KEY, JSON.stringify(passwords)); } catch {}
}

// ─── Context ──────────────────────────────────────────────────────────────────

const GameMessagesContext = createContext(null);

export function useGameMessages() {
  const ctx = useContext(GameMessagesContext);
  if (!ctx) throw new Error('useGameMessages must be used inside GameMessagesProvider');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function GameMessagesProvider({ children }) {
  const { subscribe, send, playerName } = useSocket();

  // Session cache — read-only from consumers
  const [sharedFeed, setSharedFeed] = useState(getStoredSharedFeed);
  const [toasts, setToasts] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);

  // ── Toast helpers ──────────────────────────────────────────────────────────

  const addToast = useCallback(({ type = 'info', label, message, duration = 5000 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const entry = { id, type, label, message, duration, timestamp: Date.now() };
    setToasts(prev => [...prev, entry]);
    setLastMessage(entry);
    setMessageHistory(prev => [entry, ...prev]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // ── share_note ─────────────────────────────────────────────────────────────

  useEffect(() => {
    return subscribe('share_note', (data) => {
      if (!data.note?.id) return;

      // Write to localStorage
      const next = { ...getStoredSharedFeed(), [data.note.id]: data.note };
      saveSharedFeed(next);

      // Update session cache
      setSharedFeed(next);

      // Toast
      const from = data.note.from ? `${data.note.from}: ` : '';
      const preview = data.note.text.length > 60
        ? data.note.text.slice(0, 60) + '...'
        : data.note.text;
      addToast({
        type: 'note',
        label: 'NOTE',
        message: `${from}${preview}`,
      });
    });
  }, [subscribe, addToast]);

  // ── share_unlock ───────────────────────────────────────────────────────────

  useEffect(() => {
    return subscribe('share_unlock', (data) => {
      if (!data.path) return;

      // Write to localStorage
      const passwords = getStoredPasswords();
      passwords[data.path] = data.value ?? 'UNLOCKED';
      savePasswords(passwords);

      // Notify RetComDevice to reload (consistent with walletUpdated pattern)
      window.dispatchEvent(new CustomEvent('passwordReceived', {
        detail: { path: data.path, value: data.value }
      }));

      // Toast
      const pw = data.value && data.value !== 'UNLOCKED' ? ` · PW: ${data.value}` : '';
      addToast({
        type: 'unlock',
        label: 'UNLOCKED',
        message: `${data.path.split('/').pop()}${pw}`,
      });
    });
  }, [subscribe, addToast]);

  // ── Outgoing: shareNote ────────────────────────────────────────────────────

  const shareNote = useCallback((note) => {
    return send({
      type: 'share_note',
      note: {
        id: note.id,
        text: note.text,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        from: playerName || null,
      },
    });
  }, [send, playerName]);

  // ── Outgoing: shareUnlock ──────────────────────────────────────────────────

  const shareUnlock = useCallback((path, value) => {
    return send({
      type: 'share_unlock',
      path,
      value,
      from: playerName || null,
    });
  }, [send, playerName]);

  // ── Local: deleteSharedNote ────────────────────────────────────────────────

  const deleteSharedNote = useCallback((id) => {
    setSharedFeed(prev => {
      const next = { ...prev };
      delete next[id];
      saveSharedFeed(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setMessageHistory([]);
    setLastMessage(null);
  }, []);

  const sharedFeedList = Object.values(sharedFeed)
    .sort((a, b) => a.createdAt - b.createdAt);

  const value = {
    // Notes
    sharedFeed,
    sharedFeedList,
    shareNote,
    deleteSharedNote,
    // Unlocks
    shareUnlock,
    // Toasts
    addToast,
    // Message history
    lastMessage,
    messageHistory,
    clearHistory,
  };

  return (
    <GameMessagesContext.Provider value={value}>
      {children}
      <ToastDisplay toasts={toasts} onDismiss={dismissToast} />
    </GameMessagesContext.Provider>
  );
}
