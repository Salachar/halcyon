import Extractable from './Extractable';

export default {
  title: 'Terminal/Extractable',
  component: Extractable,
  parameters: {
    layout: 'padded',
  },
};

// ============================================================================
// STEALING MODE (Criminal Activities)
// ============================================================================

export const BlankProps = {
  args: {},
};

export const StealingSafe = {
  name: 'Stealing - Safe (Both Physical & Digital)',
  args: {
    id: 'story-safe-master-bedroom',
    physicalItems: [
      { id: 'credits_physical', label: 'Credits', description: 'Physical currency', value: 5000, isCredits: true },
      { id: 'access_keycard', label: 'Access Keycard', description: 'Manager-level clearance' },
    ],
    digitalItems: [
      { id: 'employee_records', label: 'Employee Records', description: 'Full personnel database' },
      { id: 'financial_reports', label: 'Financial Reports', description: 'Q3 2067 statements' },
      { id: 'security_codes', label: 'Security Codes', description: 'Building access codes', value: 2500, isCredits: true },
    ],
    stealing: true,
  },
};

export const StealingPhysicalOnly = {
  name: 'Stealing - Physical Only (Cash Stash)',
  args: {
    id: 'story-coffee-machine-stash',
    physicalItems: [
      { id: 'credstick', label: 'Credstick', description: '1,200¤', value: 1200, isCredits: true },
      { id: 'data_chip', label: 'Data chip', description: "Labeled 'Insurance' - encrypted" },
      { id: 'note', label: 'Note', description: "'For emergencies only - J'" },
    ],
    stealing: true,
  },
};

export const BasicCredits = {
  name: 'Basic Credits Extractable',
  args: {
    id: 'story-basic-credits',
    credits: 15,
  },
};

export const StealingDigitalOnly = {
  name: 'Stealing - Digital Only (Data Heist)',
  args: {
    id: 'story-atm-skim',
    digitalItems: [
      { id: 'transaction_skim', label: 'Transaction Skim', description: 'Small % from daily transactions', value: 850, isCredits: true },
    ],
    stealing: true,
  },
};

export const StealingGameWallet = {
  name: 'Stealing - Game Console Wallet',
  args: {
    id: 'story-game-wallet',
    digitalItems: [
      { id: 'ingame_credits', label: 'In-game credits', description: '47,500 credits (black market convertible)', value: 11875, isCredits: true },
    ],
    stealing: true,
  },
};

export const StealingMatchFixingData = {
  name: 'Stealing - Match-Fixing Evidence (High Value)',
  args: {
    id: 'story-penthouse-safe',
    digitalItems: [
      { id: 'data_chip_matchfix', label: 'Data Chip', description: 'Match-fixing evidence: Alliansen Inc. + TG Labs collusion', value: 9000, isCredits: true },
    ],
    stealing: true,
  },
};

// ============================================================================
// NON-STEALING MODE (Legitimate Actions)
// ============================================================================

export const TakingFromFridge = {
  name: 'Taking - Fridge/Freezer Contents',
  args: {
    id: 'story-freezer-blackout',
    physicalItems: [
      { id: 'blackout', label: 'Blackout (10 doses)', description: 'Sedative/anesthetic - frozen storage', value: 1500, isCredits: true },
    ],
    stealing: false,
  },
};

export const TakingFromDrawer = {
  name: 'Taking - Guest Room Drawer',
  args: {
    id: 'story-guest-drawer',
    physicalItems: [
      { id: 'faceblock_drawer', label: 'Faceblock (2 packs)', description: 'Facial recognition blocker', value: 300, isCredits: true },
    ],
    stealing: false,
  },
};

export const TakingBackpack = {
  name: 'Taking - Backpack Contents',
  args: {
    id: 'story-backpack-closet',
    physicalItems: [
      { id: 'credstick_backpack', label: 'Credstick', description: '2,500¤', value: 2500, isCredits: true },
      { id: 'vurt_backpack', label: 'Vurt (1 dose)', description: 'High-grade hallucinogen', value: 300, isCredits: true },
    ],
    stealing: false,
  },
};

export const ClaimingBounty = {
  name: 'Claiming - Bounty Payment',
  args: {
    id: 'story-bounty-viktor',
    digitalItems: [
      { id: 'bounty_payment', label: 'Bounty Payment', description: 'Proof of capture submitted', value: 50000, isCredits: true },
    ],
    stealing: false,
  },
};

export const ClaimingReward = {
  name: 'Claiming - Contract Reward',
  args: {
    id: 'story-contract-payment',
    digitalItems: [
      { id: 'contract_payment', label: 'Contract Payment', description: '5,000¤ base reward', value: 5000, isCredits: true },
      { id: 'reputation_bonus', label: 'Reputation Bonus', description: '+50 street cred' },
    ],
    stealing: false,
  },
};

export const RetrievingMedicalSupplies = {
  name: 'Retrieving - Medical Supplies',
  args: {
    id: 'story-doc-joy-supplies',
    physicalItems: [
      { id: 'faceblock_medical', label: 'Faceblock (3 doses)', description: 'Facial recognition blocker', value: 450, isCredits: true },
      { id: 'red_juice', label: 'Red-juice (2 doses)', description: 'Emergency healing stimulant', value: 600, isCredits: true },
      { id: 'vurt_medical', label: 'Vurt (1 dose)', description: 'High-grade hallucinogen', value: 300, isCredits: true },
    ],
    digitalItems: [
      { id: 'crypto_wallet', label: 'Crypto Wallet', description: 'Emergency funds access', value: 2500, isCredits: true },
    ],
    stealing: false,
  },
};

// ============================================================================
// EDGE CASES & STATES
// ============================================================================

export const NoItems = {
  name: 'Edge Case - No Items',
  args: {
    id: 'story-empty',
    physicalItems: [],
    digitalItems: [],
    stealing: false,
  },
};

export const Disabled = {
  name: 'State - Disabled',
  args: {
    id: 'story-disabled',
    physicalItems: [
      { id: 'locked_item', label: 'Locked Item', description: 'Cannot be accessed yet' },
    ],
    stealing: true,
    disabled: true,
  },
};

export const HighValueHeist = {
  name: 'Scenario - High Value Mixed Heist',
  args: {
    id: 'story-mega-heist',
    physicalItems: [
      { id: 'platinum_credstick', label: 'Platinum Credstick', description: 'Corp executive account', value: 25000, isCredits: true },
      { id: 'prototype_chrome', label: 'Prototype Chrome', description: 'Unreleased military-grade implant', value: 15000, isCredits: true },
      { id: 'bearer_bonds', label: 'Bearer Bonds', description: 'Untraceable securities', value: 50000, isCredits: true },
    ],
    digitalItems: [
      { id: 'corporate_secrets', label: 'Corporate Secrets', description: 'Alliansen R&D database', value: 100000, isCredits: true },
      { id: 'blackmail_files', label: 'Blackmail Files', description: 'Exec compromising material', value: 75000, isCredits: true },
      { id: 'crypto_keys', label: 'Crypto Keys', description: 'Access to offshore accounts', value: 200000, isCredits: true },
    ],
    stealing: true,
  },
};

export const SimpleSupplyRun = {
  name: 'Scenario - Simple Supply Run',
  args: {
    id: 'story-supply-run',
    physicalItems: [
      { id: 'protein_bars', label: 'Protein Bars (5)', description: 'Emergency rations' },
      { id: 'water_bottles', label: 'Water Bottles (3)', description: 'Purified water' },
      { id: 'first_aid_kit', label: 'First Aid Kit', description: 'Basic medical supplies' },
    ],
    stealing: false,
  },
};

export const DataOnlyInfiltration = {
  name: 'Scenario - Pure Data Infiltration',
  args: {
    id: 'story-data-heist',
    digitalItems: [
      { id: 'employee_database', label: 'Employee Database', description: 'Personnel records and credentials' },
      { id: 'security_protocols', label: 'Security Protocols', description: 'Building access codes and procedures' },
      { id: 'client_list', label: 'Client List', description: 'Corporate client information' },
      { id: 'financial_ledger', label: 'Financial Ledger', description: 'Transaction history and accounts' },
    ],
    stealing: true,
  },
};

// ============================================================================
// WITH CALLBACK
// ============================================================================

export const WithCallback = {
  name: 'Interactive - With Callback',
  args: {
    id: 'story-with-callback',
    physicalItems: [
      { id: 'credits_callback', label: 'Credits', description: 'Cash stash', value: 1000, isCredits: true },
    ],
    digitalItems: [
      { id: 'access_codes_callback', label: 'Access Codes', description: 'Security bypass codes', value: 500, isCredits: true },
    ],
    stealing: true,
    onExtract: (items, totalValue) => {
      alert(`Extracted ${items.length} items! Total value: ${totalValue}¤`);
      console.log('Extracted items:', items);
    },
  },
};

// ============================================================================
// COMPARISON: STEALING VS NOT STEALING
// ============================================================================

export const ComparisonStealing = {
  name: 'Comparison - Stealing Mode (Red/Criminal)',
  args: {
    id: 'story-comparison-steal',
    physicalItems: [
      { id: 'credits_stolen', label: 'Credits', description: 'Stolen cash', value: 5000, isCredits: true },
    ],
    digitalItems: [
      { id: 'data_stolen', label: 'Data', description: 'Stolen files', value: 2000, isCredits: true },
    ],
    stealing: true,
  },
};

export const ComparisonLegitimate = {
  name: 'Comparison - Legitimate Mode (Green/Neutral)',
  args: {
    id: 'story-comparison-legit',
    physicalItems: [
      { id: 'credits_earned', label: 'Credits', description: 'Earned payment', value: 5000, isCredits: true },
    ],
    digitalItems: [
      { id: 'data_retrieved', label: 'Data', description: 'Retrieved files', value: 2000, isCredits: true },
    ],
    stealing: false,
  },
};
