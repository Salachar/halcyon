// Styled-components for SkillRow — migrated from skillRow.css. Two
// classes from the original file are dropped entirely rather than
// carried forward: .sr-skill-row-untrained-btn and
// .sr-skill-row-untrainable, both tied to gating logic that no longer
// lives in this component at all (PoolBuilder's own gateUntrained
// prop replaced it).
//
// margin-bottom/:last-child spacing is also dropped — that was for
// vertical single-column stacking, which is now handled by the parent
// SkillRows grid's own `gap` instead. Keeping both would mean double
// spacing (and an awkward asymmetric gap) once rows sit side by side
// in a two-column grid rather than stacked.

import styled from '@emotion/styled';

// Two-column responsive grid for a list of SkillRow entries. Made
// sensible now that PoolBuilder's button-based redesign freed up
// enough horizontal room per row to fit two side by side (the old
// inline-expanding pool widget needed the full row width for itself).
// Spacing between rows comes entirely from this grid's own `gap` —
// SkillRow itself no longer applies its own margin/last-child spacing,
// since that was built for single-column stacking and would double up
// or sit unevenly once rows wrap into a second column.
//
// Collapses to one column below a tablet-ish breakpoint, matching this
// app's large-tablet-first, medium-tablet-second, laptop-third
// priority — a real single column stays available rather than forcing
// two cramped ones on a narrower device.
export const SkillRows = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1rem;
  background-color: var(--sr-bg-panel-solid);
  border: 1px solid var(--sr-hairline);
  border-radius: var(--sr-radius);
  transition: border-color 0.15s ease;

  &:hover {
    border-color: var(--sr-blue-dim);
  }
`;

export const Identity = styled.div`
  flex: 0 0 170px;
`;

export const Name = styled.div`
  font-weight: 700;
  color: var(--sr-blue-bright);
  font-size: 0.95rem;
`;

export const Meta = styled.div`
  font-size: 0.68rem;
  color: var(--sr-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-top: 0.15rem;
`;

export const RankControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const CostLabel = styled.span`
  font-size: 0.68rem;
  color: var(--sr-text-dim);
  white-space: nowrap;
  min-width: 3.5rem;
`;

export const DiceSlot = styled.div`
  flex: 1;
  min-width: 0;
`;
