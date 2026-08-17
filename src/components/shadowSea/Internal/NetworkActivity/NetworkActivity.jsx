import { Divider } from '@shadowsea/ShadowSeaComponents';

const TEAL = 'rgb(79, 209, 197)';
const TEAL_DIM = 'rgba(79, 209, 197, 0.5)';
const TEAL_BORDER = 'rgba(79, 209, 197, 0.2)';
const SMOKE = 'rgb(148, 163, 184)';
const SMOKE_DIM = 'rgb(100, 116, 139)';
const YELLOW = 'rgb(251, 191, 36)';
const RED = 'rgb(239, 68, 68)';
const GREEN = 'rgb(34, 197, 94)';

function getStatusColor(status) {
  if (!status) return TEAL;
  const s = status.toUpperCase();
  if (s.includes('OFFLINE') || s.includes('DOWN')) return SMOKE_DIM;
  if (s.includes('ALERT') || s.includes('FAILED') || s.includes('ERROR')) return YELLOW;
  if (s.includes('ACTIVE') || s.includes('ONLINE')) return GREEN;
  return TEAL;
}

export default function NetworkActivity({
  title = "NETWORK",
  environment,
  devices = [],
  children,
}) {
  const envEntries = environment
    ? Object.entries(environment).filter(([, v]) => v != null && v !== '')
    : [];

  return (
    <div style={{
      fontFamily: 'monospace',
      borderRadius: '6px',
      overflow: 'hidden',
      border: '1px solid rgba(79, 209, 197, 0.35)',
      backgroundColor: 'rgba(10, 20, 30, 0.9)',
      boxShadow: '0 0 24px rgba(79, 209, 197, 0.06)',
    }}>

      {/* Header */}
      <div style={{
        padding: '0.75rem 1rem',
        background: 'linear-gradient(135deg, rgba(79, 209, 197, 0.12), rgba(10, 20, 30, 0.95))',
        borderBottom: '1px solid rgba(79, 209, 197, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '7px', height: '7px', borderRadius: '50%',
            backgroundColor: GREEN,
            boxShadow: `0 0 6px ${GREEN}`,
            flexShrink: 0,
          }} />
          <span style={{
            color: TEAL,
            fontSize: '0.85rem',
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            textShadow: `0 0 8px rgba(79, 209, 197, 0.3)`,
          }}>
            {title}
          </span>
        </div>
        <span style={{
          fontSize: '0.6rem',
          color: TEAL_DIM,
          letterSpacing: '0.12em',
        }}>
          {devices.length} DEVICES
        </span>
      </div>

      {/* Environment strip */}
      {envEntries.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '0',
          borderBottom: '1px solid rgba(79, 209, 197, 0.15)',
          backgroundColor: 'rgba(79, 209, 197, 0.04)',
        }}>
          {envEntries.map(([key, value], i) => (
            <div key={key} style={{
              flex: 1,
              padding: '0.4rem 0.75rem',
              borderRight: i < envEntries.length - 1 ? '1px solid rgba(79, 209, 197, 0.1)' : 'none',
            }}>
              <div style={{
                fontSize: '0.55rem',
                color: TEAL_DIM,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.1rem',
              }}>
                {key}
              </div>
              <div style={{
                fontSize: '0.72rem',
                color: SMOKE,
                fontWeight: '500',
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Device list */}
      <div style={{ padding: '0.5rem 0' }}>
        {devices.length === 0 && (
          <div style={{
            padding: '1rem',
            textAlign: 'center',
            color: SMOKE_DIM,
            fontSize: '0.75rem',
            fontStyle: 'italic',
          }}>
            No devices detected
          </div>
        )}

        {devices.map((device, i) => {
          const statusColor = getStatusColor(device.status);
          const hasTransfer = Boolean(device.transfer);
          const isLast = i === devices.length - 1;

          return (
            <div key={i}>
              <div style={{
                padding: '0.5rem 1rem',
                backgroundColor: hasTransfer ? 'rgba(79, 209, 197, 0.03)' : 'transparent',
              }}>

                {/* Device row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}>
                  <div style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    backgroundColor: statusColor,
                    boxShadow: `0 0 4px ${statusColor}`,
                    flexShrink: 0,
                  }} />
                  <span style={{
                    color: statusColor === SMOKE_DIM ? SMOKE_DIM : SMOKE,
                    fontSize: '0.8rem',
                    flex: 1,
                    fontWeight: hasTransfer ? 'bold' : 'normal',
                  }}>
                    {device.name}
                  </span>
                  {device.location && (
                    <span style={{
                      color: SMOKE_DIM,
                      fontSize: '0.65rem',
                    }}>
                      {device.location}
                    </span>
                  )}
                  {device.status && (
                    <span style={{
                      color: statusColor,
                      fontSize: '0.6rem',
                      fontWeight: 'bold',
                      letterSpacing: '0.08em',
                    }}>
                      {device.status.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Transfer row */}
                {hasTransfer && (
                  <div style={{
                    marginTop: '0.35rem',
                    marginLeft: '1.1rem',
                    padding: '0.4rem 0.6rem',
                    backgroundColor: 'rgba(79, 209, 197, 0.06)',
                    border: '1px solid rgba(79, 209, 197, 0.15)',
                    borderRadius: '3px',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.4rem',
                      flexWrap: 'wrap',
                    }}>
                      <span style={{
                        color: YELLOW,
                        fontSize: '0.72rem',
                        fontWeight: 'bold',
                      }}>
                        {'>>'} {device.transfer.name}
                      </span>
                      {device.transfer.destination && (
                        <span style={{ color: SMOKE_DIM, fontSize: '0.65rem' }}>
                          → {device.transfer.destination}
                        </span>
                      )}
                      {device.transfer.size && (
                        <span style={{
                          color: TEAL_DIM,
                          fontSize: '0.62rem',
                          marginLeft: 'auto',
                        }}>
                          {device.transfer.size}
                        </span>
                      )}
                    </div>
                    {device.transfer.note && (
                      <div style={{
                        marginTop: '0.2rem',
                        color: device.transfer.note.includes('FAILED') || device.transfer.note.includes('ALERT')
                          ? RED
                          : SMOKE_DIM,
                        fontSize: '0.65rem',
                        fontStyle: 'italic',
                      }}>
                        {device.transfer.note}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!isLast && (
                <div style={{
                  borderBottom: '1px solid rgba(79, 209, 197, 0.08)',
                  margin: '0 1rem',
                }} />
              )}
            </div>
          );
        })}
      </div>

      {Boolean(children) && (
        <div style={{
          margin: '1rem',
          fontSize: '0.875rem',
        }}>
          {children }
        </div>
      )}
    </div>
  );
}
