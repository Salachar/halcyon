import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal';
import './sharedNoteCard.css';

function formatTimestamp(ms) {
  const date = new Date(ms);
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function SharedNoteCard({ note, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const wasEdited = note.updatedAt && note.updatedAt !== note.createdAt;

  return (
    <div className="snc-root">
      <div className="snc-meta-row">
        <span className="snc-from">
          {note.from
            ? <span className="snc-from-name">{note.from}</span>
            : <span className="snc-from-anon">anonymous</span>
          }
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="snc-timestamp">
            {formatTimestamp(note.updatedAt ?? note.createdAt)}
            {wasEdited && <span className="snc-edited">(edited)</span>}
          </span>
          {onDelete && (
            <button
              className="snc-delete-btn"
              onClick={() => setConfirmDelete(true)}
              title="Remove from shared feed"
            >
              <DeleteIcon style={{ fontSize: 13 }} />
            </button>
          )}
        </div>
      </div>

      <div className="snc-body">{note.text}</div>

      <ConfirmationModal
        open={confirmDelete}
        title="Remove Shared Note"
        message="Remove this note from your shared feed? This only affects your view."
        confirmLabel="Remove"
        onConfirm={() => { setConfirmDelete(false); onDelete?.(note.id); }}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
