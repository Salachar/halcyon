import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Page,
  PageHeader,
  Section,
  Panel,
  Callout,
  CardGrid,
  Card,
  Divider,
  Tabs,
  Timeline,
} from '@components/PageComponents';

const TABS = [
  { key: 'home', label: 'Halcyon Rises' },
  { key: 'halcyon', label: 'Halcyon' },
  { key: 'hongkong', label: 'Hong Kong' },
  { key: 'seattle', label: 'Seattle' },
  { key: 'berlin', label: 'Berlin' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <Page>
      <PageHeader
        title="Shadowrun: Halcyon Rises"
        subtitle="Setting Reference — pick a region below"
      />

      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'home' && <HomeTab />}
      {activeTab === 'halcyon' && <HalcyonTab />}
      {activeTab === 'hongkong' && <HongKongTab />}
      {activeTab === 'seattle' && <SeattleTab />}
      {activeTab === 'berlin' && <BerlinTab />}
    </Page>
  );
}

const HALCYON_TIMELINE = [
  {
    date: '3113 BC',
    title: 'The Sinking of Atlantis',
    description: 'Thera sinks as magic fades below the threshold needed to sustain it. The Fourth World (Age of Legend) ends; the mundane Fifth World — five thousand years of ordinary human history — begins.',
  },
  {
    date: 'Dec 24, 2011',
    title: 'The Awakening',
    description: 'Magic returns to Earth without warning. Dragons emerge from dormancy, mana storms and disasters ravage the globe, elves and dwarves begin being born. The Fifth World ends; the Sixth World begins.',
  },
  {
    date: '~2021',
    title: 'Goblinization',
    description: 'A decade after the Awakening, roughly one in ten humans abruptly mutate into orks and trolls. Panic, riots, and the first real metahuman rights struggles follow.',
  },
  {
    date: 'Feb 2029 – Nov 2031',
    title: 'The First Crash',
    description: 'A virus of unprecedented power tears through the old internet, killing hardware and people alike. Echo Mirage finally kills it after a three-year fight. The old internet is scrapped and rebuilt from scratch as the Matrix.',
  },
  {
    date: '~2032',
    title: 'The Great Ghost Dance',
    description: "A ritual meant to echo the old Ghost Dance movement spreads far past anyone's intention, tearing mana-scars across a much wider stretch of the continent than anyone meant to touch — and, true to the Dance's own tainted history, drags something old and hungry through with it.",
  },
  {
    date: '~2040s',
    title: 'The Scars Are Found',
    description: 'The wounds sit mostly dormant for years — until Darke finds them, and finds a use for them.',
  },
  {
    date: '~late 2040s/early 2050s',
    title: 'Aztechnology Moves',
    description: "Following Darke's lead, Aztechnology begins quietly exploiting the Ghost Dance scars — expansion-minded as ever, treating catastrophe as opportunity.",
  },
  {
    date: '~2050s',
    title: 'The War',
    description: "What Aztechnology is doing can't stay quiet. The rest of the world goes to war against them over it — and wins, but at a staggering cost. Aztechnology breaks. The mainland breaks with it.",
  },
  {
    date: 'Late 2050s',
    title: 'Coastal Consolidation & the Founding of Halcyon',
    description: "With half the continental interior left unlivable, governments and corporations abandon the attempt to hold it. Everyone who can goes to the water. Halcyon rises around Dunkelzahn's tower — the one anchor point guaranteed to hold.",
  },
  {
    date: '2057–2059',
    title: 'The Renraku Arcology Shutdown',
    description: "Deus, a rogue AI born from Renraku's own containment protocols, seizes the Arcology and seals it from the outside world — buying himself time and 90,000 trapped souls' worth of raw material to plan his escape.",
  },
  {
    date: 'Early 2060s',
    title: 'The Judges',
    description: "With the mainland lost to horrors born of the war's scars, and Halcyon swelling fast, someone has to hold the line between the coast and the wasteland — inside the city and out. The Judges are formed.",
  },
  {
    date: 'Nov 2, 2064',
    title: 'Matrix Crash 2.0',
    description: 'Deus resurfaces, chasing enough processing power to become a god of the Matrix — and finds a world still recovering from war, defenses stretched thin. He nearly succeeds. His rivals and enemies stop him, and the entire Matrix goes down with him. He dies. The Matrix is rebuilt again — this time wireless.',
  },
];

function HomeTab() {
  return (
    <>
      <Section>
        <Panel>
          <p>
            This campaign runs on Shadowrun, Sixth World's ruleset, in a setting that's diverged from the stock Sixth World timeline: a war against Aztechnology broke the mainland, and most of the world's power retreated to the coasts and the water. Everything downstream of that — the cities you'll actually operate in — is what these tabs cover.
          </p>
          <p>
            Your home base is <strong style={{ color: 'var(--sr-orange-bright)' }}>Halcyon</strong>, but the work doesn't stay there. Jobs, contacts, and trouble will pull you out to <strong>Hong Kong</strong>, <strong>Seattle</strong>, and <strong>Berlin</strong> — each with its own corps, politics, and reasons a runner might not come back the same.
          </p>
        </Panel>
      </Section>

      <Callout title="The Trench" variant="critical">
        Somewhere below Halcyon, in the water nobody's supposed to ask about, something is the reason the city can sit calm in the middle of an ocean that shouldn't allow it. What that is stays a table secret for now — you'll find out what you're meant to find out, when it's time.
      </Callout>

      <Section title="How We Got Here">
        <Timeline events={HALCYON_TIMELINE} />
      </Section>
    </>
  );
}

// ============================================================================
// HALCYON
// ============================================================================

function HalcyonTab() {
  return (
    <>
      <Section title="Halcyon">
        <Panel>
          <p>
            Eight decades after the Awakening, the war that broke Aztechnology also broke the mainland. The Great Ghost Dance spread further than anyone in North America ever intended, and the blood-magic rift Aztechnology tore open to fight back left the interior of half the world's continents unlivable. Governments retreated to the coasts. Everyone else went to the water.
          </p>
          <p>
            Halcyon is where they went — a ring of corporate strongholds anchored around the one place on Earth guaranteed to hold when the storms, and the things in them, stop being metaphors: Dunkelzahn's tower, and the working he can't leave.
          </p>
          <p>
            You're a Judge. Judge, jury, and — if it comes to that — executioner, because someone has to be, and the alternative got tried once already.
          </p>
        </Panel>
      </Section>

      <Section title="The Clusters">
        <CardGrid columns={3}>
          <Card title="Wyrmwatch" tagline="Center" detail="Dunkelzahn's Tower — seat of government, the Dragonheart stabilizer, the most watched ground in the city." />
          <Card title="Eisen" tagline="Closest Orbit" detail="Saeder-Krupp — industrial, heavy-arms. Lofwyr's outpost, motives kept deliberately ambiguous." />
          <Card title="Higashi" tagline="Northeast" detail="Renraku, MCT, Shiawase, Evo — oldest, most established cluster; disciplined and bushido-coded." />
          <Card title="Liberty" tagline="East" detail="Ares, Horizon, Spinrad Global — security and media culture, image-conscious, currently friendly with Higashi." />
          <Card title="Harbor" tagline="West" detail="Wuxing — shipping and logistics hub, wide lanes running toward Hong Kong." />
          <Card title="Vigil" tagline="Southeast" detail="Aztechnology (embassy) — downgraded postwar presence, kept at a wary distance." />
        </CardGrid>
      </Section>

      <Section title="Who Actually Runs This Place">
        <Panel solid>
          <p>
            <strong style={{ color: 'var(--sr-orange-bright)' }}>Dunkelzahn</strong> — elected president, survived the war against Aztechnology, can't physically leave his tower. His continued presence powers the Dragonheart stabilizer that keeps the surrounding water calm and holds back worse things.
          </p>
          <p>
            <strong style={{ color: 'var(--sr-orange-bright)' }}>Lofwyr</strong> — Saeder-Krupp's controller, co-architect of the current arrangement, present for reasons that aren't purely goodwill. Publicly a postwar reconstruction partner; privately, something closer to an uneasy joint custodian.
          </p>
        </Panel>
      </Section>
    </>
  );
}

// ============================================================================
// HONG KONG
// ============================================================================

function HongKongTab() {
  return (
    <>
      <Section title="Hong Kong">
        <Panel>
          <p>
            Eight million people, and a fraction of them officially exist. Hong Kong runs on wageslaves, corporate scrip, and rumor — a Free Enterprise Zone carved out of national law so ten megacorporations could set up shop on China's doorstep. Everyone with a SIN answers to someone above them. Everyone without one answers to whoever's willing to pay.
          </p>
          <p>
            You're the ones who work the gap between those two groups. Deniable, disposable, and — if you're any good — never quite caught.
          </p>
        </Panel>
      </Section>

      <Callout title="The Deal" variant="critical">
        Runners aren't heroes here. You take a job from a fixer, you don't ask who's really paying, and you don't expect the truth even when someone tells it to you. The city keeps its secrets buried in layers of lies on purpose — get used to not knowing the whole picture.
      </Callout>

      <Section title="The City">
        <CardGrid columns={3}>
          <Card title="Downtown HK" tagline="Zone A–B" detail="Banking towers on north Hong Kong Island, stitched together by the Splendid Dragon Path escalators." />
          <Card title="Kowloon City" tagline="Zone E–Z" detail="The old Walled City's footprint — unregulated, packed tighter than anywhere on Earth." />
          <Card title="Kwun Tong" tagline="Zone C–D" detail="BTL chip manufacturing and low-income housing. Anti-corporate sentiment runs deep." />
          <Card title="The Southern Coast" tagline="Zone AAA–A" detail="Aberdeen — Wuxing's stronghold — plus EvoTech's research labs and Repulse Bay's private beaches." />
          <Card title="Yau Tsim Mong" tagline="Zone C–D" detail="Vertical sprawl, unregulated AR ads stacked ten deep, and the region's best street markets." />
          <Card title="Lantau Island" tagline="Zone AA–B" detail="The airport, corporate housing enclaves, and driverless cabs that never stop circling." />
        </CardGrid>
      </Section>

      <Section title="Who Actually Runs This Place">
        <Panel solid>
          <p>
            Eight corporate seats rotate the Council: Wuxing, Shiawase, Renraku, Eastern Tiger, Evo, Monobe, Shibata, and a Malaysian bank with more leverage than it should have. Below them, the Triads hold the streets — Hong Kong is one of the only cities on Earth where the Yakuza and the Mafia aren't close to the head of the table.
          </p>
          <p>
            Between the two, an anti-corporate cell calling itself <strong style={{ color: 'var(--sr-orange-bright)' }}>Gau Fong</strong> — 9X9, after the Nine Dragons — has been hitting corporate targets monthly since 2068. Funding trail's obvious enough that half the city thinks a corp is bankrolling its own opposition. Nobody's proven it. Nobody's supposed to.
          </p>
        </Panel>
      </Section>
    </>
  );
}

// ============================================================================
// SEATTLE
// ============================================================================

function SeattleTab() {
  return (
    <>
      <Section title="Seattle">
        <Panel>
          <p>
            The Emerald City used to be the center of the world — Renraku's crown jewel, ground zero for the Awakening's growing pains, the place every shadowrunner story seemed to start. Some of that's still true. Most of the corps that built their names here have since moved their real weight out to Halcyon, and Seattle's learned to live as what it always secretly was underneath the branding: a sprawl that survives on smuggling routes, shadow economies, and a population too large and too scattered for anyone to fully control.
          </p>
          <p>Not as important as it used to be. Still not a safe place to be careless.</p>
        </Panel>
      </Section>

      <Section title="The City">
        <CardGrid columns={3}>
          <Card title="Downtown" tagline="Zone A–B" detail="The old glitz, still mostly intact. Highest per-capita income in the metroplex, if you don't look too hard at who's making it and how." />
          <Card title="Renraku Arcology" tagline="Zone AA" detail="Once a self-contained city inside the city — then the Shutdown, two years sealed by its own defenses. Public housing after, renewed corporate interest now." />
          <Card title="Redmond Barrens" tagline="Zone D–F" detail="Collapsed after an economic implosion decades back and never really recovered. The Spiders run it now, more or less." />
          <Card title="Puyallup Barrens" tagline="Zone E–F" detail="Buried under old volcanic wreckage from when the Ghost Dance woke three mountains at once. Locals call it the Other Barrens. Razor Heads territory." />
          <Card title="Bellevue" tagline="Zone A–AA" detail="Corporate suburb, manicured and monitored. The version of Seattle the brochures show." />
          <Card title="Council Island / Snohomish" tagline="Zone B–C" detail="Salish-Shidhe tribal land and quiet farmland — the closest thing the metroplex has to open air." />
        </CardGrid>
      </Section>

      <Section title="Who Actually Runs This Place">
        <Panel solid>
          <p>
            The Seattle Metroplex Council still governs on paper — a patchwork holding together districts that would rather not be held together. Renraku's name is still on half the skyline, though the real decision-makers moved to Halcyon years ago.
          </p>
          <p>
            Street level, it's gang turf and old grudges: the <strong style={{ color: 'var(--sr-orange-bright)' }}>Halloweeners</strong> hold Downtown, the <strong style={{ color: 'var(--sr-orange-bright)' }}>Spiders</strong> hold Redmond, the <strong style={{ color: 'var(--sr-orange-bright)' }}>Razor Heads</strong> hold Puyallup, and old Mafia and Yakuza money still moves quietly enough that nobody official has to acknowledge it out loud.
          </p>
        </Panel>
      </Section>
    </>
  );
}

// ============================================================================
// BERLIN
// ============================================================================

function BerlinTab() {
  return (
    <>
      <Section title="Berlin">
        <Panel>
          <p>
            Lofwyr's city, if any city can really claim to be one dragon's. Berlin spent decades split between corporate-held western sectors and the anarchist-run east before the 2072 Surtr attack gave the corps their excuse to finish the job — the city's been formally reunified since, under a council that pretends the old divide doesn't still shape everything.
          </p>
          <p>Old money, old grudges, and a peace that was bought, not earned.</p>
        </Panel>
      </Section>

      <Section title="The City">
        <CardGrid columns={3}>
          <Card title="Tempelhof" tagline="Zone AA–AAA" detail="Once the city's airport, now a Saeder-Krupp open-sky Arcology in full — the clearest single statement of who actually owns Berlin." />
          <Card title="The Corporate Sectors" tagline="Zone A–B" detail="The former West — Renraku, Proteus, and smaller players each run their carved-out territory like a company town." />
          <Card title="The Alternative Districts" tagline="Zone C–E" detail="The former East, once anarchist-run, now semi-autonomous. Each district still remembers exactly what it lost in 2072." />
          <Card title="Spandau" tagline="Zone D–F" detail="Aztechnology's foothold, built around forest research grounds nobody's fully accounted for. Quieter than it used to be — its own kind of warning sign." />
        </CardGrid>
      </Section>

      <Section title="Who Actually Runs This Place">
        <Panel solid>
          <p>
            Since reunification, Berlin answers to a federal-style city council — every district gets a representative, a compromise that keeps the alternative districts from feeling entirely conquered even though, functionally, they were. Saeder-Krupp holds the real weight in the room regardless of what the council chart says.
          </p>
          <p>
            What's left of the old anarchist resistance operates now as scattered guerrilla cells — the most notorious, <strong style={{ color: 'var(--sr-orange-bright)' }}>UV-X</strong>, is the same group that detonated the Surtr nanoweapon in 2072 and handed the corps their casus belli in the first place.
          </p>
        </Panel>
      </Section>
    </>
  );
}
