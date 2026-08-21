import React, { useState } from 'react';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import SignalWifi1BarIcon from '@mui/icons-material/SignalWifi1Bar';

import Modal from '@components/Modal';
import { useSocket } from '@hooks/useSocket';
import './connectionModal.css';

const STATUS_COLOR = {
  connected: 'rgb(0, 170, 40)',
  connecting: 'rgb(250, 204, 21)',
  disconnected: 'rgba(148, 163, 184, 0.5)',
  error: 'rgb(239, 68, 68)',
};

const STATUS_LABEL = {
  connected: 'Connected',
  connecting: 'Connecting...',
  disconnected: 'Offline',
  error: 'Error',
};

const QUICK_FILLS = [
  'wss://ws.cymorkborg.com',
  'wss://localhost:3002',
];

export default function ConnectionModal({ open, onClose, children }) {
  const {
    host, setHost,
    playerName, setPlayerName,
    status, connectedClients,
    connect, disconnect,
  } = useSocket();

  const [hostInput, setHostInput] = useState(host);
  const [nameInput, setNameInput] = useState(playerName);

  if (!open) return null;

  const isConnected = status === 'connected';
  const canConnect = hostInput.trim() && nameInput.trim();

  const handleConnect = () => {
    const h = hostInput.trim();
    const n = nameInput.trim();
    if (!h || !n) return;
    setHost(h);
    setPlayerName(n);
    connect(h, n);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const statusSubtitle = (
    <span className="comod-status-pill" style={{ color: STATUS_COLOR[status] }}>
      {status === 'connected'
        ? <WifiIcon style={{ fontSize: 13 }} />
        : status === 'connecting'
        ? <SignalWifi1BarIcon style={{ fontSize: 13 }} />
        : <WifiOffIcon style={{ fontSize: 13 }} />
      }
      {STATUS_LABEL[status]}
    </span>
  );

  return (
    <Modal open={open} onClose={onClose} title="NETWORK CONNECTION" subtitle={statusSubtitle}>
      {/* Fields */}
      <div className="comod-field-row">
        <span className="comod-field-label">NAME *</span>
        <input
          className="comod-input"
          placeholder="Required"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
          disabled={isConnected}
        />
      </div>

      <div className="comod-field-row">
        <span className="comod-field-label">HOST</span>
        <input
          className="comod-input"
          placeholder="ws://192.168.x.x:3002"
          value={hostInput}
          onChange={e => setHostInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !isConnected && canConnect && handleConnect()}
          disabled={isConnected}
        />
      </div>

      {/* Quick fill buttons */}
      {!isConnected && (
        <div className="comod-quickfill-row">
          <span className="comod-field-label">QUICK FILL</span>
          <div className="comod-quickfill-btns">
            {QUICK_FILLS.map(addr => (
              <button key={addr} className="comod-quickfill-btn" onClick={() => setHostInput(addr)}>
                {addr}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Children — contextual message slot */}
      {children && (
        <div className="comod-children">
          {children}
        </div>
      )}

      {/* Action */}
      <div className="comod-actions">
        {isConnected ? (
          <button className="comod-btn comod-btn-danger" onClick={handleDisconnect}>
            Disconnect
          </button>
        ) : (
          <button className="comod-btn" onClick={handleConnect} disabled={!canConnect}>
            Connect
          </button>
        )}
        <button className="comod-btn comod-btn-dim" onClick={onClose}>
          Close
        </button>
      </div>

      {/* Connected clients */}
      {isConnected && (
        <div className="comod-clients">
          <div className="comod-clients-label">
            CONNECTED — {connectedClients.length} {connectedClients.length === 1 ? 'client' : 'clients'}
          </div>
          {connectedClients.length === 0 ? (
            <div className="comod-clients-empty">No other clients connected</div>
          ) : (
            connectedClients.map(name => (
              <div key={name} className="comod-client-row">
                <span className="comod-client-dot" />
                {name}
              </div>
            ))
          )}
        </div>
      )}
    </Modal>
  );
}
