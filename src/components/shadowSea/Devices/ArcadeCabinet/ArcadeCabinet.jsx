import React from 'react';

import { Line, Divider, InsetBox } from '@shadowsea/ShadowSeaComponents';
import Extractable from '../../Extractable/Extractable';

export default function ArcadeCabinet({
  id,
  name = 'ARCADE CABINET',
  location = 'Unknown Location',
  credits = 0,
  screenState = 'OPEN',
  gamesAvailable = [
    'NEON FIGHTER II TURBO',
    'CYBER RACER X',
    'SPACE INVADER 2088',
    'TETRIS NEON',
    'STREET BRAWLER EX',
    'MEGA RUNNER DELUXE',
  ],
  lastPlayed = 'Unknown',
  user = 'GUEST',
}) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Cabinet container */}
      <div
        style={{
          border: '3px solid rgb(251, 146, 60)',
          borderRadius: '8px',
          padding: '1.5rem',
          backgroundColor: 'rgba(20, 10, 30, 0.9)',
          position: 'relative',
          boxShadow: '0 0 20px rgba(251, 146, 60, 0.4)',
        }}
      >
        {/* Cabinet header */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Line
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'rgb(251, 146, 60)',
              textShadow: '0 0 10px rgb(251, 146, 60)',
              letterSpacing: '0.2em',
              margin: 0,
            }}
          >
            ◄◄ {name} ►►
          </Line>
          <Line cyan style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {location}
          </Line>
        </div>

        <Divider />

        {/* Status panel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0.75rem',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          {/* Player account */}
          <div
            style={{
              padding: '0.5rem',
              backgroundColor: 'rgba(79, 209, 197, 0.1)',
              border: '1px solid rgba(79, 209, 197, 0.3)',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '0.65rem',
                color: 'rgb(148, 163, 184)',
                marginBottom: '0.25rem',
              }}
            >
              PLAYER
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 'bold',
                color: 'rgb(79, 209, 197)',
                fontFamily: 'monospace',
              }}
            >
              {user}
            </div>
          </div>

          {/* Screen state */}
          <div
            style={{
              padding: '0.5rem',
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '0.65rem',
                color: 'rgb(148, 163, 184)',
                marginBottom: '0.25rem',
              }}
            >
              STATUS
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 'bold',
                color: 'rgb(251, 191, 36)',
                fontFamily: 'monospace',
              }}
            >
              {screenState}
            </div>
          </div>

          {/* Last played */}
          <div
            style={{
              padding: '0.5rem',
              backgroundColor: 'rgba(148, 163, 184, 0.1)',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '0.65rem',
                color: 'rgb(148, 163, 184)',
                marginBottom: '0.25rem',
              }}
            >
              LAST PLAYED
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 'bold',
                color: 'rgb(148, 163, 184)',
                fontFamily: 'monospace',
              }}
            >
              {lastPlayed}
            </div>
          </div>
        </div>

        {/* Available games */}
        {gamesAvailable.length > 0 && (
          <InsetBox title="GAMES AVAILABLE ON THIS CABINET:">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginTop: '0.5rem',
              }}
            >
              {gamesAvailable.map((game, i) => (
                <span
                  key={i}
                  style={{
                    padding: '0.35rem 0.6rem',
                    fontSize: '0.75rem',
                    backgroundColor: 'rgba(45, 53, 72, 0.4)',
                    border: '1px solid rgb(71, 85, 105)',
                    borderRadius: '3px',
                    color: 'rgb(133, 175, 231)',
                    fontFamily: 'monospace',
                  }}
                >
                  {game}
                </span>
              ))}
            </div>
          </InsetBox>
        )}

        {/* Wallet section - using Extractable component */}
        {Boolean(credits && credits > 0) && (
          <Extractable
            id={`${id}-arcade-extractable`}
            digitalItems={[
              {
                id: `${id}-arcade-credits-item`,
                label: 'Last Account Connected',
                description: `${credits} credits available`,
                value: credits,
                isCredits: true,
              }
            ]}
          />
        )}

        {/* Footer */}
        <Line
          smoke
          style={{
            fontSize: '0.7rem',
            textAlign: 'center',
            marginTop: '1rem',
            fontStyle: 'italic',
          }}
        >
          Remote cabinet monitor • Physical gameplay at {location}
        </Line>
      </div>
    </div>
  );
}
