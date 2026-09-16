import styled from '@emotion/styled';

export const Image = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--sr-radius);
  overflow: hidden;
  background-color: var(--sr-bg-base);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImagePlaceholder = styled.div`
  color: var(--sr-hairline);
`;

export const SectionTitle = styled.div`
  font-weight: 700;
  color: var(--sr-blue-bright);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

export const StatRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.25rem;
  margin-bottom: 0.75rem;
`;

export const Stat = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  font-size: 0.85rem;
`;

export const StatLabel = styled.span`
  color: var(--sr-text-dim);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: 0.65rem;
`;

export const StatValue = styled.span`
  color: var(--sr-text);
  font-weight: 600;
`;

export const ConfigRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
`;

export const ConfigField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const ConfigLabel = styled.span`
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--sr-text-dim);
`;

export const EnhancementRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const AttachmentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.4rem 0.7rem;
  background-color: var(--sr-bg-panel-solid);
  border: 1px solid var(--sr-hairline);
  border-radius: var(--sr-radius);
  margin-bottom: 0.3rem;
`;

export const AttachmentName = styled.span`
  font-size: 0.85rem;
  color: var(--sr-text-muted);
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;
