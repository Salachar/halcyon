import Safe from './Safe';

export default {
  title: 'Terminal/Safe',
  component: Safe,
};

export const BlankProps = {
  args: {},
};

export const EmptySafe = {
  args: {
    id: 'casino-manager-safe',
    model: 'DS-400',
    location: 'Lucky Flight Casino - Manager Office',
    owner: 'Frank Stone, Casino Manager',
    security: '6-digit keypad + biometric',
    lastAccess: 'Yesterday 11:45 PM',
    notes: 'Safe is bolted to floor. Combination changed monthly.',
  },
};

// Office safe - manager
export const ManagerOfficeSafe = {
  args: {
    id: 'casino-manager-safe',
    model: 'DS-400',
    location: 'Lucky Flight Casino - Manager Office',
    owner: 'Frank Stone, Casino Manager',
    security: '6-digit keypad + biometric',
    lastAccess: 'Yesterday 11:45 PM',
    physical: [
      {
        id: 'manager_cash',
        label: 'Cash',
        description: '8,500¤ in mixed bills',
        value: 8500,
        isCredits: true
      },
      {
        id: 'master_keycard',
        label: 'Master Keycard',
        description: 'Access to all casino doors'
      },
      {
        id: 'backup_keys',
        label: 'Backup Keys',
        description: 'Safe deposit boxes, office doors'
      },
      {
        id: 'personal_items',
        label: 'Personal Items',
        description: 'Watch, family photos'
      },
    ],
    digital: [
      {
        id: 'financial_reports',
        label: 'Financial Reports',
        description: 'Monthly revenue & expenses'
      },
      {
        id: 'employee_records',
        label: 'Employee Records',
        description: 'Staff files, background checks'
      },
      {
        id: 'security_codes',
        label: 'Security Footage Keys',
        description: 'Access codes for camera system'
      },
      {
        id: 'supplier_contacts',
        label: 'Supplier Contacts',
        description: 'Black market connections list'
      },
    ],
    notes: 'Safe is bolted to floor. Combination changed monthly.',
  },
};

// Bodega safe
export const BodegaSafe = {
  args: {
    id: 'lucky-star-safe',
    model: 'DS-200',
    location: 'Lucky Star Bodega - Back Office',
    owner: 'Maria Santos, Owner',
    security: 'Mechanical dial lock',
    lastAccess: 'Today 10:00 PM (closing)',
    physical: [
      {
        id: 'bodega_receipts',
        label: 'Daily Receipts',
        description: '450¤ from today\'s sales',
        value: 450,
        isCredits: true
      },
      {
        id: 'lottery_tickets',
        label: 'Lottery Tickets',
        description: 'Unsold scratch-offs, about 200¤ value'
      },
      {
        id: 'business_permits',
        label: 'Business Permits',
        description: 'License, insurance documents'
      },
    ],
    digital: [
      {
        id: 'sales_records',
        label: 'Sales Records',
        description: 'Daily transaction logs'
      },
      {
        id: 'supplier_invoices',
        label: 'Supplier Invoices',
        description: 'Pending payments, receipts'
      },
    ],
    notes: 'Old but reliable safe. Been here since the store opened.',
  },
};

// Gang safehouse
export const GangSafe = {
  args: {
    id: 'stone-eels-safe',
    model: 'DS-250',
    location: 'Stone Eels Safehouse - Underground',
    owner: 'Saša, Stone Eels Lieutenant',
    security: 'Combination lock (known to core members only)',
    lastAccess: '2 days ago',
    physical: [
      {
        id: 'gang_weapons',
        label: 'Weapons',
        description: '3 pistols, ammunition'
      },
      {
        id: 'gang_cash',
        label: 'Cash',
        description: '15,000¤ - crew fund',
        value: 15000,
        isCredits: true
      },
      {
        id: 'stolen_goods',
        label: 'Stolen Goods',
        description: 'Jewelry, electronics - fence later'
      },
      {
        id: 'gang_drugs',
        label: 'Drugs',
        description: 'Product for distribution'
      },
    ],
    digital: [
      {
        id: 'operation_plans',
        label: 'Operation Plans',
        description: 'Upcoming heists, target locations'
      },
      {
        id: 'gang_contacts',
        label: 'Contact List',
        description: 'Gang members, allies, suppliers'
      },
      {
        id: 'police_intel',
        label: 'Police Intel',
        description: 'Corrupt cop connections, patrol schedules'
      },
      {
        id: 'territory_map',
        label: 'Territory Map',
        description: 'Controlled areas, rival gang positions'
      },
    ],
    notes: 'Well-hidden. Moving location soon due to heat from rivals.',
  },
};

// Apartment safe
export const ApartmentSafe = {
  args: {
    id: 'apartment-4b-safe',
    model: 'DS-100 Home',
    location: 'Riverside Apartments - Unit 4B',
    owner: 'Sarah Chen, Data Analyst',
    security: 'Electronic keypad',
    lastAccess: '3 days ago',
    physical: [
      {
        id: 'passport',
        label: 'Passport',
        description: 'Valid travel document'
      },
      {
        id: 'emergency_cash',
        label: 'Cash',
        description: '600¤ emergency funds',
        value: 600,
        isCredits: true
      },
      {
        id: 'family_jewelry',
        label: 'Jewelry',
        description: 'Family heirlooms, engagement ring'
      },
    ],
    digital: [
      {
        id: 'personal_docs',
        label: 'Personal Documents',
        description: 'Birth certificate, tax records'
      },
      {
        id: 'photo_backup',
        label: 'Photo Backup',
        description: 'Family photos, personal memories'
      },
      {
        id: 'password_list',
        label: 'Password List',
        description: 'Encrypted file of account credentials'
      },
    ],
    notes: 'Small home safe, hidden in bedroom closet.',
  },
};

// Research lab safe
export const ResearchLabSafe = {
  args: {
    id: 'synth-minds-lab-safe',
    model: 'DS-600 Research',
    location: 'Synthetic Minds R&D - Lab Alpha-05',
    owner: 'Dr. Lisa Park, Lead Researcher',
    security: 'Biometric + time-lock + supervisor override',
    lastAccess: 'Today 1:00 PM',
    physical: [
      {
        id: 'prototype_chips',
        label: 'Prototype Chips',
        description: 'Experimental neural interface hardware'
      },
      {
        id: 'lab_notebooks',
        label: 'Lab Notebooks',
        description: 'Handwritten research notes, formulas'
      },
      {
        id: 'sample_vials',
        label: 'Sample Vials',
        description: 'Biological samples, chemical compounds'
      },
    ],
    digital: [
      {
        id: 'research_data',
        label: 'Research Data',
        description: 'AI training models, experiment results'
      },
      {
        id: 'patent_apps',
        label: 'Patent Applications',
        description: 'Pending intellectual property filings'
      },
      {
        id: 'test_subjects',
        label: 'Test Subject Files',
        description: 'Human trial participant data'
      },
      {
        id: 'source_code',
        label: 'Source Code',
        description: 'Proprietary AI algorithms'
      },
    ],
    notes: 'Contains groundbreaking AI research. Corporate espionage target.',
  },
};

// High-value safe
export const HighValueSafe = {
  args: {
    id: 'collector-vault',
    model: 'DS-800 Premium',
    location: 'Private Residence - Hidden Room',
    owner: 'Anonymous Collector',
    security: 'Multi-factor: Retinal scan + fingerprint + 12-digit code',
    lastAccess: 'Last week',
    physical: [
      {
        id: 'art_collection',
        label: 'Art Collection',
        description: 'Rare paintings, worth 200,000¤+'
      },
      {
        id: 'rare_coins',
        label: 'Rare Coins',
        description: 'Ancient currency collection, priceless'
      },
      {
        id: 'precious_gems',
        label: 'Precious Gems',
        description: 'Uncut diamonds, rare rubies'
      },
      {
        id: 'vintage_wine',
        label: 'Vintage Wine',
        description: 'Bottles worth 5,000¤ each'
      },
    ],
    digital: [
      {
        id: 'provenance',
        label: 'Provenance Records',
        description: 'Authenticity certificates, purchase history'
      },
      {
        id: 'insurance_docs',
        label: 'Insurance Documents',
        description: 'Policies, appraisals, photos'
      },
      {
        id: 'auction_access',
        label: 'Auction Access',
        description: 'Private sale invitations, dealer contacts'
      },
      {
        id: 'collection_catalog',
        label: 'Collection Catalog',
        description: 'Complete inventory with valuations'
      },
    ],
    notes: 'Climate-controlled vault. Hidden behind bookshelf. Insured for 1M¤.',
  },
};
