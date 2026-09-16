import { Section } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import SkillRow from '@components/SkillRow';
import { SkillRows } from '@components/SkillRow/SkillRow.styles';
import KnowledgeLanguageSkills from '@components/KnowledgeLanguageSkills';
import StatusBadge from '@components/StatusBadge';
import { SKILL_IDS } from '@data/character/skills';
import { getIncompleteSections, isSectionComplete } from '@utils/creationProgress';

// Skills tab — active skills and Knowledge/Language skills. Qualities
// moved to the new Basics tab (CharacterBasics.jsx) — it landed here
// only as a pragmatic placeholder before Basics existed.
export default function CharacterSkills({ character }) {
  const showBadges = getIncompleteSections(character).length > 0;
  const skillsDone = isSectionComplete(character, 'skills');

  return (
    <>
      <CollapsibleSection
        id="sheet-skills"
        title="Skills"
        defaultOpen
        headerExtra={showBadges ? <StatusBadge complete={skillsDone} /> : null}
      >
        <Section>
          <SkillRows>
            {SKILL_IDS.map((skillId) => (
              <SkillRow key={skillId} character={character} skillId={skillId} />
            ))}
          </SkillRows>
        </Section>
      </CollapsibleSection>

      <CollapsibleSection id="sheet-knowledge-language" title="Knowledge & Language Skills" defaultOpen>
        <Section>
          <KnowledgeLanguageSkills character={character} />
        </Section>
      </CollapsibleSection>
    </>
  );
}
