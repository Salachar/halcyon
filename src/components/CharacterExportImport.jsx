import { useRef, useState } from 'react';
import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal';
import ConnectionModal from '@components/Connection/ConnectionModal';
import { useSocket } from '@hooks/useSocket';

export default function AppDataExportImport({
  character = null,
  onUpdate = () => {},
}) {
  const fileInputRef = useRef(null);
  const [importStatus, setImportStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [pendingImport, setPendingImport] = useState(null);
  const [connectionOpen, setConnectionOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const { status, connectedClients, send } = useSocket();
  const isConnected = status === 'connected';

  // ── Export ──────────────────────────────────────────────────────────────────

  const handleExport = () => {
    try {
      const appData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        appData[key] = localStorage.getItem(key);
      }
      const exportData = {
        appData,
        _meta: {
          exportDate: new Date().toISOString(),
          appVersion: '1.0.0',
          type: 'shadowrun_full_backup',
        },
      };
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `shadowrun_backup_${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      setImportStatus('error');
      setErrorMessage('Failed to export app data.');
    }
  };

  // ── Import ──────────────────────────────────────────────────────────────────

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setImportStatus(null);
    setErrorMessage('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!imported._meta || imported._meta.type !== 'shadowrun_full_backup') {
          setImportStatus('error');
          setErrorMessage('Invalid backup file format.');
          return;
        }
        if (!imported.appData) {
          setImportStatus('error');
          setErrorMessage('No app data found in backup file.');
          return;
        }
        setPendingImport({ data: imported.appData, exportDate: imported._meta.exportDate });
      } catch (error) {
        console.error('Import parse error:', error);
        setImportStatus('error');
        setErrorMessage('Failed to read file. Invalid or corrupted backup.');
      }
    };
    reader.onerror = () => {
      setImportStatus('error');
      setErrorMessage('Failed to read file.');
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleConfirmImport = () => {
    if (!pendingImport) return;
    try {
      localStorage.clear();
      Object.keys(pendingImport.data).forEach(key => {
        localStorage.setItem(key, pendingImport.data[key]);
      });
      setPendingImport(null);
      setImportStatus('success');
      setTimeout(() => window.location.reload(), 800);
    } catch (error) {
      console.error('Import error:', error);
      setPendingImport(null);
      setImportStatus('error');
      setErrorMessage('Failed to apply backup data.');
    }
  };

  // ── Send to Device ──────────────────────────────────────────────────────────

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
    const appData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      appData[key] = localStorage.getItem(key);
    }
    send({
      type: 'transfer',
      to: selectedRecipient,
      data: {
        appData,
        _meta: {
          exportDate: new Date().toISOString(),
          appVersion: '1.0.0',
          type: 'shadowrun_full_backup',
        },
      },
    });
    setTransferOpen(false);
    setSelectedRecipient(null);
  };

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const formatExportDate = (iso) => {
    try {
      return new Date(iso).toLocaleString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: '2-digit',
      });
    } catch { return iso; }
  };

  const buttonClass = "px-4 py-2 bg-gray-800 border-2 border-cy-cyan-subtle text-white font-bold uppercase text-xs transition-all shadow-lg shadow-cy-cyan/30";
  const buttonStyles = { color: "white", cursor: "pointer", opacity: "0.6" };

  const otherClients = connectedClients;

  return (
    <div>
      <div className="flex justify-end gap-3 mb-4">
        <button onClick={handleExport} className={buttonClass} style={buttonStyles}
          title="Export all app data including characters, settings, and preferences">
          Export
        </button>

        <label className={buttonClass} style={buttonStyles}
          title="Import app data backup (will replace all current data)">
          Import
          <input ref={fileInputRef} type="file" accept=".json"
            onChange={handleFileSelect} className="hidden" />
        </label>

        <button onClick={handleSendToDevice} className={buttonClass} style={buttonStyles}
          title="Send all data to another connected device">
          Send to Device
        </button>

        {Boolean(character) && (
          <button onClick={() => { character.toggleLock(); onUpdate(); }}
            className={buttonClass} style={buttonStyles}>
            {character.locked ? "Locked" : "Unlocked"}
          </button>
        )}
      </div>

      {importStatus === 'success' && (
        <div className="bg-cy-cyan/20 border border-cy-cyan p-4 mb-4 animate-pulse">
          <p className="text-cy-cyan font-bold text-sm">Data imported successfully!</p>
          <p className="text-gray-300 text-sm mt-2">Please refresh the page to load the imported data.</p>
        </div>
      )}

      {importStatus === 'error' && (
        <div className="bg-red-900/20 border border-red-500 p-4 mb-4">
          <p className="text-red-400 font-bold text-sm">Import Failed</p>
          <p className="text-gray-300 text-sm mt-2">{errorMessage}</p>
        </div>
      )}

      {/* Import confirm */}
      <ConfirmationModal
        open={Boolean(pendingImport)}
        title="Restore Backup"
        message={pendingImport
          ? `Restore backup from ${formatExportDate(pendingImport.exportDate)}?\n\nThis will replace all current app data including characters, notes, bookmarks, and RetCom state. This cannot be undone.`
          : ''}
        confirmLabel="Restore"
        cancelLabel="Cancel"
        onConfirm={handleConfirmImport}
        onCancel={() => setPendingImport(null)}
      />

      {/* Transfer recipient picker */}
      {transferOpen && (
        <div className="cm-overlay" onClick={() => setTransferOpen(false)}>
          <div className="cm-modal" onClick={e => e.stopPropagation()}>
            <div className="cm-title">Send to Device</div>
            <div className="cm-message">
              Select the device to send all data to. Their current data will be replaced.
            </div>
            {otherClients.length === 0 ? (
              <div className="cm-message" style={{ opacity: 0.6 }}>No other clients connected.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                {otherClients.map(name => (
                  <button
                    key={name}
                    onClick={() => setSelectedRecipient(name)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontFamily: 'monospace',
                      fontSize: '0.8rem',
                      textAlign: 'left',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      backgroundColor: selectedRecipient === name
                        ? 'rgba(79, 209, 197, 0.2)' : 'rgba(29, 35, 50, 0.5)',
                      color: selectedRecipient === name
                        ? 'rgb(79, 209, 197)' : 'rgb(203, 213, 225)',
                      border: `1px solid ${selectedRecipient === name
                        ? 'rgba(79, 209, 197, 0.5)' : 'rgba(79, 209, 197, 0.2)'}`,
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
            <div className="cm-actions">
              <button
                className="cm-btn cm-btn-confirm"
                onClick={handleConfirmTransfer}
                disabled={!selectedRecipient}
                style={{ opacity: selectedRecipient ? 1 : 0.35, cursor: selectedRecipient ? 'pointer' : 'not-allowed' }}
              >
                Send
              </button>
              <button className="cm-btn cm-btn-cancel"
                onClick={() => { setTransferOpen(false); setSelectedRecipient(null); }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connection modal — shown when Send to Device is clicked while offline */}
      <ConnectionModal
        open={connectionOpen}
        onClose={() => setConnectionOpen(false)}
      >
        <span>Connect to the network first, then try Send to Device again.</span>
      </ConnectionModal>
    </div>
  );
}
