import { useState } from 'react';

import AttributeBox from '@components/AttributeBox';
import ConditionMonitor from '@components/ConditionMonitor';
import EssenceAdjustmentModal from '@components/EssenceAdjustmentModal';
import NumberEntryModal from '@components/NumberEntryModal';
import QuickAdjustModal from '@components/QuickAdjustModal';
import EdgeModal from '@components/EdgeModal';
import NoiseModal from '@components/NoiseModal';
import OverwatchModal from '@components/OverwatchModal';
import AttributeAdjustmentModal from '@components/AttributeAdjustmentModal';
import { sumDeviceModifiersGlobal } from '@utils/deviceModifiers';
import { useCharacterManager } from '@hooks/useCharacterManager';

import {
  HeaderPanel, NameInput, MetaLine, ResourcesRow, InfoStack, InfoLine,
  MoneyCoin, EdgeToken, NoiseToken, OverwatchToken, OverwatchValue,
  AttributesGrid, AttributeBoxButton, AdjustmentBadge,
} from './CharacterHeader.styles';

const OVERWATCH_CONVERGENCE_THRESHOLD = 40;

const ATTR_LABELS = {
  body: 'Body', agility: 'Agility', reaction: 'Reaction', strength: 'Strength',
  willpower: 'Willpower', logic: 'Logic', intuition: 'Intuition', charisma: 'Charisma', edge: 'Edge',
};

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Everything above the tab-driven Skills/Combat/Matrix/etc content —
// extracted out of CharacterSheet.jsx into its own sibling file. Stack
// order: identity (name/meta), resources (Karma/Skill Points/Essence
// as plain text, Money and Edge as glanceable tokens), condition
// monitors (still its own separate component — kept that way rather
// than folded in, since I can't confirm from here whether it's used
// anywhere else in the app), attributes.
//
// Money coin is clickable — opens the same nuyen adjustment modal the
// old inline "+" button did, just triggered from the coin itself now.
// A placeholder gold/yellow circle; real art later.
//
// Edge token opens EdgeModal (current pool, Boosts, Matrix Edge
// Actions, End Confrontation).
//
// Noise and Overwatch tokens are new — both consolidate an existing,
// unchanged tracker component (NoiseTracker, OverwatchTracker) into a
// header-triggered modal, same relationship the Edge token has to
// EdgeModal. Noise earns a persistent spot because it represents
// ambient/environmental interference (shiftable by Vehicle Additions,
// Augments, and Gear) rather than something scoped only to active
// Matrix work — universally relevant, same reasoning as Edge/Nuyen.
// Overwatch is conceptually more Matrix-specific but placed here
// anyway for consistency. The Noise token shows base+auto only, not
// any currently-toggled conditional modifier — that state lives inside
// NoiseTracker itself and isn't visible from the header; the modal
// always shows the true, complete effective value. The old standalone
// "Overwatch Score"/"Noise" sections in the Matrix tab are retired —
// this is their real home now, not an addition alongside them.
//
// The token shows currentEdge (the fluctuating in-session pool) — NOT
// getAttribute('edge') (the base rating, already visible in the
// attributes grid below). Showing both would just be the same number
// twice in two different visual forms.
//
// Each attribute box is now clickable, opening AttributeAdjustmentModal
// for a persisting adjustment (Wired Reflexes, permanent cyberware,
// etc.) — separate from getAttribute()'s own untouched base value, per
// the "keep base and adjustment as two distinct numbers" pattern
// already used for Derived Values and Initiative. Still displays
// getAttribute() (the base) here, not getEffectiveAttribute() — this
// pass only adds the capability and its own indicator badge; updating
// what the header itself displays (and every other existing base-value
// call site) to the effective value is deliberately deferred, done
// opportunistically as each is revisited rather than all at once.
export default function CharacterHeader({ character }) {
  const { touch } = useCharacterManager();
  const [karmaModalOpen, setKarmaModalOpen] = useState(false);
  const [nuyenModalOpen, setNuyenModalOpen] = useState(false);
  const [essenceModalOpen, setEssenceModalOpen] = useState(false);
  const [edgeModalOpen, setEdgeModalOpen] = useState(false);
  const [noiseModalOpen, setNoiseModalOpen] = useState(false);
  const [overwatchModalOpen, setOverwatchModalOpen] = useState(false);
  const [adjustingAttr, setAdjustingAttr] = useState(null);

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

  const magicLabel = character.magicType === 'technomancer' ? 'Resonance' : 'Magic';

  // Token-level Noise — base + auto-applied device modifiers only, NOT
  // any currently-toggled conditional modifier (that state is internal
  // to NoiseTracker, invisible from here). The modal this opens always
  // shows the true, complete effective value.
  const noiseValue = character.matrixManager.noiseBase + sumDeviceModifiersGlobal(character, 'noise');

  const overwatchScore = character.matrixManager.overwatchScore;
  const overwatchPct = Math.min(100, (overwatchScore / OVERWATCH_CONVERGENCE_THRESHOLD) * 100);
  const overwatchLevel = overwatchScore >= OVERWATCH_CONVERGENCE_THRESHOLD ? 'full'
    : overwatchPct >= 75 ? 'high'
    : overwatchPct >= 40 ? 'mid'
    : 'low';

  return (
    <>
      <HeaderPanel>
        <NameInput
          value={character.name}
          placeholder="Unnamed Runner"
          onChange={handleNameChange}
        />
        <MetaLine>
          {capitalize(character.metatype)} · {capitalize(character.magicType)}
          {character.magicResonance > 0 && (
            character.magicPointsLostToEssence > 0
              ? ` · ${magicLabel} ${character.effectiveMagicResonance} (${character.magicResonance} base, −${character.magicPointsLostToEssence} Essence)`
              : ` · ${magicLabel} ${character.magicResonance}`
          )}
        </MetaLine>

        <ResourcesRow>
          <InfoStack>
            <InfoLine>
              Karma: <strong>{character.karma}</strong>
              <button className="sr-icon-btn" style={{ marginLeft: '0.5rem' }} onClick={() => setKarmaModalOpen(true)}>+</button>
            </InfoLine>
            <InfoLine>Skill Points Remaining: <strong>{character.skillPointsRemaining}</strong></InfoLine>
            <InfoLine>
              Essence: <strong>{character.essence.toFixed(2)}</strong> / 6
              <button className="sr-icon-btn" style={{ marginLeft: '0.5rem' }} onClick={() => setEssenceModalOpen(true)}>+</button>
            </InfoLine>
          </InfoStack>

          <MoneyCoin onClick={() => setNuyenModalOpen(true)} title="Adjust Nuyen">
            {character.nuyen.toLocaleString()}
          </MoneyCoin>

          <EdgeToken onClick={() => setEdgeModalOpen(true)} title="Edge">
            {character.currentEdge}
          </EdgeToken>

          <NoiseToken onClick={() => setNoiseModalOpen(true)} title="Noise">
            {noiseValue > 0 ? '+' : ''}{noiseValue}
          </NoiseToken>

          <OverwatchToken
            onClick={() => setOverwatchModalOpen(true)}
            $pct={overwatchPct}
            $level={overwatchLevel}
            title="Overwatch Score"
          >
            <OverwatchValue>{overwatchScore}</OverwatchValue>
          </OverwatchToken>
        </ResourcesRow>

        <ConditionMonitor character={character} />

        <AttributesGrid>
          {Object.entries(ATTR_LABELS).map(([key, label]) => (
            <AttributeBoxButton key={key} onClick={() => setAdjustingAttr(key)}>
              {character.attributeAdjustments[key] !== 0 && (
                <AdjustmentBadge>
                  {character.attributeAdjustments[key] > 0 ? '+' : ''}{character.attributeAdjustments[key]}
                </AdjustmentBadge>
              )}
              <AttributeBox label={label} value={character.getAttribute(key)} />
            </AttributeBoxButton>
          ))}
        </AttributesGrid>
      </HeaderPanel>

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

      <EdgeModal
        open={edgeModalOpen}
        character={character}
        onClose={() => setEdgeModalOpen(false)}
      />

      <NoiseModal
        open={noiseModalOpen}
        character={character}
        onClose={() => setNoiseModalOpen(false)}
      />

      <OverwatchModal
        open={overwatchModalOpen}
        character={character}
        onClose={() => setOverwatchModalOpen(false)}
      />

      <AttributeAdjustmentModal
        character={character}
        attr={adjustingAttr}
        onClose={() => setAdjustingAttr(null)}
      />
    </>
  );
}
