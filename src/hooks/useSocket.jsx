import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import {
  HALCYON_WS_HOST_KEY,
  HALCYON_WS_NAME_KEY,
} from '@utils/localStorage';

const RECONNECT_DELAY = 3000;
const DEFAULT_HOST = 'wss://ws.cymorkborg.com';

function getStoredHost() {
  try {
    const saved = localStorage.getItem(HALCYON_WS_HOST_KEY);
    return saved !== null ? saved : DEFAULT_HOST;
  } catch { return DEFAULT_HOST; }
}

function saveStoredHost(h) {
  try { localStorage.setItem(HALCYON_WS_HOST_KEY, h); } catch {}
}
function getStoredName() {
  try { return localStorage.getItem(HALCYON_WS_NAME_KEY) ?? ''; } catch { return ''; }
}
function saveStoredName(n) {
  try { localStorage.setItem(HALCYON_WS_NAME_KEY, n); } catch {}
}

function clearStoredConnection() {
  try {
    localStorage.removeItem(HALCYON_WS_HOST_KEY);
    localStorage.removeItem(HALCYON_WS_NAME_KEY);
  } catch {}
}

// Strip all handlers from a socket so it can no longer affect app state,
// no matter what it does on the wire after this point (finishes closing,
// gets a stray message in flight, errors out, etc).
function detachSocket(ws) {
  if (!ws) return;
  ws.onopen = null;
  ws.onmessage = null;
  ws.onclose = null;
  ws.onerror = null;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const SocketContext = createContext(null);

export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used inside SocketProvider');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function SocketProvider({ children }) {
  const [host, setHostState] = useState(getStoredHost);
  const [playerName, setPlayerNameState] = useState(getStoredName);
  const [status, setStatus] = useState('disconnected');
  const [connectedClients, setConnectedClients] = useState([]);
  const [gmStatus, setGmStatus] = useState({ time: null, note: null, activity: null });

  const wsRef = useRef(null);
  const reconnectTimer = useRef(null);
  const hostRef = useRef(host);
  const nameRef = useRef(playerName);
  // Map of message type -> Set of handlers
  const handlersRef = useRef(new Map());

  hostRef.current = host;
  nameRef.current = playerName;

  // ── Subscription ────────────────────────────────────────────────────────────

  const subscribe = useCallback((type, handler) => {
    if (!handlersRef.current.has(type)) {
      handlersRef.current.set(type, new Set());
    }
    handlersRef.current.get(type).add(handler);
    return () => {
      handlersRef.current.get(type)?.delete(handler);
    };
  }, []);

  const dispatch = useCallback((data) => {
    const handlers = handlersRef.current.get(data.type);
    if (handlers) {
      handlers.forEach(fn => fn(data));
    }
  }, []);

  // ── Send ────────────────────────────────────────────────────────────────────

  const send = useCallback((message) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return false;
    wsRef.current.send(JSON.stringify(message));
    return true;
  }, []);

  // ── Connect ─────────────────────────────────────────────────────────────────

  const connect = useCallback((targetHost, targetName, initial = false) => {
    const h = (targetHost ?? hostRef.current).trim();
    const n = (targetName ?? nameRef.current).trim();
    if (!h || !n) return;

    // Fully neutralize whatever socket we had before starting a new one —
    // it can still be mid-close on the wire, but it can no longer touch
    // app state or schedule a reconnect once we've detached it here.
    if (wsRef.current) {
      const prev = wsRef.current;
      detachSocket(prev);
      prev.close();
      wsRef.current = null;
    }
    clearTimeout(reconnectTimer.current);

    const url = h.startsWith('ws://') || h.startsWith('wss://')
      ? h
      : `ws://${h}:3002`;

    setStatus('connecting');

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      if (wsRef.current !== ws) return; // stale — a newer connect() has since taken over
      setStatus('connected');
      ws.send(JSON.stringify({ type: 'register', name: n }));
    };

    ws.onmessage = (event) => {
      if (wsRef.current !== ws) return;
      let data;
      try { data = JSON.parse(event.data); } catch { return; }
      if (data.type === 'client_list') {
        setConnectedClients(data.clients ?? []);
        return;
      }
      if (data.type === 'gm_status') {
        setGmStatus({ time: data.time ?? null, note: data.note ?? null, activity: data.activity ?? null });
        return;
      }
      dispatch(data);
    };

    ws.onclose = () => {
      // If this isn't the socket we currently care about, it's a stale
      // handler that slipped through — ignore it entirely. This is the
      // actual fix for reconnect-after-disconnect: a shared "was this
      // manual" flag can't reliably tell two different sockets apart,
      // but identity comparison always can.
      if (wsRef.current !== ws) return;
      setStatus('disconnected');
      setConnectedClients([]);
      wsRef.current = null;
    };

    ws.onerror = () => {
      if (wsRef.current !== ws) return;
      setStatus('error');
    };
  }, [dispatch]);

  // ── Disconnect ──────────────────────────────────────────────────────────────

  const disconnect = useCallback(() => {
    clearTimeout(reconnectTimer.current);
    if (wsRef.current) {
      const ws = wsRef.current;
      detachSocket(ws);
      ws.close();
      wsRef.current = null;
    }
    clearStoredConnection();
    setHostState(DEFAULT_HOST);
    setPlayerNameState('');
    setStatus('disconnected');
    setConnectedClients([]);
  }, []);

  // ── Setters ─────────────────────────────────────────────────────────────────

  const setHost = (h) => { setHostState(h); saveStoredHost(h); };
  const setPlayerName = (n) => { setPlayerNameState(n); saveStoredName(n); };

  // ── Cleanup ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    const h = getStoredHost().trim();
    const n = getStoredName().trim();
    if (h && n) connect(h, n, true);

    return () => {
      clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, []);

  const value = {
    host, setHost,
    playerName, setPlayerName,
    status,
    connectedClients,
    gmStatus,
    connect,
    disconnect,
    send,
    subscribe,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}
