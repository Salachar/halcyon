import { Section, Panel } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';

export default function ShadowrunnersContacts() {
  return (
    <>
      <Section>
        <Panel>
          <p>The people a runner can call on for gear, info, or support — controlled by the GM, and living their own lives between jobs rather than sitting around waiting for a call.</p>
        </Panel>
      </Section>

      <CollapsibleSection id="sr-contacts-ratings" title="The Two Ratings">
        <Panel>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Connection (1–12)</strong> — how much they know, and the reach of their network. New-in-town sits around 1, a gang leader around 4, a mayor or politician 6–7, a corp exec 9, a celebrity 11–12.</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Loyalty (1–12)</strong> — how willing they are to share, or risk something, for you specifically.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="sr-contacts-creation" title="Creation Rules">
        <Panel>
          <p>Charisma × 6 points to split across Connection and Loyalty for your starting contacts.</p>
          <p>Neither rating can exceed your Charisma.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="sr-contacts-using" title="Using a Contact (GM-facing math)">
        <Panel>
          <p>The GM rolls Connection + Connection to determine what the contact actually knows, checked against a Legwork Results table running from nothing at all up through deeply guarded secrets — each level includes everything below it.</p>
          <p>The player rolls Influence + Charisma, with the contact's Loyalty applied as a dice pool modifier. Hits determine how many of those knowledge levels get shared for free; levels beyond that cost roughly 100¥ per level, climbing higher at the top end.</p>
          <p>A contact can only share what they actually know — a great roll doesn't invent knowledge they don't have.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="sr-contacts-gaining" title="Gaining Contacts in Play">
        <Panel>
          <p>Earned through meaningful action — successful and honest runs, preventing serious harm, demonstrating real business potential — not just introducing yourself, and not just a bribe.</p>
          <p>Higher Connection ratings require proportionally more significant actions to earn.</p>
          <p>Loyalty builds through ongoing play — the contact reaching out for favors, or being put in a tough spot the characters help resolve.</p>
        </Panel>
      </CollapsibleSection>
    </>
  );
}
