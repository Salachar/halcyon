import { useEffect, useState } from 'react';
import { useSocket } from '@hooks/useSocket';
import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit',
    });
  } catch { return iso; }
}

export default function TransferReceiver() {
  const { subscribe } = useSocket();
  const [pendingTransfer, setPendingTransfer] = useState(null);

  useEffect(() => {
    const unsub = subscribe('transfer', (data) => {
      if (!data.data?.appData) return;
      setPendingTransfer(data.data);
    });
    return unsub;
  }, [subscribe]);

  const handleAccept = () => {
    if (!pendingTransfer?.appData) return;
    try {
      localStorage.clear();
      Object.keys(pendingTransfer.appData).forEach(key => {
        localStorage.setItem(key, pendingTransfer.appData[key]);
      });
      setPendingTransfer(null);
      setTimeout(() => window.location.reload(), 400);
    } catch (e) {
      console.error('Transfer apply failed:', e);
      setPendingTransfer(null);
    }
  };

  return (
    <ConfirmationModal
      open={Boolean(pendingTransfer)}
      title="Incoming Transfer"
      message={pendingTransfer
        ? `Another device is sending you their data (from ${formatDate(pendingTransfer._meta?.exportDate)}).\n\nThis will replace all your current app data. Accept?`
        : ''}
      confirmLabel="Accept"
      cancelLabel="Decline"
      onConfirm={handleAccept}
      onCancel={() => setPendingTransfer(null)}
    />
  );
}
