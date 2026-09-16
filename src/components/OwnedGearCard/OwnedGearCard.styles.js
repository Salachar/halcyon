import styled from '@emotion/styled';

export const Card = styled.div`
  padding: 0.6rem 0.9rem;
  background-color: var(--sr-bg-panel-solid);
  border: 1px solid var(--sr-hairline);
  border-radius: var(--sr-radius);

  &:hover {
    border-color: var(--sr-blue-dim);
  }
`;

export const MainRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// Wraps name + config label + inline details (ItemDetails/mounts/
// capacity) as one clickable target opening the Detail Modal — a
// plain unstyled-button reset, matching AttributeBoxButton's own
// approach to wrapping existing content without touching it.
export const IdentityButton = styled.button`
  all: unset;
  flex: 1;
  min-width: 0;
  cursor: pointer;
  display: block;
`;

export const Name = styled.div`
  font-weight: 700;
  color: var(--sr-blue-bright);
  font-size: 0.9rem;
`;

export const ConfigLabel = styled.div`
  font-size: 0.7rem;
  color: var(--sr-amber);
  margin-top: 0.1rem;
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-shrink: 0;
  align-items: center;
`;
