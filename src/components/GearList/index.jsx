import { useState } from 'react';

import { ALL_GEAR } from '@data/gear';
import { useCharacterManager } from '@hooks/useCharacterManager';
import CyberlimbEnhanceModal from '@components/CyberlimbEnhanceModal';
import WeaponAttachModal from '@components/WeaponAttachModal';
import CapacityAttachModal from '@components/CapacityAttachModal';
import { computeCapacity, isHousingFor, isConsumerFor } from '@utils/gearCapacity';
import { isGradeable, resolveEssenceCost } from '@utils/augmentationEconomy';
import { formatDamageValue, formatAttackRatings } from '@utils/gearFormat';

import './gearList.css';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
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
    <div className={overCapacity ? 'sr-gear-list-capacity sr-gear-list-capacity--over' : 'sr-gear-list-capacity'}>
      Capacity: {used}/{provided}{overCapacity ? ' — Over Capacity' : ''}
    </div>
  );
}

// Which pool (if any) an item consumes from — used to show "Uses N
// Capacity" on a not-yet-attached consumer's own row, so a player can
// tell what it'll cost before they attach it, and on nested attachment
// rows so the breakdown under a housing is visible per-item, not just
// as one aggregate number on the parent.
function consumedCapacityLabel(item, config) {
  const pools = ['armor', 'device', 'cyberware'];
  for (const pool of pools) {
    if (!isConsumerFor(item, pool)) continue;
    const stats = item.stats || {};
    const perRatingKey = `${pool}CapacityUsedPerRating`;
    if (stats[perRatingKey] != null) {
      const rating = config?.rating ?? 1;
      return `Uses ${stats[perRatingKey] * rating} Capacity`;
    }
    return `Uses ${stats[`${pool}CapacityUsed`]} Capacity`;
  }
  return null;
}

// General per-row detail line — Essence, weapon combat stats, and
// Wireless Bonus, whichever apply. Previously only Rating/Grade/config
// showed on a row; everything else about what an owned item actually
// does was invisible unless you already knew the catalog by heart.
function ItemDetails({ item, config }) {
  const stats = item.stats || {};
  const parts = [];

  if (isGradeable(item)) {
    parts.push(`Essence ${resolveEssenceCost(item, config).toFixed(2)}`);
  }
  if (stats.damageValue || stats.damageValueFormula) {
    parts.push(`DV ${formatDamageValue(item)}`);
  }
  if (stats.attackRatings || stats.attackRatingsFormula) {
    parts.push(`AR ${formatAttackRatings(item)}`);
  }
  if (stats.deviceRating != null) {
    parts.push(`DR ${stats.deviceRating}`);
  }

  const capacityLabel = consumedCapacityLabel(item, config);
  if (capacityLabel) parts.push(capacityLabel);

  return (
    <>
      {parts.length > 0 && <div className="sr-gear-list-details">{parts.join(' · ')}</div>}
      {stats.wirelessBonus && <div className="sr-gear-list-wireless">Wireless: {stats.wirelessBonus}</div>}
    </>
  );
}

const ENHANCEMENTS = [
  { itemId: 'cyberlimb_armor', label: 'Armor' },
  { itemId: 'cyberlimb_attribute_increase', label: 'Attribute' },
];

// gearManager.gear is instance-keyed — { [instanceId]: { itemId,
// config, attachedTo } } — so two identical rifles are two real rows,
// not one row with a quantity, and each can carry its own attachments.
// Attached accessories are hidden from the flat top-level list and
// shown nested under their parent instead, so nothing appears twice.
export default function GearList({ character }) {
  const { touch } = useCharacterManager();
  const [enhanceContext, setEnhanceContext] = useState(null);
  const [attachWeaponId, setAttachWeaponId] = useState(null);
  const [attachHousingContext, setAttachHousingContext] = useState(null); // { instanceId, pool }
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

  const openEnhance = (limbInstanceId, enhancement) => {
    const item = ALL_GEAR[enhancement.itemId];
    const maxRating = (item.ratingRange || item.stats?.ratingRange)?.[1] ?? 1;
    const existing = character.gearManager.attachmentsOf(limbInstanceId)
      .find(([, e]) => e.itemId === enhancement.itemId);
    const currentRating = existing ? existing[1].config.rating ?? 0 : 0;
    if (currentRating >= maxRating) return;

    setEnhanceContext({
      limbInstanceId,
      enhancementItemId: enhancement.itemId,
      nextRating: currentRating + 1,
      existingInstanceId: existing ? existing[0] : null,
    });
  };

  if (topLevelEntries.length === 0) {
    return <p className="sr-gear-list-empty">No gear owned yet — buy something from the Gear tab.</p>;
  }

  return (
    <div className="sr-gear-list">
      {topLevelEntries.map(([instanceId, entry]) => {
        const item = ALL_GEAR[entry.itemId];
        if (!item) return null;
        const configLabel = formatConfig(entry.config);
        const isCyberlimb = item.tags?.includes('cyberlimb');
        const isFirearm = item.category === 'firearm';
        const isArmorHousing = isHousingFor(item, 'armor');
        const isDeviceHousing = isHousingFor(item, 'device');
        const isCyberwareHousing = isHousingFor(item, 'cyberware');
        const attachments = (isFirearm || isArmorHousing || isDeviceHousing || isCyberwareHousing)
          ? character.gearManager.attachmentsOf(instanceId)
          : [];
        const mounts = isFirearm && attachments.length > 0 ? mountSummary(attachments) : null;

        return (
          <div className="sr-gear-list-row" key={instanceId}>
            <div className="sr-gear-list-main">
              <div className="sr-gear-list-identity">
                <div className="sr-gear-list-name">{item.label}</div>
                {configLabel && <div className="sr-gear-list-config">{configLabel}</div>}
                <ItemDetails item={item} config={entry.config} />
                {mounts && (
                  <div className="sr-gear-list-mounts">
                    {Object.entries(mounts).map(([mount, count]) => `${capitalize(mount)}: ${count}`).join(' · ')}
                  </div>
                )}
                {isArmorHousing && (
                  <CapacitySummary housingItem={item} housingConfig={entry.config} attachments={attachments} pool="armor" />
                )}
                {isDeviceHousing && (
                  <CapacitySummary housingItem={item} housingConfig={entry.config} attachments={attachments} pool="device" />
                )}
                {isCyberwareHousing && (
                  <CapacitySummary housingItem={item} housingConfig={entry.config} attachments={attachments} pool="cyberware" />
                )}
              </div>

              {isCyberlimb && (
                <div className="sr-gear-list-actions">
                  {ENHANCEMENTS.map((e) => (
                    <button key={e.itemId} className="sr-btn sr-btn--secondary" onClick={() => openEnhance(instanceId, e)}>
                      {e.label}
                    </button>
                  ))}
                </div>
              )}
              {isFirearm && (
                <div className="sr-gear-list-actions">
                  <button className="sr-btn sr-btn--secondary" onClick={() => setAttachWeaponId(instanceId)}>Attach</button>
                </div>
              )}
              {isArmorHousing && (
                <div className="sr-gear-list-actions">
                  <button className="sr-btn sr-btn--secondary" onClick={() => setAttachHousingContext({ instanceId, pool: 'armor' })}>Attach</button>
                </div>
              )}
              {isDeviceHousing && (
                <div className="sr-gear-list-actions">
                  <button className="sr-btn sr-btn--secondary" onClick={() => setAttachHousingContext({ instanceId, pool: 'device' })}>Attach</button>
                </div>
              )}
              {isCyberwareHousing && (
                <div className="sr-gear-list-actions">
                  <button className="sr-btn sr-btn--secondary" onClick={() => setAttachHousingContext({ instanceId, pool: 'cyberware' })}>Attach</button>
                </div>
              )}

              <button className="sr-icon-btn" onClick={() => handleRemove(instanceId)} title="Remove">−</button>
            </div>

            {attachments.length > 0 && (
              <div className="sr-gear-list-attachments">
                {attachments.map(([attId, attEntry]) => {
                  const attItem = ALL_GEAR[attEntry.itemId];
                  if (!attItem) return null;
                  return (
                    <div className="sr-gear-list-attachment-row" key={attId}>
                      <div>
                        <span className="sr-gear-list-attachment-name">{attItem.label}</span>
                        <ItemDetails item={attItem} config={attEntry.config} />
                      </div>
                      <button className="sr-icon-btn" onClick={() => handleDetach(attId)} title="Detach">−</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {enhanceContext && (
        <CyberlimbEnhanceModal
          character={character}
          {...enhanceContext}
          onClose={() => setEnhanceContext(null)}
        />
      )}

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
    </div>
  );
}
