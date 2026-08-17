import { Line, Divider } from '@shadowsea/ShadowSeaComponents';

const CONDITION_COLORS = {
  'MINT': 'rgb(34, 197, 94)',
  'GOOD': 'rgb(79, 209, 197)',
  'WORN': 'rgb(251, 191, 36)',
  'DAMAGED': 'rgb(251, 146, 60)',
  'NON-FUNCTIONAL': 'rgb(239, 68, 68)',
  'UNKNOWN': 'rgb(148, 163, 184)',
};

export default function Inventory({
  title = 'STOCK LISTING',
  subtitle,
  items = [],
  footer,
  note,
  internal = false,
}) {
  return (
    <div style={{
      fontFamily: "'Courier New', Courier, monospace",
      border: '1px solid rgba(79, 209, 197, 0.3)',
      borderRadius: '4px',
      padding: '1rem',
      backgroundColor: 'rgba(29, 35, 50, 0.3)',
    }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
        <div style={{
          fontSize: '1rem',
          fontWeight: 'bold',
          color: 'rgb(79, 209, 197)',
          textShadow: '0 0 6px rgba(79, 209, 197, 0.4)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontSize: '0.72rem',
            color: 'rgb(148, 163, 184)',
            marginTop: '0.2rem',
          }}>
            {subtitle}
          </div>
        )}
      </div>

      <Divider />

      {/* Column headers */}
      {!internal && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: internal ? '1fr 120px' : '1fr 120px 120px',
          padding: '0.2rem 0.4rem',
          marginBottom: '0.25rem',
        }}>
          <span style={{ fontSize: '0.6rem', color: 'rgb(100, 116, 139)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            ITEM
          </span>
          <span style={{ fontSize: '0.6rem', color: 'rgb(100, 116, 139)', letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center' }}>
            CONDITION
          </span>
          <span style={{ fontSize: '0.6rem', color: 'rgb(100, 116, 139)', letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'right' }}>
            PRICE
          </span>
        </div>
      )}

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
        {items.map((item, i) => {
          const condColor = CONDITION_COLORS[item.condition?.toUpperCase()] || CONDITION_COLORS['UNKNOWN'];
          return (
            <div key={i} style={{
              borderBottom: '1px solid rgba(79, 209, 197, 0.08)',
              padding: '0.35rem 0.4rem',
              backgroundColor: i % 2 === 0 ? 'rgba(79, 209, 197, 0.02)' : 'transparent',
            }}>
              <div style={{
                display: 'grid',
                // gridTemplateColumns: '1fr 120px 120px',
                gridTemplateColumns: internal ? '1fr 120px' : '1fr 120px 120px',
                alignItems: 'baseline',
              }}>
                {/* Name */}
                <span style={{
                  fontSize: '0.8rem',
                  color: 'rgb(226, 232, 240)',
                }}>
                  {item.label}
                </span>
                {/* Condition */}
                <span style={{
                  fontSize: '0.65rem',
                  color: condColor,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                }}>
                  {item.condition?.toUpperCase() || ''}
                </span>
                {/* Price */}
                {!internal && (
                  <span style={{
                    fontSize: '0.8rem',
                    color: item.value === 'NOT FOR SALE' || item.value === 'MAKE OFFER'
                      ? 'rgb(148, 163, 184)'
                      : 'rgb(251, 191, 36)',
                    textAlign: 'right',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.value || '—'}
                  </span>
                )}
              </div>
              {/* Note */}
              {item.description && (
                <div style={{
                  fontSize: '0.7rem',
                  color: 'rgb(100, 116, 139)',
                  marginTop: '0.15rem',
                  paddingLeft: '0.5rem',
                  borderLeft: '2px solid rgba(79, 209, 197, 0.2)',
                  fontStyle: 'italic',
                }}>
                  {item.description}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Note */}
      {note && (
        <>
          <Divider />
          <div style={{
            fontSize: '0.72rem',
            color: 'rgb(100, 116, 139)',
            fontStyle: 'italic',
            padding: '0.25rem 0.4rem',
          }}>
            {note}
          </div>
        </>
      )}

      {/* Footer */}
      {footer && (
        <>
          <Divider />
          <div style={{
            textAlign: 'center',
            fontSize: '0.72rem',
            color: 'rgb(148, 163, 184)',
            letterSpacing: '0.08em',
          }}>
            {footer}
          </div>
        </>
      )}
    </div>
  );
}
