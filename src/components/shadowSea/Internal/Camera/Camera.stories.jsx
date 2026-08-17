import Camera from './Camera';

export default {
  title: 'Terminal/Camera',
  component: Camera,
};

export const Active = {
  args: {
    id: 'CAM-01',
    location: 'Main Entrance',
    status: 'ACTIVE',
  },
};

export const Offline = {
  args: {
    id: 'CAM-02',
    location: 'Back Corridor',
    status: 'OFFLINE',
  },
};

export const WithCoverage = {
  args: {
    id: 'CAM-03',
    location: 'Operating Room',
    status: 'ACTIVE',
    coverage: 'Full room coverage — entrance, surgical suite, storage corridor',
  },
};

export const WithNotes = {
  args: {
    id: 'CAM-04',
    location: 'Storage Room',
    status: 'ACTIVE',
    coverage: 'Storage shelves, door, rear wall',
    notes: [
      'Night vision enabled',
      'Motion detection active',
      'Blind spot: bottom-left corner behind shelving',
    ],
  },
};

export const WithAlerts = {
  args: {
    id: 'CAM-05',
    location: 'Staff Entrance',
    status: 'ACTIVE',
    alerts: [
      'Doc Joy arrived for night shift',
      'Unknown individual — hooded, no treatment, departed after 3 min',
      'Unauthorized access attempt — alarm triggered, suspect fled',
    ],
  },
};

export const WithEverything = {
  args: {
    id: 'CAM-06',
    location: 'Clinic Main Floor',
    status: 'ACTIVE',
    coverage: 'Operating room, entrance, waiting area',
    notes: [
      'Night vision enabled',
      'Upgraded post-breach Oct 28',
    ],
    alerts: [
      'Doc Joy arrived for night shift',
      'Suspicious individual — departed without treatment',
      'BREACH — footage corrupted, biometrics bypassed',
    ],
  },
};
