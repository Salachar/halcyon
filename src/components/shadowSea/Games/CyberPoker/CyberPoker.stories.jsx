import CyberPoker from './CyberPoker';

export default {
  title: 'Terminal/Games/CyberPoker',
  component: CyberPoker,
  tags: ['autodocs'],
  argTypes: {
    startingCredits: {
      control: 'number',
      description: 'Starting credits for the player',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when game is closed',
    },
  },
};

// Default game - standard starting credits
export const Default = {
  args: {
    startingCredits: 100,
  },
};

// High roller - start with lots of credits
export const HighRoller = {
  args: {
    startingCredits: 1000,
  },
};

// Low stakes - small bankroll
export const LowStakes = {
  args: {
    startingCredits: 25,
  },
};

// Desperate - almost broke
export const Desperate = {
  args: {
    startingCredits: 5,
  },
};

// Broke - need to borrow credits
export const Broke = {
  args: {
    startingCredits: 1,
  },
};

// Casino floor - typical arcade cabinet starting amount
export const CasinoFloor = {
  args: {
    startingCredits: 50,
  },
};

// Lucky Flight Casino - high stakes table
export const LuckyFlightCasino = {
  args: {
    startingCredits: 500,
  },
};

// Underground gambling den - sketchy starting amount
export const UndergroundDen = {
  args: {
    startingCredits: 75,
  },
};

// With close handler
export const WithCloseButton = {
  args: {
    startingCredits: 100,
    onClose: () => console.log('Game closed'),
  },
};
