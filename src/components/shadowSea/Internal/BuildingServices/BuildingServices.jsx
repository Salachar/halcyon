import { Divider } from '@shadowsea/ShadowSeaComponents';

const TEAL = 'rgb(79, 209, 197)';
const TEAL_DIM = 'rgba(79, 209, 197, 0.5)';
const TEAL_BORDER = 'rgba(79, 209, 197, 0.2)';
const YELLOW = 'rgb(251, 191, 36)';
const SMOKE = 'rgb(148, 163, 184)';
const SMOKE_DIM = 'rgb(100, 116, 139)';

export default function BuildingServices({
  title = "BUILDING SERVICES",
  sections = [],
}) {
  return (
    <div style={{
      fontFamily: 'monospace',
      border: `1px solid ${TEAL_BORDER}`,
      borderRadius: '6px',
      overflow: 'hidden',
      backgroundColor: 'rgba(10, 20, 30, 0.9)',
      boxShadow: '0 0 24px rgba(79, 209, 197, 0.06)',
    }}>

      {/* Header */}
      <div style={{
        padding: '0.65rem 1rem',
        background: 'linear-gradient(135deg, rgba(79, 209, 197, 0.12), rgba(10, 20, 30, 0.95))',
        borderBottom: `1px solid ${TEAL_BORDER}`,
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
      }}>
        <div style={{
          width: '7px', height: '7px', borderRadius: '50%',
          backgroundColor: TEAL,
          boxShadow: `0 0 6px ${TEAL}`,
          flexShrink: 0,
        }} />
        <span style={{
          color: TEAL,
          fontSize: '0.8rem',
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          textShadow: `0 0 8px rgba(79, 209, 197, 0.3)`,
        }}>
          {title}
        </span>
      </div>

      {/* Sections */}
      <div>
        {sections.map((section, i) => (
          <div key={i}>
            <div style={{ padding: '0.65rem 1rem' }}>

              {/* Section title */}
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 'bold',
                color: TEAL_DIM,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}>
                {section.title}
              </div>

              {/* Notes */}
              {section.notes?.length > 0 && (
                <div style={{ marginBottom: section.actions?.length ? '0.5rem' : 0 }}>
                  {section.notes.map((note, j) => (
                    <div key={j} style={{
                      display: 'flex',
                      gap: '0.4rem',
                      marginBottom: j < section.notes.length - 1 ? '0.2rem' : 0,
                    }}>
                      <span style={{ color: SMOKE_DIM, fontSize: '0.7rem', flexShrink: 0 }}>•</span>
                      <span style={{ color: SMOKE, fontSize: '0.75rem' }}>{note}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              {section.actions?.length > 0 && (
                <div style={{
                  marginTop: '0.4rem',
                  padding: '0.4rem 0.6rem',
                  backgroundColor: 'rgba(251, 191, 36, 0.05)',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                  borderRadius: '3px',
                  marginBottom: section.warning ? '0.4rem' : 0,
                }}>
                  <div style={{
                    fontSize: '0.6rem',
                    color: 'rgba(251, 191, 36, 0.5)',
                    letterSpacing: '0.12em',
                    marginBottom: '0.3rem',
                  }}>
                    OVERRIDE OPTIONS
                  </div>
                  {section.actions.map((action, j) => (
                    <div key={j} style={{
                      display: 'flex',
                      gap: '0.4rem',
                      marginBottom: j < section.actions.length - 1 ? '0.2rem' : 0,
                    }}>
                      <span style={{ color: YELLOW, fontSize: '0.7rem', flexShrink: 0 }}>→</span>
                      <span style={{ color: YELLOW, fontSize: '0.75rem' }}>{action}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Warning */}
              {section.warning && (
                <div style={{
                  marginTop: '0.3rem',
                  color: SMOKE_DIM,
                  fontSize: '0.68rem',
                  fontStyle: 'italic',
                }}>
                  {section.warning}
                </div>
              )}
            </div>

            {i < sections.length - 1 && (
              <div style={{
                borderBottom: `1px solid rgba(79, 209, 197, 0.08)`,
                margin: '0 1rem',
              }} />
            )}
          </div>
        ))}

        {sections.length === 0 && (
          <div style={{
            padding: '1rem',
            textAlign: 'center',
            color: SMOKE_DIM,
            fontSize: '0.75rem',
            fontStyle: 'italic',
          }}>
            No services configured
          </div>
        )}
      </div>
    </div>
  );
}
