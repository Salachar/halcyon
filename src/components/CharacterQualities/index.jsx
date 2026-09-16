import { useState } from 'react';

import { Section } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import StatusBadge from '@components/StatusBadge';
import QualityCard from '@components/QualityCard';
import QualityCreationModal from '@components/QualityCreationModal';
import QualityAdvancementModal from '@components/QualityAdvancementModal';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { QUALITIES } from '@data/character/qualities';
import { getIncompleteSections, isSectionComplete } from '@utils/creationProgress';

import { EmptyMessage } from './CharacterQualities.styles';

// Extracted whole from CharacterSheet.jsx — the Qualities
// CollapsibleSection, its completion badge, empty state, and the
// creation-vs-advancement modal switching, all together. Fully
// self-contained (only needs `character`) rather than receiving
// showBadges/qualitiesDone as props — a little redundant computation
// (getIncompleteSections runs again here, same call CharacterSheet.jsx
// also makes for its own Callout/Skills badge) in exchange for this
// component not needing the parent to know anything about its display
// needs, matching how CharacterHeader and SkillRow are both
// single-prop too.
export default function CharacterQualities({ character }) {
  const { touch } = useCharacterManager();
  const [qualityModalOpen, setQualityModalOpen] = useState(false);

  const handleRemoveQuality = (index) => {
    character.removeQualityAt(index);
    touch();
  };

  const showBadges = getIncompleteSections(character).length > 0;
  const qualitiesDone = isSectionComplete(character, 'qualities');
  const QualityModal = qualitiesDone ? QualityAdvancementModal : QualityCreationModal;

  return (
    <>
      <CollapsibleSection
        id="sheet-qualities"
        title="Qualities"
        defaultOpen
        headerExtra={showBadges ? <StatusBadge complete={qualitiesDone} /> : null}
      >
        <Section>
          {character.qualities.length === 0 && (
            <EmptyMessage>No qualities yet.</EmptyMessage>
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
    </>
  );
}
