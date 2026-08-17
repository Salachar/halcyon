function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function PowerCard({ power }) {
  let costLabel;
  if (power.costPerLevel != null) {
    costLabel = typeof power.costPerLevel === 'object'
      ? `${power.costPerLevel.other}–${power.costPerLevel.combat} PP/level`
      : `${power.costPerLevel} PP/level`;
  } else {
    costLabel = `${power.cost} PP`;
  }
  const levels = power.levelRange ? ` (max level ${power.levelRange[1]})` : '';
  const meta = `${costLabel}${levels} · ${capitalize(power.activation)}`;

  return (
    <div className="sr-skill-card">
      <div className="sr-skill-card-identity">
        <div className="sr-skill-card-name">{power.label}</div>
        <div className="sr-skill-card-meta">{meta}</div>
      </div>
      <div className="sr-skill-card-body">
        <p className="sr-skill-card-description">{power.description}</p>
      </div>
    </div>
  );
}
