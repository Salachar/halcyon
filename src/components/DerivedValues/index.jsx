import { useCharacterManager } from '@hooks/useCharacterManager';
import { Table, HeaderRow, Row, Label, BaseValue, AdjustInput, FinalValue } from './DerivedValues.styles';

const ROWS = [
  { key: 'physicalAttackRating', label: 'Physical Attack Rating' },
  { key: 'composure', label: 'Composure' },
  { key: 'judgeIntentions', label: 'Judge Intentions' },
  { key: 'memory', label: 'Memory' },
  { key: 'liftCarry', label: 'Lift / Carry' },
];

// Real, sourced attribute-only tests (04-character-creation.md's
// "Final Calculations" section) — Composure (Willpower+Charisma),
// Judge Intentions (Willpower+Intuition), Memory (Logic+Intuition),
// Lift/Carry (Body+Willpower), Physical Attack Rating (Reaction+
// Strength). Each gets a manual Adjustment margin stored separately
// on Character (setDerivedValueAdjustment) — the base formula itself
// is never mutated, matching woundPenalty's own "derive, don't
// duplicate" pattern. Physical/Stun Condition Monitor max — also
// technically a Derived Value per the book — is deliberately NOT
// shown here; it's already visible once, on the persistent Condition
// Monitor in CharacterHeader.
export default function DerivedValues({ character }) {
  const { touch } = useCharacterManager();

  const handleAdjust = (key, value) => {
    character.setDerivedValueAdjustment(key, value);
    touch();
  };

  return (
    <Table>
      <HeaderRow>
        <span>Attribute</span>
        <span>Base</span>
        <span>Adjust</span>
        <span>Value</span>
      </HeaderRow>
      {ROWS.map(({ key, label }) => {
        const base = character[`${key}Base`];
        const adjustment = character.derivedValueAdjustments[key];
        const value = character[key];
        return (
          <Row key={key}>
            <Label>{label}</Label>
            <BaseValue>{base}</BaseValue>
            <AdjustInput
              type="number"
              value={adjustment}
              onChange={(e) => handleAdjust(key, Number(e.target.value) || 0)}
            />
            <FinalValue>{value}</FinalValue>
          </Row>
        );
      })}
    </Table>
  );
}
