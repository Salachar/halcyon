import Locked from './Locked';

export default {
  title: 'Terminal/Locked',
  component: Locked,
  parameters: {
    layout: 'padded',
  },
};

export const BlankProps = {
  args: {},
};

// ============================================================================
// WALLET THEME
// ============================================================================

export const WalletDefault = {
  name: 'Wallet - Default',
  args: {
    theme: 'wallet',
    title: 'DIGITAL WALLET',
    message: 'Authentication Required',
  },
};

export const WalletCorporate = {
  name: 'Wallet - Corporate Account',
  args: {
    theme: 'wallet',
    title: 'CORPORATE WALLET',
    message: 'Biometric Scan Required',
  },
};

export const WalletPersonal = {
  name: 'Wallet - Personal',
  args: {
    theme: 'wallet',
    title: 'PERSONAL ACCOUNT',
    message: 'PIN Code Required',
  },
};

// ============================================================================
// SAFE THEME
// ============================================================================

export const SafeDefault = {
  name: 'Safe - Default',
  args: {
    theme: 'safe',
    title: 'OFFICE SAFE',
    message: 'Combination Lock Active',
  },
};

export const SafeExecutive = {
  name: 'Safe - Executive',
  args: {
    theme: 'safe',
    title: 'EXECUTIVE SAFE',
    message: 'Dual Authentication Required',
  },
};

export const SafeStorage = {
  name: 'Safe - Storage',
  args: {
    theme: 'safe',
    title: 'SECURE STORAGE',
    message: 'Access Code Required',
  },
};

// ============================================================================
// VENDING THEME
// ============================================================================

export const VendingDefault = {
  name: 'Vending - Default',
  args: {
    theme: 'vending',
    title: 'SERVICE PANEL',
    message: 'Maintenance Mode',
  },
};

export const VendingQuickDrinx = {
  name: 'Vending - QuickDrinx',
  args: {
    theme: 'vending',
    title: 'QUICKDRINX 2000',
    message: 'Service Access Locked',
  },
};

export const VendingSnackMaster = {
  name: 'Vending - SnackMaster',
  args: {
    theme: 'vending',
    title: 'SNACKMASTER PRO',
    message: 'Technician Login Required',
  },
};

// ============================================================================
// TERMINAL THEME
// ============================================================================

export const TerminalDefault = {
  name: 'Terminal - Default',
  args: {
    theme: 'terminal',
    title: 'LOCKED',
    message: 'Authentication Required',
  },
};

export const TerminalSecurity = {
  name: 'Terminal - Security',
  args: {
    theme: 'terminal',
    title: 'SECURITY TERMINAL',
    message: 'Clearance Level 3 Required',
  },
};

export const TerminalAdmin = {
  name: 'Terminal - Admin',
  args: {
    theme: 'terminal',
    title: 'ADMIN CONSOLE',
    message: 'Root Access Required',
  },
};

export const TerminalMainframe = {
  name: 'Terminal - Mainframe',
  args: {
    theme: 'terminal',
    title: 'MAINFRAME ACCESS',
    message: 'Multi-Factor Authentication Required',
  },
};

// ============================================================================
// VAULT THEME
// ============================================================================

export const VaultDefault = {
  name: 'Vault - Default',
  args: {
    theme: 'vault',
    title: 'VAULT',
    message: 'Time Lock Active',
  },
};

export const VaultBank = {
  name: 'Vault - Bank',
  args: {
    theme: 'vault',
    title: 'BANK VAULT',
    message: 'Dual Key System Required',
  },
};

export const VaultDataCenter = {
  name: 'Vault - Data Center',
  args: {
    theme: 'vault',
    title: 'DATA VAULT',
    message: 'Retinal Scan + PIN Required',
  },
};

export const VaultCorporate = {
  name: 'Vault - Corporate',
  args: {
    theme: 'vault',
    title: 'CORPORATE VAULT',
    message: 'Executive Authorization Required',
  },
};

// ============================================================================
// LOCKER THEME
// ============================================================================

export const LockerDefault = {
  name: 'Locker - Default',
  args: {
    theme: 'locker',
    title: 'LOCKER',
    message: 'Key Required',
  },
};

export const LockerEmployee = {
  name: 'Locker - Employee',
  args: {
    theme: 'locker',
    title: 'EMPLOYEE LOCKER',
    message: 'Badge Scan Required',
  },
};

export const LockerGym = {
  name: 'Locker - Gym',
  args: {
    theme: 'locker',
    title: 'GYM LOCKER #47',
    message: 'Combination Lock Active',
  },
};

export const LockerStorage = {
  name: 'Locker - Storage Unit',
  args: {
    theme: 'locker',
    title: 'STORAGE UNIT 204',
    message: 'Padlock Secured',
  },
};

// ============================================================================
// SPECIAL CASES
// ============================================================================

export const ShortTitle = {
  name: 'Special - Short Title',
  args: {
    theme: 'safe',
    title: 'SAFE',
    message: 'Locked',
  },
};

export const LongTitle = {
  name: 'Special - Long Title',
  args: {
    theme: 'terminal',
    title: 'MAXIMUM SECURITY CLEARANCE TERMINAL',
    message: 'Multi-Factor Biometric Authentication System Required',
  },
};

export const MinimalMessage = {
  name: 'Special - Minimal',
  args: {
    theme: 'vault',
    title: 'VAULT',
    message: 'Locked',
  },
};

// ============================================================================
// GAME SCENARIOS
// ============================================================================

export const CasinoSafe = {
  name: 'Scenario - Casino Safe',
  args: {
    theme: 'safe',
    title: 'MANAGER SAFE',
    message: 'Combination Required',
  },
};

export const ATMService = {
  name: 'Scenario - ATM Service',
  args: {
    theme: 'terminal',
    title: 'ATM SERVICE MODE',
    message: 'Technician Code Required',
  },
};

export const PowerCoreAccess = {
  name: 'Scenario - Power Core',
  args: {
    theme: 'vault',
    title: 'POWER CORE ACCESS',
    message: 'Retinal Scan Required',
  },
};

export const VIPLounge = {
  name: 'Scenario - VIP Lounge',
  args: {
    theme: 'terminal',
    title: 'VIP LOUNGE ACCESS',
    message: 'Membership Verification Required',
  },
};

export const EvidenceLocker = {
  name: 'Scenario - Evidence Locker',
  args: {
    theme: 'locker',
    title: 'EVIDENCE LOCKER 7B',
    message: 'Chain of Custody Required',
  },
};

export const WeaponsCache = {
  name: 'Scenario - Weapons Cache',
  args: {
    theme: 'vault',
    title: 'ARMORY VAULT',
    message: 'Security Clearance 5 Required',
  },
};

export const HackerStash = {
  name: 'Scenario - Hacker Stash',
  args: {
    theme: 'safe',
    title: 'ENCRYPTED STORAGE',
    message: 'Passphrase Required',
  },
};

export const CorporateFiles = {
  name: 'Scenario - Corporate Files',
  args: {
    theme: 'terminal',
    title: 'CLASSIFIED FILES',
    message: 'Executive Access Only',
  },
};
