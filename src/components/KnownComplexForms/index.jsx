import { useState } from 'react';

import { COMPLEX_FORMS, COMPLEX_FORM_IDS, TECHNOMANCER_COMPLEX_FORM_NOTE } from '@data/character/complex_forms';
import { ALL_GEAR } from '@data/gear';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { knownComplexFormBudget } from '@utils/magicEconomy';

import './knownComplexForms.css';

const MATRIX_ATTRIBUTES = [
  { key: 'attack', label: 'Attack' },
  { key: 'sleaze', label: 'Sleaze' },
  { key: 'dataProcessing', label: 'Data Processing' },
  { key: 'firewall', label: 'Firewall' },
];

function durationLabel(d) {
  return { I: 'Instantaneous', S: 'Sustained', P: 'Permanent' }[d] || d;
}

// Known Complex Forms — same soft-gated budget shape as KnownSpells
// (knownComplexFormBudget, magicEconomy.js), but three of the 15 forms
// (Diffusion, Infusion, Emulate) are repeatable with a required
// selection (a Matrix Attribute, or a Program to emulate) — a
// technomancer can know "Diffusion (Attack)" AND "Diffusion (Firewall)"
// as two separate known forms simultaneously. Non-repeatable forms stay
// a simple Learn/Remove toggle, matching KnownSpells exactly. Requires
// Character.js's _complexForms restructured to {formId, selection}
// objects (see character-magic-aspect-edits.md) — the old flat-id
// array with duplicate-prevention couldn't represent two Diffusions on
// different attributes at all.
export default function KnownComplexForms({ character }) {
  const { touch } = useCharacterManager();
  const [pendingSelectionFor, setPendingSelectionFor] = useState(null); // formId currently picking a selection

  const budget = knownComplexFormBudget(character);
  const known = character.complexForms; // [{ formId, selection? }]
  const overBudget = known.length > budget;

  // Emulate's "program" is picked from the general software catalog,
  // not the character's own owned/attached Programs — the whole point
  // of Emulate is running one without actually having it installed.
  const programOptions = Object.values(ALL_GEAR).filter((item) => item.tags?.includes('software'));

  const learnSimple = (formId) => {
    character.addComplexForm(formId);
    touch();
  };

  const learnWithSelection = (formId, selection) => {
    character.addComplexForm(formId, { selection });
    touch();
    setPendingSelectionFor(null);
  };

  const removeAt = (index) => {
    character.removeComplexFormAt(index);
    touch();
  };

  const selectionLabel = (form, selection) => {
    if (form.requiresSelection === 'matrixAttribute') {
      return MATRIX_ATTRIBUTES.find((a) => a.key === selection)?.label ?? selection;
    }
    if (form.requiresSelection === 'program') {
      return ALL_GEAR[selection]?.label ?? selection;
    }
    return selection;
  };

  return (
    <div className="sr-known-complex-forms">
      <div className="sr-kcf-budget">
        <span className="sr-kcf-budget-label">Known Complex Forms</span>
        <span className={overBudget ? 'sr-kcf-budget-count sr-kcf-budget-count--over' : 'sr-kcf-budget-count'}>
          {known.length}/{budget}{overBudget ? ' — Over Budget' : ''}
        </span>
      </div>

      <p className="sr-kcf-note">{TECHNOMANCER_COMPLEX_FORM_NOTE}</p>

      {COMPLEX_FORM_IDS.map((formId) => {
        const form = COMPLEX_FORMS[formId];
        const entries = known.map((e, i) => ({ ...e, index: i })).filter((e) => e.formId === formId);
        const isRepeatable = Boolean(form.repeatable);
        const alreadyKnownSimple = !isRepeatable && entries.length > 0;
        const pickingSelection = pendingSelectionFor === formId;

        return (
          <div key={formId} className={entries.length > 0 ? 'sr-kcf-row sr-kcf-row--known' : 'sr-kcf-row'}>
            <div className="sr-kcf-row-main">
              <div>
                <span className="sr-kcf-row-name">{form.label}</span>
                <span className="sr-kcf-row-meta">
                  {form.fadeValue != null ? `Fade ${form.fadeValue}` : 'No Fade'} · {durationLabel(form.duration)}
                </span>
                {entries.map((e) => (
                  <div key={e.index} className="sr-kcf-instance">
                    {e.selection && <span className="sr-kcf-instance-label">{selectionLabel(form, e.selection)}</span>}
                    <button className="sr-btn sr-btn--secondary" onClick={() => removeAt(e.index)}>Remove</button>
                  </div>
                ))}
              </div>

              {isRepeatable ? (
                <button className="sr-btn sr-btn--primary" onClick={() => setPendingSelectionFor(pickingSelection ? null : formId)}>
                  {pickingSelection ? 'Cancel' : 'Learn Another'}
                </button>
              ) : (
                !alreadyKnownSimple && (
                  <button className="sr-btn sr-btn--primary" onClick={() => learnSimple(formId)}>Learn</button>
                )
              )}
            </div>

            {pickingSelection && (
              <div className="sr-kcf-picker">
                {form.requiresSelection === 'matrixAttribute' && MATRIX_ATTRIBUTES.map((attr) => (
                  <button key={attr.key} className="sr-btn sr-btn--secondary" onClick={() => learnWithSelection(formId, attr.key)}>
                    {attr.label}
                  </button>
                ))}
                {form.requiresSelection === 'program' && programOptions.map((item) => (
                  <button key={item.id} className="sr-btn sr-btn--secondary" onClick={() => learnWithSelection(formId, item.id)}>
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <p className="sr-kcf-row-description">{form.description}</p>
          </div>
        );
      })}
    </div>
  );
}
