import React, { useState, useEffect } from 'react';
import './cyberPoker.css';

const COLORS = {
  bg: {
    main: 'rgb(19, 23, 34)',
    panel: 'rgb(29, 35, 50)',
  },
  border: {
    default: 'rgb(77, 167, 188)',
  },
  text: {
    primary: 'rgb(133, 175, 231)',
    secondary: 'rgb(148, 163, 184)',
  },
  accent: {
    teal: 'rgb(79, 209, 197)',
    yellow: 'rgb(251, 191, 36)',
    red: 'rgb(252, 129, 129)',
    purple: 'rgb(168, 85, 247)',
    green: 'rgb(34, 197, 94)',
  },
};

// Cyberpunk card faces (0-9)
const CARD_FACES = [
  { value: 0, symbol: '◉', color: 'rgb(79, 209, 197)', name: 'ZERO' },
  { value: 1, symbol: '◈', color: 'rgb(251, 191, 36)', name: 'ONE' },
  { value: 2, symbol: '◆', color: 'rgb(252, 129, 129)', name: 'TWO' },
  { value: 3, symbol: '◢', color: 'rgb(168, 85, 247)', name: 'THREE' },
  { value: 4, symbol: '◣', color: 'rgb(34, 197, 94)', name: 'FOUR' },
  { value: 5, symbol: '◤', color: 'rgb(59, 130, 246)', name: 'FIVE' },
  { value: 6, symbol: '◥', color: 'rgb(251, 146, 60)', name: 'SIX' },
  { value: 7, symbol: '⬢', color: 'rgb(236, 72, 153)', name: 'SEVEN' },
  { value: 8, symbol: '⬡', color: 'rgb(139, 92, 246)', name: 'EIGHT' },
  { value: 9, symbol: '⬟', color: 'rgb(6, 182, 212)', name: 'NINE' },
];

// Payout table
const PAYOUTS = {
  'ROYAL_FLUSH': { multiplier: 250, name: 'ROYAL FLUSH' },
  'STRAIGHT_FLUSH': { multiplier: 50, name: 'STRAIGHT FLUSH' },
  'FOUR_KIND': { multiplier: 25, name: 'FOUR OF A KIND' },
  'FULL_HOUSE': { multiplier: 9, name: 'FULL HOUSE' },
  'FLUSH': { multiplier: 6, name: 'FLUSH' },
  'STRAIGHT': { multiplier: 4, name: 'STRAIGHT' },
  'THREE_KIND': { multiplier: 3, name: 'THREE OF A KIND' },
  'TWO_PAIR': { multiplier: 2, name: 'TWO PAIR' },
  'PAIR': { multiplier: 1, name: 'PAIR' },
};

export default function CyberPoker({
  startingCredits = 100,
  onClose,
}) {
  const [credits, setCredits] = useState(startingCredits);
  const [bet, setBet] = useState(5);
  const [hand, setHand] = useState([]);
  const [heldCards, setHeldCards] = useState([]);
  const [gameState, setGameState] = useState('betting'); // 'betting' | 'holding' | 'result'
  const [result, setResult] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]); // Track which cards are flipped
  const [isDealing, setIsDealing] = useState(false);

  // Generate random card
  const drawCard = () => {
    return CARD_FACES[Math.floor(Math.random() * CARD_FACES.length)];
  };

  // Deal initial hand
  const handleDeal = () => {
    if (credits < bet) return;

    setCredits(credits - bet);
    setIsDealing(true);

    // Start with cards flipped (showing backs)
    setFlippedCards([0, 1, 2, 3, 4]);

    const newHand = Array(5).fill(null).map(() => drawCard());
    setHand(newHand);
    setHeldCards([]);
    setGameState('holding');
    setResult(null);

    // Animate flip to reveal cards with stagger
    setTimeout(() => {
      setFlippedCards([1, 2, 3, 4]);
    }, 100);
    setTimeout(() => {
      setFlippedCards([2, 3, 4]);
    }, 200);
    setTimeout(() => {
      setFlippedCards([3, 4]);
    }, 300);
    setTimeout(() => {
      setFlippedCards([4]);
    }, 400);
    setTimeout(() => {
      setFlippedCards([]);
      setIsDealing(false);
    }, 500);
  };

  // Toggle card hold
  const toggleHold = (index) => {
    if (gameState !== 'holding') return;
    if (isDealing) return;

    if (heldCards.includes(index)) {
      setHeldCards(heldCards.filter(i => i !== index));
    } else {
      setHeldCards([...heldCards, index]);
    }
  };

  // Draw new cards for non-held positions
  const handleDraw = () => {
    setIsDrawing(true);

    // Get indices of cards that need to be replaced
    const cardsToReplace = [0, 1, 2, 3, 4].filter(i => !heldCards.includes(i));

    // Step 1: Flip cards that will be replaced
    setFlippedCards(cardsToReplace);

    // Step 2: After flip animation, update the symbols
    setTimeout(() => {
      const newHand = hand.map((card, index) => {
        return heldCards.includes(index) ? card : drawCard();
      });
      setHand(newHand);

      // Step 3: Flip cards back to reveal new symbols
      setTimeout(() => {
        setFlippedCards([]);
        setGameState('result');

        // Evaluate hand
        const handResult = evaluateHand(newHand);
        setResult(handResult);

        if (handResult) {
          const winAmount = bet * PAYOUTS[handResult].multiplier;
          setCredits(credits + winAmount);
        }

        setIsDrawing(false);
      }, 300);
    }, 600);
  };

  // Evaluate poker hand
  const evaluateHand = (cards) => {
    const values = cards.map(c => c.value).sort((a, b) => a - b);
    const valueCounts = {};
    values.forEach(v => {
      valueCounts[v] = (valueCounts[v] || 0) + 1;
    });

    const counts = Object.values(valueCounts).sort((a, b) => b - a);
    const isFlush = values.every(v => v === values[0]); // All same value
    const isStraight = values.every((v, i) => i === 0 || v === values[i - 1] + 1);

    // Check for royal flush (0-4 straight)
    const isRoyalFlush = isStraight && values[0] === 0 && values[4] === 4;

    if (isRoyalFlush && isFlush) return 'ROYAL_FLUSH';
    if (isStraight && isFlush) return 'STRAIGHT_FLUSH';
    if (counts[0] === 4) return 'FOUR_KIND';
    if (counts[0] === 3 && counts[1] === 2) return 'FULL_HOUSE';
    if (isFlush) return 'FLUSH';
    if (isStraight) return 'STRAIGHT';
    if (counts[0] === 3) return 'THREE_KIND';
    if (counts[0] === 2 && counts[1] === 2) return 'TWO_PAIR';
    if (counts[0] === 2) return 'PAIR';

    return null;
  };

  // New game
  const handleNewGame = () => {
    setGameState('betting');
    setHand([]);
    setHeldCards([]);
    setResult(null);
    setFlippedCards([]);
  };

  // Adjust bet
  const adjustBet = (amount) => {
    const newBet = Math.max(1, Math.min(credits, bet + amount));
    setBet(newBet);
  };

  return (
    <div className="cyber-poker-container">
      <div
        className={`cyber-poker-game`}
        style={{
          border: `3px solid ${COLORS.border.default}`,
          borderRadius: '8px',
          backgroundColor: COLORS.bg.main,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Header */}
        <div
          className="poker-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            backgroundColor: COLORS.bg.panel,
            borderBottom: `2px solid ${COLORS.border.default}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: COLORS.accent.teal,
                textShadow: `0 0 10px ${COLORS.accent.teal}`,
              }}
            >
              ◈ CYBER POKER ◈
            </span>
            <span
              style={{
                fontSize: '0.875rem',
                color: COLORS.text.secondary,
              }}
            >
              5-Card Draw
            </span>
          </div>
        </div>

        <div
          className="poker-grid"
          style={{ padding: '1rem' }}
        >
          {/* Credits */}
          <div
            style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: COLORS.bg.panel,
              border: `2px solid ${COLORS.accent.green}`,
              borderRadius: '6px',
              display: 'flex',
              lineHeight: '1.25rem',
              gridArea: 'poker-header-credits',
              marginBottom: '3rem',
            }}
          >
            <div
              style={{
                fontSize: '0.65rem',
                color: COLORS.text.secondary,
                marginRight: '0.5rem',
              }}
            >
              CREDITS
            </div>
            <div
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: COLORS.accent.green,
              }}
            >
              {credits}¤
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'start',
              gridArea: 'poker-header-area',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '3rem',
            }}
          >
            <button
              className="poker-bet-btn"
              onClick={() => adjustBet(-5)}
              disabled={bet <= 1 || gameState !== 'betting'}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                backgroundColor: COLORS.bg.panel,
                border: `2px solid ${COLORS.accent.teal}`,
                color: COLORS.accent.teal,
                borderRadius: '4px',
                cursor: (bet > 1 && gameState === 'betting') ? 'pointer' : 'not-allowed',
                opacity: (bet > 1 && gameState === 'betting') ? 1 : 0.5,
                lineHeight: '1.25rem',
              }}
            >
              -5
            </button>
            <button
              className="poker-bet-btn"
              onClick={() => adjustBet(-1)}
              disabled={bet <= 1 || gameState !== 'betting'}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                backgroundColor: COLORS.bg.panel,
                border: `2px solid ${COLORS.accent.teal}`,
                color: COLORS.accent.teal,
                borderRadius: '4px',
                cursor: (bet > 1 && gameState === 'betting') ? 'pointer' : 'not-allowed',
                opacity: (bet > 1 && gameState === 'betting') ? 1 : 0.5,
                lineHeight: '1.25rem',
              }}
            >
              -1
            </button>
            {/* Bet */}
            <div
              style={{
                padding: '0.75rem 1.25rem',
                backgroundColor: COLORS.bg.panel,
                border: `2px solid ${COLORS.accent.yellow}`,
                borderRadius: '6px',
                display: 'flex',
                lineHeight: '1.25rem',
                minWidth: '8rem',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '0.65rem',
                  color: COLORS.text.secondary,
                  marginRight: '0.5rem',
                }}
              >
                BET
              </div>
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: COLORS.accent.yellow,
                }}
              >
                {bet}¤
              </div>
            </div>
            <button
              className="poker-bet-btn"
              onClick={() => adjustBet(1)}
              disabled={bet >= credits || gameState !== 'betting'}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                backgroundColor: COLORS.bg.panel,
                border: `2px solid ${COLORS.accent.teal}`,
                color: COLORS.accent.teal,
                borderRadius: '4px',
                cursor: (bet < credits && gameState === 'betting') ? 'pointer' : 'not-allowed',
                opacity: (bet < credits && gameState === 'betting') ? 1 : 0.5,
                lineHeight: '1.25rem',
              }}
            >
              +1
            </button>
            <button
              className="poker-bet-btn"
              onClick={() => adjustBet(5)}
              disabled={bet >= credits || gameState !== 'betting'}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                backgroundColor: COLORS.bg.panel,
                border: `2px solid ${COLORS.accent.teal}`,
                color: COLORS.accent.teal,
                borderRadius: '4px',
                cursor: (bet < credits && gameState === 'betting') ? 'pointer' : 'not-allowed',
                opacity: (bet < credits && gameState === 'betting') ? 1 : 0.5,
                lineHeight: '1.25rem',
              }}
            >
              +5
            </button>
          </div>

          {/* Row 2: Cards - always show 5 slots */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center',
              marginBottom: '1rem',
              gridArea: 'poker-cards-area',
            }}
          >
            {[0, 1, 2, 3, 4].map((index) => {
              const card = hand[index];
              const isHeld = heldCards.includes(index);
              let isFlipped = flippedCards.includes(index);
              isFlipped = isFlipped || !card;

              return (
                <div
                  key={index}
                  onClick={() => card && toggleHold(index)}
                  className={`poker-card ${isHeld ? 'held' : ''} ${(!isFlipped) ? 'flipped' : ''}`}
                  style={{
                    width: '110px',
                    height: '150px',
                    perspective: '1000px',
                    cursor: card && gameState === 'holding' && !isDealing ? 'pointer' : 'default',
                  }}
                >
                  <div className="poker-card-inner">
                    {/* Card Back */}
                    <div
                      className="poker-card-back"
                      style={{
                        backgroundColor: COLORS.bg.panel,
                        border: `3px solid ${COLORS.border.default}`,
                        borderRadius: '8px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '3.5rem',
                          color: COLORS.border.default,
                          opacity: 0.3,
                          textShadow: `0 0 10px ${COLORS.border.default}`,
                        }}
                      >
                        ⬢
                      </div>
                    </div>

                    {/* Card Front */}
                    <div
                      className="poker-card-front"
                      style={{
                        backgroundColor: card ? COLORS.bg.panel : 'rgba(29, 35, 50, 0.3)',
                        border: `3px solid ${isHeld ? COLORS.accent.yellow : COLORS.border.default}`,
                        borderRadius: '8px',
                        boxShadow: isHeld ? `0 0 20px ${COLORS.accent.yellow}` : 'none',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '3.5rem',
                          color: card?.color || COLORS.border.default,
                          textShadow: `0 0 20px ${card?.color}`,
                        }}
                      >
                        {card?.symbol}
                      </div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          color: COLORS.text.secondary,
                          marginTop: '0.25rem',
                        }}
                      >
                        {card?.name}
                      </div>
                      {isHeld && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '0.5rem',
                            left: '0.5rem',
                            fontSize: '0.65rem',
                            fontWeight: 'bold',
                            color: COLORS.accent.yellow,
                            backgroundColor: COLORS.bg.main,
                            padding: '0.2rem 0.4rem',
                            borderRadius: '3px',
                          }}
                        >
                          HELD
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payout Table (compact vertical) */}
          <div
            style={{
              padding: '0.75rem',
              backgroundColor: COLORS.bg.panel,
              border: `1px solid ${COLORS.border.default}`,
              borderRadius: '6px',
              minWidth: '180px',
              gridArea: 'poker-payout-area',
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 'bold',
                color: COLORS.accent.teal,
                marginBottom: '0.5rem',
                textAlign: 'center',
              }}
            >
              PAYOUTS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.35rem', fontSize: '0.65rem' }}>
              {Object.entries(PAYOUTS).map(([key, { name, multiplier }]) => (
                <React.Fragment key={key}>
                  <div style={{ color: COLORS.text.primary, whiteSpace: 'nowrap' }}>{name}</div>
                  <div style={{ color: COLORS.accent.yellow, fontWeight: 'bold', textAlign: 'right' }}>
                    {multiplier}x
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Center section: Result or Action Button */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              alignItems: 'center',
              gridArea: 'poker-actions-area',
              marginLeft: '2rem',
              marginTop: '2rem',
            }}
          >
            {gameState === 'betting' && (
              <button
                className="poker-action-btn"
                onClick={handleDeal}
                disabled={credits < bet}
                style={{
                  backgroundColor: COLORS.accent.teal,
                  color: COLORS.bg.main,
                  cursor: credits >= bet ? 'pointer' : 'not-allowed',
                  opacity: credits >= bet ? 1 : 0.5,
                }}
              >
                DEAL
              </button>
            )}
            {gameState === 'holding' && (
              <button
                className="poker-action-btn"
                onClick={handleDraw}
                disabled={isDrawing}
                style={{
                  backgroundColor: COLORS.accent.green,
                  color: COLORS.bg.main,
                  cursor: isDrawing ? 'not-allowed' : 'pointer',
                  opacity: isDrawing ? 0.7 : 1,
                }}
              >
                {isDrawing ? 'DRAWING...' : 'DRAW'}
              </button>
            )}
            {gameState === 'result' && (
              <button
                className="poker-action-btn"
                onClick={handleNewGame}
                style={{
                  backgroundColor: COLORS.accent.purple,
                  color: 'white',
                }}
              >
                NEW GAME
              </button>
            )}
            {/* Result Display */}
            {gameState === 'result' && (
              <div
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: result ? COLORS.bg.panel : 'transparent',
                  border: result ? `2px solid ${COLORS.accent.green}` : `2px solid ${COLORS.accent.red}`,
                  borderRadius: '6px',
                  textAlign: 'center',
                  minWidth: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  height: '3rem',
                  lineHeight: '3rem',
                }}
              >
                {result ? (
                  <>
                    <div
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        color: COLORS.accent.green,
                      }}
                    >
                      {PAYOUTS[result].name}
                    </div>
                    <div
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 'bold',
                        color: COLORS.accent.yellow,
                        marginLeft: '1rem',
                      }}
                    >
                      +{bet * PAYOUTS[result].multiplier}¤
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: COLORS.accent.red }}>
                    NO WIN
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
