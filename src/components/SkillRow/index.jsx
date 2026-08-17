import { SKILLS } from '@data/character/skills';
import { useCharacterManager } from '@hooks/useCharacterManager';
import Dice from '@components/Dice';

import { buildSkillPool, karmaCost, hasAptitude } from './skillEconomy';
import './skillRow.css';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// The "smart" spend logic designed way back: if the character still has
// unspent priority skill points, a rank raise costs 1 point flat; once
// that pool is exhausted, the exact same + button falls through to
// Karma automatically. One component handles both creation-time and
// live-play spending — there's no separate "mode" to switch between.
//
// Decreasing only refunds during the points phase (still-unlocked
// scratch work at creation). Once a rank was bought with Karma, the
// stepper's − is disabled — undoing that deliberately goes through the
// GM Grant/Correct actions (not built this pass), not a casual click.
export default function SkillRow({ character, skillId }) {
  const { touch } = useCharacterManager();
  const def = SKILLS[skillId];
  const rank = character.getSkillRank(skillId);
  const usingPoints = character.skillPointsRemaining > 0;
  const aptitude = hasAptitude(character, skillId);
  const maxRank = usingPoints ? (aptitude ? 7 : 6) : (aptitude ? 10 : 9);

  const nextCost = karmaCost(rank, rank + 1);
  const canIncrease = rank < maxRank && (usingPoints || character.karma >= nextCost);
  const canDecrease = rank > 0 && usingPoints;

  const handleIncrease = () => {
    if (!canIncrease) return;
    if (usingPoints) {
      character.setSkillRank(skillId, rank + 1);
      character.skillPointsRemaining -= 1;
    } else {
      character.karma -= nextCost;
      character.setSkillRank(skillId, rank + 1);
    }
    touch();
  };

  const handleDecrease = () => {
    if (!canDecrease) return;
    character.setSkillRank(skillId, rank - 1);
    character.skillPointsRemaining += 1;
    touch();
  };

  const pool = buildSkillPool(character, skillId);
  const attrLabel = capitalize(def.primaryAttribute) + (def.secondaryAttribute ? ` / ${capitalize(def.secondaryAttribute)}` : '');
  const costLabel = usingPoints ? '1 pt' : `${nextCost} karma`;

  return (
    <div className="sr-skill-row">
      <div className="sr-skill-row-identity">
        <div className="sr-skill-row-name">{def.label}</div>
        <div className="sr-skill-row-meta">{attrLabel}</div>
      </div>

      <div className="sr-skill-row-rank">
        <button className="sr-icon-btn" onClick={handleDecrease} disabled={!canDecrease}>−</button>
        <span className="sr-dice-count">{rank}</span>
        <button className="sr-icon-btn" onClick={handleIncrease} disabled={!canIncrease}>+</button>
        <span className="sr-skill-row-cost">{canIncrease ? costLabel : ''}</span>
      </div>

      {pool ? (
        <div className="sr-skill-row-dice">
          <Dice pool={pool} />
        </div>
      ) : (
        <div className="sr-skill-row-untrainable">Untrained — can't attempt</div>
      )}
    </div>
  );
}
