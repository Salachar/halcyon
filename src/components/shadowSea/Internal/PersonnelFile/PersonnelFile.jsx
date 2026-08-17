import { Line, Divider, DataTable, Box, Section } from '@shadowsea/ShadowSeaComponents';

/**
 * PersonnelFile - Internal HR employee record
 *
 * Props:
 * - employeeId: String
 * - name: String
 * - position: String
 * - department: String
 * - supervisor: String
 * - clearanceLevel: Number or String (1-5, or "NONE")
 * - salary: String (optional)
 * - location: String (optional)
 * - email: String (optional)
 * - phone: String (optional)
 * - emergencyContact: String (optional)
 * - performance: Number (optional, 0-100)
 * - notes: Array of strings (optional)
 * - status: String (ACTIVE, SUSPENDED, TERMINATED)
 */
export default function PersonnelFile({
  employeeId,
  name,
  position,
  occupation,
  department,
  joinDate,
  supervisor,
  clearanceLevel,
  salary,
  location,
  email = "NOT SET",
  phone = "NOT SET",
  emergencyContact = "NOT SET",
  performance,
  notes = [],
  status = 'ACTIVE',
}) {
  const getStatusColor = () => {
    switch (status) {
      case 'ACTIVE':
        return 'rgb(34, 197, 94)';
      case 'SUSPENDED':
        return 'rgb(251, 191, 36)';
      case 'TERMINATED':
        return 'rgb(239, 68, 68)';
      default:
        return 'rgb(148, 163, 184)';
    }
  };

  const getClearanceColor = () => {
    if (typeof clearanceLevel === 'number') {
      if (clearanceLevel >= 4) return 'rgb(239, 68, 68)';
      if (clearanceLevel >= 2) return 'rgb(251, 191, 36)';
      return 'rgb(59, 130, 246)';
    }
    return 'rgb(148, 163, 184)';
  };

  const getPerformanceRating = () => {
    if (!performance) return null;
    if (performance >= 90) return 'Exceptional';
    if (performance >= 75) return 'Exceeds Expectations';
    if (performance >= 60) return 'Meets Expectations';
    if (performance >= 40) return 'Needs Improvement';
    return 'Unsatisfactory';
  };

  const statusColor = getStatusColor();
  const clearanceColor = getClearanceColor();

  const emp_info = [];
  if (name) emp_info.push({ label: 'Name', value: name });
  if (position) emp_info.push({ label: 'Position', value: position });
  if (occupation) emp_info.push({ label: 'Occupation', value: occupation });
  if (department) emp_info.push({ label: 'Department', value: department });
  if (supervisor) emp_info.push({ label: 'Supervisor', value: supervisor });
  if (joinDate) emp_info.push({ label: 'Joined On', value: joinDate });
  if (location) emp_info.push({ label: 'Location', value: location });

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
        {/* Header */}
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
              PERSONNEL RECORD
            </Line>
            <Line smoke large bold style={{ margin: 0 }}>
              [{employeeId}]
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
          {/* Basic Information */}
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
              INFORMATION
            </Line>
            <Divider />
            <DataTable
              data={emp_info}
            />
          </div>

          {/* Contact Information */}
          {(email || phone || emergencyContact) && (
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
                CONTACT
              </Line>
              <Divider />
              <DataTable
                data={[
                  ...(email ? [{ label: 'Email', value: email }] : []),
                  ...(phone ? [{ label: 'Phone', value: phone }] : []),
                  ...(emergencyContact ? [{ label: 'Emergency', value: emergencyContact }] : []),
                ]}
              />
            </div>
          )}

          {(clearanceLevel || performance || salary) && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {clearanceLevel && (
                <div
                  style={{
                    flex: '1 1 150px',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: `1px solid ${clearanceColor}`,
                    borderRadius: '3px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'rgb(148, 163, 184)', marginBottom: '0.25rem' }}>
                    CLEARANCE
                  </div>
                  <div
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: clearanceColor,
                      fontFamily: 'monospace',
                    }}
                  >
                    LEVEL {clearanceLevel}
                  </div>
                </div>
              )}

              {performance && (
                <div
                  style={{
                    flex: '1 1 150px',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgb(79, 209, 197)',
                    borderRadius: '3px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'rgb(148, 163, 184)', marginBottom: '0.25rem' }}>
                    PERFORMANCE
                  </div>
                  <div
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: 'rgb(79, 209, 197)',
                      fontFamily: 'monospace',
                    }}
                  >
                    {performance}%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgb(148, 163, 184)', fontStyle: 'italic' }}>
                    {getPerformanceRating()}
                  </div>
                </div>
              )}

              {salary && (
                <div
                  style={{
                    flex: '1 1 150px',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgb(251, 191, 36)',
                    borderRadius: '3px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'rgb(148, 163, 184)', marginBottom: '0.25rem' }}>
                    SALARY
                  </div>
                  <div
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: 'rgb(251, 191, 36)',
                      fontFamily: 'monospace',
                    }}
                  >
                    {salary}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* HR Notes */}
          {notes.length > 0 && (
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgb(71, 85, 105)',
                borderRadius: '3px',
                padding: '0.75rem',
                marginTop: "1rem",
              }}
            >
              <Line cyan bold style={{ margin: 0, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                NOTES
              </Line>
              <Divider />
              {notes.map((note, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '0.5rem',
                    paddingLeft: '0.5rem',
                    borderLeft: '2px solid rgb(251, 191, 36)',
                  }}
                >
                  <span style={{ color: 'rgb(251, 191, 36)', fontSize: '0.75rem', flexShrink: 0 }}>
                    •
                  </span>
                  <Line yellow style={{ margin: 0, fontSize: '0.875rem' }}>
                    {note}
                  </Line>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
