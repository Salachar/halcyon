import { useState, useEffect } from 'react';
import { Line, Divider, DataTable } from '@shadowsea/ShadowSeaComponents';

export default function PublicPortal({
  name,
  tagline,
  network,
  signalStrength = 'strong',
  status,
  statusColor = 'neon',
  nowPlaying,
  notes = [],
  theme = 'friendly',
  children,
}) {
  const themeConfig = {
    friendly: {
      primary: 'rgb(79, 209, 197)',
      secondary: 'rgb(251, 191, 36)',
      bg: 'rgba(29, 35, 50, 0.6)',
    },
    party: {
      primary: 'rgb(168, 85, 247)',
      secondary: 'rgb(236, 72, 153)',
      bg: 'rgba(35, 25, 45, 0.6)',
    },
    casual: {
      primary: 'rgb(133, 175, 231)',
      secondary: 'rgb(251, 191, 36)',
      bg: 'rgba(29, 35, 50, 0.6)',
    },
    limeade: {
      primary: 'rgb(114, 234, 70)',
      secondary: 'rgb(241, 194, 74)',
      bg: 'rgba(29, 35, 50, 0.6)',
    },
    fancy: {
      primary: 'rgb(217, 160, 80)',
      secondary: 'rgb(180, 130, 55)',
      bg: 'rgba(12, 9, 6, 0.85)',
    },
  };

  const colors = themeConfig[theme] || themeConfig.friendly;

  // const getSignalBars = () => {
  //   const bars = {
  //     weak: '██░░░░',
  //     medium: '████░░',
  //     strong: '██████',
  //   };
  //   return bars[signalStrength] || bars.strong;
  // };

  // const getStatusColor = () => {
  //   const statusColors = {
  //     neon: 'rgb(0, 170, 40)',
  //     yellow: 'rgb(251, 191, 36)',
  //     red: 'rgb(239, 68, 68)',
  //   };
  //   return statusColors[statusColor] || statusColors.neon;
  // };

  return (
    <div
      style={{
        border: `2px solid ${colors.primary}`,
        borderRadius: '6px',
        padding: '1rem',
        backgroundColor: colors.bg,
        // marginBottom: '1rem',
        boxShadow: `0 0 15px ${colors.primary}30`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated corner accents */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          borderTop: `3px solid ${colors.secondary}`,
          borderLeft: `3px solid ${colors.secondary}`,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '20px',
          height: '20px',
          borderTop: `3px solid ${colors.secondary}`,
          borderRight: `3px solid ${colors.secondary}`,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '20px',
          height: '20px',
          borderBottom: `3px solid ${colors.secondary}`,
          borderLeft: `3px solid ${colors.secondary}`,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '20px',
          height: '20px',
          borderBottom: `3px solid ${colors.secondary}`,
          borderRight: `3px solid ${colors.secondary}`,
          opacity: 0.6,
        }}
      />

      {/* Header with glow */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        {name && (
          <Line
            style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: colors.primary,
              textShadow: `0 0 10px ${colors.primary}, 0 0 20px ${colors.primary}80`,
              margin: 0,
              marginBottom: '0.5rem',
              letterSpacing: '0.1em',
            }}
          >
            ✦ {name} ✦
          </Line>
        )}
        {tagline && (
          <Line
            style={{
              fontSize: '0.875rem',
              fontStyle: 'italic',
              color: colors.secondary,
              margin: 0,
              textShadow: `0 0 6px ${colors.secondary}60`,
            }}
          >
            "{tagline}"
          </Line>
        )}
      </div>

      {/* Network handshake */}
      {/* <div style={{ marginTop: '0.75rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Line smoke style={{ fontSize: '0.8rem', margin: 0, fontFamily: 'monospace' }}>
          {network}
        </Line>
        <span style={{
          fontSize: '0.65rem',
          fontFamily: 'monospace',
          color: getStatusColor(),
          fontWeight: 'bold',
          letterSpacing: '0.1em',
        }}>
          ● CONNECTED
        </span>
      </div> */}

      {/* <Divider style={{
        borderColor: colors.primary,
      }} /> */}

      {/* Network details with signal animation */}
      {/* <div style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
        <DataTable
          data={[
            { label: 'SSID', value: network },
            {
              label: 'Signal',
              value: (
                <span style={{ color: colors.primary }}>
                  {getSignalBars()} ({signalStrength.charAt(0).toUpperCase() + signalStrength.slice(1)})
                </span>
              ),
            },
            { label: 'Security', value: 'Open Network' },
            {
              label: 'Status',
              value: (
                <span
                  style={{
                    color: getStatusColor(),
                    fontWeight: 'bold',
                  }}
                >
                  {status}
                </span>
              ),
            },
          ]}
        />
      </div> */}

      {/* Now playing with styled box */}
      {nowPlaying && (
        <div
          style={{
            backgroundColor: `${colors.secondary}15`,
            border: `1px solid ${colors.secondary}40`,
            borderRadius: '4px',
            marginTop: '0.75rem',
            marginBottom: '0.75rem',
          }}
        >
          <Line
            pink
            style={{
              fontSize: '0.875rem',
              margin: 0,
              fontWeight: 'bold',
            }}
          >
            Current Steam: {nowPlaying}
          </Line>
        </div>
      )}

      {/* Notes with bullet styling */}
      {notes.length > 0 && (
        <>
          <Divider
            style={{
              borderColor: colors.primary,
            }}
          />
          <div style={{ marginTop: '0.75rem' }}>
            {notes.map((note, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.35rem',
                }}
              >
                <span
                  style={{
                    color: colors.secondary,
                    fontSize: '0.7rem',
                    flexShrink: 0,
                  }}
                >
                  ▸
                </span>
                <Line
                  yellow
                  style={{
                    fontSize: '0.8rem',
                    margin: 0,
                  }}
                >
                  {note}
                </Line>
              </div>
            ))}
          </div>
        </>
      )}

      {Boolean(children) && (
        <div style={{
          margin: '1rem 0',
        }}>
          {children }
        </div>
      )}
    </div>
  );
}
