import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import Modal from '@components/Modal/Modal';
import SearchResultRow from './SearchResultRow';
import { searchIndex_filter } from '@utils/commands';

import './searchBookmarksModal.css';

export default function SearchBookmarksModal({
  open,
  onClose,
  searchIndex = [],
  bookmarks = {},
  onNavigate,
  onToggleBookmark,
}) {
  const [query, setQuery] = useState('');

  const bookmarkedEntries = searchIndex.filter(entry => bookmarks[entry.path]);
  const results = query.trim() ? searchIndex_filter(searchIndex, query, 20) : [];

  const handleNavigate = (path) => {
    onNavigate?.(path);
    onClose?.();
  };

  const handleClose = () => {
    setQuery('');
    onClose?.();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="SEARCH & BOOKMARKS"
      className="sbm-modal"
      bodyClassName="sbm-body-scroll"
    >
      {/* Bookmarks */}
      <div className="sbm-section-label">BOOKMARKS</div>
      {bookmarkedEntries.length === 0 ? (
        <div className="sbm-empty">No bookmarks yet — tap the star on a command to save it here.</div>
      ) : (
        <div className="sbm-results">
          {bookmarkedEntries.map(entry => (
            <SearchResultRow
              key={entry.path}
              entry={entry}
              isBookmarked={true}
              onNavigate={handleNavigate}
              onToggleBookmark={() => onToggleBookmark?.(entry.path)}
            />
          ))}
        </div>
      )}

      <div className="sbm-divider" />

      {/* Search */}
      <div className="sbm-section-label">SEARCH</div>
      <div className="sbm-search-input-wrap">
        <SearchIcon style={{ fontSize: 16, color: 'rgba(79, 209, 197, 0.6)' }} />
        <input
          autoFocus
          className="sbm-search-input"
          type="text"
          placeholder="Search commands..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {query.trim() && (
        <div className="sbm-results" style={{ marginTop: '0.5rem' }}>
          {results.length === 0 ? (
            <div className="sbm-empty">No results.</div>
          ) : (
            results.map(entry => (
              <SearchResultRow
                key={entry.path}
                entry={entry}
                isBookmarked={Boolean(bookmarks[entry.path])}
                onNavigate={handleNavigate}
                onToggleBookmark={() => onToggleBookmark?.(entry.path)}
              />
            ))
          )}
        </div>
      )}
    </Modal>
  );
}
