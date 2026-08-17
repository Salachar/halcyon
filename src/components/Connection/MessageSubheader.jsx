import { useState } from 'react';
import { useGameMessages } from '@context/GameMessagesContext';
import { useSocket } from '@hooks/useSocket';

import NetworkButton from './NetworkButton';
import DataButton from './DataButton';
import ConnectionModal from './ConnectionModal';
import MessageHistoryModal from './MessageHistoryModal';
import DataModal from './DataModal';

import './messageSubheader.css';

const TYPE_COLOR = {
  unlock: 'rgb(0, 170, 40)',
  note:   'rgb(251, 191, 36)',
  info:   'rgb(79, 209, 197)',
};

export default function MessageSubheader() {
  const { lastMessage, messageHistory } = useGameMessages();
  const { status, connectedClients } = useSocket();
  const [connectionOpen, setConnectionOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState(false);

  const isConnected = status === 'connected';

  return (
    <>
      <div className="msub-root">
        <div className="msub-row">
          <button className="msub-view-btn" onClick={() => setHistoryOpen(true)}>
            {messageHistory.length > 0 ? `Log (${messageHistory.length})` : 'Log'}
          </button>

          <div className="msub-last-message">
            {lastMessage ? (
              <>
                <span className="msub-last-label" style={{ color: TYPE_COLOR[lastMessage.type] ?? TYPE_COLOR.info }}>
                  {lastMessage.label ?? lastMessage.type.toUpperCase()}
                </span>
                <span className="msub-last-text">{lastMessage.message}</span>
              </>
            ) : (
              <span className="msub-last-empty">No messages this session</span>
            )}
          </div>

          <NetworkButton onClick={() => setConnectionOpen(true)} />
          <DataButton onClick={() => setDataOpen(true)} style={{ marginLeft: '0.4rem' }} />
        </div>

        {isConnected && connectedClients.length > 0 && (
          <div className="msub-clients-row">
            {connectedClients.map((name) => (
              <span key={name} className="msub-client">
                <span className="msub-client-dot" />
                {name}
              </span>
            ))}
          </div>
        )}
      </div>

      <ConnectionModal open={connectionOpen} onClose={() => setConnectionOpen(false)} />
      <MessageHistoryModal open={historyOpen} onClose={() => setHistoryOpen(false)} />
      <DataModal open={dataOpen} onClose={() => setDataOpen(false)} />
    </>
  );
}
