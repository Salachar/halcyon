import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import GearStatsBlock from './GearStatsBlock';

// Carousel mode's single-item view — image on top (the focal point),
// then a nav+buy row (prev/next arrows, item count, and the buy
// button sharing one row), then the shared GearStatsBlock below.
// GearCarousel itself now only tracks index/paging state and passes
// nav callbacks/flags down — this component owns all the rendering,
// same division of responsibility as GearCardList/GearCatalogueCard.
export default function GearCatalogueFeature({
  item, statColumns, renderBuyButton, onPrev, onNext, canPrev, canNext, indexLabel,
}) {
  return (
    <div className="sr-catalogue-feature">
      <div className="sr-catalogue-feature-image">
        {item.image ? (
          <img src={item.image} alt={item.label} />
        ) : (
          <div className="sr-catalogue-feature-image-placeholder">
            <ImageNotSupportedOutlinedIcon fontSize="large" />
          </div>
        )}
      </div>

      <div className="sr-catalogue-feature-nav-row">
        <div className="sr-catalogue-feature-nav">
          <button className="sr-icon-btn" onClick={onPrev} disabled={!canPrev} aria-label="Previous">
            <ChevronLeftIcon />
          </button>
          <span className="sr-catalogue-feature-nav-index">{indexLabel}</span>
          <button className="sr-icon-btn" onClick={onNext} disabled={!canNext} aria-label="Next">
            <ChevronRightIcon />
          </button>
        </div>
        <div className="sr-catalogue-feature-buy">
          {renderBuyButton(item)}
        </div>
      </div>

      <GearStatsBlock item={item} statColumns={statColumns} />
    </div>
  );
}
