import { Section, Panel } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';

export default function RulesCombat() {
  return (
    <>
      <Section>
        <Panel>
          <p>Combat resolves in rounds of roughly three seconds, acted out in Initiative order.</p>
        </Panel>
      </Section>

      <CollapsibleSection id="rules-combat-initiative" title="Initiative">
        <Panel>
          <p>Initiative Rating = Reaction + Intuition.</p>
          <p>Roll your Initiative Dice — starts at 1D6, augmentable, capped at 5D6 — and sum the actual numbers rolled (not hits). Initiative Score = Rating + that sum.</p>
          <p>Act in order from highest Score to lowest, single pass per round, looping back to the top for the next round. Scores aren't rerolled between rounds barring an in-fight effect like a wound.</p>
          <p>Ties break by <strong style={{ color: 'var(--sr-orange-bright)' }}>ERIC</strong> — Edge, then Reaction, then Intuition, then a coin flip.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-combat-actions" title="Actions per Round">
        <Panel>
          <p>Baseline: 1 Major Action + 1 Minor Action, plus 1 additional Minor Action per Initiative Die you have.</p>
          <p>Hard cap: never start a turn with more than 5 Minor Actions.</p>
          <p>Trading: 4 Minor Actions convert to 1 Major Action; a Major Action can also just be spent performing a Minor's worth of activity.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-combat-surprise" title="Surprise">
        <Panel>
          <p>Roll Reaction + Intuition (3) to avoid being caught flat-footed. Deliberate ambushers skip this roll.</p>
          <p>On a failure, you still roll Initiative and can defend or soak, but you take no actions and can't spend Edge during the first round.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-combat-ratings" title="Ratings">
        <Panel>
          <p>Attack Rating (unarmed, no weapon) = Reaction + Strength, Close range only.</p>
          <p>Defense Rating = Armor + Body.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-combat-damage" title="Damage & Condition Monitor">
        <Panel>
          <p>Damage tracks along two separate pools — Physical and Stun — with wound penalties escalating as boxes fill on either one.</p>
          <p>Vehicles and drones use a single combined Condition Monitor instead: (Body ÷ 2) + 8.</p>
        </Panel>
      </CollapsibleSection>
    </>
  );
}
