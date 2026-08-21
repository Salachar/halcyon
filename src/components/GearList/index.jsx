import { useState } from 'react';

import { ALL_GEAR } from '@data/gear';
import { useCharacterManager } from '@hooks/useCharacterManager';
import CyberlimbEnhanceModal from '@components/CyberlimbEnhanceModal';
import WeaponAttachModal from '@components/WeaponAttachModal';

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
        const attachments = isFirearm ? character.gearManager.attachmentsOf(instanceId) : [];
        const mounts = attachments.length > 0 ? mountSummary(attachments) : null;

        return (
          <div className="sr-gear-list-row" key={instanceId}>
            <div className="sr-gear-list-main">
              <div className="sr-gear-list-identity">
                <div className="sr-gear-list-name">{item.label}</div>
                {configLabel && <div className="sr-gear-list-config">{configLabel}</div>}
                {mounts && (
                  <div className="sr-gear-list-mounts">
                    {Object.entries(mounts).map(([mount, count]) => `${capitalize(mount)}: ${count}`).join(' · ')}
                  </div>
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

              <button className="sr-icon-btn" onClick={() => handleRemove(instanceId)} title="Remove">−</button>
            </div>

            {attachments.length > 0 && (
              <div className="sr-gear-list-attachments">
                {attachments.map(([attId, attEntry]) => {
                  const attItem = ALL_GEAR[attEntry.itemId];
                  if (!attItem) return null;
                  return (
                    <div className="sr-gear-list-attachment-row" key={attId}>
                      <span className="sr-gear-list-attachment-name">{attItem.label}</span>
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
    </div>
  );
}
