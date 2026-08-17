import ShiftSchedule from './ShiftSchedule';

export default {
  title: 'Terminal/ShiftSchedule',
  component: ShiftSchedule,
};

export const BlankProps = {
  args: {},
};

// Warehouse night shift
export const WarehouseNightShift = {
  args: {
    location: 'SecureCargo Warehouse',
    shift: 'Night Shift',
    shiftTime: '22:00 - 06:00',
    currentTime: '23:15',
    personnel: [
      {
        name: 'Marcus Webb',
        role: 'Night Supervisor',
        location: 'Supervisor Office',
        status: 'MONITORING',
      },
      {
        name: 'James Park',
        role: 'Security Guard',
        location: 'Main Gate',
        status: 'BREAK',
        breakTime: '23:00-23:30',
      },
      {
        name: 'Carlos Rivera',
        role: 'Security Guard',
        location: 'Container Yard 7',
        status: 'PATROL',
      },
      {
        name: 'Ahmed Hassan',
        role: 'Forklift Operator',
        location: 'Loading Dock A',
        status: 'ACTIVE',
      },
      {
        name: 'Lisa Chen',
        role: 'Inventory Clerk',
        location: 'Storage Office',
        status: 'ACTIVE',
      },
      {
        name: 'Tom Richards',
        role: 'Security Guard',
        location: 'South Perimeter',
        status: 'PATROL',
      },
    ],
    nextShift: '06:00 (Day Shift)',
  },
};

// Casino floor
export const CasinoEveningShift = {
  args: {
    location: 'Lucky Flight Casino',
    shift: 'Evening Shift',
    shiftTime: '18:00 - 02:00',
    currentTime: '21:30',
    personnel: [
      {
        name: 'Frank Stone',
        role: 'Floor Manager',
        location: 'Main Floor',
        status: 'MONITORING',
      },
      {
        name: 'Daniel Rivera',
        role: 'Pit Boss',
        location: 'High Stakes Tables',
        status: 'ACTIVE',
      },
      {
        name: 'Jennifer Park',
        role: 'Dealer',
        location: 'Blackjack Table 3',
        status: 'ACTIVE',
      },
      {
        name: 'Mike Torres',
        role: 'Dealer',
        location: 'Poker Room',
        status: 'BREAK',
        breakTime: '21:15-21:45',
      },
      {
        name: 'Sarah Kim',
        role: 'Cocktail Server',
        location: 'VIP Lounge',
        status: 'ACTIVE',
      },
      {
        name: 'Robert Lee',
        role: 'Security',
        location: 'Surveillance Room',
        status: 'MONITORING',
      },
      {
        name: 'Amanda Cruz',
        role: 'Cage Cashier',
        location: 'Cashier Cage',
        status: 'ACTIVE',
      },
    ],
    nextShift: '02:00 (Graveyard Shift)',
  },
};

// Hospital shift
export const HospitalNightShift = {
  args: {
    location: 'VitalCorp Medical Center',
    shift: 'Night Shift',
    shiftTime: '19:00 - 07:00',
    currentTime: '02:45',
    personnel: [
      {
        name: 'Dr. Patricia Lewis',
        role: 'Attending Physician',
        location: 'Emergency Room',
        status: 'ACTIVE',
      },
      {
        name: 'Nurse Emily Johnson',
        role: 'RN - Emergency',
        location: 'ER Station 2',
        status: 'ACTIVE',
      },
      {
        name: 'Nurse David Chen',
        role: 'RN - ICU',
        location: 'Intensive Care',
        status: 'MONITORING',
      },
      {
        name: 'Dr. Marcus Webb',
        role: 'Resident',
        location: 'Patient Rooms',
        status: 'PATROL',
      },
      {
        name: 'James Torres',
        role: 'Medical Tech',
        location: 'Lab',
        status: 'BREAK',
        breakTime: '02:30-03:00',
      },
    ],
    nextShift: '07:00 (Day Shift)',
  },
};

// Data center shift
export const DataCenterShift = {
  args: {
    location: 'DataVault Systems - Sector 7',
    shift: 'Night Operations',
    shiftTime: '20:00 - 08:00',
    currentTime: '01:20',
    personnel: [
      {
        name: 'Kevin Zhang',
        role: 'Systems Administrator',
        location: 'Server Room Alpha',
        status: 'MONITORING',
      },
      {
        name: 'Lisa Morgan',
        role: 'Network Engineer',
        location: 'Network Operations',
        status: 'ACTIVE',
      },
      {
        name: 'Tom Harris',
        role: 'Security Officer',
        location: 'Main Entrance',
        status: 'PATROL',
      },
      {
        name: 'Sarah Williams',
        role: 'Tech Support',
        location: 'Help Desk',
        status: 'IDLE',
      },
    ],
    nextShift: '08:00 (Day Operations)',
  },
};

// Retail store
export const RetailDayShift = {
  args: {
    location: 'TechMart Electronics',
    shift: 'Day Shift',
    shiftTime: '09:00 - 17:00',
    currentTime: '13:45',
    personnel: [
      {
        name: 'Jennifer Park',
        role: 'Store Manager',
        location: 'Front Office',
        status: 'MONITORING',
      },
      {
        name: 'Alex Rodriguez',
        role: 'Sales Associate',
        location: 'Sales Floor',
        status: 'ACTIVE',
      },
      {
        name: 'Maria Santos',
        role: 'Sales Associate',
        location: 'Checkout',
        status: 'ACTIVE',
      },
      {
        name: 'Tom Lee',
        role: 'Stock Clerk',
        location: 'Stock Room',
        status: 'BREAK',
        breakTime: '13:30-14:00',
      },
      {
        name: 'Sarah Chen',
        role: 'Customer Service',
        location: 'Service Desk',
        status: 'ACTIVE',
      },
    ],
    nextShift: '17:00 (Closing Shift)',
  },
};

// Manufacturing plant
export const FactoryDayShift = {
  args: {
    location: 'Apex Manufacturing Plant',
    shift: 'Day Shift',
    shiftTime: '07:00 - 15:00',
    currentTime: '11:30',
    personnel: [
      {
        name: 'Michael Torres',
        role: 'Floor Manager',
        location: 'Production Line 1',
        status: 'MONITORING',
      },
      {
        name: 'Carlos Martinez',
        role: 'Machine Operator',
        location: 'Line 1 Station A',
        status: 'ACTIVE',
      },
      {
        name: 'Lisa Johnson',
        role: 'Machine Operator',
        location: 'Line 1 Station B',
        status: 'ACTIVE',
      },
      {
        name: 'David Kim',
        role: 'Quality Control',
        location: 'Inspection Area',
        status: 'ACTIVE',
      },
      {
        name: 'Robert Brown',
        role: 'Maintenance Tech',
        location: 'Machine Shop',
        status: 'BREAK',
        breakTime: '11:15-11:45',
      },
      {
        name: 'Amanda Lee',
        role: 'Forklift Operator',
        location: 'Warehouse',
        status: 'ACTIVE',
      },
    ],
    nextShift: '15:00 (Swing Shift)',
  },
};

// Office building
export const OfficeDayShift = {
  args: {
    location: 'Bigmosse Corporate HQ',
    shift: 'Business Hours',
    shiftTime: '08:00 - 17:00',
    currentTime: '14:20',
    personnel: [
      {
        name: 'Victoria Sterling',
        role: 'VP Operations',
        location: 'Executive Suite',
        status: 'MONITORING',
      },
      {
        name: 'Sarah Chen',
        role: 'Data Analyst',
        location: 'Analytics Dept',
        status: 'ACTIVE',
      },
      {
        name: 'Kevin Zhang',
        role: 'IT Administrator',
        location: 'Server Room',
        status: 'ACTIVE',
      },
      {
        name: 'Marcus Johnson',
        role: 'Security Officer',
        location: 'Lobby',
        status: 'PATROL',
      },
    ],
    nextShift: '17:00 (Evening Security)',
  },
};

// Restaurant shift
export const RestaurantEveningShift = {
  args: {
    location: 'Neon Bistro',
    shift: 'Dinner Shift',
    shiftTime: '16:00 - 23:00',
    currentTime: '19:45',
    personnel: [
      {
        name: 'Chef Marco Rossi',
        role: 'Head Chef',
        location: 'Kitchen',
        status: 'ACTIVE',
      },
      {
        name: 'Lisa Park',
        role: 'Sous Chef',
        location: 'Kitchen',
        status: 'ACTIVE',
      },
      {
        name: 'Maria Santos',
        role: 'Server',
        location: 'Dining Room',
        status: 'ACTIVE',
      },
      {
        name: 'Tom Richards',
        role: 'Server',
        location: 'Dining Room',
        status: 'BREAK',
        breakTime: '19:30-20:00',
      },
      {
        name: 'Sarah Kim',
        role: 'Bartender',
        location: 'Bar',
        status: 'ACTIVE',
      },
      {
        name: 'Alex Rodriguez',
        role: 'Host',
        location: 'Front Entrance',
        status: 'ACTIVE',
      },
    ],
    nextShift: '23:00 (Closing)',
  },
};

// Security patrol
export const SecurityNightPatrol = {
  args: {
    location: 'Downtown Financial District',
    shift: 'Night Patrol',
    shiftTime: '22:00 - 06:00',
    currentTime: '00:30',
    personnel: [
      {
        name: 'Marcus Johnson',
        role: 'Lead Security',
        location: 'Mobile Unit 1',
        status: 'PATROL',
      },
      {
        name: 'Frank Miller',
        role: 'Security Officer',
        location: 'Tower A Entrance',
        status: 'MONITORING',
      },
      {
        name: 'Tom Harris',
        role: 'Security Officer',
        location: 'Tower B Entrance',
        status: 'ACTIVE',
      },
      {
        name: 'James Wilson',
        role: 'Security Officer',
        location: 'Parking Garage',
        status: 'PATROL',
      },
    ],
    nextShift: '06:00 (Day Security)',
  },
};

// Minimal shift
export const MinimalShift = {
  args: {
    location: 'Small Shop',
    shift: 'Day Shift',
    shiftTime: '09:00 - 17:00',
    currentTime: '12:00',
    personnel: [
      {
        name: 'Owner',
        role: 'Manager',
        location: 'Counter',
        status: 'ACTIVE',
      },
      {
        name: 'Employee',
        role: 'Clerk',
        location: 'Stock Room',
        status: 'ACTIVE',
      },
    ],
    nextShift: '17:00 (Closing)',
  },
};

// Airport shift
export const AirportShift = {
  args: {
    location: 'City International Airport',
    shift: 'Evening Shift',
    shiftTime: '15:00 - 23:00',
    currentTime: '19:00',
    personnel: [
      {
        name: 'Sarah Williams',
        role: 'Shift Supervisor',
        location: 'Terminal Control',
        status: 'MONITORING',
      },
      {
        name: 'Tom Chen',
        role: 'TSA Agent',
        location: 'Security Checkpoint A',
        status: 'ACTIVE',
      },
      {
        name: 'Lisa Martinez',
        role: 'TSA Agent',
        location: 'Security Checkpoint B',
        status: 'ACTIVE',
      },
      {
        name: 'Robert Kim',
        role: 'Gate Agent',
        location: 'Gate 12',
        status: 'ACTIVE',
      },
      {
        name: 'Amanda Lee',
        role: 'Baggage Handler',
        location: 'Baggage Area',
        status: 'BREAK',
        breakTime: '18:45-19:15',
      },
      {
        name: 'David Park',
        role: 'Maintenance',
        location: 'Terminal 2',
        status: 'PATROL',
      },
    ],
    nextShift: '23:00 (Night Shift)',
  },
};

// Nightclub shift
export const NightclubShift = {
  args: {
    location: 'Cave Club',
    shift: 'Friday Night',
    shiftTime: '21:00 - 04:00',
    currentTime: '23:45',
    personnel: [
      {
        name: 'DJ Voltage',
        role: 'DJ',
        location: 'Main Stage',
        status: 'ACTIVE',
      },
      {
        name: 'Marcus Stone',
        role: 'Floor Manager',
        location: 'Main Floor',
        status: 'MONITORING',
      },
      {
        name: 'Sarah Kim',
        role: 'Bartender',
        location: 'Main Bar',
        status: 'ACTIVE',
      },
      {
        name: 'Tom Rivera',
        role: 'Bartender',
        location: 'VIP Bar',
        status: 'ACTIVE',
      },
      {
        name: 'Lisa Chen',
        role: 'VIP Host',
        location: 'VIP Lounge',
        status: 'ACTIVE',
      },
      {
        name: 'Robert Lee',
        role: 'Security',
        location: 'Front Door',
        status: 'MONITORING',
      },
      {
        name: 'James Wilson',
        role: 'Security',
        location: 'Dance Floor',
        status: 'PATROL',
      },
    ],
    nextShift: '04:00 (Cleanup Crew)',
  },
};

// Gym shift
export const GymMorningShift = {
  args: {
    location: 'Power Fitness Center',
    shift: 'Morning Shift',
    shiftTime: '05:00 - 13:00',
    currentTime: '08:30',
    personnel: [
      {
        name: 'Mike Rodriguez',
        role: 'Shift Manager',
        location: 'Front Desk',
        status: 'MONITORING',
      },
      {
        name: 'Sarah Williams',
        role: 'Personal Trainer',
        location: 'Training Area',
        status: 'ACTIVE',
      },
      {
        name: 'Tom Chen',
        role: 'Front Desk',
        location: 'Reception',
        status: 'ACTIVE',
      },
      {
        name: 'Lisa Martinez',
        role: 'Cleaner',
        location: 'Locker Rooms',
        status: 'ACTIVE',
      },
    ],
    nextShift: '13:00 (Afternoon Shift)',
  },
};

// Call center
export const CallCenterShift = {
  args: {
    location: 'CityLink Customer Service',
    shift: 'Evening Shift',
    shiftTime: '14:00 - 22:00',
    currentTime: '18:15',
    personnel: [
      {
        name: 'Jennifer Park',
        role: 'Team Lead',
        location: 'Floor Supervisor',
        status: 'MONITORING',
      },
      {
        name: 'Alex Rodriguez',
        role: 'CSR Agent',
        location: 'Station 12',
        status: 'ACTIVE',
      },
      {
        name: 'Maria Santos',
        role: 'CSR Agent',
        location: 'Station 15',
        status: 'ACTIVE',
      },
      {
        name: 'Tom Lee',
        role: 'CSR Agent',
        location: 'Station 18',
        status: 'BREAK',
        breakTime: '18:00-18:30',
      },
      {
        name: 'Sarah Chen',
        role: 'Tech Support',
        location: 'Station 21',
        status: 'ACTIVE',
      },
      {
        name: 'David Kim',
        role: 'CSR Agent',
        location: 'Station 24',
        status: 'IDLE',
      },
    ],
    nextShift: '22:00 (Night Shift)',
  },
};
