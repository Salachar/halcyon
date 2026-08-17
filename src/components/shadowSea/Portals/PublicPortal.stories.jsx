import PublicPortal from './PublicPortal';

export default {
  title: 'Terminal/PublicPortal',
  component: PublicPortal,
};

export const BlankProps = {
  args: {},
};

// Corner bodega
export const BodegaPortal = {
  args: {
    name: 'LUCKY STAR BODEGA',
    tagline: 'Your neighborhood convenience store',
    network: 'FREE_BODEGA_5G',
    signalStrength: 'strong',
    status: 'OPEN 24/7',
    statusColor: 'neon',
    nowPlaying: 'Lo-Fi Beats Radio',
    notes: [
      'Free WiFi for customers',
      'Fresh coffee always brewing',
      'Lottery tickets available',
      'ATM inside',
    ],
    theme: 'friendly',
  },
};

// Dive bar
export const BarPortal = {
  args: {
    name: 'THE RUSTY ANCHOR',
    tagline: 'Where locals drink',
    network: 'ANCHOR_FREE_WIFI',
    signalStrength: 'medium',
    status: 'OPEN - Happy Hour!',
    statusColor: 'neon',
    nowPlaying: 'Live Blues - The Delta Kings',
    notes: [
      'Happy hour: 4pm-7pm daily',
      'Pool table in back',
      'Cash preferred',
      'No outside drinks',
    ],
    theme: 'casual',
  },
};

// Nightclub
export const NightclubPortal = {
  args: {
    name: 'CAVE CLUB',
    tagline: 'Where the night never ends',
    network: 'CAVE_VIP_NET',
    signalStrength: 'strong',
    status: 'OPEN - DJ SET LIVE',
    statusColor: 'neon',
    nowPlaying: 'DJ Voltage - Neon Dreams Mix',
    notes: [
      '21+ only - Valid ID required',
      'VIP tables available',
      'Coat check: 2¤',
      'No cameras inside',
    ],
    theme: 'party',
  },
};

// Nightclub
export const NightclubLimePortal = {
  args: {
    name: 'CAVE CLUB',
    tagline: 'Where the night never ends',
    network: 'CAVE_VIP_NET',
    signalStrength: 'strong',
    status: 'OPEN - DJ SET LIVE',
    statusColor: 'neon',
    nowPlaying: 'DJ Voltage - Neon Dreams Mix',
    notes: [
      '21+ only - Valid ID required',
      'VIP tables available',
      'Coat check: 2¤',
      'No cameras inside',
    ],
    theme: 'limeade',
  },
};

// Coffee shop
export const CoffeeShopPortal = {
  args: {
    name: 'GROUNDED CAFÉ',
    tagline: 'Locally roasted, lovingly brewed',
    network: 'GROUNDED_FREE_WIFI',
    signalStrength: 'strong',
    status: 'OPEN',
    statusColor: 'neon',
    nowPlaying: 'Acoustic Indie Playlist',
    notes: [
      'Free WiFi - No password needed',
      'Please order every 2 hours',
      'Power outlets at every table',
      'Study-friendly atmosphere',
    ],
    theme: 'friendly',
  },
};

// Pizza place
export const PizzaPlacePortal = {
  args: {
    name: 'NEON PIZZA',
    tagline: 'Slices bigger than your problems',
    network: 'NEON_PIZZA_GUEST',
    signalStrength: 'medium',
    status: 'OPEN - Hot & Ready',
    statusColor: 'neon',
    notes: [
      'Order online or at counter',
      'Free delivery over 15¤',
      'Slice deals after 9pm',
      'Vegan cheese available',
    ],
    theme: 'friendly',
  },
};

// Arcade
export const ArcadePortal = {
  args: {
    name: 'PIXEL PALACE',
    tagline: 'Where the 80s never ended',
    network: 'PIXEL_ARCADE_FREE',
    signalStrength: 'strong',
    status: 'OPEN',
    statusColor: 'neon',
    nowPlaying: 'Synthwave Classics Channel',
    notes: [
      'All games 25¢',
      'Monthly high score tournament',
      'Free play birthday special',
      'Retro snack bar open',
    ],
    theme: 'party',
  },
};

// Laundromat
export const LaundryPortal = {
  args: {
    name: 'SPIN CYCLE',
    tagline: 'Clean clothes, chill vibes',
    network: 'SPIN_CYCLE_WIFI',
    signalStrength: 'strong',
    status: 'OPEN',
    statusColor: 'neon',
    notes: [
      'Last wash at 10pm',
      'Change machine available',
      'Free WiFi & TV',
      'Folding tables in back',
    ],
    theme: 'casual',
  },
};

// Gym
export const GymPortal = {
  args: {
    name: 'POWER FITNESS',
    tagline: 'No judgment, just gains',
    network: 'POWER_FIT_MEMBERS',
    signalStrength: 'strong',
    status: 'OPEN 24/7',
    statusColor: 'neon',
    nowPlaying: 'Workout Mix - High Energy',
    notes: [
      'Members only network',
      'Classes: Check schedule board',
      'Personal trainers available',
      'Towel service included',
    ],
    theme: 'friendly',
  },
};

// Closed business
export const ClosedBusiness = {
  args: {
    name: 'SUNSET DINER',
    tagline: 'Breakfast served all day',
    network: 'DINER_GUEST_WIFI',
    signalStrength: 'weak',
    status: 'CLOSED - Opens 6am',
    statusColor: 'red',
    notes: [
      'Hours: 6am - 11pm daily',
      'Weekend brunch special',
      'Call ahead for large parties',
    ],
    theme: 'friendly',
  },
};

// Maintenance mode
export const MaintenanceMode = {
  args: {
    name: 'CHROME CUSTOMS',
    tagline: 'Auto repair & customization',
    network: 'CHROME_SHOP_NET',
    signalStrength: 'medium',
    status: 'CLOSED - Inventory Day',
    statusColor: 'yellow',
    notes: [
      'Closed for inventory',
      'Reopen Monday 8am',
      'Emergency service: Call 555-AUTO',
    ],
    theme: 'casual',
  },
};

// Record store
export const RecordStorePortal = {
  args: {
    name: 'VINYL VAULT',
    tagline: 'Dig deeper, sound better',
    network: 'VAULT_RECORDS_FREE',
    signalStrength: 'strong',
    status: 'OPEN - New Arrivals!',
    statusColor: 'neon',
    nowPlaying: 'Spinning: Miles Davis - Kind of Blue',
    notes: [
      'Listening stations available',
      'We buy collections',
      'Special orders welcome',
      'Turntables & gear in stock',
    ],
    theme: 'casual',
  },
};

// Tattoo parlor
export const TattooParlorPortal = {
  args: {
    name: 'INK & STEEL',
    tagline: 'Art that lasts forever',
    network: 'INK_STEEL_GUEST',
    signalStrength: 'strong',
    status: 'OPEN - Walk-ins Welcome',
    statusColor: 'neon',
    nowPlaying: 'Rock Radio - Tattoo Shop Mix',
    notes: [
      'Free consultations',
      'Book online or walk-in',
      '5 artists on duty',
      'Piercings also available',
    ],
    theme: 'party',
  },
};

// Bookstore
export const BookstorePortal = {
  args: {
    name: 'DOG-EARED BOOKS',
    tagline: 'New, used, and loved',
    network: 'BOOKSTORE_WIFI',
    signalStrength: 'strong',
    status: 'OPEN',
    statusColor: 'neon',
    notes: [
      'Browse as long as you like',
      'Book club tonight 7pm',
      'We buy & trade books',
      'Reading nook upstairs',
    ],
    theme: 'friendly',
  },
};

// Special event
export const SpecialEvent = {
  args: {
    name: 'THE UNDERGROUND STAGE',
    tagline: 'Live music venue',
    network: 'STAGE_GUEST_WIFI',
    signalStrength: 'medium',
    status: 'TONIGHT: Local Bands!',
    statusColor: 'neon',
    nowPlaying: 'Soundcheck in Progress',
    notes: [
      'Doors open: 8pm',
      'Show starts: 9pm',
      'Cover: 8¤',
      'All ages until 9pm, 21+ after',
    ],
    theme: 'party',
  },
};

// Fast food
export const FastFoodPortal = {
  args: {
    name: 'BURGER BLITZ',
    tagline: 'Fast food, faster service',
    network: 'BLITZ_FREE_WIFI',
    signalStrength: 'strong',
    status: 'OPEN - Drive Thru Active',
    statusColor: 'neon',
    notes: [
      'Mobile orders ready in 5 min',
      'Combo deals all day',
      'Drive thru open til midnight',
    ],
    theme: 'casual',
  },
};

// Minimal portal
export const MinimalPortal = {
  args: {
    name: 'LOCAL SHOP',
    network: 'GUEST_WIFI',
    signalStrength: 'medium',
    status: 'OPEN',
    statusColor: 'neon',
    theme: 'friendly',
  },
};

// Weak signal
export const WeakSignalPortal = {
  args: {
    name: 'BASEMENT VENUE',
    tagline: 'Underground music & arts',
    network: 'BASEMENT_NET',
    signalStrength: 'weak',
    status: 'OPEN',
    statusColor: 'neon',
    notes: [
      'Signal weak underground',
      'Best connection near entrance',
      'Check website for events',
    ],
    theme: 'party',
  },
};

// Casino
export const CasinoPortal = {
  args: {
    name: 'LUCKY FLIGHT CASINO',
    tagline: 'Your luck starts here',
    network: 'LUCKY_GUEST_WIFI',
    signalStrength: 'strong',
    status: 'OPEN 24/7',
    statusColor: 'neon',
    nowPlaying: 'Smooth Jazz - Casino Lounge',
    notes: [
      '21+ ID required',
      'Poker tournament tonight 8pm',
      'VIP lounge upstairs',
      'Complimentary drinks while playing',
    ],
    theme: 'party',
  },
};

// Food truck
export const FoodTruckPortal = {
  args: {
    name: 'TACO NEON TRUCK',
    tagline: 'Street tacos done right',
    network: 'TACO_TRUCK_WIFI',
    signalStrength: 'medium',
    status: 'PARKED & SERVING',
    statusColor: 'neon',
    notes: [
      'Location: Canal St & 5th',
      'Cash only',
      'Follow us for daily locations',
      'Catering available',
    ],
    theme: 'friendly',
  },
};

// Thrift store
export const ThriftStorePortal = {
  args: {
    name: 'SECOND CHANCE THRIFT',
    tagline: 'Treasure hunting for everyone',
    network: 'THRIFT_SHOP_FREE',
    signalStrength: 'medium',
    status: 'OPEN - New Donations!',
    statusColor: 'neon',
    notes: [
      'New items daily',
      'Donations accepted Mon-Fri',
      'Student discount 10%',
      'Proceeds support local charities',
    ],
    theme: 'friendly',
  },
};

// Pet shop
export const PetShopPortal = {
  args: {
    name: 'PAWS & CLAWS',
    tagline: 'Everything your pet needs',
    network: 'PAWS_WIFI',
    signalStrength: 'strong',
    status: 'OPEN',
    statusColor: 'neon',
    notes: [
      'Grooming by appointment',
      'Adoption event this Saturday',
      'Pet-friendly shopping',
      'Loyalty rewards program',
    ],
    theme: 'friendly',
  },
};

// Bike shop
export const BikeShopPortal = {
  args: {
    name: 'CYCLE CITY',
    tagline: 'Ride more, drive less',
    network: 'CYCLE_SHOP_NET',
    signalStrength: 'strong',
    status: 'OPEN',
    statusColor: 'neon',
    notes: [
      'Same-day repairs available',
      'Test rides welcome',
      'Trade-in program',
      'Group rides every Sunday',
    ],
    theme: 'casual',
  },
};

// Comic book store
export const ComicStorePortal = {
  args: {
    name: 'COSMIC COMICS',
    tagline: 'Your universe of comics',
    network: 'COSMIC_GUEST_WIFI',
    signalStrength: 'strong',
    status: 'OPEN - New Comics Wednesday!',
    statusColor: 'neon',
    nowPlaying: 'Superhero Movie Soundtracks',
    notes: [
      'New releases every Wednesday',
      'Pull list service available',
      'Game night Fridays 7pm',
      'Buy/sell/trade collectibles',
    ],
    theme: 'party',
  },
};

// Flower shop
export const FlowerShopPortal = {
  args: {
    name: 'BLOOM & GROW',
    tagline: 'Fresh flowers, happy hours',
    network: 'BLOOM_WIFI',
    signalStrength: 'strong',
    status: 'OPEN',
    statusColor: 'neon',
    notes: [
      'Same-day delivery available',
      'Custom arrangements',
      'Wedding consultations by appt',
      'Houseplant care advice',
    ],
    theme: 'friendly',
  },
};
