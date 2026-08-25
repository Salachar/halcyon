import { SKILLS } from '@data/character/skills';

// Slim, full-width row — same shape as SkillCard, one quality per row,
// stacked vertically. `type` drives the accent color: positive uses the
// same blue-bright everything else uses for headings, negative reuses
// red — the same "danger/negative" color already meaning that
// everywhere else in the app (damage, delete, Callout's danger variant),
// not a new color rule invented for qualities specifically.
//
// `entry` and `onRemove` are optional — absent (Shadowrunners reference
// page), this is pure definition display. Present (CharacterSheet), the
// meta line resolves to the actual owned level/selection instead of the
// generic range/type, and a remove button appears.
//
// A stored selection resolves through SKILLS when requiresSelection is
// 'skill' (currently just Aptitude) — the value is a real skill id now
// (QualitySelectionInput), not a freeform label, so this shows the
// proper display name instead of the raw id.
export default function QualityCard({ quality, entry, onRemove }) {
  const isNegative = quality.type === 'negative';

  const costLabel = quality.karmaCostPerLevel != null
    ? entry?.level
      ? `${quality.karmaCostPerLevel * entry.level} Karma`
      : `${quality.karmaCostPerLevel} Karma/level`
    : `${quality.karmaCost} Karma`;

  const selectionLabel = entry?.selection
    ? (quality.requiresSelection === 'skill' ? (SKILLS[entry.selection]?.label ?? entry.selection) : entry.selection)
    : null;

  return (
    <div className={isNegative ? 'sr-quality-card sr-quality-card--negative' : 'sr-quality-card'}>
      <div className="sr-quality-card-identity">
        <div className="sr-quality-card-name">{quality.label}</div>
        <div className="sr-quality-card-meta">
          {isNegative ? 'Bonus' : 'Cost'}: {costLabel}
          {!entry && quality.levelRange && ` · Levels ${quality.levelRange[0]}–${quality.levelRange[1]}`}
          {entry?.level && ` · Level ${entry.level}`}
        </div>
      </div>

      <div className="sr-quality-card-body">
        <p className="sr-quality-card-description">{quality.description}</p>
        {selectionLabel && <div className="sr-quality-card-tag">Selected: {selectionLabel}</div>}
        {!entry && quality.requiresSelection && (
          <div className="sr-quality-card-tag">Requires selection: {quality.requiresSelection}</div>
        )}
      </div>

      {onRemove && (
        <button className="sr-icon-btn" onClick={onRemove} title="Remove">−</button>
      )}
    </div>
  );
}
