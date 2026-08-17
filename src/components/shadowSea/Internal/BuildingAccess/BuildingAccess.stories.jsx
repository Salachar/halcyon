import BuildingAccess from './BuildingAccess';

export default {
  title: 'Terminal/BuildingAccess',
  component: BuildingAccess,
};

export const Blank = {
  args: {},
};

export const SinglePoint = {
  args: {
    points: [
      {
        location: "Front Entrance",
        access: ["Keycard — All staff", "Intercom"],
      },
    ],
  },
};

export const WithNotes = {
  args: {
    points: [
      {
        location: "Back Office",
        access: ["Keycard — Level 3+", "Optical Scan — Manager only"],
        notes: ["Override active since Nov 12"],
      },
    ],
  },
};

export const MultiplePoints = {
  args: {
    title: "CLINIC ACCESS CONTROL",
    points: [
      {
        location: "Front Entrance",
        access: ["Keycard — All staff", "Intercom"],
        notes: ["Unlocked during business hours"],
      },
      {
        location: "Back Office",
        access: ["Keycard — Level 3+", "Optical Scan — Doc Joy only"],
        notes: ["Override active since Nov 12"],
      },
      {
        location: "Storage Corridor",
        access: ["Biometric — Doc Joy only"],
        notes: ["Alarm on failed attempt", "Upgraded post-breach Oct 28"],
      },
    ],
  },
};
