const DURATION_LABELS = { I: 'Instantaneous', S: 'Sustained', L: 'Limited', P: 'Permanent' };

// Reuses .sr-skill-card's CSS directly — same shape (identity column +
// description body), no new stylesheet needed for this one.
export default function SpellCard({ spell }) {
  const typeLabel = spell.spellType === 'M' ? 'Mana' : 'Physical';
  const area = spell.area ? ' · Area' : '';
  const meta = `${spell.range} · ${typeLabel} · ${DURATION_LABELS[spell.duration]} · DV ${spell.drainValue}${area}`;

  return (
    <div className="sr-skill-card">
      <div className="sr-skill-card-identity">
        <div className="sr-skill-card-name">{spell.label}</div>
        <div className="sr-skill-card-meta">{meta}</div>
      </div>
      <div className="sr-skill-card-body">
        <p className="sr-skill-card-description">{spell.description}</p>
      </div>
    </div>
  );
}
