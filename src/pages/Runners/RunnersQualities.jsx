import { Section, Panel, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import QualityCard from '@components/QualityCard';
import { QUALITIES, POSITIVE_QUALITY_IDS, NEGATIVE_QUALITY_IDS } from '@data/character/qualities';

export default function ShadowrunnersQualities() {
  return (
    <>
      <Section>
        <Panel>
          <p>Positive and negative traits layered onto a character, shaping what they're naturally good at — and what costs them.</p>
        </Panel>
      </Section>

      <CollapsibleSection id="sr-qualities-creation" title="Creation Rules">
        <Panel>
          <p>Maximum 6 qualities total at creation.</p>
          <p>Net bonus Karma from qualities can't exceed 20.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="sr-qualities-post" title="Post-Creation Rules">
        <Panel>
          <p>Purchasing a positive quality after creation costs 2× its normal Karma cost.</p>
          <p>Buying off an existing negative quality costs 2× its bonus.</p>
          <p>You can't "purchase" new negative qualities post-creation to farm Karma.</p>
          <p>The GM can award qualities — positive or negative — through play at their discretion, at no fixed cost.</p>
        </Panel>
      </CollapsibleSection>

      <CollapsibleSection id="sr-qualities-positive" title="Positive Qualities">
        <Section>
          {POSITIVE_QUALITY_IDS.map((id) => (
            <QualityCard key={id} quality={QUALITIES[id]} />
          ))}
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="sr-qualities-negative" title="Negative Qualities">
        <Section>
          {NEGATIVE_QUALITY_IDS.map((id) => (
            <QualityCard key={id} quality={QUALITIES[id]} />
          ))}
        </Section>
      </CollapsibleSection>
    </>
  );
}
