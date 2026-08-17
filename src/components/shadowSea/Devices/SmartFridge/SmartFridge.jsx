import { Line, Divider } from '@shadowsea/ShadowSeaComponents';
import Extractable from '../../Extractable/Extractable';

export default function SmartFridge({
  id = 'fridge-unknown',
  model = 'CoolTech Pro-5000',
  location,
  temperature = 38,
  physicalItems = [],
  freezerItems = [],
  freezerTemp = 0,
  notes,
}) {
  const getTempStatus = (temp, isFreezer = false) => {
    if (isFreezer) {
      if (temp <= 10) return { color: 'rgb(59, 130, 246)', label: 'FROZEN' };
      if (temp <= 32) return { color: 'rgb(34, 197, 94)', label: 'FREEZING' };
      return { color: 'rgb(251, 191, 36)', label: 'THAWING' };
    }
    if (temp <= 40) return { color: 'rgb(59, 130, 246)', label: 'OPTIMAL' };
    if (temp <= 50) return { color: 'rgb(34, 197, 94)', label: 'COOL' };
    if (temp <= 60) return { color: 'rgb(251, 191, 36)', label: 'WARM' };
    return { color: 'rgb(239, 68, 68)', label: 'CRITICAL' };
  };

  const tempStatus = getTempStatus(temperature);
  const freezerStatus = getTempStatus(freezerTemp, true);

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
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div style={{ flex: 1 }}>
              <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
                SMART REFRIGERATOR
              </Line>
              <Line smoke large bold style={{ margin: 0 }}>
                [MODEL {model}]
              </Line>
            </div>

            {/* Status indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(34, 197, 94)',
                  boxShadow: '0 0 8px rgb(34, 197, 94)',
                }}
              />
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: 'rgb(34, 197, 94)',
                  fontFamily: 'monospace',
                }}
              >
                ONLINE
              </span>
            </div>
          </div>

          {/* Temperature displays */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {/* Fridge temp */}
            <div
              style={{
                padding: '0.5rem',
                borderRadius: '3px',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: `1px solid ${tempStatus.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
                FRIDGE:
              </Line>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: tempStatus.color,
                    fontFamily: 'monospace',
                  }}
                >
                  {temperature}°F
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    color: tempStatus.color,
                  }}
                >
                  {tempStatus.label}
                </span>
              </div>
            </div>

            {/* Freezer temp */}
            {freezerItems.length > 0 && (
              <div
                style={{
                  padding: '0.5rem',
                  borderRadius: '3px',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: `1px solid ${freezerStatus.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
                  FREEZER:
                </Line>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: freezerStatus.color,
                      fontFamily: 'monospace',
                    }}
                  >
                    {freezerTemp}°F
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      color: freezerStatus.color,
                    }}
                  >
                    {freezerStatus.label}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '1rem' }}>
          {/* System info */}
          {location && (
            <div style={{ marginBottom: '1rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '0.5rem 1rem',
                }}
              >
                <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
                  LOCATION:
                </Line>
                <Line cyan style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500 }}>
                  {location}
                </Line>

                <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
                  INVENTORY:
                </Line>
                <Line cyan style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500 }}>
                  {physicalItems.length} item{physicalItems.length !== 1 ? 's' : ''} in fridge
                  {freezerItems.length > 0 && `, ${freezerItems.length} item${freezerItems.length !== 1 ? 's' : ''} in freezer`}
                </Line>
              </div>
            </div>
          )}

          {/* Refrigerator contents */}
          {physicalItems.length > 0 && (
            <div
              style={{
                marginBottom: freezerItems.length > 0 ? '1.5rem' : '0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}
              >
                <div
                  style={{
                    width: '4px',
                    height: '20px',
                    backgroundColor: tempStatus.color,
                    borderRadius: '2px',
                  }}
                />
                <Line cyan bold style={{ margin: 0, fontSize: '0.95rem' }}>
                  REFRIGERATOR COMPARTMENT
                </Line>
              </div>

              <Extractable
                id={`${id}-fridge`}
                physicalItems={physicalItems}
              />
            </div>
          )}

          {/* Freezer contents */}
          {freezerItems.length > 0 && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}
              >
                <div
                  style={{
                    width: '4px',
                    height: '20px',
                    backgroundColor: freezerStatus.color,
                    borderRadius: '2px',
                  }}
                />
                <Line style={{ margin: 0, fontSize: '0.95rem', fontWeight: 'bold', color: 'rgb(147, 197, 253)' }}>
                  FREEZER COMPARTMENT
                </Line>
              </div>

              <Extractable
                id={`${id}-freezer`}
                physicalItems={freezerItems}
              />
            </div>
          )}

          {/* Notes */}
          {notes && (
            <>
              <Divider />
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(79, 209, 197, 0.1)',
                  border: '1px solid rgba(79, 209, 197, 0.3)',
                  borderRadius: '3px',
                }}
              >
                <Line cyan style={{ margin: 0, fontSize: '0.875rem', fontStyle: 'italic' }}>
                  💬 {notes}
                </Line>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
