function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Slim, full-width row — one skill, always visible, no expand/collapse.
// `character` is optional: absent (reference pages like Shadowrunners >
// Skills), it's just a definition card. Present (future creator/live
// sheet), it grows an action button opening a modal for rank changes,
// rolling, etc. — that modal doesn't exist yet, this just leaves the
// hook in place so this component doesn't need to change shape later.
export default function SkillCard({ skill, character, onOpenActions }) {
  const attribute = capitalize(skill.primaryAttribute) + (skill.secondaryAttribute ? ` / ${capitalize(skill.secondaryAttribute)}` : '');
  const specText = skill.requiresSpecialization
    ? 'Requires specialization'
    : skill.specializations.length
      ? skill.specializations.join(', ')
      : null;

  return (
    <div className="sr-skill-card">
      <div className="sr-skill-card-identity">
        <div className="sr-skill-card-name">{skill.label}</div>
        <div className="sr-skill-card-meta">{attribute} · {skill.untrained ? 'Untrained OK' : 'Trained Only'}</div>
      </div>

      <div className="sr-skill-card-body">
        <p className="sr-skill-card-description">{skill.description}</p>
        {specText && <div className="sr-skill-card-specializations">{specText}</div>}
      </div>

      {character && (
        <button
          className="sr-icon-btn sr-skill-action-btn"
          onClick={() => onOpenActions?.(skill)}
          title={`${skill.label} actions`}
        >
          ⚙
        </button>
      )}
    </div>
  );
}
