// Redesigned condition monitor — single continuous row per track
// (replacing the old row-of-3 wrapping), Physical stacked above Stun.
// Migrated from conditionMonitor.css.

import styled from '@emotion/styled';

export const Monitor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const TrackBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const TrackLabel = styled.span`
  font-weight: 700;
  color: var(--sr-blue-bright);
  font-size: 0.82rem;
  flex-shrink: 0;
  width: 4rem;
`;

// Real editable input for the current value, rather than a plain
// current/max label — typing a number sets it directly, same as
// clicking a box still does. Both stay valid ways to adjust the value.
export const CurrentInput = styled.input`
  flex-shrink: 0;
  width: 3rem;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--sr-text);
  background-color: var(--sr-bg-base);
  border: 1px solid var(--sr-hairline);
  border-radius: var(--sr-radius);
  padding: 0.25rem;
`;

export const MaxLabel = styled.span`
  flex-shrink: 0;
  font-size: 0.75rem;
  color: var(--sr-text-dim);
`;

export const BoxesColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  overflow-x: auto;
`;

// grid-template-columns set inline per-render (box count varies with
// Body/Willpower) — this just fixes the per-box width/gap so the
// threshold-label row above stays aligned with the boxes below it.
export const ThresholdRow = styled.div`
  display: grid;
  gap: 0.2rem;
`;

export const ThresholdCell = styled.span`
  width: 1.15rem;
  text-align: center;
  font-size: 0.6rem;
  color: var(--sr-red);
  font-weight: 700;
`;

export const BoxRow = styled.div`
  display: grid;
  gap: 0.2rem;
`;

// $filled/$trackType are transient props (Emotion convention) — kept
// out of the rendered DOM attributes, since a plain <button> doesn't
// accept either as a real HTML attribute.
export const Box = styled.button`
  width: 1.15rem;
  height: 1.15rem;
  flex-shrink: 0;
  border-radius: var(--sr-radius);
  padding: 0;
  cursor: pointer;
  background-color: ${(props) =>
    !props.$filled ? 'var(--sr-bg-base)'
    : props.$trackType === 'physical' ? 'var(--sr-red-bg)' : 'var(--sr-amber-bg)'};
  border: 1px solid ${(props) =>
    !props.$filled ? 'var(--sr-hairline)'
    : props.$trackType === 'physical' ? 'var(--sr-red-border)' : 'var(--sr-amber-border)'};

  &:hover {
    border-color: var(--sr-blue-dim);
  }
`;

export const Penalty = styled.div`
  font-size: 0.78rem;
  color: var(--sr-red);
  font-weight: 700;
  text-align: right;
`;

export const PenaltyNote = styled.span`
  font-weight: 400;
  color: var(--sr-text-dim);
  text-transform: none;
  letter-spacing: normal;
`;
