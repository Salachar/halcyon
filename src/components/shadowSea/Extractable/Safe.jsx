import React from 'react';

import { Line } from '@shadowsea/ShadowSeaComponents';
import Extractable from '../Extractable/Extractable';

export default function Safe({
  id,
  title = "",
  model = "DS-200",
  location,
  owner,
  security,
  lastAccess,
  items = [],
  physical = [],
  digital = [],
  notes,
  stealing = true,
}) {
  let safeItems = [];
  if (physical && physical.length) {
    safeItems = physical;
  } else if (items && items.length) {
    safeItems = items;
  }

  const getSecurityColor = () => {
    const secLower = security?.toLowerCase() || '';
    if (secLower.includes('retinal') || secLower.includes('biometric')) {
      return 'rgb(239, 68, 68)';
    }
    if (secLower.includes('keypad') || secLower.includes('pin')) {
      return 'rgb(251, 191, 36)';
    }
    return 'rgb(79, 209, 197)';
  };

  const securityColor = getSecurityColor();

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          border: '2px solid rgb(100, 116, 139)',
          borderRadius: '4px',
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: 'rgb(51, 65, 85)',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid rgb(100, 116, 139)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          {/* CSS Lock Icon */}
          <div style={{ position: 'relative', width: '18px', height: '18px', flexShrink: 0 }}>
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '3px',
                width: '12px',
                height: '10px',
                backgroundColor: 'rgb(148, 163, 184)',
                borderRadius: '2px',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '5px',
                width: '8px',
                height: '11px',
                border: '2px solid rgb(148, 163, 184)',
                borderBottom: 'none',
                borderRadius: '4px 4px 0 0',
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
              DIGITAL SAFE
            </Line>
            <Line smoke large bold span style={{ margin: 0 }}>
              [MODEL {model}]
            </Line>
            {title && (
              <Line smoke large bold span style={{ margin: 0 }}>
                {" - "}{title}
              </Line>
            )}
          </div>
        </div>

        <div style={{ padding: '1rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '0.5rem 1rem',
              marginBottom: (safeItems.length > 0 || digital.length > 0) ? '1rem' : '0',
            }}
          >
            {location && (
              <>
                <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
                  LOCATION:
                </Line>
                <Line cyan style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500 }}>
                  {location}
                </Line>
              </>
            )}

            {owner && (
              <>
                <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
                  OWNER:
                </Line>
                <Line cyan style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500 }}>
                  {owner}
                </Line>
              </>
            )}

            {security && (
              <>
                <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
                  SECURITY:
                </Line>
                <Line style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500, color: securityColor }}>
                  {security}
                </Line>
              </>
            )}

            {lastAccess && (
              <>
                <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
                  LAST ACCESS:
                </Line>
                <Line yellow style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500 }}>
                  {lastAccess}
                </Line>
              </>
            )}
          </div>

          {/* Extractable contents */}
          {(safeItems.length > 0 || safeItems.length > 0) && (
            <Extractable
              id={`${id}-safe-extractable`}
              physicalItems={safeItems}
              digitalItems={digital}
            />
          )}

          {/* Notes */}
          {notes && (
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '3px',
              }}
            >
              <Line yellow style={{ margin: 0, fontSize: '0.875rem' }}>
                {notes}
              </Line>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
