import { useState } from 'react';
import CasinoIcon from '@mui/icons-material/Casino';

import { ModalMedium } from '@components/Modal';
import { SecondaryButton, IconButton } from '@components/Buttons';
import { SKILL_IDS, SKILLS } from '@data/character/skills';
import { ATTRIBUTE_IDS, ATTRIBUTES } from '@data/character/attributes';
import { buildOpenPool } from '@utils/skillEconomy';
import Dice from '@components/Dice';

import {
  RollButton, UntrainedButton, WarningBanner, ReferenceBlock, FieldRow, Field, FieldLabel,
  ExtrasList, ExtraRow, AddModifierRow, ActionsRow,
} from './PoolBuilder.styles';

// Redesigned from an inline-expanding widget into a button that opens
// a full modal — the whole point being tablet space: a plain "8d6"
// button costs nothing inline, and everything that used to be
// squeezed into a collapsed/expanded toggle (Skill/Attribute pickers,
// modifiers, Reset) now gets real room inside the modal instead.
//
// The old two-step "Untrained button -> separate ConfirmationModal ->
// then PoolBuilder appears" dance (SkillRow's own gating) collapses
// into one thing here: an untrained pool just shows "Untrained" as its
// own button label, and the warning becomes a banner INSIDE the same
// modal rather than a wall blocking access to it. Opening the modal at
// all is already the deliberate step that confirmation was providing.
//
// `gateUntrained` is opt-in (default false), NOT universal — in
// SkillRow, the skill is a CHOICE the player is looking at on their
// own sheet, so "you have zero training here, sure?" adds real value.
// In VehicleActionsReference/MatrixActionsReference/
// CombatActionsReference, the skill pairing is FIXED by the rules for
// that action, so those pages default to gateUntrained=false — a real,
// penalized pool shown directly, no gate.
//
// Now uses the shared Modal (Medium — the field rows/modifier list
// content doesn't need Large's width) and Buttons components instead
// of the old sr-modal-*/sr-btn className shell — same conversion
// EdgeModal already went through. sr-number-input stays a plain
// className on the select/input elements, matching that same
// conversion's choice to leave genuinely shared, widely-used input
// styling alone rather than reimplement it as a one-off here.
// `referenceNotes` is new — optional, any React node. Solves a real
// gap: a weapon's actual dice pool is just Skill+Attribute, but Damage
// Value and the per-range Attack Rating array aren't pool components
// at all — they're combat math a player needs to see WHILE rolling,
// without being mistaken for real pool inputs. Rendered above the
// pool-building UI in its own distinctly-styled block. Generic, not
// weapon-specific — any caller can pass whatever reference content a
// given roll needs.
export default function PoolBuilder({ character, defaultSkillId, defaultAttribute, onHits, gateUntrained = false, referenceNotes }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [skillId, setSkillId] = useState(defaultSkillId ?? '');
  const [attributeKey, setAttributeKey] = useState(defaultAttribute ?? 'logic');
  const [extras, setExtras] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');

  const skillDef = skillId ? SKILLS[skillId] : null;
  const rank = skillDef ? character.getSkillRank(skillId) : null;
  const isUntrained = gateUntrained && Boolean(skillDef && rank === 0 && !skillDef.untrained);

  const basePool = buildOpenPool(character, skillId, attributeKey);
  const extrasTotal = extras.reduce((sum, e) => sum + e.value, 0);
  const pool = {
    ...basePool,
    components: [...basePool.components, ...extras],
    total: Math.max(0, basePool.total + extrasTotal),
  };

  const handleReset = () => {
    setSkillId(defaultSkillId ?? '');
    setAttributeKey(defaultAttribute ?? 'logic');
    setExtras([]);
  };

  const handleAddModifier = () => {
    const value = Number(newValue);
    if (!value) return;
    setExtras((prev) => [...prev, { id: crypto.randomUUID(), label: newLabel || 'Modifier', value, source: 'manual' }]);
    setNewLabel('');
    setNewValue('');
  };

  const removeModifier = (id) => {
    setExtras((prev) => prev.filter((e) => e.id !== id));
  };

  const isDefault = skillId === (defaultSkillId ?? '') && attributeKey === (defaultAttribute ?? 'logic') && extras.length === 0;

  const Button = isUntrained ? UntrainedButton : RollButton;

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>
        {isUntrained ? 'Untrained' : (
          <>
            {pool.total}d6 <CasinoIcon fontSize="small" />
          </>
        )}
      </Button>

      <ModalMedium
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${SKILLS[skillId]?.label ?? 'No Skill'} + ${ATTRIBUTES[attributeKey]?.label ?? attributeKey}`}
      >
        {referenceNotes && <ReferenceBlock>{referenceNotes}</ReferenceBlock>}

        {isUntrained && (
          <WarningBanner>
            No ranks in {skillDef.label} — this can't normally be attempted untrained. Rolling anyway applies a real penalty, already reflected in the pool below.
          </WarningBanner>
        )}

        <FieldRow>
          <Field>
            <FieldLabel>Skill</FieldLabel>
            <select className="sr-number-input" value={skillId} onChange={(e) => setSkillId(e.target.value)}>
              <option value="">None</option>
              {SKILL_IDS.map((id) => <option key={id} value={id}>{SKILLS[id].label}</option>)}
            </select>
          </Field>
          <Field>
            <FieldLabel>Attribute</FieldLabel>
            <select className="sr-number-input" value={attributeKey} onChange={(e) => setAttributeKey(e.target.value)}>
              {ATTRIBUTE_IDS.map((id) => <option key={id} value={id}>{ATTRIBUTES[id].label}</option>)}
            </select>
          </Field>
        </FieldRow>

        {extras.length > 0 && (
          <ExtrasList>
            {extras.map((e) => (
              <ExtraRow key={e.id}>
                <span>{e.label} {e.value >= 0 ? '+' : ''}{e.value}</span>
                <IconButton onClick={() => removeModifier(e.id)} title="Remove">−</IconButton>
              </ExtraRow>
            ))}
          </ExtrasList>
        )}

        <AddModifierRow>
          <Field>
            <FieldLabel>Add Modifier</FieldLabel>
            <input
              type="text"
              className="sr-number-input"
              placeholder="Label"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />
          </Field>
          <Field style={{ maxWidth: '6rem' }}>
            <FieldLabel>Dice</FieldLabel>
            <input
              type="number"
              className="sr-number-input"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </Field>
          <SecondaryButton onClick={handleAddModifier}>Add</SecondaryButton>
        </AddModifierRow>

        <ActionsRow>
          <SecondaryButton disabled={isDefault} onClick={handleReset}>
            Reset to Default
          </SecondaryButton>
        </ActionsRow>

        <Dice pool={pool} onHits={onHits} />
      </ModalMedium>
    </>
  );
}
