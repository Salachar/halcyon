import { Line, Divider } from '@shadowsea/ShadowSeaComponents';

/**
 * VIPList - Guest list for events, parties, or restricted access
 *
 * Props:
 * - eventName: String (e.g., "Steel Jackhammer's Penthouse Party")
 * - location: String (e.g., "Peach Trees - Unit 4201")
 * - date: String (optional, e.g., "Nov 16, 2067")
 * - vips: Array of VIP objects
 *   - name: String
 *   - alias: String (optional, stage name/nickname)
 *   - status: String (EXPECTED, ARRIVED, LEFT, BANNED)
 *   - notes: String (brief description/intel)
 *   - clearance: String (optional, VIP/GUEST/STAFF)
 */
export default function VIPList({
  eventName = 'VIP Event',
  location,
  date,
  vips = [],
  children,
}) {
  const getStatusColor = (status) => {
    const statusColors = {
      'EXPECTED': 'rgb(148, 163, 184)',
      'ARRIVED': 'rgb(34, 197, 94)',
      'LEFT': 'rgb(251, 191, 36)',
      'BANNED': 'rgb(239, 68, 68)',
    };
    return statusColors[status] || 'rgb(148, 163, 184)';
  };

  return (
    <div
      style={{
        border: '2px solid rgb(100, 116, 139)',
        borderRadius: '4px',
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: 'rgb(51, 65, 85)',
          padding: '0.75rem 1rem',
          borderBottom: '1px solid rgb(100, 116, 139)',
        }}
      >
        <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
          VIP GUEST LIST
        </Line>
        <Line smoke large bold style={{ margin: 0 }}>
          [{eventName.toUpperCase()}]
        </Line>
        {(location || date) && (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {location && (
              <Line cyan style={{ margin: 0, fontSize: '0.75rem' }}>
                {location}
              </Line>
            )}
            {date && (
              <Line yellow style={{ margin: 0, fontSize: '0.75rem' }}>
                {date}
              </Line>
            )}
          </div>
        )}
      </div>

      <div style={{ padding: '1rem' }}>
        {/* VIP grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {vips.map((vip, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                borderBottom: '1px solid rgb(71, 85, 105)',
                borderRadius: '3px',
              }}
            >
              {/* Status indicator */}
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: getStatusColor(vip.status),
                  boxShadow: `0 0 8px ${getStatusColor(vip.status)}`,
                  flexShrink: 0,
                }}
              />

              {/* Name & Alias */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    color: 'rgb(79, 209, 197)',
                    fontFamily: 'monospace',
                  }}
                >
                  {vip.name}
                  {vip.alias && (
                    <span
                      style={{
                        marginLeft: '0.5rem',
                        fontSize: '0.75rem',
                        color: 'rgb(148, 163, 184)',
                        fontStyle: 'italic',
                        fontWeight: 'normal',
                      }}
                    >
                      "{vip.alias}"
                    </span>
                  )}
                </div>
                {vip.notes && (
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgb(203, 213, 225)',
                      marginTop: '0.25rem',
                    }}
                  >
                    {vip.notes}
                  </div>
                )}
              </div>

              {/* Clearance level (if provided) */}
              {vip.clearance && (
                <div
                  style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    color: 'rgb(251, 191, 36)',
                    backgroundColor: 'rgba(251, 191, 36, 0.15)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '3px',
                    fontFamily: 'monospace',
                  }}
                >
                  {vip.clearance}
                </div>
              )}

              {/* Status badge */}
              <div
                style={{
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  color: getStatusColor(vip.status),
                  backgroundColor: `${getStatusColor(vip.status)}20`,
                  border: `1px solid ${getStatusColor(vip.status)}`,
                  borderRadius: '3px',
                  minWidth: '80px',
                  textAlign: 'center',
                  fontFamily: 'monospace',
                }}
              >
                {vip.status}
              </div>
            </div>
          ))}
        </div>

        {Boolean(children) && (
          <div style={{
            margin: '1rem 0',
          }}>
            {children }
          </div>
        )}
      </div>
    </div>
  );
}
