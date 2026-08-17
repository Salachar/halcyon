import React, { useState, useEffect } from 'react';
import './memoryGame.css';

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
  },
};

// Cyberpunk symbols for cards
const SYMBOLS = [
  '◉', '※', '⚡', '◈', '⚠', '⟁', '◬', '⦿',
  '◐', '◑', '◒', '◓', '▣', '▤', '▥', '▦',
  '◊', '◈', '◆', '❖', '⬢', '⬡', '⬟', '⬠'
];

export default function MemoryGame({
  gridSize = 4, // 4x4 = 16 cards (8 pairs)
  tileSize = 4, // rem
  onClose,
}) {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState('ready'); // 'ready' | 'playing' | 'won'
  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing' || isCollapsed) return;

    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, isCollapsed]);

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const initializeGame = () => {
    const totalPairs = (gridSize * gridSize) / 2;
    const selectedSymbols = SYMBOLS.slice(0, totalPairs);

    // Create pairs and shuffle
    const pairs = [...selectedSymbols, ...selectedSymbols];
    const shuffled = pairs
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setTimer(0);
    setGameState('ready');
    setIsProcessing(false);
  };

  const handleCardClick = (index) => {
    if (isProcessing) return;
    if (gameState === 'won') return;
    if (cards[index].isMatched) return;
    if (cards[index].isFlipped) return;
    if (flippedIndices.length >= 2) return;

    // Start game on first click
    if (gameState === 'ready') {
      setGameState('playing');
    }

    // Flip the card
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // Check for match when two cards are flipped
    if (newFlipped.length === 2) {
      setIsProcessing(true);
      setMoves(prev => prev + 1);

      const [first, second] = newFlipped;
      const firstCard = newCards[first];
      const secondCard = newCards[second];

      if (firstCard.symbol === secondCard.symbol) {
        // Match found!
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setMatchedPairs(prev => [...prev, firstCard.symbol]);
          setFlippedIndices([]);
          setIsProcessing(false);

          // Check win condition
          if (matchedPairs.length + 1 === (gridSize * gridSize) / 2) {
            setGameState('won');
          }
        }, 600);
      } else {
        // No match - flip back
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  const getCardClassName = (card) => {
    const classes = ['mem-card'];
    if (card.isFlipped) classes.push('flipped');
    if (card.isMatched) classes.push('matched');
    return classes.join(' ');
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const getStatusMessage = () => {
    switch (gameState) {
      case 'ready': return 'AWAITING NEURAL SYNC';
      case 'playing': return 'ICE CRACKING IN PROGRESS';
      case 'won': return 'ALL PATTERNS DECODED ✓';
      default: return '';
    }
  };

  const getDifficultyLabel = () => {
    if (gridSize === 4) return 'EASY';
    if (gridSize === 6) return 'MEDIUM';
    if (gridSize === 8) return 'HARD';
    return 'CUSTOM';
  };

  if (isCollapsed) {
    return (
      <div
        className="mem-container collapsed"
        style={{
          border: `2px solid ${COLORS.border.default}`,
          backgroundColor: COLORS.bg.panel,
        }}
      >
        <div className="mem-collapsed-header" onClick={() => setIsCollapsed(false)}>
          <span style={{ color: COLORS.text.primary }}>NETRUNNER MEMORY DECK</span>
          <span style={{ color: COLORS.accent.teal }}>[Click to expand]</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mem-container"
      style={{
        border: `2px solid ${COLORS.border.default}`,
        backgroundColor: COLORS.bg.panel,
      }}
    >
      <div className="mem-header" style={{ borderBottom: `1px solid ${COLORS.border.default}` }}>
        <div>
          <div className="font-bold text-sm" style={{ color: COLORS.text.primary }}>
            NETRUNNER MEMORY DECK
          </div>
          <div className="text-xs" style={{ color: COLORS.text.secondary }}>
            Protocol: {getDifficultyLabel()} | {gridSize}x{gridSize} Grid
          </div>
          <div className="mem-stats">
            <div className="text-xs" style={{ color: COLORS.accent.yellow }}>
              SYNC ATTEMPTS: {moves.toString().padStart(3, '0')}
            </div>
            <div className="text-xs" style={{ color: COLORS.accent.teal }}>
              RUNTIME: {formatTime()}
            </div>
            <div className="text-xs" style={{ color: COLORS.accent.teal }}>
              PAIRS: {matchedPairs.length}/{(gridSize * gridSize) / 2}
            </div>
          </div>
        </div>

        <div
          className="mem-game-state"
          style={{
            color: gameState === 'won' ? COLORS.accent.teal :
                   gameState === 'playing' ? COLORS.text.secondary :
                   COLORS.text.secondary,
          }}
        >
          {getStatusMessage()}
        </div>

        <div className="mem-header-actions">
          <button
            onClick={initializeGame}
            className="mem-button mem-reset-button"
            style={{
              backgroundColor: COLORS.bg.main,
              border: `1px solid ${COLORS.border.default}`,
              color: COLORS.accent.yellow,
            }}
            title="New Game"
          >
            ⟲
          </button>
          <button
            onClick={() => setIsCollapsed(true)}
            className="mem-button"
            style={{
              backgroundColor: COLORS.bg.main,
              color: COLORS.text.primary,
              border: `1px solid ${COLORS.border.default}`,
            }}
          >
            Minimize
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="mem-button"
              style={{
                backgroundColor: COLORS.bg.main,
                color: COLORS.accent.red,
                border: `1px solid ${COLORS.accent.red}`,
              }}
            >
              Close
            </button>
          )}
        </div>
      </div>

      <div className="mem-board-container">
        <div
          className="mem-board"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, ${tileSize}rem)`,
            gridTemplateRows: `repeat(${gridSize}, ${tileSize}rem)`,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={getCardClassName(card)}
              style={{
                width: `${tileSize}rem`,
                height: `${tileSize}rem`,
              }}
              onClick={() => handleCardClick(index)}
            >
              <div className="mem-card-inner">
                <div className="mem-card-back">
                  <div
                    className="mem-card-pattern"
                    style={{
                      fontSize: `${tileSize * 0.4}rem`,
                    }}
                  >
                    ⬢
                  </div>
                </div>
                <div
                  className="mem-card-front"
                  style={{
                    fontSize: `${tileSize * 0.5}rem`,
                  }}
                >
                  {card.symbol}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {gameState === 'won' && (
        <div
          className="mem-win-message"
          style={{
            color: COLORS.accent.teal,
            borderTop: `1px solid ${COLORS.border.default}`,
          }}
        >
          <div className="font-bold">ICE SUCCESSFULLY CRACKED</div>
          <div className="text-sm" style={{ color: COLORS.text.secondary }}>
            Completed in {moves} attempts | Runtime: {formatTime()}
          </div>
        </div>
      )}
    </div>
  );
}
