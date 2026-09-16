import styled from '@emotion/styled';

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const EdgeValue = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--sr-orange-bright);
  min-width: 2rem;
  text-align: center;
`;

export const ActionsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const GroupTitle = styled.div`
  font-weight: 700;
  color: var(--sr-blue-bright);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const GroupNote = styled.div`
  font-size: 0.78rem;
  color: var(--sr-text-dim);
  font-style: italic;
`;

// $affordable is a transient prop (Emotion convention) — kept out of
// the rendered DOM attributes.
export const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1rem;
  background-color: var(--sr-bg-panel-solid);
  border: 1px solid var(--sr-hairline);
  border-radius: var(--sr-radius);
  opacity: ${(props) => (props.$affordable ? 1 : 0.5)};
  transition: opacity 0.15s ease;
`;

export const ActionInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ActionName = styled.div`
  font-weight: 700;
  color: var(--sr-blue-bright);
  font-size: 0.9rem;
`;

export const ActionCost = styled.span`
  color: var(--sr-orange-bright);
  font-weight: 700;
`;

export const ActionDescription = styled.p`
  font-size: 0.83rem;
  color: var(--sr-text-muted);
  line-height: 1.5;
  margin: 0.15rem 0 0;
`;
