import { useState } from 'react';

import { ALL_GEAR } from '@data/gear';
import { SKILLS } from '@data/character/skills';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { CollapsibleSection } from '@components/CollapsibleSection';
import { Section } from '@components/PageComponents';
import OwnedGearCard from '@components/OwnedGearCard';
import PoolBuilder from '@components/PoolBuilder';
import WeaponAttachModal from '@components/WeaponAttachModal';
import CapacityAttachModal from '@components/CapacityAttachModal';
import GearDetailModal from '@components/GearDetailModal';
import { IconButton, SecondaryButton } from '@components/Buttons';
import { computeCapacity, isHousingFor } from '@utils/gearCapacity';
import { formatItemDetails } from '@utils/gearFormat';
import { availableModesFor, resolveEffectiveAttackRatings, resolveAmmoCapacity, FIRE_MODE_MODIFIERS, AMMO_TYPE_MODIFIERS, AMMO_TYPE_OPTIONS } from '@utils/weaponEconomy';

import {
  SectionCards, Mounts, Capacity, Details, Wireless, Effect, ReferenceBadge, Empty, Attachments, AttachmentRow, AttachmentName,
  WeaponConfigBlock, WeaponConfigRow, WeaponConfigField, WeaponConfigLabel, WeaponConfigResolved, WeaponConfigNote,
  WeaponConfigAmmo, WeaponConfigAmmoMax,
} from './GearList.styles';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Category split — the actual GearList redesign. Not a copy of
// Foundry's own Electronics/Chemicals/Survival/etc. naming (our
// category/tags data doesn't map 1:1 onto that), but a real grouping
// off what's actually here: Weapons (firearms, melee, and unattached
// weapon accessories waiting to be attached — grouped WITH weapons
// rather than the electronics catch-all, since that's where a player
// would look for them), Armor (housings only — armor mods nest under
// their housing, same as any other attachment), Cyberware & Bioware
// (both categories together, conceptually "augmentations" even though
// they're separate `category` values), Ammo & Explosives, and a
// catch-all for everything else (electronics/software/optical/tool/
// id_credit). Vehicles and drones are deliberately excluded entirely —
// OwnedVehiclesList is their real home, showing them here too would
// just be duplicate display.
function categoryOf(item) {
  if (item.category === 'vehicle' || item.category === 'drone') return null;
  if (item.category === 'firearm' || item.category === 'melee_weapon' || item.category === 'weapon_accessory') return 'weapons';
  if (item.category === 'armor') return 'armor';
  if (item.category === 'cyberware' || item.category === 'cyberware_accessory' || item.category === 'bioware') return 'augmentations';
  if (item.category === 'ammo' || item.category === 'explosive') return 'consumables';
  return 'electronics';
}

const SECTIONS = [
  { key: 'weapons', title: 'Weapons' },
  { key: 'armor', title: 'Armor' },
  { key: 'augmentations', title: 'Cyberware & Bioware' },
  { key: 'electronics', title: 'Electronics, Software & Tools' },
  { key: 'consumables', title: 'Ammo & Explosives' },
];

// Firing mode + ammo type config, per owned firearm instance —
// deliberately never gates weapon use; every field here is optional
// and purely informational. Shows the resolved effective Attack Rating
// live, since that's the one number that actually matters for the
// attack dice pool comparison — see weaponEconomy.js for why Damage
// Value stays reference text instead of being auto-combined.
function WeaponConfig({ character, instanceId, item, touch }) {
  const weaponState = character.gearManager.getWeaponState(instanceId);
  const modes = availableModesFor(item);
  const selectedMode = modes.includes(weaponState.selectedMode) ? weaponState.selectedMode : 'SS';
  const loadedAmmoType = weaponState.loadedAmmoType || 'Regular';
  const ammoOptions = item.stats?.ammo?.options;
  const ammoContainer = weaponState.ammoContainer || ammoOptions?.[0]?.container || null;
  const maxAmmo = resolveAmmoCapacity(item, ammoContainer);
  const currentAmmo = weaponState.currentAmmoCount;

  const effectiveAR = resolveEffectiveAttackRatings(item, selectedMode, loadedAmmoType, weaponState.attackRatingAdjustment || 0);
  const modeInfo = FIRE_MODE_MODIFIERS[selectedMode];
  const ammoInfo = AMMO_TYPE_MODIFIERS[loadedAmmoType];

  const update = (updates) => {
    character.gearManager.setWeaponState(instanceId, updates);
    touch();
  };

  return (
    <WeaponConfigBlock>
      <WeaponConfigRow>
        <WeaponConfigField>
          <WeaponConfigLabel>Mode</WeaponConfigLabel>
          <select className="sr-number-input" value={selectedMode} onChange={(e) => update({ selectedMode: e.target.value })}>
            {modes.map((m) => <option key={m} value={m}>{FIRE_MODE_MODIFIERS[m].label}</option>)}
          </select>
        </WeaponConfigField>
        <WeaponConfigField>
          <WeaponConfigLabel>Ammo Type</WeaponConfigLabel>
          <select className="sr-number-input" value={loadedAmmoType} onChange={(e) => update({ loadedAmmoType: e.target.value })}>
            {AMMO_TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </WeaponConfigField>
        {ammoOptions && (
          <WeaponConfigField>
            <WeaponConfigLabel>Container</WeaponConfigLabel>
            <select className="sr-number-input" value={ammoContainer} onChange={(e) => update({ ammoContainer: e.target.value })}>
              {ammoOptions.map((o) => <option key={o.container} value={o.container}>{o.container} ({o.capacity})</option>)}
            </select>
          </WeaponConfigField>
        )}
      </WeaponConfigRow>

      <WeaponConfigResolved>
        Effective AR: <strong>{effectiveAR.map((v) => v ?? '—').join('/')}</strong>
        {modeInfo?.note && <WeaponConfigNote>{modeInfo.note}</WeaponConfigNote>}
        {loadedAmmoType !== 'Regular' && ammoInfo && <WeaponConfigNote>DV modifier: {ammoInfo.damageValueNote}</WeaponConfigNote>}
      </WeaponConfigResolved>

      {maxAmmo != null && (
        <WeaponConfigAmmo>
          <WeaponConfigLabel>Ammo (optional)</WeaponConfigLabel>
          <input
            type="number"
            className="sr-number-input"
            style={{ width: '4rem' }}
            placeholder="—"
            value={currentAmmo ?? ''}
            onChange={(e) => update({ currentAmmoCount: e.target.value === '' ? null : Number(e.target.value) })}
          />
          <WeaponConfigAmmoMax> / {maxAmmo}</WeaponConfigAmmoMax>
          <SecondaryButton onClick={() => update({ currentAmmoCount: maxAmmo })}>Reload</SecondaryButton>
        </WeaponConfigAmmo>
      )}
    </WeaponConfigBlock>
  );
}

// Just enough to show what a purchase config resolved to — matches the
// same shapes used everywhere else a config gets displayed (PurchaseModal's
// stepper, GearTable columns), plus grade now that instances can diverge.
function formatConfig(config) {
  if (!config) return null;
  const parts = [];
  if (config.rating != null) parts.push(`Rating ${config.rating}`);
  if (config.capacity != null) parts.push(`Capacity ${config.capacity}`);
  if (config.units != null) parts.push(`${config.units} unit${config.units === 1 ? '' : 's'}`);
  if (config.grade && config.grade !== 'standard') {
    parts.push(capitalize(config.grade));
  }
  if (config.installLocation) {
    parts.push(config.installLocation === 'cyberlimb' ? 'Cyberlimb' : 'Flesh');
  }
  return parts.length ? parts.join(' · ') : null;
}

// Groups a firearm's attached accessories by mount for the summary line
// ("Top: 1 · Underbarrel: 2"). Purely informational — no denominator,
// no enforcement, since most weapons don't have structured mount-
// capacity data, only a few item descriptions mentioning it in prose.
function mountSummary(attachments) {
  const counts = {};
  attachments.forEach(([, entry]) => {
    const item = ALL_GEAR[entry.itemId];
    const mount = item?.mount || 'unmounted';
    counts[mount] = (counts[mount] || 0) + 1;
  });
  return counts;
}

// Real Capacity summary, unlike mountSummary above — armor/device/
// cyberware pools have actual provided/used numbers now, so this shows
// a real "X/Y" count and flags overCapacity for the row to style.
function CapacitySummary({ housingItem, housingConfig, attachments, pool }) {
  const items = attachments.map(([, entry]) => ({ item: ALL_GEAR[entry.itemId], config: entry.config }));
  const { provided, used, overCapacity } = computeCapacity(housingItem, housingConfig, items, pool);
  if (provided === 0 && used === 0) return null;
  return (
    <Capacity $over={overCapacity}>
      Capacity: {used}/{provided}{overCapacity ? ' — Over Capacity' : ''}
    </Capacity>
  );
}

// Which pool (if any) an item consumes from — used to show "Uses N
// Capacity" on a not-yet-attached consumer's own row, so a player can
// tell what it'll cost before they attach it, and on nested attachment
// rows so the breakdown under a housing is visible per-item, not just
// as one aggregate number on the parent. Sourced from formatItemDetails
// (gearFormat.js) — extracted there so Market and this sheet view can
// never drift apart on what counts as "relevant detail" for an item,
// even though the two stay separate layouts. Effects (wireless bonus
// text) fold into this same block rather than a separate table — this
// IS the condensed "Effects" treatment, just already how this app
// handled attachment detail before the Detail Modal existed.
// UPDATED for the effects[]/wirelessBonuses[] array schema — each entry
// renders as its own line rather than one joined string, matching the
// catalog's own "one distinct mechanic per entry" convention. A
// referenceOnly badge appears once per item (not per line) when the
// catalog has flagged this item as reminder-only text rather than
// something this app currently computes for the player — see the
// comment on formatItemDetails in gearFormat.js for what that flag
// means and why it's item-level rather than per-line.
function ItemDetails({ item, config }) {
  const {
    line,
    effects = [],
    wirelessBonuses = [],
    referenceOnly,
  } = formatItemDetails(item, config);
  const hasAnyText = line || effects.length > 0 || wirelessBonuses.length > 0;
  return (
    <>
      {line && <Details>{line}</Details>}
      {effects.map((text, i) => <Effect key={`effect-${i}`}>{text}</Effect>)}
      {wirelessBonuses.map((text, i) => <Wireless key={`wireless-${i}`}>Wireless: {text}</Wireless>)}
      {hasAnyText && referenceOnly && (
        <ReferenceBadge title="Real rule text — apply it yourself; nothing here computes it automatically.">
          Reference only
        </ReferenceBadge>
      )}
    </>
  );
}

// gearManager.gear is instance-keyed — { [instanceId]: { itemId,
// config, attachedTo: instanceId | null } } — so two identical rifles
// are two real rows, not one row with a quantity, and each can carry
// its own attachments. Attached accessories are hidden from the flat
// top-level list and shown nested under their parent instead, so
// nothing appears twice.
export default function GearList({ character }) {
  const { touch } = useCharacterManager();
  const [attachWeaponId, setAttachWeaponId] = useState(null);
  const [attachHousingContext, setAttachHousingContext] = useState(null); // { instanceId, pool }
  const [configWeaponId, setConfigWeaponId] = useState(null);
  const [detailInstanceId, setDetailInstanceId] = useState(null);

  const allEntries = Object.entries(character.gearManager.gear);
  const topLevelEntries = allEntries.filter(([, entry]) => !entry.attachedTo);

  const handleRemove = (instanceId) => {
    character.gearManager.remove(instanceId);
    touch();
  };

  const handleDetach = (instanceId) => {
    character.gearManager.detach(instanceId);
    touch();
  };

  // Partition into sections, dropping anything categoryOf excludes
  // (vehicles/drones) and anything ALL_GEAR no longer recognizes.
  const bySection = { weapons: [], armor: [], augmentations: [], electronics: [], consumables: [] };
  topLevelEntries.forEach(([instanceId, entry]) => {
    const item = ALL_GEAR[entry.itemId];
    if (!item) return;
    const section = categoryOf(item);
    if (!section) return;
    bySection[section].push([instanceId, entry]);
  });

  const renderCard = (instanceId, entry) => {
    const item = ALL_GEAR[entry.itemId];
    const configLabel = formatConfig(entry.config);
    const isCyberlimb = item.tags?.includes('cyberlimb');
    const isFirearm = item.category === 'firearm';
    const isArmorHousing = isHousingFor(item, 'armor');
    const isDeviceHousing = isHousingFor(item, 'device');
    const isCyberwareHousing = isHousingFor(item, 'cyberware');
    const isMatrixHousing = isHousingFor(item, 'matrix');
    const hasSkill = Boolean(item.skill);
    const attachments = (isFirearm || isArmorHousing || isDeviceHousing || isCyberwareHousing || isMatrixHousing)
      ? character.gearManager.attachmentsOf(instanceId)
      : [];
    const mounts = isFirearm && attachments.length > 0 ? mountSummary(attachments) : null;

    // Roll button — any item with a skill (weapons: firearms, close
    // combat, exotic_weapons) gets a PoolBuilder wired to that skill's
    // primary attribute, with a reference block showing the combat
    // math that ISN'T itself a pool component (DV, effective AR
    // factoring in this instance's own stored mode/ammo/manual
    // adjustment, Ammo) — the gap flagged when this redesign was
    // planned. Attack Rating vs. Defense Rating comparison and Edge
    // gain/spend stay explicitly out of scope here (a separate,
    // later design conversation), this is reference only.
    let rollButton = null;
    if (hasSkill) {
      const skillDef = SKILLS[item.skill];
      const weaponState = character.gearManager.getWeaponState(instanceId);
      let referenceNotes = null;
      if (isFirearm) {
        const modes = availableModesFor(item);
        const selectedMode = modes.includes(weaponState.selectedMode) ? weaponState.selectedMode : 'SS';
        const loadedAmmoType = weaponState.loadedAmmoType || 'Regular';
        const effectiveAR = resolveEffectiveAttackRatings(item, selectedMode, loadedAmmoType, weaponState.attackRatingAdjustment || 0);
        const maxAmmo = resolveAmmoCapacity(item, weaponState.ammoContainer);
        referenceNotes = (
          <>
            DV {item.stats?.damageValue ?? '—'} · AR {effectiveAR.map((v) => v ?? '—').join('/')}
            {maxAmmo != null && <> · Ammo {weaponState.currentAmmoCount ?? '—'}/{maxAmmo}</>}
          </>
        );
      } else if (item.stats?.damageValue) {
        referenceNotes = <>DV {item.stats.damageValue}{item.stats.attackRatings ? <> · AR {item.stats.attackRatings.map((v) => v ?? '—').join('/')}</> : null}</>;
      }
      rollButton = (
        <PoolBuilder
          character={character}
          defaultSkillId={item.skill}
          defaultAttribute={skillDef?.primaryAttribute ?? 'agility'}
          referenceNotes={referenceNotes}
        />
      );
    }

    const actions = (
      <>
        {rollButton}
        {isFirearm && (
          <>
            <SecondaryButton onClick={() => setConfigWeaponId((prev) => (prev === instanceId ? null : instanceId))}>
              {configWeaponId === instanceId ? 'Hide Config' : 'Configure'}
            </SecondaryButton>
            <SecondaryButton onClick={() => setAttachWeaponId(instanceId)}>Attach</SecondaryButton>
          </>
        )}
        {isArmorHousing && (
          <SecondaryButton onClick={() => setAttachHousingContext({ instanceId, pool: 'armor' })}>Attach</SecondaryButton>
        )}
        {isDeviceHousing && (
          <SecondaryButton onClick={() => setAttachHousingContext({ instanceId, pool: 'device' })}>Attach</SecondaryButton>
        )}
        {isCyberwareHousing && (
          <SecondaryButton onClick={() => setAttachHousingContext({ instanceId, pool: 'cyberware' })}>Attach</SecondaryButton>
        )}
        {isMatrixHousing && (
          <SecondaryButton onClick={() => setAttachHousingContext({ instanceId, pool: 'matrix' })}>Attach</SecondaryButton>
        )}
      </>
    );

    const detailsSlot = (
      <>
        <ItemDetails item={item} config={entry.config} />
        {mounts && (
          <Mounts>
            {Object.entries(mounts).map(([mount, count]) => `${capitalize(mount)}: ${count}`).join(' · ')}
          </Mounts>
        )}
        {isArmorHousing && <CapacitySummary housingItem={item} housingConfig={entry.config} attachments={attachments} pool="armor" />}
        {isDeviceHousing && <CapacitySummary housingItem={item} housingConfig={entry.config} attachments={attachments} pool="device" />}
        {isCyberwareHousing && <CapacitySummary housingItem={item} housingConfig={entry.config} attachments={attachments} pool="cyberware" />}
        {isMatrixHousing && <CapacitySummary housingItem={item} housingConfig={entry.config} attachments={attachments} pool="matrix" />}
      </>
    );

    return (
      <OwnedGearCard
        key={instanceId}
        item={item}
        configLabel={configLabel}
        detailsSlot={detailsSlot}
        onOpenDetail={() => setDetailInstanceId(instanceId)}
        actions={actions}
        onRemove={() => handleRemove(instanceId)}
      >
        {isFirearm && configWeaponId === instanceId && (
          <WeaponConfig character={character} instanceId={instanceId} item={item} touch={touch} />
        )}

        {attachments.length > 0 && (
          <Attachments>
            {attachments.map(([attId, attEntry]) => {
              const attItem = ALL_GEAR[attEntry.itemId];
              if (!attItem) return null;
              return (
                <AttachmentRow key={attId}>
                  <div>
                    <AttachmentName>{attItem.label}</AttachmentName>
                    <ItemDetails item={attItem} config={attEntry.config} />
                  </div>
                  <IconButton onClick={() => handleDetach(attId)} title="Detach">−</IconButton>
                </AttachmentRow>
              );
            })}
          </Attachments>
        )}
      </OwnedGearCard>
    );
  };

  const hasAnyGear = topLevelEntries.some(([, entry]) => {
    const item = ALL_GEAR[entry.itemId];
    return item && categoryOf(item) != null;
  });

  if (!hasAnyGear) {
    return <Empty>No gear owned yet — buy something from the Market.</Empty>;
  }

  return (
    <div className="sr-gear-list">
      {SECTIONS.map(({ key, title }) => {
        const entries = bySection[key];
        if (entries.length === 0) return null;
        return (
          <CollapsibleSection key={key} id={`gear-list-${key}`} title={title} defaultOpen>
            <Section>
              <SectionCards>
                {entries.map(([instanceId, entry]) => renderCard(instanceId, entry))}
              </SectionCards>
            </Section>
          </CollapsibleSection>
        );
      })}

      {attachWeaponId && (
        <WeaponAttachModal
          character={character}
          weaponInstanceId={attachWeaponId}
          onClose={() => setAttachWeaponId(null)}
        />
      )}

      {attachHousingContext && (
        <CapacityAttachModal
          character={character}
          housingInstanceId={attachHousingContext.instanceId}
          pool={attachHousingContext.pool}
          onClose={() => setAttachHousingContext(null)}
        />
      )}

      {detailInstanceId && (
        <GearDetailModal
          character={character}
          instanceId={detailInstanceId}
          touch={touch}
          onClose={() => setDetailInstanceId(null)}
        />
      )}
    </div>
  );
}
