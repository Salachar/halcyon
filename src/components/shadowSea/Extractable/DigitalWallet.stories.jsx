import DigitalWallet from './DigitalWallet';

export default {
  title: 'Terminal/DigitalWallet',
  component: DigitalWallet,
};

// Executive account - unlocked
export const BlankProps = () => (
  <DigitalWallet />
);

// Executive account - unlocked
export const ExecutiveAccount = () => (
  <DigitalWallet
    id="wallet-exec-001"
    accountNumber="ALLIANSEN-4782"
    accountHolder="Dr. Elena Rodriguez - VP Operations"
    credits={285000}
    lastTransaction="2068-01-27"
    isLocked={false}
  />
);

// Street dealer stash - locked
export const StreetDealerStash = () => (
  <DigitalWallet
    id="wallet-dealer-001"
    accountNumber="DARKNET-8829"
    accountHolder="Marcus 'Slip' Chen"
    credits={12500}
    lastTransaction="2068-01-26"
    isLocked={true}
  />
);

// Hacker's anonymous wallet - unlocked
export const HackerWallet = () => (
  <DigitalWallet
    id="wallet-anon-555"
    accountNumber="ANON-X7734"
    credits={64000}
    lastTransaction="2068-01-27"
    isLocked={false}
  />
);

// Corporate payroll account - locked
export const CorporatePayroll = () => (
  <DigitalWallet
    id="wallet-payroll-001"
    accountNumber="ALLIANSEN-PAY-001"
    accountHolder="Alliansen Inc. - Payroll Division"
    credits={3750000}
    lastTransaction="2068-01-25"
    isLocked={true}
  />
);

// Broke freelancer - unlocked
export const BrokeFreelancer = () => (
  <DigitalWallet
    id="wallet-broke-001"
    accountNumber="FREEBANK-2341"
    accountHolder="Riley Park - Freelance Tech"
    credits={127}
    lastTransaction="2068-01-15"
    isLocked={false}
  />
);

// Gang operations fund - locked
export const GangOperations = () => (
  <DigitalWallet
    id="wallet-vipers-ops"
    accountNumber="VIPERS-OPS-SECURE"
    accountHolder="Virid Vipers Operations"
    credits={156000}
    lastTransaction="2068-01-26"
    isLocked={true}
  />
);

// Killmatch athlete winnings - unlocked
export const AthleteWinnings = () => (
  <DigitalWallet
    id="wallet-athlete-001"
    accountNumber="KILLMATCH-9284"
    accountHolder="Steel Jackhammer"
    credits={420000}
    lastTransaction="2068-01-24"
    isLocked={false}
  />
);

// Data broker account - locked
export const DataBroker = () => (
  <DigitalWallet
    id="wallet-broker-001"
    accountNumber="INFOSEC-4491"
    accountHolder="Raze - Data Services"
    credits={89500}
    lastTransaction="2068-01-27"
    isLocked={true}
  />
);

// Cleaned out wallet - unlocked
export const CleanedOut = () => (
  <DigitalWallet
    id="wallet-empty-999"
    accountNumber="CITYBANK-8823"
    accountHolder="Jordan Blake"
    credits={0}
    lastTransaction="2068-01-10"
    isLocked={false}
  />
);

// Offshore account - locked
export const OffshoreAccount = () => (
  <DigitalWallet
    id="wallet-offshore-001"
    accountNumber="OFFSHORE-SECURE-7721"
    accountHolder="Anonymous LLC"
    credits={1850000}
    lastTransaction="2068-01-20"
    isLocked={true}
  />
);
