import FacilityPortal from './FacilityPortal';

export default {
  title: 'Terminal/FacilityPortal',
  component: FacilityPortal,
};

export const BlankProps = {
  args: {},
};

// Corporate headquarters
export const BigmosseHQ = {
  args: {
    companyName: 'BIGMOSSE CORPORATE',
    facilityId: 'HQ-CENTRAL-01',
    tagline: 'Central Operations & Executive Offices',
    location: 'Downtown Financial District, Tower A',
    owner: 'Bigmosse International Holdings',
    function: 'Corporate headquarters, data center, executive suites',
    personnel: '847 employees (current shift)',
    networkStatus: 'Encrypted corporate intranet - Fiber backbone',
    securityLevel: 'MAXIMUM',
    warnings: [
      '⚠ Biometric authentication required for all access points',
      '⚠ Unauthorized network access will trigger immediate response',
      '⚠ All communications monitored and encrypted',
    ],
    theme: 'corporate',
  },
};

// Warehouse facility
export const SecureCargoWarehouse = {
  args: {
    companyName: 'SECURECARGO LOGISTICS',
    facilityId: 'WH-PORTS-07',
    tagline: 'High-Security Storage & Distribution',
    location: 'Ports District, Sector 7B',
    owner: 'SecureCargo Holdings Ltd.',
    function: 'Secure storage, inventory management, freight distribution',
    personnel: '24 personnel (night shift)',
    networkStatus: 'Private network - Local servers + cloud backup',
    securityLevel: 'HIGH',
    warnings: [
      '⚠ Armed security on-site 24/7',
      '⚠ Restricted access zones - Clearance required',
      '⚠ Surveillance active in all areas',
    ],
    theme: 'industrial',
  },
};

// Casino/entertainment
export const LuckyFlightCasino = {
  args: {
    companyName: 'LUCKY FLIGHT CASINO',
    facilityId: 'ENT-CANAL-01',
    tagline: 'Premium Gaming & Entertainment',
    location: 'Canal District, 5th & Waterfront',
    owner: 'Entertainment Ventures LLC',
    function: 'Casino operations, VIP lounge, restaurant & bar',
    personnel: '156 staff (evening shift)',
    networkStatus: 'Dual-redundant fiber - Gaming network isolated',
    securityLevel: 'HIGH',
    warnings: [
      '⚠ All gaming areas under constant surveillance',
      '⚠ Cheating detection AI active',
      '⚠ No weapons permitted on premises',
    ],
    theme: 'retail',
  },
};

// Data center
export const DataVaultFacility = {
  args: {
    companyName: 'DATAVAULT SYSTEMS',
    facilityId: 'DC-S7-SUBLEVEL-3',
    tagline: 'Secure Data Storage & Processing',
    location: 'Sector 7, Underground Complex',
    owner: 'Bigmosse Data Services',
    function: 'Server farm, data archival, cloud infrastructure',
    personnel: '12 technicians (current)',
    networkStatus: 'Isolated secure network - Air-gapped critical systems',
    securityLevel: 'MAXIMUM',
    warnings: [
      '⚠ CRITICAL: Unauthorized access is a federal offense',
      '⚠ Biometric + keycard authentication mandatory',
      '⚠ EMP shielding active - Electronic devices may malfunction',
      '⚠ Armed response time: 4 minutes',
    ],
    theme: 'secure',
  },
};

// Medical facility
export const VitalCorpClinic = {
  args: {
    companyName: 'VITALCORP MEDICAL',
    facilityId: 'MED-CENTRAL-12',
    tagline: 'Advanced Healthcare & Augmentation',
    location: 'Medical District, Healthcare Plaza',
    owner: 'VitalCorp Healthcare Division',
    function: 'Medical services, neural augmentation, gene therapy',
    personnel: '94 staff (day shift)',
    networkStatus: 'HIPAA-compliant encrypted network',
    securityLevel: 'MEDIUM',
    warnings: [
      '⚠ Patient privacy laws strictly enforced',
      '⚠ Controlled substances on-site - Security protocols active',
    ],
    theme: 'corporate',
  },
};

// Retail/shop
export const LuckyStarBodega = {
  args: {
    companyName: 'LUCKY STAR BODEGA',
    facilityId: 'RETAIL-STONE-ST-01',
    tagline: '24/7 Convenience Store',
    location: 'Stone Street, Corner of 3rd Avenue',
    owner: 'Independent (Maria Santos, proprietor)',
    function: 'Retail sales, basic groceries, lottery tickets',
    personnel: '2 employees (current shift)',
    networkStatus: 'Standard broadband - POS system connected',
    securityLevel: 'LOW',
    warnings: [
      '⚠ Security cameras recording 24/7',
      '⚠ No refunds on lottery tickets',
    ],
    theme: 'retail',
  },
};

// Manufacturing plant
export const ApexManufacturing = {
  args: {
    companyName: 'APEX MANUFACTURING',
    facilityId: 'MFG-INDUSTRIAL-08',
    tagline: 'Precision Component Production',
    location: 'Industrial Zone, East Sector',
    owner: 'Apex Industries Group',
    function: 'Component fabrication, quality control, assembly',
    personnel: '312 workers (3 shifts)',
    networkStatus: 'Industrial IoT mesh - Production monitoring system',
    securityLevel: 'MEDIUM',
    warnings: [
      '⚠ Hard hat and safety equipment required',
      '⚠ Automated machinery in operation - Maintain safe distance',
      '⚠ Chemical storage on premises',
    ],
    theme: 'industrial',
  },
};

// Research lab
export const SyntheticMindsLab = {
  args: {
    companyName: 'SYNTHETIC MINDS R&D',
    facilityId: 'LAB-ALPHA-05',
    tagline: 'AI Research & Development',
    location: 'Tech Campus, Innovation Center',
    owner: 'Synthetic Minds Corporation',
    function: 'Artificial intelligence research, neural network development',
    personnel: '67 researchers (current)',
    networkStatus: 'Quantum-encrypted research network - Air-gapped secure zone',
    securityLevel: 'MAXIMUM',
    warnings: [
      '⚠ Experimental AI systems active - Do not interfere',
      '⚠ Classified research in progress',
      '⚠ Faraday cage prevents external signals in secure areas',
      '⚠ Visitor access requires executive approval',
    ],
    theme: 'secure',
  },
};

// Nightclub/entertainment
export const NeonDreamsClub = {
  args: {
    companyName: 'NEON DREAMS',
    facilityId: 'CLUB-CAVE-VIP',
    tagline: 'Where the Night Never Ends',
    location: 'Entertainment District, Cave Club Complex',
    owner: 'Stone Eels Entertainment (front)',
    function: 'Nightclub, VIP lounge, private event space',
    personnel: '43 staff (night operations)',
    networkStatus: 'Local network - Sound/lighting systems, POS terminals',
    securityLevel: 'MEDIUM',
    warnings: [
      '⚠ Age verification required - No exceptions',
      '⚠ Security reserves right to search bags',
      '⚠ Zero tolerance for violence or weapons',
    ],
    theme: 'retail',
  },
};

// Power station
export const PowerGridStation = {
  args: {
    companyName: 'POWERGRID UNLIMITED',
    facilityId: 'POWER-DIST-CENTRAL',
    tagline: 'City Power Distribution Hub',
    location: 'Industrial Sector, Grid Station 1',
    owner: 'PowerGrid Unlimited Corp.',
    function: 'Electrical distribution, substation operations, grid management',
    personnel: '18 operators (24/7 coverage)',
    networkStatus: 'SCADA network - Isolated from public internet',
    securityLevel: 'MAXIMUM',
    warnings: [
      '⚠ HIGH VOLTAGE - Authorized personnel only',
      '⚠ Critical infrastructure - Tampering is a federal crime',
      '⚠ Backup generators and failsafes active',
      '⚠ Restricted airspace above facility',
    ],
    theme: 'industrial',
  },
};

// Minimal facility (basic)
export const MinimalFacility = {
  args: {
    companyName: 'CITYLINK OFFICE',
    facilityId: 'OFF-12B',
    tagline: 'Customer Service Center',
    location: '12th Street, Suite B',
    owner: 'CityLink Communications',
    function: 'Customer service, account management',
    networkStatus: 'Standard business broadband',
    securityLevel: 'LOW',
    theme: 'corporate',
  },
};

// Abandoned/compromised facility
export const CompromisedFacility = {
  args: {
    companyName: 'ABANDONED FACILITY',
    facilityId: 'UNK-PORTS-15',
    tagline: 'Status: Offline - Last Activity 3 Months Ago',
    location: 'Ports District, Condemned Block',
    owner: 'Unknown (Records Missing)',
    function: 'Former warehouse - Current use unknown',
    personnel: 'No authorized personnel detected',
    networkStatus: 'DISCONNECTED - Unauthorized signals detected',
    securityLevel: 'LOW',
    warnings: [
      '⚠ STRUCTURAL INTEGRITY COMPROMISED',
      '⚠ Squatters reported in area',
      '⚠ No emergency services available',
      '⚠ Enter at own risk',
    ],
    theme: 'industrial',
  },
};

// Black site / secret facility
export const BlackSiteFacility = {
  args: {
    companyName: 'CLASSIFIED',
    facilityId: '[REDACTED]',
    tagline: 'Access Restricted - Level 7 Clearance Required',
    location: '[COORDINATES ENCRYPTED]',
    owner: '[CLASSIFIED]',
    function: '[INFORMATION RESTRICTED]',
    personnel: '[DATA NOT AVAILABLE]',
    networkStatus: 'Quantum-encrypted dark network - No external access',
    securityLevel: 'MAXIMUM',
    warnings: [
      '⚠ LETHAL FORCE AUTHORIZED FOR UNAUTHORIZED ACCESS',
      '⚠ This facility does not exist on public records',
      '⚠ Attempting to locate this facility is illegal',
      '⚠ All access attempts are monitored and reported',
    ],
    theme: 'secure',
  },
};

// Residential building
export const SkylineApartments = {
  args: {
    companyName: 'SKYLINE LIVING',
    facilityId: 'RES-RIVERSIDE-TOWER-A',
    tagline: 'Luxury Urban Living',
    location: 'Riverside District, Tower A',
    owner: 'Skyline Living Properties',
    function: 'Residential apartments, amenities, parking',
    personnel: '8 staff (concierge, maintenance, security)',
    networkStatus: 'Resident Wi-Fi + smart home network',
    securityLevel: 'MEDIUM',
    warnings: [
      '⚠ Visitors must sign in at front desk',
      '⚠ Parking permits required in garage',
    ],
    theme: 'corporate',
  },
};

// Government facility
export const CitizenServicesCenter = {
  args: {
    companyName: 'CITIZEN SERVICES',
    facilityId: 'GOV-CENTRAL-ADMIN',
    tagline: 'Official Government Services Portal',
    location: 'Government District, Administration Building',
    owner: 'City Municipal Government',
    function: 'ID registration, permits, violations, public records',
    personnel: '234 civil servants (current)',
    networkStatus: 'Government network - Secure encrypted connections',
    securityLevel: 'HIGH',
    warnings: [
      '⚠ Valid ID required for all transactions',
      '⚠ Security screening at all entrances',
      '⚠ Recording devices prohibited',
      '⚠ Compliance with all regulations mandatory',
    ],
    theme: 'secure',
  },
};
