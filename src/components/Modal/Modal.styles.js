// Styled-components for the generic Modal — replaces the old mdl-*
// className system (hardcoded teal, unrelated to this app's actual
// theme) AND the ad-hoc sr-modal-backdrop/sr-modal className pattern
// every modal in the app was hand-rolling individually. Visual
// language here matches the sr-modal-* look (the real theme), API
// shape matches the old Modal component (open/title/subtitle/onClose).
//
// Three real size variants (Small/Medium/Large) instead of one fixed
// width — this is the actual fix for the !important-override problem:
// a modal that needs to be wide (Market's own modal, for instance)
// picks ModalLarge instead of fighting a hardcoded 420px cap.

import styled from '@emotion/styled';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(10, 12, 18, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
`;

const baseBox = `
  background-color: var(--sr-bg-elevated);
  border: 1px solid var(--sr-blue-dim);
  border-radius: var(--sr-radius);
  padding: 1.5rem;
  max-height: 85vh;
  overflow-y: auto;
  width: 100%;
`;

export const SmallBox = styled.div`
  ${baseBox}
  max-width: 420px;
`;

export const MediumBox = styled.div`
  ${baseBox}
  max-width: 640px;
`;

export const LargeBox = styled.div`
  ${baseBox}
  max-width: min(90vw, 60rem);
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const HeaderText = styled.div`
  min-width: 0;
`;

export const Title = styled.h3`
  font-size: 1.1rem;
  color: var(--sr-blue-bright);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0;
`;

export const Subtitle = styled.div`
  margin-top: 0.25rem;
  font-size: 0.7rem;
  color: var(--sr-text-dim);
  letter-spacing: 0.03em;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: transparent;
  border: none;
  color: var(--sr-text-muted);
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 0.25rem;

  &:hover {
    color: var(--sr-text);
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Message = styled.div`
  font-size: 0.85rem;
  color: var(--sr-text-muted);
  line-height: 1.5;
`;
