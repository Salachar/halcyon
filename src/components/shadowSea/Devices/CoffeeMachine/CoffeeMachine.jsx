import { useState } from 'react';
import './coffeeMachine.css';

export default function CoffeeMachine({
  id = 'coffee-machine-01',
  model = 'CYBERBEAN AUTOMAT-3000',
  location,
  disabled = false,
  onPour,
  children,
}) {
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [brewing, setBrewing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fixed drink menu - 8 cyberpunk coffee options
  const drinks = [
    {
      id: 1,
      name: 'NEURO DRIP',
      desc: 'Dark roast drip',
    },
    {
      id: 2,
      name: 'SYNTH LATTE',
      desc: 'Milk, Vanilla cream'
    },
    {
      id: 3,
      name: 'BLACK VOID',
      desc: 'Espresso, Double shot'
    },
    {
      id: 4,
      name: 'DOPPIO JACK',
      desc: 'Espresso, SmartJack boost'
    },
    {
      id: 5,
      name: 'CORTEX MOCHA',
      desc: 'Chocolate, Neural boost'
    },
    {
      id: 6,
      name: 'CHROME BREW',
      desc: 'Half coffee, half oil'
    },
    {
      id: 7,
      name: 'PULSE MACCHIATO',
      desc: 'Caramel, Energy boost'
    },
    {
      id: 8,
      name: 'HACK AMERICANO',
      desc: 'Diluted'
    },
  ];

  const handleDrinkSelect = (drink) => {
    if (brewing || disabled) return;

    setSelectedDrink(drink);
    setBrewing(true);
    setProgress(0);

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setBrewing(false);
            setSelectedDrink(null);
            setProgress(0);
            if (onPour) onPour(drink);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="coffee-machine">
      {/* Header */}
      <div className="coffee-header">
        <div className="coffee-header-left">
          <div className="coffee-brand">{model}</div>
          {location && <div className="coffee-location">{location}</div>}
        </div>
        <div className="coffee-header-right">
          {disabled ? (
            <div className="coffee-status coffee-status-offline">OUT OF ORDER</div>
          ) : brewing ? (
            <div className="coffee-status coffee-status-brewing">BREWING</div>
          ) : (
            <div className="coffee-status coffee-status-ready">READY</div>
          )}
        </div>
      </div>

      {/* Content - brewing left, buttons right */}
      <div className="coffee-content">
        {/* Left - Brewing area with decorative shapes */}
        <div className="coffee-brewing-area">
          {/* Decorative background shapes */}
          <div className="coffee-decorations">
            <div className="coffee-bean coffee-bean-1"></div>
            <div className="coffee-bean coffee-bean-2"></div>
            <div className="coffee-bean coffee-bean-3"></div>
            <div className="coffee-swirl coffee-swirl-1"></div>
            <div className="coffee-swirl coffee-swirl-2"></div>
          </div>

          {brewing && selectedDrink ? (
            <div className="coffee-brewing-content">
              {/* Progress bar */}
              <div className="coffee-progress-container">
                <div className="coffee-progress-label">BREWING {selectedDrink.name}</div>
                <div className="coffee-progress-bar">
                  <div
                    className="coffee-progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="coffee-progress-percent">{progress}%</div>
              </div>

              {/* Cup fill animation */}
              <div className="coffee-cup-area">
                <div className="coffee-cup-container">
                  {/* CSS Cup */}
                  <div className="coffee-cup">
                    <div className="coffee-cup-body">
                      <div
                        className="coffee-cup-liquid"
                        style={{ height: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="coffee-cup-handle"></div>
                  </div>
                  {/* Steam */}
                  {progress > 30 && (
                    <div className="coffee-steam">
                      <div className="steam-line steam-line-1"></div>
                      <div className="steam-line steam-line-2"></div>
                      <div className="steam-line steam-line-3"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="coffee-idle-message">
              <div className="coffee-idle-text">SELECT BEVERAGE</div>
              <div className="coffee-idle-subtext">Touch button to begin brewing</div>
            </div>
          )}
        </div>

        {/* Right - Drink grid 2x4 */}
        <div className="coffee-selection-area">
          <div className="coffee-grid">
            {drinks.map((drink) => (
              <button
                key={drink.id}
                className={`coffee-drink-button ${selectedDrink?.id === drink.id ? 'coffee-drink-selected' : ''}`}
                onClick={() => handleDrinkSelect(drink)}
                disabled={brewing || disabled}
              >
                <div className="coffee-drink-name">{drink.name}</div>
                <div className="coffee-drink-desc">{drink.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {Boolean(children) && (
        <div style={{
          margin: '1rem',
          padding: '1rem',
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '6px',
        }}>
          {children}
        </div>
      )}

      {/* Footer */}
      <div className="coffee-footer">
        <div className="coffee-footer-text">Premium synthetic beans · Nanobrew technology</div>
      </div>
    </div>
  );
}
