import { useState } from 'react';

import { ALL_GEAR } from '@data/gear';
import { getCompositedPersonaStats } from '@utils/panGrouping';
import { useCharacterManager } from '@hooks/useCharacterManager';

import {
  Wrapper, HeaderRow, Row, Label, BaseValue, AdjustInput, TotalValue,
  Note, CapNote, AdrenalineRow, AdrenalineNote, AdrenalineBonus, EricNote,
} from './Initiative.styles';

function findPower(character, powerId) {
  return character.powers.find((p) => p.powerId === powerId);
}

// Consolidated Physical/Astral/Matrix Initiative — replaces the
// separate InitiativeWidget and MatrixInitiative components, matching
// the unified table a real Foundry character sheet uses. Each row
// gets independent Score and Dice adjustments (character.
// initiativeAdjustments), same "base formula untouched, adjustment
// stored separately" pattern as DerivedValues.
//
// BASE FORMULAS (unchanged from the two components this replaces):
// Physical — Reaction + Intuition, +1 Reaction and +1 die per level of
//   Improved Reflexes (both baked into the base, not the adjustment —
//   Improved Reflexes is a real character capability, not a manual
//   fudge), 1D6 floor, 5D6 cap overall.
// Astral — Logic + Intuition, flat 2D6 (Astral Combat Reference table,
//   08c-adepts-astral-mentors.md) — confirmed NOT boosted by Improved
//   Reflexes' bonus dice: the rulebook's own FAQ states bonus
//   Initiative dice apply to the physical world only, never astral
//   projection or VR.
// Matrix — depends on Device Mode: AR uses Reaction+Intuition (no bonus
//   dice, still "the physical world" per that same FAQ); VR Cold/Hot
//   use Intuition+Data Processing with +1/+2 dice. Unavailable (shows
//   a note instead of a row) if no Primary device is set.
//
// Adrenaline Boost stays a manual, session-only toggle (resets on
// refresh) — a temporary +2×level Score bonus for (Magic) combat
// rounds, then Drain equal to the level when it ends. This app
// declares when it's active rather than tracking duration or
// auto-applying the Drain, same "manual honesty" instinct as
// everywhere else state like this is handled.
export default function Initiative({ character }) {
  const { touch } = useCharacterManager();
  const [adrenalineActive, setAdrenalineActive] = useState(false);

  const adjustScore = (type, value) => {
    character.setInitiativeAdjustment(type, 'score', value);
    touch();
  };
  const adjustDice = (type, value) => {
    character.setInitiativeAdjustment(type, 'dice', value);
    touch();
  };

  const reaction = character.getAttribute('reaction');
  const intuition = character.getAttribute('intuition');
  const logic = character.getAttribute('logic');
  const edge = character.getAttribute('edge');

  const improvedReflexes = findPower(character, 'improved_reflexes');
  const reflexLevel = improvedReflexes?.level ?? 0;

  const adrenalineBoost = findPower(character, 'adrenaline_boost');
  const adrenalineLevel = adrenalineBoost?.level ?? 0;
  const adrenalineBonus = adrenalineActive ? adrenalineLevel * 2 : 0;

  // ---- Physical ----
  const physicalScoreBase = reaction + reflexLevel + intuition;
  const physicalDiceBase = Math.min(5, 1 + reflexLevel);
  const physicalAdj = character.initiativeAdjustments.physical;
  const physicalScore = physicalScoreBase + physicalAdj.score + adrenalineBonus;
  const physicalDice = Math.min(5, physicalDiceBase + physicalAdj.dice);

  // ---- Astral ----
  const astralScoreBase = logic + intuition;
  const astralDiceBase = 2;
  const astralAdj = character.initiativeAdjustments.astral;
  const astralScore = astralScoreBase + astralAdj.score;
  const astralDice = Math.min(5, astralDiceBase + astralAdj.dice);

  // ---- Matrix ----
  const compositedStats = getCompositedPersonaStats(character, ALL_GEAR);
  const matrixAdj = character.initiativeAdjustments.matrix;
  let matrixScoreBase = null;
  let matrixDiceBase = null;
  let matrixFormula = null;
  if (compositedStats) {
    const deviceMode = character.gearManager.deviceMode;
    const dataProcessing = compositedStats.dataProcessing ?? 0;
    if (deviceMode === 'AR') {
      matrixScoreBase = reaction + intuition;
      matrixDiceBase = 1;
      matrixFormula = `AR — Reaction (${reaction}) + Intuition (${intuition})`;
    } else if (deviceMode === 'VR') {
      matrixScoreBase = intuition + dataProcessing;
      matrixDiceBase = 2;
      matrixFormula = `VR Cold — Intuition (${intuition}) + Data Processing (${dataProcessing})`;
    } else {
      matrixScoreBase = intuition + dataProcessing;
      matrixDiceBase = 3;
      matrixFormula = `VR Hot — Intuition (${intuition}) + Data Processing (${dataProcessing})`;
    }
  }
  const matrixScore = matrixScoreBase != null ? matrixScoreBase + matrixAdj.score : null;
  const matrixDice = matrixDiceBase != null ? Math.min(5, matrixDiceBase + matrixAdj.dice) : null;

  const anyCapped = physicalDice >= 5 || astralDice >= 5 || (matrixDice != null && matrixDice >= 5);

  return (
    <Wrapper>
      <HeaderRow>
        <span>Type</span>
        <span>Base</span>
        <span>Adj</span>
        <span>Score</span>
        <span>Dice</span>
        <span>Adj</span>
        <span>Total</span>
      </HeaderRow>

      <Row>
        <Label>Physical</Label>
        <BaseValue>{physicalScoreBase}</BaseValue>
        <AdjustInput type="number" value={physicalAdj.score} onChange={(e) => adjustScore('physical', Number(e.target.value) || 0)} />
        <TotalValue>{physicalScore}</TotalValue>
        <BaseValue>{physicalDiceBase}</BaseValue>
        <AdjustInput type="number" value={physicalAdj.dice} onChange={(e) => adjustDice('physical', Number(e.target.value) || 0)} />
        <TotalValue>{physicalDice}D6</TotalValue>
      </Row>

      <Row>
        <Label>Astral</Label>
        <BaseValue>{astralScoreBase}</BaseValue>
        <AdjustInput type="number" value={astralAdj.score} onChange={(e) => adjustScore('astral', Number(e.target.value) || 0)} />
        <TotalValue>{astralScore}</TotalValue>
        <BaseValue>{astralDiceBase}</BaseValue>
        <AdjustInput type="number" value={astralAdj.dice} onChange={(e) => adjustDice('astral', Number(e.target.value) || 0)} />
        <TotalValue>{astralDice}D6</TotalValue>
      </Row>

      {matrixScoreBase != null ? (
        <Row>
          <Label>Matrix</Label>
          <BaseValue>{matrixScoreBase}</BaseValue>
          <AdjustInput type="number" value={matrixAdj.score} onChange={(e) => adjustScore('matrix', Number(e.target.value) || 0)} />
          <TotalValue>{matrixScore}</TotalValue>
          <BaseValue>{matrixDiceBase}</BaseValue>
          <AdjustInput type="number" value={matrixAdj.dice} onChange={(e) => adjustDice('matrix', Number(e.target.value) || 0)} />
          <TotalValue>{matrixDice}D6</TotalValue>
        </Row>
      ) : (
        <Note>Matrix — no Primary device set, unavailable.</Note>
      )}

      {reflexLevel > 0 && (
        <Note>Improved Reflexes Level {reflexLevel} (Physical only) — can't combine with other Initiative/Reaction boosts.</Note>
      )}
      {matrixFormula && <Note>{matrixFormula}</Note>}
      {anyCapped && <CapNote>5D6 cap reached on at least one row — further Initiative dice from other sources are lost there.</CapNote>}

      {adrenalineBoost && (
        <AdrenalineRow>
          <button
            className={adrenalineActive ? 'sr-btn sr-btn--primary' : 'sr-btn sr-btn--secondary'}
            onClick={() => setAdrenalineActive((v) => !v)}
          >
            {adrenalineActive ? 'Adrenaline Boost Active' : 'Activate Adrenaline Boost'}
          </button>
          <AdrenalineNote>
            {adrenalineActive && <AdrenalineBonus>+{adrenalineBonus} Physical Score active — </AdrenalineBonus>}
            +{adrenalineLevel * 2} Score for (Magic) combat rounds, then Drain {adrenalineLevel} when it ends.
          </AdrenalineNote>
        </AdrenalineRow>
      )}

      <EricNote>Ties: Edge {edge} → Reaction {reaction} → Intuition {intuition} → coin flip.</EricNote>
    </Wrapper>
  );
}
