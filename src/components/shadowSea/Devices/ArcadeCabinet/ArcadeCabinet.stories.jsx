import ArcadeCabinet from './ArcadeCabinet';

export default {
  title: 'Terminal/ArcadeCabinet',
  component: ArcadeCabinet,
};

// Attract mode - waiting for player
export const BlankProps = {
  args: {},
};

// Attract mode - waiting for player
export const AttractMode = {
  args: {
    id: 'arcade-pixel-palace-01',
    name: 'NEON FIGHTER II',
    location: 'Pixel Palace Arcade - Main Floor',
    gamesAvailable: [
      'NEON FIGHTER II TURBO',
      'CYBER RACER X',
      'SPACE INVADER 2088',
      'TETRIS NEON',
      'STREET BRAWLER EX',
      'MEGA RUNNER DELUXE',
    ],
    credits: 247,
    lastPlayed: '15 minutes ago',
    user: 'SHADOW_NINJA_42',
  },
};

// Game in progress
export const GameInProgress = {
  args: {
    id: 'arcade-downtown-02',
    name: 'GALACTIC DEFENDER',
    location: 'Downtown Arcade - Corner Unit',
    screenState: 'PLAYING',
    gamesAvailable: [
      'SPACE WARS ULTIMATE',
      'ASTEROID BLASTER',
      'CYBER FIGHTER ALPHA',
      'PUZZLE MASTER PRO',
    ],
    credits: 247,
    lastPlayed: 'Just now',
    user: 'LASER_ACE_99',
  },
};

// Game over screen
export const GameOver = {
  args: {
    id: 'arcade-club-racing',
    name: 'CYBER RACER X',
    location: 'Cave Club - Gaming Corner',
    screenState: 'GAME_OVER',
    gamesAvailable: [
      'NEON NIGHT RACER',
      'TURBO DRIFT 2088',
      'STREET FIGHTER EX+',
      'PUZZLE COMBO DELUXE',
      'SPACE SHOOTER EXTREME',
    ],
    credits: 247,
    lastPlayed: '2 minutes ago',
    user: 'SPEED_DEMON_X',
  },
};

// High score entry
export const HighScoreEntry = {
  args: {
    id: 'arcade-cafe-puzzle',
    name: 'PUZZLE MASTER PRO',
    location: 'Grounded Café - Corner Table',
    screenState: 'HIGH_SCORE',
    gamesAvailable: [
      'TETRIS ULTIMATE',
      'MATCH-3 MANIA',
      'BLOCK BREAKER DELUXE',
      'NEON FIGHTER ZERO',
    ],
    credits: 247,
    lastPlayed: '30 seconds ago',
    user: 'PUZZLE_QUEEN',
  },
};


// Minimal setup
export const MinimalCabinet = {
  args: {
    id: 'arcade-minimal',
    name: 'BASIC ARCADE',
    location: 'Small Shop - Corner',
    gamesAvailable: [
      'PUZZLE GAME',
      'SHOOTER GAME',
    ],
    credits: 247,
    lastPlayed: '1 week ago',
    user: 'PLAYER',
  },
};

// Casino arcade
export const CasinoArcade = {
  args: {
    id: 'arcade-casino-main',
    name: 'LUCKY FIGHTER GOLD',
    location: 'Lucky Flight Casino - Arcade Section',
    gamesAvailable: [
      'LUCKY COMBAT DELUXE',
      'FORTUNE RACER',
      'JACKPOT SHOOTER',
      'SLOT PUZZLE MANIA',
    ],
    credits: 247,
    lastPlayed: 'Just now',
    user: 'LUCKY_PLAYER_13',
  },
};

// No player logged in
export const NoPlayerGuest = {
  args: {
    id: 'arcade-public-01',
    name: 'PUBLIC ARCADE',
    location: 'Mall Food Court',
    gamesAvailable: [
      'DEMO GAME 1',
      'DEMO GAME 2',
      'DEMO GAME 3',
    ],
    credits: 247,
    lastPlayed: 'Never',
    user: 'GUEST',
  },
};
