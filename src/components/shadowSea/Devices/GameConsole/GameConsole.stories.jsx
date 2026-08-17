import GameConsole from './GameConsole';

export default {
  title: 'Terminal/GameConsole',
  component: GameConsole,
};

export const BlankProps = {
  args: {},
};

// Active gaming session
export const ActiveSession = {
  args: {
    model: 'CyberDeck Pro X',
    owner: 'ShadowRunner_42',
    gameLoaded: 'Neon Warfare: Infinite',
    friends: [
      { name: 'xXDragonSlayerXx', status: 'online', game: 'Neon Warfare: Infinite' },
      { name: 'CyberNinja_99', status: 'online', game: 'Neon Warfare: Infinite' },
      { name: 'PhantomGhost', status: 'online', game: 'Street Racer Ultimate' },
      { name: 'TechWizard', status: 'offline' },
      { name: 'NeonSamurai', status: 'online', game: 'Cyber Souls IV' },
      { name: 'GlitchMaster', status: 'offline' },
    ],
  },
};

// Solo gaming
export const SoloPlayer = {
  args: {
    model: 'CyberDeck Elite',
    owner: 'LoneWolf_777',
    gameLoaded: 'Dark Sector Chronicles',
    friends: [
      { name: 'OldFriend_2019', status: 'offline' },
      { name: 'BusyGamer', status: 'offline' },
      { name: 'RarelyOnline', status: 'offline' },
    ],
  },
};

// Party ready
export const PartyReady = {
  args: {
    model: 'GameStation Z9',
    owner: 'PartyLeader_Mike',
    gameLoaded: 'Squad Ops: Urban Assault',
    friends: [
      { name: 'TacticalTom', status: 'online', game: 'Squad Ops: Urban Assault' },
      { name: 'SniperSarah', status: 'online', game: 'Squad Ops: Urban Assault' },
      { name: 'MedicMark', status: 'online', game: 'Squad Ops: Urban Assault' },
      { name: 'EngineerEvan', status: 'online', game: 'Squad Ops: Urban Assault' },
      { name: 'ScoutSteve', status: 'online', game: 'Squad Ops: Urban Assault' },
    ],
  },
};

// RPG session
export const RPGPlayer = {
  args: {
    model: 'QuantumBox Series S',
    owner: 'DragonMage_Luna',
    gameLoaded: 'Elder Scrolls: Cyber Edition',
    friends: [
      { name: 'KnightOfLight', status: 'online', game: 'Elder Scrolls: Cyber Edition' },
      { name: 'DarkSorcerer', status: 'online', game: 'Final Fantasy: Neon' },
      { name: 'HealerHope', status: 'offline' },
      { name: 'RogueRunner', status: 'online', game: 'Cyberpunk 2088' },
      { name: 'PaladinPete', status: 'online', game: 'Elder Scrolls: Cyber Edition' },
      { name: 'ArcherAmy', status: 'offline' },
      { name: 'BardBob', status: 'online', game: 'Elder Scrolls: Cyber Edition' },
    ],
  },
};

// Racing enthusiast
export const RacingFan = {
  args: {
    model: 'SpeedDeck Turbo',
    owner: 'NitroKing_88',
    gameLoaded: 'Underground Racing: Neon Nights',
    friends: [
      { name: 'DriftMaster', status: 'online', game: 'Underground Racing: Neon Nights' },
      { name: 'TurboCharged', status: 'online', game: 'Underground Racing: Neon Nights' },
      { name: 'SpeedDemon_X', status: 'online', game: 'Street Racer Ultimate' },
      { name: 'NightRider', status: 'offline' },
      { name: 'BurnoutQueen', status: 'online', game: 'Underground Racing: Neon Nights' },
    ],
  },
};

// Fighting game community
export const FightingGamePro = {
  args: {
    model: 'ArcadeDeck Pro',
    owner: 'ComboKing_Ken',
    gameLoaded: 'Cyber Fighter V: Tournament Edition',
    friends: [
      { name: 'FramePerfect', status: 'online', game: 'Cyber Fighter V: Tournament Edition' },
      { name: 'InfiniteCombo', status: 'online', game: 'Cyber Fighter V: Tournament Edition' },
      { name: 'ShotoClone_23', status: 'online', game: 'Street Brawler Ultra' },
      { name: 'GrapplerGary', status: 'offline' },
      { name: 'RushdownRita', status: 'online', game: 'Cyber Fighter V: Tournament Edition' },
      { name: 'ZonerZack', status: 'online', game: 'Cyber Fighter V: Tournament Edition' },
    ],
  },
};

// Horror game enthusiast
export const HorrorGamer = {
  args: {
    model: 'CyberDeck Shadow',
    owner: 'ScreamQueen_13',
    gameLoaded: 'Silent Sector 4: The Awakening',
    friends: [
      { name: 'FearlessGamer', status: 'online', game: 'Silent Sector 4: The Awakening' },
      { name: 'JumpScareFan', status: 'offline' },
      { name: 'SurvivalHorrorKid', status: 'online', game: 'Resident Evil: Neon' },
      { name: 'CreepyPastaMike', status: 'online', game: 'Silent Sector 4: The Awakening' },
    ],
  },
};

// Retro gaming collector
export const RetroCollector = {
  args: {
    model: 'RetroStation Classic',
    owner: 'PixelPerfect_1985',
    gameLoaded: '8-Bit Adventures: Remastered',
    friends: [
      { name: 'CRTMonitor', status: 'online', game: 'Mega Man: Cyber Edition' },
      { name: 'ChiptuneKing', status: 'online', game: 'Metroid: Neon Prime' },
      { name: 'SpriteArtist', status: 'offline' },
      { name: 'ArcadeWizard', status: 'online', game: 'Pac-Man: Championship DX' },
      { name: 'ClassicGamer', status: 'offline' },
    ],
  },
};

// MMORPG player
export const MMOPlayer = {
  args: {
    model: 'CyberDeck Pro X',
    owner: 'GuildMaster_Rex',
    gameLoaded: 'World of Warcraft: Cyber Realms',
    friends: [
      { name: 'TankCommander', status: 'online', game: 'World of Warcraft: Cyber Realms' },
      { name: 'HealBot_9000', status: 'online', game: 'World of Warcraft: Cyber Realms' },
      { name: 'DPS_Warrior', status: 'online', game: 'World of Warcraft: Cyber Realms' },
      { name: 'LootHunter', status: 'offline' },
      { name: 'RaidLeader', status: 'online', game: 'World of Warcraft: Cyber Realms' },
      { name: 'PvPChampion', status: 'online', game: 'World of Warcraft: Cyber Realms' },
      { name: 'CasualPlayer', status: 'offline' },
      { name: 'Crafter_Pro', status: 'online', game: 'World of Warcraft: Cyber Realms' },
    ],
  },
};

// Battle royale squad
export const BattleRoyaleSquad = {
  args: {
    model: 'GameStation Z9',
    owner: 'DropMaster_99',
    gameLoaded: 'Apex Legends: Neon Storm',
    friends: [
      { name: 'HotDropHero', status: 'online', game: 'Apex Legends: Neon Storm' },
      { name: 'LootGoblin_42', status: 'online', game: 'Apex Legends: Neon Storm' },
      { name: 'SnipeGod', status: 'online', game: 'Fortnite: Cyber Edition' },
      { name: 'BuilderPro', status: 'offline' },
      { name: 'ClutchKing', status: 'online', game: 'Apex Legends: Neon Storm' },
    ],
  },
};

// Sports gamer
export const SportsGamer = {
  args: {
    model: 'SportsStation Elite',
    owner: 'MVP_Jordan',
    gameLoaded: 'NBA 2K: Cyber League',
    friends: [
      { name: 'ThreePointShooter', status: 'online', game: 'NBA 2K: Cyber League' },
      { name: 'DunkMaster', status: 'online', game: 'NBA 2K: Cyber League' },
      { name: 'FIFA_Fanatic', status: 'online', game: 'FIFA: Neon Edition' },
      { name: 'MaddenPro', status: 'offline' },
      { name: 'BaseballKid', status: 'online', game: 'MLB: The Show Cyber' },
    ],
  },
};

// Minimal setup (no game, few friends)
export const MinimalSetup = {
  args: {
    model: 'BudgetDeck Lite',
    owner: 'NewGamer_001',
    friends: [
      { name: 'OlderBrother', status: 'offline' },
      { name: 'SchoolFriend', status: 'online', game: 'Minecraft: Cyber Edition' },
    ],
  },
};

// No friends (forever alone)
export const SoloGamer = {
  args: {
    model: 'CyberDeck Pro X',
    owner: 'IntrovertGamer',
    gameLoaded: 'The Witcher 4: Neon Hunt',
    friends: [],
  },
};

// Streamer setup
export const StreamerSetup = {
  args: {
    model: 'StreamDeck Pro Max',
    owner: 'TwitchStar_Live',
    gameLoaded: 'Just Chatting',
    friends: [
      { name: 'Mod_Alpha', status: 'online', game: 'Watching stream' },
      { name: 'Mod_Beta', status: 'online', game: 'Watching stream' },
      { name: 'TopDonator_123', status: 'online', game: 'Just Chatting' },
      { name: 'SubGifter_Pro', status: 'online', game: 'Just Chatting' },
      { name: 'ViewerFan_42', status: 'online', game: 'Watching stream' },
      { name: 'LurkingViewer', status: 'online' },
      { name: 'RaidLeader_99', status: 'offline' },
      { name: 'ClipChampion', status: 'online', game: 'Watching stream' },
    ],
  },
};

// Competitive player
export const CompetitivePlayer = {
  args: {
    model: 'ProDeck Tournament Edition',
    owner: 'eSports_Champion',
    gameLoaded: 'Counter-Strike: Neon Offensive',
    friends: [
      { name: 'TeamCaptain', status: 'online', game: 'Counter-Strike: Neon Offensive' },
      { name: 'Entry_Fragger', status: 'online', game: 'Counter-Strike: Neon Offensive' },
      { name: 'AWP_God', status: 'online', game: 'Counter-Strike: Neon Offensive' },
      { name: 'Support_Player', status: 'online', game: 'Counter-Strike: Neon Offensive' },
      { name: 'Lurker_Pro', status: 'online', game: 'Counter-Strike: Neon Offensive' },
      { name: 'Coach_Strategy', status: 'offline' },
    ],
  },
};

// Variety gamer
export const VarietyGamer = {
  args: {
    model: 'CyberDeck Pro X',
    owner: 'GameHopper_360',
    gameLoaded: 'Indie Game Collection Vol. 4',
    friends: [
      { name: 'FPSFanatic', status: 'online', game: 'Call of Duty: Neon Ops' },
      { name: 'RPGLover', status: 'online', game: 'Elden Ring: Cyber Edition' },
      { name: 'PuzzleMaster', status: 'online', game: 'Portal 3: Neon Chambers' },
      { name: 'PlatformerPro', status: 'offline' },
      { name: 'SimsFanatic', status: 'online', game: 'The Sims: Cyber Life' },
      { name: 'SandboxBuilder', status: 'online', game: 'Minecraft: Cyber Edition' },
    ],
  },
};
