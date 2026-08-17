import Jukebox from './Jukebox';

export default {
  title: 'Terminal/Jukebox',
  component: Jukebox,
};

export const BlankProps = {
  args: {},
};

// Using musicType - Jazz lounge
export const JazzLounge = {
  args: {
    model: 'JB-Noir 88',
    location: 'Blue Velvet Jazz Lounge',
    musicType: 'jazz',
  },
};

// Using musicType - Nightclub
export const Nightclub = {
  args: {
    model: 'JB-X9 Pro',
    location: 'Cave Club VIP Lounge',
    musicType: 'electronic',
    trackLimit: 7,
  },
};

// Using musicType - Cyberpunk bar
export const CyberpunkBar = {
  args: {
    model: 'JB-2077',
    location: 'Glitch Bar - Underground district',
    musicType: 'cyberpunk',
    trackLimit: 7,
  },
};

// Using musicType - Rock bar
export const RockBar = {
  args: {
    model: 'JB-Metal 666',
    location: 'The Iron Hammer - Rock bar',
    musicType: 'rock',
  },
};

// Using musicType - Retro diner
export const RetroDiner = {
  args: {
    model: 'JB-505 Classic',
    location: "Rosie's Retro Diner",
    musicType: 'retro',
    trackLimit: 5,
  },
};

// Using musicType - 80s themed bar
export const EightiesBar = {
  args: {
    model: 'JB-Retro 85',
    location: 'Totally 80s Bar',
    musicType: 'synthwave',
    trackLimit: 6,
  },
};

// Using musicType - Punk venue
export const PunkVenue = {
  args: {
    model: 'JB-Anarchy',
    location: 'The Pit - Underground venue',
    musicType: 'punk',
  },
};

// Using musicType - Casino lounge
export const CasinoLounge = {
  args: {
    model: 'JB-Royal Deluxe',
    location: 'Lucky Flight Casino - High Roller Lounge',
    musicType: 'lounge',
    trackLimit: 6,
  },
};

// Using musicType - Bodega/corner store
export const BodegaJukebox = {
  args: {
    model: 'JB-99 Budget',
    location: 'Lucky Star Bodega',
    musicType: 'hiphop',
  },
};

// Using musicType - Fine restaurant
export const FineRestaurant = {
  args: {
    model: 'JB-Prestige 3000',
    location: 'Étoile Noire - Fine dining',
    musicType: 'classical',
    trackLimit: 5,
  },
};

// Using musicType - Minimal jukebox
export const MinimalJukebox = {
  args: {
    model: 'JB-Basic',
    location: 'Small cafe',
    musicType: 'ambient',
    trackLimit: 2,
  },
};

// Custom songs example - Dive bar with mixed genres
export const DiveBarCustom = {
  args: {
    model: 'JB-707',
    location: 'The Rusty Anchor - Downtown dive bar',
    songs: [
      {
        title: 'Neon Dreams',
        artist: 'The Synthwave Collective',
        genre: 'Synthwave',
        color: 'purple',
      },
      {
        title: 'Street Lights',
        artist: 'Urban Echo',
        genre: 'Electronic',
        color: 'blue',
      },
      {
        title: 'Midnight Runner',
        artist: 'Chrome Hearts',
        genre: 'Rock',
        color: 'red',
      },
      {
        title: 'Digital Rain',
        artist: 'Cyber Pulse',
        genre: 'Techno',
        color: 'cyan',
      },
      {
        title: 'Last Call',
        artist: 'The Neon Kings',
        genre: 'Blues',
        color: 'orange',
      },
    ],
  },
};
