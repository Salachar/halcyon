import { Line } from '@shadowsea/ShadowSeaComponents';

function parseScan(str) {
  const [name, raw] = str.split('%');
  const upper = raw?.toUpperCase();
  const failed = !raw || upper === 'FAILED' || upper === 'DENIED' || isNaN(parseInt(raw, 10));
  const confidence = failed ? (upper || 'FAILED') : parseInt(raw, 10);
  return { name: name.trim(), confidence, failed };
}

function getScanColor(failed, confidence) {
  if (failed) return 'rgb(239, 68, 68)';
  if (confidence >= 85) return 'rgb(0, 170, 40)';
  if (confidence >= 50) return 'rgb(250, 204, 21)';
  return 'rgb(239, 68, 68)';
}

export default function Node({
  title,
  subtitle,
  table,
  notes = [],
  scans = [],
  alerts = [],
  footer,
  children,
}) {
  const tableEntries = table ? Object.entries(table).filter(([, v]) => v != null && v !== '') : [];

  return (
    <div style={{
      border: '2px solid rgba(79, 209, 197, 0.6)',
      borderRadius: '4px',
      overflow: 'hidden',
      backgroundColor: 'rgba(10, 25, 35, 0.85)',
      boxShadow: '0 0 20px rgba(79, 209, 197, 0.08), inset 0 0 40px rgba(79, 209, 197, 0.03)',
      fontFamily: 'monospace',
    }}>

      {/* Header */}
      {(title || subtitle || tableEntries.length > 0) && (
        <div style={{
          backgroundColor: 'rgba(79, 209, 197, 0.1)',
          borderBottom: '1px solid rgba(79, 209, 197, 0.4)',
          padding: '0.5rem 0.75rem',
        }}>
          {title && (
            <div style={{
              color: 'rgb(79, 209, 197)',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              letterSpacing: '0.08em',
              textShadow: '0 0 8px rgba(79, 209, 197, 0.4)',
              textTransform: 'uppercase',
              marginBottom: subtitle || tableEntries.length > 0 ? '0.25rem' : 0,
            }}>
              {title}
            </div>
          )}

          {subtitle && (
            <div style={{
              color: 'rgb(148, 163, 184)',
              fontSize: '0.72rem',
              marginBottom: tableEntries.length > 0 ? '0.5rem' : 0,
              letterSpacing: '0.04em',
            }}>
              {subtitle}
            </div>
          )}

          {/* Table — 2 column grid */}
          {tableEntries.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.15rem 0.75rem',
              marginTop: title || subtitle ? '0.5rem' : 0,
              paddingTop: title || subtitle ? '0.5rem' : 0,
              borderTop: title || subtitle ? '1px solid rgba(79, 209, 197, 0.2)' : 'none',
            }}>
              {tableEntries.map(([key, value]) => (
                <div key={key} style={{ display: 'flex', gap: '0.4rem', alignItems: 'baseline' }}>
                  <span style={{
                    color: 'rgba(79, 209, 197, 0.5)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    flexShrink: 0,
                  }}>
                    {key}
                  </span>
                  <span style={{
                    color: 'rgb(203, 213, 225)',
                    fontSize: '0.75rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div style={{ padding: '0.75rem' }}>

        {/* Notes */}
        {notes.length > 0 && (
          <div style={{ marginBottom: children || scans.length || alerts.length ? '0.75rem' : 0 }}>
            {notes.map((note, i) => (
              <div key={i} style={{
                display: 'flex', gap: '0.5rem',
                marginBottom: i < notes.length - 1 ? '0.35rem' : 0,
                paddingLeft: '0.5rem',
                borderLeft: '2px solid rgba(79, 209, 197, 0.4)',
              }}>
                <Line smoke style={{ margin: 0, fontSize: '0.78rem' }}>{note}</Line>
              </div>
            ))}
          </div>
        )}

        {/* Children */}
        {Boolean(children) && (
          <div style={{ marginBottom: scans.length || alerts.length ? '0.75rem' : 0 }}>
            {children}
          </div>
        )}

        {/* Scans */}
        {scans.length > 0 && (
          <>
            <div style={{ marginBottom: alerts.length ? '0.75rem' : 0 }}>
              <div style={{
                color: 'rgba(79, 209, 197, 0.7)',
                fontSize: '0.68rem',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}>
                BIOMETRIC LOG
              </div>
              {scans.map((str, i) => {
                const { name, confidence, failed } = parseScan(str);
                const color = getScanColor(failed, confidence);
                return (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.3rem 0.5rem',
                    marginBottom: i < scans.length - 1 ? '0.25rem' : 0,
                    backgroundColor: `${color}11`,
                    border: `1px solid ${color}33`,
                    borderRadius: '3px',
                  }}>
                    <span style={{ color, fontSize: '0.8rem' }}>{'>>'} {name}</span>
                    <span style={{ color, fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {failed ? confidence : `${confidence}%`}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Alerts */}
        {alerts.length > 0 && (
          <>
            <div style={{
              color: 'rgba(79, 209, 197, 0.7)',
              fontSize: '0.68rem',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              marginBottom: '0.5rem',
            }}>
              RECENT ACTIVITY
            </div>
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
          </>
        )}

        {footer && (
          <>
            {typeof footer === 'string' ? (
              <div style={{
                marginTop: '1rem',
                fontSize: '0.7rem',
                color: 'rgba(79, 209, 197, 0.6)',
                opacity: 0.7,
              }}>
                {footer}
              </div>
            ) : footer}
          </>
        )}
      </div>
    </div>
  );
}
