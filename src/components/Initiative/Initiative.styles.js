import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 5rem 3rem 3rem 3rem 3rem 3rem 4rem;
  gap: 0.4rem;
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--sr-text-dim);
  padding: 0 0.4rem;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 5rem 3rem 3rem 3rem 3rem 3rem 4rem;
  gap: 0.4rem;
  align-items: center;
  padding: 0.4rem;
  background-color: var(--sr-bg-panel-solid);
  border: 1px solid var(--sr-hairline);
  border-radius: var(--sr-radius);
`;

export const Label = styled.span`
  font-weight: 700;
  color: var(--sr-blue-bright);
  font-size: 0.82rem;
`;

export const BaseValue = styled.span`
  text-align: center;
  color: var(--sr-text-dim);
  font-size: 0.8rem;
`;

export const AdjustInput = styled.input`
  width: 100%;
  text-align: center;
  font-size: 0.78rem;
  background-color: var(--sr-bg-base);
  border: 1px solid var(--sr-hairline);
  border-radius: var(--sr-radius);
  padding: 0.18rem;
  color: var(--sr-text);
`;

export const TotalValue = styled.span`
  text-align: center;
  font-weight: 700;
  color: var(--sr-orange-bright);
  font-size: 0.85rem;
`;

export const Note = styled.div`
  font-size: 0.72rem;
  color: var(--sr-text-dim);
`;

export const CapNote = styled.div`
  font-size: 0.72rem;
  color: var(--sr-amber);
`;

export const AdrenalineRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

export const AdrenalineNote = styled.span`
  font-size: 0.75rem;
  color: var(--sr-text-dim);
`;

export const AdrenalineBonus = styled.span`
  color: var(--sr-orange-bright);
`;

export const EricNote = styled.div`
  font-size: 0.75rem;
  color: var(--sr-text-muted);
`;
