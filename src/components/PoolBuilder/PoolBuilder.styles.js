// Styled-components for PoolBuilder — sibling .styles.js file, the
// first real test of @emotion/styled in this codebase. Modal shell
// (backdrop/box/header/title/close) now delegates to the shared Modal
// component instead of raw sr-modal-* classNames — this file only
// keeps what's genuinely bespoke to PoolBuilder's own content (the
// roll button, the warning banner, the field rows, the modifier list).
// sr-number-input/sr-btn usage inside PoolBuilder.jsx itself is being
// replaced by the shared Buttons components in the same pass.

import styled from '@emotion/styled';

export const RollButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  background-color: var(--sr-bg-panel-solid);
  border: 1px solid var(--sr-hairline);
  border-radius: var(--sr-radius);
  color: var(--sr-orange-bright);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    border-color: var(--sr-blue-dim);
  }
`;

export const UntrainedButton = styled(RollButton)`
  color: var(--sr-text-dim);
  font-style: italic;
  font-weight: 400;
`;

export const WarningBanner = styled.div`
  padding: 0.6rem 0.9rem;
  background-color: var(--sr-bg-base);
  border: 1px solid var(--sr-red);
  border-radius: var(--sr-radius);
  color: var(--sr-red);
  font-size: 0.82rem;
  line-height: 1.4;
`;

export const FieldRow = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const Field = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const FieldLabel = styled.span`
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--sr-text-dim);
`;

export const ExtrasList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const ExtraRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.7rem;
  background-color: var(--sr-bg-panel-solid);
  border: 1px solid var(--sr-hairline);
  border-radius: var(--sr-radius);
  font-size: 0.85rem;
`;

export const AddModifierRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
`;

export const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// Read-only reference info shown above the pool-building UI — combat
// math that matters for the roll (Damage Value, Attack Rating, Ammo)
// but isn't itself a pool component. Deliberately styled distinctly
// from WarningBanner (blue/informational, not red/danger) so it never
// reads as "something's wrong," just "here's context." Generic — not
// weapon-specific; any caller can pass whatever reference content
// makes sense for that roll.
export const ReferenceBlock = styled.div`
  padding: 0.6rem 0.9rem;
  background-color: var(--sr-blue-bg);
  border: 1px solid var(--sr-blue-dim);
  border-radius: var(--sr-radius);
  color: var(--sr-text);
  font-size: 0.82rem;
  line-height: 1.5;
`;
