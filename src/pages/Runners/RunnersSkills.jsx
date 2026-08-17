import { Section, Panel } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import SkillCard from '@components/SkillCard';
import { SKILLS } from '@data/character/skills';

export default function ShadowrunnersSkills() {
  return (
    <>
      <Section>
        <Panel>
          <p>Three categories: Active, Knowledge, and Language.</p>
        </Panel>
      </Section>

      <CollapsibleSection id="sr-skills-active" title="Active Skills">
        <Panel>
          <p>A fixed list of 19 — no homebrew additions.</p>
          <p>Bought one-for-one with priority points at creation — flat cost, no escalating table at this stage. Only one skill may sit at its maximum rank.</p>
          <p>Untrained rules for these live on Rules &gt; Core Mechanics.</p>
        </Panel>
        <Section>
          {Object.values(SKILLS).map((skill) => (
            <SkillCard key={skill.label} skill={skill} />
          ))}
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="sr-skills-spec" title="Specializations & Expertise">
        <Panel>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Specialization</strong> — +2 dice in a narrow area of the skill. Costs 1 skill rank at creation, or 5 Karma and a month of training in play.</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Expertise</strong> — +3 dice, an upgrade from an existing specialization. Requires skill rank 5+, and isn't purchasable at creation.</p>
          <p>Hard cap: one expertise and one specialization per skill.</p>
          <p><strong style={{ color: 'var(--sr-orange-bright)' }}>Exotic Weapons is the exception</strong> — it requires a specialization just to use the skill at all, and ranks apply across every specialization you hold in it.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="sr-skills-knowledge" title="Knowledge Skills">
        <Panel>
          <p>No ranks, no dice pool — instead they unlock bonus info off other tests ("does my knowledge of local gang politics apply here?").</p>
          <p>Can't be used untrained. Fully freeform — players can propose their own, subject to GM approval. Also used for Memory tests.</p>
          <p>3 Karma and a month to acquire in play.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="sr-skills-language" title="Language Skills">
        <Panel>
          <p>A special subtype of Knowledge skill, with four tiers: Base → Specialist (+2) → Expert (+3) → Native (no test needed at all).</p>
          <p>One free Native language at creation — the only way to ever get Native. Karma-based advancement tops out at Expert.</p>
          <p>Free Knowledge and Language skill points at creation equal your Logic score, plus the one free Native language on top.</p>
        </Panel>
      </CollapsibleSection>
    </>
  );
}
