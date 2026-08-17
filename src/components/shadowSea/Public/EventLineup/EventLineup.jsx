import {
  Line,
  Divider,
  Section,
  InsetBox,
  Spacer,
} from '@shadowsea/ShadowSeaComponents';

export default function EventLineup({
  venueName = "The Venue",
  date = "Tonight",
  updateFrequency = "Updated hourly",
  performances = [],
  djs = [],
  entry,
  tagline,
  theme = "club",
}) {
  // Theme-based colors
  const getThemeColor = () => {
    const themes = {
      club: { primary: 'rgb(255, 0, 128)', secondary: 'rgb(168, 85, 247)' }, // pink/purple
      concert: { primary: 'rgb(239, 68, 68)', secondary: 'rgb(251, 146, 60)' }, // red/orange
      bar: { primary: 'rgb(79, 209, 197)', secondary: 'rgb(59, 130, 246)' }, // cyan/blue
    };
    return themes[theme] || themes.club;
  };

  const themeColor = getThemeColor();

  // Determine if performance is happening now (simplified - just visual indicator)
  const isPerformanceNow = (index) => {
    // First performance is "current" for demo purposes
    return index === 0;
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          border: `2px solid ${themeColor.primary}`,
          borderRadius: '4px',
          backgroundColor: 'rgba(29, 35, 50, 0.3)',
          padding: '1rem',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          {/* CSS Stage/Music Icon */}
          <div style={{ position: 'relative', width: '24px', height: '20px', flexShrink: 0 }}>
            {/* Speaker cone */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                transform: 'translateY(-50%)',
                width: '0',
                height: '0',
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderLeft: `12px solid ${themeColor.primary}`,
              }}
            />
            {/* Sound waves */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '6px',
                transform: 'translateY(-50%)',
                width: '4px',
                height: '8px',
                border: `2px solid ${themeColor.primary}`,
                borderLeft: 'none',
                borderRadius: '0 4px 4px 0',
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '0',
                transform: 'translateY(-50%)',
                width: '6px',
                height: '14px',
                border: `2px solid ${themeColor.primary}`,
                borderLeft: 'none',
                borderRadius: '0 6px 6px 0',
                opacity: 0.4,
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <Line
              style={{
                margin: 0,
                fontSize: '1.125rem',
                fontWeight: 'bold',
                color: themeColor.primary,
              }}
            >
              {date.toUpperCase()}'S LINEUP
            </Line>
            <Line
              cyan
              style={{
                margin: 0,
                fontSize: '0.75rem',
                marginTop: '0.25rem',
              }}
            >
              {venueName} • {updateFrequency}
            </Line>
          </div>
        </div>

        <Divider />

        {/* Live Performances */}
        {performances.length > 0 && (
          <>
            <Spacer />
            <div
              style={{
                fontSize: '0.875rem',
                fontWeight: 'bold',
                color: themeColor.secondary,
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              ♫ Live Performances:
            </div>

            {performances.map((perf, i) => {
              const isNow = isPerformanceNow(i);

              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.5rem 0.75rem',
                    marginBottom: '0.5rem',
                    backgroundColor: isNow ? `${themeColor.primary}20` : 'rgba(51, 65, 85, 0.3)',
                    border: isNow ? `1px solid ${themeColor.primary}` : '1px solid rgba(71, 85, 105, 0.5)',
                    borderRadius: '3px',
                    borderLeft: isNow ? `3px solid ${themeColor.primary}` : '3px solid transparent',
                  }}
                >
                  {/* Time */}
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      color: isNow ? themeColor.primary : 'rgb(148, 163, 184)',
                      fontFamily: 'monospace',
                      minWidth: '50px',
                    }}
                  >
                    {perf.time}
                  </div>

                  {/* Arrow */}
                  <div
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgb(148, 163, 184)',
                    }}
                  >
                    →
                  </div>

                  {/* Artist & Genre */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        color: isNow ? themeColor.primary : 'rgb(0, 255, 255)',
                      }}
                    >
                      {perf.artist}
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'rgb(148, 163, 184)',
                        fontStyle: 'italic',
                        marginTop: '0.15rem',
                      }}
                    >
                      {perf.genre}
                    </div>
                  </div>

                  {/* Status badge */}
                  {isNow && (
                    <div
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 'bold',
                        color: themeColor.primary,
                        padding: '0.2rem 0.5rem',
                        backgroundColor: `${themeColor.primary}30`,
                        border: `1px solid ${themeColor.primary}`,
                        borderRadius: '2px',
                        textTransform: 'uppercase',
                      }}
                    >
                      Live Now
                    </div>
                  )}
                  {perf.status && !isNow && (
                    <div
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 'bold',
                        color: 'rgb(250, 204, 21)',
                        padding: '0.2rem 0.5rem',
                        backgroundColor: 'rgba(250, 204, 21, 0.2)',
                        border: '1px solid rgb(250, 204, 21)',
                        borderRadius: '2px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {perf.status}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* Resident DJs */}
        {djs.length > 0 && (
          <InsetBox title="Resident DJs:" color="yellow">
            {djs.map((dj, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.35rem',
                }}
              >
                <span style={{ color: 'rgb(250, 204, 21)' }}>→</span>
                <span style={{ color: 'rgb(250, 204, 21)', fontWeight: 'bold' }}>{dj.name}</span>
                <span style={{ color: 'rgb(148, 163, 184)' }}>-</span>
                <span style={{ color: 'rgb(148, 163, 184)', fontStyle: 'italic' }}>{dj.genre}</span>
                {dj.note && (
                  <span
                    style={{
                      color: 'rgb(79, 209, 197)',
                      fontSize: '0.75rem',
                      marginLeft: '0.5rem',
                    }}
                  >
                    ({dj.note})
                  </span>
                )}
              </div>
            ))}
          </InsetBox>
        )}

        {/* Entry & Pricing */}
        {entry && (
          <>
            <Section title="Cover & Entry:" color="cyan">
              {entry.price && (
                <Line cyan style={{ marginBottom: '0.25rem' }}>
                  Entry: {entry.price}
                </Line>
              )}
              {entry.vipAccess && (
                <Line cyan style={{ marginBottom: '0.25rem' }}>
                  VIP Access: {entry.vipAccess}
                </Line>
              )}
              {entry.memberBenefit && (
                <Line yellow style={{ marginBottom: '0.25rem' }}>
                  {entry.memberBenefit}
                </Line>
              )}
              {entry.notes && (
                <Line smoke style={{ fontSize: '0.75rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
                  {entry.notes}
                </Line>
              )}
            </Section>
          </>
        )}

        {/* Tagline */}
        {tagline && (
          <>
            <Divider />
            <div
              style={{
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                color: themeColor.primary,
                fontStyle: 'italic',
                marginTop: '0.75rem',
              }}
            >
              "{tagline}"
            </div>
          </>
        )}
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
