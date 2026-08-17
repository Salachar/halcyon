import PasswordPrompt from './PasswordPrompt';

export default {
  title: 'Terminal/PasswordPrompt',
  component: PasswordPrompt,
};

// ============================================================================
// DIFFICULTY EXAMPLES
// ============================================================================

export const EasyMode = {
  name: 'Difficulty: Easy (First Letter + Count + Frequency)',
  args: {
    command: 'Access: Employee Locker',
    password: 'COFFEE',
    hint: 'Morning beverage',
    difficulty: 'easy',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const MediumMode = {
  name: 'Difficulty: Medium (Count + Frequency)',
  args: {
    command: 'Login: Manager Desktop PC',
    password: 'ADMIN',
    hint: 'Common default username',
    difficulty: 'medium',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const HardMode = {
  name: 'Difficulty: Hard (Count Only)',
  args: {
    command: 'Open: Office Safe',
    password: 'CASH',
    hint: 'What you find inside',
    difficulty: 'hard',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const ExpertMode = {
  name: 'Difficulty: Expert (Hint Only)',
  args: {
    command: 'Access: Server Room Door',
    password: 'SERVER',
    hint: 'What\'s behind this door?',
    difficulty: 'expert',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const CorporateMode = {
  name: 'Difficulty: Corporate (Decoy Letters)',
  args: {
    command: 'Login: Bigmosse Executive Terminal',
    password: 'PROFIT',
    hint: 'What corporations care about most',
    difficulty: 'corporate',
    decoyLetters: 'X, Q, Z, J, K, W',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

// ============================================================================
// SCENARIO EXAMPLES
// ============================================================================

export const ComputerLogin = {
  name: 'Scenario: Computer Login',
  args: {
    command: 'Login: Manager Desktop PC',
    password: 'ADMIN',
    hint: 'Common default username',
    difficulty: 'medium',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const SafeAccess = {
  name: 'Scenario: Safe Access',
  args: {
    command: 'Open: Office Safe',
    password: 'CASH',
    hint: 'What you find inside',
    difficulty: 'hard',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const DoorCode = {
  name: 'Scenario: Door Code',
  args: {
    command: 'Access: Server Room Door',
    password: 'SERVER',
    hint: 'What\'s behind this door?',
    difficulty: 'easy',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const RepeatingChars = {
  name: 'Scenario: Repeating Characters',
  args: {
    command: 'Access: Personal Computer',
    password: 'COFFEE',
    hint: 'Morning beverage',
    difficulty: 'medium',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const GamePassword = {
  name: 'Scenario: Hidden Terminal',
  args: {
    command: 'Unlock: Hidden Terminal',
    password: 'NEON',
    hint: 'Type of lights in this city',
    difficulty: 'hard',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const WarehouseAccess = {
  name: 'Scenario: Warehouse',
  args: {
    command: 'Access: Secure Cargo Container 7B',
    password: 'CARGO',
    hint: 'What this building stores',
    difficulty: 'hard',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const CasinoSafe = {
  name: 'Scenario: Casino Safe',
  args: {
    command: 'Open: Manager Office Safe',
    password: 'LUCKY',
    hint: 'Theme of this establishment',
    difficulty: 'medium',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const PersonalDevice = {
  name: 'Scenario: Personal Tablet',
  args: {
    command: 'Unlock: Personal Tablet',
    password: 'WINTER',
    hint: 'Coldest season',
    difficulty: 'easy',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const GangHideout = {
  name: 'Scenario: Gang Safehouse',
  args: {
    command: 'Access: Stone Eels Safehouse',
    password: 'STONE',
    hint: 'First word of gang name',
    difficulty: 'medium',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const VendingMachine = {
  name: 'Scenario: Vending Machine',
  args: {
    command: 'Access: QuickDrinx Maintenance Panel',
    password: 'DRINK',
    hint: 'What this machine dispenses',
    difficulty: 'hard',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const ATMAccess = {
  name: 'Scenario: ATM Service Mode',
  args: {
    command: 'Service Mode: ATM-500',
    password: 'MONEY',
    hint: 'What people withdraw',
    difficulty: 'medium',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const MedicalAccess = {
  name: 'Scenario: Medical Records',
  args: {
    command: 'Access: VitalCorp Medical Records',
    password: 'VITAL',
    hint: 'Company name',
    difficulty: 'hard',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

// ============================================================================
// SPECIAL CASES
// ============================================================================

export const ShortPassword = {
  name: 'Special: Short Password (3 chars)',
  args: {
    command: 'Access: Storage Locker',
    password: 'BOX',
    hint: 'A container',
    difficulty: 'expert',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const NoHint = {
  name: 'Special: No Hint Provided',
  args: {
    command: 'Access: Encrypted Drive',
    password: 'SECRET',
    hint: '',
    difficulty: 'expert',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const ComplexPattern = {
  name: 'Special: Complex Repeating Pattern',
  args: {
    command: 'Access: Pattern Lock System',
    password: 'LETTER',
    hint: 'Contains three of the same character',
    difficulty: 'medium',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const DifficultPassword = {
  name: 'Special: Longer Password',
  args: {
    command: 'Access: High Security Vault',
    password: 'QUANTUM',
    hint: 'Type of computing used for encryption',
    difficulty: 'hard',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const PuzzlePassword = {
  name: 'Special: Puzzle/Riddle',
  args: {
    command: 'Decrypt: Mysterious File',
    password: 'CIPHER',
    hint: 'Another word for code or encryption',
    difficulty: 'expert',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const CharacterHint = {
  name: 'Special: Character Name Hint',
  args: {
    command: 'Access: Apartment 4B',
    password: 'PARK',
    hint: 'The guard\'s last name (James ____)',
    difficulty: 'medium',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const LocationPassword = {
  name: 'Special: Location-Based',
  args: {
    command: 'Open: Canal District Gate',
    password: 'CANAL',
    hint: 'The district you\'re in',
    difficulty: 'hard',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const TechPassword = {
  name: 'Special: Tech-Themed',
  args: {
    command: 'Login: Developer Console',
    password: 'DEBUG',
    hint: 'What developers do to fix code',
    difficulty: 'medium',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

// ============================================================================
// CORPORATE MODE EXAMPLES
// ============================================================================

export const CorporateEasy = {
  name: 'Corporate: Easy Decoys',
  args: {
    command: 'Access: Low Security Terminal',
    password: 'DATA',
    hint: 'What computers store',
    difficulty: 'corporate',
    decoyLetters: 'X, Q',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const CorporateHard = {
  name: 'Corporate: Many Decoys',
  args: {
    command: 'Access: Executive Vault',
    password: 'VAULT',
    hint: 'Secure storage location',
    difficulty: 'corporate',
    decoyLetters: 'X, Q, Z, J, K, W, B, P, G',
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};

export const CorporateConfusing = {
  name: 'Corporate: Confusing Decoys',
  args: {
    command: 'Login: Bigmosse Mainframe',
    password: 'POWER',
    hint: 'What corporations seek',
    difficulty: 'corporate',
    decoyLetters: 'P, O, W, E, R, S', // Contains actual letters!
    onSubmit: (command, commandDef, password) => console.log('Submitted:', password),
    onCancel: () => console.log('Cancelled'),
  },
};
