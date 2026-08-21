// Reuses .sr-modal-backdrop/.sr-modal/.sr-modal-title/.sr-modal-actions
// as-is — no new CSS file needed, this is the same modal shape every
// other modal in the app already uses, not a separate visual system.
// `danger` swaps the confirm button to the red variant for destructive
// actions (character delete, restore-a-backup, etc.) — same "red means
// destructive" language used everywhere else.
export default function ConfirmationModal({
  open,
  title,
  message,
  confirmLabel = 'Yes',
  cancelLabel = 'No',
  danger = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="sr-modal-backdrop" onClick={onCancel}>
      <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="sr-modal-header">
            <h3 className="sr-modal-title">{title}</h3>
          </div>
        )}
        {message && (
          <p className="sr-modal-description" style={{ whiteSpace: 'pre-line' }}>{message}</p>
        )}
        <div className="sr-modal-actions">
          <button className="sr-btn sr-btn--secondary" onClick={onCancel}>{cancelLabel}</button>
          <button
            className={danger ? 'sr-btn sr-btn--danger' : 'sr-btn sr-btn--primary'}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
