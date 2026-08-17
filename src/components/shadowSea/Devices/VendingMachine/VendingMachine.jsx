import { useState } from 'react';
import { Line, Divider } from '@shadowsea/ShadowSeaComponents';
import './vendingMachine.css';

/**
 * VendingMachine - Interactive vending machine interface
 *
 * Props:
 * - id: String (e.g., "vm-lobby-01") - Also used to deterministically pick model
 * - location: String (optional, e.g., "Office Lobby")
 * - temperature: Number (0-100, affects cooling bar, default: 35)
 * - drinks: Array of drink objects
 *   - name: String
 *   - pattern: String ("circles", "waves", "swirl", "zigzag", "bubbles", "stripe")
 *   - color: String ("red", "blue", "green", "yellow", "orange", "purple")
 *   - available: Boolean (default: true)
 * - children: React nodes (for ads, promotions, etc.)
 */
export default function VendingMachine({
  id = 'vm-unknown',
  location,
  temperature = 35,
  drinks = [
    { name: 'ENERGY Z++', pattern: 'lines', color: 'yellow', available: true },
    { name: 'COLA SYNTH', pattern: 'blocks', color: 'red', available: true },
    { name: 'CYBORANGE', pattern: 'circles', color: 'orange', available: true },
    { name: 'WATER', pattern: 'waves', color: 'blue', available: true },
  ],
  children,
}) {
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [dispensing, setDispensing] = useState(false);

  const getModel = () => {
    const models = [
      'VENDTRON-2000',
      'QUICKSERVE-X',
      'CHILLMAX-500',
      'DISPENSE-PRO',
      'BEVERAGE-3000',
      'AUTOSERV-ELITE',
    ];
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return models[hash % models.length];
  };

  const handleDrinkSelect = (drink, index) => {
    if (!drink.available || dispensing) return;
    setSelectedDrink(index);
    setDispensing(true);
    setTimeout(() => {
      setDispensing(false);
      setSelectedDrink(null);
    }, 2000);
  };

  const getSlotLabel = (index) => {
    const row = String.fromCharCode(65 + Math.floor(index / 2));
    const col = (index % 2) + 1;
    return `${row}${col}`;
  };

  const getTempStatus = () => {
    if (temperature <= 40) return { color: '#3b82f6', label: 'OPTIMAL', glow: 'rgba(59, 130, 246, 0.6)' };
    if (temperature <= 60) return { color: '#10b981', label: 'COOL', glow: 'rgba(16, 185, 129, 0.6)' };
    if (temperature <= 75) return { color: '#fbbf24', label: 'MODERATE', glow: 'rgba(251, 191, 36, 0.6)' };
    return { color: '#ef4444', label: 'WARM', glow: 'rgba(239, 68, 68, 0.6)' };
  };

  const model = getModel();
  const tempStatus = getTempStatus();

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
        <div className="vending-header">
          <div style={{ flex: 1 }}>
            <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
              VENDING MACHINE
            </Line>
            <Line smoke large bold style={{ margin: 0 }}>
              [MODEL {model}]
            </Line>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="vending-status-light vending-status-light-active" />
            <div className="vending-status-light vending-status-light-active" />
            <div className="vending-status-light" />
          </div>
        </div>

        <div style={{ padding: '1rem' }}>

          {/* Machine info */}
          <div className="vending-info-grid" style={{ marginBottom: '0.75rem' }}>
            <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>UNIT ID:</Line>
            <Line cyan style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500, fontFamily: 'monospace' }}>{id}</Line>

            {location && (<>
              <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>LOCATION:</Line>
              <Line cyan style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500 }}>{location}</Line>
            </>)}

            <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>STATUS:</Line>
            <Line style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500, color: 'rgb(34, 197, 94)' }}>OPERATIONAL</Line>

            <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>COOLING:</Line>
            <Line style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500, color: tempStatus.color }}>{tempStatus.label}</Line>
          </div>

          {/* Horizontal temp bar */}
          <div className="vending-temp-bar">
            <div
              className="vending-temp-bar-fill"
              style={{
                width: `${100 - temperature}%`,
                backgroundColor: tempStatus.color,
                boxShadow: `0 0 10px ${tempStatus.glow}`,
              }}
            />
            <span className="vending-temp-label">{temperature}°F</span>
          </div>

          {/* Display area */}
          <div className="vending-display">
            {selectedDrink !== null && drinks[selectedDrink] ? (
              <div className={`vending-display-can drink-can-${drinks[selectedDrink].color} drink-pattern-${drinks[selectedDrink].pattern}`}>
                <div className="vending-display-banner">
                  <div className="vending-display-banner-text">DISPENSING</div>
                  <div className="vending-display-banner-drink">{drinks[selectedDrink].name}</div>
                </div>
              </div>
            ) : (
              <div className="vending-display-ready">
                {dispensing ? 'DISPENSING...' : 'READY'}
              </div>
            )}
          </div>

          {/* Drinks grid */}
          <div className="vending-drinks-grid">
            {drinks.map((drink, index) => (
              <button
                key={index}
                className={`vending-drink-button ${!drink.available ? 'vending-drink-sold-out' : ''} ${selectedDrink === index ? 'vending-drink-selected' : ''}`}
                onClick={() => handleDrinkSelect(drink, index)}
                disabled={!drink.available || dispensing}
              >
                <div className="vending-drink-slot">{getSlotLabel(index)}</div>
                <div className={`drink-can drink-can-${drink.color} drink-pattern-${drink.pattern}`} />
                <div className="vending-drink-name">{drink.name}</div>
                {!drink.available && <div className="vending-drink-sold-out-label">SOLD OUT</div>}
              </button>
            ))}
          </div>

          {children && (
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgb(71, 85, 105)',
                borderRadius: '3px',
              }}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
