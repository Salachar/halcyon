import React, { useEffect, useState } from "react";
import { HALCYON_COLLAPSED_SECTIONS_KEY } from '@utils/localStorage';

function readCollapseStates() {
  try {
    const stored = localStorage.getItem(HALCYON_COLLAPSED_SECTIONS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function writeCollapseState(id, isOpen) {
  try {
    const states = readCollapseStates();
    states[id] = isOpen;
    localStorage.setItem(HALCYON_COLLAPSED_SECTIONS_KEY, JSON.stringify(states));
  } catch (e) {
    console.error('Failed to save collapse state:', e);
  }
}

// A Section that can hide its content and remembers open/closed per `id`
// across visits. `headerExtra` is an optional slot (e.g. a badge) rendered
// only while open, and doesn't trigger the toggle when clicked.
export const CollapsibleSection = ({
  id,
  title,
  defaultOpen = true,
  headerExtra,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(() => {
    const saved = readCollapseStates()[id];
    return saved !== undefined ? saved : defaultOpen;
  });

  const toggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      writeCollapseState(id, next);
      return next;
    });
  };

  return (
    <div className="sr-collapsible">
      <div className="sr-collapsible-header" onClick={toggle}>
        <div className="sr-collapsible-title-row">
          <span className={isOpen ? 'sr-collapsible-chevron sr-collapsible-chevron--open' : 'sr-collapsible-chevron'}>▸</span>
          <h2 className="sr-collapsible-title">{title}</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isOpen && headerExtra && (
            <div onClick={(e) => e.stopPropagation()}>{headerExtra}</div>
          )}
          <span className="sr-collapsible-hint">{isOpen ? 'Collapse' : 'Expand'}</span>
        </div>
      </div>
      {isOpen && children}
    </div>
  );
};
