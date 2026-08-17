import { useState } from 'react';

import { Page, PageHeader, Callout } from '@components/PageComponents';
import { useCharacterManager } from '@hooks/useCharacterManager';
import CharacterTabs from '@components/CharacterTabs';
import CreationModal from '@components/CreationModal';
import CharacterSheet from '@components/CharacterSheet';

export default function Characters() {
  const { currentCharacter } = useCharacterManager();
  const [showCreation, setShowCreation] = useState(false);

  return (
    <Page>
      <PageHeader title="Characters" subtitle="Your runners" />

      <CharacterTabs onCreateNew={() => setShowCreation(true)} />

      {currentCharacter ? (
        <CharacterSheet character={currentCharacter} />
      ) : (
        <Callout title="No Character Selected" variant="note">
          Create a new character or select one above to get started.
        </Callout>
      )}

      {showCreation && <CreationModal onClose={() => setShowCreation(false)} />}
    </Page>
  );
}
