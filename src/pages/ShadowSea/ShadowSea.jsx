import { useEffect, useMemo, useState } from 'react';

import Header from './components/Header/Header';
import List from './components/List';
import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal';

import {
  SHADOWSEA_PASSWORDS_KEY,
  SHADOWSEA_NODES_EXPANDED_KEY,
  SHADOWSEA_NODES_INDENT_KEY,
  SHADOWSEA_BOOKMARKS_KEY,
  getDiscoveredPasswords,
  saveDiscoveredPasswords,
} from '@utils/localStorage';

import {
  collapseSubtree,
  buildSearchIndex,
  getAncestorPaths,
} from '@utils/commands';

import { useGameMessages } from '@context/GameMessagesContext';
import { useSocket } from '@hooks/useSocket';

import SHADOWSEA_BBS_BASE_NODES from './nodes';

export default function ShadowSea() {
  const [discoveredPasswords, setDiscoveredPasswords] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const [bookmarks, setBookmarks] = useState({});

  const { shareUnlock } = useGameMessages();
  const { status } = useSocket();
  const isConnected = status === 'connected';
  const [pendingShareUnlock, setPendingShareUnlock] = useState(null);

  const [indent, setIndent] = useState(() => {
    try {
      const saved = localStorage.getItem(SHADOWSEA_NODES_INDENT_KEY);
      return saved !== null ? parseFloat(saved) : 1;
    } catch { return 1; }
  });

  useEffect(() => {
    setDiscoveredPasswords(getDiscoveredPasswords());
    try {
      const saved = localStorage.getItem(SHADOWSEA_NODES_EXPANDED_KEY);
      if (saved) setExpandedRows(JSON.parse(saved));
    } catch (e) { console.error('Failed to load tree state:', e); }
    try {
      const saved = localStorage.getItem(SHADOWSEA_BOOKMARKS_KEY);
      if (saved) setBookmarks(JSON.parse(saved));
    } catch (e) { console.error('Failed to load bookmarks:', e); }
  }, []);

  // Listen for unlocks pushed by GameMessagesProvider
  useEffect(() => {
    const handler = (e) => {
      const { path, value } = e.detail;
      setDiscoveredPasswords(prev => {
        const next = { ...prev, [path]: value ?? 'UNLOCKED' };
        try { localStorage.setItem(SHADOWSEA_PASSWORDS_KEY, JSON.stringify(next)); } catch {}
        return next;
      });
      setExpandedRows(prev => {
        const next = { ...prev, [path]: true };
        try { localStorage.setItem(SHADOWSEA_PASSWORDS_KEY, JSON.stringify(next)); } catch {}
        return next;
      });
    };
    window.addEventListener('passwordReceived', handler);
    return () => window.removeEventListener('passwordReceived', handler);
  }, []);

  useEffect(() => {
    if (Object.keys(discoveredPasswords).length > 0) {
      saveDiscoveredPasswords(discoveredPasswords);
    }
  }, [discoveredPasswords]);

  const searchIndex = useMemo(
    () => buildSearchIndex(SHADOWSEA_BBS_BASE_NODES, discoveredPasswords),
    [discoveredPasswords]
  );

  const handleToggle = (path) => {
    setExpandedRows(prev => {
      const next = { ...prev, [path]: !prev[path] };
      try { localStorage.setItem(SHADOWSEA_NODES_EXPANDED_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const handleUnlock = (path, value = 'UNLOCKED') => {
    setDiscoveredPasswords(prev => {
      const next = { ...prev, [path]: value };
      try { localStorage.setItem(SHADOWSEA_PASSWORDS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
    setExpandedRows(prev => {
      const next = { ...prev, [path]: true };
      try { localStorage.setItem(SHADOWSEA_NODES_EXPANDED_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const handleEvent = (event) => {
    switch (event.type) {
      case 'collapse_subtree':
        setExpandedRows(prev => {
          const next = collapseSubtree(prev, event.path);
          try { localStorage.setItem(SHADOWSEA_NODES_EXPANDED_KEY, JSON.stringify(next)); } catch {}
          return next;
        });
        break;

      case 'reset_tree':
        localStorage.removeItem(SHADOWSEA_NODES_EXPANDED_KEY);
        setExpandedRows({});
        break;

      case 'indent_change':
        setIndent(event.value);
        try { localStorage.setItem(SHADOWSEA_NODES_INDENT_KEY, String(event.value)); } catch {}
        break;

      case 'toggle_bookmark':
        setBookmarks(prev => {
          const next = { ...prev };
          if (next[event.path]) delete next[event.path];
          else next[event.path] = true;
          try { localStorage.setItem(SHADOWSEA_BOOKMARKS_KEY, JSON.stringify(next)); } catch {}
          return next;
        });
        break;

      case 'navigate_to': {
        const ancestors = getAncestorPaths(event.path);
        setExpandedRows(prev => {
          const next = { ...prev };
          ancestors.forEach(p => { next[p] = true; });
          try { localStorage.setItem(SHADOWSEA_NODES_EXPANDED_KEY, JSON.stringify(next)); } catch {}
          return next;
        });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            try {
              const el = document.querySelector(`[data-path="${event.path.replace(/"/g, '\\"')}"]`);
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } catch (e) { console.error('Failed to scroll to node:', e); }
          });
        });
        break;
      }

      case 'share_unlock':
        setPendingShareUnlock({ path: event.path, value: event.value });
        break;

      default:
        console.warn('Unhandled RetCom event:', event);
    }
  };

  return (
    <div className="sr-fullbleed">
      <Header
        indent={indent}
        searchIndex={searchIndex}
        bookmarks={bookmarks}
        onEvent={handleEvent}
      />

      <div className="sr-fullbleed-content">
        <List
          campaignCommandList={SHADOWSEA_BBS_BASE_NODES}
          discoveredPasswords={discoveredPasswords}
          expandedRows={expandedRows}
          bookmarks={bookmarks}
          indent={indent}
          onToggle={handleToggle}
          onUnlock={handleUnlock}
          onEvent={handleEvent}
          isConnected={isConnected}
        />
      </div>

      <ConfirmationModal
        open={Boolean(pendingShareUnlock)}
        title="Share Unlock"
        message={pendingShareUnlock
          ? `Share unlock for "${pendingShareUnlock.path.split('/').pop()}" with all connected players?${pendingShareUnlock.value && pendingShareUnlock.value !== 'UNLOCKED' ? `\n\nPassword: ${pendingShareUnlock.value}` : ''}`
          : ''}
        confirmLabel="Share"
        onConfirm={() => {
          shareUnlock(pendingShareUnlock.path, pendingShareUnlock.value);
          setPendingShareUnlock(null);
        }}
        onCancel={() => setPendingShareUnlock(null)}
      />
    </div>
  );
}
