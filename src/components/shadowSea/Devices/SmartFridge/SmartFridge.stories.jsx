import SmartFridge from './SmartFridge';

export default {
  title: 'Terminal/SmartFridge',
  component: SmartFridge,
};

export const BlankProps = {
  args: {},
};

export const SteelPenthouseKitchen = {
  name: 'Steel Jackhammer Penthouse Kitchen',
  args: {
    id: 'fridge-steel-penthouse',
    model: 'CoolTech Ultra-X',
    location: 'Penthouse Kitchen',
    temperature: 38,
    items: [
      {
        name: 'Synth-Cola (24 cans)',
        quantity: 24,
        category: 'drinks',
        description: 'Generic brand soda',
      },
      {
        name: 'Neon Energy (12 bottles)',
        quantity: 12,
        category: 'drinks',
        description: 'High-caffeine energy drink',
      },
      {
        name: 'Protein Shakes (6 bottles)',
        quantity: 6,
        category: 'drinks',
        description: 'Post-workout recovery',
      },
      {
        name: 'Beer (18 bottles)',
        quantity: 18,
        category: 'drinks',
        description: 'Imported lager',
      },
    ],
    freezerItems: [
      {
        name: 'Blackout (10 doses)',
        quantity: 10,
        category: 'sedative',
        description: 'Sedative/anesthetic - frozen storage',
        value: 1500,
      },
    ],
    notes: 'Never used for actual cooking. Full of Smart™ appliances longing for attention.',
  },
};
