// The generic Character class — no archetype subclasses, no CLASS_MAP,
// per the earlier "de-cyborg" call. One class, fields cover mundane
// through full magician through technomancer through everything between.
//
// Pattern kept from BaseClass: private-ish underscored fields, validated
// getters/setters, defensive constructor hydration, toJSON(). Everything
// BaseClass had that didn't survive (glitches, shop_cart, cyberdeck,
// selected_tables, class/color static passthroughs) is just gone, not
// adapted — see the "de-cyborging Character" conversation for why.
//
// Ids referenced throughout (skills, qualities, gear, spells, powers,
// complex forms, mentor spirit) point at SKILLS/QUALITIES/GEAR/SPELLS/
// POWERS/COMPLEX_FORMS/MENTOR_SPIRITS — never duplicated here. Character
// stores *choices* (which id, what rank/config), not the definitions
// those ids resolve to.
//
// Condition Monitor max = ceil(attribute / 2) + 8 for both tracks
// (Body for Physical, Willpower for Stun) — confirmed against the book.
// Wound penalty: -1 per every 3 boxes of damage on EITHER track,
// cumulative within and across both tracks, applied to all tests
// EXCEPT Damage Resistance — that exemption is a pool-builder's job to
// respect (skip adding this penalty when building a resistance pool),
// not something woundPenalty itself can express, since it's just a
// single number with no notion of what kind of test it's for.

import { METATYPES } from '@data/character/metatypes';
import GearManager from './GearManager';
import MatrixManager from './MatrixManager';

const CORE_ATTRIBUTES = [
  'body', 'agility', 'reaction', 'strength',
  'willpower', 'logic', 'intuition', 'charisma', 'edge',
];

class Character {
  _id;
  _name = '';
  _metatype = 'human';
  _magicType = 'mundane'; // mundane | aspected | full | adept | mysticAdept | technomancer

  _attributes = {
    body: 1, agility: 1, reaction: 1, strength: 1,
    willpower: 1, logic: 1, intuition: 1, charisma: 1, edge: 1,
  };
  _magicResonance = 0; // meaning depends on magicType — Magic for casters/adepts, Resonance for technomancers
  _currentEdge = null; // fluctuating in-session Edge — distinct from the base attributes.edge rating, which never changes without a real advancement

  _skills = {}; // { [skillId]: { rank, specialization, expertise } } — keys match SKILLS ids
  _knowledgeSkills = []; // [{ label, category: 'knowledge' | 'language', proficiency? }] — freeform, no fixed id list

  _qualities = []; // [{ qualityId, level?, selection? }] — qualityId matches QUALITIES ids
  _spells = []; // spell ids known, matching SPELLS ids
  _powers = []; // [{ powerId, level?, selection? }] — powerId matches POWERS ids
  _complexForms = []; // complex form ids known, matching COMPLEX_FORMS ids
  _mentorSpiritId = null; // matches MENTOR_SPIRITS ids
  _mentorSpiritAdvantage = null; // 'magician' | 'adept' — Mystic Adept's one-time permanent choice

  // Gear (instance-keyed), PAN, and Essence all live on GearManager —
  // see that file for why. This is a real, persistent composed instance,
  // not a stateless data-holder Character reaches into directly.
  _nuyen = 0;
  _karma = 0;

  // Creation-time bookkeeping. Per-section, not one flat flag — Qualities
  // has real rule differences pre/post creation (caps, pricing), while
  // Skills doesn't need its own stored flag at all (skillPointsRemaining
  // hitting 0 is already a reliable, one-way signal). See
  // utils/creationProgress.js for how sections declare "am I done."
  _priorities = { metatype: null, attributes: null, skills: null, magicResonance: null, resources: null };
  _skillPointsRemaining = 0;
  _attributePointsRemaining = 0;
  _creationProgress = { qualities: false };

  _contacts = []; // [{ name, connection, loyalty, notes }]

  _physicalDamage = 0;
  _stunDamage = 0;

  constructor(data = {}) {
    this.id = data.id || crypto.randomUUID();
    this._name = data.name || '';
    this._metatype = data.metatype || 'human';
    this._magicType = data.magicType || 'mundane';

    this._attributes = {
      body: 1, agility: 1, reaction: 1, strength: 1,
      willpower: 1, logic: 1, intuition: 1, charisma: 1, edge: 1,
      ...(data.attributes || {}),
    };
    this._magicResonance = typeof data.magicResonance === 'number' ? data.magicResonance : 0;
    // Defaults to the base Edge rating if not explicitly saved — a brand
    // new character (or one from before this field existed) starts at
    // full Edge, same as showing up to a fresh session should.
    this._currentEdge = typeof data.currentEdge === 'number' ? data.currentEdge : this._attributes.edge;

    this._skills = data.skills || {};
    this._knowledgeSkills = data.knowledgeSkills || [];

    this._qualities = data.qualities || [];
    this._spells = data.spells || [];
    this._powers = data.powers || [];
    this._complexForms = data.complexForms || [];
    this._mentorSpiritId = data.mentorSpiritId || null;
    this._mentorSpiritAdvantage = data.mentorSpiritAdvantage || null;

    this.gearManager = new GearManager(data.gearManager || {});
    this.matrixManager = new MatrixManager(data.matrixManager || {});
    this._nuyen = typeof data.nuyen === 'number' ? data.nuyen : 0;
    this._karma = typeof data.karma === 'number' ? data.karma : 0;

    this._priorities = data.priorities || { metatype: null, attributes: null, skills: null, magicResonance: null, resources: null };
    this._skillPointsRemaining = typeof data.skillPointsRemaining === 'number' ? data.skillPointsRemaining : 0;
    this._attributePointsRemaining = typeof data.attributePointsRemaining === 'number' ? data.attributePointsRemaining : 0;
    this._creationProgress = data.creationProgress || { qualities: false };

    this._contacts = data.contacts || [];

    this._physicalDamage = typeof data.physicalDamage === 'number' ? data.physicalDamage : 0;
    this._stunDamage = typeof data.stunDamage === 'number' ? data.stunDamage : 0;
  }

  // ---- Identity ----

  get id() { return this._id; }
  set id(value) { this._id = value; }

  get name() { return this._name; }
  set name(value) { this._name = value; }

  get metatype() { return this._metatype; }
  set metatype(value) {
    if (!METATYPES[value]) return;
    this._metatype = value;
  }

  get metatypeData() {
    return METATYPES[this._metatype];
  }

  get magicType() { return this._magicType; }
  set magicType(value) { this._magicType = value; }

  // ---- Attributes — validated against the current metatype's range ----

  #attributeRange(attr) {
    return this.metatypeData?.attributeRanges?.[attr] || [1, 6];
  }

  get attributes() { return this._attributes; }

  getAttribute(attr) {
    return this._attributes[attr] ?? 1;
  }

  setAttribute(attr, value) {
    if (!CORE_ATTRIBUTES.includes(attr)) return;
    const [min, max] = this.#attributeRange(attr);
    if (value < min || value > max) return;
    this._attributes[attr] = value;
  }

  get magicResonance() { return this._magicResonance; }
  set magicResonance(value) {
    if (value < 0 || value > 6) return;
    this._magicResonance = value;
  }

  // ---- Essence — a thin pass-through to GearManager, which actually
  // owns the computation (it needs to walk the gear collection it holds,
  // plus manual adjustments — see GearManager for the real logic).
  // Stays on Character because "how much Essence do I have" is a
  // genuinely character-level question, even though it's gear-derived.

  get essence() {
    return this.gearManager.essence;
  }

  // How many whole-integer Essence thresholds have been crossed below 6
  // — "anytime your Essence goes below any whole integer, you lose a
  // corresponding point of Magic or Resonance." Exactly at a threshold
  // (Essence === 5.0) doesn't count as having crossed it yet.
  get magicPointsLostToEssence() {
    return 6 - Math.floor(this.essence);
  }

  // The practical Magic/Resonance value after Essence loss — magicResonance
  // itself stays untouched (the character's inherent base potential),
  // same "don't mutate the base, expose a derived value" instinct as
  // woundPenalty leaving attributes alone. If Essence is later restored
  // (bioware removed), the original base is still there, not overwritten.
  get effectiveMagicResonance() {
    return Math.max(0, this._magicResonance - this.magicPointsLostToEssence);
  }

  // ---- Current Edge — fluctuating in-session pool, separate from the
  // base attribute rating. No hard cap enforced here on purpose: normal
  // play keeps it at or below the base rating, but nothing stops a GM
  // from granting bonus Edge some other way, and this isn't a system
  // built to police that boundary.

  get currentEdge() { return this._currentEdge; }
  set currentEdge(value) { this._currentEdge = Math.max(0, value); }

  spendEdge(amount) {
    if (amount > this._currentEdge) return false;
    this._currentEdge -= amount;
    return true;
  }

  gainEdge(amount) {
    this._currentEdge += amount;
  }

  // "End Confrontation" — the manual evaporation trigger. Deliberately
  // manual: "is this fight actually over" isn't worth trying to detect.
  resetEdge() {
    this._currentEdge = this._attributes.edge;
  }

  // ---- Skills ----

  get skills() { return this._skills; }

  getSkillRank(skillId) {
    return this._skills[skillId]?.rank ?? 0;
  }

  setSkillRank(skillId, rank) {
    if (!this._skills[skillId]) {
      this._skills[skillId] = { rank: 0, specialization: null, expertise: null };
    }
    this._skills[skillId].rank = rank;
  }

  get knowledgeSkills() { return this._knowledgeSkills; }

  addKnowledgeSkill(entry) {
    this._knowledgeSkills.push(entry);
  }

  // ---- Qualities ----

  get qualities() { return this._qualities; }

  addQuality(qualityId, extra = {}) {
    this._qualities.push({ qualityId, ...extra });
  }

  removeQuality(qualityId) {
    this._qualities = this._qualities.filter((q) => q.qualityId !== qualityId);
  }

  // Index-based removal — the correct one to use from UI, since
  // removeQuality(qualityId) alone can't distinguish two entries that
  // share an id with different selections (Spirit Affinity taken twice
  // for different spirit classes, for instance) and would wipe out both.
  removeQualityAt(index) {
    this._qualities.splice(index, 1);
  }

  // ---- Magic / Resonance picks ----

  get spells() { return this._spells; }
  addSpell(spellId) {
    if (!this._spells.includes(spellId)) this._spells.push(spellId);
  }

  get powers() { return this._powers; }
  addPower(powerId, extra = {}) {
    this._powers.push({ powerId, ...extra });
  }

  get complexForms() { return this._complexForms; }
  addComplexForm(formId) {
    if (!this._complexForms.includes(formId)) this._complexForms.push(formId);
  }

  get mentorSpiritId() { return this._mentorSpiritId; }
  set mentorSpiritId(value) { this._mentorSpiritId = value; }

  get mentorSpiritAdvantage() { return this._mentorSpiritAdvantage; }
  set mentorSpiritAdvantage(value) { this._mentorSpiritAdvantage = value; }

  // ---- Economy ----

  get nuyen() { return this._nuyen; }
  set nuyen(value) { this._nuyen = Math.max(0, value); }

  spendNuyen(amount) {
    if (amount > this._nuyen) return false;
    this._nuyen -= amount;
    return true;
  }

  get karma() { return this._karma; }
  set karma(value) { this._karma = Math.max(0, value); }

  // ---- Creation-time bookkeeping ----

  get priorities() { return this._priorities; }
  set priorities(value) { this._priorities = value; }

  get skillPointsRemaining() { return this._skillPointsRemaining; }
  set skillPointsRemaining(value) { this._skillPointsRemaining = Math.max(0, value); }

  get attributePointsRemaining() { return this._attributePointsRemaining; }
  set attributePointsRemaining(value) { this._attributePointsRemaining = Math.max(0, value); }

  get creationProgress() { return this._creationProgress; }
  set creationProgress(value) { this._creationProgress = value; }

  // Convenience mutator for flipping one section's flag without
  // clobbering the others.
  setSectionComplete(section, complete = true) {
    this._creationProgress = { ...this._creationProgress, [section]: complete };
  }

  // ---- Contacts ----

  get contacts() { return this._contacts; }
  addContact(contact) { this._contacts.push(contact); }

  // ---- Condition Monitors ----

  get physicalMonitorMax() {
    return Math.ceil(this.getAttribute('body') / 2) + 8;
  }

  get stunMonitorMax() {
    return Math.ceil(this.getAttribute('willpower') / 2) + 8;
  }

  get physicalDamage() { return this._physicalDamage; }
  set physicalDamage(value) { this._physicalDamage = Math.max(0, Math.min(this.physicalMonitorMax, value)); }

  get stunDamage() { return this._stunDamage; }
  set stunDamage(value) { this._stunDamage = Math.max(0, Math.min(this.stunMonitorMax, value)); }

  get woundPenalty() {
    return Math.floor(this._physicalDamage / 3) + Math.floor(this._stunDamage / 3);
  }

  // ---- Serialization ----

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      metatype: this.metatype,
      magicType: this.magicType,
      attributes: this.attributes,
      magicResonance: this.magicResonance,
      currentEdge: this.currentEdge,
      skills: this.skills,
      knowledgeSkills: this.knowledgeSkills,
      qualities: this.qualities,
      spells: this.spells,
      powers: this.powers,
      complexForms: this.complexForms,
      mentorSpiritId: this.mentorSpiritId,
      mentorSpiritAdvantage: this.mentorSpiritAdvantage,
      gearManager: this.gearManager.toJSON(),
      matrixManager: this.matrixManager.toJSON(),
      nuyen: this.nuyen,
      karma: this.karma,
      priorities: this.priorities,
      skillPointsRemaining: this.skillPointsRemaining,
      attributePointsRemaining: this.attributePointsRemaining,
      creationProgress: this.creationProgress,
      contacts: this.contacts,
      physicalDamage: this.physicalDamage,
      stunDamage: this.stunDamage,
    };
  }
}

export default Character;
