import { useState } from 'react';

import './initiativeWidget.css';

function findPower(character, powerId) {
  return character.powers.find((p) => p.powerId === powerId);
}

// Initiative Rating = Reaction + Intuition, dice start at 1D6, capped
// at 5D6 overall. Improved Reflexes (Adept Power, levels 1-4) adds +1
// Reaction and +1 Initiative Die per level directly — not reflected in
// character.attributes.reaction anywhere (Adept Powers don't mutate
// base attributes in this app), so read live off the power's own
// level, same instinct as MatrixInitiative reading Device Mode
// directly rather than assuming it's pre-baked into a stat. At level
// 4, 1+4=5D6, landing exactly on the overall cap — self-consistent
// with the power's own "can't combine with other Initiative/Reaction
// boosts" text.
//
// Adrenaline Boost is a genuinely different shape — a TEMPORARY +2
// Score per level for (Magic) combat rounds, then Drain equal to the
// level when it ends. Shown as a manual, session-only toggle (gone on
// refresh) rather than a permanent modifier, matching the "manual
// honesty" pattern everywhere else in this app — the player declares
// when it's active, this doesn't try to track duration or auto-apply
// Drain when it ends.
export default function InitiativeWidget({ character }) {
  const [adrenalineActive, setAdrenalineActive] = useState(false);

  const reaction = character.getAttribute('reaction');
  const intuition = character.getAttribute('intuition');
  const edge = character.getAttribute('edge');

  const improvedReflexes = findPower(character, 'improved_reflexes');
  const reflexLevel = improvedReflexes?.level ?? 0;
  const diceCount = Math.min(5, 1 + reflexLevel);
  const rating = reaction + reflexLevel + intuition;

  const adrenalineBoost = findPower(character, 'adrenaline_boost');
  const adrenalineLevel = adrenalineBoost?.level ?? 0;
  const adrenalineBonus = adrenalineActive ? adrenalineLevel * 2 : 0;

  return (
    <div className="sr-initiative">
      <div className="sr-initiative-header">
        <span className="sr-initiative-label">Initiative</span>
        <span className="sr-initiative-score">
          <strong>{rating}</strong> + {diceCount}D6
          {adrenalineBonus > 0 && <span className="sr-initiative-adrenaline-bonus"> + {adrenalineBonus}</span>}
        </span>
      </div>

      <div className="sr-initiative-breakdown">
        Reaction {reaction}{reflexLevel > 0 && ` (+${reflexLevel} Improved Reflexes)`} + Intuition {intuition}
      </div>

      {reflexLevel > 0 && (
        <div className="sr-initiative-note">Improved Reflexes Level {reflexLevel} — can't combine with other Initiative/Reaction boosts.</div>
      )}

      {adrenalineBoost && (
        <div className="sr-initiative-adrenaline">
          <button
            className={adrenalineActive ? 'sr-btn sr-btn--primary' : 'sr-btn sr-btn--secondary'}
            onClick={() => setAdrenalineActive((v) => !v)}
          >
            {adrenalineActive ? 'Adrenaline Boost Active' : 'Activate Adrenaline Boost'}
          </button>
          <span className="sr-initiative-adrenaline-note">
            +{adrenalineLevel * 2} Score for (Magic) combat rounds, then Drain {adrenalineLevel} when it ends.
          </span>
        </div>
      )}

      <div className="sr-initiative-eric">
        Ties: Edge {edge} → Reaction {reaction} → Intuition {intuition} → coin flip.
      </div>
    </div>
  );
}
