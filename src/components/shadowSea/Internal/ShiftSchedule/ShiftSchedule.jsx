import { Line, Divider } from '@shadowsea/ShadowSeaComponents';

export default function ShiftSchedule({
  location = 'Facility',
  shift = 'Current Shift',
  shiftTime,
  currentTime,
  personnel = [],
  nextShift = 'Unknown',
}) {
  const getStatusColor = (status) => {
    const statusColors = {
      'ACTIVE': 'rgb(34, 197, 94)',
      'BREAK': 'rgb(251, 191, 36)',
      'PATROL': 'rgb(79, 209, 197)',
      'MONITORING': 'rgb(133, 175, 231)',
      'IDLE': 'rgb(148, 163, 184)',
    };
    return statusColors[status] || statusColors['ACTIVE'];
  };

  return (
    <div
      style={{
        border: '2px solid rgb(77, 167, 188)',
        borderRadius: '4px',
        backgroundColor: 'rgba(29, 35, 50, 0.5)',
        padding: '1rem',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '0.75rem' }}>
        <Line smoke large bold style={{ margin: 0 }}>
          [{location.toUpperCase()} - {shift.toUpperCase()}]
        </Line>
        {(shiftTime || currentTime) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            {shiftTime && (
              <Line cyan style={{ margin: 0, fontSize: '0.875rem' }}>
                Shift: {shiftTime}
              </Line>
            )}
            {currentTime && (
              <Line yellow style={{ margin: 0, fontSize: '0.875rem' }}>
                Current: {currentTime}
              </Line>
            )}
          </div>
        )}
      </div>

      <Divider />

      {/* Personnel grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
        {personnel.map((person, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.625rem',
              backgroundColor: 'rgba(45, 53, 72, 0.4)',
              border: '1px solid rgb(71, 85, 105)',
              borderRadius: '3px',
            }}
          >
            {/* Status indicator */}
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(person.status),
                boxShadow: `0 0 8px ${getStatusColor(person.status)}`,
                flexShrink: 0,
              }}
            />

            {/* Name & Role */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: 'rgb(133, 175, 231)',
                  fontFamily: 'monospace',
                }}
              >
                {person.name}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'rgb(148, 163, 184)',
                  fontFamily: 'monospace',
                }}
              >
                {person.role}
              </div>
            </div>

            {/* Location */}
            <div
              style={{
                fontSize: '0.75rem',
                color: 'rgb(79, 209, 197)',
                fontFamily: 'monospace',
                minWidth: '120px',
                textAlign: 'right',
              }}
            >
              {person.location}
            </div>

            {/* Status badge */}
            {person?.status && (
            <div
                style={{
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  color: getStatusColor(person.status),
                  backgroundColor: `${getStatusColor(person.status)}20`,
                  border: `1px solid ${getStatusColor(person.status)}`,
                  borderRadius: '3px',
                  minWidth: '80px',
                  textAlign: 'center',
                  fontFamily: 'monospace',
                }}
              >
                {person.status}
              </div>
            )}

            {/* Break time (if applicable) */}
            {person.breakTime && (
              <div
                style={{
                  fontSize: '0.7rem',
                  color: 'rgb(251, 191, 36)',
                  fontFamily: 'monospace',
                  minWidth: '60px',
                  textAlign: 'right',
                }}
              >
                {person.breakTime}
              </div>
            )}
          </div>
        ))}
      </div>

      <Divider />

      {/* Footer */}
      {nextShift && (
        <Line smoke style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
          Next shift change: {nextShift}
        </Line>
      )}
    </div>
  );
}
