import { useState } from 'react';

import { Page, PageHeader, Tabs } from '@components/PageComponents';

import ShadowrunnersCreation from './RunnersCreation';
import ShadowrunnersMetatypes from './RunnersMetatypes';
import ShadowrunnersSkills from './RunnersSkills';
import ShadowrunnersQualities from './RunnersQualities';
import ShadowrunnersMagic from './RunnersMagic';
import ShadowrunnersAdvancement from './RunnersAdvancement';
import ShadowrunnersContacts from './RunnersContacts';

const TABS = [
  { key: 'creation', label: 'Character Creation' },
  { key: 'metatypes', label: 'Metatypes' },
  { key: 'skills', label: 'Skills' },
  { key: 'qualities', label: 'Qualities' },
  { key: 'magic', label: 'Magic' },
  { key: 'advancement', label: 'Advancement' },
  { key: 'contacts', label: 'Contacts' },
];

export default function Shadowrunners() {
  const [activeTab, setActiveTab] = useState('creation');

  return (
    <Page>
      <PageHeader
        title="Shadowrunners"
        subtitle="How to build and grow a character — reference only, not the interactive builder"
      />

      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'creation' && <ShadowrunnersCreation />}
      {activeTab === 'metatypes' && <ShadowrunnersMetatypes />}
      {activeTab === 'skills' && <ShadowrunnersSkills />}
      {activeTab === 'qualities' && <ShadowrunnersQualities />}
      {activeTab === 'magic' && <ShadowrunnersMagic />}
      {activeTab === 'advancement' && <ShadowrunnersAdvancement />}
      {activeTab === 'contacts' && <ShadowrunnersContacts />}
    </Page>
  );
}
