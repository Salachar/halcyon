import GearCatalogueCard from './GearCatalogueCard';

// Full-width, no columns — one banner-style card per item, stacked
// vertically. Everything visible at once, just scrolled rather than
// paged, unlike Carousel mode.
export default function GearCardList({ items, renderBuyButton }) {
  if (items.length === 0) {
    return <p className="sr-veh-hint">Nothing to show here.</p>;
  }

  return (
    <div className="sr-card-list">
      {items.map((item) => (
        <GearCatalogueCard key={item.id} item={item} renderBuyButton={renderBuyButton} />
      ))}
    </div>
  );
}
