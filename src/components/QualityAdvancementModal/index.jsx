import { useState } from 'react';

import { useCharacterManager } from '@hooks/useCharacterManager';
import ConfirmationModal from '@components/ConfirmationModal';
import { QUALITIES, QUALITY_IDS } from '@data/character/qualities';
import { resolveQualityKarma, canAffordQuality, creationQualityCapsExceeded, netBonusKarma } from '@utils/qualityEconomy';

import './qualityAdvancementModal.css';

// One quality at a time, click-to-add, real confirm step per pick.
// This is the mode Qualities falls into once
// character.creationProgress.qualities is true, but it works fine
// before that too (nothing stops adding qualities one at a time during
// creation as well — QualityCreationModal's batch flow is an option,
// not a requirement).
function QualityPickRow({ quality, character, expanded, onToggle, onConfirm }) {
  const isNegative = quality.type === 'negative';
  const needsLevel = Boolean(quality.levelRange);
  const needsSelection = Boolean(quality.requiresSelection);
  const needsForm = needsLevel || needsSelection;

  const [level, setLevel] = useState(quality.levelRange ? quality.levelRange[0] : 1);
  const [selection, setSelection] = useState('');

  const karma = resolveQualityKarma(quality, character.creationProgress.qualities, level);
  const capExceeded = creationQualityCapsExceeded(character, quality, level);
  const affordable = canAffordQuality(character, quality, level) && !capExceeded;

  const costLabel = capExceeded
    ? 'Creation limit reached'
    : isNegative
      ? (character.creationProgress.qualities ? 'No Karma bonus (post-creation)' : `+${karma} Karma`)
      : `${karma} Karma${character.creationProgress.qualities ? ' (post-creation ×2)' : ''}`;

  const handleRowClick = () => {
    if (!affordable) return;
    if (needsForm) {
      onToggle();
    } else {
      onConfirm({});
    }
  };

  const handleConfirmForm = (e) => {
    e.stopPropagation();
    if (needsSelection && !selection.trim()) return;
    const extra = {};
    if (needsLevel) extra.level = level;
    if (needsSelection) extra.selection = selection.trim();
    onConfirm(extra);
  };

  return (
    <div
      className={affordable
        ? `sr-quality-card sr-qpick-row${isNegative ? ' sr-quality-card--negative' : ''}`
        : `sr-quality-card sr-qpick-row sr-qpick-row--unavailable${isNegative ? ' sr-quality-card--negative' : ''}`}
      onClick={handleRowClick}
    >
      <div className="sr-quality-card-identity">
        <div className="sr-quality-card-name">{quality.label}</div>
        <div className="sr-quality-card-meta sr-qpick-cost">{costLabel}</div>
      </div>

      <div className="sr-quality-card-body">
        <p className="sr-quality-card-description">{quality.description}</p>

        {expanded && needsForm && (
          <div className="sr-qpick-expand" onClick={(e) => e.stopPropagation()}>
            {needsLevel && (
              <div className="sr-qpick-level">
                <button className="sr-icon-btn" onClick={() => setLevel((l) => Math.max(quality.levelRange[0], l - 1))}>−</button>
                <span className="sr-dice-count">{level}</span>
                <button className="sr-icon-btn" onClick={() => setLevel((l) => Math.min(quality.levelRange[1], l + 1))}>+</button>
              </div>
            )}
            {needsSelection && (
              <input
                type="text"
                className="sr-number-input sr-qpick-selection-input"
                value={selection}
                onChange={(e) => setSelection(e.target.value)}
                placeholder={`Selection (${quality.requiresSelection})`}
              />
            )}
            <button className="sr-btn sr-btn--primary" disabled={needsSelection && !selection.trim()} onClick={handleConfirmForm}>
              Confirm Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Fully self-sufficient — takes only character/open/onClose. Handles the
// whole add-quality-and-adjust-Karma transaction internally and calls
// touch() itself, so the list live-updates the instant something's
// added (it drops out of the pickable list, since it's now owned).
export default function QualityAdvancementModal({ character, open, onClose }) {
  const { touch } = useCharacterManager();
  const [expandedId, setExpandedId] = useState(null);
  const [pendingPick, setPendingPick] = useState(null); // { qualityId, extra, quality, karma } | null

  if (!open) return null;

  const availableIds = QUALITY_IDS.filter((id) => {
    const owned = character.qualities.some((q) => q.qualityId === id);
    return !owned || QUALITIES[id].repeatable;
  });
  const positiveIds = availableIds.filter((id) => QUALITIES[id].type === 'positive');
  const negativeIds = availableIds.filter((id) => QUALITIES[id].type === 'negative');

  const requestAdd = (qualityId, extra) => {
    const quality = QUALITIES[qualityId];
    const karma = resolveQualityKarma(quality, character.creationProgress.qualities, extra.level);
    setPendingPick({ qualityId, extra, quality, karma });
  };

  const confirmAdd = () => {
    if (!pendingPick) return;
    const { qualityId, extra, quality, karma } = pendingPick;

    if (quality.type === 'negative') {
      character.karma += karma;
    } else {
      character.karma -= karma;
    }

    character.addQuality(qualityId, extra);
    setExpandedId(null);
    setPendingPick(null);
    touch();
  };

  const confirmMessage = pendingPick
    ? [
        pendingPick.quality.label,
        pendingPick.quality.type === 'negative'
          ? `Grants +${pendingPick.karma} Karma.`
          : `Costs ${pendingPick.karma} Karma.`,
        pendingPick.extra.level ? `Level ${pendingPick.extra.level}.` : null,
        pendingPick.extra.selection ? `Selection: ${pendingPick.extra.selection}.` : null,
      ].filter(Boolean).join('\n')
    : '';

  return (
    <>
      <div className="sr-modal-backdrop" onClick={onClose}>
        <div className="sr-modal sr-quality-picker-modal" onClick={(e) => e.stopPropagation()}>
          <div className="sr-modal-header">
            <h3 className="sr-modal-title">Add Quality</h3>
            <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
          </div>

          <div className="sr-qpick-karma-bar">
            Karma: <strong>{character.karma}</strong>
            {!character.creationProgress.qualities && (
              <>
                {' · '}Qualities: <strong className={character.qualities.length >= 6 ? 'sr-qpick-cap-hit' : ''}>{character.qualities.length}/6</strong>
                {' · '}Net Bonus: <strong className={netBonusKarma(character) >= 20 ? 'sr-qpick-cap-hit' : ''}>{netBonusKarma(character)}/20</strong>
              </>
            )}
          </div>

          <div className="sr-qpick-scroll">
            <div className="sr-qpick-section-title">Positive</div>
            {positiveIds.map((id) => (
              <QualityPickRow
                key={id}
                quality={QUALITIES[id]}
                character={character}
                expanded={expandedId === id}
                onToggle={() => setExpandedId((prev) => (prev === id ? null : id))}
                onConfirm={(extra) => requestAdd(id, extra)}
              />
            ))}

            <div className="sr-qpick-section-title">Negative</div>
            {negativeIds.map((id) => (
              <QualityPickRow
                key={id}
                quality={QUALITIES[id]}
                character={character}
                expanded={expandedId === id}
                onToggle={() => setExpandedId((prev) => (prev === id ? null : id))}
                onConfirm={(extra) => requestAdd(id, extra)}
              />
            ))}

            <div className="sr-modal-actions">
              <button className="sr-btn sr-btn--secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={Boolean(pendingPick)}
        title="Add Quality"
        message={confirmMessage}
        confirmLabel="Add"
        cancelLabel="Cancel"
        danger={pendingPick?.quality.type === 'negative'}
        onConfirm={confirmAdd}
        onCancel={() => setPendingPick(null)}
      />
    </>
  );
}
