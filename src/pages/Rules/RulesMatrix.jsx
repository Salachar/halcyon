import { Section, Panel, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';

export default function RulesMatrix() {
  return (
    <>
      <Section>
        <Panel>
          <p>
            The Matrix <em>is</em> the internet in this setting — not a separate, walled-off system, just what "online" is called in 2080. One shared, unified global grid, rebuilt and regulated post-Crash by GOD.
          </p>
        </Panel>
      </Section>

      <CollapsibleSection id="rules-matrix-ar-vr" title="AR vs. VR">
        <Panel>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>AR (Augmented Reality)</strong> — the default mode for most people, most of the time. Info overlays the real world through glasses, contacts, or a datajack; you're still physically present and aware.</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>VR (Virtual Reality)</strong> — full sensory immersion via a direct neural interface. Real-world perception vanishes entirely, and your body goes essentially inert and vulnerable while you're in. Real risk of biofeedback damage, and dumpshock if you're forced out.</p>
          <p>Both modes touch the exact same underlying network and hosts simultaneously — an AR user and a VR user can be in the same "meeting" at different depths of immersion.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-matrix-space-hosts" title="Shared Space vs. Hosts">
        <Panel>
          <p>The "Matrix at large" is one open, formless field of icons everyone shares — no meaningful distance cost (see Noise below), reach anything just by willing yourself there.</p>
          <p>A Host is a separate, bounded pocket — crossing into one takes an explicit Enter/Exit Host action, not a walk across open space.</p>
          <p>Icon appearance is fully custom and sculpted — a building, a person, an island — purely aesthetic, no mechanical cost either way.</p>
          <p>Hosts can be geographically anchored to physical hardware, or fully freestanding and virtual with no physical location at all — both are explicitly valid.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-matrix-noise" title="Noise / Distance">
        <table className="sr-table">
          <thead><tr><th>Range</th><th>Penalty</th></tr></thead>
          <tbody>
            <tr><td>Directly connected — 100m</td><td>0</td></tr>
            <tr><td>100m – 1km</td><td>+1</td></tr>
            <tr><td>1 – 10km</td><td>+3</td></tr>
            <tr><td>10 – 100km</td><td>+5</td></tr>
            <tr><td>Beyond 100km</td><td>+8</td></tr>
          </tbody>
        </table>
        <Panel>
          <p>Distance is essentially a non-factor for the vast majority of play — a hacker never needs to be physically near a target. Faraday cages block signal outright, the one hard "must be physically present" wall, and some old or paranoid systems are wired-only, requiring a physical data tap.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-matrix-access" title="Access Tiers">
        <Panel>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Outsider</strong> — default, look-around only.</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>User</strong> — read files, use basic functions, via legit credentials or a successful hack.</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Admin</strong> — full reconfiguration.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-matrix-discovery" title="Discovery vs. Access">
        <Panel>
          <p>These are two separate locks. A host with no public-facing side is invisible to normal browsing — no icon, nothing to stumble across. Belief or rumor that something exists has zero mechanical weight; a concrete lead — legwork, an audit, a data tap, an informant — is what lets a Matrix Perception or Search test actually locate the icon.</p>
          <p>Finding it only gets you to Outsider at the door. Access tiers are a fully separate hurdle from discovery.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-matrix-ic" title="IC & IC Types">
        <Panel>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Patrol IC</strong> — basic detection and alerting.</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Killer IC</strong> — damage-dealing.</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Black IC</strong> — damage and biofeedback simultaneously.</p>
          <p><strong style={{ color: 'var(--sr-blue-bright)' }}>Sparky IC</strong> — biofeedback that bypasses the device entirely.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-matrix-overwatch" title="Overwatch Score">
        <Panel>
          <p>Every illegal Matrix action nudges GOD's tracking of you upward. Hit the threshold, and you're physically traced and raided.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="rules-matrix-consequences" title="Consequences of Things Going Wrong">
        <Panel>
          <p><strong style={{ color: 'var(--sr-orange-bright)' }}>Link-locking</strong> — another persona can lock your connection; escaping takes a Jack Out action (an opposed test), and usually still causes dumpshock.</p>
          <p><strong style={{ color: 'var(--sr-orange-bright)' }}>Dumpshock</strong> — forced disconnection, a real physical and mental jolt.</p>
          <p><strong style={{ color: 'var(--sr-orange-bright)' }}>Hot sim</strong> — running with no safety limiter. Faster, more capable, and genuinely lethal risk from biofeedback.</p>
        </Panel>
      </CollapsibleSection>

      <Callout title="Reference Only" variant="note">
        This tab explains how the Matrix works. Actually running a hack — pulling your persona's stats, rolling Matrix actions, tracking marks and Overwatch — happens on the Matrix tab, once it's built.
      </Callout>
    </>
  );
}
