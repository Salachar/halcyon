// Migrated from characterSheet.css's .sr-sheet-empty — the only rule
// in that file that was ever actually tied to Qualities rather than
// the header content that already moved out to CharacterHeader.
// Once this lands, characterSheet.css has nothing left in it.

import styled from '@emotion/styled';

export const EmptyMessage = styled.p`
  font-size: 0.85rem;
  color: var(--sr-text-dim);
  font-style: italic;
`;
