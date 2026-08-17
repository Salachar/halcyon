import { Section, Panel } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';

export default function RulesMagic() {
  return (
    <>
      <Section>
        <Panel>
          <p>The Magic attribute drives most magical skills — Sorcery, Conjuring, and Enchanting all link to Magic. Astral is the exception, linking to Intuition instead.</p>
        </Panel>
      </Section>

      <CollapsibleSection id="rules-magic-schools" title="The Five Schools">
        <Panel>
          <ul>
            <li><strong style={{ color: 'var(--sr-blue-bright)' }}>Spells</strong> — Combat, Detection, Health, Illusion, Manipulation.</li>
            <li><strong style={{ color: 'var(--sr-blue-bright)' }}>Astral</strong> — perceiving mana, projecting consciousness onto the astral plane.</li>
            <li><strong style={{ color: 'var(--sr-blue-bright)' }}>Conjuring</strong> — summoning, binding, and banishing spirits.</li>
            <li><strong style={{ color: 'var(--sr-blue-bright)' }}>Enchanting</strong> — crafting foci, telesma, and spell preparations.</li>
            <li><strong style={{ color: 'var(--sr-blue-bright)' }}>Adept Powers</strong> — magic turned inward, on the body itself.</li>
          </ul>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-magic-types" title="Magic/Resonance Types">
        <table className="sr-table">
          <thead>
            <tr><th>Type</th><th>Casts?</th><th>Summons?</th><th>Astral?</th><th>Notes</th></tr>
          </thead>
          <tbody>
            <tr><td>Full</td><td>Yes</td><td>Yes</td><td>Perceive + Project</td><td>All 3 schools; Spells = Magic × 2</td></tr>
            <tr><td>Aspected</td><td>One school only (locked at creation)</td><td>Only if aspect = Conjuring</td><td>Perceive + Project</td><td>+1 Magic vs. Full at the same priority row, trading scope for it</td></tr>
            <tr><td>Adept</td><td>No</td><td>No</td><td>Perceive-only (if bought)</td><td>Power points = Magic</td></tr>
            <tr><td>Mystic Adept</td><td>Yes</td><td>Yes</td><td>Perceive-only</td><td>Splits Magic between adept powers & spells</td></tr>
            <tr><td>Technomancer</td><td>—</td><td>—</td><td>—</td><td>Resonance instead of Magic; Complex forms = Resonance × 2</td></tr>
            <tr><td>Mundane</td><td>No</td><td>No</td><td>No</td><td>Priority E only</td></tr>
          </tbody>
        </table>
      </CollapsibleSection>

      <CollapsibleSection id="rules-magic-casting-loop" title="Casting Loop">
        <Panel>
          <ol>
            <li>Optionally adjust the spell — Amp Up damage or Increase Area — which raises Drain.</li>
            <li>Roll Spellcasting = Sorcery + Magic against a threshold or an opposed roll.</li>
            <li>Resist Drain = Willpower + tradition attribute (Logic for Hermetic, Charisma for Shamanic). Hits at or above the Drain Value mean no effect; a shortfall becomes Stun damage, which turns Physical if it exceeds your Magic rating. Drain damage only heals with rest — never medkits, never magic.</li>
          </ol>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-magic-traditions" title="Traditions">
        <Panel>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Hermetic</strong> — Logic-based Drain, academic and scientific in flavor.</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Shamanic</strong> — Charisma-based Drain, intuitive and felt in flavor.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-magic-other" title="Other Pieces">
        <Panel>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Spirits</strong> — drawn from beast, air, water, fire, earth, and metahuman-adjacent types.</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Rituals</strong> — slower, group-castable, a six-step process, with bigger effects to match.</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Mentor Spirits</strong> — a Quality-based mechanic, granting thematic bonuses alongside thematic restrictions.</p>
        </Panel>
      </CollapsibleSection>
    </>
  );
}
