import Icons from "./icons";

export const FAVICON_MAP = {
  // Access & Network
  'Internal Access': Icons.LAN,
  'Corporate Portal': Icons.LAN,
  'Facility Network': Icons.LAN,
  'Building Network': Icons.LAN,
  'Network': Icons.LAN,

  // People
  'Personnel Files': Icons.Person,
  'Personnel': Icons.Person,
  'Residents': Icons.Person,
  'Resident Directory': Icons.Person,
  'VIP List': Icons.Person,

  // Security
  'Building Access': Icons.Lock,
  'Access Control': Icons.Lock,
  'Security': Icons.Security,
  'Security Office': Icons.Security,
  'Security Cameras': Icons.Camera,
  'Camera Grid': Icons.Camera,
  'Camera Coverage': Icons.Camera,

  // Files & Records
  'Facility Directory': Icons.Files,
  'Building Directory': Icons.Files,
  'Shift Schedule': Icons.Schedule,
  'Incident Log': Icons.Files,
  'Stock Records': Icons.Inventory,
  'Back Lot Inventory': Icons.Inventory,
  'Facility Blueprints': Icons.Files,

  // Rooms
  'Concierge': Icons.Room,
  'Reception': Icons.Room,
  'Lobby': Icons.Room,
  'Basement': Icons.Maintenance,
  'Bathrooms': Icons.Room,
  'Smart Bin': Icons.Trash,
  'SmartBin': Icons.Trash,

  // Devices (partial match via function)
  // handled separately — see getDefaultFavicon below
};

// Partial match patterns — checked if no exact match found
export const FAVICON_PATTERNS = [
  { match: /workstation/i, icon: Icons.Computer },
  { match: /terminal/i, icon: Icons.Computer },
  { match: /camera/i, icon: Icons.Camera },
  { match: /safe/i, icon: Icons.Lock },
  { match: /blueprint/i, icon: Icons.Files },
  { match: /office/i, icon: Icons.Room },
  { match: /radio/i, icon: Icons.Radio },
  { match: /fridge/i, icon: Icons.Fridge },
  { match: /vending/i, icon: Icons.Vending },
  { match: /coffee/i, icon: Icons.CoffeeMachine },
  { match: /schedule/i, icon: Icons.Schedule },
  { match: /inventory/i, icon: Icons.Inventory },
  { match: /personnel/i, icon: Icons.Person },
  { match: /network/i, icon: Icons.LAN },
  { match: /security/i, icon: Icons.Security },
  { match: /maintenance/i, icon: Icons.Maintenance },
  { match: /regulator/i, icon: Icons.Maintenance },
  { match: /generator/i, icon: Icons.Maintenance },
  { match: /briefing/i, icon: Icons.Briefing },
  { match: /bounty/i, icon: Icons.Bounty },
  { match: /floor/i, icon: Icons.Files },
  { match: /atm/i, icon: Icons.ATM },
];

export const getDefaultFavicon = (displayName) => {
  if (!displayName) return null;

  const FaviconExact = FAVICON_MAP[displayName];
  if (FaviconExact) return <FaviconExact />;

  const FaviconMatch = FAVICON_PATTERNS.find(p => p.match.test(displayName));
  if (FaviconMatch) return <FaviconMatch.icon />;

  return null;
};
