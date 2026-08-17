import React, { useState, useEffect } from 'react';
import './minesweeperGame.css';

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

const CARDINAL_MODS = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 }
];

const ALL_MODS = [
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 }
];

export default function MinesweeperGame({
  width = 16,
  height = 12,
  bombChance = 5,
  tileSize = 1.5, // rem
  onClose,
}) {
  // Game state
  const [board, setBoard] = useState({});
  // 'ready' | 'playing' | 'won' | 'lost'
  const [gameState, setGameState] = useState('ready');
  const [totalBombs, setTotalBombs] = useState(0);
  const [flaggedCount, setFlaggedCount] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newBoard = {};
    let bombCount = 0;

    for (let y = 1; y <= height; y++) {
      for (let x = 1; x <= width; x++) {
        const isBomb = Math.random() * 100 < bombChance;
        if (isBomb) bombCount++;

        newBoard[`tile_${x}_${y}`] = {
          x,
          y,
          is_bomb: isBomb,
          uncovered: false,
          flagged: false,
          marked: false,
        };
      }
    }

    setBoard(newBoard);
    setTotalBombs(bombCount);
    setFlaggedCount(0);
    setGameState('ready');
  };

  const getBombCount = (tile) => {
    let count = 0;
    ALL_MODS.forEach(mod => {
      const key = `tile_${tile.x + mod.x}_${tile.y + mod.y}`;
      if (board[key]?.is_bomb) count++;
    });
    return count;
  };

  const uncoverTiles = async (startTile) => {
    const queue = [startTile];
    const newBoard = { ...board };

    while (queue.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 5));

      const tile = queue.shift();
      const key = `tile_${tile.x}_${tile.y}`;

      if (!newBoard[key]) continue;

      newBoard[key].uncovered = true;
      newBoard[key].marked = false;

      const bombCount = getBombCount(newBoard[key]);

      if (bombCount === 0) {
        CARDINAL_MODS.forEach(mod => {
          const adjKey = `tile_${tile.x + mod.x}_${tile.y + mod.y}`;
          const adjTile = newBoard[adjKey];

          if (adjTile && !adjTile.marked && !adjTile.uncovered && !adjTile.flagged) {
            adjTile.marked = true;
            queue.push(adjTile);
          }
        });
      }

      setBoard({ ...newBoard });
    }
  };

  const revealAllBombs = () => {
    const newBoard = { ...board };
    Object.keys(newBoard).forEach(key => {
      if (newBoard[key].is_bomb) {
        newBoard[key].uncovered = true;
      }
    });
    setBoard(newBoard);
  };

  const checkWin = () => {
    const allNonBombsUncovered = Object.values(board).every(
      tile => tile.is_bomb || tile.uncovered
    );

    if (allNonBombsUncovered) {
      setGameState('won');
      const newBoard = { ...board };
      Object.keys(newBoard).forEach(key => {
        if (newBoard[key].is_bomb && !newBoard[key].flagged) {
          newBoard[key].flagged = true;
        }
      });
      setBoard(newBoard);
      setFlaggedCount(totalBombs);
    }
  };

  const handleTileClick = (tile) => {
    if (gameState === 'lost' || gameState === 'won') return;
    if (tile.flagged || tile.uncovered) return;

    if (gameState === 'ready') {
      setGameState('playing');
    }

    if (tile.is_bomb) {
      revealAllBombs();
      setGameState('lost');
    } else {
      uncoverTiles(tile).then(() => {
        checkWin();
      });
    }
  };

  const handleTileRightClick = (e, tile) => {
    e.preventDefault();
    if (gameState === 'lost' || gameState === 'won') return;
    if (tile.uncovered) return;

    const key = `tile_${tile.x}_${tile.y}`;
    const newFlagged = !tile.flagged;

    setBoard(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        flagged: newFlagged,
      }
    }));

    setFlaggedCount(prev => newFlagged ? prev + 1 : prev - 1);
  };

  const getTileContent = (tile) => {
    if (tile.flagged) return '⚠';
    if (!tile.uncovered) return '';
    if (tile.is_bomb) return '※';

    const count = getBombCount(tile);
    return count > 0 ? count : '';
  };

  const getTileClassName = (tile) => {
    const classes = ['ms-tile'];

    if (tile.uncovered) {
      classes.push('uncovered');
      if (tile.is_bomb) {
        classes.push('bomb');
      } else {
        const count = getBombCount(tile);
        if (count > 0) classes.push(`count-${count}`);
      }
    } else {
      classes.push('covered');
    }

    if (tile.flagged) classes.push('flagged');

    return classes.join(' ');
  };

  const getStatusMessage = () => {
    switch (gameState) {
      case 'ready': return 'AWAITING FIRST SYNC';
      case 'playing': return 'DEFUSAL PROTOCOL ACTIVE';
      case 'won': return 'GRID NEUTRALIZED ✓';
      case 'lost': return 'CRITICAL FAILURE ✗';
      default: return '';
    }
  };

  const formatBombCount = () => {
    return (totalBombs - flaggedCount).toString().padStart(3, '0');
  };

  if (isCollapsed) {
    return (
      <div
        className="ms-container collapsed"
        style={{
          border: `2px solid ${COLORS.border.default}`,
          backgroundColor: COLORS.bg.panel,
        }}
      >
        <div className="ms-collapsed-header" onClick={() => setIsCollapsed(false)}>
          <span style={{ color: COLORS.text.primary }}>NANOBOMB DEFUSAL GRID</span>
          <span style={{ color: COLORS.accent.teal }}>[Click to expand]</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="ms-container"
      style={{
        border: `2px solid ${COLORS.border.default}`,
        backgroundColor: COLORS.bg.panel,
      }}
    >
      <div className="ms-header" style={{ borderBottom: `1px solid ${COLORS.border.default}` }}>
        <div>
          <div className="font-bold text-sm" style={{ color: COLORS.text.primary }}>
            NANOBOMB DEFUSAL GRID
          </div>
          <div className="text-xs" style={{ color: COLORS.text.secondary }}>
            Protocol: MEDIUM | {width}x{height}
          </div>
          <div className="text-xs ms-counter" style={{ color: COLORS.accent.red }}>
            THREATS: {formatBombCount()}
          </div>
        </div>

        <div
          className="ms-game-state"
          style={{
            color: gameState === 'won' ? COLORS.accent.teal :
                  gameState === 'lost' ? COLORS.accent.red :
                  COLORS.text.secondary,
          }}
        >
          {getStatusMessage()}
        </div>

        <div className="ms-header-actions">
          <button
            onClick={initializeBoard}
            className="ms-button ms-reset-button"
            style={{
              backgroundColor: COLORS.bg.main,
              border: `1px solid ${COLORS.border.default}`,
              color: COLORS.accent.yellow,
            }}
            title="New Game"
          >
            ☢
          </button>
          <button
            onClick={() => setIsCollapsed(true)}
            className="ms-button"
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
              className="ms-button"
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

      <div className="ms-board-container">
        <div
          className="ms-board"
          style={{
            gridTemplateColumns: `repeat(${width}, ${tileSize}rem)`,
            gridTemplateRows: `repeat(${height}, ${tileSize}rem)`,
          }}
        >
          {Object.values(board).map(tile => {
            const key = `tile_${tile.x}_${tile.y}`;
            return (
              <div
                key={key}
                className={getTileClassName(tile)}
                style={{
                  width: `${tileSize}rem`,
                  height: `${tileSize}rem`,
                  fontSize: `${tileSize * 0.6}rem`,
                  lineHeight: `${tileSize}rem`,
                }}
                onClick={() => handleTileClick(tile)}
                onContextMenu={(e) => handleTileRightClick(e, tile)}
              >
                {getTileContent(tile)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
