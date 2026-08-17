// Slim, full-width row — same shape as SkillCard, one quality per row,
// stacked vertically. `type` drives the accent color: positive uses the
// same blue-bright everything else uses for headings, negative reuses
// red — the same "danger/negative" color already meaning that
// everywhere else in the app (damage, delete, Callout's danger variant),
// not a new color rule invented for qualities specifically.
export default function QualityCard({ quality }) {
  const isNegative = quality.type === 'negative';

  const costLabel = quality.karmaCostPerLevel != null
    ? `${quality.karmaCostPerLevel} Karma/level`
    : `${quality.karmaCost} Karma`;

  return (
    <div className={isNegative ? 'sr-quality-card sr-quality-card--negative' : 'sr-quality-card'}>
      <div className="sr-quality-card-identity">
        <div className="sr-quality-card-name">{quality.label}</div>
        <div className="sr-quality-card-meta">
          {isNegative ? 'Bonus' : 'Cost'}: {costLabel}
          {quality.levelRange && ` · Levels ${quality.levelRange[0]}–${quality.levelRange[1]}`}
        </div>
      </div>

      <div className="sr-quality-card-body">
        <p className="sr-quality-card-description">{quality.description}</p>
        {quality.requiresSelection && (
          <div className="sr-quality-card-tag">Requires selection: {quality.requiresSelection}</div>
        )}
      </div>
    </div>
  );
}
