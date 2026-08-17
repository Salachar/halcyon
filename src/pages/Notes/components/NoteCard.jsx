import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/IosShare';

import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal';

import './noteCard.css';

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

export default function NoteCard({ note, onSave, onDelete, onShare, isConnected = false }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(note.text);
  const [justShared, setJustShared] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const startEdit = () => {
    setDraft(note.text);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(note.text);
    setEditing(false);
  };

  const saveEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      cancelEdit();
      return;
    }
    onSave?.(note.id, trimmed);
    setEditing(false);
  };

  const handleShare = () => {
    const ok = onShare?.(note);
    if (ok) {
      setJustShared(true);
      setTimeout(() => setJustShared(false), 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const wasEdited = note.updatedAt && note.updatedAt !== note.createdAt;

  return (
    <div className="nc-root">
      <div className="nc-meta-row">
        <span className="nc-timestamp">
          {formatTimestamp(note.createdAt)}
          {wasEdited && <span className="nc-edited">(edited)</span>}
        </span>

        <div className="nc-controls">
          {editing ? (
            <>
              <button className="nc-btn" onClick={saveEdit} title="Save">
                <CheckIcon style={{ fontSize: 14 }} />
              </button>
              <button className="nc-btn" onClick={cancelEdit} title="Cancel">
                <CloseIcon style={{ fontSize: 14 }} />
              </button>
            </>
          ) : (
            <>
              {isConnected && (
                <button
                  className={`nc-btn ${justShared ? 'nc-btn-shared' : ''}`}
                  onClick={handleShare}
                  title="Share to network"
                >
                  <ShareIcon style={{ fontSize: 14 }} />
                </button>
              )}
              <button className="nc-btn" onClick={startEdit} title="Edit">
                <EditIcon style={{ fontSize: 14 }} />
              </button>
              <button className="nc-btn nc-btn-danger" onClick={() => setConfirmDelete(true)} title="Delete">
                <DeleteIcon style={{ fontSize: 14 }} />
              </button>
            </>
          )}
        </div>
      </div>

      {editing ? (
        <textarea
          className="nc-edit-textarea"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div className="nc-body">{note.text}</div>
      )}

      <ConfirmationModal
        open={confirmDelete}
        title="Delete Note"
        message="Delete this note? This cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => { setConfirmDelete(false); onDelete?.(note.id); }}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
