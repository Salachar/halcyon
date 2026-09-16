// Styled-components for the new CharacterHeader — migrated/redesigned
// from characterSheet.css's .sr-sheet-header/.sr-sheet-name-input/
// .sr-sheet-meta/.sr-sheet-attributes/.sr-sheet-resources-row/
// .sr-sheet-resources (all of which move here; .sr-sheet-empty stays
// in characterSheet.css, used by the Qualities section which isn't
// moving). Stack order: identity, resources, condition monitors
// (separate component, unchanged import), attributes.

import styled from '@emotion/styled';

export const HeaderPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 0.9rem 1rem;
  background-color: var(--sr-bg-panel-solid);
  border: 1px solid var(--sr-hairline);
  border-radius: var(--sr-radius);
`;

export const NameInput = styled.input`
  font-family: var(--sr-font);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--sr-blue-bright);
  text-align: left;
  background-color: var(--sr-bg-base);
  border: 1px solid var(--sr-blue-dim);
  border-radius: var(--sr-radius);
  padding: 0.4rem 0.6rem;
  outline: none;

  &:focus {
    border-color: var(--sr-blue);
  }
  &::placeholder {
    color: var(--sr-text-dim);
  }
`;

export const MetaLine = styled.div`
  font-size: 0.8rem;
  color: var(--sr-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const ResourcesRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const InfoStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--sr-text-muted);
`;

export const InfoLine = styled.span`
  strong {
    color: var(--sr-text);
  }
`;

// Placeholder gold/yellow circle — real coin art later. Number shown
// bare (no ¥ symbol) to leave room for larger values; the color itself
// already reads as currency.
export const MoneyCoin = styled.button`
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: #d4a017;
  border: 3px solid #8b6508;
  color: #2a1e00;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.3rem;

  &:hover {
    filter: brightness(1.1);
  }
`;

// Simple casino-chip approximation — dashed outer ring plus a thin
// inner ring, matching the classic double-ring chip look without
// needing real art. Deliberately non-interactive for now (no onClick,
// no hover/cursor styling) — see CharacterHeader.jsx's own comment for
// why. Shows currentEdge, not the base Edge rating (already visible in
// the attributes grid below).
// Now clickable — opens EdgeModal, the consolidated home for Edge
// management this token was built non-clickable pending. Simple
// casino-chip approximation (dashed outer ring, thin inner ring)
// unchanged from before.
export const EdgeToken = styled.button`
  position: relative;
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: var(--sr-bg-base);
  border: 4px dashed var(--sr-orange-bright);
  color: var(--sr-orange-bright);
  font-weight: 700;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(1.15);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 7px;
    border-radius: 50%;
    border: 2px solid var(--sr-orange-bright);
    opacity: 0.4;
  }
`;

export const AttributesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 0.5rem;
`;

// Wraps each AttributeBox to make it clickable without touching
// AttributeBox.jsx itself (not loaded this session) — a plain
// unstyled-button reset, just providing the click target and a
// positioning context for the badge below.
export const AttributeBoxButton = styled.button`
  all: unset;
  position: relative;
  cursor: pointer;
  display: block;
`;

// Shown only when that attribute's persisting adjustment is nonzero —
// the "indicated in the header" requirement. Small enough not to
// disturb AttributeBox's own layout, positioned as an overlay corner
// badge instead.
export const AdjustmentBadge = styled.span`
  position: absolute;
  top: -0.35rem;
  right: -0.35rem;
  background-color: var(--sr-orange-bright);
  color: var(--sr-bg-black);
  font-size: 0.6rem;
  font-weight: 700;
  padding: 0.05rem 0.3rem;
  border-radius: var(--sr-radius);
  z-index: 1;
  pointer-events: none;
`;

// Plain circular token, same size/shape as MoneyCoin but visually
// neutral — Noise doesn't have a clear "good/bad direction" the way
// Overwatch has a convergence threshold, so no color-coding here, just
// the current signed value. Shows base+auto only, not any currently-
// toggled conditional modifier (that state is internal to NoiseTracker
// itself, not visible from the header) — the modal this opens always
// shows the true, complete effective value.
export const NoiseToken = styled.button`
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: var(--sr-bg-panel-solid);
  border: 3px solid var(--sr-hairline);
  color: var(--sr-text);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: var(--sr-blue-dim);
  }
`;

// Real radial gauge — conic-gradient fill showing score/40 progress
// toward Convergence, same 4-level color scheme OverwatchTracker's own
// horizontal gauge already uses (low/mid/high/full). $pct and $level
// are transient props (Emotion convention), computed by the caller.
const OVERWATCH_LEVEL_COLORS = {
  low: 'var(--sr-blue)',
  mid: 'var(--sr-amber)',
  high: 'var(--sr-orange)',
  full: 'var(--sr-red)',
};

export const OverwatchToken = styled.button`
  position: relative;
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    `conic-gradient(${OVERWATCH_LEVEL_COLORS[props.$level]} ${props.$pct}%, var(--sr-bg-base) ${props.$pct}% 100%)`};

  &::after {
    content: '';
    position: absolute;
    inset: 5px;
    border-radius: 50%;
    background-color: var(--sr-bg-panel-solid);
    z-index: 0;
  }
`;

export const OverwatchValue = styled.span`
  position: relative;
  z-index: 1;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--sr-text);
`;
