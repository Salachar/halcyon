import { useState } from 'react';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';

import { ALL_GEAR } from '@data/gear';
import { SKILLS } from '@data/character/skills';
import { ModalLarge } from '@components/Modal';
import { SecondaryButton } from '@components/Buttons';
import PoolBuilder from '@components/PoolBuilder';
import CyberlimbEnhanceModal from '@components/CyberlimbEnhanceModal';
import WeaponAttachModal from '@components/WeaponAttachModal';
import CapacityAttachModal from '@components/CapacityAttachModal';
import { computeCapacity, isHousingFor } from '@utils/gearCapacity';
import { formatItemDetails } from '@utils/gearFormat';
import { availableModesFor, resolveEffectiveAttackRatings, resolveAmmoCapacity, FIRE_MODE_MODIFIERS, AMMO_TYPE_MODIFIERS, AMMO_TYPE_OPTIONS } from '@utils/weaponEconomy';

import {
  Image, ImagePlaceholder, SectionTitle, StatRow, Stat, StatLabel, StatValue,
  ConfigRow, ConfigField, ConfigLabel, EnhancementRow, AttachmentRow, AttachmentName, ActionsRow,
} from './GearDetailModal.styles';

const ENHANCEMENTS = [
  { itemId: 'cyberlimb_armor', label: 'Armor' },
  { itemId: 'cyberlimb_attribute_increase', label: 'Attribute' },
];

// Comprehensive per-instance view — everything about one owned gear
// item in one place, opened by clicking its card in GearList (and
// eventually from wherever else an owned item shows up). Price/
// Availability deliberately excluded — those are Market-relevant, not
// "I already own this" relevant, same reasoning PurchaseModal needs
// them and this doesn't. Attachments are shown condensed (name + the
// same ItemDetails-derived line GearList already uses for wireless
// bonus/capacity text) rather than a separate Effects table — that
// condensed treatment already existed before this modal did, this
// just keeps it rather than reintroducing a Foundry-style split.
//
// Cyberlimb Armor/Attribute enhancement controls live here now,
// removed from GearList's own row entirely.
//
// Firearms get a reference block (DV/Modes/AR/Ammo — the same
// mode/ammo config GearList's inline WeaponConfig already provided),
// PLUS a new capability: a persisting per-instance Attack Rating
// adjustment, stored in the same weaponState object as selectedMode/
// loadedAmmoType (GearManager needed no changes — that state already
// merges whatever keys are set). Applied uniformly across every
// non-null range, same grain the mode/ammo modifiers themselves use in
// resolveEffectiveAttackRatings — a scope that only helps one specific
// range isn't how the source models any of this either.
//
// The Attack-Rating-vs-Defense-Rating comparison and Edge gain/spend
// from the attack reference image are explicitly NOT here — confirmed
// out of scope, a separate later design conversation. Rolling from
// here (or from GearList) both go through the same PoolBuilder, with
// this modal's own reference block feeding its referenceNotes.
//
// "Add Default Attachments" seeds stats.defaultAttachments (built-in
// laser sight, gas-vent, internal smartgun, etc. — priced into the
// weapon's own catalog cost, not a separate purchase) via
// GearManager.addDefaultAttachments. Real, removable attachment
// instances, same as anything attached manually — the player can
// Detach one afterward even if that's narratively odd for something
// like an internal smartgun. Button is a no-op if every default is
// already attached (the method itself skips duplicates), so clicking
// it again after removing just one only re-adds what's missing.
export default function GearDetailModal({ character, instanceId, touch, onClose }) {
  const [attachWeaponOpen, setAttachWeaponOpen] = useState(false);
  const [attachHousingPool, setAttachHousingPool] = useState(null);
  const [enhanceContext, setEnhanceContext] = useState(null);

  const entry = character.gearManager.gear[instanceId];
  if (!entry) return null;
  const item = ALL_GEAR[entry.itemId];
  if (!item) return null;

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

  const handleDetach = (childId) => {
    character.gearManager.detach(childId);
    touch();
  };

  const openEnhance = (enhancement) => {
    const enhItem = ALL_GEAR[enhancement.itemId];
    const maxRating = (enhItem.ratingRange || enhItem.stats?.ratingRange)?.[1] ?? 1;
    const existing = character.gearManager.attachmentsOf(instanceId)
      .find(([, e]) => e.itemId === enhancement.itemId);
    const currentRating = existing ? existing[1].config.rating ?? 0 : 0;
    if (currentRating >= maxRating) return;

    setEnhanceContext({
      limbInstanceId: instanceId,
      enhancementItemId: enhancement.itemId,
      nextRating: currentRating + 1,
      existingInstanceId: existing ? existing[0] : null,
    });
  };

  // ---- Firearm-specific state/config ----
  const weaponState = character.gearManager.getWeaponState(instanceId);
  const modes = isFirearm ? availableModesFor(item) : [];
  const selectedMode = modes.includes(weaponState.selectedMode) ? weaponState.selectedMode : 'SS';
  const loadedAmmoType = weaponState.loadedAmmoType || 'Regular';
  const ammoOptions = item.stats?.ammo?.options;
  const ammoContainer = weaponState.ammoContainer || ammoOptions?.[0]?.container || null;
  const maxAmmo = isFirearm ? resolveAmmoCapacity(item, ammoContainer) : null;
  const currentAmmo = weaponState.currentAmmoCount;
  const arAdjustment = weaponState.attackRatingAdjustment || 0;
  const effectiveAR = isFirearm ? resolveEffectiveAttackRatings(item, selectedMode, loadedAmmoType, arAdjustment) : [];
  const modeInfo = FIRE_MODE_MODIFIERS[selectedMode];
  const ammoInfo = AMMO_TYPE_MODIFIERS[loadedAmmoType];

  const updateWeaponState = (updates) => {
    character.gearManager.setWeaponState(instanceId, updates);
    touch();
  };

  // ---- Roll button (same PoolBuilder used from GearList) ----
  let rollButton = null;
  if (hasSkill) {
    const skillDef = SKILLS[item.skill];
    let referenceNotes = null;
    if (isFirearm) {
      referenceNotes = (
        <>
          DV {item.stats?.damageValue ?? '—'} · AR {effectiveAR.map((v) => v ?? '—').join('/')}
          {maxAmmo != null && <> · Ammo {currentAmmo ?? '—'}/{maxAmmo}</>}
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

  return (
    <ModalLarge open onClose={onClose} title={item.label}>
      {item.image ? (
        <Image><img src={item.image} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></Image>
      ) : (
        <Image><ImagePlaceholder><ImageNotSupportedOutlinedIcon fontSize="large" /></ImagePlaceholder></Image>
      )}

      {item.description && <p className="sr-modal-description">{item.description}</p>}
      <ItemEffects item={item} config={entry.config} />

      {isCyberlimb && (
        <>
          <SectionTitle>Enhancements</SectionTitle>
          <EnhancementRow>
            {ENHANCEMENTS.map((e) => (
              <SecondaryButton key={e.itemId} onClick={() => openEnhance(e)}>{e.label}</SecondaryButton>
            ))}
          </EnhancementRow>
        </>
      )}

      {isFirearm && (
        <>
          <SectionTitle>Combat Reference</SectionTitle>
          <StatRow>
            <Stat><StatLabel>DV</StatLabel><StatValue>{item.stats?.damageValue ?? '—'}</StatValue></Stat>
            <Stat><StatLabel>Modes</StatLabel><StatValue>{(item.stats?.modes || ['SS']).join(', ')}</StatValue></Stat>
            <Stat><StatLabel>Base AR</StatLabel><StatValue>{(item.stats?.attackRatings || []).map((v) => v ?? '—').join('/')}</StatValue></Stat>
          </StatRow>

          <ConfigRow>
            <ConfigField>
              <ConfigLabel>Mode</ConfigLabel>
              <select className="sr-number-input" value={selectedMode} onChange={(e) => updateWeaponState({ selectedMode: e.target.value })}>
                {modes.map((m) => <option key={m} value={m}>{FIRE_MODE_MODIFIERS[m].label}</option>)}
              </select>
            </ConfigField>
            <ConfigField>
              <ConfigLabel>Ammo Type</ConfigLabel>
              <select className="sr-number-input" value={loadedAmmoType} onChange={(e) => updateWeaponState({ loadedAmmoType: e.target.value })}>
                {AMMO_TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </ConfigField>
            {ammoOptions && (
              <ConfigField>
                <ConfigLabel>Container</ConfigLabel>
                <select className="sr-number-input" value={ammoContainer} onChange={(e) => updateWeaponState({ ammoContainer: e.target.value })}>
                  {ammoOptions.map((o) => <option key={o.container} value={o.container}>{o.container} ({o.capacity})</option>)}
                </select>
              </ConfigField>
            )}
            <ConfigField>
              <ConfigLabel>AR Adjustment</ConfigLabel>
              <input
                type="number"
                className="sr-number-input"
                value={arAdjustment}
                onChange={(e) => updateWeaponState({ attackRatingAdjustment: Number(e.target.value) || 0 })}
              />
            </ConfigField>
          </ConfigRow>

          <StatRow>
            <Stat><StatLabel>Effective AR</StatLabel><StatValue>{effectiveAR.map((v) => v ?? '—').join('/')}</StatValue></Stat>
          </StatRow>
          {modeInfo?.note && <p className="sr-modal-hint">{modeInfo.note}</p>}
          {loadedAmmoType !== 'Regular' && ammoInfo && <p className="sr-modal-hint">DV modifier: {ammoInfo.damageValueNote}</p>}

          {maxAmmo != null && (
            <ConfigRow>
              <ConfigField>
                <ConfigLabel>Ammo</ConfigLabel>
                <input
                  type="number"
                  className="sr-number-input"
                  placeholder="—"
                  value={currentAmmo ?? ''}
                  onChange={(e) => updateWeaponState({ currentAmmoCount: e.target.value === '' ? null : Number(e.target.value) })}
                />
              </ConfigField>
              <SecondaryButton onClick={() => updateWeaponState({ currentAmmoCount: maxAmmo })}>Reload ({maxAmmo})</SecondaryButton>
            </ConfigRow>
          )}
        </>
      )}

      {(isArmorHousing || isDeviceHousing || isCyberwareHousing || isMatrixHousing) && (
        <StatRow>
          {isArmorHousing && <CapacityStat housingItem={item} housingConfig={entry.config} attachments={attachments} pool="armor" />}
          {isDeviceHousing && <CapacityStat housingItem={item} housingConfig={entry.config} attachments={attachments} pool="device" />}
          {isCyberwareHousing && <CapacityStat housingItem={item} housingConfig={entry.config} attachments={attachments} pool="cyberware" />}
          {isMatrixHousing && <CapacityStat housingItem={item} housingConfig={entry.config} attachments={attachments} pool="matrix" />}
        </StatRow>
      )}

      {attachments.length > 0 && (
        <>
          <SectionTitle>Attachments</SectionTitle>
          {attachments.map(([attId, attEntry]) => {
            const attItem = ALL_GEAR[attEntry.itemId];
            if (!attItem) return null;
            // UPDATED for the effects[]/wirelessBonuses[] array schema —
            // each line rendered separately rather than one joined
            // string, plus a referenceOnly note when the catalog flags
            // this item's text as something the player applies manually
            // (see the comment on formatItemDetails in gearFormat.js).
            const { line, effects, wirelessBonuses, referenceOnly } = formatItemDetails(attItem, attEntry.config);
            const hasAnyText = line || effects.length > 0 || wirelessBonuses.length > 0;
            return (
              <AttachmentRow key={attId}>
                <div>
                  <AttachmentName>{attItem.label}</AttachmentName>
                  {line && <p className="sr-modal-hint" style={{ margin: 0 }}>{line}</p>}
                  {effects.map((text, i) => (
                    <p key={`effect-${i}`} className="sr-modal-hint" style={{ margin: 0, color: 'var(--sr-amber)' }}>{text}</p>
                  ))}
                  {wirelessBonuses.map((text, i) => (
                    <p key={`wireless-${i}`} className="sr-modal-hint" style={{ margin: 0 }}>Wireless: {text}</p>
                  ))}
                  {hasAnyText && referenceOnly && (
                    <p
                      className="sr-modal-hint"
                      style={{ margin: 0, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.03em', opacity: 0.7 }}
                      title="Real rule text — apply it yourself; nothing here computes it automatically."
                    >
                      Reference only
                    </p>
                  )}
                </div>
                <SecondaryButton onClick={() => handleDetach(attId)}>Detach</SecondaryButton>
              </AttachmentRow>
            );
          })}
        </>
      )}

      <ActionsRow>
        {rollButton}
        {isFirearm && <SecondaryButton onClick={() => setAttachWeaponOpen(true)}>Attach</SecondaryButton>}
        {item.stats?.defaultAttachments?.length > 0 && (
          <SecondaryButton onClick={() => { character.gearManager.addDefaultAttachments(instanceId, item.stats.defaultAttachments); touch(); }}>
            Add Default Attachments
          </SecondaryButton>
        )}
        {isArmorHousing && <SecondaryButton onClick={() => setAttachHousingPool('armor')}>Attach</SecondaryButton>}
        {isDeviceHousing && <SecondaryButton onClick={() => setAttachHousingPool('device')}>Attach</SecondaryButton>}
        {isCyberwareHousing && <SecondaryButton onClick={() => setAttachHousingPool('cyberware')}>Attach</SecondaryButton>}
        {isMatrixHousing && <SecondaryButton onClick={() => setAttachHousingPool('matrix')}>Attach</SecondaryButton>}
      </ActionsRow>

      {enhanceContext && (
        <CyberlimbEnhanceModal
          character={character}
          {...enhanceContext}
          onClose={() => setEnhanceContext(null)}
        />
      )}

      {attachWeaponOpen && (
        <WeaponAttachModal
          character={character}
          weaponInstanceId={instanceId}
          onClose={() => setAttachWeaponOpen(false)}
        />
      )}

      {attachHousingPool && (
        <CapacityAttachModal
          character={character}
          housingInstanceId={instanceId}
          pool={attachHousingPool}
          onClose={() => setAttachHousingPool(null)}
        />
      )}
    </ModalLarge>
  );
}

// The item's OWN effects/wireless bonuses — distinct from the
// Attachments section above, which shows the same thing per attached
// accessory. Needed because the schema pass explicitly made
// `description` omittable ONCE its mechanical content had somewhere
// real to live (`stats.effects`/`stats.wirelessBonuses`) — so an item
// with a short or absent description isn't missing information, but
// only if something actually renders those fields. Before this fix,
// nothing did: the modal showed description prose (when present),
// combat reference for firearms, and capacity, but never the plain
// mechanical text every non-firearm item's effects carry. Most acutely
// wrong for referenceOnly items, which are disproportionately things
// with NO other stat to hang information on.
function ItemEffects({ item, config }) {
  const { effects, wirelessBonuses, referenceOnly } = formatItemDetails(item, config);
  if (effects.length === 0 && wirelessBonuses.length === 0) return null;
  return (
    <>
      {effects.map((text, i) => (
        <p key={`effect-${i}`} className="sr-modal-hint" style={{ color: 'var(--sr-amber)' }}>{text}</p>
      ))}
      {wirelessBonuses.map((text, i) => (
        <p key={`wireless-${i}`} className="sr-modal-hint">Wireless: {text}</p>
      ))}
      {referenceOnly && (
        <p
          className="sr-modal-hint"
          style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.03em', opacity: 0.7 }}
          title="Real rule text — apply it yourself; nothing here computes it automatically."
        >
          Reference only — not automatically applied
        </p>
      )}
    </>
  );
}

function CapacityStat({ housingItem, housingConfig, attachments, pool }) {
  const items = attachments.map(([, entry]) => ({ item: ALL_GEAR[entry.itemId], config: entry.config }));
  const { provided, used, overCapacity } = computeCapacity(housingItem, housingConfig, items, pool);
  if (provided === 0 && used === 0) return null;
  return (
    <Stat>
      <StatLabel>Capacity</StatLabel>
      <StatValue style={overCapacity ? { color: 'var(--sr-red)' } : undefined}>
        {used}/{provided}{overCapacity ? ' — Over' : ''}
      </StatValue>
    </Stat>
  );
}
