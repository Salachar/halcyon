import LoginIcon from '@mui/icons-material/Login';
import { Line, Divider } from '@shadowsea/ShadowSeaComponents';

export default function BuildingAccess({
  title = "BUILDING ACCESS CONTROL",
  points = [],
}) {
  return (
    <div style={{
      border: '2px solid rgb(250, 204, 21)',
      borderRadius: '4px',
      padding: '1rem',
      backgroundColor: 'rgba(29, 35, 50, 0.3)',
      fontFamily: 'monospace',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
        <LoginIcon style={{ color: 'rgb(250, 204, 21)', fontSize: 20, flexShrink: 0 }} />
        <span style={{
          color: 'rgb(250, 204, 21)',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          letterSpacing: '0.08em',
        }}>
          [{title}]
        </span>
      </div>

      <Divider />

      {/* Access points */}
      {points.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
          {points.map((point, i) => (
            <div key={i} style={{
              padding: '0.6rem 0.75rem',
              backgroundColor: 'rgba(250, 204, 21, 0.05)',
              border: '1px solid rgba(250, 204, 21, 0.2)',
              borderRadius: '3px',
            }}>
              <Line yellow bold style={{ marginBottom: '0.4rem' }}>{point.location}</Line>

              {point.access?.length > 0 && (
                <div style={{ marginBottom: point.notes?.length ? '0.4rem' : 0 }}>
                  {point.access.map((a, j) => (
                    <Line key={j} cyan style={{ fontSize: '0.78rem' }}>• {a}</Line>
                  ))}
                </div>
              )}

              {point.notes?.length > 0 && (
                <div>
                  {point.notes.map((n, j) => (
                    <Line key={j} smoke style={{ fontSize: '0.75rem', fontStyle: 'italic' }}>↳ {n}</Line>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Line yellow style={{ marginTop: '0.5rem' }}>No access points configured.</Line>
      )}
    </div>
  );
}
