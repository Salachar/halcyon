import { useState } from 'react';

import { Section, Panel, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import AttributeBox from '@components/AttributeBox';
import SkillRow from '@components/SkillRow';
import KnowledgeLanguageSkills from '@components/KnowledgeLanguageSkills';
import GearList from '@components/GearList';
import EssenceAdjustmentModal from '@components/EssenceAdjustmentModal';
import Edge from '@components/Edge';
import ConditionMonitor from '@components/ConditionMonitor';
import InitiativeWidget from '@components/InitiativeWidget';
import QualityCard from '@components/QualityCard';
import QualityCreationModal from '@components/QualityCreationModal';
import QualityAdvancementModal from '@components/QualityAdvancementModal';
import KnownSpells from '@components/KnownSpells';
import KnownRituals from '@components/KnownRituals';
import BoundSpirits from '@components/BoundSpirits';
import KnownComplexForms from '@components/KnownComplexForms';
import CompiledSprites from '@components/CompiledSprites';
import AdeptPowers from '@components/AdeptPowers';
import InitiationTracker from '@components/InitiationTracker';
import SubmersionTracker from '@components/SubmersionTracker';
import SustainedTracker from '@components/SustainedTracker';
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

// Magic types that can EVER have a nonzero known-spell budget under
// some configuration — Aspected-Conjuring currently resolves to 0 via
// magicEconomy.js, but Conjuring is still a real possible pick within
// 'aspected', so the section stays visible (0/0) rather than hidden,
// same "show real zero, don't hide" instinct as everywhere else. Adept
// (pure)/Technomancer/Mundane are structurally excluded instead — not
// currently zero, but impossible by definition — same treatment as
// Cyberjacks never getting a Make Primary button.
const SPELL_CAPABLE_MAGIC_TYPES = ['full', 'aspected', 'mysticAdept'];

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Section order: identity, then active-play tools (Skills / Condition
// Monitor / Edge — the things actually touched turn-to-turn), then
// possessions/reference (Gear / Spells / Qualities — checked far less
// often).
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
  const showSpells = SPELL_CAPABLE_MAGIC_TYPES.includes(character.magicType);
  const showComplexForms = character.magicType === 'technomancer';
  const showAdeptPowers = character.magicType === 'adept' || character.magicType === 'mysticAdept';
  const showInitiation = showSpells || showAdeptPowers;
  const showSustained = showSpells || showComplexForms;

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

      <CollapsibleSection id="sheet-knowledge-language" title="Knowledge & Language Skills" defaultOpen>
        <Section>
          <KnowledgeLanguageSkills character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="sheet-edge" title="Edge" defaultOpen>
        <Section>
          <Edge character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="sheet-initiative" title="Initiative" defaultOpen>
        <Section>
          <InitiativeWidget character={character} />
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="sheet-gear" title="Gear" defaultOpen>
        <Section>
          <GearList character={character} />
        </Section>
      </CollapsibleSection>

      {showSpells && (
        <CollapsibleSection id="sheet-spells" title="Spells" defaultOpen>
          <Section>
            <KnownSpells character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showSpells && (
        <CollapsibleSection id="sheet-rituals" title="Rituals" defaultOpen>
          <Section>
            <KnownRituals character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showSpells && (
        <CollapsibleSection id="sheet-spirits" title="Bound Spirits" defaultOpen>
          <Section>
            <BoundSpirits character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showAdeptPowers && (
        <CollapsibleSection id="sheet-adept-powers" title="Adept Powers" defaultOpen>
          <Section>
            <AdeptPowers character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showInitiation && (
        <CollapsibleSection id="sheet-initiation" title="Initiation" defaultOpen>
          <Section>
            <InitiationTracker character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showComplexForms && (
        <CollapsibleSection id="sheet-complex-forms" title="Complex Forms" defaultOpen>
          <Section>
            <KnownComplexForms character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showComplexForms && (
        <CollapsibleSection id="sheet-sprites" title="Compiled Sprites" defaultOpen>
          <Section>
            <CompiledSprites character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showComplexForms && (
        <CollapsibleSection id="sheet-submersion" title="Submersion" defaultOpen>
          <Section>
            <SubmersionTracker character={character} />
          </Section>
        </CollapsibleSection>
      )}

      {showSustained && (
        <CollapsibleSection id="sheet-sustained" title="Sustained" defaultOpen>
          <Section>
            <SustainedTracker character={character} />
          </Section>
        </CollapsibleSection>
      )}

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
