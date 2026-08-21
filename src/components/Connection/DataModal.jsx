import { useRef, useState } from 'react';

import Modal from '@components/Modal';
import ConnectionModal from '@components/Connection/ConnectionModal';
import ConfirmationModal from '@components/ConfirmationModal';
import { useSocket } from '@hooks/useSocket';
import { exportAppData, buildBackupPayload, parseImportFile, restoreAppData, formatExportDate } from '@utils/appData';

import './dataModal.css';

export default function DataModal({ open, onClose }) {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const [pendingImport, setPendingImport] = useState(null);
  const [connectionOpen, setConnectionOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const { status: socketStatus, connectedClients, send } = useSocket();
  const isConnected = socketStatus === 'connected';

  // ---- Export ----

  const handleExport = () => {
    try {
      exportAppData();
    } catch (err) {
      console.error('Export error:', err);
      setStatus('error');
      setErrorMessage('Failed to export app data.');
    }
  };

  // ---- Import ----

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus(null);
    setErrorMessage('');

    try {
      const result = await parseImportFile(file);
      setPendingImport(result);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
    e.target.value = '';
  };

  const handleConfirmImport = () => {
    if (!pendingImport) return;
    try {
      restoreAppData(pendingImport.data);
      setPendingImport(null);
      setStatus('success');
      setTimeout(() => window.location.reload(), 800);
    } catch (err) {
      console.error('Import error:', err);
      setPendingImport(null);
      setStatus('error');
      setErrorMessage('Failed to apply backup data.');
    }
  };

  // ---- Send to Device ----

  const handleSendToDevice = () => {
    if (!isConnected) {
      setConnectionOpen(true);
      return;
    }
    setSelectedRecipient(null);
    setTransferOpen(true);
  };

  const handleConfirmTransfer = () => {
    if (!selectedRecipient) return;
    send({
      type: 'transfer',
      to: selectedRecipient,
      data: buildBackupPayload(),
    });
    setTransferOpen(false);
    setSelectedRecipient(null);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} title="APP DATA" subtitle="Export, import, or transfer your data">
        <div className="dmod-actions">
          <button
            onClick={handleExport}
            className="dmod-action-btn"
            title="Export all app data including characters, settings, and preferences"
          >
            Export
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="dmod-action-btn"
            title="Import app data backup (will replace all current data)"
          >
            Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />

          <button
            onClick={handleSendToDevice}
            className="dmod-action-btn"
            title="Send all data to another connected device"
          >
            Send to Device
          </button>
        </div>

        {status === 'success' && (
          <div className="dmod-status dmod-status-success">
            <div className="dmod-status-title">Data imported successfully!</div>
            <div>Please refresh the page to load the imported data.</div>
          </div>
        )}

        {status === 'error' && (
          <div className="dmod-status dmod-status-error">
            <div className="dmod-status-title">Import Failed</div>
            <div>{errorMessage}</div>
          </div>
        )}
      </Modal>

      {/* Import confirm — shared ConfirmationModal (sr- system), see note above */}
      <ConfirmationModal
        open={Boolean(pendingImport)}
        title="Restore Backup"
        message={pendingImport
          ? `Restore backup from ${formatExportDate(pendingImport.exportDate)}?\n\nThis will replace all current app data including characters, notes, bookmarks, and Web state. This cannot be undone.`
          : ''}
        confirmLabel="Restore"
        cancelLabel="Cancel"
        danger
        onConfirm={handleConfirmImport}
        onCancel={() => setPendingImport(null)}
      />

      {/* Transfer recipient picker */}
      <Modal
        open={transferOpen}
        onClose={() => { setTransferOpen(false); setSelectedRecipient(null); }}
        title="Send to Device"
        message="Select the device to send all data to. Their current data will be replaced."
      >
        {connectedClients.length === 0 ? (
          <div className="dmod-empty">No other clients connected.</div>
        ) : (
          <div className="dmod-recipients">
            {connectedClients.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedRecipient(name)}
                className={selectedRecipient === name ? 'dmod-recipient dmod-recipient--selected' : 'dmod-recipient'}
              >
                {name}
              </button>
            ))}
          </div>
        )}
        <div className="dmod-transfer-actions">
          <button
            className="dmod-transfer-btn"
            onClick={handleConfirmTransfer}
            disabled={!selectedRecipient}
          >
            Send
          </button>
          <button
            className="dmod-transfer-btn dmod-transfer-btn-dim"
            onClick={() => { setTransferOpen(false); setSelectedRecipient(null); }}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Connection modal — shown when Send to Device is clicked while offline */}
      <ConnectionModal open={connectionOpen} onClose={() => setConnectionOpen(false)}>
        <span>Connect to the network first, then try Send to Device again.</span>
      </ConnectionModal>
    </>
  );
}
