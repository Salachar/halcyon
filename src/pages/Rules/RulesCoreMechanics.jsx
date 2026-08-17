import { Section, Panel, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';

export default function RulesCoreMechanics() {
  return (
    <>
      <Section>
        <Panel>
          <p>
            The core formula: <strong style={{ color: 'var(--sr-orange-bright)' }}>dice pool = skill rank + linked attribute</strong>. Roll that many six-sided dice — 5s and 6s are hits.
          </p>
          <p>
            No ranks in a skill doesn't always mean you can't try. If the skill allows it, you roll the linked attribute minus 1 instead. Some skills can't be attempted untrained at all — see below.
          </p>
        </Panel>
      </Section>

      <CollapsibleSection id="rules-core-test-types" title="Test Types">
        <Panel>
          <ul>
            <li><strong style={{ color: 'var(--sr-blue-bright)' }}>Simple Test</strong> — roll your pool, compare hits to a threshold.</li>
            <li><strong style={{ color: 'var(--sr-blue-bright)' }}>Opposed Test</strong> — roll your pool against someone else's pool, compare hits to hits.</li>
            <li><strong style={{ color: 'var(--sr-blue-bright)' }}>Extended Test</strong> — roll repeatedly, accumulating hits across multiple rolls toward a target number.</li>
          </ul>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-core-glitches" title="Glitches">
        <Panel>
          <p><strong style={{ color: 'var(--sr-amber)' }}>Glitch</strong> — more than half the dice in the pool come up 1.</p>
          <p><strong style={{ color: 'var(--sr-orange-bright)' }}>Critical Glitch</strong> — a glitch that also fails the test entirely, not just a complication on top of a success.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-core-untrained" title="Untrained Skills">
        <Panel>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Can attempt at 0 ranks</strong> (roll attribute − 1):</p>
          <p style={{ color: 'var(--sr-text-muted)' }}>Athletics, Close Combat, Con, Electronics, Engineering, Firearms, Influence, Outdoors, Perception, Piloting, Stealth</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Cannot attempt at 0 ranks</strong> (no roll possible):</p>
          <p style={{ color: 'var(--sr-text-muted)' }}>Astral, Biotech, Conjuring, Cracking, Enchanting, Exotic Weapons, Sorcery, Tasking</p>
          <p>Knowledge skills also can't be used untrained — you either have it or you don't.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-core-edge" title="Edge — Full Reference">
        <Panel>
          <p>
            Your Edge pool starts each session at your Edge attribute rating, and carries/accumulates through the session — hard capped at 7 at all times.
          </p>
        </Panel>

        <Section title="Gaining Edge">
          <Panel solid>
            <p>
              At the start of an Attack or hack action, if Attack Rating and Defense Rating differ by 4 or more, the favored side gains 1 Edge — capped at +2 Edge per combat round from this source alone. Qualities (Analytical Mind grants bonus Edge on Logic-based tests, for example) and GM awards for good roleplay round out the other sources.
            </p>
          </Panel>
        </Section>

        <Section title="Evaporation">
          <Panel solid>
            <p>
              Any Edge above your base attribute rating evaporates once the confrontation ends — combat, hacking, social persuasion, all of it counts as a confrontation. Evaporation doesn't refill you back to base, either; whatever you're sitting on carries into the next scene.
            </p>
          </Panel>
        </Section>

        <Section title="Spending — Boost Costs">
          <table className="sr-table">
            <thead><tr><th>Cost</th><th>Boost</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Reroll one die (yours or the target's) — applied after the roll.</td></tr>
              <tr><td>2</td><td>+1 to a single die.</td></tr>
              <tr><td>3</td><td>Buy one automatic hit.</td></tr>
              <tr><td>4</td><td>Add full Edge as bonus dice with exploding 6s, or reroll all failed dice.</td></tr>
              <tr><td>5</td><td>Count 2s as glitches on the opponent's defense roll, or invent a special effect (GM buy-in).</td></tr>
            </tbody>
          </table>
          <Callout title="One Per Action" variant="note">
            One boost per action, no stacking — you're picking a single tier's effect, not layering multiple boosts on the same roll.
          </Callout>
        </Section>
      </CollapsibleSection>
    </>
  );
}
