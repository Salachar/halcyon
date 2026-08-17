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
// NOTE: Condition Monitor max formulas (Physical/Stun) are deliberately
// NOT implemented yet — Rules > Combat only documents the vehicle CM
// formula so far, not the character one. Rather than guess at an
// unverified number, physicalDamage/stunDamage are tracked as raw
// values here; a physicalMonitorMax/stunMonitorMax getter should get
// added once that's confirmed against the book.

import { METATYPES } from '@data/character/metatypes';

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

  _skills = {}; // { [skillId]: { rank, specialization, expertise } } — keys match SKILLS ids
  _knowledgeSkills = []; // [{ label, category: 'knowledge' | 'language', proficiency? }] — freeform, no fixed id list

  _qualities = []; // [{ qualityId, level?, selection? }] — qualityId matches QUALITIES ids
  _spells = []; // spell ids known, matching SPELLS ids
  _powers = []; // [{ powerId, level?, selection? }] — powerId matches POWERS ids
  _complexForms = []; // complex form ids known, matching COMPLEX_FORMS ids
  _mentorSpiritId = null; // matches MENTOR_SPIRITS ids
  _mentorSpiritAdvantage = null; // 'magician' | 'adept' — Mystic Adept's one-time permanent choice

  _gear = {}; // { [itemId]: { quantity, config } } — itemId matches GEAR ids, config is { rating } | { capacity } | { units } depending on the item, resolved and locked in at purchase time (see the Purchase Modal conversation — not recomputed live like a Pool)
  _nuyen = 0;
  _karma = 0;

  // Creation-time bookkeeping — cleared out or ignored once creationComplete is true
  _priorities = { metatype: null, attributes: null, skills: null, magicResonance: null, resources: null };
  _skillPointsRemaining = 0;
  _attributePointsRemaining = 0;
  _creationComplete = false;

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

    this._skills = data.skills || {};
    this._knowledgeSkills = data.knowledgeSkills || [];

    this._qualities = data.qualities || [];
    this._spells = data.spells || [];
    this._powers = data.powers || [];
    this._complexForms = data.complexForms || [];
    this._mentorSpiritId = data.mentorSpiritId || null;
    this._mentorSpiritAdvantage = data.mentorSpiritAdvantage || null;

    this._gear = data.gear || {};
    this._nuyen = typeof data.nuyen === 'number' ? data.nuyen : 0;
    this._karma = typeof data.karma === 'number' ? data.karma : 0;

    this._priorities = data.priorities || { metatype: null, attributes: null, skills: null, magicResonance: null, resources: null };
    this._skillPointsRemaining = typeof data.skillPointsRemaining === 'number' ? data.skillPointsRemaining : 0;
    this._attributePointsRemaining = typeof data.attributePointsRemaining === 'number' ? data.attributePointsRemaining : 0;
    this._creationComplete = Boolean(data.creationComplete);

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

  // ---- Gear / Inventory ----

  get gear() { return this._gear; }

  addGear(itemId, config = {}, quantity = 1) {
    if (this._gear[itemId]) {
      this._gear[itemId].quantity += quantity;
    } else {
      this._gear[itemId] = { quantity, config };
    }
  }

  removeGear(itemId, quantity = 1) {
    if (!this._gear[itemId]) return;
    this._gear[itemId].quantity -= quantity;
    if (this._gear[itemId].quantity <= 0) delete this._gear[itemId];
  }

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

  get creationComplete() { return this._creationComplete; }
  set creationComplete(value) { this._creationComplete = Boolean(value); }

  // ---- Contacts ----

  get contacts() { return this._contacts; }
  addContact(contact) { this._contacts.push(contact); }

  // ---- Condition Monitors (raw values only — see file header note) ----

  get physicalDamage() { return this._physicalDamage; }
  set physicalDamage(value) { this._physicalDamage = Math.max(0, value); }

  get stunDamage() { return this._stunDamage; }
  set stunDamage(value) { this._stunDamage = Math.max(0, value); }

  // ---- Serialization ----

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      metatype: this.metatype,
      magicType: this.magicType,
      attributes: this.attributes,
      magicResonance: this.magicResonance,
      skills: this.skills,
      knowledgeSkills: this.knowledgeSkills,
      qualities: this.qualities,
      spells: this.spells,
      powers: this.powers,
      complexForms: this.complexForms,
      mentorSpiritId: this.mentorSpiritId,
      mentorSpiritAdvantage: this.mentorSpiritAdvantage,
      gear: this.gear,
      nuyen: this.nuyen,
      karma: this.karma,
      priorities: this.priorities,
      skillPointsRemaining: this.skillPointsRemaining,
      attributePointsRemaining: this.attributePointsRemaining,
      creationComplete: this.creationComplete,
      contacts: this.contacts,
      physicalDamage: this.physicalDamage,
      stunDamage: this.stunDamage,
    };
  }
}

export default Character;
