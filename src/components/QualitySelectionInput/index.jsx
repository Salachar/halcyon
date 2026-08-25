import { SKILL_IDS, SKILLS } from '@data/character/skills';

// Renders the right input for a quality's requiresSelection value.
// Currently the only quality using this is Aptitude (requiresSelection:
// 'skill') — a mistyped free-text entry there would silently fail to
// match hasAptitude's exact-id check (skillEconomy.js), so this swaps
// in a real dropdown over the actual skill catalog for that specific
// case. Any OTHER requiresSelection value this project hasn't built a
// structured option list for yet falls back to plain text, same as
// before — this only upgrades the one case with a real, bounded
// catalog to pick from, not every possible selection type.
export default function QualitySelectionInput({ requiresSelection, value, onChange, className }) {
  if (requiresSelection === 'skill') {
    return (
      <select className={className} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select a skill...</option>
        {SKILL_IDS.map((id) => <option key={id} value={id}>{SKILLS[id].label}</option>)}
      </select>
    );
  }
  return (
    <input
      type="text"
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Selection (${requiresSelection})`}
    />
  );
}
