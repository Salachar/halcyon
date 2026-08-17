import React from 'react';
import { useGameMessages } from '@context/GameMessagesContext';
import Modal from '@components/Modal/Modal';
import './messageHistoryModal.css';

const TYPE_COLOR = {
  unlock: 'rgb(0, 170, 40)',
  note:   'rgb(251, 191, 36)',
  info:   'rgb(79, 209, 197)',
};

function formatTime(ts) {
  try {
    return new Date(ts).toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch { return ''; }
}

export default function MessageHistoryModal({ open, onClose }) {
  const { messageHistory, clearHistory } = useGameMessages();

  return (
    <Modal open={open} onClose={onClose} title="NOTIFICATION HISTORY">
      {messageHistory.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="mhm-clear-btn" onClick={clearHistory}>
            Clear
          </button>
        </div>
      )}

      {messageHistory.length === 0 ? (
        <div className="mhm-empty">No notifications yet this session.</div>
      ) : (
        messageHistory.map(msg => (
          <div key={msg.id} className="mhm-row">
            <span className="mhm-label" style={{ color: TYPE_COLOR[msg.type] ?? TYPE_COLOR.info }}>
              {msg.label ?? msg.type.toUpperCase()}
            </span>
            <span className="mhm-message">{msg.message}</span>
            <span className="mhm-time">{formatTime(msg.timestamp)}</span>
          </div>
        ))
      )}
    </Modal>
  );
}
