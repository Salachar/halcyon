import { useState } from 'react';

import {
  Page,
  PageHeader,
  Section,
  Panel,
  Callout,
  Tabs,
} from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';

const TABS = [
  { key: 'core', label: 'Core Mechanics' },
  { key: 'combat', label: 'Combat' },
  { key: 'magic', label: 'Magic' },
  { key: 'matrix', label: 'The Matrix' },
  { key: 'rigging', label: 'Rigging' },
];

export default function Rules() {
  const [activeTab, setActiveTab] = useState('core');

  return (
    <Page>
      <PageHeader
        title="Rules"
        subtitle="How the universe works — reference only, no live rolling here"
      />

      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'core' && <CoreMechanicsTab />}
      {activeTab === 'combat' && <StubTab label="Combat" />}
      {activeTab === 'magic' && <StubTab label="Magic" />}
      {activeTab === 'matrix' && <StubTab label="The Matrix" />}
      {activeTab === 'rigging' && <StubTab label="Rigging" />}
    </Page>
  );
}

function StubTab({ label }) {
  return (
    <Section>
      <Panel>
        <p>{label} reference hasn't been written yet — this tab is just holding its place in the nav for now.</p>
      </Panel>
    </Section>
  );
}

// ============================================================================
// CORE MECHANICS
// ============================================================================

function CoreMechanicsTab() {
  return (
    <>
      <CollapsibleSection id="rules-core-dice-pools" title="Dice Pools & Tests">
        <Panel>
          <p>
            Every roll uses six-sided dice. You're not adding them up — you're counting how many came up 5 or 6. Each of those is a <strong>hit</strong>. Roll more than half 1s and you've glitched (see below).
          </p>
          <p>
            The number of dice you roll is your <strong>dice pool</strong>. Most of the time that's a skill rank + a linked attribute, added together — <em>Outdoors + Intuition</em>, for example. Some rolls just add two attributes, or the same attribute twice.
          </p>
        </Panel>

        <Section title="Test Types">
          <Panel solid>
            <p><strong style={{ color: 'var(--sr-orange-bright)' }}>Simple Test.</strong> Roll your pool, count hits, compare to a threshold the GM sets. Meet or beat it, you succeed — hits beyond that are <em>net hits</em>, which often matter too. Written as <em>Outdoors + Intuition (3)</em> — skill + attribute, threshold in parens.</p>
            <p><strong style={{ color: 'var(--sr-orange-bright)' }}>Opposed Test.</strong> Both sides roll, most hits wins. Ties go to the aggressor unless net hits are specifically needed for an effect.</p>
            <p><strong style={{ color: 'var(--sr-orange-bright)' }}>Extended Test.</strong> Roll repeatedly, pool shrinking by 1 die each time, accumulating hits toward the threshold — or run out of dice and fail. Each roll costs an <em>interval</em> of in-fiction time. Written as <em>Engineering + Logic (9, 1 hour)</em>.</p>
            <p><strong style={{ color: 'var(--sr-orange-bright)' }}>Teamwork Test.</strong> One leader, everyone else helps. Helpers roll first; their hits become bonus dice for the leader, capped at the leader's own skill rank (or higher attribute, for two-attribute tests). A helper's glitch costs them Edge gain/spend for 1–3 rounds after.</p>
          </Panel>
        </Section>

        <Section title="Threshold Guidelines">
          <table className="sr-table">
            <thead>
              <tr><th>Threshold</th><th>Difficulty</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Trivial — barely more than walking and talking.</td></tr>
              <tr><td>2</td><td>Something an average person pulls off regularly.</td></tr>
              <tr><td>3</td><td>Normal starting point — the level shadowrunners are expected to handle.</td></tr>
              <tr><td>4–5</td><td>Genuinely difficult, needs real skill.</td></tr>
              <tr><td>6+</td><td>Exceptional — the kind of thing that makes a reputation.</td></tr>
            </tbody>
          </table>
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="rules-core-glitches" title="Glitches & Critical Glitches">
        <Panel>
          <p>
            More than half your dice come up 1s: that's a <strong style={{ color: 'var(--sr-amber)' }}>glitch</strong>. If you still scored enough hits, the test can still succeed — the glitch doesn't cancel it, it just causes a complication afterward. Think dropped weapon, forgotten alias, something inconvenient rather than disastrous.
          </p>
          <p>
            A glitch with <em>zero</em> hits is a <strong style={{ color: 'var(--sr-orange-bright)' }}>critical glitch</strong> — meaningfully worse. The shot that ricochets into a teammate, the hack that pings GOD with your name and location. Rough, potentially lasting — but never a reason to end someone's fun outright.
          </p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-core-edge" title="Edge">
        <Panel>
          <p>
            Edge is the system's built-in "and then everything turns" mechanic — tactical advantage you bank and cash in at the right moment. Gained through good play (GM discretion — never for an action taken solely to farm Edge), tracked with a physical token at the table.
          </p>
          <p>
            One Edge expenditure per action. That expenditure is a single boost or Edge Action — never a combination — though the same boost can be bought multiple times on the same roll (2 Edge for a reroll of 2 dice, say).
          </p>
        </Panel>

        <Section title="Edge Boosts">
          <table className="sr-table">
            <thead>
              <tr><th>Cost</th><th>Boost</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Reroll one die (yours or an opponent's) — result stands, decided after all rolls are made.</td></tr>
              <tr><td>1</td><td>+3 to your Initiative Score.</td></tr>
              <tr><td>2</td><td>+1 to a single die.</td></tr>
              <tr><td>2</td><td>Give 1 Edge to an ally (costs you 2).</td></tr>
              <tr><td>2</td><td>Negate 1 Edge from an opponent (costs you 2).</td></tr>
              <tr><td>3</td><td>Buy one automatic hit (adds to your total — not an automatic success).</td></tr>
              <tr><td>3</td><td>Heal one box of Stun damage.</td></tr>
              <tr><td>4</td><td>Add Edge to your pool as bonus dice; 6s explode (reroll for more hits until they stop coming).</td></tr>
              <tr><td>4</td><td>Heal 1 box of Physical damage.</td></tr>
              <tr><td>4</td><td>Reroll all failed dice (not usable if you glitched).</td></tr>
              <tr><td>5</td><td>Count 2s as glitches for the target, alongside 1s.</td></tr>
              <tr><td>5</td><td>Create a special effect — work it out with the GM, but it should tilt things your way.</td></tr>
            </tbody>
          </table>
          <p style={{ color: 'var(--sr-text-muted)', fontSize: '0.85rem' }}>
            Any tier's boost can instead be spent on an <strong>Edge Action</strong> of that cost — a longer list of specific combat/social/Matrix effects (Anticipation, Big Speech, Shank, etc.), each tied to a specific action and decided <em>before</em> the roll it modifies, never after.
          </p>
        </Section>

        <Callout title="Not Yet Covered" variant="note">
          Gaining Edge in detail, Burning Edge, and the Wild Die are all real subsections of this rule that haven't been written up here yet — flag if you want those filled in next.
        </Callout>
      </CollapsibleSection>
    </>
  );
}
