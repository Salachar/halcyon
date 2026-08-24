import { useState } from 'react';

import Character from '@data/Character';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { PRIORITY_TABLE } from '@data/character/priority_table';
import { METATYPES } from '@data/character/metatypes';
import { CollapsibleSection } from '@components/CollapsibleSection';
import AttributeInfo from '@components/AttributeInfo';
import MetatypeTable from '@components/MetatypeTable';

import PriorityGrid from '@components/PriorityGrid';
import MagicTypeTable from '@components/MagicTypeTable';
import AttributeSpend from '@components/AttributeSpend';
import './creationModal.css';

const CORE_ATTRS = ['body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition', 'charisma', 'edge'];
const PHYSICAL_MENTAL_ATTRS = ['body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition', 'charisma'];

const MAGIC_TYPES = ['full', 'aspected', 'adept', 'mysticAdept', 'technomancer', 'mundane'];
const MAGIC_TYPE_LABELS = {
  full: 'Full Magician',
  aspected: 'Aspected Magician',
  adept: 'Adept',
  mysticAdept: 'Mystic Adept',
  technomancer: 'Technomancer',
  mundane: 'Mundane',
};

const MAGIC_ASPECTS = ['sorcery', 'conjuring', 'enchanting'];
const MAGIC_ASPECT_LABELS = {
  sorcery: 'Sorcery (Spellcasting)',
  conjuring: 'Conjuring (Summoning)',
  enchanting: 'Enchanting',
};

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Priority + Metatype + Magic Type + Attributes, locked in one sitting —
// nothing gets saved (no addCharacter call) until "Create Character" at
// the bottom. Reference info (attribute meanings, metatype ranges, magic
// type descriptions) is always visible from the top of the page, not
// gated behind picks — only the actual SELECTION controls are gated,
// and even those show every option always, dimming (not hiding) whatever
// isn't currently legal. Nobody should have to already know the rules to
// see what they're choosing between.
export default function CreationModal({ onClose }) {
  const { addCharacter, selectCharacter } = useCharacterManager();

  const [priorities, setPriorities] = useState({
    metatype: null, attributes: null, skills: null, magicResonance: null, resources: null,
  });
  const [metatype, setMetatype] = useState(null);
  const [magicType, setMagicType] = useState(null);
  const [magicAspect, setMagicAspect] = useState(null);
  const [attributes, setAttributes] = useState({
    body: 1, agility: 1, reaction: 1, strength: 1,
    willpower: 1, logic: 1, intuition: 1, charisma: 1, edge: 1,
  });

  const usedRows = Object.values(priorities).filter(Boolean);
  const prioritiesComplete = usedRows.length === 5 && new Set(usedRows).size === 5;

  const metatypeUnlocked = Boolean(priorities.metatype);
  const magicUnlocked = Boolean(metatype);
  const attributesUnlocked = Boolean(metatype) && Boolean(priorities.attributes);

  const availableMetatypes = metatypeUnlocked ? PRIORITY_TABLE[priorities.metatype].metatype.availableMetatypes : null;
  const magicRow = priorities.magicResonance ? PRIORITY_TABLE[priorities.magicResonance] : null;
  const rowGrantsMagic = magicRow?.magicResonance != null;

  const attributeBudget = priorities.attributes ? PRIORITY_TABLE[priorities.attributes].attributePoints : 0;
  const attributeRanges = metatype ? METATYPES[metatype].attributeRanges : null;
  const pointsSpent = CORE_ATTRS.reduce((sum, a) => sum + (attributes[a] - 1), 0);
  const pointsRemaining = attributeBudget - pointsSpent;
  const maxedAttr = attributeRanges
    ? PHYSICAL_MENTAL_ATTRS.find((a) => attributes[a] === attributeRanges[a][1]) || null
    : null;

  const canFinish = prioritiesComplete && metatype && magicType && (magicType !== 'aspected' || magicAspect) && attributesUnlocked && pointsRemaining === 0;

  const handleAssignPriority = (categoryKey, row) => {
    setPriorities((prev) => {
      const next = { ...prev, [categoryKey]: row || null };
      if (categoryKey === 'metatype') { setMetatype(null); }
      if (categoryKey === 'magicResonance') { setMagicType(null); setMagicAspect(null); }
      return next;
    });
  };

  const adjustAttribute = (attr, delta) => {
    if (!attributeRanges) return;
    const [min, max] = attributeRanges[attr];
    const next = attributes[attr] + delta;
    if (next < min || next > max) return;
    if (delta > 0) {
      if (pointsRemaining <= 0) return;
      const wouldBeSecondAtMax = PHYSICAL_MENTAL_ATTRS.includes(attr) && next === max && maxedAttr && maxedAttr !== attr;
      if (wouldBeSecondAtMax) return;
    }
    setAttributes((prev) => ({ ...prev, [attr]: next }));
  };

  const handleCreate = () => {
    const magicValue = magicType === 'mundane' ? 0 : magicRow.magicResonance[magicType];
    const character = new Character({
      metatype,
      magicType,
      magicAspect: magicType === 'aspected' ? magicAspect : null,
      attributes,
      magicResonance: magicValue,
      priorities,
      skillPointsRemaining: priorities.skills ? PRIORITY_TABLE[priorities.skills].skillPoints : 0,
      nuyen: priorities.resources ? PRIORITY_TABLE[priorities.resources].resources : 0,
      karma: 50,
    });

    // Technomancers access the Matrix through their own Living Persona,
    // not a purchased device — confirmed: "A living persona still uses
    // the same four Matrix attributes as a device, but their ratings
    // are determined by your Mental attributes." Auto-granted here
    // (never purchased, never shown in Market) and set as Primary
    // immediately, so a new technomancer character never has to
    // manually promote anything to have a working PAN. See
    // living_persona in matrix_devices.js for the full reasoning.
    if (magicType === 'technomancer') {
      const livingPersonaId = character.gearManager.add('living_persona', {});
      character.gearManager.setPanMaster(livingPersonaId);
    }

    addCharacter(character);
    selectCharacter(character.id);
    onClose();
  };

  return (
    <div className="sr-modal-backdrop" onClick={onClose}>
      <div className="sr-modal sr-creation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sr-modal-header">
          <h3 className="sr-modal-title">New Character</h3>
          <button className="sr-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <p className="sr-creation-step-hint">
          Everything below is visible from the start — dimmed options just aren't legal yet given what you've picked so far. Nothing saves until you hit Create at the bottom.
        </p>

        <CollapsibleSection id="creation-attribute-explainer" title="What Attributes Mean" defaultOpen>
          <AttributeInfo />
        </CollapsibleSection>

        <CollapsibleSection id="creation-priority" title="Priority Table" defaultOpen>
          <PriorityGrid priorities={priorities} usedRows={usedRows} onAssign={handleAssignPriority} />
        </CollapsibleSection>

        <CollapsibleSection id="creation-metatype-info" title="Metatype" defaultOpen>
          <MetatypeTable availableMetatypes={availableMetatypes} />
        </CollapsibleSection>

        <div className="sr-creation-options">
          {['human', 'dwarf', 'elf', 'ork', 'troll'].map((m) => {
            const legal = metatypeUnlocked && availableMetatypes.includes(m);
            return (
              <button
                key={m}
                className={
                  metatype === m
                    ? 'sr-btn sr-btn--primary'
                    : legal
                      ? 'sr-btn sr-btn--secondary'
                      : 'sr-btn sr-btn--secondary sr-creation-option--unavailable'
                }
                onClick={() => legal && setMetatype(m)}
                disabled={!legal}
              >
                {capitalize(m)}
              </button>
            );
          })}
        </div>

        <CollapsibleSection id="creation-magic-info" title="Magic/Resonance" defaultOpen>
          <MagicTypeTable magicRow={magicRow} />
        </CollapsibleSection>

        <div className="sr-creation-options">
          {MAGIC_TYPES.map((type) => {
            const legal = magicUnlocked && Boolean(priorities.magicResonance) && (type === 'mundane' ? !rowGrantsMagic : rowGrantsMagic);
            return (
              <button
                key={type}
                className={
                  magicType === type
                    ? 'sr-btn sr-btn--primary'
                    : legal
                      ? 'sr-btn sr-btn--secondary'
                      : 'sr-btn sr-btn--secondary sr-creation-option--unavailable'
                }
                onClick={() => {
                  if (!legal) return;
                  setMagicType(type);
                  if (type !== 'aspected') setMagicAspect(null);
                }}
                disabled={!legal}
              >
                {MAGIC_TYPE_LABELS[type]}
              </button>
            );
          })}
        </div>

        {magicType === 'aspected' && (
          <div className="sr-creation-options">
            {MAGIC_ASPECTS.map((aspect) => (
              <button
                key={aspect}
                className={magicAspect === aspect ? 'sr-btn sr-btn--primary' : 'sr-btn sr-btn--secondary'}
                onClick={() => setMagicAspect(aspect)}
              >
                {MAGIC_ASPECT_LABELS[aspect]}
              </button>
            ))}
          </div>
        )}

        <CollapsibleSection id="creation-attribute-spend" title="Attributes" defaultOpen>
          <p style={{ color: 'var(--sr-text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            Spend the points your Priority row grants. Only one Physical or Mental attribute (not Edge) may sit at its metatype maximum — scroll up to the Metatype table above if you need to check a range.
          </p>

          {attributesUnlocked ? (
            <AttributeSpend
              attrs={CORE_ATTRS}
              values={attributes}
              ranges={attributeRanges}
              maxedAttr={maxedAttr}
              pointsRemaining={pointsRemaining}
              attributeBudget={attributeBudget}
              onAdjust={adjustAttribute}
            />
          ) : (
            <p className="sr-creation-info-placeholder">Select a Metatype and assign a Priority row to Attributes to spend points.</p>
          )}
        </CollapsibleSection>

        <div className="sr-modal-actions">
          <button className="sr-btn sr-btn--secondary" onClick={onClose}>Cancel</button>
          <button className="sr-btn sr-btn--primary" disabled={!canFinish} onClick={handleCreate}>Create Character</button>
        </div>
      </div>
    </div>
  );
}
