import { useState } from 'react';

import { useCharacterManager } from '@hooks/useCharacterManager';
import ConfirmationModal from '@components/ConfirmationModal';
import { QUALITIES, QUALITY_IDS } from '@data/character/qualities';
import { resolveQualityKarma, netBonusKarma } from '@utils/qualityEconomy';

import './qualityCreationModal.css';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// One row, checkbox-driven — checking stages the pick (nothing commits
// to the character yet), unchecking un-stages it. Leveled/selection
// qualities reveal their inline config the moment they're checked.
function QualityCheckRow({ quality, staged, blocked, onStage, onUnstage, onUpdateExtra }) {
  const isNegative = quality.type === 'negative';
  const needsLevel = Boolean(quality.levelRange);
  const needsSelection = Boolean(quality.requiresSelection);
  const isChecked = Boolean(staged);
  const level = staged?.level ?? (quality.levelRange ? quality.levelRange[0] : 1);
  const selection = staged?.selection ?? '';

  const karma = resolveQualityKarma(quality, false, level);
  const costLabel = isNegative ? `+${karma} Karma` : `${karma} Karma`;

  const handleToggle = () => {
    if (isChecked) {
      onUnstage();
    } else if (!blocked) {
      onStage({ level: needsLevel ? quality.levelRange[0] : undefined, selection: '' });
    }
  };

  return (
    <div className={blocked && !isChecked ? 'sr-quality-card sr-qcreate-row sr-qcreate-row--blocked' : 'sr-quality-card sr-qcreate-row'}>
      <input
        type="checkbox"
        className="sr-qcreate-checkbox"
        checked={isChecked}
        disabled={blocked && !isChecked}
        onChange={handleToggle}
      />
      <div style={{ flex: 1 }}>
        <div className="sr-quality-card-identity">
          <div className="sr-quality-card-name">{quality.label}</div>
          <div className="sr-quality-card-meta sr-qpick-cost">{costLabel}</div>
        </div>
        <div className="sr-quality-card-body">
          <p className="sr-quality-card-description">{quality.description}</p>

          {isChecked && (needsLevel || needsSelection) && (
            <div className="sr-qcreate-expand">
              {needsLevel && (
                <div className="sr-qcreate-level">
                  <button className="sr-icon-btn" onClick={() => onUpdateExtra({ level: Math.max(quality.levelRange[0], level - 1), selection })}>−</button>
                  <span className="sr-dice-count">{level}</span>
                  <button className="sr-icon-btn" onClick={() => onUpdateExtra({ level: Math.min(quality.levelRange[1], level + 1), selection })}>+</button>
                </div>
              )}
              {needsSelection && (
                <input
                  type="text"
                  className="sr-number-input sr-qcreate-selection-input"
                  value={selection}
                  onChange={(e) => onUpdateExtra({ level, selection: e.target.value })}
                  placeholder={`Selection (${quality.requiresSelection})`}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Creation-mode Qualities: true multi-select, everything staged locally
// until one batch "Confirm Selections" commits it all at once — mirrors
// how CreationModal itself works (build the whole picture, one final
// confirm) rather than the advancement modal's "each pick is its own
// deliberate, rarer event." Caps (6 qualities, net bonus ≤20) and Karma
// affordability are checked against the PROJECTED state (what's already
// owned plus everything currently staged), not just what's owned.
//
// "Finish Qualities Creation" is a separate action from committing
// picks — confirming a batch doesn't lock anything. Someone can add a
// few qualities, close out, come back later and add more, and only
// flips to advancement-mode pricing when they deliberately say they're
// done.
export default function QualityCreationModal({ character, open, onClose }) {
  const { touch } = useCharacterManager();
  const [staged, setStaged] = useState({}); // { [qualityId]: { level?, selection? } }
  const [reviewOpen, setReviewOpen] = useState(false);
  const [finishConfirmOpen, setFinishConfirmOpen] = useState(false);

  if (!open) return null;

  const availableIds = QUALITY_IDS.filter((id) => {
    const owned = character.qualities.some((q) => q.qualityId === id);
    return !owned || QUALITIES[id].repeatable;
  });
  const positiveIds = availableIds.filter((id) => QUALITIES[id].type === 'positive');
  const negativeIds = availableIds.filter((id) => QUALITIES[id].type === 'negative');

  const stagedIds = Object.keys(staged);
  const projectedCount = character.qualities.length + stagedIds.length;

  const stagedNetBonus = stagedIds.reduce((sum, id) => {
    const q = QUALITIES[id];
    const karma = resolveQualityKarma(q, false, staged[id].level);
    return q.type === 'negative' ? sum + karma : sum - karma;
  }, 0);
  const projectedNetBonus = netBonusKarma(character) + stagedNetBonus;

  const projectedKarma = stagedIds.reduce((karma, id) => {
    const q = QUALITIES[id];
    const k = resolveQualityKarma(q, false, staged[id].level);
    return q.type === 'negative' ? karma + k : karma - k;
  }, character.karma);

  const isBlocked = (quality) => {
    if (projectedCount >= 6) return true;
    if (quality.type === 'negative') {
      const karma = resolveQualityKarma(quality, false, quality.levelRange ? quality.levelRange[0] : 1);
      if (projectedNetBonus + karma > 20) return true;
    } else {
      const cost = resolveQualityKarma(quality, false, quality.levelRange ? quality.levelRange[0] : 1);
      if (projectedKarma - cost < 0) return true;
    }
    return false;
  };

  const handleStage = (id, extra) => setStaged((prev) => ({ ...prev, [id]: extra }));
  const handleUnstage = (id) => setStaged((prev) => { const next = { ...prev }; delete next[id]; return next; });

  const handleConfirmBatch = () => {
    stagedIds.forEach((id) => {
      const quality = QUALITIES[id];
      const extra = staged[id];
      const karma = resolveQualityKarma(quality, false, extra.level);
      if (quality.type === 'negative') character.karma += karma;
      else character.karma -= karma;
      character.addQuality(id, extra);
    });
    setStaged({});
    setReviewOpen(false);
    touch();
  };

  const handleFinish = () => {
    character.setSectionComplete('qualities', true);
    setFinishConfirmOpen(false);
    touch();
  };

  const renderRow = (id) => (
    <QualityCheckRow
      key={id}
      quality={QUALITIES[id]}
      staged={staged[id]}
      blocked={isBlocked(QUALITIES[id])}
      onStage={(extra) => handleStage(id, extra)}
      onUnstage={() => handleUnstage(id)}
      onUpdateExtra={(extra) => handleStage(id, extra)}
    />
  );

  return (
    <>
      <div className="sr-modal-backdrop" onClick={onClose}>
        <div className="sr-modal sr-quality-creation-modal" onClick={(e) => e.stopPropagation()}>
          <div className="sr-modal-header">
            <h3 className="sr-modal-title">Qualities — Creation</h3>
            <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
          </div>

          <div className="sr-qcreate-bar">
            <span>
              Karma: <strong>{character.karma}</strong>
              {' · '}Qualities: <strong className={projectedCount >= 6 ? 'sr-qpick-cap-hit' : ''}>{projectedCount}/6</strong>
              {' · '}Net Bonus: <strong className={projectedNetBonus >= 20 ? 'sr-qpick-cap-hit' : ''}>{projectedNetBonus}/20</strong>
            </span>
            <button className="sr-btn sr-btn--secondary" onClick={() => setFinishConfirmOpen(true)}>
              Finish Qualities Creation
            </button>
          </div>

          <div className="sr-qcreate-scroll">
            <div className="sr-qcreate-section-title">Positive</div>
            {positiveIds.map(renderRow)}

            <div className="sr-qcreate-section-title">Negative</div>
            {negativeIds.map(renderRow)}
          </div>

          <div className="sr-qcreate-footer">
            <button className="sr-btn sr-btn--secondary" onClick={onClose}>Close</button>
            <button className="sr-btn sr-btn--primary" disabled={stagedIds.length === 0} onClick={() => setReviewOpen(true)}>
              Review {stagedIds.length > 0 ? `(${stagedIds.length})` : ''}
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={reviewOpen}
        title="Confirm Selections"
        message={stagedIds.map((id) => {
          const q = QUALITIES[id];
          const extra = staged[id];
          const karma = resolveQualityKarma(q, false, extra.level);
          const bits = [q.label, q.type === 'negative' ? `+${karma} Karma` : `${karma} Karma`];
          if (extra.level) bits.push(`Level ${extra.level}`);
          if (extra.selection) bits.push(`Selection: ${extra.selection}`);
          return bits.join(' — ');
        }).join('\n') + `\n\nNet Karma change: ${stagedNetBonus >= 0 ? '+' : ''}${stagedNetBonus}`}
        confirmLabel="Confirm"
        cancelLabel="Back"
        onConfirm={handleConfirmBatch}
        onCancel={() => setReviewOpen(false)}
      />

      <ConfirmationModal
        open={finishConfirmOpen}
        title="Finish Qualities Creation"
        message="Mark Qualities as finished? Post-creation, positive qualities cost double Karma and negative qualities grant no Karma bonus. This can't be undone from here."
        confirmLabel="Finish"
        cancelLabel="Not Yet"
        danger
        onConfirm={handleFinish}
        onCancel={() => setFinishConfirmOpen(false)}
      />
    </>
  );
}
