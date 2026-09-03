import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';

import { formatCost } from '@utils/gearFormat';

// Card mode's row — compact, image-left/info-right, meant for
// scanning a scrolling list quickly. Deliberately NOT shared with
// Carousel anymore (see GearCatalogueFeature) — the two modes are
// doing genuinely different jobs (scan-a-list vs. focus-on-one), and
// forcing them through one component with conditional styling was the
// wrong call.
export default function GearCatalogueCard({ item, renderBuyButton }) {
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

      <div className="sr-catalogue-card-body">
        <div className="sr-catalogue-card-header">
          <span className="sr-catalogue-card-name">{item.label}</span>
          <span className="sr-catalogue-card-cost">{formatCost(item)}</span>
        </div>
        {item.description && <p className="sr-catalogue-card-description">{item.description}</p>}
      </div>

      <div className="sr-catalogue-card-buy">
        {renderBuyButton(item)}
      </div>
    </div>
  );
}
