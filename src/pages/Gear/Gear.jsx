import { Page, PageHeader } from '@components/PageComponents';
import { useCharacterManager } from '@hooks/useCharacterManager';
import Market from '@components/Market';

// Now just a thin shell — Market (components/Market) owns the actual
// tabs/search/content, extracted so it's usable anywhere (a full page
// here, or dropped into MarketModal for the "buy without leaving the
// attach flow" case) rather than being tied to this one page.
export default function Gear() {
  const { currentCharacter } = useCharacterManager();

  return (
    <Page>
      <PageHeader
        title="Gear"
        subtitle="Browse everything for sale — tap $ on an item to configure and buy"
      />
      <Market character={currentCharacter} />
    </Page>
  );
}
