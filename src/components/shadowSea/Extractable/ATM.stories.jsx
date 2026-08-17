import ATM from './ATM';

export default {
  title: 'Terminal/ATM',
  component: ATM,
};

export const BlankProps = {
  args: {},
};


// Default ATM at a bodega
export const BodegaATM = {
  args: {
    id: 'bodega-atm-story',
    model: 'ATM-500',
    location: "Batu's Bodega - Corner entrance",
    network: 'CityBank',
    accountHolder: 'Sarah Chen (last accessed)',
    balance: '147¤',
    transactions: [
      '14:23 → Withdrawal: 40¤',
      '15:47 → Balance inquiry',
      '16:12 → Deposit: 100¤',
      '17:08 → Withdrawal: 20¤',
    ],
    lastService: '2 weeks ago',
  },
};

// ATM with low balance
export const LowBalanceATM = {
  args: {
    id: 'low-balance-atm-story',
    model: 'ATM-350',
    location: 'Corner Shop - Side wall',
    network: 'MetroBank',
    accountHolder: 'Marcus Webb (last accessed)',
    balance: '23¤',
    transactions: [
      '08:15 → Withdrawal: 50¤',
      '12:30 → Failed transaction (insufficient funds)',
      '14:00 → Balance inquiry',
    ],
    lastService: '1 month ago',
  },
};

// ATM with many transactions
export const BusyATM = {
  args: {
    id: 'busy-atm-story',
    model: 'ATM-700X',
    location: 'Lucky Flight Casino - Main lobby',
    network: 'CorpBank Premium',
    accountHolder: 'David Park (last accessed)',
    balance: '892¤',
    transactions: [
      '20:15 → Withdrawal: 200¤',
      '20:47 → Withdrawal: 100¤',
      '21:23 → Balance inquiry',
      '22:05 → Deposit: 500¤',
      '22:38 → Withdrawal: 150¤',
      '23:12 → Balance inquiry',
    ],
    lastService: '3 days ago',
  },
};

// Minimal ATM (recently serviced, no transactions)
export const FreshATM = {
  args: {
    id: 'fresh-atm-story',
    model: 'ATM-900',
    location: 'Warehouse Office - Break room',
    network: 'CityBank',
    accountHolder: 'Jane Wilson (last accessed)',
    balance: '340¤',
    transactions: [],
    lastService: 'Yesterday',
  },
};

// Sketchy location ATM
export const SketchyATM = {
  args: {
    id: 'sketchy-atm-story',
    model: 'ATM-200 (refurbished)',
    location: 'Abandoned warehouse - Loading dock',
    network: 'Unknown Network',
    accountHolder: 'ACCOUNT_ERROR',
    balance: '???¤',
    transactions: [
      '??:?? → Unknown transaction',
      '??:?? → Data corrupted',
      '03:47 → Withdrawal: 1000¤',
    ],
    lastService: 'Unknown (possibly never)',
  },
};

// High roller ATM
export const HighRollerATM = {
  args: {
    id: 'high-roller-atm-story',
    model: 'ATM-ELITE-5000',
    location: 'Cave Club VIP Lounge - Private booth',
    network: 'Premium Banking Network',
    accountHolder: 'Saša (last accessed)',
    balance: '12,450¤',
    transactions: [
      '23:15 → Withdrawal: 2,000¤',
      '23:47 → Balance inquiry',
      '00:23 → Transfer received: +5,000¤',
      '01:05 → Withdrawal: 500¤',
    ],
    lastService: '1 week ago',
  },
};
