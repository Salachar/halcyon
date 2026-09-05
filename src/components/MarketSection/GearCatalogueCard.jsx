import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';

import GearStatsBlock from './GearStatsBlock';

// Card mode's row — compact, image-left/stats-middle/buy-right, meant
// for scanning a scrolling list quickly. The identity/description/
// stats content is delegated to GearStatsBlock (shared with Carousel
// mode); only the outer image+layout shape is specific to this
// component.
export default function GearCatalogueCard({ item, statColumns, renderBuyButton }) {
  return (
    <div className="sr-catalogue-card">
      <div className="sr-catalogue-card-image">
        {item.image ? (
          <img src={item.image} alt={item.label} />
        ) : (
          <div className="sr-catalogue-card-image-placeholder">
            <ImageNotSupportedOutlinedIcon fontSize="large" />
          </div>
        )}
      </div>

      <GearStatsBlock item={item} statColumns={statColumns} />

      <div className="sr-catalogue-card-buy">
        {renderBuyButton(item)}
      </div>
    </div>
  );
}
