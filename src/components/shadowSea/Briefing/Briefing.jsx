import { Line, Divider } from '@shadowsea/ShadowSeaComponents';

export default function Briefing({
  title,
  issuer,
  classification = 'CLASSIFIED',
  primary = [],
  secondary = [],
  intel = [],
  payment = [],
  warnings = [],
  footer,
  children,
}) {
  // Classification color mapping
  const getClassificationColor = () => {
    switch (classification) {
      case 'CLASSIFIED':
        return 'rgb(239, 68, 68)';
      case 'CONFIDENTIAL':
        return 'rgb(251, 146, 60)';
      case 'RESTRICTED':
        return 'rgb(251, 191, 36)';
      case 'UNCLASSIFIED':
        return 'rgb(148, 163, 184)';
      default:
        return 'rgb(239, 68, 68)';
    }
  };

  const classColor = getClassificationColor();

  // Objective icon based on priority
  const getObjectiveIcon = (priority) => {
    switch (priority) {
      case 'critical':
        return '⚠';
      case 'high':
        return '▶';
      case 'normal':
      default:
        return '→';
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Briefing container */}
      <div
        style={{
          border: `2px solid ${classColor}`,
          borderRadius: '4px',
          padding: '1.5rem',
          backgroundColor: 'rgba(29, 35, 50, 0.5)',
          position: 'relative',
        }}
      >
        {/* Classification header */}
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgb(19, 23, 34)',
            padding: '0 1rem',
          }}
        >
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 'bold',
              color: classColor,
              letterSpacing: '0.15em',
              fontFamily: 'monospace',
            }}
          >
            [{classification}]
          </span>
        </div>

        {/* Title section */}
        <div style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '0.5rem' }}>
          <Line
            style={{
              margin: 0,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'rgb(79, 209, 197)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {title}
          </Line>
          {issuer && (
            <Line
              style={{
                fontSize: '0.75rem',
                color: 'rgb(148, 163, 184)',
                marginTop: '0.25rem',
              }}
            >
              ISSUED BY: {issuer.toUpperCase()}
            </Line>
          )}
        </div>

        <Divider />

        {/* Primary objectives */}
        {primary.length > 0 && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: 'rgb(239, 68, 68)',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em',
                }}
              >
                PRIMARY OBJECTIVES:
              </div>
              {primary.map((obj, i) => (
                <div key={i} style={{ marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    {/* <span
                      style={{
                        color: obj.priority === 'critical' ? 'rgb(239, 68, 68)' : 'rgb(251, 146, 60)',
                        fontSize: '0.875rem',
                        marginTop: '0.1rem',
                      }}
                    >
                      {getObjectiveIcon(obj.priority)}
                    </span> */}
                    <span
                      style={{
                        color: 'rgb(239, 68, 68)',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        flex: 1,
                      }}
                    >
                      {obj.text}
                    </span>
                  </div>
                  {obj.note && (
                    <Line
                      style={{
                        fontSize: '0.75rem',
                        color: 'rgb(148, 163, 184)',
                        marginLeft: '1.5rem',
                        marginTop: '0.25rem',
                      }}
                    >
                      {obj.note}
                    </Line>
                  )}
                </div>
              ))}
            </div>
            <Divider />
          </>
        )}

        {/* Secondary objectives */}
        {secondary.length > 0 && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: 'rgb(251, 191, 36)',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em',
                }}
              >
                SECONDARY OBJECTIVES:
              </div>
              {secondary.map((obj, i) => (
                <div key={i} style={{ marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    {/* <span
                      style={{
                        color: 'rgb(251, 191, 36)',
                        fontSize: '0.875rem',
                        marginTop: '0.1rem',
                      }}
                    >
                      {getObjectiveIcon(obj.priority || 'normal')}
                    </span> */}
                    <span
                      style={{
                        color: 'rgb(251, 191, 36)',
                        fontSize: '0.875rem',
                        flex: 1,
                      }}
                    >
                      {obj.text}
                    </span>
                  </div>
                  {obj.note && (
                    <Line
                      style={{
                        fontSize: '0.75rem',
                        color: 'rgb(148, 163, 184)',
                        marginLeft: '1.5rem',
                        marginTop: '0.25rem',
                      }}
                    >
                      {obj.note}
                    </Line>
                  )}
                </div>
              ))}
            </div>
            <Divider />
          </>
        )}

        {/* Intel section */}
        {intel.length > 0 && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: 'rgb(77, 167, 188)',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em',
                }}
              >
                INTELLIGENCE:
              </div>
              {intel.map((item, i) => (
                <Line
                  key={i}
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgb(79, 209, 197)',
                    marginBottom: '0.25rem',
                  }}
                >
                  • {item}
                </Line>
              ))}
            </div>
            <Divider />
          </>
        )}

        {/* Payment section */}
        {payment.length > 0 && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: 'rgb(34, 197, 94)',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em',
                }}
              >
                PAYMENT:
              </div>
              {payment.map((item, i) => (
                <Line
                  key={i}
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgb(34, 197, 94)',
                    marginBottom: '0.25rem',
                  }}
                >
                  ✓ {item}
                </Line>
              ))}
            </div>
            <Divider />
          </>
        )}

        {/* Warnings section */}
        {warnings.length > 0 && (
          <>
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '3px',
                padding: '0.75rem',
                marginBottom: footer ? '1rem' : 0,
              }}
            >
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: 'rgb(239, 68, 68)',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em',
                }}
              >
                ⚠ WARNINGS:
              </div>
              {warnings.map((warning, i) => (
                <Line
                  key={i}
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgb(252, 129, 129)',
                    marginBottom: i < warnings.length - 1 ? '0.25rem' : 0,
                  }}
                >
                  {warning}
                </Line>
              ))}
            </div>
          </>
        )}

        {Boolean(children) && (
          <div style={{ margin: '1rem 0' }}>
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <>
            {warnings.length === 0 && <Divider />}
            <div style={{ textAlign: 'center' }}>
              <Line
                style={{
                  fontSize: '0.75rem',
                  color: 'rgb(148, 163, 184)',
                  fontStyle: 'italic',
                }}
              >
                {footer}
              </Line>
            </div>
          </>
        )}

        {/* Watermark effect */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            fontSize: '4rem',
            fontWeight: 'bold',
            color: classColor,
            opacity: 0.03,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          {classification}
        </div>
      </div>
    </div>
  );
}
