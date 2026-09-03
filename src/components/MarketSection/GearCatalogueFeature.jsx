import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';

import { formatCost } from '@utils/gearFormat';

// Carousel mode's single-item view — image is the main focus, full
// card width, rectangular (16:9, matching the actual aspect ratio of
// the source images being added), with everything else reading below
// it. A genuinely different job than Card mode's compact row: this is
// "browse one thing at a time like a real catalogue page," not "scan a
// list quickly" — hence its own component rather than a shared one
// with conditional styling.
export default function GearCatalogueFeature({ item, renderBuyButton }) {
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

      <div className="sr-catalogue-feature-body">
        <div className="sr-catalogue-feature-header">
          <span className="sr-catalogue-feature-name">{item.label}</span>
          <span className="sr-catalogue-feature-cost">{formatCost(item)}</span>
        </div>
        {item.description && <p className="sr-catalogue-feature-description">{item.description}</p>}
      </div>

      <div className="sr-catalogue-feature-buy">
        {renderBuyButton(item)}
      </div>
    </div>
  );
}
