import { useState, useEffect } from 'react';
import { Line, Divider, Section } from '@shadowsea/ShadowSeaComponents';

export default function GameConsole({
  model = 'CyberDeck Pro X',
  owner = 'Player1',
  gameLoaded,
  rgbColor = 0,
  friends = [],
  children,
}) {
  const [systemStatus, setSystemStatus] = useState('IDLE');
  const [fanSpeed, setFanSpeed] = useState('LOW');

  // Get RGB color based on hue
  const getRgbColor = () => {
    return `hsl(${rgbColor}, 80%, 60%)`;
  };

  const handlePowerCycle = () => {
    setSystemStatus('RESTARTING');
    setFanSpeed('HIGH');
    setTimeout(() => {
      setSystemStatus('IDLE');
      setFanSpeed('LOW');
    }, 3000);
  };

  const handleStressTest = () => {
    setSystemStatus('STRESS TEST');
    setFanSpeed('MAX');
    setTimeout(() => {
      setSystemStatus('IDLE');
      setFanSpeed('LOW');
    }, 2000);
  };

  return (
      <div
        style={{
          border: `2px solid ${getRgbColor()}`,
          borderRadius: '6px',
          padding: '1rem',
          backgroundColor: 'rgba(10, 10, 15, 0.8)',
          position: 'relative',
          boxShadow: `0 0 20px ${getRgbColor()}40`,
          transition: 'box-shadow 0.05s',
        }}
      >
        {/* Header with animated RGB accent */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          {/* RGB LED indicator */}
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: getRgbColor(),
              boxShadow: `0 0 10px ${getRgbColor()}`,
            }}
          />

          <Line
            style={{
              margin: 0,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              background: `linear-gradient(90deg, ${getRgbColor()}, ${getRgbColor()}aa)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            [{model}]
          </Line>

          {/* System status indicator */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 'bold',
                color: systemStatus === 'IDLE' ? 'rgb(79, 209, 197)' : 'rgb(251, 191, 36)',
                fontFamily: 'monospace',
              }}
            >
              {systemStatus}
            </span>
          </div>
        </div>

        <Line cyan style={{
          fontSize: '0.875rem',
          marginBottom: '0.5rem',
        }}>
          Gamertag: {owner}
        </Line>

        {/* System stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          {/* CPU temp (fake) */}
          <div
            style={{
              padding: '0.5rem',
              backgroundColor: 'rgba(79, 209, 197, 0.1)',
              border: '1px solid rgba(79, 209, 197, 0.3)',
              borderRadius: '3px',
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'rgb(148, 163, 184)', marginBottom: '0.25rem' }}>
              CPU TEMP
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'rgb(79, 209, 197)' }}>
              {systemStatus === 'STRESS TEST' ? '87°C' : systemStatus === 'RESTARTING' ? '65°C' : '54°C'}
            </div>
          </div>

          {/* Fan speed */}
          <div
            style={{
              padding: '0.5rem',
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '3px',
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'rgb(148, 163, 184)', marginBottom: '0.25rem' }}>
              FAN SPEED
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'rgb(251, 191, 36)' }}>
              {fanSpeed}
            </div>
          </div>
        </div>

        {/* Game loaded */}
        <div
          style={{
            padding: '0.75rem',
            backgroundColor: gameLoaded ? 'rgba(168, 85, 247, 0.1)' : 'rgba(45, 53, 72, 0.5)',
            border: gameLoaded ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid rgba(77, 77, 77, 0.3)',
            borderRadius: '3px',
            marginBottom: '1rem',
          }}
        >
          <div style={{ fontSize: '0.7rem', color: 'rgb(148, 163, 184)', marginBottom: '0.25rem' }}>
            GAME LOADED
          </div>
          <div
            style={{
              fontSize: '0.95rem',
              fontWeight: 'bold',
              color: gameLoaded ? 'rgb(168, 85, 247)' : 'rgb(100, 100, 100)',
            }}
          >
            {gameLoaded || 'No disc inserted'}
          </div>
        </div>

        {/* Friends list */}
        {friends.length > 0 && (
          <>
            <Section title={`FRIENDS (${friends.filter(f => f.status === 'online').length}/${friends.length} ONLINE):`}>
              {friends.map((friend, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.35rem',
                  }}
                >
                  {/* Status indicator */}
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: friend.status === 'online' ? 'rgb(34, 197, 94)' : 'rgb(100, 100, 100)',
                      boxShadow:
                        friend.status === 'online' ? '0 0 6px rgb(34, 197, 94)' : 'none',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.875rem',
                      color: friend.status === 'online' ? 'rgb(79, 209, 197)' : 'rgb(148, 163, 184)',
                      fontFamily: 'monospace',
                    }}
                  >
                    {friend.name}
                  </span>
                  {friend.game && friend.status === 'online' && (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'rgb(168, 85, 247)',
                        fontStyle: 'italic',
                        marginLeft: 'auto',
                      }}
                    >
                      {friend.game}
                    </span>
                  )}
                </div>
              ))}
            </Section>
            <Divider />
          </>
        )}

        {/* System updates */}
        <div
          style={{
            padding: '0.5rem',
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '3px',
            marginBottom: '1rem',
          }}
        >
          <Line yellow style={{ fontSize: '0.8rem' }}>
            ⚠ System update available (v4.2.1)
          </Line>
          <Line yellow style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>
            Download size: 2.3GB | Install later
          </Line>
        </div>

        {Boolean(children) && (
          <div style={{
            margin: '1rem 0',
            // padding: '1rem',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '6px',
          }}>
            {children}
          </div>
        )}

        {/* Control buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handlePowerCycle}
            disabled={systemStatus !== 'IDLE'}
            style={{
              flex: 1,
              padding: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              backgroundColor: systemStatus !== 'IDLE' ? 'rgb(45, 53, 72)' : getRgbColor(),
              color: 'rgb(19, 23, 34)',
              border: 'none',
              borderRadius: '3px',
              cursor: systemStatus !== 'IDLE' ? 'not-allowed' : 'pointer',
              fontFamily: 'monospace',
              transition: 'all 0.2s',
            }}
          >
            RESTART
          </button>

          <button
            onClick={handleStressTest}
            disabled={systemStatus !== 'IDLE'}
            style={{
              flex: 1,
              padding: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              backgroundColor: systemStatus !== 'IDLE' ? 'rgb(45, 53, 72)' : 'rgb(251, 191, 36)',
              color: 'rgb(19, 23, 34)',
              border: 'none',
              borderRadius: '3px',
              cursor: systemStatus !== 'IDLE' ? 'not-allowed' : 'pointer',
              fontFamily: 'monospace',
              transition: 'all 0.2s',
            }}
          >
            STRESS TEST
          </button>
        </div>
      </div>
  );
}
