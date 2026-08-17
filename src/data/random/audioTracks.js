/**
 * Audio Tracks Database
 *
 * Shared music library for Jukebox and Radio components.
 * Each category contains channel info (for Radio) and track list (for both).
 *
 * Usage:
 * - Jukebox: Takes first N tracks (default 4) via musicType prop
 * - Radio: Uses channel info and picks random tracks when tuning in
 */

export const AUDIO_TRACKS = {
  "jazz": {
    channel: "108.4",
    name: "The Jazz Club",
    description: "Smooth jazz and neo-noir vibes",
    defaultCost: "3¤",
    tracks: [
      {
        title: "Midnight in the City",
        artist: "Marcus Webb Quartet",
        genre: "Jazz",
        color: "blue",
      },
      {
        title: "Smoky Serenade",
        artist: "The Velvet Trio",
        genre: "Smooth Jazz",
        color: "purple",
      },
      {
        title: "Neon Noir",
        artist: "Charlie Stone",
        genre: "Neo-Jazz",
        color: "cyan",
      },
      {
        title: "Rain on Glass",
        artist: "Luna Santiago",
        genre: "Ambient Jazz",
        color: "blue",
      },
      {
        title: "After Hours",
        artist: "The Night Owl Ensemble",
        genre: "Jazz Fusion",
        color: "orange",
      },
      {
        title: "Boulevard Blues",
        artist: "Sarah Cross Band",
        genre: "Blues",
        color: "red",
      },
    ],
  },

  "cyberpunk": {
    channel: "99.9",
    name: "Neon Pulse Radio",
    description: "Cyberpunk beats for the digital underground",
    defaultCost: "4¤",
    tracks: [
      {
        title: "Neural Net",
        artist: "Data Ghost",
        genre: "Cyberpunk",
        color: "cyan",
      },
      {
        title: "Corporate Warfare",
        artist: "System Breach",
        genre: "Industrial",
        color: "red",
      },
      {
        title: "Chrome City",
        artist: "Neon Samurai",
        genre: "Synthwave",
        color: "purple",
      },
      {
        title: "Digital Resistance",
        artist: "Rogue AI",
        genre: "Dark Techno",
        color: "orange",
      },
      {
        title: "Megacity Lights",
        artist: "Urban Decay",
        genre: "Future Bass",
        color: "pink",
      },
      {
        title: "Hack the Matrix",
        artist: "Code Runner",
        genre: "Glitch Hop",
        color: "green",
      },
      {
        title: "Blade Runner Dreams",
        artist: "Synthetic Souls",
        genre: "Ambient",
        color: "blue",
      },
    ],
  },

  "synthwave": {
    channel: "85.0",
    name: "Retro Wave FM",
    description: "80s vibes and neon dreams",
    defaultCost: "2¤",
    tracks: [
      {
        title: "Neon Dreams",
        artist: "The Synthwave Collective",
        genre: "Synthwave",
        color: "purple",
      },
      {
        title: "Electric Youth",
        artist: "Neon Wave",
        genre: "Synthpop",
        color: "pink",
      },
      {
        title: "Laser Dreams",
        artist: "The Synth Squad",
        genre: "Synthwave",
        color: "purple",
      },
      {
        title: "Miami Nights",
        artist: "Sunset Drive",
        genre: "Retrowave",
        color: "pink",
      },
      {
        title: "Neon Paradise",
        artist: "Chrome Dreams",
        genre: "Synthwave",
        color: "purple",
      },
      {
        title: "Video Killed the Radio Star 2.0",
        artist: "Digital Age",
        genre: "New Wave",
        color: "cyan",
      },
      {
        title: "Arcade Nights",
        artist: "Pixel Perfect",
        genre: "Chiptune",
        color: "orange",
      },
    ],
  },

  "electronic": {
    channel: "101.1",
    name: "Electric Avenue",
    description: "Electronic beats and bass drops",
    defaultCost: "5¤",
    tracks: [
      {
        title: "Street Lights",
        artist: "Urban Echo",
        genre: "Electronic",
        color: "blue",
      },
      {
        title: "Digital Rain",
        artist: "Cyber Pulse",
        genre: "Techno",
        color: "cyan",
      },
      {
        title: "Bass Drop Protocol",
        artist: "DJ Voltage",
        genre: "Dubstep",
        color: "purple",
      },
      {
        title: "Rave Signal",
        artist: "Neon Massacre",
        genre: "Hardstyle",
        color: "pink",
      },
      {
        title: "Underground Anthem",
        artist: "Shadow Frequency",
        genre: "Drum & Bass",
        color: "red",
      },
      {
        title: "Electric Paradise",
        artist: "Laser Dreams",
        genre: "House",
        color: "cyan",
      },
      {
        title: "Cyber Fusion",
        artist: "Digital Prophets",
        genre: "Trance",
        color: "blue",
      },
      {
        title: "Neon Nights",
        artist: "Club Empire",
        genre: "EDM",
        color: "purple",
      },
      {
        title: "Pulse Driver",
        artist: "Beat Reactor",
        genre: "Techno",
        color: "orange",
      },
    ],
  },

  "rock": {
    channel: "95.5",
    name: "Thunder Rock FM",
    description: "Heavy riffs and rebel yells",
    defaultCost: "2¤",
    tracks: [
      {
        title: "Midnight Runner",
        artist: "Chrome Hearts",
        genre: "Rock",
        color: "red",
      },
      {
        title: "Steel Thunder",
        artist: "Iron Legion",
        genre: "Heavy Metal",
        color: "red",
      },
      {
        title: "Rebel Yell 2.0",
        artist: "Chaos Theory",
        genre: "Hard Rock",
        color: "orange",
      },
      {
        title: "Electric Overdrive",
        artist: "Voltage Riot",
        genre: "Metal",
        color: "red",
      },
      {
        title: "Night Prowler",
        artist: "Shadow Wolves",
        genre: "Rock",
        color: "purple",
      },
      {
        title: "Concrete Jungle",
        artist: "Urban Warriors",
        genre: "Alternative",
        color: "green",
      },
    ],
  },

  "punk": {
    channel: "77.7",
    name: "Anarchy Radio",
    description: "Raw energy and rebellion",
    defaultCost: "2¤",
    tracks: [
      {
        title: "City Burnout",
        artist: "Dead Neon",
        genre: "Punk",
        color: "red",
      },
      {
        title: "Corporate Slaves",
        artist: "Rage Circuit",
        genre: "Punk Rock",
        color: "orange",
      },
      {
        title: "Anarchy Protocol",
        artist: "System Crash",
        genre: "Hardcore",
        color: "red",
      },
      {
        title: "Rebel Code",
        artist: "The Outcasts",
        genre: "Punk",
        color: "green",
      },
      {
        title: "No Future",
        artist: "Lost Generation",
        genre: "Post-Punk",
        color: "purple",
      },
    ],
  },

  "lounge": {
    channel: "107.7",
    name: "Velvet Lounge",
    description: "Sophisticated sounds for high rollers",
    defaultCost: "10¤",
    tracks: [
      {
        title: "Luck Be a Lady",
        artist: "Frank Stone",
        genre: "Lounge",
        color: "blue",
      },
      {
        title: "Diamond Dreams",
        artist: "The Casino Royales",
        genre: "Swing",
        color: "purple",
      },
      {
        title: "High Stakes",
        artist: "Velvet Voice",
        genre: "Jazz",
        color: "cyan",
      },
      {
        title: "Jackpot Serenade",
        artist: "The Lucky Seven",
        genre: "Big Band",
        color: "orange",
      },
      {
        title: "Casino Nights",
        artist: "Smooth Operators",
        genre: "Smooth Jazz",
        color: "blue",
      },
      {
        title: "Roll the Dice",
        artist: "Fortune Teller",
        genre: "Lounge",
        color: "red",
      },
    ],
  },

  "retro": {
    channel: "50.5",
    name: "Nostalgia FM",
    description: "Doo-wop, rockabilly, and retro vibes",
    defaultCost: "1¤",
    tracks: [
      {
        title: "Chrome & Vinyl",
        artist: "The Cruisers",
        genre: "Rockabilly",
        color: "red",
      },
      {
        title: "Jukebox Saturday Night",
        artist: "The Neon Five",
        genre: "Doo-Wop",
        color: "blue",
      },
      {
        title: "Route 66 Redux",
        artist: "Highway Stars",
        genre: "Rock & Roll",
        color: "orange",
      },
      {
        title: "Milkshake Memories",
        artist: "The Retro Rockets",
        genre: "Pop",
        color: "pink",
      },
      {
        title: "Drive-In Dreams",
        artist: "Cadillac Kings",
        genre: "Surf Rock",
        color: "cyan",
      },
    ],
  },

  "classical": {
    channel: "104.3",
    name: "Prestige Classical",
    description: "Neo-classical and contemporary elegance",
    defaultCost: "15¤",
    tracks: [
      {
        title: "Moonlight Sonata: Cyber",
        artist: "Classical Fusion Orchestra",
        genre: "Neo-Classical",
        color: "blue",
      },
      {
        title: "Velvet Nocturne",
        artist: "String Theory",
        genre: "Chamber",
        color: "purple",
      },
      {
        title: "Metropolitan Suite",
        artist: "The Virtuosos",
        genre: "Contemporary Classical",
        color: "cyan",
      },
      {
        title: "Elegance in E Minor",
        artist: "Piano Noir",
        genre: "Piano",
        color: "blue",
      },
      {
        title: "Champagne Dreams",
        artist: "Luxury Ensemble",
        genre: "Lounge",
        color: "orange",
      },
    ],
  },

  "hiphop": {
    channel: "92.3",
    name: "Street Beats",
    description: "Hip-hop, rap, and urban sounds",
    defaultCost: "1¤",
    tracks: [
      {
        title: "Corner Store Groove",
        artist: "Local Heroes",
        genre: "Hip-Hop",
        color: "orange",
      },
      {
        title: "Neighborhood Watch",
        artist: "Street Poets",
        genre: "Rap",
        color: "red",
      },
      {
        title: "Block Party",
        artist: "The Collective",
        genre: "Funk",
        color: "purple",
      },
      {
        title: "City Lights",
        artist: "Urban Pulse",
        genre: "R&B",
        color: "blue",
      },
    ],
  },

  "ambient": {
    channel: "88.8",
    name: "Chill Zone",
    description: "Lo-fi, ambient, and relaxing sounds",
    defaultCost: "1¤",
    tracks: [
      {
        title: "Morning Coffee",
        artist: "Café Sounds",
        genre: "Ambient",
        color: "blue",
      },
      {
        title: "Rainy Day",
        artist: "Chill Vibes",
        genre: "Lo-Fi",
        color: "cyan",
      },
      {
        title: "Last Call",
        artist: "The Neon Kings",
        genre: "Blues",
        color: "orange",
      },
    ],
  },
};

// Helper functions for components

/**
 * Get tracks for Jukebox (first N tracks from category)
 */
export const getJukeboxTracks = (musicType, limit = 4) => {
  const category = AUDIO_TRACKS[musicType];
  return category ? category.tracks.slice(0, limit) : [];
};

/**
 * Get random track for Radio when tuning to channel
 */
export const getRandomRadioTrack = (musicType) => {
  const category = AUDIO_TRACKS[musicType];
  if (!category || !category.tracks.length) return null;
  const randomIndex = Math.floor(Math.random() * category.tracks.length);
  return category.tracks[randomIndex];
};

/**
 * Get full channel info (for Radio display)
 */
export const getChannelInfo = (musicType) => {
  return AUDIO_TRACKS[musicType] || null;
};

/**
 * Get all available channel keys (for Radio navigation)
 */
export const getAllChannelKeys = () => {
  return Object.keys(AUDIO_TRACKS);
};
