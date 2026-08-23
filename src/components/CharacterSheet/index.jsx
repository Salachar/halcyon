import { useState } from 'react';

import { Section, Panel, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import AttributeBox from '@components/AttributeBox';
import SkillRow from '@components/SkillRow';
import GearList from '@components/GearList';
import EssenceAdjustmentModal from '@components/EssenceAdjustmentModal';
import Edge from '@components/Edge';
import ConditionMonitor from '@components/ConditionMonitor';
import QualityCard from '@components/QualityCard';
import QualityCreationModal from '@components/QualityCreationModal';
import QualityAdvancementModal from '@components/QualityAdvancementModal';
import StatusBadge from '@components/StatusBadge';
import NumberEntryModal from '@components/NumberEntryModal';
import QuickAdjustModal from '@components/QuickAdjustModal';

import { useCharacterManager } from '@hooks/useCharacterManager';

import { SKILL_IDS } from '@data/character/skills';
import { QUALITIES } from '@data/character/qualities';

import { getIncompleteSections, isSectionComplete } from '@utils/creationProgress';

import './characterSheet.css';

const ATTR_LABELS = {
  body: 'Body', agility: 'Agility', reaction: 'Reaction', strength: 'Strength',
  willpower: 'Willpower', logic: 'Logic', intuition: 'Intuition', charisma: 'Charisma', edge: 'Edge',
};

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Section order: identity, then active-play tools (Skills / Condition
// Monitor / Edge — the things actually touched turn-to-turn), then
// possessions/reference (Gear / Qualities — checked far less often).
export default function CharacterSheet({ character }) {
  const { touch } = useCharacterManager();
  const [karmaModalOpen, setKarmaModalOpen] = useState(false);
  const [nuyenModalOpen, setNuyenModalOpen] = useState(false);
  const [essenceModalOpen, setEssenceModalOpen] = useState(false);
  const [qualityModalOpen, setQualityModalOpen] = useState(false);

  const handleNameChange = (e) => {
    character.name = e.target.value;
    touch();
  };

  const handleAddKarma = (amount) => {
    character.karma += amount;
    touch();
  };

  const handleAdjustNuyen = (delta) => {
    character.nuyen = Math.max(0, character.nuyen + delta);
    touch();
  };

  const handleRemoveQuality = (index) => {
    character.removeQualityAt(index);
    touch();
  };

  const magicLabel = character.magicType === 'technomancer' ? 'Resonance' : 'Magic';

  const incomplete = getIncompleteSections(character);
  const showBadges = incomplete.length > 0;
  const skillsDone = isSectionComplete(character, 'skills');
  const qualitiesDone = isSectionComplete(character, 'qualities');
  const QualityModal = qualitiesDone ? QualityAdvancementModal : QualityCreationModal;

  return (
    <Section>
      {showBadges && (
        <Callout title="Character Creation In Progress" variant="note">
          Incomplete: {incomplete.map((s) => s.label).join(', ')}
        </Callout>
      )}

      <Panel>
        <div className="sr-sheet-header">
          <input
            className="sr-sheet-name-input"
            value={character.name}
            placeholder="Unnamed Runner"
            onChange={handleNameChange}
          />
          <div className="sr-sheet-meta">
            {capitalize(character.metatype)} · {capitalize(character.magicType)}
            {character.magicResonance > 0 && (
              character.magicPointsLostToEssence > 0
                ? ` · ${magicLabel} ${character.effectiveMagicResonance} (${character.magicResonance} base, −${character.magicPointsLostToEssence} Essence)`
                : ` · ${magicLabel} ${character.magicResonance}`
            )}
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
        <div className="sr-sheet-resources-row">
          <div className="sr-sheet-resources">
            <span>
              Nuyen: <strong>{character.nuyen.toLocaleString()}¥</strong>
              <button className="sr-icon-btn" style={{ marginLeft: '0.5rem' }} onClick={() => setNuyenModalOpen(true)}>+</button>
            </span>
            <span>
              Karma: <strong>{character.karma}</strong>
              <button className="sr-icon-btn" style={{ marginLeft: '0.5rem' }} onClick={() => setKarmaModalOpen(true)}>+</button>
            </span>
            <span>Skill Points Remaining: <strong>{character.skillPointsRemaining}</strong></span>
            <span>
              Essence: <strong>{character.essence.toFixed(2)}</strong> / 6
              <button className="sr-icon-btn" style={{ marginLeft: '0.5rem' }} onClick={() => setEssenceModalOpen(true)}>+</button>
            </span>
          </div>

          <ConditionMonitor character={character} />
        </div>
      </Panel>

      <NumberEntryModal
        open={karmaModalOpen}
        title="Add Karma"
        confirmLabel="Add"
        onConfirm={handleAddKarma}
        onClose={() => setKarmaModalOpen(false)}
      />

      <QuickAdjustModal
        open={nuyenModalOpen}
        title="Adjust Nuyen"
        presets={[10, 50, 100, 500, 1000]}
        currentValue={character.nuyen}
        valueLabel="¥"
        onAdjust={handleAdjustNuyen}
        onClose={() => setNuyenModalOpen(false)}
      />

      <EssenceAdjustmentModal
        character={character}
        open={essenceModalOpen}
        onClose={() => setEssenceModalOpen(false)}
      />

      <CollapsibleSection
        id="sheet-skills"
        title="Skills"
        defaultOpen
        headerExtra={showBadges ? <StatusBadge complete={skillsDone} /> : null}
      >
        <Section>
          {SKILL_IDS.map((skillId) => (
            <SkillRow key={skillId} character={character} skillId={skillId} />
          ))}
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="sheet-edge" title="Edge" defaultOpen>
        <Section>
          <Edge character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="sheet-gear" title="Gear" defaultOpen>
        <Section>
          <GearList character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection
        id="sheet-qualities"
        title="Qualities"
        defaultOpen
        headerExtra={showBadges ? <StatusBadge complete={qualitiesDone} /> : null}
      >
        <Section>
          {character.qualities.length === 0 && (
            <p className="sr-sheet-empty">No qualities yet.</p>
          )}
          {character.qualities.map((entry, i) => (
            <QualityCard
              key={i}
              quality={QUALITIES[entry.qualityId]}
              entry={entry}
              onRemove={() => handleRemoveQuality(i)}
            />
          ))}
          <button className="sr-btn sr-btn--secondary" onClick={() => setQualityModalOpen(true)} style={{ marginTop: '0.5rem' }}>
            + Add Quality
          </button>
        </Section>
      </CollapsibleSection>

      <QualityModal
        character={character}
        open={qualityModalOpen}
        onClose={() => setQualityModalOpen(false)}
      />
    </Section>
  );
}
