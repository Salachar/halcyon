// Styled-components for GearList — migrated from gearList.css. Generic
// shared elements (sr-number-input on the mode/ammo/container selects
// and the ammo count field) stay as plain classNames, matching the
// same split every other converted component in this app has made —
// only the layout/text pieces bespoke to this file become styled here.

import styled from '@emotion/styled';

export const SectionCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Mounts = styled.div`
  font-size: 0.7rem;
  color: var(--sr-text-dim);
  margin-top: 0.1rem;
`;

// $over is a transient prop (Emotion convention) — same red/bold flag
// treatment the old .sr-gear-list-capacity--over modifier class gave.
export const Capacity = styled.div`
  font-size: 0.7rem;
  margin-top: 0.1rem;
  color: ${(props) => (props.$over ? 'var(--sr-red)' : 'var(--sr-text-dim)')};
  font-weight: ${(props) => (props.$over ? 700 : 400)};
`;

export const Details = styled.div`
  font-size: 0.7rem;
  color: var(--sr-text-muted);
  margin-top: 0.1rem;
`;

export const Wireless = styled.div`
  font-size: 0.7rem;
  color: var(--sr-blue-bright);
  margin-top: 0.1rem;
`;

// Same treatment as Wireless above, distinctly colored (amber, matching
// ConfigLabel's own "this matters mechanically" language elsewhere) so
// it reads as neither plain flavor text nor a wireless-specific bonus.
export const Effect = styled.div`
  font-size: 0.7rem;
  color: var(--sr-amber);
  margin-top: 0.1rem;
`;

// Item-level marker for referenceOnly text (see formatItemDetails in
// gearFormat.js) — distinguishes "real rule text you have to apply
// yourself" from the small set of effects a live stat actually drives.
// Deliberately quieter than Effect/Wireless (smaller, muted, no color
// coding of its own) since it's a caveat about the lines above it, not
// a mechanic in its own right.
export const ReferenceBadge = styled.div`
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--sr-text-dim);
  margin-top: 0.2rem;
  cursor: help;
`;

export const Empty = styled.p`
  font-size: 0.85rem;
  color: var(--sr-text-dim);
  font-style: italic;
`;

export const Attachments = styled.div`
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 1rem;
  border-top: 1px solid var(--sr-hairline);
`;

export const AttachmentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.2rem 0;
`;

export const AttachmentName = styled.span`
  font-size: 0.8rem;
  color: var(--sr-text-muted);
`;

export const WeaponConfigBlock = styled.div`
  margin-top: 0.6rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--sr-hairline);
`;

export const WeaponConfigRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

export const WeaponConfigField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const WeaponConfigLabel = styled.span`
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--sr-text-dim);
`;

export const WeaponConfigResolved = styled.div`
  font-size: 0.8rem;
  color: var(--sr-text);
  margin-bottom: 0.5rem;

  strong {
    color: var(--sr-orange-bright);
  }
`;

export const WeaponConfigNote = styled.div`
  font-size: 0.7rem;
  color: var(--sr-text-dim);
  margin-top: 0.15rem;
`;

export const WeaponConfigAmmo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const WeaponConfigAmmoMax = styled.span`
  font-size: 0.85rem;
  color: var(--sr-text-dim);
`;
