import React, { useState, useEffect, useRef } from 'react';

const TYPE_COLORS = {
  CORP_NEWS:    'rgb(59, 130, 246)',
  STREET_INTEL: 'rgb(250, 204, 21)',
  GANG_CHATTER: 'rgb(239, 68, 68)',
  SEC_OPS:      'rgb(168, 85, 247)',
  SYSTEM:       'rgb(79, 209, 197)',
};

const TYPE_LABELS = {
  CORP_NEWS:    'CORP',
  STREET_INTEL: 'INTEL',
  GANG_CHATTER: 'GANG',
  SEC_OPS:      'SECOPS',
  SYSTEM:       'SYS',
};

export function NewsTicker({ feed = [], interval = 8000 }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (feed.length <= 1) return;

    const next = () => {
      setVisible(false);
      timeoutRef.current = setTimeout(() => {
        setIndex(prev => (prev + 1) % feed.length);
        setVisible(true);
        timeoutRef.current = setTimeout(next, interval);
      }, 600);
    };

    timeoutRef.current = setTimeout(next, interval);
    return () => clearTimeout(timeoutRef.current);
  }, [feed.length, interval]);

  if (!feed.length) return null;
  const current = feed[index];
  const color = TYPE_COLORS[current.type] || 'rgb(148, 163, 184)';
  const label = TYPE_LABELS[current.type] || current.type;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.25rem 1rem',
      borderTop: '1px solid rgba(77, 167, 188, 0.2)',
      backgroundColor: 'rgba(19, 23, 34, 0.4)',
      minWidth: 0,
      overflow: 'hidden',
    }}>
      <span style={{
        fontSize: '0.55rem',
        fontWeight: 'bold',
        color,
        letterSpacing: '0.1em',
        flexShrink: 0,
        fontFamily: 'monospace',
        transition: 'opacity 1s ease',
        opacity: visible ? 1 : 0,
      }}>
        [{label}]
      </span>
      <span style={{
        fontSize: '0.65rem',
        color: 'rgb(148, 163, 184)',
        fontFamily: 'monospace',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        transition: 'opacity 1s ease',
        opacity: visible ? 1 : 0,
      }}>
        {current.text}
      </span>
    </div>
  );
}
