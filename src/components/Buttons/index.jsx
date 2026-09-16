// Styled-components replacing the sr-btn/sr-btn--*/sr-icon-btn/
// sr-buy-btn className system — pure styling, no logic, so everything
// lives in one file rather than splitting a .styles.js out from an
// index.jsx with nothing else in it. Shared base CSS is a plain
// interpolated string (Emotion supports this directly), matching how
// the original CSS also factored out one shared .sr-btn rule that
// each variant built on.

import styled from '@emotion/styled';

const baseButton = `
  display: inline-block;
  font-family: var(--sr-font);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.5rem 0.9rem;
  border-radius: var(--sr-radius);
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;
  text-decoration: none;

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
`;

export const PrimaryButton = styled.button`
  ${baseButton}
  background-color: var(--sr-orange);
  border-color: var(--sr-orange);
  color: var(--sr-bg-black);

  &:hover:not(:disabled) {
    background-color: var(--sr-orange-bright);
  }
`;

export const SecondaryButton = styled.button`
  ${baseButton}
  background-color: transparent;
  border-color: var(--sr-blue-dim);
  color: var(--sr-blue-bright);

  &:hover:not(:disabled) {
    border-color: var(--sr-blue);
    background-color: var(--sr-blue-bg);
  }
`;

export const SubtleButton = styled.button`
  ${baseButton}
  background-color: var(--sr-amber-bg);
  border-color: var(--sr-amber-border);
  color: var(--sr-amber);

  &:hover:not(:disabled) {
    border-color: var(--sr-amber);
  }
`;

export const DangerButton = styled.button`
  ${baseButton}
  background-color: var(--sr-red-bg);
  border-color: var(--sr-red-border);
  color: var(--sr-red);

  &:hover:not(:disabled) {
    border-color: var(--sr-red);
  }
`;

// Same rule as .sr-icon-btn/.sr-buy-btn originally shared — one small
// square icon button, used both as a plain adjustment stepper and as
// the Market's own buy-button glyph.
export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  font-family: var(--sr-font);
  font-weight: 700;
  font-size: 0.85rem;
  background-color: var(--sr-orange-bg);
  border: 1px solid var(--sr-orange-border);
  border-radius: var(--sr-radius);
  color: var(--sr-orange-bright);
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    border-color: var(--sr-orange);
  }
`;
