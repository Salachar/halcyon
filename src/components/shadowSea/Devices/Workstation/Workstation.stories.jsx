import Workstation from './Workstation';

export default {
  title: 'Terminal/Workstation',
  component: Workstation,
};

export const Blank = {
  args: {},
};

export const ProductiveEmployee = {
  args: {
    owner: 'Sarah Chen',
    role: 'Senior Data Analyst',
    status: 'ACTIVE',
    lastActivity: '2 minutes ago',
    openTabs: [
      { title: 'Quarterly Report Analysis - Excel', type: 'work' },
      { title: 'Dashboard Metrics - Analytics Platform', type: 'work' },
      { title: 'Team Meeting Notes - Confluence', type: 'work' },
      { title: 'SQL Query Builder', type: 'work' },
    ],
    recentFiles: [
      { name: 'Q4_Revenue_Analysis.xlsx', timestamp: '10:45 AM' },
      { name: 'Customer_Segmentation.pptx', timestamp: '10:22 AM' },
      { name: 'Database_Export_2024.csv', timestamp: '09:58 AM' },
    ],
    emails: 12,
    productivity: 89,
  },
};
