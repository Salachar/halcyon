import { useState } from 'react';

import { Section, Callout, Tabs } from '@components/PageComponents';
import CharacterHeader from '@components/CharacterHeader';
import CharacterBasics from '@components/CharacterBasics';
import CharacterSkills from '@components/CharacterSkills';
import CharacterCombat from '@components/CharacterCombat';
import CharacterMatrix from '@components/CharacterMatrix';
import CharacterVehicles from '@components/CharacterVehicles';
import CharacterArcane from '@components/CharacterArcane';
import CharacterEquipment from '@components/CharacterEquipment';

import { getIncompleteSections } from '@utils/creationProgress';

const TABS = [
  { key: 'basics', label: 'Basics' },
  { key: 'skills', label: 'Skills' },
  { key: 'combat', label: 'Combat' },
  { key: 'matrix', label: 'Matrix' },
  { key: 'vehicles', label: 'Vehicles' },
  { key: 'arcane', label: 'Arcane' },
  { key: 'equipment', label: 'Equipment' },
];

// Character sheet: persistent CharacterHeader (identity, resources,
// condition monitors, attributes — unchanged), then a tab bar
// switching between everything else. Foundry-style layout.
//
// Basics is the new landing tab — Derived Values, unified Initiative,
// and Qualities. Both Qualities and Initiative passed through other
// tabs first (Skills, then Combat/Matrix) before landing here; this is
// the settled home now, not another waypoint.
//
// Combat, Matrix, and Vehicles used to be separate GLOBAL top-level
// pages that implicitly operated on "whichever character happens to
// be selected," each with its own "no character selected" Callout —
// removed entirely in the relocated versions, since this component
// only ever renders once a character already exists. Those global
// pages/routes should be removed once this lands; I don't have the
// app's routing/nav file loaded this session, so that removal itself
// isn't done here.
//
// Arcane is a bucket tab covering every magic/Resonance system, mage
// and technomancer alike, deliberately loose for now — everything
// stays modular enough to split apart later.
export default function CharacterSheet({ character }) {
  const [activeTab, setActiveTab] = useState('basics');
  const incomplete = getIncompleteSections(character);
  const showBadges = incomplete.length > 0;

  return (
    <Section>
      {showBadges && (
        <Callout title="Character Creation In Progress" variant="note">
          Incomplete: {incomplete.map((s) => s.label).join(', ')}
        </Callout>
      )}

      <CharacterHeader character={character} />

      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'basics' && <CharacterBasics character={character} />}
      {activeTab === 'skills' && <CharacterSkills character={character} />}
      {activeTab === 'combat' && <CharacterCombat character={character} />}
      {activeTab === 'matrix' && <CharacterMatrix character={character} />}
      {activeTab === 'vehicles' && <CharacterVehicles character={character} />}
      {activeTab === 'arcane' && <CharacterArcane character={character} />}
      {activeTab === 'equipment' && <CharacterEquipment character={character} />}
    </Section>
  );
}
