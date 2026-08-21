import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

import './modal.css';

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  message,
  children,
  maxWidth,
  className = '',
  bodyClassName = '',
}) {
  if (!open) return null;

  const hasHeader = Boolean(title || subtitle || onClose);

  return (
    <div className="mdl-overlay" onClick={onClose}>
      <div
        className={`mdl-modal ${className}`.trim()}
        style={maxWidth ? { maxWidth } : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {hasHeader && (
          <div className="mdl-header">
            <div className="mdl-header-text">
              {title && <div className="mdl-title">{title}</div>}
              {subtitle && <div className="mdl-subtitle">{subtitle}</div>}
            </div>
            {onClose && (
              <button className="mdl-close-btn" onClick={onClose}>
                <CloseIcon style={{ fontSize: 18 }} />
              </button>
            )}
          </div>
        )}

        {(message || children) && (
          <div className={`mdl-body ${bodyClassName}`.trim()}>
            {message && <div className="mdl-message">{message}</div>}
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
