import { Line, Section, InsetBox } from '@shadowsea/ShadowSeaComponents';

export default function Camera({
  id = "",
  location = "Location Not Set",
  status = 'ACTIVE',
  cctv,
  coverage,
  notes = [],
  timeline = [],
  alerts = [],
  children,
}) {
  const isOnline = status === 'ACTIVE' || status.includes('ACTIVE');

  const getStatusColor = () => {
    if (status.includes('ACTIVE')) return 'rgb(79, 209, 197)';
    if (status.includes('OFFLINE')) return 'rgb(252, 129, 129)';
    if (status.includes('MAINTENANCE')) return 'rgb(251, 191, 36)';
    return 'rgb(148, 163, 184)';
  };

  const statusColor = getStatusColor();

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        border: '2px solid rgb(77, 167, 188)',
        borderTop: '4px solid rgb(79, 209, 197)',
        borderRadius: '6px',
        padding: '1.25rem',
        backgroundColor: 'rgba(29, 35, 50, 0.4)',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', gap: '0.75rem' }}>

          {/* Icon + ID */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ position: 'relative', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{
                position: 'absolute', width: '40px', height: '40px',
                border: '2px solid rgb(77, 167, 188)', borderRadius: '50%',
              }}>
                <div style={{ position: 'absolute', top: '-2px', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '6px', backgroundColor: 'rgb(79, 209, 197)' }} />
                <div style={{ position: 'absolute', bottom: '-2px', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '6px', backgroundColor: 'rgb(79, 209, 197)' }} />
                <div style={{ position: 'absolute', left: '-2px', top: '50%', transform: 'translateY(-50%)', width: '6px', height: '2px', backgroundColor: 'rgb(79, 209, 197)' }} />
                <div style={{ position: 'absolute', right: '-2px', top: '50%', transform: 'translateY(-50%)', width: '6px', height: '2px', backgroundColor: 'rgb(79, 209, 197)' }} />
              </div>
              <div style={{
                width: '20px', height: '20px',
                border: '2px solid rgb(79, 209, 197)', borderRadius: '50%',
                backgroundColor: 'rgba(79, 209, 197, 0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  backgroundColor: isOnline ? 'rgb(252, 129, 129)' : 'rgb(148, 163, 184)',
                  boxShadow: isOnline ? '0 0 8px rgb(252, 129, 129)' : 'none',
                }} />
              </div>
            </div>

            <div>
              <Line smoke large bold style={{ margin: 0 }}>{id.toUpperCase()}</Line>
              <Line cyan style={{ fontSize: '0.875rem', margin: 0, marginTop: '0.15rem' }}>{location}</Line>
            </div>
          </div>

          {/* Status badge */}
          <div style={{
            padding: '0.35rem 0.75rem',
            backgroundColor: isOnline ? 'rgba(79, 209, 197, 0.15)' : 'rgba(252, 129, 129, 0.15)',
            border: `1px solid ${statusColor}`,
            borderRadius: '4px',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0,
          }}>
            <div style={{ width: '7px', height: '7px', backgroundColor: statusColor, borderRadius: '50%' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: statusColor, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              {status}
            </span>
          </div>
        </div>

        {/* Coverage bar */}
        {coverage && (
          <div style={{
            padding: '0.65rem 0.75rem',
            backgroundColor: 'rgba(79, 209, 197, 0.05)',
            border: '1px solid rgba(79, 209, 197, 0.15)',
            borderRadius: '4px',
            marginBottom: '0.75rem',
          }}>
            <Line neon style={{ margin: 0, fontSize: '0.875rem' }}>{coverage}</Line>
          </div>
        )}

        {/* Live feed */}
        {isOnline && (
          <div style={{
            border: '1px solid rgba(79, 209, 197, 0.4)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '0.75rem',
          }}>
            {/* Feed body */}
            {cctv ? (
              <div style={{ position: 'relative' }}>
                {/* Corner brackets */}
                {[
                  { top: 0, left: 0, borderTop: true, borderLeft: true },
                  { top: 0, right: 0, borderTop: true, borderRight: true },
                  { bottom: 0, left: 0, borderBottom: true, borderLeft: true },
                  { bottom: 0, right: 0, borderBottom: true, borderRight: true },
                ].map((corner, i) => (
                  <div key={i} style={{
                    position: 'absolute', zIndex: 5,
                    width: '24px', height: '24px',
                    top: corner.top ?? 'auto',
                    bottom: corner.bottom ?? 'auto',
                    left: corner.left ?? 'auto',
                    right: corner.right ?? 'auto',
                    borderTop: corner.borderTop ? '2px solid rgba(79, 209, 197, 0.6)' : 'none',
                    borderBottom: corner.borderBottom ? '2px solid rgba(79, 209, 197, 0.6)' : 'none',
                    borderLeft: corner.borderLeft ? '2px solid rgba(79, 209, 197, 0.6)' : 'none',
                    borderRight: corner.borderRight ? '2px solid rgba(79, 209, 197, 0.6)' : 'none',
                  }} />
                ))}

                <img
                  src={cctv}
                  alt={location}
                  style={{ width: '100%', display: 'block' }}
                />

                {/* Callout */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px', left: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  padding: '4px 10px',
                  borderRadius: '3px',
                  border: '1px solid rgba(79, 209, 197, 0.4)',
                  fontFamily: 'monospace',
                  fontSize: '0.65rem',
                  color: 'rgba(79, 209, 197, 0.7)',
                  zIndex: 10,
                }}>
                  CityCam images are for reference only — not an exact representation
                </div>
              </div>
            ) : (
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'rgb(19, 23, 34)',
                textAlign: 'center',
              }}>
                <span style={{
                  fontSize: '0.8rem',
                  color: 'rgba(79, 209, 197, 0.5)',
                  fontFamily: 'monospace',
                  fontStyle: 'italic',
                  letterSpacing: '0.05em',
                }}>
                  [ Ask the GM what your character sees ]
                </span>
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        {notes.length > 0 && (
          <div style={{ marginBottom: '0.75rem' }}>
            {notes.map((note, i) => (
              <div key={i} style={{
                display: 'flex', gap: '0.5rem',
                marginBottom: '0.35rem',
                paddingLeft: '0.5rem',
                borderLeft: '2px solid rgba(79, 209, 197, 0.4)',
              }}>
                <Line smoke style={{ margin: 0, fontSize: '0.78rem' }}>{note}</Line>
              </div>
            ))}
          </div>
        )}

        {/* Timeline */}
        {timeline.length > 0 && (
          <InsetBox title="FOOTAGE TIMELINE:">
            {timeline.map((event, i) => (
              <Line
                key={i}
                neon={!event.includes('LOST') && !event.includes('offline')}
                red={event.includes('LOST') || event.includes('offline') || event.includes('shattered')}
                yellow={event.includes('suspicious') || event.includes('⚠')}
              >
                {event}
              </Line>
            ))}
          </InsetBox>
        )}

        {/* Alerts */}
        {alerts.length > 0 && (
          <Section title="RECENT ACTIVITY">
            {alerts.map((alert, i) => (
              <div key={i} style={{
                padding: '0.5rem 0.75rem',
                marginBottom: i < alerts.length - 1 ? '0.4rem' : 0,
                backgroundColor: 'rgba(251, 191, 36, 0.07)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderLeft: '3px solid rgb(251, 191, 36)',
                borderRadius: '3px',
              }}>
                <Line smoke style={{ margin: 0, fontSize: '0.875rem' }}>{alert}</Line>
              </div>
            ))}
          </Section>
        )}

        {Boolean(children) && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '6px', borderLeft: '3px solid rgb(250, 204, 21)' }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
