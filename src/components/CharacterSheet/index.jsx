import { Section, Panel } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import { useCharacterManager } from '@hooks/useCharacterManager';
import AttributeBox from '@components/AttributeBox';
import SkillRow from '@components/SkillRow';
import { SKILL_IDS } from '@data/character/skills';

import './characterSheet.css';

const ATTR_LABELS = {
  body: 'Body', agility: 'Agility', reaction: 'Reaction', strength: 'Strength',
  willpower: 'Willpower', logic: 'Logic', intuition: 'Intuition', charisma: 'Charisma', edge: 'Edge',
};

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Shell only, on purpose — name + basic info, Skills/Qualities/Gear all
// come in later passes. character.name is mutated directly then touch()
// is called, same convention as everything else that edits a character
// in place (see the touch() addition to CharacterManager).
export default function CharacterSheet({ character }) {
  const { touch } = useCharacterManager();

  const handleNameChange = (e) => {
    character.name = e.target.value;
    touch();
  };

  const magicLabel = character.magicType === 'technomancer' ? 'Resonance' : 'Magic';

  return (
    <Section>
      <Panel>
        <div className="sr-sheet-header">
          <input
            className="sr-number-input sr-sheet-name-input"
            value={character.name}
            placeholder="Unnamed Runner"
            onChange={handleNameChange}
          />
          <div className="sr-sheet-meta">
            {capitalize(character.metatype)} · {capitalize(character.magicType)}
            {character.magicResonance > 0 && ` · ${magicLabel} ${character.magicResonance}`}
          </div>
        </div>
      </Panel>

      <Panel solid>
        <div className="sr-sheet-attributes">
          {Object.entries(ATTR_LABELS).map(([key, label]) => (
            <AttributeBox key={key} label={label} value={character.getAttribute(key)} />
          ))}
        </div>
      </Panel>

      <Panel solid>
        <div className="sr-sheet-resources">
          <span>Nuyen: <strong>{character.nuyen.toLocaleString()}¥</strong></span>
          <span>Karma: <strong>{character.karma}</strong></span>
          <span>Skill Points Remaining: <strong>{character.skillPointsRemaining}</strong></span>
        </div>
      </Panel>

      <CollapsibleSection id="sheet-skills" title="Skills" defaultOpen>
        <Section>
          {SKILL_IDS.map((skillId) => (
            <SkillRow key={skillId} character={character} skillId={skillId} />
          ))}
        </Section>
      </CollapsibleSection>
    </Section>
  );
}
