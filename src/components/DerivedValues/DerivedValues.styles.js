import styled from '@emotion/styled';

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.5rem 3.5rem 3.5rem;
  gap: 0.5rem;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--sr-text-dim);
  padding: 0 0.4rem;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.5rem 3.5rem 3.5rem;
  gap: 0.5rem;
  align-items: center;
  padding: 0.35rem 0.4rem;
  background-color: var(--sr-bg-panel-solid);
  border: 1px solid var(--sr-hairline);
  border-radius: var(--sr-radius);
`;

export const Label = styled.span`
  font-size: 0.85rem;
  color: var(--sr-text);
`;

export const BaseValue = styled.span`
  text-align: center;
  color: var(--sr-text-dim);
  font-size: 0.85rem;
`;

export const AdjustInput = styled.input`
  width: 100%;
  text-align: center;
  font-size: 0.82rem;
  background-color: var(--sr-bg-base);
  border: 1px solid var(--sr-hairline);
  border-radius: var(--sr-radius);
  padding: 0.2rem;
  color: var(--sr-text);
`;

export const FinalValue = styled.span`
  text-align: center;
  font-weight: 700;
  color: var(--sr-orange-bright);
  font-size: 0.9rem;
`;
