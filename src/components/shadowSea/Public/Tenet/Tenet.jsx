import { Line, Divider, DataTable } from '@shadowsea/ShadowSeaComponents';

/**
 * Tenet - Building resident directory lookup
 *
 * Public-facing resident information at apartment/building entrance.
 * Similar to intercom directory systems.
 *
 * Props:
 * - id: String (resident ID or unit number)
 * - name: String
 * - unit: String (optional, unit/apartment number)
 * - building: String (optional, building name/number)
 * - moveInDate: String (optional)
 * - status: String (ACTIVE, MOVED_OUT, SUSPENDED)
 * - intercomEnabled: Boolean (default: true)
 * - emergencyContact: String (optional, emergency contact info)
 * - notes: String (optional, public notes like "Deliveries: Leave at door")
 */
export default function Tenet({
  id,
  name,
  unit,
  building,
  moveInDate,
  status = 'ACTIVE',
  intercomEnabled = true,
  emergencyContact,
  notes,
}) {
  const getStatusColor = () => {
    switch (status) {
      case 'ACTIVE':
        return 'rgb(34, 197, 94)';
      case 'MOVED_OUT':
        return 'rgb(148, 163, 184)';
      case 'SUSPENDED':
        return 'rgb(239, 68, 68)';
      default:
        return 'rgb(148, 163, 184)';
    }
  };

  const statusColor = getStatusColor();

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          border: '2px solid rgb(100, 116, 139)',
          borderRadius: '4px',
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          overflow: 'hidden',
        }}
      >
        {/* Header - Building Directory Style */}
        <div
          style={{
            backgroundColor: 'rgb(51, 65, 85)',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid rgb(100, 116, 139)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
              RESIDENT DIRECTORY
            </Line>
            <Line smoke large bold style={{ margin: 0 }}>
              {building ? `[${building}]` : '[BUILDING DIRECTORY]'}
            </Line>
          </div>

          {/* Status indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: statusColor,
                boxShadow: `0 0 8px ${statusColor}`,
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 'bold',
                color: statusColor,
                fontFamily: 'monospace',
              }}
            >
              {status}
            </span>
          </div>
        </div>

        <div style={{ padding: '1rem' }}>
          {/* Resident Information */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgb(71, 85, 105)',
              borderRadius: '3px',
              padding: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            <Line cyan bold style={{ margin: 0, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
              RESIDENT INFORMATION
            </Line>
            <Divider />
            <DataTable
              data={[
                { label: 'Name', value: name },
                { label: 'Resident ID', value: id },
                ...(unit ? [{ label: 'Unit', value: unit }] : []),
                ...(moveInDate ? [{ label: 'Move-In Date', value: moveInDate }] : []),
              ]}
            />
          </div>

          {/* Intercom Access */}
          {status === 'ACTIVE' && (
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgb(71, 85, 105)',
                borderRadius: '3px',
                padding: '0.75rem',
                marginBottom: notes || emergencyContact ? '1rem' : '0',
              }}
            >
              <Line cyan bold style={{ margin: 0, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                INTERCOM ACCESS
              </Line>
              <Divider />

              {intercomEnabled ? (
                <div style={{ marginTop: '0.5rem' }}>
                  <Line neon style={{ margin: 0, marginBottom: '0.5rem' }}>
                    ✓ Intercom enabled for this unit
                  </Line>
                  <div
                    style={{
                      padding: '0.5rem',
                      backgroundColor: 'rgba(79, 209, 197, 0.1)',
                      border: '1px solid rgba(79, 209, 197, 0.3)',
                      borderRadius: '3px',
                    }}
                  >
                    <Line cyan style={{ margin: 0, fontSize: '0.875rem' }}>
                      Press CALL button on intercom panel to connect
                    </Line>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: '0.5rem' }}>
                  <Line yellow style={{ margin: 0 }}>
                    ⚠ Intercom disabled - Contact building management
                  </Line>
                </div>
              )}
            </div>
          )}

          {/* Emergency Contact */}
          {emergencyContact && (
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgb(71, 85, 105)',
                borderRadius: '3px',
                padding: '0.75rem',
                marginBottom: notes ? '1rem' : '0',
              }}
            >
              <Line cyan bold style={{ margin: 0, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                EMERGENCY CONTACT
              </Line>
              <Divider />
              <Line yellow style={{ margin: 0, marginTop: '0.5rem' }}>
                {emergencyContact}
              </Line>
            </div>
          )}

          {/* Public Notes */}
          {notes && (
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgb(71, 85, 105)',
                borderRadius: '3px',
                padding: '0.75rem',
              }}
            >
              <Line cyan bold style={{ margin: 0, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                DELIVERY NOTES
              </Line>
              <Divider />
              <div
                style={{
                  marginTop: '0.5rem',
                  paddingLeft: '0.5rem',
                  borderLeft: '2px solid rgb(251, 191, 36)',
                }}
              >
                <Line yellow style={{ margin: 0, fontSize: '0.875rem' }}>
                  {notes}
                </Line>
              </div>
            </div>
          )}

          {/* Moved Out / Suspended Message */}
          {status !== 'ACTIVE' && (
            <div
              style={{
                padding: '0.75rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '3px',
                marginTop: '1rem',
              }}
            >
              <Line red bold style={{ margin: 0, fontSize: '0.875rem' }}>
                {status === 'MOVED_OUT'
                  ? '⚠ RESIDENT NO LONGER AT THIS ADDRESS'
                  : '⚠ ACCESS SUSPENDED - CONTACT BUILDING MANAGEMENT'}
              </Line>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '0.75rem 1rem',
            borderTop: '1px solid rgb(100, 116, 139)',
            backgroundColor: 'rgb(51, 65, 85)',
            textAlign: 'center',
          }}
        >
          <Line smoke style={{ fontSize: '0.7rem', margin: 0 }}>
            Building Management: For access issues, contact front desk
          </Line>
        </div>
      </div>
    </div>
  );
}
