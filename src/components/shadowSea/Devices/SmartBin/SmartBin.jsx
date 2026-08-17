import { Divider } from '@shadowsea/ShadowSeaComponents';
import Extractable from '../../Extractable/Extractable';

const STATUS_COLORS = {
  'FULL':       'rgb(239, 68, 68)',
  'OVERFLOW':   'rgb(239, 68, 68)',
  'COMPACTING': 'rgb(251, 191, 36)',
  'EMPTY':      'rgb(100, 116, 139)',
  'NOMINAL':    'rgb(34, 197, 94)',
};

export default function SmartBin({
  id,
  model,
  location,
  status = 'NOMINAL',
  items = [],
  notes,
}) {
  const statusColor = STATUS_COLORS[status?.toUpperCase()] || STATUS_COLORS['NOMINAL'];
  const hasExtractable = Boolean(id && items.length > 0);
  return (
    <div style={{
      border: '2px solid rgb(100, 116, 139)',
      borderRadius: '4px',
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      overflow: 'hidden',
      fontFamily: 'monospace',
    }}>

      {/* Header */}
      <div style={{
        backgroundColor: 'rgb(51, 65, 85)',
        padding: '0.75rem 1rem',
        borderBottom: '1px solid rgb(100, 116, 139)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
      }}>
        <div>
          <div style={{
            fontSize: '0.65rem',
            color: 'rgb(148, 163, 184)',
            letterSpacing: '0.12em',
            marginBottom: '0.2rem',
            opacity: 0.7,
          }}>
            SMART WASTE RECEPTACLE
          </div>
          <div style={{
            fontSize: '0.85rem',
            fontWeight: 'bold',
            color: 'rgb(148, 163, 184)',
          }}>
            {model ? `[MODEL ${model}]` : '[WASTE RECEPTACLE]'}
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: `1px solid ${statusColor}`,
          borderRadius: '3px',
          padding: '0.3rem 0.6rem',
          flexShrink: 0,
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: statusColor,
            boxShadow: `0 0 6px ${statusColor}`,
          }} />
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 'bold',
            color: statusColor,
            letterSpacing: '0.08em',
          }}>
            {status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '0.75rem 1rem' }}>

        {location && (
          <div style={{
            fontSize: '0.72rem',
            color: 'rgb(100, 116, 139)',
            marginBottom: '0.75rem',
            letterSpacing: '0.04em',
          }}>
            {location}
          </div>
        )}

        {hasExtractable ? (
          <Extractable
            id={id}
            physicalItems={items}
          />
        ) : (
          <div style={{
            padding: '0.75rem',
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            border: '1px solid rgba(100, 116, 139, 0.3)',
            borderRadius: '3px',
            textAlign: 'center',
            fontSize: '0.72rem',
            color: 'rgb(100, 116, 139)',
            letterSpacing: '0.08em',
          }}>
            RECEPTACLE EMPTY
          </div>
        )}

        {notes && (
          <>
            <Divider />
            <div style={{
              fontSize: '0.72rem',
              color: 'rgb(100, 116, 139)',
              fontStyle: 'italic',
              marginTop: '0.5rem',
            }}>
              {notes}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
