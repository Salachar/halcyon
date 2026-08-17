import React, { useState } from 'react';

import CollapseIcon from '@mui/icons-material/UnfoldLess';
import SearchIcon from '@mui/icons-material/Search';

import { NewsTicker } from './NewsTicker';
import SearchBookmarksModal from './SearchBookmarksModal';
import { useSocket } from '@hooks/useSocket';

import { EVENT_FEED } from '@data/random/eventFeed';

const BG = 'rgb(27, 36, 58)';
const BORDER = 'rgb(77, 167, 188)';
const TEAL = 'rgb(79, 209, 197)';
const AMBER = 'rgb(251, 191, 36)';
const DIM = 'rgb(148, 163, 184)';

const INDENT_OPTIONS = [0, 1, 1.5];

function GmStatusReadout({ time, activity, note }) {
  if (!time && !activity && !note) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flex: 1,
        minWidth: 0,
        overflow: 'hidden',
        marginLeft: '0.75rem',
      }} />
    )
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      marginLeft: '0.75rem',
    }}>
      {time && (
        <div
          title={time}
          style={{
            fontSize: '1.5rem',
            lineHeight: '1.5rem',
            fontWeight: 'bold',
            color: TEAL,
            textShadow: '0 0 8px rgba(79, 209, 197, 0.4)',
            letterSpacing: '0.04em',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {time}
        </div>
      )}

      {(activity || note) && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.15rem',
          minWidth: 0,
          overflow: 'hidden',
        }}>
          {activity && (
            <div
              title={`Activity: ${activity}`}
              style={{
                fontSize: '0.62rem',
                fontFamily: 'monospace',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ color: AMBER, fontWeight: 'bold' }}>Activity: </span>
              <span style={{ color: 'rgb(203, 213, 225)' }}>{activity}</span>
            </div>
          )}
          {note && (
            <div
              title={note}
              style={{
                fontSize: '0.62rem',
                fontFamily: 'monospace',
                color: 'rgb(203, 213, 225)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HeaderButton({ onClick, title, children, square = false, style = {} }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={title}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.3rem',
        padding: square ? '0.35rem' : '0.35rem 0.6rem',
        backgroundColor: hover ? 'rgba(79, 209, 197, 0.16)' : 'rgba(79, 209, 197, 0.08)',
        color: hover ? TEAL : 'rgba(79, 209, 197, 0.75)',
        border: '1px solid rgba(79, 209, 197, 0.3)',
        borderRadius: '2px',
        cursor: 'pointer',
        fontFamily: 'monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
        transition: 'background-color 0.15s ease, color 0.15s ease',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function IndentControl({ indent, onChange }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'stretch',
      border: '1px solid rgba(79, 209, 197, 0.3)',
      borderRadius: '2px',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <span style={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.6rem',
        color: 'rgba(79, 209, 197, 0.5)',
        fontFamily: 'monospace',
        letterSpacing: '0.08em',
        padding: '0 0.5rem',
        backgroundColor: 'rgba(79, 209, 197, 0.04)',
        borderRight: '1px solid rgba(79, 209, 197, 0.2)',
      }}>
        INDENT
      </span>

      {INDENT_OPTIONS.map((val, i) => (
        <button
          key={val}
          onClick={() => onChange(val)}
          style={{
            padding: '0.35rem 0.55rem',
            fontSize: '0.65rem',
            fontFamily: 'monospace',
            backgroundColor: indent === val ? 'rgba(79, 209, 197, 0.22)' : 'transparent',
            color: indent === val ? TEAL : 'rgba(79, 209, 197, 0.55)',
            border: 'none',
            borderLeft: i > 0 ? '1px solid rgba(79, 209, 197, 0.2)' : 'none',
            cursor: 'pointer',
          }}
        >
          {val}
        </button>
      ))}
    </div>
  );
}

export default function Header({
  indent = 1,
  searchIndex = [],
  bookmarks = {},
  onEvent = () => {},
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { gmStatus } = useSocket();

  return (
    <div style={{
      backgroundColor: BG,
      borderBottom: `1px solid ${BORDER}`,
      flexShrink: 0,
      fontFamily: 'monospace',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1rem',
      }}>
        {/* Logo */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: TEAL, letterSpacing: '0.1em', textShadow: `0 0 8px rgba(79, 209, 197, 0.4)`, lineHeight: 1 }}>
            ShadowSea BBS
          </div>
          <div style={{ fontSize: '0.55rem', color: DIM, marginTop: '0.15rem', letterSpacing: '0.08em' }}>
            Still here. Still listening.
          </div>
        </div>

        <GmStatusReadout
          time={gmStatus?.time}
          activity={gmStatus?.activity}
          note={gmStatus?.note}
        />

        {/* Everything else, right-aligned */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
          <IndentControl
            indent={indent}
            onChange={(val) => onEvent({ type: 'indent_change', value: val })}
          />

          <div style={{ width: '1px', height: '28px', backgroundColor: BORDER, opacity: 0.3 }} />

          <HeaderButton onClick={() => setSearchOpen(true)} title="Search & Bookmarks">
            <SearchIcon style={{ fontSize: 14 }} />
            Search &amp; Bookmarks
          </HeaderButton>

          <HeaderButton onClick={() => onEvent({ type: 'reset_tree' })} title="Collapse all" square>
            <CollapseIcon style={{ fontSize: 16 }} />
          </HeaderButton>
        </div>
      </div>

      {EVENT_FEED.length > 0 && <NewsTicker feed={EVENT_FEED} />}

      <SearchBookmarksModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchIndex={searchIndex}
        bookmarks={bookmarks}
        onNavigate={(path) => onEvent({ type: 'navigate_to', path })}
        onToggleBookmark={(path) => onEvent({ type: 'toggle_bookmark', path })}
      />
    </div>
  );
}
