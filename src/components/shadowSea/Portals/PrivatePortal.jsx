/**
 * PrivatePortal - Private members network hub
 *
 * A themed shell for high-end private networks. The component provides
 * the ambient "you're in the room" feeling - presence, tickers, notices.
 * Related commands handle the actual content (VIP lists, encrypted chats, etc.)
 *
 * Props:
 * - networkId: String - network identifier shown in header (e.g. "CRYSTAL_LATTICE")
 * - name: String - display name (e.g. "Crystal Lattice")
 * - location: String - physical location (e.g. "The Glass Gardens")
 * - theme: Object - color overrides { primary, secondary, bg, border }
 * - members: Array of strings - anonymous handles currently online
 * - tickers: Array of strings - market/odds data lines (e.g. "ALLIANSEN INC +2.4%")
 * - notices: Array of strings - brief notice board items (optional, max 3)
 */

const THEMES = {
  crystal: {
    primary: 'rgb(186, 230, 253)',
    secondary: 'rgba(186, 230, 253, 0.5)',
    dim: 'rgba(186, 230, 253, 0.25)',
    bg: 'rgba(8, 12, 20, 0.97)',
    border: 'rgb(147, 197, 253)',
    pulse: 'rgb(186, 230, 253)',
  },
  gold: {
    primary: 'rgb(251, 191, 36)',
    secondary: 'rgba(251, 191, 36, 0.5)',
    dim: 'rgba(251, 191, 36, 0.25)',
    bg: 'rgba(15, 12, 8, 0.97)',
    border: 'rgb(251, 191, 36)',
    pulse: 'rgb(251, 191, 36)',
  },
  neon: {
    primary: 'rgb(0, 255, 128)',
    secondary: 'rgba(0, 255, 128, 0.5)',
    dim: 'rgba(0, 255, 128, 0.25)',
    bg: 'rgba(8, 15, 10, 0.97)',
    border: 'rgb(0, 200, 80)',
    pulse: 'rgb(0, 255, 128)',
  },
  red: {
    primary: 'rgb(252, 129, 129)',
    secondary: 'rgba(252, 129, 129, 0.5)',
    dim: 'rgba(252, 129, 129, 0.25)',
    bg: 'rgba(15, 8, 8, 0.97)',
    border: 'rgb(239, 68, 68)',
    pulse: 'rgb(252, 129, 129)',
  },
};

export default function PrivatePortal({
  networkId = "PRIVATE_HUB",
  name = "Private Network",
  location = "",
  theme = "crystal",
  members = [],
  tickers = [],
  notices = [],
}) {
  const t = typeof theme === 'object' ? theme : (THEMES[theme] || THEMES.crystal);

  return (
    <div style={{
      border: `1px solid ${t.border}`,
      backgroundColor: t.bg,
      padding: '1.5rem',
      fontFamily: 'monospace',
    }}>

      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${t.dim}`,
        paddingBottom: '1rem',
        marginBottom: '1.25rem',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <div>
            <div style={{
              color: t.secondary,
              fontSize: '0.6rem',
              letterSpacing: '0.35em',
              marginBottom: '0.4rem',
            }}>
              {networkId}
            </div>
            <div style={{
              color: t.primary,
              fontSize: '1rem',
              fontWeight: 'bold',
              letterSpacing: '0.15em',
            }}>
              {name}
            </div>
            {location && (
              <div style={{
                color: t.secondary,
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                marginTop: '0.2rem',
              }}>
                {location}
              </div>
            )}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            paddingTop: '0.2rem',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: t.pulse,
              boxShadow: `0 0 6px ${t.pulse}`,
            }} />
            <span style={{
              color: t.secondary,
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
            }}>
              CONNECTED
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem' }}>

        {/* Left column - tickers */}
        {tickers.length > 0 && (
          <div style={{ flex: 1 }}>
            <div style={{
              color: t.dim,
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              marginBottom: '0.6rem',
            }}>
              MARKET
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {tickers.map((ticker, i) => {
                // detect positive/negative for color
                const isPositive = ticker.includes('+');
                const isNegative = ticker.includes('-');
                const valueColor = isPositive
                  ? 'rgb(134, 239, 172)'
                  : isNegative
                    ? 'rgb(252, 129, 129)'
                    : t.secondary;

                // split on last space to separate label from value
                const lastSpace = ticker.lastIndexOf(' ');
                const label = lastSpace > 0 ? ticker.substring(0, lastSpace) : ticker;
                const value = lastSpace > 0 ? ticker.substring(lastSpace + 1) : '';

                return (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: `1px solid ${t.dim}`,
                    paddingBottom: '0.3rem',
                    gap: '1rem',
                  }}>
                    <span style={{
                      color: t.secondary,
                      fontSize: '0.7rem',
                      letterSpacing: '0.05em',
                    }}>
                      {label}
                    </span>
                    <span style={{
                      color: valueColor,
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}>
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Right column - members + notices */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Active members */}
          {members.length > 0 && (
            <div>
              <div style={{
                color: t.dim,
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                marginBottom: '0.6rem',
              }}>
                MEMBERS ONLINE — {members.length}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {members.map((handle, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <div style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: t.pulse,
                      boxShadow: `0 0 4px ${t.pulse}`,
                      flexShrink: 0,
                    }} />
                    <span style={{
                      color: t.secondary,
                      fontSize: '0.7rem',
                      letterSpacing: '0.05em',
                    }}>
                      {handle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notices */}
          {notices.length > 0 && (
            <div>
              <div style={{
                color: t.dim,
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                marginBottom: '0.6rem',
              }}>
                NOTICES
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {notices.slice(0, 3).map((notice, i) => (
                  <div key={i} style={{
                    borderLeft: `2px solid ${t.dim}`,
                    paddingLeft: '0.6rem',
                    color: t.secondary,
                    fontSize: '0.7rem',
                    lineHeight: '1.5',
                    letterSpacing: '0.03em',
                  }}>
                    {notice}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: `1px solid ${t.dim}`,
        marginTop: '1.25rem',
        paddingTop: '0.75rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span style={{ color: t.dim, fontSize: '0.6rem', letterSpacing: '0.15em' }}>
          END-TO-END ENCRYPTED
        </span>
        <span style={{ color: t.dim, fontSize: '0.6rem', letterSpacing: '0.15em' }}>
          MEMBERS ONLY
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

    </div>
  );
}
