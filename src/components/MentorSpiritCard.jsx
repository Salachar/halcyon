// Taller than the other cards — four labeled sections (general/magician/
// adept/drawback) instead of one description — so it uses .sr-skill-card
// as a base but overrides alignment via the .sr-mentor-card modifier.
export default function MentorSpiritCard({ spirit }) {
  return (
    <div className="sr-skill-card sr-mentor-card">
      <div className="sr-skill-card-identity">
        <div className="sr-skill-card-name">{spirit.label}</div>
        <div className="sr-skill-card-meta">{spirit.archetypeTags.join(' · ')}</div>
      </div>
      <div className="sr-skill-card-body">
        <div className="sr-mentor-row">
          <span className="sr-mentor-label">General</span>
          {spirit.generalAdvantage}
        </div>
        <div className="sr-mentor-row">
          <span className="sr-mentor-label">Magician</span>
          {spirit.magicianAdvantage}
        </div>
        <div className="sr-mentor-row">
          <span className="sr-mentor-label">Adept</span>
          {spirit.adeptAdvantage}
        </div>
        <div className="sr-mentor-row sr-mentor-row--negative">
          <span className="sr-mentor-label">Drawback</span>
          {spirit.disadvantage}
        </div>
      </div>
    </div>
  );
}
