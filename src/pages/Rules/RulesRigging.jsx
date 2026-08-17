import { Section, Panel } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';

export default function RulesRigging() {
  return (
    <>
      <Section>
        <Panel>
          <p>Where a decker works remotely through a host, a rigger merges consciousness directly with a device — a drone, a vehicle, even a building.</p>
        </Panel>
      </Section>

      <CollapsibleSection id="rules-rigging-modes" title="Three Control Modes">
        <Panel>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Remote control</strong> — command from a distance, no immersion.</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Jumped in</strong> — full sensory merge via a Vehicle Control Rig implant, or a technomancer's Machine Mind Echo.</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Drive normally</strong> — no rigger tech at all, ordinary operation.</p>
          <p>Only one controller at a time, regardless of mode.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-rigging-jumped-in" title="Jumped-In Attribute Substitution">
        <table className="sr-table">
          <thead><tr><th>Regular</th><th>Jumped-In</th></tr></thead>
          <tbody>
            <tr><td>Body</td><td>Willpower</td></tr>
            <tr><td>Strength</td><td>Charisma</td></tr>
            <tr><td>Agility</td><td>Logic</td></tr>
            <tr><td>Reaction</td><td>Intuition</td></tr>
          </tbody>
        </table>
        <Panel>
          <p>If you're physically present in a vehicle that crashes, you still resist that damage with your real Body — the substitution only applies to the vehicle's own tests while you're jumped in.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-rigging-ratings" title="Key Ratings">
        <Panel>
          <p>Attack Rating = driver's Piloting + Sensor.</p>
          <p>Defense Rating = driver's Piloting + Armor.</p>
          <p>Vehicles are immune to Stun damage at or below their Body rating, except from electricity.</p>
          <p>Condition Monitor = (Body ÷ 2) + 8, a single pool. Handling worsens by 1 for every 3 damage boxes taken, and the vehicle breaks down entirely when the pool fills.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-rigging-rcc" title="Rigger Command Console (RCC)">
        <Panel>
          <p>An RCC controls (Rating × 3) slaved drones at once — one command reaches any number of them as a single Minor Action.</p>
          <p>Hacking a slaved drone requires breaching the RCC first; the drone itself isn't the easier target.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-rigging-drones" title="Drones">
        <Panel>
          <p>Most drone use is remote command as a Minor Action — the drone then acts on its own using its Pilot rating and loaded autosofts.</p>
          <p>Autonomous Initiative = Pilot × 2 + 3D6. A jumped-in rigger uses their own VR Initiative instead.</p>
          <p>Weapon mounts scale off Body ÷ 3, rounded down.</p>
          <p>Firing without the matching [Weapon] Targeting autosoft costs a full point of Sensor.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-rigging-forced-out" title="Getting Forced Out">
        <Panel>
          <p>Causes: a PAN reboot, a bricked control device, the vehicle being destroyed, or a physically-pulled jack cable (which also causes dumpshock).</p>
          <p>An ejected rigger loses control — the vehicle continues on its last course, or switches to autopilot, until it's stopped or someone retakes it.</p>
        </Panel>
      </CollapsibleSection>
    </>
  );
}
