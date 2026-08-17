import { Section, Panel, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';

export default function ShadowrunnersAdvancement() {
  return (
    <>
      <Section>
        <Panel>
          <p>All post-creation growth is Karma-driven — the same currency, the same table, whether it's session-one leftover Karma or Karma earned three months of play later.</p>
        </Panel>
      </Section>

      <CollapsibleSection id="sr-advancement-costs" title="Cost Table">
        <table className="sr-table">
          <thead><tr><th>Type</th><th>Karma Cost</th></tr></thead>
          <tbody>
            <tr><td>Active skills</td><td>5 × new rank (per rank climbed)</td></tr>
            <tr><td>Specialization</td><td>5</td></tr>
            <tr><td>Expertise</td><td>5</td></tr>
            <tr><td>Attributes</td><td>5 × new rank (per rank climbed)</td></tr>
            <tr><td>Knowledge skill</td><td>3</td></tr>
            <tr><td>Positive quality (purchase)</td><td>2 × normal cost</td></tr>
            <tr><td>Eliminate negative quality</td><td>2 × normal bonus</td></tr>
            <tr><td>New spell</td><td>5</td></tr>
            <tr><td>New complex form</td><td>5</td></tr>
            <tr><td>Initiation</td><td>10 + current Grade</td></tr>
            <tr><td>Submersion</td><td>10 + current Level</td></tr>
          </tbody>
        </table>
      </CollapsibleSection>

      <CollapsibleSection id="sr-advancement-notes" title="Notes">
        <Panel>
          <p>Skill and Attribute costs are cumulative per rank climbed — 4→6 means paying for rank 5 <em>and</em> rank 6, not one flat jump cost.</p>
          <p>Essence can never be raised with Karma — it only ever decreases, from 'ware.</p>
          <p>New spells and complex forms need real prerequisites beyond the Karma cost — a spell formula and lodge access, or base code and a host to work in.</p>
        </Panel>
        <Callout title="House Rule" variant="note">
          The book lists suggested training times as GM guidance/flavor alongside these costs. This app intentionally doesn't enforce them — spend the Karma, get the rank.
        </Callout>
      </CollapsibleSection>
    </>
  );
}
