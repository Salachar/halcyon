import React, { useEffect, useRef } from 'react';
import './toast.css';

// ─── Individual Toast ─────────────────────────────────────────────────────────

function ToastItem({ toast, onDismiss }) {
  const { id, type = 'info', label, message, duration = 5000 } = toast;
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => onDismiss(id), duration);
    return () => clearTimeout(timerRef.current);
  }, [id, duration, onDismiss]);

  return (
    <div
      className={`toast toast-${type}`}
      style={{ position: 'relative', overflow: 'hidden' }}
      onClick={() => onDismiss(id)}
    >
      {label && <span className="toast-label">{label}</span>}
      <span className="toast-body">{message}</span>
      <span className="toast-dismiss">✕</span>
      <div
        className="toast-progress"
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
}

// ─── Toast Container ──────────────────────────────────────────────────────────

export default function ToastDisplay({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}
