import { useState, useEffect } from 'react';
import { Line, Divider, DataTable } from '@shadowsea/ShadowSeaComponents';

export default function FacilityPortal({
  companyName,
  tagline,
  location,
  owner,
  warnings = [],
  theme = 'corporate',
  children,
  signalStrength,
}) {
  // Theme configurations
  const themeConfig = {
    corporate: {
      primary: 'rgb(79, 209, 197)',
      secondary: 'rgb(133, 175, 231)',
      accent: 'rgb(251, 191, 36)',
      bg: 'rgba(29, 35, 50, 0.8)',
    },
    industrial: {
      primary: 'rgb(251, 191, 36)',
      secondary: 'rgb(148, 163, 184)',
      accent: 'rgb(251, 146, 60)',
      bg: 'rgba(45, 35, 25, 0.8)',
    },
    retail: {
      primary: 'rgb(168, 85, 247)',
      secondary: 'rgb(133, 175, 231)',
      accent: 'rgb(236, 72, 153)',
      bg: 'rgba(35, 25, 45, 0.8)',
    },
    secure: {
      primary: 'rgb(239, 68, 68)',
      secondary: 'rgb(148, 163, 184)',
      accent: 'rgb(251, 191, 36)',
      bg: 'rgba(40, 25, 25, 0.8)',
    },
  };

  let colors = themeConfig[theme] || themeConfig.corporate;

  return (
    <div
      style={{
        border: `2px solid ${colors.primary}`,
        borderRadius: '6px',
        backgroundColor: colors.bg,
      }}
    >
      <div
        style={{
          borderBottom: `2px solid ${colors.primary}`,
          padding: '1.25rem',
        }}
      >
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: colors.primary,
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            textShadow: `0 0 10px ${colors.primary}80`,
          }}
        >
          {companyName}
        </div>

        <div
          style={{
            fontSize: '0.875rem',
            color: colors.accent,
            fontFamily: 'monospace',
            fontStyle: 'italic',
          }}
        >
          {tagline}
        </div>
      </div>

      <div style={{ padding: '1rem' }}>
        {signalStrength && (
          <div
            style={{
              padding: '0.75rem',
              backgroundColor: `${colors.primary}10`,
              border: `1px solid ${colors.primary}`,
              borderRadius: '4px',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Line cyan bold style={{ margin: 0, fontSize: '0.875rem' }}>
              NETWORK DETECTED
            </Line>

            <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  style={{
                    width: '6px',
                    height: `${bar * 5}px`,
                    backgroundColor: bar <= signalStrength ? colors.primary : 'rgba(100, 100, 100, 0.3)',
                    transition: 'background-color 0.3s',
                    boxShadow: bar <= signalStrength ? `0 0 6px ${colors.primary}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div style={{
          // marginTop: '1rem',
          marginBottom: '1rem',
        }}>
          <DataTable
            data={[
              { label: 'LOCATION', value: location },
              { label: 'OWNER', value: owner },
            ]}
          />
        </div>

        {warnings.length > 0 && (
          <div
            style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.4)',
              borderRadius: '4px',
            }}
          >
            {warnings.map((warning, i) => (
              <Line
                key={i}
                yellow
                style={{
                  fontSize: '0.8rem',
                  margin: 0,
                  marginBottom: i < warnings.length - 1 ? '0.5rem' : 0,
                }}
              >
                {warning}
              </Line>
            ))}
          </div>
        )}

        {Boolean(children) && (
          <div style={{
            margin: '1rem 0',
          }}>
            {children }
          </div>
        )}
      </div>
    </div>
  );
}
