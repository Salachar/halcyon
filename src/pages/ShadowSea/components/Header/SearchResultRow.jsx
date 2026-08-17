import React from 'react';
import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import Icons from '@utils/icons';
import { getDefaultFavicon } from '@utils/favicon';

import './searchResultRow.css';

function Favicon({ favicon, displayName }) {
  if (favicon) return favicon;
  const resolved = getDefaultFavicon(displayName);
  if (resolved) return resolved;
  return <Icons.Hub />;
}

export default function SearchResultRow({
  entry,
  isBookmarked = false,
  onNavigate,
  onToggleBookmark,
}) {
  const { id, path, hasBlocker, isBypassed, preview, favicon } = entry;

  const breadcrumb = (() => {
    const parts = path.split('/');
    const parents = parts.slice(0, -1);
    if (parents.length === 0) return null;
    return parents.map((part, i, arr) => {
      const isRecent = i >= arr.length - 2;
      if (isRecent) return part;
      return part.split(/\s+/).map(word => word[0]?.toUpperCase() ?? '').join('');
    });
  })();

  const stopProp = (fn) => (e) => { e.stopPropagation(); fn?.(); };

  return (
    <div className="srr-root" onClick={() => onNavigate?.(path)}>
      <div className="srr-strip">
        <Favicon favicon={favicon} displayName={id} />

        {(hasBlocker && !isBypassed) && (
          <LockIcon style={{ fontSize: 14, color: 'rgb(251, 191, 36)' }} />
        )}

        <span className="srr-name">{id}</span>

        <button
          onClick={stopProp(onToggleBookmark)}
          className="srr-star-btn"
          title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {isBookmarked
            ? <StarIcon style={{ fontSize: 14, color: 'rgb(250, 204, 21)' }} />
            : <StarBorderIcon style={{ fontSize: 14 }} />}
        </button>
      </div>

      {breadcrumb && (
        <div className="srr-breadcrumb">
          {breadcrumb.map((part, i, arr) => (
            <span key={i}>
              {i > 0 && <span className="srr-breadcrumb-sep"> → </span>}
              <span className={i >= arr.length - 2 ? 'srr-breadcrumb-near' : 'srr-breadcrumb-far'}>
                {part}
              </span>
            </span>
          ))}
        </div>
      )}

      {preview && (
        <div className="srr-preview">
          {preview}
        </div>
      )}
    </div>
  );
}
