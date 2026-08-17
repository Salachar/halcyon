import { useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

import NoteCard from './components/NoteCard';
import SharedNoteCard from './components/SharedNoteCard';
import ConfirmationModal from '@components/ConfirmationModal';

import { useSocket } from '@hooks/useSocket';
import { useGameMessages } from '@context/GameMessagesContext';
import { getNotes, saveNotes } from '@utils/localStorage';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [draft, setDraft] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);
  const listRef = useRef(null);

  const { status } = useSocket();
  const { shareNote, sharedFeedList, deleteSharedNote } = useGameMessages();

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [notes.length, sharedFeedList.length]);

  const persist = (next) => {
    setNotes(next);
    saveNotes(next);
  };

  const handleAdd = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    const now = Date.now();
    persist([...notes, {
      id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
      text: trimmed,
      createdAt: now,
      updatedAt: now,
    }]);
    setDraft('');
  };

  const handleSaveEdit = (id, newText) => {
    persist(notes.map(n => n.id === id
      ? { ...n, text: newText, updatedAt: Date.now() }
      : n
    ));
  };

  const handleDelete = (id) => {
    persist(notes.filter(n => n.id !== id));
  };

  const isConnected = status === 'connected';

  const allItems = [
    ...notes.map(n => ({ ...n, _type: 'personal' })),
    ...sharedFeedList.map(n => ({ ...n, _type: 'shared' })),
  ].sort((a, b) => a.createdAt - b.createdAt);

  return (
    <div className="sr-fullbleed">
      <div className="notes-header">
        <div>
          <div className="notes-header-title">NOTES</div>
          <div className="notes-header-subtitle">SHAREABLE WHEN CONNECTED</div>
        </div>

        <div className="notes-header-right">
          <button
            className="sr-btn sr-btn--danger notes-icon-btn"
            onClick={() => notes.length > 0 && setConfirmClear(true)}
          >
            <DeleteSweepIcon style={{ fontSize: 14 }} />
            Clear All
          </button>
        </div>
      </div>

      <div className="notes-input-bar">
        <textarea
          className="notes-input"
          placeholder="Write a note..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
        />
        <button
          className="sr-btn sr-btn--primary"
          onClick={handleAdd}
          disabled={!draft.trim()}
          title="Add note"
        >
          <SendIcon style={{ fontSize: 18 }} />
        </button>
      </div>

      <div className="sr-fullbleed-content notes-list" ref={listRef}>
        {allItems.length === 0 ? (
          <div className="notes-empty">No notes yet. Jot something down above.</div>
        ) : (
          allItems.map(item =>
            item._type === 'personal' ? (
              <NoteCard
                key={item.id}
                note={item}
                onSave={handleSaveEdit}
                onDelete={handleDelete}
                onShare={shareNote}
                isConnected={isConnected}
              />
            ) : (
              <SharedNoteCard
                key={`shared-${item.id}`}
                note={item}
                onDelete={deleteSharedNote}
              />
            )
          )
        )}
      </div>

      <ConfirmationModal
        open={confirmClear}
        title="Clear All Notes"
        message="Delete all personal notes? This cannot be undone."
        confirmLabel="Clear All"
        onConfirm={() => { persist([]); setConfirmClear(false); }}
        onCancel={() => setConfirmClear(false)}
      />

    </div>
  );
}
