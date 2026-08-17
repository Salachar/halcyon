import PersonnelFile from './PersonnelFile';

export default {
  title: 'Terminal/PersonnelFile',
  component: PersonnelFile,
};

export const BlankProps = () => (
  <PersonnelFile />
);

// Active employee - full details
export const ActiveEmployee = () => (
  <PersonnelFile
    employeeId="EMP-4729"
    name="Sarah Webb"
    position="Warehouse Operations Manager"
    department="Logistics"
    supervisor="David Martinez"
    clearanceLevel={2}
    salary="65,000¤/year"
    location="Warehouse District - Building 7"
    email="s.webb@alliansen.cy"
    phone="+47 555-0192"
    emergencyContact="John Webb (Spouse) - +47 555-0193"
    performance={87}
    notes={[
      "Promoted to manager position in 2065 after 2 years as supervisor",
      "Completed advanced logistics certification",
      "Team lead for new inventory management system implementation"
    ]}
    status="ACTIVE"
  />
);

// High clearance employee
export const HighClearanceEmployee = () => (
  <PersonnelFile
    employeeId="EMP-1047"
    name="Marcus Chen"
    position="Security Director"
    department="Corporate Security"
    supervisor="Elena Rodriguez (VP Operations)"
    clearanceLevel={5}
    salary="125,000¤/year"
    location="Central HQ - Executive Floor"
    email="m.chen@alliansen.cy"
    phone="+47 555-0287"
    emergencyContact="Lisa Chen (Sister) - +47 555-0288"
    performance={94}
    notes={[
      "Top security clearance granted 2062",
      "Reports directly to VP of Operations",
      "Oversees all corporate security operations",
      "Background in military intelligence"
    ]}
    status="ACTIVE"
  />
);

// Suspended employee
export const SuspendedEmployee = () => (
  <PersonnelFile
    employeeId="EMP-8392"
    name="Alex Torres"
    position="Junior Analyst"
    department="Data Analysis"
    supervisor="Rachel Kim"
    clearanceLevel={1}
    salary="42,000¤/year"
    location="Central HQ - Floor 3"
    email="a.torres@alliansen.cy"
    phone="+47 555-0451"
    performance={45}
    notes={[
      "Suspended pending investigation - unauthorized data access",
      "Multiple performance warnings issued",
      "HR review scheduled for next week"
    ]}
    status="SUSPENDED"
  />
);

// Terminated employee
export const TerminatedEmployee = () => (
  <PersonnelFile
    employeeId="EMP-5821"
    name="Jordan Blake"
    position="Maintenance Technician"
    department="Facilities"
    supervisor="Tom Harrison"
    clearanceLevel={1}
    salary="38,000¤/year"
    location="Warehouse District - Building 7"
    emergencyContact="Casey Blake (Sibling) - +47 555-0672"
    performance={32}
    notes={[
      "Terminated - Violation of safety protocols",
      "Final incident: Unauthorized entry to restricted area",
      "Multiple warnings on record",
      "Exit interview completed - Access credentials revoked"
    ]}
    status="TERMINATED"
  />
);

// Entry level employee
export const EntryLevelEmployee = () => (
  <PersonnelFile
    employeeId="EMP-9847"
    name="Riley Park"
    position="Administrative Assistant"
    department="Human Resources"
    supervisor="Morgan Davis"
    clearanceLevel="NONE"
    salary="35,000¤/year"
    location="Central HQ - Floor 2"
    email="r.park@alliansen.cy"
    phone="+47 555-0823"
    emergencyContact="Sam Park (Parent) - +47 555-0824"
    performance={78}
    notes={[
      "Recently hired - probationary period",
      "Showing strong initiative and organizational skills",
      "Enrolled in company training program"
    ]}
    status="ACTIVE"
  />
);

// Minimal record
export const MinimalRecord = () => (
  <PersonnelFile
    employeeId="EMP-3294"
    name="Chris Anderson"
    position="Security Guard"
    department="Security"
    supervisor="Marcus Chen"
    clearanceLevel={1}
    status="ACTIVE"
  />
);

// Executive with high performance
export const ExecutiveEmployee = () => (
  <PersonnelFile
    employeeId="EMP-0142"
    name="Dr. Elena Rodriguez"
    position="Vice President of Operations"
    department="Executive Leadership"
    supervisor="CEO - Henrik Alliansen"
    clearanceLevel={5}
    salary="285,000¤/year"
    location="Central HQ - Executive Suite"
    email="e.rodriguez@alliansen.cy"
    phone="+47 555-0001"
    emergencyContact="Private - HR Director Only"
    performance={96}
    notes={[
      "Key leadership role since company founding",
      "PhD in Operations Management",
      "Oversees all warehouse and logistics operations",
      "Board member",
      "Reports directly to CEO"
    ]}
    status="ACTIVE"
  />
);
