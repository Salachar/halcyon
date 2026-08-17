import CommunityBoard from './CommunityBoard';

export default {
  title: 'Terminal/CommunityBoard',
  component: CommunityBoard,
};

export const BlankProps = {
  args: {},
};

// Mira's Community Bulletin - peaceful neighborhood
export const MirasCommunity = {
  args: {
    id: 'miras-board',
    boardName: 'COMMUNITY BOARD',
    location: "Mira's Neighborhood - Community Center",
    lastUpdate: 'Daily',
    posts: [
      { text: 'Roommate needed - 300¤/month, utilities split' },
      { text: "Lost cat - grey tabby, answers to 'Static'" },
      { text: 'Selling bicycle - needs work, 50¤' },
      { text: 'Looking for work - have tools, will travel' },
      { text: 'Poker night Fridays - basement of The Anchor bar' },
      { text: 'Musician seeking bandmates - synth & drums especially' },
    ],
    services: [
      'Handyman - odd jobs, fair rates (RCD: fix_it_vic@local)',
      'Tutor - math & science, evenings (knock apt 4B)',
      'Bicycle repair - mobile service, call ahead',
    ],
    vibe: 'Neighborhood vibe: Tight-knit, everyone knows everyone',
  },
};

// Bodega Neighborhood - desperate and angry
export const BodegaNeighborhood = {
  args: {
    id: 'bodega-board',
    boardName: 'COMMUNITY BULLETIN BOARD',
    location: "Batu's Bodega - Front Window",
    lastUpdate: 'Daily',
    posts: [
      { text: 'MISSING: Batu, bodega owner. Anyone seen him?', color: 'red' },
      { text: 'Lucky Flight took another house on our street this week' },
      { text: "Can't afford groceries after casino payment this month" },
      { text: '4th eviction on our block this year. When does it stop?' },
      { text: 'Organizing neighborhood meeting - discuss casino problem', color: 'yellow' },
      { text: 'We need to do something about that fucking place', color: 'red' },
      { text: 'Anyone know a good fixer? Asking for a friend...', color: 'yellow' },
    ],
    services: [
      'Street doc - "Fingers" (2 blocks south, knock 3x)',
      'Chop shop - Razor\'s (3 blocks east, alley entrance)',
      'Black market credchip exchange (fluctuating rates)',
      'Cyberware installation (unlicensed, cheap)',
      'Taxi boat service to canal district (negotiable rates)',
    ],
    vibe: 'General mood: Frustrated, angry, desperate',
  },
};

// Cave Club - music scene with warnings
export const CaveClubBoard = {
  args: {
    id: 'cave-club-board',
    boardName: 'COMMUNITY POSTINGS',
    location: 'Cave Club - Near Main Entrance',
    lastUpdate: 'Weekly',
    sections: [
      {
        title: 'SCENE NEWS:',
        color: 'pink',
        items: [
          { text: 'New band forming - need drummer with own kit' },
          { text: 'Selling modified amp - 200¤ OBO' },
          { text: 'Studio space available - split rent 4 ways' },
          { text: 'Looking for vocals for industrial project' },
          { text: 'Anti-gentrification protest this Saturday - meet at bodega', color: 'yellow' },
        ],
      },
      {
        title: 'WARNINGS:',
        color: 'red',
        items: [
          { text: 'Virid Vipers spotted near docks - watch your back', color: 'red' },
          { text: 'SecOps doing sweeps on weekends lately', color: 'red' },
          { text: 'Alliansen suits been asking questions about the club', color: 'yellow' },
        ],
      },
    ],
    vibe: 'Vibe: Tight community, fuck-the-corps attitude',
  },
};

// Corporate district - sterile and controlled
export const CorporateDistrict = {
  args: {
    id: 'corp-district-board',
    boardName: 'EMPLOYEE BULLETIN',
    location: 'Alliansen Corporate Campus - Break Room',
    lastUpdate: 'Weekly',
    posts: [
      { text: 'Employee wellness seminar - Tuesday 14:00 (mandatory)', color: 'yellow' },
      { text: 'Carpool to downtown - split fuel costs, contact HR' },
      { text: 'Company softball team tryouts - Sunday morning' },
      { text: 'Selling desk plant - moving departments, 10¤' },
      { text: 'Looking for someone to cover Thursday shift - will trade' },
    ],
    services: [
      'Corporate-approved dry cleaning (10% employee discount)',
      'Meal prep service - healthy options (delivered to campus)',
      'Rideshare coordination - HR approved routes only',
    ],
    vibe: 'Atmosphere: Professional, sanitized, everyone watches what they say',
  },
};

// Underground market - illegal and dangerous
export const UndergroundMarket = {
  args: {
    id: 'underground-board',
    boardName: 'BLACK MARKET POSTINGS',
    location: 'Underground Market - Digital Board',
    lastUpdate: 'Real-time',
    sections: [
      {
        title: 'MERCHANDISE:',
        color: 'yellow',
        items: [
          { text: 'Military-grade cyberware - untraceable, top quality', color: 'yellow' },
          { text: 'Stolen credchips - verified, 60% face value' },
          { text: 'Fake IDs - biometric bypass included, 500¤' },
          { text: 'Unregistered firearms - various models, ask for catalog' },
          { text: 'Corporate data dumps - prices negotiable' },
        ],
      },
      {
        title: 'ALERTS:',
        color: 'red',
        items: [
          { text: 'SecOps raid last night - 3 stalls shut down', color: 'red' },
          { text: 'Snitch identified - handled. Message sent.', color: 'red' },
          { text: 'New security protocols at checkpoints - plan accordingly', color: 'yellow' },
        ],
      },
    ],
    services: [
      'Data scrubbing - clean your records (expensive but thorough)',
      'Smuggling runs to outer zones (discretion guaranteed)',
      'Hitman services available (serious inquiries only)',
    ],
    vibe: 'Environment: Paranoid, everyone armed, trust no one',
  },
};

// Student housing - young and broke
export const StudentHousing = {
  args: {
    id: 'student-board',
    boardName: 'DORM BULLETIN BOARD',
    location: 'University Housing - Common Area',
    lastUpdate: 'Daily',
    posts: [
      { text: 'Textbooks for sale - Engineering 201, barely used, 40¤' },
      { text: 'Study group for finals - library room 3B, Thursdays' },
      { text: 'Subletting room for summer - cheap, close to campus' },
      { text: 'Lost laptop charger - will pay finder\'s fee' },
      { text: 'Pizza party Friday - BYOB, apt 12C' },
      { text: 'Protest against tuition hikes - meet at quad Saturday', color: 'yellow' },
    ],
    services: [
      'Tutoring - most subjects, student rates',
      'Laundry service - pick up/drop off (dorms only)',
      'Meal plan sharing - have extra swipes to trade',
    ],
    vibe: 'Mood: Stressed but hopeful, building solidarity',
  },
};

// Warehouse district - industrial workers
export const WarehouseDistrict = {
  args: {
    id: 'warehouse-board',
    boardName: 'WORKER BOARD',
    location: 'Warehouse District - Break Room',
    lastUpdate: 'Daily',
    posts: [
      { text: 'Union meeting Wednesday - everyone should come', color: 'yellow' },
      { text: 'Foreman\'s been cutting breaks short again - document it' },
      { text: 'Selling work boots - size 11, steel toe, 30¤' },
      { text: 'Carpool to night shift - leaving at 21:30, split gas' },
      { text: 'Anyone know a doc? Hurt my back, can\'t afford clinic' },
      { text: 'They\'re replacing us with bots next quarter - heard it from supervisor', color: 'red' },
    ],
    services: [
      'Unlicensed medical - worker injuries, no questions (cheap)',
      'Tool rental - have what you need, fair rates',
      'Resume help - getting out of manual labor (free)',
    ],
    vibe: 'Atmosphere: Exhausted, angry, sticking together',
  },
};

// Minimal board - new installation
export const MinimalBoard = {
  args: {
    id: 'new-board',
    boardName: 'COMMUNITY BOARD',
    location: 'New Development - Lobby',
    lastUpdate: 'Never',
    posts: [
      { text: 'Welcome to the neighborhood! - Management' },
    ],
    vibe: 'Vibe: Empty, sterile, no community yet',
  },
};
