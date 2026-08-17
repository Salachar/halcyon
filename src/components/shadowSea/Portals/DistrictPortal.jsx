import React from 'react';
import { Line, Spacer } from '@shadowsea/ShadowSeaComponents';

export default function DistrictPortal({
  districtName,
  districtId,
  tagline,
  region,
  corporatePresence,
  crimeThreat = '',
  securityResponse = '',
  warnings = [],
  atmosphere,
  children,
}) {
  const primary = 'rgb(79, 209, 197)';
  const primaryFaint = 'rgba(79, 209, 197, 0.15)';
  const primaryBorder = 'rgba(79, 209, 197, 0.35)';

  const threatColor = {
    LOW: 'rgb(34, 197, 94)',
    MEDIUM: 'rgb(251, 191, 36)',
    HIGH: 'rgb(251, 146, 60)',
    EXTREME: 'rgb(239, 68, 68)',
    CRITICAL: 'rgb(220, 38, 38)',
  }[crimeThreat] ?? 'rgb(251, 191, 36)';

  const threatFaint = threatColor.replace('rgb', 'rgba').replace(')', ', 0.1)');

  return (
    <div
      style={{
        border: `1.5px solid ${primaryBorder}`,
        borderRadius: 'var(--border-radius-lg)',
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* Header: name left, stats right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          // borderBottom: `1px solid ${primaryBorder}`,
        }}
      >
        {/* Left — name + tagline */}
        <div
          style={{
            padding: '1rem 1.25rem',
            // borderRight: `1px solid ${primaryBorder}`,
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'var(--color-text-tertiary)',
              letterSpacing: '0.15em',
              marginBottom: '0.4rem',
            }}
          >
            CY CITY DISTRICT ACCESS
          </div>
          <div
            style={{
              fontSize: 'clamp(1rem, 4vw, 1.5rem)',
              fontWeight: 500,
              color: primary,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            {districtName}
          </div>
          {districtId && (
            <div
              style={{
                fontSize: '11px',
                color: 'var(--color-text-tertiary)',
                marginBottom: '0.35rem',
              }}
            >
              {districtId}
            </div>
          )}
          {tagline && (
            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-secondary)',
                fontStyle: 'italic',
              }}
            >
              "{tagline}"
            </div>
          )}
        </div>

        {/* Right — 2x2 stat grid */}
        <div
          style={{
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px',
              width: '100%',
            }}
          >
            {region && (
              <div
                style={{
                  background: 'var(--color-background-primary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '0.4rem 0.6rem',
                }}
              >
                <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', letterSpacing: '0.1em' }}>REGION</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>{region}</div>
              </div>
            )}
            {corporatePresence && (
              <div
                style={{
                  background: 'var(--color-background-primary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '0.4rem 0.6rem',
                }}
              >
                <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', letterSpacing: '0.1em' }}>CORPS</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>{corporatePresence}</div>
              </div>
            )}
            {crimeThreat && (
              <div
                style={{
                  background: threatFaint,
                  border: `0.5px solid ${threatColor}`,
                  borderRadius: 'var(--border-radius-md)',
                  padding: '0.4rem 0.6rem',
                }}
              >
                <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', letterSpacing: '0.1em' }}>THREAT</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 500, color: threatColor }}>{crimeThreat}</div>
              </div>
            )}
            {securityResponse && (
              <div
                style={{
                  background: 'var(--color-background-primary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '0.4rem 0.6rem',
                }}
              >
                <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', letterSpacing: '0.1em' }}>SECURITY</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 500, color: primary }}>{securityResponse}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Atmosphere */}
      {atmosphere && (
        <div style={{ padding: '0.85rem 1.25rem', borderBottom: `0.5px solid var(--color-border-tertiary)` }}>
          <div
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-secondary)',
              fontStyle: 'italic',
              lineHeight: 1.6,
              borderLeft: `2px solid ${primaryBorder}`,
              paddingLeft: '0.75rem',
            }}
          >
            {atmosphere}
          </div>
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: `0.5px solid var(--color-border-tertiary)` }}>
          <div
            style={{
              fontSize: '10px',
              color: 'var(--color-text-tertiary)',
              letterSpacing: '0.1em',
              marginBottom: '0.4rem',
            }}
          >
            ACTIVE WARNINGS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {warnings.map((w, i) => (
              <span
                key={i}
                style={{
                  fontSize: '11px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  color: 'rgb(220, 38, 38)',
                  border: '0.5px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '2px 8px',
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Children */}
      {children && (
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: `0.5px solid var(--color-border-tertiary)` }}>
          {children}
        </div>
      )}
    </div>
  );
}
