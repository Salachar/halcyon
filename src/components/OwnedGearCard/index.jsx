import { IconButton } from '@components/Buttons';
import { Card, MainRow, IdentityButton, Name, ConfigLabel, ActionsRow } from './OwnedGearCard.styles';

// Reusable card for one owned gear instance — GearList's own row shell
// extracted so it isn't rebuilt inline for every item type. Presentation
// only: it doesn't know what a firearm/armor-housing/cyberlimb can or
// can't do, that logic stays in GearList (or wherever else eventually
// uses this), which decides what to pass for `actions` and whether to
// pass `onRemove` at all.
//
// The whole identity block (name, config label, detailsSlot — whatever
// ItemDetails/mounts/capacity summary content the caller wants shown)
// is one clickable target opening the Detail Modal. `children` renders
// nested content below the main row — WeaponConfig, the attachments
// list — same slot GearList already needed for those, just no longer
// hardcoded to a specific className shell.
export default function OwnedGearCard({ item, configLabel, detailsSlot, onOpenDetail, actions, onRemove, children }) {
  return (
    <Card>
      <MainRow>
        <IdentityButton onClick={onOpenDetail}>
          <Name>{item.label}</Name>
          {configLabel && <ConfigLabel>{configLabel}</ConfigLabel>}
          {detailsSlot}
        </IdentityButton>

        <ActionsRow>
          {actions}
          {onRemove && (
            <IconButton onClick={onRemove} title="Remove">−</IconButton>
          )}
        </ActionsRow>
      </MainRow>

      {children}
    </Card>
  );
}
