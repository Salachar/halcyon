import EventLineup from './EventLineup';

export default {
  title: 'Terminal/EventLineup',
  component: EventLineup,
};

export const BlankProps = {
  args: {},
};

// Cave Club - cyberpunk nightclub
export const CaveClub = {
  args: {
    venueName: 'Cave Club',
    date: 'Tonight',
    updateFrequency: 'Updated hourly',
    theme: 'club',
    performances: [
      {
        time: '22:00',
        artist: 'PHASER/MOB',
        genre: 'blackened chromecore',
      },
      {
        time: '23:30',
        artist: 'HeCcc',
        genre: 'hexcore',
      },
      {
        time: '01:00',
        artist: 'I must leave',
        genre: 'doompunk',
      },
      {
        time: '02:30',
        artist: 'Sirius Last Light',
        genre: 'atmo-orbitalwave',
      },
    ],
    djs: [
      { name: 'DJ Scrap', genre: 'industrial techno' },
      { name: 'SynthWave Sasha', genre: 'retro-future' },
      { name: 'Bass_Driller', genre: 'sub-bass assault' },
    ],
    entry: {
      price: '20¤ (includes 1 drink token)',
      vipAccess: 'By invitation only',
      memberBenefit: 'Stone Eels members: Free entry',
    },
    tagline: 'No corps. No cops. No bullshit.',
  },
};

// Underground concert venue
export const UndergroundVenue = {
  args: {
    venueName: 'The Pit',
    date: 'Friday Night',
    updateFrequency: 'Updated daily',
    theme: 'concert',
    performances: [
      {
        time: '21:00',
        artist: 'Dead Neon',
        genre: 'punk',
        status: 'Sold Out',
      },
      {
        time: '22:30',
        artist: 'Rage Circuit',
        genre: 'hardcore punk',
      },
      {
        time: '00:00',
        artist: 'System Crash',
        genre: 'industrial',
      },
    ],
    djs: [
      { name: 'DJ Chaos', genre: 'noise', note: 'opening set' },
    ],
    entry: {
      price: '15¤ at door',
      vipAccess: 'No VIP - we\'re all equal in the pit',
      notes: 'Cash only. BYOB.',
    },
    tagline: 'Burn it down.',
  },
};

// Jazz lounge
export const JazzLounge = {
  args: {
    venueName: 'Blue Velvet Jazz Lounge',
    date: 'Tonight',
    updateFrequency: 'Updated daily',
    theme: 'bar',
    performances: [
      {
        time: '20:00',
        artist: 'Marcus Webb Quartet',
        genre: 'neo-jazz',
      },
      {
        time: '21:30',
        artist: 'The Velvet Trio',
        genre: 'smooth jazz',
      },
      {
        time: '23:00',
        artist: 'Luna Santiago',
        genre: 'ambient jazz',
      },
    ],
    djs: [],
    entry: {
      price: '10¤ cover charge',
      vipAccess: 'Reserved seating available - call ahead',
      notes: 'Dress code enforced. Smart casual minimum.',
    },
    tagline: 'Where the city\'s rhythm slows down.',
  },
};

// Casino entertainment
export const CasinoLounge = {
  args: {
    venueName: 'Lucky Flight Casino - Grand Lounge',
    date: 'Tonight',
    updateFrequency: 'Updated hourly',
    theme: 'bar',
    performances: [
      {
        time: '19:00',
        artist: 'Frank Stone',
        genre: 'lounge classics',
      },
      {
        time: '21:00',
        artist: 'The Casino Royales',
        genre: 'swing & big band',
      },
      {
        time: '23:00',
        artist: 'Velvet Voice',
        genre: 'contemporary jazz',
      },
    ],
    djs: [
      { name: 'DJ Smooth Operator', genre: 'lounge & chill', note: 'between sets' },
    ],
    entry: {
      price: 'Free with casino membership',
      vipAccess: 'High Roller Lounge - by invitation',
      memberBenefit: 'Platinum members: Complimentary champagne',
    },
    tagline: 'Where winners celebrate.',
  },
};

// Retro diner
export const RetroDiner = {
  args: {
    venueName: "Rosie's Retro Diner",
    date: 'Saturday Night',
    updateFrequency: 'Weekly schedule',
    theme: 'bar',
    performances: [
      {
        time: '19:00',
        artist: 'The Cruisers',
        genre: 'rockabilly',
      },
      {
        time: '20:30',
        artist: 'Highway Stars',
        genre: 'rock & roll',
      },
    ],
    djs: [],
    entry: {
      price: 'No cover charge',
      notes: 'Reservations recommended on weekends',
    },
    tagline: 'Like the old days, but with better milkshakes.',
  },
};

// Electronic music club
export const ElectronicClub = {
  args: {
    venueName: 'Neon Pulse',
    date: 'Tonight',
    updateFrequency: 'Updated hourly',
    theme: 'club',
    performances: [
      {
        time: '22:00',
        artist: 'DJ Voltage',
        genre: 'dubstep',
      },
      {
        time: '00:00',
        artist: 'Neon Massacre',
        genre: 'hardstyle',
      },
      {
        time: '02:00',
        artist: 'Shadow Frequency',
        genre: 'drum & bass',
      },
      {
        time: '04:00',
        artist: 'Digital Prophets',
        genre: 'trance',
      },
    ],
    djs: [
      { name: 'Laser Dreams', genre: 'house', note: 'resident' },
      { name: 'Beat Reactor', genre: 'techno', note: 'resident' },
    ],
    entry: {
      price: '25¤ before midnight, 30¤ after',
      vipAccess: 'VIP tables available - 500¤ minimum bottle service',
    },
    tagline: 'Bass you can feel in your bones.',
  },
};

// Minimal lineup
export const SmallVenue = {
  args: {
    venueName: 'The Corner Bar',
    date: 'Tonight',
    updateFrequency: 'Daily',
    theme: 'bar',
    performances: [
      {
        time: '21:00',
        artist: 'Local Band',
        genre: 'acoustic indie',
      },
    ],
    djs: [],
    entry: {
      price: '5¤ suggested donation',
    },
  },
};

// Rock venue
export const RockVenue = {
  args: {
    venueName: 'The Iron Hammer',
    date: 'Tonight',
    updateFrequency: 'Updated daily',
    theme: 'concert',
    performances: [
      {
        time: '21:00',
        artist: 'Iron Legion',
        genre: 'heavy metal',
      },
      {
        time: '22:30',
        artist: 'Chaos Theory',
        genre: 'hard rock',
      },
      {
        time: '00:00',
        artist: 'Voltage Riot',
        genre: 'metal',
      },
    ],
    djs: [],
    entry: {
      price: '15¤ advance, 20¤ at door',
      notes: 'Ear protection recommended',
    },
    tagline: 'Loud. Heavy. Relentless.',
  },
};
