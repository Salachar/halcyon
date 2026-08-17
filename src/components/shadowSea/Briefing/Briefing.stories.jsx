import Briefing from './Briefing';

export default {
  title: 'Terminal/Briefing',
  component: Briefing,
};

// Stone Eels warehouse heist briefing
export const BlankProps = {
  args: {},
};


// Stone Eels warehouse heist briefing
export const WarehouseHeist = {
  args: {
    title: 'Warehouse Infiltration',
    issuer: 'Saša - Stone Eels',
    classification: 'CLASSIFIED',
    primary: [
      {
        text: 'Steal MilSpec neural interface crate from Secure Cargo',
        note: 'Container 7B - 12 units, 5,000¤ value',
        priority: 'critical',
      },
      {
        text: 'Deliver crate to Stone Eels contact',
        note: 'Canal dock 7 - 03:00 deadline',
        priority: 'critical',
      },
    ],
    secondary: [
      {
        text: 'Minimize casualties (guards not paid enough to die)',
        priority: 'high',
      },
      {
        text: 'Avoid triggering alarm (10-minute backup response)',
        priority: 'high',
      },
      {
        text: 'Optional: Skim supervisor safe (master keycard, petty cash)',
        priority: 'normal',
      },
    ],
    intel: [
      '6 guards on duty - 2 in Secure Cargo are professional',
      'Guard 3 (James Park) on break, distracted by dating apps',
      'Supervisor (Marcus Webb) has master keycard in office safe',
      'Alarm has 30-second delay before alert',
    ],
    payment: [
      'Stone Eels alliance (full access to Cave Club VIP)',
      'Gang backup available for future jobs',
      'Discount on black market goods',
    ],
    warnings: [
      'SecOps patrols active in Ports district',
      'Virid Vipers may attempt ambush during extraction',
      'Loud approach brings permanent corporate heat',
    ],
    footer: 'Time-sensitive operation - Execute within 24 hours',
  },
};

// Casino job briefing
export const CasinoJob = {
  args: {
    title: 'Lucky Flight Takedown',
    issuer: 'Charlie Sand',
    classification: 'CONFIDENTIAL',
    primary: [
      {
        text: 'Expose money laundering operations',
        note: 'Financial records in Manager office',
        priority: 'critical',
      },
      {
        text: 'Extract evidence without detection',
        priority: 'high',
      },
    ],
    secondary: [
      {
        text: 'Identify corporate connections',
        note: 'Check email correspondence',
        priority: 'normal',
      },
      {
        text: 'Document security weaknesses',
        priority: 'normal',
      },
    ],
    intel: [
      'Manager arrives 18:00, leaves 02:00',
      'Security changes shift at midnight',
      'Vault code changes weekly (current: unknown)',
      'VIP area has reduced camera coverage',
    ],
    payment: [
      '2,000¤ base payment',
      '+500¤ bonus for undamaged evidence',
      'Media contacts for story publication',
    ],
    warnings: [
      'Casino has corporate backing',
      'Multiple armed security personnel',
      'Getting caught = permanent ban + legal trouble',
    ],
    footer: 'Discretion is critical - No witnesses',
  },
};

// Simple extraction mission
export const SimpleExtraction = {
  args: {
    title: 'Data Recovery',
    issuer: 'Anonymous Client',
    classification: 'RESTRICTED',
    primary: [
      {
        text: 'Retrieve encrypted drive from apartment 4B',
        priority: 'critical',
      },
    ],
    secondary: [
      {
        text: 'Avoid confrontation with resident',
        priority: 'high',
      },
    ],
    intel: [
      'Resident works night shift (away 22:00-06:00)',
      'Building has basic security cameras (lobby only)',
      'Drive is in bedroom safe',
    ],
    payment: [
      '800¤ on delivery',
      'No questions asked',
    ],
    warnings: [
      'Drive is encrypted - do not attempt to access',
      'Time window is limited',
    ],
  },
};

// Minimal briefing
export const MinimalBriefing = {
  args: {
    title: 'Reconnaissance Only',
    issuer: 'Stone Eels',
    classification: 'UNCLASSIFIED',
    primary: [
      {
        text: 'Scout Virid Vipers territory',
        priority: 'normal',
      },
    ],
    intel: [
      'Eastern docks area',
      'Report back with patrol patterns',
    ],
    payment: [
      '200¤ for intel',
    ],
  },
};

// Maximum complexity briefing
export const ComplexOperation = {
  args: {
    title: 'Operation Clean Break',
    issuer: 'S4N1 - Sanitation AI',
    classification: 'CLASSIFIED',
    primary: [
      {
        text: 'Infiltrate corporate data center',
        note: 'Sector 7, sublevel 3',
        priority: 'critical',
      },
      {
        text: 'Upload S4N1 code package to mainframe',
        note: 'Physical access required - 15 minute upload time',
        priority: 'critical',
      },
      {
        text: 'Exfiltrate via service tunnels',
        note: 'S4N1 will guide through sewer system',
        priority: 'critical',
      },
    ],
    secondary: [
      {
        text: 'Plant data recorders on executive terminals',
        note: '3 devices provided - floors 5, 7, and 9',
        priority: 'high',
      },
      {
        text: 'Document security protocols',
        note: 'Photos of guard stations, camera placements',
        priority: 'normal',
      },
      {
        text: 'Sabotage HVAC controls (optional distraction)',
        priority: 'normal',
      },
    ],
    intel: [
      'Building security: 24/7 guards, biometric access',
      'Shift change at 22:00 (15-minute window)',
      'Executive floor cameras offline 23:00-23:30 (maintenance)',
      'Service tunnel entrance via loading dock',
      'AI will provide real-time sewer navigation',
      'Backup extraction point: roof helipad',
    ],
    payment: [
      '5,000¤ base payment (split among crew)',
      '+2,000¤ bonus for all secondary objectives',
      '+1,000¤ if zero alarms triggered',
      'S4N1 network access (future intelligence)',
      'Safe house coordinates (emergency use)',
    ],
    warnings: [
      'CRITICAL: Corporate black ops team responds in 8 minutes',
      'Biometric access requires stolen employee credentials',
      'AI upload cannot be interrupted or mission fails',
      'Sewer route has hostile entities - S4N1 guidance essential',
      'Zero tolerance - captured = disappeared',
    ],
    footer: 'Mission window: 72 hours - Coordination required - Team of 3-4 recommended',
  },
};

// High stakes VIP protection
export const VIPProtection = {
  args: {
    title: 'Executive Protection Detail',
    issuer: 'Private Security Contractor',
    classification: 'CONFIDENTIAL',
    primary: [
      {
        text: 'Ensure VIP safely reaches destination',
        note: 'Ports district to Bigmosse corporate tower',
        priority: 'critical',
      },
      {
        text: 'Neutralize any threats en route',
        priority: 'critical',
      },
    ],
    secondary: [
      {
        text: 'Identify attackers if confronted',
        note: 'Intel value for future contracts',
        priority: 'high',
      },
      {
        text: 'Minimize collateral damage',
        priority: 'normal',
      },
    ],
    intel: [
      'VIP: Corporate executive, high-value target',
      'Threat level: HIGH (confirmed assassination attempts)',
      'Route: Water taxi to canal pier, then armored transport',
      'Known hostiles: Rival corporate agents, possibly gang involvement',
    ],
    payment: [
      '3,000¤ on successful delivery',
      '+1,000¤ if VIP unharmed',
      'Bonus contract opportunities',
    ],
    warnings: [
      'VIP is arrogant and will not follow instructions',
      'Attackers are well-funded and organized',
      'Failure = no payment + potential retaliation',
    ],
    footer: 'Departure time: 20:00 sharp - No delays accepted',
  },
};
