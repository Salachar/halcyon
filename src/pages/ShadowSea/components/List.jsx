import { useState } from 'react';

import CommandRow from './CommandRow/CommandRow';
import PasswordPrompt from '@shadowsea/PasswordPrompt/PasswordPrompt';

import {
  SHADOWSEA_CONTENT_SIZE_KEY,
} from '@utils/localStorage';

const PARTIAL_HEIGHT = 150;
const CONTENT_BG = 'rgba(19, 23, 34, 0.6)';
const CONTENT_BORDER = 'rgba(77, 167, 188, 0.2)';
const FADE_COLOR = 'rgba(19, 23, 34, 0.95)';

// ============================================================================
// CONTENT PANEL
// ============================================================================

function ContentPanel({ children, size, onToggleSize, style = {} }) {
  const isPartial = size === 'partial';

  return (
    <div
      onDoubleClick={(e) => {
        if (e.target.closest('button, input, select, textarea, a')) return;
        if (e.defaultPrevented) return;
        e.stopPropagation();
        onToggleSize?.();
      }}
      style={{
        border: `1px solid ${CONTENT_BORDER}`,
        borderRadius: '4px',
        backgroundColor: CONTENT_BG,
        marginTop: '0.125rem',
        marginBottom: '0.125rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        ...style,
      }}
    >
      <div
        style={{
          padding: '0.75rem',
          maxHeight: isPartial ? `${PARTIAL_HEIGHT}px` : 'none',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>

      {isPartial && (
        <>
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '60px',
            background: `linear-gradient(to bottom, transparent, ${FADE_COLOR})`,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '0.4rem',
            left: 0, right: 0,
            textAlign: 'center',
            fontSize: '0.6rem',
            fontFamily: 'monospace',
            letterSpacing: '0.08em',
            color: 'rgba(79, 209, 197, 0.8)',
            pointerEvents: 'none',
          }}>
            Double tap to expand and collapse
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================
// RECURSIVE NODE
// ============================================================================

function CommandNode({
  id,
  def,
  path,
  depth,
  discoveredPasswords,
  expandedRows,
  contentSizes,
  bookmarks,
  isConnected,
  onToggle,
  onUnlock,
  onSetContentSize,
  onEvent,
  indent = 1,
}) {
  const isExpanded = Boolean(expandedRows[path]);
  const isBypassed = Boolean(discoveredPasswords[path]);
  const bypassValue = discoveredPasswords[path] ?? null;
  const isBookmarked = Boolean(bookmarks?.[path]);

  const hasBlocker = Boolean(def.password);
  const isLocked = hasBlocker && !isBypassed;
  const contentSize = (hasBlocker && !isBypassed) ? 'full' : contentSizes[path] ?? 'full';
  const resolvedContent = def.content ?? null;

  const hasContent = Boolean(resolvedContent);
  const hasChildren = Boolean(
    def.related_commands && Object.keys(def.related_commands).length > 0
  );
  const childCount = hasChildren ? Object.keys(def.related_commands).length : 0;
  const isExpandable = isLocked || hasContent || hasChildren;

  const childEntries = hasChildren ? Object.entries(def.related_commands) : [];
  const showContentPanel = isExpanded && (isLocked || hasContent);

  const handleToggleSize = () => {
    if (hasBlocker && !isBypassed) return;
    onSetContentSize(path, contentSize === 'full' ? 'partial' : 'full');
  };

  const renderBlocker = () => {
    if (hasBlocker) {
      return (
        <PasswordPrompt
          key={path}
          command={path}
          commandDef={def}
          password={def.password.pw}
          hint={def.password.hint}
          showCount={def.password.showCount}
          showFirst={def.password.showFirst}
          showFrequency={def.password.showFrequency}
          decoyLetters={def.password.decoyLetters}
          lockType={def.password.lockType}
          onSubmit={(cmdPath, cmdDef, password) => onUnlock(cmdPath, password)}
        >
          {def.password?.content ?? null}
        </PasswordPrompt>
      );
    }
    return null;
  };

  return (
    <div>
      <div>
        <CommandRow
          path={path}
          displayName={id}
          favicon={def.favicon ?? null}
          preview={def.preview ?? null}
          isLocked={isLocked}
          isBypassed={isBypassed}
          hasBlocker={hasBlocker}
          bypassValue={bypassValue}
          isExpanded={isExpanded}
          isExpandable={isExpandable}
          hasChildren={hasChildren}
          childCount={childCount}
          depth={depth}
          hasContent={isExpanded && (isLocked || hasContent)}
          contentSize={contentSize}
          isBookmarked={isBookmarked}
          isConnected={isConnected}
          onToggleSize={handleToggleSize}
          onCollapse={() => onEvent({ type: 'collapse_subtree', path })}
          onToggleBookmark={() => onEvent({ type: 'toggle_bookmark', path })}
          onShareUnlock={() => onEvent({ type: 'share_unlock', path, value: bypassValue })}
          onClick={() => isExpandable && onToggle(path)}
          style={{
            marginLeft: `${depth * indent}rem`,
          }}
        />

        {showContentPanel && (
          <ContentPanel
            size={contentSize}
            onToggleSize={handleToggleSize}
            style={{
              marginLeft: `${contentSize === 'partial' ? (depth * indent) + 'rem' : '0'}`
            }}
          >
            {isLocked ? renderBlocker() : resolvedContent}
          </ContentPanel>
        )}
      </div>

      {isExpanded && !isLocked && hasChildren && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '0.5rem',
          }}
        >
          {childEntries.map(([childId, childDef]) => {
            const childPath = `${path}/${childId}`;
            return (
              <CommandNode
                key={childPath}
                id={childId}
                def={childDef}
                path={childPath}
                depth={depth + 1}
                discoveredPasswords={discoveredPasswords}
                expandedRows={expandedRows}
                contentSizes={contentSizes}
                bookmarks={bookmarks}
                isConnected={isConnected}
                onToggle={onToggle}
                onUnlock={onUnlock}
                onSetContentSize={onSetContentSize}
                indent={indent}
                onEvent={onEvent}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// LIST
// ============================================================================

export default function List({
  campaignCommandList = [],
  discoveredPasswords = {},
  expandedRows = {},
  bookmarks = {},
  isConnected = false,
  indent = 1,
  onToggle,
  onUnlock,
  onEvent,
}) {
  const [contentSizes, setContentSizes] = useState(() => {
    try {
      const saved = localStorage.getItem(SHADOWSEA_CONTENT_SIZE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const handleSetContentSize = (path, size) => {
    setContentSizes(prev => {
      const updated = { ...prev, [path]: size };
      try {
        localStorage.setItem(SHADOWSEA_CONTENT_SIZE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save content sizes:', e);
      }
      return updated;
    });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    }}>
      {Object.keys(campaignCommandList).map((command_id) => (
        <CommandNode
          key={command_id}
          id={command_id}
          def={campaignCommandList[command_id]}
          path={command_id}
          depth={0}
          discoveredPasswords={discoveredPasswords}
          expandedRows={expandedRows}
          contentSizes={contentSizes}
          bookmarks={bookmarks}
          isConnected={isConnected}
          onToggle={onToggle}
          onUnlock={onUnlock}
          onSetContentSize={handleSetContentSize}
          indent={indent}
          onEvent={onEvent}
        />
      ))}
    </div>
  );
}
